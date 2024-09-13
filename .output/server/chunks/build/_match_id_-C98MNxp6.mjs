import { _ as __nuxt_component_0 } from './TabTableMobile-Bxqz4q-j.mjs';
import { _ as __nuxt_component_0$1 } from './server-placeholder-BFzIFO-1.mjs';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import { u as useRoute, b as useCookie } from './server.mjs';
import { O as ODD_COMPANY_DEFAULT, b as ODD_COMPANYS } from './constants-DJp0NbxW.mjs';
import { defineComponent, mergeModels, ref, useModel, computed, reactive, watch, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { g as getConfig, a as parseIntO } from './helper-CGhdpGxz.mjs';
import { A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { B as getClassOddChange, z as getOddNumberToNegative, p as getOddNumber, A as getOddChange, x as getDataObjectByList, m as getValueByPosition } from './livescore_helper-4bdWaxk-.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-5pavRNUp.mjs';
import { u as useMatchStore } from './useMatchStore-Dgc_MSrX.mjs';
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
import './moment_helper-C2kP4D4M.mjs';
import 'moment-timezone';
import 'crypto-js';
import 'pako';
import 'buffer';
import './fetch-CC0zbYw2.mjs';
import './createUrl-DyOxdY5I.mjs';

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
    const oCompList = ref([]);
    const oddsList = ref([]);
    const oddCompanys = ref([]);
    ODD_COMPANYS.forEach((item) => {
      oCompList.value[item == null ? void 0 : item.id] = oCompanySelected.value.includes(item == null ? void 0 : item.id) ? true : false;
    });
    const oddCompanyName = ref();
    const oddCompanyId = ref();
    const tab = ref(((_a = route == null ? void 0 : route.query) == null ? void 0 : _a.type) || "");
    const tabActive = ref(1);
    ref(false);
    const refreshTime = ref(Date.now());
    const titleList = ref([
      {
        id: 1,
        name: "S\u1EDBm"
      },
      {
        id: 2,
        name: "Live"
      },
      {
        id: 3,
        name: "Run Odds"
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
    const fetchOdds = async (matchIdSlug2) => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL + "?match_id=" + matchIdSlug2).then(async (resData) => {
        var _a2;
        oddsList.value = getDataObjectByList(resData);
        const oddCompanysList = [];
        (_a2 = ODD_COMPANYS) == null ? void 0 : _a2.forEach((item) => {
          var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
          oddCompanysList[item == null ? void 0 : item.isportsapi] = [];
          oddCompanysList[item == null ? void 0 : item.isportsapi].id = item == null ? void 0 : item.id;
          oddCompanysList[item == null ? void 0 : item.isportsapi].isportsapi = item == null ? void 0 : item.isportsapi;
          oddCompanysList[item == null ? void 0 : item.isportsapi].name = item == null ? void 0 : item.name;
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
          if (!useCookie("oCompanyOddSelected").value && !((_s = oCompanySelected.value) == null ? void 0 : _s.includes(item == null ? void 0 : item.id))) {
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
      var _a2, _b2, _c, _d, _e, _f, _g;
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
                if (matchId == ((_c = (_b2 = matchLiveDetail.value) == null ? void 0 : _b2.match) == null ? void 0 : _c.i_match_id)) {
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
    fetchOdds(matchIdSlug.value);
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
      _push(`<div class="rankbox"><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}"><tbody><tr class="tr-title"><th colspan="2" rowspan="2"><b>C\xF4ng ty</b><img${ssrRenderAttr("src", _imports_0)} alt="plus"></th><th></th></tr><tr class="tb-bgcolor1"><th></th></tr><!--[-->`);
      ssrRenderList((_a2 = oddCompanys.value) == null ? void 0 : _a2.filter((item) => item !== null && !(item == null ? void 0 : item.isEmpty) && oCompanySelected.value.includes(item == null ? void 0 : item.id)), (item, index) => {
        _push(`<tr class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}"><td rowspan="1"><span>${ssrInterpolate(item == null ? void 0 : item.name)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata w-100"><table class="eTable adaptMt w-100" cellspacing="0" cellpadding="0" width="100%"><tbody><tr class="tr-title"><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>S\u1EDBm</b></th><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>Live</b></th><th colspan="3" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>Run Odds</b></th><th rowspan="2" style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}"><b>Chi ti\u1EBFt</b></th></tr><tr class="tr-title"><th>T\xE0i</th><th>K\xE8o</th><th>X\u1EC9u</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">T\xE0i</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">K\xE8o</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">X\u1EC9u</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">T\xE0i</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">K\xE8o</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}">X\u1EC9u</th><th style="${ssrRenderStyle(unref(isMobile) ? null : { display: "none" })}">Chi ti\u1EBFt</th></tr><!--[-->`);
      ssrRenderList((_b2 = oddCompanys.value) == null ? void 0 : _b2.filter((item) => item !== null && !(item == null ? void 0 : item.isEmpty) && oCompanySelected.value.includes(item == null ? void 0 : item.id)), (item, index) => {
        var _a3, _b3, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D;
        _push(`<tr name="oddsTr" style="${ssrRenderStyle({ "text-align": "center" })}" cid="3" class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}"><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%"><span class="" class="${ssrRenderClass([("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 1, 1), ""])}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_b3 = (_a3 = item == null ? void 0 : item.overUnder) == null ? void 0 : _a3.first) == null ? void 0 : _b3[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%"><span class="" class="${ssrRenderClass([("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 0, 1), ""])}">${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_d2 = (_c2 = item == null ? void 0 : item.overUnder) == null ? void 0 : _c2.first) == null ? void 0 : _d2[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%" class="rb"><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 2, 1))}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_f = (_e = item == null ? void 0 : item.overUnder) == null ? void 0 : _e.first) == null ? void 0 : _f[2]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%"><span class="" class="${ssrRenderClass([("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_h = (_g = item == null ? void 0 : item.overUnder) == null ? void 0 : _g.live) == null ? void 0 : _h[1], (_j = (_i = item == null ? void 0 : item.overUnder) == null ? void 0 : _i.first) == null ? void 0 : _j[1]), ""])}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_l = (_k = item == null ? void 0 : item.overUnder) == null ? void 0 : _k.live) == null ? void 0 : _l[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%"><span class="" class="${ssrRenderClass([("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_n = (_m = item == null ? void 0 : item.overUnder) == null ? void 0 : _m.live) == null ? void 0 : _n[0], (_p = (_o = item == null ? void 0 : item.overUnder) == null ? void 0 : _o.first) == null ? void 0 : _p[0]), ""])}">${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_r = (_q = item == null ? void 0 : item.overUnder) == null ? void 0 : _q.live) == null ? void 0 : _r[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%" class="rb"><span class="${ssrRenderClass(("getOddChange" in _ctx ? _ctx.getOddChange : unref(getOddChange))((_t = (_s = item == null ? void 0 : item.overUnder) == null ? void 0 : _s.live) == null ? void 0 : _t[2], (_v = (_u = item == null ? void 0 : item.overUnder) == null ? void 0 : _u.first) == null ? void 0 : _v[2]))}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_x = (_w = item == null ? void 0 : item.overUnder) == null ? void 0 : _w.live) == null ? void 0 : _x[2]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="6%"><span class="" class="${ssrRenderClass([("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 1), ""])}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_z = (_y = item == null ? void 0 : item.overUnder) == null ? void 0 : _y.run) == null ? void 0 : _z[1]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="6%"><span class="" class="${ssrRenderClass([("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 0), ""])}">${ssrInterpolate(("getOddNumber" in _ctx ? _ctx.getOddNumber : unref(getOddNumber))((_B = (_A = item == null ? void 0 : item.overUnder) == null ? void 0 : _A.run) == null ? void 0 : _B[0]))}</span></td><td style="${ssrRenderStyle(unref(showColumn).third ? null : { display: "none" })}" width="6%" class="rb"><span class="${ssrRenderClass(("getClassOddChange" in _ctx ? _ctx.getClassOddChange : unref(getClassOddChange))(item == null ? void 0 : item.overUnder, 2))}">${ssrInterpolate(("getOddNumberToNegative" in _ctx ? _ctx.getOddNumberToNegative : unref(getOddNumberToNegative))((_D = (_C = item == null ? void 0 : item.overUnder) == null ? void 0 : _C.run) == null ? void 0 : _D[2]))}</span></td><td width="10%" style="${ssrRenderStyle({ "min-width": "60px" })}"><span class="odd_a">Thay \u0111\u1ED5i</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div><div id="content-page" class="mt-5">`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title">${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div><div class="modal fade" id="modal_detail_win" tabindex="-1" aria-labelledby="modal_detail_win_label" aria-hidden="true"><div class="modal-dialog modal-dialog-centered container"><div class="modal-content"><div class="modal-header"><div class="modal-title" id="modal_detail_win_label">${ssrInterpolate(oddCompanyName.value)} T\u1EF7 l\u1EC7 thay \u0111\u1ED5i </div><button type="button" class="btn-close" aria-label="Close"></button></div><div class="modal-body"><div id="" class="layui-layer-content detail_win"><div class="popinfo">`);
      _push(ssrRenderComponent(_component_PopupOddsChange, {
        "odd-comp-id": oddCompanyId.value,
        "match-id": matchIdSlug.value,
        section: "ahDetail",
        "odd-companys-list": oddCompanys.value,
        "refresh-time": refreshTime.value
      }, null, _parent));
      _push(`</div></div></div></div></div></div><div class="modal fade" id="modal_filter_comp" tabindex="-1" aria-labelledby="modal_filter_comp_label" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><div class="modal-title" id="modal_filter_comp_label"> Ch\u1ECDn c\xF4ng ty </div><button type="button" class="btn-close" aria-label="Close"></button></div><div class="modal-body"><div class="layui-layer-content oddscomp-filterwin"><ul id="oddscompFilterWin" class="popinfo"><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (oddCompany, index) => {
        _push(`<li${ssrRenderAttr("value", oddCompany == null ? void 0 : oddCompany.id)} class="${ssrRenderClass([oCompanySelected.value.includes(oddCompany == null ? void 0 : oddCompany.id) ? "on" : "", "complist"])}"><i class="check-circled"></i> ${ssrInterpolate(oddCompany == null ? void 0 : oddCompany.name)}</li>`);
      });
      _push(`<!--]--></ul><div id="winTips" class="tips" style="${ssrRenderStyle(((_c = oCompanySelected.value) == null ? void 0 : _c.length) === 0 ? null : { display: "none" })}">*Ch\u1ECDn \xEDt nh\u1EA5t 1 c\xF4ng ty</div></div></div><div class="modal-footer" style="${ssrRenderStyle({ "display": "none" })}"><button type="button" class="btn btn-primary"${ssrIncludeBooleanAttr(((_d = oCompanySelected.value) == null ? void 0 : _d.length) === 0 ? true : false) ? " disabled" : ""}>OK</button></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/odds/over-under-odds/[match_id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_match_id_-C98MNxp6.mjs.map
