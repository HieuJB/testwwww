import { _ as _sfc_main$4 } from './BaseImage-oG5tRcgk.mjs';
import { a as getLiveScoreImage } from './livescore_helper-4bdWaxk-.mjs';
import { useSSRContext, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRoute, v as showError, f as __nuxt_component_0$2 } from './server.mjs';
import { b as ROUTER_TEAM_NAME } from './routers-Dr-sal51.mjs';
import { _ as __nuxt_component_3 } from './TableHonor-DkAk4jYv.mjs';
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
import './moment_helper-C2kP4D4M.mjs';
import 'moment-timezone';
import './helper-CGhdpGxz.mjs';
import './constants-DJp0NbxW.mjs';
import 'crypto-js';
import 'pako';
import 'buffer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@unhead/addons';
import 'vue3-snackbar';
import './useApi-C5Ep8F8o.mjs';
import './createUrl-DyOxdY5I.mjs';
import '@vueuse/core';
import './systems-4bvS4IvZ.mjs';

const _sfc_main$3 = {
  __name: "Personal",
  __ssrInlineRender: true,
  props: {
    info: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P;
      const _component_BaseImage = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "player" }, _attrs))} data-v-23dd905b><div class="player__img" data-v-23dd905b><div class="player__img-rounded" data-v-23dd905b>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        imgDefault: `/img/playericon.png`,
        src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(
          (_c = (_b = (_a = __props.info) == null ? void 0 : _a.lineUpTeam) == null ? void 0 : _b.team_info) == null ? void 0 : _c.coach_logo_o,
          "coach"
        ) + "!h100",
        alt: (_f = (_e = (_d = __props.info) == null ? void 0 : _d.lineUpTeam) == null ? void 0 : _e.team_info) == null ? void 0 : _f.coach_logo_o
      }, null, _parent));
      _push(`</div></div><div class="player__info-list" data-v-23dd905b><div class="player__info-item" data-v-23dd905b><div class="player__info-item-left" data-v-23dd905b>Hu\u1EA5n lu\u1EADn vi\xEAn:</div><div class="player__info-item-right" data-v-23dd905b>${ssrInterpolate((_i = (_h = (_g = __props.info) == null ? void 0 : _g.lineUpTeam) == null ? void 0 : _h.team_info) == null ? void 0 : _i.coach_name)}</div></div><div class="player__info-item" data-v-23dd905b><div class="player__info-item-left" data-v-23dd905b>Qu\u1ED1c t\u1ECBch:</div><div class="player__info-item-right d-flex gap-2" data-v-23dd905b>${ssrInterpolate((_a2 = (_l = (_k = (_j = __props.info) == null ? void 0 : _j.personalInfo) == null ? void 0 : _k[0].country) == null ? void 0 : _l.name) != null ? _a2 : "-")} `);
      if ((_o = (_n = (_m = __props.info) == null ? void 0 : _m.personalInfo) == null ? void 0 : _n[0].country) == null ? void 0 : _o.logo_o) {
        _push(ssrRenderComponent(_component_BaseImage, {
          src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(
            (_r = (_q = (_p = __props.info) == null ? void 0 : _p.personalInfo) == null ? void 0 : _q[0].country) == null ? void 0 : _r.logo_o,
            "country"
          ) + "!h20",
          alt: (_u = (_t = (_s = __props.info) == null ? void 0 : _s.personalInfo) == null ? void 0 : _t[0].country) == null ? void 0 : _u.logo_o
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="player__info-item" data-v-23dd905b><div class="player__info-item-left" data-v-23dd905b>Tu\u1ED5i:</div><div class="player__info-item-right" data-v-23dd905b>${ssrInterpolate((_x = (_w = (_v = __props.info) == null ? void 0 : _v.lineUpTeam) == null ? void 0 : _w.team_info) == null ? void 0 : _x.coach_age)} <span data-v-23dd905b>\xA0(${ssrInterpolate((_A = (_z = (_y = __props.info) == null ? void 0 : _y.lineUpTeam) == null ? void 0 : _z.team_info) == null ? void 0 : _A.coach_birthday)})</span></div></div><div class="player__info-item" data-v-23dd905b><div class="player__info-item-left" data-v-23dd905b>C\xE2u l\u1EA1c b\u1ED9</div><div class="player__info-item-right d-flex gap-2" data-v-23dd905b>${ssrInterpolate((_D = (_C = (_B = __props.info) == null ? void 0 : _B.personalInfo) == null ? void 0 : _C[0].team) == null ? void 0 : _D.name)} `);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(
          (_G = (_F = (_E = __props.info) == null ? void 0 : _E.personalInfo) == null ? void 0 : _F[0].team) == null ? void 0 : _G.logo_o,
          "team"
        ) + "!h20",
        alt: (_J = (_I = (_H = __props.info) == null ? void 0 : _H.personalInfo) == null ? void 0 : _I[0].team) == null ? void 0 : _J.logo_o
      }, null, _parent));
      _push(`</div></div><div class="player__info-item" data-v-23dd905b><div class="player__info-item-left" data-v-23dd905b>V\u1ECB tr\xED:</div><div class="player__info-item-right" data-v-23dd905b> HLV ch\xEDnh </div></div><div class="player__info-item" data-v-23dd905b><div class="player__info-item-left player__info-item-left--border" data-v-23dd905b> \u0110\u1ED9i h\xECnh y\xEAu th\xEDch: </div><div class="player__info-item-right player__info-item-right--border" data-v-23dd905b>${ssrInterpolate(((_M = (_L = (_K = __props.info) == null ? void 0 : _K.lineUpTeam) == null ? void 0 : _L.team_info) == null ? void 0 : _M.coach_preferred_formation) ? (_P = (_O = (_N = __props.info) == null ? void 0 : _N.lineUpTeam) == null ? void 0 : _O.team_info) == null ? void 0 : _P.coach_preferred_formation : "-")}</div></div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/coach/Personal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-23dd905b"]]);
const _sfc_main$2 = {
  __name: "TablePayroll",
  __ssrInlineRender: true,
  props: {
    info: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_BaseImage = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "table" }, _attrs))} data-v-f54cef69><div class="table__title" data-v-f54cef69>\u0110ang thu\u1ED9c bi\xEAn ch\u1EBF</div><div class="table__content" data-v-f54cef69><table data-v-f54cef69><tr data-v-f54cef69><th data-v-f54cef69>STT</th><th data-v-f54cef69>\u0110ang thu\u1ED9c bi\xEAn ch\u1EBF</th><th data-v-f54cef69>V\u1ECB tr\xED</th></tr><tr data-v-f54cef69><td data-v-f54cef69>1</td><td data-v-f54cef69>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${__props.info.team_id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.info.team_name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.info.team_name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseImage, {
        src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(__props.info.team_logo_o, "team") + "!h20",
        alt: __props.info.team_name
      }, null, _parent));
      _push(`</td><td data-v-f54cef69>HLV ch\xEDnh</td></tr></table></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/coach/TablePayroll.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-f54cef69"]]);
const _sfc_main$1 = {
  __name: "index",
  __ssrInlineRender: true,
  props: {
    info: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_TeamsCoachPersonal = __nuxt_component_0$1;
      const _component_TeamsCoachTablePayroll = __nuxt_component_1;
      const _component_TeamsTableHonor = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "player" }, _attrs))} data-v-74791cfd><div class="player__info" data-v-74791cfd>`);
      if ((_b = (_a = __props.info) == null ? void 0 : _a.lineUpTeam) == null ? void 0 : _b.team_info) {
        _push(ssrRenderComponent(_component_TeamsCoachPersonal, { info: __props.info }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if ((_d = (_c = __props.info) == null ? void 0 : _c.lineUpTeam) == null ? void 0 : _d.team_info) {
        _push(ssrRenderComponent(_component_TeamsCoachTablePayroll, {
          info: (_f = (_e = __props.info) == null ? void 0 : _e.lineUpTeam) == null ? void 0 : _f.team_info
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_TeamsTableHonor, {
        info: __props.info.honor,
        title: "Danh hi\u1EC7u"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/coach/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-74791cfd"]]);
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b;
    let __temp, __restore;
    const route = useRoute();
    const {
      info,
      fetchCoachInfo,
      fetchCoachHonor,
      fetchLineUpTeam,
      fetchObjectMeta,
      h1Content,
      content
    } = useShareTeams();
    const { data } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("coach", async () => {
      var _a2;
      try {
        const [personalInfo, honor] = await Promise.all([
          fetchCoachInfo(route.params.id),
          fetchCoachHonor(route.params.id)
        ]);
        if (Array.isArray(personalInfo) && !!personalInfo.length) {
          const lineUpTeam = await fetchLineUpTeam((_a2 = personalInfo == null ? void 0 : personalInfo[0].team) == null ? void 0 : _a2.id);
          return {
            personalInfo,
            honor,
            lineUpTeam
          };
        } else {
          showError({
            statusCode: 404,
            statusMessage: "Hu\u1EA5n luy\u1EC7n vi\xEAn kh\xF4ng t\u1ED3n t\u1EA1i!"
          });
        }
      } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
      }
    })), __temp = await __temp, __restore(), __temp);
    info.value = data.value;
    fetchObjectMeta((_b = (_a = info.value) == null ? void 0 : _a.personalInfo) == null ? void 0 : _b[0].name, route.fullPath);
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_TeamsCoach = __nuxt_component_0;
      const _component_BaseImage = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container bg-white team" }, _attrs))} data-v-e2f6a311>`);
      if ((_a2 = unref(info)) == null ? void 0 : _a2.personalInfo) {
        _push(ssrRenderComponent(_component_TeamsCoach, { info: unref(info) }, null, _parent));
      } else {
        _push(`<div data-v-e2f6a311><div class="d-flex flex-column align-items-center" data-v-e2f6a311>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-e2f6a311>Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u</p></div>`);
      }
      _push(`<div id="content-page" class="mt-5" data-v-e2f6a311>`);
      if (unref(h1Content)) {
        _push(`<h1 class="page_title" data-v-e2f6a311>${ssrInterpolate(unref(h1Content))}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center" data-v-e2f6a311>${ssrInterpolate(unref(content))}</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/coach/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e2f6a311"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-B9lTDdin.mjs.map
