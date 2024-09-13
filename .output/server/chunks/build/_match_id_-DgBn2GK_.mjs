import { _ as __nuxt_component_0 } from './server-placeholder-BFzIFO-1.mjs';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import { _ as _export_sfc, u as useRoute, b as useCookie } from './server.mjs';
import { O as ODD_COMPANY_DEFAULT, b as ODD_COMPANYS } from './constants-DJp0NbxW.mjs';
import { useSSRContext, defineComponent, mergeModels, ref, useModel, reactive, watch, withAsyncContext, unref, nextTick } from 'vue';
import { A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { p as getOddNumber, A as getOddChange, x as getDataObjectByList, n as getDataObject, C as getOddOfData } from './livescore_helper-4bdWaxk-.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { t as timeStamp2DateUTCTimeZone } from './moment_helper-C2kP4D4M.mjs';
import { ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { useIntersectionObserver, useWindowScroll } from '@vueuse/core';
import { u as useMatchStore } from './useMatchStore-Dgc_MSrX.mjs';
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
import './helper-CGhdpGxz.mjs';
import 'crypto-js';
import 'pako';
import 'buffer';
import './fetch-CC0zbYw2.mjs';
import './createUrl-DyOxdY5I.mjs';
import 'moment-timezone';

const _imports_0 = publicAssetsURL("/img/ss.png");
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
    fetchOdds(matchIdSlug.value);
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb, _cb, _db, _eb, _fb, _gb, _hb, _ib, _jb, _kb, _lb, _mb, _nb, _ob, _pb, _qb, _rb, _sb, _tb, _ub, _vb, _wb, _xb, _yb, _zb, _Ab, _Bb, _Cb, _Db, _Eb, _Fb, _Gb, _Hb, _Ib, _Jb, _Kb, _Lb, _Mb, _Nb, _Ob, _Pb, _Qb, _Rb, _Sb, _Tb, _Ub, _Vb, _Wb, _Xb, _Yb, _Zb, __b, _$b, _ac, _bc, _cc;
      const _component_PopupOddsChange = __nuxt_component_0;
      _push(`<!--[--><div id="" class="" data-v-8d2b4f5b><div id="odds-main" data-v-8d2b4f5b><div class="nav_select" style="${ssrRenderStyle({ "margin-top": "7px", "display": "none" })}" data-v-8d2b4f5b><span class="sbtn2" data-v-8d2b4f5b><a id="a_solutions" data-v-8d2b4f5b> Nh\xE0 c\xE1i t\xF9y ch\u1EC9nh </a></span><span class="sbtn" data-v-8d2b4f5b>\u1EA8n </span><span class="sbtn" data-v-8d2b4f5b>L\u1EF1a ch\u1ECDn</span><span class="sbtn" data-v-8d2b4f5b><span class="sbtn2 sel" data-v-8d2b4f5b><a id="choose" data-v-8d2b4f5b>Live</a><select name="sel_showType" id="sel_showType" style="${ssrRenderStyle({ "border": "none" })}" data-v-8d2b4f5b><option value="1" data-v-8d2b4f5b> T\u1EA5t c\u1EA3</option><option value="2" data-v-8d2b4f5b>S\u1EDBm</option><option value="3" selected="selected" data-v-8d2b4f5b>Live</option></select></span></span><span class="sbtn" data-v-8d2b4f5b>L\u1ECDc</span><span style="${ssrRenderStyle({ "color": "#fff" })}" data-v-8d2b4f5b><div style="${ssrRenderStyle({ "float": "left", "padding-left": "20px", "cursor": "default" })}" id="divNumCount" data-v-8d2b4f5b>T\u1ED5ng[ <b data-v-8d2b4f5b>173</b>/173]Nh\xE0 c\xE1i </div><span style="${ssrRenderStyle({ "float": "left", "color": "#FF0", "cursor": "pointer", "padding-left": "6px" })}" data-v-8d2b4f5b>[Hi\u1EC7n th\u1ECB]</span></span></div><div style="${ssrRenderStyle({ "left": "auto" })}" id="divHeadFloat" class="" data-v-8d2b4f5b><div class="oddDivBox" data-v-8d2b4f5b><div class="twin" id="div_companySelect" data-v-8d2b4f5b><table width="100%" cellspacing="0" cellpadding="0" class="tgs2" data-v-8d2b4f5b><tbody data-v-8d2b4f5b><tr data-v-8d2b4f5b><td data-v-8d2b4f5b><a data-v-8d2b4f5b>T\u1EA5t c\u1EA3</a></td></tr><tr data-v-8d2b4f5b><td data-v-8d2b4f5b><a data-v-8d2b4f5b>Nh\xE0 c\xE1i hot</a></td></tr><tr data-v-8d2b4f5b><td data-v-8d2b4f5b><a data-v-8d2b4f5b>Trao \u0111\u1ED5i c\xE1 c\u01B0\u1EE3c</a></td></tr><tr data-v-8d2b4f5b><td data-v-8d2b4f5b><a data-v-8d2b4f5b>Kh\xF4ng ph\u1EA3i trao \u0111\u1ED5i c\xE1 c\u01B0\u1EE3c</a></td></tr></tbody></table></div><div class="rankbox" data-v-8d2b4f5b><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-8d2b4f5b><tbody data-v-8d2b4f5b><tr class="tb-bgcolor" data-v-8d2b4f5b><th width="22" rowspan="1" class="lb rb" data-v-8d2b4f5b><input type="checkbox" name="chkall" id="chkall" data-v-8d2b4f5b></th><th colspan="2" rowspan="1" data-v-8d2b4f5b><span class="sbtn3" style="${ssrRenderStyle({ "float": "left", "text-align": "left" })}" id="a_companySelect" data-v-8d2b4f5b>Nh\xE0 c\xE1i</span></th></tr><!--[-->`);
      ssrRenderList(oddsEuropean.value, (item, index) => {
        _push(`<!--[--><tr class="tr-title" data-v-8d2b4f5b><td width="25" rowspan="2" class="lb rb" data-v-8d2b4f5b><input type="checkbox" name="Show" value="0" data-v-8d2b4f5b></td><td width="185" rowspan="2" class="rb" style="${ssrRenderStyle({ "text-align": "left", "padding-left": "4px" })}" data-v-8d2b4f5b><span class="flex ms-2" data-v-8d2b4f5b><span data-v-8d2b4f5b>${ssrInterpolate(item == null ? void 0 : item.company_name)}</span></span></td></tr><tr data-v-8d2b4f5b><th data-v-8d2b4f5b></th><th data-v-8d2b4f5b></th></tr><!--]-->`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata" width="75%" id="dataList" data-v-8d2b4f5b><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" id="oddsList_tab" data-v-8d2b4f5b><tbody data-v-8d2b4f5b><tr class="tb-bgcolor" data-v-8d2b4f5b><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>Ch\u1EE7</b></th><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>H\xF2a</b></th><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>Kh\xE1ch</b></th><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>Ch\u1EE7%</b></th><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>H%</b></th><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>Kh\xE1ch%</b></th><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>Ho\xE0n v\u1ED1n%</b></th><th width="5%" colspan="3" data-v-8d2b4f5b><b data-v-8d2b4f5b>Ti\xEAu chu\u1EA9n Kelly</b></th><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>L\u1EA7n thay \u0111\u1ED5i cu\u1ED1i c\xF9ng</b></th><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>Xem th\xEAm</b></th></tr><!--[-->`);
      ssrRenderList(oddsEuropean.value, (item, index) => {
        var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2, _y2, _z2, _A2, _B2, _C2, _D2, _E2, _F2, _G2, _H2, _I2, _J2, _K2, _L2, _M2, _N2, _O2, _P2, _Q2, _R2, _S2, _T2, _U2, _V2, _W2, _X2, _Y2, _Z2, __2, _$2, _aa2, _ba2, _ca2, _da2, _ea2, _fa2, _ga2, _ha2, _ia2, _ja2, _ka2, _la2, _ma2, _na2, _oa2, _pa2, _qa2, _ra2, _sa2, _ta2, _ua2, _va2, _wa2, _xa2;
        _push(`<!--[--><tr id="oddstr_474" data-v-8d2b4f5b><td width="75" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-8d2b4f5b><span name="oddsData" data-v-8d2b4f5b>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_b3 = (_a3 = item == null ? void 0 : item.odds_init) == null ? void 0 : _a3.odds) == null ? void 0 : _b3[0]))}</span></td><td width="75" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-8d2b4f5b><span name="oddsData" data-v-8d2b4f5b>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_d2 = (_c2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _c2.odds) == null ? void 0 : _d2[1]))}</span></td><td width="75" class="rb" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-8d2b4f5b><span name="oddsData" data-v-8d2b4f5b>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_f2 = (_e2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _e2.odds) == null ? void 0 : _f2[2]))}</span></td><td width="75" data-v-8d2b4f5b>${ssrInterpolate((_i2 = (_h2 = (_g2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _g2.odds) == null ? void 0 : _h2[3]) == null ? void 0 : _i2.toFixed(2))}</td><td width="75" data-v-8d2b4f5b>${ssrInterpolate((_l2 = (_k2 = (_j2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _j2.odds) == null ? void 0 : _k2[4]) == null ? void 0 : _l2.toFixed(2))}</td><td width="75" data-v-8d2b4f5b>${ssrInterpolate((_o2 = (_n2 = (_m2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _m2.odds) == null ? void 0 : _n2[5]) == null ? void 0 : _o2.toFixed(2))}</td><td width="75" class="rb" data-v-8d2b4f5b>${ssrInterpolate((_r2 = (_q2 = (_p2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _p2.odds) == null ? void 0 : _q2[6]) == null ? void 0 : _r2.toFixed(2))}</td><td width="75" rowspan="2" class="${ssrRenderClass(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_t2 = (_s2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _s2.odds) == null ? void 0 : _t2[0]) * ((_u2 = avg_live.value) == null ? void 0 : _u2[3]) / 100 >= 1 ? "red" : "")}" data-v-8d2b4f5b>${ssrInterpolate((("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_w2 = (_v2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _v2.odds) == null ? void 0 : _w2[0]) * ((_x2 = avg_live.value) == null ? void 0 : _x2[3]) / 100).toFixed(2))}</td><td width="75" rowspan="2" class="${ssrRenderClass(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_z2 = (_y2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _y2.odds) == null ? void 0 : _z2[1]) * ((_A2 = avg_live.value) == null ? void 0 : _A2[4]) / 100 >= 1 ? "red" : "")}" data-v-8d2b4f5b>${ssrInterpolate((("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_C2 = (_B2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _B2.odds) == null ? void 0 : _C2[1]) * ((_D2 = avg_live.value) == null ? void 0 : _D2[4]) / 100).toFixed(2))}</td><td width="75" rowspan="2" class="${ssrRenderClass([("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_F2 = (_E2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _E2.odds) == null ? void 0 : _F2[2]) * ((_G2 = avg_live.value) == null ? void 0 : _G2[5]) / 100 >= 1 ? "red" : "", "rb"])}" data-v-8d2b4f5b>${ssrInterpolate((("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_I2 = (_H2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _H2.odds) == null ? void 0 : _I2[2]) * ((_J2 = avg_live.value) == null ? void 0 : _J2[5]) / 100).toFixed(2))}</td><td rowspan="2" class="rb time" data-v-8d2b4f5b><span name="timeData" data-v-8d2b4f5b>${ssrInterpolate(("timeStamp2DateUTCTimeZone" in _ctx ? _ctx.timeStamp2DateUTCTimeZone : unref(timeStamp2DateUTCTimeZone))((_L2 = (_K2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _K2[0]) == null ? void 0 : _L2.update_time, "MM/DD HH:mm", timeZone.value))}</span></td><td width="40" rowspan="2" class="rb" data-v-8d2b4f5b><img${ssrRenderAttr("src", _imports_0)} width="20" height="20" data-v-8d2b4f5b></td></tr><tr data-v-8d2b4f5b><td style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-8d2b4f5b><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_O2 = (_N2 = (_M2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _M2[0]) == null ? void 0 : _N2.odds) == null ? void 0 : _O2[0], (_Q2 = (_P2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _P2.odds) == null ? void 0 : _Q2[0]))}" data-v-8d2b4f5b>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_T2 = (_S2 = (_R2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _R2[0]) == null ? void 0 : _S2.odds) == null ? void 0 : _T2[0]))}</span></td><td style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-8d2b4f5b><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_W2 = (_V2 = (_U2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _U2[0]) == null ? void 0 : _V2.odds) == null ? void 0 : _W2[1], (_Y2 = (_X2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _X2.odds) == null ? void 0 : _Y2[1]))}" data-v-8d2b4f5b>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_$2 = (__2 = (_Z2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _Z2[0]) == null ? void 0 : __2.odds) == null ? void 0 : _$2[1]))}</span></td><td class="rb" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-8d2b4f5b><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_ca2 = (_ba2 = (_aa2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _aa2[0]) == null ? void 0 : _ba2.odds) == null ? void 0 : _ca2[2], (_ea2 = (_da2 = item == null ? void 0 : item.odds_init) == null ? void 0 : _da2.odds) == null ? void 0 : _ea2[2]))}" data-v-8d2b4f5b>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_ha2 = (_ga2 = (_fa2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _fa2[0]) == null ? void 0 : _ga2.odds) == null ? void 0 : _ha2[2]))}</span></td><td data-v-8d2b4f5b>${ssrInterpolate((_la2 = (_ka2 = (_ja2 = (_ia2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _ia2[0]) == null ? void 0 : _ja2.odds) == null ? void 0 : _ka2[3]) == null ? void 0 : _la2.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate((_pa2 = (_oa2 = (_na2 = (_ma2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _ma2[0]) == null ? void 0 : _na2.odds) == null ? void 0 : _oa2[4]) == null ? void 0 : _pa2.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate((_ta2 = (_sa2 = (_ra2 = (_qa2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _qa2[0]) == null ? void 0 : _ra2.odds) == null ? void 0 : _sa2[5]) == null ? void 0 : _ta2.toFixed(2))}</td><td class="rb" data-v-8d2b4f5b>${ssrInterpolate((_xa2 = (_wa2 = (_va2 = (_ua2 = item == null ? void 0 : item.odds_live) == null ? void 0 : _ua2[0]) == null ? void 0 : _va2.odds) == null ? void 0 : _wa2[6]) == null ? void 0 : _xa2.toFixed(2))}</td></tr><!--]-->`);
      });
      _push(`<!--]--></tbody></table></div></div><p data-v-8d2b4f5b></p></div></div><div id="divFooterFload" class="${ssrRenderClass(!isShowDivnotes.value ? "oddfooterDiv" : "")}" data-v-8d2b4f5b><input type="checkbox" name="inputFloat" id="inputFloat" style="${ssrRenderStyle({ "display": "none" })}" data-v-8d2b4f5b><div class="oddDivBox" style="${ssrRenderStyle({ "z-index": "194" })}" data-v-8d2b4f5b><div class="rankbox" data-v-8d2b4f5b><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-8d2b4f5b><tbody data-v-8d2b4f5b><tr class="f_odds bl" data-v-8d2b4f5b><th width="208" class="lb rb" data-v-8d2b4f5b>\xA0</th></tr><tr id="highFObj" data-v-8d2b4f5b><td width="208" class="gbg lb rb" data-v-8d2b4f5b>T\u1EF7 l\u1EC7 ban \u0111\u1EA7u cao nh\u1EA5t</td></tr><tr id="highFObj" data-v-8d2b4f5b><td width="208" class="gbg lb rb" data-v-8d2b4f5b>T\u1EF7 l\u1EC7 cao nh\u1EA5t</td></tr><tr id="highFObj" data-v-8d2b4f5b><td width="208" class="gbg lb rb" data-v-8d2b4f5b>T\u1EF7 l\u1EC7 ban \u0111\u1EA7u th\u1EA5p nh\u1EA5t</td></tr><tr id="highFObj" data-v-8d2b4f5b><td width="208" class="gbg lb rb" data-v-8d2b4f5b>T\u1EF7 l\u1EC7 th\u1EA5p nh\u1EA5t</td></tr><tr id="highFObj" data-v-8d2b4f5b><td width="208" class="gbg lb rb" data-v-8d2b4f5b>T\u1EF7 l\u1EC7 ban \u0111\u1EA7u trung b\xECnh</td></tr><tr id="highFObj" data-v-8d2b4f5b><td width="208" class="gbg lb rb" data-v-8d2b4f5b>T\u1EF7 l\u1EC7 trung b\xECnh </td></tr></tbody></table><div class="rankdata" width="75%" id="dataList" data-v-8d2b4f5b><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" id="oddsList_tab" data-v-8d2b4f5b><tbody data-v-8d2b4f5b><tr class="tb-bgcolor" data-v-8d2b4f5b><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>Ch\u1EE7</b></th><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>H\xF2a</b></th><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>Kh\xE1ch</b></th><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>Ch\u1EE7%</b></th><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>H%</b></th><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>Kh\xE1ch%</b></th><th width="5%" data-v-8d2b4f5b><b data-v-8d2b4f5b>H. v\u1ED1n%</b></th><th width="5%" colspan="3" data-v-8d2b4f5b><b data-v-8d2b4f5b>Ti\xEAu chu\u1EA9n Kelly</b></th><th width="5%" data-v-8d2b4f5b><b style="${ssrRenderStyle({ "color": "#f5f5f5" })}" data-v-8d2b4f5b>L\u1EA7n thay</b></th><th width="5%" data-v-8d2b4f5b><b style="${ssrRenderStyle({ "color": "#f5f5f5" })}" data-v-8d2b4f5b>Xem th\xEAm</b></th></tr><tr id="highFObj" data-v-8d2b4f5b><td name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_a2 = max_init.value) == null ? void 0 : _a2[0])}</td><td name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_b2 = max_init.value) == null ? void 0 : _b2[1])}</td><td class="rb" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_c = max_init.value) == null ? void 0 : _c[2])}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_d = max_init.value) == null ? void 0 : _d[3]) ? "" : (_f = (_e = max_init.value) == null ? void 0 : _e[3]) == null ? void 0 : _f.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_g = max_init.value) == null ? void 0 : _g[4]) ? "" : (_i = (_h = max_init.value) == null ? void 0 : _h[4]) == null ? void 0 : _i.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_j = max_init.value) == null ? void 0 : _j[5]) ? "" : (_l = (_k = max_init.value) == null ? void 0 : _k[5]) == null ? void 0 : _l.toFixed(2))}</td><td class="rb" data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_m = max_init.value) == null ? void 0 : _m[6]) ? "" : (_o = (_n = max_init.value) == null ? void 0 : _n[6]) == null ? void 0 : _o.toFixed(2))}</td><td rowspan="2" class="${ssrRenderClass(((_p = max_live.value) == null ? void 0 : _p[0]) * ((_q = avg_live.value) == null ? void 0 : _q[3]) / 100 >= 1 ? "red" : "")}" data-v-8d2b4f5b>${ssrInterpolate(((_r = max_live.value) == null ? void 0 : _r[0]) * ((_s = avg_live.value) == null ? void 0 : _s[3]) / 100 ? (((_t = max_live.value) == null ? void 0 : _t[0]) * ((_u = avg_live.value) == null ? void 0 : _u[3]) / 100).toFixed(2) : "")}</td><td rowspan="2" class="${ssrRenderClass(((_v = max_live.value) == null ? void 0 : _v[1]) * ((_w = avg_live.value) == null ? void 0 : _w[4]) / 100 >= 1 ? "red" : "")}" data-v-8d2b4f5b>${ssrInterpolate(((_x = max_live.value) == null ? void 0 : _x[1]) * ((_y = avg_live.value) == null ? void 0 : _y[4]) / 100 ? (((_z = max_live.value) == null ? void 0 : _z[1]) * ((_A = avg_live.value) == null ? void 0 : _A[4]) / 100).toFixed(2) : "")}</td><td rowspan="2" class="${ssrRenderClass([((_B = max_live.value) == null ? void 0 : _B[2]) * ((_C = avg_live.value) == null ? void 0 : _C[5]) / 100 >= 1 ? "red" : "", "rb"])}" data-v-8d2b4f5b>${ssrInterpolate(((_D = max_live.value) == null ? void 0 : _D[2]) * ((_E = avg_live.value) == null ? void 0 : _E[5]) / 100 ? (((_F = max_live.value) == null ? void 0 : _F[2]) * ((_G = avg_live.value) == null ? void 0 : _G[5]) / 100).toFixed(2) : "")}</td><td class="rb" rowspan="2" colspan="2" data-v-8d2b4f5b>\xA0</td></tr><tr id="highRObj" data-v-8d2b4f5b><td data-v-8d2b4f5b><span class="down2" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_H = max_live.value) == null ? void 0 : _H[0])}</span></td><td data-v-8d2b4f5b><span class="up2" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_I = max_live.value) == null ? void 0 : _I[1])}</span></td><td class="rb" data-v-8d2b4f5b><span class="up2" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_J = max_live.value) == null ? void 0 : _J[2])}</span></td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_K = max_live.value) == null ? void 0 : _K[3]) ? "" : (_M = (_L = max_live.value) == null ? void 0 : _L[3]) == null ? void 0 : _M.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_N = max_live.value) == null ? void 0 : _N[4]) ? "" : (_P = (_O = max_live.value) == null ? void 0 : _O[4]) == null ? void 0 : _P.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_Q = max_live.value) == null ? void 0 : _Q[5]) ? "" : (_S = (_R = max_live.value) == null ? void 0 : _R[5]) == null ? void 0 : _S.toFixed(2))}</td><td class="rb" data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_T = max_live.value) == null ? void 0 : _T[6]) ? "" : (_V = (_U = max_live.value) == null ? void 0 : _U[6]) == null ? void 0 : _V.toFixed(2))}</td></tr><tr id="lowFObj" style="${ssrRenderStyle({ "text-align": "center" })}" data-v-8d2b4f5b><td name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_W = min_init.value) == null ? void 0 : _W[0])}</td><td name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_X = min_init.value) == null ? void 0 : _X[1])}</td><td class="rb" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_Y = min_init.value) == null ? void 0 : _Y[2])}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_Z = min_init.value) == null ? void 0 : _Z[3]) ? "" : (_$ = (__ = min_init.value) == null ? void 0 : __[3]) == null ? void 0 : _$.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_aa = min_init.value) == null ? void 0 : _aa[4]) ? "" : (_ca = (_ba = min_init.value) == null ? void 0 : _ba[4]) == null ? void 0 : _ca.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_da = min_init.value) == null ? void 0 : _da[5]) ? "" : (_fa = (_ea = min_init.value) == null ? void 0 : _ea[5]) == null ? void 0 : _fa.toFixed(2))}</td><td class="rb" data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_ga = min_init.value) == null ? void 0 : _ga[6]) ? "" : (_ia = (_ha = min_init.value) == null ? void 0 : _ha[6]) == null ? void 0 : _ia.toFixed(2))}</td><td rowspan="2" class="${ssrRenderClass(((_ja = min_live.value) == null ? void 0 : _ja[0]) * ((_ka = avg_live.value) == null ? void 0 : _ka[3]) / 100 >= 1 ? "red" : "")}" data-v-8d2b4f5b>${ssrInterpolate(((_la = min_live.value) == null ? void 0 : _la[0]) * ((_ma = avg_live.value) == null ? void 0 : _ma[3]) / 100 ? (((_na = min_live.value) == null ? void 0 : _na[0]) * ((_oa = avg_live.value) == null ? void 0 : _oa[3]) / 100).toFixed(2) : "")}</td><td rowspan="2" class="${ssrRenderClass(((_pa = min_live.value) == null ? void 0 : _pa[1]) * ((_qa = avg_live.value) == null ? void 0 : _qa[4]) / 100 >= 1 ? "red" : "")}" data-v-8d2b4f5b>${ssrInterpolate(((_ra = min_live.value) == null ? void 0 : _ra[1]) * ((_sa = avg_live.value) == null ? void 0 : _sa[4]) / 100 ? (((_ta = min_live.value) == null ? void 0 : _ta[1]) * ((_ua = avg_live.value) == null ? void 0 : _ua[4]) / 100).toFixed(2) : "")}</td><td rowspan="2" class="${ssrRenderClass([((_va = min_live.value) == null ? void 0 : _va[2]) * ((_wa = avg_live.value) == null ? void 0 : _wa[5]) / 100 >= 1 ? "red" : "", "rb"])}" data-v-8d2b4f5b>${ssrInterpolate(((_xa = min_live.value) == null ? void 0 : _xa[2]) * ((_ya = avg_live.value) == null ? void 0 : _ya[5]) / 100 ? (((_za = min_live.value) == null ? void 0 : _za[2]) * ((_Aa = avg_live.value) == null ? void 0 : _Aa[5]) / 100).toFixed(2) : "")}</td><td class="rb" rowspan="2" colspan="2" data-v-8d2b4f5b>\xA0</td></tr><tr id="lowRObj" data-v-8d2b4f5b><td data-v-8d2b4f5b><span class="down2" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_Ba = min_live.value) == null ? void 0 : _Ba[0])}</span></td><td data-v-8d2b4f5b><span class="up2" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_Ca = min_live.value) == null ? void 0 : _Ca[1])}</span></td><td class="rb" data-v-8d2b4f5b><span class="up2" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_Da = min_live.value) == null ? void 0 : _Da[2])}</span></td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_Ea = min_live.value) == null ? void 0 : _Ea[3]) ? "" : (_Ga = (_Fa = min_live.value) == null ? void 0 : _Fa[3]) == null ? void 0 : _Ga.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_Ha = min_live.value) == null ? void 0 : _Ha[4]) ? "" : (_Ja = (_Ia = min_live.value) == null ? void 0 : _Ia[4]) == null ? void 0 : _Ja.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_Ka = min_live.value) == null ? void 0 : _Ka[5]) ? "" : (_Ma = (_La = min_live.value) == null ? void 0 : _La[5]) == null ? void 0 : _Ma.toFixed(2))}</td><td class="rb" data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_Na = min_live.value) == null ? void 0 : _Na[6]) ? "" : (_Pa = (_Oa = min_live.value) == null ? void 0 : _Oa[6]) == null ? void 0 : _Pa.toFixed(2))}</td></tr><tr id="avgFObj" style="${ssrRenderStyle({ "text-align": "center" })}" data-v-8d2b4f5b><td name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_Ra = (_Qa = avg_init.value) == null ? void 0 : _Qa[0]) == null ? void 0 : _Ra.toFixed(2))}</td><td name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_Ta = (_Sa = avg_init.value) == null ? void 0 : _Sa[1]) == null ? void 0 : _Ta.toFixed(2))}</td><td class="rb" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_Va = (_Ua = avg_init.value) == null ? void 0 : _Ua[2]) == null ? void 0 : _Va.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_Wa = avg_init.value) == null ? void 0 : _Wa[3]) ? "" : (_Ya = (_Xa = avg_init.value) == null ? void 0 : _Xa[3]) == null ? void 0 : _Ya.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_Za = avg_init.value) == null ? void 0 : _Za[4]) ? "" : (_$a = (__a = avg_init.value) == null ? void 0 : __a[4]) == null ? void 0 : _$a.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_ab = avg_init.value) == null ? void 0 : _ab[5]) ? "" : (_cb = (_bb = avg_init.value) == null ? void 0 : _bb[5]) == null ? void 0 : _cb.toFixed(2))}</td><td class="rb" data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_db = avg_init.value) == null ? void 0 : _db[6]) ? "" : (_fb = (_eb = avg_init.value) == null ? void 0 : _eb[6]) == null ? void 0 : _fb.toFixed(2))}</td><td rowspan="2" class="${ssrRenderClass(((_gb = avg_live.value) == null ? void 0 : _gb[0]) * ((_hb = avg_live.value) == null ? void 0 : _hb[3]) / 100 >= 1 ? "red" : "")}" data-v-8d2b4f5b>${ssrInterpolate(((_ib = avg_live.value) == null ? void 0 : _ib[0]) * ((_jb = avg_live.value) == null ? void 0 : _jb[3]) / 100 ? (((_kb = avg_live.value) == null ? void 0 : _kb[0]) * ((_lb = avg_live.value) == null ? void 0 : _lb[3]) / 100).toFixed(2) : "")}</td><td rowspan="2" class="${ssrRenderClass(((_mb = avg_live.value) == null ? void 0 : _mb[1]) * ((_nb = avg_live.value) == null ? void 0 : _nb[4]) / 100 >= 1 ? "red" : "")}" data-v-8d2b4f5b>${ssrInterpolate(((_ob = avg_live.value) == null ? void 0 : _ob[1]) * ((_pb = avg_live.value) == null ? void 0 : _pb[4]) / 100 ? (((_qb = avg_live.value) == null ? void 0 : _qb[1]) * ((_rb = avg_live.value) == null ? void 0 : _rb[4]) / 100).toFixed(2) : "")}</td><td rowspan="2" class="${ssrRenderClass([((_sb = avg_live.value) == null ? void 0 : _sb[2]) * ((_tb = avg_live.value) == null ? void 0 : _tb[5]) / 100 >= 1 ? "red" : "", "rb"])}" data-v-8d2b4f5b>${ssrInterpolate(((_ub = avg_live.value) == null ? void 0 : _ub[2]) * ((_vb = avg_live.value) == null ? void 0 : _vb[5]) / 100 ? (((_wb = avg_live.value) == null ? void 0 : _wb[2]) * ((_xb = avg_live.value) == null ? void 0 : _xb[5]) / 100).toFixed(2) : "")}</td><td class="rb" rowspan="2" colspan="2" data-v-8d2b4f5b>\xA0</td></tr><tr id="avgRObj" data-v-8d2b4f5b><td data-v-8d2b4f5b><span class="down2" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_zb = (_yb = avg_live.value) == null ? void 0 : _yb[0]) == null ? void 0 : _zb.toFixed(2))}</span></td><td data-v-8d2b4f5b><span class="up2" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_Bb = (_Ab = avg_live.value) == null ? void 0 : _Ab[1]) == null ? void 0 : _Bb.toFixed(2))}</span></td><td class="rb" data-v-8d2b4f5b><span class="up2" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate((_Db = (_Cb = avg_live.value) == null ? void 0 : _Cb[2]) == null ? void 0 : _Db.toFixed(2))}</span></td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_Eb = avg_live.value) == null ? void 0 : _Eb[3]) ? "" : (_Gb = (_Fb = avg_live.value) == null ? void 0 : _Fb[3]) == null ? void 0 : _Gb.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_Hb = avg_live.value) == null ? void 0 : _Hb[4]) ? "" : (_Jb = (_Ib = avg_live.value) == null ? void 0 : _Ib[4]) == null ? void 0 : _Jb.toFixed(2))}</td><td data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_Kb = avg_live.value) == null ? void 0 : _Kb[5]) ? "" : (_Mb = (_Lb = avg_live.value) == null ? void 0 : _Lb[5]) == null ? void 0 : _Mb.toFixed(2))}</td><td class="rb" data-v-8d2b4f5b>${ssrInterpolate(Number.isNaN((_Nb = avg_live.value) == null ? void 0 : _Nb[6]) ? "" : (_Pb = (_Ob = avg_live.value) == null ? void 0 : _Ob[6]) == null ? void 0 : _Pb.toFixed(2))}</td></tr></tbody></table></div></div></div></div><div id="divnotes" style="${ssrRenderStyle({ "margin": "0 auto", "width": "100%", "background-color": "#FFF", "text-align": "center" })}" data-v-8d2b4f5b><table width="100%" cellspacing="0" cellpadding="1" class="tcenter" style="${ssrRenderStyle({ "line-height": "22px" })}" id="helptxt" data-v-8d2b4f5b><tbody data-v-8d2b4f5b><tr data-v-8d2b4f5b><td colspan="13" bgcolor="#F7F7F7" class="lb rb" style="${ssrRenderStyle({ "text-align": "left", "padding": "5px 20px" })}" data-v-8d2b4f5b><div class="tipsPre" style="${ssrRenderStyle({ "-webkit-text-size-adjust": "none" })}" data-v-8d2b4f5b><p data-v-8d2b4f5b>Ch\xFA \xFD:</p><p data-v-8d2b4f5b>1. T\u1EF7 l\u1EC7 th\u1EAFng s\xE2n nh\xE0 (HWR), t\u1EF7 l\u1EC7 h\xF2a (DR), t\u1EF7 l\u1EC7 th\u1EAFng s\xE2n kh\xE1ch (AWR): K\u1EBFt qu\u1EA3 tr\u1EADn \u0111\u1EA5u t\xEDnh theo t\u1EF7 l\u1EC7 th\u1EAFng tr\xEAn s\xE2n nh\xE0, t\u1EF7 l\u1EC7 h\xF2a v\xE0 t\u1EF7 l\u1EC7 th\u1EAFng tr\xEAn s\xE2n kh\xE1ch, l\xE0 t\u1EF7 n\xE0y l\xE0 t\xEDnh theo t\u1EF7 l\u1EC7 th\u1EAFng tr\xEAn s\xE2n nh\xE0, s\xE2n kh\xE1ch v\xE0 h\xF2a. T\u1EF7 su\u1EA5t ho\xE0n tr\u1EA3: T\u1EF7 l\u1EC7 th\u1EAFng tr\xEAn s\xE2n nh\xE0, t\u1EF7 l\u1EC7 th\u1EAFng tr\xEAn s\xE2n kh\xE1ch, t\u1EF7 l\u1EC7 h\xF2a.</p><p data-v-8d2b4f5b>2. T\u1EF7 l\u1EC7 ho\xE0n v\u1ED1n: \u0111o l\u01B0\u1EDDng t\u1EF7 l\u1EC7 thanh to\xE1n c\u1EE7a c\xE1c nh\xE0 c\xE1i, t\u1EF7 l\u1EC7 ho\xE0n v\u1ED1n cao h\u01A1n c\xF3 ngh\u0129a l\xE0 nh\u1EEFng ng\u01B0\u1EDDi \u0111\u1EB7t c\u01B0\u1EE3c c\xE0ng c\xF3 nhi\u1EC1u l\u1EE3i nhu\u1EADn c\xF3 th\u1EC3 nh\u1EADn \u0111\u01B0\u1EE3c.C\xF4ng th\u1EE9c: P=AxBxC/:AxB BxC AxC:P=T\u1EF7 su\u1EA5t ho\xE0n tr\u1EA3 A=T\u1EF7 su\u1EA5t th\u1EAFng B=T\u1EF7 su\u1EA5t h\xF2a C=T\u1EF7 su\u1EA5t thua</p><p data-v-8d2b4f5b>3. Ch\u1EC9 s\u1ED1 Kelly: Ph\u1EA3n \xE1nh r\u1EE7i ro thanh to\xE1n c\u1EE7a c\xE1c t\u1EF7 l\u1EC7, t\u1EE9c l\xE0 ch\xEAnh l\u1EC7ch t\u1EF7 l\u1EC7 th\xE0nh to\xE1n gi\u1EEFa t\u1EF7 l\u1EC7 th\u1ECB tr\u01B0\u1EDDng v\xE0 t\u1EF7 l\u1EC7 \u0111\xE3 thi\u1EBFt l\u1EADp. N\u1EBFu Ch\u1EC9 s\u1ED1 Kelly cao h\u01A1n t\u1EF7 su\u1EA5t tr\u1EA3 ho\xE0n th\xEC r\u1EE7i ro l\u1EDBn, kh\xF3 v\u01B0\u1EE3t qua. Ng\u01B0\u1EE3c l\u1EA1i l\xE0 r\u1EE7i ro nh\u1ECF, d\u1EC5 v\u01B0\u1EE3t qua.</p><p data-v-8d2b4f5b>4. Tr\u1EE3 gi\xFAp: N\u1EBFu Ch\u1EC9 s\u1ED1 Kelly cao h\u01A1n 1 b\xEAn bongdalu s\u1EBD th\u1EC3 hi\u1EC7n ch\u1EEF b\u1EB1ng m\xF9a \u0111\u1ECF. Ch\u1ECDn &quot;ch\u1EE7, h\xF2a, kh\xE1ch, t\u1EF7 su\u1EA5t tr\u1EA3 ho\xE0n&quot; tr\xEAn \u0111\u1EA7u b\u1EA1n c\xF3 th\u1EC3 x\u1EBFp h\u1EA1ng l\u1EA1i. Ch\u1ECDn t\u1EF7 s\u1ED1 b\u1EA1n c\xF3 th\u1EC3 xem t\u1EA5t c\u1EA3 t\u1EF7 s\u1ED1; N\u1EBFu &quot;th\u1EDDi gian thay \u0111\u1ED5i&quot; th\u1EC3 hi\u1EC7n qua m\xE0u \u0111\u1ECF th\xEC l\xE0 t\u1EF7 s\u1ED1 c\xF3 thay \u0111\u1ED5i trong 30 ph\xFAt.</p></div></td></tr></tbody></table></div></div><div id="content-page" class="mt-5" data-v-8d2b4f5b>`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title" data-v-8d2b4f5b>${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div><div class="twin" style="${ssrRenderStyle([
        showWinScoreOdds.value ? null : { display: "none" },
        { position: "absolute", top: winScorePositionOdds.value.top, left: winScorePositionOdds.value.left, zIndex: 999 }
      ])}" data-v-8d2b4f5b><table width="100%" border="0" cellspacing="0" cellpadding="0" class="tgs2" data-v-8d2b4f5b><tbody data-v-8d2b4f5b><tr data-v-8d2b4f5b><td height="26" colspan="4" class="hbg-td1" data-v-8d2b4f5b><b data-v-8d2b4f5b>${ssrInterpolate((_Qb = oddsItemHover.value) == null ? void 0 : _Qb.company_name)} T\u1EF7 l\u1EC7 thay \u0111\u1ED5i</b></td></tr><!--[-->`);
      ssrRenderList((_Rb = oddsItemHover.value) == null ? void 0 : _Rb.odds_live, (item, index) => {
        var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2;
        _push(`<tr data-v-8d2b4f5b><td style="${ssrRenderStyle({ "width": "19%" })}" data-v-8d2b4f5b><span name="oddsData" class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_a3 = item == null ? void 0 : item.odds) == null ? void 0 : _a3[0], (_e2 = (_d2 = (_c2 = (_b3 = oddsItemHover.value) == null ? void 0 : _b3.odds_live) == null ? void 0 : _c2[index + 1]) == null ? void 0 : _d2.odds) == null ? void 0 : _e2[0]))}" data-v-8d2b4f5b>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_f2 = item == null ? void 0 : item.odds) == null ? void 0 : _f2[0]))}</span></td><td style="${ssrRenderStyle({ "width": "19%" })}" data-v-8d2b4f5b><span name="oddsData" class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_g2 = item == null ? void 0 : item.odds) == null ? void 0 : _g2[1], (_k2 = (_j2 = (_i2 = (_h2 = oddsItemHover.value) == null ? void 0 : _h2.odds_live) == null ? void 0 : _i2[index + 1]) == null ? void 0 : _j2.odds) == null ? void 0 : _k2[1]))}" data-v-8d2b4f5b>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_l2 = item == null ? void 0 : item.odds) == null ? void 0 : _l2[1]))}</span></td><td style="${ssrRenderStyle({ "width": "19%" })}" data-v-8d2b4f5b><span name="oddsData" class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_m2 = item == null ? void 0 : item.odds) == null ? void 0 : _m2[2], (_q2 = (_p2 = (_o2 = (_n2 = oddsItemHover.value) == null ? void 0 : _n2.odds_live) == null ? void 0 : _o2[index + 1]) == null ? void 0 : _p2.odds) == null ? void 0 : _q2[2]))}" data-v-8d2b4f5b>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_r2 = item == null ? void 0 : item.odds) == null ? void 0 : _r2[2]))}</span></td><td name="timeData" data-v-8d2b4f5b>${ssrInterpolate(("timeStamp2DateUTCTimeZone" in _ctx ? _ctx.timeStamp2DateUTCTimeZone : unref(timeStamp2DateUTCTimeZone))(item == null ? void 0 : item.update_time, "MM/DD HH:mm", timeZone.value))}</td></tr>`);
      });
      _push(`<!--]--><tr data-v-8d2b4f5b><td colspan="4" data-v-8d2b4f5b>Xem th\xEAm</td></tr><tr data-v-8d2b4f5b><td style="${ssrRenderStyle({ "width": "19%" })}" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_Ub = (_Tb = (_Sb = oddsItemHover.value) == null ? void 0 : _Sb.odds_init) == null ? void 0 : _Tb.odds) == null ? void 0 : _Ub[0]))}</td><td style="${ssrRenderStyle({ "width": "19%" })}" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_Xb = (_Wb = (_Vb = oddsItemHover.value) == null ? void 0 : _Vb.odds_init) == null ? void 0 : _Wb.odds) == null ? void 0 : _Xb[1]))}</td><td style="${ssrRenderStyle({ "width": "19%" })}" name="oddsData" data-v-8d2b4f5b>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((__b = (_Zb = (_Yb = oddsItemHover.value) == null ? void 0 : _Yb.odds_init) == null ? void 0 : _Zb.odds) == null ? void 0 : __b[2]))}</td><td name="timeData" data-v-8d2b4f5b>${ssrInterpolate(("timeStamp2DateUTCTimeZone" in _ctx ? _ctx.timeStamp2DateUTCTimeZone : unref(timeStamp2DateUTCTimeZone))((_ac = (_$b = oddsItemHover.value) == null ? void 0 : _$b.odds_init) == null ? void 0 : _ac.update_time, "MM/DD HH:mm", timeZone.value))}(S\u1EDBm)</td></tr></tbody></table></div><div class="match-odds container" data-v-8d2b4f5b><div class="modal fade" id="modal_detail_win" tabindex="-1" aria-labelledby="modal_detail_win_label" aria-hidden="true" data-v-8d2b4f5b><div class="modal-dialog modal-dialog-centered container" data-v-8d2b4f5b><div class="modal-content" data-v-8d2b4f5b><div class="modal-header" data-v-8d2b4f5b><div class="modal-title" id="modal_detail_win_label" data-v-8d2b4f5b>${ssrInterpolate(oddCompanyName.value)} T\u1EF7 l\u1EC7 thay \u0111\u1ED5i </div><button type="button" class="btn-close" aria-label="Close" data-v-8d2b4f5b></button></div><div class="modal-body" data-v-8d2b4f5b><div id="" class="layui-layer-content detail_win" data-v-8d2b4f5b><div class="popinfo" data-v-8d2b4f5b>`);
      _push(ssrRenderComponent(_component_PopupOddsChange, {
        "odd-comp-id": oddCompanyId.value,
        "match-id": matchIdSlug.value,
        section: "ahDetail",
        "odd-companys-list": oddCompanys.value
      }, null, _parent));
      _push(`</div></div></div></div></div></div><div class="modal fade" id="modal_filter_comp" tabindex="-1" aria-labelledby="modal_filter_comp_label" aria-hidden="true" data-v-8d2b4f5b><div class="modal-dialog modal-dialog-centered" data-v-8d2b4f5b><div class="modal-content" data-v-8d2b4f5b><div class="modal-header" data-v-8d2b4f5b><div class="modal-title" id="modal_filter_comp_label" data-v-8d2b4f5b> Ch\u1ECDn c\xF4ng ty </div><button type="button" class="btn-close" aria-label="Close" data-v-8d2b4f5b></button></div><div class="modal-body" data-v-8d2b4f5b><div class="layui-layer-content oddscomp-filterwin" data-v-8d2b4f5b><ul id="oddscompFilterWin" class="popinfo" data-v-8d2b4f5b><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (oddCompany, index) => {
        _push(`<li${ssrRenderAttr("value", oddCompany == null ? void 0 : oddCompany.id)} class="${ssrRenderClass([oCompanySelected.value.includes(oddCompany == null ? void 0 : oddCompany.id) ? "on" : "", "complist"])}" data-v-8d2b4f5b><i class="check-circled" data-v-8d2b4f5b></i> ${ssrInterpolate(oddCompany == null ? void 0 : oddCompany.name)}</li>`);
      });
      _push(`<!--]--></ul><div id="winTips" class="tips" style="${ssrRenderStyle(((_bc = oCompanySelected.value) == null ? void 0 : _bc.length) === 0 ? null : { display: "none" })}" data-v-8d2b4f5b>*Ch\u1ECDn \xEDt nh\u1EA5t 1 c\xF4ng ty</div></div></div><div class="modal-footer" style="${ssrRenderStyle({ "display": "none" })}" data-v-8d2b4f5b><button type="button" class="btn btn-primary"${ssrIncludeBooleanAttr(((_cc = oCompanySelected.value) == null ? void 0 : _cc.length) === 0 ? true : false) ? " disabled" : ""} data-v-8d2b4f5b>OK</button></div></div></div></div><div style="${ssrRenderStyle(isLoadingData.value ? null : { display: "none" })}" id="sloading" class="sloading" data-v-8d2b4f5b><div class="bar icon1" data-v-8d2b4f5b></div><div class="bar icon2" data-v-8d2b4f5b></div><div class="bar icon3" data-v-8d2b4f5b></div><div class="bar icon4" data-v-8d2b4f5b></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/odds/1x2-odds/[match_id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Odds1x2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8d2b4f5b"]]);

export { Odds1x2 as default };
//# sourceMappingURL=_match_id_-DgBn2GK_.mjs.map
