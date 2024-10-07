import { ref, createVNode, resolveDynamicComponent, unref, useSSRContext, nextTick } from 'vue';
import { ssrRenderVNode } from 'vue/server-renderer';

const _sfc_main = {
  __name: "HotLeaguesMobile",
  __ssrInlineRender: true,
  setup(__props) {
    const hotLeagues = ref(null);
    const onClickLeague = () => {
      nextTick(() => {
        (void 0).documentElement.querySelector("#close-league").click();
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="icon-list_match-setting d-block d-sm-block d-md-none"><div class="list_match"><a class="btn-icon" data-bs-toggle="offcanvas" href="#offcanvasLeft" role="button" aria-controls="offcanvasLeft" aria-label="Tournament list"><i class="icon iconfont icon-font-menu"></i></a></div></div><div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel"><div class="offcanvas-header d-none"><div class="offcanvas-title" id="offcanvasLeftLabel">Hot Leagues</div><button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" id="close-league"></button></div><div class="offcanvas-body">`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(hotLeagues)), { onOnClick: onClickLeague }, null), _parent);
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HotLeaguesMobile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=HotLeaguesMobile-CM7u0lGe.mjs.map
