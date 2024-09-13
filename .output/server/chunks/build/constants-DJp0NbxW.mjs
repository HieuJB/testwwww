const ITEMS_PER_LIMIT = 10;
const CATEGORY_TAG_POST_PER_LIMIT = 16;
const LABEL_NEWS_READMORE = "Xem th\xEAm";
const SCREEN_WIDTH = {
  SM: 576,
  MD: 768,
  LG: 1024,
  LGG: 1076,
  XL: 1280,
  XXL: 1920
};
const LIVESCORE_ACTIVE_TAB = {
  ALL: "all",
  HOT: "hot",
  LEAGUE: "league"
};
const STATS_TECHNICAL = {
  1: "Ghi b\xE0n",
  2: "G\xF3c",
  3: "Th\u1EBB v\xE0ng",
  4: "Th\u1EBB \u0111\u1ECF",
  5: "Vi\u1EC7t v\u1ECB",
  6: "Ph\u1EA1t tr\u1EF1c ti\u1EBFp",
  7: "Ghi b\xE0n",
  8: "Penalty",
  9: "Thay ng\u01B0\u1EDDi",
  10: "B\u1EAFt \u0111\u1EA7u",
  11: "Ti\u1EC1n v\u1EC7",
  12: "K\u1EBFt th\xFAc",
  13: "T\u1EF7 s\u1ED1 gi\u1EEFa hi\u1EC7p",
  15: "X\xE1c nh\u1EADn n\xE2ng c\u1EA5p th\u1EBB",
  16: "Qu\u1EA3 ph\u1EA1t \u0111\u1EC1n b\u1ECB b\u1ECF l\u1EE1",
  17: "B\xE0n th\u1EAFng c\u1EE7a ri\xEAng m\xECnh",
  19: "Th\u1EDDi gian ch\u1EA5n th\u01B0\u01A1ng",
  21: "S\xFAt tr\xFAng",
  22: "S\xFAt kh\xF4ng tr\xFAng",
  23: "T\u1EA5n c\xF4ng",
  24: "T\u1EA5n c\xF4ng nguy hi\u1EC3m",
  25: "TL ki\u1EC3m so\xE1t b\xF3ng",
  26: "B\xF9 gi\u1EDD",
  27: "Ph\u1EA1t \u0111\u1EC1n",
  28: "VAR",
  29: "Ph\u1EA1m l\u1ED7i",
  30: "Ph\u1EA1m l\u1ED7i nguy hi\u1EC3m"
};
const ODD_COMPANY_DEFAULT = 1;
const ISPORT_COMPANY_DEFAULT = 8;
const ODD_COMPANYS = [
  {
    id: 1,
    name: "BET365",
    thesports: 2,
    isportsapi: 8
  },
  {
    id: 2,
    name: "Crown",
    thesports: 3,
    isportsapi: 3
  },
  {
    id: 3,
    name: "10BET",
    thesports: 4,
    isportsapi: 22
  },
  {
    id: 4,
    name: "Ladbrokes",
    thesports: 5,
    isportsapi: 4
  },
  {
    id: 5,
    name: "Mansion88",
    thesports: 6,
    isportsapi: 17
  },
  {
    id: 6,
    name: "Macauslot",
    thesports: 7,
    isportsapi: 1
  },
  {
    id: 7,
    name: "SNAI",
    thesports: 8,
    isportsapi: 7
  },
  {
    id: 8,
    name: "William Hill",
    thesports: 9,
    isportsapi: 9
  },
  {
    id: 9,
    name: "Easybets",
    thesports: 10,
    isportsapi: 12
  },
  {
    id: 10,
    name: "Vcbet",
    thesports: 11,
    isportsapi: 14
  },
  {
    id: 11,
    name: "Interwetten",
    thesports: 13,
    isportsapi: 19
  },
  {
    id: 12,
    name: "12bet",
    thesports: 14,
    isportsapi: 24
  },
  {
    id: 13,
    name: "Sbobet",
    thesports: 15,
    isportsapi: 31
  },
  {
    id: 14,
    name: "Wewbet",
    thesports: 16,
    isportsapi: 35
  },
  {
    id: 15,
    name: "18Bet",
    thesports: 17,
    isportsapi: 42
  },
  {
    id: 16,
    name: "Fun88",
    thesports: 18,
    isportsapi: null
  },
  {
    id: 17,
    name: "188bet",
    thesports: 21,
    isportsapi: 23
  },
  {
    id: 18,
    name: "Pinnacle",
    thesports: 22,
    isportsapi: 47
  },
  {
    id: 19,
    name: "HK Jockey Club",
    thesports: null,
    isportsapi: 48
  },
  {
    id: 20,
    name: "Bwin",
    thesports: null,
    isportsapi: 49
  }
];
const COMPANYS_H2H_DEFAULT_LIST = [
  1,
  13,
  17,
  5,
  2
];
const LIVESCORE_PAGE = {
  LIVESCORE: "livescore",
  FAVORITES: "favorites",
  RESULTS: "results",
  SCHEDULE: "schedule"
};
const LIVESCORE_STATUS = {
  IS_LIVE: ["2", "3", "4", "5", "6", "7"],
  NOT_START: ["1"],
  NOT_LIVE: ["9", "10", "11", "12", "13"],
  IS_END: ["8"]
};
const FAVORITES_TYPE = {
  MATCHES: "matches",
  LEAGUES: "leagues",
  TEAMS: "teams"
};
const MATCH_LIST_OPTION = [
  {
    key: 1,
    value: "1 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 2,
    value: "2 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 3,
    value: "3 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 4,
    value: "4 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 5,
    value: "5 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 6,
    value: "6 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 7,
    value: "7 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 8,
    value: "8 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 9,
    value: "9 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 10,
    value: "10 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 11,
    value: "11 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 12,
    value: "12 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 13,
    value: "13 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 14,
    value: "14 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 15,
    value: "15 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 16,
    value: "16 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 17,
    value: "17 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 18,
    value: "18 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 19,
    value: "19 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  },
  {
    key: 20,
    value: "20 Tr\u1EADn g\u1EA7n nh\u1EA5t"
  }
];
const TABLE_STANDING_LIST = {
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
  16: "P"
};
const MATCH_ODD_TAB = {
  ODDSCOMP: "oddscomp",
  ASIAN_HANDICAP_ODDS: "asian_handicap_odds",
  OVER_UNDER_ODDS: "over_under_odds",
  ODDS_1X2: "odds_1x2",
  CORNER_OU_ODDS: "corner_ou_odds",
  CORRECT_SCORE_ODDS: "correct_score_odds",
  EURO_HANDICAP_ODDS: "euro_handicap_odds",
  DOUBLE_CHANCE_ODDS: "double_chance_odds",
  STATISTICAL: "playertech"
};
const MATCH_TAB = {
  DETAIL: "live",
  H2H: "h2h",
  ODDS: "odds",
  ...MATCH_ODD_TAB
};
const WAREHOUSE_LEAGUE_TAB = {
  SCHEDULE: "schedule",
  STANDING: "standing"
};
const BREADCRUMBS_MAP = {
  "bong da": "Trang ch\u1EE7",
  "theo doi": "Theo d\xF5i",
  "ket qua bong da": "K\u1EBFt qu\u1EA3",
  "lich thi dau": "L\u1ECBch thi \u0111\u1EA5u",
  "tin tuc": "Tin t\u1EE9c",
  "nhan dinh": "Nh\u1EADn \u0111\u1ECBnh",
  "tin nong": "Tin n\xF3ng",
  "tin the thao": "Tin th\u1EC3 thao",
  "tin cau thu": "Tin C\u1EA7u Th\u1EE7",
  "league": "Gi\u1EA3i \u0111\u1EA5u",
  "doi": "\u0110\u1ED9i",
  "tag": "Tin t\u1EE9c",
  "giai dau": "Gi\u1EA3i \u0111\u1EA5u",
  "dang nhap": "\u0110\u0103ng nh\u1EADp",
  "dang ky": "\u0110\u0103ng k\xFD"
};
const POST_TYPE = {
  POST: "post",
  PAGE: "page"
};
const TABLE_TEAM = {
  FREE_PLAYER: "Free player"
};
const TIME_ZONE_LIST = [
  {
    key: "T\u01B0\u0323 \u0111\xF4\u0323ng",
    value: ""
  },
  {
    key: "GMT -11",
    value: "GMT-11:00"
  },
  {
    key: "GMT -10",
    value: "GMT-10:00"
  },
  {
    key: "GMT -9",
    value: "GMT-09:00"
  },
  {
    key: "GMT -8",
    value: "GMT-08:00"
  },
  {
    key: "GMT -7",
    value: "GMT-07:00"
  },
  {
    key: "GMT -6",
    value: "GMT-06:00"
  },
  {
    key: "GMT -5",
    value: "GMT-05:00"
  },
  {
    key: "GMT -4.5",
    value: "GMT-04:30"
  },
  {
    key: "GMT -4",
    value: "GMT-04:00"
  },
  {
    key: "GMT -3.5",
    value: "GMT-03:30"
  },
  {
    key: "GMT -3",
    value: "GMT-03:00"
  },
  {
    key: "GMT -2",
    value: "GMT-02:00"
  },
  {
    key: "GMT -1",
    value: "GMT-01:00"
  },
  {
    key: "GMT 0",
    value: "GMT+00:00"
  },
  {
    key: "GMT +1",
    value: "GMT+01:00"
  },
  {
    key: "GMT +2",
    value: "GMT+02:00"
  },
  {
    key: "GMT +3",
    value: "GMT+03:00"
  },
  {
    key: "GMT +3.5",
    value: "GMT+03:30"
  },
  {
    key: "GMT +4",
    value: "GMT+04:00"
  },
  {
    key: "GMT +5",
    value: "GMT+05:00"
  },
  {
    key: "GMT +5.5",
    value: "GMT+05:30"
  },
  {
    key: "GMT +5.75",
    value: "GMT+05:45"
  },
  {
    key: "GMT +6",
    value: "GMT+06:00"
  },
  {
    key: "GMT +6.5",
    value: "GMT+06:30"
  },
  {
    key: "GMT +7",
    value: "GMT+07:00"
  },
  {
    key: "GMT +8",
    value: "GMT+08:00"
  },
  {
    key: "GMT +9",
    value: "GMT+09:00"
  },
  {
    key: "GMT +9.5",
    value: "GMT+09:30"
  },
  {
    key: "GMT +10",
    value: "GMT+10:00"
  },
  {
    key: "GMT +10.5",
    value: "GMT+10:30"
  },
  {
    key: "GMT +11",
    value: "GMT+11:00"
  },
  {
    key: "GMT +12",
    value: "GMT+12:00"
  },
  {
    key: "GMT +13",
    value: "GMT+13:00"
  }
];

export { BREADCRUMBS_MAP as B, COMPANYS_H2H_DEFAULT_LIST as C, FAVORITES_TYPE as F, ISPORT_COMPANY_DEFAULT as I, LABEL_NEWS_READMORE as L, MATCH_TAB as M, ODD_COMPANY_DEFAULT as O, POST_TYPE as P, STATS_TECHNICAL as S, TABLE_STANDING_LIST as T, WAREHOUSE_LEAGUE_TAB as W, MATCH_ODD_TAB as a, ODD_COMPANYS as b, MATCH_LIST_OPTION as c, SCREEN_WIDTH as d, ITEMS_PER_LIMIT as e, CATEGORY_TAG_POST_PER_LIMIT as f, LIVESCORE_STATUS as g, LIVESCORE_PAGE as h, LIVESCORE_ACTIVE_TAB as i, TIME_ZONE_LIST as j, TABLE_TEAM as k };
//# sourceMappingURL=constants-DJp0NbxW.mjs.map
