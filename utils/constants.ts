export const COOKIE_MAX_AGE_1_YEAR = 365 * 24 * 60 * 60;

export const ITEMS_PER_LIMIT = 10;
export const ITEMS_POST_HOMEPAGE_LIMIT = 5;
export const ITEMS_POST_SCHEDULE_LIMIT = 5;
export const ITEMS_PER_COMMENT = 10;
export const ITEMS_SCHEDULE_PER_SEARCH = 6;
export const ITEMS_POST_PER_SEARCH = 6;

export const SWIPE_POST_PER_LIMIT = 5;
export const CONFIG_ITEM_SCHEDULE_HOMEPAGE_LIMIT = 10;
export const CONFIG_ITEM_SCHEDULE_LIMIT = 10;
export const CATEGORY_TAG_POST_PER_LIMIT = 16;

export const LABEL_NEWS_LASTEST = "Tin mới nhất";
export const LABEL_NEWS_READMORE = "Xem thêm";
export const LABEL_NEWS_RECOMMENDED = "Tin đề xuất";

export const CATEGORY_ALL = {
  code: "all",
  icon: "tabler-xbox-a-filled",
  id: "categoty-all",
  name: "Tất cả",
  schedules: "",
};

export const USER_TYPE_CLIENT = 3;
export const USER_TYPE_COMMENTATOR = "1";

export const LIMIT_JWP_ERROR = 3;

export const SCREEN_WIDTH = {
  SM: 576,
  MD: 768,
  LG: 1024,
  LGG: 1076,
  XL: 1280,
  XXL: 1920,
};

export const LIVESCORE_ACTIVE_TAB = {
  ALL: "all",
  HOT: "hot",
  LEAGUE: "league"
};

export const STATS_TECHNICAL = {
  1: "Goal",
  2: "Corner",
  3: "Yellow Card",
  4: "Red Card",
  5: "Offside",
  6: "Direct Free Kick",
  7: "Goal",
  8: "Penalty",
  9: "Substitution",
  10: "Start",
  11: "Midfielder",
  12: "End",
  13: "Half-time score",
  15: "Card upgrade confirmed",
  16: "Missed Penalty",
  17: "Own goal",
  19: "Injury time",
  21: "Shot on target",
  22: "Shot off target",
  23: "Attack",
  24: "Dangerous Attack",
  25: "TL ball control",
  26: "Injury time",
  27: "Penalty penalty",
  28: "VAR",
  29: "Foul",
  30: "Dangerous foul",
};

export const ODD_COMPANY_DEFAULT = 1; // BET365 - thesports = 2
export const ISPORT_COMPANY_DEFAULT = 8; // BET365 - thesports = 2
export const ODD_COMPANY_DEFAULT_LIVESCORE = 21; // BET365 - thesports = 2

export const ODD_COMPANYS = [
  {
    id: 1,
    name: "BET365",
    thesports: 2,
    isportsapi: 8,
  },
  {
    id: 2,
    name: "Crown",
    thesports: 3,
    isportsapi: 3,
  },
  {
    id: 3,
    name: "10BET",
    thesports: 4,
    isportsapi: 22,
  },
  {
    id: 4,
    name: "Ladbrokes",
    thesports: 5,
    isportsapi: 4,
  },
  {
    id: 5,
    name: "Mansion88",
    thesports: 6,
    isportsapi: 17,
  },
  {
    id: 6,
    name: "Macauslot",
    thesports: 7,
    isportsapi: 1,
  },
  {
    id: 7,
    name: "SNAI",
    thesports: 8,
    isportsapi: 7,
  },
  {
    id: 8,
    name: "William Hill",
    thesports: 9,
    isportsapi: 9,
  },
  {
    id: 9,
    name: "Easybets",
    thesports: 10,
    isportsapi: 12,
  },
  {
    id: 10,
    name: "Vcbet",
    thesports: 11,
    isportsapi: 14,
  },
  {
    id: 11,
    name: "Interwetten",
    thesports: 13,
    isportsapi: 19,
  },
  {
    id: 12,
    name: "12bet",
    thesports: 14,
    isportsapi: 24,
  },
  {
    id: 13,
    name: "Sbobet",
    thesports: 15,
    isportsapi: 31,
  },
  {
    id: 14,
    name: "Wewbet",
    thesports: 16,
    isportsapi: 35,
  },
  {
    id: 15,
    name: "18Bet",
    thesports: 17,
    isportsapi: 42,
  },
  {
    id: 17,
    name: "188bet",
    thesports: 21,
    isportsapi: 23,
  },
  {
    id: 18,
    name: "Pinnacle",
    thesports: 22,
    isportsapi: 47,
  },
  {
    id: 19,
    name: "HK Jockey Club",
    thesports: null,
    isportsapi: 48,
  },
  {
    id: 20,
    name: "Bwin",
    thesports: null,
    isportsapi: 49,
  },
];
export const ODD_COMPANYS_LIVESCORE = [
  {
    id: 21,
    name: 'General',
    thesports: '',
    isportsapi: '',
  },
  ...ODD_COMPANYS
]

