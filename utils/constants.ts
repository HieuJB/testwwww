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

export const CONFIG = [
  {
      "name": "Favicon",
      "code": "favicon",
      "value": "https://cdn.moonknight-sport.live/mk/bongdalu/2024/09/favicon.bk_081213.webp"
  },
  {
      "name": "Css variable",
      "code": "CSS_VARIABLE",
      "value": ":root {\n  --livescore-header-table: #43951e;\n  --secondary:  #43951e;\n  --primary:  #397f19;\n  --menu: #43951e;\n  --hovercolor: #285912;\n  --backgroundfooter: #555;\n  --backgroundcolor: #e5e5e5;\n  --tabsactive: #ff8c00;\n  --table-honor: #f3fdea;\n}"
  },
  {
      "name": "Language",
      "code": "language",
      "value": "vi"
  },
  {
      "name": "Player Title",
      "code": "PLAYER_TITLE_REPOSITORY",
      "value": "Danh sách cầu thủ bóng đá - Bongdalu"
  },
  {
      "name": "Team Title",
      "code": "TEAM_TITLE_REPOSITORY",
      "value": "Danh sách đội tuyển bóng đá - Bongdalu"
  },
  {
      "name": "Robot meta for player",
      "code": "robot_meta_player_repository",
      "value": "index, follow"
  },
  {
      "name": "followsocial",
      "code": "followsocial",
      "value": "[{\"iconcode\":\"tabler-brand-facebook\",\"url\":\"https://www.facebook.com/\",\"followurl\":false},{\"iconcode\":\"tabler-brand-skype\",\"url\":\"https://www.skype.com/en/\",\"followurl\":false},{\"iconcode\":\"tabler-brand-whatsapp\",\"url\":\"https://web.whatsapp.com/\",\"followurl\":false}]"
  },
  {
      "name": "League Image Height",
      "code": "LEAGUE_IMAGE_HEIGHT",
      "value": "!h50"
  },
  {
      "name": "Robot meta team",
      "code": "robot_meta_team_repository",
      "value": "index, nofollow"
  },
  {
      "name": "Coach content",
      "code": "COACH_CONTENT",
      "value": ""
  },
  {
      "name": "News Keyword",
      "code": "NEWS_KEYWORD",
      "value": "Tin tức"
  },
  {
      "name": "Robot meta for news category",
      "code": "robot_meta_news_category",
      "value": "index,follow"
  },
  {
      "name": "Robot meta for news list",
      "code": "robot_meta_news",
      "value": "index,follow"
  },
  {
      "name": "Robot meta for news tag",
      "code": "robot_meta_news_tag",
      "value": "index,follow"
  },
  {
      "name": "News Title",
      "code": "NEWS_TITLE",
      "value": "Tin tức bóng đá mới nhất - cập nhật liên tục tại bongdalu"
  },
  {
      "name": "Team descriptions",
      "code": "TEAM_DESCRIPTION",
      "value": "Thông tin đội tuyển ${team_name} chi tiết, lịch sử đối đầu, thống kê các thành tích của đội tuyển ${team_name}"
  },
  {
      "name": "Team keyword",
      "code": "TEAM_KEYWORD",
      "value": "${team_name}"
  },
  {
      "name": "Team Title",
      "code": "TEAM_TITLE",
      "value": "${team_name} - Dữ liệu đội tuyển"
  },
  {
      "name": "Iframe Livescore",
      "code": "option_iframe",
      "value": "True"
  },
  {
      "name": "Match playertech title",
      "code": "MATCH_TITLE_PLAYERTECH",
      "value": "${home_name} vs ${away_name} ngày ${date} - Thống kê cầu thủ"
  },
  {
      "name": "League title (List)",
      "code": "LEAGUE_TITLE",
      "value": "Danh sách các giải đấu bóng đá - Bongdalu"
  },
  {
      "name": "robot meta for league (List)",
      "code": "robot_meta_league",
      "value": "index,follow"
  },
  {
      "name": "Timezone",
      "code": "TIMEZONE",
      "value": "GMT+07:00"
  },
  {
      "name": "Match detail keyword",
      "code": "MATCH_KEYWORD_DETAIL",
      "value": "${home_name} VS ${away_name} ngày ${date}"
  },
  {
      "name": "Coach Keyword",
      "code": "COACH_KEYWORD",
      "value": "${coach_name}"
  },
  {
      "name": "Robot meta for coach",
      "code": "robot_meta_coach",
      "value": "noindex,follow"
  },
  {
      "name": "Coach descriptions",
      "code": "COACH_DESCRIPTION",
      "value": "Thông tin chi tiết hồ sơ của huấn luyện viên ${coach_name}. Mọi thông tin về huấn luyện viên được cập nhật mới nhất mỗi ngày tại Bongdalu"
  },
  {
      "name": "Coach Title",
      "code": "COACH_TITLE",
      "value": "Hồ sơ HLV ${coach_name} thông tin chi tiết - Bongdalu"
  },
  {
      "name": "Player keyword",
      "code": "PLAYER_KEYWORD",
      "value": "${player_name}"
  },
  {
      "name": "Player descriptions",
      "code": "PLAYER_DESCRIPTION",
      "value": "Thống kê chi tiết về Hồ sơ cầu thủ ${player_name}. Mọi thông tin về cầu thủ được cập nhật mới nhất 24h mỗi ngày tại Bongdalu"
  },
  {
      "name": "Player Title",
      "code": "PLAYER_TITLE",
      "value": "Hồ sơ cầu thủ ${player_name} thống kê chi tiết - Bongdalu"
  },
  {
      "name": "Robot meta for player",
      "code": "robot_meta_player",
      "value": "noindex,follow"
  },
  {
      "name": "Robot meta for team",
      "code": "robot_meta_team",
      "value": "noindex,follow"
  },
  {
      "name": "FE Site URI",
      "code": "FE_SITE_URI",
      "value": "https://www.utvgroup.com/"
  },
  {
      "name": "Robot meta for league detail",
      "code": "robot_meta_league_detail",
      "value": "noindex,follow"
  },
  {
      "name": "Header Script",
      "code": "header_script",
      "value": "<meta name=\"google-site-verification\" content=\"PyIkcGaEZommIjFshHWtrnG9RHcPY0ADJ3E1LrwarzY\" />\n\n<script type=\"application/ld+json\" class=\"bongdalu-schema\">\n {\n  \"@context\": \"https://schema.org\",\n  \"@graph\": [\n    {\n      \"@type\": \"Place\",\n      \"@id\": \"https://www.inlinkuk.com/#place\",\n      \"address\": {\n        \"@type\": \"PostalAddress\",\n        \"streetAddress\": \"51 Ng. 353 Đ. Bát Khối, Long Biên, Hà Nội, Việt Nam\",\n        \"addressLocality\": \"Long Biên\",\n        \"addressRegion\": \"Hà Nội\",\n        \"addressCountry\": \"Việt Nam\"\n      }\n    },\n    {\n      \"@type\": \"Organization\",\n      \"@id\": \"https://www.inlinkuk.com/#organization\",\n      \"name\": \"Bongdalu\",\n      \"url\": \"https://www.inlinkuk.com\",\n      \"email\": \"bongdalupc@gmail.com\",\n      \"address\": {\n        \"@type\": \"PostalAddress\",\n        \"streetAddress\": \"51 Ng. 353 Đ. Bát Khối, Long Biên, Hà Nội, Việt Nam\",\n        \"addressLocality\": \"Long Biên\",\n        \"addressRegion\": \"Hà Nội\",\n        \"addressCountry\": \"Việt Nam\"\n      },\n      \"logo\": {\n        \"@type\": \"ImageObject\",\n        \"@id\": \"https://www.inlinkuk.com/#logo\",\n        \"url\": \"https://cdn.moonknight-sport.live/mk/bongdalu/2024/07/logo.webp\",\n        \"contentUrl\": \"https://cdn.moonknight-sport.live/mk/bongdalu/2024/07/logo.webp\",\n        \"caption\": \"Bongdalu\",\n        \"inLanguage\": \"vi\",\n        \"width\": \"260\",\n        \"height\": \"89\"\n      },\n      \"contactPoint\": [\n        { \"@type\": \"ContactPoint\", \"telephone\": \"0988229111\", \"contactType\": \"customer support\" },\n        {\n          \"@type\": \"ContactPoint\",\n          \"telephone\": \"0988229111\",\n          \"contactType\": \"technical support\"\n        }\n      ],\n      \"location\": { \"@id\": \"https://www.inlinkuk.com/#place\" }\n    },\n    {\n      \"@type\": \"WebSite\",\n      \"@id\": \"https://www.inlinkuk.com/#website\",\n      \"url\": \"https://www.inlinkuk.com\",\n      \"name\": \"Bongdalu\",\n      \"alternateName\": \"Bong da lu\",\n      \"publisher\": { \"@id\": \"https://www.inlinkuk.com/#organization\" },\n      \"inLanguage\": \"vi\"\n    },\n    {\n      \"@type\": \"ImageObject\",\n      \"@id\": \"https://cdn.moonknight-sport.live/mk/bongdalu/2024/07/cap-nhat-lien-tuc-ket-qua-bong-da-truc-tuyen.webp\",\n      \"url\": \"https://cdn.moonknight-sport.live/mk/bongdalu/2024/07/cap-nhat-lien-tuc-ket-qua-bong-da-truc-tuyen.webp\",\n      \"width\": \"667\",\n      \"height\": \"500\",\n      \"inLanguage\": \"vi\"\n    },\n    {\n      \"@type\": \"WebPage\",\n      \"@id\": \"https://www.inlinkuk.com/#webpage\",\n      \"url\": \"https://www.inlinkuk.com/\",\n      \"name\": \"Bongdalu | Kết quả & tỷ số bóng đá | Livescore bong da lu\",\n      \"datePublished\": \"2024-03-15T07:46:47+07:00\",\n      \"dateModified\": \"2024-09-02T01:43:31+07:00\",\n      \"about\": { \"@id\": \"https://www.inlinkuk.com/#organization\" },\n      \"isPartOf\": { \"@id\": \"https://www.inlinkuk.com/#website\" },\n      \"primaryImageOfPage\": { \"@id\": \"https://cdn.moonknight-sport.live/mk/bongdalu/2024/07/logo.webp\" },\n      \"inLanguage\": \"vi\"\n    }\n  ]\n}\n</script>\n<!-- Google tag (gtag.js) -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-0NGG0TX731\"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'G-0NGG0TX731');\n</script>"
  },
  {
      "name": "Robot meta for match",
      "code": "robot_meta_match",
      "value": "noindex,follow"
  },
  {
      "name": "Hidden Top Tools",
      "code": "HIDDEN_TOP_TOOLS",
      "value": "True"
  },
  {
      "name": "League detail keyword",
      "code": "COMPETITION_KEYWORD",
      "value": "${competition_name}"
  },
  {
      "name": "League detail descriptions",
      "code": "COMPETITION_DESCRIPTION",
      "value": "Thống kê dữ liệu tổng quan của giải đấu ${competition_name} chi tiết và trực quan nhất. Các thông số bảng xếp hạng, thành tích các đội tuyển tham gia của giải ${competition_name} được cập nhật liên tục."
  },
  {
      "name": "League detail title",
      "code": "COMPETITION_TITLE",
      "value": "${competition_name} ,Thông tin giải đấu - Bongdalu"
  },
  {
      "name": "Match h2h keyword",
      "code": "MATCH_KEYWORD_H2H",
      "value": "${home_name} VS ${away_name} ngày ${date} - Thông tin đội hình"
  },
  {
      "name": "Match Oddscomp meta descriptions",
      "code": "MATCH_DESCRIPTION_ODDSCOMP",
      "value": "Tỷ lệ kèo trận đấu ${home_name} VS ${away_name} vào ngày ${date} đầy đủ các loại kèo tài xỉu, kèo Châu Á, kèo Châu Âu... tại bongdalu mới nhất, cập nhật realtime 24/7"
  },
  {
      "name": "Match Oddscomp title",
      "code": "MATCH_TITLE_ODDSCOMP",
      "value": "${home_name} VS ${away_name} ngày ${date} - Tỷ lệ kèo"
  },
  {
      "name": "Match H2H meta descriptions",
      "code": "MATCH_DESCRIPTION_H2H",
      "value": "Dữ liệu phân tích trận ${home_name} VS ${away_name} ngày ${date} đầy đủ nhất, được cập nhật liên tục với dữ liệu chuẩn xác và chi tiết"
  },
  {
      "name": "Match h2h title",
      "code": "MATCH_TITLE_H2H",
      "value": "${home_name} VS ${away_name} ngày ${date} - Thông tin đội hình"
  },
  {
      "name": "Match detail meta descriptions",
      "code": "MATCH_DESCRIPTION_DETAIL",
      "value": "Thông tin chi tiết trận đấu ${home_name} VS ${away_name} ngày ${date} vào lúc ${time}, đầy đủ các thông số phân tích kèo, lịch sử đối đầu, thành tích gần đây... nhanh và chính xác nhất."
  },
  {
      "name": "Match detail title",
      "code": "MATCH_TITLE_DETAIL",
      "value": "${home_name} VS ${away_name} ngày ${date} - Bongdalu"
  },
  {
      "name": "[NEWS] - LIMIT_POST_CATEGORY",
      "code": "LIMIT_POST_CATEGORY",
      "value": "6"
  },
  {
      "name": "SEO_META_DESCRIPTION",
      "code": "SEO_META_DESCRIPTION",
      "value": "bongdalu"
  },
  {
      "name": "Livescore Header Table Color",
      "code": "livescoreHeaderTableColor",
      "value": "#43951e"
  },
  {
      "name": "Top Tools Color",
      "code": "toptoolsColor",
      "value": "#212121"
  },
  {
      "name": "tabsactiveColor",
      "code": "tabsactiveColor",
      "value": "#f86826"
  },
  {
      "name": "Background Footer Color",
      "code": "backgroundfooterColor",
      "value": "#555"
  },
  {
      "name": "backgroundColor",
      "code": "backgroundColor",
      "value": "#e5e5e5"
  },
  {
      "name": "hoverColor",
      "code": "hoverColor",
      "value": "#285912"
  },
  {
      "name": "textColor",
      "code": "textColor",
      "value": "#fff"
  },
  {
      "name": "Secondary Color",
      "code": "secondaryColor",
      "value": "#43951e"
  },
  {
      "name": "Primary Color",
      "code": "primaryColor",
      "value": "#397f19"
  },
  {
      "name": "Code footer",
      "code": "code_footer",
      "value": "<div class=\"webid\" style=\"max-width: 550px; margin: 0 auto\">\n  <p>\n    Thương hiệu: Bongdalu\n    <br />\n    Website: https://www.inlinkuk.com/\n    <br />\n    Địa chỉ: 51 Ng. 353 Đ. Bát Khối, Long Biên, Hà Nội, Việt Nam\n    <br />\n    Email: bongdalupc@gmail.com\n    <br />\n    SĐT: 0988229111\n    <br />\n    Hastag: bongdalu, bong da lu, bong da luu, xemtysobongdalu, tructiepbongda, bongdalupc, bongdalu 5, bóng đá lưu, bóng đá lu, bongdalu fun\n<br>\nLiên hệ quảng cáo: @ilsdfhguiert\n  </p>\n  <div class=\"network\">\n    <a href=\"https://www.facebook.com/profile.php?id=61558391500383\" target=\"_blank\" rel=\"nofollow\">Facebook</a>\n    <a href=\"https://twitter.com/bongdalupc\" target=\"_blank\" rel=\"nofollow\">Twitter</a>\n    <a href=\"https://vimeo.com/bongdalupc\" target=\"_blank\" rel=\"nofollow\">Vimeo</a>\n    <a href=\"https://www.pinterest.com/bongdalupc/\" target=\"_blank\" rel=\"nofollow\">Pinterest</a>\n    <a href=\"https://www.linkedin.com/in/bongdalupc/\" target=\"_blank\" rel=\"nofollow\">Linkedin</a>\n  </div>\n  <p>\n    Bongdalu là chuyên trang thông tin bóng đá, livescore và tỷ lệ kèo chính xác nhất Việt Nam hiện\n    nay. Bongdalu cập nhật thông tin liên tục, nhanh chóng 24/7, đầy đủ các thông tin từ các giải\n    đấu lớn nhỏ trong và ngoài nước, đi kèm là các nhận định, soi kèo, dự đoán tỷ số chuyên sâu và\n    chính xác nhất.\n  </p>\n</div>\n\n<ul class=\"f_menu container\">\n <li>\n    <a href=\"/ve-chung-toi\" >Về chúng tôi</a>\n  </li>\n  <li>\n    <a href=\"/giay-phep\">Giấy phép</a>\n  </li>\n  <li>\n    <a href=\"/bao-mat\">Bảo mật</a>\n  </li>\n  <li>\n    <a href=\"/lien-he\" rel=\"nofollow\">Liên hệ</a>\n  </li>\n  <li>\n    <a href=\"/chinh-sach-nguoi-dung\">Chính sách người dùng</a>\n  </li>\n  <li>\n    <a href=\"/tuyen-dung\">Tuyển dụng</a>\n  </li>\n  <li>\n    <a href=\"/sitemap/sitemap_index.xml\">Sitemap</a>\n  </li>\n</ul>\n<div class=\"copyright\">\n  Copyright © 2024 Powered By\n  <a href=\"/\" title=\"Bongdalu\">Bongdalu</a>\n  All Rights Reserved.\n</div>\n"
  },
  {
      "name": "Available stream url",
      "code": "available_stream_url",
      "value": ""
  },
  {
      "name": "Logo",
      "code": "logo",
      "value": "https://cdn.moonknight-sport.live/mk/bongdalu/2024/09/logo (6)_165505.webp"
  },
  {
      "name": "SEO_META_TITLE",
      "code": "SEO_META_TITLE",
      "value": "Bóng đá lu"
  },
  {
      "name": "Image Upload Size",
      "code": "image_size",
      "value": "150x150,300x300,1024x1024,1920x1920"
  }
]