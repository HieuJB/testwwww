export const API_ROUTERS = {
  CONFIGURATIONS: '/oapi/v1/configurations',
  CONFIGURATIONS_BRAND: '/oapi/v1/configuration-brand',
  MENU: '/oapi/v1/menu',
  PAGE: {
    HOME_PAGE: '/oapi/v1/pages/home-page',
    SLUG: '/oapi/v1/pages/slug',
    ROUTER: '/oapi/v1/pages',
  },
  AUTH: {
    LOGIN: '/oapi/v1/auth/login',
    LOGOUT: '/oapi/v1/auth/logout',
    REGISTER: '/oapi/v1/auth/register',
  },
  POST: {
    LIST: '/oapi/v1/posts',
    SLUG: '/oapi/v1/posts/slug',
    TAG: {
      LIST: '/oapi/v1/tags/',
      SLUG: '/oapi/v1/tags/'
    },
    CATEGORY: {
      LIST: '/oapi/v1/categories',
      DETAIL:  '/oapi/v1/categories/',
      LIST_POST:  '/oapi/v1/categories/post',
    },
  },
  USER: {
    ME: '/oapi/v1/users/me'
  },
  COMMENTS: {
    SEND: '/comments',
    TREE: '/oapi/v1/comments/tree'
  },
  CATEGORY: {
    LIST: '/api/categories/',
    DETAIL:  '/api/categories/',
  },
  AUTHOR: {
    INFO: '/api/author'
  },
  LIVESCORE: {
    COUNTRIES: '/api/v1/countries',
    COMP: '/api/v1/comp',
    COMP_LIST: '/api/v1/comp-list',
    COMP_LIST_ALL: '/api/v1/comp-list-all',
    COMP_SEASON: '/api/v1/comp-season?lang=vi',
    MATCHS_LIVE: '/api/v1/matchs/live',
    MATCHS_RECENT: '/api/v1/matchs/recent',
    MATCHS_LIVE_DETAIL: '/api/v1/matchs/live/detail',
    MATCHS_CORNER: '/api/v1/matchs/corner',
    ODDS_CORNER_MAIN: '/api/v1/odds/conner/main',
    ODDS_DETAIL: '/api/v1/odds/detail',
    MATCHS_COMPANY_ODD: '/api/v1/matchs/company-odd',
    MATCH_RECENT_RESULT: '/api/v1/matchs/recent/result',
    MATCH_SEASON_RESULT: '/api/v1/matchs/season-result',
    SEASONS_TABLE_STANDING: '/api/v1/seasons/table-standing',
    MATCHS_ANALYSIS: '/api/v1/matchs/analysis',
    MATCHS_LINEUP: '/api/v1/matchs/lineup',
    MATCHS_RECENT_DETAIL: '/api/v1/matchs/recent-detail',
    MATCHES_ANALYSIS: '/api/v1/matchs/ianalysis',
    SEASONS_TABLE: '/api/v1/seasons/table',
    MATCHS_LAST_LINEUP: '/api/v1/matchs/last-lineup',
    ODDS_CHANGE_HISTORY: '/api/v1/odds/change/history',//https://www.isportsapi.com/docs.html?id=73
    ODDS_EUROHADICAP: '/api/v1/odds/eurohadicap',
    ODDS_CONNER_FULL: '/api/v1/odds/conner/full',
    ODDS_CONNER_HAFT: '/api/v1/odds/conner/haft',
    ODDS_CONNER_HISTORY_FULL: '/api/v1/odds/conner/history/full',
    ODDS_CONNER_HISTORY_HAFT: '/api/v1/odds/conner/history/haft',
    ODDS_CORRECT_SCORE: '/api/v1/odds/correct-score/prematch',
    ODDS_CORRECT_SCORE_HISTORY: '/api/v1/odds/correct-score/prematch/history',
    ODDS_EURO_HANDICAP_HISTORY: '/api/v1/odds/euro-hdc/change',
    ODDS_DOUBLE_CHANCE: '/api/v1/odds/double-change',
    ODDS_DOUBLE_CHANCE_HISTORY: '/api/v1/odds/double-change/history',
    ODDS_EUROPEAN: '/api/v1/odds/european',
    ODDS_EURO_HANDICAP_HISTORY1: '/api/v1/odds/european/history',
    ODDS_IMAIN: '/api/v1/odds/imain',
    ODDS_ALL_IMAIN: '/api/v1/odds/imain-all',
    TEAMS: '/api/v1/teams',
    COMPETITION_DETAIL: '/api/v1/comp',
    PLAYER_STATISTICS: '/api/v1/matchs/player/stats',
    LINEUP_TEAM: '/api/v1/teams-players',
    WAREHOUSE: '/api/v1/warehouse',
    SCHEDULE: '/api/v1/team-future-matches',
    OLD_SCHEDULE: '/api/v1/team-history-matches',
    TEAM_HONOR: '/api/v1/team-honor',
    SEASON_TRANSFER: '/api/v1/comp-detail',
    PLAYER_TRANSFER: '/api/v1/teams/transfer',
    PLAYER_POSITION: '/api/v1/players/detail',
    COMPETITION_SEASON: '/api/v1/teams/list-competitions',
    PLAYER_INFO: '/api/v1/teams/players/season-stats',
    MATCHES_BY_SEASON: '/api/v1/matchs/comp',
    COMP_DETAIL: '/api/v1/comp-detail',
    ODDS_SEASON_IMAIN: '/api/v1/odds/season/imain',
    PLAYER_DETAIL: '/api/v1/players/detail',
    PLAYER_TRANSFERS: '/api/v1/players/transfer',
    PLAYER_MATCH: '/api/v1/players/stats',
    PLAYER_HONOR: '/api/v1/players/honor',
    COACH_INFO: '/api/v1/coachs/detail',
    COACH_HONOR: '/api/v1/coachs/honor',
    TEAM_ACHIEVEMENT: '/api/v1/teams/near-year',
    PLAYER_COMPETITIONS: '/api/v1/players/competitions',
    PLAYER_PERFORMANCE: '/api/v1/players/stats-season',
    SEASONS_BEST_LINEUP: '/api/v1/seasons/best-lineup',
    TEAM_LIST: '/api/v1/teams/list',
    LIVE_MATCH: '/api/v1/matchs/live-match',
    PLAYER_LIST: '/api/v1/players/list',
    MATCHS_RECENT_SCHEDULE: '/api/v1/matchs/recent-schedules',
    MATCHS_RECENT_RESULT: '/api/v1/matchs/recent-result',
  },
  OBJECTS_META: {
    DETAIL: '/oapi/v1/objects-meta',
  },
  LANGUAGE: {
    LIST: '/oapi/v1/languages',
  }
} as const

