import { _ as _export_sfc, b as useShareCommon, n as _sfc_main$d } from './server.mjs';
import { mergeModels, useModel, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = {
  __name: "TableHonor",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    info: Array,
    title: String
  }, {
    "isLoading": {},
    "isLoadingModifiers": {}
  }),
  emits: ["update:isLoading"],
  setup(__props) {
    const { $t } = useShareCommon();
    const translate = (key) => {
      const fullKey = `${key} team`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
    const isLoading = useModel(__props, "isLoading");
    const formatSeason = (item) => {
      return item.slice(2, 4) + (item.length > 7 ? `/${item.slice(7)}` : "");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseImage = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "team" }, _attrs))} data-v-1ee3be8a><div class="team__title d-flex justify-content-center" data-v-1ee3be8a>${ssrInterpolate(__props.title ? __props.title : translate("Award"))}</div><table class="${ssrRenderClass([{
        skeleton: isLoading.value
      }, "team__table"])}" data-v-1ee3be8a><tr data-v-1ee3be8a><th data-v-1ee3be8a>${ssrInterpolate(translate("League"))}</th><th data-v-1ee3be8a>${ssrInterpolate(translate("Number of Championships"))}</th><th data-v-1ee3be8a>${ssrInterpolate(translate("First Championship Season/Year"))}</th></tr><!--[-->`);
      ssrRenderList(Object.keys(__props.info), (item, index) => {
        _push(`<tr data-v-1ee3be8a><td data-v-1ee3be8a>${ssrInterpolate(__props.info[item][0].honor.name)}</td><td data-v-1ee3be8a>${ssrInterpolate(__props.info[item].length)}</td><td class="season" data-v-1ee3be8a><div class="season__list" data-v-1ee3be8a><!--[-->`);
        ssrRenderList(__props.info[item], (honor, index2) => {
          _push(`<div data-v-1ee3be8a>${ssrInterpolate(formatSeason(honor.season))}</div>`);
        });
        _push(`<!--]--></div></td></tr>`);
      });
      _push(`<!--]-->`);
      if (isLoading.value && !Object.keys(__props.info).length) {
        _push(`<!--[-->`);
        ssrRenderList(Array.from({ length: 3 }, (_, i) => i + 1), (item) => {
          var _a, _b, _c;
          _push(`<tr data-v-1ee3be8a><td data-v-1ee3be8a></td><td style="${ssrRenderStyle({ "padding": "18px" })}" data-v-1ee3be8a></td><td data-v-1ee3be8a>${ssrInterpolate((_c = (_b = (_a = __props.info) == null ? void 0 : _a.lineUpTeam) == null ? void 0 : _b.team_info) == null ? void 0 : _c.team_name)}</td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</table>`);
      if (!Object.keys(__props.info).length && !isLoading.value) {
        _push(`<div style="${ssrRenderStyle({ "border": "1px solid #dee2e6", "border-top": "none" })}" data-v-1ee3be8a><div class="d-flex flex-column align-items-center" data-v-1ee3be8a>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center p-0" data-v-1ee3be8a>${ssrInterpolate(translate("No Data Available"))}</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/TableHonor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1ee3be8a"]]);

export { __nuxt_component_3 as _ };
//# sourceMappingURL=TableHonor-B_ZJxE2U.mjs.map
