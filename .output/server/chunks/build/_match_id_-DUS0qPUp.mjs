import { _ as __nuxt_component_0 } from './TabTableMobile-Bxqz4q-j.mjs';
import { _ as __nuxt_component_0$1 } from './server-placeholder-BFzIFO-1.mjs';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import { _ as _export_sfc, u as useRoute, b as useCookie } from './server.mjs';
import { O as ODD_COMPANY_DEFAULT, b as ODD_COMPANYS } from './constants-DJp0NbxW.mjs';
import { useSSRContext, defineComponent, mergeModels, ref, useModel, computed, reactive, watch, withAsyncContext, mergeProps, unref } from 'vue';
import { g as getConfig } from './helper-CGhdpGxz.mjs';
import { A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { s as socketStore } from './wsocket-BREvIJI8.mjs';
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
import './fetch-CC0zbYw2.mjs';
import './createUrl-DyOxdY5I.mjs';
import './livescore_helper-4bdWaxk-.mjs';
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
    var _a, _b;
    let __temp, __restore;
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
        name: "S\u1EDBm"
      },
      {
        id: 2,
        name: "Live"
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
      }, _attrs))} data-v-f15e0237><div id="" data-v-f15e0237><div id="CompanyOddsDiv" class="company-comp" data-v-f15e0237>`);
      _push(ssrRenderComponent(_component_TabTableMobile, {
        isHideTitle: "",
        style: unref(isMobile) ? null : { display: "none" },
        titleList: titleList.value,
        modelValue: tabActive.value,
        "onUpdate:modelValue": ($event) => tabActive.value = $event
      }, null, _parent));
      _push(`<div class="rankbox" data-v-f15e0237><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-f15e0237><tbody data-v-f15e0237><tr class="tr-title" data-v-f15e0237><th colspan="2" rowspan="2" data-v-f15e0237><b data-v-f15e0237>C\xF4ng ty</b></th><th data-v-f15e0237></th></tr><tr class="tb-bgcolor1" data-v-f15e0237><th data-v-f15e0237></th><th data-v-f15e0237></th></tr><!--[-->`);
      ssrRenderList(oddCompanys.value, (item, index) => {
        var _a3, _b3;
        _push(`<tr name="oddsTr" class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}" data-v-f15e0237><td width="100%" height="30" class="rb" data-v-f15e0237>${ssrInterpolate((_b3 = (_a3 = oddCompanysList.value) == null ? void 0 : _a3[item == null ? void 0 : item.i_company_id]) == null ? void 0 : _b3.name)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata w-100" data-v-f15e0237><table class="eTable adaptMt w-100" cellspacing="0" cellpadding="0" width="100%" data-v-f15e0237><tbody data-v-f15e0237><tr class="tr-title" data-v-f15e0237><th colspan="4" style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" data-v-f15e0237><b data-v-f15e0237>S\u1EDBm</b></th><th colspan="4" style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" data-v-f15e0237><b data-v-f15e0237>Live</b></th><th rowspan="2" class="middle-width" data-v-f15e0237><b data-v-f15e0237>Chi ti\u1EBFt</b></th></tr><tr class="tr-title" data-v-f15e0237><th data-v-f15e0237>HDP</th><th data-v-f15e0237>Ch\u1EE7</th><th data-v-f15e0237>H\xF2a</th><th data-v-f15e0237>Kh\xE1ch</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-f15e0237>HDP</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-f15e0237>Ch\u1EE7</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-f15e0237>H\xF2a</th><th style="${ssrRenderStyle(!unref(isMobile) ? null : { display: "none" })}" data-v-f15e0237>Kh\xE1ch</th></tr><!--[-->`);
      ssrRenderList(oddCompanys.value, (item, index) => {
        _push(`<tr name="oddsTr" class="${ssrRenderClass(index % 2 !== 0 ? "tb-bgcolor1" : "tb-bgcolor1")}" data-v-f15e0237><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%" data-v-f15e0237><span data-o="" data-v-f15e0237>${ssrInterpolate(item == null ? void 0 : item.early_handicap)}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%" data-v-f15e0237><span data-o="" data-v-f15e0237>${ssrInterpolate(item == null ? void 0 : item.early_home)}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%" data-v-f15e0237><span data-o="" data-v-f15e0237>${ssrInterpolate(item == null ? void 0 : item.early_draw)}</span></td><td style="${ssrRenderStyle(unref(showColumn).first ? null : { display: "none" })}" width="6%" class="rb" data-v-f15e0237><span data-o="" data-v-f15e0237>${ssrInterpolate(item == null ? void 0 : item.early_away)}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%" data-v-f15e0237><span data-o="" data-v-f15e0237>${ssrInterpolate(item == null ? void 0 : item.live_handicap)}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%" data-v-f15e0237><span data-o="" class="" data-v-f15e0237>${ssrInterpolate(item == null ? void 0 : item.live_home)}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%" data-v-f15e0237><span data-o="" class="" data-v-f15e0237>${ssrInterpolate(item == null ? void 0 : item.live_draw)}</span></td><td style="${ssrRenderStyle(unref(showColumn).second ? null : { display: "none" })}" width="6%" class="rb" data-v-f15e0237><span data-o="" class="" data-v-f15e0237>${ssrInterpolate(item == null ? void 0 : item.live_away)}</span></td><td width="3%" data-v-f15e0237><span class="odd_a" data-v-f15e0237>Thay \u0111\u1ED5i</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div><div id="content-page" class="mt-5" data-v-f15e0237>`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title" data-v-f15e0237>${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div><div class="modal fade" id="modal_detail_win" tabindex="-1" aria-labelledby="modal_detail_win_label" aria-hidden="true" data-v-f15e0237><div class="modal-dialog modal-dialog-centered container" data-v-f15e0237><div class="modal-content" data-v-f15e0237><div class="modal-header" data-v-f15e0237><div class="modal-title" id="modal_detail_win_label" data-v-f15e0237>${ssrInterpolate(oddCompanyName.value)} T\u1EF7 l\u1EC7 thay \u0111\u1ED5i </div><button type="button" class="btn-close" aria-label="Close" data-v-f15e0237></button></div><div class="modal-body" data-v-f15e0237><div id="" class="layui-layer-content detail_win" data-v-f15e0237><div class="popinfo" data-v-f15e0237>`);
      _push(ssrRenderComponent(_component_PopupOddsChange, {
        "odd-comp-id": oddCompanyId.value,
        "match-id": matchIdSlug.value,
        section: "handicapDetail",
        "odd-companys-list": oddCompanys.value,
        "refresh-time": refreshTime.value
      }, null, _parent));
      _push(`</div></div></div></div></div></div><div class="modal fade" id="modal_filter_comp" tabindex="-1" aria-labelledby="modal_filter_comp_label" aria-hidden="true" data-v-f15e0237><div class="modal-dialog modal-dialog-centered" data-v-f15e0237><div class="modal-content" data-v-f15e0237><div class="modal-header" data-v-f15e0237><div class="modal-title" id="modal_filter_comp_label" data-v-f15e0237> Ch\u1ECDn c\xF4ng ty </div><button type="button" class="btn-close" aria-label="Close" data-v-f15e0237></button></div><div class="modal-body" data-v-f15e0237><div class="layui-layer-content oddscomp-filterwin" data-v-f15e0237><ul id="oddscompFilterWin" class="popinfo" data-v-f15e0237><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (oddCompany, index) => {
        _push(`<li${ssrRenderAttr("value", oddCompany == null ? void 0 : oddCompany.id)} class="${ssrRenderClass([oCompanySelected.value.includes(oddCompany == null ? void 0 : oddCompany.id) ? "on" : "", "complist"])}" data-v-f15e0237><i class="check-circled" data-v-f15e0237></i> ${ssrInterpolate(oddCompany == null ? void 0 : oddCompany.name)}</li>`);
      });
      _push(`<!--]--></ul><div id="winTips" class="tips" style="${ssrRenderStyle(((_a2 = oCompanySelected.value) == null ? void 0 : _a2.length) === 0 ? null : { display: "none" })}" data-v-f15e0237>*Ch\u1ECDn \xEDt nh\u1EA5t 1 c\xF4ng ty</div></div></div><div class="modal-footer" style="${ssrRenderStyle({ "display": "none" })}" data-v-f15e0237><button type="button" class="btn btn-primary"${ssrIncludeBooleanAttr(((_b2 = oCompanySelected.value) == null ? void 0 : _b2.length) === 0 ? true : false) ? " disabled" : ""} data-v-f15e0237>OK</button></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/odds/euro-handicap-odds/[match_id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EuroHandicapOdds = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f15e0237"]]);

export { EuroHandicapOdds as default };
//# sourceMappingURL=_match_id_-DUS0qPUp.mjs.map