export const ROUTERS_OLD = {
  HOMEPAGE: '/',
  LOGIN: '/dang-nhap',
  REGISTER: '/dang-ky',
  CATEGORY: '/danh-muc',
  NEWS_CATEGORY: '',
  NEWS_TAG: '/tag',
  NEWS: '',
  NEWS_PAGE: '/tin-tuc',
  SEARCH: '/tim-kiem',
  USER_PROFILE: '/thanh-vien/ho-so',
  FOOTBALL_RESULT: '/bong-da/ket-qua-bong-da',
  FOOTBALL_SCHEDULE: '/bong-da/lich-thi-dau',
  FOOTBALL_FAVORITES: '/bong-da/theo-doi',
  FOOTBALL_FAVORITES_LEAGUES: '/bong-da/theo-doi/giai-dau',
  FOOTBALL_FAVORITES_TEAMS: '/bong-da/theo-doi/doi',
  MATCH_DETAIL: '/match/',
  LEAGUES: '/league',
  FOOTBALL_LIVESCORE_TAB: '/?livescore_tab=',
  MATCH: '/match',
  FOOTBALL: '/bong-da',
  NEWS_CATEGORY_NAME: '/category_',
  PLAYER: '/player/',
  TEAM: '/team/',
  WAREHOUSE: '/warehouse',
  COACH: '/coach'
} as const

export const ROUTERS = {
  HOMEPAGE: 'HOMEPAGE',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  CATEGORY: 'CATEGORY',
  NEWS_CATEGORY: 'NEWS_CATEGORY',
  NEWS_TAG: 'NEWS_TAG',
  NEWS: 'NEWS',
  NEWS_PAGE: 'NEWS_PAGE',
  SEARCH: 'SEARCH',
  USER_PROFILE: 'USER_PROFILE',
  FOOTBALL_RESULT: 'FOOTBALL_RESULT',
  FOOTBALL_SCHEDULE: 'FOOTBALL_SCHEDULE',
  FOOTBALL_FAVORITES: 'FOOTBALL_FAVORITES',
  FOOTBALL_FAVORITES_LEAGUES: 'FOOTBALL_FAVORITES_LEAGUES',
  FOOTBALL_FAVORITES_TEAMS: 'FOOTBALL_FAVORITES_TEAMS',
  MATCH_DETAIL: 'MATCH_DETAIL',
  LEAGUES: 'LEAGUES',
  FOOTBALL_LIVESCORE_TAB: 'FOOTBALL_LIVESCORE_TAB',
  MATCH: 'MATCH',
  FOOTBALL: 'FOOTBALL',
  NEWS_CATEGORY_NAME: 'NEWS_CATEGORY_NAME',
  PLAYER: 'PLAYER',
  TEAM: 'TEAM',
  WAREHOUSE: 'WAREHOUSE',
  COACH: 'COACH'
} as const

