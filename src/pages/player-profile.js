// ============================================================
// DreamStats — Player Profile Page
// ============================================================

import { getPlayerBySlug, getTeam, seasons } from '../data.js';
import { getCareerStats, getEnrichedSeasonStats, getSeasonBests, getPlayerAchievements, getInitials } from '../utils.js';
import { renderAvatar, renderTeamLogo, renderStatCard, renderSectionHeader, renderEmptyState, renderBadge } from '../components.js';
import { hashLink } from '../router.js';

export function renderPlayerProfilePage(slug) {
  const player = getPlayerBySlug(slug);

  if (!player) {
    return renderEmptyState('Player not found', 'person_off');
  }

  const team = getTeam(player.teamId);
  const careerStats = getCareerStats(player);
  const enrichedSeasons = getEnrichedSeasonStats(player);
  const seasonBests = getSeasonBests(player);
  const achievements = getPlayerAchievements(player);

  // 1. Profile Header
  const achievementBadges = achievements.map(a => {
    const typeMap = { 'mvp': 'mvp', 'top-scorer': 'scorer', 'top-assists': 'assists' };
    return renderBadge(a.text, typeMap[a.type] || 'mvp');
  }).join('');

  const headerHtml = `
    <div class="card profile-header" style="margin-bottom:1.5rem">
      <div class="profile-header-avatar">
        ${renderAvatar(player, 'avatar-xxl')}
      </div>
      <div class="profile-header-info">
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem">
          ${renderTeamLogo(team, 'team-logo-md')}
          <span class="text-label-caps color-on-surface-variant">${player.position}</span>
          <span class="text-label-caps color-on-surface-variant" style="opacity:0.6">· #${player.number}</span>
        </div>
        <h1 class="text-display-lg" style="margin:0">${player.name}</h1>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.25rem">
          ${hashLink(`/teams/${team ? team.slug : ''}`, team ? team.name : '', 'text-body-md color-secondary')}
        </div>
        ${achievementBadges ? `<div class="profile-badges" style="margin-top:0.75rem">${achievementBadges}</div>` : ''}
      </div>
    </div>
  `;

  // 2. Career Overview
  const overviewHtml = `
    <div style="margin-bottom:1.5rem">
      ${renderSectionHeader('Career Overview')}
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--gutter);margin-top:0.5rem">
        ${renderStatCard('Games', careerStats.games, 'color-on-surface')}
        ${renderStatCard('Goals', careerStats.goals, 'color-tertiary')}
        ${renderStatCard('Assists', careerStats.assists, 'color-secondary')}
        ${renderStatCard('G+A', careerStats.ga, 'color-primary')}
        ${renderStatCard('G/Game', careerStats.goalsPerGame, 'color-on-surface')}
        ${renderStatCard('A/Game', careerStats.assistsPerGame, 'color-on-surface')}
      </div>
    </div>
  `;

  // 3. Season History Table — find best G+A season for highlighting
  const bestGASeasonId = seasonBests.bestGA ? seasonBests.bestGA.seasonId : null;

  const tableRows = enrichedSeasons.map(s => {
    const isBest = s.seasonId === bestGASeasonId;
    return `
      <tr class="${isBest ? 'highlight' : ''}" style="${isBest ? 'background:rgba(74,225,118,0.05)' : ''}">
        <td>${hashLink(`/seasons/${s.seasonSlug}`, s.seasonName, 'color-primary font-medium')}</td>
        <td>
          <div style="display:flex;align-items:center;gap:4px">
            ${renderTeamLogo(team, 'team-logo-sm')}
            <span class="hide-mobile">${team ? team.shortName : '-'}</span>
          </div>
        </td>
        <td class="text-right text-mono-data">${s.games}</td>
        <td class="text-right text-mono-data color-tertiary font-bold">${s.goals}</td>
        <td class="text-right text-mono-data color-secondary">${s.assists}</td>
        <td class="text-right text-mono-data color-primary font-bold">${s.ga}</td>
        <td class="text-right text-mono-data color-on-surface-variant">${s.goalsPerGame}</td>
        <td class="text-right text-mono-data color-on-surface-variant">${s.assistsPerGame}</td>
      </tr>
    `;
  }).join('');

  const tableHtml = `
    <div class="data-table-wrapper" style="border-radius:var(--radius-xl);overflow:hidden">
      <table class="data-table">
        <thead>
          <tr>
            <th>Season</th>
            <th>Team</th>
            <th class="text-right">Games</th>
            <th class="text-right">Goals</th>
            <th class="text-right">Assists</th>
            <th class="text-right">G+A</th>
            <th class="text-right">G/Game</th>
            <th class="text-right">A/Game</th>
          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>
  `;

  // 4. Season Bests
  const bestCard = (label, value, seasonName, colorClass) => `
    <div class="season-best-card">
      <span class="best-label text-label-caps">${label}</span>
      <span class="best-value text-stat-large ${colorClass}">${value}</span>
      <span class="best-season text-body-sm color-on-surface-variant">${seasonName}</span>
    </div>
  `;

  const bestsHtml = `
    <div style="display:flex;flex-direction:column;gap:var(--gutter)">
      ${seasonBests.bestGoals ? bestCard('Best Goals', seasonBests.bestGoals.goals, seasonBests.bestGoals.seasonName, 'color-tertiary') : ''}
      ${seasonBests.bestAssists ? bestCard('Best Assists', seasonBests.bestAssists.assists, seasonBests.bestAssists.seasonName, 'color-secondary') : ''}
      ${seasonBests.bestGA ? bestCard('Best G+A', seasonBests.bestGA.ga, seasonBests.bestGA.seasonName, 'color-primary') : ''}
      ${seasonBests.bestGoalsPerGame ? bestCard('Best G/Game', seasonBests.bestGoalsPerGame.goalsPerGame, seasonBests.bestGoalsPerGame.seasonName, 'color-on-surface') : ''}
      ${seasonBests.bestAssistsPerGame ? bestCard('Best A/Game', seasonBests.bestAssistsPerGame.assistsPerGame, seasonBests.bestAssistsPerGame.seasonName, 'color-on-surface') : ''}
    </div>
  `;

  // 5. Achievements
  const achievementsSection = achievements.length > 0 ? `
    <div style="margin-top:1.5rem">
      ${renderSectionHeader('Achievements')}
      <div class="achievement-list" style="margin-top:0.5rem">
        ${achievements.map(a => `
          <div class="achievement-item">
            <span class="achievement-icon">${a.icon}</span>
            <span class="text-body-md">${a.text}</span>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  // Main layout — two columns on desktop
  return `
    <div>
      ${headerHtml}
      ${overviewHtml}

      <div style="display:grid;grid-template-columns:1fr;gap:var(--gutter);margin-bottom:1.5rem">
        <div style="grid-column:1/-1">
          ${renderSectionHeader('Season History')}
          ${tableHtml}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr;gap:var(--gutter)">
        <div>
          ${renderSectionHeader('Season Bests')}
          ${bestsHtml}
        </div>
      </div>

      ${achievementsSection}
    </div>
  `;
}

export function setupPlayerProfilePage() {
  // No interactive setup needed for this page
}