export const COMPANYS_H2H_DEFAULT_LIST = [
  1,
  13,
  17,
  5,
  2,
]

export const ODDS_LABEL = {
  europeanHaft: "europeanHaft",
  europeOdds: "europeOdds",
  handicap: "handicap",
  handicapHalf: "handicapHalf",
  overUnder: "overUnder",
  overUnderHalf: "overUnderHalf",
};

export const LIVESCORE_PAGE = {
  LIVESCORE: 'livescore',
  FAVORITES: 'favorites',
  RESULTS: 'results',
  SCHEDULE: 'schedule'
};

export const LIVESCORE_STATUS = {
  IS_LIVE: ['2', '3', '4', '5', '6', '7'],
  NOT_START: ['1'],
  NOT_LIVE: ['9', '10', '11', '12', '13'],
  IS_END: ['8'],
}

export const FAVORITES_TYPE = {
  MATCHES: 'matches',
  LEAGUES: 'leagues',
  TEAMS: 'teams'
};

export const MATCH_LIST_OPTION = [
  {
    key: 1,
    value: "1 ",
  },
  {
    key: 2,
    value: "2 ",
  },
  {
    key: 3,
    value: "3 ",
  },
  {
    key: 4,
    value: "4 ",
  },
  {
    key: 5,
    value: "5 ",
  },
  {
    key: 6,
    value: "6 ",
  },
  {
    key: 7,
    value: "7 ",
  },
  {
    key: 8,
    value: "8 ",
  },
  {
    key: 9,
    value: "9 ",
  },
  {
    key: 10,
    value: "10 ",
  },
  {
    key: 11,
    value: "11 ",
  },
  {
    key: 12,
    value: "12 ",
  },
  {
    key: 13,
    value: "13 ",
  },
  {
    key: 14,
    value: "14 ",
  },
  {
    key: 15,
    value: "15 ",
  },
  {
    key: 16,
    value: "16 ",
  },
  {
    key: 17,
    value: "17 ",
  },
  {
    key: 18,
    value: "18  ",
  },
  {
    key: 19,
    value: "19 ",
  },
  {
    key: 20,
    value: "20 ",
  },
]

export const TABLE_STANDING_LIST = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
  9: "I",
  10: "J",
  11: "K",
  12: "L",
  13: "M",
  14: "N",
  15: "O",
  16: "P",
};

export const MATCH_ODD_TAB = {
  ODDSCOMP: 'oddscomp',
  ASIAN_HANDICAP_ODDS: 'asian_handicap_odds',
  OVER_UNDER_ODDS: 'over_under_odds',
  ODDS_1X2: 'odds_1x2',
  CORNER_OU_ODDS: 'corner_ou_odds',
  CORRECT_SCORE_ODDS: 'correct_score_odds',
  EURO_HANDICAP_ODDS: 'euro_handicap_odds',
  DOUBLE_CHANCE_ODDS: 'double_chance_odds',
  STATISTICAL: 'playertech'
};

