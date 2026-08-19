// ============================================================
// DreamStats — Calculation Utilities
// ============================================================
// Pure functions for deriving stats. Never mutates data.
// All rate stats are rounded to 2 decimal places.
// ============================================================

import { players, seasons, getTeam, getPlayer, getSeason } from './data.js';

// ── Basic calculations ──────────────────────────────────────

export function safeDiv(a, b, decimals = 2) {
  if (!b || b === 0) return 0;
  return parseFloat((a / b).toFixed(decimals));
}

export function calcGA(goals, assists) {
  return (goals || 0) + (assists || 0);
}

export function calcGoalsPerGame(goals, games) {
  return safeDiv(goals, games);
}

export function calcAssistsPerGame(assists, games) {
  return safeDiv(assists, games);
}

export function calcGAPerGame(goals, assists, games) {
  return safeDiv(calcGA(goals, assists), games);
}

// ── Player career stats ─────────────────────────────────────

export function getCareerStats(player) {
  const stats = player.seasonStats;
  const games = stats.reduce((sum, s) => sum + s.games, 0);
  const goals = stats.reduce((sum, s) => sum + s.goals, 0);
  const assists = stats.reduce((sum, s) => sum + s.assists, 0);
  return {
    games,
    goals,
    assists,
    ga: calcGA(goals, assists),
    goalsPerGame: calcGoalsPerGame(goals, games),
    assistsPerGame: calcAssistsPerGame(assists, games),
    gaPerGame: calcGAPerGame(goals, assists, games),
    seasonsPlayed: stats.length,
  };
}

// ── Player season stats (enriched) ──────────────────────────

export function getEnrichedSeasonStats(player) {
  return player.seasonStats.map(s => {
    const season = getSeason(s.seasonId);
    const ga = calcGA(s.goals, s.assists);
    return {
      ...s,
      seasonName: season ? season.name : s.seasonId,
      seasonSlug: season ? season.slug : s.seasonId,
      ga,
      goalsPerGame: calcGoalsPerGame(s.goals, s.games),
      assistsPerGame: calcAssistsPerGame(s.assists, s.games),
      gaPerGame: calcGAPerGame(s.goals, s.assists, s.games),
    };
  });
}

// ── Player season bests ─────────────────────────────────────

export function getSeasonBests(player) {
  const enriched = getEnrichedSeasonStats(player);
  if (enriched.length === 0) {
    return { bestGoals: null, bestAssists: null, bestGA: null, bestGoalsPerGame: null, bestAssistsPerGame: null };
  }

  const best = (arr, key) => arr.reduce((best, s) => (s[key] > best[key] ? s : best), arr[0]);

  return {
    bestGoals: best(enriched, 'goals'),
    bestAssists: best(enriched, 'assists'),
    bestGA: best(enriched, 'ga'),
    bestGoalsPerGame: best(enriched, 'goalsPerGame'),
    bestAssistsPerGame: best(enriched, 'assistsPerGame'),
  };
}

// ── Season leaderboard ──────────────────────────────────────

export function getSeasonLeaderboard(seasonId, sortBy = 'goals') {
  const rows = [];
  for (const player of players) {
    const ss = player.seasonStats.find(s => s.seasonId === seasonId);
    if (!ss) continue;
    const team = getTeam(player.teamId);
    const ga = calcGA(ss.goals, ss.assists);
    rows.push({
      player,
      team,
      games: ss.games,
      goals: ss.goals,
      assists: ss.assists,
      ga,
      goalsPerGame: calcGoalsPerGame(ss.goals, ss.games),
      assistsPerGame: calcAssistsPerGame(ss.assists, ss.games),
      gaPerGame: calcGAPerGame(ss.goals, ss.assists, ss.games),
    });
  }

  // Sort descending by chosen field
  const sortKey = {
    goals: 'goals',
    assists: 'assists',
    ga: 'ga',
    goalsPerGame: 'goalsPerGame',
    assistsPerGame: 'assistsPerGame',
    gaPerGame: 'gaPerGame',
    games: 'games',
  }[sortBy] || 'goals';

  rows.sort((a, b) => b[sortKey] - a[sortKey]);
  return rows;
}

// ── Season overview (top scorer, top assists, top G+A, MVP) ─

export function getSeasonOverview(seasonId) {
  const leaderboard = getSeasonLeaderboard(seasonId, 'goals');
  const season = getSeason(seasonId);
  if (!season) return null;

  const mvpPlayer = season.mvpPlayerId ? getPlayer(season.mvpPlayerId) : null;
  const topScorer = leaderboard.length > 0 ? leaderboard[0] : null;

  const byAssists = [...leaderboard].sort((a, b) => b.assists - a.assists);
  const topAssists = byAssists.length > 0 ? byAssists[0] : null;

  const byGA = [...leaderboard].sort((a, b) => b.ga - a.ga);
  const topGA = byGA.length > 0 ? byGA[0] : null;

  return {
    season,
    mvpPlayer,
    mvpTeam: mvpPlayer ? getTeam(mvpPlayer.teamId) : null,
    mvpSeasonStats: mvpPlayer ? mvpPlayer.seasonStats.find(s => s.seasonId === seasonId) : null,
    topScorer,
    topAssists,
    topGA,
    leaderboard,
  };
}

// ── Team season stats ───────────────────────────────────────

