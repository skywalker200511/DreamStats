// ============================================================
// DreamStats — Players Database Page
// ============================================================

import { players, teams, getTeam } from '../data.js';
import { getCareerStats, getInitials } from '../utils.js';
import { renderAvatar, renderTeamLogo, renderEmptyState } from '../components.js';

let currentSearch = '';
let currentTeamFilter = 'all';

function renderPlayerGrid(playerList) {
  if (playerList.length === 0) {
    return renderEmptyState('No players found matching your criteria.', 'person_search');
  }

  const cards = playerList.map(player => {
    const team = getTeam(player.teamId);
    const career = getCareerStats(player);

    return `
      <a href="#/players/${player.slug}" class="player-card" style="text-decoration:none">
        ${renderAvatar(player, 'avatar-lg')}
        <h3 class="text-headline-sm" style="margin:0">${player.name}</h3>
        <div style="display:flex;align-items:center;gap:4px">
          ${renderTeamLogo(team, 'team-logo-sm')}
          <span class="text-body-sm color-on-surface-variant">${team ? team.name : ''}</span>
        </div>
        <span class="text-body-sm color-on-surface-variant">${player.position} · #${player.number}</span>
        <div class="player-card-stats" style="width:100%;justify-content:space-around;border-top:1px solid var(--outline-variant);padding-top:8px;margin-top:4px">
          <div class="player-card-stat">
            <span class="text-stat-large color-tertiary" style="font-size:18px">${career.goals}</span>
            <span class="text-label-caps color-on-surface-variant" style="font-size:9px">Goals</span>
          </div>
          <div class="player-card-stat">
            <span class="text-stat-large color-secondary" style="font-size:18px">${career.assists}</span>
            <span class="text-label-caps color-on-surface-variant" style="font-size:9px">Assists</span>
          </div>
          <div class="player-card-stat">
            <span class="text-stat-large color-primary" style="font-size:18px">${career.ga}</span>
            <span class="text-label-caps color-on-surface-variant" style="font-size:9px">G+A</span>
          </div>
        </div>
      </a>
    `;
  }).join('');

  return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:var(--gutter)">${cards}</div>`;
}

function getFilteredPlayers() {
  let filtered = [...players];

  if (currentTeamFilter !== 'all') {
    filtered = filtered.filter(p => p.teamId === currentTeamFilter);
  }

  if (currentSearch) {
    const lower = currentSearch.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(lower));
  }

  return filtered;
}

export function renderPlayersPage() {
  const teamFilterChips = [
    `<button class="btn-chip ${currentTeamFilter === 'all' ? 'active' : ''}" data-team="all">All</button>`,
    ...teams.map(t => `<button class="btn-chip ${currentTeamFilter === t.id ? 'active' : ''}" data-team="${t.id}">${t.name}</button>`)
  ].join('');

  return `
    <div>
      <h1 class="text-headline-md" style="margin-bottom:var(--stack-md)">Players</h1>

      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--gutter);margin-bottom:var(--stack-md)">
        <div class="search-wrapper">
          <span class="material-symbols-outlined">search</span>
          <input type="text" class="search-input" id="player-search" placeholder="Search players..." value="${currentSearch}">
        </div>
        <div style="display:flex;gap:var(--stack-sm);flex-wrap:wrap" id="team-filters">
          ${teamFilterChips}
        </div>
      </div>

      <div id="player-grid-container">
        ${renderPlayerGrid(getFilteredPlayers())}
      </div>
    </div>
  `;
}

export function setupPlayersPage() {
  const searchInput = document.getElementById('player-search');
  const gridContainer = document.getElementById('player-grid-container');

  function updateGrid() {
    if (gridContainer) {
      gridContainer.innerHTML = renderPlayerGrid(getFilteredPlayers());
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      updateGrid();
    });
  }

  document.querySelectorAll('#team-filters .btn-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#team-filters .btn-chip').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentTeamFilter = e.currentTarget.dataset.team;
      updateGrid();
    });
  });
}
