import { _ as _sfc_main$1 } from './NuxtImg-z5Tschba.mjs';
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseImage",
  __ssrInlineRender: true,
  props: {
    src: String,
    imgDefault: String,
    alt: String
  },
  setup(__props) {
    const props = __props;
    const isError = ref(false);
    const initSrcImage = computed(() => {
      var _a;
      return !isError.value ? props.src : (_a = props.imgDefault) != null ? _a : "/img/default-image.webp";
    });
    const handleError = () => {
      isError.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_nuxt_img = _sfc_main$1;
      _push(ssrRenderComponent(_component_nuxt_img, mergeProps({
        src: unref(initSrcImage),
        onError: handleError
      }, _ctx.$attrs, {
        alt: (_a = __props.alt) != null ? _a : unref(initSrcImage)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BaseImage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BaseImage-oG5tRcgk.mjs.map
