import { _ as __nuxt_component_0 } from './server-placeholder-BFzIFO-1.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { b as useShareCommon } from './server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "ModalRegister",
  __ssrInlineRender: true,
  emits: ["openModalLogin"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const modalRegisterInstance = ref(null);
    const isRender = ref(true);
    const { useLocale, $t } = useShareCommon();
    const closeModalRegister = async () => {
      if (modalRegisterInstance.value) {
        modalRegisterInstance.value.hide();
      }
    };
    const openModalLogin = () => {
      closeModalRegister();
      setTimeout(() => {
        emit("openModalLogin");
      }, 200);
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
      }, _attrs))}><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header d-none"><div class="modal-title" id="modal_register_label">${ssrInterpolate(unref($t)("Register"))}</div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div id="login_body" class="regBox"><div class="title"><span class="peer icon iconfont icon-font-return back"></span><div class="mh2">${ssrInterpolate(unref($t)("Register"))}</div><span class="iconfont icon-close"></span></div>`);
      if (unref(isRender)) {
        _push(ssrRenderComponent(_component_RegisterForm, {
          onCloseModalRegister: closeModalRegister,
          onOpenModalLogin: openModalLogin
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ModalRegister.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ModalRegister-DyFZ6T-F.mjs.map
