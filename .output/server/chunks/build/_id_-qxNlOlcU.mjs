import { _ as _sfc_main$8 } from './BaseImage-oG5tRcgk.mjs';
import { useSSRContext, withAsyncContext, mergeProps, unref, mergeModels, useModel, computed, withCtx, createTextVNode, toDisplayString, ref, watch, isRef } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRoute, v as showError, b as useCookie, f as __nuxt_component_0$2 } from './server.mjs';
import { a as getLiveScoreImage } from './livescore_helper-4bdWaxk-.mjs';
import { b as getPlayerPosition, f as formatNumber, h as formatTimestamp, i as getTransferType } from './helper-CGhdpGxz.mjs';
import { b as ROUTER_TEAM_NAME, A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { k as TABLE_TEAM } from './constants-DJp0NbxW.mjs';
import { f as formatDateMomentUTCTimeZone } from './moment_helper-C2kP4D4M.mjs';
import { _ as __nuxt_component_3$1 } from './TableHonor-DkAk4jYv.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { u as useShareTeams } from './useShareTeams-D9VcFqox.mjs';
import { u as useAsyncData } from './fetch-CC0zbYw2.mjs';
import './NuxtImg-z5Tschba.mjs';
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
import 'crypto-js';
import 'pako';
import 'buffer';
import 'moment-timezone';
import './createUrl-DyOxdY5I.mjs';
import '@vueuse/core';
import './systems-4bvS4IvZ.mjs';

const _sfc_main$7 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    style: { "height": "10px", "color": "#43951e !important", "width": "10px", "margin-top": "3px" },
    class: "spinner-grow text-success",
    role: "status"
  }, _attrs))} data-v-6410012b></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/player/loading.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-6410012b"]]);
