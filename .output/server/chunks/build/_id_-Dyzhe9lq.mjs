import { b as useShareCommon, q as useMatchStore, a as useRoute, M as MATCH_TAB, a7 as useState, f as MATCH_ODD_TAB, e as useCookie, s as systemsStore, g as getConfig, a8 as useAsyncData, h as ROUTERS_OLD, a9 as navigateTo, aa as ROUTERS, ab as useHead, u as useRouter, d as useSchema, R as ROUTERS_GROUP, i as formatDateMomentUTCTimeZone, j as getLiveScoreImage, k as ROUTER_TEAM_NAME, l as getStatusDisplay, p as socketStore, O as ODD_COMPANY_DEFAULT, r as ODD_COMPANYS, t as getOddNumberToNegativeTX, v as getDetailOdds, w as getOddCornerValue, x as getClassOddCorner, y as getIncidents, z as getIncidentsRight, A as getStats, B as parseFloatO, _ as _export_sfc, L as COMPANYS_H2H_DEFAULT_LIST, K as getStateComparison, N as getOddNumber, P as MATCH_LIST_OPTION, Q as timeStamp2DateUTCTimeZone, S as getH2HOddEU, T as getH2HOddHadicap, U as getH2HOddTX, V as getH2HStatistics, W as getDataComparison, X as getStaticsOdd, G as parseIntO, a0 as getOddNumberToNegative, a1 as getOddChange, a2 as getClassOddChange, a4 as getClassOddCornerChange, a5 as getOddsCorrectScore, a6 as getPlayerPosition, D as useApiLiveScore, E as API_ROUTERS, ac as generateMetaSeo, ad as useFetch, ae as createUrl, af as _sfc_main$f$1, m as __nuxt_component_0$3, n as _sfc_main$d$1, o as _sfc_main$e$1, C as useNuxtApp, F as getRecentResultStat, I as ISPORT_COMPANY_DEFAULT, H as getValueByPosition, Y as getStandingLastest, Z as getDataObjectByList, J as getDataObject, a3 as getOddOfData, $ as getH2hComparison } from './server.mjs';
import { useSSRContext, defineComponent, ref, watch, computed, withAsyncContext, unref, isRef, mergeModels, useModel, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, reactive, nextTick } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import moment from 'moment-timezone';
import { useDebounceFn, useWindowSize, useWindowScroll, useIntersectionObserver } from '@vueuse/core';
import { _ as __nuxt_component_0$1 } from './server-placeholder-BFzIFO-1.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import * as echarts from 'echarts/core';
import { TooltipComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import draggable from 'vuedraggable';
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
import 'crypto-js';
import 'pako';
import 'buffer';
import '@vueuse/sound';
import 'vue-bundle-renderer/runtime';
import '@unhead/ssr';

const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "HeaderComponent",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    socketData: {}
  }, {
    "initDataMatch": {},
    "initDataMatchModifiers": {},
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:initDataMatch", "update:modelValue"],
  setup(__props) {
    var _a2;
    var _a, _b, _c, _d, _e, _f;
    const { width } = useWindowSize();
    const router = useRouter();
    const route = useRoute();
    const routerUrl = ref("");
    const storeSystems = systemsStore();
    const availableStreamUrl = getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "available_stream_url");
    const matchIdSlug = ref(((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.id) || "");
    const showMatchOddsMenu = ref(false);
    const isHaft = ref(false);
    const tab = ref(((_b = route == null ? void 0 : route.query) == null ? void 0 : _b.tab) || MATCH_TAB.DETAIL);
    const type = ref(((_c = route == null ? void 0 : route.query) == null ? void 0 : _c.type) || MATCH_TAB.ODDSCOMP);
    const initDataMatch = useModel(__props, "initDataMatch");
    const { useLocale, $t } = useShareCommon();
    moment.locale((_a2 = useLocale == null ? void 0 : useLocale.value.defaultLocale) != null ? _a2 : "en");
    const { initSchemaMatch } = useSchema();
    const settingsData = useCookie("settingsData");
    const timeZone = ref(((_d = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _d.timeZone) || getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE"));
    if (![...MATCH_TAB.DETAIL, MATCH_TAB.H2H, MATCH_TAB.ODDS].includes(tab.value)) {
      tab.value = MATCH_TAB.DETAIL;
    }
    if (tab.value === MATCH_TAB.ODDS && !((_f = MATCH_ODD_TAB) == null ? void 0 : _f[(_e = type.value) == null ? void 0 : _e.toUpperCase()])) {
      type.value = MATCH_TAB.ODDSCOMP;
    }
    watch(
      () => route.path,
      (newPath) => {
        const matches = newPath.match(/[^/-]+$/);
        matchIdSlug.value = matches ? matches[0] : "";
        showMatchOddsMenu.value = newPath.includes(ROUTERS_GROUP.ODDS) || newPath.includes(ROUTERS_GROUP.ASIAN_HANDICAP_ODDS) || newPath.includes(ROUTERS_GROUP.ODDS_1X2) || newPath.includes(ROUTERS_GROUP.OVER_UNDER_ODDS) || newPath.includes(ROUTERS_GROUP.CORNER_OU_ODDS) || newPath.includes(ROUTERS_GROUP.EURO_HANDICAP_ODDS);
      },
      { immediate: true }
    );
    watch(
      () => route.params,
      () => {
        var _a22;
        matchIdSlug.value = ((_a22 = route == null ? void 0 : route.params) == null ? void 0 : _a22.id) || "";
      },
      { immediate: true }
    );
    watch(
      () => route == null ? void 0 : route.query,
      () => {
        var _a22, _b2, _c2, _d2, _e2, _f2;
        tab.value = ((_a22 = route == null ? void 0 : route.query) == null ? void 0 : _a22.tab) || "";
        type.value = ((_b2 = route == null ? void 0 : route.query) == null ? void 0 : _b2.type) || "";
        if (![...MATCH_TAB.DETAIL, MATCH_TAB.H2H, MATCH_TAB.ODDS, MATCH_TAB.STATISTICAL].includes(tab.value)) {
          tab.value = MATCH_TAB.DETAIL;
        }
        if (tab.value === MATCH_TAB.ODDS && !((_d2 = MATCH_ODD_TAB) == null ? void 0 : _d2[(_c2 = type.value) == null ? void 0 : _c2.toUpperCase()])) {
          type.value = MATCH_TAB.ODDSCOMP;
        }
        showMatchOddsMenu.value = route.path.includes(ROUTERS_GROUP.MATCH) && ((_f2 = MATCH_ODD_TAB) == null ? void 0 : _f2[(_e2 = type.value) == null ? void 0 : _e2.toUpperCase()]);
      },
      { immediate: true }
    );
    ref();
    const weatherMap = {
      1: "C\xF3 m\xE2y v\xE0i n\u01A1i",
      2: "M\xE2y",
      3: "C\xF3 m\xE2y/m\u01B0a r\u1EA3i r\xE1c",
      4: "Tuy\u1EBFt",
      5: "N\u1EAFng",
      6: "M\u01B0a u \xE1m/Gi\xF4ng t\u1EEBng ph\u1EA7n",
      7: "U \xE1m",
      8: "S\u01B0\u01A1ng m\xF9",
      9: "C\xF3 m\xE2y v\xE0 m\u01B0a",
      10: "M\xE2y c\xF3 m\u01B0a",
      11: "C\xF3 m\xE2y k\xE8m theo m\u01B0a/c\xF3 gi\xF4ng b\xE3o t\u1EEBng ph\u1EA7n",
      12: "M\xE2y/m\u01B0a v\xE0 gi\xF4ng c\u1EE5c b\u1ED9",
      13: "S\u01B0\u01A1ng m\xF9"
    };
    computed(() => {
      const weatherId = Number(weather.value);
      return weatherMap[weatherId] || "";
    });
    const liveStream = ref("");
    const matchIdLive = ref("");
    const humidity = ref("");
    const pressure = ref("");
    const temperature = ref("");
    const weather = ref("");
    const wind = ref("");
    const venueCapacity = ref("");
    const venueCity = ref("");
    const venueName = ref("");
    const competitionName = ref("");
    const homeTeamName = ref("");
    const homeTeamLogo = ref("");
    const awayTeamName = ref("");
    const awayTeamLogo = ref("");
    const matchTime = ref("");
    const homeAll = ref("");
    const awayAll = ref("");
    const homeFirst = ref("");
    const awayFirst = ref("");
    const homePenaltyShootOut = ref("");
    const awayPenaltyShootOut = ref("");
    const homeTeamId = useModel(__props, "modelValue");
    computed(() => {
      let homeSecond = homeAll.value - homeFirst.value;
      let awaySecond = awayAll.value - awayFirst.value;
      return `${homeSecond}-${awaySecond}`;
    });
    const props = __props;
    const fetchMatchRecentDetail = async () => {
      var _a22, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka;
      if (!((_a22 = initDataMatch.value) == null ? void 0 : _a22[0])) {
        return;
      }
      matchIdLive.value = ((_c2 = (_b2 = initDataMatch.value) == null ? void 0 : _b2[0]) == null ? void 0 : _c2.id) || "";
      liveStream.value = ((_f2 = (_e2 = (_d2 = initDataMatch.value) == null ? void 0 : _d2[0]) == null ? void 0 : _e2.match_info) == null ? void 0 : _f2.variable_stream) || false;
      humidity.value = ((_j = (_i = (_h = (_g = initDataMatch.value) == null ? void 0 : _g[0]) == null ? void 0 : _h.match_info) == null ? void 0 : _i.environment) == null ? void 0 : _j.humidity) || "";
      pressure.value = ((_n = (_m = (_l = (_k = initDataMatch.value) == null ? void 0 : _k[0]) == null ? void 0 : _l.match_info) == null ? void 0 : _m.environment) == null ? void 0 : _n.pressure) || "";
      temperature.value = ((_r = (_q = (_p = (_o = initDataMatch.value) == null ? void 0 : _o[0]) == null ? void 0 : _p.match_info) == null ? void 0 : _q.environment) == null ? void 0 : _r.temperature) || "";
      weather.value = ((_v = (_u = (_t = (_s = initDataMatch.value) == null ? void 0 : _s[0]) == null ? void 0 : _t.match_info) == null ? void 0 : _u.environment) == null ? void 0 : _v.weather) || "";
      wind.value = ((_z = (_y = (_x = (_w = initDataMatch.value) == null ? void 0 : _w[0]) == null ? void 0 : _x.match_info) == null ? void 0 : _y.environment) == null ? void 0 : _z.wind) || "";
      venueCapacity.value = ((_C = (_B = (_A = initDataMatch.value) == null ? void 0 : _A[0]) == null ? void 0 : _B.venue_info) == null ? void 0 : _C.capacity) || "";
      venueCity.value = ((_F = (_E = (_D = initDataMatch.value) == null ? void 0 : _D[0]) == null ? void 0 : _E.venue_info) == null ? void 0 : _F.city) || "";
      venueName.value = ((_I = (_H = (_G = initDataMatch.value) == null ? void 0 : _G[0]) == null ? void 0 : _H.venue_info) == null ? void 0 : _I.name) || "";
      competitionName.value = ((_L = (_K = (_J = initDataMatch.value) == null ? void 0 : _J[0]) == null ? void 0 : _K.competition) == null ? void 0 : _L.name) || "";
      homeTeamName.value = ((_O = (_N = (_M = initDataMatch.value) == null ? void 0 : _M[0]) == null ? void 0 : _N.home_team) == null ? void 0 : _O.name) || "";
      homeTeamLogo.value = !!((_R = (_Q = (_P = initDataMatch.value) == null ? void 0 : _P[0]) == null ? void 0 : _Q.home_team) == null ? void 0 : _R.national) && ((_U = (_T = (_S = initDataMatch.value) == null ? void 0 : _S[0]) == null ? void 0 : _T.home_team) == null ? void 0 : _U.country_logo_o) ? (_X = (_W = (_V = initDataMatch.value) == null ? void 0 : _V[0]) == null ? void 0 : _W.home_team) == null ? void 0 : _X.country_logo_o : ((__ = (_Z = (_Y = initDataMatch.value) == null ? void 0 : _Y[0]) == null ? void 0 : _Z.home_team) == null ? void 0 : __.logo_o) || ((_ba = (_aa = (_$ = initDataMatch.value) == null ? void 0 : _$[0]) == null ? void 0 : _aa.home_team) == null ? void 0 : _ba.country_logo_o);
      awayTeamName.value = ((_ea = (_da = (_ca = initDataMatch.value) == null ? void 0 : _ca[0]) == null ? void 0 : _da.away_team) == null ? void 0 : _ea.name) || "";
      awayTeamLogo.value = !!((_ha = (_ga = (_fa = initDataMatch.value) == null ? void 0 : _fa[0]) == null ? void 0 : _ga.away_team) == null ? void 0 : _ha.national) && ((_ka = (_ja = (_ia = initDataMatch.value) == null ? void 0 : _ia[0]) == null ? void 0 : _ja.away_team) == null ? void 0 : _ka.country_logo_o) ? (_na = (_ma = (_la = initDataMatch.value) == null ? void 0 : _la[0]) == null ? void 0 : _ma.away_team) == null ? void 0 : _na.country_logo_o : ((_qa = (_pa = (_oa = initDataMatch.value) == null ? void 0 : _oa[0]) == null ? void 0 : _pa.away_team) == null ? void 0 : _qa.logo_o) || ((_ta = (_sa = (_ra = initDataMatch.value) == null ? void 0 : _ra[0]) == null ? void 0 : _sa.away_team) == null ? void 0 : _ta.country_logo_o);
      matchTime.value = ((_va = (_ua = initDataMatch.value) == null ? void 0 : _ua[0]) == null ? void 0 : _va.match_time) || "";
      homeAll.value = ((_xa = (_wa = initDataMatch.value) == null ? void 0 : _wa[0]) == null ? void 0 : _xa.home_scores[0]) || 0;
      awayAll.value = ((_za = (_ya = initDataMatch.value) == null ? void 0 : _ya[0]) == null ? void 0 : _za.away_scores[0]) || 0;
      homeFirst.value = ((_Ba = (_Aa = initDataMatch.value) == null ? void 0 : _Aa[0]) == null ? void 0 : _Ba.home_scores[1]) || 0;
      awayFirst.value = ((_Da = (_Ca = initDataMatch.value) == null ? void 0 : _Ca[0]) == null ? void 0 : _Da.away_scores[1]) || 0;
      homePenaltyShootOut.value = ((_Fa = (_Ea = initDataMatch.value) == null ? void 0 : _Ea[0]) == null ? void 0 : _Fa.home_scores[6]) || "";
      awayPenaltyShootOut.value = ((_Ha = (_Ga = initDataMatch.value) == null ? void 0 : _Ga[0]) == null ? void 0 : _Ha.away_scores[6]) || "";
      homeTeamId.value = (_Ja = (_Ia = initDataMatch.value) == null ? void 0 : _Ia[0].home_team) == null ? void 0 : _Ja.name;
      initSchemaMatch((_Ka = initDataMatch.value) == null ? void 0 : _Ka[0]);
    };
    watch(
      () => {
        var _a22, _b2;
        return (_b2 = (_a22 = router == null ? void 0 : router.currentRoute) == null ? void 0 : _a22.value) == null ? void 0 : _b2.path;
      },
      () => {
        var _a22, _b2;
        routerUrl.value = (_b2 = (_a22 = router == null ? void 0 : router.currentRoute) == null ? void 0 : _a22.value) == null ? void 0 : _b2.path;
      },
      { deep: true, immediate: true }
    );
    watch(
      () => route.query,
      (newQuery) => {
        var _a22;
        isHaft.value = ((_a22 = route.query) == null ? void 0 : _a22.haft) == 1 ? true : false;
      },
      { immediate: true }
    );
    watch(
      props,
      () => {
        var _a22, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k;
        try {
          const wssItem = props == null ? void 0 : props.socketData;
          if (wssItem.payload.match_live) {
            const matchLive = wssItem.payload.match_live;
            const matchStatusMapping = {
              3: "HT",
              8: "Fulltime",
              7: "PS",
              5: "OT",
              9: "Delay"
            };
            for (const match of matchLive) {
              const matchId = match.matchId;
              const status = match.status;
              const timestampKickOff = match.timestamp_kick_off;
              const currentTimestamp = Math.floor(Date.now() / 1e3);
              if (status !== 1 && timestampKickOff !== 0) {
                if (((_b2 = (_a22 = initDataMatch.value) == null ? void 0 : _a22[0]) == null ? void 0 : _b2.id) == matchId) {
                  let statusText = null;
                  if (status === 2) {
                    const matchMinutes = Math.floor((currentTimestamp - timestampKickOff) / 60 + 1);
                    statusText = `<i class="fas fa-circle blink-icon"></i><span class="countstatus">${matchMinutes}</span>`;
                    initDataMatch.value[0].matchMinutes = statusText;
                  } else if (status === 4) {
                    const matchMinutes = Math.floor((currentTimestamp - timestampKickOff) / 60 + 45 + 1);
                    statusText = `<i class="fas fa-circle blink-icon"></i><span class="countstatus">${matchMinutes}</span>`;
                    initDataMatch.value[0].matchMinutes = statusText;
                  } else {
                    initDataMatch.value[0].matchMinutes = statusText;
                  }
                }
              }
            }
          } else if (wssItem.payload) {
            const matchScores = wssItem.payload;
            for (const match of matchScores) {
              const matchId = match.id;
              if (((_c2 = initDataMatch.value) == null ? void 0 : _c2[0].id) == matchId && (match == null ? void 0 : match.score)) {
                homeAll.value = (_e2 = (_d2 = match == null ? void 0 : match.score) == null ? void 0 : _d2[2]) == null ? void 0 : _e2[0];
                awayAll.value = (_g = (_f2 = match == null ? void 0 : match.score) == null ? void 0 : _f2[3]) == null ? void 0 : _g[0];
                homeFirst.value = (_i = (_h = match == null ? void 0 : match.score) == null ? void 0 : _h[2]) == null ? void 0 : _i[1];
                awayFirst.value = (_k = (_j = match == null ? void 0 : match.score) == null ? void 0 : _j[3]) == null ? void 0 : _k[1];
              }
            }
          }
        } catch (e) {
          return false;
        }
      }
    );
    fetchMatchRecentDetail();
    return (_ctx, _push, _parent, _attrs) => {
      var _a3, _b3, _c3;
      var _a22, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa;
      const _component_nuxt_link = __nuxt_component_0$3;
      const _component_BaseImage = _sfc_main$d$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "mobile-header" }, _attrs))} data-v-c0cb5fc2><div class="match innerPage" id="match" data-v-c0cb5fc2><div class="gameBox" data-v-c0cb5fc2><div class="header" data-v-c0cb5fc2><div class="gameName" data-v-c0cb5fc2>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: ((_b2 = (_a22 = initDataMatch.value) == null ? void 0 : _a22[0]) == null ? void 0 : _b2.season_id) ? `${("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).LEAGUES}/${(_e2 = (_d2 = (_c2 = initDataMatch.value) == null ? void 0 : _c2[0]) == null ? void 0 : _d2.competition) == null ? void 0 : _e2.id}` : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bor" data-v-c0cb5fc2${_scopeId}><span id="wi" data-v-c0cb5fc2${_scopeId}>${ssrInterpolate(competitionName.value)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "bor" }, [
                createVNode("span", { id: "wi" }, toDisplayString(competitionName.value), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="date" id="liveMt" data-v-c0cb5fc2>${(_a3 = ("formatDateMomentUTCTimeZone" in _ctx ? _ctx.formatDateMomentUTCTimeZone : unref(formatDateMomentUTCTimeZone))(matchTime.value, "DD-MM-yyyy HH:mm - dddd", timeZone.value)) != null ? _a3 : ""}</span></div><div class="match-tools" data-v-c0cb5fc2><i class="icon iconfont icon-font-collect-off" id="btnOnTop" data-v-c0cb5fc2></i><i class="shareTop icon iconfont icon-font-share" data-v-c0cb5fc2></i></div></div><div class="gameInfo" data-v-c0cb5fc2><div class="home" data-v-c0cb5fc2><i class="icon iconfont icon-font-collect-off collect" id="btnHomeTeamTop" data-v-c0cb5fc2></i><div class="icon logo_match" data-v-c0cb5fc2><div target="_self" class="img_logo_match" data-v-c0cb5fc2>`);
      if (homeTeamLogo.value) {
        _push(ssrRenderComponent(_component_BaseImage, {
          class: !!((_h = (_g = (_f2 = initDataMatch.value) == null ? void 0 : _f2[0]) == null ? void 0 : _g.home_team) == null ? void 0 : _h.national) ? "p-14" : "p-1",
          src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(homeTeamLogo.value, "team") + "!h80",
          alt: homeTeamName.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="name" data-v-c0cb5fc2>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${(_k = (_j = (_i = initDataMatch.value) == null ? void 0 : _i[0]) == null ? void 0 : _j.home_team) == null ? void 0 : _k.id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(homeTeamName.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(homeTeamName.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="vs" data-v-c0cb5fc2><div id="liveHS" class="hs score" style="${ssrRenderStyle({ "display": "" })}" data-v-c0cb5fc2>${ssrInterpolate(homeAll.value)}</div><div id="liveGS" class="as score" style="${ssrRenderStyle({ "display": "" })}" data-v-c0cb5fc2>${ssrInterpolate(awayAll.value)}</div><span id="liveSt" class="status" data-v-c0cb5fc2>${(_b3 = ("getStatusDisplay" in _ctx ? _ctx.getStatusDisplay : unref(getStatusDisplay))((_l = initDataMatch.value) == null ? void 0 : _l.match, unref($t), timeZone.value)) != null ? _b3 : ""}</span><div id="liveFt" class="FT" style="${ssrRenderStyle({ "display": "none" })}" data-v-c0cb5fc2>VS</div><div id="liveVS" class="FT xsVS" style="${ssrRenderStyle({})}" data-v-c0cb5fc2>${(_c3 = ("getStatusDisplay" in _ctx ? _ctx.getStatusDisplay : unref(getStatusDisplay))((_m = initDataMatch.value) == null ? void 0 : _m[0], unref($t), timeZone.value)) != null ? _c3 : ""}</div><div id="liveHt" class="HT" data-v-c0cb5fc2>(${ssrInterpolate(homeFirst.value)}-${ssrInterpolate(awayFirst.value)})</div>`);
      if (liveStream.value && unref(availableStreamUrl)) {
        _push(ssrRenderComponent(_component_nuxt_link, {
          target: "_blank",
          to: unref(availableStreamUrl) + "?ls-id=" + matchIdLive.value,
          class: "video"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="icon iconfont icon-font-live video" data-v-c0cb5fc2${_scopeId}></span>`);
            } else {
              return [
                createVNode("span", { class: "icon iconfont icon-font-live video" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="guest" data-v-c0cb5fc2><i class="icon iconfont icon-font-collect-off collect" id="btnGuestTeamTop" data-v-c0cb5fc2></i><div class="icon logo_match" data-v-c0cb5fc2><div target="_self" class="img_logo_match" data-v-c0cb5fc2>`);
      if (awayTeamLogo.value) {
        _push(ssrRenderComponent(_component_BaseImage, {
          class: !!((_p = (_o = (_n = initDataMatch.value) == null ? void 0 : _n[0]) == null ? void 0 : _o.away_team) == null ? void 0 : _p.national) ? "p-14" : "p-1",
          name: "",
          src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(awayTeamLogo.value, "team") + "!h80",
          alt: awayTeamName.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><span class="name" data-v-c0cb5fc2>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${(_s = (_r = (_q = initDataMatch.value) == null ? void 0 : _q[0]) == null ? void 0 : _r.away_team) == null ? void 0 : _s.id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(awayTeamName.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(awayTeamName.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div></div><div id="liveHt" class="HT" data-v-c0cb5fc2>`);
      if (((_u = (_t = initDataMatch.value) == null ? void 0 : _t[0]) == null ? void 0 : _u.home_scores[6]) != 0 || ((_w = (_v = initDataMatch.value) == null ? void 0 : _v[0]) == null ? void 0 : _w.away_scores[6]) != 0) {
        _push(`<span class="explain" id="explain" data-explainlist="90,0-0;;1,0-0;3-0;1" data-v-c0cb5fc2> 90 ${ssrInterpolate(unref($t)("Minute"))} [${ssrInterpolate((_y = (_x = initDataMatch.value) == null ? void 0 : _x[0]) == null ? void 0 : _y.home_scores[0])}-${ssrInterpolate((_A = (_z = initDataMatch.value) == null ? void 0 : _z[0]) == null ? void 0 : _A.away_scores[0])}], 120 ${ssrInterpolate(unref($t)("Minute"))}[${ssrInterpolate((_C = (_B = initDataMatch.value) == null ? void 0 : _B[0]) == null ? void 0 : _C.home_scores[5])}-${ssrInterpolate((_E = (_D = initDataMatch.value) == null ? void 0 : _D[0]) == null ? void 0 : _E.away_scores[5])}], ${ssrInterpolate(unref($t)("Penalty"))}[${ssrInterpolate((_G = (_F = initDataMatch.value) == null ? void 0 : _F[0]) == null ? void 0 : _G.home_scores[6])}-${ssrInterpolate((_I = (_H = initDataMatch.value) == null ? void 0 : _H[0]) == null ? void 0 : _I.away_scores[6])}] ${ssrInterpolate(((_K = (_J = initDataMatch.value) == null ? void 0 : _J[0]) == null ? void 0 : _K.home_scores[6]) > ((_M = (_L = initDataMatch.value) == null ? void 0 : _L[0]) == null ? void 0 : _M.away_scores[6]) ? homeTeamName.value + " " + unref($t)("Win") : awayTeamName.value + " " + unref($t)("Win"))}</span>`);
      } else if (((_O = (_N = initDataMatch.value) == null ? void 0 : _N[0]) == null ? void 0 : _O.home_scores[5]) != 0 || ((_Q = (_P = initDataMatch.value) == null ? void 0 : _P[0]) == null ? void 0 : _Q.away_scores[5]) != 0) {
        _push(`<span class="explain" id="explain" data-explainlist="90,0-0;;1,0-0;3-0;1" data-v-c0cb5fc2> 90 ${ssrInterpolate(unref($t)("Minute"))}[${ssrInterpolate((_S = (_R = initDataMatch.value) == null ? void 0 : _R[0]) == null ? void 0 : _S.home_scores[0])}-${ssrInterpolate((_U = (_T = initDataMatch.value) == null ? void 0 : _T[0]) == null ? void 0 : _U.away_scores[0])}], 120 ${ssrInterpolate(unref($t)("Minute"))}[${ssrInterpolate((_W = (_V = initDataMatch.value) == null ? void 0 : _V[0]) == null ? void 0 : _W.home_scores[5])}-${ssrInterpolate((_Y = (_X = initDataMatch.value) == null ? void 0 : _X[0]) == null ? void 0 : _Y.away_scores[5])}], ${ssrInterpolate(((__ = (_Z = initDataMatch.value) == null ? void 0 : _Z[0]) == null ? void 0 : __.home_scores[5]) > ((_aa = (_$ = initDataMatch.value) == null ? void 0 : _$[0]) == null ? void 0 : _aa.away_scores[5]) ? homeTeamName.value + " " + unref($t)("Win") : awayTeamName.value + " " + unref($t)("Win"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><nav class="detailMenu peerBox" data-v-c0cb5fc2>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: ["item d-flex justify-content-center align-items-center", tab.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).DETAIL || tab.value === "" ? "on" : ""],
        to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).DETAIL } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref($t)("Detail"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref($t)("Detail")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: ["item d-flex justify-content-center align-items-center", tab.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).H2H ? "on" : ""],
        to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).H2H } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref($t)("Analysis"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref($t)("Analysis")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: ["item d-flex justify-content-center align-items-center", tab.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS ? "on" : ""],
        to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref($t)("Odds"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref($t)("Odds")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: ["item d-flex justify-content-center align-items-center", tab.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).STATISTICAL ? "on" : ""],
        to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).STATISTICAL } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(width) > 768 ? unref($t)("Player statistics") : unref($t)("Player statistic"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(width) > 768 ? unref($t)("Player statistics") : unref($t)("Player statistic")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="tabs_box" id="subMenu" style="${ssrRenderStyle({ "display": "none" })}" data-v-c0cb5fc2><ul class="tabs_group" data-v-c0cb5fc2></ul></div>`);
      if (tab.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(`<div class="match-odds-menu" data-v-c0cb5fc2><div class="d-flex" data-v-c0cb5fc2>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("3in1 Odd"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("3in1 Odd")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ASIAN_HANDICAP_ODDS } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ASIAN_HANDICAP_ODDS ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Hadicap Odd"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Hadicap Odd")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).OVER_UNDER_ODDS } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).OVER_UNDER_ODDS ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Over/Under Odd"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Over/Under Odd")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS_1X2 } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS_1X2 ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("1x2 Odd"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("1x2 Odd")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORNER_OU_ODDS } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORNER_OU_ODDS ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Corner Odd T/X"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Corner Odd T/X")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORRECT_SCORE_ODDS } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORRECT_SCORE_ODDS ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Correct Score"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Correct Score")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).EURO_HANDICAP_ODDS } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).EURO_HANDICAP_ODDS ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Euro Handicap"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Euro Handicap")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).DOUBLE_CHANCE_ODDS } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).DOUBLE_CHANCE_ODDS ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Double Chance"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Double Chance")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="tabsBox ms-3" style="${ssrRenderStyle(type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP || type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ASIAN_HANDICAP_ODDS || type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).OVER_UNDER_ODDS || type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORNER_OU_ODDS ? null : { display: "none" })}" data-v-c0cb5fc2><div id="ftBtn" class="${ssrRenderClass([!isHaft.value ? "on" : "", "item"])}" data-v-c0cb5fc2>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: tab.value, type: type.value, haft: 0 } }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`FT`);
            } else {
              return [
                createTextVNode("FT")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div id="htBtn" class="${ssrRenderClass([isHaft.value ? "on" : "", "item"])}" data-v-c0cb5fc2>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: tab.value, type: type.value, haft: 1 } }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`HT`);
            } else {
              return [
                createTextVNode("HT")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeaderComponent.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-c0cb5fc2"]]);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "table-detail",
  __ssrInlineRender: true,
  setup(__props) {
    const { $t } = useShareCommon();
    const translate = (key) => {
      const fullKey = `${key} playertech`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_img = _sfc_main$e$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "icons" }, _attrs))} data-v-68096b92><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/1.png",
        alt: translate("Goals")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Goals"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/7.png",
        alt: translate("Scored Penalty")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Scored Penalty"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/8.png",
        alt: translate("Own Goal")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Own Goal"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/12.png",
        alt: translate("Assist")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Assist"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/3.png",
        alt: translate("Yellow Card")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Yellow Card"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/2.png",
        alt: translate("Red Card")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Red Card"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/9.png",
        alt: translate("Second Yellow Card")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Second Yellow Card"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/55.png",
        alt: translate("Mark")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Mark"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/11.png",
        alt: translate("Substitution")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Substitution"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/4.png",
        alt: translate("Substitute Player")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Substitute Player"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/5.png",
        alt: translate("Substituted Player")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Substituted Player"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/13.png",
        alt: translate("Missed Penalty")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Missed Penalty"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/14.png",
        alt: translate("Video Referee")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Video Referee"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/30.png",
        alt: translate("Penalty Save")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Penalty Save"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/31.png",
        alt: translate("Hit Post")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Hit Post"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/32.png",
        alt: translate("Player of the Match")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Player of the Match"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/36.png",
        alt: translate("Penalty for Foul")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Penalty for Foul"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/33.png",
        alt: translate("Lost Goal due to Error")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Lost Goal due to Error"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/35.png",
        alt: translate("Clearance")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Clearance"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/34.png",
        alt: translate("Last Defender")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Last Defender"))}</div><div class="icon" data-v-68096b92>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/icon/player-statistics/37.png",
        alt: translate("Last Dribble")
      }, null, _parent));
      _push(`${ssrInterpolate(translate("Last Dribble"))}</div></div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/player-statstics/table-detail.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-68096b92"]]);
const _imports_0$2 = publicAssetsURL("/img/incident/1.png");
const _imports_1$2 = publicAssetsURL("/img/incident/2.png");
const _imports_2$1 = publicAssetsURL("/img/incident/3.png");
const _imports_3$1 = publicAssetsURL("/img/incident/4.png");
const _imports_4$1 = publicAssetsURL("/img/incident/5.png");
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
const breakpoint$1 = 768;
const wrapperClass$1 = "tr-wrapper";
const productSelectorClass$1 = "product-selector";
const activeClass$1 = "active";
const _sfc_main$d = /* @__PURE__ */ defineComponent({
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
    const { $isMobile } = useNuxtApp();
    const storeSystems = systemsStore();
    const availableStreamUrl = getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "available_stream_url");
    const { y } = useWindowScroll();
    const showAnimation = ref(false);
    const keyEncode = ref("");
    const { useLocale, $t, $trouter } = useShareCommon();
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
      var _a2, _b2;
      if (!((_a2 = match == null ? void 0 : match.stage) == null ? void 0 : _a2.season_id))
        return;
      await useApiLiveScore(API_ROUTERS.LIVESCORE.MATCH_RECENT_RESULT, {
        season_id: (_b2 = match == null ? void 0 : match.stage) == null ? void 0 : _b2.season_id
      }).then((resData) => {
        var _a3, _b3, _c;
        if (resData) {
          const data = (_a3 = resData == null ? void 0 : resData.results) == null ? void 0 : _a3.filter((match2) => (match2 == null ? void 0 : match2.status) === "8");
          const matchsListArray = [];
          Object.values(data).map((item) => {
            matchsListArray.push(item);
          });
          const homeRecent = matchsListArray == null ? void 0 : matchsListArray.filter((item) => {
            var _a4, _b4;
            return (item == null ? void 0 : item.home_team_id) === ((_a4 = match == null ? void 0 : match.home_team) == null ? void 0 : _a4.id) || (item == null ? void 0 : item.away_team_id) === ((_b4 = match == null ? void 0 : match.home_team) == null ? void 0 : _b4.id);
          });
          const awayRecent = matchsListArray == null ? void 0 : matchsListArray.filter((item) => {
            var _a4, _b4;
            return (item == null ? void 0 : item.home_team_id) === ((_a4 = match == null ? void 0 : match.away_team) == null ? void 0 : _a4.id) || (item == null ? void 0 : item.away_team_id) === ((_b4 = match == null ? void 0 : match.away_team) == null ? void 0 : _b4.id);
          });
          matchRecentResult.value.home = getRecentResultStat(
            homeRecent,
            (_b3 = match == null ? void 0 : match.home_team) == null ? void 0 : _b3.id
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
            3,
            $t
          ),
          getStateComparison(
            (_l = matchesAnalysis.value) == null ? void 0 : _l.home_last_matches,
            (_m = matchesAnalysis.value) == null ? void 0 : _m.away_last_matches,
            (_p = (_o = (_n = matchsRecentDetail.value) == null ? void 0 : _n.match) == null ? void 0 : _o.home_team) == null ? void 0 : _p.i_team,
            (_s = (_r = (_q = matchsRecentDetail.value) == null ? void 0 : _q.match) == null ? void 0 : _r.away_team) == null ? void 0 : _s.i_team,
            (_u = (_t = matchsRecentDetail.value) == null ? void 0 : _t.match) == null ? void 0 : _u.i_competition_id,
            10,
            $t
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
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F;
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
                if (matchLiveDetail.value.match.home_scores[0] != ((_z = (_y = match == null ? void 0 : match.score) == null ? void 0 : _y[2]) == null ? void 0 : _z[0])) {
                  setTimeout(() => {
                    fetchMatchsLiveDetail(matchIdSlug.value);
                  }, 6e4);
                }
                if (matchLiveDetail.value.match.away_scores[0] != ((_B = (_A = match == null ? void 0 : match.score) == null ? void 0 : _A[3]) == null ? void 0 : _B[0])) {
                  setTimeout(() => {
                    fetchMatchsLiveDetail(matchIdSlug.value);
                  }, 6e4);
                }
                matchLiveDetail.value.match.home_scores[0] = (_D = (_C = match == null ? void 0 : match.score) == null ? void 0 : _C[2]) == null ? void 0 : _D[0];
                matchLiveDetail.value.match.away_scores[0] = (_F = (_E = match == null ? void 0 : match.score) == null ? void 0 : _E[3]) == null ? void 0 : _F[0];
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
      if ((void 0).innerWidth >= breakpoint$1) {
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
        th.classList.remove(activeClass$1);
      });
      table.value.querySelectorAll(`th[data-product="${product}"]`).forEach((th) => {
        th.classList.add(activeClass$1);
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
      const _component_nuxt_link = __nuxt_component_0$3;
      const _component_PlayBoxComponent = __nuxt_component_0$1;
      const _component_PlayBackupComponent = __nuxt_component_0$1;
      const _component_AnimationComponent = __nuxt_component_0$1;
      const _component_PlayerStatsticsTableDetail = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "",
        class: "match-detail"
      }, _attrs))} data-v-4c2b633a><div id="" data-v-4c2b633a><div class="content" data-v-4c2b633a><div class="content" id="oddsDiv" data-v-4c2b633a><div data-v-4c2b633a><h2 class="team-table-title" data-v-4c2b633a>${ssrInterpolate(unref($t)("Live Odds"))} <select id="detail-hfSel" data-v-4c2b633a><option value="1" data-v-4c2b633a${ssrIncludeBooleanAttr(Array.isArray(detailHfSel.value) ? ssrLooseContain(detailHfSel.value, "1") : ssrLooseEqual(detailHfSel.value, "1")) ? " selected" : ""}>${ssrInterpolate(unref($t)("FT"))}</option><option value="2" data-v-4c2b633a${ssrIncludeBooleanAttr(Array.isArray(detailHfSel.value) ? ssrLooseContain(detailHfSel.value, "2") : ssrLooseEqual(detailHfSel.value, "2")) ? " selected" : ""}>${ssrInterpolate(unref($t)("HT"))}</option></select><select id="detail-oddsSel" data-v-4c2b633a><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (odd_company, index) => {
        _push(`<option${ssrRenderAttr("value", odd_company == null ? void 0 : odd_company.id)} data-v-4c2b633a>${ssrInterpolate(odd_company == null ? void 0 : odd_company.name)}</option>`);
      });
      _push(`<!--]--></select></h2><div class="${ssrRenderClass([wrapperClass$1, "oddsDiv"])}" data-v-4c2b633a><div class="${ssrRenderClass(productSelectorClass$1)}" style="${ssrRenderStyle([
        isMobileView.value ? null : { display: "none" },
        { "display": "flex" }
      ])}" data-v-4c2b633a><!--[-->`);
      ssrRenderList(mobileContents.value, (content, index) => {
        _push(`<span${ssrRenderAttr("data-product", "product-" + (index + 1))} class="${ssrRenderClass({ active: selectedProduct.value === "product-" + (index + 1) })}" data-v-4c2b633a><div data-v-4c2b633a>${ssrInterpolate(content)}</div></span>`);
      });
      _push(`<!--]--></div><table id="oddsTable31" class="tr-table team-table-other oddsTable text-center" data-v-4c2b633a><thead data-v-4c2b633a>`);
      if (unref($isMobile)) {
        _push(`<tr data-v-4c2b633a><th style="${ssrRenderStyle({ "background": "white", "border": "none" })}" data-mobile-collapse data-v-4c2b633a></th><th style="${ssrRenderStyle({ "background": "white", "border": "none" })}" data-mobile-content="HDP" data-v-4c2b633a><b data-v-4c2b633a></b></th><th style="${ssrRenderStyle({ "background": "white", "border": "none" })}"${ssrRenderAttr("data-mobile-content", unref($t)("Over/Under"))} data-featured data-v-4c2b633a><b data-v-4c2b633a></b></th><th style="${ssrRenderStyle({ "background": "white", "border": "none" })}" data-mobile-content="1x2" data-v-4c2b633a><b data-v-4c2b633a></b></th></tr>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref($isMobile)) {
        _push(`<tr data-v-4c2b633a><th data-mobile-collapse data-v-4c2b633a></th><th data-mobile-content="HDP" data-v-4c2b633a><b data-v-4c2b633a>HDP</b></th><th${ssrRenderAttr("data-mobile-content", unref($t)("Over/Under"))} data-featured data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate(unref($t)("Over/Under"))}</b></th><th data-mobile-content="1x2" data-v-4c2b633a><b data-v-4c2b633a>1x2</b></th></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</thead><tbody data-v-4c2b633a><tr data-v-4c2b633a><th data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center title-table" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(unref($t)("Hour"))}</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center title-table" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(unref($t)("Score"))}</span></div></div></th><td data-product="product-1" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(unref($t)("Initial"))}</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(unref($t)("Live"))}</span></div></div></td><td data-product="product-2" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(unref($t)("Initial"))}</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(unref($t)("Live"))}</span></div></div></td><td data-product="product-3" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(unref($t)("Initial"))}</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(unref($t)("Live"))}</span></div></div></td></tr>`);
      if (detailHfSel.value == 2) {
        _push(`<tr data-v-4c2b633a><th data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center fx-green" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(unref($t)("Initial"))}</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center red_number" data-v-4c2b633a><span class="rl" data-v-4c2b633a>-</span></div></div></th><td data-product="product-1" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "initial", 2)))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="ll" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="rl" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicapHalf", "initial", 2)))}</span></div></div></div></div></td><td data-product="product-2" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 2)))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="ll" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="rl" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnderHalf", "initial", 2)))}</span></div></div></div></div></td><td data-product="product-3" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOddsHalf", "initial", 1))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOddsHalf", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOddsHalf", "initial", 2))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="ll" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOddsHalf", "initial", 1))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOddsHalf", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="rl" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOddsHalf", "initial", 2))}</span></div></div></div></div></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      if (detailHfSel.value == 1) {
        _push(`<tr data-v-4c2b633a><th data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center fx-green" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(unref($t)("Initial"))}</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center red_number" data-v-4c2b633a><span class="rl" data-v-4c2b633a>-</span></div></div></th><td data-product="product-1" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 2)))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="ll" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="rl" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 2)))}</span></div></div></div></div></td><td data-product="product-2" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 2)))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="ll" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="rl" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 2)))}</span></div></div></div></div></td><td data-product="product-3" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 1))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 2))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="ll" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 1))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="rl" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 2))}</span></div></div></div></div></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      if (detailHfSel.value == 1) {
        _push(`<tr data-v-4c2b633a><th data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center fx-red" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(unref($t)("Live"))}</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center red_number" data-v-4c2b633a><span class="rl" data-v-4c2b633a>-</span></div></div></th><td data-product="product-1" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 2)))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="ll" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="rl" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "handicap", "initial", 2)))}</span></div></div></div></div></td><td data-product="product-2" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 2)))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="ll" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 1)))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="rl" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "overUnder", "initial", 2)))}</span></div></div></div></div></td><td data-product="product-3" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 1))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 2))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="ll" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 1))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 0))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2" data-v-4c2b633a><span class="rl" data-v-4c2b633a>${ssrInterpolate(("getDetailOdds" in _ctx ? _ctx.getDetailOdds : unref(getDetailOdds))(oddsDetail.value, "europeOdds", "initial", 2))}</span></div></div></div></div></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(Object.keys(oddsDetailHistories.value).sort(), (item, index) => {
        var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2, _y2, _z2, _A2, _B2, _C2, _D2, _E2, _F2, _G2, _H2, _I2, _J2, _K2, _L2, _M2, _N2, _O2, _P2;
        _push(`<tr data-v-4c2b633a><th data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center fx-blue" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate((_b3 = (_a3 = oddsDetailHistories.value) == null ? void 0 : _a3[item]) == null ? void 0 : _b3[0])}</span></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center red_number" data-v-4c2b633a><span class="rl" data-v-4c2b633a>${ssrInterpolate((_d2 = (_c2 = oddsDetailHistories.value) == null ? void 0 : _c2[item]) == null ? void 0 : _d2[1])}:${ssrInterpolate((_f2 = (_e2 = oddsDetailHistories.value) == null ? void 0 : _e2[item]) == null ? void 0 : _f2[2])}</span></div></div></th><td data-product="product-1" style="${ssrRenderStyle({ "display": "table-cell" })}" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_h2 = (_g2 = oddsDetailHistories.value) == null ? void 0 : _g2[item]) == null ? void 0 : _h2[3]))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate((_j2 = (_i2 = oddsDetailHistories.value) == null ? void 0 : _i2[item]) == null ? void 0 : _j2[4])}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_l2 = (_k2 = oddsDetailHistories.value) == null ? void 0 : _k2[item]) == null ? void 0 : _l2[5]))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}" data-v-4c2b633a><span class="ll" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_n2 = (_m2 = oddsDetailHistories.value) == null ? void 0 : _m2[item]) == null ? void 0 : _n2[6]))}</span></div><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}" data-v-4c2b633a><span class="" data-v-4c2b633a>${ssrInterpolate((_p2 = (_o2 = oddsDetailHistories.value) == null ? void 0 : _o2[item]) == null ? void 0 : _p2[7])}</span></div><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}" data-v-4c2b633a><span class="rl" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_r2 = (_q2 = oddsDetailHistories.value) == null ? void 0 : _q2[item]) == null ? void 0 : _r2[8]))}</span></div></div></div></div></td><td data-product="product-2" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_t2 = (_s2 = oddsDetailHistories.value) == null ? void 0 : _s2[item]) == null ? void 0 : _t2[9]))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate((_v2 = (_u2 = oddsDetailHistories.value) == null ? void 0 : _u2[item]) == null ? void 0 : _v2[10])}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_x2 = (_w2 = oddsDetailHistories.value) == null ? void 0 : _w2[item]) == null ? void 0 : _x2[11]))}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}" data-v-4c2b633a><span class="ll" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_z2 = (_y2 = oddsDetailHistories.value) == null ? void 0 : _y2[item]) == null ? void 0 : _z2[12]))}</span></div><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}" data-v-4c2b633a><span class="" data-v-4c2b633a>${ssrInterpolate((_B2 = (_A2 = oddsDetailHistories.value) == null ? void 0 : _A2[item]) == null ? void 0 : _B2[13])}</span></div><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}" data-v-4c2b633a><span class="rl" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_D2 = (_C2 = oddsDetailHistories.value) == null ? void 0 : _C2[item]) == null ? void 0 : _D2[14]))}</span></div></div></div></div></td><td data-product="product-3" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate((_F2 = (_E2 = oddsDetailHistories.value) == null ? void 0 : _E2[item]) == null ? void 0 : _F2[15])}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate((_H2 = (_G2 = oddsDetailHistories.value) == null ? void 0 : _G2[item]) == null ? void 0 : _H2[16])}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate((_J2 = (_I2 = oddsDetailHistories.value) == null ? void 0 : _I2[item]) == null ? void 0 : _J2[17])}</span></div></div></div><div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0" data-v-4c2b633a><div class="row mlr-0" data-v-4c2b633a><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}" data-v-4c2b633a><span class="ll" data-v-4c2b633a>${ssrInterpolate((_L2 = (_K2 = oddsDetailHistories.value) == null ? void 0 : _K2[item]) == null ? void 0 : _L2[18])}</span></div><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}" data-v-4c2b633a><span class="" data-v-4c2b633a>${ssrInterpolate((_N2 = (_M2 = oddsDetailHistories.value) == null ? void 0 : _M2[item]) == null ? void 0 : _N2[19])}</span></div><div class="${ssrRenderClass([index == oddsDetailHistoriesLength.value - 1 ? "hbg-td1" : "hbg-td2", "col-4 col-md-4 col-lg-4 text-center align-self-center"])}" data-v-4c2b633a><span class="" data-v-4c2b633a>${ssrInterpolate((_P2 = (_O2 = oddsDetailHistories.value) == null ? void 0 : _O2[item]) == null ? void 0 : _P2[20])}</span></div></div></div></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="discription" data-v-4c2b633a><span class="hbg-td2" data-v-4c2b633a></span> :${ssrInterpolate(unref($t)("Historical data"))} <span class="hbg-td1" data-v-4c2b633a></span> :${ssrInterpolate(unref($t)("Latest data"))}</div></div></div>`);
      if (((_a2 = matchOddsCorner.value) == null ? void 0 : _a2.corner) && ((_b2 = matchOddsCorner.value) == null ? void 0 : _b2.hadicap)) {
        _push(`<div class="content" id="cornerOddsDiv" data-v-4c2b633a><div data-v-4c2b633a><h2 class="team-table-title" data-v-4c2b633a>${ssrInterpolate(unref($t)("Corner Odd"))}</h2><div class="team-table-other text-center" data-v-4c2b633a>`);
        if ((_c = matchOddsCorner.value) == null ? void 0 : _c.hadicap) {
          _push(`<div class="row" data-v-4c2b633a><div class="col-12 text-center align-self-center bdtable bg_header1" data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate(unref($t)("HDP"))}</b></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_d = matchOddsCorner.value) == null ? void 0 : _d.hadicap) {
          _push(`<div class="row" data-v-4c2b633a><div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable bg_header2" data-v-4c2b633a><span class="th-bg3 rl" data-v-4c2b633a>${ssrInterpolate(unref($t)("Initial"))}</span></div><div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable" data-v-4c2b633a>${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_g = (_f = (_e = matchOddsCorner.value) == null ? void 0 : _e.hadicap) == null ? void 0 : _f[0]) == null ? void 0 : _g.initial, 1))}</div><div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable" data-v-4c2b633a>${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_j = (_i = (_h = matchOddsCorner.value) == null ? void 0 : _h.hadicap) == null ? void 0 : _i[0]) == null ? void 0 : _j.initial, 0))}</div><div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable" data-v-4c2b633a>${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_m = (_l = (_k = matchOddsCorner.value) == null ? void 0 : _k.hadicap) == null ? void 0 : _l[0]) == null ? void 0 : _m.initial, 2))}</div><div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable bg_header2" data-v-4c2b633a><span class="th-bg3 ll rl" data-v-4c2b633a>${ssrInterpolate(unref($t)("Live"))}</span></div><div class="${ssrRenderClass([("getClassOddCorner" in _ctx ? _ctx.getClassOddCorner : unref(getClassOddCorner))(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_p = (_o = (_n = matchOddsCorner.value) == null ? void 0 : _n.hadicap) == null ? void 0 : _o[0]) == null ? void 0 : _p.inplay, 1), ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_s = (_r = (_q = matchOddsCorner.value) == null ? void 0 : _q.hadicap) == null ? void 0 : _r[0]) == null ? void 0 : _s.inplay_older, 1)), "col-4 col-md-1 col-lg-1 text-center align-self-center bdtable"])}" data-v-4c2b633a>${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_v = (_u = (_t = matchOddsCorner.value) == null ? void 0 : _t.hadicap) == null ? void 0 : _u[0]) == null ? void 0 : _v.inplay, 1) ? ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_y = (_x = (_w = matchOddsCorner.value) == null ? void 0 : _w.hadicap) == null ? void 0 : _x[0]) == null ? void 0 : _y.inplay, 1) : ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_B = (_A = (_z = matchOddsCorner.value) == null ? void 0 : _z.hadicap) == null ? void 0 : _A[0]) == null ? void 0 : _B.instant, 1))}</div><div class="${ssrRenderClass([("getClassOddCorner" in _ctx ? _ctx.getClassOddCorner : unref(getClassOddCorner))(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_E = (_D = (_C = matchOddsCorner.value) == null ? void 0 : _C.hadicap) == null ? void 0 : _D[0]) == null ? void 0 : _E.inplay, 0), ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_H = (_G = (_F = matchOddsCorner.value) == null ? void 0 : _F.hadicap) == null ? void 0 : _G[0]) == null ? void 0 : _H.inplay_older, 0)), "col-4 col-md-1 col-lg-1 text-center align-self-center bdtable"])}" data-v-4c2b633a>${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_K = (_J = (_I = matchOddsCorner.value) == null ? void 0 : _I.hadicap) == null ? void 0 : _J[0]) == null ? void 0 : _K.inplay, 0) ? ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_N = (_M = (_L = matchOddsCorner.value) == null ? void 0 : _L.hadicap) == null ? void 0 : _M[0]) == null ? void 0 : _N.inplay, 0) : ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_Q = (_P = (_O = matchOddsCorner.value) == null ? void 0 : _O.hadicap) == null ? void 0 : _P[0]) == null ? void 0 : _Q.instant, 0))}</div><div class="${ssrRenderClass([("getClassOddCorner" in _ctx ? _ctx.getClassOddCorner : unref(getClassOddCorner))(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_T = (_S = (_R = matchOddsCorner.value) == null ? void 0 : _R.hadicap) == null ? void 0 : _S[0]) == null ? void 0 : _T.inplay, 2), ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_W = (_V = (_U = matchOddsCorner.value) == null ? void 0 : _U.hadicap) == null ? void 0 : _V[0]) == null ? void 0 : _W.inplay_older, 2)), "col-4 col-md-1 col-lg-1 text-center align-self-center bdtable"])}" data-v-4c2b633a>${ssrInterpolate(("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_Z = (_Y = (_X = matchOddsCorner.value) == null ? void 0 : _X.hadicap) == null ? void 0 : _Y[0]) == null ? void 0 : _Z.inplay, 2) ? ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_aa = (_$ = (__ = matchOddsCorner.value) == null ? void 0 : __.hadicap) == null ? void 0 : _$[0]) == null ? void 0 : _aa.inplay, 2) : ("getOddCornerValue" in _ctx ? _ctx.getOddCornerValue : unref(getOddCornerValue))((_da = (_ca = (_ba = matchOddsCorner.value) == null ? void 0 : _ba.hadicap) == null ? void 0 : _ca[0]) == null ? void 0 : _da.instant, 2))}</div><div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable" data-v-4c2b633a></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_ea = matchOddsCorner.value) == null ? void 0 : _ea.corner) {
          _push(`<div class="row" data-v-4c2b633a><div class="col-12 text-center align-self-center bdtable bg_header1" data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate(unref($t)("Over/Under"))}</b></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_fa = matchOddsCorner.value) == null ? void 0 : _fa.corner) {
          _push(`<div class="row" data-v-4c2b633a><div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable bg_header2" data-v-4c2b633a><span class="th-bg3 ll rl" data-v-4c2b633a>${ssrInterpolate(unref($t)("Initial"))}</span></div><div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_ja = (_ia = (_ha = (_ga = matchOddsCorner.value) == null ? void 0 : _ga.corner) == null ? void 0 : _ha.early) == null ? void 0 : _ia[0]) == null ? void 0 : _ja.over))}</div><div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_na = (_ma = (_la = (_ka = matchOddsCorner.value) == null ? void 0 : _ka.corner) == null ? void 0 : _la.early) == null ? void 0 : _ma[0]) == null ? void 0 : _na.total_corners))}</div><div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_ra = (_qa = (_pa = (_oa = matchOddsCorner.value) == null ? void 0 : _oa.corner) == null ? void 0 : _pa.early) == null ? void 0 : _qa[0]) == null ? void 0 : _ra.under))}</div><div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable bg_header2" data-v-4c2b633a><span class="th-bg3 ll rl" data-v-4c2b633a>${ssrInterpolate(unref($t)("Live"))}</span></div><div class="${ssrRenderClass([("getClassOddCorner" in _ctx ? _ctx.getClassOddCorner : unref(getClassOddCorner))((_va = (_ua = (_ta = (_sa = matchOddsCorner.value) == null ? void 0 : _sa.corner) == null ? void 0 : _ta.live) == null ? void 0 : _ua[0]) == null ? void 0 : _va.over, (_za = (_ya = (_xa = (_wa = matchOddsCorner.value) == null ? void 0 : _wa.corner) == null ? void 0 : _xa.live_older) == null ? void 0 : _ya[0]) == null ? void 0 : _za.over), "col-4 col-md-1 col-lg-1 text-center align-self-center bdtable"])}" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_Da = (_Ca = (_Ba = (_Aa = matchOddsCorner.value) == null ? void 0 : _Aa.corner) == null ? void 0 : _Ba.live) == null ? void 0 : _Ca[0]) == null ? void 0 : _Da.over))}</div><div class="${ssrRenderClass([("getClassOddCorner" in _ctx ? _ctx.getClassOddCorner : unref(getClassOddCorner))((_Ha = (_Ga = (_Fa = (_Ea = matchOddsCorner.value) == null ? void 0 : _Ea.corner) == null ? void 0 : _Fa.live) == null ? void 0 : _Ga[0]) == null ? void 0 : _Ha.total_corners, (_La = (_Ka = (_Ja = (_Ia = matchOddsCorner.value) == null ? void 0 : _Ia.corner) == null ? void 0 : _Ja.live_older) == null ? void 0 : _Ka[0]) == null ? void 0 : _La.total_corners), "col-4 col-md-1 col-lg-1 text-center align-self-center bdtable"])}" data-v-4c2b633a>${ssrInterpolate((_Pa = (_Oa = (_Na = (_Ma = matchOddsCorner.value) == null ? void 0 : _Ma.corner) == null ? void 0 : _Na.live) == null ? void 0 : _Oa[0]) == null ? void 0 : _Pa.total_corners)}</div><div class="${ssrRenderClass([("getClassOddCorner" in _ctx ? _ctx.getClassOddCorner : unref(getClassOddCorner))((_Ta = (_Sa = (_Ra = (_Qa = matchOddsCorner.value) == null ? void 0 : _Qa.corner) == null ? void 0 : _Ra.live) == null ? void 0 : _Sa[0]) == null ? void 0 : _Ta.under, (_Xa = (_Wa = (_Va = (_Ua = matchOddsCorner.value) == null ? void 0 : _Ua.corner) == null ? void 0 : _Va.live_older) == null ? void 0 : _Wa[0]) == null ? void 0 : _Xa.under), "col-4 col-md-1 col-lg-1 text-center align-self-center bdtable"])}" data-v-4c2b633a>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_$a = (__a = (_Za = (_Ya = matchOddsCorner.value) == null ? void 0 : _Ya.corner) == null ? void 0 : _Za.live) == null ? void 0 : __a[0]) == null ? void 0 : _$a.under))}</div><div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable" data-v-4c2b633a>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORNER_OU_ODDS } },
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref($t)("Detail"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref($t)("Detail")), 1)
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
      _push(`<div class="content" data-v-4c2b633a><div id="mactbox-black" data-v-4c2b633a><div id="lineupMenu" class="lineup-menu" style="${ssrRenderStyle({ "display": "block" })}" data-v-4c2b633a><div class="switch-btn" data-v-4c2b633a><span class="${ssrRenderClass({ on: activeSection.value === "lineup" })}" name="lineup" data-v-4c2b633a>${ssrInterpolate(unref($t)("Lineup"))}</span><span class="${ssrRenderClass({ on: activeSection.value === "animation" })}" name="animation" data-v-4c2b633a>${ssrInterpolate(unref($t)("Animation"))}</span></div>`);
      if (liveStream.value && unref(availableStreamUrl)) {
        _push(ssrRenderComponent(_component_nuxt_link, {
          target: "_blank",
          to: unref(availableStreamUrl) + "?ls-id=" + matchIdLive.value,
          class: "video"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="tv-btn" style="${ssrRenderStyle({ "display": "inline" })}" data-v-4c2b633a${_scopeId}><span class="livebtn" data-v-4c2b633a${_scopeId}><i class="icon iconfont icon-icon-live2" data-v-4c2b633a${_scopeId}></i>${ssrInterpolate(unref($t)("Video"))}</span></span>`);
            } else {
              return [
                createVNode("span", {
                  class: "tv-btn",
                  style: { "display": "inline" }
                }, [
                  createVNode("span", { class: "livebtn" }, [
                    createVNode("i", { class: "icon iconfont icon-icon-live2" }),
                    createTextVNode(toDisplayString(unref($t)("Video")), 1)
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
        _push(`<div id="lineupBox" data-v-4c2b633a><div class="teamNames" data-v-4c2b633a><span class="tn-home home-bg" data-v-4c2b633a><span class="teamname" data-v-4c2b633a>${ssrInterpolate(homeTeamName.value)}</span><span data-v-4c2b633a>${ssrInterpolate(homeFormation.value)}</span></span><span class="tn-away away-bg" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(awayFormation.value)}</span><span class="teamname" data-v-4c2b633a>${ssrInterpolate(awayTeamName.value)}</span></span></div><div id="matchBox" data-v-4c2b633a><div class="plays" data-v-4c2b633a><div class="home five" data-v-4c2b633a><!--[-->`);
        ssrRenderList(unref(lineup).home, (player) => {
          _push(ssrRenderComponent(_component_PlayBoxComponent, {
            key: player.id,
            player,
            style: getPlayerStyle(player, "home")
          }, null, _parent));
        });
        _push(`<!--]--></div><div class="guest five" data-v-4c2b633a><!--[-->`);
        ssrRenderList(unref(lineup).away, (player) => {
          _push(ssrRenderComponent(_component_PlayBoxComponent, {
            key: player.id,
            player,
            style: getPlayerStyle(player, "away")
          }, null, _parent));
        });
        _push(`<!--]--></div></div>`);
        if (unref(lineBackup).home.length || unref(lineBackup).away.length) {
          _push(`<div id="lineBackup-btn" class="${ssrRenderClass([{ on: isBackupPlayVisible.value }, "shutup-btn linebackup"])}" data-v-4c2b633a><span id="shutup-btn-txt" data-v-4c2b633a>${ssrInterpolate(isBackupPlayVisible.value ? unref($t)("Hide substitute players") : unref($t)("See more substitute players"))}</span><i class="icon iconfont icon-drop-down" data-v-4c2b633a></i></div>`);
        } else {
          _push(`<!---->`);
        }
        if (isBackupPlayVisible.value) {
          _push(`<div id="backupPlay" class="backupPlay" data-v-4c2b633a><div class="home" data-v-4c2b633a><!--[-->`);
          ssrRenderList(unref(lineBackup).home, (player) => {
            _push(ssrRenderComponent(_component_PlayBackupComponent, {
              key: player.id,
              player
            }, null, _parent));
          });
          _push(`<!--]--></div><div class="guest" data-v-4c2b633a><!--[-->`);
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
        _push(`<div id="shutup-btn" class="${ssrRenderClass([{ on: iconsVisible.value }, "shutup-btn"])}" data-v-4c2b633a><span id="shutup-btn-txt" data-v-4c2b633a>${ssrInterpolate(iconsVisible.value ? unref($t)("Close") : unref($t)("More"))}</span><i class="icon iconfont icon-drop-down" data-v-4c2b633a></i></div></div>`);
        if (iconsVisible.value) {
          _push(`<div id="icons" data-v-4c2b633a><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_0$2)} alt="Goal" data-v-4c2b633a>${ssrInterpolate(unref($t)("Goal"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_1$2)} alt="Corner" data-v-4c2b633a>${ssrInterpolate(unref($t)("Corner"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_2$1)} alt="Yellow card" data-v-4c2b633a>${ssrInterpolate(unref($t)("Yellow card"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_3$1)} alt="Red card" data-v-4c2b633a>${ssrInterpolate(unref($t)("Red card"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_4$1)} alt="Offside" data-v-4c2b633a>${ssrInterpolate(unref($t)("Offside"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_5)} alt="Free kick" data-v-4c2b633a>${ssrInterpolate(unref($t)("Free kick"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_6)} alt="Goal kick" data-v-4c2b633a>${ssrInterpolate(unref($t)("Goal kick"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_7)} alt="Penalty" data-v-4c2b633a>${ssrInterpolate(unref($t)("Yellow card"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_8)} alt="Sub in" data-v-4c2b633a>${ssrInterpolate(unref($t)("Sub in"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_9)} alt="Sub out" data-v-4c2b633a>${ssrInterpolate(unref($t)("Sub out"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_10)} alt="Midfield" data-v-4c2b633a>${ssrInterpolate(unref($t)("Midfield"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_11)} alt="End" data-v-4c2b633a>${ssrInterpolate(unref($t)("End"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_12)} alt="Halftime score" data-v-4c2b633a>${ssrInterpolate(unref($t)("Halftime score"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_13)} alt="Card upgrade confirmed" data-v-4c2b633a>${ssrInterpolate(unref($t)("Card upgrade confirmed"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_14)} alt="Penalty missed" data-v-4c2b633a>${ssrInterpolate(unref($t)("Penalty missed"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_15)} alt="Own goal" data-v-4c2b633a>${ssrInterpolate(unref($t)("Own goal"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_16)} alt="Injury time" data-v-4c2b633a>${ssrInterpolate(unref($t)("Injury time"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_17)} alt="Shots on target" data-v-4c2b633a>${ssrInterpolate(unref($t)("Shots on target"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_18)} alt="Shots off target" data-v-4c2b633a>${ssrInterpolate(unref($t)("Shots off target"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_19)} alt="Dangerous Attack" data-v-4c2b633a>${ssrInterpolate(unref($t)("Dangerous Attack"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_20)} alt="Ball possession" data-v-4c2b633a>${ssrInterpolate(unref($t)("Ball possession"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_11)} alt="Overtime is over" data-v-4c2b633a>${ssrInterpolate(unref($t)("Overtime is over"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_5)} alt="Penalty kick ended" data-v-4c2b633a>${ssrInterpolate(unref($t)("Penalty kick ended"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_21)} alt="VAR" data-v-4c2b633a>${ssrInterpolate(unref($t)("VAR"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_7)} alt="Penalty(Penalty Shoot-out)" data-v-4c2b633a>${ssrInterpolate(unref($t)("Penalty(Penalty Shoot-out)"))}</div><div class="icon" data-v-4c2b633a><img${ssrRenderAttr("src", _imports_14)} alt="Penalty missed(Penalty Shoot-out)" data-v-4c2b633a>${ssrInterpolate(unref($t)("Penalty missed(Penalty Shoot-out)"))}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeSection.value === "animation") {
        _push(`<div id="flashBox" class="flash" data-v-4c2b633a><div class="embed-responsive-item-widget" data-v-4c2b633a>`);
        if (showAnimation.value) {
          _push(ssrRenderComponent(_component_AnimationComponent, {
            "key-encode": keyEncode.value,
            "match-id-slug": matchIdSlug.value,
            lang: unref(useLocale).defaultLocale
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div id="teamEventDiv_detail" class="content" data-v-4c2b633a><div class="team-table-title row" data-v-4c2b633a><span class="team-table-xq-home col-4" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(homeTeamName.value)}</span></span><span class="col-4" data-v-4c2b633a>${ssrInterpolate(unref($t)("Main event"))}</span><span class="team-table-xq-guest col-4" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(awayTeamName.value)}</span></span></div><div class="team-bg-h1" data-v-4c2b633a><span class="home-bg" data-v-4c2b633a></span><span class="away-bg" data-v-4c2b633a></span></div>`);
      if (((_bb = (_ab = matchLiveDetail.value) == null ? void 0 : _ab.match) == null ? void 0 : _bb.home_scores[6]) != 0 || ((_db = (_cb = matchLiveDetail.value) == null ? void 0 : _cb.match) == null ? void 0 : _db.away_scores[6]) != 0) {
        _push(`<div class="team-table-other ky" data-v-4c2b633a><div class="ky_tit" data-v-4c2b633a><div class="row text-center" data-v-4c2b633a><div class="col-5 text-end" data-v-4c2b633a><span class="t15" data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate((_fb = (_eb = matchLiveDetail.value) == null ? void 0 : _eb.match) == null ? void 0 : _fb.home_scores[6])}</b></span></div><div class="col-2" data-v-4c2b633a><span class="min" data-v-4c2b633a>${ssrInterpolate(unref($t)("Penalty"))}</span></div><div class="col-5 text-start" data-v-4c2b633a><span class="t15 blue" data-v-4c2b633a>${ssrInterpolate((_hb = (_gb = matchLiveDetail.value) == null ? void 0 : _gb.match) == null ? void 0 : _hb.away_scores[6])}</span></div></div></div><!--[-->`);
        ssrRenderList(matchLiveDetailIncidents.value, (incident, index) => {
          var _a3, _b3;
          _push(`<!--[-->`);
          if ([29, 30].includes(
            incident == null ? void 0 : incident.type
          )) {
            _push(`<div class="ky_list" data-v-4c2b633a><div class="row" data-v-4c2b633a><div class="col-5 text-end home" data-v-4c2b633a>${(_a3 = ("getIncidents" in _ctx ? _ctx.getIncidents : unref(getIncidents))(incident, 1)) != null ? _a3 : ""}</div><div class="col-2 text-center align-self-center" data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate((incident == null ? void 0 : incident.home_score) || 0)} - ${ssrInterpolate((incident == null ? void 0 : incident.away_score) || 0)}</b></div><div class="col-5 text-start away" data-v-4c2b633a>${(_b3 = ("getIncidentsRight" in _ctx ? _ctx.getIncidentsRight : unref(getIncidentsRight))(incident, 2)) != null ? _b3 : ""}</div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="team-table-other ky" data-v-4c2b633a><div class="ky_tit" data-v-4c2b633a><div class="row text-center" data-v-4c2b633a><div class="col-5 text-end" data-v-4c2b633a><span class="t15" data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate((_jb = (_ib = matchLiveDetail.value) == null ? void 0 : _ib.match) == null ? void 0 : _jb.home_scores[0])}</b></span></div><div class="col-2" data-v-4c2b633a><span class="min" data-v-4c2b633a>${ssrInterpolate(unref($t)("Minute"))}</span></div><div class="col-5 text-start" data-v-4c2b633a><span class="t15 blue" data-v-4c2b633a>${ssrInterpolate((_lb = (_kb = matchLiveDetail.value) == null ? void 0 : _kb.match) == null ? void 0 : _lb.away_scores[0])}</span></div></div></div><!--[-->`);
      ssrRenderList(matchLiveDetailIncidents.value, (incident, index) => {
        var _a3, _b3;
        _push(`<!--[-->`);
        if ([1, 2, 3, 4, 5, 8, 9, 15, 16, 17, 28].includes(
          incident == null ? void 0 : incident.type
        )) {
          _push(`<div class="ky_list" data-v-4c2b633a><div class="row" data-v-4c2b633a><div class="col-5 text-end home" data-v-4c2b633a>${(_a3 = ("getIncidents" in _ctx ? _ctx.getIncidents : unref(getIncidents))(incident, 1)) != null ? _a3 : ""}</div><div class="col-2 text-center align-self-center" data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate(incident == null ? void 0 : incident.time)}&#39;</b></div><div class="col-5 text-start away" data-v-4c2b633a>${(_b3 = ("getIncidentsRight" in _ctx ? _ctx.getIncidentsRight : unref(getIncidentsRight))(incident, 2)) != null ? _b3 : ""}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_component_PlayerStatsticsTableDetail, null, null, _parent));
      _push(`<div id="teamTechDiv_detail" class="content" data-v-4c2b633a><div data-v-4c2b633a><h2 class="team-table-title" data-v-4c2b633a>${ssrInterpolate(unref($t)("Technical statistics"))}</h2><div class="team-bg-h1" data-v-4c2b633a><span class="home-bg" data-v-4c2b633a></span><span class="away-bg" data-v-4c2b633a></span></div><div class="fx20" data-v-4c2b633a><ul class="stat" data-v-4c2b633a><!--[-->`);
      ssrRenderList((_mb = matchLiveDetail.value) == null ? void 0 : _mb.stats, (stat, index) => {
        _push(`<li data-v-4c2b633a><span class="stat-c" data-v-4c2b633a>${ssrInterpolate(stat == null ? void 0 : stat.home)} %</span><span class="${ssrRenderClass(["stat-bar-wrapper homes", { hollow: (stat == null ? void 0 : stat.home) === 0 && (stat == null ? void 0 : stat.away) === 0 }])}" data-v-4c2b633a><span class="stat-bar fr" style="${ssrRenderStyle(
          "width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.home) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%"
        )}" data-v-4c2b633a></span></span><span class="stat-title" data-v-4c2b633a>${ssrInterpolate(unref($t)(("getStats" in _ctx ? _ctx.getStats : unref(getStats))(stat == null ? void 0 : stat.type)))}</span><span class="${ssrRenderClass(["stat-bar-wrapper aways", { hollow: (stat == null ? void 0 : stat.home) === 0 && (stat == null ? void 0 : stat.away) === 0 }])}" data-v-4c2b633a><span class="stat-bar fl" style="${ssrRenderStyle(
          "width: " + ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away) > 0 ? (stat == null ? void 0 : stat.away) * 100 / ((stat == null ? void 0 : stat.home) + (stat == null ? void 0 : stat.away)) : 0) + "%"
        )}" data-v-4c2b633a></span></span><span class="stat-c two" data-v-4c2b633a>${ssrInterpolate(stat == null ? void 0 : stat.away)} %</span></li>`);
      });
      _push(`<!--]--></ul></div></div></div><div class="content" data-v-4c2b633a><div data-v-4c2b633a><h2 class="team-table-title" data-v-4c2b633a>${ssrInterpolate(unref($t)("Team data"))}</h2><div class="team-h1" data-v-4c2b633a><span class="home-bg" data-v-4c2b633a></span><span class="away-bg" data-v-4c2b633a></span></div><table id="team-statistics" class="team-table-other text-center" width="100%" cellpadding="0" cellspacing="0" data-v-4c2b633a><tr data-v-4c2b633a><th data-v-4c2b633a>${ssrInterpolate(unref($t)("Home"))}</th><th data-v-4c2b633a>${ssrInterpolate(unref($t)("Recent 3"))}</th><th data-v-4c2b633a>${ssrInterpolate(unref($t)("Away"))}</th><th data-v-4c2b633a>${ssrInterpolate(unref($t)("Home"))}</th><th data-v-4c2b633a>${ssrInterpolate(unref($t)("Recent 10"))}</th><th data-v-4c2b633a>${ssrInterpolate(unref($t)("Away"))}</th></tr><tr data-v-4c2b633a><td class="${ssrRenderClass(
        ((_ob = (_nb = stateComparison.value) == null ? void 0 : _nb[0]) == null ? void 0 : _ob[42]) > ((_qb = (_pb = stateComparison.value) == null ? void 0 : _pb[0]) == null ? void 0 : _qb[43]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_sb = (_rb = stateComparison.value) == null ? void 0 : _rb[0]) == null ? void 0 : _sb[42])}</td><td data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate(unref($t)("Goal"))}</b></td><td class="${ssrRenderClass(
        ((_ub = (_tb = stateComparison.value) == null ? void 0 : _tb[0]) == null ? void 0 : _ub[43]) > ((_wb = (_vb = stateComparison.value) == null ? void 0 : _vb[0]) == null ? void 0 : _wb[42]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_yb = (_xb = stateComparison.value) == null ? void 0 : _xb[0]) == null ? void 0 : _yb[43])}</td><td class="${ssrRenderClass(
        ((_Ab = (_zb = stateComparison.value) == null ? void 0 : _zb[1]) == null ? void 0 : _Ab[42]) > ((_Cb = (_Bb = stateComparison.value) == null ? void 0 : _Bb[1]) == null ? void 0 : _Cb[43]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_Eb = (_Db = stateComparison.value) == null ? void 0 : _Db[1]) == null ? void 0 : _Eb[42])}</td><td data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate(unref($t)("Goal"))}</b></td><td class="${ssrRenderClass(
        ((_Gb = (_Fb = stateComparison.value) == null ? void 0 : _Fb[1]) == null ? void 0 : _Gb[43]) > ((_Ib = (_Hb = stateComparison.value) == null ? void 0 : _Hb[1]) == null ? void 0 : _Ib[42]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_Kb = (_Jb = stateComparison.value) == null ? void 0 : _Jb[1]) == null ? void 0 : _Kb[43])}</td></tr><tr data-v-4c2b633a><td class="${ssrRenderClass(
        ((_Mb = (_Lb = stateComparison.value) == null ? void 0 : _Lb[0]) == null ? void 0 : _Mb[36]) > ((_Ob = (_Nb = stateComparison.value) == null ? void 0 : _Nb[0]) == null ? void 0 : _Ob[37]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_Qb = (_Pb = stateComparison.value) == null ? void 0 : _Pb[0]) == null ? void 0 : _Qb[36])}</td><td data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate(unref($t)("Conceded"))}</b></td><td class="${ssrRenderClass(
        ((_Sb = (_Rb = stateComparison.value) == null ? void 0 : _Rb[0]) == null ? void 0 : _Sb[37]) > ((_Ub = (_Tb = stateComparison.value) == null ? void 0 : _Tb[0]) == null ? void 0 : _Ub[36]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_Wb = (_Vb = stateComparison.value) == null ? void 0 : _Vb[0]) == null ? void 0 : _Wb[37])}</td><td class="${ssrRenderClass(
        ((_Yb = (_Xb = stateComparison.value) == null ? void 0 : _Xb[1]) == null ? void 0 : _Yb[36]) > ((__b = (_Zb = stateComparison.value) == null ? void 0 : _Zb[1]) == null ? void 0 : __b[37]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_ac = (_$b = stateComparison.value) == null ? void 0 : _$b[1]) == null ? void 0 : _ac[36])}</td><td data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate(unref($t)("Conceded"))}</b></td><td class="${ssrRenderClass(
        ((_cc = (_bc = stateComparison.value) == null ? void 0 : _bc[1]) == null ? void 0 : _cc[37]) > ((_ec = (_dc = stateComparison.value) == null ? void 0 : _dc[1]) == null ? void 0 : _ec[36]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_gc = (_fc = stateComparison.value) == null ? void 0 : _fc[1]) == null ? void 0 : _gc[37])}</td></tr><tr data-v-4c2b633a><td class="${ssrRenderClass(
        ((_ic = (_hc = stateComparison.value) == null ? void 0 : _hc[0]) == null ? void 0 : _ic[38]) > ((_kc = (_jc = stateComparison.value) == null ? void 0 : _jc[0]) == null ? void 0 : _kc[39]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_mc = (_lc = stateComparison.value) == null ? void 0 : _lc[0]) == null ? void 0 : _mc[38])}</td><td data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate(unref($t)("Corner"))}</b></td><td class="${ssrRenderClass(
        ((_oc = (_nc = stateComparison.value) == null ? void 0 : _nc[0]) == null ? void 0 : _oc[39]) > ((_qc = (_pc = stateComparison.value) == null ? void 0 : _pc[0]) == null ? void 0 : _qc[38]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_sc = (_rc = stateComparison.value) == null ? void 0 : _rc[0]) == null ? void 0 : _sc[39])}</td><td class="${ssrRenderClass(
        ((_uc = (_tc = stateComparison.value) == null ? void 0 : _tc[1]) == null ? void 0 : _uc[38]) > ((_wc = (_vc = stateComparison.value) == null ? void 0 : _vc[1]) == null ? void 0 : _wc[39]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_yc = (_xc = stateComparison.value) == null ? void 0 : _xc[1]) == null ? void 0 : _yc[38])}</td><td data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate(unref($t)("Corner"))}</b></td><td class="${ssrRenderClass(
        ((_Ac = (_zc = stateComparison.value) == null ? void 0 : _zc[1]) == null ? void 0 : _Ac[39]) > ((_Cc = (_Bc = stateComparison.value) == null ? void 0 : _Bc[1]) == null ? void 0 : _Cc[38]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_Ec = (_Dc = stateComparison.value) == null ? void 0 : _Dc[1]) == null ? void 0 : _Ec[39])}</td></tr><tr data-v-4c2b633a><td class="${ssrRenderClass(
        ((_Gc = (_Fc = stateComparison.value) == null ? void 0 : _Fc[0]) == null ? void 0 : _Gc[40]) > ((_Ic = (_Hc = stateComparison.value) == null ? void 0 : _Hc[0]) == null ? void 0 : _Ic[41]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_Kc = (_Jc = stateComparison.value) == null ? void 0 : _Jc[0]) == null ? void 0 : _Kc[40])}</td><td data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate(unref($t)("Red card"))}</b></td><td class="${ssrRenderClass(
        ((_Mc = (_Lc = stateComparison.value) == null ? void 0 : _Lc[0]) == null ? void 0 : _Mc[41]) > ((_Oc = (_Nc = stateComparison.value) == null ? void 0 : _Nc[0]) == null ? void 0 : _Oc[40]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_Qc = (_Pc = stateComparison.value) == null ? void 0 : _Pc[0]) == null ? void 0 : _Qc[41])}</td><td class="${ssrRenderClass(
        ((_Sc = (_Rc = stateComparison.value) == null ? void 0 : _Rc[1]) == null ? void 0 : _Sc[40]) > ((_Uc = (_Tc = stateComparison.value) == null ? void 0 : _Tc[1]) == null ? void 0 : _Uc[41]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_Wc = (_Vc = stateComparison.value) == null ? void 0 : _Vc[1]) == null ? void 0 : _Wc[40])}</td><td data-v-4c2b633a><b data-v-4c2b633a>${ssrInterpolate(unref($t)("Red card"))}</b></td><td class="${ssrRenderClass(
        ((_Yc = (_Xc = stateComparison.value) == null ? void 0 : _Xc[1]) == null ? void 0 : _Yc[41]) > ((__c = (_Zc = stateComparison.value) == null ? void 0 : _Zc[1]) == null ? void 0 : __c[40]) ? "red" : ""
      )}" data-v-4c2b633a>${ssrInterpolate((_ad = (_$c = stateComparison.value) == null ? void 0 : _$c[1]) == null ? void 0 : _ad[41])}</td></tr></table></div></div><div class="fx20 posediv content" style="${ssrRenderStyle({ "margin-top": "20px" })}" data-v-4c2b633a><div class="fx-title row" data-v-4c2b633a><span class="fx-title-name col-4 text-start team-table-xq-home" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(homeTeamName.value)}</span></span><span class="fx-title-vs col-4 text-center" data-v-4c2b633a>${ssrInterpolate(unref($t)("Goal scoring rate"))}</span><span class="fx-title-name col-4 text-end team-table-xq-away" data-v-4c2b633a><span data-v-4c2b633a>${ssrInterpolate(awayTeamName.value)}</span></span></div><div class="team-bg-h1" data-v-4c2b633a><span class="home-bg" data-v-4c2b633a></span><span class="away-bg" data-v-4c2b633a></span></div><div class="fx-tab2" data-v-4c2b633a><span data-v-4c2b633a><div id="lastMatchBtn1" class="${ssrRenderClass([{
        "fx-tab2-on": activeSectionTable.value === "ThirtyrateOfScored"
      }, "lastMatchBtn"])}" data-v-4c2b633a>${ssrInterpolate(unref($t)("Recent 20"))}</div></span></div><div class="fx-tab row" data-v-4c2b633a><div class="coredBtn col-12" data-v-4c2b633a><div id="hScoredBtn1" class="fx-tab-on" data-v-4c2b633a>${ssrInterpolate(unref($t)("Goal"))}</div></div></div>`);
      if (activeSectionTable.value === "ThirtyrateOfScored") {
        _push(`<div id="rateOfScored1" class="rateOfScored ThirtyrateOfScored row" data-v-4c2b633a><!--[-->`);
        ssrRenderList((_cd = (_bd = matchesAnalysis.value) == null ? void 0 : _bd.home_shoot_time) == null ? void 0 : _cd[0], (value, index) => {
          var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2;
          _push(`<div class="fx-comparision missComp col-12 col-md-6" data-v-4c2b633a><ul class="fx-data-left" data-v-4c2b633a><li class="hScoredLi hScoredLi2" data-v-4c2b633a><span class="fx-c-l home-bg" style="${ssrRenderStyle(
            "width:" + (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(value) * 100 / ((_a3 = shootTime.value) == null ? void 0 : _a3["sumHome"])).toFixed(0) + "%"
          )}" data-v-4c2b633a></span><span class="fx-c2" data-v-4c2b633a>${ssrInterpolate(((_b3 = shootTime.value) == null ? void 0 : _b3["sumHome"]) > 0 ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(value) * 100 / ((_c2 = shootTime.value) == null ? void 0 : _c2["sumHome"])).toFixed(0) : "")}</span></li></ul>`);
          if (index === 4) {
            _push(`<span class="fx-c-3" data-v-4c2b633a><span data-v-4c2b633a>41~45</span></span>`);
          } else if (index === 5) {
            _push(`<span class="fx-c-3" data-v-4c2b633a><span data-v-4c2b633a>46~50</span></span>`);
          } else {
            _push(`<span class="fx-c-3" data-v-4c2b633a>`);
            if (index < 4) {
              _push(`<span data-v-4c2b633a>${ssrInterpolate(10 * index + 1)}~${ssrInterpolate(10 * (index + 1))}</span>`);
            } else {
              _push(`<span data-v-4c2b633a>${ssrInterpolate(10 * (index - 1) + 1)}~${ssrInterpolate(10 * index)}</span>`);
            }
            _push(`</span>`);
          }
          _push(`<ul class="fx-data-right" data-v-4c2b633a><li class="gScoredLi gScoredLi2" data-v-4c2b633a><span class="fx-c-r away-bg" style="${ssrRenderStyle(
            "width:" + (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(
              (_f2 = (_e2 = (_d2 = matchesAnalysis.value) == null ? void 0 : _d2.away_shoot_time) == null ? void 0 : _e2[0]) == null ? void 0 : _f2[index]
            ) * 100 / ((_g2 = shootTime.value) == null ? void 0 : _g2["sumAway"])).toFixed(0) + "%"
          )}" data-v-4c2b633a></span><span class="fx-c2" data-v-4c2b633a>${ssrInterpolate(((_h2 = shootTime.value) == null ? void 0 : _h2["sumAway"]) > 0 ? ((_k2 = (_j2 = (_i2 = matchesAnalysis.value) == null ? void 0 : _i2.away_shoot_time) == null ? void 0 : _j2[0]) == null ? void 0 : _k2[index]) ? (("parseFloatO" in _ctx ? _ctx.parseFloatO : unref(parseFloatO))(
            (_n2 = (_m2 = (_l2 = matchesAnalysis.value) == null ? void 0 : _l2.away_shoot_time) == null ? void 0 : _m2[0]) == null ? void 0 : _n2[index]
          ) * 100 / ((_o2 = shootTime.value) == null ? void 0 : _o2["sumAway"])).toFixed(0) : "" : "")}</span></li></ul></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle({ "clear": "both" })}" data-v-4c2b633a></div></div></div></div><div id="content-page" class="mt-5" data-v-4c2b633a>`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title" data-v-4c2b633a>${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/match/[match_id].vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const Live = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-4c2b633a"]]);
const currencyFormatter = (value) => {
  if (!value || typeof value === "undefined")
    return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR"
  }).format(value);
};
const _imports_0$1 = publicAssetsURL("/img/fx.svg");
const _imports_1$1 = publicAssetsURL("/img/order.png");
const WIN_F = 66;
const DRAW_F = 21;
const LOSE_F = 38;
const GOOD_F = 6;
const BAD_F = 1;
const breakpoint = 768;
const wrapperClass = "tr-wrapper";
const productSelectorClass = "columodds-selector";
const activeClass = "active";
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "h2h-[match_id]",
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
    const { $isMobile } = useNuxtApp();
    systemsStore();
    const { useLocale, $t, $trouter } = useShareCommon();
    const emit = __emit;
    socketStore();
    const matchStore = useMatchStore();
    const route = useRoute();
    const eventSocketData = ref();
    const matchIdSlug = ref(((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.id) || "");
    const matchesAnalysis = ref([]);
    const matchLiveDetail = ref([]);
    const showSettings = ref(false);
    const settingsData = useCookie("settingsData");
    const timeZone = ref(((_b = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _b.timeZone) || "");
    const cb_sos1 = ref(false);
    const cb_sos2 = ref(false);
    const cb_sos3 = ref(false);
    const selectMatchCount1 = ref(10);
    const selectMatchCount2 = ref(10);
    const selectMatchCount3 = ref(10);
    const com_s = ref(10);
    ref(0);
    const checkboxleague1 = ref(false);
    const checkboxleague2 = ref(false);
    const checkboxleague3 = ref(false);
    ref(false);
    const winF = ref(WIN_F);
    const drawF = ref(DRAW_F);
    const loseF = ref(LOSE_F);
    const voteBtn = ref();
    const surveyGood = ref(GOOD_F);
    const surveyBad = ref(BAD_F);
    const h2hComparison = ref([]);
    const stateComparison = ref([]);
    ref([]);
    const homeValue = ref();
    const awayValue = ref();
    const homeTotalComparisonChar = ref();
    const awayTotalComparisonChar = ref();
    const standingsTable = ref([]);
    const matchsLineup = ref([]);
    const matchsLastLineup = ref([]);
    const matchsLineupInjuryHome = ref([]);
    const matchsLineupInjuryAway = ref([]);
    const matchRecentResult = ref([]);
    const oddsList = ref([]);
    const oddCompanys = ref([]);
    const showSettingsCompany = ref(false);
    ref(13);
    ref(null);
    ref(null);
    ref(null);
    ref(true);
    ref();
    ref();
    ref(true);
    ref(true);
    ref(true);
    ref(true);
    ref("home");
    ref(true);
    ref(true);
    ref(true);
    const selectDataCompBar = ref(10);
    ref();
    ref(true);
    ref(true);
    ref(true);
    const selectedProduct = ref("columodds-1");
    const isMobileView = ref(false);
    const mobileContents = ref([]);
    const table = ref(null);
    ref(null);
    const detailHfSel = ref(1);
    const oddCompanySelected = ref(null);
    const matchTitle = useModel(__props, "matchTitle");
    const matchContent = useModel(__props, "matchContent");
    const initDataMatch = useModel(__props, "initDataMatch");
    ref(true);
    ref(false);
    reactive({
      odds1: false,
      odds2: false,
      odds3: false
    });
    const stateComparisonLast = ref([]);
    const H2H_LIST = ref([
      {
        id: 1,
        name: "Online Odds Comparison",
        short_name: "Live Odds",
        order: 1,
        show: true,
        div_id: "porletP0"
      },
      {
        id: 2,
        name: "Which side will win?",
        short_name: "Vote",
        order: 2,
        show: true,
        div_id: "porletP1"
      },
      {
        id: 3,
        name: "Strength Comparison",
        short_name: "Strength",
        order: 3,
        show: true,
        div_id: "porletP2"
      },
      {
        id: 4,
        name: "Ranking",
        short_name: "Ranking",
        order: 4,
        show: true,
        div_id: "porletP4"
      },
      {
        id: 5,
        name: "Head-to-head record",
        short_name: "VS",
        order: 5,
        show: true,
        div_id: "porletP5"
      },
      {
        id: 6,
        name: "Recent performance",
        short_name: "Score",
        order: 6,
        show: true,
        div_id: "porletP6"
      },
      {
        id: 7,
        name: "Compare data",
        short_name: "Compare",
        order: 7,
        show: true,
        div_id: "porletP8"
      },
      {
        id: 8,
        name: "Asian handicap statistics",
        short_name: "HDP",
        order: 8,
        show: true,
        div_id: "porletP9"
      },
      {
        id: 9,
        name: "Number of goals in H1&H2",
        short_name: "Goals",
        order: 9,
        show: true,
        div_id: "porletP10"
      },
      {
        id: 10,
        name: "HT/FT Details",
        short_name: "HT/FT",
        order: 10,
        show: true,
        div_id: "porletP11"
      },
      {
        id: 11,
        name: "Goal Time",
        short_name: "Hour",
        order: 11,
        show: true,
        div_id: "porletP13"
      },
      {
        id: 12,
        name: "Next 3 Matches",
        short_name: "LTD",
        order: 12,
        show: true,
        div_id: "porletP14"
      },
      {
        id: 13,
        name: "Injuries and Suspensions",
        short_name: "Injuries",
        order: 13,
        show: true,
        div_id: "porletP15"
      },
      {
        id: 14,
        name: "Recent lineup",
        short_name: "Lineup",
        order: 14,
        show: true,
        div_id: "porletP16"
      },
      {
        id: 15,
        name: "This season statistics",
        short_name: "Season",
        order: 15,
        show: true,
        div_id: "porletP17"
      }
    ]);
    const settingsH2hList = ref(useCookie("settingsH2hList").value ? useCookie("settingsH2hList").value : H2H_LIST);
    const settingVisible = (id) => {
      var _a2;
      settingsH2hList.value = (_a2 = settingsH2hList.value) == null ? void 0 : _a2.map((item) => {
        if ((item == null ? void 0 : item.id) === id) {
          item.show = !item.show;
        }
        return item;
      });
      useCookie("settingsH2hList").value = JSON.stringify(settingsH2hList.value);
    };
    const changePossitionSetting = (event) => {
      var _a2;
      settingsH2hList.value = (_a2 = settingsH2hList.value) == null ? void 0 : _a2.map((item, index) => {
        item.order = index;
        return item;
      });
      useCookie("settingsH2hList").value = JSON.stringify(settingsH2hList.value);
    };
    const oCompanySelected = ref(useCookie("oCompanySelected").value ? useCookie("oCompanySelected").value : COMPANYS_H2H_DEFAULT_LIST);
    const oCompList = ref([]);
    ODD_COMPANYS.forEach((item) => {
      oCompList.value[item == null ? void 0 : item.id] = oCompanySelected.value.includes(item == null ? void 0 : item.id) ? true : false;
    });
    echarts.use([TooltipComponent, RadarChart, CanvasRenderer]);
    ref(null);
    ({
      radar: {
        indicator: [
          { name: $t("Confrontation"), max: 100 },
          { name: $t("Value"), max: 100 },
          { name: $t("Defense"), max: 100 },
          { name: $t("Attack"), max: 100 },
          { name: $t("Perform"), max: 100 }
        ]
      },
      tooltip: {
        trigger: "item"
      }
    });
    const activeSectionTable = ref("h2h");
    const startTransition = ref(false);
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
          th.setAttribute("colspan", "5");
        });
        selectProduct(selectedProduct.value);
      }
    };
    const selectProduct = (product) => {
      if (!isMobileView.value)
        return;
      selectedProduct.value = product;
      if (!table.value)
        return;
      table.value.querySelectorAll("[data-product]").forEach((td) => {
        if (td.getAttribute("data-product") === product) {
          td.style.display = "table-cell";
        } else {
          td.style.display = "none";
        }
      });
      table.value.querySelectorAll("th[data-product]").forEach((th) => {
        th.classList.remove(activeClass);
      });
      table.value.querySelectorAll(`th[data-product="${product}"]`).forEach((th) => {
        th.classList.add(activeClass);
      });
    };
    watch(activeSectionTable, (newVal) => {
      if (["h2h", "state", "attack", "defence", "value", "others"].includes(newVal)) {
        startTransition.value = false;
        setTimeout(() => {
          startTransition.value = true;
        }, 50);
      }
    });
    if (activeSectionTable.value === "h2h") {
      setTimeout(() => {
        startTransition.value = true;
      }, 50);
    }
    ref("ah_odds");
    const fetchMatchesAnalysis = async (match_id) => {
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.MATCHES_ANALYSIS + "?match_id=" + match_id
      ).then((resData) => {
        var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D;
        if (resData) {
          matchesAnalysis.value = getDataObject((_a2 = resData == null ? void 0 : resData.results) == null ? void 0 : _a2[0]);
          h2hComparison.value = getH2hComparison((_b2 = matchesAnalysis.value) == null ? void 0 : _b2.head_to_head, (_e = (_d = (_c = matchLiveDetail.value) == null ? void 0 : _c.match) == null ? void 0 : _d.home_team) == null ? void 0 : _e.i_team, (_h = (_g = (_f = matchLiveDetail.value) == null ? void 0 : _f.match) == null ? void 0 : _g.away_team) == null ? void 0 : _h.i_team, (_j = (_i = matchLiveDetail.value) == null ? void 0 : _i.match) == null ? void 0 : _j.i_competition_id, $t);
          stateComparison.value = getStateComparison((_k = matchesAnalysis.value) == null ? void 0 : _k.home_last_matches, (_l = matchesAnalysis.value) == null ? void 0 : _l.away_last_matches, (_o = (_n = (_m = matchLiveDetail.value) == null ? void 0 : _m.match) == null ? void 0 : _n.home_team) == null ? void 0 : _o.i_team, (_r = (_q = (_p = matchLiveDetail.value) == null ? void 0 : _p.match) == null ? void 0 : _q.away_team) == null ? void 0 : _r.i_team, (_t = (_s = matchLiveDetail.value) == null ? void 0 : _s.match) == null ? void 0 : _t.i_competition_id, 10, $t);
          stateComparisonLast.value = getStateComparison((_u = matchesAnalysis.value) == null ? void 0 : _u.home_last_matches, (_v = matchesAnalysis.value) == null ? void 0 : _v.away_last_matches, (_y = (_x = (_w = matchLiveDetail.value) == null ? void 0 : _w.match) == null ? void 0 : _x.home_team) == null ? void 0 : _y.i_team, (_B = (_A = (_z = matchLiveDetail.value) == null ? void 0 : _z.match) == null ? void 0 : _A.away_team) == null ? void 0 : _B.i_team, (_D = (_C = matchLiveDetail.value) == null ? void 0 : _C.match) == null ? void 0 : _D.i_competition_id, 10, $t);
        }
      });
    };
    const fetchMatchsRecentDetail = async (matchIdSlug2) => {
      var _a2, _b2, _c;
      let resData = initDataMatch.value;
      matchLiveDetail.value.match = resData == null ? void 0 : resData[0];
      (_a2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a2.i_match_id;
      await fetchMatchesAnalysis(matchIdSlug2);
      await fetchSeasonsTable((_c = (_b2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _b2.stage) == null ? void 0 : _c.season_id);
      await fetchMatchRecentResult(resData == null ? void 0 : resData[0]);
    };
    const fetchSeasonsTable = async (competitionId) => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.SEASONS_TABLE + "/" + competitionId).then(async (resData) => {
        var _a3, _b3, _c2, _d2;
        var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
        standingsTable.value.home = (_a3 = (_c = (_b2 = (_a2 = resData == null ? void 0 : resData.tables) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.rows) == null ? void 0 : _c.find((item) => {
          var _a32, _b32, _c22;
          return item.team_id === ((_c22 = (_b32 = (_a32 = matchLiveDetail.value) == null ? void 0 : _a32.match) == null ? void 0 : _b32.home_team) == null ? void 0 : _c22.id);
        })) != null ? _a3 : [];
        standingsTable.value.away = (_b3 = (_f = (_e = (_d = resData == null ? void 0 : resData.tables) == null ? void 0 : _d[0]) == null ? void 0 : _e.rows) == null ? void 0 : _f.find((item) => {
          var _a32, _b32, _c22;
          return item.team_id === ((_c22 = (_b32 = (_a32 = matchLiveDetail.value) == null ? void 0 : _a32.match) == null ? void 0 : _b32.away_team) == null ? void 0 : _c22.id);
        })) != null ? _b3 : [];
        standingsTable.value.home.lastest = (_c2 = getStandingLastest((_g = matchesAnalysis.value) == null ? void 0 : _g.home_last_matches, 6, (_j = (_i = (_h = matchLiveDetail.value) == null ? void 0 : _h.match) == null ? void 0 : _i.home_team) == null ? void 0 : _j.i_team)) != null ? _c2 : [];
        standingsTable.value.away.lastest = (_d2 = getStandingLastest((_k = matchesAnalysis.value) == null ? void 0 : _k.away_last_matches, 6, (_n = (_m = (_l = matchLiveDetail.value) == null ? void 0 : _l.match) == null ? void 0 : _m.away_team) == null ? void 0 : _n.i_team)) != null ? _d2 : [];
      });
    };
    const fetchMatchsLineup = (matchIdSlug2) => {
      useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_LINEUP + "/" + matchIdSlug2).then(async (resData) => {
        var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        matchsLineup.value = resData;
        if (!matchsLineup.value || matchsLineup.value && ((_d = (_c = (_b2 = (_a2 = matchsLineup.value) == null ? void 0 : _a2.injury) == null ? void 0 : _b2.home) == null ? void 0 : _c.filter((item) => (item == null ? void 0 : item.type) === 1)) == null ? void 0 : _d.length) === 0 && ((_h = (_g = (_f = (_e = matchsLineup.value) == null ? void 0 : _e.injury) == null ? void 0 : _f.home) == null ? void 0 : _g.filter((item) => (item == null ? void 0 : item.type) === 2)) == null ? void 0 : _h.length) === 0 && ((_l = (_k = (_j = (_i = matchsLineup.value) == null ? void 0 : _i.injury) == null ? void 0 : _j.away) == null ? void 0 : _k.filter((item) => (item == null ? void 0 : item.type) === 1)) == null ? void 0 : _l.length) === 0 && ((_p = (_o = (_n = (_m = matchsLineup.value) == null ? void 0 : _m.injury) == null ? void 0 : _n.away) == null ? void 0 : _o.filter((item) => (item == null ? void 0 : item.type) === 2)) == null ? void 0 : _p.length) === 0) {
          (_q = settingsH2hList.value) == null ? void 0 : _q.map((item) => {
            if ((item == null ? void 0 : item.div_id) === "porletP15") {
              item.hidden_match = true;
            }
            return item;
          });
        }
        matchsLineupInjuryHome.value = (_t = (_s = (_r = matchsLineup.value) == null ? void 0 : _r.injury) == null ? void 0 : _s.home) == null ? void 0 : _t.filter((item) => (item == null ? void 0 : item.type) === 1);
        matchsLineupInjuryAway.value = (_w = (_v = (_u = matchsLineup.value) == null ? void 0 : _u.injury) == null ? void 0 : _v.away) == null ? void 0 : _w.filter((item) => (item == null ? void 0 : item.type) === 1);
      });
    };
    const fetchMatchsLastLineup = (matchIdSlug2) => {
      useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_LAST_LINEUP + "?match_id=" + matchIdSlug2).then(async (resData) => {
        var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L;
        matchsLastLineup.value = resData;
        if (((_a2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a2.home_team_id) === ((_d = (_c = (_b2 = matchLiveDetail.value) == null ? void 0 : _b2.match) == null ? void 0 : _c.home_team) == null ? void 0 : _d.id)) {
          matchsLastLineup.value.home = (_e = resData == null ? void 0 : resData[0]) == null ? void 0 : _e.home_lineup;
          if (((_f = resData == null ? void 0 : resData[0]) == null ? void 0 : _f.away_team_id) === ((_i = (_h = (_g = matchLiveDetail.value) == null ? void 0 : _g.match) == null ? void 0 : _h.away_team) == null ? void 0 : _i.id)) {
            matchsLastLineup.value.away = (_j = resData == null ? void 0 : resData[0]) == null ? void 0 : _j.away_lineup;
          }
        } else if (((_k = resData == null ? void 0 : resData[0]) == null ? void 0 : _k.away_team_id) === ((_n = (_m = (_l = matchLiveDetail.value) == null ? void 0 : _l.match) == null ? void 0 : _m.home_team) == null ? void 0 : _n.id)) {
          matchsLastLineup.value.home = (_o = resData == null ? void 0 : resData[0]) == null ? void 0 : _o.away_lineup;
          if (((_p = resData == null ? void 0 : resData[0]) == null ? void 0 : _p.home_team_id) === ((_s = (_r = (_q = matchLiveDetail.value) == null ? void 0 : _q.match) == null ? void 0 : _r.away_team) == null ? void 0 : _s.id)) {
            matchsLastLineup.value.away = (_t = resData == null ? void 0 : resData[0]) == null ? void 0 : _t.home_lineup;
          }
        }
        if (!matchsLastLineup.value || ((_u = matchsLastLineup.value) == null ? void 0 : _u.length) === 0 || matchsLastLineup.value && ((_y = (_x = (_w = (_v = matchsLastLineup.value) == null ? void 0 : _v.home) == null ? void 0 : _w.lineup) == null ? void 0 : _x.filter((item) => (item == null ? void 0 : item.first) === 1)) == null ? void 0 : _y.length) === 0 && ((_C = (_B = (_A = (_z = matchsLastLineup.value) == null ? void 0 : _z.home) == null ? void 0 : _A.lineup) == null ? void 0 : _B.filter((item) => (item == null ? void 0 : item.first) === 0)) == null ? void 0 : _C.length) === 0 && ((_G = (_F = (_E = (_D = matchsLastLineup.value) == null ? void 0 : _D.away) == null ? void 0 : _E.lineup) == null ? void 0 : _F.filter((item) => (item == null ? void 0 : item.first) === 1)) == null ? void 0 : _G.length) === 0 && ((_K = (_J = (_I = (_H = matchsLastLineup.value) == null ? void 0 : _H.away) == null ? void 0 : _I.lineup) == null ? void 0 : _J.filter((item) => (item == null ? void 0 : item.first) === 0)) == null ? void 0 : _K.length) === 0) {
          (_L = settingsH2hList.value) == null ? void 0 : _L.map((item) => {
            if ((item == null ? void 0 : item.div_id) === "porletP16") {
              item.hidden_match = true;
            }
            return item;
          });
        }
      });
    };
    const fetchMatchRecentResult = async (match) => {
      var _a2, _b2;
      if (!((_a2 = match == null ? void 0 : match.stage) == null ? void 0 : _a2.season_id))
        return;
      await useApiLiveScore(API_ROUTERS.LIVESCORE.MATCH_RECENT_RESULT, {
        season_id: (_b2 = match == null ? void 0 : match.stage) == null ? void 0 : _b2.season_id
      }).then((resData) => {
        var _a3, _b3, _c;
        if (resData) {
          const data = (_a3 = resData == null ? void 0 : resData.results) == null ? void 0 : _a3.filter((match2) => (match2 == null ? void 0 : match2.status) === "8");
          const matchsListArray = [];
          Object.values(data).map((item) => {
            matchsListArray.push(item);
          });
          const homeRecent = matchsListArray == null ? void 0 : matchsListArray.filter((item) => {
            var _a4, _b4;
            return (item == null ? void 0 : item.home_team_id) === ((_a4 = match == null ? void 0 : match.home_team) == null ? void 0 : _a4.id) || (item == null ? void 0 : item.away_team_id) === ((_b4 = match == null ? void 0 : match.home_team) == null ? void 0 : _b4.id);
          });
          const awayRecent = matchsListArray == null ? void 0 : matchsListArray.filter((item) => {
            var _a4, _b4;
            return (item == null ? void 0 : item.home_team_id) === ((_a4 = match == null ? void 0 : match.away_team) == null ? void 0 : _a4.id) || (item == null ? void 0 : item.away_team_id) === ((_b4 = match == null ? void 0 : match.away_team) == null ? void 0 : _b4.id);
          });
          matchRecentResult.value.home = getRecentResultStat(homeRecent, (_b3 = match == null ? void 0 : match.home_team) == null ? void 0 : _b3.id);
          matchRecentResult.value.away = getRecentResultStat(awayRecent, (_c = match == null ? void 0 : match.away_team) == null ? void 0 : _c.id);
        }
      });
    };
    const fetchOdds = (matchIdSlug2) => {
      useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL + "?match_id=" + matchIdSlug2).then(async (resData) => {
        var _a2;
        oddsList.value = getDataObjectByList(resData);
        const oddCompanysList = [];
        (_a2 = ODD_COMPANYS) == null ? void 0 : _a2.forEach((item) => {
          var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
          oddCompanysList[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList[item == null ? void 0 : item.isportsapi].handicap = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first = (_b2 = (_a3 = oddsList.value) == null ? void 0 : _a3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "handicap")) == null ? void 0 : _b2.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live = (_d = (_c = oddsList.value) == null ? void 0 : _c.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "handicap")) == null ? void 0 : _d.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run = (_f = (_e = oddsList.value) == null ? void 0 : _e.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "handicap")) == null ? void 0 : _f.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].europeOdds = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first = (_h = (_g = oddsList.value) == null ? void 0 : _g.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "europeOdds")) == null ? void 0 : _h.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live = (_j = (_i = oddsList.value) == null ? void 0 : _i.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "europeOdds")) == null ? void 0 : _j.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run = (_l = (_k = oddsList.value) == null ? void 0 : _k.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "europeOdds")) == null ? void 0 : _l.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].overUnder = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first = (_n = (_m = oddsList.value) == null ? void 0 : _m.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "overUnder")) == null ? void 0 : _n.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live = (_p = (_o = oddsList.value) == null ? void 0 : _o.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "overUnder")) == null ? void 0 : _p.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run = (_r = (_q = oddsList.value) == null ? void 0 : _q.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "overUnder")) == null ? void 0 : _r.inplay;
          if (typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run === "undefined") {
            oddCompanysList[item == null ? void 0 : item.isportsapi].isEmpty = true;
          }
        });
        oddCompanys.value = oddCompanysList;
      });
    };
    watch(
      () => route.path,
      (newPath) => {
        var _a2;
        matchIdSlug.value = ((_a2 = route == null ? void 0 : route.params) == null ? void 0 : _a2.id) || "";
      },
      { immediate: true }
    );
    watch(
      cb_sos1,
      () => {
        var _a2, _b2;
        if (cb_sos1.value) {
          selectMatchCount1.value = (_b2 = (_a2 = matchesAnalysis.value.home_last_matches) == null ? void 0 : _a2.filter((item) => {
            var _a3, _b3, _c;
            return ((_c = (_b3 = (_a3 = matchLiveDetail.value) == null ? void 0 : _a3.match) == null ? void 0 : _b3.home_team) == null ? void 0 : _c.i_team) == (item == null ? void 0 : item[5]);
          })) == null ? void 0 : _b2.length;
        } else {
          selectMatchCount1.value = 10;
        }
      },
      { immediate: true }
    );
    watch(
      cb_sos3,
      () => {
        var _a2, _b2;
        if (cb_sos3.value) {
          selectMatchCount3.value = (_b2 = (_a2 = matchesAnalysis.value.head_to_head) == null ? void 0 : _a2.filter((item) => {
            var _a3, _b3, _c;
            return ((_c = (_b3 = (_a3 = matchLiveDetail.value) == null ? void 0 : _a3.match) == null ? void 0 : _b3.home_team) == null ? void 0 : _c.i_team) == (item == null ? void 0 : item[5]);
          })) == null ? void 0 : _b2.length;
        } else {
          selectMatchCount3.value = 10;
        }
      },
      { immediate: true }
    );
    watch(
      cb_sos2,
      () => {
        var _a2, _b2;
        if (cb_sos2.value) {
          selectMatchCount2.value = (_b2 = (_a2 = matchesAnalysis.value.away_last_matches) == null ? void 0 : _a2.filter((item) => {
            var _a3, _b3, _c;
            return ((_c = (_b3 = (_a3 = matchLiveDetail.value) == null ? void 0 : _a3.match) == null ? void 0 : _b3.away_team) == null ? void 0 : _c.i_team) == (item == null ? void 0 : item[7]);
          })) == null ? void 0 : _b2.length;
        } else {
          selectMatchCount2.value = 10;
        }
      },
      { immediate: true }
    );
    watch(
      selectDataCompBar,
      () => {
        var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
        stateComparisonLast.value = getStateComparison((_a2 = matchesAnalysis.value) == null ? void 0 : _a2.home_last_matches, (_b2 = matchesAnalysis.value) == null ? void 0 : _b2.away_last_matches, (_e = (_d = (_c = matchLiveDetail.value) == null ? void 0 : _c.match) == null ? void 0 : _d.home_team) == null ? void 0 : _e.i_team, (_h = (_g = (_f = matchLiveDetail.value) == null ? void 0 : _f.match) == null ? void 0 : _g.away_team) == null ? void 0 : _h.i_team, (_j = (_i = matchLiveDetail.value) == null ? void 0 : _i.match) == null ? void 0 : _j.i_competition_id, selectDataCompBar.value, $t);
      },
      { immediate: true }
    );
    watch(
      com_s,
      () => {
        var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
        stateComparisonLast.value = getStateComparison((_a2 = matchesAnalysis.value) == null ? void 0 : _a2.home_last_matches, (_b2 = matchesAnalysis.value) == null ? void 0 : _b2.away_last_matches, (_e = (_d = (_c = matchLiveDetail.value) == null ? void 0 : _c.match) == null ? void 0 : _d.home_team) == null ? void 0 : _e.i_team, (_h = (_g = (_f = matchLiveDetail.value) == null ? void 0 : _f.match) == null ? void 0 : _g.away_team) == null ? void 0 : _h.i_team, (_j = (_i = matchLiveDetail.value) == null ? void 0 : _i.match) == null ? void 0 : _j.i_competition_id, com_s.value, $t);
      },
      { immediate: true }
    );
    const wssMatch = (socketData) => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
      if (socketData) {
        try {
          const wssItem = socketData;
          eventSocketData.value = wssItem;
          emit("socketData", wssItem);
          if (wssItem.topic == "thesports/football/match/v1") {
            const payloads = wssItem.payload;
            for (const payload of payloads) {
              const matchId = payload.id;
            }
          } else if (wssItem.payload.iodds) {
            const matchOdds = wssItem.payload.iodds;
            if (matchOdds == null ? void 0 : matchOdds.handicap) {
              for (const matchOdd of matchOdds.handicap) {
                const matchId = parseIntO(getValueByPosition(matchOdd, 0));
                const companyId = getValueByPosition(matchOdd, 1);
                if (matchId == ((_b2 = (_a2 = matchLiveDetail.value) == null ? void 0 : _a2.match) == null ? void 0 : _b2.i_match_id)) {
                  const oddCompany = (_c = oddCompanys.value) == null ? void 0 : _c.find((item) => (item == null ? void 0 : item.isportsapi) == companyId);
                  if (oddCompany) {
                    if (!((_d = oddCompany == null ? void 0 : oddCompany.handicap) == null ? void 0 : _d.run)) {
                      oddCompany.handicap = [];
                    }
                    if (((_f = (_e = matchLiveDetail.value) == null ? void 0 : _e.match) == null ? void 0 : _f.status) === "1") {
                      oddCompany.handicap.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    } else {
                      oddCompany.handicap.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    }
                  }
                }
              }
            }
            if (matchOdds == null ? void 0 : matchOdds.overUnder) {
              for (const matchOdd of matchOdds.overUnder) {
                const matchId = parseIntO(getValueByPosition(matchOdd, 0));
                const companyId = getValueByPosition(matchOdd, 1);
                if (matchId == ((_h = (_g = matchLiveDetail.value) == null ? void 0 : _g.match) == null ? void 0 : _h.i_match_id)) {
                  const oddCompany = (_i = oddCompanys.value) == null ? void 0 : _i.find((item) => (item == null ? void 0 : item.isportsapi) == companyId);
                  if (oddCompany) {
                    if (!((_j = oddCompany == null ? void 0 : oddCompany.overUnder) == null ? void 0 : _j.run)) {
                      oddCompany.overUnder = [];
                    }
                    if (((_l = (_k = matchLiveDetail.value) == null ? void 0 : _k.match) == null ? void 0 : _l.status) === "1") {
                      oddCompany.overUnder.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    } else {
                      oddCompany.overUnder.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    }
                  }
                }
              }
            }
            if (matchOdds == null ? void 0 : matchOdds.europeOdds) {
              for (const matchOdd of matchOdds.europeOdds) {
                const matchId = parseIntO(getValueByPosition(matchOdd, 0));
                const companyId = getValueByPosition(matchOdd, 1);
                if (matchId == ((_n = (_m = matchLiveDetail.value) == null ? void 0 : _m.match) == null ? void 0 : _n.i_match_id)) {
                  const oddCompany = (_o = oddCompanys.value) == null ? void 0 : _o.find((item) => (item == null ? void 0 : item.isportsapi) == companyId);
                  if (oddCompany) {
                    if (!((_p = oddCompany == null ? void 0 : oddCompany.europeOdds) == null ? void 0 : _p.run)) {
                      oddCompany.europeOdds = [];
                    }
                    if (((_r = (_q = matchLiveDetail.value) == null ? void 0 : _q.match) == null ? void 0 : _r.status) === "1") {
                      oddCompany.europeOdds.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    } else {
                      oddCompany.europeOdds.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    }
                  }
                }
              }
            }
          }
        } catch (e) {
          return false;
        }
      }
    };
    watch(
      matchStore,
      () => {
        wssMatch(matchStore == null ? void 0 : matchStore.socketData);
      },
      { deep: true, immediate: true }
    );
    watch([detailHfSel, oddCompanySelected], async () => {
      await nextTick();
      setTimeout(() => {
        updateColspan();
        selectProduct(selectedProduct.value);
      }, 300);
    });
    watch(isMobileView, () => {
      updateColspan();
    });
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecentDetail(matchIdSlug.value)), await __temp, __restore();
    fetchOdds(matchIdSlug.value);
    fetchMatchsLineup(matchIdSlug.value);
    fetchMatchsLastLineup(matchIdSlug.value);
    return (_ctx, _push, _parent, _attrs) => {
      var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2, _y2, _z2, _A2, _B2, _C2, _D2, _E2;
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb, _cb, _db, _eb, _fb, _gb, _hb, _ib, _jb, _kb, _lb, _mb, _nb, _ob, _pb, _qb, _rb, _sb, _tb, _ub, _vb, _wb, _xb, _yb, _zb, _Ab, _Bb, _Cb, _Db, _Eb, _Fb, _Gb, _Hb, _Ib, _Jb, _Kb, _Lb, _Mb, _Nb, _Ob, _Pb, _Qb, _Rb, _Sb, _Tb, _Ub, _Vb, _Wb, _Xb, _Yb, _Zb, __b, _$b, _ac, _bc, _cc, _dc, _ec, _fc, _gc, _hc, _ic, _jc, _kc, _lc, _mc, _nc, _oc, _pc, _qc, _rc, _sc, _tc, _uc, _vc, _wc, _xc, _yc, _zc, _Ac, _Bc, _Cc, _Dc, _Ec, _Fc, _Gc, _Hc, _Ic, _Jc, _Kc, _Lc, _Mc, _Nc, _Oc, _Pc, _Qc, _Rc, _Sc, _Tc, _Uc, _Vc, _Wc, _Xc, _Yc, _Zc, __c, _$c, _ad, _bd, _cd, _dd, _ed, _fd, _gd, _hd, _id, _jd, _kd, _ld, _md, _nd, _od, _pd, _qd, _rd, _sd, _td, _ud, _vd, _wd, _xd, _yd, _zd, _Ad, _Bd, _Cd, _Dd, _Ed, _Fd, _Gd, _Hd, _Id, _Jd, _Kd, _Ld, _Md, _Nd, _Od, _Pd, _Qd, _Rd, _Sd, _Td, _Ud, _Vd, _Wd, _Xd, _Yd, _Zd, __d, _$d, _ae, _be, _ce, _de, _ee, _fe, _ge, _he, _ie, _je, _ke, _le, _me, _ne, _oe, _pe, _qe, _re, _se, _te, _ue, _ve, _we, _xe, _ye, _ze, _Ae, _Be, _Ce, _De, _Ee, _Fe, _Ge, _He, _Ie, _Je, _Ke, _Le, _Me, _Ne, _Oe, _Pe, _Qe, _Re, _Se, _Te, _Ue, _Ve, _We, _Xe, _Ye, _Ze, __e, _$e, _af, _bf, _cf, _df, _ef, _ff, _gf, _hf, _if, _jf, _kf, _lf, _mf, _nf, _of, _pf, _qf, _rf, _sf, _tf, _uf, _vf, _wf, _xf, _yf, _zf, _Af, _Bf, _Cf, _Df, _Ef, _Ff, _Gf, _Hf, _If, _Jf, _Kf, _Lf, _Mf, _Nf, _Of, _Pf, _Qf, _Rf, _Sf, _Tf, _Uf, _Vf, _Wf, _Xf, _Yf, _Zf, __f, _$f, _ag, _bg, _cg, _dg, _eg, _fg, _gg, _hg, _ig, _jg, _kg, _lg, _mg, _ng, _og, _pg, _qg, _rg, _sg, _tg, _ug, _vg, _wg, _xg, _yg, _zg, _Ag, _Bg, _Cg, _Dg, _Eg, _Fg, _Gg, _Hg, _Ig, _Jg, _Kg, _Lg, _Mg, _Ng, _Og, _Pg, _Qg, _Rg, _Sg, _Tg, _Ug, _Vg, _Wg, _Xg, _Yg, _Zg, __g, _$g, _ah, _bh, _ch, _dh, _eh, _fh, _gh, _hh, _ih, _jh, _kh, _lh, _mh, _nh, _oh, _ph, _qh, _rh, _sh, _th, _uh, _vh, _wh, _xh, _yh, _zh, _Ah, _Bh, _Ch, _Dh, _Eh, _Fh, _Gh, _Hh, _Ih, _Jh, _Kh, _Lh, _Mh, _Nh, _Oh, _Ph, _Qh, _Rh, _Sh, _Th, _Uh, _Vh, _Wh, _Xh, _Yh, _Zh, __h, _$h, _ai, _bi, _ci, _di, _ei, _fi, _gi, _hi, _ii, _ji, _ki, _li, _mi, _ni, _oi, _pi, _qi, _ri, _si, _ti, _ui, _vi, _wi, _xi, _yi, _zi, _Ai, _Bi, _Ci, _Di, _Ei, _Fi, _Gi, _Hi, _Ii, _Ji, _Ki, _Li, _Mi, _Ni, _Oi, _Pi, _Qi, _Ri, _Si, _Ti, _Ui, _Vi, _Wi, _Xi, _Yi, _Zi, __i, _$i, _aj, _bj, _cj, _dj, _ej, _fj, _gj, _hj, _ij, _jj, _kj, _lj, _mj, _nj, _oj, _pj, _qj, _rj, _sj, _tj, _uj, _vj, _wj, _xj, _yj, _zj, _Aj, _Bj, _Cj, _Dj, _Ej, _Fj, _Gj, _Hj, _Ij, _Jj, _Kj, _Lj, _Mj, _Nj, _Oj, _Pj, _Qj, _Rj, _Sj, _Tj, _Uj, _Vj, _Wj, _Xj, _Yj, _Zj, __j, _$j, _ak, _bk, _ck, _dk, _ek, _fk, _gk, _hk, _ik, _jk, _kk, _lk, _mk, _nk, _ok, _pk, _qk, _rk, _sk, _tk, _uk, _vk, _wk, _xk, _yk, _zk, _Ak, _Bk, _Ck, _Dk, _Ek, _Fk, _Gk, _Hk, _Ik, _Jk, _Kk, _Lk, _Mk, _Nk, _Ok, _Pk, _Qk, _Rk, _Sk, _Tk, _Uk, _Vk, _Wk, _Xk, _Yk, _Zk, __k, _$k, _al, _bl, _cl, _dl, _el, _fl, _gl, _hl, _il, _jl, _kl, _ll, _ml, _nl, _ol, _pl, _ql, _rl, _sl, _tl, _ul, _vl, _wl, _xl, _yl, _zl, _Al, _Bl, _Cl, _Dl, _El, _Fl, _Gl, _Hl, _Il, _Jl, _Kl, _Ll, _Ml, _Nl, _Ol, _Pl, _Ql, _Rl, _Sl, _Tl, _Ul, _Vl, _Wl, _Xl, _Yl, _Zl, __l, _$l, _am, _bm, _cm, _dm, _em, _fm, _gm, _hm, _im, _jm, _km, _lm, _mm, _nm, _om, _pm, _qm, _rm, _sm, _tm, _um, _vm, _wm, _xm, _ym, _zm, _Am, _Bm, _Cm, _Dm, _Em, _Fm, _Gm, _Hm, _Im, _Jm, _Km, _Lm, _Mm, _Nm, _Om, _Pm, _Qm, _Rm, _Sm, _Tm, _Um, _Vm, _Wm, _Xm, _Ym, _Zm, __m, _$m, _an, _bn, _cn, _dn, _en, _fn, _gn, _hn, _in, _jn, _kn, _ln, _mn, _nn, _on, _pn, _qn, _rn, _sn, _tn, _un, _vn, _wn, _xn, _yn, _zn, _An, _Bn, _Cn, _Dn, _En, _Fn, _Gn, _Hn, _In, _Jn, _Kn, _Ln, _Mn, _Nn, _On, _Pn, _Qn, _Rn, _Sn, _Tn, _Un, _Vn, _Wn, _Xn, _Yn, _Zn, __n, _$n, _ao, _bo, _co, _do, _eo, _fo, _go, _ho, _io, _jo, _ko, _lo, _mo, _no, _oo, _po, _qo, _ro, _so, _to, _uo, _vo, _wo, _xo, _yo, _zo, _Ao, _Bo, _Co, _Do, _Eo, _Fo, _Go, _Ho, _Io, _Jo, _Ko, _Lo, _Mo, _No, _Oo, _Po, _Qo, _Ro, _So, _To, _Uo, _Vo, _Wo, _Xo, _Yo, _Zo, __o, _$o, _ap, _bp, _cp, _dp, _ep, _fp, _gp, _hp, _ip, _jp, _kp, _lp, _mp, _np, _op, _pp, _qp, _rp, _sp, _tp, _up, _vp, _wp, _xp, _yp, _zp, _Ap, _Bp, _Cp, _Dp, _Ep, _Fp, _Gp, _Hp, _Ip, _Jp, _Kp, _Lp, _Mp, _Np, _Op, _Pp, _Qp, _Rp, _Sp, _Tp, _Up, _Vp, _Wp, _Xp, _Yp, _Zp, __p, _$p, _aq, _bq, _cq, _dq, _eq, _fq, _gq, _hq, _iq, _jq, _kq, _lq, _mq, _nq, _oq, _pq, _qq, _rq, _sq, _tq, _uq, _vq, _wq, _xq, _yq, _zq, _Aq, _Bq, _Cq, _Dq, _Eq, _Fq, _Gq, _Hq, _Iq, _Jq, _Kq, _Lq, _Mq, _Nq, _Oq, _Pq, _Qq, _Rq, _Sq, _Tq, _Uq, _Vq, _Wq, _Xq, _Yq, _Zq, __q, _$q, _ar, _br, _cr, _dr, _er, _fr, _gr, _hr, _ir, _jr, _kr, _lr, _mr, _nr, _or, _pr, _qr, _rr, _sr, _tr, _ur, _vr, _wr, _xr, _yr, _zr, _Ar, _Br, _Cr, _Dr, _Er, _Fr, _Gr, _Hr, _Ir, _Jr, _Kr, _Lr, _Mr, _Nr, _Or, _Pr, _Qr, _Rr, _Sr, _Tr, _Ur, _Vr, _Wr, _Xr, _Yr, _Zr, __r, _$r, _as, _bs, _cs, _ds, _es, _fs, _gs, _hs, _is, _js, _ks, _ls, _ms, _ns, _os, _ps, _qs, _rs, _ss, _ts, _us, _vs, _ws, _xs, _ys, _zs, _As, _Bs, _Cs, _Ds, _Es, _Fs, _Gs, _Hs, _Is, _Js, _Ks, _Ls, _Ms, _Ns, _Os, _Ps, _Qs, _Rs, _Ss, _Ts, _Us, _Vs, _Ws, _Xs, _Ys, _Zs, __s, _$s, _at, _bt, _ct, _dt, _et, _ft, _gt, _ht, _it, _jt, _kt, _lt, _mt, _nt, _ot, _pt, _qt, _rt, _st, _tt, _ut, _vt, _wt, _xt, _yt, _zt, _At, _Bt, _Ct, _Dt, _Et, _Ft, _Gt, _Ht, _It, _Jt, _Kt, _Lt, _Mt, _Nt, _Ot, _Pt, _Qt, _Rt, _St, _Tt, _Ut, _Vt, _Wt, _Xt, _Yt, _Zt, __t, _$t, _au, _bu, _cu, _du, _eu, _fu, _gu, _hu, _iu, _ju, _ku, _lu, _mu, _nu, _ou, _pu, _qu, _ru, _su, _tu, _uu, _vu, _wu, _xu, _yu, _zu, _Au, _Bu, _Cu, _Du, _Eu, _Fu, _Gu, _Hu, _Iu, _Ju, _Ku, _Lu, _Mu, _Nu, _Ou, _Pu, _Qu, _Ru, _Su, _Tu, _Uu, _Vu, _Wu, _Xu, _Yu, _Zu, __u, _$u, _av, _bv, _cv, _dv, _ev, _fv, _gv, _hv, _iv, _jv, _kv, _lv, _mv, _nv, _ov, _pv, _qv, _rv, _sv, _tv, _uv, _vv, _wv, _xv, _yv, _zv, _Av, _Bv, _Cv, _Dv, _Ev, _Fv, _Gv, _Hv, _Iv, _Jv, _Kv, _Lv, _Mv, _Nv, _Ov, _Pv, _Qv, _Rv, _Sv, _Tv, _Uv, _Vv, _Wv, _Xv, _Yv, _Zv, __v, _$v, _aw, _bw, _cw, _dw, _ew, _fw, _gw, _hw, _iw, _jw, _kw, _lw, _mw, _nw, _ow, _pw, _qw, _rw, _sw, _tw, _uw, _vw, _ww, _xw, _yw, _zw, _Aw, _Bw, _Cw, _Dw, _Ew, _Fw, _Gw, _Hw, _Iw, _Jw, _Kw, _Lw, _Mw, _Nw, _Ow, _Pw, _Qw, _Rw, _Sw, _Tw, _Uw, _Vw, _Ww, _Xw, _Yw, _Zw, __w, _$w, _ax, _bx, _cx, _dx, _ex, _fx, _gx, _hx, _ix, _jx, _kx, _lx, _mx, _nx, _ox, _px, _qx, _rx, _sx, _tx, _ux, _vx, _wx, _xx, _yx, _zx, _Ax, _Bx, _Cx, _Dx, _Ex, _Fx, _Gx, _Hx, _Ix, _Jx, _Kx, _Lx, _Mx, _Nx, _Ox, _Px, _Qx, _Rx, _Sx, _Tx, _Ux, _Vx, _Wx, _Xx, _Yx, _Zx, __x, _$x, _ay, _by, _cy, _dy, _ey, _fy, _gy, _hy, _iy, _jy, _ky, _ly, _my, _ny, _oy, _py, _qy, _ry, _sy, _ty, _uy, _vy, _wy, _xy, _yy, _zy, _Ay, _By, _Cy, _Dy, _Ey, _Fy, _Gy, _Hy, _Iy, _Jy, _Ky, _Ly, _My, _Ny, _Oy, _Py, _Qy, _Ry, _Sy, _Ty, _Uy, _Vy, _Wy, _Xy, _Yy, _Zy, __y, _$y, _az, _bz, _cz, _dz, _ez, _fz, _gz, _hz, _iz, _jz, _kz, _lz, _mz, _nz, _oz, _pz, _qz, _rz, _sz, _tz, _uz, _vz, _wz, _xz, _yz, _zz, _Az, _Bz, _Cz, _Dz, _Ez, _Fz, _Gz, _Hz, _Iz, _Jz, _Kz, _Lz, _Mz, _Nz, _Oz, _Pz, _Qz, _Rz, _Sz, _Tz, _Uz, _Vz, _Wz, _Xz, _Yz, _Zz, __z, _$z, _aA, _bA, _cA, _dA, _eA, _fA, _gA, _hA, _iA, _jA, _kA, _lA, _mA, _nA, _oA, _pA, _qA, _rA, _sA, _tA, _uA, _vA, _wA;
      const _component_nuxt_link = __nuxt_component_0$3;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "",
        class: "match-analysis"
      }, _attrs))} data-v-340f6857><div id="analysis-main" data-v-340f6857><div class="innerPage" data-v-340f6857></div><div id="porletP_Group" data-v-340f6857><div class="porletP" id="porletP0" style="${ssrRenderStyle([
        ((_b2 = (_a2 = unref(settingsH2hList)) == null ? void 0 : _a2.find((item) => (item == null ? void 0 : item.div_id) === "porletP0")) == null ? void 0 : _b2.show) === true ? null : { display: "none" },
        "order: " + ((_d = (_c = unref(settingsH2hList)) == null ? void 0 : _c.find((item) => (item == null ? void 0 : item.div_id) === "porletP0")) == null ? void 0 : _d.order)
      ])}" data-v-340f6857><div id="liveCompareDiv" data-v-340f6857><h2 class="team-table-title" data-v-340f6857>${ssrInterpolate(unref($t)("Compare odds"))}</h2><div class="${ssrRenderClass([wrapperClass, "oddsAnalysis"])}" data-v-340f6857><div class="${ssrRenderClass(productSelectorClass)}" style="${ssrRenderStyle([
        unref(isMobileView) ? null : { display: "none" },
        { "display": "flex" }
      ])}" data-v-340f6857><!--[-->`);
      ssrRenderList(unref(mobileContents), (content, index) => {
        _push(`<span${ssrRenderAttr("data-product", "columodds-" + (index + 1))} class="${ssrRenderClass({ active: unref(selectedProduct) === "columodds-" + (index + 1) })}" data-v-340f6857><div data-v-340f6857>${ssrInterpolate(content)}</div></span>`);
      });
      _push(`<!--]--></div><table class="tr-table team-table-other oddsTable text-center" data-v-340f6857><thead data-v-340f6857>`);
      if (unref($isMobile)) {
        _push(`<tr data-v-340f6857><th style="${ssrRenderStyle({ "background": "white", "border": "none" })}" data-mobile-collapse colspan="2" data-v-340f6857></th><th style="${ssrRenderStyle({ "background": "white", "border": "none" })}"${ssrRenderAttr("data-mobile-content", unref($t)("Hadicap Odd"))} data-v-340f6857><b data-v-340f6857></b></th><th style="${ssrRenderStyle({ "background": "white", "border": "none" })}"${ssrRenderAttr("data-mobile-content", unref($t)("Over/Under Odd"))} data-featured data-v-340f6857><b data-v-340f6857></b></th><th style="${ssrRenderStyle({ "background": "white", "border": "none" })}"${ssrRenderAttr("data-mobile-content", unref($t)("European Odd"))} data-v-340f6857><b data-v-340f6857></b></th><th style="${ssrRenderStyle({ "background": "white", "border": "none" })}" data-mobile-collapse colspan="2" data-v-340f6857></th></tr>`);
      } else {
        _push(`<tr data-v-340f6857><th data-mobile-collapse colspan="2" data-v-340f6857></th><th${ssrRenderAttr("data-mobile-content", unref($t)("Hadicap Odd"))} data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Hadicap Odd"))}</b></th><th${ssrRenderAttr("data-mobile-content", unref($t)("Over/Under Odd"))} data-featured data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Over/Under Odd"))}</b></th><th${ssrRenderAttr("data-mobile-content", unref($t)("European Odd"))} data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("European Odd"))}</b></th><th data-mobile-collapse colspan="2" data-v-340f6857></th></tr>`);
      }
      _push(`</thead><tbody data-v-340f6857><tr data-v-340f6857><th colspan="2" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-12 col-md-12 col-lg-12 text-center align-self-center title-table" data-v-340f6857><span data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Company"))}</b></span></div></div></th><td data-product="columodds-1" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-4 col-md-4 col-lg-4 text-center align-self-center plr-0" data-v-340f6857><span data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center plr-0" data-v-340f6857><span data-v-340f6857>HDP</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center title-table" data-v-340f6857><span data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</span></div></div></td><td data-product="columodds-2" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-4 col-md-4 col-lg-4 text-center align-self-center plr-0" data-v-340f6857><span data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center plr-0" data-v-340f6857><span data-v-340f6857>${ssrInterpolate(unref($t)("Draw"))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center title-table" data-v-340f6857><span data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</span></div></div></td><td data-product="columodds-3" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-4 col-md-4 col-lg-4 text-center align-self-center plr-0" data-v-340f6857><span data-v-340f6857>${ssrInterpolate(unref($t)("Over"))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center plr-0" data-v-340f6857><span data-v-340f6857>${ssrInterpolate(unref($t)("First odd"))}</span></div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center title-table" data-v-340f6857><span data-v-340f6857>${ssrInterpolate(unref($t)("Under"))}</span></div></div></td><th class="no-b-l" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-12 col-md-12 col-lg-12 text-center align-self-center title-table" data-v-340f6857><span data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("History"))}</b></span></div></div></th><th class="no-b-r" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-12 col-md-12 col-lg-12 text-center align-self-center title-table"${ssrRenderAttr("title", unref($t)("Choose a Company"))} data-v-340f6857><img${ssrRenderAttr("src", _imports_0$1)} alt="plus" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-340f6857></div></div></th></tr>`);
      if (((_e = unref(oCompanySelected)) == null ? void 0 : _e.length) > 0) {
        _push(`<!--[-->`);
        ssrRenderList((_f = unref(oddCompanys)) == null ? void 0 : _f.filter((item) => item !== null && !(item == null ? void 0 : item.isEmpty)), (item, index) => {
          var _a32, _b32, _c22, _d22, _e22, _f22, _g22, _h22, _i22, _j22, _k22, _l22, _m22, _n22, _o22, _p22, _q22, _r22, _s22, _t22, _u22, _v22, _w22, _x22, _y22, _z22, _A22, _B22, _C22, _D22, _E22, _F2, _G2, _H2, _I2, _J2, _K2, _L2, _M2, _N2, _O2, _P2, _Q2, _R2, _S2, _T2, _U2, _V2, _W2, _X2, _Y2, _Z2, __2, _$2, _aa2, _ba2;
          _push(`<!--[-->`);
          if (unref(oCompanySelected).includes(item == null ? void 0 : item.id)) {
            _push(`<!--[--><tr name="earlyOdds" data-v-340f6857><td rowspan="3" class="companyBg" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.name)}</b></td><td class="fixed-data" data-v-340f6857>${ssrInterpolate(unref($t)("Initial"))}</td><td data-product="columodds-1" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2 no-b-r" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_b32 = (_a32 = item == null ? void 0 : item.handicap) == null ? void 0 : _a32.first) == null ? void 0 : _b32[1]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2 no-b-lr" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_d22 = (_c22 = item == null ? void 0 : item.handicap) == null ? void 0 : _c22.first) == null ? void 0 : _d22[0]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2 no-b-l" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_f22 = (_e22 = item == null ? void 0 : item.handicap) == null ? void 0 : _e22.first) == null ? void 0 : _f22[2]))}</div></div></div></div></td><td data-product="columodds-2" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-4 col-md-4 col-lg-4 text-center align-self-center no-b-r" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_h22 = (_g22 = item == null ? void 0 : item.overUnder) == null ? void 0 : _g22.first) == null ? void 0 : _h22[1]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center no-b-lr" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_j22 = (_i22 = item == null ? void 0 : item.overUnder) == null ? void 0 : _i22.first) == null ? void 0 : _j22[0]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center no-b-l" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_l22 = (_k22 = item == null ? void 0 : item.overUnder) == null ? void 0 : _k22.first) == null ? void 0 : _l22[2]))}</div></div></div></div></td><td data-product="columodds-3" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1 no-b-r" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_n22 = (_m22 = item == null ? void 0 : item.europeOdds) == null ? void 0 : _m22.first) == null ? void 0 : _n22[0]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1 no-b-lr" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_p22 = (_o22 = item == null ? void 0 : item.europeOdds) == null ? void 0 : _o22.first) == null ? void 0 : _p22[1]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1 no-b-l" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_r22 = (_q22 = item == null ? void 0 : item.europeOdds) == null ? void 0 : _q22.first) == null ? void 0 : _r22[2]))}</div></div></div></div></td><td class="no-b-r" rowspan="3" data-v-340f6857>`);
            _push(ssrRenderComponent(_component_nuxt_link, {
              to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + ((_t22 = (_s22 = unref(matchLiveDetail)) == null ? void 0 : _s22.match) == null ? void 0 : _t22.id), query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP } }
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="odds-icon"${ssrRenderAttr("title", unref($t)("Odd detail"))} data-v-340f6857${_scopeId}><i class="icon iconfont icon-odds" data-v-340f6857${_scopeId}></i></span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: "odds-icon",
                      title: unref($t)("Odd detail")
                    }, [
                      createVNode("i", { class: "icon iconfont icon-odds" })
                    ], 8, ["title"])
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</td><td class="no-b-l" rowspan="3"${ssrRenderAttr("title", unref($t)("Delete"))} data-v-340f6857><i class="icon iconfont icon-font-reduce cursor-pointer" data-v-340f6857></i></td></tr><tr class="oddsdata" id="tr_o_2_8" name="liveOdds" data-v-340f6857><td class="fixed-data" data-v-340f6857>Live</td><td data-product="columodds-1" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2 no-b-r" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_v22 = (_u22 = item == null ? void 0 : item.handicap) == null ? void 0 : _u22.live) == null ? void 0 : _v22[1]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2 no-b-lr" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_x22 = (_w22 = item == null ? void 0 : item.handicap) == null ? void 0 : _w22.live) == null ? void 0 : _x22[0]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2 no-b-l" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_z22 = (_y22 = item == null ? void 0 : item.handicap) == null ? void 0 : _y22.live) == null ? void 0 : _z22[2]))}</div></div></div></div></td><td data-product="columodds-2" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-4 col-md-4 col-lg-4 text-center align-self-center no-b-r" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_B22 = (_A22 = item == null ? void 0 : item.overUnder) == null ? void 0 : _A22.live) == null ? void 0 : _B22[1]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center no-b-lr" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_D22 = (_C22 = item == null ? void 0 : item.overUnder) == null ? void 0 : _C22.live) == null ? void 0 : _D22[0]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center no-b-l" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_F2 = (_E22 = item == null ? void 0 : item.overUnder) == null ? void 0 : _E22.live) == null ? void 0 : _F2[2]))}</div></div></div></div></td><td data-product="columodds-3" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1 no-b-r" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_H2 = (_G2 = item == null ? void 0 : item.europeOdds) == null ? void 0 : _G2.live) == null ? void 0 : _H2[0]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1 no-b-lr" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_J2 = (_I2 = item == null ? void 0 : item.europeOdds) == null ? void 0 : _I2.live) == null ? void 0 : _J2[1]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1 no-b-l" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_L2 = (_K2 = item == null ? void 0 : item.europeOdds) == null ? void 0 : _K2.live) == null ? void 0 : _L2[2]))}</div></div></div></div></td></tr><tr class="oddsdata" id="tr_o_3_8" name="runOdds" data-v-340f6857><td class="lo-f2 fixed-data" data-v-340f6857>${ssrInterpolate(unref($t)("Run"))}</td><td data-product="columodds-1" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2r no-b-r" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_N2 = (_M2 = item == null ? void 0 : item.handicap) == null ? void 0 : _M2.run) == null ? void 0 : _N2[1]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2r no-b-lr" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_P2 = (_O2 = item == null ? void 0 : item.handicap) == null ? void 0 : _O2.run) == null ? void 0 : _P2[0]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2r no-b-l" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_R2 = (_Q2 = item == null ? void 0 : item.handicap) == null ? void 0 : _Q2.run) == null ? void 0 : _R2[2]))}</div></div></div></div></td><td data-product="columodds-2" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td4r no-b-r" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_T2 = (_S2 = item == null ? void 0 : item.overUnder) == null ? void 0 : _S2.run) == null ? void 0 : _T2[1]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td4r no-b-lr" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_V2 = (_U2 = item == null ? void 0 : item.overUnder) == null ? void 0 : _U2.run) == null ? void 0 : _V2[0]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td4r no-b-l" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_X2 = (_W2 = item == null ? void 0 : item.overUnder) == null ? void 0 : _W2.run) == null ? void 0 : _X2[2]))}</div></div></div></div></td><td data-product="columodds-3" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0" data-v-340f6857><div class="row mlr-0" data-v-340f6857><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1r no-b-r" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_Z2 = (_Y2 = item == null ? void 0 : item.europeOdds) == null ? void 0 : _Y2.run) == null ? void 0 : _Z2[0]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1r no-b-lr" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_$2 = (__2 = item == null ? void 0 : item.europeOdds) == null ? void 0 : __2.run) == null ? void 0 : _$2[1]))}</div><div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1r no-b-l" data-v-340f6857>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_ba2 = (_aa2 = item == null ? void 0 : item.europeOdds) == null ? void 0 : _aa2.run) == null ? void 0 : _ba2[2]))}</div></div></div></div></td></tr><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<tr data-v-340f6857><td colspan="13" class="nodata" style="${ssrRenderStyle({ "display": "table-cell" })}" data-v-340f6857>${ssrInterpolate(unref($t)("This company has no data temporarily, please choose another company"))} <div class="btn" data-v-340f6857><i class="icon iconfont icon-font-injured" data-v-340f6857></i>${ssrInterpolate(unref($t)("Select"))}<div data-v-340f6857></div></div></td></tr>`);
      }
      _push(`</tbody></table></div></div></div><div class="porletP" id="porletP1" style="${ssrRenderStyle([
        ((_h = (_g = unref(settingsH2hList)) == null ? void 0 : _g.find((item) => (item == null ? void 0 : item.div_id) === "porletP1")) == null ? void 0 : _h.show) === true ? null : { display: "none" },
        "order: " + ((_j = (_i = unref(settingsH2hList)) == null ? void 0 : _i.find((item) => (item == null ? void 0 : item.div_id) === "porletP1")) == null ? void 0 : _j.order)
      ])}" data-v-340f6857><div data-v-340f6857><h2 class="team-table-title" data-v-340f6857>${ssrInterpolate(unref($t)("Who will win?"))}</h2><div class="fx" data-v-340f6857><div class="vote" data-v-340f6857><div class="teamicon" style="${ssrRenderStyle({ "width": "50px  !important", "height": "50px", "display": "flex", "justify-content": "center", "align-items": "center" })}" data-v-340f6857><img style="${ssrRenderStyle({})}" class="${ssrRenderClass(!!((_m = (_l = (_k = unref(matchLiveDetail)) == null ? void 0 : _k.match) == null ? void 0 : _l.home_team) == null ? void 0 : _m.national) ? "national" : "p-1")}"${ssrRenderAttr("src", ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(!!((_p = (_o = (_n = unref(matchLiveDetail)) == null ? void 0 : _n.match) == null ? void 0 : _o.home_team) == null ? void 0 : _p.national) && ((_s = (_r = (_q = unref(matchLiveDetail)) == null ? void 0 : _q.match) == null ? void 0 : _r.home_team) == null ? void 0 : _s.country_logo_o) ? (_v = (_u = (_t = unref(matchLiveDetail)) == null ? void 0 : _t.match) == null ? void 0 : _u.home_team) == null ? void 0 : _v.country_logo_o : (_y = (_x = (_w = unref(matchLiveDetail)) == null ? void 0 : _w.match) == null ? void 0 : _x.home_team) == null ? void 0 : _y.logo_o, "team") + "!h50")}${ssrRenderAttr("alt", (_B = (_A = (_z = unref(matchLiveDetail)) == null ? void 0 : _z.match) == null ? void 0 : _A.home_team) == null ? void 0 : _B.name)} data-v-340f6857></div><div id="voteBtn" class="button on" data-v-340f6857><span class="${ssrRenderClass([unref(voteBtn) === 1 ? "o-win" : "", "pItem win-f"])}" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</span><span class="${ssrRenderClass([unref(voteBtn) === 2 ? "o-draw" : "", "pItem draw-f"])}" data-v-340f6857>${ssrInterpolate(unref($t)("Draw"))}</span><span class="${ssrRenderClass([unref(voteBtn) === 3 ? "o-lose" : "", "pItem lose-f"])}" data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</span></div><div class="teamicon" data-v-340f6857><img class="${ssrRenderClass(!!((_E = (_D = (_C = unref(matchLiveDetail)) == null ? void 0 : _C.match) == null ? void 0 : _D.away_team) == null ? void 0 : _E.national) ? "national" : "p-1")}"${ssrRenderAttr("src", ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(!!((_H = (_G = (_F = unref(matchLiveDetail)) == null ? void 0 : _F.match) == null ? void 0 : _G.away_team) == null ? void 0 : _H.national) && ((_K = (_J = (_I = unref(matchLiveDetail)) == null ? void 0 : _I.match) == null ? void 0 : _J.away_team) == null ? void 0 : _K.country_logo_o) ? (_N = (_M = (_L = unref(matchLiveDetail)) == null ? void 0 : _L.match) == null ? void 0 : _M.away_team) == null ? void 0 : _N.country_logo_o : (_Q = (_P = (_O = unref(matchLiveDetail)) == null ? void 0 : _O.match) == null ? void 0 : _P.away_team) == null ? void 0 : _Q.logo_o, "team") + "!h50")}${ssrRenderAttr("alt", (_T = (_S = (_R = unref(matchLiveDetail)) == null ? void 0 : _R.match) == null ? void 0 : _S.away_team) == null ? void 0 : _T.name)} data-v-340f6857></div></div><div class="text-vote text-center" data-v-340f6857></div><div class="vote" id="voteTxt" data-v-340f6857><div class="win-f" data-v-340f6857>${ssrInterpolate((unref(winF) * 100 / (unref(winF) + unref(drawF) + unref(loseF))).toFixed(1))}% <span data-v-340f6857>(${ssrInterpolate(unref(winF))})</span></div><div class="draw-f" data-v-340f6857>${ssrInterpolate((unref(drawF) * 100 / (unref(winF) + unref(drawF) + unref(loseF))).toFixed(1))}% <span data-v-340f6857>(${ssrInterpolate(unref(drawF))})</span></div><div class="lose-f" data-v-340f6857>${ssrInterpolate((unref(loseF) * 100 / (unref(winF) + unref(drawF) + unref(loseF))).toFixed(1))}% <span data-v-340f6857>(${ssrInterpolate(unref(loseF))})</span></div></div><div id="voteBar" class="vote-bar o-draw" data-v-340f6857><i id="hbar" class="barH o-win" style="${ssrRenderStyle("width: " + (unref(winF) * 100 / (unref(winF) + unref(drawF) + unref(loseF))).toFixed(1) + "%")}" data-v-340f6857></i><i id="gbar" class="barG o-lose" style="${ssrRenderStyle("width: " + (unref(loseF) * 100 / (unref(winF) + unref(drawF) + unref(loseF))).toFixed(1) + "%")}" data-v-340f6857></i></div></div></div></div><div class="porletP" id="porletP2" style="${ssrRenderStyle([
        ((_V = (_U = unref(settingsH2hList)) == null ? void 0 : _U.find((item) => (item == null ? void 0 : item.div_id) === "porletP2")) == null ? void 0 : _V.show) === true ? null : { display: "none" },
        "order: " + ((_X = (_W = unref(settingsH2hList)) == null ? void 0 : _W.find((item) => (item == null ? void 0 : item.div_id) === "porletP2")) == null ? void 0 : _X.order)
      ])}" data-v-340f6857><div class="content strength" id="strengthChart" style="${ssrRenderStyle({ "display": "block" })}" data-v-340f6857><div class="team-table-title row" data-v-340f6857><span class="team-table-xq-home col-4 text-start" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((__ = (_Z = (_Y = unref(matchLiveDetail)) == null ? void 0 : _Y.match) == null ? void 0 : _Z.home_team) == null ? void 0 : __.name)}</span></span><span class="col-4" data-v-340f6857>${ssrInterpolate(unref($t)("Compare Strength"))}</span><span class="team-table-xq-guest col-4 text-end" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_ba = (_aa = (_$ = unref(matchLiveDetail)) == null ? void 0 : _$.match) == null ? void 0 : _aa.away_team) == null ? void 0 : _ba.name)}</span></span></div><div class="team-bg-h1" data-v-340f6857><span class="home-bg" data-v-340f6857></span><span class="away-bg" data-v-340f6857></span></div><div class="box-radar row" data-v-340f6857><div id="radar" class="radar col-sm-12 col-md-6" data-v-340f6857><div id="point_score" data-v-340f6857><div class="home_score d-block d-sm-block d-md-none" id="hRadarScore" data-v-340f6857>${ssrInterpolate(unref(homeTotalComparisonChar))}</div><div class="guest_score d-block d-sm-block d-md-none" id="gRadarScore" data-v-340f6857>${ssrInterpolate(unref(awayTotalComparisonChar))}</div></div><div class="box_map_radar row" data-v-340f6857><div class="home_score col-lg-2 col-sm-2 d-none d-sm-none d-md-inline-block" id="hRadarScore" data-v-340f6857>${ssrInterpolate(unref(homeTotalComparisonChar))}</div><div class="map col-lg-8 col-sm-8" data-v-340f6857><div id="chartContainer" style="${ssrRenderStyle({ "width": "100%", "height": "218px" })}" data-v-340f6857></div></div><div class="guest_score col-lg-2 col-sm-2 d-none d-sm-none d-md-inline-block" id="gRadarScore" data-v-340f6857>${ssrInterpolate(unref(awayTotalComparisonChar))}</div></div></div><div class="bar col-sm-12 col-md-6" data-v-340f6857><ul class="options" data-v-340f6857><span id="strengthOptions" data-v-340f6857><li option="1" class="${ssrRenderClass({ on: unref(activeSectionTable) === "h2h" })}" data-v-340f6857>${ssrInterpolate(unref($t)("Confrontation"))}</li><li option="2" class="${ssrRenderClass({ on: unref(activeSectionTable) === "state" })}" data-v-340f6857>${ssrInterpolate(unref($t)("Recent status"))}</li><li option="3" class="${ssrRenderClass({ on: unref(activeSectionTable) === "attack" })}" data-v-340f6857>${ssrInterpolate(unref($t)("Attack"))}</li><li option="4" class="${ssrRenderClass({ on: unref(activeSectionTable) === "defence" })}" data-v-340f6857>${ssrInterpolate(unref($t)("Defense"))}</li><li option="5" class="${ssrRenderClass({ on: unref(activeSectionTable) === "value" })}" data-v-340f6857>${ssrInterpolate(unref($t)("Value"))}</li><li option="6" class="${ssrRenderClass({ on: unref(activeSectionTable) === "others" })}" data-v-340f6857>${ssrInterpolate(unref($t)("Other"))}</li></span></ul><div style="${ssrRenderStyle(unref(activeSectionTable) === "h2h" ? null : { display: "none" })}" class="${ssrRenderClass([{ active: unref(activeSectionTable) === "h2h" }, "h2h"])}" data-v-340f6857><ul id="barCompareList" class="fx-tb-a compare" data-v-340f6857><li data-v-340f6857><div class="fx-tb-title title" data-v-340f6857><span class="team-home-f" data-v-340f6857>${ssrInterpolate((_ca = unref(h2hComparison)) == null ? void 0 : _ca[8])}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Compare Head to Head"))}</span><span class="team-away-f" data-v-340f6857>${ssrInterpolate((_da = unref(h2hComparison)) == null ? void 0 : _da[9])}%</span></div><div class="team-h1" data-v-340f6857><span class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_ea = unref(h2hComparison)) == null ? void 0 : _ea[8]) + "%" : "50%" })}" data-v-340f6857></span><span class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_fa = unref(h2hComparison)) == null ? void 0 : _fa[9]) + "%" : "50%" })}" data-v-340f6857></span></div></li><li class="fx-tb-label" data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span class="tb-title-all" data-v-340f6857>${ssrInterpolate(unref($t)("All"))}</span></div></li><li data-v-340f6857><div class="detail f-l" data-v-340f6857>${ssrInterpolate((_ga = unref(h2hComparison)) == null ? void 0 : _ga[2])}</div><div class="fx-td-data" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_ha = unref(h2hComparison)) == null ? void 0 : _ha[0]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_ia = unref(h2hComparison)) == null ? void 0 : _ia[1]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="detail f-r" data-v-340f6857>${ssrInterpolate((_ja = unref(h2hComparison)) == null ? void 0 : _ja[3])}</div></li><li class="fx-tb-label" data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span class="tb-title-all" data-v-340f6857>${ssrInterpolate(unref($t)("Home - Away similar"))}</span></div></li><li data-v-340f6857><div class="detail f-l" data-v-340f6857>${ssrInterpolate((_ka = unref(h2hComparison)) == null ? void 0 : _ka[6])}</div><div class="fx-td-data" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_la = unref(h2hComparison)) == null ? void 0 : _la[4]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_ma = unref(h2hComparison)) == null ? void 0 : _ma[5]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="detail f-r" data-v-340f6857>${ssrInterpolate((_na = unref(h2hComparison)) == null ? void 0 : _na[7])}</div></li></ul></div><div style="${ssrRenderStyle(unref(activeSectionTable) === "state" ? null : { display: "none" })}" class="${ssrRenderClass([{ active: unref(activeSectionTable) === "state" }, "state"])}" data-v-340f6857><ul id="barCompareList" class="fx-tb-a compare" data-v-340f6857><li data-v-340f6857><div class="fx-tb-title title" data-v-340f6857><span class="team-home-f" data-v-340f6857>${ssrInterpolate((_oa = unref(stateComparison)) == null ? void 0 : _oa[8])}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Compare Performance"))}</span><span class="team-away-f" data-v-340f6857>${ssrInterpolate((_pa = unref(stateComparison)) == null ? void 0 : _pa[9])}%</span></div><div class="team-h1" data-v-340f6857><span class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_qa = unref(stateComparison)) == null ? void 0 : _qa[8]) + "%" : "50%" })}" data-v-340f6857></span><span class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_ra = unref(stateComparison)) == null ? void 0 : _ra[9]) + "%" : "50%" })}" data-v-340f6857></span></div></li><li class="fx-tb-label" data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span class="tb-title-all" data-v-340f6857>${ssrInterpolate(unref($t)("All"))}</span></div></li><li data-v-340f6857><div class="detail f-l" data-v-340f6857>${ssrInterpolate((_sa = unref(stateComparison)) == null ? void 0 : _sa[2])}</div><div class="fx-td-data" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_ta = unref(stateComparison)) == null ? void 0 : _ta[0]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_ua = unref(stateComparison)) == null ? void 0 : _ua[1]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="detail f-r" data-v-340f6857>${ssrInterpolate((_va = unref(stateComparison)) == null ? void 0 : _va[3])}</div></li><li class="fx-tb-label" data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span class="tb-title-all" data-v-340f6857>${ssrInterpolate(unref($t)("Home - Away similar"))}</span></div></li><li data-v-340f6857><div class="detail f-l" data-v-340f6857>${ssrInterpolate((_wa = unref(stateComparison)) == null ? void 0 : _wa[6])}</div><div class="fx-td-data" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_xa = unref(stateComparison)) == null ? void 0 : _xa[4]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_ya = unref(stateComparison)) == null ? void 0 : _ya[5]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="detail f-r" data-v-340f6857>${ssrInterpolate((_za = unref(stateComparison)) == null ? void 0 : _za[7])}</div></li></ul></div><div style="${ssrRenderStyle(unref(activeSectionTable) === "attack" ? null : { display: "none" })}" class="${ssrRenderClass([{ active: unref(activeSectionTable) === "attack" }, "attack"])}" data-v-340f6857><ul id="barCompareList" class="fx-tb-a compare" data-v-340f6857><li data-v-340f6857><div class="fx-tb-title title" data-v-340f6857><span class="team-home-f" data-v-340f6857>${ssrInterpolate((_Aa = unref(stateComparison)) == null ? void 0 : _Aa[18])}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Attack Comparison"))}</span><span class="team-away-f" data-v-340f6857>${ssrInterpolate((_Ba = unref(stateComparison)) == null ? void 0 : _Ba[19])}%</span></div><div class="team-h1" data-v-340f6857><span class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_Ca = unref(stateComparison)) == null ? void 0 : _Ca[18]) + "%" : "50%" })}" data-v-340f6857></span><span class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_Da = unref(stateComparison)) == null ? void 0 : _Da[19]) + "%" : "50%" })}" data-v-340f6857></span></div></li><li class="fx-tb-label" data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span class="tb-title-all" data-v-340f6857>${ssrInterpolate(unref($t)("All"))}</span></div></li><li data-v-340f6857><div class="detail f-l" data-v-340f6857>${ssrInterpolate((_Ea = unref(stateComparison)) == null ? void 0 : _Ea[12])}</div><div class="fx-td-data" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_Fa = unref(stateComparison)) == null ? void 0 : _Fa[10]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_Ga = unref(stateComparison)) == null ? void 0 : _Ga[11]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="detail f-r" data-v-340f6857>${ssrInterpolate((_Ha = unref(stateComparison)) == null ? void 0 : _Ha[13])}</div></li><li class="fx-tb-label" data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span class="tb-title-all" data-v-340f6857>${ssrInterpolate(unref($t)("Home - Away similar"))}</span></div></li><li data-v-340f6857><div class="detail f-l" data-v-340f6857>${ssrInterpolate((_Ia = unref(stateComparison)) == null ? void 0 : _Ia[16])}</div><div class="fx-td-data" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_Ja = unref(stateComparison)) == null ? void 0 : _Ja[14]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_Ka = unref(stateComparison)) == null ? void 0 : _Ka[15]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="detail f-r" data-v-340f6857>${ssrInterpolate((_La = unref(stateComparison)) == null ? void 0 : _La[17])}</div></li></ul></div><div style="${ssrRenderStyle(unref(activeSectionTable) === "defence" ? null : { display: "none" })}" class="${ssrRenderClass([{ active: unref(activeSectionTable) === "defence" }, "defence"])}" data-v-340f6857><ul id="barCompareList" class="fx-tb-a compare" data-v-340f6857><li data-v-340f6857><div class="fx-tb-title title" data-v-340f6857><span class="team-home-f" data-v-340f6857>${ssrInterpolate((_Ma = unref(stateComparison)) == null ? void 0 : _Ma[28])}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Defense Comparison"))}</span><span class="team-away-f" data-v-340f6857>${ssrInterpolate((_Na = unref(stateComparison)) == null ? void 0 : _Na[29])}%</span></div><div class="team-h1" data-v-340f6857><span class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_Oa = unref(stateComparison)) == null ? void 0 : _Oa[28]) + "%" : "50%" })}" data-v-340f6857></span><span class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_Pa = unref(stateComparison)) == null ? void 0 : _Pa[29]) + "%" : "50%" })}" data-v-340f6857></span></div></li><li class="fx-tb-label" data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span class="tb-title-all" data-v-340f6857>${ssrInterpolate(unref($t)("All"))}</span></div></li><li data-v-340f6857><div class="detail f-l" data-v-340f6857>${ssrInterpolate((_Qa = unref(stateComparison)) == null ? void 0 : _Qa[20])}</div><div class="fx-td-data" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_Ra = unref(stateComparison)) == null ? void 0 : _Ra[22]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_Sa = unref(stateComparison)) == null ? void 0 : _Sa[23]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="detail f-r" data-v-340f6857>${ssrInterpolate((_Ta = unref(stateComparison)) == null ? void 0 : _Ta[21])}</div></li><li class="fx-tb-label" data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span class="tb-title-all" data-v-340f6857>${ssrInterpolate(unref($t)("Home - Away similar"))}</span></div></li><li data-v-340f6857><div class="detail f-l" data-v-340f6857>${ssrInterpolate((_Ua = unref(stateComparison)) == null ? void 0 : _Ua[24])}</div><div class="fx-td-data" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_Va = unref(stateComparison)) == null ? void 0 : _Va[26]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_Wa = unref(stateComparison)) == null ? void 0 : _Wa[27]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="detail f-r" data-v-340f6857>${ssrInterpolate((_Xa = unref(stateComparison)) == null ? void 0 : _Xa[25])}</div></li></ul></div><div style="${ssrRenderStyle(unref(activeSectionTable) === "value" ? null : { display: "none" })}" class="${ssrRenderClass([{ active: unref(activeSectionTable) === "value" }, "value"])}" data-v-340f6857><ul id="barCompareList" class="fx-tb-a compare" data-v-340f6857><li data-v-340f6857><div class="fx-tb-title title" data-v-340f6857><span class="team-home-f" data-v-340f6857>${ssrInterpolate(unref(homeValue))}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Compare Values"))}</span><span class="team-away-f" data-v-340f6857>${ssrInterpolate(unref(awayValue))}%</span></div><div class="team-h1" data-v-340f6857><span class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? unref(homeValue) + "%" : "50%" })}" data-v-340f6857></span><span class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? unref(awayValue) + "%" : "50%" })}" data-v-340f6857></span></div></li><li class="fx-tb-label" data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span class="tb-title-all" data-v-340f6857>${ssrInterpolate(unref($t)("Compare Values"))}</span></div></li><li data-v-340f6857><div class="detail f-l" data-v-340f6857>${ssrInterpolate(("currencyFormatter" in _ctx ? _ctx.currencyFormatter : unref(currencyFormatter))((_Za = (_Ya = unref(matchesAnalysis)) == null ? void 0 : _Ya.team) == null ? void 0 : _Za.home_value))}</div><div class="fx-td-data" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? unref(homeValue) + "%" : "0%" })}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? unref(awayValue) + "%" : "0%" })}" data-v-340f6857></div></div><div class="detail f-r" data-v-340f6857>${ssrInterpolate(("currencyFormatter" in _ctx ? _ctx.currencyFormatter : unref(currencyFormatter))((_$a = (__a = unref(matchesAnalysis)) == null ? void 0 : __a.team) == null ? void 0 : _$a.away_value))}</div></li></ul></div><div style="${ssrRenderStyle(unref(activeSectionTable) === "others" ? null : { display: "none" })}" class="${ssrRenderClass([{ active: unref(activeSectionTable) === "others" }, "others"])}" data-v-340f6857><ul id="barCompareList" class="fx-tb-a compare" data-v-340f6857><li class="fx-tb-label" data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span class="tb-title-all" data-v-340f6857>${ssrInterpolate(unref($t)("Corners per match"))}</span></div></li><li data-v-340f6857><div class="detail f-l" data-v-340f6857>${ssrInterpolate((_ab = unref(stateComparison)) == null ? void 0 : _ab[30])}</div><div class="fx-td-data" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "home-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_bb = unref(stateComparison)) == null ? void 0 : _bb[32]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="${ssrRenderClass([{ "start-transition": unref(startTransition) }, "away-bg bar_shade"])}" style="${ssrRenderStyle({ width: unref(startTransition) ? ((_cb = unref(stateComparison)) == null ? void 0 : _cb[33]) + "%" : "0%" })}" data-v-340f6857></div></div><div class="detail f-r" data-v-340f6857>${ssrInterpolate((_db = unref(stateComparison)) == null ? void 0 : _db[31])}</div></li></ul></div></div></div><div class="survey" id="survey" data-v-340f6857><div class="tips" data-v-340f6857> * ${ssrInterpolate(unref($t)("The above data is for reference only and is generated from recent match statistics"))}</div><div class="supportbtn" data-v-340f6857><span class="${ssrRenderClass([unref(surveyGood) > GOOD_F ? "o-lose" : "win-f", "icon iconfont icon-font-small-support-off1 good"])}" data-v-340f6857>${ssrInterpolate(unref(surveyGood))}</span><span class="${ssrRenderClass([unref(surveyBad) > BAD_F ? "o-win" : "lose-f", "icon iconfont icon-font-small-support-off1 bad"])}" data-v-340f6857>${ssrInterpolate(unref(surveyBad))}</span></div></div></div></div><div class="porletP" id="porletP4" style="${ssrRenderStyle([
        ((_fb = (_eb = unref(settingsH2hList)) == null ? void 0 : _eb.find((item) => (item == null ? void 0 : item.div_id) === "porletP4")) == null ? void 0 : _fb.show) === true ? null : { display: "none" },
        "order: " + ((_hb = (_gb = unref(settingsH2hList)) == null ? void 0 : _gb.find((item) => (item == null ? void 0 : item.div_id) === "porletP4")) == null ? void 0 : _hb.order)
      ])}" data-v-340f6857><div data-v-340f6857><h2 class="team-table-title" data-v-340f6857>${ssrInterpolate(unref($t)("Standing info"))}</h2><div class="team-div table-score row" data-v-340f6857><div class="home-div" data-v-340f6857><table width="100%" cellpadding="0" cellspacing="0" class="team-table-home table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr class="team-home" data-v-340f6857><td height="28" colspan="10" data-v-340f6857><span data-v-340f6857> [${ssrInterpolate((_kb = (_jb = (_ib = unref(matchLiveDetail)) == null ? void 0 : _ib.match) == null ? void 0 : _jb.competition) == null ? void 0 : _kb.short_name)}-${ssrInterpolate((_mb = (_lb = unref(standingsTable)) == null ? void 0 : _lb.home) == null ? void 0 : _mb.position)}] ${ssrInterpolate((_pb = (_ob = (_nb = unref(matchLiveDetail)) == null ? void 0 : _nb.match) == null ? void 0 : _ob.home_team) == null ? void 0 : _pb.name)}</span></td></tr></tbody></table><div class="rankbox" data-v-340f6857><table class="eTable adaptMt" id="etable-header" width="15%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "80px" })}" data-v-340f6857><tbody data-v-340f6857><tr class="bd-l" data-v-340f6857><th${ssrRenderAttr("title", unref($t)("Full time"))} data-v-340f6857>FT</th></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857><span class="team-home-f" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</span></td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857><span class="team-away-f" data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</span></td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("SRecent 6"))}</td></tr></tbody></table><div class="rankdata w-100" width="85%" data-v-340f6857><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" data-v-340f6857><tbody data-v-340f6857><tr data-v-340f6857><th data-v-340f6857>${ssrInterpolate(unref($t)("Match"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Win"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Draw"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Loss"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("SGoal"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Missed"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Points"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Rank"))}</th><th${ssrRenderAttr("title", unref($t)("Win rate"))} data-v-340f6857>${ssrInterpolate(unref($t)("W"))}%</th></tr><tr data-v-340f6857><td data-v-340f6857>${ssrInterpolate((_rb = (_qb = unref(standingsTable)) == null ? void 0 : _qb.home) == null ? void 0 : _rb.total)}</td><td data-v-340f6857>${ssrInterpolate((_tb = (_sb = unref(standingsTable)) == null ? void 0 : _sb.home) == null ? void 0 : _tb.won)}</td><td data-v-340f6857>${ssrInterpolate((_vb = (_ub = unref(standingsTable)) == null ? void 0 : _ub.home) == null ? void 0 : _vb.draw)}</td><td data-v-340f6857>${ssrInterpolate((_xb = (_wb = unref(standingsTable)) == null ? void 0 : _wb.home) == null ? void 0 : _xb.loss)}</td><td data-v-340f6857>${ssrInterpolate((_zb = (_yb = unref(standingsTable)) == null ? void 0 : _yb.home) == null ? void 0 : _zb.goals)}</td><td data-v-340f6857>${ssrInterpolate((_Bb = (_Ab = unref(standingsTable)) == null ? void 0 : _Ab.home) == null ? void 0 : _Bb.goals_against)}</td><td class="red" data-v-340f6857>${ssrInterpolate((_Db = (_Cb = unref(standingsTable)) == null ? void 0 : _Cb.home) == null ? void 0 : _Db.points)}</td><td class="red" data-v-340f6857>${ssrInterpolate((_Fb = (_Eb = unref(standingsTable)) == null ? void 0 : _Eb.home) == null ? void 0 : _Fb.position)}</td><td data-v-340f6857>${ssrInterpolate(((_Hb = (_Gb = unref(standingsTable)) == null ? void 0 : _Gb.home) == null ? void 0 : _Hb.total) > 0 ? (((_Jb = (_Ib = unref(standingsTable)) == null ? void 0 : _Ib.home) == null ? void 0 : _Jb.won) * 100 / ((_Lb = (_Kb = unref(standingsTable)) == null ? void 0 : _Kb.home) == null ? void 0 : _Lb.total)).toFixed(1) : "")}%</td></tr><tr data-v-340f6857><td data-v-340f6857>${ssrInterpolate((_Nb = (_Mb = unref(standingsTable)) == null ? void 0 : _Mb.home) == null ? void 0 : _Nb.home_total)}</td><td data-v-340f6857>${ssrInterpolate((_Pb = (_Ob = unref(standingsTable)) == null ? void 0 : _Ob.home) == null ? void 0 : _Pb.home_won)}</td><td data-v-340f6857>${ssrInterpolate((_Rb = (_Qb = unref(standingsTable)) == null ? void 0 : _Qb.home) == null ? void 0 : _Rb.home_draw)}</td><td data-v-340f6857>${ssrInterpolate((_Tb = (_Sb = unref(standingsTable)) == null ? void 0 : _Sb.home) == null ? void 0 : _Tb.home_loss)}</td><td data-v-340f6857>${ssrInterpolate((_Vb = (_Ub = unref(standingsTable)) == null ? void 0 : _Ub.home) == null ? void 0 : _Vb.home_goals)}</td><td data-v-340f6857>${ssrInterpolate((_Xb = (_Wb = unref(standingsTable)) == null ? void 0 : _Wb.home) == null ? void 0 : _Xb.home_goals_against)}</td><td class="red" data-v-340f6857>${ssrInterpolate((_Zb = (_Yb = unref(standingsTable)) == null ? void 0 : _Yb.home) == null ? void 0 : _Zb.home_points)}</td><td class="red" data-v-340f6857>${ssrInterpolate((_$b = (__b = unref(standingsTable)) == null ? void 0 : __b.home) == null ? void 0 : _$b.home_position)}</td><td data-v-340f6857>${ssrInterpolate(((_bc = (_ac = unref(standingsTable)) == null ? void 0 : _ac.home) == null ? void 0 : _bc.home_total) > 0 ? (((_dc = (_cc = unref(standingsTable)) == null ? void 0 : _cc.home) == null ? void 0 : _dc.home_won) * 100 / ((_fc = (_ec = unref(standingsTable)) == null ? void 0 : _ec.home) == null ? void 0 : _fc.home_total)).toFixed(1) : "")}%</td></tr><tr data-v-340f6857><td data-v-340f6857>${ssrInterpolate((_hc = (_gc = unref(standingsTable)) == null ? void 0 : _gc.home) == null ? void 0 : _hc.away_total)}</td><td data-v-340f6857>${ssrInterpolate((_jc = (_ic = unref(standingsTable)) == null ? void 0 : _ic.home) == null ? void 0 : _jc.away_won)}</td><td data-v-340f6857>${ssrInterpolate((_lc = (_kc = unref(standingsTable)) == null ? void 0 : _kc.home) == null ? void 0 : _lc.away_draw)}</td><td data-v-340f6857>${ssrInterpolate((_nc = (_mc = unref(standingsTable)) == null ? void 0 : _mc.home) == null ? void 0 : _nc.away_loss)}</td><td data-v-340f6857>${ssrInterpolate((_pc = (_oc = unref(standingsTable)) == null ? void 0 : _oc.home) == null ? void 0 : _pc.away_goals)}</td><td data-v-340f6857>${ssrInterpolate((_rc = (_qc = unref(standingsTable)) == null ? void 0 : _qc.home) == null ? void 0 : _rc.away_goals_against)}</td><td class="red" data-v-340f6857>${ssrInterpolate((_tc = (_sc = unref(standingsTable)) == null ? void 0 : _sc.home) == null ? void 0 : _tc.away_points)}</td><td class="red" data-v-340f6857>${ssrInterpolate((_vc = (_uc = unref(standingsTable)) == null ? void 0 : _uc.home) == null ? void 0 : _vc.away_position)}</td><td data-v-340f6857>${ssrInterpolate(((_xc = (_wc = unref(standingsTable)) == null ? void 0 : _wc.home) == null ? void 0 : _xc.away_total) > 0 ? (((_zc = (_yc = unref(standingsTable)) == null ? void 0 : _yc.home) == null ? void 0 : _zc.away_won) * 100 / ((_Bc = (_Ac = unref(standingsTable)) == null ? void 0 : _Ac.home) == null ? void 0 : _Bc.away_total)).toFixed(1) : "")}%</td></tr><tr data-v-340f6857><td data-v-340f6857>${ssrInterpolate((_Ec = (_Dc = (_Cc = unref(standingsTable)) == null ? void 0 : _Cc.home) == null ? void 0 : _Dc.lastest) == null ? void 0 : _Ec[0])}</td><td data-v-340f6857>${ssrInterpolate((_Hc = (_Gc = (_Fc = unref(standingsTable)) == null ? void 0 : _Fc.home) == null ? void 0 : _Gc.lastest) == null ? void 0 : _Hc[1])}</td><td data-v-340f6857>${ssrInterpolate((_Kc = (_Jc = (_Ic = unref(standingsTable)) == null ? void 0 : _Ic.home) == null ? void 0 : _Jc.lastest) == null ? void 0 : _Kc[2])}</td><td data-v-340f6857>${ssrInterpolate((_Nc = (_Mc = (_Lc = unref(standingsTable)) == null ? void 0 : _Lc.home) == null ? void 0 : _Mc.lastest) == null ? void 0 : _Nc[3])}</td><td data-v-340f6857>${ssrInterpolate((_Qc = (_Pc = (_Oc = unref(standingsTable)) == null ? void 0 : _Oc.home) == null ? void 0 : _Pc.lastest) == null ? void 0 : _Qc[4])}</td><td data-v-340f6857>${ssrInterpolate((_Tc = (_Sc = (_Rc = unref(standingsTable)) == null ? void 0 : _Rc.home) == null ? void 0 : _Sc.lastest) == null ? void 0 : _Tc[5])}</td><td class="red" data-v-340f6857>${ssrInterpolate((_Wc = (_Vc = (_Uc = unref(standingsTable)) == null ? void 0 : _Uc.home) == null ? void 0 : _Vc.lastest) == null ? void 0 : _Wc[6])}</td><td data-v-340f6857></td><td data-v-340f6857>${ssrInterpolate((_Zc = (_Yc = (_Xc = unref(standingsTable)) == null ? void 0 : _Xc.home) == null ? void 0 : _Yc.lastest) == null ? void 0 : _Zc[7])}%</td></tr></tbody></table></div></div></div><div class="guest-div" data-v-340f6857><table width="100%" cellpadding="0" cellspacing="0" class="team-table-guest table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr class="team-guest" data-v-340f6857><td height="28" colspan="10" data-v-340f6857><span data-v-340f6857> [${ssrInterpolate((_ad = (_$c = (__c = unref(matchLiveDetail)) == null ? void 0 : __c.match) == null ? void 0 : _$c.competition) == null ? void 0 : _ad.short_name)}-${ssrInterpolate((_cd = (_bd = unref(standingsTable)) == null ? void 0 : _bd.away) == null ? void 0 : _cd.position)}] ${ssrInterpolate((_fd = (_ed = (_dd = unref(matchLiveDetail)) == null ? void 0 : _dd.match) == null ? void 0 : _ed.away_team) == null ? void 0 : _fd.name)}</span></td></tr></tbody></table><div class="rankbox" data-v-340f6857><table class="eTable adaptMt" id="etable-header" width="15%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "80px" })}" data-v-340f6857><tbody data-v-340f6857><tr class="bd-l" data-v-340f6857><th${ssrRenderAttr("title", unref($t)("Full time"))} data-v-340f6857>FT</th></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857><span class="team-home-f" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</span></td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857><span class="team-away-f" data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</span></td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("SRecent 6"))}</td></tr></tbody></table><div class="rankdata w-100" width="85%" data-v-340f6857><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" data-v-340f6857><tbody data-v-340f6857><tr data-v-340f6857><th data-v-340f6857>${ssrInterpolate(unref($t)("Match"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Win"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Draw"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Loss"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("SGoal"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Missed"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Points"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Rank"))}</th><th${ssrRenderAttr("title", unref($t)("Win rate"))} data-v-340f6857>${ssrInterpolate(unref($t)("W"))}%</th></tr><tr data-v-340f6857><td data-v-340f6857>${ssrInterpolate((_hd = (_gd = unref(standingsTable)) == null ? void 0 : _gd.away) == null ? void 0 : _hd.total)}</td><td data-v-340f6857>${ssrInterpolate((_jd = (_id = unref(standingsTable)) == null ? void 0 : _id.away) == null ? void 0 : _jd.won)}</td><td data-v-340f6857>${ssrInterpolate((_ld = (_kd = unref(standingsTable)) == null ? void 0 : _kd.away) == null ? void 0 : _ld.draw)}</td><td data-v-340f6857>${ssrInterpolate((_nd = (_md = unref(standingsTable)) == null ? void 0 : _md.away) == null ? void 0 : _nd.loss)}</td><td data-v-340f6857>${ssrInterpolate((_pd = (_od = unref(standingsTable)) == null ? void 0 : _od.away) == null ? void 0 : _pd.goals)}</td><td data-v-340f6857>${ssrInterpolate((_rd = (_qd = unref(standingsTable)) == null ? void 0 : _qd.away) == null ? void 0 : _rd.goals_against)}</td><td class="red" data-v-340f6857>${ssrInterpolate((_td = (_sd = unref(standingsTable)) == null ? void 0 : _sd.away) == null ? void 0 : _td.points)}</td><td class="red" data-v-340f6857>${ssrInterpolate((_vd = (_ud = unref(standingsTable)) == null ? void 0 : _ud.away) == null ? void 0 : _vd.position)}</td><td data-v-340f6857>${ssrInterpolate(((_xd = (_wd = unref(standingsTable)) == null ? void 0 : _wd.away) == null ? void 0 : _xd.total) > 0 ? (((_zd = (_yd = unref(standingsTable)) == null ? void 0 : _yd.away) == null ? void 0 : _zd.won) * 100 / ((_Bd = (_Ad = unref(standingsTable)) == null ? void 0 : _Ad.away) == null ? void 0 : _Bd.total)).toFixed(1) : "")}%</td></tr><tr data-v-340f6857><td data-v-340f6857>${ssrInterpolate((_Dd = (_Cd = unref(standingsTable)) == null ? void 0 : _Cd.away) == null ? void 0 : _Dd.home_total)}</td><td data-v-340f6857>${ssrInterpolate((_Fd = (_Ed = unref(standingsTable)) == null ? void 0 : _Ed.away) == null ? void 0 : _Fd.home_won)}</td><td data-v-340f6857>${ssrInterpolate((_Hd = (_Gd = unref(standingsTable)) == null ? void 0 : _Gd.away) == null ? void 0 : _Hd.home_draw)}</td><td data-v-340f6857>${ssrInterpolate((_Jd = (_Id = unref(standingsTable)) == null ? void 0 : _Id.away) == null ? void 0 : _Jd.home_loss)}</td><td data-v-340f6857>${ssrInterpolate((_Ld = (_Kd = unref(standingsTable)) == null ? void 0 : _Kd.away) == null ? void 0 : _Ld.home_goals)}</td><td data-v-340f6857>${ssrInterpolate((_Nd = (_Md = unref(standingsTable)) == null ? void 0 : _Md.away) == null ? void 0 : _Nd.home_goals_against)}</td><td class="red" data-v-340f6857>${ssrInterpolate((_Pd = (_Od = unref(standingsTable)) == null ? void 0 : _Od.away) == null ? void 0 : _Pd.home_points)}</td><td class="red" data-v-340f6857>${ssrInterpolate((_Rd = (_Qd = unref(standingsTable)) == null ? void 0 : _Qd.away) == null ? void 0 : _Rd.home_position)}</td><td data-v-340f6857>${ssrInterpolate(((_Td = (_Sd = unref(standingsTable)) == null ? void 0 : _Sd.away) == null ? void 0 : _Td.home_total) > 0 ? (((_Vd = (_Ud = unref(standingsTable)) == null ? void 0 : _Ud.away) == null ? void 0 : _Vd.home_won) * 100 / ((_Xd = (_Wd = unref(standingsTable)) == null ? void 0 : _Wd.away) == null ? void 0 : _Xd.home_total)).toFixed(1) : "")}%</td></tr><tr data-v-340f6857><td data-v-340f6857>${ssrInterpolate((_Zd = (_Yd = unref(standingsTable)) == null ? void 0 : _Yd.away) == null ? void 0 : _Zd.away_total)}</td><td data-v-340f6857>${ssrInterpolate((_$d = (__d = unref(standingsTable)) == null ? void 0 : __d.away) == null ? void 0 : _$d.away_won)}</td><td data-v-340f6857>${ssrInterpolate((_be = (_ae = unref(standingsTable)) == null ? void 0 : _ae.away) == null ? void 0 : _be.away_draw)}</td><td data-v-340f6857>${ssrInterpolate((_de = (_ce = unref(standingsTable)) == null ? void 0 : _ce.away) == null ? void 0 : _de.away_loss)}</td><td data-v-340f6857>${ssrInterpolate((_fe = (_ee = unref(standingsTable)) == null ? void 0 : _ee.away) == null ? void 0 : _fe.away_goals)}</td><td data-v-340f6857>${ssrInterpolate((_he = (_ge = unref(standingsTable)) == null ? void 0 : _ge.away) == null ? void 0 : _he.away_goals_against)}</td><td class="red" data-v-340f6857>${ssrInterpolate((_je = (_ie = unref(standingsTable)) == null ? void 0 : _ie.away) == null ? void 0 : _je.away_points)}</td><td class="red" data-v-340f6857>${ssrInterpolate((_le = (_ke = unref(standingsTable)) == null ? void 0 : _ke.away) == null ? void 0 : _le.away_position)}</td><td data-v-340f6857>${ssrInterpolate(((_ne = (_me = unref(standingsTable)) == null ? void 0 : _me.away) == null ? void 0 : _ne.away_total) > 0 ? (((_pe = (_oe = unref(standingsTable)) == null ? void 0 : _oe.away) == null ? void 0 : _pe.away_won) * 100 / ((_re = (_qe = unref(standingsTable)) == null ? void 0 : _qe.away) == null ? void 0 : _re.away_total)).toFixed(1) : "")}%</td></tr><tr data-v-340f6857><td data-v-340f6857>${ssrInterpolate((_ue = (_te = (_se = unref(standingsTable)) == null ? void 0 : _se.away) == null ? void 0 : _te.lastest) == null ? void 0 : _ue[0])}</td><td data-v-340f6857>${ssrInterpolate((_xe = (_we = (_ve = unref(standingsTable)) == null ? void 0 : _ve.away) == null ? void 0 : _we.lastest) == null ? void 0 : _xe[1])}</td><td data-v-340f6857>${ssrInterpolate((_Ae = (_ze = (_ye = unref(standingsTable)) == null ? void 0 : _ye.away) == null ? void 0 : _ze.lastest) == null ? void 0 : _Ae[2])}</td><td data-v-340f6857>${ssrInterpolate((_De = (_Ce = (_Be = unref(standingsTable)) == null ? void 0 : _Be.away) == null ? void 0 : _Ce.lastest) == null ? void 0 : _De[3])}</td><td data-v-340f6857>${ssrInterpolate((_Ge = (_Fe = (_Ee = unref(standingsTable)) == null ? void 0 : _Ee.away) == null ? void 0 : _Fe.lastest) == null ? void 0 : _Ge[4])}</td><td data-v-340f6857>${ssrInterpolate((_Je = (_Ie = (_He = unref(standingsTable)) == null ? void 0 : _He.away) == null ? void 0 : _Ie.lastest) == null ? void 0 : _Je[5])}</td><td class="red" data-v-340f6857>${ssrInterpolate((_Me = (_Le = (_Ke = unref(standingsTable)) == null ? void 0 : _Ke.away) == null ? void 0 : _Le.lastest) == null ? void 0 : _Me[6])}</td><td data-v-340f6857></td><td data-v-340f6857>${ssrInterpolate((_Pe = (_Oe = (_Ne = unref(standingsTable)) == null ? void 0 : _Ne.away) == null ? void 0 : _Oe.lastest) == null ? void 0 : _Pe[7])}%</td></tr></tbody></table></div></div></div></div></div></div><div class="porletP" id="porletP5" style="${ssrRenderStyle([
        ((_Re = (_Qe = unref(settingsH2hList)) == null ? void 0 : _Qe.find((item) => (item == null ? void 0 : item.div_id) === "porletP5")) == null ? void 0 : _Re.show) === true ? null : { display: "none" },
        "order: " + ((_Te = (_Se = unref(settingsH2hList)) == null ? void 0 : _Se.find((item) => (item == null ? void 0 : item.div_id) === "porletP5")) == null ? void 0 : _Te.order)
      ])}" data-v-340f6857><div data-v-340f6857><h2 class="team-table-title" data-v-340f6857>${ssrInterpolate(unref($t)("Head to head record"))}</h2><table id="table_v3" width="100%" cellpadding="0" cellspacing="0" class="table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr class="other-title" data-v-340f6857><td colspan="16" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_We = (_Ve = (_Ue = unref(matchLiveDetail)) == null ? void 0 : _Ue.match) == null ? void 0 : _Ve.home_team) == null ? void 0 : _We.name)}</span> \xA0\xA0 <input type="checkbox" id="cb_sos3"${ssrIncludeBooleanAttr(Array.isArray(unref(cb_sos3)) ? ssrLooseContain(unref(cb_sos3), null) : unref(cb_sos3)) ? " checked" : ""} data-v-340f6857><label for="cb_sos3" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</label>\xA0\xA0 <input type="checkbox" id="checkboxleague3" value="2" name="checkboxleague3"${ssrIncludeBooleanAttr(Array.isArray(unref(checkboxleague3)) ? ssrLooseContain(unref(checkboxleague3), "2") : unref(checkboxleague3)) ? " checked" : ""} data-v-340f6857><label for="checkboxleague3" data-v-340f6857>${ssrInterpolate(unref($t)("Similar tournaments"))}</label>\xA0\xA0 <input type="checkbox" id="ftType_3" disabled data-v-340f6857><label for="ftType_3"${ssrRenderAttr("title", unref($t)("Haft time"))} data-v-340f6857>HT</label>\xA0\xA0 <select id="selectMatchCount3" class="countSelect" data-v-340f6857><!--[-->`);
      ssrRenderList("MATCH_LIST_OPTION" in _ctx ? _ctx.MATCH_LIST_OPTION : unref(MATCH_LIST_OPTION), (item) => {
        _push(`<option${ssrRenderAttr("value", item == null ? void 0 : item.key)} data-v-340f6857>${ssrInterpolate(unref($t)(item == null ? void 0 : item.value))}${ssrInterpolate(unref($t)("Recent last"))}</option>`);
      });
      _push(`<!--]--></select></td></tr></tbody></table><div class="rankbox" data-v-340f6857><table class="eTable adaptMt team-table-home table-no-db-lr" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-340f6857><tbody data-v-340f6857><tr class="bd-l" data-v-340f6857><th width="" rowspan="2" data-v-340f6857>${ssrInterpolate(unref($t)("Home - Away"))}</th></tr><tr class="bd-l" data-v-340f6857><th data-v-340f6857></th></tr><!--[-->`);
      ssrRenderList((_Ze = (_Ye = (_Xe = unref(matchesAnalysis)) == null ? void 0 : _Xe.head_to_head) == null ? void 0 : _Ye.filter((match) => {
        var _a32, _b32, _c22;
        return unref(cb_sos3) ? ((_c22 = (_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.home_team) == null ? void 0 : _c22.i_team) == (match == null ? void 0 : match[5]) : match;
      })) == null ? void 0 : _Ze.filter((match) => {
        var _a32, _b32;
        return unref(checkboxleague3) ? ((_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.i_competition_id) == (match == null ? void 0 : match[2]) : match;
      }), (item, index) => {
        var _a32, _b32, _c22, _d22, _e22, _f22;
        _push(`<!--[-->`);
        if (index < unref(selectMatchCount3)) {
          _push(`<tr vs="0" name="2" class="bd-l bd-b" data-v-340f6857><td data-v-340f6857><span class="home lRow draw" data-v-340f6857><a href="" data-v-340f6857><span class="${ssrRenderClass(((_c22 = (_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.home_team) == null ? void 0 : _c22.i_team) == (item == null ? void 0 : item[5]) ? "team-home-f" : "")}" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[4])}</span></a></span><span class="guest lRow" data-v-340f6857><a href="" data-v-340f6857><span class="${ssrRenderClass(((_f22 = (_e22 = (_d22 = unref(matchLiveDetail)) == null ? void 0 : _d22.match) == null ? void 0 : _e22.home_team) == null ? void 0 : _f22.i_team) == (item == null ? void 0 : item[7]) ? "team-home-f" : "")}" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[6])}</span></a></span></td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata" width="75%" data-v-340f6857><table class="eTable adaptMt team-table-home table-no-db-lr" cellspacing="0" cellpadding="0" width="100%" data-v-340f6857><tbody data-v-340f6857><tr data-v-340f6857><th width="" rowspan="2" data-v-340f6857>${ssrInterpolate(unref($t)("League"))}</th><th width="" rowspan="2" data-v-340f6857>${ssrInterpolate(unref($t)("Day"))}</th><th width="" rowspan="2" id="FScore_1" data-v-340f6857>${ssrInterpolate(unref($t)("Score"))}</th><th width="" rowspan="2" id="FCorner_1" data-v-340f6857>${ssrInterpolate(unref($t)("Corner kick"))}</th><th width="" colspan="4" class="table-bd-lr" data-v-340f6857><p class="d-flex justify-content-center" data-v-340f6857><select id="sSelect_1" disabled data-v-340f6857><option value="281" data-v-340f6857>Bet365</option><option value="474" data-v-340f6857>Sbobet</option><option value="18" data-v-340f6857>12Bet</option><option value="545" selected data-v-340f6857>Crown</option><option value="0" data-v-340f6857>1x2</option><option value="90" data-v-340f6857>Easybet </option><option value="115" data-v-340f6857>William Hill</option><option value="80" data-v-340f6857>Macauslot</option><option value="82" data-v-340f6857>Ladbrokes</option></select><select id="sType_1" disabled data-v-340f6857><option value="0" data-v-340f6857>${ssrInterpolate(unref($t)("First"))}</option><option value="1" selected data-v-340f6857>${ssrInterpolate(unref($t)("Last"))}</option></select></p></th><th width="" colspan="4" class="table-bd-lr" data-v-340f6857><p class="d-flex justify-content-center" data-v-340f6857><select id="hSelect_1" disabled data-v-340f6857><option value="8" data-v-340f6857>Bet365</option><option value="31" data-v-340f6857>Sbobet</option><option value="24" data-v-340f6857>12bet</option><option value="3" selected data-v-340f6857>Crown</option><option value="12" data-v-340f6857>Easybets</option></select><select id="hType_1" disabled data-v-340f6857><option value="0" data-v-340f6857>${ssrInterpolate(unref($t)("First"))}</option><option value="1" selected data-v-340f6857>${ssrInterpolate(unref($t)("Last"))}</option></select></p></th><th width="" class="rl ll" rowspan="2" data-v-340f6857>${ssrInterpolate(unref($t)("T/X"))}</th></tr><tr data-v-340f6857><th class="table-bd-l"${ssrRenderAttr("title", unref($t)("Home win"))} data-v-340f6857>${ssrInterpolate(unref($t)("HW"))}</th><th${ssrRenderAttr("title", unref($t)("Draw"))} data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th${ssrRenderAttr("title", unref($t)("Away win"))} data-v-340f6857>${ssrInterpolate(unref($t)("AW"))}</th><th class="table-bd-r"${ssrRenderAttr("title", unref($t)("Win/Loss"))} data-v-340f6857>${ssrInterpolate(unref($t)("W/L"))}</th><th class="table-bd-l"${ssrRenderAttr("title", unref($t)("Home"))} data-v-340f6857>${ssrInterpolate(unref($t)("H"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("AH"))}</th><th title="$t(&#39;Away&#39;)" data-v-340f6857>${ssrInterpolate(unref($t)("A"))}</th><th class="table-bd-r" data-v-340f6857>${ssrInterpolate(unref($t)("AH"))}</th></tr><!--[-->`);
      ssrRenderList((_af = (_$e = (__e = unref(matchesAnalysis)) == null ? void 0 : __e.head_to_head) == null ? void 0 : _$e.filter((match) => {
        var _a32, _b32, _c22;
        return unref(cb_sos3) ? ((_c22 = (_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.home_team) == null ? void 0 : _c22.i_team) == (match == null ? void 0 : match[5]) : match;
      })) == null ? void 0 : _af.filter((match) => {
        var _a32, _b32;
        return unref(checkboxleague3) ? ((_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.i_competition_id) == (match == null ? void 0 : match[2]) : match;
      }), (item, index) => {
        var _a4, _b4, _c3, _d3, _e3;
        var _a32, _b32, _c22, _d22, _e22, _f22, _g22, _h22, _i22, _j22, _k22, _l22;
        _push(`<!--[-->`);
        if (index < unref(selectMatchCount3)) {
          _push(`<tr vs="0" name="2" data-v-340f6857><td height="25"${ssrRenderAttr("title", item == null ? void 0 : item[1])} data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[1])}</td><td data-v-340f6857><span name="timeData" data-tf="3" data-v-340f6857>${ssrInterpolate(("timeStamp2DateUTCTimeZone" in _ctx ? _ctx.timeStamp2DateUTCTimeZone : unref(timeStamp2DateUTCTimeZone))(item == null ? void 0 : item[3], "DD-MM-YY", unref(timeZone)))}</span></td><td data-v-340f6857><span class="fscore_3 red2" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[8])} - ${ssrInterpolate(item == null ? void 0 : item[9])}</span><br data-v-340f6857><span class="hscore_3" data-v-340f6857> (${ssrInterpolate(item == null ? void 0 : item[10])} - ${ssrInterpolate(item == null ? void 0 : item[11])})</span></td><td data-v-340f6857><span class="fcorner_3" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[14])} - ${ssrInterpolate(item == null ? void 0 : item[15])}</span><span class="hcorner_3" data-v-340f6857></span></td><td class="hbg-td1" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[22])}</td><td class="hbg-td1" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[23])}</td><td class="hbg-td1" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[24])}</td>`);
          if (((_c22 = (_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.home_team) == null ? void 0 : _c22.i_team) == (item == null ? void 0 : item[5])) {
            _push(`<td data-v-340f6857>${(_a4 = ("getH2HOddEU" in _ctx ? _ctx.getH2HOddEU : unref(getH2HOddEU))(item == null ? void 0 : item[8], item == null ? void 0 : item[9], unref($t))) != null ? _a4 : ""}</td>`);
          } else if (((_f22 = (_e22 = (_d22 = unref(matchLiveDetail)) == null ? void 0 : _d22.match) == null ? void 0 : _e22.home_team) == null ? void 0 : _f22.i_team) == (item == null ? void 0 : item[7])) {
            _push(`<td data-v-340f6857>${(_b4 = ("getH2HOddEU" in _ctx ? _ctx.getH2HOddEU : unref(getH2HOddEU))(item == null ? void 0 : item[9], item == null ? void 0 : item[8], unref($t))) != null ? _b4 : ""}</td>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<td data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[16])}</td><td data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[17])}</td><td data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[18])}</td>`);
          if (((_i22 = (_h22 = (_g22 = unref(matchLiveDetail)) == null ? void 0 : _g22.match) == null ? void 0 : _h22.home_team) == null ? void 0 : _i22.i_team) == (item == null ? void 0 : item[5])) {
            _push(`<td data-v-340f6857>${(_c3 = ("getH2HOddHadicap" in _ctx ? _ctx.getH2HOddHadicap : unref(getH2HOddHadicap))(item == null ? void 0 : item[8], item == null ? void 0 : item[9], item == null ? void 0 : item[17], unref($t))) != null ? _c3 : ""}</td>`);
          } else if (((_l22 = (_k22 = (_j22 = unref(matchLiveDetail)) == null ? void 0 : _j22.match) == null ? void 0 : _k22.home_team) == null ? void 0 : _l22.i_team) == (item == null ? void 0 : item[7])) {
            _push(`<td data-v-340f6857>${(_d3 = ("getH2HOddHadicap" in _ctx ? _ctx.getH2HOddHadicap : unref(getH2HOddHadicap))(item == null ? void 0 : item[9], item == null ? void 0 : item[8], item == null ? void 0 : item[17], unref($t))) != null ? _d3 : ""}</td>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<td data-v-340f6857>${(_e3 = ("getH2HOddTX" in _ctx ? _ctx.getH2HOddTX : unref(getH2HOddTX))(item == null ? void 0 : item[8], item == null ? void 0 : item[9], item == null ? void 0 : item[29], unref($t))) != null ? _e3 : ""}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></tbody></table></div></div><p class="text-center mt-2" data-v-340f6857>${(_a3 = ("getH2HStatistics" in _ctx ? _ctx.getH2HStatistics : unref(getH2HStatistics))((_cf = (_bf = unref(matchesAnalysis)) == null ? void 0 : _bf.head_to_head) == null ? void 0 : _cf.filter((match) => {
        var _a32, _b32;
        return unref(checkboxleague3) ? ((_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.i_competition_id) == (match == null ? void 0 : match[2]) : match;
      }), unref(selectMatchCount3), (_ff = (_ef = (_df = unref(matchLiveDetail)) == null ? void 0 : _df.match) == null ? void 0 : _ef.home_team) == null ? void 0 : _ff.i_team, unref(cb_sos3), true, unref($t))) != null ? _a3 : ""}</p></div></div><div class="porletP" id="porletP6" style="${ssrRenderStyle([
        ((_hf = (_gf = unref(settingsH2hList)) == null ? void 0 : _gf.find((item) => (item == null ? void 0 : item.div_id) === "porletP6")) == null ? void 0 : _hf.show) === true ? null : { display: "none" },
        "order: " + ((_jf = (_if = unref(settingsH2hList)) == null ? void 0 : _if.find((item) => (item == null ? void 0 : item.div_id) === "porletP6")) == null ? void 0 : _jf.order)
      ])}" data-v-340f6857><div data-v-340f6857><h2 class="team-table-title" data-v-340f6857>${ssrInterpolate(unref($t)("Recent achievements"))}</h2><table id="table_v1" width="100%" cellpadding="0" cellspacing="0" class="team-table-home table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr class="team-home" data-v-340f6857><td colspan="16" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_mf = (_lf = (_kf = unref(matchLiveDetail)) == null ? void 0 : _kf.match) == null ? void 0 : _lf.home_team) == null ? void 0 : _mf.name)}</span> \xA0\xA0 <input type="checkbox" id="cb_sos1"${ssrIncludeBooleanAttr(Array.isArray(unref(cb_sos1)) ? ssrLooseContain(unref(cb_sos1), null) : unref(cb_sos1)) ? " checked" : ""} data-v-340f6857><label for="cb_sos1" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</label> \xA0\xA0 <input type="checkbox" id="checkboxleague1" value="2" name="checkboxleague1"${ssrIncludeBooleanAttr(Array.isArray(unref(checkboxleague1)) ? ssrLooseContain(unref(checkboxleague1), "2") : unref(checkboxleague1)) ? " checked" : ""} data-v-340f6857><label for="checkboxleague1" data-v-340f6857>${ssrInterpolate(unref($t)("Similar tournaments"))}</label> \xA0\xA0 <input type="checkbox" id="ftType_1" disabled data-v-340f6857> <label for="ftType_1" data-v-340f6857>HT</label>\xA0\xA0 <select id="selectMatchCount1" class="countSelect" data-v-340f6857><!--[-->`);
      ssrRenderList("MATCH_LIST_OPTION" in _ctx ? _ctx.MATCH_LIST_OPTION : unref(MATCH_LIST_OPTION), (item) => {
        _push(`<option${ssrRenderAttr("value", item == null ? void 0 : item.key)} data-v-340f6857>${ssrInterpolate(unref($t)(item == null ? void 0 : item.value))}${ssrInterpolate(unref($t)("Recent last"))}</option>`);
      });
      _push(`<!--]--></select></td></tr></tbody></table><div class="rankbox" data-v-340f6857><table class="eTable adaptMt team-table-home table-no-db-lr" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-340f6857><tbody data-v-340f6857><tr class="bd-l" data-v-340f6857><th width="" rowspan="2" class="toolbox" data-v-340f6857>${ssrInterpolate(unref($t)("Home - Away"))}</th></tr><tr class="bd-l" data-v-340f6857><th class="toolbox" data-v-340f6857></th></tr><!--[-->`);
      ssrRenderList((_pf = (_of = (_nf = unref(matchesAnalysis)) == null ? void 0 : _nf.home_last_matches) == null ? void 0 : _of.filter((match) => {
        var _a32, _b32, _c22;
        return unref(cb_sos1) ? ((_c22 = (_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.home_team) == null ? void 0 : _c22.i_team) == (match == null ? void 0 : match[5]) : match;
      })) == null ? void 0 : _pf.filter((match) => {
        var _a32, _b32;
        return unref(checkboxleague1) ? ((_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.i_competition_id) == (match == null ? void 0 : match[2]) : match;
      }), (item, index) => {
        var _a32, _b32, _c22, _d22, _e22, _f22;
        _push(`<!--[-->`);
        if (index < unref(selectMatchCount1)) {
          _push(`<tr vs="0" name="2" class="bd-l bd-b" data-v-340f6857><td data-v-340f6857><a href="" data-v-340f6857><span class="${ssrRenderClass([((_c22 = (_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.home_team) == null ? void 0 : _c22.i_team) == (item == null ? void 0 : item[5]) ? "team-home-f" : "", "home lRow draw"])}" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[4])}</span></a><a href="" data-v-340f6857><span class="${ssrRenderClass([((_f22 = (_e22 = (_d22 = unref(matchLiveDetail)) == null ? void 0 : _d22.match) == null ? void 0 : _e22.home_team) == null ? void 0 : _f22.i_team) == (item == null ? void 0 : item[7]) ? "team-home-f" : "", "lRow"])}" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[6])}</span></a></td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata" width="75%" data-v-340f6857><table class="eTable adaptMt team-table-home table-no-db-lr" cellspacing="0" cellpadding="0" width="100%" data-v-340f6857><tbody data-v-340f6857><tr data-v-340f6857><th width="" rowspan="2" class="toolbox" data-v-340f6857>${ssrInterpolate(unref($t)("League"))}</th><th width="" rowspan="2" class="toolbox" data-v-340f6857>${ssrInterpolate(unref($t)("Day"))}</th><th width="" rowspan="2" id="FScore_1" class="toolbox" data-v-340f6857>${ssrInterpolate(unref($t)("Score"))}</th><th width="" rowspan="2" id="FCorner_1" class="toolbox" data-v-340f6857>${ssrInterpolate(unref($t)("Corner kick"))}</th><th width="" colspan="4" class="table-bd-lr toolbox" data-v-340f6857><p class="d-flex justify-content-center" data-v-340f6857><select id="sSelect_1" disabled data-v-340f6857><option value="281" data-v-340f6857>Bet365</option><option value="474" data-v-340f6857>Sbobet</option><option value="18" data-v-340f6857>12Bet</option><option value="545" selected data-v-340f6857>Crown</option><option value="0" data-v-340f6857>1x2</option><option value="90" data-v-340f6857>Easybet </option><option value="115" data-v-340f6857>William Hill</option><option value="80" data-v-340f6857>Macauslot</option><option value="82" data-v-340f6857>Ladbrokes</option></select><select id="sType_1" disabled data-v-340f6857><option value="0" data-v-340f6857>${ssrInterpolate(unref($t)("First"))}</option><option value="1" selected data-v-340f6857>${ssrInterpolate(unref($t)("Last"))}</option></select></p></th><th width="" colspan="4" class="table-bd-lr toolbox" data-v-340f6857><p class="d-flex justify-content-center" data-v-340f6857><select id="hSelect_1" disabled data-v-340f6857><option value="8" data-v-340f6857>Bet365</option><option value="31" data-v-340f6857>Sbobet</option><option value="24" data-v-340f6857>12bet</option><option value="3" selected data-v-340f6857>Crown</option><option value="12" data-v-340f6857>Easybets</option></select><select id="hType_1" disabled data-v-340f6857><option value="0" data-v-340f6857>${ssrInterpolate(unref($t)("First"))}</option><option value="1" selected data-v-340f6857>${ssrInterpolate(unref($t)("Last"))}</option></select></p></th><th width="" class="rl ll toolbox" rowspan="2" data-v-340f6857>${ssrInterpolate(unref($t)("T/X"))}</th></tr><tr data-v-340f6857><th class="table-bd-l"${ssrRenderAttr("title", unref($t)("Home win"))} data-v-340f6857>${ssrInterpolate(unref($t)("HW"))}</th><th${ssrRenderAttr("title", unref($t)("Draw"))} data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th${ssrRenderAttr("title", unref($t)("Away win"))} data-v-340f6857>${ssrInterpolate(unref($t)("AW"))}</th><th class="table-bd-r"${ssrRenderAttr("title", unref($t)("Win/Loss"))} data-v-340f6857>${ssrInterpolate(unref($t)("W/L"))}</th><th class="table-bd-l"${ssrRenderAttr("title", unref($t)("Home"))} data-v-340f6857>${ssrInterpolate(unref($t)("H"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("AH"))}</th><th title="$t(&#39;Away&#39;)" data-v-340f6857>${ssrInterpolate(unref($t)("A"))}</th><th class="table-bd-r" data-v-340f6857>${ssrInterpolate(unref($t)("AH"))}</th></tr><!--[-->`);
      ssrRenderList((_sf = (_rf = (_qf = unref(matchesAnalysis)) == null ? void 0 : _qf.home_last_matches) == null ? void 0 : _rf.filter((match) => {
        var _a32, _b32, _c22;
        return unref(cb_sos1) ? ((_c22 = (_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.home_team) == null ? void 0 : _c22.i_team) == (match == null ? void 0 : match[5]) : match;
      })) == null ? void 0 : _sf.filter((match) => {
        var _a32, _b32;
        return unref(checkboxleague1) ? ((_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.i_competition_id) == (match == null ? void 0 : match[2]) : match;
      }), (item, index) => {
        var _a4, _b4, _c3, _d3, _e3;
        var _a32, _b32, _c22, _d22, _e22, _f22, _g22, _h22, _i22, _j22, _k22, _l22;
        _push(`<!--[-->`);
        if (index < unref(selectMatchCount1)) {
          _push(`<tr vs="0" name="2" data-v-340f6857><td height="25"${ssrRenderAttr("title", item == null ? void 0 : item[1])} data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[1])}</td><td data-v-340f6857><span name="timeData" data-tf="3" data-v-340f6857>${ssrInterpolate(("timeStamp2DateUTCTimeZone" in _ctx ? _ctx.timeStamp2DateUTCTimeZone : unref(timeStamp2DateUTCTimeZone))(item == null ? void 0 : item[3], "DD-MM-YY", unref(timeZone)))}</span></td><td data-v-340f6857><span class="fscore_3 red2" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[8])} - ${ssrInterpolate(item == null ? void 0 : item[9])}</span><br data-v-340f6857><span class="hscore_3" data-v-340f6857> (${ssrInterpolate(item == null ? void 0 : item[10])} - ${ssrInterpolate(item == null ? void 0 : item[11])})</span></td><td data-v-340f6857><span class="fcorner_3" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[14])} - ${ssrInterpolate(item == null ? void 0 : item[15])}</span><span class="hcorner_3" data-v-340f6857></span></td><td class="hbg-td1" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[22])}</td><td class="hbg-td1" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[23])}</td><td class="hbg-td1" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[24])}</td>`);
          if (((_c22 = (_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.home_team) == null ? void 0 : _c22.i_team) == (item == null ? void 0 : item[5])) {
            _push(`<td data-v-340f6857>${(_a4 = ("getH2HOddEU" in _ctx ? _ctx.getH2HOddEU : unref(getH2HOddEU))(item == null ? void 0 : item[8], item == null ? void 0 : item[9], unref($t))) != null ? _a4 : ""}</td>`);
          } else if (((_f22 = (_e22 = (_d22 = unref(matchLiveDetail)) == null ? void 0 : _d22.match) == null ? void 0 : _e22.home_team) == null ? void 0 : _f22.i_team) == (item == null ? void 0 : item[7])) {
            _push(`<td data-v-340f6857>${(_b4 = ("getH2HOddEU" in _ctx ? _ctx.getH2HOddEU : unref(getH2HOddEU))(item == null ? void 0 : item[9], item == null ? void 0 : item[8], unref($t))) != null ? _b4 : ""}</td>`);
          } else {
            _push(`<td class="hbg-td1" data-v-340f6857></td>`);
          }
          _push(`<td data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[16])}</td><td data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[17])}</td><td data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[18])}</td>`);
          if (((_i22 = (_h22 = (_g22 = unref(matchLiveDetail)) == null ? void 0 : _g22.match) == null ? void 0 : _h22.home_team) == null ? void 0 : _i22.i_team) == (item == null ? void 0 : item[5])) {
            _push(`<td data-v-340f6857>${(_c3 = ("getH2HOddHadicap" in _ctx ? _ctx.getH2HOddHadicap : unref(getH2HOddHadicap))(item == null ? void 0 : item[8], item == null ? void 0 : item[9], item == null ? void 0 : item[17], unref($t))) != null ? _c3 : ""}</td>`);
          } else if (((_l22 = (_k22 = (_j22 = unref(matchLiveDetail)) == null ? void 0 : _j22.match) == null ? void 0 : _k22.home_team) == null ? void 0 : _l22.i_team) == (item == null ? void 0 : item[7])) {
            _push(`<td data-v-340f6857>${(_d3 = ("getH2HOddHadicap" in _ctx ? _ctx.getH2HOddHadicap : unref(getH2HOddHadicap))(item == null ? void 0 : item[9], item == null ? void 0 : item[8], item == null ? void 0 : item[17], unref($t))) != null ? _d3 : ""}</td>`);
          } else {
            _push(`<td class="hbg-td1" data-v-340f6857></td>`);
          }
          _push(`<td data-v-340f6857>${(_e3 = ("getH2HOddTX" in _ctx ? _ctx.getH2HOddTX : unref(getH2HOddTX))(item == null ? void 0 : item[8], item == null ? void 0 : item[9], item == null ? void 0 : item[29], unref($t))) != null ? _e3 : ""}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></tbody></table></div></div><p class="text-center mt-2" data-v-340f6857>${(_b3 = ("getH2HStatistics" in _ctx ? _ctx.getH2HStatistics : unref(getH2HStatistics))((_uf = (_tf = unref(matchesAnalysis)) == null ? void 0 : _tf.home_last_matches) == null ? void 0 : _uf.filter((match) => {
        var _a32, _b32;
        return unref(checkboxleague1) ? ((_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.i_competition_id) == (match == null ? void 0 : match[2]) : match;
      }), unref(selectMatchCount1), (_xf = (_wf = (_vf = unref(matchLiveDetail)) == null ? void 0 : _vf.match) == null ? void 0 : _wf.home_team) == null ? void 0 : _xf.i_team, unref(cb_sos1), true, unref($t))) != null ? _b3 : ""}</p></div><div data-v-340f6857><table id="table_v2" width="100%" cellpadding="0" cellspacing="0" class="team-table-guest table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr class="team-guest" data-v-340f6857><td colspan="16" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_Af = (_zf = (_yf = unref(matchLiveDetail)) == null ? void 0 : _yf.match) == null ? void 0 : _zf.away_team) == null ? void 0 : _Af.name)}</span> \xA0\xA0 <input type="checkbox" id="cb_sos2"${ssrIncludeBooleanAttr(Array.isArray(unref(cb_sos2)) ? ssrLooseContain(unref(cb_sos2), null) : unref(cb_sos2)) ? " checked" : ""} data-v-340f6857><label for="cb_sos2" data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</label> \xA0\xA0 <input type="checkbox" id="checkboxleague2" value="2" name="checkboxleague2"${ssrIncludeBooleanAttr(Array.isArray(unref(checkboxleague2)) ? ssrLooseContain(unref(checkboxleague2), "2") : unref(checkboxleague2)) ? " checked" : ""} data-v-340f6857> <label for="checkboxleague2" data-v-340f6857>${ssrInterpolate(unref($t)("Similar tournaments"))}</label> \xA0\xA0 <input type="checkbox" id="ftType_2" disabled data-v-340f6857><label for="ftType_2" data-v-340f6857>HT</label> \xA0\xA0 <select id="selectMatchCount2" class="countSelect" data-v-340f6857><!--[-->`);
      ssrRenderList("MATCH_LIST_OPTION" in _ctx ? _ctx.MATCH_LIST_OPTION : unref(MATCH_LIST_OPTION), (item) => {
        _push(`<option${ssrRenderAttr("value", item == null ? void 0 : item.key)} data-v-340f6857>${ssrInterpolate(unref($t)(item == null ? void 0 : item.value))}${ssrInterpolate(unref($t)("Recent last"))}</option>`);
      });
      _push(`<!--]--></select></td></tr></tbody></table><div class="rankbox" data-v-340f6857><table class="eTable adaptMt team-table-home table-no-db-lr" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-340f6857><tbody data-v-340f6857><tr class="bd-l" data-v-340f6857><th width="" rowspan="2" class="toolbox" data-v-340f6857>${ssrInterpolate(unref($t)("Home - Away"))}</th></tr><tr class="bd-l" data-v-340f6857><th class="toolbox" data-v-340f6857></th></tr><!--[-->`);
      ssrRenderList((_Df = (_Cf = (_Bf = unref(matchesAnalysis)) == null ? void 0 : _Bf.away_last_matches) == null ? void 0 : _Cf.filter((match) => {
        var _a32, _b32, _c22;
        return unref(cb_sos2) ? ((_c22 = (_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.away_team) == null ? void 0 : _c22.i_team) == (match == null ? void 0 : match[7]) : match;
      })) == null ? void 0 : _Df.filter((match) => {
        var _a32, _b32;
        return unref(checkboxleague2) ? ((_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.i_competition_id) == (match == null ? void 0 : match[2]) : match;
      }), (item, index) => {
        var _a32, _b32, _c22, _d22, _e22, _f22;
        _push(`<!--[-->`);
        if (index < unref(selectMatchCount2)) {
          _push(`<tr vs="0" name="2" class="bd-l bd-b" data-v-340f6857><td data-v-340f6857><a href="" data-v-340f6857><span class="${ssrRenderClass([((_c22 = (_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.away_team) == null ? void 0 : _c22.i_team) == (item == null ? void 0 : item[5]) ? "team-away-f" : "", "away lRow draw"])}" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[4])}</span></a><a href="" data-v-340f6857><span class="${ssrRenderClass([((_f22 = (_e22 = (_d22 = unref(matchLiveDetail)) == null ? void 0 : _d22.match) == null ? void 0 : _e22.away_team) == null ? void 0 : _f22.i_team) == (item == null ? void 0 : item[7]) ? "team-away-f" : "", "lRow"])}" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[6])}</span></a></td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata" width="75%" data-v-340f6857><table class="eTable adaptMt team-table-home table-no-db-lr" cellspacing="0" cellpadding="0" width="100%" data-v-340f6857><tbody data-v-340f6857><tr data-v-340f6857><th width="" rowspan="2" class="toolbox" data-v-340f6857>${ssrInterpolate(unref($t)("League"))}</th><th width="" rowspan="2" class="toolbox" data-v-340f6857>${ssrInterpolate(unref($t)("Day"))}</th><th width="" rowspan="2" id="FScore_1" class="toolbox" data-v-340f6857>${ssrInterpolate(unref($t)("Score"))}</th><th width="" rowspan="2" id="FCorner_1" class="toolbox" data-v-340f6857>${ssrInterpolate(unref($t)("Corner kick"))}</th><th width="" colspan="4" class="table-bd-lr toolbox" data-v-340f6857><p class="d-flex justify-content-center" data-v-340f6857><select id="sSelect_1" disabled data-v-340f6857><option value="281" data-v-340f6857>Bet365</option><option value="474" data-v-340f6857>Sbobet</option><option value="18" data-v-340f6857>12Bet</option><option value="545" selected data-v-340f6857>Crown</option><option value="0" data-v-340f6857>1x2</option><option value="90" data-v-340f6857>Easybet </option><option value="115" data-v-340f6857>William Hill</option><option value="80" data-v-340f6857>Macauslot</option><option value="82" data-v-340f6857>Ladbrokes</option></select><select id="sType_1" disabled data-v-340f6857><option value="0" data-v-340f6857>${ssrInterpolate(unref($t)("First"))}</option><option value="1" selected data-v-340f6857>${ssrInterpolate(unref($t)("Last"))}</option></select></p></th><th width="" colspan="4" class="table-bd-lr toolbox" data-v-340f6857><p class="d-flex justify-content-center" data-v-340f6857><select id="hSelect_1" disabled data-v-340f6857><option value="8" data-v-340f6857>Bet365</option><option value="31" data-v-340f6857>Sbobet</option><option value="24" data-v-340f6857>12bet</option><option value="3" selected data-v-340f6857>Crown</option><option value="12" data-v-340f6857>Easybets</option></select><select id="hType_1" disabled data-v-340f6857><option value="0" data-v-340f6857>${ssrInterpolate(unref($t)("First"))}</option><option value="1" selected data-v-340f6857>${ssrInterpolate(unref($t)("Last"))}</option></select></p></th><th width="" class="rl ll toolbox" rowspan="2" data-v-340f6857>${ssrInterpolate(unref($t)("T/X"))}</th></tr><tr data-v-340f6857><th class="table-bd-l"${ssrRenderAttr("title", unref($t)("Home win"))} data-v-340f6857>${ssrInterpolate(unref($t)("HW"))}</th><th${ssrRenderAttr("title", unref($t)("Draw"))} data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th${ssrRenderAttr("title", unref($t)("Away win"))} data-v-340f6857>${ssrInterpolate(unref($t)("AW"))}</th><th class="table-bd-r"${ssrRenderAttr("title", unref($t)("Win/Loss"))} data-v-340f6857>${ssrInterpolate(unref($t)("W/L"))}</th><th class="table-bd-l"${ssrRenderAttr("title", unref($t)("Home"))} data-v-340f6857>${ssrInterpolate(unref($t)("H"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("AH"))}</th><th title="$t(&#39;Away&#39;)" data-v-340f6857>${ssrInterpolate(unref($t)("A"))}</th><th class="table-bd-r" data-v-340f6857>${ssrInterpolate(unref($t)("AH"))}</th></tr><!--[-->`);
      ssrRenderList((_Gf = (_Ff = (_Ef = unref(matchesAnalysis)) == null ? void 0 : _Ef.away_last_matches) == null ? void 0 : _Ff.filter((match) => {
        var _a32, _b32, _c22;
        return unref(cb_sos2) ? ((_c22 = (_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.away_team) == null ? void 0 : _c22.i_team) == (match == null ? void 0 : match[7]) : match;
      })) == null ? void 0 : _Gf.filter((match) => {
        var _a32, _b32;
        return unref(checkboxleague2) ? ((_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.i_competition_id) == (match == null ? void 0 : match[2]) : match;
      }), (item, index) => {
        var _a4, _b4, _c3, _d3, _e3;
        var _a32, _b32, _c22, _d22, _e22, _f22, _g22, _h22, _i22, _j22, _k22, _l22;
        _push(`<!--[-->`);
        if (index < unref(selectMatchCount2)) {
          _push(`<tr vs="0" name="2" data-v-340f6857><td height="25"${ssrRenderAttr("title", item == null ? void 0 : item[1])} data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[1])}</td><td data-v-340f6857><span name="timeData" data-tf="3" data-v-340f6857>${ssrInterpolate(("timeStamp2DateUTCTimeZone" in _ctx ? _ctx.timeStamp2DateUTCTimeZone : unref(timeStamp2DateUTCTimeZone))(item == null ? void 0 : item[3], "DD-MM-YY", unref(timeZone)))}</span></td><td data-v-340f6857><span class="fscore_3 red2" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[8])} - ${ssrInterpolate(item == null ? void 0 : item[9])}</span><br data-v-340f6857><span class="hscore_3" data-v-340f6857> (${ssrInterpolate(item == null ? void 0 : item[10])} - ${ssrInterpolate(item == null ? void 0 : item[11])})</span></td><td data-v-340f6857><span class="fcorner_3" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[14])} - ${ssrInterpolate(item == null ? void 0 : item[15])}</span><span class="hcorner_3" data-v-340f6857></span></td><td class="hbg-td1" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[22])}</td><td class="hbg-td1" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[23])}</td><td class="hbg-td1" data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[24])}</td>`);
          if (((_c22 = (_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.home_team) == null ? void 0 : _c22.i_team) == (item == null ? void 0 : item[5])) {
            _push(`<td data-v-340f6857>${(_a4 = ("getH2HOddEU" in _ctx ? _ctx.getH2HOddEU : unref(getH2HOddEU))(item == null ? void 0 : item[8], item == null ? void 0 : item[9], unref($t))) != null ? _a4 : ""}</td>`);
          } else if (((_f22 = (_e22 = (_d22 = unref(matchLiveDetail)) == null ? void 0 : _d22.match) == null ? void 0 : _e22.home_team) == null ? void 0 : _f22.i_team) == (item == null ? void 0 : item[7])) {
            _push(`<td data-v-340f6857>${(_b4 = ("getH2HOddEU" in _ctx ? _ctx.getH2HOddEU : unref(getH2HOddEU))(item == null ? void 0 : item[9], item == null ? void 0 : item[8], unref($t))) != null ? _b4 : ""}</td>`);
          } else {
            _push(`<td class="hbg-td1" data-v-340f6857></td>`);
          }
          _push(`<td data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[16])}</td><td data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[17])}</td><td data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[18])}</td>`);
          if (((_i22 = (_h22 = (_g22 = unref(matchLiveDetail)) == null ? void 0 : _g22.match) == null ? void 0 : _h22.home_team) == null ? void 0 : _i22.i_team) == (item == null ? void 0 : item[5])) {
            _push(`<td data-v-340f6857>${(_c3 = ("getH2HOddHadicap" in _ctx ? _ctx.getH2HOddHadicap : unref(getH2HOddHadicap))(item == null ? void 0 : item[8], item == null ? void 0 : item[9], item == null ? void 0 : item[17], unref($t))) != null ? _c3 : ""}</td>`);
          } else if (((_l22 = (_k22 = (_j22 = unref(matchLiveDetail)) == null ? void 0 : _j22.match) == null ? void 0 : _k22.home_team) == null ? void 0 : _l22.i_team) == (item == null ? void 0 : item[7])) {
            _push(`<td data-v-340f6857>${(_d3 = ("getH2HOddHadicap" in _ctx ? _ctx.getH2HOddHadicap : unref(getH2HOddHadicap))(item == null ? void 0 : item[9], item == null ? void 0 : item[8], item == null ? void 0 : item[17], unref($t))) != null ? _d3 : ""}</td>`);
          } else {
            _push(`<td class="hbg-td1" data-v-340f6857></td>`);
          }
          _push(`<td data-v-340f6857>${(_e3 = ("getH2HOddTX" in _ctx ? _ctx.getH2HOddTX : unref(getH2HOddTX))(item == null ? void 0 : item[8], item == null ? void 0 : item[9], item == null ? void 0 : item[29], unref($t))) != null ? _e3 : ""}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></tbody></table></div></div><p class="text-center mt-2" data-v-340f6857>${(_c2 = ("getH2HStatistics" in _ctx ? _ctx.getH2HStatistics : unref(getH2HStatistics))((_If = (_Hf = unref(matchesAnalysis)) == null ? void 0 : _Hf.away_last_matches) == null ? void 0 : _If.filter((match) => {
        var _a32, _b32;
        return unref(checkboxleague2) ? ((_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.i_competition_id) == (match == null ? void 0 : match[2]) : match;
      }), unref(selectMatchCount2), (_Lf = (_Kf = (_Jf = unref(matchLiveDetail)) == null ? void 0 : _Jf.match) == null ? void 0 : _Kf.away_team) == null ? void 0 : _Lf.i_team, unref(cb_sos2), false, unref($t))) != null ? _c2 : ""}</p></div></div><div class="porletP" id="porletP8_1" style="${ssrRenderStyle([
        ((_Nf = (_Mf = unref(settingsH2hList)) == null ? void 0 : _Mf.find((item) => (item == null ? void 0 : item.div_id) === "porletP8_1")) == null ? void 0 : _Nf.show) === true ? null : { display: "none" },
        "order: " + ((_Pf = (_Of = unref(settingsH2hList)) == null ? void 0 : _Of.find((item) => (item == null ? void 0 : item.div_id) === "porletP8_1")) == null ? void 0 : _Pf.order),
        { "display": "none" }
      ])}" data-v-340f6857><h2 class="team-table-title" data-v-340f6857> So s\xE1nh s\u1ED1 li\u1EC7u <select id="com_s" class="data-comp-select" data-v-340f6857><!--[-->`);
      ssrRenderList("MATCH_LIST_OPTION" in _ctx ? _ctx.MATCH_LIST_OPTION : unref(MATCH_LIST_OPTION), (item) => {
        _push(`<option${ssrRenderAttr("value", item == null ? void 0 : item.key)} data-v-340f6857>${ssrInterpolate(unref($t)(item == null ? void 0 : item.value))}${ssrInterpolate(unref($t)("Recent last"))}</option>`);
      });
      _push(`<!--]--></select></h2><table width="100%" cellpadding="1" cellspacing="0" class="team-table-other table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr data-v-340f6857><th data-v-340f6857>\u0110\u1ED9i</th><th data-v-340f6857>Ghi</th><th data-v-340f6857>M\u1EA5t</th><th title="Goal Difference" data-v-340f6857>+/-</th><th title="Average Goal" data-v-340f6857>TB \u0111\u01B0\u1EE3c \u0111i\u1EC3m</th><th title="Win Rate" data-v-340f6857>T%</th><th title="Draw Rate" data-v-340f6857>H%</th><th title="Loss Rate" data-v-340f6857>B%</th><th title="Home/Away" data-v-340f6857>C/K</th><th data-v-340f6857>Ghi</th><th data-v-340f6857>M\u1EA5t</th><th title="Goal Difference" data-v-340f6857>+/-</th><th title="Average Goal" data-v-340f6857>TB \u0111\u01B0\u1EE3c \u0111i\u1EC3m</th><th title="Win Rate" data-v-340f6857>T%</th><th title="Draw Rate" data-v-340f6857>H%</th><th title="Loss Rate" data-v-340f6857>B%</th></tr><tr id="tr_com_h" data-v-340f6857><td class="home-m" data-v-340f6857>${ssrInterpolate((_Sf = (_Rf = (_Qf = unref(matchLiveDetail)) == null ? void 0 : _Qf.match) == null ? void 0 : _Rf.home_team) == null ? void 0 : _Sf.name)}</td><!--[-->`);
      ssrRenderList(("getDataComparison" in _ctx ? _ctx.getDataComparison : unref(getDataComparison))((_Tf = unref(matchesAnalysis)) == null ? void 0 : _Tf.home_last_matches, (_Wf = (_Vf = (_Uf = unref(matchLiveDetail)) == null ? void 0 : _Uf.match) == null ? void 0 : _Vf.home_team) == null ? void 0 : _Wf.i_team, true, unref(com_s), unref($t)), (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value)}</td>`);
      });
      _push(`<!--]--></tr><tr id="tr_com_g" data-v-340f6857><td class="guest-m" data-v-340f6857>${ssrInterpolate((_Zf = (_Yf = (_Xf = unref(matchLiveDetail)) == null ? void 0 : _Xf.match) == null ? void 0 : _Yf.away_team) == null ? void 0 : _Zf.name)}</td><!--[-->`);
      ssrRenderList(("getDataComparison" in _ctx ? _ctx.getDataComparison : unref(getDataComparison))((__f = unref(matchesAnalysis)) == null ? void 0 : __f.away_last_matches, (_bg = (_ag = (_$f = unref(matchLiveDetail)) == null ? void 0 : _$f.match) == null ? void 0 : _ag.away_team) == null ? void 0 : _bg.i_team, false, unref(com_s), unref($t)), (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value)}</td>`);
      });
      _push(`<!--]--></tr></tbody></table></div><div class="porletP" id="porletP8" style="${ssrRenderStyle([
        ((_dg = (_cg = unref(settingsH2hList)) == null ? void 0 : _cg.find((item) => (item == null ? void 0 : item.div_id) === "porletP8")) == null ? void 0 : _dg.show) === true ? null : { display: "none" },
        "order: " + ((_fg = (_eg = unref(settingsH2hList)) == null ? void 0 : _eg.find((item) => (item == null ? void 0 : item.div_id) === "porletP8")) == null ? void 0 : _fg.order)
      ])}" data-v-340f6857><div class="content strength" id="strengthChart" style="${ssrRenderStyle({ "display": "block" })}" data-v-340f6857><div class="team-table-title row" data-v-340f6857><span class="team-table-xq-home col-4 text-start" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_ig = (_hg = (_gg = unref(matchLiveDetail)) == null ? void 0 : _gg.match) == null ? void 0 : _hg.home_team) == null ? void 0 : _ig.name)}</span></span><span class="col-4" data-v-340f6857>${ssrInterpolate(unref($t)("Compare data"))}</span><span class="team-table-xq-guest col-4 text-end" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_lg = (_kg = (_jg = unref(matchLiveDetail)) == null ? void 0 : _jg.match) == null ? void 0 : _kg.away_team) == null ? void 0 : _lg.name)}</span></span></div><div class="team-bg-h1" data-v-340f6857><span class="home-bg" data-v-340f6857></span><span class="away-bg" data-v-340f6857></span></div><div class="option-table d-flex mt-3" data-v-340f6857><select id="com_s" class="" data-v-340f6857><!--[-->`);
      ssrRenderList("MATCH_LIST_OPTION" in _ctx ? _ctx.MATCH_LIST_OPTION : unref(MATCH_LIST_OPTION), (item) => {
        _push(`<option${ssrRenderAttr("value", item == null ? void 0 : item.key)} data-v-340f6857>${ssrInterpolate(unref($t)(item == null ? void 0 : item.value))}${ssrInterpolate(unref($t)("Recent last"))}</option>`);
      });
      _push(`<!--]--></select></div><div class="datacom-box row" id="e9_1" data-v-340f6857><div class="col-12 col-sm-6 col-md-6" data-v-340f6857><ul id="dataCompBar" class="text-center" data-v-340f6857><li class="datacom-lists" data-v-340f6857><div class="data" data-v-340f6857><span class="${ssrRenderClass([((_mg = unref(stateComparisonLast)) == null ? void 0 : _mg[42]) > ((_ng = unref(stateComparisonLast)) == null ? void 0 : _ng[43]) ? "Ht red" : "Ht", "b"])}" data-v-340f6857>${ssrInterpolate((_og = unref(stateComparisonLast)) == null ? void 0 : _og[42])}</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Total goals scored"))}</span><span class="${ssrRenderClass([((_pg = unref(stateComparisonLast)) == null ? void 0 : _pg[43]) > ((_qg = unref(stateComparisonLast)) == null ? void 0 : _qg[42]) ? "Gt red" : "Gt", "b"])}" data-v-340f6857>${ssrInterpolate((_rg = unref(stateComparisonLast)) == null ? void 0 : _rg[43])}</span></div><div class="barbox" data-v-340f6857><span class="bar" data-v-340f6857><span class="${ssrRenderClass([((_sg = unref(stateComparisonLast)) == null ? void 0 : _sg[42]) > ((_tg = unref(stateComparisonLast)) == null ? void 0 : _tg[43]) ? "Ht win" : "Ht loss", "Ht"])}" style="${ssrRenderStyle("width:" + ((_ug = unref(stateComparisonLast)) == null ? void 0 : _ug[44]) + "%")}" data-v-340f6857></span></span><span class="bar" data-v-340f6857><span class="${ssrRenderClass([((_vg = unref(stateComparisonLast)) == null ? void 0 : _vg[43]) > ((_wg = unref(stateComparisonLast)) == null ? void 0 : _wg[42]) ? "Gt win" : "Gt loss", "Gt"])}" style="${ssrRenderStyle("width:" + ((_xg = unref(stateComparisonLast)) == null ? void 0 : _xg[45]) + "%")}" data-v-340f6857></span></span></div></li><li class="datacom-lists" data-v-340f6857><div class="data" data-v-340f6857><span class="${ssrRenderClass([((_yg = unref(stateComparisonLast)) == null ? void 0 : _yg[46]) > ((_zg = unref(stateComparisonLast)) == null ? void 0 : _zg[47]) ? "red" : "", "b"])}" data-v-340f6857>${ssrInterpolate((_Ag = unref(stateComparisonLast)) == null ? void 0 : _Ag[46])}</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Average goals scored"))}</span><span class="${ssrRenderClass([((_Bg = unref(stateComparisonLast)) == null ? void 0 : _Bg[47]) > ((_Cg = unref(stateComparisonLast)) == null ? void 0 : _Cg[46]) ? "red" : "", "b"])}" data-v-340f6857>${ssrInterpolate((_Dg = unref(stateComparisonLast)) == null ? void 0 : _Dg[47])}</span></div><div class="barbox" data-v-340f6857><span class="bar" data-v-340f6857><span class="${ssrRenderClass([((_Eg = unref(stateComparisonLast)) == null ? void 0 : _Eg[46]) > ((_Fg = unref(stateComparisonLast)) == null ? void 0 : _Fg[47]) ? "win" : "loss", "Ht"])}" style="${ssrRenderStyle("width:" + ((_Gg = unref(stateComparisonLast)) == null ? void 0 : _Gg[10]) + "%")}" data-v-340f6857></span></span><span class="bar" data-v-340f6857><span class="${ssrRenderClass([((_Hg = unref(stateComparisonLast)) == null ? void 0 : _Hg[47]) > ((_Ig = unref(stateComparisonLast)) == null ? void 0 : _Ig[46]) ? "win" : "loss", "Gt"])}" style="${ssrRenderStyle("width:" + ((_Jg = unref(stateComparisonLast)) == null ? void 0 : _Jg[11]) + "%")}" data-v-340f6857></span></span></div></li><li class="datacom-lists" data-v-340f6857><div class="data" data-v-340f6857><span class="${ssrRenderClass([((_Kg = unref(stateComparisonLast)) == null ? void 0 : _Kg[36]) > ((_Lg = unref(stateComparisonLast)) == null ? void 0 : _Lg[37]) ? "red" : "", "b"])}" data-v-340f6857>${ssrInterpolate((_Mg = unref(stateComparisonLast)) == null ? void 0 : _Mg[36])}</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Total lost tables"))}</span><span class="${ssrRenderClass([((_Ng = unref(stateComparisonLast)) == null ? void 0 : _Ng[37]) > ((_Og = unref(stateComparisonLast)) == null ? void 0 : _Og[36]) ? "red" : "", "b"])}" data-v-340f6857>${ssrInterpolate((_Pg = unref(stateComparisonLast)) == null ? void 0 : _Pg[37])}</span></div><div class="barbox" data-v-340f6857><span class="bar" data-v-340f6857><span class="${ssrRenderClass([((_Qg = unref(stateComparisonLast)) == null ? void 0 : _Qg[36]) > ((_Rg = unref(stateComparisonLast)) == null ? void 0 : _Rg[37]) ? "win" : "loss", "Ht"])}" style="${ssrRenderStyle("width:" + ((_Sg = unref(stateComparisonLast)) == null ? void 0 : _Sg[22]) + "%")}" data-v-340f6857></span></span><span class="bar" data-v-340f6857><span class="${ssrRenderClass([((_Tg = unref(stateComparisonLast)) == null ? void 0 : _Tg[37]) > ((_Ug = unref(stateComparisonLast)) == null ? void 0 : _Ug[36]) ? "win" : "loss", "Gt"])}" style="${ssrRenderStyle("width:" + ((_Vg = unref(stateComparisonLast)) == null ? void 0 : _Vg[23]) + "%")}" data-v-340f6857></span></span></div></li><li class="datacom-lists" data-v-340f6857><div class="data" data-v-340f6857><span class="${ssrRenderClass([((_Wg = unref(stateComparisonLast)) == null ? void 0 : _Wg[48]) > ((_Xg = unref(stateComparisonLast)) == null ? void 0 : _Xg[49]) ? "red" : "", "b"])}" data-v-340f6857>${ssrInterpolate((_Yg = unref(stateComparisonLast)) == null ? void 0 : _Yg[48])}</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Average lost table"))}</span><span class="${ssrRenderClass([((_Zg = unref(stateComparisonLast)) == null ? void 0 : _Zg[49]) > ((__g = unref(stateComparisonLast)) == null ? void 0 : __g[48]) ? "red" : "", "b"])}" data-v-340f6857>${ssrInterpolate((_$g = unref(stateComparisonLast)) == null ? void 0 : _$g[49])}</span></div><div class="barbox" data-v-340f6857><span class="bar" data-v-340f6857><span class="${ssrRenderClass([((_ah = unref(stateComparisonLast)) == null ? void 0 : _ah[48]) > ((_bh = unref(stateComparisonLast)) == null ? void 0 : _bh[49]) ? "win" : "loss", "Ht"])}" style="${ssrRenderStyle("width:" + ((_ch = unref(stateComparisonLast)) == null ? void 0 : _ch[22]) + "%")}" data-v-340f6857></span></span><span class="bar" data-v-340f6857><span class="${ssrRenderClass([((_dh = unref(stateComparisonLast)) == null ? void 0 : _dh[49]) > ((_eh = unref(stateComparisonLast)) == null ? void 0 : _eh[48]) ? "win" : "loss", "Gt"])}" style="${ssrRenderStyle("width:" + ((_fh = unref(stateComparisonLast)) == null ? void 0 : _fh[23]) + "%")}" data-v-340f6857></span></span></div></li></ul></div><div class="col-12 col-sm-6 col-md-6" data-v-340f6857><ul id="dataCompBar" class="text-center" data-v-340f6857><li class="datacom-lists" data-v-340f6857><div class="data" data-v-340f6857><span class="${ssrRenderClass([((_gh = unref(stateComparisonLast)) == null ? void 0 : _gh[50]) > ((_hh = unref(stateComparisonLast)) == null ? void 0 : _hh[51]) ? "red" : "", "b"])}" data-v-340f6857>${ssrInterpolate((_ih = unref(stateComparisonLast)) == null ? void 0 : _ih[50])}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Win rate"))}</span><span class="${ssrRenderClass([((_jh = unref(stateComparisonLast)) == null ? void 0 : _jh[51]) > ((_kh = unref(stateComparisonLast)) == null ? void 0 : _kh[50]) ? "red" : "", "b"])}" data-v-340f6857>${ssrInterpolate((_lh = unref(stateComparisonLast)) == null ? void 0 : _lh[51])}%</span></div><div class="barbox" data-v-340f6857><span class="bar" data-v-340f6857><span class="${ssrRenderClass([((_mh = unref(stateComparisonLast)) == null ? void 0 : _mh[50]) > ((_nh = unref(stateComparisonLast)) == null ? void 0 : _nh[51]) ? "win" : "loss", "Ht"])}" style="${ssrRenderStyle("width:" + ((_oh = unref(stateComparisonLast)) == null ? void 0 : _oh[50]) + "%")}" data-v-340f6857></span></span><span class="bar" data-v-340f6857><span class="${ssrRenderClass([((_ph = unref(stateComparisonLast)) == null ? void 0 : _ph[51]) > ((_qh = unref(stateComparisonLast)) == null ? void 0 : _qh[50]) ? "win" : "loss", "Gt"])}" style="${ssrRenderStyle("width:" + ((_rh = unref(stateComparisonLast)) == null ? void 0 : _rh[51]) + "%")}" data-v-340f6857></span></span></div></li><li class="datacom-lists" data-v-340f6857><div class="data" data-v-340f6857><span class="${ssrRenderClass([((_sh = unref(stateComparisonLast)) == null ? void 0 : _sh[52]) > ((_th = unref(stateComparisonLast)) == null ? void 0 : _th[53]) ? "red" : "", "b"])}" data-v-340f6857>${ssrInterpolate((_uh = unref(stateComparisonLast)) == null ? void 0 : _uh[52])}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Draw rate"))}</span><span class="${ssrRenderClass([((_vh = unref(stateComparisonLast)) == null ? void 0 : _vh[53]) > ((_wh = unref(stateComparisonLast)) == null ? void 0 : _wh[52]) ? "red" : "", "b"])}" data-v-340f6857>${ssrInterpolate((_xh = unref(stateComparisonLast)) == null ? void 0 : _xh[53])}%</span></div><div class="barbox" data-v-340f6857><span class="bar" data-v-340f6857><span class="${ssrRenderClass([((_yh = unref(stateComparisonLast)) == null ? void 0 : _yh[52]) > ((_zh = unref(stateComparisonLast)) == null ? void 0 : _zh[53]) ? "win" : "loss", "Ht"])}" style="${ssrRenderStyle("width:" + ((_Ah = unref(stateComparisonLast)) == null ? void 0 : _Ah[52]) + "%")}" data-v-340f6857></span></span><span class="bar" data-v-340f6857><span class="${ssrRenderClass([((_Bh = unref(stateComparisonLast)) == null ? void 0 : _Bh[53]) > ((_Ch = unref(stateComparisonLast)) == null ? void 0 : _Ch[52]) ? "win" : "loss", "Gt"])}" style="${ssrRenderStyle("width:" + ((_Dh = unref(stateComparisonLast)) == null ? void 0 : _Dh[53]) + "%")}" data-v-340f6857></span></span></div></li><li class="datacom-lists" data-v-340f6857><div class="data" data-v-340f6857><span class="${ssrRenderClass([((_Eh = unref(stateComparisonLast)) == null ? void 0 : _Eh[54]) > ((_Fh = unref(stateComparisonLast)) == null ? void 0 : _Fh[55]) ? "red" : "", "b"])}" data-v-340f6857>${ssrInterpolate((_Gh = unref(stateComparisonLast)) == null ? void 0 : _Gh[54])}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Loss rate"))}</span><span class="${ssrRenderClass([((_Hh = unref(stateComparisonLast)) == null ? void 0 : _Hh[55]) > ((_Ih = unref(stateComparisonLast)) == null ? void 0 : _Ih[54]) ? "red" : "", "b"])}" data-v-340f6857>${ssrInterpolate((_Jh = unref(stateComparisonLast)) == null ? void 0 : _Jh[55])}%</span></div><div class="barbox" data-v-340f6857><span class="bar" data-v-340f6857><span class="${ssrRenderClass([((_Kh = unref(stateComparisonLast)) == null ? void 0 : _Kh[54]) > ((_Lh = unref(stateComparisonLast)) == null ? void 0 : _Lh[55]) ? "win" : "loss", "Ht"])}" style="${ssrRenderStyle("width:" + ((_Mh = unref(stateComparisonLast)) == null ? void 0 : _Mh[54]) + "%")}" data-v-340f6857></span></span><span class="bar" data-v-340f6857><span class="${ssrRenderClass([((_Nh = unref(stateComparisonLast)) == null ? void 0 : _Nh[55]) > ((_Oh = unref(stateComparisonLast)) == null ? void 0 : _Oh[54]) ? "win" : "loss", "Gt"])}" style="${ssrRenderStyle("width:" + ((_Ph = unref(stateComparisonLast)) == null ? void 0 : _Ph[55]) + "%")}" data-v-340f6857></span></span></div></li></ul></div></div></div></div><div class="porletP" id="porletP9" style="${ssrRenderStyle([
        ((_Rh = (_Qh = unref(settingsH2hList)) == null ? void 0 : _Qh.find((item) => (item == null ? void 0 : item.div_id) === "porletP9")) == null ? void 0 : _Rh.show) === true ? null : { display: "none" },
        "order: " + ((_Th = (_Sh = unref(settingsH2hList)) == null ? void 0 : _Sh.find((item) => (item == null ? void 0 : item.div_id) === "porletP9")) == null ? void 0 : _Th.order)
      ])}" data-v-340f6857><h2 class="team-table-title" data-v-340f6857>${ssrInterpolate(unref($t)("Asian handicap statistics"))}</h2><div class="team-div row" data-v-340f6857><div class="home-div col-12 col-md-6" data-v-340f6857><table width="100%" cellpadding="0" cellspacing="0" class="team-table-home table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr class="team-home" data-v-340f6857><td colspan="12" data-v-340f6857><span data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_Wh = (_Vh = (_Uh = unref(matchLiveDetail)) == null ? void 0 : _Uh.match) == null ? void 0 : _Vh.home_team) == null ? void 0 : _Wh.name)}</span></span></td></tr></tbody></table><div class="rankbox" data-v-340f6857><table class="eTable adaptMt" id="etable-header" width="15%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "80px" })}" data-v-340f6857><tbody data-v-340f6857><tr class="bd-l" rowspan="2" data-v-340f6857><th${ssrRenderAttr("title", unref($t)("Full time"))} data-v-340f6857>${ssrInterpolate(unref($t)("FT"))}</th></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857><span class="team-home-f" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</span></td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857><span class="team-away-f" data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</span></td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Recent 6"))}</td></tr></tbody></table><div class="rankdata" width="85%" data-v-340f6857><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" data-v-340f6857><tbody data-v-340f6857><tr data-v-340f6857><th colspan="6" class="hbg1"${ssrRenderAttr("title", unref($t)("Handicap"))} data-v-340f6857>${ssrInterpolate(unref($t)("HDP"))}</th><th colspan="5" data-v-340f6857>${ssrInterpolate(unref($t)("Over/Under"))}</th></tr><tr data-v-340f6857><th data-v-340f6857>${ssrInterpolate(unref($t)("Match"))}</th><th${ssrRenderAttr("title", unref($t)("Win"))} data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th${ssrRenderAttr("title", unref($t)("Draw"))} data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th${ssrRenderAttr("title", unref($t)("Loss"))} data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th><th${ssrRenderAttr("title", unref($t)("Win rate"))} data-v-340f6857>${ssrInterpolate(unref($t)("Win rate"))}%</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Detail"))}</th><th${ssrRenderAttr("title", unref($t)("Win"))} data-v-340f6857>${ssrInterpolate(unref($t)("O"))}</th><th${ssrRenderAttr("title", unref($t)("Win rate"))} data-v-340f6857>${ssrInterpolate(unref($t)("O"))}%</th><th${ssrRenderAttr("title", unref($t)("Loss"))} data-v-340f6857>${ssrInterpolate(unref($t)("U"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("U"))}%</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Detail"))}</th></tr><tr data-v-340f6857><!--[-->`);
      ssrRenderList((_Zh = (_Yh = (_Xh = unref(matchesAnalysis)) == null ? void 0 : _Xh.home_odds) == null ? void 0 : _Yh[0]) == null ? void 0 : _Zh.slice(0, 9), (odd, index) => {
        _push(`<!--[--><td data-v-340f6857>${ssrInterpolate(odd ? odd : "0")}</td><td style="${ssrRenderStyle(index === 4 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><td style="${ssrRenderStyle(index === 8 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><!--]-->`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><!--[-->`);
      ssrRenderList((_ai = (_$h = (__h = unref(matchesAnalysis)) == null ? void 0 : __h.home_odds) == null ? void 0 : _$h[1]) == null ? void 0 : _ai.slice(0, 9), (odd, index) => {
        _push(`<!--[-->`);
        if (index < 9) {
          _push(`<!--[--><td data-v-340f6857>${ssrInterpolate(odd ? odd : "0")}</td><td style="${ssrRenderStyle(index === 4 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><td style="${ssrRenderStyle(index === 8 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><!--[-->`);
      ssrRenderList((_di = (_ci = (_bi = unref(matchesAnalysis)) == null ? void 0 : _bi.home_odds) == null ? void 0 : _ci[2]) == null ? void 0 : _di.slice(0, 9), (odd, index) => {
        _push(`<!--[--><td data-v-340f6857>${ssrInterpolate(odd ? odd : "0")}</td><td style="${ssrRenderStyle(index === 4 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><td style="${ssrRenderStyle(index === 8 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><!--]-->`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><td data-v-340f6857>${ssrInterpolate((_gi = (_fi = (_ei = unref(matchesAnalysis)) == null ? void 0 : _ei.home_odds) == null ? void 0 : _fi[3]) == null ? void 0 : _gi[0])}</td><td class="text-nowrap" data-v-340f6857>${(_d2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_ji = (_ii = (_hi = unref(matchesAnalysis)) == null ? void 0 : _hi.home_odds) == null ? void 0 : _ii[3]) == null ? void 0 : _ji[1], "w")) != null ? _d2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_e2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_mi = (_li = (_ki = unref(matchesAnalysis)) == null ? void 0 : _ki.home_odds) == null ? void 0 : _li[3]) == null ? void 0 : _mi[1], "v")) != null ? _e2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_f2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_pi = (_oi = (_ni = unref(matchesAnalysis)) == null ? void 0 : _ni.home_odds) == null ? void 0 : _oi[3]) == null ? void 0 : _pi[1], "l")) != null ? _f2 : ""}</td><td data-v-340f6857>${ssrInterpolate((_si = (_ri = (_qi = unref(matchesAnalysis)) == null ? void 0 : _qi.home_odds) == null ? void 0 : _ri[3]) == null ? void 0 : _si[2])}</td><td data-v-340f6857>`);
      if (((_vi = (_ui = (_ti = unref(matchesAnalysis)) == null ? void 0 : _ti.home_odds) == null ? void 0 : _ui[3]) == null ? void 0 : _vi.length) > 0) {
        _push(`<a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</td><td class="text-nowrap" data-v-340f6857>${(_g2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_yi = (_xi = (_wi = unref(matchesAnalysis)) == null ? void 0 : _wi.home_odds) == null ? void 0 : _xi[3]) == null ? void 0 : _yi[3], "o")) != null ? _g2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_h2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_Bi = (_Ai = (_zi = unref(matchesAnalysis)) == null ? void 0 : _zi.home_odds) == null ? void 0 : _Ai[3]) == null ? void 0 : _Bi[3], "o", "%")) != null ? _h2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_i2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_Ei = (_Di = (_Ci = unref(matchesAnalysis)) == null ? void 0 : _Ci.home_odds) == null ? void 0 : _Di[3]) == null ? void 0 : _Ei[3], "u")) != null ? _i2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_j2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_Hi = (_Gi = (_Fi = unref(matchesAnalysis)) == null ? void 0 : _Fi.home_odds) == null ? void 0 : _Gi[3]) == null ? void 0 : _Hi[3], "u", "%")) != null ? _j2 : ""}</td><td data-v-340f6857>`);
      if (((_Ki = (_Ji = (_Ii = unref(matchesAnalysis)) == null ? void 0 : _Ii.home_odds) == null ? void 0 : _Ji[3]) == null ? void 0 : _Ki.length) > 0) {
        _push(`<a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</td></tr></tbody></table></div></div></div><div class="guest-div col-12 col-md-6" data-v-340f6857><table width="100%" cellpadding="0" cellspacing="0" class="team-table-guest table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr class="team-guest" data-v-340f6857><td colspan="12" data-v-340f6857><span data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_Ni = (_Mi = (_Li = unref(matchLiveDetail)) == null ? void 0 : _Li.match) == null ? void 0 : _Mi.away_team) == null ? void 0 : _Ni.name)}</span></span></td></tr></tbody></table><div class="rankbox" data-v-340f6857><table class="eTable adaptMt" id="etable-header" width="15%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "80px" })}" data-v-340f6857><tbody data-v-340f6857><tr class="bd-l" rowspan="2" data-v-340f6857><th${ssrRenderAttr("title", unref($t)("Full time"))} data-v-340f6857>${ssrInterpolate(unref($t)("FT"))}</th></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857><span class="team-home-f" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</span></td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857><span class="team-away-f" data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</span></td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Recent 6"))}</td></tr></tbody></table><div class="rankdata" width="85%" data-v-340f6857><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" data-v-340f6857><tbody data-v-340f6857><tr data-v-340f6857><th colspan="6" class="hbg1"${ssrRenderAttr("title", unref($t)("Handicap"))} data-v-340f6857>${ssrInterpolate(unref($t)("HDP"))}</th><th colspan="5" data-v-340f6857>${ssrInterpolate(unref($t)("Over/Under"))}</th></tr><tr data-v-340f6857><th data-v-340f6857>${ssrInterpolate(unref($t)("Match"))}</th><th${ssrRenderAttr("title", unref($t)("Win"))} data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th${ssrRenderAttr("title", unref($t)("Draw"))} data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th${ssrRenderAttr("title", unref($t)("Loss"))} data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th><th${ssrRenderAttr("title", unref($t)("Win rate"))} data-v-340f6857>${ssrInterpolate(unref($t)("Win rate"))}%</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Detail"))}</th><th${ssrRenderAttr("title", unref($t)("Win"))} data-v-340f6857>${ssrInterpolate(unref($t)("O"))}</th><th${ssrRenderAttr("title", unref($t)("Win rate"))} data-v-340f6857>${ssrInterpolate(unref($t)("O"))}%</th><th${ssrRenderAttr("title", unref($t)("Loss"))} data-v-340f6857>${ssrInterpolate(unref($t)("U"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("U"))}%</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Detail"))}</th></tr><tr data-v-340f6857><!--[-->`);
      ssrRenderList((_Qi = (_Pi = (_Oi = unref(matchesAnalysis)) == null ? void 0 : _Oi.away_odds) == null ? void 0 : _Pi[0]) == null ? void 0 : _Qi.slice(0, 9), (odd, index) => {
        _push(`<!--[--><td data-v-340f6857>${ssrInterpolate(odd ? odd : "0")}</td><td style="${ssrRenderStyle(index === 4 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><td style="${ssrRenderStyle(index === 8 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><!--]-->`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><!--[-->`);
      ssrRenderList((_Ti = (_Si = (_Ri = unref(matchesAnalysis)) == null ? void 0 : _Ri.away_odds) == null ? void 0 : _Si[1]) == null ? void 0 : _Ti.slice(0, 9), (odd, index) => {
        _push(`<!--[--><td data-v-340f6857>${ssrInterpolate(odd ? odd : "0")}</td><td style="${ssrRenderStyle(index === 4 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><td style="${ssrRenderStyle(index === 8 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><!--]-->`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><!--[-->`);
      ssrRenderList((_Wi = (_Vi = (_Ui = unref(matchesAnalysis)) == null ? void 0 : _Ui.away_odds) == null ? void 0 : _Vi[2]) == null ? void 0 : _Wi.slice(0, 9), (odd, index) => {
        _push(`<!--[--><td data-v-340f6857>${ssrInterpolate(odd ? odd : "0")}</td><td style="${ssrRenderStyle(index === 4 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><td style="${ssrRenderStyle(index === 8 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><!--]-->`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><td data-v-340f6857>${ssrInterpolate((_Zi = (_Yi = (_Xi = unref(matchesAnalysis)) == null ? void 0 : _Xi.away_odds) == null ? void 0 : _Yi[3]) == null ? void 0 : _Zi[0])}</td><td class="text-nowrap" data-v-340f6857>${(_k2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_aj = (_$i = (__i = unref(matchesAnalysis)) == null ? void 0 : __i.away_odds) == null ? void 0 : _$i[3]) == null ? void 0 : _aj[1], "w")) != null ? _k2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_l2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_dj = (_cj = (_bj = unref(matchesAnalysis)) == null ? void 0 : _bj.away_odds) == null ? void 0 : _cj[3]) == null ? void 0 : _dj[1], "v")) != null ? _l2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_m2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_gj = (_fj = (_ej = unref(matchesAnalysis)) == null ? void 0 : _ej.away_odds) == null ? void 0 : _fj[3]) == null ? void 0 : _gj[1], "l")) != null ? _m2 : ""}</td><td data-v-340f6857>${ssrInterpolate((_jj = (_ij = (_hj = unref(matchesAnalysis)) == null ? void 0 : _hj.away_odds) == null ? void 0 : _ij[3]) == null ? void 0 : _jj[2])}</td><td data-v-340f6857>`);
      if (((_mj = (_lj = (_kj = unref(matchesAnalysis)) == null ? void 0 : _kj.away_odds) == null ? void 0 : _lj[3]) == null ? void 0 : _mj.length) > 0) {
        _push(`<a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</td><td class="text-nowrap" data-v-340f6857>${(_n2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_pj = (_oj = (_nj = unref(matchesAnalysis)) == null ? void 0 : _nj.away_odds) == null ? void 0 : _oj[3]) == null ? void 0 : _pj[3], "o")) != null ? _n2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_o2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_sj = (_rj = (_qj = unref(matchesAnalysis)) == null ? void 0 : _qj.away_odds) == null ? void 0 : _rj[3]) == null ? void 0 : _sj[3], "o", "%")) != null ? _o2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_p2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_vj = (_uj = (_tj = unref(matchesAnalysis)) == null ? void 0 : _tj.away_odds) == null ? void 0 : _uj[3]) == null ? void 0 : _vj[3], "u")) != null ? _p2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_q2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_yj = (_xj = (_wj = unref(matchesAnalysis)) == null ? void 0 : _wj.away_odds) == null ? void 0 : _xj[3]) == null ? void 0 : _yj[3], "u", "%")) != null ? _q2 : ""}</td><td data-v-340f6857>`);
      if (((_Bj = (_Aj = (_zj = unref(matchesAnalysis)) == null ? void 0 : _zj.away_odds) == null ? void 0 : _Aj[3]) == null ? void 0 : _Bj.length) > 0) {
        _push(`<a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</td></tr></tbody></table></div></div></div></div><div class="team-div row" data-v-340f6857><div class="home-div col-12 col-md-6" data-v-340f6857><table width="100%" cellpadding="0" cellspacing="0" class="team-table-home table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr class="team-home" data-v-340f6857><td colspan="12" data-v-340f6857><span data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_Ej = (_Dj = (_Cj = unref(matchLiveDetail)) == null ? void 0 : _Cj.match) == null ? void 0 : _Dj.home_team) == null ? void 0 : _Ej.name)}</span></span></td></tr></tbody></table><div class="rankbox" data-v-340f6857><table class="eTable adaptMt" id="etable-header" width="15%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "80px" })}" data-v-340f6857><tbody data-v-340f6857><tr class="bd-l" rowspan="2" data-v-340f6857><th${ssrRenderAttr("title", unref($t)("Haft time"))} data-v-340f6857>${ssrInterpolate(unref($t)("HT"))}</th></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857><span class="team-home-f" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</span></td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857><span class="team-away-f" data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</span></td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Recent 6"))}</td></tr></tbody></table><div class="rankdata" width="85%" data-v-340f6857><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" data-v-340f6857><tbody data-v-340f6857><tr data-v-340f6857><th colspan="6" class="hbg1"${ssrRenderAttr("title", unref($t)("Handicap"))} data-v-340f6857>${ssrInterpolate(unref($t)("HDP"))}</th><th colspan="5" data-v-340f6857>${ssrInterpolate(unref($t)("Over/Under"))}</th></tr><tr data-v-340f6857><th data-v-340f6857>${ssrInterpolate(unref($t)("Match"))}</th><th${ssrRenderAttr("title", unref($t)("Win"))} data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th${ssrRenderAttr("title", unref($t)("Draw"))} data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th${ssrRenderAttr("title", unref($t)("Loss"))} data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th><th${ssrRenderAttr("title", unref($t)("Win rate"))} data-v-340f6857>${ssrInterpolate(unref($t)("Win rate"))}%</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Detail"))}</th><th${ssrRenderAttr("title", unref($t)("Win"))} data-v-340f6857>${ssrInterpolate(unref($t)("O"))}</th><th${ssrRenderAttr("title", unref($t)("Win rate"))} data-v-340f6857>${ssrInterpolate(unref($t)("O"))}%</th><th${ssrRenderAttr("title", unref($t)("Loss"))} data-v-340f6857>${ssrInterpolate(unref($t)("U"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("U"))}%</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Detail"))}</th></tr><tr data-v-340f6857><!--[-->`);
      ssrRenderList((_Hj = (_Gj = (_Fj = unref(matchesAnalysis)) == null ? void 0 : _Fj.home_odds) == null ? void 0 : _Gj[4]) == null ? void 0 : _Hj.slice(0, 9), (odd, index) => {
        _push(`<!--[--><td data-v-340f6857>${ssrInterpolate(odd ? odd : "0")}</td><td style="${ssrRenderStyle(index === 4 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><td style="${ssrRenderStyle(index === 8 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><!--]-->`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><!--[-->`);
      ssrRenderList((_Kj = (_Jj = (_Ij = unref(matchesAnalysis)) == null ? void 0 : _Ij.home_odds) == null ? void 0 : _Jj[5]) == null ? void 0 : _Kj.slice(0, 9), (odd, index) => {
        _push(`<!--[-->`);
        if (index < 9) {
          _push(`<!--[--><td data-v-340f6857>${ssrInterpolate(odd ? odd : "0")}</td><td style="${ssrRenderStyle(index === 4 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><td style="${ssrRenderStyle(index === 8 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><!--[-->`);
      ssrRenderList((_Nj = (_Mj = (_Lj = unref(matchesAnalysis)) == null ? void 0 : _Lj.home_odds) == null ? void 0 : _Mj[6]) == null ? void 0 : _Nj.slice(0, 9), (odd, index) => {
        _push(`<!--[--><td data-v-340f6857>${ssrInterpolate(odd ? odd : "0")}</td><td style="${ssrRenderStyle(index === 4 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><td style="${ssrRenderStyle(index === 8 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><!--]-->`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><td data-v-340f6857>${ssrInterpolate((_Qj = (_Pj = (_Oj = unref(matchesAnalysis)) == null ? void 0 : _Oj.home_odds) == null ? void 0 : _Pj[7]) == null ? void 0 : _Qj[0])}</td><td class="text-nowrap" data-v-340f6857>${(_r2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_Tj = (_Sj = (_Rj = unref(matchesAnalysis)) == null ? void 0 : _Rj.home_odds) == null ? void 0 : _Sj[7]) == null ? void 0 : _Tj[1], "w")) != null ? _r2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_s2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_Wj = (_Vj = (_Uj = unref(matchesAnalysis)) == null ? void 0 : _Uj.home_odds) == null ? void 0 : _Vj[7]) == null ? void 0 : _Wj[1], "v")) != null ? _s2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_t2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_Zj = (_Yj = (_Xj = unref(matchesAnalysis)) == null ? void 0 : _Xj.home_odds) == null ? void 0 : _Yj[7]) == null ? void 0 : _Zj[1], "l")) != null ? _t2 : ""}</td><td data-v-340f6857>${ssrInterpolate((_ak = (_$j = (__j = unref(matchesAnalysis)) == null ? void 0 : __j.home_odds) == null ? void 0 : _$j[7]) == null ? void 0 : _ak[2])}</td><td data-v-340f6857>`);
      if (((_dk = (_ck = (_bk = unref(matchesAnalysis)) == null ? void 0 : _bk.home_odds) == null ? void 0 : _ck[7]) == null ? void 0 : _dk.length) > 0) {
        _push(`<a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</td><td class="text-nowrap" data-v-340f6857>${(_u2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_gk = (_fk = (_ek = unref(matchesAnalysis)) == null ? void 0 : _ek.home_odds) == null ? void 0 : _fk[7]) == null ? void 0 : _gk[3], "o")) != null ? _u2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_v2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_jk = (_ik = (_hk = unref(matchesAnalysis)) == null ? void 0 : _hk.home_odds) == null ? void 0 : _ik[7]) == null ? void 0 : _jk[3], "o", "%")) != null ? _v2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_w2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_mk = (_lk = (_kk = unref(matchesAnalysis)) == null ? void 0 : _kk.home_odds) == null ? void 0 : _lk[7]) == null ? void 0 : _mk[3], "u")) != null ? _w2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_x2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_pk = (_ok = (_nk = unref(matchesAnalysis)) == null ? void 0 : _nk.home_odds) == null ? void 0 : _ok[7]) == null ? void 0 : _pk[3], "u", "%")) != null ? _x2 : ""}</td><td data-v-340f6857>`);
      if (((_sk = (_rk = (_qk = unref(matchesAnalysis)) == null ? void 0 : _qk.home_odds) == null ? void 0 : _rk[7]) == null ? void 0 : _sk.length) > 0) {
        _push(`<a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</td></tr></tbody></table></div></div></div><div class="guest-div col-12 col-md-6" data-v-340f6857><table width="100%" cellpadding="0" cellspacing="0" class="team-table-guest table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr class="team-guest" data-v-340f6857><td colspan="12" data-v-340f6857><span data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_vk = (_uk = (_tk = unref(matchLiveDetail)) == null ? void 0 : _tk.match) == null ? void 0 : _uk.away_team) == null ? void 0 : _vk.name)}</span></span></td></tr></tbody></table><div class="rankbox" data-v-340f6857><table class="eTable adaptMt" id="etable-header" width="15%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "80px" })}" data-v-340f6857><tbody data-v-340f6857><tr class="bd-l" rowspan="2" data-v-340f6857><th${ssrRenderAttr("title", unref($t)("Haft time"))} data-v-340f6857>${ssrInterpolate(unref($t)("HT"))}</th></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857><span class="team-home-f" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</span></td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857><span class="team-away-f" data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</span></td></tr><tr class="bd-l" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Recent 6"))}</td></tr></tbody></table><div class="rankdata" width="85%" data-v-340f6857><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" data-v-340f6857><tbody data-v-340f6857><tr data-v-340f6857><th colspan="6" class="hbg1"${ssrRenderAttr("title", unref($t)("Handicap"))} data-v-340f6857>${ssrInterpolate(unref($t)("HDP"))}</th><th colspan="5" data-v-340f6857>${ssrInterpolate(unref($t)("Over/Under"))}</th></tr><tr data-v-340f6857><th data-v-340f6857>${ssrInterpolate(unref($t)("Match"))}</th><th${ssrRenderAttr("title", unref($t)("Win"))} data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th${ssrRenderAttr("title", unref($t)("Draw"))} data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th${ssrRenderAttr("title", unref($t)("Loss"))} data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th><th${ssrRenderAttr("title", unref($t)("Win rate"))} data-v-340f6857>${ssrInterpolate(unref($t)("Win rate"))}%</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Detail"))}</th><th${ssrRenderAttr("title", unref($t)("Win"))} data-v-340f6857>${ssrInterpolate(unref($t)("O"))}</th><th${ssrRenderAttr("title", unref($t)("Win rate"))} data-v-340f6857>${ssrInterpolate(unref($t)("O"))}%</th><th${ssrRenderAttr("title", unref($t)("Loss"))} data-v-340f6857>${ssrInterpolate(unref($t)("U"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("U"))}%</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Detail"))}</th></tr><tr data-v-340f6857><!--[-->`);
      ssrRenderList((_yk = (_xk = (_wk = unref(matchesAnalysis)) == null ? void 0 : _wk.away_odds) == null ? void 0 : _xk[4]) == null ? void 0 : _yk.slice(0, 9), (odd, index) => {
        _push(`<!--[--><td data-v-340f6857>${ssrInterpolate(odd ? odd : "0")}</td><td style="${ssrRenderStyle(index === 4 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><td style="${ssrRenderStyle(index === 8 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><!--]-->`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><!--[-->`);
      ssrRenderList((_Bk = (_Ak = (_zk = unref(matchesAnalysis)) == null ? void 0 : _zk.away_odds) == null ? void 0 : _Ak[5]) == null ? void 0 : _Bk.slice(0, 9), (odd, index) => {
        _push(`<!--[--><td data-v-340f6857>${ssrInterpolate(odd ? odd : "0")}</td><td style="${ssrRenderStyle(index === 4 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><td style="${ssrRenderStyle(index === 8 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><!--]-->`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><!--[-->`);
      ssrRenderList((_Ek = (_Dk = (_Ck = unref(matchesAnalysis)) == null ? void 0 : _Ck.away_odds) == null ? void 0 : _Dk[6]) == null ? void 0 : _Ek.slice(0, 9), (odd, index) => {
        _push(`<!--[--><td data-v-340f6857>${ssrInterpolate(odd ? odd : "0")}</td><td style="${ssrRenderStyle(index === 4 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><td style="${ssrRenderStyle(index === 8 ? null : { display: "none" })}" data-v-340f6857><a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a></td><!--]-->`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><td data-v-340f6857>${ssrInterpolate((_Hk = (_Gk = (_Fk = unref(matchesAnalysis)) == null ? void 0 : _Fk.away_odds) == null ? void 0 : _Gk[7]) == null ? void 0 : _Hk[0])}</td><td class="text-nowrap" data-v-340f6857>${(_y2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_Kk = (_Jk = (_Ik = unref(matchesAnalysis)) == null ? void 0 : _Ik.away_odds) == null ? void 0 : _Jk[7]) == null ? void 0 : _Kk[1], "w")) != null ? _y2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_z2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_Nk = (_Mk = (_Lk = unref(matchesAnalysis)) == null ? void 0 : _Lk.away_odds) == null ? void 0 : _Mk[7]) == null ? void 0 : _Nk[1], "v")) != null ? _z2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_A2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_Qk = (_Pk = (_Ok = unref(matchesAnalysis)) == null ? void 0 : _Ok.away_odds) == null ? void 0 : _Pk[7]) == null ? void 0 : _Qk[1], "l")) != null ? _A2 : ""}</td><td data-v-340f6857>${ssrInterpolate((_Tk = (_Sk = (_Rk = unref(matchesAnalysis)) == null ? void 0 : _Rk.away_odds) == null ? void 0 : _Sk[7]) == null ? void 0 : _Tk[2])}</td><td data-v-340f6857>`);
      if (((_Wk = (_Vk = (_Uk = unref(matchesAnalysis)) == null ? void 0 : _Uk.away_odds) == null ? void 0 : _Vk[7]) == null ? void 0 : _Wk.length) > 0) {
        _push(`<a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</td><td class="text-nowrap" data-v-340f6857>${(_B2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_Zk = (_Yk = (_Xk = unref(matchesAnalysis)) == null ? void 0 : _Xk.away_odds) == null ? void 0 : _Yk[7]) == null ? void 0 : _Zk[3], "o")) != null ? _B2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_C2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_al = (_$k = (__k = unref(matchesAnalysis)) == null ? void 0 : __k.away_odds) == null ? void 0 : _$k[7]) == null ? void 0 : _al[3], "o", "%")) != null ? _C2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_D2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_dl = (_cl = (_bl = unref(matchesAnalysis)) == null ? void 0 : _bl.away_odds) == null ? void 0 : _cl[7]) == null ? void 0 : _dl[3], "u")) != null ? _D2 : ""}</td><td class="text-nowrap" data-v-340f6857>${(_E2 = ("getStaticsOdd" in _ctx ? _ctx.getStaticsOdd : unref(getStaticsOdd))((_gl = (_fl = (_el = unref(matchesAnalysis)) == null ? void 0 : _el.away_odds) == null ? void 0 : _fl[7]) == null ? void 0 : _gl[3], "u", "%")) != null ? _E2 : ""}</td><td data-v-340f6857>`);
      if (((_jl = (_il = (_hl = unref(matchesAnalysis)) == null ? void 0 : _hl.away_odds) == null ? void 0 : _il[7]) == null ? void 0 : _jl.length) > 0) {
        _push(`<a href="#" class="dl blueLink" target="_blank" data-v-340f6857>${ssrInterpolate(unref($t)("View"))}</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</td></tr></tbody></table></div></div></div></div><p class="mt-2" data-v-340f6857>${ssrInterpolate(unref($t)("FT: Full time, HT: 1st half, W: Win, H: Draw, B: Lose, Win rate%: Win percentage, Over/Under - W: Over, Over/Under - X: Under"))}</p></div><div class="porletP table-two mt-3" id="porletP10" style="${ssrRenderStyle([
        ((_ll = (_kl = unref(settingsH2hList)) == null ? void 0 : _kl.find((item) => (item == null ? void 0 : item.div_id) === "porletP10")) == null ? void 0 : _ll.show) === true ? null : { display: "none" },
        "order: " + ((_nl = (_ml = unref(settingsH2hList)) == null ? void 0 : _ml.find((item) => (item == null ? void 0 : item.div_id) === "porletP10")) == null ? void 0 : _nl.order)
      ])}" data-v-340f6857><div class="team-table-title row" data-v-340f6857><div class="col-12 team-table-xq-title" data-v-340f6857>${ssrInterpolate(unref($t)("Number of goals in H1&H2"))}</div></div><div class="team-div row" data-v-340f6857><div class="home-div col-12 col-md-6" data-v-340f6857><div class="team-table-xq-home col-12 team-table-title text-start" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_ql = (_pl = (_ol = unref(matchLiveDetail)) == null ? void 0 : _ol.match) == null ? void 0 : _pl.home_team) == null ? void 0 : _ql.name)}</span></div><div class="team-bg-h1" data-v-340f6857><span class="home-bg" data-v-340f6857></span></div><table width="100%" cellspacing="0" class="team-table-home table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr class="team-home" data-v-340f6857><th height="25" data-v-340f6857></th><th data-v-340f6857>0</th><th data-v-340f6857>1</th><th data-v-340f6857>2</th><th data-v-340f6857>3</th><th data-v-340f6857>4+</th><th data-v-340f6857>${ssrInterpolate(unref($t)("1st half"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("1st half"))}</th></tr><tr class="bg-td1" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</td><!--[-->`);
      ssrRenderList((_sl = (_rl = unref(matchesAnalysis)) == null ? void 0 : _rl.home_goals) == null ? void 0 : _sl[0], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr class="bg-td1" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</td><!--[-->`);
      ssrRenderList((_ul = (_tl = unref(matchesAnalysis)) == null ? void 0 : _tl.home_goals) == null ? void 0 : _ul[1], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr class="bg-td1" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</td><!--[-->`);
      ssrRenderList((_wl = (_vl = unref(matchesAnalysis)) == null ? void 0 : _vl.home_goals) == null ? void 0 : _wl[2], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr></tbody></table></div><div class="guest-div col-12 col-md-6" data-v-340f6857><div class="team-table-xq-guest col-12 text-md-end team-table-title" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_zl = (_yl = (_xl = unref(matchLiveDetail)) == null ? void 0 : _xl.match) == null ? void 0 : _yl.away_team) == null ? void 0 : _zl.name)}</span></div><div class="team-bg-h1" data-v-340f6857><span class="away-bg" data-v-340f6857></span></div><table width="100%" cellspacing="0" class="team-table-guest table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr class="team-guest" data-v-340f6857><th height="25" data-v-340f6857></th><th data-v-340f6857>0</th><th data-v-340f6857>1</th><th data-v-340f6857>2</th><th data-v-340f6857>3</th><th data-v-340f6857>4+</th><th data-v-340f6857>${ssrInterpolate(unref($t)("1st half"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("1st half"))}</th></tr><tr class="bg-td1" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</td><!--[-->`);
      ssrRenderList((_Bl = (_Al = unref(matchesAnalysis)) == null ? void 0 : _Al.away_goals) == null ? void 0 : _Bl[0], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr class="bg-td1" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</td><!--[-->`);
      ssrRenderList((_Dl = (_Cl = unref(matchesAnalysis)) == null ? void 0 : _Cl.away_goals) == null ? void 0 : _Dl[1], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr class="bg-td1" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</td><!--[-->`);
      ssrRenderList((_Fl = (_El = unref(matchesAnalysis)) == null ? void 0 : _El.away_goals) == null ? void 0 : _Fl[2], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr></tbody></table></div></div></div><div class="porletP table-two mt-3" id="porletP11" style="${ssrRenderStyle([
        ((_Hl = (_Gl = unref(settingsH2hList)) == null ? void 0 : _Gl.find((item) => (item == null ? void 0 : item.div_id) === "porletP11")) == null ? void 0 : _Hl.show) === true ? null : { display: "none" },
        "order: " + ((_Jl = (_Il = unref(settingsH2hList)) == null ? void 0 : _Il.find((item) => (item == null ? void 0 : item.div_id) === "porletP11")) == null ? void 0 : _Jl.order)
      ])}" data-v-340f6857><div class="team-table-title row" data-v-340f6857><span class="col-12 text-center" data-v-340f6857>${ssrInterpolate(unref($t)("HT/FT Details"))}</span></div><div class="team-div row" data-v-340f6857><div class="home-div col-12 col-md-6" data-v-340f6857><div class="team-table-xq-home col-12 team-table-title text-start" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_Ml = (_Ll = (_Kl = unref(matchLiveDetail)) == null ? void 0 : _Kl.match) == null ? void 0 : _Ll.home_team) == null ? void 0 : _Ml.name)}</span></div><div class="team-bg-h1" data-v-340f6857><span class="home-bg" data-v-340f6857></span></div><table width="100%" cellspacing="0" class="team-table-home table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr class="" data-v-340f6857><th data-v-340f6857>${ssrInterpolate(unref($t)("HT"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th></tr><tr class="" data-v-340f6857><th data-v-340f6857>${ssrInterpolate(unref($t)("FT"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th></tr><tr class="bg-td1" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</td><!--[-->`);
      ssrRenderList((_Ol = (_Nl = unref(matchesAnalysis)) == null ? void 0 : _Nl.home_ht) == null ? void 0 : _Ol[0], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr class="bg-td1" data-v-340f6857><td class="team-home-f" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</td><!--[-->`);
      ssrRenderList((_Ql = (_Pl = unref(matchesAnalysis)) == null ? void 0 : _Pl.home_ht) == null ? void 0 : _Ql[1], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr class="bg-td1" data-v-340f6857><td class="team-away-f" data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</td><!--[-->`);
      ssrRenderList((_Sl = (_Rl = unref(matchesAnalysis)) == null ? void 0 : _Rl.home_ht) == null ? void 0 : _Sl[2], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr></tbody></table></div><div class="guest-div col-12 col-md-6" data-v-340f6857><div class="team-table-xq-guest col-12 text-md-end team-table-title" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_Vl = (_Ul = (_Tl = unref(matchLiveDetail)) == null ? void 0 : _Tl.match) == null ? void 0 : _Ul.away_team) == null ? void 0 : _Vl.name)}</span></div><div class="team-bg-h1" data-v-340f6857><span class="away-bg" data-v-340f6857></span></div><table width="100%" cellspacing="0" class="team-table-guest table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr class="" data-v-340f6857><th data-v-340f6857>${ssrInterpolate(unref($t)("HT"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th></tr><tr class="" data-v-340f6857><th data-v-340f6857>${ssrInterpolate(unref($t)("FT"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("W"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("D"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("L"))}</th></tr><tr class="bg-td1" data-v-340f6857><td data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</td><!--[-->`);
      ssrRenderList((_Xl = (_Wl = unref(matchesAnalysis)) == null ? void 0 : _Wl.away_ht) == null ? void 0 : _Xl[0], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr class="bg-td1" data-v-340f6857><td class="team-home-f" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</td><!--[-->`);
      ssrRenderList((_Zl = (_Yl = unref(matchesAnalysis)) == null ? void 0 : _Yl.away_ht) == null ? void 0 : _Zl[1], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr class="bg-td1" data-v-340f6857><td class="team-away-f" data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</td><!--[-->`);
      ssrRenderList((_$l = (__l = unref(matchesAnalysis)) == null ? void 0 : __l.away_ht) == null ? void 0 : _$l[2], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr></tbody></table></div></div></div><div class="porletP table-two mt-3" id="porletP13" style="${ssrRenderStyle([
        ((_bm = (_am = unref(settingsH2hList)) == null ? void 0 : _am.find((item) => (item == null ? void 0 : item.div_id) === "porletP13")) == null ? void 0 : _bm.show) === true ? null : { display: "none" },
        "order: " + ((_dm = (_cm = unref(settingsH2hList)) == null ? void 0 : _cm.find((item) => (item == null ? void 0 : item.div_id) === "porletP13")) == null ? void 0 : _dm.order)
      ])}" data-v-340f6857><div class="team-table-title row" data-v-340f6857><div class="col-12 text-center team-table-xq-title" data-v-340f6857>${ssrInterpolate(unref($t)("Goal scoring time"))}</div></div><div class="team-div row" data-v-340f6857><div class="home-div col-12 col-md-6" data-v-340f6857><div class="team-table-xq-home col-12 team-table-title text-start" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_gm = (_fm = (_em = unref(matchLiveDetail)) == null ? void 0 : _em.match) == null ? void 0 : _fm.home_team) == null ? void 0 : _gm.name)}</span></div><div class="team-bg-h1" data-v-340f6857><span class="home-bg" data-v-340f6857></span></div><table width="100%" cellspacing="0" class="team-table-home table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr data-v-340f6857><th height="25" data-v-340f6857></th><th data-v-340f6857>1-10</th><th data-v-340f6857>11-20</th><th data-v-340f6857>21-30</th><th data-v-340f6857>31-40</th><th data-v-340f6857>41-45</th><th data-v-340f6857>46-50</th><th data-v-340f6857>51-60</th><th data-v-340f6857>61-70</th><th data-v-340f6857>71-80</th><th data-v-340f6857>81-90+</th></tr><tr data-v-340f6857><td height="25" data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</td><!--[-->`);
      ssrRenderList((_im = (_hm = unref(matchesAnalysis)) == null ? void 0 : _hm.home_shoot_time) == null ? void 0 : _im[0], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><td height="25" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</td><!--[-->`);
      ssrRenderList((_km = (_jm = unref(matchesAnalysis)) == null ? void 0 : _jm.home_shoot_time) == null ? void 0 : _km[1], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><td height="25" data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</td><!--[-->`);
      ssrRenderList((_mm = (_lm = unref(matchesAnalysis)) == null ? void 0 : _lm.home_shoot_time) == null ? void 0 : _mm[2], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><td colspan="11" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Time of first goal"))}</b></td></tr><tr data-v-340f6857><td height="25" data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</td><!--[-->`);
      ssrRenderList((_om = (_nm = unref(matchesAnalysis)) == null ? void 0 : _nm.home_shoot_time) == null ? void 0 : _om[3], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><td height="25" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</td><!--[-->`);
      ssrRenderList((_qm = (_pm = unref(matchesAnalysis)) == null ? void 0 : _pm.home_shoot_time) == null ? void 0 : _qm[4], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><td height="25" data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</td><!--[-->`);
      ssrRenderList((_sm = (_rm = unref(matchesAnalysis)) == null ? void 0 : _rm.home_shoot_time) == null ? void 0 : _sm[5], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr></tbody></table></div><div class="guest-div col-12 col-md-6" data-v-340f6857><div class="team-table-xq-guest col-12 text-md-end team-table-title" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_vm = (_um = (_tm = unref(matchLiveDetail)) == null ? void 0 : _tm.match) == null ? void 0 : _um.away_team) == null ? void 0 : _vm.name)}</span></div><div class="team-bg-h1" data-v-340f6857><span class="away-bg" data-v-340f6857></span></div><table width="100%" cellspacing="0" class="team-table-guest table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr data-v-340f6857><th height="25" data-v-340f6857></th><th data-v-340f6857>1-10</th><th data-v-340f6857>11-20</th><th data-v-340f6857>21-30</th><th data-v-340f6857>31-40</th><th data-v-340f6857>41-45</th><th data-v-340f6857>46-50</th><th data-v-340f6857>51-60</th><th data-v-340f6857>61-70</th><th data-v-340f6857>71-80</th><th data-v-340f6857>81-90+</th></tr><tr data-v-340f6857><td height="25" data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</td><!--[-->`);
      ssrRenderList((_xm = (_wm = unref(matchesAnalysis)) == null ? void 0 : _wm.away_shoot_time) == null ? void 0 : _xm[0], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><td height="25" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</td><!--[-->`);
      ssrRenderList((_zm = (_ym = unref(matchesAnalysis)) == null ? void 0 : _ym.away_shoot_time) == null ? void 0 : _zm[1], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><td height="25" data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</td><!--[-->`);
      ssrRenderList((_Bm = (_Am = unref(matchesAnalysis)) == null ? void 0 : _Am.away_shoot_time) == null ? void 0 : _Bm[2], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><td colspan="11" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Time of first goal"))}</b></td></tr><tr data-v-340f6857><td height="25" data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</td><!--[-->`);
      ssrRenderList((_Dm = (_Cm = unref(matchesAnalysis)) == null ? void 0 : _Cm.away_shoot_time) == null ? void 0 : _Dm[3], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><td height="25" data-v-340f6857>${ssrInterpolate(unref($t)("Home"))}</td><!--[-->`);
      ssrRenderList((_Fm = (_Em = unref(matchesAnalysis)) == null ? void 0 : _Em.away_shoot_time) == null ? void 0 : _Fm[4], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr><tr data-v-340f6857><td height="25" data-v-340f6857>${ssrInterpolate(unref($t)("Away"))}</td><!--[-->`);
      ssrRenderList((_Hm = (_Gm = unref(matchesAnalysis)) == null ? void 0 : _Gm.away_shoot_time) == null ? void 0 : _Hm[5], (value, index) => {
        _push(`<td data-v-340f6857>${ssrInterpolate(value ? value : "0")}</td>`);
      });
      _push(`<!--]--></tr></tbody></table></div></div></div><div class="porletP table-two mt-3" id="porletP14" style="${ssrRenderStyle([
        ((_Jm = (_Im = unref(settingsH2hList)) == null ? void 0 : _Im.find((item) => (item == null ? void 0 : item.div_id) === "porletP14")) == null ? void 0 : _Jm.show) === true ? null : { display: "none" },
        "order: " + ((_Lm = (_Km = unref(settingsH2hList)) == null ? void 0 : _Km.find((item) => (item == null ? void 0 : item.div_id) === "porletP14")) == null ? void 0 : _Lm.order)
      ])}" data-v-340f6857><div class="team-table-title row" data-v-340f6857><div class="col-12 text-center" data-v-340f6857>${ssrInterpolate(unref($t)("3 upcoming matches"))}</div></div><div class="team-div row" data-v-340f6857><div class="home-div col-12 col-md-6" data-v-340f6857><div class="team-table-xq-home col-12 team-table-title text-start" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_Om = (_Nm = (_Mm = unref(matchLiveDetail)) == null ? void 0 : _Mm.match) == null ? void 0 : _Nm.home_team) == null ? void 0 : _Om.name)}</span></div><div class="team-bg-h1" data-v-340f6857><span class="home-bg" data-v-340f6857></span></div><table width="100%" cellpadding="0" cellspacing="0" class="team-table-home table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr data-v-340f6857><th data-v-340f6857>${ssrInterpolate(unref($t)("League"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Day"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Type"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("VS"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Countdown time"))}</th></tr>`);
      if (((_Qm = (_Pm = unref(matchesAnalysis)) == null ? void 0 : _Pm.away_schedule) == null ? void 0 : _Qm.length) > 0) {
        _push(`<!--[-->`);
        ssrRenderList((_Rm = unref(matchesAnalysis)) == null ? void 0 : _Rm.home_schedule, (item, index) => {
          var _a32, _b32, _c22, _d22, _e22, _f22;
          _push(`<!--[-->`);
          if (index < 3) {
            _push(`<tr data-v-340f6857><td data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[1])}</td><td data-v-340f6857><span name="timeData" data-tf="3" data-v-340f6857>${ssrInterpolate(("timeStamp2DateUTCTimeZone" in _ctx ? _ctx.timeStamp2DateUTCTimeZone : unref(timeStamp2DateUTCTimeZone))(item == null ? void 0 : item[3], "DD-MM-yyyy", unref(timeZone)))}</span></td><td data-v-340f6857>${ssrInterpolate(((_c22 = (_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.home_team) == null ? void 0 : _c22.i_team) == (item == null ? void 0 : item[5]) ? unref($t)("Home") : unref($t)("Away"))}</td><td data-v-340f6857>${ssrInterpolate(((_f22 = (_e22 = (_d22 = unref(matchLiveDetail)) == null ? void 0 : _d22.match) == null ? void 0 : _e22.home_team) == null ? void 0 : _f22.i_team) == (item == null ? void 0 : item[5]) ? item == null ? void 0 : item[6] : item == null ? void 0 : item[4])}</td><td data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[8])} ${ssrInterpolate(unref($t)("Day"))}</td></tr>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<tr data-v-340f6857><td colspan="5" data-v-340f6857>${ssrInterpolate(unref($t)("Empty Data"))}</td></tr>`);
      }
      _push(`</tbody></table></div><div class="guest-div col-12 col-md-6" data-v-340f6857><div class="team-table-xq-guest col-12 text-md-end team-table-title" data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_Um = (_Tm = (_Sm = unref(matchLiveDetail)) == null ? void 0 : _Sm.match) == null ? void 0 : _Tm.away_team) == null ? void 0 : _Um.name)}</span></div><div class="team-bg-h1" data-v-340f6857><span class="away-bg" data-v-340f6857></span></div><table width="100%" cellpadding="0" cellspacing="0" class="team-table-guest table-no-db-lr text-center" data-v-340f6857><tbody data-v-340f6857><tr data-v-340f6857><th data-v-340f6857>${ssrInterpolate(unref($t)("League"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Day"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Type"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("VS"))}</th><th data-v-340f6857>${ssrInterpolate(unref($t)("Countdown time"))}</th></tr>`);
      if (((_Wm = (_Vm = unref(matchesAnalysis)) == null ? void 0 : _Vm.away_schedule) == null ? void 0 : _Wm.length) > 0) {
        _push(`<!--[-->`);
        ssrRenderList((_Xm = unref(matchesAnalysis)) == null ? void 0 : _Xm.away_schedule, (item, index) => {
          var _a32, _b32, _c22, _d22, _e22, _f22;
          _push(`<!--[-->`);
          if (index < 3) {
            _push(`<tr data-v-340f6857><td data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[1])}</td><td data-v-340f6857><span name="timeData" data-tf="3" data-v-340f6857>${ssrInterpolate(("timeStamp2DateUTCTimeZone" in _ctx ? _ctx.timeStamp2DateUTCTimeZone : unref(timeStamp2DateUTCTimeZone))(item == null ? void 0 : item[3], "DD-MM-yyyy", unref(timeZone)))}</span></td><td data-v-340f6857>${ssrInterpolate(((_c22 = (_b32 = (_a32 = unref(matchLiveDetail)) == null ? void 0 : _a32.match) == null ? void 0 : _b32.away_team) == null ? void 0 : _c22.i_team) == (item == null ? void 0 : item[5]) ? unref($t)("Home") : unref($t)("Away"))}</td><td data-v-340f6857>${ssrInterpolate(((_f22 = (_e22 = (_d22 = unref(matchLiveDetail)) == null ? void 0 : _d22.match) == null ? void 0 : _e22.away_team) == null ? void 0 : _f22.i_team) == (item == null ? void 0 : item[5]) ? item == null ? void 0 : item[6] : item == null ? void 0 : item[4])}</td><td data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item[8])} ${ssrInterpolate(unref($t)("Day"))}</td></tr>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<tr data-v-340f6857><td colspan="5" data-v-340f6857>${ssrInterpolate(unref($t)("Empty Data"))}</td></tr>`);
      }
      _push(`</tbody></table></div></div></div><div class="porletP table-three" id="porletP15" style="${ssrRenderStyle([
        ((_Zm = (_Ym = unref(settingsH2hList)) == null ? void 0 : _Ym.find((item) => (item == null ? void 0 : item.div_id) === "porletP15")) == null ? void 0 : _Zm.show) === true ? null : { display: "none" },
        "order: " + ((_$m = (__m = unref(settingsH2hList)) == null ? void 0 : __m.find((item) => (item == null ? void 0 : item.div_id) === "porletP15")) == null ? void 0 : _$m.order)
      ])}" data-v-340f6857>`);
      if (!((_bn = (_an = unref(settingsH2hList)) == null ? void 0 : _an.find((item) => (item == null ? void 0 : item.div_id) === "porletP15")) == null ? void 0 : _bn.hidden_match)) {
        _push(`<!--[--><h2 class="team-table-title" data-v-340f6857>${ssrInterpolate(unref($t)("Injuries and Suspensions"))}</h2><div class="team-div row" data-v-340f6857><div class="home-div col-12 col-md-6" data-v-340f6857><div class="home-m" data-v-340f6857><b data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_en = (_dn = (_cn = unref(matchLiveDetail)) == null ? void 0 : _cn.match) == null ? void 0 : _dn.home_team) == null ? void 0 : _en.name)}</span></b></div>`);
        if (((_in = (_hn = (_gn = (_fn = unref(matchsLineup)) == null ? void 0 : _fn.injury) == null ? void 0 : _gn.home) == null ? void 0 : _hn.filter((item) => (item == null ? void 0 : item.type) === 1)) == null ? void 0 : _in.length) > 0) {
          _push(`<!--[--><div class="Lineup" data-v-340f6857>${ssrInterpolate(unref($t)("Injuries"))}</div><div class="player-list row" data-v-340f6857><!--[-->`);
          ssrRenderList((_ln = (_kn = (_jn = unref(matchsLineup)) == null ? void 0 : _jn.injury) == null ? void 0 : _kn.home) == null ? void 0 : _ln.filter((item) => (item == null ? void 0 : item.type) === 1), (item, index) => {
            _push(`<div${ssrRenderAttr("playerid", item == null ? void 0 : item.id)} class="player-row col-6" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.position)}</b><a data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.name)}</a></div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (((_pn = (_on = (_nn = (_mn = unref(matchsLineup)) == null ? void 0 : _mn.injury) == null ? void 0 : _nn.home) == null ? void 0 : _on.filter((item) => (item == null ? void 0 : item.type) === 2)) == null ? void 0 : _pn.length) > 0) {
          _push(`<!--[--><div class="Backup" data-v-340f6857>${ssrInterpolate(unref($t)("Suspensions"))}</div><div class="player-list row" data-v-340f6857><!--[-->`);
          ssrRenderList((_sn = (_rn = (_qn = unref(matchsLineup)) == null ? void 0 : _qn.injury) == null ? void 0 : _rn.home) == null ? void 0 : _sn.filter((item) => (item == null ? void 0 : item.type) === 2), (item, index) => {
            _push(`<div${ssrRenderAttr("playerid", item == null ? void 0 : item.id)} class="player-row col-6" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.position)}</b><a data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.name)}</a></div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="guest-div col-12 col-md-6" data-v-340f6857><div class="guest-m" data-v-340f6857><b data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_vn = (_un = (_tn = unref(matchLiveDetail)) == null ? void 0 : _tn.match) == null ? void 0 : _un.away_team) == null ? void 0 : _vn.name)}</span></b></div>`);
        if (((_zn = (_yn = (_xn = (_wn = unref(matchsLineup)) == null ? void 0 : _wn.injury) == null ? void 0 : _xn.away) == null ? void 0 : _yn.filter((item) => (item == null ? void 0 : item.type) === 1)) == null ? void 0 : _zn.length) > 0) {
          _push(`<!--[--><div class="Lineup" data-v-340f6857>${ssrInterpolate(unref($t)("Injuries"))}</div><div class="player-list row" data-v-340f6857><!--[-->`);
          ssrRenderList((_Cn = (_Bn = (_An = unref(matchsLineup)) == null ? void 0 : _An.injury) == null ? void 0 : _Bn.away) == null ? void 0 : _Cn.filter((item) => (item == null ? void 0 : item.type) === 1), (item, index) => {
            _push(`<div${ssrRenderAttr("playerid", item == null ? void 0 : item.id)} class="player-row col-6" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.position)}</b><a data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.name)}</a></div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (((_Gn = (_Fn = (_En = (_Dn = unref(matchsLineup)) == null ? void 0 : _Dn.injury) == null ? void 0 : _En.away) == null ? void 0 : _Fn.filter((item) => (item == null ? void 0 : item.type) === 2)) == null ? void 0 : _Gn.length) > 0) {
          _push(`<!--[--><div class="Backup" data-v-340f6857>${ssrInterpolate(unref($t)("Suspensions"))}</div><div class="player-list row" data-v-340f6857><!--[-->`);
          ssrRenderList((_Jn = (_In = (_Hn = unref(matchsLineup)) == null ? void 0 : _Hn.injury) == null ? void 0 : _In.away) == null ? void 0 : _Jn.filter((item) => (item == null ? void 0 : item.type) === 2), (item, index) => {
            _push(`<div${ssrRenderAttr("playerid", item == null ? void 0 : item.id)} class="player-row col-6" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.position)}</b><a data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.name)}</a></div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="porletP table-three" id="porletP16" style="${ssrRenderStyle([
        ((_Ln = (_Kn = unref(settingsH2hList)) == null ? void 0 : _Kn.find((item) => (item == null ? void 0 : item.div_id) === "porletP16")) == null ? void 0 : _Ln.show) === true ? null : { display: "none" },
        "order: " + ((_Nn = (_Mn = unref(settingsH2hList)) == null ? void 0 : _Mn.find((item) => (item == null ? void 0 : item.div_id) === "porletP16")) == null ? void 0 : _Nn.order)
      ])}" data-v-340f6857>`);
      if (!((_Pn = (_On = unref(settingsH2hList)) == null ? void 0 : _On.find((item) => (item == null ? void 0 : item.div_id) === "porletP16")) == null ? void 0 : _Pn.hidden_match)) {
        _push(`<!--[--><h2 class="team-table-title" data-v-340f6857>${ssrInterpolate(unref($t)("Recent lineup"))}</h2><div class="team-div row" data-v-340f6857><div class="home-div col-12 col-md-6" data-v-340f6857><div class="home-m" data-v-340f6857><b data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_Sn = (_Rn = (_Qn = unref(matchLiveDetail)) == null ? void 0 : _Qn.match) == null ? void 0 : _Rn.home_team) == null ? void 0 : _Sn.name)}</span></b></div>`);
        if (((_Vn = (_Un = (_Tn = unref(matchsLastLineup).home) == null ? void 0 : _Tn.lineup) == null ? void 0 : _Un.filter((item) => (item == null ? void 0 : item.first) === 1)) == null ? void 0 : _Vn.length) > 0) {
          _push(`<!--[--><div class="Lineup" data-v-340f6857>${ssrInterpolate(unref($t)("Lineupp"))} (${ssrInterpolate(((_Wn = unref(matchsLastLineup).home) == null ? void 0 : _Wn.home_formation) || ((_Xn = unref(matchsLastLineup).home) == null ? void 0 : _Xn.away_formation))})</div><div class="player-list row" data-v-340f6857><!--[-->`);
          ssrRenderList((_Zn = (_Yn = unref(matchsLastLineup).home) == null ? void 0 : _Yn.lineup) == null ? void 0 : _Zn.filter((item) => (item == null ? void 0 : item.first) === 1), (item, index) => {
            _push(`<div${ssrRenderAttr("playerid", item == null ? void 0 : item.id)} class="player-row col-6" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.position)}</b><span data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.shirt_number)}</span><a data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.name)}</a></div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (((_ao = (_$n = (__n = unref(matchsLastLineup).home) == null ? void 0 : __n.lineup) == null ? void 0 : _$n.filter((item) => (item == null ? void 0 : item.first) === 0)) == null ? void 0 : _ao.length) > 0) {
          _push(`<!--[--><div class="Backup" data-v-340f6857>${ssrInterpolate(unref($t)("Reserve"))}</div><div class="player-list row" data-v-340f6857><!--[-->`);
          ssrRenderList((_co = (_bo = unref(matchsLastLineup).home) == null ? void 0 : _bo.lineup) == null ? void 0 : _co.filter((item) => (item == null ? void 0 : item.first) === 0), (item, index) => {
            _push(`<div${ssrRenderAttr("playerid", item == null ? void 0 : item.id)} class="player-row col-6" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.position)}</b><span data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.shirt_number)}</span><a data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.name)}</a></div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="guest-div col-12 col-md-6" data-v-340f6857><div class="guest-m" data-v-340f6857><b data-v-340f6857><span data-v-340f6857>${ssrInterpolate((_fo = (_eo = (_do = unref(matchLiveDetail)) == null ? void 0 : _do.match) == null ? void 0 : _eo.away_team) == null ? void 0 : _fo.name)}</span></b></div>`);
        if (((_io = (_ho = (_go = unref(matchsLastLineup).away) == null ? void 0 : _go.lineup) == null ? void 0 : _ho.filter((item) => (item == null ? void 0 : item.first) === 1)) == null ? void 0 : _io.length) > 0) {
          _push(`<!--[--><div class="Lineup" data-v-340f6857>${ssrInterpolate(unref($t)("Lineupp"))} (${ssrInterpolate(((_jo = unref(matchsLastLineup).away) == null ? void 0 : _jo.home_formation) || ((_ko = unref(matchsLastLineup).away) == null ? void 0 : _ko.away_formation))})</div><div class="player-list row" onclick="toPlayerInfoPage(event)" data-v-340f6857><!--[-->`);
          ssrRenderList((_mo = (_lo = unref(matchsLastLineup).away) == null ? void 0 : _lo.lineup) == null ? void 0 : _mo.filter((item) => (item == null ? void 0 : item.first) === 1), (item, index) => {
            _push(`<div${ssrRenderAttr("playerid", item == null ? void 0 : item.id)} class="player-row col-6" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.position)}</b><span data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.shirt_number)}</span><a data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.name)}</a></div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (((_po = (_oo = (_no = unref(matchsLastLineup).away) == null ? void 0 : _no.lineup) == null ? void 0 : _oo.filter((item) => (item == null ? void 0 : item.first) === 0)) == null ? void 0 : _po.length) > 0) {
          _push(`<!--[--><div class="Backup" data-v-340f6857>${ssrInterpolate(unref($t)("Reserve"))}</div><div class="player-list row" data-v-340f6857><!--[-->`);
          ssrRenderList((_ro = (_qo = unref(matchsLastLineup).away) == null ? void 0 : _qo.lineup) == null ? void 0 : _ro.filter((item) => (item == null ? void 0 : item.first) === 0), (item, index) => {
            _push(`<div${ssrRenderAttr("playerid", item == null ? void 0 : item.id)} class="player-row col-6" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.position)}</b><span data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.shirt_number)}</span><a data-v-340f6857>${ssrInterpolate(item == null ? void 0 : item.name)}</a></div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="porletP table-compare" id="porletP17" style="${ssrRenderStyle([
        ((_to = (_so = unref(settingsH2hList)) == null ? void 0 : _so.find((item) => (item == null ? void 0 : item.div_id) === "porletP17")) == null ? void 0 : _to.show) === true ? null : { display: "none" },
        "order: " + ((_vo = (_uo = unref(settingsH2hList)) == null ? void 0 : _uo.find((item) => (item == null ? void 0 : item.div_id) === "porletP17")) == null ? void 0 : _vo.order)
      ])}" data-v-340f6857><h2 class="team-table-title" data-v-340f6857>${ssrInterpolate(unref($t)("This season statistics"))}</h2><div class="team-div compare" data-v-340f6857><div class="title row text-center" data-v-340f6857><div class="col-4 d-none d-sm-none d-md-block" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</b></div><div class="col-12 col-md-4" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Performance statistics"))}</b></div><div class="col-4 d-none d-sm-none d-md-block" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Home/Away"))}</b></div></div><div class="content row" data-v-340f6857><div class="fx scoreComp col-12 col-md-6" data-v-340f6857><ul class="fx-tb-a" data-v-340f6857><li clas="" data-v-340f6857><div class="title row text-center col-12 d-md-none" data-v-340f6857><div class="" data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</div></div></li><li data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span data-v-340f6857>[${ssrInterpolate((_xo = (_wo = unref(standingsTable)) == null ? void 0 : _wo.home) == null ? void 0 : _xo.won)}] ${ssrInterpolate(((_zo = (_yo = unref(standingsTable)) == null ? void 0 : _yo.home) == null ? void 0 : _zo.total) > 0 ? (((_Bo = (_Ao = unref(standingsTable)) == null ? void 0 : _Ao.home) == null ? void 0 : _Bo.won) * 100 / ((_Do = (_Co = unref(standingsTable)) == null ? void 0 : _Co.home) == null ? void 0 : _Do.total)).toFixed(1) : "")}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Win"))}</span><span data-v-340f6857>${ssrInterpolate(((_Fo = (_Eo = unref(standingsTable)) == null ? void 0 : _Eo.away) == null ? void 0 : _Fo.total) > 0 ? (((_Ho = (_Go = unref(standingsTable)) == null ? void 0 : _Go.away) == null ? void 0 : _Ho.won) * 100 / ((_Jo = (_Io = unref(standingsTable)) == null ? void 0 : _Io.away) == null ? void 0 : _Jo.total)).toFixed(1) : "")}% [${ssrInterpolate((_Lo = (_Ko = unref(standingsTable)) == null ? void 0 : _Ko.away) == null ? void 0 : _Lo.won)}]</span></div><div class="fx-td-data" data-v-340f6857><div class="home-bg" style="${ssrRenderStyle("width: " + (((_No = (_Mo = unref(standingsTable)) == null ? void 0 : _Mo.home) == null ? void 0 : _No.total) > 0 ? (((_Po = (_Oo = unref(standingsTable)) == null ? void 0 : _Oo.home) == null ? void 0 : _Po.won) * 100 / ((_Ro = (_Qo = unref(standingsTable)) == null ? void 0 : _Qo.home) == null ? void 0 : _Ro.total)).toFixed(1) : 0) + "%")}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="away-bg" style="${ssrRenderStyle("width: " + (((_To = (_So = unref(standingsTable)) == null ? void 0 : _So.away) == null ? void 0 : _To.total) > 0 ? (((_Vo = (_Uo = unref(standingsTable)) == null ? void 0 : _Uo.away) == null ? void 0 : _Vo.won) * 100 / ((_Xo = (_Wo = unref(standingsTable)) == null ? void 0 : _Wo.away) == null ? void 0 : _Xo.total)).toFixed(1) : 0) + "%")}" data-v-340f6857></div></div></li><li data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span data-v-340f6857>[${ssrInterpolate((_Zo = (_Yo = unref(standingsTable)) == null ? void 0 : _Yo.home) == null ? void 0 : _Zo.draw)}] ${ssrInterpolate(((_$o = (__o = unref(standingsTable)) == null ? void 0 : __o.home) == null ? void 0 : _$o.total) > 0 ? (((_bp = (_ap = unref(standingsTable)) == null ? void 0 : _ap.home) == null ? void 0 : _bp.draw) * 100 / ((_dp = (_cp = unref(standingsTable)) == null ? void 0 : _cp.home) == null ? void 0 : _dp.total)).toFixed(1) : 0)}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Draw"))}</span><span data-v-340f6857>${ssrInterpolate(((_fp = (_ep = unref(standingsTable)) == null ? void 0 : _ep.away) == null ? void 0 : _fp.total) > 0 ? (((_hp = (_gp = unref(standingsTable)) == null ? void 0 : _gp.away) == null ? void 0 : _hp.draw) * 100 / ((_jp = (_ip = unref(standingsTable)) == null ? void 0 : _ip.away) == null ? void 0 : _jp.total)).toFixed(1) : "")}% [${ssrInterpolate((_lp = (_kp = unref(standingsTable)) == null ? void 0 : _kp.away) == null ? void 0 : _lp.won)}]</span></div><div class="fx-td-data" data-v-340f6857><div class="home-bg" style="${ssrRenderStyle("width: " + (((_np = (_mp = unref(standingsTable)) == null ? void 0 : _mp.home) == null ? void 0 : _np.total) > 0 ? (((_pp = (_op = unref(standingsTable)) == null ? void 0 : _op.home) == null ? void 0 : _pp.draw) * 100 / ((_rp = (_qp = unref(standingsTable)) == null ? void 0 : _qp.home) == null ? void 0 : _rp.total)).toFixed(1) : 0) + "%")}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="away-bg" style="${ssrRenderStyle("width: " + (((_tp = (_sp = unref(standingsTable)) == null ? void 0 : _sp.away) == null ? void 0 : _tp.total) > 0 ? (((_vp = (_up = unref(standingsTable)) == null ? void 0 : _up.away) == null ? void 0 : _vp.draw) * 100 / ((_xp = (_wp = unref(standingsTable)) == null ? void 0 : _wp.away) == null ? void 0 : _xp.total)).toFixed(1) : 0) + "%")}" data-v-340f6857></div></div></li><li data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span data-v-340f6857>[${ssrInterpolate((_zp = (_yp = unref(standingsTable)) == null ? void 0 : _yp.home) == null ? void 0 : _zp.loss)}] ${ssrInterpolate(((_Bp = (_Ap = unref(standingsTable)) == null ? void 0 : _Ap.home) == null ? void 0 : _Bp.total) > 0 ? (((_Dp = (_Cp = unref(standingsTable)) == null ? void 0 : _Cp.home) == null ? void 0 : _Dp.loss) * 100 / ((_Fp = (_Ep = unref(standingsTable)) == null ? void 0 : _Ep.home) == null ? void 0 : _Fp.total)).toFixed(1) : 0)}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Loss"))}</span><span data-v-340f6857>${ssrInterpolate(((_Hp = (_Gp = unref(standingsTable)) == null ? void 0 : _Gp.away) == null ? void 0 : _Hp.total) > 0 ? (((_Jp = (_Ip = unref(standingsTable)) == null ? void 0 : _Ip.away) == null ? void 0 : _Jp.loss) * 100 / ((_Lp = (_Kp = unref(standingsTable)) == null ? void 0 : _Kp.away) == null ? void 0 : _Lp.total)).toFixed(1) : 0)}% [${ssrInterpolate((_Np = (_Mp = unref(standingsTable)) == null ? void 0 : _Mp.away) == null ? void 0 : _Np.loss)}]</span></div><div class="fx-td-data" data-v-340f6857><div class="home-bg" style="${ssrRenderStyle("width: " + (((_Pp = (_Op = unref(standingsTable)) == null ? void 0 : _Op.home) == null ? void 0 : _Pp.total) > 0 ? (((_Rp = (_Qp = unref(standingsTable)) == null ? void 0 : _Qp.home) == null ? void 0 : _Rp.loss) * 100 / ((_Tp = (_Sp = unref(standingsTable)) == null ? void 0 : _Sp.home) == null ? void 0 : _Tp.total)).toFixed(1) : 0) + "%")}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="away-bg" style="${ssrRenderStyle("width: " + (((_Vp = (_Up = unref(standingsTable)) == null ? void 0 : _Up.away) == null ? void 0 : _Vp.total) > 0 ? (((_Xp = (_Wp = unref(standingsTable)) == null ? void 0 : _Wp.away) == null ? void 0 : _Xp.loss) * 100 / ((_Zp = (_Yp = unref(standingsTable)) == null ? void 0 : _Yp.away) == null ? void 0 : _Zp.total)).toFixed(1) : 0) + "%")}" data-v-340f6857></div></div></li></ul></div><div class="fx missComp col-12 col-md-6" data-v-340f6857><ul class="fx-tb-a" data-v-340f6857><li clas="" data-v-340f6857><div class="title row text-center col-12 d-md-none" data-v-340f6857><div class="" data-v-340f6857>${ssrInterpolate(unref($t)("Home/Away"))}</div></div></li><li data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span data-v-340f6857>[${ssrInterpolate((_$p = (__p = unref(standingsTable)) == null ? void 0 : __p.home) == null ? void 0 : _$p.home_won)}] ${ssrInterpolate(((_bq = (_aq = unref(standingsTable)) == null ? void 0 : _aq.home) == null ? void 0 : _bq.total) > 0 ? (((_dq = (_cq = unref(standingsTable)) == null ? void 0 : _cq.home) == null ? void 0 : _dq.home_won) * 100 / ((_fq = (_eq = unref(standingsTable)) == null ? void 0 : _eq.home) == null ? void 0 : _fq.total)).toFixed(1) : 0)}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Win"))}</span><span data-v-340f6857>${ssrInterpolate(((_hq = (_gq = unref(standingsTable)) == null ? void 0 : _gq.away) == null ? void 0 : _hq.total) > 0 ? (((_jq = (_iq = unref(standingsTable)) == null ? void 0 : _iq.away) == null ? void 0 : _jq.away_won) * 100 / ((_lq = (_kq = unref(standingsTable)) == null ? void 0 : _kq.away) == null ? void 0 : _lq.total)).toFixed(1) : 0)}% [${ssrInterpolate((_nq = (_mq = unref(standingsTable)) == null ? void 0 : _mq.away) == null ? void 0 : _nq.away_won)}]</span></div><div class="fx-td-data" data-v-340f6857><div class="home-bg" style="${ssrRenderStyle("width: " + (((_pq = (_oq = unref(standingsTable)) == null ? void 0 : _oq.home) == null ? void 0 : _pq.total) > 0 ? (((_rq = (_qq = unref(standingsTable)) == null ? void 0 : _qq.home) == null ? void 0 : _rq.home_won) * 100 / ((_tq = (_sq = unref(standingsTable)) == null ? void 0 : _sq.home) == null ? void 0 : _tq.total)).toFixed(1) : 0) + "%")}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="away-bg" style="${ssrRenderStyle("width: " + (((_vq = (_uq = unref(standingsTable)) == null ? void 0 : _uq.away) == null ? void 0 : _vq.total) > 0 ? (((_xq = (_wq = unref(standingsTable)) == null ? void 0 : _wq.away) == null ? void 0 : _xq.away_won) * 100 / ((_zq = (_yq = unref(standingsTable)) == null ? void 0 : _yq.away) == null ? void 0 : _zq.total)).toFixed(1) : 0) + "%")}" data-v-340f6857></div></div></li><li data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span data-v-340f6857>[${ssrInterpolate((_Bq = (_Aq = unref(standingsTable)) == null ? void 0 : _Aq.home) == null ? void 0 : _Bq.home_draw)}] ${ssrInterpolate(((_Dq = (_Cq = unref(standingsTable)) == null ? void 0 : _Cq.home) == null ? void 0 : _Dq.total) > 0 ? (((_Fq = (_Eq = unref(standingsTable)) == null ? void 0 : _Eq.home) == null ? void 0 : _Fq.home_draw) * 100 / ((_Hq = (_Gq = unref(standingsTable)) == null ? void 0 : _Gq.home) == null ? void 0 : _Hq.total)).toFixed(1) : 0)}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Draw"))}</span><span data-v-340f6857>${ssrInterpolate(((_Jq = (_Iq = unref(standingsTable)) == null ? void 0 : _Iq.away) == null ? void 0 : _Jq.total) > 0 ? (((_Lq = (_Kq = unref(standingsTable)) == null ? void 0 : _Kq.away) == null ? void 0 : _Lq.away_draw) * 100 / ((_Nq = (_Mq = unref(standingsTable)) == null ? void 0 : _Mq.away) == null ? void 0 : _Nq.total)).toFixed(1) : 0)}% [${ssrInterpolate((_Pq = (_Oq = unref(standingsTable)) == null ? void 0 : _Oq.away) == null ? void 0 : _Pq.away_draw)}]</span></div><div class="fx-td-data" data-v-340f6857><div class="home-bg" style="${ssrRenderStyle("width: " + (((_Rq = (_Qq = unref(standingsTable)) == null ? void 0 : _Qq.home) == null ? void 0 : _Rq.total) > 0 ? (((_Tq = (_Sq = unref(standingsTable)) == null ? void 0 : _Sq.home) == null ? void 0 : _Tq.home_draw) * 100 / ((_Vq = (_Uq = unref(standingsTable)) == null ? void 0 : _Uq.home) == null ? void 0 : _Vq.total)).toFixed(1) : 0) + "%")}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="away-bg" style="${ssrRenderStyle("width: " + (((_Xq = (_Wq = unref(standingsTable)) == null ? void 0 : _Wq.away) == null ? void 0 : _Xq.total) > 0 ? (((_Zq = (_Yq = unref(standingsTable)) == null ? void 0 : _Yq.away) == null ? void 0 : _Zq.away_draw) * 100 / ((_$q = (__q = unref(standingsTable)) == null ? void 0 : __q.away) == null ? void 0 : _$q.total)).toFixed(1) : 0) + "%")}" data-v-340f6857></div></div></li><li data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span data-v-340f6857>[${ssrInterpolate((_br = (_ar = unref(standingsTable)) == null ? void 0 : _ar.home) == null ? void 0 : _br.home_loss)}] ${ssrInterpolate(((_dr = (_cr = unref(standingsTable)) == null ? void 0 : _cr.home) == null ? void 0 : _dr.total) > 0 ? (((_fr = (_er = unref(standingsTable)) == null ? void 0 : _er.home) == null ? void 0 : _fr.home_loss) * 100 / ((_hr = (_gr = unref(standingsTable)) == null ? void 0 : _gr.home) == null ? void 0 : _hr.total)).toFixed(1) : 0)}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Loss"))}</span><span data-v-340f6857>${ssrInterpolate(((_jr = (_ir = unref(standingsTable)) == null ? void 0 : _ir.away) == null ? void 0 : _jr.total) > 0 ? (((_lr = (_kr = unref(standingsTable)) == null ? void 0 : _kr.away) == null ? void 0 : _lr.away_loss) * 100 / ((_nr = (_mr = unref(standingsTable)) == null ? void 0 : _mr.away) == null ? void 0 : _nr.total)).toFixed(1) : 0)}% [${ssrInterpolate((_pr = (_or = unref(standingsTable)) == null ? void 0 : _or.away) == null ? void 0 : _pr.away_loss)}]</span></div><div class="fx-td-data" data-v-340f6857><div class="home-bg" style="${ssrRenderStyle("width: " + (((_rr = (_qr = unref(standingsTable)) == null ? void 0 : _qr.home) == null ? void 0 : _rr.total) > 0 ? (((_tr = (_sr = unref(standingsTable)) == null ? void 0 : _sr.home) == null ? void 0 : _tr.home_loss) * 100 / ((_vr = (_ur = unref(standingsTable)) == null ? void 0 : _ur.home) == null ? void 0 : _vr.total)).toFixed(1) : 0) + "%")}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="away-bg" style="${ssrRenderStyle("width: " + (((_xr = (_wr = unref(standingsTable)) == null ? void 0 : _wr.away) == null ? void 0 : _xr.total) > 0 ? (((_zr = (_yr = unref(standingsTable)) == null ? void 0 : _yr.away) == null ? void 0 : _zr.away_loss) * 100 / ((_Br = (_Ar = unref(standingsTable)) == null ? void 0 : _Ar.away) == null ? void 0 : _Br.total)).toFixed(1) : 0) + "%")}" data-v-340f6857></div></div></li></ul></div></div><div class="div-h4" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Home team goals scored/conceded"))}</b><b data-v-340f6857>${ssrInterpolate(unref($t)("Away team goals scored/conceded"))}</b></div><div class="content row" data-v-340f6857><div class="col-6 fx" data-v-340f6857><div class="fx-div fx-home" data-v-340f6857><div class="fx-logo d-none d-sm-none d-md-block" data-v-340f6857><img name=""${ssrRenderAttr("src", ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(!!((_Er = (_Dr = (_Cr = unref(matchLiveDetail)) == null ? void 0 : _Cr.match) == null ? void 0 : _Dr.home_team) == null ? void 0 : _Er.national) && ((_Hr = (_Gr = (_Fr = unref(matchLiveDetail)) == null ? void 0 : _Fr.match) == null ? void 0 : _Gr.home_team) == null ? void 0 : _Hr.country_logo_o) ? (_Kr = (_Jr = (_Ir = unref(matchLiveDetail)) == null ? void 0 : _Ir.match) == null ? void 0 : _Jr.home_team) == null ? void 0 : _Kr.country_logo_o : (_Nr = (_Mr = (_Lr = unref(matchLiveDetail)) == null ? void 0 : _Lr.match) == null ? void 0 : _Mr.home_team) == null ? void 0 : _Nr.logo_o, "team") + "!h50")}${ssrRenderAttr("alt", (_Qr = (_Pr = (_Or = unref(matchLiveDetail)) == null ? void 0 : _Or.match) == null ? void 0 : _Pr.home_team) == null ? void 0 : _Qr.name)} data-v-340f6857></div><ul class="fx-tb-b long2" data-v-340f6857><li data-v-340f6857><div class="div-h4" data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</div></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Goal"))}</b><div class="fx-td-data2 home-bg" style="${ssrRenderStyle("width: " + (((_Sr = (_Rr = unref(standingsTable)) == null ? void 0 : _Rr.home) == null ? void 0 : _Sr.goals) + ((_Ur = (_Tr = unref(standingsTable)) == null ? void 0 : _Tr.away) == null ? void 0 : _Ur.goals) > 0 ? (((_Wr = (_Vr = unref(standingsTable)) == null ? void 0 : _Vr.home) == null ? void 0 : _Wr.goals) * 100 / ((((_Yr = (_Xr = unref(standingsTable)) == null ? void 0 : _Xr.home) == null ? void 0 : _Yr.goals) + ((__r = (_Zr = unref(standingsTable)) == null ? void 0 : _Zr.away) == null ? void 0 : __r.goals)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="win-f" data-v-340f6857>${ssrInterpolate((_as = (_$r = unref(standingsTable)) == null ? void 0 : _$r.home) == null ? void 0 : _as.goals)}\xA0</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Conceded"))}</b><div class="fx-td-data2 home-bg" style="${ssrRenderStyle("width: " + (((_cs = (_bs = unref(standingsTable)) == null ? void 0 : _bs.home) == null ? void 0 : _cs.goals_against) + ((_es = (_ds = unref(standingsTable)) == null ? void 0 : _ds.away) == null ? void 0 : _es.goals_against) > 0 ? (((_gs = (_fs = unref(standingsTable)) == null ? void 0 : _fs.home) == null ? void 0 : _gs.goals_against) * 100 / ((((_is = (_hs = unref(standingsTable)) == null ? void 0 : _hs.home) == null ? void 0 : _is.goals_against) + ((_ks = (_js = unref(standingsTable)) == null ? void 0 : _js.away) == null ? void 0 : _ks.goals_against)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="lose-f" data-v-340f6857>${ssrInterpolate((_ms = (_ls = unref(standingsTable)) == null ? void 0 : _ls.home) == null ? void 0 : _ms.goals_against)}\xA0</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("TB gets points"))}</b><div class="fx-td-data2 home-bg" style="${ssrRenderStyle("width: " + (((_os = (_ns = unref(standingsTable)) == null ? void 0 : _ns.home) == null ? void 0 : _os.goals) + ((_qs = (_ps = unref(standingsTable)) == null ? void 0 : _ps.away) == null ? void 0 : _qs.goals) > 0 ? (((_ss = (_rs = unref(standingsTable)) == null ? void 0 : _rs.home) == null ? void 0 : _ss.goals) * 100 / ((((_us = (_ts = unref(standingsTable)) == null ? void 0 : _ts.home) == null ? void 0 : _us.goals) + ((_ws = (_vs = unref(standingsTable)) == null ? void 0 : _vs.away) == null ? void 0 : _ws.goals)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="win-f" data-v-340f6857>${ssrInterpolate(((_ys = (_xs = unref(standingsTable)) == null ? void 0 : _xs.home) == null ? void 0 : _ys.total) > 0 ? (((_As = (_zs = unref(standingsTable)) == null ? void 0 : _zs.home) == null ? void 0 : _As.goals) / ((_Cs = (_Bs = unref(standingsTable)) == null ? void 0 : _Bs.home) == null ? void 0 : _Cs.total)).toFixed(2) : "")}\xA0</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("TB lost points"))}</b><div class="fx-td-data2 home-bg" style="${ssrRenderStyle("width: " + (((_Es = (_Ds = unref(standingsTable)) == null ? void 0 : _Ds.home) == null ? void 0 : _Es.goals_against) + ((_Gs = (_Fs = unref(standingsTable)) == null ? void 0 : _Fs.away) == null ? void 0 : _Gs.goals_against) > 0 ? (((_Is = (_Hs = unref(standingsTable)) == null ? void 0 : _Hs.home) == null ? void 0 : _Is.goals_against) * 100 / ((((_Ks = (_Js = unref(standingsTable)) == null ? void 0 : _Js.home) == null ? void 0 : _Ks.goals_against) + ((_Ms = (_Ls = unref(standingsTable)) == null ? void 0 : _Ls.away) == null ? void 0 : _Ms.goals_against)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="lose-f" data-v-340f6857>${ssrInterpolate(((_Os = (_Ns = unref(standingsTable)) == null ? void 0 : _Ns.home) == null ? void 0 : _Os.total) > 0 ? (((_Qs = (_Ps = unref(standingsTable)) == null ? void 0 : _Ps.home) == null ? void 0 : _Qs.goals_against) / ((_Ss = (_Rs = unref(standingsTable)) == null ? void 0 : _Rs.home) == null ? void 0 : _Ss.total)).toFixed(2) : "")}\xA0</span></li></ul><ul class="fx-tb-b short2" data-v-340f6857><li data-v-340f6857><div class="div-h4" data-v-340f6857>${ssrInterpolate(unref($t)("Home/Away"))}</div></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Goal"))}</b><div class="fx-td-data2 home-bg" style="${ssrRenderStyle("width: " + (((_Us = (_Ts = unref(standingsTable)) == null ? void 0 : _Ts.home) == null ? void 0 : _Us.home_goals) + ((_Ws = (_Vs = unref(standingsTable)) == null ? void 0 : _Vs.away) == null ? void 0 : _Ws.home_goals) > 0 ? (((_Ys = (_Xs = unref(standingsTable)) == null ? void 0 : _Xs.home) == null ? void 0 : _Ys.home_goals) * 100 / ((((__s = (_Zs = unref(standingsTable)) == null ? void 0 : _Zs.home) == null ? void 0 : __s.home_goals) + ((_at = (_$s = unref(standingsTable)) == null ? void 0 : _$s.away) == null ? void 0 : _at.home_goals)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="win-f" data-v-340f6857>${ssrInterpolate((_ct = (_bt = unref(standingsTable)) == null ? void 0 : _bt.home) == null ? void 0 : _ct.home_goals)}\xA0</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Conceded"))}</b><div class="fx-td-data2 home-bg" style="${ssrRenderStyle("width: " + (((_et = (_dt = unref(standingsTable)) == null ? void 0 : _dt.home) == null ? void 0 : _et.home_goals_against) + ((_gt = (_ft = unref(standingsTable)) == null ? void 0 : _ft.away) == null ? void 0 : _gt.home_goals_against) > 0 ? (((_it = (_ht = unref(standingsTable)) == null ? void 0 : _ht.home) == null ? void 0 : _it.home_goals_against) * 100 / ((((_kt = (_jt = unref(standingsTable)) == null ? void 0 : _jt.home) == null ? void 0 : _kt.home_goals_against) + ((_mt = (_lt = unref(standingsTable)) == null ? void 0 : _lt.away) == null ? void 0 : _mt.home_goals_against)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="lose-f" data-v-340f6857>${ssrInterpolate((_ot = (_nt = unref(standingsTable)) == null ? void 0 : _nt.home) == null ? void 0 : _ot.home_goals_against)}\xA0</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("TB gets points"))}</b><div class="fx-td-data2 home-bg" style="${ssrRenderStyle("width: " + (((_qt = (_pt = unref(standingsTable)) == null ? void 0 : _pt.home) == null ? void 0 : _qt.home_goals) + ((_st = (_rt = unref(standingsTable)) == null ? void 0 : _rt.away) == null ? void 0 : _st.home_goals) > 0 ? (((_ut = (_tt = unref(standingsTable)) == null ? void 0 : _tt.home) == null ? void 0 : _ut.home_goals) * 100 / ((((_wt = (_vt = unref(standingsTable)) == null ? void 0 : _vt.home) == null ? void 0 : _wt.home_goals) + ((_yt = (_xt = unref(standingsTable)) == null ? void 0 : _xt.away) == null ? void 0 : _yt.home_goals)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="win-f" data-v-340f6857>${ssrInterpolate(((_At = (_zt = unref(standingsTable)) == null ? void 0 : _zt.home) == null ? void 0 : _At.total) > 0 ? (((_Ct = (_Bt = unref(standingsTable)) == null ? void 0 : _Bt.home) == null ? void 0 : _Ct.home_goals) / ((_Et = (_Dt = unref(standingsTable)) == null ? void 0 : _Dt.home) == null ? void 0 : _Et.total)).toFixed(2) : "")}\xA0</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("TB lost points"))}</b><div class="fx-td-data2 home-bg" style="${ssrRenderStyle("width: " + (((_Gt = (_Ft = unref(standingsTable)) == null ? void 0 : _Ft.home) == null ? void 0 : _Gt.home_goals_against) + ((_It = (_Ht = unref(standingsTable)) == null ? void 0 : _Ht.away) == null ? void 0 : _It.home_goals_against) > 0 ? (((_Kt = (_Jt = unref(standingsTable)) == null ? void 0 : _Jt.home) == null ? void 0 : _Kt.home_goals_against) * 100 / ((((_Mt = (_Lt = unref(standingsTable)) == null ? void 0 : _Lt.home) == null ? void 0 : _Mt.home_goals_against) + ((_Ot = (_Nt = unref(standingsTable)) == null ? void 0 : _Nt.away) == null ? void 0 : _Ot.home_goals_against)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="lose-f" data-v-340f6857>${ssrInterpolate(((_Qt = (_Pt = unref(standingsTable)) == null ? void 0 : _Pt.home) == null ? void 0 : _Qt.total) > 0 ? (((_St = (_Rt = unref(standingsTable)) == null ? void 0 : _Rt.home) == null ? void 0 : _St.home_goals_against) / ((_Ut = (_Tt = unref(standingsTable)) == null ? void 0 : _Tt.home) == null ? void 0 : _Ut.total)).toFixed(2) : "")}\xA0</span></li></ul><ul class="fx-tb-b short3" data-v-340f6857><li data-v-340f6857><div class="div-h4" data-v-340f6857>${ssrInterpolate(unref($t)("Recent 6"))}</div></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Goal"))}</b><div class="fx-td-data2 home-bg" style="${ssrRenderStyle("width: " + (((_Xt = (_Wt = (_Vt = unref(standingsTable)) == null ? void 0 : _Vt.home) == null ? void 0 : _Wt.lastest) == null ? void 0 : _Xt[4]) + ((__t = (_Zt = (_Yt = unref(standingsTable)) == null ? void 0 : _Yt.away) == null ? void 0 : _Zt.lastest) == null ? void 0 : __t[4]) > 0 ? (((_bu = (_au = (_$t = unref(standingsTable)) == null ? void 0 : _$t.home) == null ? void 0 : _au.lastest) == null ? void 0 : _bu[4]) * 100 / ((((_eu = (_du = (_cu = unref(standingsTable)) == null ? void 0 : _cu.home) == null ? void 0 : _du.lastest) == null ? void 0 : _eu[4]) + ((_hu = (_gu = (_fu = unref(standingsTable)) == null ? void 0 : _fu.away) == null ? void 0 : _gu.lastest) == null ? void 0 : _hu[4])) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="win-f" data-v-340f6857>${ssrInterpolate((_ku = (_ju = (_iu = unref(standingsTable)) == null ? void 0 : _iu.home) == null ? void 0 : _ju.lastest) == null ? void 0 : _ku[4])}\xA0</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Conceded"))}</b><div class="fx-td-data2 home-bg" style="${ssrRenderStyle("width: " + (((_nu = (_mu = (_lu = unref(standingsTable)) == null ? void 0 : _lu.home) == null ? void 0 : _mu.lastest) == null ? void 0 : _nu[5]) + ((_qu = (_pu = (_ou = unref(standingsTable)) == null ? void 0 : _ou.away) == null ? void 0 : _pu.lastest) == null ? void 0 : _qu[5]) > 0 ? (((_tu = (_su = (_ru = unref(standingsTable)) == null ? void 0 : _ru.home) == null ? void 0 : _su.lastest) == null ? void 0 : _tu[5]) * 100 / ((((_wu = (_vu = (_uu = unref(standingsTable)) == null ? void 0 : _uu.home) == null ? void 0 : _vu.lastest) == null ? void 0 : _wu[5]) + ((_zu = (_yu = (_xu = unref(standingsTable)) == null ? void 0 : _xu.away) == null ? void 0 : _yu.lastest) == null ? void 0 : _zu[5])) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="lose-f" data-v-340f6857>${ssrInterpolate((_Cu = (_Bu = (_Au = unref(standingsTable)) == null ? void 0 : _Au.home) == null ? void 0 : _Bu.lastest) == null ? void 0 : _Cu[5])}\xA0</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("TB gets points"))}</b><div class="fx-td-data2 home-bg" style="${ssrRenderStyle("width: " + (((_Fu = (_Eu = (_Du = unref(standingsTable)) == null ? void 0 : _Du.home) == null ? void 0 : _Eu.lastest) == null ? void 0 : _Fu[4]) + ((_Iu = (_Hu = (_Gu = unref(standingsTable)) == null ? void 0 : _Gu.away) == null ? void 0 : _Hu.lastest) == null ? void 0 : _Iu[4]) > 0 ? (((_Lu = (_Ku = (_Ju = unref(standingsTable)) == null ? void 0 : _Ju.home) == null ? void 0 : _Ku.lastest) == null ? void 0 : _Lu[4]) * 100 / ((((_Ou = (_Nu = (_Mu = unref(standingsTable)) == null ? void 0 : _Mu.home) == null ? void 0 : _Nu.lastest) == null ? void 0 : _Ou[4]) + ((_Ru = (_Qu = (_Pu = unref(standingsTable)) == null ? void 0 : _Pu.away) == null ? void 0 : _Qu.lastest) == null ? void 0 : _Ru[4])) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="win-f" data-v-340f6857>${ssrInterpolate(("parseIntO" in _ctx ? _ctx.parseIntO : unref(parseIntO))((_Uu = (_Tu = (_Su = unref(standingsTable)) == null ? void 0 : _Su.home) == null ? void 0 : _Tu.lastest) == null ? void 0 : _Uu[4]) > 0 ? (((_Xu = (_Wu = (_Vu = unref(standingsTable)) == null ? void 0 : _Vu.home) == null ? void 0 : _Wu.lastest) == null ? void 0 : _Xu[4]) / 6).toFixed(2) : "")}\xA0</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("TB lost points"))}</b><div class="fx-td-data2 home-bg" style="${ssrRenderStyle("width: " + (((__u = (_Zu = (_Yu = unref(standingsTable)) == null ? void 0 : _Yu.home) == null ? void 0 : _Zu.lastest) == null ? void 0 : __u[5]) + ((_bv = (_av = (_$u = unref(standingsTable)) == null ? void 0 : _$u.away) == null ? void 0 : _av.lastest) == null ? void 0 : _bv[5]) > 0 ? (((_ev = (_dv = (_cv = unref(standingsTable)) == null ? void 0 : _cv.home) == null ? void 0 : _dv.lastest) == null ? void 0 : _ev[5]) * 100 / ((((_hv = (_gv = (_fv = unref(standingsTable)) == null ? void 0 : _fv.home) == null ? void 0 : _gv.lastest) == null ? void 0 : _hv[5]) + ((_kv = (_jv = (_iv = unref(standingsTable)) == null ? void 0 : _iv.away) == null ? void 0 : _jv.lastest) == null ? void 0 : _kv[5])) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="lose-f" data-v-340f6857>${ssrInterpolate(("parseIntO" in _ctx ? _ctx.parseIntO : unref(parseIntO))((_nv = (_mv = (_lv = unref(standingsTable)) == null ? void 0 : _lv.home) == null ? void 0 : _mv.lastest) == null ? void 0 : _nv[5]) > 0 ? (((_qv = (_pv = (_ov = unref(standingsTable)) == null ? void 0 : _ov.home) == null ? void 0 : _pv.lastest) == null ? void 0 : _qv[5]) / 6).toFixed(2) : "")}\xA0</span></li></ul></div></div><div class="col-6 fx" data-v-340f6857><div class="fx-div fx-guest" data-v-340f6857><div class="fx-logo d-none d-sm-none d-md-block" data-v-340f6857><img name=""${ssrRenderAttr("src", ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(!!((_tv = (_sv = (_rv = unref(matchLiveDetail)) == null ? void 0 : _rv.match) == null ? void 0 : _sv.away_team) == null ? void 0 : _tv.national) && ((_wv = (_vv = (_uv = unref(matchLiveDetail)) == null ? void 0 : _uv.match) == null ? void 0 : _vv.away_team) == null ? void 0 : _wv.country_logo_o) ? (_zv = (_yv = (_xv = unref(matchLiveDetail)) == null ? void 0 : _xv.match) == null ? void 0 : _yv.away_team) == null ? void 0 : _zv.country_logo_o : (_Cv = (_Bv = (_Av = unref(matchLiveDetail)) == null ? void 0 : _Av.match) == null ? void 0 : _Bv.away_team) == null ? void 0 : _Cv.logo_o, "team") + "!h50")}${ssrRenderAttr("alt", (_Fv = (_Ev = (_Dv = unref(matchLiveDetail)) == null ? void 0 : _Dv.match) == null ? void 0 : _Ev.away_team) == null ? void 0 : _Fv.name)} data-v-340f6857></div><ul class="fx-tb-b long2" data-v-340f6857><div class="div-h4" data-v-340f6857>${ssrInterpolate(unref($t)("Total"))}</div><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Goal"))}</b><div class="fx-td-data2 away-bg" style="${ssrRenderStyle("width: " + (((_Hv = (_Gv = unref(standingsTable)) == null ? void 0 : _Gv.home) == null ? void 0 : _Hv.goals) + ((_Jv = (_Iv = unref(standingsTable)) == null ? void 0 : _Iv.away) == null ? void 0 : _Jv.goals) > 0 ? (((_Lv = (_Kv = unref(standingsTable)) == null ? void 0 : _Kv.away) == null ? void 0 : _Lv.goals) * 100 / ((((_Nv = (_Mv = unref(standingsTable)) == null ? void 0 : _Mv.home) == null ? void 0 : _Nv.goals) + ((_Pv = (_Ov = unref(standingsTable)) == null ? void 0 : _Ov.away) == null ? void 0 : _Pv.goals)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="win-f" data-v-340f6857>${ssrInterpolate((_Rv = (_Qv = unref(standingsTable)) == null ? void 0 : _Qv.away) == null ? void 0 : _Rv.goals)}</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Conceded"))}</b><div class="fx-td-data2 away-bg" style="${ssrRenderStyle("width: " + (((_Tv = (_Sv = unref(standingsTable)) == null ? void 0 : _Sv.home) == null ? void 0 : _Tv.goals_against) + ((_Vv = (_Uv = unref(standingsTable)) == null ? void 0 : _Uv.away) == null ? void 0 : _Vv.goals_against) > 0 ? (((_Xv = (_Wv = unref(standingsTable)) == null ? void 0 : _Wv.away) == null ? void 0 : _Xv.goals_against) * 100 / ((((_Zv = (_Yv = unref(standingsTable)) == null ? void 0 : _Yv.home) == null ? void 0 : _Zv.goals_against) + ((_$v = (__v = unref(standingsTable)) == null ? void 0 : __v.away) == null ? void 0 : _$v.goals_against)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="lose-f" data-v-340f6857>${ssrInterpolate((_bw = (_aw = unref(standingsTable)) == null ? void 0 : _aw.away) == null ? void 0 : _bw.goals_against)}</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("TB gets points"))}</b><div class="fx-td-data2 away-bg" style="${ssrRenderStyle("width: " + (((_dw = (_cw = unref(standingsTable)) == null ? void 0 : _cw.home) == null ? void 0 : _dw.goals) + ((_fw = (_ew = unref(standingsTable)) == null ? void 0 : _ew.away) == null ? void 0 : _fw.goals) > 0 ? (((_hw = (_gw = unref(standingsTable)) == null ? void 0 : _gw.away) == null ? void 0 : _hw.goals) * 100 / ((((_jw = (_iw = unref(standingsTable)) == null ? void 0 : _iw.home) == null ? void 0 : _jw.goals) + ((_lw = (_kw = unref(standingsTable)) == null ? void 0 : _kw.away) == null ? void 0 : _lw.goals)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="win-f" data-v-340f6857>${ssrInterpolate(((_nw = (_mw = unref(standingsTable)) == null ? void 0 : _mw.away) == null ? void 0 : _nw.total) > 0 ? (((_pw = (_ow = unref(standingsTable)) == null ? void 0 : _ow.away) == null ? void 0 : _pw.goals) / ((_rw = (_qw = unref(standingsTable)) == null ? void 0 : _qw.away) == null ? void 0 : _rw.total)).toFixed(2) : "")}</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("TB lost points"))}</b><div class="fx-td-data2 away-bg" style="${ssrRenderStyle("width: " + (((_tw = (_sw = unref(standingsTable)) == null ? void 0 : _sw.home) == null ? void 0 : _tw.goals_against) + ((_vw = (_uw = unref(standingsTable)) == null ? void 0 : _uw.away) == null ? void 0 : _vw.goals_against) > 0 ? (((_xw = (_ww = unref(standingsTable)) == null ? void 0 : _ww.away) == null ? void 0 : _xw.goals_against) * 100 / ((((_zw = (_yw = unref(standingsTable)) == null ? void 0 : _yw.home) == null ? void 0 : _zw.goals_against) + ((_Bw = (_Aw = unref(standingsTable)) == null ? void 0 : _Aw.away) == null ? void 0 : _Bw.goals_against)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="lose-f" data-v-340f6857>${ssrInterpolate(((_Dw = (_Cw = unref(standingsTable)) == null ? void 0 : _Cw.away) == null ? void 0 : _Dw.total) > 0 ? (((_Fw = (_Ew = unref(standingsTable)) == null ? void 0 : _Ew.away) == null ? void 0 : _Fw.goals_against) / ((_Hw = (_Gw = unref(standingsTable)) == null ? void 0 : _Gw.away) == null ? void 0 : _Hw.total)).toFixed(2) : "")}</span></li></ul><ul class="fx-tb-b short2" data-v-340f6857><li data-v-340f6857><div class="div-h4" data-v-340f6857>${ssrInterpolate(unref($t)("Home/Away"))}</div></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Goal"))}</b><div class="fx-td-data2 away-bg" style="${ssrRenderStyle("width: " + (((_Jw = (_Iw = unref(standingsTable)) == null ? void 0 : _Iw.home) == null ? void 0 : _Jw.home_goals) + ((_Lw = (_Kw = unref(standingsTable)) == null ? void 0 : _Kw.away) == null ? void 0 : _Lw.home_goals) > 0 ? (((_Nw = (_Mw = unref(standingsTable)) == null ? void 0 : _Mw.away) == null ? void 0 : _Nw.home_goals) * 100 / ((((_Pw = (_Ow = unref(standingsTable)) == null ? void 0 : _Ow.home) == null ? void 0 : _Pw.home_goals) + ((_Rw = (_Qw = unref(standingsTable)) == null ? void 0 : _Qw.away) == null ? void 0 : _Rw.home_goals)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="win-f" data-v-340f6857>${ssrInterpolate((_Tw = (_Sw = unref(standingsTable)) == null ? void 0 : _Sw.away) == null ? void 0 : _Tw.home_goals)}</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Conceded"))}</b><div class="fx-td-data2 away-bg" style="${ssrRenderStyle("width: " + (((_Vw = (_Uw = unref(standingsTable)) == null ? void 0 : _Uw.home) == null ? void 0 : _Vw.home_goals_against) + ((_Xw = (_Ww = unref(standingsTable)) == null ? void 0 : _Ww.away) == null ? void 0 : _Xw.home_goals_against) > 0 ? (((_Zw = (_Yw = unref(standingsTable)) == null ? void 0 : _Yw.away) == null ? void 0 : _Zw.home_goals_against) * 100 / ((((_$w = (__w = unref(standingsTable)) == null ? void 0 : __w.home) == null ? void 0 : _$w.home_goals_against) + ((_bx = (_ax = unref(standingsTable)) == null ? void 0 : _ax.away) == null ? void 0 : _bx.home_goals_against)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="lose-f" data-v-340f6857>${ssrInterpolate((_dx = (_cx = unref(standingsTable)) == null ? void 0 : _cx.away) == null ? void 0 : _dx.home_goals_against)}</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("TB gets points"))}</b><div class="fx-td-data2 away-bg" style="${ssrRenderStyle("width: " + (((_fx = (_ex = unref(standingsTable)) == null ? void 0 : _ex.home) == null ? void 0 : _fx.home_goals) + ((_hx = (_gx = unref(standingsTable)) == null ? void 0 : _gx.away) == null ? void 0 : _hx.home_goals) > 0 ? (((_jx = (_ix = unref(standingsTable)) == null ? void 0 : _ix.away) == null ? void 0 : _jx.home_goals) * 100 / ((((_lx = (_kx = unref(standingsTable)) == null ? void 0 : _kx.home) == null ? void 0 : _lx.home_goals) + ((_nx = (_mx = unref(standingsTable)) == null ? void 0 : _mx.away) == null ? void 0 : _nx.home_goals)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="win-f" data-v-340f6857>${ssrInterpolate(((_px = (_ox = unref(standingsTable)) == null ? void 0 : _ox.away) == null ? void 0 : _px.total) > 0 ? (((_rx = (_qx = unref(standingsTable)) == null ? void 0 : _qx.away) == null ? void 0 : _rx.home_goals) / ((_tx = (_sx = unref(standingsTable)) == null ? void 0 : _sx.away) == null ? void 0 : _tx.total)).toFixed(2) : "")}</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("TB lost points"))}</b><div class="fx-td-data2 away-bg" style="${ssrRenderStyle("width: " + (((_vx = (_ux = unref(standingsTable)) == null ? void 0 : _ux.home) == null ? void 0 : _vx.home_goals_against) + ((_xx = (_wx = unref(standingsTable)) == null ? void 0 : _wx.away) == null ? void 0 : _xx.home_goals_against) > 0 ? (((_zx = (_yx = unref(standingsTable)) == null ? void 0 : _yx.away) == null ? void 0 : _zx.home_goals_against) * 100 / ((((_Bx = (_Ax = unref(standingsTable)) == null ? void 0 : _Ax.home) == null ? void 0 : _Bx.home_goals_against) + ((_Dx = (_Cx = unref(standingsTable)) == null ? void 0 : _Cx.away) == null ? void 0 : _Dx.home_goals_against)) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="lose-f" data-v-340f6857>${ssrInterpolate(((_Fx = (_Ex = unref(standingsTable)) == null ? void 0 : _Ex.away) == null ? void 0 : _Fx.total) > 0 ? (((_Hx = (_Gx = unref(standingsTable)) == null ? void 0 : _Gx.away) == null ? void 0 : _Hx.home_goals_against) / ((_Jx = (_Ix = unref(standingsTable)) == null ? void 0 : _Ix.away) == null ? void 0 : _Jx.total)).toFixed(2) : "")}</span></li></ul><ul class="fx-tb-b short3" data-v-340f6857><li data-v-340f6857><div class="div-h4" data-v-340f6857>${ssrInterpolate(unref($t)("Recent 6"))}</div></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Goal"))}</b><div class="fx-td-data2 away-bg" style="${ssrRenderStyle("width: " + (((_Mx = (_Lx = (_Kx = unref(standingsTable)) == null ? void 0 : _Kx.home) == null ? void 0 : _Lx.lastest) == null ? void 0 : _Mx[4]) + ((_Px = (_Ox = (_Nx = unref(standingsTable)) == null ? void 0 : _Nx.away) == null ? void 0 : _Ox.lastest) == null ? void 0 : _Px[4]) > 0 ? (((_Sx = (_Rx = (_Qx = unref(standingsTable)) == null ? void 0 : _Qx.away) == null ? void 0 : _Rx.lastest) == null ? void 0 : _Sx[4]) * 100 / ((((_Vx = (_Ux = (_Tx = unref(standingsTable)) == null ? void 0 : _Tx.home) == null ? void 0 : _Ux.lastest) == null ? void 0 : _Vx[4]) + ((_Yx = (_Xx = (_Wx = unref(standingsTable)) == null ? void 0 : _Wx.away) == null ? void 0 : _Xx.lastest) == null ? void 0 : _Yx[4])) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="win-f" data-v-340f6857>${ssrInterpolate((_$x = (__x = (_Zx = unref(standingsTable)) == null ? void 0 : _Zx.away) == null ? void 0 : __x.lastest) == null ? void 0 : _$x[4])}</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Conceded"))}</b><div class="fx-td-data2 away-bg" style="${ssrRenderStyle("width: " + (((_cy = (_by = (_ay = unref(standingsTable)) == null ? void 0 : _ay.home) == null ? void 0 : _by.lastest) == null ? void 0 : _cy[5]) + ((_fy = (_ey = (_dy = unref(standingsTable)) == null ? void 0 : _dy.away) == null ? void 0 : _ey.lastest) == null ? void 0 : _fy[5]) > 0 ? (((_iy = (_hy = (_gy = unref(standingsTable)) == null ? void 0 : _gy.away) == null ? void 0 : _hy.lastest) == null ? void 0 : _iy[5]) * 100 / ((((_ly = (_ky = (_jy = unref(standingsTable)) == null ? void 0 : _jy.home) == null ? void 0 : _ky.lastest) == null ? void 0 : _ly[5]) + ((_oy = (_ny = (_my = unref(standingsTable)) == null ? void 0 : _my.away) == null ? void 0 : _ny.lastest) == null ? void 0 : _oy[5])) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="lose-f" data-v-340f6857>${ssrInterpolate((_ry = (_qy = (_py = unref(standingsTable)) == null ? void 0 : _py.away) == null ? void 0 : _qy.lastest) == null ? void 0 : _ry[5])}</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("TB gets points"))}</b><div class="fx-td-data2 away-bg" style="${ssrRenderStyle("width: " + (((_uy = (_ty = (_sy = unref(standingsTable)) == null ? void 0 : _sy.home) == null ? void 0 : _ty.lastest) == null ? void 0 : _uy[4]) + ((_xy = (_wy = (_vy = unref(standingsTable)) == null ? void 0 : _vy.away) == null ? void 0 : _wy.lastest) == null ? void 0 : _xy[4]) > 0 ? (((_Ay = (_zy = (_yy = unref(standingsTable)) == null ? void 0 : _yy.away) == null ? void 0 : _zy.lastest) == null ? void 0 : _Ay[4]) * 100 / ((((_Dy = (_Cy = (_By = unref(standingsTable)) == null ? void 0 : _By.home) == null ? void 0 : _Cy.lastest) == null ? void 0 : _Dy[4]) + ((_Gy = (_Fy = (_Ey = unref(standingsTable)) == null ? void 0 : _Ey.away) == null ? void 0 : _Fy.lastest) == null ? void 0 : _Gy[4])) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="win-f" data-v-340f6857>${ssrInterpolate(("parseIntO" in _ctx ? _ctx.parseIntO : unref(parseIntO))((_Jy = (_Iy = (_Hy = unref(standingsTable)) == null ? void 0 : _Hy.away) == null ? void 0 : _Iy.lastest) == null ? void 0 : _Jy[5]) > 0 ? (("parseIntO" in _ctx ? _ctx.parseIntO : unref(parseIntO))((_My = (_Ly = (_Ky = unref(standingsTable)) == null ? void 0 : _Ky.away) == null ? void 0 : _Ly.lastest) == null ? void 0 : _My[4]) / 6).toFixed(2) : "")}</span></li><li data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("TB lost points"))}</b><div class="fx-td-data2 away-bg" style="${ssrRenderStyle("width: " + (((_Py = (_Oy = (_Ny = unref(standingsTable)) == null ? void 0 : _Ny.home) == null ? void 0 : _Oy.lastest) == null ? void 0 : _Py[5]) + ((_Sy = (_Ry = (_Qy = unref(standingsTable)) == null ? void 0 : _Qy.away) == null ? void 0 : _Ry.lastest) == null ? void 0 : _Sy[5]) > 0 ? (((_Vy = (_Uy = (_Ty = unref(standingsTable)) == null ? void 0 : _Ty.away) == null ? void 0 : _Uy.lastest) == null ? void 0 : _Vy[5]) * 100 / ((((_Yy = (_Xy = (_Wy = unref(standingsTable)) == null ? void 0 : _Wy.home) == null ? void 0 : _Xy.lastest) == null ? void 0 : _Yy[5]) + ((_$y = (__y = (_Zy = unref(standingsTable)) == null ? void 0 : _Zy.away) == null ? void 0 : __y.lastest) == null ? void 0 : _$y[5])) * 4)).toFixed(0) : 0) + "%")}" data-v-340f6857></div><span class="lose-f" data-v-340f6857>${ssrInterpolate(("parseIntO" in _ctx ? _ctx.parseIntO : unref(parseIntO))((_cz = (_bz = (_az = unref(standingsTable)) == null ? void 0 : _az.away) == null ? void 0 : _bz.lastest) == null ? void 0 : _cz[5]) > 0 ? (("parseIntO" in _ctx ? _ctx.parseIntO : unref(parseIntO))((_fz = (_ez = (_dz = unref(standingsTable)) == null ? void 0 : _dz.away) == null ? void 0 : _ez.lastest) == null ? void 0 : _fz[5]) / 6).toFixed(2) : "")}</span></li></ul></div></div></div><div class="div-h4" data-v-340f6857><b data-v-340f6857>${ssrInterpolate(unref($t)("Goal difference statistics"))}</b></div><div class="row content pt-3" data-v-340f6857><div class="fx col-12 col-md-6 pt-0" data-v-340f6857><div class="fx-div" data-v-340f6857><ul class="fx-tb-a" data-v-340f6857><li data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span data-v-340f6857>[${ssrInterpolate((_gz = unref(matchRecentResult).home) == null ? void 0 : _gz[0])}] ${ssrInterpolate(((_hz = unref(matchRecentResult).home) == null ? void 0 : _hz[5]) > 0 ? (((_iz = unref(matchRecentResult).home) == null ? void 0 : _iz[0]) * 100 / ((_jz = unref(matchRecentResult).home) == null ? void 0 : _jz[5])).toFixed(2) : "")}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("win by 2 goals"))}+</span><span data-v-340f6857>${ssrInterpolate(((_kz = unref(matchRecentResult).away) == null ? void 0 : _kz[5]) > 0 ? (((_lz = unref(matchRecentResult).away) == null ? void 0 : _lz[0]) * 100 / ((_mz = unref(matchRecentResult).away) == null ? void 0 : _mz[5])).toFixed(2) : "")}% [${ssrInterpolate((_nz = unref(matchRecentResult).away) == null ? void 0 : _nz[0])}]</span></div><div class="fx-td-data" data-v-340f6857><div class="home-bg" style="${ssrRenderStyle("width:" + (((_oz = unref(matchRecentResult).home) == null ? void 0 : _oz[5]) > 0 ? (((_pz = unref(matchRecentResult).home) == null ? void 0 : _pz[0]) * 100 / ((_qz = unref(matchRecentResult).home) == null ? void 0 : _qz[5])).toFixed(2) : 0) + "%")}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="away-bg" style="${ssrRenderStyle("width:" + (((_rz = unref(matchRecentResult).away) == null ? void 0 : _rz[5]) > 0 ? (((_sz = unref(matchRecentResult).away) == null ? void 0 : _sz[0]) * 100 / ((_tz = unref(matchRecentResult).away) == null ? void 0 : _tz[5])).toFixed(2) : 0) + "%")}" data-v-340f6857></div></div></li><li data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span data-v-340f6857>[${ssrInterpolate((_uz = unref(matchRecentResult).home) == null ? void 0 : _uz[1])}] ${ssrInterpolate(((_vz = unref(matchRecentResult).home) == null ? void 0 : _vz[5]) > 0 ? (((_wz = unref(matchRecentResult).home) == null ? void 0 : _wz[1]) * 100 / ((_xz = unref(matchRecentResult).home) == null ? void 0 : _xz[5])).toFixed(2) : "")}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("win by 1 goals"))}</span><span data-v-340f6857>${ssrInterpolate(((_yz = unref(matchRecentResult).away) == null ? void 0 : _yz[5]) > 0 ? (((_zz = unref(matchRecentResult).away) == null ? void 0 : _zz[1]) * 100 / ((_Az = unref(matchRecentResult).away) == null ? void 0 : _Az[5])).toFixed(2) : "")}% [${ssrInterpolate((_Bz = unref(matchRecentResult).away) == null ? void 0 : _Bz[1])}]</span></div><div class="fx-td-data" data-v-340f6857><div class="home-bg" style="${ssrRenderStyle("width:" + (((_Cz = unref(matchRecentResult).home) == null ? void 0 : _Cz[5]) > 0 ? (((_Dz = unref(matchRecentResult).home) == null ? void 0 : _Dz[1]) * 100 / ((_Ez = unref(matchRecentResult).home) == null ? void 0 : _Ez[5])).toFixed(2) : 0) + "%")}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="away-bg" style="${ssrRenderStyle("width:" + (((_Fz = unref(matchRecentResult).away) == null ? void 0 : _Fz[5]) > 0 ? (((_Gz = unref(matchRecentResult).away) == null ? void 0 : _Gz[1]) * 100 / ((_Hz = unref(matchRecentResult).away) == null ? void 0 : _Hz[5])).toFixed(2) : 0) + "%")}" data-v-340f6857></div></div></li><li data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span data-v-340f6857>[${ssrInterpolate((_Iz = unref(matchRecentResult).home) == null ? void 0 : _Iz[2])}] ${ssrInterpolate(((_Jz = unref(matchRecentResult).home) == null ? void 0 : _Jz[5]) > 0 ? (((_Kz = unref(matchRecentResult).home) == null ? void 0 : _Kz[2]) * 100 / ((_Lz = unref(matchRecentResult).home) == null ? void 0 : _Lz[5])).toFixed(2) : "")}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Draw"))}</span><span data-v-340f6857>${ssrInterpolate(((_Mz = unref(matchRecentResult).away) == null ? void 0 : _Mz[5]) > 0 ? (((_Nz = unref(matchRecentResult).away) == null ? void 0 : _Nz[2]) * 100 / ((_Oz = unref(matchRecentResult).away) == null ? void 0 : _Oz[5])).toFixed(2) : "")}% [${ssrInterpolate((_Pz = unref(matchRecentResult).away) == null ? void 0 : _Pz[2])}]</span></div><div class="fx-td-data" data-v-340f6857><div class="home-bg" style="${ssrRenderStyle("width:" + (((_Qz = unref(matchRecentResult).home) == null ? void 0 : _Qz[5]) > 0 ? (((_Rz = unref(matchRecentResult).home) == null ? void 0 : _Rz[2]) * 100 / ((_Sz = unref(matchRecentResult).home) == null ? void 0 : _Sz[5])).toFixed(2) : 0) + "%")}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="away-bg" style="${ssrRenderStyle("width:" + (((_Tz = unref(matchRecentResult).away) == null ? void 0 : _Tz[5]) > 0 ? (((_Uz = unref(matchRecentResult).away) == null ? void 0 : _Uz[2]) * 100 / ((_Vz = unref(matchRecentResult).away) == null ? void 0 : _Vz[5])).toFixed(2) : 0) + "%")}" data-v-340f6857></div></div></li></ul></div></div><div class="fx missComp col-12 col-md-6 pt-0" data-v-340f6857><div class="fx-div" data-v-340f6857><ul class="fx-tb-a" data-v-340f6857><li data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span data-v-340f6857>[${ssrInterpolate((_Wz = unref(matchRecentResult).home) == null ? void 0 : _Wz[3])}] ${ssrInterpolate(((_Xz = unref(matchRecentResult).home) == null ? void 0 : _Xz[5]) > 0 ? (((_Yz = unref(matchRecentResult).home) == null ? void 0 : _Yz[3]) * 100 / ((_Zz = unref(matchRecentResult).home) == null ? void 0 : _Zz[5])).toFixed(2) : "")}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Conceded by 1"))}</span><span data-v-340f6857>${ssrInterpolate(((__z = unref(matchRecentResult).away) == null ? void 0 : __z[5]) > 0 ? (((_$z = unref(matchRecentResult).away) == null ? void 0 : _$z[3]) * 100 / ((_aA = unref(matchRecentResult).away) == null ? void 0 : _aA[5])).toFixed(2) : "")}% [${ssrInterpolate((_bA = unref(matchRecentResult).away) == null ? void 0 : _bA[3])}]</span></div><div class="fx-td-data" data-v-340f6857><div class="home-bg" style="${ssrRenderStyle("width:" + (((_cA = unref(matchRecentResult).home) == null ? void 0 : _cA[5]) > 0 ? (((_dA = unref(matchRecentResult).home) == null ? void 0 : _dA[3]) * 100 / ((_eA = unref(matchRecentResult).home) == null ? void 0 : _eA[5])).toFixed(2) : 0) + "%")}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="away-bg" style="${ssrRenderStyle("width:" + (((_fA = unref(matchRecentResult).away) == null ? void 0 : _fA[5]) > 0 ? (((_gA = unref(matchRecentResult).away) == null ? void 0 : _gA[3]) * 100 / ((_hA = unref(matchRecentResult).away) == null ? void 0 : _hA[5])).toFixed(2) : 0) + "%")}" data-v-340f6857></div></div></li><li data-v-340f6857><div class="fx-tb-title" data-v-340f6857><span data-v-340f6857>[${ssrInterpolate((_iA = unref(matchRecentResult).home) == null ? void 0 : _iA[4])}] ${ssrInterpolate(((_jA = unref(matchRecentResult).home) == null ? void 0 : _jA[5]) > 0 ? (((_kA = unref(matchRecentResult).home) == null ? void 0 : _kA[4]) * 100 / ((_lA = unref(matchRecentResult).home) == null ? void 0 : _lA[5])).toFixed(2) : "")}%</span><span data-v-340f6857>${ssrInterpolate(unref($t)("Conceded by 2"))}+ </span><span data-v-340f6857>${ssrInterpolate(((_mA = unref(matchRecentResult).away) == null ? void 0 : _mA[5]) > 0 ? (((_nA = unref(matchRecentResult).away) == null ? void 0 : _nA[4]) * 100 / ((_oA = unref(matchRecentResult).away) == null ? void 0 : _oA[5])).toFixed(2) : "")}% [${ssrInterpolate((_pA = unref(matchRecentResult).away) == null ? void 0 : _pA[4])}]</span></div><div class="fx-td-data" data-v-340f6857><div class="home-bg" style="${ssrRenderStyle("width:" + (((_qA = unref(matchRecentResult).home) == null ? void 0 : _qA[5]) > 0 ? (((_rA = unref(matchRecentResult).home) == null ? void 0 : _rA[4]) * 100 / ((_sA = unref(matchRecentResult).home) == null ? void 0 : _sA[5])).toFixed(2) : 0) + "%")}" data-v-340f6857></div></div><div class="fx-td-data guest" data-v-340f6857><div class="away-bg" style="${ssrRenderStyle("width:" + (((_tA = unref(matchRecentResult).away) == null ? void 0 : _tA[5]) > 0 ? (((_uA = unref(matchRecentResult).away) == null ? void 0 : _uA[4]) * 100 / ((_vA = unref(matchRecentResult).away) == null ? void 0 : _vA[5])).toFixed(2) : 0) + "%")}" data-v-340f6857></div></div></li></ul></div></div></div></div></div></div><div id="content-page" class="mt-5" data-v-340f6857>`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title" data-v-340f6857>${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div><div id="analyMap" data-v-340f6857><a href="javascript:void(0);" data-v-340f6857>${ssrInterpolate(unref($t)("Settings"))}</a><!--[-->`);
      ssrRenderList(unref(settingsH2hList), (setting, index) => {
        _push(`<a style="${ssrRenderStyle((setting == null ? void 0 : setting.show) ? null : { display: "none" })}"${ssrRenderAttr("href", "#" + (setting == null ? void 0 : setting.div_id))} id=""${ssrRenderAttr("title", unref($t)(setting == null ? void 0 : setting.name))} class="${ssrRenderClass((setting == null ? void 0 : setting.hidden_match) ? "disable" : "")}" data-v-340f6857>${ssrInterpolate(unref($t)(setting == null ? void 0 : setting.short_name))}</a>`);
      });
      _push(`<!--]--></div><div id="popup-settings" class="popup-settings" style="${ssrRenderStyle(unref(showSettings) ? null : { display: "none" })}" data-v-340f6857><div id="openNew-container-setting0" class="popup-container" style="${ssrRenderStyle({})}" data-v-340f6857><div class="popup-titlebar" title="Drag to move" data-v-340f6857><span class="Pclose" href="" title="Close" data-v-340f6857>\xA0</span><span class="Ptitle" data-v-340f6857>${ssrInterpolate(unref($t)("Settings"))}</span></div><div class="popup-content" data-v-340f6857><ul class="yScroll" id="choose_right" data-listidx="0" data-v-340f6857>`);
      _push(ssrRenderComponent(unref(draggable), {
        modelValue: unref(settingsH2hList),
        "onUpdate:modelValue": ($event) => isRef(settingsH2hList) ? settingsH2hList.value = $event : null,
        group: "people",
        onStart: ($event) => _ctx.drag = true,
        onEnd: ($event) => _ctx.drag = false,
        onChange: changePossitionSetting,
        "item-key": "id"
      }, {
        item: withCtx(({ element }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<li id="v0" v="0" class="${ssrRenderClass((element == null ? void 0 : element.show) ? "on" : "hide")}" style="${ssrRenderStyle({})}" data-v-340f6857${_scopeId}><img${ssrRenderAttr("src", _imports_1$1)} alt="order" data-v-340f6857${_scopeId}>${ssrInterpolate(unref($t)(element.name))} <div class="rightBlock" data-v-340f6857${_scopeId}></div></li>`);
          } else {
            return [
              createVNode("li", {
                id: "v0",
                v: "0",
                class: (element == null ? void 0 : element.show) ? "on" : "hide",
                style: {}
              }, [
                createVNode("img", {
                  src: _imports_1$1,
                  alt: "order"
                }),
                createTextVNode(toDisplayString(unref($t)(element.name)) + " ", 1),
                createVNode("div", {
                  class: "rightBlock",
                  onClick: ($event) => settingVisible(element == null ? void 0 : element.id)
                }, null, 8, ["onClick"])
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</ul><div class="popup-bottom" data-v-340f6857><input type="button"${ssrRenderAttr("value", unref($t)("All"))} class="gl_btn" data-v-340f6857><input type="button"${ssrRenderAttr("value", unref($t)("Close"))} class="gl_btn on" id="drag_conform" data-v-340f6857><input type="hidden" name="hidValue" id="hidValue" data-v-340f6857></div></div></div></div><div class="popup-h2h" style="${ssrRenderStyle(unref(showSettingsCompany) ? null : { display: "none" })}" data-v-340f6857><div id="openNew-container-company" class="popup-container" data-v-340f6857><div class="popup-titlebar" title="Drag to move" data-v-340f6857><span class="Pclose" href="" title="Close" data-v-340f6857>\xA0</span><span class="Ptitle" data-v-340f6857>${ssrInterpolate(unref($t)("Select Company"))}</span></div><div class="popup-content" data-v-340f6857><div id="addOddsCmp_id" data-v-340f6857><div class="ms-2" data-v-340f6857><!--[-->`);
      ssrRenderList((_wA = unref(oddCompanys)) == null ? void 0 : _wA.filter((item) => item !== null), (oddCompany, index) => {
        _push(`<span class="odds_unchecked" data-v-340f6857><input type="checkbox"${ssrRenderAttr("name", oddCompany == null ? void 0 : oddCompany.name)}${ssrRenderAttr("id", oddCompany == null ? void 0 : oddCompany.id)}${ssrRenderAttr("value", oddCompany == null ? void 0 : oddCompany.id)}${ssrIncludeBooleanAttr(unref(oCompanySelected).includes(oddCompany == null ? void 0 : oddCompany.id) ? true : false) ? " checked" : ""}${ssrIncludeBooleanAttr(Array.isArray(unref(oCompList)[oddCompany == null ? void 0 : oddCompany.id]) ? ssrLooseContain(unref(oCompList)[oddCompany == null ? void 0 : oddCompany.id], oddCompany == null ? void 0 : oddCompany.id) : unref(oCompList)[oddCompany == null ? void 0 : oddCompany.id]) ? " checked" : ""} data-v-340f6857><label${ssrRenderAttr("for", oddCompany == null ? void 0 : oddCompany.name)} data-v-340f6857>${ssrInterpolate(oddCompany == null ? void 0 : oddCompany.name)}</label></span>`);
      });
      _push(`<!--]--></div><div class="popup-bottom" data-v-340f6857><input type="button"${ssrRenderAttr("value", unref($t)("All"))} class="mx-2" style="${ssrRenderStyle({ "width": "80px", "height": "25px" })}" data-v-340f6857><input type="button"${ssrRenderAttr("value", unref($t)("Clear all"))} class="mx-2" style="${ssrRenderStyle({ "width": "80px", "height": "25px" })}" data-v-340f6857></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/match/h2h-[match_id].vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const H2h = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-340f6857"]]);
const _sfc_main$b = {
  __name: "TabTableMobile",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    titleList: Array,
    isHideTitle: Boolean
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["onActiveTab"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const tabActive = useModel(__props, "modelValue");
    computed(() => {
      return props.titleList.find((item) => item.id === tabActive.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pb-3" }, _attrs))} data-v-c79efbd5><div class="product-selector" style="${ssrRenderStyle({ "display": "flex" })}" data-v-c79efbd5><!--[-->`);
      ssrRenderList(__props.titleList, (item, index) => {
        _push(`<span class="${ssrRenderClass([
          {
            active: tabActive.value === item.id
          }
        ])}" data-v-c79efbd5><div data-v-c79efbd5>${ssrInterpolate(item.name)}</div></span>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TabTableMobile.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-c79efbd5"]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
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
    var _a, _b, _c, _d;
    let __temp, __restore;
    const { width } = useWindowSize();
    const { useLocale, $t } = useShareCommon();
    const emit = __emit;
    const storeSystems = systemsStore();
    const matchStore = useMatchStore();
    const eventSocketData = ref();
    const route = useRoute();
    useRouter();
    const tabActive = ref(1);
    const refreshTime = ref(Date.now());
    const titleList = ref([
      {
        id: 1,
        name: $t("Hadicap Odd")
      },
      {
        id: 2,
        name: $t("Over/Under Odd")
      },
      {
        id: 3,
        name: $t("1x2 Odd")
      }
    ]);
    const isMobile = computed(() => {
      return width.value <= 768;
    });
    const showColumn = computed(() => {
      return {
        first: !isMobile.value ? true : tabActive.value === 1 ? true : false,
        second: !isMobile.value ? true : tabActive.value === 2 ? true : false,
        third: !isMobile.value ? true : tabActive.value === 3 ? true : false
      };
    });
    const matchLiveDetail = ref([]);
    const oddsDetail = ref();
    const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
    const matchIdSlug = ref(((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.id) || "");
    ref("ahDetail");
    const oCompanySelected = ref(useCookie("oCompanyOddSelected").value ? useCookie("oCompanyOddSelected").value : []);
    const isEmptyCompanySelected = ref(((_b = oCompanySelected.value) == null ? void 0 : _b.length) > 0 ? false : true);
    const oCompList = ref([]);
    const oddsList = ref([]);
    const oddCompanys = ref([]);
    ODD_COMPANYS.forEach((item) => {
      if (isEmptyCompanySelected.value) {
        oCompList.value[item == null ? void 0 : item.id] = true;
      } else {
        oCompList.value[item == null ? void 0 : item.id] = oCompanySelected.value.includes(item == null ? void 0 : item.id) ? true : false;
      }
    });
    const oddCompanyName = ref();
    ref([]);
    const oddCompanyId = ref();
    const tab = ref(((_c = route == null ? void 0 : route.query) == null ? void 0 : _c.type) || "");
    const settingsData = useCookie("settingsData");
    ref(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") || ((_d = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _d.timeZone));
    ref(true);
    ref(true);
    ref(true);
    ref(true);
    ref(true);
    ref(0);
    ref(1);
    ref(false);
    const ftPopTabs = ref(0);
    const ftCornerTabs = ref(0);
    const oddsCorner = ref([]);
    const oddsCorrectScore = ref([]);
    const swBoDanTabs = ref(31);
    const statedetailwin = reactive({
      modal_detail_win: null
    });
    const isInitModal = ref(false);
    ref(false);
    const matchTitle = useModel(__props, "matchTitle");
    const matchContent = useModel(__props, "matchContent");
    const initDataMatch = useModel(__props, "initDataMatch");
    const statefiltercomp = reactive({
      modal_filter_comp: null
    });
    const openModaFilterComp = async () => {
      await initModalElement();
      statefiltercomp.modal_filter_comp.show();
    };
    const fetchMatchsRecentDetail = async () => {
      var _a2;
      let resData = initDataMatch.value;
      const i_match_id = (_a2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a2.i_match_id;
      if (i_match_id) {
        fetchOddsDetail(i_match_id, oddCompanySelected.value);
      }
    };
    const fetchOddsDetail = async (i_match_id, i_company_id = ODD_COMPANY_DEFAULT) => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL, {
        i_match_id,
        i_company_id
      }).then((resData) => {
        oddsDetail.value = resData;
      });
    };
    const fetchOdds = async (matchIdSlug2) => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL + "?match_id=" + matchIdSlug2).then(async (resData) => {
        var _a2;
        oddsList.value = getDataObjectByList(resData);
        const oddCompanysList = [];
        (_a2 = ODD_COMPANYS) == null ? void 0 : _a2.forEach((item) => {
          var _a3, _b2, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
          oddCompanysList[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList[item == null ? void 0 : item.isportsapi].handicap = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first = (_b2 = (_a3 = oddsList.value) == null ? void 0 : _a3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "handicap")) == null ? void 0 : _b2.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live = (_d2 = (_c2 = oddsList.value) == null ? void 0 : _c2.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "handicap")) == null ? void 0 : _d2.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run = (_f = (_e = oddsList.value) == null ? void 0 : _e.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "handicap")) == null ? void 0 : _f.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].europeOdds = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first = (_h = (_g = oddsList.value) == null ? void 0 : _g.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "europeOdds")) == null ? void 0 : _h.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live = (_j = (_i = oddsList.value) == null ? void 0 : _i.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "europeOdds")) == null ? void 0 : _j.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run = (_l = (_k = oddsList.value) == null ? void 0 : _k.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "europeOdds")) == null ? void 0 : _l.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].overUnder = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first = (_n = (_m = oddsList.value) == null ? void 0 : _m.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "overUnder")) == null ? void 0 : _n.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live = (_p = (_o = oddsList.value) == null ? void 0 : _o.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "overUnder")) == null ? void 0 : _p.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run = (_r = (_q = oddsList.value) == null ? void 0 : _q.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "overUnder")) == null ? void 0 : _r.inplay;
          if (typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run === "undefined") {
            oddCompanysList[item == null ? void 0 : item.isportsapi].isEmpty = true;
          }
          if (isEmptyCompanySelected.value && !((_s = oCompanySelected.value) == null ? void 0 : _s.includes(item == null ? void 0 : item.id))) {
            oCompanySelected.value.push(item == null ? void 0 : item.id);
          }
        });
        oddCompanys.value = oddCompanysList;
      });
    };
    const fetchOddsCorner = async () => {
      await useApiLiveScore(
        (ftCornerTabs.value === 0 ? API_ROUTERS.LIVESCORE.ODDS_CONNER_FULL : API_ROUTERS.LIVESCORE.ODDS_CONNER_HAFT) + "?match_id=" + matchIdSlug.value
      ).then((resData) => {
        var _a2;
        const oddCompanysList = [];
        (_a2 = ODD_COMPANYS) == null ? void 0 : _a2.forEach((item) => {
          var _a3, _b2, _c2, _d2, _e, _f;
          oddCompanysList[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList[item == null ? void 0 : item.isportsapi].first = (_b2 = (_a3 = resData == null ? void 0 : resData.data) == null ? void 0 : _a3.early) == null ? void 0 : _b2.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi));
          oddCompanysList[item == null ? void 0 : item.isportsapi].live = (_d2 = (_c2 = resData == null ? void 0 : resData.data) == null ? void 0 : _c2.live) == null ? void 0 : _d2.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi));
          oddCompanysList[item == null ? void 0 : item.isportsapi].run = (_f = (_e = resData == null ? void 0 : resData.data) == null ? void 0 : _e.run) == null ? void 0 : _f.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi));
          if (typeof oddCompanysList[item == null ? void 0 : item.isportsapi].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].run === "undefined") {
            oddCompanysList[item == null ? void 0 : item.isportsapi].isEmpty = true;
          }
        });
        oddsCorner.value = oddCompanysList;
      });
    };
    const fetchOddsCorrectScore = async () => {
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.ODDS_CORRECT_SCORE + "?match_id=" + matchIdSlug.value
      ).then((resData) => {
        var _a2, _b2;
        oddsCorrectScore.value = (_b2 = (_a2 = resData == null ? void 0 : resData.data) == null ? void 0 : _a2.find((item) => (item == null ? void 0 : item.i_company_id) === swBoDanTabs.value)) == null ? void 0 : _b2.odds;
      });
    };
    watch(
      () => route == null ? void 0 : route.query,
      () => {
        var _a2;
        tab.value = ((_a2 = route == null ? void 0 : route.query) == null ? void 0 : _a2.type) || "";
      },
      { immediate: true }
    );
    watch(
      () => route.path,
      (newPath) => {
        var _a2;
        matchIdSlug.value = ((_a2 = route == null ? void 0 : route.params) == null ? void 0 : _a2.id) || "";
      },
      { immediate: true }
    );
    watch(
      ftCornerTabs,
      async () => {
        await fetchOddsCorner();
      },
      { immediate: true }
    );
    watch(
      swBoDanTabs,
      async () => {
        await fetchOddsCorrectScore();
      },
      { immediate: true }
    );
    watch(
      [() => route.query, ftPopTabs],
      () => {
        var _a2, _b2, _c2, _d2;
        const europeOdds = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 || ftPopTabs.value === 1 ? "europeanHaft" : "europeOdds";
        const handicap = ((_b2 = route.query) == null ? void 0 : _b2.haft) == 1 || ftPopTabs.value === 1 ? "handicapHalf" : "handicap";
        const overUnder = ((_c2 = route.query) == null ? void 0 : _c2.haft) == 1 || ftPopTabs.value === 1 ? "overUnderHalf" : "overUnder";
        const oddCompanysList = [];
        (_d2 = ODD_COMPANYS) == null ? void 0 : _d2.forEach((item) => {
          var _a3, _b3, _c3, _d3, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
          oddCompanysList[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList[item == null ? void 0 : item.isportsapi].handicap = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first = (_b3 = (_a3 = oddsList.value) == null ? void 0 : _a3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _b3.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live = (_d3 = (_c3 = oddsList.value) == null ? void 0 : _c3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _d3.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run = (_f = (_e = oddsList.value) == null ? void 0 : _e.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _f.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].europeOdds = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first = (_h = (_g = oddsList.value) == null ? void 0 : _g.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _h.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live = (_j = (_i = oddsList.value) == null ? void 0 : _i.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _j.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run = (_l = (_k = oddsList.value) == null ? void 0 : _k.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _l.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].overUnder = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first = (_n = (_m = oddsList.value) == null ? void 0 : _m.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _n.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live = (_p = (_o = oddsList.value) == null ? void 0 : _o.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _p.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run = (_r = (_q = oddsList.value) == null ? void 0 : _q.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _r.inplay;
          if (typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run === "undefined") {
            oddCompanysList[item == null ? void 0 : item.isportsapi].isEmpty = true;
          }
        });
        oddCompanys.value = oddCompanysList;
      },
      { immediate: true }
    );
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecentDetail()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => fetchOdds(matchIdSlug.value)), await __temp, __restore();
    const wssMatch = (socketData) => {
      var _a2, _b2, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E;
      if (matchStore.wssSocket) {
        try {
          const wssItem = socketData;
          eventSocketData.value = wssItem;
          emit("socketData", wssItem);
          if (wssItem.payload.iodds) {
            const matchOdds = wssItem.payload.iodds;
            const handicap = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 || ftPopTabs.value === 1 ? "handicapHalf" : "handicap";
            if (matchOdds == null ? void 0 : matchOdds[handicap]) {
              for (const matchOdd of matchOdds == null ? void 0 : matchOdds[handicap]) {
                const matchId = parseIntO(getValueByPosition(matchOdd, 0));
                const companyId = getValueByPosition(matchOdd, 1);
                const oddsType = getValueByPosition(matchOdd, 9);
                if (matchId == ((_c2 = (_b2 = matchLiveDetail.value) == null ? void 0 : _b2.match) == null ? void 0 : _c2.i_match_id)) {
                  const oddCompany = (_d2 = oddCompanys.value) == null ? void 0 : _d2.find((item) => (item == null ? void 0 : item.isportsapi) == companyId);
                  if (oddCompany) {
                    if (!(oddCompany == null ? void 0 : oddCompany.handicap)) {
                      oddCompany.handicap = [];
                    }
                    if (oddsType == 1) {
                      oddCompany.handicap.first_older = ((_e = oddCompany == null ? void 0 : oddCompany.handicap) == null ? void 0 : _e.first) ? JSON.parse(JSON.stringify(oddCompany.handicap.first)) : [];
                      oddCompany.handicap.first = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    } else if (oddsType == 2) {
                      oddCompany.handicap.live_older = ((_f = oddCompany == null ? void 0 : oddCompany.handicap) == null ? void 0 : _f.live) ? JSON.parse(JSON.stringify(oddCompany.handicap.live)) : [];
                      oddCompany.handicap.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    } else if (oddsType == 3) {
                      oddCompany.handicap.run_older = ((_g = oddCompany == null ? void 0 : oddCompany.handicap) == null ? void 0 : _g.run) ? JSON.parse(JSON.stringify(oddCompany.handicap.run)) : [];
                      oddCompany.handicap.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    }
                  }
                }
              }
            }
            const overUnder = ((_h = route.query) == null ? void 0 : _h.haft) == 1 || ftPopTabs.value === 1 ? "overUnderHalf" : "overUnder";
            if (matchOdds == null ? void 0 : matchOdds[overUnder]) {
              for (const matchOdd of matchOdds == null ? void 0 : matchOdds[overUnder]) {
                const matchId = parseIntO(getValueByPosition(matchOdd, 0));
                const companyId = getValueByPosition(matchOdd, 1);
                const oddsType = getValueByPosition(matchOdd, 7);
                if (matchId == ((_j = (_i = matchLiveDetail.value) == null ? void 0 : _i.match) == null ? void 0 : _j.i_match_id)) {
                  const oddCompany = (_k = oddCompanys.value) == null ? void 0 : _k.find((item) => (item == null ? void 0 : item.isportsapi) == companyId);
                  if (oddCompany) {
                    if (!(oddCompany == null ? void 0 : oddCompany.overUnder)) {
                      oddCompany.overUnder = [];
                    }
                    if (oddsType == 1) {
                      oddCompany.overUnder.first_older = ((_l = oddCompany == null ? void 0 : oddCompany.overUnder) == null ? void 0 : _l.first) ? JSON.parse(JSON.stringify(oddCompany.overUnder.first)) : [];
                      oddCompany.overUnder.first = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    } else if (oddsType == 2) {
                      oddCompany.overUnder.live_older = ((_m = oddCompany == null ? void 0 : oddCompany.overUnder) == null ? void 0 : _m.live) ? JSON.parse(JSON.stringify(oddCompany.overUnder.live)) : [];
                      oddCompany.overUnder.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    } else if (oddsType == 3) {
                      oddCompany.overUnder.run_older = ((_n = oddCompany == null ? void 0 : oddCompany.overUnder) == null ? void 0 : _n.run) ? JSON.parse(JSON.stringify(oddCompany.overUnder.run)) : [];
                      oddCompany.overUnder.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    }
                  }
                }
              }
            }
            const europeOdds = ((_o = route.query) == null ? void 0 : _o.haft) == 1 || ftPopTabs.value === 1 ? "europeanHaft" : "europeOdds";
            if (matchOdds == null ? void 0 : matchOdds[europeOdds]) {
              for (const matchOdd of matchOdds == null ? void 0 : matchOdds[europeOdds]) {
                const matchId = parseIntO(getValueByPosition(matchOdd, 0));
                const companyId = getValueByPosition(matchOdd, 1);
                const oddsType = getValueByPosition(matchOdd, 7);
                if (matchId == ((_q = (_p = matchLiveDetail.value) == null ? void 0 : _p.match) == null ? void 0 : _q.i_match_id)) {
                  const oddCompany = (_r = oddCompanys.value) == null ? void 0 : _r.find((item) => (item == null ? void 0 : item.isportsapi) == companyId);
                  if (oddCompany) {
                    if (!(oddCompany == null ? void 0 : oddCompany.europeOdds)) {
                      oddCompany.europeOdds = [];
                    }
                    if (oddsType == 1) {
                      oddCompany.europeOdds.first_older = ((_s = oddCompany == null ? void 0 : oddCompany.europeOdds) == null ? void 0 : _s.first) ? JSON.parse(JSON.stringify(oddCompany.europeOdds.first)) : [];
                      oddCompany.europeOdds.first = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    } else if (oddsType == 2) {
                      oddCompany.europeOdds.live_older = ((_t = oddCompany == null ? void 0 : oddCompany.europeOdds) == null ? void 0 : _t.live) ? JSON.parse(JSON.stringify(oddCompany.europeOdds.live)) : [];
                      oddCompany.europeOdds.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    } else if (oddsType == 3) {
                      oddCompany.europeOdds.run_older = ((_u = oddCompany == null ? void 0 : oddCompany.europeOdds) == null ? void 0 : _u.run) ? JSON.parse(JSON.stringify(oddCompany.europeOdds.run)) : [];
                      oddCompany.europeOdds.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    }
                  }
                }
              }
            }
          } else if (wssItem.payload.iodds_euro_ht) {
            for (const matchOdd of wssItem.payload.iodds_euro_ht) {
              const matchId = matchOdd == null ? void 0 : matchOdd.matchId;
              if (matchId == ((_w = (_v = matchLiveDetail.value) == null ? void 0 : _v.match) == null ? void 0 : _w.i_match_id)) {
                for (const odd of matchOdd == null ? void 0 : matchOdd.odds) {
                  const oddCompany = (_x = oddCompanys.value) == null ? void 0 : _x.find((item) => (item == null ? void 0 : item.isportsapi) == (odd == null ? void 0 : odd.companyId));
                  if (oddCompany) {
                    if (!(oddCompany == null ? void 0 : oddCompany.europeOdds)) {
                      oddCompany.europeOdds = [];
                      oddCompany.europeOdds.run = [];
                    }
                    oddCompany.europeOdds.run_older = ((_y = oddCompany == null ? void 0 : oddCompany.europeOdds) == null ? void 0 : _y.run) ? JSON.parse(JSON.stringify(oddCompany.europeOdds.run)) : [];
                    oddCompany.europeOdds.run = [[odd == null ? void 0 : odd.instantHome], [odd == null ? void 0 : odd.instantDraw], [odd == null ? void 0 : odd.instantAway]];
                  }
                }
              }
            }
          } else if (wssItem.topic == "livescore/football/iodds_corner/v1") {
            const matchOdds = wssItem.payload.inplay;
            if (matchOdds) {
              for (const matchOdd of matchOdds) {
                const companyId = matchOdd == null ? void 0 : matchOdd.companyId;
                if ((matchOdd == null ? void 0 : matchOdd.matchId) == ((_A = (_z = matchLiveDetail.value) == null ? void 0 : _z.match) == null ? void 0 : _A.i_match_id)) {
                  const oddCompany = (_B = oddsCorner.value) == null ? void 0 : _B.find((item) => (item == null ? void 0 : item.isportsapi) == companyId);
                  if (oddCompany) {
                    if (!(oddCompany == null ? void 0 : oddCompany.run)) {
                      oddCompany.run = [];
                    }
                    oddCompany.run_older = (oddCompany == null ? void 0 : oddCompany.run) ? JSON.parse(JSON.stringify(oddCompany == null ? void 0 : oddCompany.run)) : [];
                    oddCompany.run = {
                      i_company_id: companyId,
                      over: (_C = matchOdd == null ? void 0 : matchOdd.odds) == null ? void 0 : _C.over,
                      total_corners: (_D = matchOdd == null ? void 0 : matchOdd.odds) == null ? void 0 : _D.totalCorners,
                      under: (_E = matchOdd == null ? void 0 : matchOdd.odds) == null ? void 0 : _E.under
                    };
                  }
                }
              }
            }
          }
        } catch (e) {
          return false;
        }
      }
    };
    watch(
      matchStore,
      () => {
        wssMatch(matchStore == null ? void 0 : matchStore.socketData);
      },
      { deep: true, immediate: true }
    );
    const initModalElement = async () => {
      if (!isInitModal.value) {
        isInitModal.value = true;
        await nextTick();
        statefiltercomp.modal_filter_comp = new bootstrap.Modal(
          "#modal_filter_comp",
          {}
        );
        statedetailwin.modal_detail_win = new bootstrap.Modal(
          "#modal_detail_win",
          {}
        );
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d2;
      const _component_TabTableMobile = __nuxt_component_0;
      const _component_nuxt_img = _sfc_main$e$1;
      const _component_PopupOddsChange = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "",
        class: "match-odds"
      }, _attrs))} data-v-75aa1ba8><div id="" data-v-75aa1ba8><div id="CompanyOddsDiv" class="company-comp" data-v-75aa1ba8>`);
      _push(ssrRenderComponent(_component_TabTableMobile, {
        style: unref(isMobile) ? null : { display: "none" },
        titleList: titleList.value,
        modelValue: tabActive.value,
        "onUpdate:modelValue": ($event) => tabActive.value = $event
      }, null, _parent));
      _push(`<div class="rankbox" data-v-75aa1ba8><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-75aa1ba8><tbody data-v-75aa1ba8><tr class="tr-title" data-v-75aa1ba8><th colspan="2" rowspan="2" data-v-75aa1ba8><b data-v-75aa1ba8>${ssrInterpolate(unref($t)("Company"))}</b>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/img/fx.svg",
        alt: "plus",
        height: "16",
        width: "16",
        onClick: openModaFilterComp
      }, null, _parent));
      _push(`</th><th data-v-75aa1ba8></th></tr><tr class="tb-bgcolor1" data-v-75aa1ba8><th data-v-75aa1ba8></th><th data-v-75aa1ba8></th></tr><!--[-->`);
      ssrRenderList((_a2 = oddCompanys.value) == null ? void 0 : _a2.filter((item) => item !== null && !(item == null ? void 0 : item.isEmpty) && oCompanySelected.value.includes(item == null ? void 0 : item.id)), (item, index) => {
        _push(`<tr class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}" data-v-75aa1ba8><td rowspan="1" data-v-75aa1ba8><span data-v-75aa1ba8>${ssrInterpolate(item == null ? void 0 : item.name)}</span></td><td class="bd-l" data-v-75aa1ba8><span data-v-75aa1ba8>${ssrInterpolate(unref($t)("Init"))}</span><span data-v-75aa1ba8>${ssrInterpolate(unref($t)("Live"))}</span><span class="red" data-v-75aa1ba8>${ssrInterpolate(unref($t)("Run"))}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata" style="${ssrRenderStyle({ "width": "100%" })}" data-v-75aa1ba8><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" data-v-75aa1ba8><tbody data-v-75aa1ba8><tr class="tr-title" data-v-75aa1ba8><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-75aa1ba8><b data-v-75aa1ba8>${ssrInterpolate(unref($t)("Hadicap Odd"))}</b></th><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-75aa1ba8><b data-v-75aa1ba8>${ssrInterpolate(unref($t)("Over/Under Odd"))}</b></th><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-75aa1ba8><b data-v-75aa1ba8>${ssrInterpolate(unref($t)("1x2 Odd"))}</b></th><th rowspan="2" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-75aa1ba8><b data-v-75aa1ba8>${ssrInterpolate(unref($t)("Detail"))}</b></th></tr><tr class="tr-title" data-v-75aa1ba8><th style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" data-v-75aa1ba8>${ssrInterpolate(unref($t)("Home"))}</th><th style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" data-v-75aa1ba8>${ssrInterpolate(unref($t)("HDP"))}</th><th style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" data-v-75aa1ba8>${ssrInterpolate(unref($t)("Away"))}</th><th style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" data-v-75aa1ba8>${ssrInterpolate(unref($t)("Over"))}</th><th style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" class="middle-width" data-v-75aa1ba8>${ssrInterpolate(unref($t)("First odd"))}</th><th style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" data-v-75aa1ba8>${ssrInterpolate(unref($t)("Under"))}</th><th style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" data-v-75aa1ba8>${ssrInterpolate(unref($t)("Home"))}</th><th style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" data-v-75aa1ba8>${ssrInterpolate(unref($t)("Draw"))}</th><th style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" data-v-75aa1ba8>${ssrInterpolate(unref($t)("Away"))}</th><th style="${ssrRenderStyle(unref(isMobile) ? null : { display: "none" })}" class="middle-width" data-v-75aa1ba8>${ssrInterpolate(unref($t)("Detail"))}</th></tr><!--[-->`);
      ssrRenderList((_b2 = oddCompanys.value) == null ? void 0 : _b2.filter((item) => item !== null && !(item == null ? void 0 : item.isEmpty) && oCompanySelected.value.includes(item == null ? void 0 : item.id)), (item, index) => {
        var _a3, _b3, _c3, _d3, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja;
        _push(`<tr name="oddsTr" class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}" data-v-75aa1ba8><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="7%" class="bd-l" data-v-75aa1ba8><span data-o="" data-v-75aa1ba8>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_b3 = (_a3 = item == null ? void 0 : item.handicap) == null ? void 0 : _a3.first) == null ? void 0 : _b3[1]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_d3 = (_c3 = item == null ? void 0 : item.handicap) == null ? void 0 : _c3.live) == null ? void 0 : _d3[1], (_f = (_e = item == null ? void 0 : item.handicap) == null ? void 0 : _e.first) == null ? void 0 : _f[1]))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_h = (_g = item == null ? void 0 : item.handicap) == null ? void 0 : _g.live) == null ? void 0 : _h[1]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 1))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_j = (_i = item == null ? void 0 : item.handicap) == null ? void 0 : _i.run) == null ? void 0 : _j[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="7%" data-v-75aa1ba8><span data-o="" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_l = (_k = item == null ? void 0 : item.handicap) == null ? void 0 : _k.first) == null ? void 0 : _l[0]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_n = (_m = item == null ? void 0 : item.handicap) == null ? void 0 : _m.live) == null ? void 0 : _n[0], (_p = (_o = item == null ? void 0 : item.handicap) == null ? void 0 : _o.first) == null ? void 0 : _p[0]))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_r = (_q = item == null ? void 0 : item.handicap) == null ? void 0 : _q.live) == null ? void 0 : _r[0]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 0))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_t = (_s = item == null ? void 0 : item.handicap) == null ? void 0 : _s.run) == null ? void 0 : _t[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="7%" class="bd-r" data-v-75aa1ba8><span data-o="" data-v-75aa1ba8>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_v = (_u = item == null ? void 0 : item.handicap) == null ? void 0 : _u.first) == null ? void 0 : _v[2]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_x = (_w = item == null ? void 0 : item.handicap) == null ? void 0 : _w.live) == null ? void 0 : _x[2], (_z = (_y = item == null ? void 0 : item.handicap) == null ? void 0 : _y.first) == null ? void 0 : _z[2]))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_B = (_A = item == null ? void 0 : item.handicap) == null ? void 0 : _A.live) == null ? void 0 : _B[2]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 2))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_D = (_C = item == null ? void 0 : item.handicap) == null ? void 0 : _C.run) == null ? void 0 : _D[2]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="7%" class="bd-l" data-v-75aa1ba8><span data-o="" data-v-75aa1ba8>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_F = (_E = item == null ? void 0 : item.overUnder) == null ? void 0 : _E.first) == null ? void 0 : _F[1]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_H = (_G = item == null ? void 0 : item.overUnder) == null ? void 0 : _G.live) == null ? void 0 : _H[1], (_J = (_I = item == null ? void 0 : item.overUnder) == null ? void 0 : _I.first) == null ? void 0 : _J[1]))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_L = (_K = item == null ? void 0 : item.overUnder) == null ? void 0 : _K.live) == null ? void 0 : _L[1]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 1))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_N = (_M = item == null ? void 0 : item.overUnder) == null ? void 0 : _M.run) == null ? void 0 : _N[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="7%" data-v-75aa1ba8><span data-o="" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_P = (_O = item == null ? void 0 : item.overUnder) == null ? void 0 : _O.first) == null ? void 0 : _P[0]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_R = (_Q = item == null ? void 0 : item.overUnder) == null ? void 0 : _Q.live) == null ? void 0 : _R[0], (_T = (_S = item == null ? void 0 : item.overUnder) == null ? void 0 : _S.first) == null ? void 0 : _T[0]))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_V = (_U = item == null ? void 0 : item.overUnder) == null ? void 0 : _U.live) == null ? void 0 : _V[0]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 0))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_X = (_W = item == null ? void 0 : item.overUnder) == null ? void 0 : _W.run) == null ? void 0 : _X[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="7%" class="bd-r" data-v-75aa1ba8><span data-o="" data-v-75aa1ba8>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_Z = (_Y = item == null ? void 0 : item.overUnder) == null ? void 0 : _Y.first) == null ? void 0 : _Z[2]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_$ = (__ = item == null ? void 0 : item.overUnder) == null ? void 0 : __.live) == null ? void 0 : _$[2], (_ba = (_aa = item == null ? void 0 : item.overUnder) == null ? void 0 : _aa.first) == null ? void 0 : _ba[2]))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_da = (_ca = item == null ? void 0 : item.overUnder) == null ? void 0 : _ca.live) == null ? void 0 : _da[2]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 2))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_fa = (_ea = item == null ? void 0 : item.overUnder) == null ? void 0 : _ea.run) == null ? void 0 : _fa[2]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="7%" class="bd-l" data-v-75aa1ba8><span data-o="" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_ha = (_ga = item == null ? void 0 : item.europeOdds) == null ? void 0 : _ga.first) == null ? void 0 : _ha[0]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_ja = (_ia = item == null ? void 0 : item.europeOdds) == null ? void 0 : _ia.live) == null ? void 0 : _ja[0], (_la = (_ka = item == null ? void 0 : item.europeOdds) == null ? void 0 : _ka.first) == null ? void 0 : _la[0]))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_na = (_ma = item == null ? void 0 : item.europeOdds) == null ? void 0 : _ma.live) == null ? void 0 : _na[0]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.europeOdds, 0))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_pa = (_oa = item == null ? void 0 : item.europeOdds) == null ? void 0 : _oa.run) == null ? void 0 : _pa[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="7%" data-v-75aa1ba8><span data-o="" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_ra = (_qa = item == null ? void 0 : item.europeOdds) == null ? void 0 : _qa.first) == null ? void 0 : _ra[1]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_ta = (_sa = item == null ? void 0 : item.europeOdds) == null ? void 0 : _sa.live) == null ? void 0 : _ta[1], (_va = (_ua = item == null ? void 0 : item.europeOdds) == null ? void 0 : _ua.first) == null ? void 0 : _va[1]))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_xa = (_wa = item == null ? void 0 : item.europeOdds) == null ? void 0 : _wa.live) == null ? void 0 : _xa[1]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.europeOdds, 1))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_za = (_ya = item == null ? void 0 : item.europeOdds) == null ? void 0 : _ya.run) == null ? void 0 : _za[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="7%" class="bd-r" data-v-75aa1ba8><span data-o="" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_Ba = (_Aa = item == null ? void 0 : item.europeOdds) == null ? void 0 : _Aa.first) == null ? void 0 : _Ba[2]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_Da = (_Ca = item == null ? void 0 : item.europeOdds) == null ? void 0 : _Ca.live) == null ? void 0 : _Da[2], (_Fa = (_Ea = item == null ? void 0 : item.europeOdds) == null ? void 0 : _Ea.first) == null ? void 0 : _Fa[2]))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_Ha = (_Ga = item == null ? void 0 : item.europeOdds) == null ? void 0 : _Ga.live) == null ? void 0 : _Ha[2]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.europeOdds, 2))}" data-v-75aa1ba8>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_Ja = (_Ia = item == null ? void 0 : item.europeOdds) == null ? void 0 : _Ia.run) == null ? void 0 : _Ja[2]))}</span></td><td width="5%" data-v-75aa1ba8><span class="odd_a" data-v-75aa1ba8>${ssrInterpolate(unref($t)("History"))}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div><div id="content-page" class="mt-5" data-v-75aa1ba8>`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title" data-v-75aa1ba8>${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div><div class="modal fade" id="modal_detail_win" tabindex="-1" aria-labelledby="modal_detail_win_label" aria-hidden="true" data-v-75aa1ba8><div class="modal-dialog modal-dialog-centered container" data-v-75aa1ba8><div class="modal-content" data-v-75aa1ba8><div class="modal-header" data-v-75aa1ba8><div class="modal-title" id="modal_detail_win_label" data-v-75aa1ba8>${ssrInterpolate(oddCompanyName.value)} ${ssrInterpolate(unref($t)("Odd history"))}</div><button type="button" class="btn-close" aria-label="Close" data-v-75aa1ba8></button></div><div class="modal-body" data-v-75aa1ba8><div id="" class="layui-layer-content detail_win" data-v-75aa1ba8><div class="popinfo" data-v-75aa1ba8>`);
      _push(ssrRenderComponent(_component_PopupOddsChange, {
        "odd-comp-id": oddCompanyId.value,
        "match-id": matchIdSlug.value,
        section: "ahDetail",
        "odd-companys-list": oddCompanys.value,
        "refresh-time": refreshTime.value
      }, null, _parent));
      _push(`</div></div></div></div></div></div><div class="modal fade" id="modal_filter_comp" tabindex="-1" aria-labelledby="modal_filter_comp_label" aria-hidden="true" data-v-75aa1ba8><div class="modal-dialog modal-dialog-centered" data-v-75aa1ba8><div class="modal-content" data-v-75aa1ba8><div class="modal-header" data-v-75aa1ba8><div class="modal-title" id="modal_filter_comp_label" data-v-75aa1ba8>${ssrInterpolate(unref($t)("Select Company"))}</div><button type="button" class="btn-close" aria-label="Close" data-v-75aa1ba8></button></div><div class="modal-body" data-v-75aa1ba8><div class="layui-layer-content oddscomp-filterwin" data-v-75aa1ba8><ul id="oddscompFilterWin" class="popinfo" data-v-75aa1ba8><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (oddCompany, index) => {
        _push(`<li${ssrRenderAttr("value", oddCompany == null ? void 0 : oddCompany.id)} class="${ssrRenderClass([oCompanySelected.value.includes(oddCompany == null ? void 0 : oddCompany.id) ? "on" : "", "complist"])}" data-v-75aa1ba8><i class="check-circled" data-v-75aa1ba8></i> ${ssrInterpolate(oddCompany == null ? void 0 : oddCompany.name)}</li>`);
      });
      _push(`<!--]--></ul><div id="winTips" class="tips" style="${ssrRenderStyle(((_c2 = oCompanySelected.value) == null ? void 0 : _c2.length) === 0 ? null : { display: "none" })}" data-v-75aa1ba8>*${ssrInterpolate(unref($t)("Select at least 1 company"))}</div></div></div><div class="modal-footer" style="${ssrRenderStyle({ "display": "none" })}" data-v-75aa1ba8><button type="button" class="btn btn-primary"${ssrIncludeBooleanAttr(((_d2 = oCompanySelected.value) == null ? void 0 : _d2.length) === 0 ? true : false) ? " disabled" : ""} data-v-75aa1ba8>${ssrInterpolate(unref($t)("OK"))}</button></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/odds/oddscomp/[match_id].vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const Oddscomp = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-75aa1ba8"]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
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
    const { useLocale, $t } = useShareCommon();
    const emit = __emit;
    systemsStore();
    const matchStore = useMatchStore();
    const eventSocketData = ref();
    const oddsMain = ref(null);
    const divnotes = ref(null);
    const isShowDivnotes = ref(true);
    useIntersectionObserver(
      divnotes,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          isShowDivnotes.value = isIntersecting;
        }
      },
      { oddsMain }
    );
    const route = useRoute();
    const settingsData = useCookie("settingsData");
    const timeZone = ref(((_a = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _a.timeZone) || "");
    const isHaft = ref(false);
    const matchLiveDetail = ref([]);
    ref();
    ref(ODD_COMPANY_DEFAULT);
    const matchIdSlug = ref("");
    ref("ahDetail");
    const oCompanySelected = ref(useCookie("oCompanyOddSelected").value ? useCookie("oCompanyOddSelected").value : []);
    const oCompList = ref([]);
    const oddsList = ref([]);
    const oddCompanys = ref([]);
    ODD_COMPANYS.forEach((item) => {
      oCompList.value[item == null ? void 0 : item.id] = oCompanySelected.value.includes(item == null ? void 0 : item.id) ? true : false;
    });
    const oddCompanyName = ref();
    const oddCompanyId = ref();
    const oddsEuropean = ref([]);
    const tab = ref(((_b = route == null ? void 0 : route.query) == null ? void 0 : _b.type) || "");
    const isLoadingData = ref(false);
    const max_init = ref([]);
    const max_live = ref([]);
    const min_init = ref([]);
    const min_live = ref([]);
    const avg_init = ref([]);
    const avg_live = ref([]);
    const init_list_home = ref([]);
    const init_list_draw = ref([]);
    const init_list_away = ref([]);
    const live_list_home = ref([]);
    const live_list_draw = ref([]);
    const live_list_away = ref([]);
    const oddsItemHover = ref();
    const showWinScoreOdds = ref(false);
    const winScorePositionOdds = ref({ top: "0px", left: "0px" });
    ref(false);
    ref({ top: 0, left: 0 });
    ref(false);
    const matchTitle = useModel(__props, "matchTitle");
    const matchContent = useModel(__props, "matchContent");
    const initDataMatch = useModel(__props, "initDataMatch");
    useWindowScroll();
    const heightScreen = ref();
    reactive({
      modal_detail_win: null
    });
    reactive({
      modal_filter_comp: null
    });
    const fetchMatchsRecentDetail = async (matchIdSlug2) => {
      var _a2;
      let resData = initDataMatch.value;
      matchLiveDetail.value.match = resData == null ? void 0 : resData[0];
      (_a2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a2.i_match_id;
    };
    const fetchOdds = async () => {
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.ODDS_EUROPEAN + "?match_id=" + matchIdSlug.value
      ).then((resData) => {
        var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        const oddsList2 = getDataObjectByList(resData == null ? void 0 : resData.data);
        oddsList2 == null ? void 0 : oddsList2.map((item) => {
          var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2, _y, _z, _A, _B, _C, _D, _E, _F, _G;
          item.odds_live = (_g2 = ((_c2 = (_b3 = (_a3 = item == null ? void 0 : item.odds_data) == null ? void 0 : _a3[0]) == null ? void 0 : _b3.odds_data) == null ? void 0 : _c2.odds_live) || ((_f2 = (_e2 = (_d2 = item == null ? void 0 : item.odds_data) == null ? void 0 : _d2[1]) == null ? void 0 : _e2.odds_data) == null ? void 0 : _f2.odds_live)) == null ? void 0 : _g2.map((item_odd) => {
            var _a4, _b4, _c3, _d3, _e3, _f3, _g3, _h3, _i3, _j3, _k3, _l3, _m3, _n3, _o3, _p3, _q3, _r3;
            item_odd = getDataObject(item_odd);
            live_list_home.value.push(((_a4 = item_odd.odds) == null ? void 0 : _a4[0]) ? getOddOfData((_b4 = item_odd.odds) == null ? void 0 : _b4[0]) : null);
            live_list_draw.value.push(((_c3 = item_odd.odds) == null ? void 0 : _c3[1]) ? getOddOfData((_d3 = item_odd.odds) == null ? void 0 : _d3[1]) : null);
            live_list_away.value.push(((_e3 = item_odd.odds) == null ? void 0 : _e3[2]) ? getOddOfData((_f3 = item_odd.odds) == null ? void 0 : _f3[2]) : null);
            item_odd.odds[3] = 1 / (1 + ((_g3 = item_odd.odds) == null ? void 0 : _g3[0]) / ((_h3 = item_odd.odds) == null ? void 0 : _h3[1]) + ((_i3 = item_odd.odds) == null ? void 0 : _i3[0]) / ((_j3 = item_odd.odds) == null ? void 0 : _j3[2])) * 100;
            item_odd.odds[4] = 1 / (1 + ((_k3 = item_odd.odds) == null ? void 0 : _k3[1]) / ((_l3 = item_odd.odds) == null ? void 0 : _l3[0]) + ((_m3 = item_odd.odds) == null ? void 0 : _m3[1]) / ((_n3 = item_odd.odds) == null ? void 0 : _n3[2])) * 100;
            item_odd.odds[5] = 1 / (1 + ((_o3 = item_odd.odds) == null ? void 0 : _o3[2]) / ((_p3 = item_odd.odds) == null ? void 0 : _p3[0]) + ((_q3 = item_odd.odds) == null ? void 0 : _q3[2]) / ((_r3 = item_odd.odds) == null ? void 0 : _r3[1])) * 100;
            item_odd.odds[6] = item_odd.odds[0] * item_odd.odds[3];
            return item_odd;
          });
          item.odds_init = getDataObject(((_k2 = (_j2 = (_i2 = (_h2 = item == null ? void 0 : item.odds_data) == null ? void 0 : _h2[0]) == null ? void 0 : _i2.odds_data) == null ? void 0 : _j2.odds_init) == null ? void 0 : _k2[0]) || ((_o2 = (_n2 = (_m2 = (_l2 = item == null ? void 0 : item.odds_data) == null ? void 0 : _l2[1]) == null ? void 0 : _m2.odds_data) == null ? void 0 : _n2.odds_init) == null ? void 0 : _o2[0]));
          init_list_home.value.push(((_p2 = item.odds_init.odds) == null ? void 0 : _p2[0]) ? getOddOfData((_q2 = item.odds_init.odds) == null ? void 0 : _q2[0]) : null);
          init_list_draw.value.push(((_r2 = item.odds_init.odds) == null ? void 0 : _r2[1]) ? getOddOfData((_s2 = item.odds_init.odds) == null ? void 0 : _s2[1]) : null);
          init_list_away.value.push(((_t2 = item.odds_init.odds) == null ? void 0 : _t2[2]) ? getOddOfData((_u2 = item.odds_init.odds) == null ? void 0 : _u2[2]) : null);
          item.odds_init.odds[3] = 1 / (1 + ((_v2 = item.odds_init.odds) == null ? void 0 : _v2[0]) / ((_w2 = item.odds_init.odds) == null ? void 0 : _w2[1]) + ((_x2 = item.odds_init.odds) == null ? void 0 : _x2[0]) / ((_y = item.odds_init.odds) == null ? void 0 : _y[2])) * 100;
          item.odds_init.odds[4] = 1 / (1 + ((_z = item.odds_init.odds) == null ? void 0 : _z[1]) / ((_A = item.odds_init.odds) == null ? void 0 : _A[0]) + ((_B = item.odds_init.odds) == null ? void 0 : _B[1]) / ((_C = item.odds_init.odds) == null ? void 0 : _C[2])) * 100;
          item.odds_init.odds[5] = 1 / (1 + ((_D = item.odds_init.odds) == null ? void 0 : _D[2]) / ((_E = item.odds_init.odds) == null ? void 0 : _E[0]) + ((_F = item.odds_init.odds) == null ? void 0 : _F[2]) / ((_G = item.odds_init.odds) == null ? void 0 : _G[1])) * 100;
          item.odds_init.odds[6] = item.odds_init.odds[0] * item.odds_init.odds[3];
          return item;
        });
        max_init.value = [
          ((_a2 = init_list_home.value) == null ? void 0 : _a2.length) > 0 ? Math.max.apply(Math, init_list_home.value) : 0,
          ((_b2 = init_list_draw.value) == null ? void 0 : _b2.length) > 0 ? Math.max.apply(Math, init_list_draw.value) : 0,
          ((_c = init_list_away.value) == null ? void 0 : _c.length) > 0 ? Math.max.apply(Math, init_list_away.value) : 0,
          1 / (1 + Math.max.apply(Math, init_list_home.value) / Math.max.apply(Math, init_list_draw.value) + Math.max.apply(Math, init_list_home.value) / Math.max.apply(Math, init_list_away.value)) * 100,
          1 / (1 + Math.max.apply(Math, init_list_draw.value) / Math.max.apply(Math, init_list_home.value) + Math.max.apply(Math, init_list_draw.value) / Math.max.apply(Math, init_list_away.value)) * 100,
          1 / (1 + Math.max.apply(Math, init_list_away.value) / Math.max.apply(Math, init_list_home.value) + Math.max.apply(Math, init_list_away.value) / Math.max.apply(Math, init_list_draw.value)) * 100
        ];
        max_init.value[6] = max_init.value[0] * max_init.value[3];
        min_init.value = [
          ((_d = init_list_home.value) == null ? void 0 : _d.length) > 0 ? Math.min.apply(Math, init_list_home.value) : 0,
          ((_e = init_list_draw.value) == null ? void 0 : _e.length) > 0 ? Math.min.apply(Math, init_list_draw.value) : 0,
          ((_f = init_list_away.value) == null ? void 0 : _f.length) > 0 ? Math.min.apply(Math, init_list_away.value) : 0,
          1 / (1 + Math.min.apply(Math, init_list_home.value) / Math.min.apply(Math, init_list_draw.value) + Math.min.apply(Math, init_list_home.value) / Math.min.apply(Math, init_list_away.value)) * 100,
          1 / (1 + Math.min.apply(Math, init_list_draw.value) / Math.min.apply(Math, init_list_home.value) + Math.min.apply(Math, init_list_draw.value) / Math.min.apply(Math, init_list_away.value)) * 100,
          1 / (1 + Math.min.apply(Math, init_list_away.value) / Math.min.apply(Math, init_list_home.value) + Math.min.apply(Math, init_list_away.value) / Math.min.apply(Math, init_list_draw.value)) * 100
        ];
        min_init.value[6] = min_init.value[0] * min_init.value[3];
        let avg_data = [
          ((_g = init_list_home.value) == null ? void 0 : _g.reduce((a, b) => a + b, 0)) / ((_h = init_list_home.value) == null ? void 0 : _h.length) || 0,
          ((_i = init_list_draw.value) == null ? void 0 : _i.reduce((a, b) => a + b, 0)) / ((_j = init_list_draw.value) == null ? void 0 : _j.length) || 0,
          ((_k = init_list_away.value) == null ? void 0 : _k.reduce((a, b) => a + b, 0)) / ((_l = init_list_away.value) == null ? void 0 : _l.length) || 0
        ];
        avg_init.value = [
          ...avg_data,
          1 / (1 + (avg_data == null ? void 0 : avg_data[0]) / (avg_data == null ? void 0 : avg_data[1]) + (avg_data == null ? void 0 : avg_data[0]) / (avg_data == null ? void 0 : avg_data[2])) * 100,
          1 / (1 + (avg_data == null ? void 0 : avg_data[1]) / (avg_data == null ? void 0 : avg_data[0]) + (avg_data == null ? void 0 : avg_data[1]) / (avg_data == null ? void 0 : avg_data[2])) * 100,
          1 / (1 + (avg_data == null ? void 0 : avg_data[2]) / (avg_data == null ? void 0 : avg_data[0]) + (avg_data == null ? void 0 : avg_data[2]) / (avg_data == null ? void 0 : avg_data[1])) * 100
        ];
        avg_init.value[6] = avg_init.value[0] * avg_init.value[3];
        max_live.value = [
          ((_m = live_list_home.value) == null ? void 0 : _m.length) > 0 ? Math.max.apply(Math, live_list_home.value) : 0,
          ((_n = live_list_draw.value) == null ? void 0 : _n.length) > 0 ? Math.max.apply(Math, live_list_draw.value) : 0,
          ((_o = live_list_away.value) == null ? void 0 : _o.length) > 0 ? Math.max.apply(Math, live_list_away.value) : 0,
          1 / (1 + Math.max.apply(Math, live_list_home.value) / Math.max.apply(Math, live_list_draw.value) + Math.max.apply(Math, live_list_home.value) / Math.max.apply(Math, live_list_away.value)) * 100,
          1 / (1 + Math.max.apply(Math, live_list_draw.value) / Math.max.apply(Math, live_list_home.value) + Math.max.apply(Math, live_list_draw.value) / Math.max.apply(Math, live_list_away.value)) * 100,
          1 / (1 + Math.max.apply(Math, live_list_away.value) / Math.max.apply(Math, live_list_home.value) + Math.max.apply(Math, live_list_away.value) / Math.max.apply(Math, live_list_draw.value)) * 100
        ];
        max_live.value[6] = max_live.value[0] * max_live.value[3];
        min_live.value = [
          ((_p = live_list_home.value) == null ? void 0 : _p.length) > 0 ? Math.min.apply(Math, live_list_home.value) : 0,
          ((_q = live_list_draw.value) == null ? void 0 : _q.length) > 0 ? Math.min.apply(Math, live_list_draw.value) : 0,
          ((_r = live_list_away.value) == null ? void 0 : _r.length) > 0 ? Math.min.apply(Math, live_list_away.value) : 0,
          1 / (1 + Math.min.apply(Math, live_list_home.value) / Math.min.apply(Math, live_list_draw.value) + Math.min.apply(Math, live_list_home.value) / Math.min.apply(Math, live_list_away.value)) * 100,
          1 / (1 + Math.min.apply(Math, live_list_draw.value) / Math.min.apply(Math, live_list_home.value) + Math.min.apply(Math, live_list_draw.value) / Math.min.apply(Math, live_list_away.value)) * 100,
          1 / (1 + Math.min.apply(Math, live_list_away.value) / Math.min.apply(Math, live_list_home.value) + Math.min.apply(Math, live_list_away.value) / Math.min.apply(Math, live_list_draw.value)) * 100
        ];
        min_live.value[6] = min_live.value[0] * min_live.value[3];
        let avg_live_data = [
          ((_s = live_list_home.value) == null ? void 0 : _s.reduce((a, b) => a + b, 0)) / ((_t = live_list_home.value) == null ? void 0 : _t.length) || 0,
          ((_u = live_list_draw.value) == null ? void 0 : _u.reduce((a, b) => a + b, 0)) / ((_v = live_list_draw.value) == null ? void 0 : _v.length) || 0,
          ((_w = live_list_away.value) == null ? void 0 : _w.reduce((a, b) => a + b, 0)) / ((_x = live_list_away.value) == null ? void 0 : _x.length) || 0
        ];
        avg_live.value = [
          ...avg_live_data,
          1 / (1 + (avg_live_data == null ? void 0 : avg_live_data[0]) / (avg_live_data == null ? void 0 : avg_live_data[1]) + (avg_live_data == null ? void 0 : avg_live_data[0]) / (avg_live_data == null ? void 0 : avg_live_data[2])) * 100,
          1 / (1 + (avg_live_data == null ? void 0 : avg_live_data[1]) / (avg_live_data == null ? void 0 : avg_live_data[0]) + (avg_live_data == null ? void 0 : avg_live_data[1]) / (avg_live_data == null ? void 0 : avg_live_data[2])) * 100,
          1 / (1 + (avg_live_data == null ? void 0 : avg_live_data[2]) / (avg_live_data == null ? void 0 : avg_live_data[0]) + (avg_live_data == null ? void 0 : avg_live_data[2]) / (avg_live_data == null ? void 0 : avg_live_data[1])) * 100
        ];
        avg_live.value[6] = avg_live.value[0] * avg_live.value[3];
        oddsEuropean.value = oddsList2;
        nextTick(() => {
          heightScreen.value = void 0;
        });
      });
    };
    watch(
      () => route,
      (newPath) => {
        var _a2;
        const matches = (_a2 = newPath == null ? void 0 : newPath.path) == null ? void 0 : _a2.match(/[^/-]+$/);
        matchIdSlug.value = matches ? matches[0] : "";
      },
      { immediate: true }
    );
    watch(
      () => route.query,
      (newQuery) => {
        var _a2;
        isHaft.value = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? true : false;
      },
      { immediate: true }
    );
    watch(
      () => route.query,
      (newQuery) => {
        var _a2, _b2, _c, _d;
        const europeOdds = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? "europeanHaft" : "europeOdds";
        const handicap = ((_b2 = route.query) == null ? void 0 : _b2.haft) == 1 ? "handicapHalf" : "handicap";
        const overUnder = ((_c = route.query) == null ? void 0 : _c.haft) == 1 ? "overUnderHalf" : "overUnder";
        const oddCompanysList = [];
        (_d = ODD_COMPANYS) == null ? void 0 : _d.forEach((item) => {
          var _a3, _b3, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
          oddCompanysList[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList[item == null ? void 0 : item.isportsapi].handicap = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first = (_b3 = (_a3 = oddsList.value) == null ? void 0 : _a3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _b3.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live = (_d2 = (_c2 = oddsList.value) == null ? void 0 : _c2.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _d2.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run = (_f = (_e = oddsList.value) == null ? void 0 : _e.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _f.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].europeOdds = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first = (_h = (_g = oddsList.value) == null ? void 0 : _g.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _h.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live = (_j = (_i = oddsList.value) == null ? void 0 : _i.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _j.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run = (_l = (_k = oddsList.value) == null ? void 0 : _k.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _l.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].overUnder = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first = (_n = (_m = oddsList.value) == null ? void 0 : _m.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _n.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live = (_p = (_o = oddsList.value) == null ? void 0 : _o.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _p.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run = (_r = (_q = oddsList.value) == null ? void 0 : _q.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _r.inplay;
          if (typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run === "undefined") {
            oddCompanysList[item == null ? void 0 : item.isportsapi].isEmpty = true;
          }
        });
        oddCompanys.value = oddCompanysList;
      },
      { immediate: true }
    );
    watch(
      () => route == null ? void 0 : route.query,
      () => {
        var _a2;
        tab.value = ((_a2 = route == null ? void 0 : route.query) == null ? void 0 : _a2.type) || "";
      },
      { immediate: true }
    );
    const wssMatch = (socketData) => {
      try {
        if (matchStore.wssSocket) {
          if (socketData) {
            eventSocketData.value = socketData;
            emit("socketData", socketData);
          }
        }
      } catch (e) {
        return false;
      }
    };
    watch(
      matchStore,
      () => {
        wssMatch(matchStore == null ? void 0 : matchStore.socketData);
      },
      { deep: true, immediate: true }
    );
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecentDetail(matchIdSlug.value)), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => fetchOdds(matchIdSlug.value)), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb, _cb, _db, _eb, _fb, _gb, _hb, _ib, _jb, _kb, _lb, _mb, _nb, _ob, _pb, _qb, _rb, _sb, _tb, _ub, _vb, _wb, _xb, _yb, _zb, _Ab, _Bb, _Cb, _Db, _Eb, _Fb, _Gb, _Hb, _Ib, _Jb, _Kb, _Lb, _Mb, _Nb, _Ob, _Pb, _Qb, _Rb, _Sb, _Tb, _Ub, _Vb, _Wb, _Xb, _Yb, _Zb, __b, _$b, _ac, _bc, _cc;
      const _component_PopupOddsChange = __nuxt_component_0$1;
      _push(`<!--[--><div id="" class="" data-v-203cf46e><div id="odds-main" data-v-203cf46e><div class="nav_select" style="${ssrRenderStyle({ "margin-top": "7px", "display": "none" })}" data-v-203cf46e><span class="sbtn2" data-v-203cf46e><a id="a_solutions" data-v-203cf46e>${ssrInterpolate(unref($t)("Odd company custome"))}</a></span><span class="sbtn" data-v-203cf46e>${ssrInterpolate(unref($t)("Hide"))}</span><span class="sbtn" data-v-203cf46e>${ssrInterpolate(unref($t)("Select"))}</span><span class="sbtn" data-v-203cf46e><span class="sbtn2 sel" data-v-203cf46e><a id="choose" data-v-203cf46e>${ssrInterpolate(unref($t)("Live"))}</a><select name="sel_showType" id="sel_showType" style="${ssrRenderStyle({ "border": "none" })}" data-v-203cf46e><option value="1" data-v-203cf46e>${ssrInterpolate(unref($t)("All"))}T\u1EA5t c\u1EA3</option><option value="2" data-v-203cf46e>${ssrInterpolate(unref($t)("Init"))}</option><option value="3" selected="selected" data-v-203cf46e>${ssrInterpolate(unref($t)("Live"))}</option></select></span></span><span class="sbtn" data-v-203cf46e>L\u1ECDc</span><span style="${ssrRenderStyle({ "color": "#fff" })}" data-v-203cf46e><div style="${ssrRenderStyle({ "float": "left", "padding-left": "20px", "cursor": "default" })}" id="divNumCount" data-v-203cf46e>T\u1ED5ng[ <b data-v-203cf46e>173</b>/173]Nh\xE0 c\xE1i </div><span style="${ssrRenderStyle({ "float": "left", "color": "#FF0", "cursor": "pointer", "padding-left": "6px" })}" data-v-203cf46e>[Hi\u1EC7n th\u1ECB]</span></span></div><div style="${ssrRenderStyle({ "left": "auto" })}" id="divHeadFloat" class="" data-v-203cf46e><div class="oddDivBox" data-v-203cf46e><div class="twin" id="div_companySelect" data-v-203cf46e><table width="100%" cellspacing="0" cellpadding="0" class="tgs2" data-v-203cf46e><tbody data-v-203cf46e><tr data-v-203cf46e><td data-v-203cf46e><a data-v-203cf46e>${ssrInterpolate(unref($t)("All"))}</a></td></tr><tr data-v-203cf46e><td data-v-203cf46e><a data-v-203cf46e>${ssrInterpolate(unref($t)("Bookmaker hot"))}</a></td></tr><tr data-v-203cf46e><td data-v-203cf46e><a data-v-203cf46e>${ssrInterpolate(unref($t)("Betting Exchange"))}</a></td></tr><tr data-v-203cf46e><td data-v-203cf46e><a data-v-203cf46e>${ssrInterpolate(unref($t)("No betting exchange"))}</a></td></tr></tbody></table></div><div class="rankbox" data-v-203cf46e><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-203cf46e><tbody data-v-203cf46e><tr class="tb-bgcolor" data-v-203cf46e><th width="22" rowspan="1" class="lb rb" data-v-203cf46e><input type="checkbox" name="chkall" id="chkall" data-v-203cf46e></th><th colspan="2" rowspan="1" data-v-203cf46e><span class="sbtn3" style="${ssrRenderStyle({ "float": "left", "text-align": "left" })}" id="a_companySelect" data-v-203cf46e>${ssrInterpolate(unref($t)("Bookmaker"))}</span></th></tr><!--[-->`);
      ssrRenderList(oddsEuropean.value, (item, index) => {
        _push(`<!--[--><tr class="tr-title" data-v-203cf46e><td width="25" rowspan="2" class="lb rb" data-v-203cf46e><input type="checkbox" name="Show" value="0" data-v-203cf46e></td><td width="185" rowspan="2" class="rb" style="${ssrRenderStyle({ "text-align": "left", "padding-left": "4px" })}" data-v-203cf46e><span class="flex ms-2" data-v-203cf46e><span data-v-203cf46e>${ssrInterpolate(item == null ? void 0 : item.company_name)}</span></span></td></tr><tr data-v-203cf46e><th data-v-203cf46e></th><th data-v-203cf46e></th></tr><!--]-->`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata" width="75%" id="dataList" data-v-203cf46e><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" id="oddsList_tab" data-v-203cf46e><tbody data-v-203cf46e><tr class="tb-bgcolor" data-v-203cf46e><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Home"))}</b></th><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Draw"))}</b></th><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Away"))}</b></th><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Home"))}%</b></th><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("D"))}H%</b></th><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Away"))}%</b></th><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Return on Investment"))}%</b></th><th width="5%" colspan="3" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Kelly criterion"))}</b></th><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Last change"))}</b></th></tr><!--[-->`);
      ssrRenderList(oddsEuropean.value, (item, index) => {
        var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2, _y2, _z2, _A2, _B2, _C2, _D2, _E2, _F2, _G2, _H2, _I2, _J2, _K2, _L2, _M2, _N2, _O2, _P2, _Q2, _R2, _S2, _T2, _U2, _V2, _W2, _X2, _Y2, _Z2, __2, _$2, _aa2, _ba2, _ca2, _da2, _ea2, _fa2, _ga2, _ha2, _ia2, _ja2, _ka2, _la2, _ma2, _na2, _oa2, _pa2, _qa2, _ra2, _sa2, _ta2, _ua2, _va2, _wa2, _xa2;
        _push(`<!--[--><tr id="oddstr_474" data-v-203cf46e><td width="75" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-203cf46e><span name="oddsData" data-v-203cf46e>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_b3 = (_a3 = item == null ? void 0 : item.odds_init) == null ? void 0 : _a3.odds) == null ? void 0 : _b3[0]))}</span></td><td width="75" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-203cf46e><span name="oddsData" data-v-203cf46e>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_d2 = (_c2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _c2.odds) == null ? void 0 : _d2[1]))}</span></td><td width="75" class="rb" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-203cf46e><span name="oddsData" data-v-203cf46e>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_f2 = (_e2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _e2.odds) == null ? void 0 : _f2[2]))}</span></td><td width="75" data-v-203cf46e>${ssrInterpolate((_i2 = (_h2 = (_g2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _g2.odds) == null ? void 0 : _h2[3]) == null ? void 0 : _i2.toFixed(2))}</td><td width="75" data-v-203cf46e>${ssrInterpolate((_l2 = (_k2 = (_j2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _j2.odds) == null ? void 0 : _k2[4]) == null ? void 0 : _l2.toFixed(2))}</td><td width="75" data-v-203cf46e>${ssrInterpolate((_o2 = (_n2 = (_m2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _m2.odds) == null ? void 0 : _n2[5]) == null ? void 0 : _o2.toFixed(2))}</td><td width="75" class="rb" data-v-203cf46e>${ssrInterpolate((_r2 = (_q2 = (_p2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _p2.odds) == null ? void 0 : _q2[6]) == null ? void 0 : _r2.toFixed(2))}</td><td width="75" rowspan="2" class="${ssrRenderClass([("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_t2 = (_s2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _s2.odds) == null ? void 0 : _t2[0]) * ((_u2 = avg_live.value) == null ? void 0 : _u2[3]) / 100 >= 1 ? "red" : "", "rb"])}" data-v-203cf46e>${ssrInterpolate((("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_w2 = (_v2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _v2.odds) == null ? void 0 : _w2[0]) * ((_x2 = avg_live.value) == null ? void 0 : _x2[3]) / 100).toFixed(2))}</td><td width="75" rowspan="2" class="${ssrRenderClass([("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_z2 = (_y2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _y2.odds) == null ? void 0 : _z2[1]) * ((_A2 = avg_live.value) == null ? void 0 : _A2[4]) / 100 >= 1 ? "red" : "", "rb"])}" data-v-203cf46e>${ssrInterpolate((("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_C2 = (_B2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _B2.odds) == null ? void 0 : _C2[1]) * ((_D2 = avg_live.value) == null ? void 0 : _D2[4]) / 100).toFixed(2))}</td><td width="75" rowspan="2" class="${ssrRenderClass([("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_F2 = (_E2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _E2.odds) == null ? void 0 : _F2[2]) * ((_G2 = avg_live.value) == null ? void 0 : _G2[5]) / 100 >= 1 ? "red" : "", "rb"])}" data-v-203cf46e>${ssrInterpolate((("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_I2 = (_H2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _H2.odds) == null ? void 0 : _I2[2]) * ((_J2 = avg_live.value) == null ? void 0 : _J2[5]) / 100).toFixed(2))}</td><td rowspan="2" class="rb time" data-v-203cf46e><span name="timeData" data-v-203cf46e>${ssrInterpolate(("timeStamp2DateUTCTimeZone" in _ctx ? _ctx.timeStamp2DateUTCTimeZone : unref(timeStamp2DateUTCTimeZone))((_L2 = (_K2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _K2[0]) == null ? void 0 : _L2.update_time, "MM/DD HH:mm", timeZone.value))}</span></td></tr><tr data-v-203cf46e><td style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-203cf46e><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_O2 = (_N2 = (_M2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _M2[0]) == null ? void 0 : _N2.odds) == null ? void 0 : _O2[0], (_Q2 = (_P2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _P2.odds) == null ? void 0 : _Q2[0]))}" data-v-203cf46e>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_T2 = (_S2 = (_R2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _R2[0]) == null ? void 0 : _S2.odds) == null ? void 0 : _T2[0]))}</span></td><td style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-203cf46e><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_W2 = (_V2 = (_U2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _U2[0]) == null ? void 0 : _V2.odds) == null ? void 0 : _W2[1], (_Y2 = (_X2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _X2.odds) == null ? void 0 : _Y2[1]))}" data-v-203cf46e>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_$2 = (__2 = (_Z2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _Z2[0]) == null ? void 0 : __2.odds) == null ? void 0 : _$2[1]))}</span></td><td class="rb" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-203cf46e><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_ca2 = (_ba2 = (_aa2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _aa2[0]) == null ? void 0 : _ba2.odds) == null ? void 0 : _ca2[2], (_ea2 = (_da2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _da2.odds) == null ? void 0 : _ea2[2]))}" data-v-203cf46e>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_ha2 = (_ga2 = (_fa2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _fa2[0]) == null ? void 0 : _ga2.odds) == null ? void 0 : _ha2[2]))}</span></td><td data-v-203cf46e>${ssrInterpolate((_la2 = (_ka2 = (_ja2 = (_ia2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _ia2[0]) == null ? void 0 : _ja2.odds) == null ? void 0 : _ka2[3]) == null ? void 0 : _la2.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate((_pa2 = (_oa2 = (_na2 = (_ma2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _ma2[0]) == null ? void 0 : _na2.odds) == null ? void 0 : _oa2[4]) == null ? void 0 : _pa2.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate((_ta2 = (_sa2 = (_ra2 = (_qa2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _qa2[0]) == null ? void 0 : _ra2.odds) == null ? void 0 : _sa2[5]) == null ? void 0 : _ta2.toFixed(2))}</td><td class="rb" data-v-203cf46e>${ssrInterpolate((_xa2 = (_wa2 = (_va2 = (_ua2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _ua2[0]) == null ? void 0 : _va2.odds) == null ? void 0 : _wa2[6]) == null ? void 0 : _xa2.toFixed(2))}</td></tr><!--]-->`);
      });
      _push(`<!--]--></tbody></table></div></div><p data-v-203cf46e></p></div></div><div id="divFooterFload" class="${ssrRenderClass(!isShowDivnotes.value ? "oddfooterDiv" : "")}" data-v-203cf46e><input type="checkbox" name="inputFloat" id="inputFloat" style="${ssrRenderStyle({ "display": "none" })}" data-v-203cf46e><div class="oddDivBox" style="${ssrRenderStyle({ "z-index": "194" })}" data-v-203cf46e><div class="rankbox" data-v-203cf46e><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-203cf46e><tbody data-v-203cf46e><tr class="f_odds bl" data-v-203cf46e><th width="208" class="lb rb" data-v-203cf46e>\xA0</th></tr><tr id="highFObj" data-v-203cf46e><td width="208" class="gbg lb rb" data-v-203cf46e>${ssrInterpolate(unref($t)("Highest initial rate"))}</td></tr><tr id="highFObj" data-v-203cf46e><td width="208" class="gbg lb rb" data-v-203cf46e>${ssrInterpolate(unref($t)("Highest rate"))}</td></tr><tr id="highFObj" data-v-203cf46e><td width="208" class="gbg lb rb" data-v-203cf46e>${ssrInterpolate(unref($t)("Lowest initial rate"))}</td></tr><tr id="highFObj" data-v-203cf46e><td width="208" class="gbg lb rb" data-v-203cf46e>${ssrInterpolate(unref($t)("Lowest rate"))}</td></tr><tr id="highFObj" data-v-203cf46e><td width="208" class="gbg lb rb" data-v-203cf46e>${ssrInterpolate(unref($t)("Average initial rate"))}</td></tr><tr id="highFObj" data-v-203cf46e><td width="208" class="gbg lb rb" data-v-203cf46e>${ssrInterpolate(unref($t)("Average rate"))}</td></tr></tbody></table><div class="rankdata" width="75%" id="dataList" data-v-203cf46e><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" id="oddsList_tab" data-v-203cf46e><tbody data-v-203cf46e><tr class="tb-bgcolor" data-v-203cf46e><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Home"))}</b></th><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Draw"))}</b></th><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Away"))}</b></th><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Home"))}%</b></th><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("D"))}H%</b></th><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Away"))}%</b></th><th width="5%" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Return on Investment"))}%</b></th><th width="5%" colspan="3" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate(unref($t)("Kelly criterion"))}</b></th><th width="5%" data-v-203cf46e><b style="${ssrRenderStyle({ "color": "#f5f5f5" })}" data-v-203cf46e>${ssrInterpolate(unref($t)("Last"))}</b></th><th width="5%" data-v-203cf46e><b style="${ssrRenderStyle({ "color": "#f5f5f5" })}" data-v-203cf46e>${ssrInterpolate(unref($t)("Read more"))}</b></th></tr><tr id="highFObj" data-v-203cf46e><td name="oddsData" data-v-203cf46e>${ssrInterpolate((_a2 = max_init.value) == null ? void 0 : _a2[0])}</td><td name="oddsData" data-v-203cf46e>${ssrInterpolate((_b2 = max_init.value) == null ? void 0 : _b2[1])}</td><td class="rb" name="oddsData" data-v-203cf46e>${ssrInterpolate((_c = max_init.value) == null ? void 0 : _c[2])}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_d = max_init.value) == null ? void 0 : _d[3]) ? "" : (_f = (_e = max_init.value) == null ? void 0 : _e[3]) == null ? void 0 : _f.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_g = max_init.value) == null ? void 0 : _g[4]) ? "" : (_i = (_h = max_init.value) == null ? void 0 : _h[4]) == null ? void 0 : _i.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_j = max_init.value) == null ? void 0 : _j[5]) ? "" : (_l = (_k = max_init.value) == null ? void 0 : _k[5]) == null ? void 0 : _l.toFixed(2))}</td><td class="rb" data-v-203cf46e>${ssrInterpolate(Number.isNaN((_m = max_init.value) == null ? void 0 : _m[6]) ? "" : (_o = (_n = max_init.value) == null ? void 0 : _n[6]) == null ? void 0 : _o.toFixed(2))}</td><td rowspan="2" class="${ssrRenderClass(((_p = max_live.value) == null ? void 0 : _p[0]) * ((_q = avg_live.value) == null ? void 0 : _q[3]) / 100 >= 1 ? "red" : "")}" data-v-203cf46e>${ssrInterpolate(((_r = max_live.value) == null ? void 0 : _r[0]) * ((_s = avg_live.value) == null ? void 0 : _s[3]) / 100 ? (((_t = max_live.value) == null ? void 0 : _t[0]) * ((_u = avg_live.value) == null ? void 0 : _u[3]) / 100).toFixed(2) : "")}</td><td rowspan="2" class="${ssrRenderClass(((_v = max_live.value) == null ? void 0 : _v[1]) * ((_w = avg_live.value) == null ? void 0 : _w[4]) / 100 >= 1 ? "red" : "")}" data-v-203cf46e>${ssrInterpolate(((_x = max_live.value) == null ? void 0 : _x[1]) * ((_y = avg_live.value) == null ? void 0 : _y[4]) / 100 ? (((_z = max_live.value) == null ? void 0 : _z[1]) * ((_A = avg_live.value) == null ? void 0 : _A[4]) / 100).toFixed(2) : "")}</td><td rowspan="2" class="${ssrRenderClass([((_B = max_live.value) == null ? void 0 : _B[2]) * ((_C = avg_live.value) == null ? void 0 : _C[5]) / 100 >= 1 ? "red" : "", "rb"])}" data-v-203cf46e>${ssrInterpolate(((_D = max_live.value) == null ? void 0 : _D[2]) * ((_E = avg_live.value) == null ? void 0 : _E[5]) / 100 ? (((_F = max_live.value) == null ? void 0 : _F[2]) * ((_G = avg_live.value) == null ? void 0 : _G[5]) / 100).toFixed(2) : "")}</td><td class="rb" rowspan="2" colspan="2" data-v-203cf46e>\xA0</td></tr><tr id="highRObj" data-v-203cf46e><td data-v-203cf46e><span class="down2" name="oddsData" data-v-203cf46e>${ssrInterpolate((_H = max_live.value) == null ? void 0 : _H[0])}</span></td><td data-v-203cf46e><span class="up2" name="oddsData" data-v-203cf46e>${ssrInterpolate((_I = max_live.value) == null ? void 0 : _I[1])}</span></td><td class="rb" data-v-203cf46e><span class="up2" name="oddsData" data-v-203cf46e>${ssrInterpolate((_J = max_live.value) == null ? void 0 : _J[2])}</span></td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_K = max_live.value) == null ? void 0 : _K[3]) ? "" : (_M = (_L = max_live.value) == null ? void 0 : _L[3]) == null ? void 0 : _M.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_N = max_live.value) == null ? void 0 : _N[4]) ? "" : (_P = (_O = max_live.value) == null ? void 0 : _O[4]) == null ? void 0 : _P.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_Q = max_live.value) == null ? void 0 : _Q[5]) ? "" : (_S = (_R = max_live.value) == null ? void 0 : _R[5]) == null ? void 0 : _S.toFixed(2))}</td><td class="rb" data-v-203cf46e>${ssrInterpolate(Number.isNaN((_T = max_live.value) == null ? void 0 : _T[6]) ? "" : (_V = (_U = max_live.value) == null ? void 0 : _U[6]) == null ? void 0 : _V.toFixed(2))}</td></tr><tr id="lowFObj" style="${ssrRenderStyle({ "text-align": "center" })}" data-v-203cf46e><td name="oddsData" data-v-203cf46e>${ssrInterpolate((_W = min_init.value) == null ? void 0 : _W[0])}</td><td name="oddsData" data-v-203cf46e>${ssrInterpolate((_X = min_init.value) == null ? void 0 : _X[1])}</td><td class="rb" name="oddsData" data-v-203cf46e>${ssrInterpolate((_Y = min_init.value) == null ? void 0 : _Y[2])}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_Z = min_init.value) == null ? void 0 : _Z[3]) ? "" : (_$ = (__ = min_init.value) == null ? void 0 : __[3]) == null ? void 0 : _$.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_aa = min_init.value) == null ? void 0 : _aa[4]) ? "" : (_ca = (_ba = min_init.value) == null ? void 0 : _ba[4]) == null ? void 0 : _ca.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_da = min_init.value) == null ? void 0 : _da[5]) ? "" : (_fa = (_ea = min_init.value) == null ? void 0 : _ea[5]) == null ? void 0 : _fa.toFixed(2))}</td><td class="rb" data-v-203cf46e>${ssrInterpolate(Number.isNaN((_ga = min_init.value) == null ? void 0 : _ga[6]) ? "" : (_ia = (_ha = min_init.value) == null ? void 0 : _ha[6]) == null ? void 0 : _ia.toFixed(2))}</td><td rowspan="2" class="${ssrRenderClass(((_ja = min_live.value) == null ? void 0 : _ja[0]) * ((_ka = avg_live.value) == null ? void 0 : _ka[3]) / 100 >= 1 ? "red" : "")}" data-v-203cf46e>${ssrInterpolate(((_la = min_live.value) == null ? void 0 : _la[0]) * ((_ma = avg_live.value) == null ? void 0 : _ma[3]) / 100 ? (((_na = min_live.value) == null ? void 0 : _na[0]) * ((_oa = avg_live.value) == null ? void 0 : _oa[3]) / 100).toFixed(2) : "")}</td><td rowspan="2" class="${ssrRenderClass(((_pa = min_live.value) == null ? void 0 : _pa[1]) * ((_qa = avg_live.value) == null ? void 0 : _qa[4]) / 100 >= 1 ? "red" : "")}" data-v-203cf46e>${ssrInterpolate(((_ra = min_live.value) == null ? void 0 : _ra[1]) * ((_sa = avg_live.value) == null ? void 0 : _sa[4]) / 100 ? (((_ta = min_live.value) == null ? void 0 : _ta[1]) * ((_ua = avg_live.value) == null ? void 0 : _ua[4]) / 100).toFixed(2) : "")}</td><td rowspan="2" class="${ssrRenderClass([((_va = min_live.value) == null ? void 0 : _va[2]) * ((_wa = avg_live.value) == null ? void 0 : _wa[5]) / 100 >= 1 ? "red" : "", "rb"])}" data-v-203cf46e>${ssrInterpolate(((_xa = min_live.value) == null ? void 0 : _xa[2]) * ((_ya = avg_live.value) == null ? void 0 : _ya[5]) / 100 ? (((_za = min_live.value) == null ? void 0 : _za[2]) * ((_Aa = avg_live.value) == null ? void 0 : _Aa[5]) / 100).toFixed(2) : "")}</td><td class="rb" rowspan="2" colspan="2" data-v-203cf46e>\xA0</td></tr><tr id="lowRObj" data-v-203cf46e><td data-v-203cf46e><span class="down2" name="oddsData" data-v-203cf46e>${ssrInterpolate((_Ba = min_live.value) == null ? void 0 : _Ba[0])}</span></td><td data-v-203cf46e><span class="up2" name="oddsData" data-v-203cf46e>${ssrInterpolate((_Ca = min_live.value) == null ? void 0 : _Ca[1])}</span></td><td class="rb" data-v-203cf46e><span class="up2" name="oddsData" data-v-203cf46e>${ssrInterpolate((_Da = min_live.value) == null ? void 0 : _Da[2])}</span></td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_Ea = min_live.value) == null ? void 0 : _Ea[3]) ? "" : (_Ga = (_Fa = min_live.value) == null ? void 0 : _Fa[3]) == null ? void 0 : _Ga.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_Ha = min_live.value) == null ? void 0 : _Ha[4]) ? "" : (_Ja = (_Ia = min_live.value) == null ? void 0 : _Ia[4]) == null ? void 0 : _Ja.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_Ka = min_live.value) == null ? void 0 : _Ka[5]) ? "" : (_Ma = (_La = min_live.value) == null ? void 0 : _La[5]) == null ? void 0 : _Ma.toFixed(2))}</td><td class="rb" data-v-203cf46e>${ssrInterpolate(Number.isNaN((_Na = min_live.value) == null ? void 0 : _Na[6]) ? "" : (_Pa = (_Oa = min_live.value) == null ? void 0 : _Oa[6]) == null ? void 0 : _Pa.toFixed(2))}</td></tr><tr id="avgFObj" style="${ssrRenderStyle({ "text-align": "center" })}" data-v-203cf46e><td name="oddsData" data-v-203cf46e>${ssrInterpolate((_Ra = (_Qa = avg_init.value) == null ? void 0 : _Qa[0]) == null ? void 0 : _Ra.toFixed(2))}</td><td name="oddsData" data-v-203cf46e>${ssrInterpolate((_Ta = (_Sa = avg_init.value) == null ? void 0 : _Sa[1]) == null ? void 0 : _Ta.toFixed(2))}</td><td class="rb" name="oddsData" data-v-203cf46e>${ssrInterpolate((_Va = (_Ua = avg_init.value) == null ? void 0 : _Ua[2]) == null ? void 0 : _Va.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_Wa = avg_init.value) == null ? void 0 : _Wa[3]) ? "" : (_Ya = (_Xa = avg_init.value) == null ? void 0 : _Xa[3]) == null ? void 0 : _Ya.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_Za = avg_init.value) == null ? void 0 : _Za[4]) ? "" : (_$a = (__a = avg_init.value) == null ? void 0 : __a[4]) == null ? void 0 : _$a.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_ab = avg_init.value) == null ? void 0 : _ab[5]) ? "" : (_cb = (_bb = avg_init.value) == null ? void 0 : _bb[5]) == null ? void 0 : _cb.toFixed(2))}</td><td class="rb" data-v-203cf46e>${ssrInterpolate(Number.isNaN((_db = avg_init.value) == null ? void 0 : _db[6]) ? "" : (_fb = (_eb = avg_init.value) == null ? void 0 : _eb[6]) == null ? void 0 : _fb.toFixed(2))}</td><td rowspan="2" class="${ssrRenderClass(((_gb = avg_live.value) == null ? void 0 : _gb[0]) * ((_hb = avg_live.value) == null ? void 0 : _hb[3]) / 100 >= 1 ? "red" : "")}" data-v-203cf46e>${ssrInterpolate(((_ib = avg_live.value) == null ? void 0 : _ib[0]) * ((_jb = avg_live.value) == null ? void 0 : _jb[3]) / 100 ? (((_kb = avg_live.value) == null ? void 0 : _kb[0]) * ((_lb = avg_live.value) == null ? void 0 : _lb[3]) / 100).toFixed(2) : "")}</td><td rowspan="2" class="${ssrRenderClass(((_mb = avg_live.value) == null ? void 0 : _mb[1]) * ((_nb = avg_live.value) == null ? void 0 : _nb[4]) / 100 >= 1 ? "red" : "")}" data-v-203cf46e>${ssrInterpolate(((_ob = avg_live.value) == null ? void 0 : _ob[1]) * ((_pb = avg_live.value) == null ? void 0 : _pb[4]) / 100 ? (((_qb = avg_live.value) == null ? void 0 : _qb[1]) * ((_rb = avg_live.value) == null ? void 0 : _rb[4]) / 100).toFixed(2) : "")}</td><td rowspan="2" class="${ssrRenderClass([((_sb = avg_live.value) == null ? void 0 : _sb[2]) * ((_tb = avg_live.value) == null ? void 0 : _tb[5]) / 100 >= 1 ? "red" : "", "rb"])}" data-v-203cf46e>${ssrInterpolate(((_ub = avg_live.value) == null ? void 0 : _ub[2]) * ((_vb = avg_live.value) == null ? void 0 : _vb[5]) / 100 ? (((_wb = avg_live.value) == null ? void 0 : _wb[2]) * ((_xb = avg_live.value) == null ? void 0 : _xb[5]) / 100).toFixed(2) : "")}</td><td class="rb" rowspan="2" colspan="2" data-v-203cf46e>\xA0</td></tr><tr id="avgRObj" data-v-203cf46e><td data-v-203cf46e><span class="down2" name="oddsData" data-v-203cf46e>${ssrInterpolate((_zb = (_yb = avg_live.value) == null ? void 0 : _yb[0]) == null ? void 0 : _zb.toFixed(2))}</span></td><td data-v-203cf46e><span class="up2" name="oddsData" data-v-203cf46e>${ssrInterpolate((_Bb = (_Ab = avg_live.value) == null ? void 0 : _Ab[1]) == null ? void 0 : _Bb.toFixed(2))}</span></td><td class="rb" data-v-203cf46e><span class="up2" name="oddsData" data-v-203cf46e>${ssrInterpolate((_Db = (_Cb = avg_live.value) == null ? void 0 : _Cb[2]) == null ? void 0 : _Db.toFixed(2))}</span></td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_Eb = avg_live.value) == null ? void 0 : _Eb[3]) ? "" : (_Gb = (_Fb = avg_live.value) == null ? void 0 : _Fb[3]) == null ? void 0 : _Gb.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_Hb = avg_live.value) == null ? void 0 : _Hb[4]) ? "" : (_Jb = (_Ib = avg_live.value) == null ? void 0 : _Ib[4]) == null ? void 0 : _Jb.toFixed(2))}</td><td data-v-203cf46e>${ssrInterpolate(Number.isNaN((_Kb = avg_live.value) == null ? void 0 : _Kb[5]) ? "" : (_Mb = (_Lb = avg_live.value) == null ? void 0 : _Lb[5]) == null ? void 0 : _Mb.toFixed(2))}</td><td class="rb" data-v-203cf46e>${ssrInterpolate(Number.isNaN((_Nb = avg_live.value) == null ? void 0 : _Nb[6]) ? "" : (_Pb = (_Ob = avg_live.value) == null ? void 0 : _Ob[6]) == null ? void 0 : _Pb.toFixed(2))}</td></tr></tbody></table></div></div></div></div><div id="divnotes" style="${ssrRenderStyle({ "margin": "0 auto", "width": "100%", "background-color": "#FFF", "text-align": "center" })}" data-v-203cf46e><table width="100%" cellspacing="0" cellpadding="1" class="tcenter" style="${ssrRenderStyle({ "line-height": "22px" })}" id="helptxt" data-v-203cf46e><tbody data-v-203cf46e><tr data-v-203cf46e><td colspan="13" bgcolor="#F7F7F7" class="lb rb" style="${ssrRenderStyle({ "text-align": "left", "padding": "5px 20px" })}" data-v-203cf46e><div class="tipsPre" style="${ssrRenderStyle({ "-webkit-text-size-adjust": "none" })}" data-v-203cf46e><p data-v-203cf46e>${ssrInterpolate(unref($t)("Note"))}:</p><p data-v-203cf46e>1. ${ssrInterpolate(unref($t)("Home win rate (HWR), draw rate (DR), away win rate (AWR): Match results are calculated by home win rate, draw rate and away win rate, which is calculated by home win rate, away win rate and draw rate. Return rate: Home win rate, away win rate, draw rate"))}</p><p data-v-203cf46e>2. ${ssrInterpolate(unref($t)("Payback ratio: measures the payout ratio of bookmakers, higher payback ratio means more profit bettors can get.Formula: P=AxBxC/:AxB BxC AxC:P=Payback ratio A=Win ratio B=Draw ratio C=Loss ratio"))}</p><p data-v-203cf46e>3. ${ssrInterpolate(unref($t)("Kelly Index: Reflects the payment risk of rates, that is, the difference in payment rate between the market rate and the established rate. If the Kelly Index is higher than the payout rate, the risk is large and difficult to overcome. On the contrary, the risk is small and easy to overcome"))}</p><p data-v-203cf46e>4. ${ssrInterpolate(unref($t)('Help: If the Kelly Index is higher than 1 side bongdalu will show the word in red. Select "home, draw, away, return rate" on top you can re-rank. Select the score you can see all the scores; If "time change" is shown in red then the score has changed in 30 minutes'))}</p></div></td></tr></tbody></table></div></div><div id="content-page" class="mt-5" data-v-203cf46e>`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title" data-v-203cf46e>${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div><div class="twin" style="${ssrRenderStyle([
        showWinScoreOdds.value ? null : { display: "none" },
        { position: "absolute", top: winScorePositionOdds.value.top, left: winScorePositionOdds.value.left, zIndex: 999 }
      ])}" data-v-203cf46e><table width="100%" border="0" cellspacing="0" cellpadding="0" class="tgs2" data-v-203cf46e><tbody data-v-203cf46e><tr data-v-203cf46e><td height="26" colspan="4" class="hbg-td1" data-v-203cf46e><b data-v-203cf46e>${ssrInterpolate((_Qb = oddsItemHover.value) == null ? void 0 : _Qb.company_name)} ${ssrInterpolate(unref($t)("Odd history"))}</b></td></tr><!--[-->`);
      ssrRenderList((_Rb = oddsItemHover.value) == null ? void 0 : _Rb.odds_live, (item, index) => {
        var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2;
        _push(`<tr data-v-203cf46e><td style="${ssrRenderStyle({ "width": "19%" })}" data-v-203cf46e><span name="oddsData" class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_a3 = item == null ? void 0 : item.odds) == null ? void 0 : _a3[0], (_e2 = (_d2 = (_c2 = (_b3 = oddsItemHover.value) == null ? void 0 : _b3.odds_live) == null ? void 0 : _c2[index + 1]) == null ? void 0 : _d2.odds) == null ? void 0 : _e2[0]))}" data-v-203cf46e>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_f2 = item == null ? void 0 : item.odds) == null ? void 0 : _f2[0]))}</span></td><td style="${ssrRenderStyle({ "width": "19%" })}" data-v-203cf46e><span name="oddsData" class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_g2 = item == null ? void 0 : item.odds) == null ? void 0 : _g2[1], (_k2 = (_j2 = (_i2 = (_h2 = oddsItemHover.value) == null ? void 0 : _h2.odds_live) == null ? void 0 : _i2[index + 1]) == null ? void 0 : _j2.odds) == null ? void 0 : _k2[1]))}" data-v-203cf46e>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_l2 = item == null ? void 0 : item.odds) == null ? void 0 : _l2[1]))}</span></td><td style="${ssrRenderStyle({ "width": "19%" })}" data-v-203cf46e><span name="oddsData" class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_m2 = item == null ? void 0 : item.odds) == null ? void 0 : _m2[2], (_q2 = (_p2 = (_o2 = (_n2 = oddsItemHover.value) == null ? void 0 : _n2.odds_live) == null ? void 0 : _o2[index + 1]) == null ? void 0 : _p2.odds) == null ? void 0 : _q2[2]))}" data-v-203cf46e>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_r2 = item == null ? void 0 : item.odds) == null ? void 0 : _r2[2]))}</span></td><td name="timeData" data-v-203cf46e>${ssrInterpolate(("timeStamp2DateUTCTimeZone" in _ctx ? _ctx.timeStamp2DateUTCTimeZone : unref(timeStamp2DateUTCTimeZone))(item == null ? void 0 : item.update_time, "MM/DD HH:mm", timeZone.value))}</td></tr>`);
      });
      _push(`<!--]--><tr data-v-203cf46e><td colspan="4" data-v-203cf46e>${ssrInterpolate(unref($t)("Read more"))}</td></tr><tr data-v-203cf46e><td style="${ssrRenderStyle({ "width": "19%" })}" name="oddsData" data-v-203cf46e>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_Ub = (_Tb = (_Sb = oddsItemHover.value) == null ? void 0 : _Sb.odds_init) == null ? void 0 : _Tb.odds) == null ? void 0 : _Ub[0]))}</td><td style="${ssrRenderStyle({ "width": "19%" })}" name="oddsData" data-v-203cf46e>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_Xb = (_Wb = (_Vb = oddsItemHover.value) == null ? void 0 : _Vb.odds_init) == null ? void 0 : _Wb.odds) == null ? void 0 : _Xb[1]))}</td><td style="${ssrRenderStyle({ "width": "19%" })}" name="oddsData" data-v-203cf46e>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((__b = (_Zb = (_Yb = oddsItemHover.value) == null ? void 0 : _Yb.odds_init) == null ? void 0 : _Zb.odds) == null ? void 0 : __b[2]))}</td><td name="timeData" data-v-203cf46e>${ssrInterpolate(("timeStamp2DateUTCTimeZone" in _ctx ? _ctx.timeStamp2DateUTCTimeZone : unref(timeStamp2DateUTCTimeZone))((_ac = (_$b = oddsItemHover.value) == null ? void 0 : _$b.odds_init) == null ? void 0 : _ac.update_time, "MM/DD HH:mm", timeZone.value))}(${ssrInterpolate(unref($t)("Init"))})</td></tr></tbody></table></div><div class="match-odds container" data-v-203cf46e><div class="modal fade" id="modal_detail_win" tabindex="-1" aria-labelledby="modal_detail_win_label" aria-hidden="true" data-v-203cf46e><div class="modal-dialog modal-dialog-centered container" data-v-203cf46e><div class="modal-content" data-v-203cf46e><div class="modal-header" data-v-203cf46e><div class="modal-title" id="modal_detail_win_label" data-v-203cf46e>${ssrInterpolate(oddCompanyName.value)} ${ssrInterpolate(unref($t)("Odd history"))}</div><button type="button" class="btn-close" aria-label="Close" data-v-203cf46e></button></div><div class="modal-body" data-v-203cf46e><div id="" class="layui-layer-content detail_win" data-v-203cf46e><div class="popinfo" data-v-203cf46e>`);
      _push(ssrRenderComponent(_component_PopupOddsChange, {
        "odd-comp-id": oddCompanyId.value,
        "match-id": matchIdSlug.value,
        section: "ahDetail",
        "odd-companys-list": oddCompanys.value
      }, null, _parent));
      _push(`</div></div></div></div></div></div><div class="modal fade" id="modal_filter_comp" tabindex="-1" aria-labelledby="modal_filter_comp_label" aria-hidden="true" data-v-203cf46e><div class="modal-dialog modal-dialog-centered" data-v-203cf46e><div class="modal-content" data-v-203cf46e><div class="modal-header" data-v-203cf46e><div class="modal-title" id="modal_filter_comp_label" data-v-203cf46e>${ssrInterpolate(unref($t)("Select Company"))}</div><button type="button" class="btn-close" aria-label="Close" data-v-203cf46e></button></div><div class="modal-body" data-v-203cf46e><div class="layui-layer-content oddscomp-filterwin" data-v-203cf46e><ul id="oddscompFilterWin" class="popinfo" data-v-203cf46e><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (oddCompany, index) => {
        _push(`<li${ssrRenderAttr("value", oddCompany == null ? void 0 : oddCompany.id)} class="${ssrRenderClass([oCompanySelected.value.includes(oddCompany == null ? void 0 : oddCompany.id) ? "on" : "", "complist"])}" data-v-203cf46e><i class="check-circled" data-v-203cf46e></i> ${ssrInterpolate(oddCompany == null ? void 0 : oddCompany.name)}</li>`);
      });
      _push(`<!--]--></ul><div id="winTips" class="tips" style="${ssrRenderStyle(((_bc = oCompanySelected.value) == null ? void 0 : _bc.length) === 0 ? null : { display: "none" })}" data-v-203cf46e>*${ssrInterpolate(unref($t)("Select at least 1 company"))}</div></div></div><div class="modal-footer" style="${ssrRenderStyle({ "display": "none" })}" data-v-203cf46e><button type="button" class="btn btn-primary"${ssrIncludeBooleanAttr(((_cc = oCompanySelected.value) == null ? void 0 : _cc.length) === 0 ? true : false) ? " disabled" : ""} data-v-203cf46e>${ssrInterpolate(unref($t)("OK"))}</button></div></div></div></div><div style="${ssrRenderStyle(isLoadingData.value ? null : { display: "none" })}" id="sloading" class="sloading" data-v-203cf46e><div class="bar icon1" data-v-203cf46e></div><div class="bar icon2" data-v-203cf46e></div><div class="bar icon3" data-v-203cf46e></div><div class="bar icon4" data-v-203cf46e></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/odds/1x2-odds/[match_id].vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const Odds1x2 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-203cf46e"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
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
    var _a, _b, _c;
    let __temp, __restore;
    const { useLocale, $t } = useShareCommon();
    const { width } = useWindowSize();
    const emit = __emit;
    const storeSystems = systemsStore();
    const matchStore = useMatchStore();
    const eventSocketData = ref();
    const route = useRoute();
    const isHaft = ref(false);
    const matchLiveDetail = ref([]);
    const oddsDetail = ref();
    const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
    const matchIdSlug = ref("");
    const oCompanySelected = ref(useCookie("oCompanyOddSelected").value ? useCookie("oCompanyOddSelected").value : []);
    const isEmptyCompanySelected = ref(((_a = oCompanySelected.value) == null ? void 0 : _a.length) > 0 ? false : true);
    const oCompList = ref([]);
    const oddsList = ref([]);
    const oddCompanys = ref([]);
    ODD_COMPANYS.forEach((item) => {
      if (isEmptyCompanySelected.value) {
        oCompList.value[item == null ? void 0 : item.id] = true;
      } else {
        oCompList.value[item == null ? void 0 : item.id] = oCompanySelected.value.includes(item == null ? void 0 : item.id) ? true : false;
      }
    });
    const tabActive = ref(1);
    ref(false);
    const refreshTime = ref(Date.now());
    const matchTitle = useModel(__props, "matchTitle");
    const matchContent = useModel(__props, "matchContent");
    const initDataMatch = useModel(__props, "initDataMatch");
    const titleList = ref([
      {
        id: 1,
        name: $t("Init")
      },
      {
        id: 2,
        name: $t("Live")
      },
      {
        id: 3,
        name: $t("Run Odds")
      }
    ]);
    const isMobile = computed(() => {
      return width.value <= 768;
    });
    const showColumn = computed(() => {
      return {
        first: !isMobile.value ? true : tabActive.value === 1 ? true : false,
        second: !isMobile.value ? true : tabActive.value === 2 ? true : false,
        third: !isMobile.value ? true : tabActive.value === 3 ? true : false
      };
    });
    const oddCompanyName = ref();
    const oddCompanyId = ref();
    const tab = ref(((_b = route == null ? void 0 : route.query) == null ? void 0 : _b.type) || "");
    reactive({
      modal_detail_win: null
    });
    reactive({
      modal_filter_comp: null
    });
    const settingsData = useCookie("settingsData");
    ref(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") || ((_c = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _c.timeZone));
    const fetchMatchsRecentDetail = async () => {
      var _a2;
      let resData = initDataMatch.value;
      matchLiveDetail.value.match = resData == null ? void 0 : resData[0];
      const i_match_id = (_a2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a2.i_match_id;
      if (i_match_id) {
        fetchOddsDetail(i_match_id, oddCompanySelected.value);
      }
    };
    const fetchOddsDetail = async (i_match_id, i_company_id = ODD_COMPANY_DEFAULT) => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL, {
        i_match_id,
        i_company_id
      }).then((resData) => {
        oddsDetail.value = resData;
      });
    };
    const fetchOdds = async (matchIdSlug2) => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL + "?match_id=" + matchIdSlug2).then(async (resData) => {
        var _a2;
        oddsList.value = getDataObjectByList(resData);
        const oddCompanysList = [];
        (_a2 = ODD_COMPANYS) == null ? void 0 : _a2.forEach((item) => {
          var _a3, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
          oddCompanysList[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList[item == null ? void 0 : item.isportsapi].handicap = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first = (_b2 = (_a3 = oddsList.value) == null ? void 0 : _a3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "handicap")) == null ? void 0 : _b2.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live = (_d = (_c2 = oddsList.value) == null ? void 0 : _c2.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "handicap")) == null ? void 0 : _d.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run = (_f = (_e = oddsList.value) == null ? void 0 : _e.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "handicap")) == null ? void 0 : _f.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].europeOdds = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first = (_h = (_g = oddsList.value) == null ? void 0 : _g.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "europeOdds")) == null ? void 0 : _h.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live = (_j = (_i = oddsList.value) == null ? void 0 : _i.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "europeOdds")) == null ? void 0 : _j.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run = (_l = (_k = oddsList.value) == null ? void 0 : _k.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "europeOdds")) == null ? void 0 : _l.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].overUnder = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first = (_n = (_m = oddsList.value) == null ? void 0 : _m.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "overUnder")) == null ? void 0 : _n.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live = (_p = (_o = oddsList.value) == null ? void 0 : _o.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "overUnder")) == null ? void 0 : _p.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run = (_r = (_q = oddsList.value) == null ? void 0 : _q.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "overUnder")) == null ? void 0 : _r.inplay;
          if (typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run === "undefined") {
            oddCompanysList[item == null ? void 0 : item.isportsapi].isEmpty = true;
          }
          if (isEmptyCompanySelected.value && !((_s = oCompanySelected.value) == null ? void 0 : _s.includes(item == null ? void 0 : item.id))) {
            oCompanySelected.value.push(item == null ? void 0 : item.id);
          }
        });
        oddCompanys.value = oddCompanysList;
      });
    };
    watch(
      () => route == null ? void 0 : route.query,
      () => {
        var _a2;
        tab.value = ((_a2 = route == null ? void 0 : route.query) == null ? void 0 : _a2.type) || "";
      },
      { immediate: true }
    );
    watch(
      () => route,
      (newPath) => {
        var _a2;
        const matches = (_a2 = newPath == null ? void 0 : newPath.path) == null ? void 0 : _a2.match(/[^/-]+$/);
        matchIdSlug.value = matches ? matches[0] : "";
      },
      { immediate: true }
    );
    watch(
      () => route.query,
      (newQuery) => {
        var _a2;
        isHaft.value = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? true : false;
      },
      { immediate: true }
    );
    watch(
      () => route.query,
      (newQuery) => {
        var _a2, _b2, _c2, _d;
        const europeOdds = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? "europeanHaft" : "europeOdds";
        const handicap = ((_b2 = route.query) == null ? void 0 : _b2.haft) == 1 ? "handicapHalf" : "handicap";
        const overUnder = ((_c2 = route.query) == null ? void 0 : _c2.haft) == 1 ? "overUnderHalf" : "overUnder";
        const oddCompanysList = [];
        (_d = ODD_COMPANYS) == null ? void 0 : _d.forEach((item) => {
          var _a3, _b3, _c3, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
          oddCompanysList[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList[item == null ? void 0 : item.isportsapi].handicap = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first = (_b3 = (_a3 = oddsList.value) == null ? void 0 : _a3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _b3.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live = (_d2 = (_c3 = oddsList.value) == null ? void 0 : _c3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _d2.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run = (_f = (_e = oddsList.value) == null ? void 0 : _e.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _f.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].europeOdds = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first = (_h = (_g = oddsList.value) == null ? void 0 : _g.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _h.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live = (_j = (_i = oddsList.value) == null ? void 0 : _i.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _j.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run = (_l = (_k = oddsList.value) == null ? void 0 : _k.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _l.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].overUnder = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first = (_n = (_m = oddsList.value) == null ? void 0 : _m.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _n.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live = (_p = (_o = oddsList.value) == null ? void 0 : _o.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _p.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run = (_r = (_q = oddsList.value) == null ? void 0 : _q.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _r.inplay;
          if (typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run === "undefined") {
            oddCompanysList[item == null ? void 0 : item.isportsapi].isEmpty = true;
          }
        });
        oddCompanys.value = oddCompanysList;
      },
      { immediate: true }
    );
    const wssMatch = (socketData) => {
      var _a2, _b2, _c2, _d, _e, _f, _g, _h;
      try {
        if (socketData) {
          try {
            const wssItem = socketData;
            eventSocketData.value = wssItem;
            emit("socketData", wssItem);
            if ((_a2 = wssItem.payload) == null ? void 0 : _a2.iodds) {
              const matchOdds = wssItem.payload.iodds;
              const handicap = ((_b2 = route.query) == null ? void 0 : _b2.haft) == 1 ? "handicapHalf" : "handicap";
              if (matchOdds == null ? void 0 : matchOdds[handicap]) {
                for (const matchOdd of matchOdds == null ? void 0 : matchOdds[handicap]) {
                  const matchId = parseIntO(getValueByPosition(matchOdd, 0));
                  const companyId = getValueByPosition(matchOdd, 1);
                  const oddsType = getValueByPosition(matchOdd, 9);
                  if (matchId == ((_d = (_c2 = matchLiveDetail.value) == null ? void 0 : _c2.match) == null ? void 0 : _d.i_match_id)) {
                    const oddCompany = (_e = oddCompanys.value) == null ? void 0 : _e.find((item) => (item == null ? void 0 : item.isportsapi) == companyId);
                    if (oddCompany) {
                      if (!(oddCompany == null ? void 0 : oddCompany.handicap)) {
                        oddCompany.handicap = [];
                        oddCompany.handicap.first = [];
                        oddCompany.handicap.live = [];
                        oddCompany.handicap.run = [];
                      }
                      if (oddsType == 1) {
                        oddCompany.handicap.first_older = ((_f = oddCompany == null ? void 0 : oddCompany.handicap) == null ? void 0 : _f.first) ? JSON.parse(JSON.stringify(oddCompany.handicap.first)) : [];
                        oddCompany.handicap.first = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                      } else if (oddsType == 2) {
                        oddCompany.handicap.live_older = ((_g = oddCompany == null ? void 0 : oddCompany.handicap) == null ? void 0 : _g.live) ? JSON.parse(JSON.stringify(oddCompany.handicap.live)) : [];
                        oddCompany.handicap.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                      } else if (oddsType == 3) {
                        oddCompany.handicap.run_older = ((_h = oddCompany == null ? void 0 : oddCompany.handicap) == null ? void 0 : _h.run) ? JSON.parse(JSON.stringify(oddCompany.handicap.run)) : [];
                        oddCompany.handicap.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                      }
                    }
                  }
                }
              }
            }
          } catch (e) {
            return false;
          }
        }
      } catch (e) {
        return false;
      }
    };
    watch(
      matchStore,
      () => {
        wssMatch(matchStore == null ? void 0 : matchStore.socketData);
      },
      { deep: true, immediate: true }
    );
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecentDetail()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => fetchOdds(matchIdSlug.value)), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d;
      const _component_TabTableMobile = __nuxt_component_0;
      const _component_PopupOddsChange = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "",
        class: "match-odds"
      }, _attrs))}><div id=""><div id="CompanyOddsDiv" class="company-comp">`);
      _push(ssrRenderComponent(_component_TabTableMobile, {
        style: unref(isMobile) ? null : { display: "none" },
        titleList: titleList.value,
        modelValue: tabActive.value,
        "onUpdate:modelValue": ($event) => tabActive.value = $event
      }, null, _parent));
      _push(`<div class="rankbox"><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}"><tbody><tr class="tr-title"><th colspan="2" rowspan="2"><b>${ssrInterpolate(unref($t)("Company"))}</b><img alt="plus"${ssrRenderAttr("src", _imports_0$1)}></th><th></th></tr><tr class="tb-bgcolor1"><th></th></tr><!--[-->`);
      ssrRenderList((_a2 = oddCompanys.value) == null ? void 0 : _a2.filter((item) => item !== null && !(item == null ? void 0 : item.isEmpty) && oCompanySelected.value.includes(item == null ? void 0 : item.id)), (item, index) => {
        _push(`<tr class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}"><td rowspan="1"><span>${ssrInterpolate(item == null ? void 0 : item.name)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata w-100"><table class="eTable adaptMt w-100" cellspacing="0" cellpadding="0" width="100%"><tbody><tr class="tr-title"><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>${ssrInterpolate(unref($t)("Init"))}</b></th><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>${ssrInterpolate(unref($t)("Live"))}</b></th><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>${ssrInterpolate(unref($t)("Run Odds"))}</b></th><th rowspan="2" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>${ssrInterpolate(unref($t)("Detail"))}</b></th></tr><tr class="tr-title"><th>${ssrInterpolate(unref($t)("Home"))}</th><th>${ssrInterpolate(unref($t)("HDP"))}</th><th>${ssrInterpolate(unref($t)("Away"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Home"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("HDP"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Away"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Home"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("HDP"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Away"))}</th><th style="${ssrRenderStyle(unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Detail"))}</th></tr><!--[-->`);
      ssrRenderList((_b2 = oddCompanys.value) == null ? void 0 : _b2.filter((item) => item !== null && !(item == null ? void 0 : item.isEmpty) && oCompanySelected.value.includes(item == null ? void 0 : item.id)), (item, index) => {
        var _a3, _b3, _c3, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D;
        _push(`<tr name="oddsTr" style="${ssrRenderStyle({ "text-align": "center" })}" cid="3" class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}"><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%"><span class="${ssrRenderClass([("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 1, 1), "span2"])}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_b3 = (_a3 = item == null ? void 0 : item.handicap) == null ? void 0 : _a3.first) == null ? void 0 : _b3[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%"><span class="${ssrRenderClass([("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 0, 1), "span2"])}">${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_d2 = (_c3 = item == null ? void 0 : item.handicap) == null ? void 0 : _c3.first) == null ? void 0 : _d2[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%" class="rb span2"><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 0, 2))}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_f = (_e = item == null ? void 0 : item.handicap) == null ? void 0 : _e.first) == null ? void 0 : _f[2]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%"><span class="${ssrRenderClass([("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_h = (_g = item == null ? void 0 : item.handicap) == null ? void 0 : _g.live) == null ? void 0 : _h[1], (_j = (_i = item == null ? void 0 : item.handicap) == null ? void 0 : _i.first) == null ? void 0 : _j[1]) + " " + ("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 1, 2), "span2"])}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_l = (_k = item == null ? void 0 : item.handicap) == null ? void 0 : _k.live) == null ? void 0 : _l[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%"><span class="${ssrRenderClass([("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_n = (_m = item == null ? void 0 : item.handicap) == null ? void 0 : _m.live) == null ? void 0 : _n[0], (_p = (_o = item == null ? void 0 : item.handicap) == null ? void 0 : _o.first) == null ? void 0 : _p[0]) + " " + ("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 0, 2), "span2"])}">${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_r = (_q = item == null ? void 0 : item.handicap) == null ? void 0 : _q.live) == null ? void 0 : _r[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%" class="rb span2"><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_t = (_s = item == null ? void 0 : item.handicap) == null ? void 0 : _s.live) == null ? void 0 : _t[2], (_v = (_u = item == null ? void 0 : item.handicap) == null ? void 0 : _u.first) == null ? void 0 : _v[2]) + " " + ("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 2, 2))}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_x = (_w = item == null ? void 0 : item.handicap) == null ? void 0 : _w.live) == null ? void 0 : _x[2]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="6%"><span class="${ssrRenderClass([("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 1, 3), "span2"])}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_z = (_y = item == null ? void 0 : item.handicap) == null ? void 0 : _y.run) == null ? void 0 : _z[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="6%"><span class="${ssrRenderClass([("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 0, 3), "span2"])}">${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_B = (_A = item == null ? void 0 : item.handicap) == null ? void 0 : _A.run) == null ? void 0 : _B[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="6%" class="rb span2"><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 2, 3))}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_D = (_C = item == null ? void 0 : item.handicap) == null ? void 0 : _C.run) == null ? void 0 : _D[2]))}</span></td><td width="10%" style="${ssrRenderStyle({ "min-width": "60px" })}"><span class="odd_a">${ssrInterpolate(unref($t)("History"))}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div><div id="content-page" class="mt-5">`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title">${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div><div class="modal fade" id="modal_detail_win" tabindex="-1" aria-labelledby="modal_detail_win_label" aria-hidden="true"><div class="modal-dialog modal-dialog-centered container"><div class="modal-content"><div class="modal-header"><div class="modal-title" id="modal_detail_win_label">${ssrInterpolate(oddCompanyName.value)} ${ssrInterpolate(unref($t)("Odd history"))}</div><button type="button" class="btn-close" aria-label="Close"></button></div><div class="modal-body"><div id="" class="layui-layer-content detail_win"><div class="popinfo">`);
      _push(ssrRenderComponent(_component_PopupOddsChange, {
        "odd-comp-id": oddCompanyId.value,
        "match-id": matchIdSlug.value,
        section: "ahDetail",
        "odd-companys-list": oddCompanys.value,
        "refresh-time": refreshTime.value
      }, null, _parent));
      _push(`</div></div></div></div></div></div><div class="modal fade" id="modal_filter_comp" tabindex="-1" aria-labelledby="modal_filter_comp_label" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><div class="modal-title" id="modal_filter_comp_label">${ssrInterpolate(unref($t)("Select Company"))}</div><button type="button" class="btn-close" aria-label="Close"></button></div><div class="modal-body"><div class="layui-layer-content oddscomp-filterwin"><ul id="oddscompFilterWin" class="popinfo"><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (oddCompany, index) => {
        _push(`<li${ssrRenderAttr("value", oddCompany == null ? void 0 : oddCompany.id)} class="${ssrRenderClass([oCompanySelected.value.includes(oddCompany == null ? void 0 : oddCompany.id) ? "on" : "", "complist"])}"><i class="check-circled"></i> ${ssrInterpolate(oddCompany == null ? void 0 : oddCompany.name)}</li>`);
      });
      _push(`<!--]--></ul><div id="winTips" class="tips" style="${ssrRenderStyle(((_c2 = oCompanySelected.value) == null ? void 0 : _c2.length) === 0 ? null : { display: "none" })}">*${ssrInterpolate(unref($t)("Select at least 1 company"))}</div></div></div><div class="modal-footer" style="${ssrRenderStyle({ "display": "none" })}"><button type="button" class="btn btn-primary"${ssrIncludeBooleanAttr(((_d = oCompanySelected.value) == null ? void 0 : _d.length) === 0 ? true : false) ? " disabled" : ""}>${ssrInterpolate(unref($t)("OK"))}</button></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/odds/asian-handicap-odds/[match_id].vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
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
    const { useLocale, $t } = useShareCommon();
    const { width } = useWindowSize();
    const emit = __emit;
    const storeSystems = systemsStore();
    socketStore();
    const matchStore = useMatchStore();
    const eventSocketData = ref();
    const route = useRoute();
    const isHaft = ref(false);
    const matchLiveDetail = ref([]);
    const oddsDetail = ref();
    const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
    const matchIdSlug = ref("");
    const activeSection = ref("ahDetail");
    const oCompanySelected = ref(useCookie("oCompanyOddSelected").value ? useCookie("oCompanyOddSelected").value : []);
    const oCompList = ref([]);
    const oddsList = ref([]);
    const oddCompanys = ref([]);
    const oddsCorner = ref([]);
    ODD_COMPANYS.forEach((item) => {
      oCompList.value[item == null ? void 0 : item.id] = oCompanySelected.value.includes(item == null ? void 0 : item.id) ? true : false;
    });
    const oddCompanyName = ref();
    ref([]);
    const oddCompanyId = ref();
    const tab = ref(((_a = route == null ? void 0 : route.query) == null ? void 0 : _a.type) || "");
    const tabActive = ref(1);
    ref(false);
    const refreshTime = ref(Date.now());
    const titleList = ref([
      {
        id: 1,
        name: $t("Init")
      },
      {
        id: 2,
        name: $t("Live")
      },
      {
        id: 3,
        name: $t("Run Odds")
      }
    ]);
    const matchTitle = useModel(__props, "matchTitle");
    const matchContent = useModel(__props, "matchContent");
    const initDataMatch = useModel(__props, "initDataMatch");
    const isMobile = computed(() => {
      return width.value <= 768;
    });
    const showColumn = computed(() => {
      return {
        first: !isMobile.value ? true : tabActive.value === 1 ? true : false,
        second: !isMobile.value ? true : tabActive.value === 2 ? true : false,
        third: !isMobile.value ? true : tabActive.value === 3 ? true : false
      };
    });
    reactive({
      modal_detail_win: null
    });
    reactive({
      modal_filter_comp: null
    });
    const settingsData = useCookie("settingsData");
    ref(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") || ((_b = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _b.timeZone));
    const fetchMatchsRecentDetail = async () => {
      var _a2;
      let resData = initDataMatch.value;
      matchLiveDetail.value.match = resData == null ? void 0 : resData[0];
      const i_match_id = (_a2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a2.i_match_id;
      if (i_match_id) {
        fetchOddsDetail(i_match_id, oddCompanySelected.value);
      }
    };
    const fetchOddsDetail = async (i_match_id, i_company_id = ODD_COMPANY_DEFAULT) => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL, {
        i_match_id,
        i_company_id
      }).then((resData) => {
        oddsDetail.value = resData;
      });
    };
    const fetchOddsCorner = async () => {
      await useApiLiveScore(
        (isHaft.value === false ? API_ROUTERS.LIVESCORE.ODDS_CONNER_FULL : API_ROUTERS.LIVESCORE.ODDS_CONNER_HAFT) + "?match_id=" + matchIdSlug.value
      ).then((resData) => {
        var _a2;
        const oddCompanysList = [];
        (_a2 = ODD_COMPANYS) == null ? void 0 : _a2.forEach((item) => {
          var _a3, _b2, _c, _d, _e, _f;
          oddCompanysList[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList[item == null ? void 0 : item.isportsapi].first = (_b2 = (_a3 = resData == null ? void 0 : resData.data) == null ? void 0 : _a3.early) == null ? void 0 : _b2.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi));
          oddCompanysList[item == null ? void 0 : item.isportsapi].live = (_d = (_c = resData == null ? void 0 : resData.data) == null ? void 0 : _c.live) == null ? void 0 : _d.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi));
          oddCompanysList[item == null ? void 0 : item.isportsapi].run = (_f = (_e = resData == null ? void 0 : resData.data) == null ? void 0 : _e.run) == null ? void 0 : _f.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi));
          if (typeof oddCompanysList[item == null ? void 0 : item.isportsapi].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi].run === "undefined") {
            oddCompanysList[item == null ? void 0 : item.isportsapi].isEmpty = true;
          }
        });
        oddsCorner.value = oddCompanysList;
      });
    };
    watch(
      () => route == null ? void 0 : route.query,
      () => {
        var _a2;
        tab.value = ((_a2 = route == null ? void 0 : route.query) == null ? void 0 : _a2.type) || "";
      },
      { immediate: true }
    );
    watch(
      () => route,
      (newPath) => {
        var _a2;
        const matches = (_a2 = newPath == null ? void 0 : newPath.path) == null ? void 0 : _a2.match(/[^/-]+$/);
        matchIdSlug.value = matches ? matches[0] : "";
      },
      { immediate: true }
    );
    watch(
      () => route.query,
      async () => {
        var _a2;
        isHaft.value = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? true : false;
        await fetchOddsCorner(matchIdSlug.value);
      },
      { immediate: true }
    );
    watch(
      () => route.query,
      () => {
        var _a2, _b2, _c, _d;
        const europeOdds = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? "europeanHaft" : "europeOdds";
        const handicap = ((_b2 = route.query) == null ? void 0 : _b2.haft) == 1 ? "handicapHalf" : "handicap";
        const overUnder = ((_c = route.query) == null ? void 0 : _c.haft) == 1 ? "overUnderHalf" : "overUnder";
        const oddCompanysList = [];
        (_d = ODD_COMPANYS) == null ? void 0 : _d.forEach((item) => {
          var _a3, _b3, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
          oddCompanysList[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList[item == null ? void 0 : item.isportsapi].handicap = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first = (_b3 = (_a3 = oddsList.value) == null ? void 0 : _a3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _b3.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live = (_d2 = (_c2 = oddsList.value) == null ? void 0 : _c2.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _d2.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run = (_f = (_e = oddsList.value) == null ? void 0 : _e.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _f.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].europeOdds = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first = (_h = (_g = oddsList.value) == null ? void 0 : _g.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _h.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live = (_j = (_i = oddsList.value) == null ? void 0 : _i.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _j.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run = (_l = (_k = oddsList.value) == null ? void 0 : _k.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _l.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].overUnder = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first = (_n = (_m = oddsList.value) == null ? void 0 : _m.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _n.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live = (_p = (_o = oddsList.value) == null ? void 0 : _o.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _p.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run = (_r = (_q = oddsList.value) == null ? void 0 : _q.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _r.inplay;
          if (typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run === "undefined") {
            oddCompanysList[item == null ? void 0 : item.isportsapi].isEmpty = true;
          }
        });
        oddCompanys.value = oddCompanysList;
      },
      { immediate: true }
    );
    const wssMatch = (socketData) => {
      var _a2, _b2, _c, _d, _e, _f;
      try {
        if (socketData) {
          const wssItem = socketData;
          try {
            eventSocketData.value = wssItem;
            emit("socketData", wssItem);
            if ((wssItem == null ? void 0 : wssItem.topic) && wssItem.topic == "livescore/football/iodds_corner/v1") {
              const matchOdds = wssItem.payload.inplay;
              if (matchOdds) {
                for (const matchOdd of matchOdds) {
                  const companyId = matchOdd == null ? void 0 : matchOdd.companyId;
                  if ((matchOdd == null ? void 0 : matchOdd.matchId) == ((_b2 = (_a2 = matchLiveDetail.value) == null ? void 0 : _a2.match) == null ? void 0 : _b2.i_match_id)) {
                    const oddCompany = (_c = oddsCorner.value) == null ? void 0 : _c.find((item) => (item == null ? void 0 : item.isportsapi) == companyId);
                    if (oddCompany) {
                      if (!(oddCompany == null ? void 0 : oddCompany.run)) {
                        oddCompany.run = [];
                      }
                      oddCompany.run_older = (oddCompany == null ? void 0 : oddCompany.run) ? JSON.parse(JSON.stringify(oddCompany == null ? void 0 : oddCompany.run)) : [];
                      oddCompany.run = {
                        i_company_id: companyId,
                        over: (_d = matchOdd == null ? void 0 : matchOdd.odds) == null ? void 0 : _d.over,
                        total_corners: (_e = matchOdd == null ? void 0 : matchOdd.odds) == null ? void 0 : _e.totalCorners,
                        under: (_f = matchOdd == null ? void 0 : matchOdd.odds) == null ? void 0 : _f.under
                      };
                    }
                  }
                }
              }
            }
          } catch (e) {
            return false;
          }
        }
      } catch (e) {
        return false;
      }
    };
    watch(
      matchStore,
      () => {
        wssMatch(matchStore == null ? void 0 : matchStore.socketData);
      },
      { deep: true, immediate: true }
    );
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecentDetail()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => fetchOddsCorner()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d;
      const _component_TabTableMobile = __nuxt_component_0;
      const _component_PopupOddsChange = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "",
        class: "match-odds"
      }, _attrs))}><div id=""><div id="CompanyOddsDiv" class="company-comp">`);
      _push(ssrRenderComponent(_component_TabTableMobile, {
        style: unref(isMobile) ? null : { display: "none" },
        titleList: titleList.value,
        modelValue: tabActive.value,
        "onUpdate:modelValue": ($event) => tabActive.value = $event
      }, null, _parent));
      _push(`<div class="rankbox"><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}"><tbody><tr class="tr-title"><th colspan="2" rowspan="2"><b>${ssrInterpolate(unref($t)("Company"))}</b></th><th></th></tr><tr class="tr-title"><th></th></tr><!--[-->`);
      ssrRenderList((_a2 = oddsCorner.value) == null ? void 0 : _a2.filter((item) => item !== null && !(item == null ? void 0 : item.isEmpty)), (item, index) => {
        _push(`<tr class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}"><td rowspan="1"><span>${ssrInterpolate(item == null ? void 0 : item.name)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata w-100"><table class="eTable adaptMt w-100" cellspacing="0" cellpadding="0" width="100%"><tbody><tr class="tr-title"><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>${ssrInterpolate(unref($t)("Init"))}</b></th><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>${ssrInterpolate(unref($t)("Live"))}</b></th><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>${ssrInterpolate(unref($t)("Run Odds"))}</b></th><th rowspan="2" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>${ssrInterpolate(unref($t)("Detail"))}</b></th></tr><tr class="tr-title"><th>${ssrInterpolate(unref($t)("Over"))}</th><th>${ssrInterpolate(unref($t)("Corner"))}</th><th>${ssrInterpolate(unref($t)("Under"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Over"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Corner"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Under"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Over"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Corner"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Under"))}</th><th style="${ssrRenderStyle(unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Detail"))}</th></tr><!--[-->`);
      ssrRenderList((_b2 = oddsCorner.value) == null ? void 0 : _b2.filter((item) => item !== null && !(item == null ? void 0 : item.isEmpty)), (item, index) => {
        var _a3, _b3, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
        _push(`<tr name="oddsTr" style="${ssrRenderStyle({ "text-align": "center" })}" cid="3" class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}"><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%"><span class="span2">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_a3 = item == null ? void 0 : item.first) == null ? void 0 : _a3["over"]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%"><span class="span2">${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_b3 = item == null ? void 0 : item.first) == null ? void 0 : _b3["total_corners"]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%"><span class="span2">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_c2 = item == null ? void 0 : item.first) == null ? void 0 : _c2["under"]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%" class="bd-l"><span class="${ssrRenderClass([("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_d2 = item == null ? void 0 : item.live) == null ? void 0 : _d2["over"], (_e = item == null ? void 0 : item.first) == null ? void 0 : _e[1]), "span2"])}">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_f = item == null ? void 0 : item.live) == null ? void 0 : _f["over"]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%"><span class="${ssrRenderClass([("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_g = item == null ? void 0 : item.live) == null ? void 0 : _g["total_corners"], (_h = item == null ? void 0 : item.first) == null ? void 0 : _h["total_corners"]), "span2"])}">${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_i = item == null ? void 0 : item.live) == null ? void 0 : _i["total_corners"]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%"><span class="${ssrRenderClass([("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_j = item == null ? void 0 : item.live) == null ? void 0 : _j["under"], (_k = item == null ? void 0 : item.first) == null ? void 0 : _k["under"]), "span2"])}">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_l = item == null ? void 0 : item.live) == null ? void 0 : _l["under"]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="6%" class="bd-l"><span class="${ssrRenderClass([("getClassOddCornerChange" in _ctx ? _ctx.getClassOddCornerChange : unref(getClassOddCornerChange))(item, "over"), "span2"])}">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_m = item == null ? void 0 : item.run) == null ? void 0 : _m["over"]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="6%"><span class="${ssrRenderClass([("getClassOddCornerChange" in _ctx ? _ctx.getClassOddCornerChange : unref(getClassOddCornerChange))(item, "total_corners"), "span2"])}">${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_n = item == null ? void 0 : item.run) == null ? void 0 : _n["total_corners"]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="6%"><span class="${ssrRenderClass([("getClassOddCornerChange" in _ctx ? _ctx.getClassOddCornerChange : unref(getClassOddCornerChange))(item, "under"), "span2"])}">${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_o = item == null ? void 0 : item.run) == null ? void 0 : _o["under"]))}</span></td><td width="10%" style="${ssrRenderStyle({ "min-width": "60px" })}" class="bd-l"><span class="odd_a">${ssrInterpolate(unref($t)("History"))}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div><div id="content-page" class="mt-5">`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title">${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div><div class="modal fade" id="modal_detail_win" tabindex="-1" aria-labelledby="modal_detail_win_label" aria-hidden="true"><div class="modal-dialog modal-dialog-centered container"><div class="modal-content"><div class="modal-header"><div class="modal-title" id="modal_detail_win_label">${ssrInterpolate(oddCompanyName.value)} ${ssrInterpolate(unref($t)("Odd history"))}</div><button type="button" class="btn-close" aria-label="Close"></button></div><div class="modal-body"><div id="" class="layui-layer-content detail_win"><div class="popinfo">`);
      _push(ssrRenderComponent(_component_PopupOddsChange, {
        "odd-comp-id": oddCompanyId.value,
        "match-id": matchIdSlug.value,
        section: activeSection.value,
        "odd-companys-list": oddCompanys.value,
        "refresh-time": refreshTime.value
      }, null, _parent));
      _push(`</div></div></div></div></div></div><div class="modal fade" id="modal_filter_comp" tabindex="-1" aria-labelledby="modal_filter_comp_label" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><div class="modal-title" id="modal_filter_comp_label">${ssrInterpolate(unref($t)("Select Company"))}</div><button type="button" class="btn-close" aria-label="Close"></button></div><div class="modal-body"><div class="layui-layer-content oddscomp-filterwin"><ul id="oddscompFilterWin" class="popinfo"><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (oddCompany, index) => {
        _push(`<li${ssrRenderAttr("value", oddCompany == null ? void 0 : oddCompany.id)} class="${ssrRenderClass([oCompanySelected.value.includes(oddCompany == null ? void 0 : oddCompany.id) ? "on" : "", "complist"])}"><i class="check-circled"></i> ${ssrInterpolate(oddCompany == null ? void 0 : oddCompany.name)}</li>`);
      });
      _push(`<!--]--></ul><div id="winTips" class="tips" style="${ssrRenderStyle(((_c = oCompanySelected.value) == null ? void 0 : _c.length) === 0 ? null : { display: "none" })}">*${ssrInterpolate(unref($t)("Select at least 1 company"))}</div></div></div><div class="modal-footer" style="${ssrRenderStyle({ "display": "none" })}"><button type="button" class="btn btn-primary"${ssrIncludeBooleanAttr(((_d = oCompanySelected.value) == null ? void 0 : _d.length) === 0 ? true : false) ? " disabled" : ""}>${ssrInterpolate(unref($t)("OK"))}</button></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/odds/corner-ou-odds/[match_id].vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
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
    const { useLocale, $t } = useShareCommon();
    const storeSystems = systemsStore();
    socketStore();
    useMatchStore();
    ref();
    const route = useRoute();
    const isHaft = ref(false);
    const matchLiveDetail = ref([]);
    const oddsDetail = ref();
    const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
    const matchIdSlug = ref("");
    ref("ahDetail");
    const oCompanySelected = ref(useCookie("oCompanyOddSelected").value ? useCookie("oCompanyOddSelected").value : []);
    const oCompList = ref([]);
    const oddsList = ref([]);
    const oddCompanys = ref([]);
    const oddCompanysList = ref([]);
    ODD_COMPANYS.forEach((item) => {
      oddCompanysList.value[item == null ? void 0 : item.id] = item;
      oCompList.value[item == null ? void 0 : item.id] = oCompanySelected.value.includes(item == null ? void 0 : item.id) ? true : false;
    });
    const oddCompanyName = ref();
    ref([]);
    const oddsCorrectScore = ref([]);
    const oddCompanyId = ref();
    const tab = ref(((_a = route == null ? void 0 : route.query) == null ? void 0 : _a.type) || "");
    ref(false);
    const refreshTime = ref(Date.now());
    const matchTitle = useModel(__props, "matchTitle");
    const matchContent = useModel(__props, "matchContent");
    const initDataMatch = useModel(__props, "initDataMatch");
    reactive({
      modal_detail_win: null
    });
    reactive({
      modal_filter_comp: null
    });
    const settingsData = useCookie("settingsData");
    ref(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") || ((_b = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _b.timeZone));
    const fetchMatchsRecentDetail = async () => {
      var _a2;
      let resData = initDataMatch.value;
      matchLiveDetail.value.match = resData == null ? void 0 : resData[0];
      const i_match_id = (_a2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a2.i_match_id;
      if (i_match_id) {
        fetchOddsDetail(i_match_id, oddCompanySelected.value);
      }
    };
    const fetchOddsDetail = async (i_match_id, i_company_id = ODD_COMPANY_DEFAULT) => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL, {
        i_match_id,
        i_company_id
      }).then((resData) => {
        oddsDetail.value = resData;
      });
    };
    const fetchOdds = async () => {
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.ODDS_CORRECT_SCORE + "?match_id=" + matchIdSlug.value
      ).then((resData) => {
        oddsCorrectScore.value = resData == null ? void 0 : resData.data;
      });
    };
    watch(
      () => route == null ? void 0 : route.query,
      () => {
        var _a2;
        tab.value = ((_a2 = route == null ? void 0 : route.query) == null ? void 0 : _a2.type) || "";
      },
      { immediate: true }
    );
    watch(
      () => route,
      (newPath) => {
        var _a2;
        const matches = (_a2 = newPath == null ? void 0 : newPath.path) == null ? void 0 : _a2.match(/[^/-]+$/);
        matchIdSlug.value = matches ? matches[0] : "";
      },
      { immediate: true }
    );
    watch(
      () => route.query,
      (newQuery) => {
        var _a2;
        isHaft.value = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? true : false;
      },
      { immediate: true }
    );
    watch(
      () => route.query,
      (newQuery) => {
        var _a2, _b2, _c, _d;
        const europeOdds = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? "europeanHaft" : "europeOdds";
        const handicap = ((_b2 = route.query) == null ? void 0 : _b2.haft) == 1 ? "handicapHalf" : "handicap";
        const overUnder = ((_c = route.query) == null ? void 0 : _c.haft) == 1 ? "overUnderHalf" : "overUnder";
        const oddCompanysList2 = [];
        (_d = ODD_COMPANYS) == null ? void 0 : _d.forEach((item) => {
          var _a3, _b3, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
          oddCompanysList2[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList2[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].handicap = [];
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].first = (_b3 = (_a3 = oddsList.value) == null ? void 0 : _a3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _b3.initial;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].live = (_d2 = (_c2 = oddsList.value) == null ? void 0 : _c2.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _d2.instant;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].run = (_f = (_e = oddsList.value) == null ? void 0 : _e.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _f.inplay;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].europeOdds = [];
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].first = (_h = (_g = oddsList.value) == null ? void 0 : _g.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _h.initial;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].live = (_j = (_i = oddsList.value) == null ? void 0 : _i.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _j.instant;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].run = (_l = (_k = oddsList.value) == null ? void 0 : _k.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _l.inplay;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].overUnder = [];
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].first = (_n = (_m = oddsList.value) == null ? void 0 : _m.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _n.initial;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].live = (_p = (_o = oddsList.value) == null ? void 0 : _o.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _p.instant;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].run = (_r = (_q = oddsList.value) == null ? void 0 : _q.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _r.inplay;
          if (typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].first === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].live === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].run === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].first === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].live === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].run === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].first === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].live === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].run === "undefined") {
            oddCompanysList2[item == null ? void 0 : item.isportsapi].isEmpty = true;
          }
        });
        oddCompanys.value = oddCompanysList2;
      },
      { immediate: true }
    );
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecentDetail()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => fetchOdds()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      const _component_PopupOddsChange = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "",
        class: "match-odds"
      }, _attrs))} data-v-907db30d><div id="" data-v-907db30d><div id="CompanyOddsDiv" class="company-comp" data-v-907db30d><div class="rankbox" data-v-907db30d><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-907db30d><tbody data-v-907db30d><tr class="tr-title" data-v-907db30d><th colspan="2" rowspan="1" data-v-907db30d><b data-v-907db30d>${ssrInterpolate(unref($t)("Company"))}</b></th><th data-v-907db30d></th></tr><!--[-->`);
      ssrRenderList(oddsCorrectScore.value, (item, index) => {
        var _a3, _b3;
        _push(`<tr name="oddsTr" style="${ssrRenderStyle({ "text-align": "center" })}" cid="31" class="${ssrRenderClass(index % 2 === 0 ? "tb-bgcolor1" : "tb-bgcolor1")}" data-v-907db30d><td width="60%" height="30" class="rb" data-v-907db30d>${ssrInterpolate((_b3 = (_a3 = "ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS)) == null ? void 0 : _a3.find((comp) => (comp == null ? void 0 : comp.isportsapi) === (item == null ? void 0 : item.i_company_id))) == null ? void 0 : _b3.name)}</td><td data-v-907db30d><span data-v-907db30d>${ssrInterpolate(unref($t)("Home"))}</span><span data-v-907db30d>${ssrInterpolate(unref($t)("Away"))}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata" width="75%" data-v-907db30d><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" data-v-907db30d><tbody data-v-907db30d><tr class="tr-title" data-v-907db30d><th width="5%" data-v-907db30d><b data-v-907db30d>1:0</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>2:0</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>2:1</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>3:0</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>3:1</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>3:2</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>4:0</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>4:1</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>4:2</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>4:3</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>0:0</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>1:1</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>2:2</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>3:3</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>4:4</b></th><th width="5%" data-v-907db30d><b data-v-907db30d>${ssrInterpolate(unref($t)("Other"))}</b></th><th width="6%" data-v-907db30d><b data-v-907db30d>${ssrInterpolate(unref($t)("Detail"))}</b></th></tr><!--[-->`);
      ssrRenderList(oddsCorrectScore.value, (item, index) => {
        var _a3;
        _push(`<tr name="oddsTr" style="${ssrRenderStyle({ "text-align": "center" })}" cid="31" class="${ssrRenderClass(index % 2 === 0 ? "tb-bgcolor1" : "tb-bgcolor1")}" data-v-907db30d><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 1, 0))}</span><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 0, 1))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 2, 0))}</span><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 0, 2))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 2, 1))}</span><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 1, 2))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 3, 0))}</span><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 0, 3))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 3, 1))}</span><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 1, 3))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 3, 2))}</span><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 2, 3))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 4, 0))}</span><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 0, 4))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 4, 1))}</span><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 1, 4))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 4, 2))}</span><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 2, 4))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 4, 3))}</span><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 3, 4))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 0, 0))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 1, 1))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 2, 2))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 3, 3))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 4, 4))}</span></td><td width="3%" data-v-907db30d><span data-v-907db30d>${ssrInterpolate((_a3 = item == null ? void 0 : item.odds) == null ? void 0 : _a3.otherScoresOdds)}</span></td><td width="3%" data-v-907db30d><span class="odd_a" data-v-907db30d>${ssrInterpolate(unref($t)("History"))}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div><div id="content-page" class="mt-5" data-v-907db30d>`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title" data-v-907db30d>${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div><div class="modal fade" id="modal_detail_win" tabindex="-1" aria-labelledby="modal_detail_win_label" aria-hidden="true" data-v-907db30d><div class="modal-dialog modal-dialog-centered container" data-v-907db30d><div class="modal-content" data-v-907db30d><div class="modal-header" data-v-907db30d><div class="modal-title" id="modal_detail_win_label" data-v-907db30d>${ssrInterpolate(oddCompanyName.value)} ${ssrInterpolate(unref($t)("Odd history"))}</div><button type="button" class="btn-close" aria-label="Close" data-v-907db30d></button></div><div class="modal-body" data-v-907db30d><div id="" class="layui-layer-content detail_win" data-v-907db30d><div class="popinfo" data-v-907db30d>`);
      _push(ssrRenderComponent(_component_PopupOddsChange, {
        "odd-comp-id": oddCompanyId.value,
        "match-id": matchIdSlug.value,
        section: "correctScore",
        "odd-companys-list": oddCompanys.value,
        "refresh-time": refreshTime.value
      }, null, _parent));
      _push(`</div></div></div></div></div></div><div class="modal fade" id="modal_filter_comp" tabindex="-1" aria-labelledby="modal_filter_comp_label" aria-hidden="true" data-v-907db30d><div class="modal-dialog modal-dialog-centered" data-v-907db30d><div class="modal-content" data-v-907db30d><div class="modal-header" data-v-907db30d><div class="modal-title" id="modal_filter_comp_label" data-v-907db30d>${ssrInterpolate(unref($t)("Select Company"))}</div><button type="button" class="btn-close" aria-label="Close" data-v-907db30d></button></div><div class="modal-body" data-v-907db30d><div class="layui-layer-content oddscomp-filterwin" data-v-907db30d><ul id="oddscompFilterWin" class="popinfo" data-v-907db30d><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (oddCompany, index) => {
        _push(`<li${ssrRenderAttr("value", oddCompany == null ? void 0 : oddCompany.id)} class="${ssrRenderClass([oCompanySelected.value.includes(oddCompany == null ? void 0 : oddCompany.id) ? "on" : "", "complist"])}" data-v-907db30d><i class="check-circled" data-v-907db30d></i> ${ssrInterpolate(oddCompany == null ? void 0 : oddCompany.name)}</li>`);
      });
      _push(`<!--]--></ul><div id="winTips" class="tips" style="${ssrRenderStyle(((_a2 = oCompanySelected.value) == null ? void 0 : _a2.length) === 0 ? null : { display: "none" })}" data-v-907db30d>*${ssrInterpolate(unref($t)("Select at least 1 company"))}</div></div></div><div class="modal-footer" style="${ssrRenderStyle({ "display": "none" })}" data-v-907db30d><button type="button" class="btn btn-primary"${ssrIncludeBooleanAttr(((_b2 = oCompanySelected.value) == null ? void 0 : _b2.length) === 0 ? true : false) ? " disabled" : ""} data-v-907db30d>${ssrInterpolate(unref($t)("OK"))}</button></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/odds/correct-score-odds/[match_id].vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const CorrectScoreOdds = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-907db30d"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
    const { useLocale, $t } = useShareCommon();
    const { width } = useWindowSize();
    const emit = __emit;
    const storeSystems = systemsStore();
    socketStore();
    const matchStore = useMatchStore();
    const eventSocketData = ref();
    const route = useRoute();
    const isHaft = ref(false);
    const matchLiveDetail = ref([]);
    const oddsDetail = ref();
    const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
    const matchIdSlug = ref("");
    ref("ahDetail");
    const oCompanySelected = ref(useCookie("oCompanyOddSelected").value ? useCookie("oCompanyOddSelected").value : []);
    const oCompList = ref([]);
    const oddsList = ref([]);
    const oddCompanys = ref([]);
    const oddCompanysList = ref([]);
    ODD_COMPANYS.forEach((item) => {
      oddCompanysList.value[item == null ? void 0 : item.id] = item;
      oCompList.value[item == null ? void 0 : item.id] = oCompanySelected.value.includes(item == null ? void 0 : item.id) ? true : false;
    });
    const tabActive = ref(1);
    ref(false);
    const refreshTime = ref(Date.now());
    const titleList = ref([
      {
        id: 1,
        name: $t("Init")
      },
      {
        id: 2,
        name: $t("Live")
      }
    ]);
    const isMobile = computed(() => {
      return width.value <= 768;
    });
    const showColumn = computed(() => {
      return {
        first: !isMobile.value ? true : tabActive.value === 1 ? true : false,
        second: !isMobile.value ? true : tabActive.value === 2 ? true : false
      };
    });
    const oddCompanyName = ref();
    ref([]);
    ref([]);
    const oddCompanyId = ref();
    const oddsDoubleChange = ref([]);
    const tab = ref(((_a = route == null ? void 0 : route.query) == null ? void 0 : _a.type) || "");
    const matchTitle = useModel(__props, "matchTitle");
    const matchContent = useModel(__props, "matchContent");
    const initDataMatch = useModel(__props, "initDataMatch");
    reactive({
      modal_detail_win: null
    });
    reactive({
      modal_filter_comp: null
    });
    const settingsData = useCookie("settingsData");
    ref(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") || ((_b = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _b.timeZone));
    const fetchMatchsRecentDetail = async () => {
      var _a2;
      let resData = initDataMatch.value;
      matchLiveDetail.value.match = resData == null ? void 0 : resData[0];
      const i_match_id = (_a2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a2.i_match_id;
      if (i_match_id) {
        fetchOddsDetail(i_match_id, oddCompanySelected.value);
      }
    };
    const fetchOddsDetail = async (i_match_id, i_company_id = ODD_COMPANY_DEFAULT) => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL, {
        i_match_id,
        i_company_id
      }).then((resData) => {
        oddsDetail.value = resData;
      });
    };
    const fetchOdds = async () => {
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.ODDS_DOUBLE_CHANCE + "?match_id=" + matchIdSlug.value
      ).then((resData) => {
        oddsDoubleChange.value = resData == null ? void 0 : resData.data;
      });
    };
    watch(
      () => route == null ? void 0 : route.query,
      () => {
        var _a2;
        tab.value = ((_a2 = route == null ? void 0 : route.query) == null ? void 0 : _a2.type) || "";
      },
      { immediate: true }
    );
    watch(
      () => route,
      (newPath) => {
        var _a2;
        const matches = (_a2 = newPath == null ? void 0 : newPath.path) == null ? void 0 : _a2.match(/[^/-]+$/);
        matchIdSlug.value = matches ? matches[0] : "";
      },
      { immediate: true }
    );
    watch(
      () => route.query,
      (newQuery) => {
        var _a2;
        isHaft.value = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? true : false;
      },
      { immediate: true }
    );
    watch(
      () => route.query,
      (newQuery) => {
        var _a2, _b2, _c, _d;
        const europeOdds = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? "europeanHaft" : "europeOdds";
        const handicap = ((_b2 = route.query) == null ? void 0 : _b2.haft) == 1 ? "handicapHalf" : "handicap";
        const overUnder = ((_c = route.query) == null ? void 0 : _c.haft) == 1 ? "overUnderHalf" : "overUnder";
        const oddCompanysList2 = [];
        (_d = ODD_COMPANYS) == null ? void 0 : _d.forEach((item) => {
          var _a3, _b3, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
          oddCompanysList2[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList2[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].handicap = [];
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].first = (_b3 = (_a3 = oddsList.value) == null ? void 0 : _a3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _b3.initial;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].live = (_d2 = (_c2 = oddsList.value) == null ? void 0 : _c2.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _d2.instant;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].run = (_f = (_e = oddsList.value) == null ? void 0 : _e.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _f.inplay;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].europeOdds = [];
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].first = (_h = (_g = oddsList.value) == null ? void 0 : _g.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _h.initial;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].live = (_j = (_i = oddsList.value) == null ? void 0 : _i.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _j.instant;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].run = (_l = (_k = oddsList.value) == null ? void 0 : _k.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _l.inplay;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].overUnder = [];
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].first = (_n = (_m = oddsList.value) == null ? void 0 : _m.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _n.initial;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].live = (_p = (_o = oddsList.value) == null ? void 0 : _o.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _p.instant;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].run = (_r = (_q = oddsList.value) == null ? void 0 : _q.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _r.inplay;
          if (typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].first === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].live === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].run === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].first === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].live === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].run === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].first === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].live === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].run === "undefined") {
            oddCompanysList2[item == null ? void 0 : item.isportsapi].isEmpty = true;
          }
        });
        oddCompanys.value = oddCompanysList2;
      },
      { immediate: true }
    );
    const wssMatch = (socketData) => {
      try {
        if (socketData) {
          eventSocketData.value = socketData;
          emit("socketData", socketData);
        }
      } catch (e) {
        return false;
      }
    };
    watch(
      matchStore,
      () => {
        wssMatch(matchStore == null ? void 0 : matchStore.socketData);
      },
      { deep: true, immediate: true }
    );
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecentDetail()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => fetchOdds()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      const _component_TabTableMobile = __nuxt_component_0;
      const _component_PopupOddsChange = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "",
        class: "match-odds"
      }, _attrs))} data-v-e7d7dbd8><div id="" data-v-e7d7dbd8><div id="CompanyOddsDiv" class="company-comp" data-v-e7d7dbd8>`);
      _push(ssrRenderComponent(_component_TabTableMobile, {
        isHideTitle: "",
        style: unref(isMobile) ? null : { display: "none" },
        titleList: titleList.value,
        modelValue: tabActive.value,
        "onUpdate:modelValue": ($event) => tabActive.value = $event
      }, null, _parent));
      _push(`<div class="rankbox" data-v-e7d7dbd8><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-e7d7dbd8><tbody data-v-e7d7dbd8><tr class="tr-title" data-v-e7d7dbd8><th colspan="1" rowspan="2" data-v-e7d7dbd8><b data-v-e7d7dbd8>${ssrInterpolate(unref($t)("Company"))}</b></th></tr><tr class="tb-bgcolor1" data-v-e7d7dbd8><th data-v-e7d7dbd8></th></tr><!--[-->`);
      ssrRenderList(oddsDoubleChange.value, (item, index) => {
        var _a3, _b3;
        _push(`<tr name="oddsTr" class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}" data-v-e7d7dbd8><td width="100%" height="30" class="rb" data-v-e7d7dbd8>${ssrInterpolate((_b3 = (_a3 = "ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS)) == null ? void 0 : _a3.find((company) => (company == null ? void 0 : company.isportsapi) === (item == null ? void 0 : item.i_company_id))) == null ? void 0 : _b3.name)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata w-100" data-v-e7d7dbd8><table class="eTable adaptMt w-100" cellspacing="0" cellpadding="0" width="100%" data-v-e7d7dbd8><tbody data-v-e7d7dbd8><tr class="tr-title" data-v-e7d7dbd8><th colspan="3" style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" data-v-e7d7dbd8><b data-v-e7d7dbd8>${ssrInterpolate(unref($t)("Init"))}</b></th><th colspan="3" style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" data-v-e7d7dbd8><b data-v-e7d7dbd8>${ssrInterpolate(unref($t)("Live"))}</b></th><th rowspan="2" class="middle-width" data-v-e7d7dbd8><b data-v-e7d7dbd8>${ssrInterpolate(unref($t)("Detail"))}</b></th></tr><tr class="tr-title" data-v-e7d7dbd8><th data-v-e7d7dbd8>1X</th><th data-v-e7d7dbd8>12</th><th data-v-e7d7dbd8>X2</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-e7d7dbd8>1X</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-e7d7dbd8>12</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-e7d7dbd8>X2</th></tr><!--[-->`);
      ssrRenderList(oddsDoubleChange.value, (item, index) => {
        var _a3, _b3, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
        _push(`<tr name="oddsTr" class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}" data-v-e7d7dbd8><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%" data-v-e7d7dbd8><span data-v-e7d7dbd8>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_a3 = item == null ? void 0 : item.live_odds) == null ? void 0 : _a3.home_draw))}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%" data-v-e7d7dbd8><span data-v-e7d7dbd8>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_b3 = item == null ? void 0 : item.live_odds) == null ? void 0 : _b3.home_away))}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%" data-v-e7d7dbd8><span data-v-e7d7dbd8>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_c = item == null ? void 0 : item.live_odds) == null ? void 0 : _c.draw_away))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" class="6%" data-v-e7d7dbd8><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_d = item == null ? void 0 : item.live_odds) == null ? void 0 : _d.home_draw, (_e = item == null ? void 0 : item.early_odds) == null ? void 0 : _e.home_draw))}" data-v-e7d7dbd8>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_f = item == null ? void 0 : item.live_odds) == null ? void 0 : _f.home_draw))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" class="6%" data-v-e7d7dbd8><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_g = item == null ? void 0 : item.live_odds) == null ? void 0 : _g.home_away, (_h = item == null ? void 0 : item.early_odds) == null ? void 0 : _h.home_away))}" data-v-e7d7dbd8>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_i = item == null ? void 0 : item.live_odds) == null ? void 0 : _i.home_away))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" class="6%" data-v-e7d7dbd8><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_j = item == null ? void 0 : item.live_odds) == null ? void 0 : _j.draw_away, (_k = item == null ? void 0 : item.early_odds) == null ? void 0 : _k.draw_away))}" data-v-e7d7dbd8>${ssrInterpolate(("getOddNumberToNegativeTX" in _ctx ? _ctx.getOddNumberToNegativeTX : unref(getOddNumberToNegativeTX))((_l = item == null ? void 0 : item.live_odds) == null ? void 0 : _l.draw_away))}</span></td><td width="3%" data-v-e7d7dbd8><span class="odd_a" data-v-e7d7dbd8>${ssrInterpolate(unref($t)("History"))}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div><div id="content-page" class="mt-5" data-v-e7d7dbd8>`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title" data-v-e7d7dbd8>${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div><div class="modal fade" id="modal_detail_win" tabindex="-1" aria-labelledby="modal_detail_win_label" aria-hidden="true" data-v-e7d7dbd8><div class="modal-dialog modal-dialog-centered container" data-v-e7d7dbd8><div class="modal-content" data-v-e7d7dbd8><div class="modal-header" data-v-e7d7dbd8><div class="modal-title" id="modal_detail_win_label" data-v-e7d7dbd8>${ssrInterpolate(oddCompanyName.value)} ${ssrInterpolate(unref($t)("Odd history"))}</div><button type="button" class="btn-close" aria-label="Close" data-v-e7d7dbd8></button></div><div class="modal-body" data-v-e7d7dbd8><div id="" class="layui-layer-content detail_win" data-v-e7d7dbd8><div class="popinfo" data-v-e7d7dbd8>`);
      _push(ssrRenderComponent(_component_PopupOddsChange, {
        "odd-comp-id": oddCompanyId.value,
        "match-id": matchIdSlug.value,
        section: "doubleChance",
        "odd-companys-list": oddCompanys.value,
        "refresh-time": refreshTime.value
      }, null, _parent));
      _push(`</div></div></div></div></div></div><div class="modal fade" id="modal_filter_comp" tabindex="-1" aria-labelledby="modal_filter_comp_label" aria-hidden="true" data-v-e7d7dbd8><div class="modal-dialog modal-dialog-centered" data-v-e7d7dbd8><div class="modal-content" data-v-e7d7dbd8><div class="modal-header" data-v-e7d7dbd8><div class="modal-title" id="modal_filter_comp_label" data-v-e7d7dbd8>${ssrInterpolate(unref($t)("Select Company"))}</div><button type="button" class="btn-close" aria-label="Close" data-v-e7d7dbd8></button></div><div class="modal-body" data-v-e7d7dbd8><div class="layui-layer-content oddscomp-filterwin" data-v-e7d7dbd8><ul id="oddscompFilterWin" class="popinfo" data-v-e7d7dbd8><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (oddCompany, index) => {
        _push(`<li${ssrRenderAttr("value", oddCompany == null ? void 0 : oddCompany.id)} class="${ssrRenderClass([oCompanySelected.value.includes(oddCompany == null ? void 0 : oddCompany.id) ? "on" : "", "complist"])}" data-v-e7d7dbd8><i class="check-circled" data-v-e7d7dbd8></i> ${ssrInterpolate(oddCompany == null ? void 0 : oddCompany.name)}</li>`);
      });
      _push(`<!--]--></ul><div id="winTips" class="tips" style="${ssrRenderStyle(((_a2 = oCompanySelected.value) == null ? void 0 : _a2.length) === 0 ? null : { display: "none" })}" data-v-e7d7dbd8>*${ssrInterpolate(unref($t)("Select at least 1 company"))}</div></div></div><div class="modal-footer" style="${ssrRenderStyle({ "display": "none" })}" data-v-e7d7dbd8><button type="button" class="btn btn-primary"${ssrIncludeBooleanAttr(((_b2 = oCompanySelected.value) == null ? void 0 : _b2.length) === 0 ? true : false) ? " disabled" : ""} data-v-e7d7dbd8>${ssrInterpolate(unref($t)("OK"))}</button></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/odds/double-chance-odds/[match_id].vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const DoubleChanceOdds = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-e7d7dbd8"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
    const { useLocale, $t } = useShareCommon();
    const { width } = useWindowSize();
    const emit = __emit;
    const storeSystems = systemsStore();
    socketStore();
    const matchStore = useMatchStore();
    const eventSocketData = ref();
    const route = useRoute();
    const isHaft = ref(false);
    const matchLiveDetail = ref([]);
    const oddsDetail = ref();
    const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
    const matchIdSlug = ref("");
    ref("ahDetail");
    const oCompanySelected = ref(useCookie("oCompanyOddSelected").value ? useCookie("oCompanyOddSelected").value : []);
    const oCompList = ref([]);
    const oddsList = ref([]);
    const oddCompanys = ref([]);
    const oddCompanysList = ref([]);
    ODD_COMPANYS.forEach((item) => {
      oddCompanysList.value[item == null ? void 0 : item.id] = item;
      oCompList.value[item == null ? void 0 : item.id] = oCompanySelected.value.includes(item == null ? void 0 : item.id) ? true : false;
    });
    const tabActive = ref(1);
    ref(false);
    const refreshTime = ref(Date.now());
    const titleList = ref([
      {
        id: 1,
        name: $t("Init")
      },
      {
        id: 2,
        name: $t("Live")
      }
    ]);
    const matchTitle = useModel(__props, "matchTitle");
    const matchContent = useModel(__props, "matchContent");
    const initDataMatch = useModel(__props, "initDataMatch");
    const isMobile = computed(() => {
      return width.value <= 768;
    });
    const showColumn = computed(() => {
      return {
        first: !isMobile.value ? true : tabActive.value === 1 ? true : false,
        second: !isMobile.value ? true : tabActive.value === 2 ? true : false
      };
    });
    const oddCompanyName = ref();
    ref([]);
    const oddCompanyId = ref();
    const tab = ref(((_a = route == null ? void 0 : route.query) == null ? void 0 : _a.type) || "");
    reactive({
      modal_detail_win: null
    });
    reactive({
      modal_filter_comp: null
    });
    const settingsData = useCookie("settingsData");
    ref(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") || ((_b = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _b.timeZone));
    const fetchMatchsRecentDetail = async () => {
      var _a2;
      let resData = initDataMatch.value;
      matchLiveDetail.value.match = resData == null ? void 0 : resData[0];
      const i_match_id = (_a2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a2.i_match_id;
      if (i_match_id) {
        fetchOddsDetail(i_match_id, oddCompanySelected.value);
      }
    };
    const fetchOddsDetail = async (i_match_id, i_company_id = ODD_COMPANY_DEFAULT) => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL, {
        i_match_id,
        i_company_id
      }).then((resData) => {
        oddsDetail.value = resData;
      });
    };
    const fetchOdds = async (matchIdSlug2) => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_EUROHADICAP + "?match_id=" + matchIdSlug2).then(async (resData) => {
        oddCompanys.value = resData == null ? void 0 : resData.data;
      });
    };
    watch(
      () => route == null ? void 0 : route.query,
      () => {
        var _a2;
        tab.value = ((_a2 = route == null ? void 0 : route.query) == null ? void 0 : _a2.type) || "";
      },
      { immediate: true }
    );
    watch(
      () => route,
      (newPath) => {
        var _a2;
        const matches = (_a2 = newPath == null ? void 0 : newPath.path) == null ? void 0 : _a2.match(/[^/-]+$/);
        matchIdSlug.value = matches ? matches[0] : "";
      },
      { immediate: true }
    );
    watch(
      () => route.query,
      (newQuery) => {
        var _a2;
        isHaft.value = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? true : false;
      },
      { immediate: true }
    );
    watch(
      () => route.query,
      (newQuery) => {
        var _a2, _b2, _c, _d;
        const europeOdds = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? "europeanHaft" : "europeOdds";
        const handicap = ((_b2 = route.query) == null ? void 0 : _b2.haft) == 1 ? "handicapHalf" : "handicap";
        const overUnder = ((_c = route.query) == null ? void 0 : _c.haft) == 1 ? "overUnderHalf" : "overUnder";
        const oddCompanysList2 = [];
        (_d = ODD_COMPANYS) == null ? void 0 : _d.forEach((item) => {
          var _a3, _b3, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
          oddCompanysList2[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList2[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].handicap = [];
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].first = (_b3 = (_a3 = oddsList.value) == null ? void 0 : _a3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _b3.initial;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].live = (_d2 = (_c2 = oddsList.value) == null ? void 0 : _c2.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _d2.instant;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].run = (_f = (_e = oddsList.value) == null ? void 0 : _e.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _f.inplay;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].europeOdds = [];
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].first = (_h = (_g = oddsList.value) == null ? void 0 : _g.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _h.initial;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].live = (_j = (_i = oddsList.value) == null ? void 0 : _i.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _j.instant;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].run = (_l = (_k = oddsList.value) == null ? void 0 : _k.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _l.inplay;
          oddCompanysList2[item == null ? void 0 : item.isportsapi].overUnder = [];
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].first = (_n = (_m = oddsList.value) == null ? void 0 : _m.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _n.initial;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].live = (_p = (_o = oddsList.value) == null ? void 0 : _o.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _p.instant;
          oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].run = (_r = (_q = oddsList.value) == null ? void 0 : _q.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _r.inplay;
          if (typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].first === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].live === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["handicap"].run === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].first === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].live === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["europeOdds"].run === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].first === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].live === "undefined" && typeof oddCompanysList2[item == null ? void 0 : item.isportsapi]["overUnder"].run === "undefined") {
            oddCompanysList2[item == null ? void 0 : item.isportsapi].isEmpty = true;
          }
        });
      },
      { immediate: true }
    );
    const wssMatch = (socketData) => {
      try {
        if (socketData) {
          eventSocketData.value = socketData;
          emit("socketData", socketData);
        }
      } catch (e) {
        return false;
      }
    };
    watch(
      matchStore,
      () => {
        wssMatch(matchStore == null ? void 0 : matchStore.socketData);
      },
      { deep: true, immediate: true }
    );
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecentDetail()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => fetchOdds(matchIdSlug.value)), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      const _component_TabTableMobile = __nuxt_component_0;
      const _component_PopupOddsChange = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "",
        class: "match-odds"
      }, _attrs))} data-v-ee726169><div id="" data-v-ee726169><div id="CompanyOddsDiv" class="company-comp" data-v-ee726169>`);
      _push(ssrRenderComponent(_component_TabTableMobile, {
        isHideTitle: "",
        style: unref(isMobile) ? null : { display: "none" },
        titleList: titleList.value,
        modelValue: tabActive.value,
        "onUpdate:modelValue": ($event) => tabActive.value = $event
      }, null, _parent));
      _push(`<div class="rankbox" data-v-ee726169><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-ee726169><tbody data-v-ee726169><tr class="tr-title" data-v-ee726169><th colspan="2" rowspan="2" data-v-ee726169><b data-v-ee726169>${ssrInterpolate(unref($t)("Select Company"))}</b></th><th data-v-ee726169></th></tr><tr class="tb-bgcolor1" data-v-ee726169><th data-v-ee726169></th><th data-v-ee726169></th></tr><!--[-->`);
      ssrRenderList(oddCompanys.value, (item, index) => {
        var _a3, _b3;
        _push(`<tr name="oddsTr" class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}" data-v-ee726169><td width="100%" height="30" class="rb" data-v-ee726169>${ssrInterpolate((_b3 = (_a3 = oddCompanysList.value) == null ? void 0 : _a3[item == null ? void 0 : item.i_company_id]) == null ? void 0 : _b3.name)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata w-100" data-v-ee726169><table class="eTable adaptMt w-100" cellspacing="0" cellpadding="0" width="100%" data-v-ee726169><tbody data-v-ee726169><tr class="tr-title" data-v-ee726169><th colspan="4" style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" data-v-ee726169><b data-v-ee726169>${ssrInterpolate(unref($t)("Init"))}</b></th><th colspan="4" style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" data-v-ee726169><b data-v-ee726169>${ssrInterpolate(unref($t)("Live"))}</b></th><th rowspan="2" class="middle-width" data-v-ee726169><b data-v-ee726169>${ssrInterpolate(unref($t)("Detail"))}</b></th></tr><tr class="tr-title" data-v-ee726169><th data-v-ee726169>${ssrInterpolate(unref($t)("HDP"))}</th><th data-v-ee726169>${ssrInterpolate(unref($t)("Home"))}</th><th data-v-ee726169>${ssrInterpolate(unref($t)("Draw"))}</th><th data-v-ee726169>${ssrInterpolate(unref($t)("Away"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-ee726169>${ssrInterpolate(unref($t)("HDP"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-ee726169>${ssrInterpolate(unref($t)("Home"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-ee726169>${ssrInterpolate(unref($t)("Draw"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-ee726169>${ssrInterpolate(unref($t)("Away"))}</th></tr><!--[-->`);
      ssrRenderList(oddCompanys.value, (item, index) => {
        _push(`<tr name="oddsTr" class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}" data-v-ee726169><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%" data-v-ee726169><span data-o="" data-v-ee726169>${ssrInterpolate(item == null ? void 0 : item.early_handicap)}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%" data-v-ee726169><span data-o="" data-v-ee726169>${ssrInterpolate(item == null ? void 0 : item.early_home)}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%" data-v-ee726169><span data-o="" data-v-ee726169>${ssrInterpolate(item == null ? void 0 : item.early_draw)}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%" class="rb" data-v-ee726169><span data-o="" data-v-ee726169>${ssrInterpolate(item == null ? void 0 : item.early_away)}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%" data-v-ee726169><span data-o="" data-v-ee726169>${ssrInterpolate(item == null ? void 0 : item.live_handicap)}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%" data-v-ee726169><span data-o="" class="" data-v-ee726169>${ssrInterpolate(item == null ? void 0 : item.live_home)}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%" data-v-ee726169><span data-o="" class="" data-v-ee726169>${ssrInterpolate(item == null ? void 0 : item.live_draw)}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%" class="rb" data-v-ee726169><span data-o="" class="" data-v-ee726169>${ssrInterpolate(item == null ? void 0 : item.live_away)}</span></td><td width="3%" data-v-ee726169><span class="odd_a" data-v-ee726169>${ssrInterpolate(unref($t)("History"))}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div><div id="content-page" class="mt-5" data-v-ee726169>`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title" data-v-ee726169>${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div><div class="modal fade" id="modal_detail_win" tabindex="-1" aria-labelledby="modal_detail_win_label" aria-hidden="true" data-v-ee726169><div class="modal-dialog modal-dialog-centered container" data-v-ee726169><div class="modal-content" data-v-ee726169><div class="modal-header" data-v-ee726169><div class="modal-title" id="modal_detail_win_label" data-v-ee726169>${ssrInterpolate(oddCompanyName.value)} ${ssrInterpolate(unref($t)("Odd history"))}</div><button type="button" class="btn-close" aria-label="Close" data-v-ee726169></button></div><div class="modal-body" data-v-ee726169><div id="" class="layui-layer-content detail_win" data-v-ee726169><div class="popinfo" data-v-ee726169>`);
      _push(ssrRenderComponent(_component_PopupOddsChange, {
        "odd-comp-id": oddCompanyId.value,
        "match-id": matchIdSlug.value,
        section: "handicapDetail",
        "odd-companys-list": oddCompanys.value,
        "refresh-time": refreshTime.value
      }, null, _parent));
      _push(`</div></div></div></div></div></div><div class="modal fade" id="modal_filter_comp" tabindex="-1" aria-labelledby="modal_filter_comp_label" aria-hidden="true" data-v-ee726169><div class="modal-dialog modal-dialog-centered" data-v-ee726169><div class="modal-content" data-v-ee726169><div class="modal-header" data-v-ee726169><div class="modal-title" id="modal_filter_comp_label" data-v-ee726169>${ssrInterpolate(unref($t)("Select Company"))}</div><button type="button" class="btn-close" aria-label="Close" data-v-ee726169></button></div><div class="modal-body" data-v-ee726169><div class="layui-layer-content oddscomp-filterwin" data-v-ee726169><ul id="oddscompFilterWin" class="popinfo" data-v-ee726169><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (oddCompany, index) => {
        _push(`<li${ssrRenderAttr("value", oddCompany == null ? void 0 : oddCompany.id)} class="${ssrRenderClass([oCompanySelected.value.includes(oddCompany == null ? void 0 : oddCompany.id) ? "on" : "", "complist"])}" data-v-ee726169><i class="check-circled" data-v-ee726169></i> ${ssrInterpolate(oddCompany == null ? void 0 : oddCompany.name)}</li>`);
      });
      _push(`<!--]--></ul><div id="winTips" class="tips" style="${ssrRenderStyle(((_a2 = oCompanySelected.value) == null ? void 0 : _a2.length) === 0 ? null : { display: "none" })}" data-v-ee726169>*${ssrInterpolate(unref($t)("Select at least 1 company"))}</div></div></div><div class="modal-footer" style="${ssrRenderStyle({ "display": "none" })}" data-v-ee726169><button type="button" class="btn btn-primary"${ssrIncludeBooleanAttr(((_b2 = oCompanySelected.value) == null ? void 0 : _b2.length) === 0 ? true : false) ? " disabled" : ""} data-v-ee726169>${ssrInterpolate(unref($t)("OK"))}</button></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/odds/euro-handicap-odds/[match_id].vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const EuroHandicapOdds = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-ee726169"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
    var _a, _b, _c;
    let __temp, __restore;
    const { useLocale, $t } = useShareCommon();
    const { width } = useWindowSize();
    const emit = __emit;
    const storeSystems = systemsStore();
    const matchStore = useMatchStore();
    const eventSocketData = ref();
    const route = useRoute();
    const isHaft = ref(false);
    const matchLiveDetail = ref([]);
    const oddsDetail = ref();
    const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
    const matchIdSlug = ref("");
    ref("ahDetail");
    const oCompanySelected = ref(useCookie("oCompanyOddSelected").value ? useCookie("oCompanyOddSelected").value : []);
    const isEmptyCompanySelected = ref(((_a = oCompanySelected.value) == null ? void 0 : _a.length) > 0 ? false : true);
    const oCompList = ref([]);
    const oddsList = ref([]);
    const oddCompanys = ref([]);
    ODD_COMPANYS.forEach((item) => {
      if (isEmptyCompanySelected.value) {
        oCompList.value[item == null ? void 0 : item.id] = true;
      } else {
        oCompList.value[item == null ? void 0 : item.id] = oCompanySelected.value.includes(item == null ? void 0 : item.id) ? true : false;
      }
    });
    const oddCompanyName = ref();
    const oddCompanyId = ref();
    const tab = ref(((_b = route == null ? void 0 : route.query) == null ? void 0 : _b.type) || "");
    const tabActive = ref(1);
    ref(false);
    const refreshTime = ref(Date.now());
    const titleList = ref([
      {
        id: 1,
        name: $t("Init")
      },
      {
        id: 2,
        name: $t("Live")
      },
      {
        id: 3,
        name: $t("Run Odds")
      }
    ]);
    const matchTitle = useModel(__props, "matchTitle");
    const matchContent = useModel(__props, "matchContent");
    const initDataMatch = useModel(__props, "initDataMatch");
    const isMobile = computed(() => {
      return width.value <= 768;
    });
    const showColumn = computed(() => {
      return {
        first: !isMobile.value ? true : tabActive.value === 1 ? true : false,
        second: !isMobile.value ? true : tabActive.value === 2 ? true : false,
        third: !isMobile.value ? true : tabActive.value === 3 ? true : false
      };
    });
    reactive({
      modal_detail_win: null
    });
    reactive({
      modal_filter_comp: null
    });
    const settingsData = useCookie("settingsData");
    ref(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") || ((_c = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _c.timeZone));
    const fetchMatchsRecentDetail = async () => {
      var _a2;
      let resData = initDataMatch.value;
      matchLiveDetail.value.match = resData == null ? void 0 : resData[0];
      const i_match_id = (_a2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a2.i_match_id;
      if (i_match_id) {
        fetchOddsDetail(i_match_id, oddCompanySelected.value);
      }
    };
    const fetchOddsDetail = async (i_match_id, i_company_id = ODD_COMPANY_DEFAULT) => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL, {
        i_match_id,
        i_company_id
      }).then((resData) => {
        oddsDetail.value = resData;
      });
    };
    const fetchOdds = async (matchIdSlug2) => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL + "?match_id=" + matchIdSlug2).then(async (resData) => {
        var _a2;
        oddsList.value = getDataObjectByList(resData);
        const oddCompanysList = [];
        (_a2 = ODD_COMPANYS) == null ? void 0 : _a2.forEach((item) => {
          var _a3, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
          oddCompanysList[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList[item == null ? void 0 : item.isportsapi].handicap = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first = (_b2 = (_a3 = oddsList.value) == null ? void 0 : _a3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "handicap")) == null ? void 0 : _b2.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live = (_d = (_c2 = oddsList.value) == null ? void 0 : _c2.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "handicap")) == null ? void 0 : _d.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run = (_f = (_e = oddsList.value) == null ? void 0 : _e.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "handicap")) == null ? void 0 : _f.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].europeOdds = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first = (_h = (_g = oddsList.value) == null ? void 0 : _g.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "europeOdds")) == null ? void 0 : _h.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live = (_j = (_i = oddsList.value) == null ? void 0 : _i.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "europeOdds")) == null ? void 0 : _j.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run = (_l = (_k = oddsList.value) == null ? void 0 : _k.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "europeOdds")) == null ? void 0 : _l.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].overUnder = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first = (_n = (_m = oddsList.value) == null ? void 0 : _m.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "overUnder")) == null ? void 0 : _n.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live = (_p = (_o = oddsList.value) == null ? void 0 : _o.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "overUnder")) == null ? void 0 : _p.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run = (_r = (_q = oddsList.value) == null ? void 0 : _q.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === "overUnder")) == null ? void 0 : _r.inplay;
          if (typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run === "undefined") {
            oddCompanysList[item == null ? void 0 : item.isportsapi].isEmpty = true;
          }
          if (isEmptyCompanySelected.value && !((_s = oCompanySelected.value) == null ? void 0 : _s.includes(item == null ? void 0 : item.id))) {
            oCompanySelected.value.push(item == null ? void 0 : item.id);
          }
        });
        oddCompanys.value = oddCompanysList;
      });
    };
    watch(
      () => route == null ? void 0 : route.query,
      () => {
        var _a2;
        tab.value = ((_a2 = route == null ? void 0 : route.query) == null ? void 0 : _a2.type) || "";
      },
      { immediate: true }
    );
    watch(
      () => route,
      (newPath) => {
        var _a2;
        const matches = (_a2 = newPath == null ? void 0 : newPath.path) == null ? void 0 : _a2.match(/[^/-]+$/);
        matchIdSlug.value = matches ? matches[0] : "";
      },
      { immediate: true }
    );
    watch(
      () => route.query,
      (newQuery) => {
        var _a2;
        isHaft.value = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? true : false;
      },
      { immediate: true }
    );
    watch(
      () => route.query,
      (newQuery) => {
        var _a2, _b2, _c2, _d;
        const europeOdds = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? "europeanHaft" : "europeOdds";
        const handicap = ((_b2 = route.query) == null ? void 0 : _b2.haft) == 1 ? "handicapHalf" : "handicap";
        const overUnder = ((_c2 = route.query) == null ? void 0 : _c2.haft) == 1 ? "overUnderHalf" : "overUnder";
        const oddCompanysList = [];
        (_d = ODD_COMPANYS) == null ? void 0 : _d.forEach((item) => {
          var _a3, _b3, _c3, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
          oddCompanysList[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList[item == null ? void 0 : item.isportsapi].handicap = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first = (_b3 = (_a3 = oddsList.value) == null ? void 0 : _a3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _b3.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live = (_d2 = (_c3 = oddsList.value) == null ? void 0 : _c3.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _d2.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run = (_f = (_e = oddsList.value) == null ? void 0 : _e.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === handicap)) == null ? void 0 : _f.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].europeOdds = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first = (_h = (_g = oddsList.value) == null ? void 0 : _g.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _h.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live = (_j = (_i = oddsList.value) == null ? void 0 : _i.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _j.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run = (_l = (_k = oddsList.value) == null ? void 0 : _k.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === europeOdds)) == null ? void 0 : _l.inplay;
          oddCompanysList[item == null ? void 0 : item.isportsapi].overUnder = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first = (_n = (_m = oddsList.value) == null ? void 0 : _m.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _n.initial;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live = (_p = (_o = oddsList.value) == null ? void 0 : _o.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _p.instant;
          oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run = (_r = (_q = oddsList.value) == null ? void 0 : _q.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi) && odd.type === overUnder)) == null ? void 0 : _r.inplay;
          if (typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["handicap"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["europeOdds"].run === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].first === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].live === "undefined" && typeof oddCompanysList[item == null ? void 0 : item.isportsapi]["overUnder"].run === "undefined") {
            oddCompanysList[item == null ? void 0 : item.isportsapi].isEmpty = true;
          }
        });
        oddCompanys.value = oddCompanysList;
      },
      { immediate: true }
    );
    const wssMatch = (socketData) => {
      var _a2, _b2, _c2, _d, _e, _f, _g;
      if (socketData) {
        try {
          const wssItem = socketData;
          eventSocketData.value = wssItem;
          emit("socketData", wssItem);
          if (wssItem.payload.iodds) {
            const matchOdds = wssItem.payload.iodds;
            const overUnder = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 ? "overUnderHalf" : "overUnder";
            if (matchOdds == null ? void 0 : matchOdds[overUnder]) {
              for (const matchOdd of matchOdds == null ? void 0 : matchOdds[overUnder]) {
                const matchId = parseIntO(getValueByPosition(matchOdd, 0));
                const companyId = getValueByPosition(matchOdd, 1);
                const oddsType = getValueByPosition(matchOdd, 7);
                if (matchId == ((_c2 = (_b2 = matchLiveDetail.value) == null ? void 0 : _b2.match) == null ? void 0 : _c2.i_match_id)) {
                  const oddCompany = (_d = oddCompanys.value) == null ? void 0 : _d.find((item) => (item == null ? void 0 : item.isportsapi) == companyId);
                  if (oddCompany) {
                    if (!(oddCompany == null ? void 0 : oddCompany.overUnder)) {
                      oddCompany.overUnder = [];
                      oddCompany.overUnder.first = [];
                      oddCompany.overUnder.live = [];
                      oddCompany.overUnder.run = [];
                    }
                    if (oddsType == 1) {
                      oddCompany.overUnder.first_older = ((_e = oddCompany == null ? void 0 : oddCompany.overUnder) == null ? void 0 : _e.first) ? JSON.parse(JSON.stringify(oddCompany.overUnder.first)) : [];
                      oddCompany.overUnder.first = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    } else if (oddsType == 2) {
                      oddCompany.overUnder.live_older = ((_f = oddCompany == null ? void 0 : oddCompany.overUnder) == null ? void 0 : _f.live) ? JSON.parse(JSON.stringify(oddCompany.overUnder.live)) : [];
                      oddCompany.overUnder.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    } else if (oddsType == 3) {
                      oddCompany.overUnder.run_older = ((_g = oddCompany == null ? void 0 : oddCompany.overUnder) == null ? void 0 : _g.run) ? JSON.parse(JSON.stringify(oddCompany.overUnder.run)) : [];
                      oddCompany.overUnder.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]];
                    }
                  }
                }
              }
            }
          }
        } catch (e) {
          return false;
        }
      }
    };
    watch(
      matchStore,
      () => {
        wssMatch(matchStore == null ? void 0 : matchStore.socketData);
      },
      { deep: true, immediate: true }
    );
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecentDetail()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => fetchOdds(matchIdSlug.value)), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d;
      const _component_TabTableMobile = __nuxt_component_0;
      const _component_PopupOddsChange = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "",
        class: "match-odds"
      }, _attrs))}><div id=""><div id="CompanyOddsDiv" class="company-comp">`);
      _push(ssrRenderComponent(_component_TabTableMobile, {
        style: unref(isMobile) ? null : { display: "none" },
        titleList: titleList.value,
        modelValue: tabActive.value,
        "onUpdate:modelValue": ($event) => tabActive.value = $event
      }, null, _parent));
      _push(`<div class="rankbox"><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}"><tbody><tr class="tr-title"><th colspan="2" rowspan="2"><b>${ssrInterpolate(unref($t)("Company"))}</b><img${ssrRenderAttr("src", _imports_0$1)} alt="plus"></th><th></th></tr><tr class="tb-bgcolor1"><th></th></tr><!--[-->`);
      ssrRenderList((_a2 = oddCompanys.value) == null ? void 0 : _a2.filter((item) => item !== null && !(item == null ? void 0 : item.isEmpty) && oCompanySelected.value.includes(item == null ? void 0 : item.id)), (item, index) => {
        _push(`<tr class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}"><td rowspan="1"><span>${ssrInterpolate(item == null ? void 0 : item.name)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata w-100"><table class="eTable adaptMt w-100" cellspacing="0" cellpadding="0" width="100%"><tbody><tr class="tr-title"><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>${ssrInterpolate(unref($t)("Init"))}</b></th><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>${ssrInterpolate(unref($t)("Live"))}</b></th><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>${ssrInterpolate(unref($t)("Run Odds"))}</b></th><th rowspan="2" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>${ssrInterpolate(unref($t)("Detail"))}</b></th></tr><tr class="tr-title"><th>${ssrInterpolate(unref($t)("Over"))}</th><th>${ssrInterpolate(unref($t)("Odd"))}</th><th>${ssrInterpolate(unref($t)("Under"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Over"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Odd"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Under"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Over"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Odd"))}</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Under"))}</th><th style="${ssrRenderStyle(unref(isMobile) ? null : { display: "none" })}">${ssrInterpolate(unref($t)("Detail"))}</th></tr><!--[-->`);
      ssrRenderList((_b2 = oddCompanys.value) == null ? void 0 : _b2.filter((item) => item !== null && !(item == null ? void 0 : item.isEmpty) && oCompanySelected.value.includes(item == null ? void 0 : item.id)), (item, index) => {
        var _a3, _b3, _c3, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D;
        _push(`<tr name="oddsTr" style="${ssrRenderStyle({ "text-align": "center" })}" cid="3" class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}"><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%"><span class="" class="${ssrRenderClass([("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 1, 1), ""])}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_b3 = (_a3 = item == null ? void 0 : item.overUnder) == null ? void 0 : _a3.first) == null ? void 0 : _b3[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%"><span class="" class="${ssrRenderClass([("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 0, 1), ""])}">${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_d2 = (_c3 = item == null ? void 0 : item.overUnder) == null ? void 0 : _c3.first) == null ? void 0 : _d2[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%" class="rb"><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 2, 1))}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_f = (_e = item == null ? void 0 : item.overUnder) == null ? void 0 : _e.first) == null ? void 0 : _f[2]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%"><span class="" class="${ssrRenderClass([("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_h = (_g = item == null ? void 0 : item.overUnder) == null ? void 0 : _g.live) == null ? void 0 : _h[1], (_j = (_i = item == null ? void 0 : item.overUnder) == null ? void 0 : _i.first) == null ? void 0 : _j[1]), ""])}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_l = (_k = item == null ? void 0 : item.overUnder) == null ? void 0 : _k.live) == null ? void 0 : _l[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%"><span class="" class="${ssrRenderClass([("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_n = (_m = item == null ? void 0 : item.overUnder) == null ? void 0 : _m.live) == null ? void 0 : _n[0], (_p = (_o = item == null ? void 0 : item.overUnder) == null ? void 0 : _o.first) == null ? void 0 : _p[0]), ""])}">${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_r = (_q = item == null ? void 0 : item.overUnder) == null ? void 0 : _q.live) == null ? void 0 : _r[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%" class="rb"><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_t = (_s = item == null ? void 0 : item.overUnder) == null ? void 0 : _s.live) == null ? void 0 : _t[2], (_v = (_u = item == null ? void 0 : item.overUnder) == null ? void 0 : _u.first) == null ? void 0 : _v[2]))}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_x = (_w = item == null ? void 0 : item.overUnder) == null ? void 0 : _w.live) == null ? void 0 : _x[2]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="6%"><span class="" class="${ssrRenderClass([("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 1), ""])}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_z = (_y = item == null ? void 0 : item.overUnder) == null ? void 0 : _y.run) == null ? void 0 : _z[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="6%"><span class="" class="${ssrRenderClass([("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 0), ""])}">${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_B = (_A = item == null ? void 0 : item.overUnder) == null ? void 0 : _A.run) == null ? void 0 : _B[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="6%" class="rb"><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 2))}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_D = (_C = item == null ? void 0 : item.overUnder) == null ? void 0 : _C.run) == null ? void 0 : _D[2]))}</span></td><td width="10%" style="${ssrRenderStyle({ "min-width": "60px" })}"><span class="odd_a">${ssrInterpolate(unref($t)("History"))}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div><div id="content-page" class="mt-5">`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title">${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div><div class="modal fade" id="modal_detail_win" tabindex="-1" aria-labelledby="modal_detail_win_label" aria-hidden="true"><div class="modal-dialog modal-dialog-centered container"><div class="modal-content"><div class="modal-header"><div class="modal-title" id="modal_detail_win_label">${ssrInterpolate(oddCompanyName.value)} ${ssrInterpolate(unref($t)("Odd history"))}</div><button type="button" class="btn-close" aria-label="Close"></button></div><div class="modal-body"><div id="" class="layui-layer-content detail_win"><div class="popinfo">`);
      _push(ssrRenderComponent(_component_PopupOddsChange, {
        "odd-comp-id": oddCompanyId.value,
        "match-id": matchIdSlug.value,
        section: "ahDetail",
        "odd-companys-list": oddCompanys.value,
        "refresh-time": refreshTime.value
      }, null, _parent));
      _push(`</div></div></div></div></div></div><div class="modal fade" id="modal_filter_comp" tabindex="-1" aria-labelledby="modal_filter_comp_label" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><div class="modal-title" id="modal_filter_comp_label">${ssrInterpolate(unref($t)("Select Company"))}</div><button type="button" class="btn-close" aria-label="Close"></button></div><div class="modal-body"><div class="layui-layer-content oddscomp-filterwin"><ul id="oddscompFilterWin" class="popinfo"><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (oddCompany, index) => {
        _push(`<li${ssrRenderAttr("value", oddCompany == null ? void 0 : oddCompany.id)} class="${ssrRenderClass([oCompanySelected.value.includes(oddCompany == null ? void 0 : oddCompany.id) ? "on" : "", "complist"])}"><i class="check-circled"></i> ${ssrInterpolate(oddCompany == null ? void 0 : oddCompany.name)}</li>`);
      });
      _push(`<!--]--></ul><div id="winTips" class="tips" style="${ssrRenderStyle(((_c2 = oCompanySelected.value) == null ? void 0 : _c2.length) === 0 ? null : { display: "none" })}">*${ssrInterpolate(unref($t)("Select at least 1 company"))}</div></div></div><div class="modal-footer" style="${ssrRenderStyle({ "display": "none" })}"><button type="button" class="btn btn-primary"${ssrIncludeBooleanAttr(((_d = oCompanySelected.value) == null ? void 0 : _d.length) === 0 ? true : false) ? " disabled" : ""}>${ssrInterpolate(unref($t)("OK"))}</button></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/odds/over-under-odds/[match_id].vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/icon/player-statistics/1.png");
const _imports_1 = publicAssetsURL("/icon/player-statistics/3.png");
const _imports_2 = publicAssetsURL("/icon/player-statistics/9.png");
const _imports_3 = publicAssetsURL("/icon/player-statistics/2.png");
const _imports_4 = publicAssetsURL("/icon/player-statistics/32.png");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "table-info",
  __ssrInlineRender: true,
  props: {
    info: Array,
    posizione: String,
    bestPlayer: Object
  },
  setup(__props) {
    const { $t } = useShareCommon();
    const BTN_DETAIL = {
      OVERVIEW: "Overview",
      ATTACK: "Attack",
      DEFENSE: "Defense",
      PASS_THE_BALL: "Passing"
    };
    const translate = (key) => {
      const fullKey = `${key} playertech`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
    const buttonActive = ref(BTN_DETAIL.OVERVIEW);
    const buttonList = ref([
      BTN_DETAIL.OVERVIEW,
      BTN_DETAIL.ATTACK,
      BTN_DETAIL.DEFENSE,
      BTN_DETAIL.PASS_THE_BALL
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "info" }, _attrs))} data-v-13878da0><div class="${ssrRenderClass([
        "info__header",
        {
          "info__header--bottom": __props.posizione
        }
      ])}" data-v-13878da0><div class="info__team-name" data-v-13878da0>${ssrInterpolate(__props.info.team_name)}</div><div class="info__team-function" data-v-13878da0><!--[-->`);
      ssrRenderList(unref(buttonList), (item, index) => {
        _push(`<button class="${ssrRenderClass([
          "info__team-btn",
          { "info__team-btn--active": unref(buttonActive) === item }
        ])}" data-v-13878da0>${ssrInterpolate(translate(item))}</button>`);
      });
      _push(`<!--]--></div></div><div class="table-container" data-v-13878da0><table data-v-13878da0><thead data-v-13878da0><tr data-v-13878da0><th data-v-13878da0>${ssrInterpolate(translate("Number"))}</th><th data-v-13878da0>${ssrInterpolate(translate("Player"))}</th><th style="${ssrRenderStyle({ "min-width": "65px" })}" data-v-13878da0>${ssrInterpolate(translate("Position"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Shots"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Shots on Target"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Key Pass"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Goals"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Successful Dribble"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Assist"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Free Kick"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Fouled"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Quick Counter"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Offside"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Tackle"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Interception"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Saves"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Effective Clearance"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Blocked Shot"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Foul"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Pass"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Successful Pass"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Cross"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Successful Cross"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Long Pass"))}</th><th style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(translate("Accurate Long Pass"))}</th><th data-v-13878da0>${ssrInterpolate(translate("Rating"))}</th><th data-v-13878da0>${ssrInterpolate(translate("Main Event"))}</th></tr></thead><tbody data-v-13878da0><!--[-->`);
      ssrRenderList(__props.info.stats, (player, index) => {
        var _a2, _b;
        var _a;
        _push(`<tr data-v-13878da0><td data-v-13878da0>${ssrInterpolate((_a2 = player.shirt_number) != null ? _a2 : "-")}</td><td data-v-13878da0>${ssrInterpolate(player.player_name)}</td><td data-v-13878da0>${ssrInterpolate(translate(("getPlayerPosition" in _ctx ? _ctx.getPlayerPosition : unref(getPlayerPosition))((_b = player.position) != null ? _b : player.player_position)))}</td><td style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.shots)}</td><td style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.hit_woodwork)}</td><td style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.key_passes)}</td><td style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.goals)}</td><td style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.dribble_succ)}</td><td style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.assists)}</td><td style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.freekicks)}</td><td style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.was_fouled)}</td><td style="${ssrRenderStyle([BTN_DETAIL.OVERVIEW, BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.fastbreaks)}</td><td style="${ssrRenderStyle([BTN_DETAIL.ATTACK].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.offsides)}</td><td style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.tackles)}</td><td style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.interceptions)}</td><td style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.saves)}</td><td style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.clearances)}</td><td style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.blocked_shots)}</td><td style="${ssrRenderStyle([BTN_DETAIL.DEFENSE].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.fouls)}</td><td style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.passes)}</td><td style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.passes_accuracy)}</td><td style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.crosses)}</td><td style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.crosses_accuracy)}</td><td style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.long_balls)}</td><td style="${ssrRenderStyle([BTN_DETAIL.PASS_THE_BALL].includes(unref(buttonActive)) ? null : { display: "none" })}" data-v-13878da0>${ssrInterpolate(player.long_balls_accuracy)}</td><td data-v-13878da0>${ssrInterpolate(player.rating)}</td><td data-v-13878da0><div class="d-flex justify-content-center" data-v-13878da0>`);
        if (player.goals) {
          _push(`<img${ssrRenderAttr("src", _imports_0)} alt="B\xE0n th\u1EAFng" data-v-13878da0>`);
        } else {
          _push(`<!---->`);
        }
        if (player.yellow_cards) {
          _push(`<img${ssrRenderAttr("src", _imports_1)} alt="Th\u1EBB v\xE0ng" data-v-13878da0>`);
        } else {
          _push(`<!---->`);
        }
        if (player.yellow2red_cards) {
          _push(`<img${ssrRenderAttr("src", _imports_2)} alt="Th\u1EBB v\xE0ng th\u1EE9 hai" data-v-13878da0>`);
        } else {
          _push(`<!---->`);
        }
        if (player.red_cards) {
          _push(`<img${ssrRenderAttr("src", _imports_3)} alt="Th\u1EBB \u0111\u1ECF" data-v-13878da0>`);
        } else {
          _push(`<!---->`);
        }
        if (player.player_id === ((_a = __props.bestPlayer) == null ? void 0 : _a.player_id)) {
          _push(`<img class="image-flash"${ssrRenderAttr("src", _imports_4)} alt="Th\u1EBB \u0111\u1ECF" data-v-13878da0>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/player-statstics/table-info.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-13878da0"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "player-statistics",
  __ssrInlineRender: true,
  props: {
    "modelValue": {},
    "modelModifiers": {},
    "matchTitle": {},
    "matchTitleModifiers": {},
    "matchContent": {},
    "matchContentModifiers": {},
    "initDataMatch": {},
    "initDataMatchModifiers": {}
  },
  emits: ["update:modelValue", "update:matchTitle", "update:matchContent", "update:initDataMatch"],
  async setup(__props) {
    var _a, _b, _c;
    let __temp, __restore;
    const { $t } = useShareCommon();
    const translate = (key) => {
      const fullKey = `${key} playertech`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
    const storeSystems = systemsStore();
    const route = useRoute();
    const objectIdSlug = ref(((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.id) || "");
    const infoPlayer = ref([]);
    const isLoading = ref(true);
    const homeTeamId = useModel(__props, "modelValue");
    const bestPlayer = ref();
    const matchIdSlug = ref(((_b = route == null ? void 0 : route.params) == null ? void 0 : _b.id) || "");
    const matchsRecentDetail = ref([]);
    const matchTitle = useModel(__props, "matchTitle");
    const matchContent = useModel(__props, "matchContent");
    const initDataMatch = useModel(__props, "initDataMatch");
    const settingsData = useCookie("settingsData");
    ref(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") || ((_c = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _c.timeZone));
    computed(
      () => {
        var _a2, _b2;
        return ((_b2 = (_a2 = matchsRecentDetail.value.match) == null ? void 0 : _a2.home_team) == null ? void 0 : _b2.name) || "";
      }
    );
    computed(
      () => {
        var _a2, _b2;
        return ((_b2 = (_a2 = matchsRecentDetail.value.match) == null ? void 0 : _a2.away_team) == null ? void 0 : _b2.name) || "";
      }
    );
    const getBestPlayer = () => {
      let highestRatedPlayer = { player_id: null, rating: null };
      if (infoPlayer.value && Array.isArray(infoPlayer.value)) {
        infoPlayer.value.forEach((team) => {
          if (team.stats && Array.isArray(team.stats)) {
            team.stats.forEach((player) => {
              if (player.rating != null && player.rating > highestRatedPlayer.rating) {
                highestRatedPlayer = {
                  player_id: player.player_id || null,
                  rating: player.rating
                };
              }
            });
          }
        });
      }
      bestPlayer.value = highestRatedPlayer;
    };
    const getPlayerStatistics = async () => {
      var _a2;
      isLoading.value = true;
      try {
        infoPlayer.value = await useApiLiveScore(
          API_ROUTERS.LIVESCORE.PLAYER_STATISTICS + "?match-id=" + objectIdSlug.value
        );
        if (infoPlayer.value && ((_a2 = infoPlayer.value[0]) == null ? void 0 : _a2.team_name) !== homeTeamId.value) {
          infoPlayer.value = infoPlayer.value.reverse();
        }
        getBestPlayer();
      } catch (e) {
        console.error(e);
      } finally {
        isLoading.value = false;
      }
    };
    const fetchMatchsRecentDetail = async (matchIdSlug2) => {
      let resData = initDataMatch.value;
      matchsRecentDetail.value.match = resData == null ? void 0 : resData[0];
    };
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecentDetail(matchIdSlug.value)), await __temp, __restore();
    if (homeTeamId.value) {
      [__temp, __restore] = withAsyncContext(() => getPlayerStatistics()), await __temp, __restore();
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_nuxt_img = _sfc_main$e$1;
      const _component_PlayerStatsticsTableInfo = __nuxt_component_1;
      const _component_PlayerStatsticsTableDetail = __nuxt_component_2;
      if (!unref(isLoading)) {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        if (!((_a2 = unref(infoPlayer)) == null ? void 0 : _a2.length)) {
          _push(`<div class="d-flex justify-content-center flex-column align-items-center"><div class="popupinfo searchwin_nodata nodata">`);
          _push(ssrRenderComponent(_component_nuxt_img, {
            loading: "lazy",
            class: "nodata_pic",
            alt: "nodata pic",
            width: "200",
            height: "200",
            src: "/icon/nodata.svg"
          }, null, _parent));
          _push(`</div><p class="fw-bold text-center mt-3">${ssrInterpolate(translate("Data is being updated"))}</p></div>`);
        } else {
          _push(`<div><div>`);
          _push(ssrRenderComponent(_component_PlayerStatsticsTableInfo, {
            bestPlayer: unref(bestPlayer),
            info: unref(infoPlayer)[0]
          }, null, _parent));
          _push(`</div><div class="mt-5">`);
          _push(ssrRenderComponent(_component_PlayerStatsticsTableInfo, {
            bestPlayer: unref(bestPlayer),
            info: unref(infoPlayer)[1],
            posizione: true
          }, null, _parent));
          _push(`</div>`);
          _push(ssrRenderComponent(_component_PlayerStatsticsTableDetail, null, null, _parent));
          _push(`</div>`);
        }
        _push(`<div id="content-page" class="mt-5">`);
        if (matchTitle.value) {
          _push(`<h1 class="page_title">${ssrInterpolate(matchTitle.value)}</h1>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(matchContent.value)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/match/player-statistics.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    let __temp, __restore;
    const { useLocale, $t, $trouter, isNavVisible } = useShareCommon();
    isNavVisible.value = false;
    const matchStore = useMatchStore();
    const route = useRoute();
    const tab = ref(((_a = route == null ? void 0 : route.query) == null ? void 0 : _a.tab) || "");
    const type = ref(((_b = route == null ? void 0 : route.query) == null ? void 0 : _b.type) || MATCH_TAB.ODDSCOMP);
    const eventSocketData = ref();
    const homeTeamId = ref(null);
    const isHidden = useState("my-shallow-state");
    if (tab.value === MATCH_TAB.ODDS && !((_d = MATCH_ODD_TAB) == null ? void 0 : _d[(_c = type.value) == null ? void 0 : _c.toUpperCase()])) {
      type.value = MATCH_TAB.ODDSCOMP;
    }
    const socketData = (wssItem) => {
      eventSocketData.value = wssItem;
    };
    watch(
      () => route == null ? void 0 : route.query,
      () => {
        var _a2, _b2, _c2, _d2;
        tab.value = ((_a2 = route == null ? void 0 : route.query) == null ? void 0 : _a2.tab) || "";
        type.value = ((_b2 = route == null ? void 0 : route.query) == null ? void 0 : _b2.type) || MATCH_TAB.ODDS;
        if (tab.value === MATCH_TAB.ODDS && !((_d2 = MATCH_ODD_TAB) == null ? void 0 : _d2[(_c2 = type.value) == null ? void 0 : _c2.toUpperCase()])) {
          type.value = MATCH_TAB.ODDSCOMP;
        }
      },
      { immediate: true }
    );
    const initKeySeo = computed(() => {
      const getSeoData = (suffix) => ({
        title: `MATCH_TITLE_${suffix}`,
        description: `MATCH_DESCRIPTION_${suffix}`,
        keyword: `MATCH_KEYWORD_${suffix}`,
        content: `MATCH_CONTENT_${suffix}`,
        tab: suffix.toLowerCase()
      });
      const suffixMap = {
        [MATCH_TAB.H2H]: "H2H",
        [MATCH_TAB.STATISTICAL]: "PLAYERTECH",
        [MATCH_TAB.DETAIL]: "DETAIL",
        [MATCH_TAB.ODDS]: String(route.query.type).toUpperCase()
      };
      if (tab.value) {
        return getSeoData(suffixMap[tab.value] || "");
      }
      return getSeoData(suffixMap[MATCH_TAB.DETAIL]);
    });
    const initDataMatch = ref([]);
    const settingsData = useCookie("settingsData");
    const storeSystems = systemsStore();
    const timeZone = ref(
      getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") || ((_e = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _e.timeZone)
    );
    const seoMeta = ref({
      title: "",
      description: "",
      keyword: "",
      content: ""
    });
    const breadcrumbs = ref([
      {
        label: "",
        to: "",
        last: "off"
      },
      {
        label: "",
        to: "",
        last: "on"
      }
    ]);
    const fetchMatchsRecentDetail = async () => {
      var _a2;
      try {
        const resData = await useApiLiveScore(
          API_ROUTERS.LIVESCORE.MATCHS_RECENT_DETAIL,
          {
            match_id: (_a2 = route == null ? void 0 : route.params) == null ? void 0 : _a2.id,
            lang: useLocale == null ? void 0 : useLocale.value.defaultLocale
          }
        );
        if (!resData || (resData == null ? void 0 : resData.length) === 0) {
          return navigateTo($trouter(ROUTERS.HOMEPAGE), { redirectCode: 301 });
        }
        return resData;
      } catch (e) {
        return null;
      }
    };
    const setObjectMeta = async (payload, resData) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2;
      try {
        const timeZoneTitle = timeZone.value;
        let title = resData == null ? void 0 : resData.title;
        let description = resData == null ? void 0 : resData.meta_descriptions;
        if (!title || title == "") {
          title = getConfig(
            storeSystems.configurations,
            initKeySeo.value.title
          ) || tab.value === MATCH_TAB.ODDS && getConfig(storeSystems.configurations, "MATCH_TITLE_ODDSCOMP") || getConfig(storeSystems.configurations, "SEO_META_TITLE");
          title = generateMetaSeo(
            title,
            (_a2 = payload.home_team) == null ? void 0 : _a2.name,
            (_b2 = payload.away_team) == null ? void 0 : _b2.name,
            payload.match_time,
            timeZoneTitle,
            (_c2 = payload.competition) == null ? void 0 : _c2.name
          );
        }
        if (!description || description == "") {
          description = getConfig(
            storeSystems.configurations,
            initKeySeo.value.description
          ) || tab.value === MATCH_TAB.ODDS && getConfig(storeSystems.configurations, "MATCH_DESCRIPTION_ODDSCOMP") || getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION");
          description = generateMetaSeo(
            description,
            (_d2 = payload.home_team) == null ? void 0 : _d2.name,
            (_e2 = payload.away_team) == null ? void 0 : _e2.name,
            payload.match_time,
            timeZoneTitle,
            (_f2 = payload.competition) == null ? void 0 : _f2.name
          );
        }
        let keyword = resData == null ? void 0 : resData.keyword;
        if (!keyword || keyword == "") {
          keyword = getConfig(
            storeSystems.configurations,
            initKeySeo.value.keyword
          ) || tab.value === MATCH_TAB.ODDS && getConfig(storeSystems.configurations, "MATCH_KEYWORD_ODDSCOMP") || "";
          keyword = generateMetaSeo(
            keyword,
            (_g2 = payload.home_team) == null ? void 0 : _g2.name,
            (_h2 = payload.away_team) == null ? void 0 : _h2.name,
            payload.match_time,
            timeZoneTitle,
            (_i2 = payload.competition) == null ? void 0 : _i2.name
          );
        }
        let content = resData == null ? void 0 : resData.content;
        if (!content || content == "") {
          content = getConfig(
            storeSystems.configurations,
            initKeySeo.value.content
          ) || tab.value === MATCH_TAB.ODDS && getConfig(storeSystems.configurations, "MATCH_CONTENT_ODDSCOMP") || "";
          content = generateMetaSeo(
            content,
            (_j2 = payload.home_team) == null ? void 0 : _j2.name,
            (_k2 = payload.away_team) == null ? void 0 : _k2.name,
            payload.match_time,
            timeZoneTitle,
            (_l2 = payload.competition) == null ? void 0 : _l2.name
          );
          seoMeta.value.title = title;
          seoMeta.value.description = description;
          seoMeta.value.keyword = keyword;
          seoMeta.value.content = content;
        }
      } catch (e) {
        console.log(e);
      }
    };
    const fetchObjectMeta = async () => {
      try {
        const resData = await useFetch(
          createUrl(API_ROUTERS.OBJECTS_META.DETAIL + "/" + route.params.id, {
            query: {
              type: "match",
              tab: initKeySeo.value.tab
            }
          }),
          "$Rwr9iQmWHe"
        );
        return resData.data.value;
      } catch (e) {
        return null;
      }
    };
    const { data } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("match", async () => {
      try {
        const [match, seo] = await Promise.all([
          fetchMatchsRecentDetail(),
          fetchObjectMeta()
        ]);
        return {
          match,
          seo
        };
      } catch (e) {
        return null;
      }
    })), __temp = await __temp, __restore(), __temp);
    if ((_g = (_f = data == null ? void 0 : data.value) == null ? void 0 : _f.match) == null ? void 0 : _g[0]) {
      initDataMatch.value = (_h = data == null ? void 0 : data.value) == null ? void 0 : _h.match;
      breadcrumbs.value[0].label = (_j = (_i = data == null ? void 0 : data.value) == null ? void 0 : _i.match) == null ? void 0 : _j[0].competition.name;
      breadcrumbs.value[0].to = ((_m = (_l = (_k = data == null ? void 0 : data.value) == null ? void 0 : _k.match) == null ? void 0 : _l[0]) == null ? void 0 : _m.season_id) ? ROUTERS_OLD.LEAGUES + "/" + ((_o = (_n = data == null ? void 0 : data.value) == null ? void 0 : _n.match) == null ? void 0 : _o[0].competition.id) : ROUTERS_OLD.MATCH + "/" + ((_q = (_p = data == null ? void 0 : data.value) == null ? void 0 : _p.match) == null ? void 0 : _q[0].id);
      breadcrumbs.value[1].label = ((_s = (_r = data == null ? void 0 : data.value) == null ? void 0 : _r.match) == null ? void 0 : _s[0].home_team.name) + " VS " + ((_u = (_t = data == null ? void 0 : data.value) == null ? void 0 : _t.match) == null ? void 0 : _u[0].away_team.name);
      breadcrumbs.value[1].to = ROUTERS_OLD.MATCH + "/" + ((_w = (_v = data == null ? void 0 : data.value) == null ? void 0 : _v.match) == null ? void 0 : _w[0].id);
      setObjectMeta(initDataMatch.value[0], (_x = data.value) == null ? void 0 : _x.seo);
    } else {
      navigateTo($trouter(ROUTERS.HOMEPAGE), { redirectCode: 301 });
    }
    const wssMatch = (socketData2) => {
      try {
        if (socketData2) {
          eventSocketData.value = socketData2;
        }
      } catch (e) {
        return false;
      }
    };
    watch(
      matchStore,
      () => {
        wssMatch(matchStore == null ? void 0 : matchStore.socketData);
      },
      { deep: true, immediate: true }
    );
    useHead({
      title: () => seoMeta.value.title,
      meta: [
        { name: "description", content: () => seoMeta.value.description },
        { property: "og:title", content: () => seoMeta.value.title },
        { property: "og:description", content: () => seoMeta.value.description },
        { name: "keywords", content: () => seoMeta.value.keyword }
      ]
    });
    const handleChangeTab = useDebounceFn(async () => {
      const data2 = await fetchObjectMeta();
      setObjectMeta(initDataMatch.value[0], data2);
    }, 1);
    watch(
      () => route.query.tab,
      () => {
        handleChangeTab();
      }
    );
    watch(
      () => route.query.type,
      () => {
        handleChangeTab();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2;
      const _component_BreadcrumbsLite = _sfc_main$f$1;
      const _component_HeaderComponent = __nuxt_component_1$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_BreadcrumbsLite, { breadcrumbs: unref(breadcrumbs) }, null, _parent));
      _push(`<div id="info" class="${ssrRenderClass([{ container: !unref(isHidden) }, "match-detail"])}"><div id="matchData">`);
      if ((_b2 = (_a2 = unref(initDataMatch)) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.id) {
        _push(ssrRenderComponent(_component_HeaderComponent, {
          modelValue: unref(homeTeamId),
          "onUpdate:modelValue": ($event) => isRef(homeTeamId) ? homeTeamId.value = $event : null,
          "socket-data": unref(eventSocketData),
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (((_d2 = (_c2 = unref(initDataMatch)) == null ? void 0 : _c2[0]) == null ? void 0 : _d2.id) && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).H2H) {
        _push(ssrRenderComponent(H2h, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_f2 = (_e2 = unref(initDataMatch)) == null ? void 0 : _e2[0]) == null ? void 0 : _f2.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(Oddscomp, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_h2 = (_g2 = unref(initDataMatch)) == null ? void 0 : _g2[0]) == null ? void 0 : _h2.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS_1X2 && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(Odds1x2, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_j2 = (_i2 = unref(initDataMatch)) == null ? void 0 : _i2[0]) == null ? void 0 : _j2.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ASIAN_HANDICAP_ODDS && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(_sfc_main$8, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_l2 = (_k2 = unref(initDataMatch)) == null ? void 0 : _k2[0]) == null ? void 0 : _l2.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORNER_OU_ODDS && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(_sfc_main$7, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_n2 = (_m2 = unref(initDataMatch)) == null ? void 0 : _m2[0]) == null ? void 0 : _n2.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORRECT_SCORE_ODDS && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(CorrectScoreOdds, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_p2 = (_o2 = unref(initDataMatch)) == null ? void 0 : _o2[0]) == null ? void 0 : _p2.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).DOUBLE_CHANCE_ODDS && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(DoubleChanceOdds, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_r2 = (_q2 = unref(initDataMatch)) == null ? void 0 : _q2[0]) == null ? void 0 : _r2.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).EURO_HANDICAP_ODDS && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(EuroHandicapOdds, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_t2 = (_s2 = unref(initDataMatch)) == null ? void 0 : _s2[0]) == null ? void 0 : _t2.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).OVER_UNDER_ODDS && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(_sfc_main$3, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_v2 = (_u2 = unref(initDataMatch)) == null ? void 0 : _u2[0]) == null ? void 0 : _v2.id) && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).STATISTICAL) {
        _push(ssrRenderComponent(_sfc_main$1, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          modelValue: unref(homeTeamId),
          "onUpdate:modelValue": ($event) => isRef(homeTeamId) ? homeTeamId.value = $event : null
        }, null, _parent));
      } else if ((_x2 = (_w2 = unref(initDataMatch)) == null ? void 0 : _w2[0]) == null ? void 0 : _x2.id) {
        _push(ssrRenderComponent(Live, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span id="allCornerDate"></span></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/match/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-Dyzhe9lq.mjs.map
