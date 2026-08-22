// ============================================================
// DreamStats — Centralized Data Store
// ============================================================

export const APP_NAME = 'DREAM STATS';

const SAIBOYS_LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXtKF3R5ata5jniubHLAcutIEr81buddCAJOAAwsvtU5gfUAtDdQzv_sKQMJDL3Pu09voBDKzrsOZKDzCgBfByMVjfY7bLmXHengsA3TtyrMygDAUDr3OcqQEZtuI_B4_SSDW6NXyuVYc-0qBA9FRAZOSyWYNP6qYUE7gF7N0i5U_fpSVjMj3USB-zveiatJnC4WFn1S8MWtyMRHOiEw1RdT7kkaj9IvJuYrcJspvSdHVSXpnVyytF1A';
const STAGS_LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxPGMLejI2pHmNmb03zagF0esGaOxo_YFAgBMXffVD-abe5NDDXrTDtzCTjcISCxQFhG59-1rNjoD8YIPl7sg_cG_yknOEPh9vYuWm2JI_TV1f2v0jRD6ZEYP7ymws3esXxr2LayzDv2K6e_Zhq4yhMuUPJY4srBnSNDeKzdQb2kVw3d6HvUMmAgLLa9FctTDV2oXRm5nno09zcS4upLWwVeK4_GDT8QVw70MpGlIC8O0Wn6_Antp7_w';
export const BRAND_LOGO = 'https://lh3.googleusercontent.com/aida/AP1WRLvcdSl-s1owthSldzYX_Ji4UA0x5m_dOizmC5kdId0vwv2fOt5goAOURIohTDa4TflEjdiRfgzECaulHsauFIQUFX1nkO0_0gl7rXaDzBnHdIW-b6Ddz2nI3L0pGnexREcSMoMUGef9GQDhO5sUlf67ZHr7agEgjb4y3MXdZDPLnN2FDdh4goxf1trq4OLQHdWr1AA8FrM9i7oqfGpBLvUdBWeEJEVjiOzWk4mtP39DcOyhShnI4zCIaqI';

export const teams = [
  {
    id: 'saiboys-united',
    name: 'Saiboys United',
    shortName: 'SAI',
    slug: 'saiboys-united',
    logo: SAIBOYS_LOGO,
    description: 'Founded in 2024, Saiboys United bring flair, pace, and relentless attacking football. Known for their golden crest and passionate fanbase.',
  },
  {
    id: 'central-stags',
    name: 'Central Stags',
    shortName: 'CST',
    slug: 'central-stags',
    logo: STAGS_LOGO,
    description: 'Central Stags are built on a tradition of tactical discipline and creative midfield play. The shield and stag emblem represent strength and precision.',
  },
];

export const seasons = [
  { id: 'season-1', name: 'Season 1', slug: 'season-1', status: 'completed', mvpPlayerId: 'haaland' },
  { id: 'season-2', name: 'Season 2', slug: 'season-2', status: 'completed', mvpPlayerId: 'haaland' },
  { id: 'season-3', name: 'Season 3', slug: 'season-3', status: 'completed', mvpPlayerId: 'haaland' },
  { id: 'season-4', name: 'Season 4', slug: 'season-4', status: 'completed', mvpPlayerId: 'haaland' },
  { id: 'season-5', name: 'Season 5', slug: 'season-5', status: 'completed', mvpPlayerId: 'haaland' },
  { id: 'season-6', name: 'Season 6', slug: 'season-6', status: 'active', mvpPlayerId: 'dembele' },
];

