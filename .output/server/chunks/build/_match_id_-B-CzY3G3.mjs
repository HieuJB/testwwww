import { u as useRoute, b as useCookie, f as __nuxt_component_0$2 } from './server.mjs';
import { _ as __nuxt_component_0 } from './server-placeholder-BFzIFO-1.mjs';
import { g as getConfig, p as parseFloatO, a as parseIntO } from './helper-CGhdpGxz.mjs';
import { O as ODD_COMPANY_DEFAULT, b as ODD_COMPANYS, M as MATCH_TAB, I as ISPORT_COMPANY_DEFAULT } from './constants-DJp0NbxW.mjs';
import { defineComponent, mergeModels, ref, computed, useModel, watch, reactive, nextTick, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { R as ROUTERS, A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { c as getOddNumberToNegativeTX, e as getDetailOdds, f as getOddCornerValue, h as getClassOddCorner, i as getIncidents, j as getIncidentsRight, k as getStats, l as getRecentResultStat, m as getValueByPosition, n as getDataObject, o as getStateComparison } from './livescore_helper-4bdWaxk-.mjs';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { s as socketStore } from './wsocket-BREvIJI8.mjs';
import { u as useMatchStore } from './useMatchStore-Dgc_MSrX.mjs';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import { useWindowScroll } from '@vueuse/core';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'devalue';
import '@unhead/addons';
import 'vue3-snackbar';
import 'vue-bundle-renderer/runtime';
import '@unhead/ssr';
import './fetch-CC0zbYw2.mjs';
import './createUrl-DyOxdY5I.mjs';
import './moment_helper-C2kP4D4M.mjs';
import 'moment-timezone';
import 'crypto-js';
import 'pako';
import 'buffer';

const _imports_0 = publicAssetsURL("/img/incident/1.png");
const _imports_1 = publicAssetsURL("/img/incident/2.png");
const _imports_2 = publicAssetsURL("/img/incident/3.png");
const _imports_3 = publicAssetsURL("/img/incident/4.png");
const _imports_4 = publicAssetsURL("/img/incident/5.png");
const _imports_5 = publicAssetsURL("/img/incident/6.png");
const _imports_6 = publicAssetsURL("/img/incident/36.png");
const _imports_7 = publicAssetsURL("/img/incident/8.png");
const _imports_8 = publicAssetsURL("/img/incident/9.png");
const _imports_9 = publicAssetsURL("/img/incident/9.2.png");
const _imports_10 = publicAssetsURL("/img/incident/11.png");
const _imports_11 = publicAssetsURL("/img/incident/12.png");
const _imports_12 = publicAssetsURL("/img/incident/55.png");
const _imports_13 = publicAssetsURL("/img/incident/15.png");
const _imports_14 = publicAssetsURL("/img/incident/16.png");
const _imports_15 = publicAssetsURL("/img/incident/17.png");
const _imports_16 = publicAssetsURL("/img/incident/32.png");
const _imports_17 = publicAssetsURL("/img/incident/30.png");
const _imports_18 = publicAssetsURL("/img/incident/33.png");
const _imports_19 = publicAssetsURL("/img/incident/31.png");
const _imports_20 = publicAssetsURL("/img/incident/34.png");
const _imports_21 = publicAssetsURL("/img/incident/28.png");
const breakpoint = 768;
const wrapperClass = "tr-wrapper";
const productSelectorClass = "product-selector";
const activeClass = "active";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[match_id]",
  __ssrInlineRender: true,
  props: {
    "matchTitle": {},
    "matchTitleModifiers": {},
    "matchContent": {},
    "matchContentModifiers": {},
    "initDataMatch": {},
    "initDataMatchModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["socketData"], ["update:matchTitle", "update:matchContent", "update:initDataMatch"]),
  async setup(__props, { emit: __emit }) {
    var _a, _b;
    let __temp, __restore;
    const storeSystems = systemsStore();
    const availableStreamUrl = getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "available_stream_url");
    const { y } = useWindowScroll();
    const showAnimation = ref(false);
    const keyEncode = ref("");
    socketStore();
    const matchStore = useMatchStore();
    const route = useRoute();
    const activeSectionTable = ref("ThirtyrateOfScored");
    const iconsVisible = ref(false);
    const activeSection = ref("lineup");
    const matchLiveDetail = ref([]);
    const matchLiveDetailIncidents = ref([]);
    const matchsRecentDetail = ref([]);
    const matchOddsCorner = ref([]);
    const oddsDetail = ref();
    const oddsOverUnderDetail = ref();
    const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
    const oddCompanyIsportSelected = computed(() => {
      const oddCompany = ODD_COMPANYS.find(({ id }) => id === oddCompanySelected.value);
      return oddCompany == null ? void 0 : oddCompany.isportsapi;
    });
    const oddCompanyIsport = ref(oddCompanyIsportSelected);
    const lineupDataList = ref();
    const isLoadingData = ref(false);
    const matchIdSlug = ref(((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.id) || "");
    const matchRecentResult = ref([]);
    const stateComparison = ref([]);
    const matchesAnalysis = ref([]);
    const oddsDetailResDataHistories = ref([]);
    const oddsDetailHistories = ref([]);
    ref([]);
    const oddsDetailHistoriesLength = ref();
    const detailHfSel = ref(1);
    const oddCompanys = ref([]);
    ODD_COMPANYS.forEach((item) => {
      oddCompanys.value[item == null ? void 0 : item.id] = item;
    });
    const detailMobileOddOverUnderHistories = ref([]);
    ref(10);
    ref(true);
    ref(true);
    ref(true);
    ref(true);
    ref(true);
    ref(true);
    ref(true);
    ref(true);
    ref(13);
    const swTabs_22 = ref(13);
    const eventSocketData = ref();
    const selectedProduct = ref("product-1");
    const isMobileView = ref(false);
    const mobileContents = ref([]);
    const table = ref(null);
    ref(null);
    const settingsData = useCookie("settingsData");
    ref(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") || ((_b = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _b.timeZone));
    const matchTitle = useModel(__props, "matchTitle");
    const matchContent = useModel(__props, "matchContent");
    const initDataMatch = useModel(__props, "initDataMatch");
    const emit = __emit;
    watch(
      () => route.path,
      (newPath) => {
        var _a2;
        matchIdSlug.value = ((_a2 = route == null ? void 0 : route.params) == null ? void 0 : _a2.id) || "";
      },
      { immediate: true }
    );
    const lineup = reactive({ home: [], away: [] });
    const lineBackup = reactive({ home: [], away: [] });
    const isBackupPlayVisible = ref(false);
    const homeTeamName = computed(
      () => {
        var _a2, _b2;
        return ((_b2 = (_a2 = matchsRecentDetail.value.match) == null ? void 0 : _a2.home_team) == null ? void 0 : _b2.name) || "";
      }
    );
    const awayTeamName = computed(
      () => {
        var _a2, _b2;
        return ((_b2 = (_a2 = matchsRecentDetail.value.match) == null ? void 0 : _a2.away_team) == null ? void 0 : _b2.name) || "";
      }
    );
    const homeFormation = computed(
      () => {
        var _a2;
        return ((_a2 = lineupDataList.value) == null ? void 0 : _a2.home_formation) || "";
      }
    );
    const awayFormation = computed(
      () => {
        var _a2;
        return ((_a2 = lineupDataList.value) == null ? void 0 : _a2.away_formation) || "";
      }
    );
    const liveStream = computed(
      () => {
        var _a2, _b2;
        return ((_b2 = (_a2 = matchsRecentDetail.value.match) == null ? void 0 : _a2.match_info) == null ? void 0 : _b2.variable_stream) || false;
      }
    );
    const matchIdLive = computed(
      () => {
        var _a2;
        return ((_a2 = matchsRecentDetail.value.match) == null ? void 0 : _a2.id) || "";
      }
    );
    const shootTime = ref([]);
    ref();
    ref();
    ref(false);
    ref();
    ref();
    ref("");
    const fetchMatchLineup = async () => {
      isLoadingData.value = true;
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.MATCHS_LINEUP + "/" + matchIdSlug.value
      ).then((resData) => {
        var _a3, _b3, _c2, _d2;
        var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
        lineupDataList.value = resData;
        lineup.home = (_a3 = (_b2 = (_a2 = lineupDataList.value) == null ? void 0 : _a2.lineup) == null ? void 0 : _b2.home.filter(
          (player) => player.x !== 0 && player.y !== 0
        )) != null ? _a3 : [];
        lineup.away = (_b3 = (_d = (_c = lineupDataList.value) == null ? void 0 : _c.lineup) == null ? void 0 : _d.away.filter(
          (player) => player.x !== 0 && player.y !== 0
        )) != null ? _b3 : [];
        lineBackup.home = (_c2 = (_f = (_e = lineupDataList.value) == null ? void 0 : _e.lineup) == null ? void 0 : _f.home.filter(
          (player) => player.x === 0 && player.y === 0
        )) != null ? _c2 : [];
        lineBackup.away = (_d2 = (_h = (_g = lineupDataList.value) == null ? void 0 : _g.lineup) == null ? void 0 : _h.away.filter(
          (player) => player.x === 0 && player.y === 0
        )) != null ? _d2 : [];
        activeSection.value = ((_i = lineup == null ? void 0 : lineup.home) == null ? void 0 : _i.length) === 0 && ((_j = lineup == null ? void 0 : lineup.away) == null ? void 0 : _j.length) === 0 ? "animation" : "lineup";
        setTimeout(() => {
          isLoadingData.value = false;
        }, 500);
      });
    };
    const getPlayerStyle = (player, teamType) => {
      if (teamType === "home") {
        return { bottom: player.x - 10 + "%", left: player.y - 10 + "%" };
      } else if (teamType === "away") {
        return { top: player.x - 10 + "%", right: player.y - 10 + "%" };
      }
      return {};
    };
    const fetchMatchsLiveDetail = async () => {
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.MATCHS_LIVE_DETAIL + "/" + matchIdSlug.value
      ).then((resData) => {
        var _a2;
        if (resData) {
          matchLiveDetail.value = resData;
          matchLiveDetailIncidents.value = ((_a2 = resData == null ? void 0 : resData.incidents) == null ? void 0 : _a2.reverse()) || [];
        }
      });
    };
    const fetchMatchRecentResult = async (match) => {
      var _a2;
      await useApiLiveScore(API_ROUTERS.LIVESCORE.MATCH_RECENT_RESULT, {
        season_id: (_a2 = match == null ? void 0 : match.stage) == null ? void 0 : _a2.season_id
      }).then((resData) => {
        var _a3, _b2, _c;
        if (resData) {
          const data = (_a3 = resData == null ? void 0 : resData.results) == null ? void 0 : _a3.filter((match2) => (match2 == null ? void 0 : match2.status) === "8");
          const matchsListArray = [];
          Object.values(data).map((item) => {
            matchsListArray.push(item);
          });
          const homeRecent = matchsListArray == null ? void 0 : matchsListArray.filter((item) => {
            var _a4, _b3;
            return (item == null ? void 0 : item.home_team_id) === ((_a4 = match == null ? void 0 : match.home_team) == null ? void 0 : _a4.id) || (item == null ? void 0 : item.away_team_id) === ((_b3 = match == null ? void 0 : match.home_team) == null ? void 0 : _b3.id);
          });
          const awayRecent = matchsListArray == null ? void 0 : matchsListArray.filter((item) => {
            var _a4, _b3;
            return (item == null ? void 0 : item.home_team_id) === ((_a4 = match == null ? void 0 : match.away_team) == null ? void 0 : _a4.id) || (item == null ? void 0 : item.away_team_id) === ((_b3 = match == null ? void 0 : match.away_team) == null ? void 0 : _b3.id);
          });
          matchRecentResult.value.home = getRecentResultStat(
            homeRecent,
            (_b2 = match == null ? void 0 : match.home_team) == null ? void 0 : _b2.id
          );
          matchRecentResult.value.away = getRecentResultStat(
            awayRecent,
            (_c = match == null ? void 0 : match.away_team) == null ? void 0 : _c.id
          );
        }
      });
    };
    const fetchOddsDetail = async (match_id, company_id) => {
      var _a2, _b2;
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL, {
        match_id,
        i_company_id: (_b2 = (_a2 = ODD_COMPANYS) == null ? void 0 : _a2.find((item) => (item == null ? void 0 : item.id) === company_id)) == null ? void 0 : _b2.isportsapi
      }).then((resData) => {
        oddsDetail.value = resData;
      });
    };
    const fetchOddsOverUnderDetail = async (match_id, company_id) => {
      var _a2, _b2;
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL, {
        match_id,
        i_company_id: (_b2 = (_a2 = ODD_COMPANYS) == null ? void 0 : _a2.find((item) => (item == null ? void 0 : item.id) === company_id)) == null ? void 0 : _b2.isportsapi
      }).then((resData) => {
        oddsOverUnderDetail.value = resData;
      });
    };
    const fetchOddsCorner = async (match_id) => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_CORNER_MAIN, {
        match_id
      }).then((resData) => {
        matchOddsCorner.value = resData == null ? void 0 : resData.data;
      });
    };
    const fetchMatchesAnalysis = async (match_id) => {
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.MATCHES_ANALYSIS + "?match_id=" + match_id
      ).then((resData) => {
        var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A;
        matchesAnalysis.value = getDataObject((_a2 = resData == null ? void 0 : resData.results) == null ? void 0 : _a2[0]);
        stateComparison.value = [
          getStateComparison(
            (_b2 = matchesAnalysis.value) == null ? void 0 : _b2.home_last_matches,
            (_c = matchesAnalysis.value) == null ? void 0 : _c.away_last_matches,
            (_f = (_e = (_d = matchsRecentDetail.value) == null ? void 0 : _d.match) == null ? void 0 : _e.home_team) == null ? void 0 : _f.i_team,
            (_i = (_h = (_g = matchsRecentDetail.value) == null ? void 0 : _g.match) == null ? void 0 : _h.away_team) == null ? void 0 : _i.i_team,
            (_k = (_j = matchsRecentDetail.value) == null ? void 0 : _j.match) == null ? void 0 : _k.i_competition_id,
            3
          ),
          getStateComparison(
            (_l = matchesAnalysis.value) == null ? void 0 : _l.home_last_matches,
            (_m = matchesAnalysis.value) == null ? void 0 : _m.away_last_matches,
            (_p = (_o = (_n = matchsRecentDetail.value) == null ? void 0 : _n.match) == null ? void 0 : _o.home_team) == null ? void 0 : _p.i_team,
            (_s = (_r = (_q = matchsRecentDetail.value) == null ? void 0 : _q.match) == null ? void 0 : _r.away_team) == null ? void 0 : _s.i_team,
            (_u = (_t = matchsRecentDetail.value) == null ? void 0 : _t.match) == null ? void 0 : _u.i_competition_id,
            10
          )
        ];
        shootTime.value["sumHome"] = (_x = (_w = (_v = matchesAnalysis.value) == null ? void 0 : _v.home_shoot_time) == null ? void 0 : _w[0]) == null ? void 0 : _x.reduce(
          (sumHome, val) => sumHome + parseInt(val),
          0
        );
        shootTime.value["sumAway"] = (_A = (_z = (_y = matchesAnalysis.value) == null ? void 0 : _y.away_shoot_time) == null ? void 0 : _z[0]) == null ? void 0 : _A.reduce(
          (sumAway, val) => sumAway + parseInt(val),
          0
        );
      });
    };
    const fetchMatchsRecentDetail = async (matchIdSlug2) => {
      var _a2;
      let resData = initDataMatch.value;
      matchsRecentDetail.value.match = resData == null ? void 0 : resData[0];
      (_a2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a2.i_match_id;
      await fetchMatchesAnalysis(matchIdSlug2);
    };
    const reduceOddChangeHistory = () => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
      const detailOddHistories = [];
      let scoreKey = "0:0";
      const inplay_key = detailHfSel.value == 1 ? "inplay" : "inplay_haft";
      const hadicapList = (_c = (_b2 = (_a2 = oddsDetailResDataHistories.value) == null ? void 0 : _a2[inplay_key]) == null ? void 0 : _b2.filter((item) => (item == null ? void 0 : item.type) === 1)) == null ? void 0 : _c.reverse();
      hadicapList == null ? void 0 : hadicapList.forEach((item, index) => {
        var _a3, _b3, _c2;
        if ((item == null ? void 0 : item.home_score) + ":" + (item == null ? void 0 : item.away_score) != scoreKey || (item == null ? void 0 : item.match_time) === "HT" && !(detailOddHistories == null ? void 0 : detailOddHistories.includes("key_45_1"))) {
          const key = (item == null ? void 0 : item.match_time) === "HT" ? "key_45_1" : "key_" + (item == null ? void 0 : item.match_time);
          detailOddHistories[key] = [
            item == null ? void 0 : item.match_time,
            item == null ? void 0 : item.home_score,
            item == null ? void 0 : item.away_score,
            (_a3 = hadicapList == null ? void 0 : hadicapList[index - 1]) == null ? void 0 : _a3.odds1,
            (_b3 = hadicapList == null ? void 0 : hadicapList[index - 1]) == null ? void 0 : _b3.odds2,
            (_c2 = hadicapList == null ? void 0 : hadicapList[index - 1]) == null ? void 0 : _c2.odds3,
            item == null ? void 0 : item.odds1,
            item == null ? void 0 : item.odds2,
            item == null ? void 0 : item.odds3
          ];
        }
        scoreKey = (item == null ? void 0 : item.home_score) + ":" + (item == null ? void 0 : item.away_score);
      });
      scoreKey = "0:0";
      const overUnderList = (_f = (_e = (_d = oddsDetailResDataHistories.value) == null ? void 0 : _d[inplay_key]) == null ? void 0 : _e.filter((item) => (item == null ? void 0 : item.type) === 2)) == null ? void 0 : _f.reverse();
      overUnderList == null ? void 0 : overUnderList.forEach((item, index) => {
        var _a3, _b3, _c2;
        if ((item == null ? void 0 : item.home_score) + ":" + (item == null ? void 0 : item.away_score) != scoreKey || (item == null ? void 0 : item.match_time) === "HT" && !(detailOddHistories == null ? void 0 : detailOddHistories.includes("key_45_1"))) {
          const key = (item == null ? void 0 : item.match_time) === "HT" ? "key_45_1" : "key_" + (item == null ? void 0 : item.match_time);
          if (!(detailOddHistories == null ? void 0 : detailOddHistories[key])) {
            detailOddHistories[key] = [];
          }
          detailOddHistories[key][0] = item == null ? void 0 : item.match_time;
          detailOddHistories[key][1] = item == null ? void 0 : item.home_score;
          detailOddHistories[key][2] = item == null ? void 0 : item.away_score;
          detailOddHistories[key][9] = (_a3 = overUnderList == null ? void 0 : overUnderList[index - 1]) == null ? void 0 : _a3.odds1, detailOddHistories[key][10] = (_b3 = overUnderList == null ? void 0 : overUnderList[index - 1]) == null ? void 0 : _b3.odds2, detailOddHistories[key][11] = (_c2 = overUnderList == null ? void 0 : overUnderList[index - 1]) == null ? void 0 : _c2.odds3, detailOddHistories[key][12] = item == null ? void 0 : item.odds1;
          detailOddHistories[key][13] = item == null ? void 0 : item.odds2;
          detailOddHistories[key][14] = item == null ? void 0 : item.odds3;
        }
        scoreKey = (item == null ? void 0 : item.home_score) + ":" + (item == null ? void 0 : item.away_score);
      });
      scoreKey = "0:0";
      const euroHandicapList = (_i = (_h = (_g = oddsDetailResDataHistories.value) == null ? void 0 : _g[inplay_key]) == null ? void 0 : _h.filter((item) => (item == null ? void 0 : item.type) === 4)) == null ? void 0 : _i.reverse();
      euroHandicapList == null ? void 0 : euroHandicapList.forEach((item, index) => {
        var _a3, _b3, _c2;
        if ((item == null ? void 0 : item.home_score) + ":" + (item == null ? void 0 : item.away_score) != scoreKey || (item == null ? void 0 : item.match_time) === "HT" && !(detailOddHistories == null ? void 0 : detailOddHistories.includes("key_45_1"))) {
          const key = (item == null ? void 0 : item.match_time) === "HT" ? "key_45_1" : "key_" + (item == null ? void 0 : item.match_time);
          if (!(detailOddHistories == null ? void 0 : detailOddHistories[key])) {
            detailOddHistories[key] = [];
          }
          detailOddHistories[key][0] = item == null ? void 0 : item.match_time;
          detailOddHistories[key][1] = item == null ? void 0 : item.home_score;
          detailOddHistories[key][2] = item == null ? void 0 : item.away_score;
          detailOddHistories[key][15] = (_a3 = euroHandicapList == null ? void 0 : euroHandicapList[index - 1]) == null ? void 0 : _a3.odds1, detailOddHistories[key][16] = (_b3 = euroHandicapList == null ? void 0 : euroHandicapList[index - 1]) == null ? void 0 : _b3.odds2, detailOddHistories[key][17] = (_c2 = euroHandicapList == null ? void 0 : euroHandicapList[index - 1]) == null ? void 0 : _c2.odds3, detailOddHistories[key][18] = item == null ? void 0 : item.odds1;
          detailOddHistories[key][19] = item == null ? void 0 : item.odds2;
          detailOddHistories[key][20] = item == null ? void 0 : item.odds3;
        }
        scoreKey = (item == null ? void 0 : item.home_score) + ":" + (item == null ? void 0 : item.away_score);
      });
      oddsDetailHistories.value = detailOddHistories;
      oddsDetailHistoriesLength.value = (_j = Object.keys(oddsDetailHistories.value)) == null ? void 0 : _j.length;
    };
    ref([]);
    const reduceMobileOddOverUnderChangeHistory = (company_id) => {
      var _a2, _b2, _c;
      const detailOddHistories = [];
      detailOddHistories[company_id] = [];
      detailOddHistories[company_id]["overUnder"] = [];
      let scoreKey = "0:0";
      const inplay_key = "inplay";
      scoreKey = "0:0";
      const overUnderList = (_c = (_b2 = (_a2 = oddsDetailResDataHistories.value) == null ? void 0 : _a2[inplay_key]) == null ? void 0 : _b2.filter((item) => (item == null ? void 0 : item.type) === 2)) == null ? void 0 : _c.reverse();
      overUnderList == null ? void 0 : overUnderList.forEach((item, index) => {
        var _a3, _b3, _c2;
        if ((item == null ? void 0 : item.home_score) + ":" + (item == null ? void 0 : item.away_score) != scoreKey || (item == null ? void 0 : item.match_time) === "HT" && !(detailOddHistories == null ? void 0 : detailOddHistories.includes("45_1"))) {
          const key = (item == null ? void 0 : item.match_time) === "HT" ? "45_1" : item == null ? void 0 : item.match_time;
          detailOddHistories[company_id]["overUnder"][key] = [
            item == null ? void 0 : item.match_time,
            item == null ? void 0 : item.home_score,
            item == null ? void 0 : item.away_score,
            (_a3 = overUnderList == null ? void 0 : overUnderList[index - 1]) == null ? void 0 : _a3.odds1,
            (_b3 = overUnderList == null ? void 0 : overUnderList[index - 1]) == null ? void 0 : _b3.odds2,
            (_c2 = overUnderList == null ? void 0 : overUnderList[index - 1]) == null ? void 0 : _c2.odds3,
            item == null ? void 0 : item.odds1,
            item == null ? void 0 : item.odds2,
            item == null ? void 0 : item.odds3
          ];
        }
        scoreKey = (item == null ? void 0 : item.home_score) + ":" + (item == null ? void 0 : item.away_score);
      });
      detailMobileOddOverUnderHistories.value = detailOddHistories[company_id]["overUnder"];
    };
    const fetchOddsChangeHistory = async (company_id) => {
      var _a2, _b2;
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_CHANGE_HISTORY, {
        match_id: matchIdSlug.value,
        i_company_id: (_b2 = (_a2 = ODD_COMPANYS) == null ? void 0 : _a2.find((item) => (item == null ? void 0 : item.id) === company_id)) == null ? void 0 : _b2.isportsapi
      }).then((resData) => {
        oddsDetailResDataHistories.value = resData == null ? void 0 : resData.data;
        reduceOddChangeHistory();
      });
    };
    const fetchOddsOverUnderChangeHistory = async (company_id) => {
      var _a2, _b2;
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_CHANGE_HISTORY, {
        match_id: matchIdSlug.value,
        i_company_id: (_b2 = (_a2 = ODD_COMPANYS) == null ? void 0 : _a2.find((item) => (item == null ? void 0 : item.id) === company_id)) == null ? void 0 : _b2.isportsapi
      }).then((resData) => {
        oddsDetailResDataHistories.value = resData == null ? void 0 : resData.data;
        reduceMobileOddOverUnderChangeHistory(company_id);
      });
    };
    watch(
      detailHfSel,
      () => {
        reduceOddChangeHistory();
      },
      { immediate: true }
    );
    watch(
      oddCompanySelected,
      () => {
        const company = ODD_COMPANYS.find(({ id }) => id === oddCompanySelected.value);
        oddCompanyIsport.value = company == null ? void 0 : company.thesports;
        fetchOddsChangeHistory(oddCompanySelected.value);
      },
      { immediate: true }
    );
    watch(
      swTabs_22,
      () => {
        fetchOddsOverUnderDetail(matchIdSlug.value, swTabs_22.value);
        fetchOddsOverUnderChangeHistory(swTabs_22.value);
      },
      { immediate: true }
    );
    const wssMatch = (socketData) => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
      if (socketData) {
        try {
          const wssItem = socketData;
          eventSocketData.value = wssItem;
          emit("socketData", wssItem);
          if (wssItem.topic == "livescore/football/iodds_corner/v1") {
            const matchOdds = wssItem.payload.inplay;
            if (matchOdds) {
              for (const matchOdd of matchOdds) {
                const companyId = matchOdd == null ? void 0 : matchOdd.companyId;
                if ((matchOdd == null ? void 0 : matchOdd.matchId) == ((_b2 = (_a2 = matchsRecentDetail.value) == null ? void 0 : _a2.match) == null ? void 0 : _b2.i_match_id) && companyId == ISPORT_COMPANY_DEFAULT) {
                  if (!((_c = matchOddsCorner.value) == null ? void 0 : _c.corner)) {
                    matchOddsCorner.value.corner = [];
                  }
                  matchOddsCorner.value.corner.live_older = ((_e = (_d = matchOddsCorner.value) == null ? void 0 : _d.corner) == null ? void 0 : _e.live) ? JSON.parse(JSON.stringify(matchOddsCorner.value.corner.live)) : [];
                  matchOddsCorner.value.corner.live = [{
                    i_company_id: companyId,
                    over: (_f = matchOdd == null ? void 0 : matchOdd.odds) == null ? void 0 : _f.over,
                    total_corners: (_g = matchOdd == null ? void 0 : matchOdd.odds) == null ? void 0 : _g.totalCorners,
                    under: (_h = matchOdd == null ? void 0 : matchOdd.odds) == null ? void 0 : _h.under
                  }];
                }
              }
            }
          } else if (wssItem.topic == "livescore/football/iodds_hdc_corner/v1") {
            const matchOdds = wssItem.payload.inplay;
            if (matchOdds) {
              for (const matchOdd of matchOdds) {
                const companyId = matchOdd == null ? void 0 : matchOdd.companyId;
                if ((matchOdd == null ? void 0 : matchOdd.matchId) == ((_j = (_i = matchsRecentDetail.value) == null ? void 0 : _i.match) == null ? void 0 : _j.i_match_id) && companyId == ISPORT_COMPANY_DEFAULT) {
                  if (!((_k = matchOddsCorner.value) == null ? void 0 : _k.hadicap)) {
                    matchOddsCorner.value.hadicap = [];
                  }
                  const hadicap = (_l = matchOddsCorner.value.hadicap) == null ? void 0 : _l[0];
                  if (hadicap) {
                    hadicap.inplay_older = (hadicap == null ? void 0 : hadicap.inplay) ? JSON.parse(JSON.stringify(hadicap == null ? void 0 : hadicap.inplay)) : [];
                    hadicap.inplay = "['" + ((_m = matchOdd == null ? void 0 : matchOdd.odds) == null ? void 0 : _m.handicapCorners) + "','" + ((_n = matchOdd == null ? void 0 : matchOdd.odds) == null ? void 0 : _n.home) + "','" + ((_o = matchOdd == null ? void 0 : matchOdd.odds) == null ? void 0 : _o.away) + "']";
                  }
                }
              }
            }
          } else if ((_p = wssItem.payload) == null ? void 0 : _p.iodds) {
            const matchOdds = wssItem.payload.iodds;
            const keyList = Object.keys(oddsDetailHistories.value).sort();
            const lengthKeyList = keyList == null ? void 0 : keyList.length;
            const lastElementHistory = oddsDetailHistories.value[keyList[lengthKeyList - 1]];
            if (lastElementHistory) {
              if (matchOdds == null ? void 0 : matchOdds.handicap) {
                for (const matchOdd of matchOdds.handicap) {
                  const matchId = parseIntO(getValueByPosition(matchOdd, 0));
                  const companyId = getValueByPosition(matchOdd, 1);
                  if (parseInt(companyId) == parseInt(oddCompanyIsport.value) && matchId == ((_r = (_q = matchsRecentDetail.value) == null ? void 0 : _q.match) == null ? void 0 : _r.i_match_id)) {
                    lastElementHistory[6] = getValueByPosition(matchOdd, 3);
                    lastElementHistory[7] = getValueByPosition(matchOdd, 2);
                    lastElementHistory[8] = getValueByPosition(matchOdd, 4);
                  }
                }
              }
              if (matchOdds == null ? void 0 : matchOdds.overUnder) {
                for (const matchOdd of matchOdds.overUnder) {
                  const matchId = parseIntO(getValueByPosition(matchOdd, 0));
                  const companyId = getValueByPosition(matchOdd, 1);
                  if (parseInt(companyId) == parseInt(oddCompanyIsport.value) && matchId == ((_t = (_s = matchsRecentDetail.value) == null ? void 0 : _s.match) == null ? void 0 : _t.i_match_id)) {
                    lastElementHistory[12] = getValueByPosition(matchOdd, 2);
                    lastElementHistory[13] = getValueByPosition(matchOdd, 3);
                    lastElementHistory[14] = getValueByPosition(matchOdd, 4);
                  }
                }
              }
              if (matchOdds == null ? void 0 : matchOdds.europeOdds) {
                for (const matchOdd of matchOdds.europeOdds) {
                  const matchId = parseIntO(getValueByPosition(matchOdd, 0));
                  const companyId = getValueByPosition(matchOdd, 1);
                  if (parseInt(companyId) == parseInt(oddCompanyIsport.value) && matchId == ((_v = (_u = matchsRecentDetail.value) == null ? void 0 : _u.match) == null ? void 0 : _v.i_match_id)) {
                    lastElementHistory[18] = getValueByPosition(matchOdd, 2);
                    lastElementHistory[19] = getValueByPosition(matchOdd, 3);
                    lastElementHistory[20] = getValueByPosition(matchOdd, 4);
                  }
                }
              }
            }
          } else if (wssItem.payload) {
            const matchScores = wssItem.payload;
            for (const match of matchScores) {
              const matchId = match.id;
              if (((_x = (_w = matchLiveDetail.value) == null ? void 0 : _w.match) == null ? void 0 : _x.id) == matchId && (match == null ? void 0 : match.score)) {
                matchLiveDetail.value.match.home_scores[0] = (_z = (_y = match == null ? void 0 : match.score) == null ? void 0 : _y[2]) == null ? void 0 : _z[0];
                matchLiveDetail.value.match.away_scores[0] = (_B = (_A = match == null ? void 0 : match.score) == null ? void 0 : _A[3]) == null ? void 0 : _B[0];
              }
            }
          }
        } catch (e) {
          return false;
        }
      }
    };
    const updateColspan = () => {
      if (!table.value)
        return;
      if ((void 0).innerWidth >= breakpoint) {
        isMobileView.value = false;
        table.value.querySelectorAll("[data-mobile-content]").forEach((th) => {
          th.setAttribute("colspan", "1");
        });
        table.value.querySelectorAll("[data-product]").forEach((td) => {
          td.style.display = "table-cell";
        });
      } else {
        isMobileView.value = true;
        table.value.querySelectorAll("[data-mobile-content]").forEach((th) => {
          th.setAttribute("colspan", "2");
        });
        selectProduct(selectedProduct.value);
      }
    };
    const selectProduct = (product) => {
      selectedProduct.value = product;
      if (!table.value)
        return;
      table.value.querySelectorAll("[data-product]").forEach((td) => {
        td.style.display = "none";
      });
      table.value.querySelectorAll(`[data-product="${product}"]`).forEach((td) => {
        td.style.display = "table-cell";
      });
      table.value.querySelectorAll("th[data-product]").forEach((th) => {
        th.classList.remove(activeClass);
      });
      table.value.querySelectorAll(`th[data-product="${product}"]`).forEach((th) => {
        th.classList.add(activeClass);
      });
    };
    watch([detailHfSel, oddCompanySelected], () => {
      nextTick(() => {
        selectProduct(selectedProduct.value);
        updateColspan();
      });
    });
    watch(isMobileView, () => {
      updateColspan();
      selectProduct(selectedProduct.value);
    });
    watch(
      matchStore,
      () => {
        wssMatch(matchStore == null ? void 0 : matchStore.socketData);
      },
      { deep: true, immediate: true }
    );
    watch(
      y,
      () => {
        if (y.value > 0) {
          showAnimation.value = true;
        }
      },
      { deep: true, immediate: true }
    );
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecentDetail(matchIdSlug.value)), await __temp, __restore();
    fetchMatchRecentResult(matchIdSlug.value);
    fetchMatchsLiveDetail(matchIdSlug.value);
    fetchOddsDetail(matchIdSlug.value, oddCompanySelected.value);
    fetchOddsCorner(matchIdSlug.value);
    fetchMatchLineup();
    fetchOddsChangeHistory(oddCompanySelected.value);
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb, _cb, _db, _eb, _fb, _gb, _hb, _ib, _jb, _kb, _lb, _mb, _nb, _ob, _pb, _qb, _rb, _sb, _tb, _ub, _vb, _wb, _xb, _yb, _zb, _Ab, _Bb, _Cb, _Db, _Eb, _Fb, _Gb, _Hb, _Ib, _Jb, _Kb, _Lb, _Mb, _Nb, _Ob, _Pb, _Qb, _Rb, _Sb, _Tb, _Ub, _Vb, _Wb, _Xb, _Yb, _Zb, __b, _$b, _ac, _bc, _cc, _dc, _ec, _fc, _gc, _hc, _ic, _jc, _kc, _lc, _mc, _nc, _oc, _pc, _qc, _rc, _sc, _tc, _uc, _vc, _wc, _xc, _yc, _zc, _Ac, _Bc, _Cc, _Dc, _Ec, _Fc, _Gc, _Hc, _Ic, _Jc, _Kc, _Lc, _Mc, _Nc, _Oc, _Pc, _Qc, _Rc, _Sc, _Tc, _Uc, _Vc, _Wc, _Xc, _Yc, _Zc, __c, _$c, _ad, _bd, _cd;
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_PlayBoxComponent = __nuxt_component_0;
      const _component_PlayBackupComponent = __nuxt_component_0;
      const _component_AnimationComponent = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "",
        class: "match-detail"
      }, _attrs))}><div id=""><div class="content"><div class="content" id="oddsDiv"><div><h2 class="team-table-title"> K\xE8o tr\u1EF1c tuy\u1EBFn <select id="detail-hfSel"><option value="1"${ssrIncludeBooleanAttr(Array.isArray(detailHfSel.value) ? ssrLooseContain(detailHfSel.value, "1") : ssrLooseEqual(detailHfSel.value, "1")) ? " selected" : ""}>FT</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(detailHfSel.value) ? ssrLooseContain(detailHfSel.value, "2") : ssrLooseEqual(detailHfSel.value, "2")) ? " selected" : ""}>HT</option></select><select id="detail-oddsSel"><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (odd_company, index) => {
        _push(`<option${ssrRenderAttr("value", odd_company == null ? void 0 : odd_company.id)}>${ssrInterpolate(odd_company == null ? void 0 : odd_company.name)}</option>`);
      });
      _push(`<!--]--></select></h2><div class="${ssrRenderClass([wrapperClass, "oddsDiv"])}"><div class="${ssrRenderClass(productSelectorClass)}" style="${ssrRenderStyle([
        isMobileView.value ? null : { display: "none" },
        { "display": "flex" }
      ])}"><!--[-->`);
      ssrRenderList(mobileContents.value, (content, index) => {
        _push(`<span${ssrRenderAttr("data-product", "product-" + (index + 1))} class="${ssrRenderClass({ active: selectedProduct.value === "product-" + (index + 1) })}">${ssrInterpolate(content)}</span>`);
      });
      _push(`<!--]--></div><table id="oddsTable31" class="tr-table team-table-other oddsTable text-center"><thead><tr><th data-mobile-collapse></th><th data-mobile-content="HDP"><b>HDP</b></th><th data-mobile-content="T\xE0i x\u1EC9u" data-featured><b>T\xE0i x\u1EC9u</b></th><th data-mobile-content="1x2"><b>1x2</b></th></tr></thead><tbody><tr><th><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center title-table"><span>Gi\u1EDD</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center title-table"><span>T\u1EF7 s\u1ED1</span></div></div></th><td data-product="product-1"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1"><span>S\u1EDBm</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg2"><span><b>Live</b></span></div></div></td><td data-product="product-2"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1"><span>S\u1EDBm</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg2"><span><b>Live</b></span></div></div></td><td data-product="product-3"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1"><span>S\u1EDBm</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg2"><span><b>Live</b></span></div></div></td></tr>`);
      if (detailHfSel.value == 2) {
        _push(`<tr><th><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center fx-green"><span>S\u1EDBm</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center red_number"><span class="rl"></span></div></div></th><td data-product="product-1"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "initial", 2)))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="ll">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="rl">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "initial", 2)))}</span></div></div></div></div></td><td data-product="product-2"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 2)))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="ll">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="rl">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 2)))}</span></div></div></div></div></td><td data-product="product-3"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOddsHalf", "initial", 1))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOddsHalf", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOddsHalf", "initial", 2))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="ll">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOddsHalf", "initial", 1))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOddsHalf", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="rl">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOddsHalf", "initial", 2))}</span></div></div></div></div></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      if (detailHfSel.value == 1) {
        _push(`<tr><th><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center fx-green"><span>S\u1EDBm</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center red_number"><span class="rl"></span></div></div></th><td data-product="product-1"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 2)))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="ll">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="rl">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 2)))}</span></div></div></div></div></td><td data-product="product-2"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 2)))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="ll">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="rl">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 2)))}</span></div></div></div></div></td><td data-product="product-3"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 1))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 2))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="ll">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 1))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="rl">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 2))}</span></div></div></div></div></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      if (detailHfSel.value == 1) {
        _push(`<tr><th><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center fx-red"><span>Live</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center red_number"><span class="rl"></span></div></div></th><td data-product="product-1"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 2)))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="ll">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="rl">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 2)))}</span></div></div></div></div></td><td data-product="product-2"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 2)))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="ll">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="rl">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 2)))}</span></div></div></div></div></td><td data-product="product-3"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 1))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 2))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="ll">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 1))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2"><span class="rl">${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 2))}</span></div></div></div></div></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(Object.keys(oddsDetailHistories.value).sort(), (item, index) => {
        var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2, _y2, _z2, _A2, _B2, _C2, _D2, _E2, _F2, _G2, _H2, _I2, _J2, _K2, _L2, _M2, _N2, _O2, _P2;
        _push(`<tr><th><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center fx-blue"><span>${ssrInterpolate((_b3 = (_a3 = oddsDetailHistories.value) == null ? void 0 : _a3[item]) == null ? void 0 : _b3[0])}</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center red_number"><span class="rl">${ssrInterpolate((_d2 = (_c2 = oddsDetailHistories.value) == null ? void 0 : _c2[item]) == null ? void 0 : _d2[1])}:${ssrInterpolate((_f2 = (_e2 = oddsDetailHistories.value) == null ? void 0 : _e2[item]) == null ? void 0 : _f2[2])}</span></div></div></th><td data-product="product-1" style="${ssrRenderStyle({ "display": "table-cell" })}"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_h2 = (_g2 = oddsDetailHistories.value) == null ? void 0 : _g2[item]) == null ? void 0 : _h2[3]))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate((_j2 = (_i2 = oddsDetailHistories.value) == null ? void 0 : _i2[item]) == null ? void 0 : _j2[4])}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_l2 = (_k2 = oddsDetailHistories.value) == null ? void 0 : _k2[item]) == null ? void 0 : _l2[5]))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}"><span class="ll">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_n2 = (_m2 = oddsDetailHistories.value) == null ? void 0 : _m2[item]) == null ? void 0 : _n2[6]))}</span></div><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}"><span class="">${ssrInterpolate((_p2 = (_o2 = oddsDetailHistories.value) == null ? void 0 : _o2[item]) == null ? void 0 : _p2[7])}</span></div><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}"><span class="rl">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_r2 = (_q2 = oddsDetailHistories.value) == null ? void 0 : _q2[item]) == null ? void 0 : _r2[8]))}</span></div></div></div></div></td><td data-product="product-2"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_t2 = (_s2 = oddsDetailHistories.value) == null ? void 0 : _s2[item]) == null ? void 0 : _t2[9]))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate((_v2 = (_u2 = oddsDetailHistories.value) == null ? void 0 : _u2[item]) == null ? void 0 : _v2[10])}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_x2 = (_w2 = oddsDetailHistories.value) == null ? void 0 : _w2[item]) == null ? void 0 : _x2[11]))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}"><span class="ll">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_z2 = (_y2 = oddsDetailHistories.value) == null ? void 0 : _y2[item]) == null ? void 0 : _z2[12]))}</span></div><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}"><span class="">${ssrInterpolate((_B2 = (_A2 = oddsDetailHistories.value) == null ? void 0 : _A2[item]) == null ? void 0 : _B2[13])}</span></div><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}"><span class="rl">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_D2 = (_C2 = oddsDetailHistories.value) == null ? void 0 : _C2[item]) == null ? void 0 : _D2[14]))}</span></div></div></div></div></td><td data-product="product-3"><div class="row mlr-0"><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate((_F2 = (_E2 = oddsDetailHistories.value) == null ? void 0 : _E2[item]) == null ? void 0 : _F2[15])}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate((_H2 = (_G2 = oddsDetailHistories.value) == null ? void 0 : _G2[item]) == null ? void 0 : _H2[16])}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center"><span>${ssrInterpolate((_J2 = (_I2 = oddsDetailHistories.value) == null ? void 0 : _I2[item]) == null ? void 0 : _J2[17])}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0"><div class="row mlr-0"><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}"><span class="ll">${ssrInterpolate((_L2 = (_K2 = oddsDetailHistories.value) == null ? void 0 : _K2[item]) == null ? void 0 : _L2[18])}</span></div><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}"><span class="">${ssrInterpolate((_N2 = (_M2 = oddsDetailHistories.value) == null ? void 0 : _M2[item]) == null ? void 0 : _N2[19])}</span></div><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}"><span class="">${ssrInterpolate((_P2 = (_O2 = oddsDetailHistories.value) == null ? void 0 : _O2[item]) == null ? void 0 : _P2[20])}</span></div></div></div></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="discription"><span class="hbg-td2"></span> :D\u1EEF li\u1EC7u l\u1ECBch s\u1EED <span class="hbg-td1"></span> :D\u1EEF li\u1EC7u m\u1EDBi nh\u1EA5t </div></div></div>`);
      if (((_a2 = matchOddsCorner.value) == null ? void 0 : _a2.corner) && ((_b2 = matchOddsCorner.value) == null ? void 0 : _b2.hadicap)) {
        _push(`<div class="content" id="cornerOddsDiv"><div><h2 class="team-table-title">K\xE8o ph\u1EA1t g\xF3c</h2><div class="team-table-other text-center">`);
        if ((_c = matchOddsCorner.value) == null ? void 0 : _c.hadicap) {
          _push(`<div class="row"><div class="col-12 text-center align-self-center bdtable bg_header1"><b>HDP</b></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_d = matchOddsCorner.value) == null ? void 0 : _d.hadicap) {
          _push(`<div class="row"><div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable bg_header2"><span class="th-bg3 rl">S\u1EDBm</span></div><div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable">${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_g = (_f = (_e = matchOddsCorner.value) == null ? void 0 : _e.hadicap) == null ? void 0 : _f[0]) == null ? void 0 : _g.initial, 1))}</div><div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable">${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_j = (_i = (_h = matchOddsCorner.value) == null ? void 0 : _h.hadicap) == null ? void 0 : _i[0]) == null ? void 0 : _j.initial, 0))}</div><div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable">${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_m = (_l = (_k = matchOddsCorner.value) == null ? void 0 : _k.hadicap) == null ? void 0 : _l[0]) == null ? void 0 : _m.initial, 2))}</div><div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable bg_header2"><span class="th-bg3 ll rl">Live</span></div><div class="${ssrRenderClass([("getClassOddCorner" in _ctx ? _ctx.getClassOddCorner : unref(getClassOddCorner))(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_p = (_o = (_n = matchOddsCorner.value) == null ? void 0 : _n.hadicap) == null ? void 0 : _o[0]) == null ? void 0 : _p.inplay, 1), ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_s = (_r = (_q = matchOddsCorner.value) == null ? void 0 : _q.hadicap) == null ? void 0 : _r[0]) == null ? void 0 : _s.inplay_older, 1)), "col-4 col-md-1 col-lg-1 text-center align-self-center bdtable"])}">${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_v = (_u = (_t = matchOddsCorner.value) == null ? void 0 : _t.hadicap) == null ? void 0 : _u[0]) == null ? void 0 : _v.inplay, 1) ? ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_y = (_x = (_w = matchOddsCorner.value) == null ? void 0 : _w.hadicap) == null ? void 0 : _x[0]) == null ? void 0 : _y.inplay, 1) : ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_B = (_A = (_z = matchOddsCorner.value) == null ? void 0 : _z.hadicap) == null ? void 0 : _A[0]) == null ? void 0 : _B.instant, 1))}</div><div class="${ssrRenderClass([("getClassOddCorner" in _ctx ? _ctx.getClassOddCorner : unref(getClassOddCorner))(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_E = (_D = (_C = matchOddsCorner.value) == null ? void 0 : _C.hadicap) == null ? void 0 : _D[0]) == null ? void 0 : _E.inplay, 0), ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_H = (_G = (_F = matchOddsCorner.value) == null ? void 0 : _F.hadicap) == null ? void 0 : _G[0]) == null ? void 0 : _H.inplay_older, 0)), "col-4 col-md-1 col-lg-1 text-center align-self-center bdtable"])}">${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_K = (_J = (_I = matchOddsCorner.value) == null ? void 0 : _I.hadicap) == null ? void 0 : _J[0]) == null ? void 0 : _K.inplay, 0) ? ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_N = (_M = (_L = matchOddsCorner.value) == null ? void 0 : _L.hadicap) == null ? void 0 : _M[0]) == null ? void 0 : _N.inplay, 0) : ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_Q = (_P = (_O = matchOddsCorner.value) == null ? void 0 : _O.hadicap) == null ? void 0 : _P[0]) == null ? void 0 : _Q.instant, 0))}</div><div class="${ssrRenderClass([("getClassOddCorner" in _ctx ? _ctx.getClassOddCorner : unref(getClassOddCorner))(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_T = (_S = (_R = matchOddsCorner.value) == null ? void 0 : _R.hadicap) == null ? void 0 : _S[0]) == null ? void 0 : _T.inplay, 2), ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_W = (_V = (_U = matchOddsCorner.value) == null ? void 0 : _U.hadicap) == null ? void 0 : _V[0]) == null ? void 0 : _W.inplay_older, 2)), "col-4 col-md-1 col-lg-1 text-center align-self-center bdtable"])}">${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_Z = (_Y = (_X = matchOddsCorner.value) == null ? void 0 : _X.hadicap) == null ? void 0 : _Y[0]) == null ? void 0 : _Z.inplay, 2) ? ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_aa = (_$ = (__ = matchOddsCorner.value) == null ? void 0 : __.hadicap) == null ? void 0 : _$[0]) == null ? void 0 : _aa.inplay, 2) : ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_da = (_ca = (_ba = matchOddsCorner.value) == null ? void 0 : _ba.hadicap) == null ? void 0 : _ca[0]) == null ? void 0 : _da.instant, 2))}</div><div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable"></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_ea = matchOddsCorner.value) == null ? void 0 : _ea.corner) {
          _push(`<div class="row"><div class="col-12 text-center align-self-center bdtable bg_header1"><b>T\xE0i x\u1EC9u</b></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_fa = matchOddsCorner.value) == null ? void 0 : _fa.corner) {
          _push(`<div class="row"><div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable bg_header2"><span class="th-bg3 ll rl">S\u1EDBm</span></div><div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_ja = (_ia = (_ha = (_ga = matchOddsCorner.value) == null ? void 0 : _ga.corner) == null ? void 0 : _ha.early) == null ? void 0 : _ia[0]) == null ? void 0 : _ja.over))}</div><div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_na = (_ma = (_la = (_ka = matchOddsCorner.value) == null ? void 0 : _ka.corner) == null ? void 0 : _la.early) == null ? void 0 : _ma[0]) == null ? void 0 : _na.total_corners))}</div><div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_ra = (_qa = (_pa = (_oa = matchOddsCorner.value) == null ? void 0 : _oa.corner) == null ? void 0 : _pa.early) == null ? void 0 : _qa[0]) == null ? void 0 : _ra.under))}</div><div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable bg_header2"><span class="th-bg3 ll rl">Live</span></div><div class="${ssrRenderClass([("getClassOddCorner" in _ctx ? _ctx.getClassOddCorner : unref(getClassOddCorner))((_va = (_ua = (_ta = (_sa = matchOddsCorner.value) == null ? void 0 : _sa.corner) == null ? void 0 : _ta.live) == null ? void 0 : _ua[0]) == null ? void 0 : _va.over, (_za = (_ya = (_xa = (_wa = matchOddsCorner.value) == null ? void 0 : _wa.corner) == null ? void 0 : _xa.live_older) == null ? void 0 : _ya[0]) == null ? void 0 : _za.over), "col-4 col-md-1 col-lg-1 text-center align-self-center bdtable"])}">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_Da = (_Ca = (_Ba = (_Aa = matchOddsCorner.value) == null ? void 0 : _Aa.corner) == null ? void 0 : _Ba.live) == null ? void 0 : _Ca[0]) == null ? void 0 : _Da.over))}</div><div class="${ssrRenderClass([("getClassOddCorner" in _ctx ? _ctx.getClassOddCorner : unref(getClassOddCorner))((_Ha = (_Ga = (_Fa = (_Ea = matchOddsCorner.value) == null ? void 0 : _Ea.corner) == null ? void 0 : _Fa.live) == null ? void 0 : _Ga[0]) == null ? void 0 : _Ha.total_corners, (_La = (_Ka = (_Ja = (_Ia = matchOddsCorner.value) == null ? void 0 : _Ia.corner) == null ? void 0 : _Ja.live_older) == null ? void 0 : _Ka[0]) == null ? void 0 : _La.total_corners), "col-4 col-md-1 col-lg-1 text-center align-self-center bdtable"])}">${ssrInterpolate((_Pa = (_Oa = (_Na = (_Ma = matchOddsCorner.value) == null ? void 0 : _Ma.corner) == null ? void 0 : _Na.live) == null ? void 0 : _Oa[0]) == null ? void 0 : _Pa.total_corners)}</div><div class="${ssrRenderClass([("getClassOddCorner" in _ctx ? _ctx.getClassOddCorner : unref(getClassOddCorner))((_Ta = (_Sa = (_Ra = (_Qa = matchOddsCorner.value) == null ? void 0 : _Qa.corner) == null ? void 0 : _Ra.live) == null ? void 0 : _Sa[0]) == null ? void 0 : _Ta.under, (_Xa = (_Wa = (_Va = (_Ua = matchOddsCorner.value) == null ? void 0 : _Ua.corner) == null ? void 0 : _Va.live_older) == null ? void 0 : _Wa[0]) == null ? void 0 : _Xa.under), "col-4 col-md-1 col-lg-1 text-center align-self-center bdtable"])}">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_$a = (__a = (_Za = (_Ya = matchOddsCorner.value) == null ? void 0 : _Ya.corner) == null ? void 0 : _Za.live) == null ? void 0 : __a[0]) == null ? void 0 : _$a.under))}</div><div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable">`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORNER_OU_ODDS } },
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Chi ti\u1EBFt`);
              } else {
                return [
                  createTextVNode("Chi ti\u1EBFt")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="content"><div id="mactbox-black"><div id="lineupMenu" class="lineup-menu" style="${ssrRenderStyle({ "display": "block" })}"><div class="switch-btn"><span class="${ssrRenderClass({ on: activeSection.value === "lineup" })}" name="lineup">\u0110\u1ED9i h\xECnh</span><span class="${ssrRenderClass({ on: activeSection.value === "animation" })}" name="animation">Ho\u1EA1t h\xECnh</span></div>`);
      if (liveStream.value && unref(availableStreamUrl)) {
        _push(ssrRenderComponent(_component_nuxt_link, {
          target: "_blank",
          to: unref(availableStreamUrl) + "?ls-id=" + matchIdLive.value,
          class: "video"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="tv-btn" style="${ssrRenderStyle({ "display": "inline" })}"${_scopeId}><span class="livebtn"${_scopeId}><i class="icon iconfont icon-icon-live2"${_scopeId}></i>Video </span></span>`);
            } else {
              return [
                createVNode("span", {
                  class: "tv-btn",
                  style: { "display": "inline" }
                }, [
                  createVNode("span", { class: "livebtn" }, [
                    createVNode("i", { class: "icon iconfont icon-icon-live2" }),
                    createTextVNode("Video ")
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (activeSection.value === "lineup") {
        _push(`<div id="lineupBox"><div class="teamNames"><span class="tn-home home-bg"><span class="teamname">${ssrInterpolate(homeTeamName.value)}</span><span>${ssrInterpolate(homeFormation.value)}</span></span><span class="tn-away away-bg"><span>${ssrInterpolate(awayFormation.value)}</span><span class="teamname">${ssrInterpolate(awayTeamName.value)}</span></span></div><div id="matchBox"><div class="plays"><div class="home five"><!--[-->`);
        ssrRenderList(unref(lineup).home, (player) => {
          _push(ssrRenderComponent(_component_PlayBoxComponent, {
            key: player.id,
            player,
            style: getPlayerStyle(player, "home")
          }, null, _parent));
        });
        _push(`<!--]--></div><div class="guest five"><!--[-->`);
        ssrRenderList(unref(lineup).away, (player) => {
          _push(ssrRenderComponent(_component_PlayBoxComponent, {
            key: player.id,
            player,
            style: getPlayerStyle(player, "away")
          }, null, _parent));
        });
        _push(`<!--]--></div></div>`);
        if (unref(lineBackup).home.length || unref(lineBackup).away.length) {
          _push(`<div id="lineBackup-btn" class="${ssrRenderClass([{ on: isBackupPlayVisible.value }, "shutup-btn linebackup"])}"><span id="shutup-btn-txt">${ssrInterpolate(isBackupPlayVisible.value ? "\u1EA8n c\u1EA7u th\u1EE7 d\u1EF1 b\u1ECB" : "Xem th\xEAm c\u1EA7u th\u1EE7 d\u1EF1 b\u1ECB")}</span><i class="icon iconfont icon-drop-down"></i></div>`);
        } else {
          _push(`<!---->`);
        }
        if (isBackupPlayVisible.value) {
          _push(`<div id="backupPlay" class="backupPlay"><div class="home"><!--[-->`);
          ssrRenderList(unref(lineBackup).home, (player) => {
            _push(ssrRenderComponent(_component_PlayBackupComponent, {
              key: player.id,
              player
            }, null, _parent));
          });
          _push(`<!--]--></div><div class="guest"><!--[-->`);
          ssrRenderList(unref(lineBackup).away, (player) => {
            _push(ssrRenderComponent(_component_PlayBackupComponent, {
              key: player.id,
              player
            }, null, _parent));
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div id="shutup-btn" class="${ssrRenderClass([{ on: iconsVisible.value }, "shutup-btn"])}"><span id="shutup-btn-txt">${ssrInterpolate(iconsVisible.value ? "\u0110\xF3ng" : "Th\xEAm")}</span><i class="icon iconfont icon-drop-down"></i></div></div>`);
        if (iconsVisible.value) {
          _push(`<div id="icons"><div class="icon"><img${ssrRenderAttr("src", _imports_0)} alt="Goal">B\xE0n th\u1EAFng </div><div class="icon"><img${ssrRenderAttr("src", _imports_1)} alt="Corner">G\xF3c </div><div class="icon"><img${ssrRenderAttr("src", _imports_2)} alt="Yellow card">Th\u1EBB v\xE0ng </div><div class="icon"><img${ssrRenderAttr("src", _imports_3)} alt="Red card">Th\u1EBB \u0111\u1ECF </div><div class="icon"><img${ssrRenderAttr("src", _imports_4)} alt="Offside">Vi\u1EC7t v\u1ECB </div><div class="icon"><img${ssrRenderAttr("src", _imports_5)} alt="Free kick">Ph\u1EA1t tr\u1EF1c ti\u1EBFp </div><div class="icon"><img${ssrRenderAttr("src", _imports_6)} alt="Goal kick">Ph\u1EA1t \u0111\u1EC1n v\xEC ph\u1EA1m l\u1ED7i </div><div class="icon"><img${ssrRenderAttr("src", _imports_7)} alt="Penalty">Ghi b\xE0n ph\u1EA1t \u0111\u1EC1n </div><div class="icon"><img${ssrRenderAttr("src", _imports_8)} alt="Sub in">C\u1EA7u th\u1EE7 d\u1EF1 b\u1ECB v\xE0o s\xE2n </div><div class="icon"><img${ssrRenderAttr("src", _imports_9)} alt="Sub out">C\u1EA7u th\u1EE7 r\u1EDDi s\xE2n </div><div class="icon"><img${ssrRenderAttr("src", _imports_10)} alt="Midfield">Ti\u1EC1n v\u1EC7 </div><div class="icon"><img${ssrRenderAttr("src", _imports_11)} alt="End">K\u1EBFt th\xFAc </div><div class="icon"><img${ssrRenderAttr("src", _imports_12)} alt="Halftime score">T\u1EF7 s\u1ED1 hi\u1EC7p m\u1ED9t </div><div class="icon"><img${ssrRenderAttr("src", _imports_13)} alt="Card upgrade confirmed">Th\u1EBB v\xE0ng th\u1EE9 hai </div><div class="icon"><img${ssrRenderAttr("src", _imports_14)} alt="Penalty missed">Ph\u1EA1t \u0111\u1EC1n th\u1EA5t b\u1EA1i </div><div class="icon"><img${ssrRenderAttr("src", _imports_15)} alt="Own goal">B\xE0n ph\u1EA3n l\u01B0\u1EDBi nh\xE0 </div><div class="icon"><img${ssrRenderAttr("src", _imports_16)} alt="Injury time">Th\u1EDDi gian ch\u1EA5n th\u01B0\u01A1ng </div><div class="icon"><img${ssrRenderAttr("src", _imports_17)} alt="Shots on target">Ph\xE1 ph\u1EA1t \u0111\u1EC1n </div><div class="icon"><img${ssrRenderAttr("src", _imports_18)} alt="Shots off target">M\u1EA5t b\xE0n th\u1EAFng v\xEC sai l\u1EA7m </div><div class="icon"><img${ssrRenderAttr("src", _imports_19)} alt="Dangerous Attack">S\xFAt c\u1ED9t c\u1EA7u m\xF4n </div><div class="icon"><img${ssrRenderAttr("src", _imports_20)} alt="Ball possession">C\u1EA7u th\u1EE7 ph\xF2ng ng\u1EF1 cu\u1ED1i c\xF9ng </div><div class="icon"><img${ssrRenderAttr("src", _imports_11)} alt="Overtime is over">H\u1EBFt gi\u1EDD b\xF9 gi\u1EDD </div><div class="icon"><img${ssrRenderAttr("src", _imports_5)} alt="Penalty kick ended">K\u1EBFt th\xFAc ph\u1EA1t \u0111\u1EC1n </div><div class="icon"><img${ssrRenderAttr("src", _imports_21)} alt="VAR">Video h\u1ED7 tr\u1EE3 tr\u1ECDng t\xE0i </div><div class="icon"><img${ssrRenderAttr("src", _imports_7)} alt="Penalty(Penalty Shoot-out)">S\xFAt lu\xE2n l\u01B0u </div><div class="icon"><img${ssrRenderAttr("src", _imports_14)} alt="Penalty missed(Penalty Shoot-out)">S\xFAt lu\xE2n l\u01B0u th\u1EA5t b\u1EA1i </div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeSection.value === "animation") {
        _push(`<div id="flashBox" class="flash"><div class="embed-responsive-item-widget">`);
        if (showAnimation.value) {
          _push(ssrRenderComponent(_component_AnimationComponent, {
            "key-encode": keyEncode.value,
            "match-id-slug": matchIdSlug.value
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div id="teamEventDiv_detail" class="content"><div class="team-table-title row"><span class="team-table-xq-home col-4"><span>${ssrInterpolate(homeTeamName.value)}</span></span><span class="col-4"> S\u1EF1 ki\u1EC7n ch\xEDnh </span><span class="team-table-xq-guest col-4"><span>${ssrInterpolate(awayTeamName.value)}</span></span></div><div class="team-bg-h1"><span class="home-bg"></span><span class="away-bg"></span></div>`);
      if (((_bb = (_ab = matchLiveDetail.value) == null ? void 0 : _ab.match) == null ? void 0 : _bb.home_scores[6]) != 0 || ((_db = (_cb = matchLiveDetail.value) == null ? void 0 : _cb.match) == null ? void 0 : _db.away_scores[6]) != 0) {
        _push(`<div class="team-table-other ky"><div class="ky_tit"><div class="row text-center"><div class="col-5 text-end"><span class="t15"><b>${ssrInterpolate((_fb = (_eb = matchLiveDetail.value) == null ? void 0 : _eb.match) == null ? void 0 : _fb.home_scores[6])}</b></span></div><div class="col-2"><span class="min">Ph\u1EA1t \u0111\u1EC1n</span></div><div class="col-5 text-start"><span class="t15 blue">${ssrInterpolate((_hb = (_gb = matchLiveDetail.value) == null ? void 0 : _gb.match) == null ? void 0 : _hb.away_scores[6])}</span></div></div></div><!--[-->`);
        ssrRenderList(matchLiveDetailIncidents.value, (incident, index) => {
          var _a3, _b3;
          _push(`<!--[-->`);
          if ([29, 30].includes(
            incident == null ? void 0 : incident.type
          )) {
            _push(`<div class="ky_list"><div class="row"><div class="col-5 text-end home">${(_a3 = ("getIncidents" in _ctx ? _ctx.getIncidents : unref(getIncidents))(incident, 1)) != null ? _a3 : ""}</div><div class="col-2 text-center align-self-center"><b>${ssrInterpolate((incident == null ? void 0 : incident.home_score) || 0)} - ${ssrInterpolate((incident == null ? void 0 : incident.away_score) || 0)}</b></div><div class="col-5 text-start away">${(_b3 = ("getIncidentsRight" in _ctx ? _ctx.getIncidentsRight : unref(getIncidentsRight))(incident, 2)) != null ? _b3 : ""}</div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="team-table-other ky"><div class="ky_tit"><div class="row text-center"><div class="col-5 text-end"><span class="t15"><b>${ssrInterpolate((_jb = (_ib = matchLiveDetail.value) == null ? void 0 : _ib.match) == null ? void 0 : _jb.home_scores[0])}</b></span></div><div class="col-2"><span class="min">Ph\xFAt</span></div><div class="col-5 text-start"><span class="t15 blue">${ssrInterpolate((_lb = (_kb = matchLiveDetail.value) == null ? void 0 : _kb.match) == null ? void 0 : _lb.away_scores[0])}</span></div></div></div><!--[-->`);
      ssrRenderList(matchLiveDetailIncidents.value, (incident, index) => {
        var _a3, _b3;
        _push(`<!--[-->`);
        if ([1, 2, 3, 4, 5, 8, 9, 15, 16, 17, 28].includes(
          incident == null ? void 0 : incident.type
        )) {
          _push(`<div class="ky_list"><div class="row"><div class="col-5 text-end home">${(_a3 = ("getIncidents" in _ctx ? _ctx.getIncidents : unref(getIncidents))(incident, 1)) != null ? _a3 : ""}</div><div class="col-2 text-center align-self-center"><b>${ssrInterpolate(incident == null ? void 0 : incident.time)}&#39;</b></div><div class="col-5 text-start away">${(_b3 = ("getIncidentsRight" in _ctx ? _ctx.getIncidentsRight : unref(getIncidentsRight))(incident, 2)) != null ? _b3 : ""}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div><div id="teamTechDiv_detail" class="content"><div><h2 class="team-table-title">Th\u1ED1ng k\xEA k\u1EF9 thu\u1EADt</h2><div class="fx20"><ul class="stat"><!--[-->`);
      ssrRenderList((_mb = matchLiveDetail.value) == null ? void 0 : _mb.stats, (stat, index) => {
        _push(`<li><span class="stat-c">${ssrInterpolate(stat == null ? void 0 : stat.home)}</span><span class="${ssrRenderClass(["stat-bar-wrapper homes", { hollow: (stat == null ? void 0 : stat.home) === 0 && (stat == null ? void 0 : stat.away) === 0 }])}"><span class="stat-bar fr" style="${ssrRenderStyle(
          "width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.home) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%"
        )}"></span></span><span class="stat-title">${ssrInterpolate(("getStats" in _ctx ? _ctx.getStats : unref(getStats))(stat == null ? void 0 : stat.type))}</span><span class="${ssrRenderClass(["stat-bar-wrapper aways", { hollow: (stat == null ? void 0 : stat.home) === 0 && (stat == null ? void 0 : stat.away) === 0 }])}"><span class="stat-bar fl" style="${ssrRenderStyle(
          "width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.away) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%"
        )}"></span></span><span class="stat-c two">${ssrInterpolate(stat == null ? void 0 : stat.away)}</span></li>`);
      });
      _push(`<!--]--></ul></div></div></div><div class="content"><div><h2 class="team-table-title">D\u1EEF li\u1EC7u \u0111\u1ED9i b\xF3ng</h2><div class="team-h1"><span class="home-bg"></span><span class="away-bg"></span></div><table id="team-statistics" class="team-table-other text-center" width="100%" cellpadding="0" cellspacing="0"><tr><th>Ch\u1EE7</th><th>3 tr\u1EADn g\u1EA7n nh\u1EA5t</th><th>Kh\xE1ch</th><th>Ch\u1EE7</th><th>10 tr\u1EADn g\u1EA7n nh\u1EA5t</th><th>Kh\xE1ch</th></tr><tr><td class="${ssrRenderClass(
        ((_ob = (_nb = stateComparison.value) == null ? void 0 : _nb[0]) == null ? void 0 : _ob[42]) > ((_qb = (_pb = stateComparison.value) == null ? void 0 : _pb[0]) == null ? void 0 : _qb[43]) ? "red" : ""
      )}">${ssrInterpolate((_sb = (_rb = stateComparison.value) == null ? void 0 : _rb[0]) == null ? void 0 : _sb[42])}</td><td><b>B\xE0n th\u1EAFng</b></td><td class="${ssrRenderClass(
        ((_ub = (_tb = stateComparison.value) == null ? void 0 : _tb[0]) == null ? void 0 : _ub[43]) > ((_wb = (_vb = stateComparison.value) == null ? void 0 : _vb[0]) == null ? void 0 : _wb[42]) ? "red" : ""
      )}">${ssrInterpolate((_yb = (_xb = stateComparison.value) == null ? void 0 : _xb[0]) == null ? void 0 : _yb[43])}</td><td class="${ssrRenderClass(
        ((_Ab = (_zb = stateComparison.value) == null ? void 0 : _zb[1]) == null ? void 0 : _Ab[42]) > ((_Cb = (_Bb = stateComparison.value) == null ? void 0 : _Bb[1]) == null ? void 0 : _Cb[43]) ? "red" : ""
      )}">${ssrInterpolate((_Eb = (_Db = stateComparison.value) == null ? void 0 : _Db[1]) == null ? void 0 : _Eb[42])}</td><td><b>B\xE0n th\u1EAFng</b></td><td class="${ssrRenderClass(
        ((_Gb = (_Fb = stateComparison.value) == null ? void 0 : _Fb[1]) == null ? void 0 : _Gb[43]) > ((_Ib = (_Hb = stateComparison.value) == null ? void 0 : _Hb[1]) == null ? void 0 : _Ib[42]) ? "red" : ""
      )}">${ssrInterpolate((_Kb = (_Jb = stateComparison.value) == null ? void 0 : _Jb[1]) == null ? void 0 : _Kb[43])}</td></tr><tr><td class="${ssrRenderClass(
        ((_Mb = (_Lb = stateComparison.value) == null ? void 0 : _Lb[0]) == null ? void 0 : _Mb[36]) > ((_Ob = (_Nb = stateComparison.value) == null ? void 0 : _Nb[0]) == null ? void 0 : _Ob[37]) ? "red" : ""
      )}">${ssrInterpolate((_Qb = (_Pb = stateComparison.value) == null ? void 0 : _Pb[0]) == null ? void 0 : _Qb[36])}</td><td><b>B\xE0n thua</b></td><td class="${ssrRenderClass(
        ((_Sb = (_Rb = stateComparison.value) == null ? void 0 : _Rb[0]) == null ? void 0 : _Sb[37]) > ((_Ub = (_Tb = stateComparison.value) == null ? void 0 : _Tb[0]) == null ? void 0 : _Ub[36]) ? "red" : ""
      )}">${ssrInterpolate((_Wb = (_Vb = stateComparison.value) == null ? void 0 : _Vb[0]) == null ? void 0 : _Wb[37])}</td><td class="${ssrRenderClass(
        ((_Yb = (_Xb = stateComparison.value) == null ? void 0 : _Xb[1]) == null ? void 0 : _Yb[36]) > ((__b = (_Zb = stateComparison.value) == null ? void 0 : _Zb[1]) == null ? void 0 : __b[37]) ? "red" : ""
      )}">${ssrInterpolate((_ac = (_$b = stateComparison.value) == null ? void 0 : _$b[1]) == null ? void 0 : _ac[36])}</td><td><b>B\xE0n thua</b></td><td class="${ssrRenderClass(
        ((_cc = (_bc = stateComparison.value) == null ? void 0 : _bc[1]) == null ? void 0 : _cc[37]) > ((_ec = (_dc = stateComparison.value) == null ? void 0 : _dc[1]) == null ? void 0 : _ec[36]) ? "red" : ""
      )}">${ssrInterpolate((_gc = (_fc = stateComparison.value) == null ? void 0 : _fc[1]) == null ? void 0 : _gc[37])}</td></tr><tr><td class="${ssrRenderClass(
        ((_ic = (_hc = stateComparison.value) == null ? void 0 : _hc[0]) == null ? void 0 : _ic[38]) > ((_kc = (_jc = stateComparison.value) == null ? void 0 : _jc[0]) == null ? void 0 : _kc[39]) ? "red" : ""
      )}">${ssrInterpolate((_mc = (_lc = stateComparison.value) == null ? void 0 : _lc[0]) == null ? void 0 : _mc[38])}</td><td><b>Ph\u1EA1t g\xF3c</b></td><td class="${ssrRenderClass(
        ((_oc = (_nc = stateComparison.value) == null ? void 0 : _nc[0]) == null ? void 0 : _oc[39]) > ((_qc = (_pc = stateComparison.value) == null ? void 0 : _pc[0]) == null ? void 0 : _qc[38]) ? "red" : ""
      )}">${ssrInterpolate((_sc = (_rc = stateComparison.value) == null ? void 0 : _rc[0]) == null ? void 0 : _sc[39])}</td><td class="${ssrRenderClass(
        ((_uc = (_tc = stateComparison.value) == null ? void 0 : _tc[1]) == null ? void 0 : _uc[38]) > ((_wc = (_vc = stateComparison.value) == null ? void 0 : _vc[1]) == null ? void 0 : _wc[39]) ? "red" : ""
      )}">${ssrInterpolate((_yc = (_xc = stateComparison.value) == null ? void 0 : _xc[1]) == null ? void 0 : _yc[38])}</td><td><b>Ph\u1EA1t g\xF3c</b></td><td class="${ssrRenderClass(
        ((_Ac = (_zc = stateComparison.value) == null ? void 0 : _zc[1]) == null ? void 0 : _Ac[39]) > ((_Cc = (_Bc = stateComparison.value) == null ? void 0 : _Bc[1]) == null ? void 0 : _Cc[38]) ? "red" : ""
      )}">${ssrInterpolate((_Ec = (_Dc = stateComparison.value) == null ? void 0 : _Dc[1]) == null ? void 0 : _Ec[39])}</td></tr><tr><td class="${ssrRenderClass(
        ((_Gc = (_Fc = stateComparison.value) == null ? void 0 : _Fc[0]) == null ? void 0 : _Gc[40]) > ((_Ic = (_Hc = stateComparison.value) == null ? void 0 : _Hc[0]) == null ? void 0 : _Ic[41]) ? "red" : ""
      )}">${ssrInterpolate((_Kc = (_Jc = stateComparison.value) == null ? void 0 : _Jc[0]) == null ? void 0 : _Kc[40])}</td><td><b>Th\u1EBB \u0111\u1ECF</b></td><td class="${ssrRenderClass(
        ((_Mc = (_Lc = stateComparison.value) == null ? void 0 : _Lc[0]) == null ? void 0 : _Mc[41]) > ((_Oc = (_Nc = stateComparison.value) == null ? void 0 : _Nc[0]) == null ? void 0 : _Oc[40]) ? "red" : ""
      )}">${ssrInterpolate((_Qc = (_Pc = stateComparison.value) == null ? void 0 : _Pc[0]) == null ? void 0 : _Qc[41])}</td><td class="${ssrRenderClass(
        ((_Sc = (_Rc = stateComparison.value) == null ? void 0 : _Rc[1]) == null ? void 0 : _Sc[40]) > ((_Uc = (_Tc = stateComparison.value) == null ? void 0 : _Tc[1]) == null ? void 0 : _Uc[41]) ? "red" : ""
      )}">${ssrInterpolate((_Wc = (_Vc = stateComparison.value) == null ? void 0 : _Vc[1]) == null ? void 0 : _Wc[40])}</td><td><b>Th\u1EBB \u0111\u1ECF</b></td><td class="${ssrRenderClass(
        ((_Yc = (_Xc = stateComparison.value) == null ? void 0 : _Xc[1]) == null ? void 0 : _Yc[41]) > ((__c = (_Zc = stateComparison.value) == null ? void 0 : _Zc[1]) == null ? void 0 : __c[40]) ? "red" : ""
      )}">${ssrInterpolate((_ad = (_$c = stateComparison.value) == null ? void 0 : _$c[1]) == null ? void 0 : _ad[41])}</td></tr></table></div></div><div class="fx20 posediv content" style="${ssrRenderStyle({ "margin-top": "20px" })}"><div class="fx-title row"><span class="fx-title-name col-4 text-start team-table-xq-home"><span>${ssrInterpolate(homeTeamName.value)}</span></span><span class="fx-title-vs col-4 text-center">T\u1EF7 l\u1EC7 ghi b\xE0n th\u1EAFng</span><span class="fx-title-name col-4 text-end team-table-xq-away"><span>${ssrInterpolate(awayTeamName.value)}</span></span></div><div class="team-bg-h1"><span class="home-bg"></span><span class="away-bg"></span></div><div class="fx-tab2"><span><div id="lastMatchBtn1" class="${ssrRenderClass([{
        "fx-tab2-on": activeSectionTable.value === "ThirtyrateOfScored"
      }, "lastMatchBtn"])}"> 20 tr\u1EADn g\u1EA7n nh\u1EA5t </div></span></div><div class="fx-tab row"><div class="coredBtn col-12"><div id="hScoredBtn1" class="fx-tab-on">Ghi b\xE0n</div></div></div>`);
      if (activeSectionTable.value === "ThirtyrateOfScored") {
        _push(`<div id="rateOfScored1" class="rateOfScored ThirtyrateOfScored row"><!--[-->`);
        ssrRenderList((_cd = (_bd = matchesAnalysis.value) == null ? void 0 : _bd.home_shoot_time) == null ? void 0 : _cd[0], (value, index) => {
          var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2;
          _push(`<div class="fx-comparision missComp col-12 col-md-6"><ul class="fx-data-left"><li class="hScoredLi hScoredLi2"><span class="fx-c-l home-bg" style="${ssrRenderStyle(
            "width:" + (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(value) * 100 / ((_a3 = shootTime.value) == null ? void 0 : _a3["sumHome"])).toFixed(0) + "%"
          )}"></span><span class="fx-c2">${ssrInterpolate(((_b3 = shootTime.value) == null ? void 0 : _b3["sumHome"]) > 0 ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(value) * 100 / ((_c2 = shootTime.value) == null ? void 0 : _c2["sumHome"])).toFixed(0) : "")}</span></li></ul>`);
          if (index === 4) {
            _push(`<span class="fx-c-3"><span>41~45</span></span>`);
          } else if (index === 5) {
            _push(`<span class="fx-c-3"><span>46~50</span></span>`);
          } else {
            _push(`<span class="fx-c-3">`);
            if (index < 4) {
              _push(`<span>${ssrInterpolate(10 * index + 1)}~${ssrInterpolate(10 * (index + 1))}</span>`);
            } else {
              _push(`<span>${ssrInterpolate(10 * (index - 1) + 1)}~${ssrInterpolate(10 * index)}</span>`);
            }
            _push(`</span>`);
          }
          _push(`<ul class="fx-data-right"><li class="gScoredLi gScoredLi2"><span class="fx-c-r away-bg" style="${ssrRenderStyle(
            "width:" + (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(
              (_f2 = (_e2 = (_d2 = matchesAnalysis.value) == null ? void 0 : _d2.away_shoot_time) == null ? void 0 : _e2[0]) == null ? void 0 : _f2[index]
            ) * 100 / ((_g2 = shootTime.value) == null ? void 0 : _g2["sumAway"])).toFixed(0) + "%"
          )}"></span><span class="fx-c2">${ssrInterpolate(((_h2 = shootTime.value) == null ? void 0 : _h2["sumAway"]) > 0 ? ((_k2 = (_j2 = (_i2 = matchesAnalysis.value) == null ? void 0 : _i2.away_shoot_time) == null ? void 0 : _j2[0]) == null ? void 0 : _k2[index]) ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(
            (_n2 = (_m2 = (_l2 = matchesAnalysis.value) == null ? void 0 : _l2.away_shoot_time) == null ? void 0 : _m2[0]) == null ? void 0 : _n2[index]
          ) * 100 / ((_o2 = shootTime.value) == null ? void 0 : _o2["sumAway"])).toFixed(0) : "" : "")}</span></li></ul></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle({ "clear": "both" })}"></div></div></div></div><div id="content-page" class="mt-5">`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title">${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/match/[match_id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_match_id_-B-CzY3G3.mjs.map
