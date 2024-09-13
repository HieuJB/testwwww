import { _ as __nuxt_component_0 } from './server-placeholder-BFzIFO-1.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = {
  __name: "ModalRegister",
  __ssrInlineRender: true,
  emits: ["openModalLogin"],
  setup(__props, { emit: __emit }) {
    const modalRegisterInstance = ref(null);
    const isRender = ref(true);
    const closeModalRegister = async () => {
      if (modalRegisterInstance.value) {
        modalRegisterInstance.value.hide();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RegisterForm = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref: "modalRegister",
        class: "modal fade",
        id: "modal_register",
        tabindex: "-1",
        "aria-labelledby": "modal_register_label",
        "aria-hidden": "true"
      }, _attrs))}><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header d-none"><div class="modal-title" id="modal_register_label">\u0110\u0103ng k\xFD</div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div id="login_body" class="regBox"><div class="title"><span class="peer icon iconfont icon-font-return back"></span><div class="mh2"> \u0110\u0103ng k\xFD </div><span class="iconfont icon-close"></span></div>`);
      if (unref(isRender)) {
        _push(ssrRenderComponent(_component_RegisterForm, { onCloseModalRegister: closeModalRegister }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ModalRegister.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ModalRegister-C-UufsAP.mjs.map
