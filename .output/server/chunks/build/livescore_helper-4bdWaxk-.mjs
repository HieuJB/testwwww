import { g as useRuntimeConfig } from './server.mjs';
import { f as formatDateMomentUTCTimeZone, s as sortByTime } from './moment_helper-C2kP4D4M.mjs';
import { p as parseFloatO, e as escapeRegExp, a as parseIntO } from './helper-CGhdpGxz.mjs';
import { S as STATS_TECHNICAL } from './constants-DJp0NbxW.mjs';
import CryptoJS from 'crypto-js';
import pako from 'pako';
import { Buffer } from 'buffer';

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
const getLiveScoreImage = (path, subpath) => {
  const config = useRuntimeConfig();
  return config.public.liveScoreImage + "/" + subpath + "/" + path;
};
const groupBy = (array, grouper) => {
  try {
    return array.reduce((store, item) => {
      var key = grouper(item);
      if (!store.has(key)) {
        store.set(key, [item]);
      } else {
        store.get(key).push(item);
      }
      return store;
    }, /* @__PURE__ */ new Map());
  } catch (error) {
    return null;
  }
};
const groupByTimeAndComp = (array) => {
  try {
    return array.reduce((store, item) => {
      const key = item.match_time + "_" + item.competition + "_" + item.status;
      if (!store.has(key)) {
        store.set(key, [item]);
      } else {
        store.get(key).push(item);
      }
      return store;
    }, /* @__PURE__ */ new Map());
  } catch (error) {
    return null;
  }
};
const getStatusDisplay = (match, $t, timeZone) => {
  let statusToDisplay = "-";
  const status = match == null ? void 0 : match.status;
  if (["8", "10"].includes(status)) {
    statusToDisplay = formatDateMomentUTCTimeZone(match == null ? void 0 : match.match_time, "HH:mm", timeZone);
    if ((match == null ? void 0 : match.status) === "8") {
      statusToDisplay += '<b class="status ms-3">' + $t("Fulltime") + "</b>";
    }
  } else if (["12"].includes(status)) {
    statusToDisplay = $t("Cancel");
  } else if (["2", "4", "5"].includes(status)) {
    if (match == null ? void 0 : match.matchMinutes) {
      statusToDisplay = (match == null ? void 0 : match.matchMinutes) + '<img src="/icon/in.gif" border="0" alt="in" width="3" height="8">';
    } else {
      statusToDisplay = formatDateMomentUTCTimeZone(match == null ? void 0 : match.match_time, "HH:mm", timeZone);
    }
  } else {
    if (status === "7") {
      statusToDisplay = '<b class="status ms-1">PS</b>';
    } else if (status === "3") {
      statusToDisplay = '<b class="status ms-1">HT</b>';
    } else {
      statusToDisplay = formatDateMomentUTCTimeZone(match == null ? void 0 : match.match_time, "HH:mm", timeZone);
    }
  }
  return statusToDisplay;
};
const getStatusDisplayMobile = (match, $t, timeZone) => {
  if (!match)
    return "-";
  let statusToDisplay = "";
  const status = match == null ? void 0 : match.status;
  if (["8", "10"].includes(status)) {
    statusToDisplay = formatDateMomentUTCTimeZone(match == null ? void 0 : match.match_time, "HH:mm", timeZone);
    if ((match == null ? void 0 : match.status) === "8") {
      statusToDisplay = $t("Fulltime");
    }
  } else if (["12"].includes(status)) {
    statusToDisplay = $t("Cancel");
  } else if (["2", "4", "5"].includes(status)) {
    if (match == null ? void 0 : match.matchMinutes) {
      statusToDisplay = (match == null ? void 0 : match.matchMinutes) + '<i class="mit"><img src="/img/in_red.gif" alt="time"></i>';
    } else {
      statusToDisplay = "-";
    }
  } else {
    if (status === "7") {
      statusToDisplay = '<b class="">PS</b>';
    } else if (status === "3") {
      statusToDisplay = '<b class="">HT</b>';
    } else {
      statusToDisplay = "-";
    }
  }
  return statusToDisplay;
};
const getOdds = (match, row, position, numberToNegative) => {
  var _a, _b, _c, _d;
  try {
    if (((_a = match == null ? void 0 : match.odds) == null ? void 0 : _a.length) > 0) {
      const odds = (_b = String(match == null ? void 0 : match.odds[row])) == null ? void 0 : _b.split(/\s*,\s*/);
      if ((odds == null ? void 0 : odds.length) > position && odds[position] && odds[position] !== "null") {
        const oddValue = odds[position];
        const odds_older = (_d = String((_c = match == null ? void 0 : match.odds_older) == null ? void 0 : _c[row])) == null ? void 0 : _d.split(/\s*,\s*/);
        if ((odds_older == null ? void 0 : odds_older.length) > position && odds_older[position] && odds_older[position] !== "null") {
          const oddOlderValue = odds_older[position];
          if (parseFloat(oddValue) > parseFloat(oddOlderValue)) {
            return '<span class="up">' + (parseFloatO(oddValue) !== 0 ? numberToNegative ? getOddNumberToNegativeTX(oddValue) : parseFloatO(parseFloatO(oddValue).toFixed(2)) : 0) + "</span>";
          } else if (parseFloat(oddValue) < parseFloat(oddOlderValue)) {
            return '<span class="down">' + (parseFloatO(oddValue) !== 0 ? numberToNegative ? getOddNumberToNegativeTX(oddValue) : parseFloatO(parseFloatO(oddValue).toFixed(2)) : 0) + "</span>";
          } else {
            return parseFloatO(oddValue) !== 0 ? numberToNegative ? getOddNumberToNegativeTX(oddValue) : parseFloatO(parseFloatO(oddValue).toFixed(2)) : 0;
          }
        }
      }
      return odds[position] && odds[position] !== "null" ? numberToNegative ? getOddNumberToNegativeTX(odds[position]) : parseFloatO(parseFloatO(odds[position]).toFixed(2)) : "";
    }
    return "";
  } catch (error) {
    return "";
  }
};
const isEmpty = (odd) => {
  if (typeof odd === "undefined" || !odd)
    return true;
  return false;
};
const getOddNumber = (odd) => {
  try {
    if (typeof odd === "undefined" || !odd)
      return "-";
    return odd == null ? void 0 : odd[0];
  } catch (error) {
    return "-";
  }
};
const getOddOfData = (odd) => {
  try {
    if (typeof odd === "undefined" || !odd)
      return "-";
    return parseFloatO(odd == null ? void 0 : odd[0]);
  } catch (error) {
    return "-";
  }
};
const getOddNumberToNegative = (odd) => {
  try {
    if (typeof odd === "undefined" || !odd)
      return "-";
    return parseFloatO(odd == null ? void 0 : odd[0]) <= 1 ? odd == null ? void 0 : odd[0] : (-1 / parseFloatO(odd == null ? void 0 : odd[0])).toFixed(2);
  } catch (error) {
    return "-";
  }
};
const getOddNumberToNegativeTX = (odd) => {
  try {
    if (typeof odd === "undefined" || !odd)
      return "-";
    return parseFloatO(odd) <= 1 ? parseFloatO(odd) : parseFloatO((-1 / parseFloatO(odd)).toFixed(2));
  } catch (error) {
    return "-";
  }
};
const getOddChange = (odd1, odd2) => {
  try {
    if ((typeof odd1 === "undefined" || !odd1) && (typeof odd2 === "undefined" || !odd2))
      return "";
    if (isEmpty(odd1) || parseFloatO(odd1) == parseFloatO(odd2))
      return "";
    else if (parseFloatO(odd2) < parseFloatO(odd1)) {
      return "up2";
    } else {
      return "down2";
    }
  } catch (error) {
    return "-";
  }
};
const getClassOddChange = (odds, position, type = 3) => {
  var _a, _b, _c, _d, _e, _f;
  try {
    if (typeof odds === "undefined" || !odds)
      return "";
    let older = "";
    let odd = "";
    if (type === 1) {
      if (isEmpty(odds == null ? void 0 : odds.first_older) || !(odds == null ? void 0 : odds.first_older))
        return "";
      older = getOddNumber((_a = odds == null ? void 0 : odds.first_older) == null ? void 0 : _a[position]);
      odd = getOddNumber((_b = odds == null ? void 0 : odds.first) == null ? void 0 : _b[position]);
    } else if (type === 2) {
      if (isEmpty(odds == null ? void 0 : odds.live_older) || !(odds == null ? void 0 : odds.live_older))
        return "";
      older = getOddNumber((_c = odds == null ? void 0 : odds.live_older) == null ? void 0 : _c[position]);
      odd = getOddNumber((_d = odds == null ? void 0 : odds.live) == null ? void 0 : _d[position]);
    } else if (type === 3) {
      if (isEmpty(odds == null ? void 0 : odds.run_older) || !(odds == null ? void 0 : odds.run_older))
        return "";
      older = getOddNumber((_e = odds == null ? void 0 : odds.run_older) == null ? void 0 : _e[position]);
      odd = getOddNumber((_f = odds == null ? void 0 : odds.run) == null ? void 0 : _f[position]);
    }
    if (parseFloatO(older) < parseFloatO(odd)) {
      return "up";
    } else if (parseFloatO(older) > parseFloatO(odd)) {
      return "down";
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
};
const getClassOddCornerChange = (odds, position) => {
  var _a, _b;
  try {
    if (typeof odds === "undefined" || !odds)
      return "";
    let older = "";
    let odd = "";
    if (isEmpty(odds == null ? void 0 : odds.run_older) || !(odds == null ? void 0 : odds.run_older))
      return "";
    older = getOddNumber((_a = odds == null ? void 0 : odds.run_older) == null ? void 0 : _a[position]);
    odd = getOddNumber((_b = odds == null ? void 0 : odds.run) == null ? void 0 : _b[position]);
    if (parseFloatO(older) < parseFloatO(odd)) {
      return "up";
    } else if (parseFloatO(older) > parseFloatO(odd)) {
      return "down";
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
};
const getClassOddCorner = (odd, older) => {
  try {
    if (typeof older === "undefined" || !older)
      return "";
    if (parseFloatO(older) < parseFloatO(odd)) {
      return "up";
    } else if (parseFloatO(older) > parseFloatO(odd)) {
      return "down";
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
};
const getOddCornerValue = (odd, position) => {
  var _a;
  try {
    if (typeof odd === "undefined" || !odd)
      return "-";
    let oddData = odd == null ? void 0 : odd.replace(/[^0-9.,]/g, "");
    oddData = (_a = String(oddData)) == null ? void 0 : _a.split(/\s*,\s*/);
    if ((oddData == null ? void 0 : oddData.length) > position) {
      return oddData[position] && oddData[position] !== "null" ? oddData[position] : 0;
    }
    return "";
  } catch (error) {
    return "";
  }
};
const getIncidents = (incident = [], position = 0) => {
  try {
    if ((incident == null ? void 0 : incident.position) !== position)
      return "";
    switch (incident == null ? void 0 : incident.type) {
      case 1:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Goal" src="/img/incident/1.png"></span>';
      case 2:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Corner" src="/img/incident/2.png"></span>';
      case 3:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Yellow card" src="/img/incident/3.png"></span>';
      case 4:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Red card" src="/img/incident/4.png"></span>';
      case 5:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Offside" src="/img/incident/5.png"></span>';
      case 8:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Penalty" src="/img/incident/8.png"></span>';
      case 9:
        return '<span class="detail_player in_out"><div class="icon_inc"><img loading="lazy" class="user_incident" style="margin:-3px 2px;" alt="Midfield" src="/img/incident/11.png"></div><div class="in_player_name">' + (incident == null ? void 0 : incident.in_player_name) + ' <img loading="lazy" style="margin:-3px 2px;" src="/img/incident/9.png" alt="Substitution"></div><div class="out_player_name">' + (incident == null ? void 0 : incident.out_player_name) + ' <img loading="lazy" style="margin:-4px 2px;" src="/img/incident/9.2.png" alt="Substitution"></div></span>';
      case 15:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Card upgrade confirmed" src="/img/incident/15.png"></span>';
      case 16:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Penalty missed" src="/img/incident/16.png"></span>';
      case 17:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Own goal" src="/img/incident/17.png"></span>';
      case 28:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="VAR" src="/img/incident/28.png"></span>';
      default:
      case 29:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Penalty(Penalty Shoot-out)" src="/img/incident/7.png"></span>';
      case 30:
        return '<span class="detail_player">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + '<img loading="lazy" style="margin:3px 2px;" alt="Penalty missed(Penalty Shoot-out)" src="/img/incident/16.png"></span>';
        return "--";
    }
  } catch (error) {
    return "--";
  }
};
const getIncidentsRight = (incident = [], position = 0) => {
  try {
    if ((incident == null ? void 0 : incident.position) !== position)
      return "";
    switch (incident == null ? void 0 : incident.type) {
      case 1:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Goal" src="/img/incident/1.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 2:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Corner" src="/img/incident/2.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 3:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Yellow card" src="/img/incident/3.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 4:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Red card" src="/img/incident/4.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 5:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Offside" src="/img/incident/5.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 8:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Penalty" src="/img/incident/8.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 9:
        return '<span class="detail_player in_out"><div class="icon_inc"><img loading="lazy" class="user_incident" style="margin:-3px 2px;" alt="Midfield" src="/img/incident/11.png"></div><div class="in_player_name"><img loading="lazy" style="margin:-3px 2px;" src="/img/incident/9.png" alt="Substitution">' + (incident == null ? void 0 : incident.in_player_name) + ' </div><div class="out_player_name"><img loading="lazy" style="margin:-4px 2px;" src="/img/incident/9.2.png" alt="Substitution">' + (incident == null ? void 0 : incident.out_player_name) + " </div></span>";
      case 15:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Card upgrade confirmed" src="/img/incident/15.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 16:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Penalty missed" src="/img/incident/16.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 17:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Own goal" src="/img/incident/17.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 28:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="VAR" src="/img/incident/28.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      default:
      case 29:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Penalty(Penalty Shoot-out)" src="/img/incident/7.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
      case 30:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Penalty missed(Penalty Shoot-out)" src="/img/incident/16.png">' + ((incident == null ? void 0 : incident.player_name) ? incident == null ? void 0 : incident.player_name : "") + "</span>";
        return "--";
    }
  } catch (error) {
    return "--";
  }
};
const getStats = (type = "") => {
  try {
    if (STATS_TECHNICAL[type]) {
      return STATS_TECHNICAL[type];
    } else {
      return "-";
    }
  } catch (error) {
    return "-";
  }
};
const getCorner = (cornerEvent = [], teamId = 0, position = 0) => {
  try {
    if (parseIntO(cornerEvent == null ? void 0 : cornerEvent.teamId) !== teamId)
      return "";
    if (position === 1) {
      return '<img src="img/rq.png" width="16" height="16">';
    } else {
      return '<img src="img/bq.png" width="16" height="16">';
    }
  } catch (error) {
    return "";
  }
};
const getDetailOdds = (data = [], typeOdd = "", group = "", position = 0) => {
  var _a;
  try {
    if ((data == null ? void 0 : data.length) <= 0)
      return "-";
    const oddData = data == null ? void 0 : data.find(({ type }) => type === typeOdd);
    if (oddData == null ? void 0 : oddData[group]) {
      const data2 = JSON.parse((_a = oddData[group]) == null ? void 0 : _a.replace(new RegExp(escapeRegExp("'"), "g"), '"'));
      if (data2[position])
        return parseFloatO(data2[position]);
    }
    return "";
  } catch (error) {
    return "";
  }
};
const getRecentResultTheSport = (data = [], matchId, isHome = false) => {
  try {
    if (data.length <= 0)
      return;
    let recentResult = data == null ? void 0 : data.slice(0, 6);
    if (isHome) {
      recentResult = recentResult == null ? void 0 : recentResult.reverse();
    }
    let score = "";
    recentResult == null ? void 0 : recentResult.forEach((item) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      if (((_b = (_a = item == null ? void 0 : item[5]) == null ? void 0 : _a[0]) == null ? void 0 : _b[0]) === matchId) {
        if (((_c = item == null ? void 0 : item[5]) == null ? void 0 : _c[2]) > ((_d = item == null ? void 0 : item[6]) == null ? void 0 : _d[2])) {
          score += '<span class="o-win" title="Th\u1EAFng">T</span>';
        } else if (((_e = item == null ? void 0 : item[5]) == null ? void 0 : _e[2]) == ((_f = item == null ? void 0 : item[6]) == null ? void 0 : _f[2])) {
          score += '<span class="o-draw" title="H\xF2a">H</span>';
        } else {
          score += '<span class="o-lose" title="Thua">B</span>';
        }
      } else if (((_h = (_g = item == null ? void 0 : item[6]) == null ? void 0 : _g[0]) == null ? void 0 : _h[0]) === matchId) {
        if (((_i = item == null ? void 0 : item[6]) == null ? void 0 : _i[2]) > ((_j = item == null ? void 0 : item[5]) == null ? void 0 : _j[2])) {
          score += '<span class="o-win" title="Th\u1EAFng">T</span>';
        } else if (((_k = item == null ? void 0 : item[6]) == null ? void 0 : _k[2]) == ((_l = item == null ? void 0 : item[5]) == null ? void 0 : _l[2])) {
          score += '<span class="o-draw" title="H\xF2a">H</span>';
        } else {
          score += '<span class="o-lose" title="Thua">B</span>';
        }
      }
    });
    return score;
  } catch (error) {
    return "";
  }
};
const getLastResult = (data = [], matchId, isHome = false) => {
  var _a, _b;
  try {
    if (data.length <= 0)
      return '<span class="o-unknown">?</span>';
    const recentResult = (_b = (_a = sortByTime(data, true)) == null ? void 0 : _a.slice(0, 6)) == null ? void 0 : _b.reverse();
    let score = "";
    recentResult == null ? void 0 : recentResult.forEach((item) => {
      if ((item == null ? void 0 : item.home_team.id) === matchId) {
        if ((item == null ? void 0 : item.home_scores[0]) > (item == null ? void 0 : item.away_scores[0])) {
          score += '<span class="o-win" title="Th\u1EAFng">T</span>';
        } else if ((item == null ? void 0 : item.home_scores[0]) === (item == null ? void 0 : item.away_scores[0])) {
          score += '<span class="o-draw" title="H\xF2a">H</span>';
        } else {
          score += '<span class="o-lose" title="Thua">B</span>';
        }
      } else if ((item == null ? void 0 : item.away_team.id) === matchId) {
        if ((item == null ? void 0 : item.away_scores[0]) > (item == null ? void 0 : item.home_scores[0])) {
          score += '<span class="o-win" title="Th\u1EAFng">T</span>';
        } else if ((item == null ? void 0 : item.away_scores[0]) === (item == null ? void 0 : item.home_scores[0])) {
          score += '<span class="o-draw" title="H\xF2a">H</span>';
        } else {
          score += '<span class="o-lose" title="Thua">B</span>';
        }
      }
    });
    return score ? score : '<span class="o-unknown">?</span>';
  } catch (error) {
    return '<span class="o-unknown">?</span>';
  }
};
const getDataObject = (data = []) => {
  if (!data)
    return null;
  try {
    const dataObject = [];
    Object.keys(data).map((key) => {
      var _a, _b, _c;
      if (typeof data[key] === "string") {
        dataObject[key] = JSON.parse((_a = data[key]) == null ? void 0 : _a.replace(new RegExp(escapeRegExp("'"), "g"), '"'));
        if (typeof dataObject[key] !== "undefined" && ((_b = dataObject[key]) == null ? void 0 : _b.length) > 0) {
          const itemList = [];
          (_c = dataObject[key]) == null ? void 0 : _c.map((item) => {
            var _a2;
            itemList.push((_a2 = String(item)) == null ? void 0 : _a2.split(/\s*,\s*/));
          });
          dataObject[key] = itemList;
        }
      } else {
        dataObject[key] = data[key];
      }
    });
    return dataObject;
  } catch (e) {
    return null;
  }
};
const getOddDataObject = (data = []) => {
  if (!data)
    return null;
  try {
    const dataObject = [];
    Object.keys(data).map((key) => {
      var _a, _b, _c;
      if (typeof data[key] === "string") {
        if (key === "initial" || key === "inplay" || key === "instant") {
          dataObject[key] = JSON.parse((_a = data[key]) == null ? void 0 : _a.replace(new RegExp(escapeRegExp("'"), "g"), '"'));
          if (typeof dataObject[key] !== "undefined" && ((_b = dataObject[key]) == null ? void 0 : _b.length) > 0) {
            const itemList = [];
            (_c = dataObject[key]) == null ? void 0 : _c.map((item) => {
              var _a2;
              itemList.push((_a2 = String(item)) == null ? void 0 : _a2.split(/\s*,\s*/));
            });
            dataObject[key] = itemList;
          }
        } else {
          dataObject[key] = data[key];
        }
      } else {
        dataObject[key] = data[key];
      }
    });
    return dataObject;
  } catch (e) {
    return null;
  }
};
const getDataObjectByList = (data = []) => {
  try {
    if (!data)
      return null;
    const dataObject = [];
    data == null ? void 0 : data.map((item, index) => {
      dataObject[index] = getOddDataObject(item);
    });
    return dataObject;
  } catch (e) {
    return null;
  }
};
const getH2HOddTX = (scoreHome, scoreAway, totalOdd) => {
  try {
    if (totalOdd == "")
      return "";
    if (parseFloatO(scoreHome) + parseFloatO(scoreAway) > parseFloatO(totalOdd)) {
      return '<span class="o-lose" title="Th\u1EAFng">T</span>';
    } else if (parseFloatO(scoreHome) + parseFloatO(scoreAway) < parseFloatO(totalOdd)) {
      return '<span class="o-win" title="Thua">X</span>';
    } else {
      return '<span class="o-void o-draw" title="H\xF2a">H</span>';
    }
  } catch (e) {
    return "";
  }
};
const getH2HOddEU = (scoreHome, scoreAway) => {
  try {
    if (parseFloatO(scoreHome) > parseFloatO(scoreAway)) {
      return '<span class="o-lose" title="Th\u1EAFng">T</span>';
    } else if (parseFloatO(scoreHome) < parseFloatO(scoreAway)) {
      return '<span class="o-win" title="Thua">B</span>';
    } else {
      return '<span class="o-draw" title="H\xF2a">H</span>';
    }
  } catch (e) {
    return "";
  }
};
const getH2HOddHadicap = (scoreHome, scoreAway, hadicapOdd) => {
  try {
    if (hadicapOdd == "")
      return "";
    if (parseFloatO(scoreHome) + parseFloatO(hadicapOdd) > parseFloatO(scoreAway)) {
      return '<span class="o-lose" title="Th\u1EAFng">T</span>';
    } else if (parseFloatO(scoreHome) + parseFloatO(hadicapOdd) < parseFloatO(scoreAway)) {
      return '<span class="o-win" title="Thua">B</span>';
    } else {
      return '<span class="o-draw" title="H\xF2a">H</span>';
    }
  } catch (e) {
    return "";
  }
};
const getH2HStatistics = (matches, limit, i_team, cb_sos, is_home = true) => {
  try {
    if (!matches || matches.length === 0 || limit === 0)
      return "";
    let totalWin = 0;
    let totalDraw = 0;
    let totalLose = 0;
    let totalWinTX = 0;
    let totalLossTX = 0;
    let totalWinHadicap = 0;
    let totalLossHadicap = 0;
    const total = 0;
    let number = 0;
    matches == null ? void 0 : matches.forEach((item) => {
      if (number < limit) {
        if (cb_sos) {
          if (is_home) {
            if (i_team != (item == null ? void 0 : item[5])) {
              return;
            }
          } else {
            if (i_team != (item == null ? void 0 : item[7])) {
              return;
            }
          }
        }
        if (i_team == (item == null ? void 0 : item[5])) {
          if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
            totalWin++;
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            totalDraw++;
          } else {
            totalLose++;
          }
          if (parseFloatO(item == null ? void 0 : item[8]) + parseFloatO(item == null ? void 0 : item[17]) > parseFloatO(item == null ? void 0 : item[9])) {
            totalWinHadicap++;
          } else if (parseFloatO(item == null ? void 0 : item[8]) + parseFloatO(item == null ? void 0 : item[17]) < parseFloatO(item == null ? void 0 : item[9])) {
            totalLossHadicap++;
          }
        } else if (i_team == (item == null ? void 0 : item[7])) {
          if (parseIntO(item == null ? void 0 : item[8]) < parseIntO(item == null ? void 0 : item[9])) {
            totalWin++;
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            totalDraw++;
          } else {
            totalLose++;
          }
          if (parseFloatO(item == null ? void 0 : item[9]) + parseFloatO(item == null ? void 0 : item[17]) > parseFloatO(item == null ? void 0 : item[8])) {
            totalWinHadicap++;
          } else if (parseFloatO(item == null ? void 0 : item[9]) + parseFloatO(item == null ? void 0 : item[17]) < parseFloatO(item == null ? void 0 : item[8])) {
            totalLossHadicap++;
          }
        }
        if ((item == null ? void 0 : item[29]) != "") {
          if (parseFloatO(item == null ? void 0 : item[8]) + parseFloatO(item == null ? void 0 : item[9]) > parseFloatO(item == null ? void 0 : item[29])) {
            totalWinTX++;
          } else if (parseFloatO(item == null ? void 0 : item[8]) + parseFloatO(item == null ? void 0 : item[9]) < parseFloatO(item == null ? void 0 : item[29])) {
            totalLossTX++;
          }
        }
        number++;
      }
    });
    const aHRate = totalWinHadicap + totalLossTX > 0 ? parseFloatO(totalWinHadicap * 100 / (totalWinHadicap + totalLossTX)).toFixed(0) : "-";
    const overRate = totalLossTX + totalWinTX > 0 ? parseFloatO(totalWinTX * 100 / (totalLossTX + totalWinTX)).toFixed(0) : "-";
    return 'Th\u1ED1ng k\xEA <span class="red">' + number + "</span> Tr\u1EADn g\u1EA7n \u0111\xE2y, " + totalWin + " th\u1EAFng, " + totalDraw + " h\xF2a, " + totalLose + ' thua, T\u1EF7 l\u1EC7 th\u1EAFng\uFF1A<span class="red">' + parseFloatO(totalWin * 100 / number).toFixed(0) + '%</span> T\u1EF7 l\u1EC7 k\xE8o th\u1EAFng\uFF1A<span class="red">' + aHRate + '% </span> T\u1EF7 l\u1EC7 t\xE0i\uFF1A<span class="red"> ' + overRate + "% </span> ";
  } catch (e) {
    return "";
  }
};
const getStaticsOdd = (Odds, findOdd, percent) => {
  try {
    if (Odds === "" || typeof Odds === "undefined")
      return 0;
    if (percent) {
      if ((Odds == null ? void 0 : Odds.length) > 0) {
        return ((Odds.match(new RegExp(findOdd, "g")) || []).length / (Odds == null ? void 0 : Odds.length) * 100).toFixed(1) + "%";
      } else {
        return "";
      }
    } else {
      return (Odds.match(new RegExp(findOdd, "g")) || []).length;
    }
  } catch (e) {
    return 0;
  }
};
const getH2hComparison = (matchesStat, homeTeamId, awayTeamId, i_competition_id) => {
  try {
    if (!matchesStat)
      return [];
    let homeW = 0;
    let homeD = 0;
    let homeL = 0;
    let awayW = 0;
    let awayD = 0;
    let awayL = 0;
    let homeWComp = 0;
    let homeDComp = 0;
    let homeLComp = 0;
    let awayWComp = 0;
    let awayDComp = 0;
    let awayLComp = 0;
    let numberSameLeague = 1;
    let numberLimit = 0;
    matchesStat == null ? void 0 : matchesStat.forEach((item) => {
      if (numberLimit < 10) {
        if (homeTeamId == (item == null ? void 0 : item[5])) {
          if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
            homeW++;
            awayL++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberSameLeague <= 5) {
              homeWComp++;
              awayLComp++;
              numberSameLeague++;
            }
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            homeD++;
            awayD++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberSameLeague <= 5) {
              homeDComp++;
              awayDComp++;
              numberSameLeague++;
            }
          } else {
            homeL++;
            awayW++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberSameLeague <= 5) {
              homeLComp++;
              awayWComp++;
              numberSameLeague++;
            }
          }
        } else if (homeTeamId == (item == null ? void 0 : item[7])) {
          if (parseIntO(item == null ? void 0 : item[8]) < parseIntO(item == null ? void 0 : item[9])) {
            homeW++;
            awayL++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberSameLeague <= 5) {
              homeWComp++;
              awayLComp++;
              numberSameLeague++;
            }
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            homeD++;
            awayD++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberSameLeague <= 5) {
              homeDComp++;
              awayDComp++;
              numberSameLeague++;
            }
          } else {
            homeL++;
            awayW++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberSameLeague <= 5) {
              homeLComp++;
              awayWComp++;
              numberSameLeague++;
            }
          }
        }
        numberLimit++;
      }
    });
    const homePoint = homeW * 3 + homeD * 1;
    const awayPoint = awayW * 3 + awayD * 1;
    const homeInCompPoint = homeWComp * 3 + homeDComp * 1;
    const awayInCompPoint = awayWComp * 3 + awayDComp * 1;
    const homePercent = homePoint + awayPoint > 0 ? homePoint * 100 / (homePoint + awayPoint) : 0;
    const awayPercent = homePoint + awayPoint > 0 ? awayPoint * 100 / (homePoint + awayPoint) : 0;
    const homeLabel = `${homeW}T ${homeD}H ${homeL}B`;
    const awayLabel = `${awayW}T ${awayD}H ${awayL}B`;
    const homeInCompPercent = homeInCompPoint + awayInCompPoint > 0 ? homeInCompPoint * 100 / (homeInCompPoint + awayInCompPoint) : 0;
    const awayInCompPercent = homeInCompPoint + awayInCompPoint > 0 ? awayInCompPoint * 100 / (homeInCompPoint + awayInCompPoint) : 0;
    const homeInCompLabel = `${homeWComp}T ${homeDComp}H ${homeLComp}B`;
    const awayInCompLabel = `${awayWComp}T ${awayDComp}H ${awayLComp}B`;
    const totalHomePercent = homePercent + homeInCompPercent > 0 ? (homePercent + homeInCompPercent) / 2 : 0;
    const totalAwayPercent = awayPercent + awayInCompPercent > 0 ? (awayPercent + awayInCompPercent) / 2 : 0;
    return [
      homePercent.toFixed(0),
      awayPercent.toFixed(0),
      homeLabel,
      awayLabel,
      homeInCompPercent.toFixed(0),
      awayInCompPercent.toFixed(0),
      homeInCompLabel,
      awayInCompLabel,
      totalHomePercent.toFixed(0),
      totalAwayPercent.toFixed(0)
    ];
  } catch (e) {
    return [];
  }
};
const getStateComparison = (matchesStatHome, matchesStatAway, homeTeamId, awayTeamId, i_competition_id, limit = 10) => {
  try {
    if (!matchesStatHome && !matchesStatAway)
      return [];
    let homeW = 0;
    let homeD = 0;
    let homeL = 0;
    let awayW = 0;
    let awayD = 0;
    let awayL = 0;
    let homeWComp = 0;
    let homeDComp = 0;
    let homeLComp = 0;
    let awayWComp = 0;
    let awayDComp = 0;
    let awayLComp = 0;
    let homeGoals = 0;
    let awayGoals = 0;
    let homeGoalsComp = 0;
    let awayGoalsComp = 0;
    let homeDefence = 0;
    let awayDefence = 0;
    let homeDefenceComp = 0;
    let awayDefenceComp = 0;
    let homeRed = 0;
    let awayRed = 0;
    let homeNumberLimit = 0;
    let numberHomeSameLeague = 1;
    let numberAwaySameLeague = 1;
    let homeCorner = 0;
    let awayCorner = 0;
    matchesStatHome == null ? void 0 : matchesStatHome.forEach((item) => {
      if (homeNumberLimit < limit) {
        if (homeTeamId == (item == null ? void 0 : item[5])) {
          homeGoals += parseIntO(item == null ? void 0 : item[8]);
          homeDefence += parseIntO(item == null ? void 0 : item[9]);
          homeCorner += parseIntO(item == null ? void 0 : item[14]);
          homeRed += parseIntO(item == null ? void 0 : item[12]);
          if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
            homeW++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberHomeSameLeague <= 5) {
              homeWComp++;
              numberHomeSameLeague++;
              homeGoalsComp += parseIntO(item == null ? void 0 : item[8]);
              homeDefenceComp += parseIntO(item == null ? void 0 : item[9]);
            }
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            homeD++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberHomeSameLeague <= 5) {
              homeDComp++;
              numberHomeSameLeague++;
              homeGoalsComp += parseIntO(item == null ? void 0 : item[8]);
              homeDefenceComp += parseIntO(item == null ? void 0 : item[9]);
            }
          } else {
            homeL++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberHomeSameLeague <= 5) {
              homeLComp++;
              numberHomeSameLeague++;
              homeGoalsComp += parseIntO(item == null ? void 0 : item[8]);
              homeDefenceComp += parseIntO(item == null ? void 0 : item[9]);
            }
          }
        } else if (homeTeamId == (item == null ? void 0 : item[7])) {
          homeGoals += parseIntO(item == null ? void 0 : item[9]);
          homeDefence += parseIntO(item == null ? void 0 : item[8]);
          homeCorner += parseIntO(item == null ? void 0 : item[15]);
          homeRed += parseIntO(item == null ? void 0 : item[12]);
          if (parseIntO(item == null ? void 0 : item[8]) < parseIntO(item == null ? void 0 : item[9])) {
            homeW++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberHomeSameLeague <= 5) {
              homeWComp++;
              numberHomeSameLeague++;
              homeGoalsComp += parseIntO(item == null ? void 0 : item[9]);
              homeDefenceComp += parseIntO(item == null ? void 0 : item[8]);
            }
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            homeD++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberHomeSameLeague <= 5) {
              homeDComp++;
              numberHomeSameLeague++;
              homeGoalsComp += parseIntO(item == null ? void 0 : item[9]);
              homeDefenceComp += parseIntO(item == null ? void 0 : item[8]);
            }
          } else {
            homeL++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberHomeSameLeague <= 5) {
              homeLComp++;
              numberHomeSameLeague++;
              homeGoalsComp += parseIntO(item == null ? void 0 : item[9]);
              homeDefenceComp += parseIntO(item == null ? void 0 : item[8]);
            }
          }
        }
        homeNumberLimit++;
      }
    });
    let awayNumberLimit = 0;
    matchesStatAway == null ? void 0 : matchesStatAway.forEach((item) => {
      if (awayNumberLimit < limit) {
        if (awayTeamId == (item == null ? void 0 : item[5])) {
          awayGoals += parseIntO(item == null ? void 0 : item[8]);
          awayDefence += parseIntO(item == null ? void 0 : item[9]);
          awayCorner += parseIntO(item == null ? void 0 : item[14]);
          awayRed += parseIntO(item == null ? void 0 : item[13]);
          if (parseIntO(item == null ? void 0 : item[8]) < parseIntO(item == null ? void 0 : item[9])) {
            awayL++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberAwaySameLeague <= 5) {
              awayLComp++;
              numberAwaySameLeague++;
              awayGoalsComp += parseIntO(item == null ? void 0 : item[8]);
              awayDefenceComp += parseIntO(item == null ? void 0 : item[9]);
            }
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            awayD++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberAwaySameLeague <= 5) {
              awayDComp++;
              numberAwaySameLeague++;
              awayGoalsComp += parseIntO(item == null ? void 0 : item[8]);
              awayDefenceComp += parseIntO(item == null ? void 0 : item[9]);
            }
          } else {
            awayW++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberAwaySameLeague <= 5) {
              awayWComp++;
              numberAwaySameLeague++;
              awayGoalsComp += parseIntO(item == null ? void 0 : item[8]);
              awayDefenceComp += parseIntO(item == null ? void 0 : item[9]);
            }
          }
        } else if (awayTeamId == (item == null ? void 0 : item[7])) {
          awayGoals += parseIntO(item == null ? void 0 : item[9]);
          awayDefence += parseIntO(item == null ? void 0 : item[8]);
          awayCorner += parseIntO(item == null ? void 0 : item[15]);
          awayRed += parseIntO(item == null ? void 0 : item[13]);
          if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
            awayL++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberAwaySameLeague <= 5) {
              awayLComp++;
              numberAwaySameLeague++;
              awayGoalsComp += parseIntO(item == null ? void 0 : item[9]);
              awayDefenceComp += parseIntO(item == null ? void 0 : item[8]);
            }
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            awayD++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberAwaySameLeague <= 5) {
              awayDComp++;
              numberAwaySameLeague++;
              awayGoalsComp += parseIntO(item == null ? void 0 : item[9]);
              awayDefenceComp += parseIntO(item == null ? void 0 : item[8]);
            }
          } else {
            awayW++;
            if (parseFloatO(i_competition_id) === parseFloatO(item == null ? void 0 : item[2]) && numberAwaySameLeague <= 5) {
              awayWComp++;
              numberAwaySameLeague++;
              awayGoalsComp += parseIntO(item == null ? void 0 : item[9]);
              awayDefenceComp += parseIntO(item == null ? void 0 : item[8]);
            }
          }
        }
        awayNumberLimit++;
      }
    });
    const homePoint = (homeW * 3 + homeD * 1) / homeNumberLimit;
    const awayPoint = (awayW * 3 + awayD * 1) / awayNumberLimit;
    const homeInCompPoint = (homeWComp * 3 + homeDComp * 1) / numberHomeSameLeague;
    const awayInCompPoint = (awayWComp * 3 + awayDComp * 1) / numberAwaySameLeague;
    const homePercent = homePoint + awayPoint > 0 ? homePoint * 100 / (homePoint + awayPoint) : 0;
    const awayPercent = homePoint + awayPoint > 0 ? awayPoint * 100 / (homePoint + awayPoint) : 0;
    const homeLabel = `${homeW}T ${homeD}H ${homeL}B`;
    const awayLabel = `${awayW}T ${awayD}H ${awayL}B`;
    const homeInCompPercent = homeInCompPoint + awayInCompPoint > 0 ? homeInCompPoint * 100 / (homeInCompPoint + awayInCompPoint) : 0;
    const awayInCompPercent = homeInCompPoint + awayInCompPoint > 0 ? awayInCompPoint * 100 / (homeInCompPoint + awayInCompPoint) : 0;
    const homeInCompLabel = `${homeWComp}T ${homeDComp}H ${homeLComp}B`;
    const awayInCompLabel = `${awayWComp}T ${awayDComp}H ${awayLComp}B`;
    const totalHomePercent = homePercent + homeInCompPercent > 0 ? (homePercent + homeInCompPercent) / 2 : 0;
    const totalAwayPercent = awayPercent + awayInCompPercent > 0 ? (awayPercent + awayInCompPercent) / 2 : 0;
    const totalGoals = homeGoals / homeNumberLimit + awayGoals / awayNumberLimit;
    const homeGoalsPercent = homeNumberLimit > 0 ? homeGoals / homeNumberLimit * 100 / totalGoals : 0;
    const awayGoalsPercent = awayNumberLimit > 0 ? awayGoals / awayNumberLimit * 100 / totalGoals : 0;
    const totalGoalsComp = homeGoalsComp / homeNumberLimit + awayGoalsComp / awayNumberLimit;
    const homeGoalsCompPercent = homeNumberLimit > 0 ? homeGoalsComp / homeNumberLimit * 100 / totalGoalsComp : 0;
    const awayGoalsCompPercent = awayNumberLimit > 0 ? awayGoalsComp / awayNumberLimit * 100 / totalGoalsComp : 0;
    const totalHomeGoalsPercent = homeGoalsPercent + homeGoalsCompPercent > 0 ? (homeGoalsPercent + homeGoalsCompPercent) / 2 : 0;
    const totalAwayGoalsPercent = awayGoalsPercent + awayGoalsCompPercent > 0 ? (awayGoalsPercent + awayGoalsCompPercent) / 2 : 0;
    const totalDefence = homeDefence / homeNumberLimit + awayDefence / awayNumberLimit;
    const homeDefencePercent = homeNumberLimit > 0 ? homeDefence / homeNumberLimit * 100 / totalDefence : 0;
    const awayDefencePercent = awayNumberLimit > 0 ? awayDefence / awayNumberLimit * 100 / totalDefence : 0;
    const totalDefenceComp = homeDefenceComp / homeNumberLimit + awayDefenceComp / awayNumberLimit;
    const homeDefenceCompPercent = homeDefenceComp / homeNumberLimit * 100 / totalDefenceComp;
    const awayDefenceCompPercent = awayDefenceComp / awayNumberLimit * 100 / totalDefenceComp;
    const totalHomeDefencePercent = homeDefencePercent + homeDefenceCompPercent > 0 ? (homeDefencePercent + homeDefenceCompPercent) / 2 : 0;
    const totalAwayDefencePercent = awayDefencePercent + awayDefenceCompPercent > 0 ? (awayDefencePercent + awayDefenceCompPercent) / 2 : 0;
    homeCorner = awayNumberLimit > 0 ? (homeCorner / awayNumberLimit).toFixed(2) : 0;
    awayCorner = awayNumberLimit > 0 ? (awayCorner / awayNumberLimit).toFixed(2) : 0;
    return [
      homePercent.toFixed(0),
      awayPercent.toFixed(0),
      homeLabel,
      awayLabel,
      //4
      homeInCompPercent.toFixed(0),
      awayInCompPercent.toFixed(0),
      homeInCompLabel,
      awayInCompLabel,
      // 8
      totalHomePercent.toFixed(0),
      totalAwayPercent.toFixed(0),
      homeGoalsPercent.toFixed(0),
      awayGoalsPercent.toFixed(0),
      // 12
      `${homeGoals}B\xE0n/${homeNumberLimit}Tr\u1EADn`,
      `${awayGoals}B\xE0n/${awayNumberLimit}Tr\u1EADn`,
      homeGoalsCompPercent.toFixed(0),
      awayGoalsCompPercent.toFixed(0),
      // 16
      `${homeGoalsComp}B\xE0n/${homeNumberLimit}Tr\u1EADn`,
      `${awayGoalsComp}B\xE0n/${awayNumberLimit}Tr\u1EADn`,
      totalHomeGoalsPercent.toFixed(0),
      totalAwayGoalsPercent.toFixed(0),
      // 20
      `${homeDefence}B\xE0n/${homeNumberLimit}Tr\u1EADn`,
      `${awayDefence}B\xE0n/${awayNumberLimit}Tr\u1EADn`,
      homeDefencePercent.toFixed(0),
      awayDefencePercent.toFixed(0),
      // 24
      `${homeDefenceComp}B\xE0n/${homeNumberLimit}Tr\u1EADn`,
      `${awayDefenceComp}B\xE0n/${awayNumberLimit}Tr\u1EADn`,
      homeDefenceCompPercent.toFixed(0),
      awayDefenceCompPercent.toFixed(0),
      // 28
      totalHomeDefencePercent.toFixed(0),
      totalAwayDefencePercent.toFixed(0),
      // 30
      homeCorner,
      awayCorner,
      // 32
      Number(homeCorner) + Number(awayCorner) > 0 ? Number(homeCorner) * 100 / (Number(homeCorner) + Number(awayCorner)) : 0,
      Number(homeCorner) + Number(awayCorner) > 0 ? Number(awayCorner) * 100 / (Number(homeCorner) + Number(awayCorner)) : 0,
      // 34
      homeW,
      awayW,
      homeDefence,
      awayDefence,
      homeCorner,
      awayCorner,
      homeRed,
      awayRed,
      // 42
      homeGoals,
      awayGoals,
      homeGoals + awayGoals > 0 ? (homeGoals * 100 / (homeGoals + awayGoals)).toFixed(1) : 0,
      homeGoals + awayGoals > 0 ? (awayGoals * 100 / (homeGoals + awayGoals)).toFixed(1) : 0,
      // 46
      homeNumberLimit > 0 ? (homeGoals / homeNumberLimit).toFixed(1) : 0,
      awayNumberLimit > 0 ? (awayGoals / awayNumberLimit).toFixed(1) : 0,
      // 48
      homeNumberLimit > 0 ? (homeDefence / homeNumberLimit).toFixed(1) : 0,
      awayNumberLimit > 0 ? (awayDefence / awayNumberLimit).toFixed(1) : 0,
      // 50
      homeNumberLimit > 0 ? (homeW * 100 / homeNumberLimit).toFixed(1) : 0,
      awayNumberLimit > 0 ? (awayW * 100 / awayNumberLimit).toFixed(1) : 0,
      // 52
      homeNumberLimit > 0 ? (homeD * 100 / homeNumberLimit).toFixed(1) : 0,
      awayNumberLimit > 0 ? (awayD * 100 / awayNumberLimit).toFixed(1) : 0,
      // 54
      homeNumberLimit > 0 ? (homeL * 100 / homeNumberLimit).toFixed(1) : 0,
      awayNumberLimit > 0 ? (awayL * 100 / awayNumberLimit).toFixed(1) : 0
    ];
  } catch (e) {
    return [];
  }
};
const getStandingLastest = (matches, limit, i_team) => {
  try {
    if (!matches || matches.length === 0 || limit === 0)
      return "";
    let totalWin = 0;
    let totalDraw = 0;
    let totalLose = 0;
    let totalGoals = 0;
    let totalAgainst = 0;
    let totalPoint = 0;
    let number = 0;
    matches == null ? void 0 : matches.forEach((item) => {
      if (number < limit) {
        if (i_team == (item == null ? void 0 : item[5])) {
          totalGoals += parseIntO(item == null ? void 0 : item[8]);
          totalAgainst += parseIntO(item == null ? void 0 : item[9]);
          if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
            totalWin++;
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            totalDraw++;
          } else {
            totalLose++;
          }
        } else if (i_team == (item == null ? void 0 : item[7])) {
          totalGoals += parseIntO(item == null ? void 0 : item[9]);
          totalAgainst += parseIntO(item == null ? void 0 : item[8]);
          if (parseIntO(item == null ? void 0 : item[8]) < parseIntO(item == null ? void 0 : item[9])) {
            totalWin++;
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            totalDraw++;
          } else {
            totalLose++;
          }
        }
        number++;
      }
    });
    totalPoint = totalWin * 3 + totalDraw * 1;
    return [limit, totalWin, totalDraw, totalLose, totalGoals, totalAgainst, totalPoint, (totalWin * 100 / number).toFixed(1)];
  } catch (e) {
    return [];
  }
};
const getDataComparison = (matchesStat, teamId, is_home, limit = 10) => {
  try {
    if (!matchesStat)
      return [];
    let scored = 0;
    let conceded = 0;
    let diff = 0;
    let avgScored = 0;
    let win = 0;
    let draw = 0;
    let loss = 0;
    let scoredSame = 0;
    let concededSame = 0;
    let diffSame = 0;
    let avgScoredSame = 0;
    let winSame = 0;
    let drawSame = 0;
    let lossSame = 0;
    let i = 0;
    const numberLimit = (matchesStat == null ? void 0 : matchesStat.length) < limit ? matchesStat == null ? void 0 : matchesStat.length : limit;
    matchesStat == null ? void 0 : matchesStat.forEach((item) => {
      if (i < numberLimit) {
        if (teamId == (item == null ? void 0 : item[5])) {
          scored += parseIntO(item == null ? void 0 : item[8]);
          conceded += parseIntO(item == null ? void 0 : item[9]);
          if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
            win++;
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            draw++;
          } else {
            loss++;
          }
          if (is_home) {
            scoredSame += parseIntO(item == null ? void 0 : item[8]);
            concededSame += parseIntO(item == null ? void 0 : item[9]);
            if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
              winSame++;
            } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
              drawSame++;
            } else {
              lossSame++;
            }
          }
        } else if (teamId == (item == null ? void 0 : item[7])) {
          scored += parseIntO(item == null ? void 0 : item[9]);
          conceded += parseIntO(item == null ? void 0 : item[8]);
          if (parseIntO(item == null ? void 0 : item[8]) < parseIntO(item == null ? void 0 : item[9])) {
            win++;
          } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
            draw++;
          } else {
            loss++;
          }
          if (!is_home) {
            scoredSame += parseIntO(item == null ? void 0 : item[8]);
            concededSame += parseIntO(item == null ? void 0 : item[9]);
            if (parseIntO(item == null ? void 0 : item[8]) > parseIntO(item == null ? void 0 : item[9])) {
              winSame++;
            } else if (parseIntO(item == null ? void 0 : item[8]) == parseIntO(item == null ? void 0 : item[9])) {
              drawSame++;
            } else {
              lossSame++;
            }
          }
        }
        i++;
      }
    });
    diff = scored - conceded;
    avgScored = numberLimit > 0 ? ((win * 3 + draw * 1) / numberLimit).toFixed(1) : 0;
    win = numberLimit > 0 ? (win * 100 / numberLimit).toFixed(1) : 0;
    draw = numberLimit > 0 ? (draw * 100 / numberLimit).toFixed(1) : 0;
    loss = numberLimit > 0 ? (loss * 100 / numberLimit).toFixed(1) : 0;
    diffSame = scoredSame - concededSame;
    avgScoredSame = numberLimit > 0 ? ((winSame * 3 + drawSame * 1) / numberLimit).toFixed(1) : 0;
    winSame = numberLimit > 0 ? (winSame * 100 / numberLimit).toFixed(1) : 0;
    drawSame = numberLimit > 0 ? (drawSame * 100 / numberLimit).toFixed(1) : 0;
    lossSame = numberLimit > 0 ? (lossSame * 100 / numberLimit).toFixed(1) : 0;
    return [scored, conceded, diff, avgScored, win + "%", draw + "%", loss + "%", is_home ? "Ch\u1EE7" : "Kh\xE1ch", scoredSame, concededSame, diffSame, avgScoredSame, winSame + "%", drawSame + "%", lossSame + "%"];
  } catch (e) {
    return [];
  }
};
const getRecentResultStat = (data = [], matchId) => {
  try {
    if (data.length <= 0)
      return;
    let win2 = 0;
    let win1 = 0;
    let draw = 0;
    let lose1 = 0;
    let lose2 = 0;
    data == null ? void 0 : data.forEach((item) => {
      if ((item == null ? void 0 : item.home_team_id) === matchId) {
        const compare = parseIntO(item == null ? void 0 : item.home_scores[0]) - parseIntO(item == null ? void 0 : item.away_scores[0]);
        if (compare >= 2) {
          win2++;
        } else if (compare === 1) {
          win1++;
        } else if (compare === 0) {
          draw++;
        } else if (compare === -1) {
          lose1++;
        } else if (compare < -1) {
          lose2++;
        }
      } else if ((item == null ? void 0 : item.away_team_id) === matchId) {
        const compare = parseIntO(item == null ? void 0 : item.away_scores[0]) - parseIntO(item == null ? void 0 : item.home_scores[0]);
        if (compare >= 2) {
          win2++;
        } else if (compare === 1) {
          win1++;
        } else if (compare === 0) {
          draw++;
        } else if (compare === -1) {
          lose1++;
        } else if (compare < -1) {
          lose2++;
        }
      }
    });
    return [win2, win1, draw, lose1, lose2, win2 + win1 + draw + lose1 + lose2];
  } catch (e) {
    return [];
  }
};
const getOddsCorrectScore = (odds, homeScore, awayScore) => {
  var _a, _b;
  try {
    if (typeof odds === "undefined" || !odds)
      return "";
    const odd = (_b = (_a = odds == null ? void 0 : odds.bettingOddsItems) == null ? void 0 : _a.find((item) => (item == null ? void 0 : item.homeScore) === homeScore && (item == null ? void 0 : item.awayScore) === awayScore)) == null ? void 0 : _b.odds;
    if (odd) {
      return parseFloatO(odd);
    } else {
      return "-";
    }
  } catch (e) {
    return "-";
  }
};
const getValueByPosition = (odd, position) => {
  var _a;
  try {
    if (odd.length > 0) {
      const odds = (_a = String(odd)) == null ? void 0 : _a.split(/\s*,\s*/);
      if ((odds == null ? void 0 : odds.length) > position) {
        return odds[position] && odds[position] !== "null" ? odds[position] : "";
      }
    }
    return "";
  } catch (e) {
    return "";
  }
};
const getValueByPositionWarehourse = (odd, position) => {
  var _a, _b, _c, _d;
  try {
    if (odd.length > 0) {
      const odds = (_d = (_c = (_b = (_a = String(odd)) == null ? void 0 : _a.replace(new RegExp(escapeRegExp("["), "g"), "")) == null ? void 0 : _b.replace(new RegExp(escapeRegExp("'"), "g"), "")) == null ? void 0 : _c.replace(new RegExp(escapeRegExp("]"), "g"), "")) == null ? void 0 : _d.split(/\s*,\s*/);
      if ((odds == null ? void 0 : odds.length) > position) {
        return odds[position] && odds[position] !== "null" ? odds[position] : "";
      }
    }
    return "";
  } catch (e) {
    return "";
  }
};
const getDetailOddsChange = (data = [], typeOdd = "", group = "", position = 0) => {
  var _a, _b;
  try {
    if ((data == null ? void 0 : data.length) <= 0)
      return "-";
    const oddData = data == null ? void 0 : data.find(({ type }) => type === typeOdd);
    if (oddData == null ? void 0 : oddData[group]) {
      const data2 = JSON.parse((_a = oddData[group]) == null ? void 0 : _a.replace(new RegExp(escapeRegExp("'"), "g"), '"'));
      if (data2[position]) {
        const oddValue = data2[position];
        if (oddData == null ? void 0 : oddData[group + "_older"]) {
          const dataOlder = JSON.parse((_b = oddData[group + "_older"]) == null ? void 0 : _b.replace(new RegExp(escapeRegExp("'"), "g"), '"'));
          if (dataOlder[position]) {
            const oddOlderValue = dataOlder[position];
            if (parseFloat(oddValue) > parseFloat(oddOlderValue)) {
              return '<div class="up">' + (parseFloatO(oddValue) !== 0 ? parseFloatO(oddValue).toFixed(2) : 0) + "</div>";
            } else if (parseFloat(oddValue) < parseFloat(oddOlderValue)) {
              return '<div class="down">' + (parseFloatO(oddValue) !== 0 ? parseFloatO(oddValue).toFixed(2) : 0) + "</div>";
            } else {
              return parseFloatO(oddValue) !== 0 ? parseFloatO(oddValue).toFixed(2) : 0;
            }
          }
        }
        return data2[position];
      }
    }
    return "";
  } catch (e) {
    return "";
  }
};
const generateMetaSeo = (meta, home_name, home_away, time = "", timeZone = "", competition_name = "") => {
  var _a, _b, _c, _d;
  try {
    return (_d = (_c = (_b = (_a = meta == null ? void 0 : meta.replaceAll("${home_name}", home_name)) == null ? void 0 : _a.replaceAll("${away_name}", home_away)) == null ? void 0 : _b.replaceAll("${date}", formatDateMomentUTCTimeZone(time, "DD-MM-yyyy", timeZone))) == null ? void 0 : _c.replaceAll("${time}", formatDateMomentUTCTimeZone(time, "HH:mm", timeZone))) == null ? void 0 : _d.replaceAll("${competition_name}", competition_name);
  } catch (e) {
    return meta;
  }
};
const generateCompetitionMetaSeo = (meta, competition_name) => {
  try {
    return meta == null ? void 0 : meta.replaceAll("${competition_name}", competition_name);
  } catch (e) {
    return meta;
  }
};
const generateTeamMetaSeo = (meta, team_name) => {
  try {
    return meta == null ? void 0 : meta.replaceAll("${team_name}", team_name).replaceAll("${player_name}", team_name).replaceAll("${coach_name}", team_name);
  } catch (e) {
    return meta;
  }
};

export { getOddChange as A, getClassOddChange as B, getOddOfData as C, getClassOddCornerChange as D, getOddsCorrectScore as E, groupBy as F, generateTeamMetaSeo as G, groupByTimeAndComp as H, getStatusDisplayMobile as I, getOdds as J, getCorner as K, getDetailOddsChange as L, getRecentResultTheSport as M, generateCompetitionMetaSeo as N, getValueByPositionWarehourse as O, getLastResult as P, getLiveScoreImage as a, getStatusDisplay as b, getOddNumberToNegativeTX as c, decodeDataAPI as d, getDetailOdds as e, getOddCornerValue as f, generateMetaSeo as g, getClassOddCorner as h, getIncidents as i, getIncidentsRight as j, getStats as k, getRecentResultStat as l, getValueByPosition as m, getDataObject as n, getStateComparison as o, getOddNumber as p, getH2HOddEU as q, getH2HOddHadicap as r, getH2HOddTX as s, getH2HStatistics as t, getDataComparison as u, getStaticsOdd as v, getStandingLastest as w, getDataObjectByList as x, getH2hComparison as y, getOddNumberToNegative as z };
//# sourceMappingURL=livescore_helper-4bdWaxk-.mjs.map