const _sfc_main$6 = {
  __name: "TeamInfo",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    player: Array,
    playerId: String
  }, {
    "listCompetition": {},
    "listCompetitionModifiers": {},
    "competitionActive": {},
    "competitionActiveModifiers": {},
    "seasonList": {},
    "seasonListModifiers": {},
    "seasonActive": {},
    "seasonActiveModifiers": {},
    "playerPerformance": {},
    "playerPerformanceModifiers": {},
    "isLoading": {},
    "isLoadingModifiers": {}
  }),
  emits: ["update:listCompetition", "update:competitionActive", "update:seasonList", "update:seasonActive", "update:playerPerformance", "update:isLoading"],
  setup(__props) {
    const listCompetition = useModel(__props, "listCompetition");
    useModel(__props, "competitionActive");
    const seasonList = useModel(__props, "seasonList");
    useModel(__props, "seasonActive");
    const playerPerformance = useModel(__props, "playerPerformance");
    const isLoading = useModel(__props, "isLoading");
    const seasonListInit = computed(() => {
      try {
        return Array.from(
          new Map(seasonList.value.map((item) => [item.id, item])).values()
        );
      } catch {
        return [];
      }
    });
    const displayYear = (item) => {
      if (item.length === 9) {
        return item.slice(2, 4) + "/" + item.slice(7);
      }
      return item;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2;
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
      const _component_BaseImage = _sfc_main$8;
      const _component_TeamsPlayerLoading = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "team" }, _attrs))} data-v-38ba0a3a><div class="team__title" data-v-38ba0a3a>Hi\u1EC7u su\u1EA5t c\u1EA7u th\u1EE7</div><div class="team__list" data-v-38ba0a3a><div class="${ssrRenderClass([{
        "p-2": ((_a = listCompetition.value) == null ? void 0 : _a.length) && ((_b = seasonList.value) == null ? void 0 : _b.length)
      }, "d-flex gap-2"])}" data-v-38ba0a3a>`);
      if ((_c = listCompetition.value) == null ? void 0 : _c.length) {
        _push(`<select class="form-select form-select--left" data-v-38ba0a3a><!--[-->`);
        ssrRenderList(listCompetition.value, (item, index) => {
          _push(`<option${ssrRenderAttr("value", item.competition_id)} value="1" data-v-38ba0a3a>${ssrInterpolate(item.competition_name)}</option>`);
        });
        _push(`<!--]--></select>`);
      } else {
        _push(`<!---->`);
      }
      if ((_d = seasonList.value) == null ? void 0 : _d.length) {
        _push(`<select class="form-select form-select--right" data-v-38ba0a3a><!--[-->`);
        ssrRenderList(unref(seasonListInit), (item, index) => {
          _push(`<option${ssrRenderAttr("value", item.id)} data-v-38ba0a3a>${ssrInterpolate(displayYear(item.year))}</option>`);
        });
        _push(`<!--]--></select>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item" data-v-38ba0a3a><div class="team__item-position" data-v-38ba0a3a>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: "/img/arrow1_032.gif",
        alt: "position"
      }, null, _parent));
      _push(`<div data-v-38ba0a3a>Tr\u1EADn \u0111\u1EA5u</div></div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>S\u1ED1 tr\u1EADn \u0111\u1EA5u</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_a2 = (_e = playerPerformance.value) == null ? void 0 : _e.matches) != null ? _a2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>S\u1ED1 ph\xFAt thi \u0111\u1EA5u</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_b2 = (_f = playerPerformance.value) == null ? void 0 : _f.minutes_played) != null ? _b2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>Tham gia t\u1EEB \u0111\u1EA7u tr\u1EADn</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_c2 = (_g = playerPerformance.value) == null ? void 0 : _g.first) != null ? _c2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>S\u1ED1 l\u1EA7n ra s\xE2n</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_d2 = (_h = playerPerformance.value) == null ? void 0 : _h.court) != null ? _d2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="team__item" data-v-38ba0a3a><div class="team__item-position" data-v-38ba0a3a>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: "/img/arrow1_032.gif",
        alt: "position"
      }, null, _parent));
      _push(`<div data-v-38ba0a3a>T\u1EA5n c\xF4ng</div></div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>B\xE0n th\u1EAFng</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_e2 = (_i = playerPerformance.value) == null ? void 0 : _i.goals) != null ? _e2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>C\xFA s\xFAt</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_f2 = (_j = playerPerformance.value) == null ? void 0 : _j.shots) != null ? _f2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>S\u1ED1 l\u1EA7n \u0111\xE1 ph\u1EA1t</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_g2 = (_k = playerPerformance.value) == null ? void 0 : _k.freekicks) != null ? _g2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>S\xFAt ph\u1EA1t \u0111\u1EC1n</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_h2 = (_l = playerPerformance.value) == null ? void 0 : _l.penalty) != null ? _h2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="team__item" data-v-38ba0a3a><div class="team__item-position" data-v-38ba0a3a>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: "/img/arrow1_032.gif",
        alt: "position"
      }, null, _parent));
      _push(`<div data-v-38ba0a3a>\u0110\u01B0\u1EDDng chuy\u1EC1n</div></div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>Ki\u1EBFn t\u1EA1o</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_i2 = (_m = playerPerformance.value) == null ? void 0 : _m.assists) != null ? _i2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>\u0110\u01B0\u1EDDng chuy\u1EC1n</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_j2 = (_n = playerPerformance.value) == null ? void 0 : _n.passes) != null ? _j2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>\u0110\u01B0\u1EDDng chuy\u1EC1n quan tr\u1ECDng</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_k2 = (_o = playerPerformance.value) == null ? void 0 : _o.key_passes) != null ? _k2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>T\u1EA1t b\xF3ng</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_l2 = (_p = playerPerformance.value) == null ? void 0 : _p.crosses) != null ? _l2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>B\xF3ng d\xE0i</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_m2 = (_q = playerPerformance.value) == null ? void 0 : _q.long_balls) != null ? _m2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="team__item" data-v-38ba0a3a><div class="team__item-position" data-v-38ba0a3a>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: "/img/arrow1_032.gif",
        alt: "position"
      }, null, _parent));
      _push(`<div data-v-38ba0a3a>Ph\xF2ng th\u1EE7</div></div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>Tranh ch\u1EA5p tay \u0111\xF4i</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_n2 = (_r = playerPerformance.value) == null ? void 0 : _r.duels) != null ? _n2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>C\u1EA3n ph\xE1 c\xFA s\xFAt</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_o2 = (_s = playerPerformance.value) == null ? void 0 : _s.blocked_shots) != null ? _o2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>T\u1EAFc b\xF3ng</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_p2 = (_t = playerPerformance.value) == null ? void 0 : _t.tackles) != null ? _p2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>Ph\u1EA1m l\u1ED7i</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_q2 = (_u = playerPerformance.value) == null ? void 0 : _u.fouls) != null ? _q2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>C\u1EE9u thua</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_r2 = (_v = playerPerformance.value) == null ? void 0 : _v.saves) != null ? _r2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="team__item" data-v-38ba0a3a><div class="team__item-position" data-v-38ba0a3a>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: "/img/arrow1_032.gif",
        alt: "position"
      }, null, _parent));
      _push(`<div data-v-38ba0a3a>Th\u1EBB</div></div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>Th\u1EBB v\xE0ng</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_s2 = (_w = playerPerformance.value) == null ? void 0 : _w.yellow_cards) != null ? _s2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>Th\u1EBB v\xE0ng th\xE0nh th\u1EBB \u0111\u1ECF</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_t2 = (_x = playerPerformance.value) == null ? void 0 : _x.yellow2red_cards) != null ? _t2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>Th\u1EBB \u0111\u1ECF</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_u2 = (_y = playerPerformance.value) == null ? void 0 : _y.red_cards) != null ? _u2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="team__item" data-v-38ba0a3a><div class="team__item-position" data-v-38ba0a3a>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: "/img/arrow1_032.gif",
        alt: "position"
      }, null, _parent));
      _push(`<div data-v-38ba0a3a>Kh\xE1c</div></div><div class="team__item-detail" data-v-38ba0a3a><div class="team__item-shirt" data-v-38ba0a3a>Vi\u1EC7t v\u1ECB</div>`);
      if (!isLoading.value) {
        _push(`<div class="team__item-name" data-v-38ba0a3a>${ssrInterpolate((_v2 = (_z = playerPerformance.value) == null ? void 0 : _z.offsides) != null ? _v2 : "-")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_TeamsPlayerLoading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/player/TeamInfo.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-38ba0a3a"]]);
const _sfc_main$5 = {
  __name: "Personal",
  __ssrInlineRender: true,
  props: {
    info: Array
  },
  emits: ["showModal"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b;
      const _component_BaseImage = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "player" }, _attrs))} data-v-6eee13d4><div class="player__img" data-v-6eee13d4><div class="player__img-rounded" data-v-6eee13d4><div class="player__img-rounded-img" data-v-6eee13d4>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(__props.info.logo_o, "player") + "!h100",
        alt: __props.info.logo_o,
        imgDefault: `/img/playericon.png`
      }, null, _parent));
      _push(`</div></div></div><div class="player__info-list" data-v-6eee13d4><div class="player__info-item" data-v-6eee13d4><div class="player__info-item-left" data-v-6eee13d4>C\u1EA7u th\u1EE7:</div><div class="player__info-item-right" data-v-6eee13d4>${ssrInterpolate(__props.info.name)}</div></div><div class="player__info-item" data-v-6eee13d4><div class="player__info-item-left" data-v-6eee13d4>Qu\u1ED1c t\u1ECBch:</div><div class="player__info-item-right d-flex gap-2" data-v-6eee13d4>${ssrInterpolate((_a2 = (_b = (_a = __props.info) == null ? void 0 : _a.country) == null ? void 0 : _b.name) != null ? _a2 : "-")} <div style="${ssrRenderStyle({ "height": "20px", "width": "auto" })}" data-v-6eee13d4>`);
      if (__props.info.country.logo_o) {
        _push(ssrRenderComponent(_component_BaseImage, {
          src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(__props.info.country.logo_o, "country") + "!h20",
          alt: __props.info.country.logo_o
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="player__info-item" data-v-6eee13d4><div class="player__info-item-left" data-v-6eee13d4>C\xE2n n\u1EB7ng:</div><div class="player__info-item-right" data-v-6eee13d4>${ssrInterpolate(__props.info.weight ? __props.info.weight + " Kg" : "-")}</div></div><div class="player__info-item" data-v-6eee13d4><div class="player__info-item-left" data-v-6eee13d4>Chi\u1EC1u cao:</div><div class="player__info-item-right" data-v-6eee13d4>${ssrInterpolate(__props.info.height ? __props.info.height + " cm" : "-")}</div></div><div class="player__info-item" data-v-6eee13d4><div class="player__info-item-left" data-v-6eee13d4>Tu\u1ED5i:</div><div class="player__info-item-right" data-v-6eee13d4>${ssrInterpolate(__props.info.age ? __props.info.age : "-")} <span data-v-6eee13d4>\xA0${ssrInterpolate(__props.info.age ? `(${__props.info.birthday})` : "")}</span></div></div><div class="player__info-item" data-v-6eee13d4><div class="player__info-item-left" data-v-6eee13d4>V\u1ECB tr\xED:</div><div class="player__info-item-right" data-v-6eee13d4>${ssrInterpolate(("getPlayerPosition" in _ctx ? _ctx.getPlayerPosition : unref(getPlayerPosition))(__props.info.position))}</div></div><div class="player__info-item" data-v-6eee13d4><div class="player__info-item-left player__info-item-left--border" data-v-6eee13d4> Gi\xE1 tr\u1ECB: </div><div class="player__info-item-right player__info-item-right--border" data-v-6eee13d4>${ssrInterpolate(__props.info.market_value ? __props.info.market_value_currency + ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(__props.info.market_value) : "-")}</div></div><div class="player__info-item player__info-item--last" data-v-6eee13d4><div class="player__info-item-left player__info-item-left--last" data-v-6eee13d4> Hi\u1EC7u su\u1EA5t: </div><div class="player__info-item-right player__info-item-right--last" data-v-6eee13d4><button class="btn-show-modal" data-v-6eee13d4>Click v\xE0o</button></div></div></div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/player/Personal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-6eee13d4"]]);
const _sfc_main$4 = {
  __name: "TablePayroll",
  __ssrInlineRender: true,
  props: {
    info: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_BaseImage = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "table" }, _attrs))} data-v-a776a76d><div class="table__title" data-v-a776a76d>\u0110ang thu\u1ED9c bi\xEAn ch\u1EBF</div><div class="table__content" data-v-a776a76d><table data-v-a776a76d><tr data-v-a776a76d><th data-v-a776a76d>STT</th><th data-v-a776a76d>\u0110ang thu\u1ED9c bi\xEAn ch\u1EBF</th><th data-v-a776a76d>V\u1ECB tr\xED</th></tr>`);
      if ((_b = (_a = __props.info) == null ? void 0 : _a.team) == null ? void 0 : _b.id) {
        _push(`<tr data-v-a776a76d><td data-v-a776a76d>1</td><td data-v-a776a76d><div class="d-flex" style="${ssrRenderStyle({ "justify-content": "center" })}" data-v-a776a76d>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${__props.info.team.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.info.team.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.info.team.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div style="${ssrRenderStyle({ "width": "20px", "height": "20px", "object-fit": "contain" })}" data-v-a776a76d>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(__props.info.team.logo_o, "team") + "!h20",
          alt: __props.info.team.name
        }, null, _parent));
        _push(`</div></div></td><td data-v-a776a76d>${ssrInterpolate(("getPlayerPosition" in _ctx ? _ctx.getPlayerPosition : unref(getPlayerPosition))(__props.info.position))}</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</table>`);
      if (!((_d = (_c = __props.info) == null ? void 0 : _c.team) == null ? void 0 : _d.id)) {
        _push(`<div style="${ssrRenderStyle({ "border": "1px solid #dee2e6", "border-top": "none" })}" data-v-a776a76d><div class="d-flex flex-column align-items-center" data-v-a776a76d>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center p-0" data-v-a776a76d>Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/player/TablePayroll.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-a776a76d"]]);
const _sfc_main$3 = {
  __name: "Statistical",
  __ssrInlineRender: true,
  props: {
    info: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_BaseImage = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "table" }, _attrs))} data-v-210172f0><div class="table__title" data-v-210172f0>Th\u1ED1ng k\xEA (chuy\u1EC3n nh\u01B0\u1EE3ng)</div><div class="table__content" data-v-210172f0><table data-v-210172f0><tr data-v-210172f0><th data-v-210172f0>Th\u1EDDi gian chuy\u1EC3n nh\u01B0\u1EE3ng</th><th data-v-210172f0>\u0110\u1EBFn t\u1EEB</th><th data-v-210172f0>Sang</th><th data-v-210172f0>Ph\xED chuy\u1EC3n nh\u01B0\u1EE3ng</th><th data-v-210172f0>Lo\u1EA1i chuy\u1EC3n nh\u01B0\u1EE3ng</th></tr>`);
      if (__props.info) {
        _push(`<!--[-->`);
        ssrRenderList(__props.info, (item, index) => {
          _push(`<tr class="${ssrRenderClass({
            "bg-gray": index % 2 !== 0
          })}" data-v-210172f0><td data-v-210172f0>${ssrInterpolate(("formatTimestamp" in _ctx ? _ctx.formatTimestamp : unref(formatTimestamp))(item.transfer_time))}</td><td data-v-210172f0>`);
          if (item.from_team_id && item.from_team_name !== ("TABLE_TEAM" in _ctx ? _ctx.TABLE_TEAM : unref(TABLE_TEAM)).FREE_PLAYER) {
            _push(ssrRenderComponent(_component_nuxt_link, {
              to: item.from_team_id ? `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${item.from_team_id}` : "#"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                var _a, _b;
                if (_push2) {
                  _push2(`${ssrInterpolate((_a = item.from_team_name) != null ? _a : "-")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((_b = item.from_team_name) != null ? _b : "-"), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<span data-v-210172f0>${ssrInterpolate(item.from_team_name ? item.from_team_name : item.from_team_name === ("TABLE_TEAM" in _ctx ? _ctx.TABLE_TEAM : unref(TABLE_TEAM)).FREE_PLAYER ? item.from_team_name : "-")}</span>`);
          }
          _push(`</td><td data-v-210172f0>`);
          if (item.to_team_id && item.to_team_name !== ("TABLE_TEAM" in _ctx ? _ctx.TABLE_TEAM : unref(TABLE_TEAM)).FREE_PLAYER) {
            _push(ssrRenderComponent(_component_nuxt_link, {
              to: item.to_team_id ? `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${item.to_team_id}` : "#"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(item.to_team_name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.to_team_name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<span data-v-210172f0>${ssrInterpolate(item.to_team_name ? item.to_team_name : item.to_team_name === ("TABLE_TEAM" in _ctx ? _ctx.TABLE_TEAM : unref(TABLE_TEAM)).FREE_PLAYER ? item.to_team_name : "-")}</span>`);
          }
          _push(`</td><td data-v-210172f0>${ssrInterpolate(item.transfer_desc ? item.transfer_desc : "-")}</td><td data-v-210172f0>${ssrInterpolate(("getTransferType" in _ctx ? _ctx.getTransferType : unref(getTransferType))(item.transfer_type))}</td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</table>`);
      if (!__props.info) {
        _push(`<div class="d-flex flex-column align-items-center w-100" style="${ssrRenderStyle({ "border": "1px solid #dee2e6", "border-top": "none" })}" data-v-210172f0>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic p-0",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`<p class="fw-bold text-center p-0" data-v-210172f0>Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/player/Statistical.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-210172f0"]]);
const _sfc_main$2 = {
  __name: "StatisticalTwoYear",
  __ssrInlineRender: true,
  props: {
    info: Array
  },
  setup(__props) {
    var _a;
    const settingsData = useCookie("settingsData");
    const timeZone = ref(((_a = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _a.timeZone) || "");
    const { info } = __props;
    const colors = [
      "#1F77B4",
      // xanh dương
      "#FF7F0E",
      // cam
      "#2CA02C",
      // xanh lá
      "#D62728",
      // đỏ
      "#9467BD",
      // tím
      "#8C564B",
      // nâu
      "#E377C2",
      // hồng
      "#7F7F7F",
      // xám
      "#BCBD22",
      // vàng
      "#17BECF"
      // xanh ngọc
    ];
    const initMatch = computed(() => {
      const colorMap = {};
      info.forEach((item) => {
        if (!colorMap[item.match_info.comp_short_name]) {
          colorMap[item.match_info.comp_short_name] = colors[Object.keys(colorMap).length % colors.length];
        }
        item.bgColor = colorMap[item.match_info.comp_short_name];
      });
      return info;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_BaseImage = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "table" }, _attrs))} data-v-61d10b95><div class="table__title" data-v-61d10b95>S\u1ED1 li\u1EC7u th\u1ED1ng k\xEA 2 n\u0103m g\u1EA7n \u0111\xE2y</div><div class="table__content" style="${ssrRenderStyle({ "overflow-x": "auto" })}" data-v-61d10b95><table data-v-61d10b95><tr data-v-61d10b95><th data-v-61d10b95>Gi\u1EA3i \u0111\u1EA5u</th><th data-v-61d10b95>Ng\xE0y</th><th data-v-61d10b95>\u0110\u1ED9i nh\xE0</th><th style="${ssrRenderStyle({ "width": "50px" })}" data-v-61d10b95>T\u1EF7 s\u1ED1</th><th data-v-61d10b95>\u0110\u1ED9i kh\xE1ch</th><th data-v-61d10b95>B\xE0n th\u1EAFng</th><th data-v-61d10b95>Ki\u1EBFn t\u1EA1o</th><th data-v-61d10b95>Ph\u1EA1t \u0111\u1EC1n</th><th data-v-61d10b95>Th\u1EBB v\xE0ng</th><th data-v-61d10b95>Th\u1EBB \u0111\u1ECF</th></tr>`);
      if (unref(initMatch).length) {
        _push(`<!--[-->`);
        ssrRenderList(unref(initMatch), (item, index) => {
          var _a3;
          var _a2, _b, _c, _d, _e, _f, _g, _h;
          _push(`<tr class="${ssrRenderClass({
            "bg-gray": index % 2 !== 0
          })}" data-v-61d10b95><td style="${ssrRenderStyle({ backgroundColor: item.bgColor, color: "white" })}" data-v-61d10b95>${ssrInterpolate((_a3 = (_a2 = item.match_info) == null ? void 0 : _a2.comp_name) != null ? _a3 : (_b = item.match_info) == null ? void 0 : _b.comp_short_name)}</td><td data-v-61d10b95>${ssrInterpolate(("formatDateMomentUTCTimeZone" in _ctx ? _ctx.formatDateMomentUTCTimeZone : unref(formatDateMomentUTCTimeZone))(
            item.match_info.match_time,
            "DD-MM-yyyy HH:mm",
            unref(timeZone)
          ))}</td><td data-v-61d10b95>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${item.home_team_info.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.home_team_info.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.home_team_info.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td data-v-61d10b95><div class="d-flex gap-1" style="${ssrRenderStyle({ "min-width": "100px", "justify-content": "center", "align-items": "center" })}" data-v-61d10b95><div style="${ssrRenderStyle({ "width": "20px", "height": "20px", "object-fit": "contain", "flex": "0 0 35px" })}" data-v-61d10b95>`);
          _push(ssrRenderComponent(_component_BaseImage, {
            style: { "height": "100%", "width": "auto", "object-fit": "contain" },
            src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(
              ((_c = item == null ? void 0 : item.home_team_info) == null ? void 0 : _c.country_logo_o) ? (_d = item == null ? void 0 : item.home_team_info) == null ? void 0 : _d.country_logo_o : (_e = item == null ? void 0 : item.home_team_info) == null ? void 0 : _e.logo_o,
              "team"
            ) + "!h20",
            alt: `team-home`
          }, null, _parent));
          _push(`</div><span class="flex: 0 0 20px;" data-v-61d10b95>${ssrInterpolate(item.match_info.home_scores[0])}-${ssrInterpolate(item.match_info.away_scores[0])}</span><div style="${ssrRenderStyle({ "width": "20px", "height": "20px", "object-fit": "contain", "flex": "0 0 35px" })}" data-v-61d10b95>`);
          _push(ssrRenderComponent(_component_BaseImage, {
            style: { "height": "100%", "width": "auto", "object-fit": "contain" },
            src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(
              ((_f = item == null ? void 0 : item.away_team_info) == null ? void 0 : _f.country_logo_o) ? (_g = item == null ? void 0 : item.away_team_info) == null ? void 0 : _g.country_logo_o : (_h = item == null ? void 0 : item.away_team_info) == null ? void 0 : _h.logo_o,
              "team"
            ) + "!h20",
            alt: `team-away`
          }, null, _parent));
          _push(`</div></div></td><td data-v-61d10b95>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${item.away_team_info.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.away_team_info.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.away_team_info.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td data-v-61d10b95>${ssrInterpolate(item.goals)}</td><td data-v-61d10b95>${ssrInterpolate(item.assists)}</td><td data-v-61d10b95>${ssrInterpolate(item.penalty)}</td><td data-v-61d10b95>${ssrInterpolate(item.yellow_cards)}</td><td data-v-61d10b95>${ssrInterpolate(item.red_cards)}</td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</table>`);
      if (!unref(initMatch).length) {
        _push(`<div class="d-flex flex-column align-items-center w-100" style="${ssrRenderStyle({ "border": "1px solid #dee2e6", "border-top": "none" })}" data-v-61d10b95>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic p-0",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`<p class="fw-bold text-center p-0" data-v-61d10b95>Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/player/StatisticalTwoYear.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-61d10b95"]]);
const _sfc_main$1 = {
  __name: "index",
  __ssrInlineRender: true,
  props: {
    info: Object
  },
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const transfer = ref(null);
    const matchPlayer = ref([]);
    const honorList = ref({});
    const listCompetition = ref([]);
    const isLoading = ref(false);
    const competitionActive = ref({});
    const seasonList = ref([]);
    const seasonActive = ref(null);
    const playerPerformance = ref({});
    const showModal = () => {
      (void 0).getElementById("btn-open-modal").click();
    };
    const fetchPlayerStatistical = async () => {
      await useApiLiveScore(
        `${API_ROUTERS.LIVESCORE.PLAYER_TRANSFERS}?player-id=${route.params.id}`
      ).then((resData) => {
        if (resData && resData[0] && resData[0].transfer) {
          transfer.value = resData[0].transfer;
        }
      }).catch((e) => {
        console.log(e);
      });
    };
    const fetchMatchPlayer = async () => {
      await useApiLiveScore(
        `${API_ROUTERS.LIVESCORE.PLAYER_MATCH}?player-id=${route.params.id}&1234`
      ).then((resData) => {
        if (resData) {
          matchPlayer.value = resData;
        }
      }).catch((e) => {
        console.log(e);
      });
    };
    const fetchHonor = async () => {
      await useApiLiveScore(
        `${API_ROUTERS.LIVESCORE.PLAYER_HONOR}?player-id=${route.params.id}`
      ).then((resData) => {
        if (resData && resData[0] && resData[0].honors) {
          const data = resData[0].honors.reduce((acc, value) => {
            if (!Object.keys(acc).includes(value.honor.id)) {
              acc[value.honor.id] = resData[0].honors.filter(
                (item) => item.honor.id === value.honor.id
              );
            }
            return acc;
          }, {});
          honorList.value = data;
        }
      }).catch((e) => {
        console.log(e);
      });
    };
    const fetchPerfomancePlayerBySeason = async () => {
      isLoading.value = true;
      await useApiLiveScore(
        `${API_ROUTERS.LIVESCORE.PLAYER_PERFORMANCE}?player-id=${route.params.id}&season-id=${seasonActive.value}`
      ).then((resData) => {
        if (resData && resData[0]) {
          playerPerformance.value = resData[0];
        }
      }).finally(() => {
        isLoading.value = false;
      });
    };
    const fetchCompetitionsOfPlayer = async () => {
      await useApiLiveScore(
        `${API_ROUTERS.LIVESCORE.PLAYER_COMPETITIONS}?player-id=${route.params.id}`
      ).then((resData) => {
        var _a, _b, _c, _d, _e;
        if (resData) {
          listCompetition.value = resData;
          competitionActive.value = (_a = resData == null ? void 0 : resData[0]) == null ? void 0 : _a.competition_id;
          seasonList.value = (_b = resData == null ? void 0 : resData[0]) == null ? void 0 : _b.seasons;
          seasonActive.value = (_e = (_d = (_c = resData == null ? void 0 : resData[0]) == null ? void 0 : _c.seasons) == null ? void 0 : _d[0]) == null ? void 0 : _e.id;
          if (seasonActive.value) {
            fetchPerfomancePlayerBySeason();
          } else {
            isLoading.value = false;
          }
        }
      });
    };
    watch(
      () => seasonActive.value,
      () => {
        if (seasonActive.value) {
          fetchPerfomancePlayerBySeason();
        }
      }
    );
    watch(
      () => competitionActive.value,
      () => {
        var _a;
        if (competitionActive.value) {
          const data = listCompetition.value.find(
            (item) => item.competition_id === competitionActive.value
          );
          seasonList.value = data.seasons;
          seasonActive.value = (_a = data.seasons) == null ? void 0 : _a[0].id;
        }
      }
    );
    fetchCompetitionsOfPlayer();
    [__temp, __restore] = withAsyncContext(() => Promise.all([fetchPlayerStatistical(), fetchMatchPlayer(), fetchHonor()])), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TeamsPlayerTeamInfo = __nuxt_component_0$1;
      const _component_TeamsPlayerPersonal = __nuxt_component_1;
      const _component_TeamsPlayerTablePayroll = __nuxt_component_2;
      const _component_TeamsPlayerStatistical = __nuxt_component_3;
      const _component_TeamsPlayerStatisticalTwoYear = __nuxt_component_4;
      const _component_TeamsTableHonor = __nuxt_component_3$1;
      const _component_BaseImage = _sfc_main$8;
      _push(`<!--[--><div class="player" data-v-389629dd><div class="player__team" data-v-389629dd>`);
      _push(ssrRenderComponent(_component_TeamsPlayerTeamInfo, {
        listCompetition: unref(listCompetition),
        "onUpdate:listCompetition": ($event) => isRef(listCompetition) ? listCompetition.value = $event : null,
        competitionActive: unref(competitionActive),
        "onUpdate:competitionActive": ($event) => isRef(competitionActive) ? competitionActive.value = $event : null,
        seasonList: unref(seasonList),
        "onUpdate:seasonList": ($event) => isRef(seasonList) ? seasonList.value = $event : null,
        seasonActive: unref(seasonActive),
        "onUpdate:seasonActive": ($event) => isRef(seasonActive) ? seasonActive.value = $event : null,
        playerPerformance: unref(playerPerformance),
        "onUpdate:playerPerformance": ($event) => isRef(playerPerformance) ? playerPerformance.value = $event : null,
        isLoading: unref(isLoading),
        "onUpdate:isLoading": ($event) => isRef(isLoading) ? isLoading.value = $event : null
      }, null, _parent));
      _push(`</div><div class="player__info" data-v-389629dd>`);
      if (__props.info && __props.info.player.length) {
        _push(ssrRenderComponent(_component_TeamsPlayerPersonal, {
          onShowModal: showModal,
          info: __props.info.player[0]
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.info && __props.info.player[0]) {
        _push(ssrRenderComponent(_component_TeamsPlayerTablePayroll, {
          info: __props.info.player[0]
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_TeamsPlayerStatistical, { info: unref(transfer) }, null, _parent));
      _push(ssrRenderComponent(_component_TeamsPlayerStatisticalTwoYear, { info: unref(matchPlayer) }, null, _parent));
      _push(ssrRenderComponent(_component_TeamsTableHonor, {
        title: "Danh hi\u1EC7u",
        info: unref(honorList)
      }, null, _parent));
      _push(`</div></div><button type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn-open-modal" data-v-389629dd></button><div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-v-389629dd><div class="modal-dialog" data-v-389629dd><div class="modal-content" data-v-389629dd><div class="modal-body" data-v-389629dd><div class="modal-close-btn" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-v-389629dd>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: "/img/close.gif",
        alt: "closeModal"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_TeamsPlayerTeamInfo, {
        listCompetition: unref(listCompetition),
        "onUpdate:listCompetition": ($event) => isRef(listCompetition) ? listCompetition.value = $event : null,
        competitionActive: unref(competitionActive),
        "onUpdate:competitionActive": ($event) => isRef(competitionActive) ? competitionActive.value = $event : null,
        seasonList: unref(seasonList),
        "onUpdate:seasonList": ($event) => isRef(seasonList) ? seasonList.value = $event : null,
        seasonActive: unref(seasonActive),
        "onUpdate:seasonActive": ($event) => isRef(seasonActive) ? seasonActive.value = $event : null,
        playerPerformance: unref(playerPerformance),
        "onUpdate:playerPerformance": ($event) => isRef(playerPerformance) ? playerPerformance.value = $event : null,
        isLoading: unref(isLoading),
        "onUpdate:isLoading": ($event) => isRef(isLoading) ? isLoading.value = $event : null
      }, null, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/player/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-389629dd"]]);
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c;
    let __temp, __restore;
    const {
      info,
      fetchLineUpTeam,
      fetchPlayerInfo,
      fetchObjectMeta,
      h1Content,
      content
    } = useShareTeams();
    const route = useRoute();
    const { data } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("player", async () => {
      var _a3;
      var _a2;
      try {
        const player = await fetchPlayerInfo(route.params.id);
        if (Array.isArray(player) && !!player.length) {
          const [lineUpTeam] = await Promise.all([
            fetchLineUpTeam((_a3 = (_a2 = player == null ? void 0 : player[0]) == null ? void 0 : _a2.team.id) != null ? _a3 : "")
          ]);
          return {
            player,
            lineUpTeam
          };
        } else {
          showError({
            statusCode: 404,
            statusMessage: "C\u1EA7u th\u1EE7 kh\xF4ng t\u1ED3n t\u1EA1i!"
          });
        }
      } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
      }
    })), __temp = await __temp, __restore(), __temp);
    info.value = data.value;
    fetchObjectMeta((_c = (_b = (_a = info.value) == null ? void 0 : _a.player) == null ? void 0 : _b[0]) == null ? void 0 : _c.name, route.fullPath);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TeamsPlayer = __nuxt_component_0;
      const _component_BaseImage = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container bg-white team" }, _attrs))} data-v-c837281d>`);
      if (unref(info) && unref(info).player) {
        _push(ssrRenderComponent(_component_TeamsPlayer, { info: unref(info) }, null, _parent));
      } else {
        _push(`<div data-v-c837281d><div class="d-flex flex-column align-items-center" data-v-c837281d>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-c837281d>Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u</p></div>`);
      }
      _push(`<div id="content-page" class="mt-5" data-v-c837281d>`);
      if (unref(h1Content)) {
        _push(`<h1 class="page_title" data-v-c837281d>${ssrInterpolate(unref(h1Content))}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center" data-v-c837281d>${ssrInterpolate(unref(content))}</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/player/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c837281d"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-qxNlOlcU.mjs.map