export function getTeamSeasonStats(teamId, seasonId) {
  const teamPlayers = players.filter(p => p.teamId === teamId);
  let totalGames = 0, totalGoals = 0, totalAssists = 0;
  const playerRows = [];

  for (const player of teamPlayers) {
    const ss = player.seasonStats.find(s => s.seasonId === seasonId);
    if (!ss) continue;
    totalGames += ss.games;
    totalGoals += ss.goals;
    totalAssists += ss.assists;
    playerRows.push({
      player,
      ...ss,
      ga: calcGA(ss.goals, ss.assists),
      goalsPerGame: calcGoalsPerGame(ss.goals, ss.games),
      assistsPerGame: calcAssistsPerGame(ss.assists, ss.games),
    });
  }

  playerRows.sort((a, b) => b.goals - a.goals);

  return {
    totalGames,
    totalGoals,
    totalAssists,
    totalGA: calcGA(totalGoals, totalAssists),
    playerRows,
  };
}

// ── Records ─────────────────────────────────────────────────

export function getSingleSeasonRecords() {
  const records = {
    mostGoals: [],
    mostAssists: [],
    mostGA: [],
    bestGoalsPerGame: [],
    bestAssistsPerGame: [],
  };

  for (const player of players) {
    const team = getTeam(player.teamId);
    for (const ss of player.seasonStats) {
      const season = getSeason(ss.seasonId);
      const entry = {
        player,
        team,
        season,
        games: ss.games,
        goals: ss.goals,
        assists: ss.assists,
        ga: calcGA(ss.goals, ss.assists),
        goalsPerGame: calcGoalsPerGame(ss.goals, ss.games),
        assistsPerGame: calcAssistsPerGame(ss.assists, ss.games),
      };
      records.mostGoals.push(entry);
      records.mostAssists.push(entry);
      records.mostGA.push(entry);
      // Only include players with minimum 5 games for rate records
      if (ss.games >= 5) {
        records.bestGoalsPerGame.push(entry);
        records.bestAssistsPerGame.push(entry);
      }
    }
  }

  records.mostGoals.sort((a, b) => b.goals - a.goals);
  records.mostAssists.sort((a, b) => b.assists - a.assists);
  records.mostGA.sort((a, b) => b.ga - a.ga);
  records.bestGoalsPerGame.sort((a, b) => b.goalsPerGame - a.goalsPerGame);
  records.bestAssistsPerGame.sort((a, b) => b.assistsPerGame - a.assistsPerGame);

  // Top 5 for each
  for (const key of Object.keys(records)) {
    records[key] = records[key].slice(0, 5);
  }

  return records;
}

export function getCareerRecords() {
  const records = {
    mostGoals: [],
    mostAssists: [],
    mostGA: [],
    mostMVPs: [],
  };

  for (const player of players) {
    const career = getCareerStats(player);
    const team = getTeam(player.teamId);
    records.mostGoals.push({ player, team, value: career.goals, games: career.games });
    records.mostAssists.push({ player, team, value: career.assists, games: career.games });
    records.mostGA.push({ player, team, value: career.ga, games: career.games });
  }

  // MVP counts
  const mvpCounts = {};
  for (const season of seasons) {
    if (season.mvpPlayerId) {
      mvpCounts[season.mvpPlayerId] = (mvpCounts[season.mvpPlayerId] || 0) + 1;
    }
  }
  for (const [playerId, count] of Object.entries(mvpCounts)) {
    const player = getPlayer(playerId);
    const team = player ? getTeam(player.teamId) : null;
    if (player) {
      records.mostMVPs.push({ player, team, value: count });
    }
  }

  records.mostGoals.sort((a, b) => b.value - a.value);
  records.mostAssists.sort((a, b) => b.value - a.value);
  records.mostGA.sort((a, b) => b.value - a.value);
  records.mostMVPs.sort((a, b) => b.value - a.value);

  for (const key of Object.keys(records)) {
    records[key] = records[key].slice(0, 5);
  }

  return records;
}

// ── MVP History ─────────────────────────────────────────────

export function getMVPHistory() {
  return seasons
    .filter(s => s.mvpPlayerId)
    .map(s => {
      const player = getPlayer(s.mvpPlayerId);
      const team = player ? getTeam(player.teamId) : null;
      const ss = player ? player.seasonStats.find(st => st.seasonId === s.id) : null;
      return {
        season: s,
        player,
        team,
        stats: ss ? {
          games: ss.games,
          goals: ss.goals,
          assists: ss.assists,
          ga: calcGA(ss.goals, ss.assists),
        } : null,
      };
    })
    .reverse(); // Most recent first
}

// ── Player achievements ─────────────────────────────────────

export function getPlayerAchievements(player) {
  const achievements = [];

  // MVP awards
  for (const season of seasons) {
    if (season.mvpPlayerId === player.id) {
      achievements.push({ type: 'mvp', icon: '🏆', text: `Season MVP — ${season.name}` });
    }
  }

  // Top scorer per season
  for (const season of seasons) {
    const lb = getSeasonLeaderboard(season.id, 'goals');
    if (lb.length > 0 && lb[0].player.id === player.id) {
      achievements.push({ type: 'top-scorer', icon: '🥇', text: `Top Scorer — ${season.name}` });
    }
  }

  // Top assists per season
  for (const season of seasons) {
    const lb = getSeasonLeaderboard(season.id, 'assists');
    if (lb.length > 0 && lb[0].player.id === player.id) {
      achievements.push({ type: 'top-assists', icon: '🥇', text: `Most Assists — ${season.name}` });
    }
  }

  return achievements;
}

// ── Player initials ─────────────────────────────────────────

export function getInitials(name) {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
