import _sfc_main$1 from './HotLeaguesComponent-DscgjV4j.mjs';
import _sfc_main$2 from './LivescoreComponent-ChD6_-oQ.mjs';
import { e as useRouter, d as useHead } from './server.mjs';
import { defineComponent, ref, withAsyncContext, nextTick, mergeProps, unref, useSSRContext } from 'vue';
import { a as useFetch } from './fetch-CC0zbYw2.mjs';
import { c as createUrl } from './createUrl-DyOxdY5I.mjs';
import { A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { g as getConfig } from './helper-CGhdpGxz.mjs';
import { h as LIVESCORE_PAGE } from './constants-DJp0NbxW.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import './BaseImage-oG5tRcgk.mjs';
import './NuxtImg-z5Tschba.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import './useApi-C5Ep8F8o.mjs';
import './livescore_helper-4bdWaxk-.mjs';
import './moment_helper-C2kP4D4M.mjs';
import 'moment-timezone';
import 'crypto-js';
import 'pako';
import 'buffer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@unhead/addons';
import 'vue3-snackbar';
import './router_helper-BQtO3to1.mjs';
import '@vueuse/core';
import './wsocket-BREvIJI8.mjs';
import './useMatchStore-Dgc_MSrX.mjs';
import './useActions-CkrJjy4V.mjs';
import '@vueuse/sound';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const storeSystems = systemsStore();
    const router = useRouter();
    (_a = router.currentRoute.value) == null ? void 0 : _a.path;
    const title = ref();
    const description = ref();
    const pageContent = ref();
    const h1Content = ref(null);
    const fetchPage = async (slug) => {
      try {
        await useFetch(createUrl(API_ROUTERS.PAGE.SLUG, {
          query: {
            slug
          }
        }), "$WrWYAZmaBR").then((resData) => {
          var _a3, _b2;
          var _a2, _b, _c, _d, _e, _f, _g, _h;
          title.value = (_a3 = (_b = (_a2 = resData == null ? void 0 : resData.data) == null ? void 0 : _a2.value) == null ? void 0 : _b.title) != null ? _a3 : getConfig(storeSystems.configurations, "SEO_META_TITLE"), description.value = (_b2 = (_d = (_c = resData == null ? void 0 : resData.data) == null ? void 0 : _c.value) == null ? void 0 : _d.meta_description) != null ? _b2 : getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION");
          pageContent.value = (_f = (_e = resData == null ? void 0 : resData.data) == null ? void 0 : _e.value) == null ? void 0 : _f.content;
          h1Content.value = (_h = (_g = resData == null ? void 0 : resData.data) == null ? void 0 : _g.value) == null ? void 0 : _h.title;
        });
      } catch (e) {
        title.value = getConfig(storeSystems.configurations, "SEO_META_TITLE") ? getConfig(storeSystems.configurations, "SEO_META_TITLE") : "";
        description.value = getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION") ? getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION") : "";
      }
    };
    [__temp, __restore] = withAsyncContext(() => fetchPage("ket-qua-bong-da")), await __temp, __restore();
    nextTick(async () => {
      useHead({
        title: title.value,
        meta: [
          { name: "description", content: description.value },
          { property: "og:title", content: title.value },
          { property: "og:description", content: description.value }
        ]
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HotLeaguesComponent = _sfc_main$1;
      const _component_LivescoreComponent = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mcontent" }, _attrs))}><div id="main" class="container row"><div id="left" class="col-md-2 col-lg-2 d-none d-sm-none d-md-inline-block">`);
      _push(ssrRenderComponent(_component_HotLeaguesComponent, null, null, _parent));
      _push(`<div><div id="div_survey" style="${ssrRenderStyle({ "position": "absolute", "visibility": "visible", "z-index": "100", "padding": "5px 0 5px 0" })}"><div id="left_float_ad"></div><div style="${ssrRenderStyle({ "width": "135px" })}"></div></div></div></div>`);
      _push(ssrRenderComponent(_component_LivescoreComponent, {
        h1: unref(h1Content),
        page: ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).RESULTS,
        content: unref(pageContent)
      }, null, _parent));
      _push(`<span class="clear"></span></div><div id="div_ad_float" style="${ssrRenderStyle({ "position": "absolute", "visibility": "visible", "z-index": "100" })}"></div><span id="allDate"></span><span id="span_detail"></span><span id="span_sbDetail"></span><span id="span_panlu"></span><div id="oddsChange" style="${ssrRenderStyle({ "position": "absolute", "z-index": "100", "top": "100px", "left": "200px", "visibility": "hidden" })}" onmouseover="MM_showHideLayers(&#39;oddsChange&#39;,&#39;&#39;,&#39;show&#39;)" onmouseout="MM_showHideLayers(&#39;oddsChange&#39;,&#39;&#39;,&#39;hide&#39;);clearSbdata();"></div><div id="panluDiv" style="${ssrRenderStyle({ "position": "absolute", "z-index": "100", "top": "100px", "left": "148px", "visibility": "hidden" })}" onmouseover="MM_showHideLayers(&#39;panluDiv&#39;,&#39;&#39;,&#39;show&#39;)" onmouseout="MM_showHideLayers(&#39;panluDiv&#39;,&#39;&#39;,&#39;hide&#39;)"></div><div id="sbOddsCorner" class="livetab" style="${ssrRenderStyle({ "position": "absolute", "z-index": "100", "top": "100px", "left": "100px", "width": "400px", "visibility": "hidden" })}" onmouseover="MM_showHideLayers(&#39;sbOddsCorner&#39;,&#39;&#39;,&#39;show&#39;)" onmouseout="MM_showHideLayers(&#39;sbOddsCorner&#39;,&#39;&#39;,&#39;hide&#39;)"></div><input type="hidden" id="ifShow" value="0"><input type="hidden" id="ifShowCorner" value="0"><span id="span_sbCorner"></span></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/results/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D__YqYEf.mjs.map
