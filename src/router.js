// ============================================================
// DreamStats — Hash-based SPA Router
// ============================================================

export class Router {
  constructor(routes) {
    this.routes = routes; // Array of { pattern, handler }
    this._onRouteChange = null;
    window.addEventListener('hashchange', () => this._resolve());
  }

  // Navigate to a hash path
  static navigate(path) {
    window.location.hash = path;
  }

  // Get current hash path
  static currentPath() {
    return window.location.hash.slice(1) || '/';
  }

  // Start listening
  start() {
    this._resolve();
  }

  // Set a callback for route changes
  onRouteChange(cb) {
    this._onRouteChange = cb;
  }

  // Resolve the current hash to a route
  _resolve() {
    const path = Router.currentPath();
    for (const route of this.routes) {
      const match = this._matchPattern(route.pattern, path);
      if (match !== null) {
        if (this._onRouteChange) {
          this._onRouteChange(route, match);
        }
        route.handler(match);
        return;
      }
    }
    // Fallback: navigate to home
    Router.navigate('/');
  }

  // Match a pattern like '/players/:slug' against '/players/alex-morgan'
  // Returns params object or null
  _matchPattern(pattern, path) {
    // Normalize
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    if (patternParts.length !== pathParts.length) return null;

    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }
    return params;
  }
}

// Helper to create clickable hash links
export function hashLink(path, text, className = '', attrs = '') {
  return `<a href="#${path}" class="${className}" ${attrs}>${text}</a>`;
}
