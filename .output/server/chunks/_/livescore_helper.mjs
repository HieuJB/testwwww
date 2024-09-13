import CryptoJS from 'crypto-js';
import pako from 'pako';
import { Buffer } from 'buffer';

const API_ROUTERS = {
  CONFIGURATIONS: "/oapi/v1/configurations",
  CONFIGURATIONS_BRAND: "/oapi/v1/configuration-brand",
  MENU: "/oapi/v1/menu",
  PAGE: {
    HOME_PAGE: "/oapi/v1/pages/home-page",
    SLUG: "/oapi/v1/pages/slug"
  },
  AUTH: {
    LOGIN: "/oapi/v1/auth/login",
    LOGOUT: "/oapi/v1/auth/logout",
    REGISTER: "/oapi/v1/auth/register"
  },
  POST: {
    LIST: "/oapi/v1/posts",
    SLUG: "/oapi/v1/posts/slug",
    TAG: {
      LIST: "/oapi/v1/tags/",
      SLUG: "/oapi/v1/tags/"
    },
    CATEGORY: {
      LIST: "/oapi/v1/categories",
      DETAIL: "/oapi/v1/categories/"
    }
  },
  USER: {
    ME: "/oapi/v1/users/me"
  },
  COMMENTS: {
    SEND: "/comments",
    TREE: "/oapi/v1/comments/tree"
  },
  CATEGORY: {
    LIST: "/api/categories/",
    DETAIL: "/api/categories/"
  },
  AUTHOR: {
    INFO: "/api/author"
  },
  LIVESCORE: {
    COUNTRIES: "/api/v1/countries",
    COMP: "/api/v1/comp",
    COMP_LIST: "/api/v1/comp-list",
    COMP_LIST_ALL: "/api/v1/comp-list-all",
    COMP_SEASON: "/api/v1/comp-season?lang=vi",
    MATCHS_LIVE: "/api/v1/matchs/live",
    MATCHS_RECENT: "/api/v1/matchs/recent",
    MATCHS_LIVE_DETAIL: "/api/v1/matchs/live/detail",
    MATCHS_CORNER: "/api/v1/matchs/corner",
    ODDS_CORNER_MAIN: "/api/v1/odds/conner/main",
    ODDS_DETAIL: "/api/v1/odds/detail",
    MATCHS_COMPANY_ODD: "/api/v1/matchs/company-odd",
    MATCH_RECENT_RESULT: "/api/v1/matchs/recent/result",
    MATCH_SEASON_RESULT: "/api/v1/matchs/season-result",
    SEASONS_TABLE_STANDING: "/api/v1/seasons/table-standing",
    MATCHS_ANALYSIS: "/api/v1/matchs/analysis",
    MATCHS_LINEUP: "/api/v1/matchs/lineup",
    MATCHS_RECENT_DETAIL: "/api/v1/matchs/recent-detail",
    MATCHES_ANALYSIS: "/api/v1/matchs/ianalysis",
    SEASONS_TABLE: "/api/v1/seasons/table",
    MATCHS_LAST_LINEUP: "/api/v1/matchs/last-lineup",
    ODDS_CHANGE_HISTORY: "/api/v1/odds/change/history",
    //https://www.isportsapi.com/docs.html?id=73
    ODDS_EUROHADICAP: "/api/v1/odds/eurohadicap",
    ODDS_CONNER_FULL: "/api/v1/odds/conner/full",
    ODDS_CONNER_HAFT: "/api/v1/odds/conner/haft",
    ODDS_CONNER_HISTORY_FULL: "/api/v1/odds/conner/history/full",
    ODDS_CONNER_HISTORY_HAFT: "/api/v1/odds/conner/history/haft",
    ODDS_CORRECT_SCORE: "/api/v1/odds/correct-score/prematch",
    ODDS_CORRECT_SCORE_HISTORY: "/api/v1/odds/correct-score/prematch/history",
    ODDS_EURO_HANDICAP_HISTORY: "/api/v1/odds/euro-hdc/change",
    ODDS_DOUBLE_CHANCE: "/api/v1/odds/double-change",
    ODDS_DOUBLE_CHANCE_HISTORY: "/api/v1/odds/double-change/history",
    ODDS_EUROPEAN: "/api/v1/odds/european",
    ODDS_EURO_HANDICAP_HISTORY1: "/api/v1/odds/european/history",
    ODDS_IMAIN: "/api/v1/odds/imain",
    TEAMS: "/api/v1/teams",
    COMPETITION_DETAIL: "/api/v1/comp",
    PLAYER_STATISTICS: "/api/v1/matchs/player/stats",
    LINEUP_TEAM: "/api/v1/teams-players",
    WAREHOUSE: "/api/v1/warehouse",
    SCHEDULE: "/api/v1/team-future-matches",
    OLD_SCHEDULE: "/api/v1/team-history-matches",
    TEAM_HONOR: "/api/v1/team-honor",
    SEASON_TRANSFER: "/api/v1/comp-detail",
    PLAYER_TRANSFER: "/api/v1/teams/transfer",
    PLAYER_POSITION: "/api/v1/players/detail",
    COMPETITION_SEASON: "/api/v1/teams/list-competitions",
    PLAYER_INFO: "/api/v1/teams/players/season-stats",
    MATCHES_BY_SEASON: "/api/v1/matchs/comp",
    COMP_DETAIL: "/api/v1/comp-detail",
    ODDS_SEASON_IMAIN: "/api/v1/odds/season/imain",
    PLAYER_DETAIL: "/api/v1/players/detail",
    PLAYER_TRANSFERS: "/api/v1/players/transfer",
    PLAYER_MATCH: "/api/v1/players/stats",
    PLAYER_HONOR: "/api/v1/players/honor",
    COACH_INFO: "/api/v1/coachs/detail",
    COACH_HONOR: "/api/v1/coachs/honor",
    TEAM_ACHIEVEMENT: "/api/v1/teams/near-year",
    PLAYER_COMPETITIONS: "/api/v1/players/competitions",
    PLAYER_PERFORMANCE: "/api/v1/players/stats-season",
    SEASONS_BEST_LINEUP: "/api/v1/seasons/best-lineup",
    TEAM_LIST: "/api/v1/teams/list",
    LIVE_MATCH: "/api/v1/matchs/live-match",
    PLAYER_LIST: "/api/v1/players/list"
  },
  OBJECTS_META: {
    DETAIL: "/oapi/v1/objects-meta"
  }
};

const decodeDataAPI = async (data, keyEncode = "") => {
  if (!data)
    return null;
  try {
    const encryptedData = Buffer.from(data, "hex");
    const key = keyEncode;
    const decryptedBytes = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.lib.WordArray.create(Uint8Array.from(encryptedData)) },
      CryptoJS.enc.Utf8.parse(key),
      { mode: CryptoJS.mode.ECB }
    );
    const decryptedBase64 = decryptedBytes.toString(CryptoJS.enc.Base64);
    const decompressedData = pako.inflate(Buffer.from(decryptedBase64, "base64"), { to: "string" });
    const jsonData = JSON.parse(decompressedData);
    return jsonData;
  } catch (error) {
    return null;
  }
};

export { API_ROUTERS as A, decodeDataAPI as d };
//# sourceMappingURL=livescore_helper.mjs.map
