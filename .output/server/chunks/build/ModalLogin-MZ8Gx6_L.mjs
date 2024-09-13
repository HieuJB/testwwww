import { _ as __nuxt_component_0 } from './server-placeholder-BFzIFO-1.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = {
  __name: "ModalLogin",
  __ssrInlineRender: true,
  emits: ["openModalRegister"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const modalLoginInstance = ref(null);
    const isRender = ref(true);
    const closeLoginForm = async () => {
      if (modalLoginInstance.value) {
        modalLoginInstance.value.hide();
      }
    };
    const closeModal = () => {
      closeLoginForm();
      setTimeout(() => {
        emit("openModalRegister");
      }, 200);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoginForm = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref: "modalLogin",
        class: "modal fade",
        id: "modal_login",
        tabindex: "-1",
        "aria-labelledby": "modal_login_label",
        "aria-hidden": "true"
      }, _attrs))}><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header d-none"><div class="modal-title" id="modal_login_label">\u0110\u0103ng nh\u1EADp</div><button type="button" class="btn-close" aria-label="Close"></button></div><div id="login_body" class="regBox"><div class="title"><span class=""></span><div class="mh2"> \u0110\u0103ng nh\u1EADp </div><span class="iconfont icon-close"></span></div>`);
      if (unref(isRender)) {
        _push(ssrRenderComponent(_component_LoginForm, {
          onCloseModalLogin: closeLoginForm,
          onOpenModalRegister: closeModal
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ModalLogin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ModalLogin-MZ8Gx6_L.mjs.map
