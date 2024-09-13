import { _ as __nuxt_component_0 } from './TabTableMobile-Bxqz4q-j.mjs';
import { _ as _sfc_main$1 } from './NuxtImg-z5Tschba.mjs';
import { _ as __nuxt_component_0$1 } from './server-placeholder-BFzIFO-1.mjs';
import { _ as _export_sfc, u as useRoute, e as useRouter, b as useCookie } from './server.mjs';
import { useSSRContext, defineComponent, mergeModels, ref, computed, reactive, useModel, watch, withAsyncContext, mergeProps, unref, nextTick } from 'vue';
import { O as ODD_COMPANY_DEFAULT, b as ODD_COMPANYS } from './constants-DJp0NbxW.mjs';
import { g as getConfig, a as parseIntO } from './helper-CGhdpGxz.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { z as getOddNumberToNegative, A as getOddChange, p as getOddNumber, B as getClassOddChange, x as getDataObjectByList, m as getValueByPosition } from './livescore_helper-4bdWaxk-.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useMatchStore } from './useMatchStore-Dgc_MSrX.mjs';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import { useWindowSize } from '@vueuse/core';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@unhead/addons';
import 'vue3-snackbar';
import './fetch-CC0zbYw2.mjs';
import './createUrl-DyOxdY5I.mjs';
import './moment_helper-C2kP4D4M.mjs';
import 'moment-timezone';
import 'crypto-js';
import 'pako';
import 'buffer';

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
    var _a, _b, _c;
    let __temp, __restore;
    const { width } = useWindowSize();
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
        name: "T\u1EF7 l\u1EC7 Ch\xE2u \xC1"
      },
      {
        id: 2,
        name: "T\u1EF7 l\u1EC7 t\xE0i x\u1EC9u"
      },
      {
        id: 3,
        name: "1X2"
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
    const oCompList = ref([]);
    const oddsList = ref([]);
    const oddCompanys = ref([]);
    ODD_COMPANYS.forEach((item) => {
      oCompList.value[item == null ? void 0 : item.id] = oCompanySelected.value.includes(item == null ? void 0 : item.id) ? true : false;
    });
    const oddCompanyName = ref();
    ref([]);
    const oddCompanyId = ref();
    const tab = ref(((_b = route == null ? void 0 : route.query) == null ? void 0 : _b.type) || "");
    const settingsData = useCookie("settingsData");
    ref(getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") || ((_c = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _c.timeZone));
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
          if (!useCookie("oCompanyOddSelected").value && !((_s = oCompanySelected.value) == null ? void 0 : _s.includes(item == null ? void 0 : item.id))) {
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
          var _a3, _b2, _c2, _d, _e, _f;
          oddCompanysList[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
          oddCompanysList[item == null ? void 0 : item.isportsapi].first = (_b2 = (_a3 = resData == null ? void 0 : resData.data) == null ? void 0 : _a3.early) == null ? void 0 : _b2.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi));
          oddCompanysList[item == null ? void 0 : item.isportsapi].live = (_d = (_c2 = resData == null ? void 0 : resData.data) == null ? void 0 : _c2.live) == null ? void 0 : _d.find((odd) => odd.i_company_id === (item == null ? void 0 : item.isportsapi));
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
        var _a2, _b2, _c2, _d;
        const europeOdds = ((_a2 = route.query) == null ? void 0 : _a2.haft) == 1 || ftPopTabs.value === 1 ? "europeanHaft" : "europeOdds";
        const handicap = ((_b2 = route.query) == null ? void 0 : _b2.haft) == 1 || ftPopTabs.value === 1 ? "handicapHalf" : "handicap";
        const overUnder = ((_c2 = route.query) == null ? void 0 : _c2.haft) == 1 || ftPopTabs.value === 1 ? "overUnderHalf" : "overUnder";
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
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecentDetail()), await __temp, __restore();
    fetchOdds(matchIdSlug.value);
    const wssMatch = (socketData) => {
      var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E;
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
                  const oddCompany = (_d = oddCompanys.value) == null ? void 0 : _d.find((item) => (item == null ? void 0 : item.isportsapi) == companyId);
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
      var _a2, _b2, _c2, _d;
      const _component_TabTableMobile = __nuxt_component_0;
      const _component_nuxt_img = _sfc_main$1;
      const _component_PopupOddsChange = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "",
        class: "match-odds"
      }, _attrs))} data-v-a57a4444><div id="" data-v-a57a4444><div id="CompanyOddsDiv" class="company-comp" data-v-a57a4444>`);
      _push(ssrRenderComponent(_component_TabTableMobile, {
        style: unref(isMobile) ? null : { display: "none" },
        titleList: titleList.value,
        modelValue: tabActive.value,
        "onUpdate:modelValue": ($event) => tabActive.value = $event
      }, null, _parent));
      _push(`<div class="rankbox" data-v-a57a4444><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-a57a4444><tbody data-v-a57a4444><tr class="tr-title" data-v-a57a4444><th colspan="2" rowspan="2" data-v-a57a4444><b data-v-a57a4444>C\xF4ng ty</b>`);
      _push(ssrRenderComponent(_component_nuxt_img, {
        src: "/img/fx.svg",
        alt: "plus",
        height: "16",
        width: "16",
        onClick: openModaFilterComp
      }, null, _parent));
      _push(`</th><th data-v-a57a4444></th></tr><tr class="tb-bgcolor1" data-v-a57a4444><th data-v-a57a4444></th><th data-v-a57a4444></th></tr><!--[-->`);
      ssrRenderList((_a2 = oddCompanys.value) == null ? void 0 : _a2.filter((item) => item !== null && !(item == null ? void 0 : item.isEmpty) && oCompanySelected.value.includes(item == null ? void 0 : item.id)), (item, index) => {
        _push(`<tr class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}" data-v-a57a4444><td rowspan="1" data-v-a57a4444><span data-v-a57a4444>${ssrInterpolate(item == null ? void 0 : item.name)}</span></td><td class="bd-l" data-v-a57a4444><span data-v-a57a4444>S\u1EDBm</span><span data-v-a57a4444>Live</span><span class="red" data-v-a57a4444>Run</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata" style="${ssrRenderStyle({ "width": "100%" })}" data-v-a57a4444><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" data-v-a57a4444><tbody data-v-a57a4444><tr class="tr-title" data-v-a57a4444><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-a57a4444><b data-v-a57a4444>T\u1EF7 l\u1EC7 Ch\xE2u \xC1</b></th><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-a57a4444><b data-v-a57a4444>T\u1EF7 l\u1EC7 t\xE0i x\u1EC9u</b></th><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-a57a4444><b data-v-a57a4444>1X2</b></th><th rowspan="2" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-a57a4444><b data-v-a57a4444>Chi ti\u1EBFt</b></th></tr><tr class="tr-title" data-v-a57a4444><th style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" data-v-a57a4444>Ch\u1EE7</th><th style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" data-v-a57a4444>HDP</th><th style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" data-v-a57a4444>Kh\xE1ch</th><th style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" data-v-a57a4444>T\xE0i</th><th style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" class="middle-width" data-v-a57a4444>K\xE8o \u0111\u1EA7u</th><th style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" data-v-a57a4444>X\u1EC9u</th><th style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" data-v-a57a4444>Ch\u1EE7</th><th style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" data-v-a57a4444>H\xF2a</th><th style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" data-v-a57a4444>Kh\xE1ch</th><th style="${ssrRenderStyle(unref(isMobile) ? null : { display: "none" })}" class="middle-width" data-v-a57a4444>Chi ti\u1EBFt</th></tr><!--[-->`);
      ssrRenderList((_b2 = oddCompanys.value) == null ? void 0 : _b2.filter((item) => item !== null && !(item == null ? void 0 : item.isEmpty) && oCompanySelected.value.includes(item == null ? void 0 : item.id)), (item, index) => {
        var _a3, _b3, _c3, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja;
        _push(`<tr name="oddsTr" class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}" data-v-a57a4444><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="7%" class="bd-l" data-v-a57a4444><span data-o="" data-v-a57a4444>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_b3 = (_a3 = item == null ? void 0 : item.handicap) == null ? void 0 : _a3.first) == null ? void 0 : _b3[1]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_d2 = (_c3 = item == null ? void 0 : item.handicap) == null ? void 0 : _c3.live) == null ? void 0 : _d2[1], (_f = (_e = item == null ? void 0 : item.handicap) == null ? void 0 : _e.first) == null ? void 0 : _f[1]))}" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_h = (_g = item == null ? void 0 : item.handicap) == null ? void 0 : _g.live) == null ? void 0 : _h[1]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 1))}" data-v-a57a4444>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_j = (_i = item == null ? void 0 : item.handicap) == null ? void 0 : _i.run) == null ? void 0 : _j[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="7%" data-v-a57a4444><span data-o="" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_l = (_k = item == null ? void 0 : item.handicap) == null ? void 0 : _k.first) == null ? void 0 : _l[0]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_n = (_m = item == null ? void 0 : item.handicap) == null ? void 0 : _m.live) == null ? void 0 : _n[0], (_p = (_o = item == null ? void 0 : item.handicap) == null ? void 0 : _o.first) == null ? void 0 : _p[0]))}" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_r = (_q = item == null ? void 0 : item.handicap) == null ? void 0 : _q.live) == null ? void 0 : _r[0]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 0))}" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_t = (_s = item == null ? void 0 : item.handicap) == null ? void 0 : _s.run) == null ? void 0 : _t[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="7%" class="bd-r" data-v-a57a4444><span data-o="" data-v-a57a4444>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_v = (_u = item == null ? void 0 : item.handicap) == null ? void 0 : _u.first) == null ? void 0 : _v[2]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_x = (_w = item == null ? void 0 : item.handicap) == null ? void 0 : _w.live) == null ? void 0 : _x[2], (_z = (_y = item == null ? void 0 : item.handicap) == null ? void 0 : _y.first) == null ? void 0 : _z[2]))}" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_B = (_A = item == null ? void 0 : item.handicap) == null ? void 0 : _A.live) == null ? void 0 : _B[2]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.handicap, 2))}" data-v-a57a4444>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_D = (_C = item == null ? void 0 : item.handicap) == null ? void 0 : _C.run) == null ? void 0 : _D[2]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="7%" class="bd-l" data-v-a57a4444><span data-o="" data-v-a57a4444>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_F = (_E = item == null ? void 0 : item.overUnder) == null ? void 0 : _E.first) == null ? void 0 : _F[1]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_H = (_G = item == null ? void 0 : item.overUnder) == null ? void 0 : _G.live) == null ? void 0 : _H[1], (_J = (_I = item == null ? void 0 : item.overUnder) == null ? void 0 : _I.first) == null ? void 0 : _J[1]))}" data-v-a57a4444>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_L = (_K = item == null ? void 0 : item.overUnder) == null ? void 0 : _K.live) == null ? void 0 : _L[1]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 1))}" data-v-a57a4444>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_N = (_M = item == null ? void 0 : item.overUnder) == null ? void 0 : _M.run) == null ? void 0 : _N[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="7%" data-v-a57a4444><span data-o="" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_P = (_O = item == null ? void 0 : item.overUnder) == null ? void 0 : _O.first) == null ? void 0 : _P[0]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_R = (_Q = item == null ? void 0 : item.overUnder) == null ? void 0 : _Q.live) == null ? void 0 : _R[0], (_T = (_S = item == null ? void 0 : item.overUnder) == null ? void 0 : _S.first) == null ? void 0 : _T[0]))}" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_V = (_U = item == null ? void 0 : item.overUnder) == null ? void 0 : _U.live) == null ? void 0 : _V[0]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 0))}" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_X = (_W = item == null ? void 0 : item.overUnder) == null ? void 0 : _W.run) == null ? void 0 : _X[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="7%" class="bd-r" data-v-a57a4444><span data-o="" data-v-a57a4444>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_Z = (_Y = item == null ? void 0 : item.overUnder) == null ? void 0 : _Y.first) == null ? void 0 : _Z[2]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_$ = (__ = item == null ? void 0 : item.overUnder) == null ? void 0 : __.live) == null ? void 0 : _$[2], (_ba = (_aa = item == null ? void 0 : item.overUnder) == null ? void 0 : _aa.first) == null ? void 0 : _ba[2]))}" data-v-a57a4444>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_da = (_ca = item == null ? void 0 : item.overUnder) == null ? void 0 : _ca.live) == null ? void 0 : _da[2]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 2))}" data-v-a57a4444>${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_fa = (_ea = item == null ? void 0 : item.overUnder) == null ? void 0 : _ea.run) == null ? void 0 : _fa[2]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="7%" class="bd-l" data-v-a57a4444><span data-o="" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_ha = (_ga = item == null ? void 0 : item.europeOdds) == null ? void 0 : _ga.first) == null ? void 0 : _ha[0]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_ja = (_ia = item == null ? void 0 : item.europeOdds) == null ? void 0 : _ia.live) == null ? void 0 : _ja[0], (_la = (_ka = item == null ? void 0 : item.europeOdds) == null ? void 0 : _ka.first) == null ? void 0 : _la[0]))}" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_na = (_ma = item == null ? void 0 : item.europeOdds) == null ? void 0 : _ma.live) == null ? void 0 : _na[0]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.europeOdds, 0))}" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_pa = (_oa = item == null ? void 0 : item.europeOdds) == null ? void 0 : _oa.run) == null ? void 0 : _pa[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="7%" data-v-a57a4444><span data-o="" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_ra = (_qa = item == null ? void 0 : item.europeOdds) == null ? void 0 : _qa.first) == null ? void 0 : _ra[1]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_ta = (_sa = item == null ? void 0 : item.europeOdds) == null ? void 0 : _sa.live) == null ? void 0 : _ta[1], (_va = (_ua = item == null ? void 0 : item.europeOdds) == null ? void 0 : _ua.first) == null ? void 0 : _va[1]))}" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_xa = (_wa = item == null ? void 0 : item.europeOdds) == null ? void 0 : _wa.live) == null ? void 0 : _xa[1]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.europeOdds, 1))}" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_za = (_ya = item == null ? void 0 : item.europeOdds) == null ? void 0 : _ya.run) == null ? void 0 : _za[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="7%" class="bd-r" data-v-a57a4444><span data-o="" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_Ba = (_Aa = item == null ? void 0 : item.europeOdds) == null ? void 0 : _Aa.first) == null ? void 0 : _Ba[2]))}</span><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_Da = (_Ca = item == null ? void 0 : item.europeOdds) == null ? void 0 : _Ca.live) == null ? void 0 : _Da[2], (_Fa = (_Ea = item == null ? void 0 : item.europeOdds) == null ? void 0 : _Ea.first) == null ? void 0 : _Fa[2]))}" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_Ha = (_Ga = item == null ? void 0 : item.europeOdds) == null ? void 0 : _Ga.live) == null ? void 0 : _Ha[2]))}</span><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.europeOdds, 2))}" data-v-a57a4444>${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_Ja = (_Ia = item == null ? void 0 : item.europeOdds) == null ? void 0 : _Ia.run) == null ? void 0 : _Ja[2]))}</span></td><td width="5%" data-v-a57a4444><span class="odd_a" data-v-a57a4444> Thay \u0111\u1ED5i </span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div><div id="content-page" class="mt-5" data-v-a57a4444>`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title" data-v-a57a4444>${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div><div class="modal fade" id="modal_detail_win" tabindex="-1" aria-labelledby="modal_detail_win_label" aria-hidden="true" data-v-a57a4444><div class="modal-dialog modal-dialog-centered container" data-v-a57a4444><div class="modal-content" data-v-a57a4444><div class="modal-header" data-v-a57a4444><div class="modal-title" id="modal_detail_win_label" data-v-a57a4444>${ssrInterpolate(oddCompanyName.value)} T\u1EF7 l\u1EC7 thay \u0111\u1ED5i </div><button type="button" class="btn-close" aria-label="Close" data-v-a57a4444></button></div><div class="modal-body" data-v-a57a4444><div id="" class="layui-layer-content detail_win" data-v-a57a4444><div class="popinfo" data-v-a57a4444>`);
      _push(ssrRenderComponent(_component_PopupOddsChange, {
        "odd-comp-id": oddCompanyId.value,
        "match-id": matchIdSlug.value,
        section: "ahDetail",
        "odd-companys-list": oddCompanys.value,
        "refresh-time": refreshTime.value
      }, null, _parent));
      _push(`</div></div></div></div></div></div><div class="modal fade" id="modal_filter_comp" tabindex="-1" aria-labelledby="modal_filter_comp_label" aria-hidden="true" data-v-a57a4444><div class="modal-dialog modal-dialog-centered" data-v-a57a4444><div class="modal-content" data-v-a57a4444><div class="modal-header" data-v-a57a4444><div class="modal-title" id="modal_filter_comp_label" data-v-a57a4444> Ch\u1ECDn c\xF4ng ty </div><button type="button" class="btn-close" aria-label="Close" data-v-a57a4444></button></div><div class="modal-body" data-v-a57a4444><div class="layui-layer-content oddscomp-filterwin" data-v-a57a4444><ul id="oddscompFilterWin" class="popinfo" data-v-a57a4444><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (oddCompany, index) => {
        _push(`<li${ssrRenderAttr("value", oddCompany == null ? void 0 : oddCompany.id)} class="${ssrRenderClass([oCompanySelected.value.includes(oddCompany == null ? void 0 : oddCompany.id) ? "on" : "", "complist"])}" data-v-a57a4444><i class="check-circled" data-v-a57a4444></i> ${ssrInterpolate(oddCompany == null ? void 0 : oddCompany.name)}</li>`);
      });
      _push(`<!--]--></ul><div id="winTips" class="tips" style="${ssrRenderStyle(((_c2 = oCompanySelected.value) == null ? void 0 : _c2.length) === 0 ? null : { display: "none" })}" data-v-a57a4444>*Ch\u1ECDn \xEDt nh\u1EA5t 1 c\xF4ng ty</div></div></div><div class="modal-footer" style="${ssrRenderStyle({ "display": "none" })}" data-v-a57a4444><button type="button" class="btn btn-primary"${ssrIncludeBooleanAttr(((_d = oCompanySelected.value) == null ? void 0 : _d.length) === 0 ? true : false) ? " disabled" : ""} data-v-a57a4444>OK</button></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/odds/oddscomp/[match_id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Oddscomp = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a57a4444"]]);

export { Oddscomp as default };
//# sourceMappingURL=_match_id_-Bi2yLpen.mjs.map
