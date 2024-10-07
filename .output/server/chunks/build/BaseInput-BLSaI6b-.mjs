import { _ as _export_sfc, b as useShareCommon } from './server.mjs';
import { mergeModels, useModel, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = {
  __name: "BaseInput",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    placeholder: String
  }, {
    "search": {},
    "searchModifiers": {}
  }),
  emits: ["update:search"],
  setup(__props) {
    const { $t, useLocale } = useShareCommon();
    const translate = (key) => {
      const fullKey = `${key} team`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
    const search = useModel(__props, "search");
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "search-box" }, _attrs))} data-v-7df5af58><button class="btn-search" data-v-7df5af58><svg style="${ssrRenderStyle({ "width": "14px" })}" xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" data-v-7df5af58><path d="M19.6714 18.5942L15.8949 14.8287C17.1134 13.2764 17.7745 11.3595 17.7721 9.38603C17.7721 7.62854 17.2509 5.91052 16.2745 4.44922C15.2981 2.98792 13.9103 1.84897 12.2866 1.17641C10.6629 0.50385 8.87617 0.327877 7.15245 0.670746C5.42873 1.01362 3.84539 1.85993 2.60266 3.10266C1.35993 4.34539 0.513616 5.92873 0.170746 7.65245C-0.172123 9.37617 0.00385015 11.1629 0.676412 12.7866C1.34897 14.4103 2.48792 15.7981 3.94922 16.7745C5.41052 17.7509 7.12854 18.2721 8.88603 18.2721C10.8595 18.2745 12.7764 17.6134 14.3287 16.3949L18.0942 20.1714C18.1974 20.2755 18.3203 20.3582 18.4556 20.4146C18.591 20.471 18.7362 20.5 18.8828 20.5C19.0294 20.5 19.1746 20.471 19.31 20.4146C19.4453 20.3582 19.5682 20.2755 19.6714 20.1714C19.7755 20.0682 19.8582 19.9453 19.9146 19.81C19.971 19.6746 20 19.5294 20 19.3828C20 19.2362 19.971 19.091 19.9146 18.9556C19.8582 18.8203 19.7755 18.6974 19.6714 18.5942ZM2.22151 9.38603C2.22151 8.06791 2.61238 6.7794 3.34468 5.68342C4.07699 4.58745 5.11785 3.73324 6.33563 3.22882C7.55341 2.72439 8.89342 2.59241 10.1862 2.84957C11.479 3.10672 12.6665 3.74145 13.5986 4.6735C14.5306 5.60555 15.1653 6.79306 15.4225 8.08585C15.6796 9.37864 15.5477 10.7186 15.0432 11.9364C14.5388 13.1542 13.6846 14.1951 12.5886 14.9274C11.4927 15.6597 10.2041 16.0505 8.88603 16.0505C7.11849 16.0505 5.42334 15.3484 4.1735 14.0986C2.92366 12.8487 2.22151 11.1536 2.22151 9.38603Z" fill="#373737" data-v-7df5af58></path></svg></button><input${ssrRenderAttr("value", search.value)} type="text" class="${ssrRenderClass([
        "input-search",
        {
          "input-search--active": search.value
        }
      ])}"${ssrRenderAttr("placeholder", (_a = __props.placeholder) != null ? _a : translate("Enter Player Name"))} data-v-7df5af58></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/BaseInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7df5af58"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=BaseInput-BLSaI6b-.mjs.map
