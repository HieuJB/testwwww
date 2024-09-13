import { u as useRoute, f as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { W as WAREHOUSE_LEAGUE_TAB } from './constants-DJp0NbxW.mjs';
import { R as ROUTERS } from './routers-Dr-sal51.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HeaderLeagueComponent",
  __ssrInlineRender: true,
  props: {
    compDetail: {},
    curSeasonId: {}
  },
  setup(__props) {
    var _a;
    const route = useRoute();
    const tab = ref(((_a = route == null ? void 0 : route.query) == null ? void 0 : _a.tab) || WAREHOUSE_LEAGUE_TAB.SCHEDULE);
    const leagueId = ref();
    const props = __props;
    if (![WAREHOUSE_LEAGUE_TAB.SCHEDULE, WAREHOUSE_LEAGUE_TAB.STANDING].includes(tab.value)) {
      tab.value = WAREHOUSE_LEAGUE_TAB.SCHEDULE;
    }
    watch(
      () => route.params,
      () => {
        var _a2;
        leagueId.value = ((_a2 = route == null ? void 0 : route.params) == null ? void 0 : _a2.league_id) || "";
      },
      { immediate: true }
    );
    watch(
      () => route == null ? void 0 : route.query,
      () => {
        var _a2;
        tab.value = ((_a2 = route == null ? void 0 : route.query) == null ? void 0 : _a2.tab) || "";
        if (![WAREHOUSE_LEAGUE_TAB.SCHEDULE, WAREHOUSE_LEAGUE_TAB.STANDING].includes(tab.value)) {
          tab.value = WAREHOUSE_LEAGUE_TAB.SCHEDULE;
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sub_menu cup" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).LEAGUES + "/" + unref(leagueId), query: { tab: ("WAREHOUSE_LEAGUE_TAB" in _ctx ? _ctx.WAREHOUSE_LEAGUE_TAB : unref(WAREHOUSE_LEAGUE_TAB)).SCHEDULE, curSeasonId: props == null ? void 0 : props.curSeasonId } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span style="${ssrRenderStyle({})}" name="0" class="${ssrRenderClass(unref(tab) === ("WAREHOUSE_LEAGUE_TAB" in _ctx ? _ctx.WAREHOUSE_LEAGUE_TAB : unref(WAREHOUSE_LEAGUE_TAB)).SCHEDULE || unref(tab) === "" ? "on" : "")}"${_scopeId}><i${_scopeId}></i> L\u1ECBch thi \u0111\u1EA5u </span>`);
          } else {
            return [
              createVNode("span", {
                style: {},
                name: "0",
                class: unref(tab) === ("WAREHOUSE_LEAGUE_TAB" in _ctx ? _ctx.WAREHOUSE_LEAGUE_TAB : unref(WAREHOUSE_LEAGUE_TAB)).SCHEDULE || unref(tab) === "" ? "on" : ""
              }, [
                createVNode("i"),
                createTextVNode(" L\u1ECBch thi \u0111\u1EA5u ")
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).LEAGUES + "/" + unref(leagueId), query: { tab: ("WAREHOUSE_LEAGUE_TAB" in _ctx ? _ctx.WAREHOUSE_LEAGUE_TAB : unref(WAREHOUSE_LEAGUE_TAB)).STANDING, curSeasonId: props == null ? void 0 : props.curSeasonId } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span style="${ssrRenderStyle({})}" name="0" class="${ssrRenderClass(unref(tab) === ("WAREHOUSE_LEAGUE_TAB" in _ctx ? _ctx.WAREHOUSE_LEAGUE_TAB : unref(WAREHOUSE_LEAGUE_TAB)).STANDING ? "on" : "")}"${_scopeId}><i${_scopeId}></i> BXH </span>`);
          } else {
            return [
              createVNode("span", {
                style: {},
                name: "0",
                class: unref(tab) === ("WAREHOUSE_LEAGUE_TAB" in _ctx ? _ctx.WAREHOUSE_LEAGUE_TAB : unref(WAREHOUSE_LEAGUE_TAB)).STANDING ? "on" : ""
              }, [
                createVNode("i"),
                createTextVNode(" BXH ")
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeaderLeagueComponent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=HeaderLeagueComponent-BOzNxgdw.mjs.map
