// ============================================================
// DreamStats — Home Page
// ============================================================

import { seasons, teams, getCurrentSeason } from '../data.js';
import { getSeasonOverview, getSeasonLeaderboard, getTeamSeasonStats, getInitials } from '../utils.js';
import { renderAvatar, renderTeamLogo, renderMiniStatCard, renderSeasonTabs, renderEmptyState, renderSectionHeader } from '../components.js';
import { hashLink } from '../router.js';

let currentSeasonId = null;
let currentSortBy = 'goals';

function renderContent() {
  if (!currentSeasonId) {
    currentSeasonId = getCurrentSeason().id;
  }

  const seasonTabs = [...seasons].reverse();
  const overview = getSeasonOverview(currentSeasonId);

  if (!overview) return renderEmptyState('Season not found.');

  const mvp = overview.mvpPlayer;
  const mvpTeam = overview.mvpTeam;
  const mvpStats = overview.mvpSeasonStats;

  // MVP Card
  let mvpCardHtml = '';
  if (mvp && mvpStats) {
    mvpCardHtml = `
      <a href="#/players/${mvp.slug}" class="card mvp-card" style="text-decoration:none;grid-column:span 2">
        <div class="mvp-card-image">
          ${renderAvatar(mvp, 'avatar-xl')}
          <div class="mvp-card-gradient"></div>
          <div class="mvp-badge">MVP</div>
        </div>
        <div class="mvp-card-info">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
            ${renderTeamLogo(mvpTeam, 'team-logo-md')}
            <span class="text-label-caps color-on-surface-variant">${mvpTeam ? mvpTeam.name : ''}</span>
          </div>
          <h2 class="text-display-lg color-primary" style="margin:0">${mvp.name}</h2>
          <div class="mvp-stats-row">
            <div class="mvp-stat">
              <span class="text-label-caps color-on-surface-variant">Goals</span>
              <span class="text-stat-large color-tertiary text-mono-data">${mvpStats.goals}</span>
            </div>
            <div class="mvp-stat">
              <span class="text-label-caps color-on-surface-variant">Assists</span>
              <span class="text-stat-large color-secondary text-mono-data">${mvpStats.assists}</span>
            </div>
            <div class="mvp-stat">
              <span class="text-label-caps color-on-surface-variant">G+A</span>
              <span class="text-stat-large color-primary text-mono-data">${mvpStats.goals + mvpStats.assists}</span>
            </div>
          </div>
        </div>
      </a>
    `;
  }

  // Top Scorer & Top Assists mini cards
  const topScorer = overview.topScorer;
  const topAssists = overview.topAssists;

  let miniCardsHtml = '';
  if (topScorer || topAssists) {
    miniCardsHtml = `<div style="display:flex;flex-direction:column;gap:var(--gutter)">`;
    if (topScorer) {
      miniCardsHtml += renderMiniStatCard('TOP SCORER', topScorer.player.name, topScorer.goals, 'color-tertiary', `/players/${topScorer.player.slug}`);
    }
    if (topAssists) {
      miniCardsHtml += renderMiniStatCard('MOST ASSISTS', topAssists.player.name, topAssists.assists, 'color-secondary', `/players/${topAssists.player.slug}`);
    }
    miniCardsHtml += `</div>`;
  }

  // Featured Teams
  const teamsHtml = teams.map(team => {
    const tStats = getTeamSeasonStats(team.id, currentSeasonId);
    return `
      <a href="#/teams/${team.slug}" class="team-card" style="text-decoration:none">
        ${renderTeamLogo(team, 'team-logo-xl')}
        <div style="flex:1">
          <h3 class="text-headline-md color-primary" style="margin:0">${team.name}</h3>
          <div class="team-card-stats">
            <div class="team-card-stat">
              <span class="material-symbols-outlined" style="font-size:16px;color:var(--tertiary)">sports_soccer</span>
              <span class="text-mono-data">${tStats.totalGoals} G</span>
            </div>
            <div class="team-card-stat">
              <span class="material-symbols-outlined" style="font-size:16px;color:var(--secondary)">assistant</span>
              <span class="text-mono-data">${tStats.totalAssists} A</span>
            </div>
          </div>
        </div>
        <span class="material-symbols-outlined color-on-surface-variant">chevron_right</span>
      </a>
    `;
  }).join('');

  // Sortable column header helper
  const th = (label, sortKey, align = 'text-right') => {
    const isSorted = currentSortBy === sortKey;
    return `<th class="sortable ${isSorted ? 'sorted' : ''} ${align}" data-sort="${sortKey}">${label}${isSorted ? ' ↓' : ''}</th>`;
  };

  // Rankings table
  const leaderboard = getSeasonLeaderboard(currentSeasonId, currentSortBy);
  const tableRows = leaderboard.map(row => `
    <tr class="clickable" onclick="window.location.hash='/players/${row.player.slug}'">
      <td>
        <div class="player-cell">
          ${renderAvatar(row.player, 'avatar-sm')}
          <div>
            <div class="text-body-md font-medium">${row.player.name}</div>
            <div class="text-body-sm color-on-surface-variant hide-mobile">${row.player.position}</div>
          </div>
        </div>
      </td>
      <td>
        <div class="team-cell">
          ${renderTeamLogo(row.team, 'team-logo-sm')}
          <span class="hide-mobile">${row.team ? row.team.shortName : ''}</span>
        </div>
      </td>
      <td class="text-right text-mono-data">${row.games}</td>
      <td class="text-right text-mono-data color-tertiary font-bold">${row.goals}</td>
      <td class="text-right text-mono-data color-secondary">${row.assists}</td>
      <td class="text-right text-mono-data color-primary font-bold">${row.ga}</td>
      <td class="text-right text-mono-data">${row.goalsPerGame.toFixed(2)}</td>
      <td class="text-right text-mono-data">${row.assistsPerGame.toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    ${renderSeasonTabs(seasonTabs, currentSeasonId, 'data-season-tab')}

    <div style="display:grid;grid-template-columns:1fr;gap:var(--gutter);margin-top:var(--stack-md)">
      <div style="display:grid;grid-template-columns:1fr;gap:var(--gutter)">
        ${mvpCardHtml}
        ${miniCardsHtml}
      </div>
    </div>

    <div style="margin-top:var(--stack-md)">
      ${renderSectionHeader('Featured Teams')}
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--gutter);margin-top:var(--stack-sm)">
        ${teamsHtml}
      </div>
    </div>

    <div style="margin-top:var(--stack-md)">
      ${renderSectionHeader('Player Rankings')}
      <div class="data-table-wrapper" style="margin-top:var(--stack-sm)">
        <table class="data-table">
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
          <tbody>${tableRows}</tbody>
        </table>
      </div>
    </div>
  `;
}

export function renderHomePage() {
  return renderContent();
}

export function setupHomePage() {
  // Season tab click
  document.querySelectorAll('[data-season-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentSeasonId = e.target.getAttribute('data-season-tab');
      const container = document.getElementById('page-container');
      if (container) {
        container.innerHTML = renderContent();
        setupHomePage();
      }
    });
  });

  // Sort header click
  document.querySelectorAll('th.sortable').forEach(th => {
    th.addEventListener('click', (e) => {
      const sortKey = e.currentTarget.getAttribute('data-sort');
      if (sortKey) {
        currentSortBy = sortKey;
        const container = document.getElementById('page-container');
        if (container) {
          container.innerHTML = renderContent();
          setupHomePage();
        }
      }
    });
  });
}
