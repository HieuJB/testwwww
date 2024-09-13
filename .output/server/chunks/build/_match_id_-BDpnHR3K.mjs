import { _ as __nuxt_component_0 } from './server-placeholder-BFzIFO-1.mjs';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import { _ as _export_sfc, u as useRoute, b as useCookie } from './server.mjs';
import { O as ODD_COMPANY_DEFAULT, b as ODD_COMPANYS } from './constants-DJp0NbxW.mjs';
import { g as getConfig } from './helper-CGhdpGxz.mjs';
import { useSSRContext, defineComponent, mergeModels, ref, useModel, reactive, watch, withAsyncContext, mergeProps, unref } from 'vue';
import { A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { E as getOddsCorrectScore } from './livescore_helper-4bdWaxk-.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { s as socketStore } from './wsocket-BREvIJI8.mjs';
import { u as useMatchStore } from './useMatchStore-Dgc_MSrX.mjs';
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
      const _component_PopupOddsChange = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "",
        class: "match-odds"
      }, _attrs))} data-v-d1fd39a5><div id="" data-v-d1fd39a5><div id="CompanyOddsDiv" class="company-comp" data-v-d1fd39a5><div class="rankbox" data-v-d1fd39a5><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-d1fd39a5><tbody data-v-d1fd39a5><tr class="tr-title" data-v-d1fd39a5><th colspan="2" rowspan="1" data-v-d1fd39a5><b data-v-d1fd39a5>C\xF4ng ty</b></th><th data-v-d1fd39a5></th></tr><!--[-->`);
      ssrRenderList(oddsCorrectScore.value, (item, index) => {
        var _a3, _b3;
        _push(`<tr name="oddsTr" style="${ssrRenderStyle({ "text-align": "center" })}" cid="31" class="${ssrRenderClass(index % 2 === 0 ? "tb-bgcolor1" : "tb-bgcolor1")}" data-v-d1fd39a5><td width="60%" height="30" class="rb" data-v-d1fd39a5>${ssrInterpolate((_b3 = (_a3 = "ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS)) == null ? void 0 : _a3.find((comp) => (comp == null ? void 0 : comp.isportsapi) === (item == null ? void 0 : item.i_company_id))) == null ? void 0 : _b3.name)}</td><td data-v-d1fd39a5><span data-v-d1fd39a5>Ch\u1EE7</span><span data-v-d1fd39a5>Kh\xE1ch</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata" width="75%" data-v-d1fd39a5><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" data-v-d1fd39a5><tbody data-v-d1fd39a5><tr class="tr-title" data-v-d1fd39a5><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>1:0</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>2:0</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>2:1</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>3:0</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>3:1</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>3:2</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>4:0</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>4:1</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>4:2</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>4:3</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>0:0</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>1:1</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>2:2</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>3:3</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>4:4</b></th><th width="5%" data-v-d1fd39a5><b data-v-d1fd39a5>Kh\xE1c</b></th><th width="6%" data-v-d1fd39a5><b data-v-d1fd39a5>Chi ti\u1EBFt</b></th></tr><!--[-->`);
      ssrRenderList(oddsCorrectScore.value, (item, index) => {
        var _a3;
        _push(`<tr name="oddsTr" style="${ssrRenderStyle({ "text-align": "center" })}" cid="31" class="${ssrRenderClass(index % 2 === 0 ? "tb-bgcolor1" : "tb-bgcolor1")}" data-v-d1fd39a5><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 1, 0))}</span><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 0, 1))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 2, 0))}</span><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 0, 2))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 2, 1))}</span><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 1, 2))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 3, 0))}</span><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 0, 3))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 3, 1))}</span><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 1, 3))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 3, 2))}</span><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 2, 3))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 4, 0))}</span><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 0, 4))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 4, 1))}</span><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 1, 4))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 4, 2))}</span><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 2, 4))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 4, 3))}</span><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 3, 4))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 0, 0))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 1, 1))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 2, 2))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 3, 3))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate(("getOddsCorrectScore" in _ctx ? _ctx.getOddsCorrectScore : unref(getOddsCorrectScore))(item == null ? void 0 : item.odds, 4, 4))}</span></td><td width="3%" data-v-d1fd39a5><span data-v-d1fd39a5>${ssrInterpolate((_a3 = item == null ? void 0 : item.odds) == null ? void 0 : _a3.otherScoresOdds)}</span></td><td width="3%" data-v-d1fd39a5><span class="odd_a" data-v-d1fd39a5> Thay \u0111\u1ED5i </span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div><div id="content-page" class="mt-5" data-v-d1fd39a5>`);
      if (matchTitle.value) {
        _push(`<h1 class="page_title" data-v-d1fd39a5>${ssrInterpolate(matchTitle.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(matchContent.value)}</div></div><div class="modal fade" id="modal_detail_win" tabindex="-1" aria-labelledby="modal_detail_win_label" aria-hidden="true" data-v-d1fd39a5><div class="modal-dialog modal-dialog-centered container" data-v-d1fd39a5><div class="modal-content" data-v-d1fd39a5><div class="modal-header" data-v-d1fd39a5><div class="modal-title" id="modal_detail_win_label" data-v-d1fd39a5>${ssrInterpolate(oddCompanyName.value)} T\u1EF7 l\u1EC7 thay \u0111\u1ED5i </div><button type="button" class="btn-close" aria-label="Close" data-v-d1fd39a5></button></div><div class="modal-body" data-v-d1fd39a5><div id="" class="layui-layer-content detail_win" data-v-d1fd39a5><div class="popinfo" data-v-d1fd39a5>`);
      _push(ssrRenderComponent(_component_PopupOddsChange, {
        "odd-comp-id": oddCompanyId.value,
        "match-id": matchIdSlug.value,
        section: "correctScore",
        "odd-companys-list": oddCompanys.value,
        "refresh-time": refreshTime.value
      }, null, _parent));
      _push(`</div></div></div></div></div></div><div class="modal fade" id="modal_filter_comp" tabindex="-1" aria-labelledby="modal_filter_comp_label" aria-hidden="true" data-v-d1fd39a5><div class="modal-dialog modal-dialog-centered" data-v-d1fd39a5><div class="modal-content" data-v-d1fd39a5><div class="modal-header" data-v-d1fd39a5><div class="modal-title" id="modal_filter_comp_label" data-v-d1fd39a5> Ch\u1ECDn c\xF4ng ty </div><button type="button" class="btn-close" aria-label="Close" data-v-d1fd39a5></button></div><div class="modal-body" data-v-d1fd39a5><div class="layui-layer-content oddscomp-filterwin" data-v-d1fd39a5><ul id="oddscompFilterWin" class="popinfo" data-v-d1fd39a5><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (oddCompany, index) => {
        _push(`<li${ssrRenderAttr("value", oddCompany == null ? void 0 : oddCompany.id)} class="${ssrRenderClass([oCompanySelected.value.includes(oddCompany == null ? void 0 : oddCompany.id) ? "on" : "", "complist"])}" data-v-d1fd39a5><i class="check-circled" data-v-d1fd39a5></i> ${ssrInterpolate(oddCompany == null ? void 0 : oddCompany.name)}</li>`);
      });
      _push(`<!--]--></ul><div id="winTips" class="tips" style="${ssrRenderStyle(((_a2 = oCompanySelected.value) == null ? void 0 : _a2.length) === 0 ? null : { display: "none" })}" data-v-d1fd39a5>*Ch\u1ECDn \xEDt nh\u1EA5t 1 c\xF4ng ty</div></div></div><div class="modal-footer" style="${ssrRenderStyle({ "display": "none" })}" data-v-d1fd39a5><button type="button" class="btn btn-primary"${ssrIncludeBooleanAttr(((_b2 = oCompanySelected.value) == null ? void 0 : _b2.length) === 0 ? true : false) ? " disabled" : ""} data-v-d1fd39a5>OK</button></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/odds/correct-score-odds/[match_id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CorrectScoreOdds = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d1fd39a5"]]);

export { CorrectScoreOdds as default };
//# sourceMappingURL=_match_id_-BDpnHR3K.mjs.map
