// ============================================================
// DreamStats — App Initialization
// ============================================================

import { Router } from './router.js';
import { renderNavSidebar, renderMobileHeader, renderBottomNav } from './components.js';

// ── Page imports ────────────────────────────────────────────
import { renderHomePage, setupHomePage } from './pages/home.js';
import { renderSeasonsPage, setupSeasonsPage } from './pages/seasons.js';
import { renderTeamsPage, setupTeamsPage } from './pages/teams.js';
import { renderPlayersPage, setupPlayersPage } from './pages/players.js';
import { renderPlayerProfilePage, setupPlayerProfilePage } from './pages/player-profile.js';
import { renderRecordsPage } from './pages/records.js';

// ── DOM references ──────────────────────────────────────────
const navContainer = document.getElementById('nav-container');
const mobileHeaderContainer = document.getElementById('mobile-header-container');
const pageContainer = document.getElementById('page-container');
const bottomNavContainer = document.getElementById('bottom-nav-container');

let currentPage = 'home';

// ── Update navigation ───────────────────────────────────────
function updateNav(page) {
  currentPage = page;
  navContainer.innerHTML = renderNavSidebar(page);
  mobileHeaderContainer.innerHTML = renderMobileHeader();
  bottomNavContainer.innerHTML = renderBottomNav(page);
}

// ── Render page with animation ──────────────────────────────
function renderPage(html) {
  pageContainer.classList.remove('page-enter');
  // Trigger reflow for animation restart
  void pageContainer.offsetWidth;
  pageContainer.innerHTML = html;
  pageContainer.classList.add('page-enter');
  // Scroll to top
  window.scrollTo(0, 0);
}

// ── Routes ──────────────────────────────────────────────────
const router = new Router([
  {
    pattern: '/',
    handler: () => {
      updateNav('home');
      renderPage(renderHomePage());
      setupHomePage();
    },
  },
  {
    pattern: '/home',
    handler: () => {
      updateNav('home');
      renderPage(renderHomePage());
      setupHomePage();
    },
  },
  {
    pattern: '/seasons',
    handler: () => {
      updateNav('seasons');
      renderPage(renderSeasonsPage());
      setupSeasonsPage();
    },
  },
  {
    pattern: '/seasons/:slug',
    handler: (params) => {
      updateNav('seasons');
      renderPage(renderSeasonsPage(params.slug));
      setupSeasonsPage();
    },
  },
  {
    pattern: '/teams',
    handler: () => {
      updateNav('teams');
      renderPage(renderTeamsPage());
      setupTeamsPage();
    },
  },
  {
    pattern: '/teams/:slug',
    handler: (params) => {
      updateNav('teams');
      renderPage(renderTeamsPage(params.slug));
      setupTeamsPage();
    },
  },
  {
    pattern: '/players',
    handler: () => {
      updateNav('players');
      renderPage(renderPlayersPage());
      setupPlayersPage();
    },
  },
  {
    pattern: '/players/:slug',
    handler: (params) => {
      updateNav('players');
      renderPage(renderPlayerProfilePage(params.slug));
      setupPlayerProfilePage();
    },
  },
  {
    pattern: '/records',
    handler: () => {
      updateNav('records');
      renderPage(renderRecordsPage());
    },
  },
]);

// ── Start ───────────────────────────────────────────────────
router.start();