export const MATCH_TAB = {
  DETAIL: 'live',
  H2H: 'h2h',
  ODDS: 'odds',
  ...MATCH_ODD_TAB
};

export const WAREHOUSE_LEAGUE_TAB = {
  SCHEDULE: 'schedule',
  STANDING: 'standing',
};

export const BREADCRUMBS_MAP = {
  'bong da': "Trang chủ",
  'theo doi': "Theo dõi",
  'ket qua bong da': "Kết quả",
  'lich thi dau': "Lịch thi đấu",
  'tin tuc': "Tin tức",
  'nhan dinh': "Nhận định",
  'tin nong': "Tin nóng",
  'tin the thao': "Tin thể thao",
  'tin cau thu': "Tin Cầu Thủ",
  'doi': 'Đội',
  'giai dau': "Giải đấu",
  'dang nhap': "Đăng nhập",
  'dang ky': "Đăng ký",
  'football': "Home page",
  'favourites': "Favourites",
  'results': "Results",
  'schedule': "Schedule",
  'news': "News",
  'league': 'League',
  'fleagues': 'League',
  'tag': 'News',
  'login': "Login",
  'register': "Register",
  'fteams': "Team",
}

export const POST_TYPE = {
  POST: 'post',
  PAGE: 'page',
};

export const TABLE_TEAM = {
  FREE_PLAYER : 'Free player'
}

export const TIME_ZONE_LIST = [
  {
    key: "Tự động",
    value: "",
  },
  {
    key: "GMT -11",
    value: "GMT-11:00",
  },
  {
    key: "GMT -10",
    value: "GMT-10:00",
  },
  {
    key: "GMT -9",
    value: "GMT-09:00",
  },
  {
    key: "GMT -8",
    value: "GMT-08:00",
  },
  {
    key: "GMT -7",
    value: "GMT-07:00",
  },
  {
    key: "GMT -6",
    value: "GMT-06:00",
  },
  {
    key: "GMT -5",
    value: "GMT-05:00",
  },
  {
    key: "GMT -4.5",
    value: "GMT-04:30",
  },
  {
    key: "GMT -4",
    value: "GMT-04:00",
  },
  {
    key: "GMT -3.5",
    value: "GMT-03:30",
  },
  {
    key: "GMT -3",
    value: "GMT-03:00",
  },
  {
    key: "GMT -2",
    value: "GMT-02:00",
  },
  {
    key: "GMT -1",
    value: "GMT-01:00",
  },
  {
    key: "GMT 0",
    value: "GMT+00:00",
  },
  {
    key: "GMT +1",
    value: "GMT+01:00",
  },
  {
    key: "GMT +2",
    value: "GMT+02:00",
  },
  {
    key: "GMT +3",
    value: "GMT+03:00",
  },
  {
    key: "GMT +3.5",
    value: "GMT+03:30",
  },
  {
    key: "GMT +4",
    value: "GMT+04:00",
  },
  {
    key: "GMT +5",
    value: "GMT+05:00",
  },
  {
    key: "GMT +5.5",
    value: "GMT+05:30",
  },
  {
    key: "GMT +5.75",
    value: "GMT+05:45",
  },
  {
    key: "GMT +6",
    value: "GMT+06:00",
  },
  {
    key: "GMT +6.5",
    value: "GMT+06:30",
  },
  {
    key: "GMT +7",
    value: "GMT+07:00",
  },
  {
    key: "GMT +8",
    value: "GMT+08:00",
  },
  {
    key: "GMT +9",
    value: "GMT+09:00",
  },
  {
    key: "GMT +9.5",
    value: "GMT+09:30",
  },
  {
    key: "GMT +10",
    value: "GMT+10:00",
  },
  {
    key: "GMT +10.5",
    value: "GMT+10:30",
  },
  {
    key: "GMT +11",
    value: "GMT+11:00",
  },
  {
    key: "GMT +12",
    value: "GMT+12:00",
  },
  {
    key: "GMT +13",
    value: "GMT+13:00",
  },
]