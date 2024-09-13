import { a as useState, f as __nuxt_component_0$2 } from './server.mjs';
import { _ as _sfc_main$1 } from './BaseImage-oG5tRcgk.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import { g as getConfig } from './helper-CGhdpGxz.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { R as ROUTERS, A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { a as getLiveScoreImage } from './livescore_helper-4bdWaxk-.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
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
import './NuxtImg-z5Tschba.mjs';
import './fetch-CC0zbYw2.mjs';
import './createUrl-DyOxdY5I.mjs';
import './moment_helper-C2kP4D4M.mjs';
import 'moment-timezone';
import './constants-DJp0NbxW.mjs';
import 'crypto-js';
import 'pako';
import 'buffer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HotLeaguesComponent",
  __ssrInlineRender: true,
  emits: ["onClick"],
  async setup(__props, { emit: __emit }) {
    var _a;
    let __temp, __restore;
    const compSeason = ref([]);
    const compSeasonState = useState("compSeasonState", () => []);
    const compSeasonList = useState("compSeasonState");
    const storeSystems = systemsStore();
    const imageHeight = (_a = getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "LEAGUE_IMAGE_HEIGHT")) != null ? _a : "!h50";
    const emit = __emit;
    const onClick = () => {
      emit("onClick");
    };
    const fetchCompSeason = async () => {
      var _a2;
      if ((_a2 = compSeasonList.value) == null ? void 0 : _a2.length) {
        compSeason.value = compSeasonList.value;
        return;
      }
      useApiLiveScore(API_ROUTERS.LIVESCORE.COMP_LIST, {
        limit: 30,
        page: 1,
        hot: "5"
      }).then(async (resData) => {
        compSeason.value = resData;
        compSeasonState.value = resData;
      });
    };
    [__temp, __restore] = withAsyncContext(() => fetchCompSeason()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_BaseImage = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "lrdiv" }, _attrs))}><div class="lr_tit on" aria-label="Hot Leagues">${ssrInterpolate(_ctx.$t("Hot Leagues"))}</div><nav id="nav" aria-label="Hot Leagues Menu"><ul class="leftnav tli"><!--[-->`);
      ssrRenderList(unref(compSeason), (comp) => {
        var _a2;
        _push(`<li${ssrRenderAttr("id", "hot-league-" + (comp == null ? void 0 : comp.id))}>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).LEAGUES + "/" + (comp == null ? void 0 : comp.id),
          title: (_a2 = comp == null ? void 0 : comp.comp_name_vi_overwrite) != null ? _a2 : comp == null ? void 0 : comp.comp_name_vi,
          onClick
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a3, _b, _c, _d;
            if (_push2) {
              _push2(`<div class="league-img"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseImage, {
                src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(
                  (comp == null ? void 0 : comp.comp_logo) + unref(imageHeight),
                  "competition"
                ),
                alt: (_a3 = comp == null ? void 0 : comp.comp_name_vi_overwrite) != null ? _a3 : comp == null ? void 0 : comp.comp_name_vi,
                class: "cImg",
                style: { "display": "inline" }
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="comp-name"${_scopeId}>${ssrInterpolate((_b = comp == null ? void 0 : comp.comp_name_vi_overwrite) != null ? _b : comp == null ? void 0 : comp.comp_name_vi)}</div>`);
            } else {
              return [
                createVNode("div", { class: "league-img" }, [
                  createVNode(_component_BaseImage, {
                    src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(
                      (comp == null ? void 0 : comp.comp_logo) + unref(imageHeight),
                      "competition"
                    ),
                    alt: (_c = comp == null ? void 0 : comp.comp_name_vi_overwrite) != null ? _c : comp == null ? void 0 : comp.comp_name_vi,
                    class: "cImg",
                    style: { "display": "inline" }
                  }, null, 8, ["src", "alt"])
                ]),
                createVNode("div", { class: "comp-name" }, toDisplayString((_d = comp == null ? void 0 : comp.comp_name_vi_overwrite) != null ? _d : comp == null ? void 0 : comp.comp_name_vi), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></nav><span id="leaBtm"></span></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HotLeaguesComponent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=HotLeaguesComponent-DscgjV4j.mjs.map
