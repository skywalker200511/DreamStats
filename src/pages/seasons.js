import { seasons, getSeasonBySlug } from '../data.js';
import { getSeasonOverview, getSeasonLeaderboard } from '../utils.js';
import { renderAvatar, renderTeamLogo, renderMiniStatCard, renderStatCard, renderEmptyState, renderSectionHeader, renderBadge } from '../components.js';
import { hashLink } from '../router.js';

let currentSortBy = 'goals';
let currentSeasonSlug = null;

export function renderSeasonsPage(seasonSlug) {
  currentSeasonSlug = seasonSlug;
  
  if (!seasonSlug) {
    const seasonCards = [...seasons].reverse().map(season => {
      const overview = getSeasonOverview(season.id);
      const mvpName = overview && overview.mvpPlayer ? overview.mvpPlayer.name : 'TBD';
      const topScorer = overview && overview.topScorer ? `${overview.topScorer.player.name} (${overview.topScorer.goals} G)` : 'TBD';
      const statusBadge = season.status === 'active' ? renderBadge('Active', 'scorer') : renderBadge('Completed', 'assists');
      
      return `
        <a href="#/seasons/${season.slug}" class="card col-span-12 md:col-span-6 lg:col-span-4" style="text-decoration:none;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3 class="text-headline-md">${season.name}</h3>
            ${statusBadge}
          </div>
          <div style="margin-bottom:8px;"><span class="text-label-caps">MVP:</span> <span class="text-body-md">${mvpName}</span></div>
          <div><span class="text-label-caps">Top Scorer:</span> <span class="text-body-md">${topScorer}</span></div>
        </a>
      `;
    }).join('');

    return `
      <div class="container">
        ${renderSectionHeader('All Seasons')}
        <div style="display:grid; grid-template-columns: repeat(12, 1fr); gap: 16px;">
          ${seasonCards}
        </div>
      </div>
    `;
  }
  
  const season = getSeasonBySlug(seasonSlug);
  if (!season) return renderEmptyState('Season not found.');
  
  const overview = getSeasonOverview(season.id);
  const statusBadge = season.status === 'active' ? renderBadge('Active', 'scorer') : renderBadge('Completed', 'assists');

  let highlightsHtml = '';
  if (overview.mvpPlayer || overview.topScorer || overview.topAssists || overview.topGA) {
    const cards = [];
    if (overview.mvpPlayer) {
      cards.push(`<div class="col-span-6 md:col-span-3">${renderMiniStatCard('MVP', overview.mvpPlayer.name, '', 'color-primary', `/players/${overview.mvpPlayer.slug}`)}</div>`);
    }
    if (overview.topScorer) {
      cards.push(`<div class="col-span-6 md:col-span-3">${renderMiniStatCard('TOP SCORER', overview.topScorer.player.name, overview.topScorer.goals, 'color-primary', `/players/${overview.topScorer.player.slug}`)}</div>`);
    }
    if (overview.topAssists) {
      cards.push(`<div class="col-span-6 md:col-span-3">${renderMiniStatCard('TOP ASSISTS', overview.topAssists.player.name, overview.topAssists.assists, 'color-secondary', `/players/${overview.topAssists.player.slug}`)}</div>`);
    }
    if (overview.topGA) {
      cards.push(`<div class="col-span-6 md:col-span-3">${renderMiniStatCard('MOST G+A', overview.topGA.player.name, overview.topGA.ga, 'color-tertiary', `/players/${overview.topGA.player.slug}`)}</div>`);
    }
    highlightsHtml = `
      <div style="display:grid; grid-template-columns: repeat(12, 1fr); gap: 16px; margin-bottom: 32px;">
        ${cards.join('')}
      </div>
    `;
  }

  let mvpHtml = '';
  if (overview.mvpPlayer) {
    const mvp = overview.mvpPlayer;
    const mvpTeam = overview.mvpTeam;
    const mvpStats = overview.mvpSeasonStats;
    mvpHtml = `
      ${renderSectionHeader('Most Valuable Player')}
      <a href="#/players/${mvp.slug}" class="card mvp-card" style="text-decoration:none; display:flex; gap:24px; align-items:center; margin-bottom: 32px;">
        ${renderAvatar(mvp, 'avatar-xl')}
        <div class="mvp-card-info">
          ${renderBadge('MVP', 'mvp')}
          <h2 class="text-display-lg" style="margin-top:8px; margin-bottom:8px;">${mvp.name}</h2>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom: 16px;">
            ${renderTeamLogo(mvpTeam, 'team-logo-md')}
            <span class="text-body-md">${mvpTeam.name}</span>
          </div>
          <div class="mvp-stats-row" style="display:flex; gap:16px;">
            ${renderStatCard('Goals', mvpStats.goals)}
            ${renderStatCard('Assists', mvpStats.assists)}
            ${renderStatCard('G+A', mvpStats.goals + mvpStats.assists)}
          </div>
        </div>
      </a>
    `;
  }

  const th = (label, sortKey) => {
    const isSorted = currentSortBy === sortKey;
    const cls = isSorted ? 'sortable sorted' : 'sortable';
    return `<th class="${cls}" data-sort="${sortKey}" style="cursor:pointer">${label} ${isSorted ? '↓' : ''}</th>`;
  };

  const leaderboard = getSeasonLeaderboard(season.id, currentSortBy);
  const tableRows = leaderboard.map(row => `
    <tr>
      <td>
        <div style="display:flex; align-items:center; gap:8px;">
          ${renderAvatar(row.player, 'avatar-sm')}
          ${hashLink(`/players/${row.player.slug}`, row.player.name, 'text-body-md')}
        </div>
      </td>
      <td>${hashLink(`/teams/${row.team.slug}`, row.team.shortName || row.team.name)}</td>
      <td>${row.games}</td>
      <td>${row.goals}</td>
      <td>${row.assists}</td>
      <td>${row.ga}</td>
      <td>${row.goalsPerGame.toFixed(2)}</td>
      <td>${row.assistsPerGame.toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    <div class="container">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
        <h1 class="text-headline-lg" style="margin:0">${season.name}</h1>
        ${statusBadge}
      </div>
      
      ${highlightsHtml}
      ${mvpHtml}
      
      ${renderSectionHeader('Player Statistics')}
      <div class="data-table-wrapper card">
        <table class="data-table" style="width:100%; text-align:left;">
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              ${th('Games', 'games')}
              ${th('Goals', 'goals')}
              ${th('Assists', 'assists')}
              ${th('G+A', 'ga')}
              ${th('G/Game', 'goalsPerGame')}
              ${th('A/Game', 'assistsPerGame')}
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function setupSeasonsPage() {
  document.querySelectorAll('th.sortable').forEach(th => {
    th.addEventListener('click', (e) => {
      const sortKey = e.currentTarget.getAttribute('data-sort');
      if (sortKey) {
        currentSortBy = sortKey;
        const container = document.getElementById('page-container');
        if (container) {
          container.innerHTML = renderSeasonsPage(currentSeasonSlug);
          setupSeasonsPage();
        }
      }
    });
  });
}