export const ROUTERS_LANG = {
  HOMEPAGE: {
    vi: '/',
    en: '/',
  },
  LOGIN: {
    vi: '/dang-nhap',
    en: '/dang-nhap'
  },
  REGISTER: {
    vi: '/dang-ky',
    en: '/dang-ky', 
  },
  CATEGORY: {
    vi: '/danh-muc',
    en: '/danh-muc',
  },
  NEWS_CATEGORY: {
    vi: '',
    en: '',
  },
  NEWS_TAG: {
    vi: '/tag',
    en: '/tag',
  },
  NEWS: {
    vi: '',
    en: '',
  },
  NEWS_PAGE: {
    vi: '/tin-tuc',
    en: '/news',
  },
  SEARCH: {
    vi: '/tim-kiem',
    en: '/tim-kiem',
  },
  USER_PROFILE:  {
    vi: '/thanh-vien/ho-so',
    en: '/thanh-vien/ho-so',
  },
  FOOTBALL_RESULT: {
    vi: '/bong-da/ket-qua-bong-da',
    en: '/football/results'
  },
  FOOTBALL_SCHEDULE:  {
    vi: '/bong-da/lich-thi-dau',
    en: '/football/schedule'
  },
  FOOTBALL_FAVORITES: {
    vi: '/bong-da/theo-doi',
    en: '/football/favourites'
  },
  FOOTBALL_FAVORITES_LEAGUES: {
    vi: '/bong-da/theo-doi/giai-dau',
    en: '/football/favourites/fleagues'
  },
  FOOTBALL_FAVORITES_TEAMS: {
    vi:  '/bong-da/theo-doi/doi',
    en: '/football/favourites/fteams'
  },
  MATCH_DETAIL: {
    vi:  '/match/',
    en: '/match/',
  },
  LEAGUES: {
    vi: '/league',
    en: '/league',
  },
  FOOTBALL_LIVESCORE_TAB: {
    vi: '/?livescore_tab=',
    en: '/?livescore_tab=',
  },
  MATCH: {
    vi: '/match',
    en: '/match',
  }, 
  FOOTBALL: {
    vi: '/bong-da',
    en: '/bong-da',
  },
  NEWS_CATEGORY_NAME: {
    vi: '/category_',
    en: '/category_',
  }, 
  PLAYER: {
    vi: '/player/',
    en: '/player/',
  },
  TEAM: {
    vi: '/team/',
    en: '/team/',
  },
  WAREHOUSE: {
    vi: '/warehouse',
    en: '/warehouse',
  }, 
  COACH:  {
    vi: '/coach',
    en: '/coach'
  }, 
} as const

export const NAME_ROUTERS = {
  SLUG: 'slug',
  NEWS: 'NEWS',
  TAG: '/tag',
  NEWS_LIST: '/news',
  NEWS_CATEGORY: '/category_',
  NEWS_TAG: '/tag_',
  DETAIL_NEWS: '/detail-news',
  DETAIL_LEAGUE: 'league-league_id',
  LEAGUE: 'league',
  PLAYER: 'player',
  TEAM: 'team',
  MATCH: 'match',
  FAVORITES_TEAM: 'favourites_teams',
}

export const ROUTERS_GROUP = {
  MATCH: '/match/',
  ODDS: '/oddscomp/',
  ASIAN_HANDICAP_ODDS: '/asian-handicap-odds/',
  ODDS_1X2: '/1x2-odds/',
  OVER_UNDER_ODDS: '/over-under-odds/',
  CORNER_OU_ODDS: '/corner-ou-odds/',
  CORRECT_SCORE_ODDS: '/correct-score-odds/',
  EURO_HANDICAP_ODDS: '/euro-handicap-odds/',
  DOUBLE_CHANCE_ODDS: '/double-chance-odds/',
  LIVESCORE: [
    '/', '/bong-da/theo-doi', '/bong-da/ket-qua-bong-da', '/bong-da/lich-thi-dau', '/bong-da/theo-doi/giai-dau', '/bong-da/theo-doi/doi', 
    '/oddscomp/', '/asian-handicap-odds', '/over-under-odds', '/1x2-odds', '/corner-ou-odds', '/correct-score-odds', '/euro-handicap-odds', '/double-chance-odds'
  ],
  NEW: {

  },
  LEAGUE: '/league/'
} as const

export const ROUTER_TEAM_NAME = {
  SUMMARY : 'summary',
  TEAMSCHE : 'teamsche',
  LINEUP: 'lineup',
  PLAYERZH : 'playerzh',
  PLAYERDATA : 'playerdata',
  PLAYER: 'player',
  TEAM: 'team',
  COACH: 'coach',
  ACHIEVEMENTS: 'achievements'
}
