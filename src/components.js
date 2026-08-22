// ============================================================
// DreamStats — Reusable UI Components
// ============================================================

import { BRAND_LOGO, APP_NAME } from './data.js';
import { getInitials } from './utils.js';
import { hashLink } from './router.js';

// ── Navigation ──────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: 'home', path: '/' },
  { id: 'seasons', label: 'Seasons', icon: 'calendar_month', path: '/seasons' },
  { id: 'teams', label: 'Teams', icon: 'groups', path: '/teams' },
  { id: 'players', label: 'Players', icon: 'person', path: '/players' },
  { id: 'records', label: 'Records', icon: 'emoji_events', path: '/records' },
];

export function renderNavSidebar(activePage) {
  const items = NAV_ITEMS.map(item => {
    const isActive = item.id === activePage;
    return `
      <li class="nav-item ${isActive ? 'active' : ''}">
        <a href="#${item.path}">
          <span class="material-symbols-outlined">${item.icon}</span>
          <span>${item.label}</span>
        </a>
      </li>`;
  }).join('');

  return `
    <nav class="nav-sidebar" id="nav-sidebar">
      <div class="nav-brand">
        <img src="${BRAND_LOGO}" alt="${APP_NAME}" class="nav-brand-logo" onerror="this.style.display='none'">
        <span class="nav-brand-name">${APP_NAME}</span>
      </div>
      <ul class="nav-list">${items}</ul>
    </nav>`;
}

export function renderMobileHeader() {
  return `
    <header class="mobile-header">
      <div class="mobile-header-brand">
        <img src="${BRAND_LOGO}" alt="${APP_NAME}" class="mobile-header-logo" onerror="this.style.display='none'">
        <span class="mobile-header-title">${APP_NAME}</span>
      </div>
      <button onclick="document.getElementById('search-input')?.focus()" aria-label="Search">
        <span class="material-symbols-outlined" style="color:var(--primary)">search</span>
      </button>
    </header>`;
}

export function renderBottomNav(activePage) {
  const items = NAV_ITEMS.map(item => {
    const isActive = item.id === activePage;
    return `
      <a href="#${item.path}" class="bottom-nav-item ${isActive ? 'active' : ''}">
        <span class="material-symbols-outlined">${item.icon}</span>
        <span>${item.label}</span>
      </a>`;
  }).join('');

  return `<nav class="mobile-bottom-nav">${items}</nav>`;
}

// ── Avatars ─────────────────────────────────────────────────

export function renderAvatar(player, sizeClass = '') {
  if (player.image) {
    return `<img src="${player.image}" alt="${player.name}" class="avatar ${sizeClass}" style="object-fit:cover; border-radius:50%;" title="${player.name}">`;
  }
  
  // Only show the jersey for large display areas. Use initials for small tables.
  if (sizeClass === 'avatar-sm' || sizeClass === '') {
    const initials = getInitials(player.name);
    return `<div class="avatar ${sizeClass}" title="${player.name}">${initials}</div>`;
  }
  
  let primaryColor = '#1d3557';
  let highlightColor = '#e63946';
  
  if (player.teamId === 'saiboys-united') {
    primaryColor = '#e63946';
    highlightColor = '#ffffff';
  }
  
  const num = player.number || '';
  
  const svg = `
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30 15 C 30 15, 50 30, 70 15 L 95 35 L 85 55 L 75 45 L 75 95 L 25 95 L 25 45 L 15 55 L 5 35 Z" fill="${primaryColor}" />
      <path d="M 30 15 C 30 15, 50 30, 70 15" fill="none" stroke="${highlightColor}" stroke-width="4" stroke-linecap="round" />
      <path d="M 95 35 L 85 55" fill="none" stroke="${highlightColor}" stroke-width="4" stroke-linecap="round" />
      <path d="M 15 55 L 5 35" fill="none" stroke="${highlightColor}" stroke-width="4" stroke-linecap="round" />
      <path d="M 25 95 L 75 95" fill="none" stroke="${highlightColor}" stroke-width="4" stroke-linecap="round" />
      <text x="50" y="65" font-family="Inter, sans-serif" font-size="34" font-weight="900" fill="${highlightColor}" text-anchor="middle" dominant-baseline="middle">${num}</text>
    </svg>
  `;

  return `<div class="avatar ${sizeClass}" title="${player.name}" style="background: transparent; border: none; overflow: visible;">${svg}</div>`;
}

// ── Team Logos ───────────────────────────────────────────────

export function renderTeamLogo(team, sizeClass = 'team-logo-sm') {
  if (!team) return '';
  return `<img src="${team.logo}" alt="${team.name}" class="${sizeClass}" onerror="this.style.display='none'">`;
}

// ── Stat Card ───────────────────────────────────────────────

export function renderStatCard(label, value, colorClass = 'color-on-surface') {
  return `
    <div class="stat-card">
      <span class="text-label-caps stat-card-label">${label}</span>
      <span class="text-stat-large stat-card-value ${colorClass}">${value}</span>
    </div>`;
}

// ── Mini Stat Card (top scorer / assists style) ─────────────

export function renderMiniStatCard(label, name, value, colorClass, link) {
  const content = `
    <div class="mini-stat-card">
      <div>
        <span class="text-label-caps color-on-surface-variant" style="display:block;margin-bottom:4px">${label}</span>
        <div class="text-headline-md color-primary">${name}</div>
      </div>
      <div class="mini-stat-value">
        <span class="text-stat-large ${colorClass} text-mono-data">${value}</span>
      </div>
    </div>`;
  return link ? `<a href="#${link}" style="text-decoration:none">${content}</a>` : content;
}

// ── Season Tabs ─────────────────────────────────────────────

export function renderSeasonTabs(seasons, activeSeasonId, onClickAttr = 'data-season') {
  const tabs = seasons.map(s => `
    <button class="season-tab ${s.id === activeSeasonId ? 'active' : ''}"
            ${onClickAttr}="${s.id}">${s.name}</button>
  `).join('');
  return `<div class="season-tabs" id="season-tabs">${tabs}</div>`;
}

// ── Badge ───────────────────────────────────────────────────

export function renderBadge(text, type = 'mvp') {
  const iconMap = {
    mvp: '<span class="material-symbols-outlined" style="font-size:14px;font-variation-settings:\'FILL\' 1">workspace_premium</span>',
    scorer: '<span class="material-symbols-outlined" style="font-size:14px;font-variation-settings:\'FILL\' 1">workspace_premium</span>',
    assists: '<span class="material-symbols-outlined" style="font-size:14px;font-variation-settings:\'FILL\' 1">star</span>',
  };
  return `<span class="badge badge-${type}">${iconMap[type] || ''}${text}</span>`;
}

// ── Empty State ─────────────────────────────────────────────

export function renderEmptyState(message, icon = 'search_off') {
  return `
    <div class="empty-state">
      <span class="material-symbols-outlined">${icon}</span>
      <p class="text-body-md">${message}</p>
    </div>`;
}

// ── Section Header ──────────────────────────────────────────

export function renderSectionHeader(title, rightContent = '') {
  return `
    <div class="section-header">
      <h3 class="text-headline-sm color-on-surface-variant">${title}</h3>
      ${rightContent}
    </div>`;
}
