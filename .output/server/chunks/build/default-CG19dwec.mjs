import { _ as __nuxt_component_0 } from './nuxt-link-D0gKVJgl.mjs';
import { useSSRContext, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import './server.mjs';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';

const _imports_0 = publicAssetsURL("/static/yts/image/logo-YTS.svg");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(_attrs)}><header class="nav-bar"><div class="nav-logo pull-left">`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="YIFY"${_scopeId}>`);
      } else {
        return [
          createVNode("img", {
            src: _imports_0,
            alt: "YIFY"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><span class="header-slogan hidden-xs pull-left">HD movies at the smallest file size.</span><div class="main-nav-links hidden-sm hidden-xs"><form method="GET" action="/search-movies" accept-charset="UTF-8" id="quick-search" name="quick-search"><div id="quick-search-container"><input id="quick-search-input" name="query" autocomplete="off" type="search" value="Quick search"><div class="ajax-spinner"></div></div></form><ul class="nav-links"><li><a href="/"> Home </a></li><li><a href="/browse-movies?keyword=&amp;quality=2160p&amp;genre=all&amp;rating=0&amp;year=0&amp;order_by=latest" style="${ssrRenderStyle({ "color": "#6AC045" })}"> 4K </a></li><li><a href="/browse-movies"> Browse Movies </a></li></ul></div><div class="nav-mobile-buttons hidden-md hidden-lg"><a class="touchable" id="mobile-search-btn" href="javascript:void(0)"><span class="glyphicon glyphicon-search"></span></a><a class="touchable" href="/browse-movies"><span class="glyphicon glyphicon-list-alt"></span></a></div></header>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-CG19dwec.mjs.map