export const players = [
  {
    "id": "haaland",
    "name": "Haaland",
    "slug": "haaland",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 18,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 55,
        "assists": 8
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 43,
        "assists": 13
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 43,
        "assists": 11
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 65,
        "assists": 16
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 58,
        "assists": 27
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 52,
        "assists": 28
      }
    ]
  },
  {
    "id": "openda",
    "name": "Openda",
    "slug": "openda",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 52,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 19,
        "assists": 21
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 14,
        "assists": 13
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 2,
        "assists": 13
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 11,
        "assists": 14
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 2,
        "assists": 7
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 3,
        "assists": 8
      }
    ]
  },
  {
    "id": "zaccagni",
    "name": "Zaccagni",
    "slug": "zaccagni",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 54,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 15,
        "assists": 10
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 1,
        "assists": 3
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 1,
        "assists": 0
      }
    ]
  },
  {
    "id": "minteh",
    "name": "Minteh",
    "slug": "minteh",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 92,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 2,
        "assists": 8
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 1,
        "assists": 0
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 2,
        "assists": 9
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 1,
        "assists": 2
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 5,
        "assists": 11
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 4,
        "assists": 6
      }
    ]
  },
  {
    "id": "enzo",
    "name": "Enzo",
    "slug": "enzo",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 27,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 0,
        "assists": 3
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 6,
        "assists": 3
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 4,
        "assists": 3
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 1,
        "assists": 1
      }
    ]
  },
  {
    "id": "barrios",
    "name": "Barrios",
    "slug": "barrios",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 76,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 7,
        "assists": 9
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 0,
        "assists": 5
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 1,
        "assists": 3
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 0,
        "assists": 1
      }
    ]
  },
  {
    "id": "van-dijk",
    "name": "Van dijk",
    "slug": "van-dijk",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 15,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 2,
        "assists": 4
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 3,
        "assists": 2
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 0,
        "assists": 1
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 0,
        "assists": 3
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 0,
        "assists": 3
      }
    ]
  },
  {
    "id": "upamecano",
    "name": "Upamecano",
    "slug": "upamecano",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 59,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 0,
        "assists": 5
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 0,
        "assists": 1
      }
    ]
  },
  {
    "id": "robinson",
    "name": "Robinson",
    "slug": "robinson",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 9,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 1,
        "assists": 2
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 2,
        "assists": 3
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 0,
        "assists": 3
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 4,
        "assists": 5
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 6,
        "assists": 10
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 2,
        "assists": 5
      }
    ]
  },
  {
    "id": "shick",
    "name": "Shick",
    "slug": "shick",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 57,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 4,
        "assists": 1
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 7,
        "assists": 5
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 1,
        "assists": 3
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 3,
        "assists": 4
      }
    ]
  },
  {
    "id": "van-de-ven",
    "name": "Van de ven",
    "slug": "van-de-ven",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 39,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 0,
        "assists": 1
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 1,
        "assists": 2
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 0,
        "assists": 3
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 1,
        "assists": 3
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 2,
        "assists": 5
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 1,
        "assists": 4
      }
    ]
  },
  {
    "id": "emegha",
    "name": "Emegha",
    "slug": "emegha",
    "teamId": "central-stags",
    "position": "Player",
    "number": 19,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 33,
        "assists": 17
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 23,
        "assists": 5
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 26,
        "assists": 11
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 54,
        "assists": 28
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 45,
        "assists": 25
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 54,
        "assists": 26
      }
    ]
  },
  {
    "id": "cherki",
    "name": "Cherki",
    "slug": "cherki",
    "teamId": "central-stags",
    "position": "Player",
    "number": 78,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 6,
        "assists": 11
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 3,
        "assists": 6
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 3,
        "assists": 2
      }
    ]
  },
  {
    "id": "barcola",
    "name": "Barcola",
    "slug": "barcola",
    "teamId": "central-stags",
    "position": "Player",
    "number": 31,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 19,
        "assists": 17
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 7,
        "assists": 6
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 3,
        "assists": 0
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 31,
        "assists": 23
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 4,
        "assists": 3
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 14,
        "assists": 7
      }
    ]
  },
  {
    "id": "vitinhia",
    "name": "Vitinhia",
    "slug": "vitinhia",
    "teamId": "central-stags",
    "position": "Player",
    "number": 46,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 4,
        "assists": 4
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 2,
        "assists": 3
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 2,
        "assists": 2
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 0,
        "assists": 6
      }
    ]
  },
  {
    "id": "man",
    "name": "Man",
    "slug": "man",
    "teamId": "central-stags",
    "position": "Player",
    "number": 36,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 8,
        "assists": 3
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 6,
        "assists": 3
      }
    ]
  },
  {
    "id": "rudiger",
    "name": "Rudiger",
    "slug": "rudiger",
    "teamId": "central-stags",
    "position": "Player",
    "number": 42,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 0,
        "assists": 1
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 0,
        "assists": 1
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 0,
        "assists": 1
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 1,
        "assists": 1
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 0,
        "assists": 3
      }
    ]
  },
  {
    "id": "boungiornio",
    "name": "Boungiornio",
    "slug": "boungiornio",
    "teamId": "central-stags",
    "position": "Player",
    "number": 40,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 3,
        "assists": 2
      }
    ]
  },
  {
    "id": "bastoni",
    "name": "Bastoni",
    "slug": "bastoni",
    "teamId": "central-stags",
    "position": "Player",
    "number": 98,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 1,
        "assists": 3
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 1,
        "assists": 0
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 0,
        "assists": 1
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 1,
        "assists": 1
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 0,
        "assists": 2
      }
    ]
  },
  {
    "id": "de-bruyne",
    "name": "De Bruyne",
    "slug": "de-bruyne",
    "teamId": "central-stags",
    "position": "Player",
    "number": 74,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 0,
        "assists": 5
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 1,
        "assists": 1
      }
    ]
  },
  {
    "id": "rabiot",
    "name": "Rabiot",
    "slug": "rabiot",
    "teamId": "central-stags",
    "position": "Player",
    "number": 48,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 1,
        "assists": 2
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 0,
        "assists": 2
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 2,
        "assists": 4
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 1,
        "assists": 1
      }
    ]
  },
  {
    "id": "doku",
    "name": "Doku",
    "slug": "doku",
    "teamId": "central-stags",
    "position": "Player",
    "number": 19,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-1",
        "games": 40,
        "goals": 1,
        "assists": 2
      },
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 9,
        "assists": 8
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 0,
        "assists": 2
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 1,
        "assists": 6
      }
    ]
  },
  {
    "id": "pulisic",
    "name": "Pulisic",
    "slug": "pulisic",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 81,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 7,
        "assists": 3
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 3,
        "assists": 6
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 7,
        "assists": 12
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 11,
        "assists": 5
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 7,
        "assists": 7
      }
    ]
  },
  {
    "id": "alisson",
    "name": "Alisson",
    "slug": "alisson",
    "teamId": "central-stags",
    "position": "Goalkeeper",
    "number": 14,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 0,
        "assists": 1
      }
    ]
  },
  {
    "id": "cash",
    "name": "Cash",
    "slug": "cash",
    "teamId": "central-stags",
    "position": "Player",
    "number": 81,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 0,
        "assists": 3
      }
    ]
  },
  {
    "id": "frimpong",
    "name": "Frimpong",
    "slug": "frimpong",
    "teamId": "central-stags",
    "position": "Player",
    "number": 17,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 0,
        "assists": 1
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 6,
        "assists": 5
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 4,
        "assists": 14
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 6,
        "assists": 17
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 7,
        "assists": 4
      }
    ]
  },
  {
    "id": "buongiorno",
    "name": "Buongiorno",
    "slug": "buongiorno",
    "teamId": "central-stags",
    "position": "Player",
    "number": 68,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 1,
        "assists": 0
      }
    ]
  },
  {
    "id": "schalde",
    "name": "Schalde",
    "slug": "schalde",
    "teamId": "central-stags",
    "position": "Player",
    "number": 7,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 0,
        "assists": 1
      }
    ]
  },
  {
    "id": "alt-nouri",
    "name": "Alt Nouri",
    "slug": "alt-nouri",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 95,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-2",
        "games": 35,
        "goals": 0,
        "assists": 4
      },
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 0,
        "assists": 1
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 0,
        "assists": 1
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 1,
        "assists": 0
      }
    ]
  },
  {
    "id": "mbeumo",
    "name": "Mbeumo",
    "slug": "mbeumo",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 96,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 29,
        "assists": 10
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 13,
        "assists": 11
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 1,
        "assists": 0
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 1,
        "assists": 2
      }
    ]
  },
  {
    "id": "carvajal",
    "name": "Carvajal",
    "slug": "carvajal",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 7,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 0,
        "assists": 2
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 0,
        "assists": 2
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 0,
        "assists": 1
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 0,
        "assists": 1
      }
    ]
  },
  {
    "id": "leao",
    "name": "Leao",
    "slug": "leao",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 24,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 3,
        "assists": 3
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 0,
        "assists": 5
      }
    ]
  },
  {
    "id": "wirtz",
    "name": "Wirtz",
    "slug": "wirtz",
    "teamId": "central-stags",
    "position": "Player",
    "number": 54,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 3,
        "assists": 12
      }
    ]
  },
  {
    "id": "woltemade",
    "name": "Woltemade",
    "slug": "woltemade",
    "teamId": "central-stags",
    "position": "Player",
    "number": 18,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 18,
        "assists": 10
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 4,
        "assists": 1
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 0,
        "assists": 1
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 2,
        "assists": 3
      }
    ]
  },
  {
    "id": "sesko",
    "name": "Sesko",
    "slug": "sesko",
    "teamId": "central-stags",
    "position": "Player",
    "number": 26,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 1,
        "assists": 0
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 4,
        "assists": 1
      }
    ]
  },
  {
    "id": "frendrup",
    "name": "Frendrup",
    "slug": "frendrup",
    "teamId": "central-stags",
    "position": "Player",
    "number": 31,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 2,
        "assists": 3
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 5,
        "assists": 9
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 3,
        "assists": 7
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 2,
        "assists": 6
      }
    ]
  },
  {
    "id": "palmer",
    "name": "Palmer",
    "slug": "palmer",
    "teamId": "central-stags",
    "position": "Player",
    "number": 99,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 1,
        "assists": 0
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 1,
        "assists": 0
      }
    ]
  },
  {
    "id": "bouroginous",
    "name": "Bouroginous",
    "slug": "bouroginous",
    "teamId": "central-stags",
    "position": "Player",
    "number": 23,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-3",
        "games": 38,
        "goals": 1,
        "assists": 1
      },
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 0,
        "assists": 1
      }
    ]
  },
  {
    "id": "kolo-muani",
    "name": "Kolo Muani",
    "slug": "kolo-muani",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 76,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 1,
        "assists": 4
      }
    ]
  },
  {
    "id": "ronaldo",
    "name": "Ronaldo",
    "slug": "ronaldo",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 68,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 2,
        "assists": 1
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 2,
        "assists": 0
      }
    ]
  },
  {
    "id": "timber",
    "name": "Timber",
    "slug": "timber",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 51,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-4",
        "games": 48,
        "goals": 0,
        "assists": 4
      },
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 1,
        "assists": 1
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 1,
        "assists": 2
      }
    ]
  },
  {
    "id": "dembele",
    "name": "Dembele",
    "slug": "dembele",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 90,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 41,
        "assists": 31
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 48,
        "assists": 32
      }
    ]
  },
  {
    "id": "vini-jr",
    "name": "Vini jr",
    "slug": "vini-jr",
    "teamId": "saiboys-united",
    "position": "Player",
    "number": 64,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 3,
        "assists": 0
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 2,
        "assists": 0
      }
    ]
  },
  {
    "id": "olise",
    "name": "Olise",
    "slug": "olise",
    "teamId": "central-stags",
    "position": "Player",
    "number": 59,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 35,
        "assists": 22
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 22,
        "assists": 15
      }
    ]
  },
  {
    "id": "raphinia",
    "name": "Raphinia",
    "slug": "raphinia",
    "teamId": "central-stags",
    "position": "Player",
    "number": 94,
    "image": null,
    "seasonStats": [
      {
        "seasonId": "season-5",
        "games": 40,
        "goals": 4,
        "assists": 5
      },
      {
        "seasonId": "season-6",
        "games": 39,
        "goals": 0,
        "assists": 4
      }
    ]
  }
];

export function getTeam(teamId) { return teams.find(t => t.id === teamId) || null; }
export function getTeamBySlug(slug) { return teams.find(t => t.slug === slug) || null; }
export function getPlayer(playerId) { return players.find(p => p.id === playerId) || null; }
export function getPlayerBySlug(slug) { return players.find(p => p.slug === slug) || null; }
export function getSeason(seasonId) { return seasons.find(s => s.id === seasonId) || null; }
export function getSeasonBySlug(slug) { return seasons.find(s => s.slug === slug) || null; }
export function getCurrentSeason() { return seasons.find(s => s.status === 'active') || seasons[seasons.length - 1]; }
export function getTeamPlayers(teamId) { return players.filter(p => p.teamId === teamId); }
export function getPlayersInSeason(seasonId) { return players.filter(p => p.seasonStats.some(s => s.seasonId === seasonId)); }
