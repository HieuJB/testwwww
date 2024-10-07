import { defineAsyncComponent, ref, computed, withAsyncContext, nextTick, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, createCommentVNode, useSSRContext } from 'vue';
import { s as systemsStore, a7 as useState, e as useCookie, ab as useHead, ao as LIVESCORE_PAGE, C as useNuxtApp, g as getConfig, ad as useFetch, E as API_ROUTERS, ap as __nuxt_component_1 } from './server.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { LazyHydrationWrapper } from 'vue3-lazy-hydration';
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
import '@vueuse/core';
import 'moment-timezone';
import 'crypto-js';
import 'pako';
import 'buffer';
import '@vueuse/sound';

const __nuxt_component_0_lazy = defineAsyncComponent(() => import('./server.mjs').then(function(n) {
  return n.aP;
}).then((c) => c.default || c));
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { $isMobile, $isloadScripts, $isBot } = useNuxtApp();
    const storeSystems = systemsStore();
    const title = ref("");
    const description = ref("");
    const homeContent = ref("");
    const h1Content = ref(null);
    const isHidden = useState("my-shallow-state");
    const seoMeta = useState("seoMeta", () => null);
    const seoMetaList = useState("seoMeta");
    const settingsData = useCookie("settingsData");
    const isHydration = computed(() => {
      var _a, _b;
      if ($isMobile.value && !((_a = settingsData.value) == null ? void 0 : _a.orderByTime)) {
        if ($isBot) {
          return $isloadScripts == null ? void 0 : $isloadScripts.value;
        } else {
          return true;
        }
      } else if ((_b = settingsData.value) == null ? void 0 : _b.orderByTime) {
        return true;
      } else if (!$isMobile.value) {
        if ($isBot) {
          return $isloadScripts == null ? void 0 : $isloadScripts.value;
        } else {
          return true;
        }
      } else {
        return $isloadScripts == null ? void 0 : $isloadScripts.value;
      }
    });
    const fetchHomePage = async () => {
      var _a, _b;
      try {
        if (seoMetaList.value) {
          title.value = (_a = seoMetaList.value.title) != null ? _a : getConfig(storeSystems.configurations, "SEO_META_TITLE"), description.value = (_b = seoMetaList.value.meta_description) != null ? _b : getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION");
          homeContent.value = seoMetaList.value.content;
          h1Content.value = seoMetaList.value.title;
          return;
        }
        await useFetch(API_ROUTERS.PAGE.HOME_PAGE, "$PslAyef5YX").then((resData) => {
          var _a3, _b3;
          var _a2, _b2, _c, _d, _e, _f, _g, _h;
          seoMeta.value = resData.data.value;
          title.value = (_a3 = (_b2 = (_a2 = resData == null ? void 0 : resData.data) == null ? void 0 : _a2.value) == null ? void 0 : _b2.title) != null ? _a3 : getConfig(storeSystems.configurations, "SEO_META_TITLE"), description.value = (_b3 = (_d = (_c = resData == null ? void 0 : resData.data) == null ? void 0 : _c.value) == null ? void 0 : _d.meta_description) != null ? _b3 : getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION");
          homeContent.value = (_f = (_e = resData == null ? void 0 : resData.data) == null ? void 0 : _e.value) == null ? void 0 : _f.content;
          h1Content.value = (_h = (_g = resData == null ? void 0 : resData.data) == null ? void 0 : _g.value) == null ? void 0 : _h.title;
        });
      } catch (e) {
        title.value = getConfig(storeSystems.configurations, "SEO_META_TITLE") ? getConfig(storeSystems.configurations, "SEO_META_TITLE") : "";
        description.value = getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION") ? getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION") : "";
      }
    };
    [__temp, __restore] = withAsyncContext(() => fetchHomePage()), await __temp, __restore();
    nextTick(async () => {
      var _a, _b;
      useHead({
        title: (_a = h1Content.value) != null ? _a : title.value,
        meta: [
          { name: "description", content: description.value },
          { property: "og:title", content: (_b = h1Content.value) != null ? _b : title.value },
          { property: "og:description", content: description.value }
        ]
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LazyHotLeaguesComponent = __nuxt_component_0_lazy;
      const _component_LivescoreComponent = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mcontent" }, _attrs))}><div id="main" class="${ssrRenderClass([{ container: !unref(isHidden) }, "row"])}">`);
      _push(ssrRenderComponent(unref(LazyHydrationWrapper), { "when-triggered": unref($isloadScripts) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(isHidden)) {
              _push2(`<div id="left" class="col-md-2 col-lg-2 d-none d-sm-none d-md-inline-block"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_LazyHotLeaguesComponent, null, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !unref(isHidden) ? (openBlock(), createBlock("div", {
                key: 0,
                id: "left",
                class: "col-md-2 col-lg-2 d-none d-sm-none d-md-inline-block"
              }, [
                createVNode(_component_LazyHotLeaguesComponent)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(LazyHydrationWrapper), { "when-triggered": unref(isHydration) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LivescoreComponent, {
              h1: unref(h1Content),
              page: ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE,
              content: unref(homeContent)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LivescoreComponent, {
                h1: unref(h1Content),
                page: ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE,
                content: unref(homeContent)
              }, null, 8, ["h1", "page", "content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-pCNUTCuT.mjs.map
