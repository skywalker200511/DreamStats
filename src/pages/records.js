// ============================================================
// DreamStats — Records Page
// ============================================================

import { seasons } from '../data.js';
import { getSingleSeasonRecords, getCareerRecords, getMVPHistory, getInitials } from '../utils.js';
import { renderAvatar, renderTeamLogo, renderSectionHeader, renderEmptyState } from '../components.js';

export function renderRecordsPage() {
  const seasonRecords = getSingleSeasonRecords();
  const careerRecords = getCareerRecords();
  const mvpHistory = getMVPHistory();

  return `
    <div>
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
        <span class="material-symbols-outlined" style="font-size:32px;color:var(--primary)">emoji_events</span>
        <h1 class="text-display-lg" style="margin:0">Tournament Records</h1>
      </div>

      <div style="margin-bottom:2rem">
        ${renderSectionHeader('Single Season Records')}
        <div style="display:grid;gap:var(--gutter);grid-template-columns:repeat(auto-fit,minmax(340px,1fr));margin-top:var(--stack-sm)">
          ${renderRecordCard('Most Goals in a Season', 'local_fire_department', 'var(--tertiary)', seasonRecords.mostGoals, 'goals')}
          ${renderRecordCard('Most Assists in a Season', 'explore', 'var(--secondary)', seasonRecords.mostAssists, 'assists')}
          ${renderRecordCard('Most G+A in a Season', 'stars', 'var(--primary)', seasonRecords.mostGA, 'ga')}
          ${renderRecordCard('Best Goals/Game', 'speed', 'var(--tertiary)', seasonRecords.bestGoalsPerGame, 'goalsPerGame')}
          ${renderRecordCard('Best Assists/Game', 'assistant', 'var(--secondary)', seasonRecords.bestAssistsPerGame, 'assistsPerGame')}
        </div>
      </div>

      <div style="margin-bottom:2rem">
        ${renderSectionHeader('Career Records')}
        <div style="display:grid;gap:var(--gutter);grid-template-columns:repeat(auto-fit,minmax(340px,1fr));margin-top:var(--stack-sm)">
          ${renderRecordCard('Most Career Goals', 'sports_soccer', 'var(--tertiary)', careerRecords.mostGoals, 'value')}
          ${renderRecordCard('Most Career Assists', 'directions_run', 'var(--secondary)', careerRecords.mostAssists, 'value')}
          ${renderRecordCard('Most Career G+A', 'hotel_class', 'var(--primary)', careerRecords.mostGA, 'value')}
          ${renderRecordCard('Most MVP Awards', 'workspace_premium', 'var(--tertiary)', careerRecords.mostMVPs, 'value')}
        </div>
      </div>

      <div style="margin-bottom:2rem">
        ${renderSectionHeader('MVP History')}
        <div style="margin-top:var(--stack-sm)">
          ${renderMVPHistoryTable(mvpHistory)}
        </div>
      </div>
    </div>
  `;
}

function renderRecordCard(title, icon, color, records, valueKey) {
  if (!records || records.length === 0) return '';

  const rows = records.map((record, index) => {
    let formattedValue = record[valueKey];
    if (typeof formattedValue === 'number' && !Number.isInteger(formattedValue)) {
      formattedValue = formattedValue.toFixed(2);
    }

    return `
      <a href="#/players/${record.player.slug}" class="record-row">
        <div class="record-row-left">
          <span class="text-mono-data color-on-surface-variant record-rank">${index + 1}</span>
          ${renderAvatar(record.player)}
          <div class="record-info">
            <span class="text-body-md font-semibold color-on-surface">${record.player.name}</span>
            <span class="text-body-sm color-on-surface-variant" style="display:flex;align-items:center;gap:4px;margin-top:2px">
              ${renderTeamLogo(record.team, 'team-logo-sm')}
              ${record.team ? record.team.shortName : ''}
              ${record.season ? ` · ${record.season.name}` : ''}
            </span>
          </div>
        </div>
        <span class="text-stat-large" style="color:${color};font-variant-numeric:tabular-nums">${formattedValue}</span>
      </a>
    `;
  }).join('');

  return `
    <section class="card" style="overflow:hidden">
      <div class="card-header">
        <h2 class="text-headline-sm color-on-surface" style="display:flex;align-items:center;gap:0.5rem;margin:0">
          <span class="material-symbols-outlined" style="color:${color}">${icon}</span>
          ${title}
        </h2>
      </div>
      <div>${rows}</div>
    </section>
  `;
}

function renderMVPHistoryTable(mvpHistory) {
  if (!mvpHistory || mvpHistory.length === 0) return renderEmptyState('No MVP history available.');

  const rows = mvpHistory.map(item => `
    <tr>
      <td style="padding:10px 14px">
        <a href="#/seasons/${item.season.slug}" style="text-decoration:none;color:var(--primary)" class="font-medium">${item.season.name}</a>
      </td>
      <td style="padding:10px 14px">
        <a href="#/players/${item.player.slug}" style="display:flex;align-items:center;gap:8px;text-decoration:none;color:inherit">
          ${renderAvatar(item.player, 'avatar-sm')}
          <span class="font-semibold">${item.player.name}</span>
        </a>
      </td>
      <td style="padding:10px 14px">
        <div style="display:flex;align-items:center;gap:4px">
          ${renderTeamLogo(item.team, 'team-logo-sm')}
          <span>${item.team ? item.team.shortName : '-'}</span>
        </div>
      </td>
      <td class="text-mono-data text-center" style="padding:10px 14px">${item.stats ? item.stats.goals : '-'}</td>
      <td class="text-mono-data text-center" style="padding:10px 14px">${item.stats ? item.stats.assists : '-'}</td>
      <td class="text-mono-data text-center font-bold color-primary" style="padding:10px 14px">${item.stats ? item.stats.ga : '-'}</td>
    </tr>
  `).join('');

  return `
    <div class="data-table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>Season</th>
            <th>MVP</th>
            <th>Team</th>
            <th class="text-center">Goals</th>
            <th class="text-center">Assists</th>
            <th class="text-center">G+A</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}
