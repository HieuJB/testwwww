import { _ as _sfc_main$1 } from './BaseImage-oG5tRcgk.mjs';
import { _ as _export_sfc, u as useRoute, d as useHead, f as __nuxt_component_0$2 } from './server.mjs';
import { useSSRContext, defineComponent, ref, watch, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { R as ROUTERS, A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { a as useFetch } from './fetch-CC0zbYw2.mjs';
import { c as createUrl } from './createUrl-DyOxdY5I.mjs';
import { g as getConfig } from './helper-CGhdpGxz.mjs';
import { a as getLiveScoreImage } from './livescore_helper-4bdWaxk-.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import './NuxtImg-z5Tschba.mjs';
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
import './constants-DJp0NbxW.mjs';
import 'crypto-js';
import 'pako';
import 'buffer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d;
    let __temp, __restore;
    const storeSystems = systemsStore();
    const route = useRoute();
    const winPositionList = ref({ top: "0px", left: "0px" });
    const positionPopup = ref("");
    const compId = ref("");
    const warehouseOriginData = ref([]);
    const warehouseData = ref([]);
    ref(0);
    const showListLeagues = ref(false);
    ref();
    const divListBgHover = ref();
    const leagueList = ref([]);
    const categoryCountry = ref([]);
    const categoryIdSelected = ref("");
    const virtualCountry = ref([]);
    const leagueContent = ref("");
    const leagueTitle = ref("");
    ref();
    const description = ref();
    const keyword = ref();
    const fetchWarehouse = async () => {
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.WAREHOUSE,
        []
      ).then(async (resData) => {
        var _a2, _b2;
        if (resData) {
          categoryCountry.value = resData == null ? void 0 : resData.filter((item) => !["x4zp5rzgh2q82w1"].includes(item.category_id));
          virtualCountry.value = (_a2 = categoryCountry.value) == null ? void 0 : _a2.map((item) => {
            var _a22;
            return {
              category_id: item.category_id,
              type: "category",
              logo_o: item.category_id + ".png",
              country_name: item.category_name_vi || item.category_name,
              competitions: (_a22 = item == null ? void 0 : item.national) == null ? void 0 : _a22.competitions
            };
          });
          warehouseOriginData.value = resData;
          warehouseData.value = (_b2 = resData == null ? void 0 : resData.map((item) => item == null ? void 0 : item.countries)) == null ? void 0 : _b2.flat();
          warehouseData.value = [...warehouseData.value, ...virtualCountry.value];
        }
      });
    };
    const fetchConfigurations = async () => {
      var _a2;
      try {
        const resData = await useFetch(createUrl(API_ROUTERS.CONFIGURATIONS), "$2MCLmvExZJ");
        storeSystems.configurations = ((_a2 = resData.data.value) == null ? void 0 : _a2.configurations) || [];
      } catch (e) {
      }
    };
    watch(
      () => route,
      (newPath) => {
        var _a2;
        const idSlug = (_a2 = newPath == null ? void 0 : newPath.path) == null ? void 0 : _a2.match(/[^/-]+$/);
        compId.value = idSlug ? idSlug[0] : "";
      },
      { immediate: true }
    );
    if (!storeSystems.configurations) {
      [__temp, __restore] = withAsyncContext(() => fetchConfigurations()), await __temp, __restore();
    }
    leagueContent.value = (_a = getConfig(storeSystems.configurations, "LEAGUE_CONTENT")) != null ? _a : "";
    leagueTitle.value = (_b = getConfig(storeSystems.configurations, "LEAGUE_TITLE")) != null ? _b : "";
    description.value = (_c = getConfig(storeSystems.configurations, "LEAGUE_DESCRIPTION")) != null ? _c : "";
    keyword.value = (_d = getConfig(storeSystems.configurations, "LEAGUE_KEYWORD")) != null ? _d : "";
    useHead({
      title: () => leagueTitle.value,
      meta: [
        { name: "description", content: () => description.value },
        { property: "og:title", content: () => leagueTitle.value },
        { property: "og:description", content: () => description.value },
        { name: "keywords", content: () => keyword.value }
      ]
    });
    [__temp, __restore] = withAsyncContext(() => fetchWarehouse()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      const _component_BaseImage = _sfc_main$1;
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "warehouse-screen",
        class: "mcontent container"
      }, _attrs))} data-v-26389cf3><div id="info" class="" style="${ssrRenderStyle({ "min-height": "800px" })}" data-v-26389cf3><div id="flag-content" data-v-26389cf3><div class="Area d-none d-md-flex" data-v-26389cf3><ul class="d-flex" data-v-26389cf3><li id="menu_0" class="${ssrRenderClass(unref(categoryIdSelected) === "" ? "Area-selected" : "Area-unselected")}" data-v-26389cf3><span data-v-26389cf3> T\u1EA5t c\u1EA3 </span></li><!--[-->`);
      ssrRenderList(unref(categoryCountry), (item, index2) => {
        _push(`<li${ssrRenderAttr("id", "tab_category_" + (item == null ? void 0 : item.category_id))} class="${ssrRenderClass(unref(categoryIdSelected) === (item == null ? void 0 : item.category_id) ? "Area-selected" : "Area-unselected")}" data-v-26389cf3><span data-v-26389cf3>${ssrInterpolate((item == null ? void 0 : item.category_name_vi) || (item == null ? void 0 : item.category_name))}</span></li>`);
      });
      _push(`<!--]--></ul></div><div class="area-mobile d-block d-sm-block d-md-none" data-v-26389cf3><ul class="d-flex" data-v-26389cf3><li id="menu_0" class="${ssrRenderClass(unref(categoryIdSelected) === "" ? "Area-selected" : "Area-unselected")}" data-v-26389cf3><a href="#header-wrapper" title="T\u1EA5t c\u1EA3" data-v-26389cf3><span data-v-26389cf3> T\u1EA5t c\u1EA3 </span></a></li><!--[-->`);
      ssrRenderList(unref(categoryCountry), (item, index2) => {
        _push(`<li id="menu_1" class="${ssrRenderClass(unref(categoryIdSelected) === (item == null ? void 0 : item.category_id) ? "Area-selected" : "Area-unselected")}" data-v-26389cf3><a href="#header-wrapper"${ssrRenderAttr("title", (item == null ? void 0 : item.category_name_vi) || (item == null ? void 0 : item.category_name))} data-v-26389cf3><span data-v-26389cf3>${ssrInterpolate((item == null ? void 0 : item.category_name_vi) || (item == null ? void 0 : item.category_name))}</span></a></li>`);
      });
      _push(`<!--]--></ul></div><div class="gameList" id="allSclassList" data-v-26389cf3><!--[-->`);
      ssrRenderList((_a2 = unref(warehouseData)) == null ? void 0 : _a2.filter((country) => country == null ? void 0 : country.country_name), (country, index2) => {
        _push(`<!--[-->`);
        if (country == null ? void 0 : country.country_name) {
          _push(`<div class="${ssrRenderClass([unref(divListBgHover) === index2 ? "divList_hover" : "", "divList"])}" infotype="1" style="${ssrRenderStyle({ "display": "block" })}" data-v-26389cf3><div class="div_inner_top" data-v-26389cf3><div class="div-inner-top-img" data-v-26389cf3>`);
          if (!(country == null ? void 0 : country.type)) {
            _push(ssrRenderComponent(_component_BaseImage, {
              src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(country == null ? void 0 : country.logo_o, "country") + "!h80",
              alt: (country == null ? void 0 : country.country_name) || "",
              loading: "lazy"
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_BaseImage, {
              src: "/icon/flag/" + (country == null ? void 0 : country.logo_o),
              alt: (country == null ? void 0 : country.country_name) || "",
              loading: "lazy",
              height: "70"
            }, null, _parent));
          }
          _push(`</div></div><div class="div_inner_bottom" id="InfoID_1bottomDiv" data-v-26389cf3><span class="div_inner_bottom_span" id="InfoID_1bottomSpan" data-v-26389cf3>${ssrInterpolate(country == null ? void 0 : country.country_name)}</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div><div class="${ssrRenderClass([unref(positionPopup), "floatDiv"])}" style="${ssrRenderStyle([
        { "position": "absolute" },
        { position: "absolute", top: unref(winPositionList).top, left: unref(winPositionList).left, zIndex: 100 },
        unref(showListLeagues) ? null : { display: "none" }
      ])}" data-v-26389cf3><div class="ulDiv" style="${ssrRenderStyle({ "z-index": "19", "left": "-2px" })}" data-v-26389cf3>`);
      if (((_b2 = unref(leagueList)) == null ? void 0 : _b2.length) > 0) {
        _push(`<ul class="div_inner_bottom_span_ul" data-v-26389cf3><!--[-->`);
        ssrRenderList(unref(leagueList), (item, index2) => {
          _push(`<li class="data-league" data-v-26389cf3>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            href: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).LEAGUES + "/" + (item == null ? void 0 : item.competition_id),
            title: item == null ? void 0 : item.competition_name
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item == null ? void 0 : item.competition_name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item == null ? void 0 : item.competition_name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<ul class="div_inner_bottom_span_ul" data-v-26389cf3><li class="no-data" data-v-26389cf3>Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u</li></ul>`);
      }
      _push(`</div></div><div id="content-page" class="mt-5" data-v-26389cf3>`);
      if (unref(leagueTitle)) {
        _push(`<h1 class="page_title" data-v-26389cf3>${ssrInterpolate(unref(leagueTitle))}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(leagueContent))}</div><br style="${ssrRenderStyle({ "clear": "both" })}" data-v-26389cf3><br style="${ssrRenderStyle({ "clear": "both" })}" data-v-26389cf3></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/league/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-26389cf3"]]);

export { index as default };
//# sourceMappingURL=index-35TAPIgn.mjs.map
