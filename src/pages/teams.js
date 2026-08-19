// ============================================================
// DreamStats — Teams Page
// ============================================================

import { teams, seasons, players, getTeamBySlug, getTeamPlayers, getCurrentSeason } from '../data.js';
import { getTeamSeasonStats, getCareerStats, getInitials, calcGA, calcGoalsPerGame, calcAssistsPerGame } from '../utils.js';
import { renderAvatar, renderTeamLogo, renderStatCard, renderSeasonTabs, renderSectionHeader, renderEmptyState } from '../components.js';
import { hashLink } from '../router.js';

let currentTeamSlug = null;
let currentSeasonId = null;

export function renderTeamsPage(teamSlug) {
  currentTeamSlug = teamSlug;

  if (!teamSlug) {
    return renderTeamList();
  }
  return renderTeamDetail(teamSlug);
}

function renderTeamList() {
  const teamCards = teams.map(team => {
    const playerCount = getTeamPlayers(team.id).length;
    return `
      <a href="#/teams/${team.slug}" class="card ghost-border" style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:2rem;text-decoration:none;transition:transform 0.2s,box-shadow 0.2s">
        ${renderTeamLogo(team, 'team-logo-xl')}
        <h2 class="text-display-lg color-on-surface" style="margin-top:1rem;margin-bottom:0">${team.name}</h2>
        <p class="text-body-md color-on-surface-variant" style="margin:0.5rem 0;max-width:400px">${team.description}</p>
        <span class="badge" style="background:var(--surface-container-high);color:var(--on-surface);border:1px solid var(--outline-variant);padding:4px 10px;border-radius:12px;margin-top:0.5rem">${playerCount} Players</span>
      </a>
    `;
  }).join('');

  return `
    <div>
      <h1 class="text-display-lg" style="margin-bottom:1.5rem">Teams</h1>
      <div style="display:grid;gap:var(--gutter);grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
        ${teamCards}
      </div>
    </div>
  `;
}

function renderTeamDetail(teamSlug) {
  const team = getTeamBySlug(teamSlug);
  if (!team) return renderEmptyState('Team not found');

  if (!currentSeasonId) {
    currentSeasonId = getCurrentSeason().id;
  }

  const playerCount = getTeamPlayers(team.id).length;

  return `
    <div>
      <!-- Team Header -->
      <div class="card" style="display:flex;align-items:center;gap:1.5rem;padding:1.5rem;margin-bottom:1.5rem">
        ${renderTeamLogo(team, 'team-logo-xl')}
        <div>
          <h1 class="text-display-lg" style="margin:0 0 4px 0">${team.name}</h1>
          <p class="text-body-md color-on-surface-variant" style="margin:0 0 0.75rem 0">${team.description}</p>
          <span class="badge" style="background:var(--surface-container-high);color:var(--on-surface);border:1px solid var(--outline-variant);padding:4px 10px;border-radius:12px">${playerCount} Active Players</span>
        </div>
      </div>

      <!-- Season Tabs -->
      <div style="margin-bottom:1rem">
        ${renderSeasonTabs(seasons, currentSeasonId, 'data-season-tab')}
      </div>

      <!-- Season Content -->
      <div id="team-season-content">
        ${renderTeamSeasonContent(team.id, currentSeasonId)}
      </div>

      <!-- Season History -->
      ${renderSeasonHistory(team.id)}
    </div>
  `;
}

function renderTeamSeasonContent(teamId, seasonId) {
  const seasonStats = getTeamSeasonStats(teamId, seasonId);
  const teamPlayers = seasonStats.playerRows;

  let content = `
    <div style="display:grid;gap:var(--gutter);grid-template-columns:repeat(3,1fr);margin-bottom:1.5rem">
      ${renderStatCard('Total Goals', seasonStats.totalGoals, 'color-tertiary')}
      ${renderStatCard('Total Assists', seasonStats.totalAssists, 'color-secondary')}
      ${renderStatCard('Total G+A', seasonStats.totalGA, 'color-primary')}
    </div>
  `;

  if (teamPlayers.length === 0) {
    content += renderEmptyState('No stats available for this season.');
  } else {
    content += `
      <div class="data-table-wrapper" style="margin-bottom:1.5rem">
        <table class="data-table">
          <thead>
            <tr>
              <th>Player</th>
              <th class="text-center">Games</th>
              <th class="text-center">Goals</th>
              <th class="text-center">Assists</th>
              <th class="text-center">G+A</th>
              <th class="text-center">G/Game</th>
              <th class="text-center">A/Game</th>
            </tr>
          </thead>
          <tbody>
            ${teamPlayers.map(row => `
              <tr class="clickable" onclick="window.location.hash='/players/${row.player.slug}'">
                <td>
                  <div class="player-cell">
                    ${renderAvatar(row.player, 'avatar-sm')}
                    <span class="font-semibold">${row.player.name}</span>
                  </div>
                </td>
                <td class="text-mono-data text-center">${row.games}</td>
                <td class="text-mono-data text-center color-tertiary font-bold">${row.goals}</td>
                <td class="text-mono-data text-center color-secondary">${row.assists}</td>
                <td class="text-mono-data text-center color-primary font-bold">${row.ga}</td>
                <td class="text-mono-data text-center">${row.goalsPerGame.toFixed(2)}</td>
                <td class="text-mono-data text-center">${row.assistsPerGame.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
  return content;
}

function renderSeasonHistory(teamId) {
  const historyCards = seasons.map(season => {
    const stats = getTeamSeasonStats(teamId, season.id);
    return `
      <div class="card" style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1rem">
        <div>
          <h4 class="text-headline-sm" style="margin:0 0 4px 0">${season.name}</h4>
          <span class="text-body-sm color-on-surface-variant">${stats.playerRows.length} Players</span>
        </div>
        <div style="display:flex;gap:1.5rem">
          <div style="text-align:center">
            <span class="text-label-caps color-on-surface-variant" style="display:block;margin-bottom:2px">Goals</span>
            <span class="text-stat-large color-tertiary">${stats.totalGoals}</span>
          </div>
          <div style="text-align:center">
            <span class="text-label-caps color-on-surface-variant" style="display:block;margin-bottom:2px">Assists</span>
            <span class="text-stat-large color-secondary">${stats.totalAssists}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div style="margin-top:1.5rem">
      ${renderSectionHeader('Season History')}
      <div style="display:flex;flex-direction:column;gap:var(--stack-sm);margin-top:var(--stack-sm)">
        ${historyCards}
      </div>
    </div>
  `;
}

export function setupTeamsPage() {
  const tabs = document.querySelectorAll('[data-season-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const seasonId = e.target.getAttribute('data-season-tab');
      currentSeasonId = seasonId;

      // Update tabs UI
      document.querySelectorAll('[data-season-tab]').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');

      // Update content
      const team = getTeamBySlug(currentTeamSlug);
      if (team) {
        const contentContainer = document.getElementById('team-season-content');
        if (contentContainer) {
          contentContainer.innerHTML = renderTeamSeasonContent(team.id, currentSeasonId);
        }
      }
    });
  });
}
