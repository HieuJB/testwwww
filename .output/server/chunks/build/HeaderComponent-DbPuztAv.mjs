import { _ as _export_sfc, e as useRouter, u as useRoute, b as useCookie, f as __nuxt_component_0$2 } from './server.mjs';
import { _ as _sfc_main$1 } from './BaseImage-oG5tRcgk.mjs';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import { g as getConfig } from './helper-CGhdpGxz.mjs';
import { M as MATCH_TAB, a as MATCH_ODD_TAB } from './constants-DJp0NbxW.mjs';
import { useSSRContext, defineComponent, mergeModels, ref, useModel, watch, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode } from 'vue';
import { a as ROUTERS_GROUP, R as ROUTERS, b as ROUTER_TEAM_NAME } from './routers-Dr-sal51.mjs';
import { f as formatDateMomentUTCTimeZone } from './moment_helper-C2kP4D4M.mjs';
import { a as getLiveScoreImage, b as getStatusDisplay } from './livescore_helper-4bdWaxk-.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import { useWindowSize } from '@vueuse/core';

const _sfc_main = /* @__PURE__ */ defineComponent({
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
        var _a2;
        matchIdSlug.value = ((_a2 = route == null ? void 0 : route.params) == null ? void 0 : _a2.id) || "";
      },
      { immediate: true }
    );
    watch(
      () => route == null ? void 0 : route.query,
      () => {
        var _a2, _b2, _c2, _d2, _e2, _f2;
        tab.value = ((_a2 = route == null ? void 0 : route.query) == null ? void 0 : _a2.tab) || "";
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
      var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja;
      if (!((_a2 = initDataMatch.value) == null ? void 0 : _a2[0])) {
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
    };
    watch(
      () => {
        var _a2, _b2;
        return (_b2 = (_a2 = router == null ? void 0 : router.currentRoute) == null ? void 0 : _a2.value) == null ? void 0 : _b2.path;
      },
      () => {
        var _a2, _b2;
        routerUrl.value = (_b2 = (_a2 = router == null ? void 0 : router.currentRoute) == null ? void 0 : _a2.value) == null ? void 0 : _b2.path;
      },
      { deep: true, immediate: true }
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
      props,
      () => {
        var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k;
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
                if (((_b2 = (_a2 = initDataMatch.value) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.id) == matchId) {
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
      var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __;
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_BaseImage = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "mobile-header" }, _attrs))} data-v-d5340dc1><div class="match innerPage" id="match" data-v-d5340dc1><div class="gameBox" data-v-d5340dc1><div class="header" data-v-d5340dc1><div class="gameName" data-v-d5340dc1>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: `${("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).LEAGUES}/${(_c2 = (_b2 = (_a2 = initDataMatch.value) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.competition) == null ? void 0 : _c2.id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bor" data-v-d5340dc1${_scopeId}><span id="wi" data-v-d5340dc1${_scopeId}>${ssrInterpolate(competitionName.value)}</span></div>`);
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
      _push(`<span class="date" id="liveMt" data-v-d5340dc1>${(_a3 = ("formatDateMomentUTCTimeZone" in _ctx ? _ctx.formatDateMomentUTCTimeZone : unref(formatDateMomentUTCTimeZone))(matchTime.value, "DD-MM-yyyy HH:mm - dddd", timeZone.value)) != null ? _a3 : ""}</span></div><div class="match-tools" data-v-d5340dc1><i class="icon iconfont icon-font-collect-off" id="btnOnTop" data-v-d5340dc1></i><i class="shareTop icon iconfont icon-font-share" data-v-d5340dc1></i></div></div><div class="gameInfo" data-v-d5340dc1><div class="home" data-v-d5340dc1><i class="icon iconfont icon-font-collect-off collect" id="btnHomeTeamTop" data-v-d5340dc1></i><div class="icon logo_match" data-v-d5340dc1><div target="_self" class="img_logo_match" data-v-d5340dc1>`);
      if (homeTeamLogo.value) {
        _push(ssrRenderComponent(_component_BaseImage, {
          class: !!((_f2 = (_e2 = (_d2 = initDataMatch.value) == null ? void 0 : _d2[0]) == null ? void 0 : _e2.home_team) == null ? void 0 : _f2.national) ? "p-14" : "p-1",
          src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(homeTeamLogo.value, "team") + "!h80",
          alt: homeTeamName.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="name" data-v-d5340dc1>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${(_i = (_h = (_g = initDataMatch.value) == null ? void 0 : _g[0]) == null ? void 0 : _h.home_team) == null ? void 0 : _i.id}`
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
      _push(`</div></div><div class="vs" data-v-d5340dc1><div id="liveHS" class="hs score" style="${ssrRenderStyle({ "display": "" })}" data-v-d5340dc1>${ssrInterpolate(homeAll.value)}</div><div id="liveGS" class="as score" style="${ssrRenderStyle({ "display": "" })}" data-v-d5340dc1>${ssrInterpolate(awayAll.value)}</div><span id="liveSt" class="status" data-v-d5340dc1>${(_b3 = ("getStatusDisplay" in _ctx ? _ctx.getStatusDisplay : unref(getStatusDisplay))((_j = initDataMatch.value) == null ? void 0 : _j.match, _ctx.$t, timeZone.value)) != null ? _b3 : ""}</span><div id="liveFt" class="FT" style="${ssrRenderStyle({ "display": "none" })}" data-v-d5340dc1>VS</div><div id="liveVS" class="FT xsVS" style="${ssrRenderStyle({})}" data-v-d5340dc1>${(_c3 = ("getStatusDisplay" in _ctx ? _ctx.getStatusDisplay : unref(getStatusDisplay))((_k = initDataMatch.value) == null ? void 0 : _k[0], _ctx.$t, timeZone.value)) != null ? _c3 : ""}</div><div id="liveHt" class="HT" data-v-d5340dc1>(${ssrInterpolate(homeFirst.value)}-${ssrInterpolate(awayFirst.value)})</div>`);
      if (liveStream.value && unref(availableStreamUrl)) {
        _push(ssrRenderComponent(_component_nuxt_link, {
          target: "_blank",
          to: unref(availableStreamUrl) + "?ls-id=" + matchIdLive.value,
          class: "video"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="icon iconfont icon-font-live video" data-v-d5340dc1${_scopeId}></span>`);
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
      _push(`</div><div class="guest" data-v-d5340dc1><i class="icon iconfont icon-font-collect-off collect" id="btnGuestTeamTop" data-v-d5340dc1></i><div class="icon logo_match" data-v-d5340dc1><div target="_self" class="img_logo_match" data-v-d5340dc1>`);
      if (awayTeamLogo.value) {
        _push(ssrRenderComponent(_component_BaseImage, {
          class: !!((_n = (_m = (_l = initDataMatch.value) == null ? void 0 : _l[0]) == null ? void 0 : _m.away_team) == null ? void 0 : _n.national) ? "p-14" : "p-1",
          name: "",
          src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(awayTeamLogo.value, "team") + "!h80",
          alt: awayTeamName.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><span class="name" data-v-d5340dc1>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${(_q = (_p = (_o = initDataMatch.value) == null ? void 0 : _o[0]) == null ? void 0 : _p.away_team) == null ? void 0 : _q.id}`
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
      _push(`</span></div></div><div id="liveHt" class="HT" data-v-d5340dc1>`);
      if (((_s = (_r = initDataMatch.value) == null ? void 0 : _r[0]) == null ? void 0 : _s.home_scores[6]) != 0 || ((_u = (_t = initDataMatch.value) == null ? void 0 : _t[0]) == null ? void 0 : _u.away_scores[6]) != 0) {
        _push(`<span class="explain" id="explain" data-explainlist="90,0-0;;1,0-0;3-0;1" data-v-d5340dc1> 90 ph\xFAt[${ssrInterpolate((_w = (_v = initDataMatch.value) == null ? void 0 : _v[0]) == null ? void 0 : _w.home_scores[0])}-${ssrInterpolate((_y = (_x = initDataMatch.value) == null ? void 0 : _x[0]) == null ? void 0 : _y.away_scores[0])}], 120 ph\xFAt[${ssrInterpolate((_A = (_z = initDataMatch.value) == null ? void 0 : _z[0]) == null ? void 0 : _A.home_scores[5])}-${ssrInterpolate((_C = (_B = initDataMatch.value) == null ? void 0 : _B[0]) == null ? void 0 : _C.away_scores[5])}], ph\u1EA1t \u0111\u1EC1n[${ssrInterpolate((_E = (_D = initDataMatch.value) == null ? void 0 : _D[0]) == null ? void 0 : _E.home_scores[6])}-${ssrInterpolate((_G = (_F = initDataMatch.value) == null ? void 0 : _F[0]) == null ? void 0 : _G.away_scores[6])}] ${ssrInterpolate(((_I = (_H = initDataMatch.value) == null ? void 0 : _H[0]) == null ? void 0 : _I.home_scores[6]) > ((_K = (_J = initDataMatch.value) == null ? void 0 : _J[0]) == null ? void 0 : _K.away_scores[6]) ? homeTeamName.value + " Th\u1EAFng" : awayTeamName.value + " Th\u1EAFng")}</span>`);
      } else if (((_M = (_L = initDataMatch.value) == null ? void 0 : _L[0]) == null ? void 0 : _M.home_scores[5]) != 0 || ((_O = (_N = initDataMatch.value) == null ? void 0 : _N[0]) == null ? void 0 : _O.away_scores[5]) != 0) {
        _push(`<span class="explain" id="explain" data-explainlist="90,0-0;;1,0-0;3-0;1" data-v-d5340dc1> 90 ph\xFAt[${ssrInterpolate((_Q = (_P = initDataMatch.value) == null ? void 0 : _P[0]) == null ? void 0 : _Q.home_scores[0])}-${ssrInterpolate((_S = (_R = initDataMatch.value) == null ? void 0 : _R[0]) == null ? void 0 : _S.away_scores[0])}], 120 ph\xFAt[${ssrInterpolate((_U = (_T = initDataMatch.value) == null ? void 0 : _T[0]) == null ? void 0 : _U.home_scores[5])}-${ssrInterpolate((_W = (_V = initDataMatch.value) == null ? void 0 : _V[0]) == null ? void 0 : _W.away_scores[5])}], ${ssrInterpolate(((_Y = (_X = initDataMatch.value) == null ? void 0 : _X[0]) == null ? void 0 : _Y.home_scores[5]) > ((__ = (_Z = initDataMatch.value) == null ? void 0 : _Z[0]) == null ? void 0 : __.away_scores[5]) ? homeTeamName.value + " Th\u1EAFng" : awayTeamName.value + " Th\u1EAFng")}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><nav class="detailMenu peerBox" data-v-d5340dc1>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: ["item d-flex justify-content-center align-items-center", tab.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).DETAIL || tab.value === "" ? "on" : ""],
        to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).DETAIL } }
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
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: ["item d-flex justify-content-center align-items-center", tab.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).H2H ? "on" : ""],
        to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).H2H } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Ph\xE2n t\xEDch`);
          } else {
            return [
              createTextVNode("Ph\xE2n t\xEDch")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: ["item d-flex justify-content-center align-items-center", tab.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS ? "on" : ""],
        to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`T\u1EF7 l\u1EC7`);
          } else {
            return [
              createTextVNode("T\u1EF7 l\u1EC7")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: ["item d-flex justify-content-center align-items-center", tab.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).STATISTICAL ? "on" : ""],
        to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).STATISTICAL } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(width) > 768 ? "Th\u1ED1ng k\xEA c\u1EA7u th\u1EE7" : "TK C\u1EA7u th\u1EE7")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(width) > 768 ? "Th\u1ED1ng k\xEA c\u1EA7u th\u1EE7" : "TK C\u1EA7u th\u1EE7"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="tabs_box" id="subMenu" style="${ssrRenderStyle({ "display": "none" })}" data-v-d5340dc1><ul class="tabs_group" data-v-d5340dc1></ul></div>`);
      if (tab.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(`<div class="match-odds-menu" data-v-d5340dc1><div class="d-flex" data-v-d5340dc1>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`T\u1EF7 l\u1EC7 3in1`);
            } else {
              return [
                createTextVNode("T\u1EF7 l\u1EC7 3in1")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ASIAN_HANDICAP_ODDS } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ASIAN_HANDICAP_ODDS ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`T\u1EF7 l\u1EC7 ch\xE2u \xC1`);
            } else {
              return [
                createTextVNode("T\u1EF7 l\u1EC7 ch\xE2u \xC1")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).OVER_UNDER_ODDS } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).OVER_UNDER_ODDS ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`T\u1EF7 l\u1EC7 t\xE0i x\u1EC9u`);
            } else {
              return [
                createTextVNode("T\u1EF7 l\u1EC7 t\xE0i x\u1EC9u")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS_1X2 } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS_1X2 ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`1x2`);
            } else {
              return [
                createTextVNode("1x2")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORNER_OU_ODDS } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORNER_OU_ODDS ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`K\xE8o ph\u1EA1t g\xF3c T/X`);
            } else {
              return [
                createTextVNode("K\xE8o ph\u1EA1t g\xF3c T/X")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORRECT_SCORE_ODDS } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORRECT_SCORE_ODDS ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u0110i\u1EC3m s\u1ED1 ch\xEDnh x\xE1c`);
            } else {
              return [
                createTextVNode("\u0110i\u1EC3m s\u1ED1 ch\xEDnh x\xE1c")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).EURO_HANDICAP_ODDS } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).EURO_HANDICAP_ODDS ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Euro Handicap`);
            } else {
              return [
                createTextVNode("Euro Handicap")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).DOUBLE_CHANCE_ODDS } },
          class: type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).DOUBLE_CHANCE_ODDS ? "on" : ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`C\u01A1 h\u1ED9i k\xE9p`);
            } else {
              return [
                createTextVNode("C\u01A1 h\u1ED9i k\xE9p")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="tabsBox ms-3" style="${ssrRenderStyle(type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP || type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ASIAN_HANDICAP_ODDS || type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).OVER_UNDER_ODDS || type.value === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORNER_OU_ODDS ? null : { display: "none" })}" data-v-d5340dc1><div id="ftBtn" class="${ssrRenderClass([!isHaft.value ? "on" : "", "item"])}" data-v-d5340dc1>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: tab.value, type: type.value, haft: 0 } }
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
        _push(`</div><div id="htBtn" class="${ssrRenderClass([isHaft.value ? "on" : "", "item"])}" data-v-d5340dc1>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + matchIdSlug.value, query: { tab: tab.value, type: type.value, haft: 1 } }
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeaderComponent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d5340dc1"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=HeaderComponent-DbPuztAv.mjs.map
