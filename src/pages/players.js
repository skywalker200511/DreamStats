// ============================================================
// DreamStats — Players Database Page
// ============================================================

import { players, teams, getTeam } from '../data.js';
import { getCareerStats, getInitials } from '../utils.js';
import { renderAvatar, renderTeamLogo, renderEmptyState } from '../components.js';

let currentSearch = '';
let currentTeamFilter = 'all';
let currentPositionFilter = 'all';
let currentSort = 'default';

function renderPlayerCard(player) {
  const team = getTeam(player.teamId);
  const career = getCareerStats(player);

  return `
    <a href="#/players/${player.slug}" class="player-card" style="text-decoration:none">
      ${renderAvatar(player, 'avatar-lg')}
      <h3 class="text-headline-sm color-primary" style="margin:0">${player.name}</h3>
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
}

function renderPlayerGrid(playerList) {
  if (playerList.length === 0) {
    return renderEmptyState('No players found matching your criteria.', 'person_search');
  }

  // Group by position
  const positions = ['Attacker', 'Midfielder', 'Defender', 'Goalkeeper'];
  let html = '';

  positions.forEach(pos => {
    const group = playerList.filter(p => p.position === pos);
    if (group.length > 0) {
      const cards = group.map(p => renderPlayerCard(p)).join('');
      html += `
        <div style="margin-bottom: 32px;">
          <h3 class="text-headline-sm color-on-surface" style="margin-bottom: 16px; border-bottom: 1px solid var(--surface-variant); padding-bottom: 8px;">${pos}s</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:var(--gutter)">
            ${cards}
          </div>
        </div>
      `;
    }
  });

  return html;
}

function getFilteredPlayers() {
  let filtered = [...players];

  if (currentTeamFilter !== 'all') {
    filtered = filtered.filter(p => p.teamId === currentTeamFilter);
  }
  
  if (currentPositionFilter !== 'all') {
    filtered = filtered.filter(p => p.position === currentPositionFilter);
  }

  if (currentSearch) {
    const lower = currentSearch.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(lower));
  }

  // Sort logic
  if (currentSort !== 'default') {
    filtered.sort((a, b) => {
      const statA = getCareerStats(a);
      const statB = getCareerStats(b);
      return statB[currentSort] - statA[currentSort];
    });
  }

  return filtered;
}

export function renderPlayersPage() {
  const teamFilterChips = [
    `<button class="btn-chip ${currentTeamFilter === 'all' ? 'active' : ''}" data-team="all">All Teams</button>`,
    ...teams.map(t => `<button class="btn-chip ${currentTeamFilter === t.id ? 'active' : ''}" data-team="${t.id}">${t.name}</button>`)
  ].join('');
  
  const posFilterChips = [
    `<button class="btn-chip ${currentPositionFilter === 'all' ? 'active' : ''}" data-pos="all">All Positions</button>`,
    `<button class="btn-chip ${currentPositionFilter === 'Attacker' ? 'active' : ''}" data-pos="Attacker">Attackers</button>`,
    `<button class="btn-chip ${currentPositionFilter === 'Midfielder' ? 'active' : ''}" data-pos="Midfielder">Midfielders</button>`,
    `<button class="btn-chip ${currentPositionFilter === 'Defender' ? 'active' : ''}" data-pos="Defender">Defenders</button>`,
    `<button class="btn-chip ${currentPositionFilter === 'Goalkeeper' ? 'active' : ''}" data-pos="Goalkeeper">Goalkeepers</button>`,
  ].join('');

  const sortFilterChips = [
    `<button class="btn-chip ${currentSort === 'default' ? 'active' : ''}" data-sort="default">Default</button>`,
    `<button class="btn-chip ${currentSort === 'goals' ? 'active' : ''}" data-sort="goals">Goals</button>`,
    `<button class="btn-chip ${currentSort === 'assists' ? 'active' : ''}" data-sort="assists">Assists</button>`,
    `<button class="btn-chip ${currentSort === 'ga' ? 'active' : ''}" data-sort="ga">G+A</button>`,
  ].join('');

  return `
    <div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:var(--stack-md);flex-wrap:wrap;gap:16px;">
        <h1 class="text-headline-md" style="margin:0">Players</h1>
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="text-body-sm color-on-surface-variant">Sort by:</span>
          <div style="display:flex;gap:4px;" id="sort-filters">
            ${sortFilterChips}
          </div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:var(--stack-md)">
        <div class="search-wrapper" style="max-width:400px;">
          <span class="material-symbols-outlined">search</span>
          <input type="text" class="search-input" id="player-search" placeholder="Search players..." value="${currentSearch}">
        </div>
        <div style="display:flex;gap:var(--stack-sm);flex-wrap:wrap" id="team-filters">
          ${teamFilterChips}
        </div>
        <div style="display:flex;gap:var(--stack-sm);flex-wrap:wrap" id="pos-filters">
          ${posFilterChips}
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
  
  document.querySelectorAll('#pos-filters .btn-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#pos-filters .btn-chip').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentPositionFilter = e.currentTarget.dataset.pos;
      updateGrid();
    });
  });

  document.querySelectorAll('#sort-filters .btn-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#sort-filters .btn-chip').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentSort = e.currentTarget.dataset.sort;
      updateGrid();
    });
  });
}
