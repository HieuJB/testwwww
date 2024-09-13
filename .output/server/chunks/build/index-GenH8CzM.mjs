import { defineComponent, ref, computed, withAsyncContext, nextTick, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { a as useFetch } from './fetch-CC0zbYw2.mjs';
import { A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { g as getConfig } from './helper-CGhdpGxz.mjs';
import { d as useHead } from './server.mjs';
import { h as LIVESCORE_PAGE } from './constants-DJp0NbxW.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { useWindowSize } from '@vueuse/core';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { width } = useWindowSize();
    const storeSystems = systemsStore();
    const title = ref();
    const description = ref();
    const homeContent = ref("");
    const h1Content = ref(null);
    computed(() => {
      return width.value > 768;
    });
    const fetchHomePage = async () => {
      try {
        await useFetch(API_ROUTERS.PAGE.HOME_PAGE, "$Gr1VhLfoVk").then((resData) => {
          var _a2, _b2;
          var _a, _b, _c, _d, _e, _f, _g, _h;
          title.value = (_a2 = (_b = (_a = resData == null ? void 0 : resData.data) == null ? void 0 : _a.value) == null ? void 0 : _b.meta_title) != null ? _a2 : getConfig(storeSystems.configurations, "SEO_META_TITLE"), description.value = (_b2 = (_d = (_c = resData == null ? void 0 : resData.data) == null ? void 0 : _c.value) == null ? void 0 : _d.meta_description) != null ? _b2 : getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION");
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
      useHead({
        title: title.value,
        meta: [
          { name: "description", content: description.value },
          { property: "og:title", content: title.value },
          { property: "og:description", content: description.value }
        ]
      });
    });
    useHead(() => ({
      meta: [{ name: "robots", content: "noindex" }]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LivescoreComponentIframe = resolveComponent("LivescoreComponentIframe");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mcontent" }, _attrs))}><div id="main" class="row">`);
      _push(ssrRenderComponent(_component_LivescoreComponentIframe, {
        h1: unref(h1Content),
        page: ("LIVESCORE_PAGE" in _ctx ? _ctx.LIVESCORE_PAGE : unref(LIVESCORE_PAGE)).LIVESCORE,
        content: unref(homeContent)
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/iframe/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-GenH8CzM.mjs.map
