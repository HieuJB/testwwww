import { mergeModels, useModel, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "TabTableMobile",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    titleList: Array,
    isHideTitle: Boolean
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["onActiveTab"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const tabActive = useModel(__props, "modelValue");
    const titleActive = computed(() => {
      return props.titleList.find((item) => item.id === tabActive.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-187de330><div class="product-selector" style="${ssrRenderStyle({ "display": "flex" })}" data-v-187de330><!--[-->`);
      ssrRenderList(__props.titleList, (item, index) => {
        _push(`<span class="${ssrRenderClass([
          {
            active: tabActive.value === item.id
          }
        ])}" data-v-187de330>${ssrInterpolate(item.name)}</span>`);
      });
      _push(`<!--]--></div>`);
      if (unref(titleActive) && !__props.isHideTitle) {
        _push(`<div class="d-flex justify-center title-name items-center" data-v-187de330>${ssrInterpolate(unref(titleActive).name)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TabTableMobile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-187de330"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=TabTableMobile-Bxqz4q-j.mjs.map
