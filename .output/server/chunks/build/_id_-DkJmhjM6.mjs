import { _ as _export_sfc, a as useRoute, b as useShareCommon, aj as showError, j as getLiveScoreImage, k as ROUTER_TEAM_NAME, d as useSchema, n as _sfc_main$d, m as __nuxt_component_0$3 } from './server.mjs';
import { useSSRContext, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as __nuxt_component_3 } from './TableHonor-B_ZJxE2U.mjs';
import { u as useShareTeams } from './useShareTeams-B6S0ikqM.mjs';
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

const _sfc_main$3 = {
  __name: "Personal",
  __ssrInlineRender: true,
  props: {
    info: Array,
    coachLogo: String
  },
  setup(__props) {
    const { $t } = useShareCommon();
    const translate = (key, prefix = null) => {
      const fullKey = `${key} ${prefix ? "playertech" : "team"}`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2;
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
      const _component_BaseImage = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "player" }, _attrs))} data-v-b60afd11><div class="player__img" data-v-b60afd11><div class="player__img-rounded" data-v-b60afd11>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        imgDefault: `/img/playericon.png`,
        src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(
          __props.coachLogo,
          "coach"
        ) + "!h100",
        alt: __props.coachLogo
      }, null, _parent));
      _push(`</div></div><div class="player__info-list" data-v-b60afd11><div class="player__info-item" data-v-b60afd11><div class="player__info-item-left" data-v-b60afd11>${ssrInterpolate(translate("Coach"))}:</div><div class="player__info-item-right" data-v-b60afd11>${ssrInterpolate((_a = __props.info) == null ? void 0 : _a.name)}</div></div><div class="player__info-item" data-v-b60afd11><div class="player__info-item-left" data-v-b60afd11>${ssrInterpolate(translate("Nationality"))}:</div><div class="player__info-item-right d-flex gap-2" data-v-b60afd11>${ssrInterpolate((_a2 = (_b = __props.info) == null ? void 0 : _b.country.name) != null ? _a2 : "-")} `);
      if ((_d = (_c = __props.info) == null ? void 0 : _c.country) == null ? void 0 : _d.logo_o) {
        _push(ssrRenderComponent(_component_BaseImage, {
          src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(
            (_f = (_e = __props.info) == null ? void 0 : _e.country) == null ? void 0 : _f.logo_o,
            "country"
          ) + "!h20",
          alt: (_h = (_g = __props.info) == null ? void 0 : _g.country) == null ? void 0 : _h.logo_o
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="player__info-item" data-v-b60afd11><div class="player__info-item-left" data-v-b60afd11>${ssrInterpolate(translate("Age"))}:</div><div class="player__info-item-right" data-v-b60afd11>${ssrInterpolate((_i = __props.info) == null ? void 0 : _i.age)} <span data-v-b60afd11>\xA0(${ssrInterpolate((_j = __props.info) == null ? void 0 : _j.birthday)})</span></div></div><div class="player__info-item" data-v-b60afd11><div class="player__info-item-left" data-v-b60afd11>${ssrInterpolate(translate("Club"))}:</div><div class="player__info-item-right d-flex gap-2" data-v-b60afd11>${ssrInterpolate((_l = (_k = __props.info) == null ? void 0 : _k.team) == null ? void 0 : _l.name)} `);
      _push(ssrRenderComponent(_component_BaseImage, {
        style: { "height": "25px" },
        src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(
          (_b2 = (_n = (_m = __props.info) == null ? void 0 : _m.team) == null ? void 0 : _n.logo_o) != null ? _b2 : (_p = (_o = __props.info) == null ? void 0 : _o.team) == null ? void 0 : _p.country_logo_o,
          "team"
        ) + "!h50",
        alt: (_c2 = (_r = (_q = __props.info) == null ? void 0 : _q.team) == null ? void 0 : _r.logo_o) != null ? _c2 : (_t = (_s = __props.info) == null ? void 0 : _s.team) == null ? void 0 : _t.country_logo_o
      }, null, _parent));
      _push(`</div></div><div class="player__info-item" data-v-b60afd11><div class="player__info-item-left" data-v-b60afd11>${ssrInterpolate(translate("Position"))}:</div><div class="player__info-item-right" data-v-b60afd11>${ssrInterpolate(translate("Head Coach"))}</div></div><div class="player__info-item" data-v-b60afd11><div class="player__info-item-left player__info-item-left--border" data-v-b60afd11>${ssrInterpolate(translate("Favorite Formation"))}: </div><div class="player__info-item-right player__info-item-right--border" data-v-b60afd11>${ssrInterpolate(((_u = __props.info) == null ? void 0 : _u.preferred_formation) ? (_v = __props.info) == null ? void 0 : _v.preferred_formation : "-")}</div></div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/coach/Personal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-b60afd11"]]);
const _sfc_main$2 = {
  __name: "TablePayroll",
  __ssrInlineRender: true,
  props: {
    info: Object
  },
  setup(__props) {
    const { $t } = useShareCommon();
    const translate = (key, prefix = null) => {
      const fullKey = `${key} ${prefix ? "playertech" : "team"}`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$3;
      const _component_BaseImage = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "table" }, _attrs))} data-v-bc2ccacd><div class="table__title" data-v-bc2ccacd>${ssrInterpolate(translate("Under Contract"))}</div><div class="table__content" data-v-bc2ccacd><table data-v-bc2ccacd><tr data-v-bc2ccacd><th data-v-bc2ccacd>${ssrInterpolate(translate("No."))}</th><th data-v-bc2ccacd>${ssrInterpolate(translate("Under Contract"))}</th><th data-v-bc2ccacd>${ssrInterpolate(translate("Position"))}</th></tr><tr data-v-bc2ccacd><td data-v-bc2ccacd>1</td><td data-v-bc2ccacd>`);
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
      _push(ssrRenderComponent(_component_BaseImage, {
        style: { "height": "25px" },
        src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(__props.info.team.logo_o, "team") + "!h50",
        alt: __props.info.name
      }, null, _parent));
      _push(`</td><td data-v-bc2ccacd>${ssrInterpolate(translate("Head Coach"))}</td></tr></table></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/coach/TablePayroll.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-bc2ccacd"]]);
const _sfc_main$1 = {
  __name: "index",
  __ssrInlineRender: true,
  props: {
    info: Object
  },
  setup(__props) {
    const { info } = __props;
    const { $t } = useShareCommon();
    const { initSchemaCoach } = useSchema();
    const translate = (key) => {
      const fullKey = `${key} team`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
    initSchemaCoach(info);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      const _component_TeamsCoachPersonal = __nuxt_component_0$1;
      const _component_TeamsCoachTablePayroll = __nuxt_component_1;
      const _component_TeamsTableHonor = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "player" }, _attrs))} data-v-45f37623><div class="player__info" data-v-45f37623>`);
      if ((_b = (_a = __props.info) == null ? void 0 : _a.personalInfo) == null ? void 0 : _b[0]) {
        _push(ssrRenderComponent(_component_TeamsCoachPersonal, {
          info: (_d = (_c = __props.info) == null ? void 0 : _c.personalInfo) == null ? void 0 : _d[0],
          coachLogo: (_g = (_f = (_e = __props.info) == null ? void 0 : _e.lineUpTeam) == null ? void 0 : _f.team_info) == null ? void 0 : _g.coach_logo_o
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if ((_i = (_h = __props.info) == null ? void 0 : _h.personalInfo) == null ? void 0 : _i[0]) {
        _push(ssrRenderComponent(_component_TeamsCoachTablePayroll, {
          info: (_k = (_j = __props.info) == null ? void 0 : _j.personalInfo) == null ? void 0 : _k[0]
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_TeamsTableHonor, {
        info: __props.info.honor,
        title: translate("Award")
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
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-45f37623"]]);
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d, _e;
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
    const { $t, isNavVisible } = useShareCommon();
    isNavVisible.value = false;
    const translate = (key) => {
      const fullKey = `${key} team`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
    const fetchCoach = async () => {
      try {
        const [personalInfo, honor] = await Promise.all([
          fetchCoachInfo(route.params.id),
          fetchCoachHonor(route.params.id)
        ]);
        if (Array.isArray(personalInfo) && !!personalInfo.length) {
          return {
            personalInfo,
            honor
          };
        } else {
        }
      } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
      }
    };
    const data = ([__temp, __restore] = withAsyncContext(() => fetchCoach()), __temp = await __temp, __restore(), __temp);
    if ((_c = (_b = (_a = data == null ? void 0 : data.personalInfo) == null ? void 0 : _a[0]) == null ? void 0 : _b.team) == null ? void 0 : _c.id) {
      const lineUpTeam = ([__temp, __restore] = withAsyncContext(() => fetchLineUpTeam(data.personalInfo[0].team.id)), __temp = await __temp, __restore(), __temp);
      if (lineUpTeam) {
        data[`lineUpTeam`] = lineUpTeam;
      }
    }
    info.value = data;
    if (!info.value) {
      showError({
        statusCode: 404,
        statusMessage: translate("Coach does not exist!")
      });
    }
    fetchObjectMeta((_e = (_d = info.value) == null ? void 0 : _d.personalInfo) == null ? void 0 : _e[0].name, route.fullPath);
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_TeamsCoach = __nuxt_component_0;
      const _component_BaseImage = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container bg-white team" }, _attrs))} data-v-19ed21d4>`);
      if ((_a2 = unref(info)) == null ? void 0 : _a2.personalInfo) {
        _push(ssrRenderComponent(_component_TeamsCoach, { info: unref(info) }, null, _parent));
      } else {
        _push(`<div data-v-19ed21d4><div class="d-flex flex-column align-items-center" data-v-19ed21d4>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-19ed21d4>${ssrInterpolate(translate("No Data Available"))}</p></div>`);
      }
      _push(`<div id="content-page" class="mt-5" data-v-19ed21d4>`);
      if (unref(h1Content)) {
        _push(`<h1 class="page_title" data-v-19ed21d4>${ssrInterpolate(unref(h1Content))}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center" data-v-19ed21d4>${ssrInterpolate(unref(content))}</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/coach/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-19ed21d4"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DkJmhjM6.mjs.map
