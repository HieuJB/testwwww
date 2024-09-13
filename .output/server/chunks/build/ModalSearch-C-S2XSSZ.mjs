import { _ as __nuxt_component_0 } from './server-placeholder-BFzIFO-1.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = {
  __name: "ModalSearch",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SearchPopupComponent = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "modal fade",
        id: "modal_search",
        tabindex: "-1",
        "aria-labelledby": "modal_search_label",
        "aria-hidden": "true"
      }, _attrs))}><div class="modal-dialog modal-dialog-centered container">`);
      _push(ssrRenderComponent(_component_SearchPopupComponent, null, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ModalSearch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ModalSearch-C-S2XSSZ.mjs.map
