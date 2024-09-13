import { _ as _export_sfc, u as useRoute, b as useCookie, n as navigateTo, v as showError, f as __nuxt_component_0$2 } from './server.mjs';
import { useSSRContext, defineComponent, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, ref, computed, withAsyncContext, mergeProps, resolveDynamicComponent, reactive, withDirectives, isRef, vModelSelect, mergeModels, useModel, watch, Transition } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttrs, ssrRenderVNode, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _sfc_main$e } from './BaseImage-oG5tRcgk.mjs';
import { useSnackbar } from 'vue3-snackbar';
import { a as getLiveScoreImage } from './livescore_helper-4bdWaxk-.mjs';
import { b as ROUTER_TEAM_NAME, R as ROUTERS, A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { u as useShareTeams } from './useShareTeams-D9VcFqox.mjs';
import { u as useAsyncData } from './fetch-CC0zbYw2.mjs';
import { b as getPlayerPosition, f as formatNumber, h as formatTimestamp, i as getTransferType } from './helper-CGhdpGxz.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { f as formatDateMomentUTCTimeZone } from './moment_helper-C2kP4D4M.mjs';
import { _ as __nuxt_component_3 } from './TableHonor-DkAk4jYv.mjs';
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
import './NuxtImg-z5Tschba.mjs';
import './constants-DJp0NbxW.mjs';
import 'crypto-js';
import 'pako';
import 'buffer';
import '@vueuse/core';
import './systems-4bvS4IvZ.mjs';
import './createUrl-DyOxdY5I.mjs';
import 'moment-timezone';

const _sfc_main$d = {
  __name: "TabsRedirect",
  __ssrInlineRender: true,
  props: {
    tabs: Array
  },
  setup(__props) {
    const route = useRoute();
    const getActiveTab = (item) => {
      const url = route.fullPath;
      if (Array.isArray(item)) {
        return item.includes(route.fullPath) ? "tab--active" : "";
      }
      return item === url ? "tab--active" : "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tabs" }, _attrs))} data-v-91185159><!--[-->`);
      ssrRenderList(__props.tabs, (tab, index) => {
        _push(`<button class="${ssrRenderClass(["tab", getActiveTab(tab.redirect)])}" data-v-91185159>${ssrInterpolate(tab.name)}</button>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/TabsRedirect.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-91185159"]]);
const _sfc_main$c = {
  __name: "InfoTeam",
  __ssrInlineRender: true,
  props: {
    teamInfo: Object
  },
  setup(__props) {
    useSnackbar();
    const { teamInfo } = __props;
    const info = computed(() => {
      return teamInfo;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b, _c;
      const _component_BaseImage = _sfc_main$e;
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "table-team" }, _attrs))} data-v-8bc82f02><div class="table-team__name" data-v-8bc82f02><div class="logo-team" data-v-8bc82f02>`);
      if (unref(info).team_logo_o) {
        _push(ssrRenderComponent(_component_BaseImage, {
          src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(((_a = unref(info)) == null ? void 0 : _a.team_national) ? (_b = unref(info)) == null ? void 0 : _b.team_country_logo_o : (_c = unref(info)) == null ? void 0 : _c.team_logo_o, "team") + "!h80"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p data-v-8bc82f02>${ssrInterpolate(unref(info).team_name)}</p><button class="btn-follow" data-v-8bc82f02> Theo d\xF5i `);
      _push(ssrRenderComponent(_component_BaseImage, { src: "/icon/star.svg" }, null, _parent));
      _push(`</button></div><div class="table-team__detail" data-v-8bc82f02><div class="table-team__item" data-v-8bc82f02><div class="table-team__item-left" data-v-8bc82f02>${ssrInterpolate(unref(info).venue_location ? "Th\xE0nh ph\u1ED1:" : "\u0110\u1EA5t n\u01B0\u1EDBc:")}</div><div class="table-team__item-right" data-v-8bc82f02>${ssrInterpolate(unref(info).venue_location ? unref(info).venue_location : unref(info).country_name ? unref(info).country_name : "-")}</div></div><div class="table-team__item" data-v-8bc82f02><div class="table-team__item-left" data-v-8bc82f02>S\xE2n t\u1EADp hu\u1EA5n:</div><div class="table-team__item-right" data-v-8bc82f02>${ssrInterpolate((_a2 = unref(info).venue_name) != null ? _a2 : "-")}</div></div><div class="table-team__item" data-v-8bc82f02><div class="table-team__item-left" data-v-8bc82f02>S\u1EE9c ch\u1EE9a:</div><div class="table-team__item-right" data-v-8bc82f02>${ssrInterpolate(!!unref(info).venue_capacity ? unref(info).venue_capacity : "-")}</div></div><div class="table-team__item" data-v-8bc82f02><div class="table-team__item-left" data-v-8bc82f02>Th\u1EDDi gian th\xE0nh l\u1EADp:</div><div class="table-team__item-right" data-v-8bc82f02>${ssrInterpolate(unref(info).team_foundation_time ? unref(info).team_foundation_time : "-")}</div></div><div class="table-team__item" data-v-8bc82f02><div class="table-team__item-left" data-v-8bc82f02>Hu\u1EA5n luy\u1EC7n vi\xEAn:</div><div class="table-team__item-right" data-v-8bc82f02>`);
      if (!unref(info).coach_id) {
        _push(`<div data-v-8bc82f02>-</div>`);
      } else {
        _push(ssrRenderComponent(_component_nuxt_link, {
          class: { "highlighted": unref(info).coach_name },
          to: unref(info).coach_name ? `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).COACH}/${unref(info).coach_id}` : "#"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a3, _b2;
            if (_push2) {
              _push2(`${ssrInterpolate((_a3 = unref(info).coach_name) != null ? _a3 : "-")}`);
            } else {
              return [
                createTextVNode(toDisplayString((_b2 = unref(info).coach_name) != null ? _b2 : "-"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div><div class="table-team__item" data-v-8bc82f02><div class="table-team__item-left" data-v-8bc82f02>Trang web:</div><div class="table-team__item-right" data-v-8bc82f02>`);
      if (!unref(info).team_website) {
        _push(`<div data-v-8bc82f02>-</div>`);
      } else {
        _push(`<a class="${ssrRenderClass({ "highlighted": unref(info).team_website })}" rel="nofollow" target="_blank"${ssrRenderAttr("href", unref(info).team_website)} data-v-8bc82f02>${ssrInterpolate(unref(info).team_website ? "Click v\xE0o" : "-")}</a>`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/InfoTeam.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __nuxt_component_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-8bc82f02"]]);
const _sfc_main$b = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/Layouts.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  props: {
    info: Array
  },
  setup(__props) {
    const formatBirthday = (item) => {
      if (item) {
        const [year, month, day] = item.split("-");
        return `${day}-${month}-${year}`;
      }
      return "-";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TeamsLayouts = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_BaseImage = _sfc_main$e;
      _push(ssrRenderComponent(_component_TeamsLayouts, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<div class="team__title" data-v-b052cf81${_scopeId}>\u0110\u1ED9i h\xECnh</div><div data-v-b052cf81${_scopeId}><div style="${ssrRenderStyle({ "overflow-x": "auto" })}" data-v-b052cf81${_scopeId}><table data-v-b052cf81${_scopeId}><tr data-v-b052cf81${_scopeId}><th data-v-b052cf81${_scopeId}>S\u1ED1</th><th data-v-b052cf81${_scopeId}>T\xEAn</th><th style="${ssrRenderStyle({ "width": "100px" })}" data-v-b052cf81${_scopeId}>Ng\xE0y sinh</th><th data-v-b052cf81${_scopeId}>Chi\u1EC1u cao</th><th data-v-b052cf81${_scopeId}>C\xE2n n\u1EB7ng</th><th data-v-b052cf81${_scopeId}>V\u1ECB tr\xED</th><th data-v-b052cf81${_scopeId}>Qu\u1ED1c t\u1ECBch</th><th data-v-b052cf81${_scopeId}>Gi\xE1 tr\u1ECB</th><th data-v-b052cf81${_scopeId}>Th\u1EDDi h\u1EA1n h\u1EE3p \u0111\u1ED3ng</th></tr>`);
            if ((_b = (_a = __props.info) == null ? void 0 : _a.lineUpTeam) == null ? void 0 : _b.players) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.info.lineUpTeam.players, (item, index) => {
                var _a2;
                _push2(`<tr class="content" data-v-b052cf81${_scopeId}><td data-v-b052cf81${_scopeId}>${ssrInterpolate(item.shirt_number ? item.shirt_number : "-")}</td><td class="text-capitalize" data-v-b052cf81${_scopeId}>`);
                _push2(ssrRenderComponent(_component_nuxt_link, {
                  class: "player-name",
                  to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).PLAYER}/${item.id}`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(item.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(item.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</td><td data-v-b052cf81${_scopeId}>${ssrInterpolate(formatBirthday(item.birthday.slice(0, 10)))}</td><td data-v-b052cf81${_scopeId}>${ssrInterpolate(item.height)}</td><td data-v-b052cf81${_scopeId}>${ssrInterpolate(item.weight)}</td><td data-v-b052cf81${_scopeId}>${ssrInterpolate(("getPlayerPosition" in _ctx ? _ctx.getPlayerPosition : unref(getPlayerPosition))(item.position))}</td><td data-v-b052cf81${_scopeId}>${ssrInterpolate((_a2 = item.country_name) != null ? _a2 : "-")}</td><td data-v-b052cf81${_scopeId}>${ssrInterpolate(item.market_value_currency)} ${ssrInterpolate(item.market_value ? ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(item.market_value) : "-")}</td><td data-v-b052cf81${_scopeId}>${ssrInterpolate(item.contract_until ? ("formatTimestamp" in _ctx ? _ctx.formatTimestamp : unref(formatTimestamp))(item.contract_until) : "-")}</td></tr>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</table></div></div>`);
            if (!((_e = (_d = (_c = __props.info) == null ? void 0 : _c.lineUpTeam) == null ? void 0 : _d.players) == null ? void 0 : _e.length)) {
              _push2(`<div data-v-b052cf81${_scopeId}><div class="d-flex flex-column align-items-center" data-v-b052cf81${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseImage, {
                class: "nodata_pic",
                alt: "nodata pic",
                width: "200",
                height: "200",
                src: "/icon/nodata.svg"
              }, null, _parent2, _scopeId));
              _push2(`</div><p class="fw-bold text-center mt-3" data-v-b052cf81${_scopeId}>D\u1EEF li\u1EC7u \u0111ang \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt</p></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "team__title" }, "\u0110\u1ED9i h\xECnh"),
              createVNode("div", null, [
                createVNode("div", { style: { "overflow-x": "auto" } }, [
                  createVNode("table", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "S\u1ED1"),
                      createVNode("th", null, "T\xEAn"),
                      createVNode("th", { style: { "width": "100px" } }, "Ng\xE0y sinh"),
                      createVNode("th", null, "Chi\u1EC1u cao"),
                      createVNode("th", null, "C\xE2n n\u1EB7ng"),
                      createVNode("th", null, "V\u1ECB tr\xED"),
                      createVNode("th", null, "Qu\u1ED1c t\u1ECBch"),
                      createVNode("th", null, "Gi\xE1 tr\u1ECB"),
                      createVNode("th", null, "Th\u1EDDi h\u1EA1n h\u1EE3p \u0111\u1ED3ng")
                    ]),
                    ((_g = (_f = __props.info) == null ? void 0 : _f.lineUpTeam) == null ? void 0 : _g.players) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.info.lineUpTeam.players, (item, index) => {
                      var _a2;
                      return openBlock(), createBlock("tr", {
                        class: "content",
                        key: index
                      }, [
                        createVNode("td", null, toDisplayString(item.shirt_number ? item.shirt_number : "-"), 1),
                        createVNode("td", { class: "text-capitalize" }, [
                          createVNode(_component_nuxt_link, {
                            class: "player-name",
                            to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).PLAYER}/${item.id}`
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["to"])
                        ]),
                        createVNode("td", null, toDisplayString(formatBirthday(item.birthday.slice(0, 10))), 1),
                        createVNode("td", null, toDisplayString(item.height), 1),
                        createVNode("td", null, toDisplayString(item.weight), 1),
                        createVNode("td", null, toDisplayString(("getPlayerPosition" in _ctx ? _ctx.getPlayerPosition : unref(getPlayerPosition))(item.position)), 1),
                        createVNode("td", null, toDisplayString((_a2 = item.country_name) != null ? _a2 : "-"), 1),
                        createVNode("td", null, toDisplayString(item.market_value_currency) + " " + toDisplayString(item.market_value ? ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(item.market_value) : "-"), 1),
                        createVNode("td", null, toDisplayString(item.contract_until ? ("formatTimestamp" in _ctx ? _ctx.formatTimestamp : unref(formatTimestamp))(item.contract_until) : "-"), 1)
                      ]);
                    }), 128)) : createCommentVNode("", true)
                  ])
                ])
              ]),
              !((_j = (_i = (_h = __props.info) == null ? void 0 : _h.lineUpTeam) == null ? void 0 : _i.players) == null ? void 0 : _j.length) ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("div", { class: "d-flex flex-column align-items-center" }, [
                  createVNode(_component_BaseImage, {
                    class: "nodata_pic",
                    alt: "nodata pic",
                    width: "200",
                    height: "200",
                    src: "/icon/nodata.svg"
                  })
                ]),
                createVNode("p", { class: "fw-bold text-center mt-3" }, "D\u1EEF li\u1EC7u \u0111ang \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/lineup/[id].vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const LineUp = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-b052cf81"]]);
const _sfc_main$9 = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const route = useRoute();
    const objectIdSlug = ref(((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.id) || "");
    const playerInfo = ref([]);
    const competitionSeasonList = ref([]);
    const competitionActive = ref(null);
    const isLoading = ref(true);
    const season = reactive({
      list: [],
      active: null
    });
    const sortedSeasons = (seasons) => {
      if (seasons) {
        return seasons.sort((a, b) => {
          const getLatestYear = (seasonYear) => {
            const years = seasonYear.split("-").map(Number);
            return Math.max(...years);
          };
          return getLatestYear(b.season_year) - getLatestYear(a.season_year);
        });
      }
      return null;
    };
    const fetchCompetitionSeason = async () => {
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.COMPETITION_SEASON + `?team-id=${objectIdSlug.value}`
      ).then(async (resData) => {
        var _a3, _b2;
        var _a2, _b, _c, _d;
        if (resData) {
          competitionSeasonList.value = resData;
          competitionActive.value = (_a3 = (_a2 = resData[0]) == null ? void 0 : _a2.competition_id) != null ? _a3 : null;
          season.list = sortedSeasons((_b = resData[0]) == null ? void 0 : _b.seasons);
          season.active = (_b2 = (_d = (_c = season.list) == null ? void 0 : _c[0]) == null ? void 0 : _d.season_id) != null ? _b2 : null;
          await fetchPlayer();
        }
      }).catch((e) => {
        console.log(e);
      });
    };
    const fetchPlayer = async () => {
      if (playerInfo.value.length) {
        isLoading.value = true;
      }
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.PLAYER_INFO + `?team-id=${objectIdSlug.value}&season-id=${season.active}`
      ).then((resData) => {
        if (resData) {
          playerInfo.value = resData.sort((a, b) => {
            if (b.goals !== a.goals) {
              return b.goals - a.goals;
            } else {
              return b.assists - a.assists;
            }
          });
        }
      }).catch((e) => {
        console.log(e);
      }).finally(() => {
        isLoading.value = false;
      });
    };
    const onCompetitionChange = async () => {
      try {
        const data = competitionSeasonList.value.find(
          (item) => item.competition_id === competitionActive.value
        );
        if (data) {
          season.list = sortedSeasons(data.seasons);
          season.active = season.list[0].season_id;
          await fetchPlayer();
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchCompetitionSeason();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TeamsLayouts = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_BaseImage = _sfc_main$e;
      _push(ssrRenderComponent(_component_TeamsLayouts, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<div class="player" data-v-6527f2d9${_scopeId}><div class="player__header" data-v-6527f2d9${_scopeId}>`);
            if ((_a2 = unref(competitionSeasonList)) == null ? void 0 : _a2.length) {
              _push2(`<select class="form-select" data-v-6527f2d9${_scopeId}><!--[-->`);
              ssrRenderList(unref(competitionSeasonList), (item, index) => {
                _push2(`<option${ssrRenderAttr("value", item.competition_id)} data-v-6527f2d9${_scopeId}>${ssrInterpolate((item == null ? void 0 : item.competition_name) || item.competition_short_name)}</option>`);
              });
              _push2(`<!--]--></select>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="player__title" data-v-6527f2d9${_scopeId}>H\u1ED3 s\u01A1 c\u1EA7u th\u1EE7</div>`);
            if ((_c = (_b = unref(season)) == null ? void 0 : _b.list) == null ? void 0 : _c.length) {
              _push2(`<select class="form-select" data-v-6527f2d9${_scopeId}><!--[-->`);
              ssrRenderList(unref(season).list, (item, index) => {
                _push2(`<option${ssrRenderAttr("value", item.season_id)} data-v-6527f2d9${_scopeId}>${ssrInterpolate(item.season_year)}</option>`);
              });
              _push2(`<!--]--></select>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div style="${ssrRenderStyle({ "overflow-x": "auto" })}" data-v-6527f2d9${_scopeId}><table class="${ssrRenderClass({
              skeleton: unref(isLoading)
            })}" data-v-6527f2d9${_scopeId}><tr data-v-6527f2d9${_scopeId}><th data-v-6527f2d9${_scopeId}>XH</th><th data-v-6527f2d9${_scopeId}>C\u1EA7u th\u1EE7</th><th data-v-6527f2d9${_scopeId}>B\xE0n th\u1EAFng</th><th data-v-6527f2d9${_scopeId}>Ki\u1EBFn t\u1EA1o</th><th data-v-6527f2d9${_scopeId}>Tr\u1EADn thi \u0111\u1EA5u</th><th data-v-6527f2d9${_scopeId}>\u0110\u01B0\u1EDDng chuy\u1EC1n ch\xEDnh x\xE1c</th><th data-v-6527f2d9${_scopeId}>Tranh ch\u1EA5p</th><th data-v-6527f2d9${_scopeId}>Ph\u1EA1m l\u1ED7i</th><th data-v-6527f2d9${_scopeId}>S\u1ED1 th\u1EBB v\xE0ng</th><th data-v-6527f2d9${_scopeId}>S\u1ED1 th\u1EBB \u0111\u1ECF</th></tr>`);
            if ((_d = unref(playerInfo)) == null ? void 0 : _d.length) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(playerInfo), (item, index) => {
                _push2(`<tr class="${ssrRenderClass([
                  "team-table__init",
                  {
                    "team-table__init--bg": index % 2 !== 0
                  }
                ])}" data-v-6527f2d9${_scopeId}><td data-v-6527f2d9${_scopeId}>${ssrInterpolate(++index)}</td><td data-v-6527f2d9${_scopeId}>`);
                _push2(ssrRenderComponent(_component_nuxt_link, {
                  class: "player-name text-capitalize",
                  to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).PLAYER}/${item.player_id}`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(item.player_name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(item.player_name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</td><td data-v-6527f2d9${_scopeId}>${ssrInterpolate(item.goals)}</td><td data-v-6527f2d9${_scopeId}>${ssrInterpolate(item.assists)}</td><td data-v-6527f2d9${_scopeId}>${ssrInterpolate(item.matches)}</td><td data-v-6527f2d9${_scopeId}>${ssrInterpolate(item.passes_accuracy)}</td><td data-v-6527f2d9${_scopeId}>${ssrInterpolate(item.duels)}</td><td data-v-6527f2d9${_scopeId}>${ssrInterpolate(item.fouls)}</td><td data-v-6527f2d9${_scopeId}>${ssrInterpolate(item.yellow_cards)}</td><td data-v-6527f2d9${_scopeId}>${ssrInterpolate(item.red_cards)}</td></tr>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(isLoading) && !((_e = unref(playerInfo)) == null ? void 0 : _e.length)) {
              _push2(`<!--[-->`);
              ssrRenderList(Array.from({ length: 20 }, (_2, i) => i + 1), (item) => {
                _push2(`<tr data-v-6527f2d9${_scopeId}><td data-v-6527f2d9${_scopeId}></td><td style="${ssrRenderStyle({ "padding": "18px" })}" data-v-6527f2d9${_scopeId}></td><td data-v-6527f2d9${_scopeId}></td><td data-v-6527f2d9${_scopeId}></td><td data-v-6527f2d9${_scopeId}></td><td data-v-6527f2d9${_scopeId}></td><td data-v-6527f2d9${_scopeId}></td><td data-v-6527f2d9${_scopeId}></td><td data-v-6527f2d9${_scopeId}></td><td data-v-6527f2d9${_scopeId}></td></tr>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</table>`);
            if (!unref(playerInfo).length && !unref(isLoading)) {
              _push2(`<div data-v-6527f2d9${_scopeId}><div class="d-flex flex-column align-items-center" data-v-6527f2d9${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseImage, {
                class: "nodata_pic",
                alt: "nodata pic",
                width: "200",
                height: "200",
                src: "/icon/nodata.svg"
              }, null, _parent2, _scopeId));
              _push2(`</div><p class="fw-bold text-center mt-3" data-v-6527f2d9${_scopeId}>Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "player" }, [
                createVNode("div", { class: "player__header" }, [
                  ((_f = unref(competitionSeasonList)) == null ? void 0 : _f.length) ? withDirectives((openBlock(), createBlock("select", {
                    key: 0,
                    onChange: onCompetitionChange,
                    "onUpdate:modelValue": ($event) => isRef(competitionActive) ? competitionActive.value = $event : null,
                    class: "form-select"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(competitionSeasonList), (item, index) => {
                      return openBlock(), createBlock("option", {
                        value: item.competition_id,
                        key: index
                      }, toDisplayString((item == null ? void 0 : item.competition_name) || item.competition_short_name), 9, ["value"]);
                    }), 128))
                  ], 40, ["onUpdate:modelValue"])), [
                    [vModelSelect, unref(competitionActive)]
                  ]) : createCommentVNode("", true),
                  createVNode("div", { class: "player__title" }, "H\u1ED3 s\u01A1 c\u1EA7u th\u1EE7"),
                  ((_h = (_g = unref(season)) == null ? void 0 : _g.list) == null ? void 0 : _h.length) ? withDirectives((openBlock(), createBlock("select", {
                    key: 1,
                    onChange: fetchPlayer,
                    "onUpdate:modelValue": ($event) => unref(season).active = $event,
                    class: "form-select"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(season).list, (item, index) => {
                      return openBlock(), createBlock("option", {
                        value: item.season_id,
                        key: index
                      }, toDisplayString(item.season_year), 9, ["value"]);
                    }), 128))
                  ], 40, ["onUpdate:modelValue"])), [
                    [vModelSelect, unref(season).active]
                  ]) : createCommentVNode("", true)
                ]),
                createVNode("div", { style: { "overflow-x": "auto" } }, [
                  createVNode("table", {
                    class: {
                      skeleton: unref(isLoading)
                    }
                  }, [
                    createVNode("tr", null, [
                      createVNode("th", null, "XH"),
                      createVNode("th", null, "C\u1EA7u th\u1EE7"),
                      createVNode("th", null, "B\xE0n th\u1EAFng"),
                      createVNode("th", null, "Ki\u1EBFn t\u1EA1o"),
                      createVNode("th", null, "Tr\u1EADn thi \u0111\u1EA5u"),
                      createVNode("th", null, "\u0110\u01B0\u1EDDng chuy\u1EC1n ch\xEDnh x\xE1c"),
                      createVNode("th", null, "Tranh ch\u1EA5p"),
                      createVNode("th", null, "Ph\u1EA1m l\u1ED7i"),
                      createVNode("th", null, "S\u1ED1 th\u1EBB v\xE0ng"),
                      createVNode("th", null, "S\u1ED1 th\u1EBB \u0111\u1ECF")
                    ]),
                    ((_i = unref(playerInfo)) == null ? void 0 : _i.length) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(playerInfo), (item, index) => {
                      return openBlock(), createBlock("tr", {
                        class: [
                          "team-table__init",
                          {
                            "team-table__init--bg": index % 2 !== 0
                          }
                        ],
                        key: index
                      }, [
                        createVNode("td", null, toDisplayString(++index), 1),
                        createVNode("td", null, [
                          createVNode(_component_nuxt_link, {
                            class: "player-name text-capitalize",
                            to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).PLAYER}/${item.player_id}`
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.player_name), 1)
                            ]),
                            _: 2
                          }, 1032, ["to"])
                        ]),
                        createVNode("td", null, toDisplayString(item.goals), 1),
                        createVNode("td", null, toDisplayString(item.assists), 1),
                        createVNode("td", null, toDisplayString(item.matches), 1),
                        createVNode("td", null, toDisplayString(item.passes_accuracy), 1),
                        createVNode("td", null, toDisplayString(item.duels), 1),
                        createVNode("td", null, toDisplayString(item.fouls), 1),
                        createVNode("td", null, toDisplayString(item.yellow_cards), 1),
                        createVNode("td", null, toDisplayString(item.red_cards), 1)
                      ], 2);
                    }), 128)) : createCommentVNode("", true),
                    unref(isLoading) && !((_j = unref(playerInfo)) == null ? void 0 : _j.length) ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(Array.from({ length: 20 }, (_2, i) => i + 1), (item) => {
                      return openBlock(), createBlock("tr", null, [
                        createVNode("td"),
                        createVNode("td", { style: { "padding": "18px" } }),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td")
                      ]);
                    }), 256)) : createCommentVNode("", true)
                  ], 2),
                  !unref(playerInfo).length && !unref(isLoading) ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("div", { class: "d-flex flex-column align-items-center" }, [
                      createVNode(_component_BaseImage, {
                        class: "nodata_pic",
                        alt: "nodata pic",
                        width: "200",
                        height: "200",
                        src: "/icon/nodata.svg"
                      })
                    ]),
                    createVNode("p", { class: "fw-bold text-center mt-3" }, "Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u")
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/playerdata/[id].vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const PlayerData = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-6527f2d9"]]);
const _sfc_main$8 = {
  __name: "SelectSeason",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    seasonList: Array
  }, {
    "seasonActive": {},
    "seasonActiveModifiers": {}
  }),
  emits: ["update:seasonActive"],
  setup(__props) {
    const seasonActive = useModel(__props, "seasonActive");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "select-season my-2" }, _attrs))} data-v-9a0b0d6a><select class="form-select" data-v-9a0b0d6a><!--[-->`);
      ssrRenderList(__props.seasonList, (item, index) => {
        _push(`<option${ssrRenderAttr("value", item.season_years)} class="${ssrRenderClass({
          "active-option": item.season_years === seasonActive.value
        })}" data-v-9a0b0d6a>${ssrInterpolate(item.season_years)}</option>`);
      });
      _push(`<!--]--></select></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/SelectSeason.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-9a0b0d6a"]]);
const _sfc_main$7 = {
  __name: "TablePlayerzh",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    title: String,
    info: Array,
    isJoinTable: Boolean
  }, {
    "isLoading": {},
    "isLoadingModifiers": {}
  }),
  emits: ["update:isLoading"],
  setup(__props) {
    const isLoading = useModel(__props, "isLoading");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_BaseImage = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "team-table" }, _attrs))} data-v-dd9e76cf><div class="team-table__header" data-v-dd9e76cf>${ssrInterpolate(__props.title)}</div><div style="${ssrRenderStyle({ "overflow-x": "auto" })}" class="team-table__content" data-v-dd9e76cf><table class="${ssrRenderClass({
        skeleton: isLoading.value
      })}" data-v-dd9e76cf><tr data-v-dd9e76cf><th data-v-dd9e76cf>Th\u1EDDi gian</th><th data-v-dd9e76cf>C\u1EA7u th\u1EE7</th><th data-v-dd9e76cf>V\u1ECB tr\xED</th><th data-v-dd9e76cf>${ssrInterpolate(__props.isJoinTable ? "\u0110\u1EBFn t\u1EEB" : "Sang")}</th><th data-v-dd9e76cf>Ph\xED chuy\u1EC3n nh\u01B0\u1EE3ng</th><th data-v-dd9e76cf>Lo\u1EA1i chuy\u1EC3n nh\u01B0\u1EE3ng</th></tr>`);
      if (__props.info.length) {
        _push(`<!--[-->`);
        ssrRenderList(__props.info, (item, index) => {
          _push(`<tr class="${ssrRenderClass([
            "team-table__init",
            {
              "team-table__init--bg": index % 2 !== 0
            }
          ])}" data-v-dd9e76cf><td data-v-dd9e76cf>${ssrInterpolate(("formatTimestamp" in _ctx ? _ctx.formatTimestamp : unref(formatTimestamp))(item.transfer_time))}</td><td class="team-table__item-name" data-v-dd9e76cf>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: item.player_info.id ? `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).PLAYER}/${item.player_info.id}` : "#"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.player_info.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.player_info.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td data-v-dd9e76cf>${ssrInterpolate(("getPlayerPosition" in _ctx ? _ctx.getPlayerPosition : unref(getPlayerPosition))(item.position))}</td><td class="team-table__item-join" data-v-dd9e76cf>`);
          if (__props.isJoinTable) {
            _push(ssrRenderComponent(_component_nuxt_link, {
              to: item.from_team_id ? `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${item.from_team_id}?tab=${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).SUMMARY}` : "#"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(item.from_team_name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.from_team_name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(ssrRenderComponent(_component_nuxt_link, {
              to: item.to_team_id ? `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${item.to_team_id}?tab=${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).SUMMARY}` : "#"
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
          }
          _push(`</td><td data-v-dd9e76cf>${ssrInterpolate(item.transfer_desc && item.transfer_desc !== "Free" && item.transfer_desc !== "Unknown" ? item.transfer_desc : item.transfer_desc === "Free" ? "Mi\u1EC5n ph\xED" : "-")}</td><td data-v-dd9e76cf>${ssrInterpolate(("getTransferType" in _ctx ? _ctx.getTransferType : unref(getTransferType))(item.transfer_type))}</td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.info.length && isLoading.value) {
        _push(`<!--[-->`);
        ssrRenderList([1, 2, 3, 4, 5], (item) => {
          _push(`<tr data-v-dd9e76cf><td data-v-dd9e76cf>${ssrInterpolate(item)}</td><td data-v-dd9e76cf>${ssrInterpolate(item)}</td><td data-v-dd9e76cf>${ssrInterpolate(item)}</td><td data-v-dd9e76cf>${ssrInterpolate(item)}</td><td data-v-dd9e76cf>${ssrInterpolate(item)}</td><td data-v-dd9e76cf>${ssrInterpolate(item)}</td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</table>`);
      if (!__props.info.length && !isLoading.value) {
        _push(`<div data-v-dd9e76cf><div class="d-flex flex-column align-items-center" data-v-dd9e76cf>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-dd9e76cf>Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/TablePlayerzh.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-dd9e76cf"]]);
const _sfc_main$6 = {
  __name: "[id]",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    info: Array
  }, {
    "seasonActive": {},
    "seasonActiveModifiers": {}
  }),
  emits: ["update:seasonActive"],
  setup(__props) {
    const props = __props;
    const seasonList = ref([]);
    const seasonActive = useModel(__props, "seasonActive");
    const isLoading = ref(true);
    const moveInResults = ref([]);
    const leaveResults = ref([]);
    const sortYear = (items) => {
      try {
        return items.sort((a, b) => {
          if (!a.season_years)
            return 1;
          if (!b.season_years)
            return -1;
          const [startYearA, endYearA = startYearA] = a.season_years.split("-").map(Number);
          const [startYearB, endYearB = startYearB] = b.season_years.split("-").map(Number);
          if (startYearA !== startYearB) {
            return endYearB - endYearA;
          }
          return endYearB - endYearA;
        });
      } catch (e) {
        console.log(e);
      }
    };
    const fetchSeasonTeam = async (id) => {
      if (id) {
        await useApiLiveScore(
          API_ROUTERS.LIVESCORE.SEASON_TRANSFER + "?comp_id=" + id
        ).then((resData) => {
          var _a2, _b2;
          var _a, _b, _c;
          if (resData && ((_a = resData[0]) == null ? void 0 : _a.seasons_stages)) {
            const data = (_a2 = sortYear((_b = resData[0]) == null ? void 0 : _b.seasons_stages)) != null ? _a2 : null;
            seasonList.value = data;
            seasonActive.value = (_b2 = (_c = data[0]) == null ? void 0 : _c.season_years) != null ? _b2 : null;
          } else {
            isLoading.value = false;
          }
        }).catch((e) => {
          console.log(e);
        });
      } else {
        isLoading.value = false;
      }
    };
    const fetchPlayerTransfer = async () => {
      isLoading.value = true;
      const teamId = props.info.lineUpTeam.team_info.team_id;
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.PLAYER_TRANSFER + `?team-id=${teamId}&season-year=${seasonActive.value}&123`
      ).then((resData) => {
        if (resData) {
          initPromisePlayerPosition(resData[0]);
        } else {
          isLoading.value = false;
        }
      }).catch((e) => {
        console.log(e);
      });
    };
    const initPromisePlayerPosition = async (item) => {
      try {
        isLoading.value = true;
        moveInResults.value = item.move_in;
        leaveResults.value = item.leave;
      } catch (error) {
        console.error("Error processing transfers:", error);
      } finally {
        isLoading.value = false;
      }
    };
    watch(
      () => seasonActive.value,
      () => {
        if (seasonActive.value) {
          fetchPlayerTransfer();
        }
      },
      { immediate: true }
    );
    watch(
      () => props.info.lineUpTeam,
      () => {
        if (props.info.lineUpTeam) {
          fetchSeasonTeam(props.info.lineUpTeam.team_info.competition_id);
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TeamsLayouts = __nuxt_component_0;
      const _component_TeamsSelectSeason = __nuxt_component_1$1;
      const _component_TeamsTablePlayerzh = __nuxt_component_2$1;
      _push(ssrRenderComponent(_component_TeamsLayouts, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TeamsSelectSeason, {
              seasonList: unref(seasonList),
              seasonActive: seasonActive.value,
              "onUpdate:seasonActive": ($event) => seasonActive.value = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TeamsTablePlayerzh, {
              isLoading: unref(isLoading),
              "onUpdate:isLoading": ($event) => isRef(isLoading) ? isLoading.value = $event : null,
              info: unref(moveInResults),
              title: "Gia nh\u1EADp",
              isJoinTable: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TeamsTablePlayerzh, {
              isLoading: unref(isLoading),
              "onUpdate:isLoading": ($event) => isRef(isLoading) ? isLoading.value = $event : null,
              info: unref(leaveResults),
              title: "R\u1EDDi kh\u1ECFi"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TeamsSelectSeason, {
                seasonList: unref(seasonList),
                seasonActive: seasonActive.value,
                "onUpdate:seasonActive": ($event) => seasonActive.value = $event
              }, null, 8, ["seasonList", "seasonActive", "onUpdate:seasonActive"]),
              createVNode(_component_TeamsTablePlayerzh, {
                isLoading: unref(isLoading),
                "onUpdate:isLoading": ($event) => isRef(isLoading) ? isLoading.value = $event : null,
                info: unref(moveInResults),
                title: "Gia nh\u1EADp",
                isJoinTable: ""
              }, null, 8, ["isLoading", "onUpdate:isLoading", "info"]),
              createVNode(_component_TeamsTablePlayerzh, {
                isLoading: unref(isLoading),
                "onUpdate:isLoading": ($event) => isRef(isLoading) ? isLoading.value = $event : null,
                info: unref(leaveResults),
                title: "R\u1EDDi kh\u1ECFi"
              }, null, 8, ["isLoading", "onUpdate:isLoading", "info"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/playerzh/[id].vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "TableSumary",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    info: Object
  }, {
    "isLoading": {},
    "isLoadingModifiers": {},
    "scheduleSeleted": {},
    "scheduleSeletedModifiers": {},
    "listDetailData": {},
    "listDetailDataModifiers": {}
  }),
  emits: ["update:isLoading", "update:scheduleSeleted", "update:listDetailData"],
  setup(__props) {
    var _a;
    const isLoading = useModel(__props, "isLoading");
    const scheduleSeleted = useModel(__props, "scheduleSeleted");
    useModel(__props, "listDetailData");
    const settingsData = useCookie("settingsData");
    const timeZone = ref(((_a = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _a.timeZone) || "");
    const getStart = (item, isHometeam, type) => {
      var _a2, _b;
      try {
        if (isHometeam) {
          const data2 = item.find((item2) => item2.type === type);
          return (_a2 = data2.home) != null ? _a2 : "-";
        }
        const data = item.find((item2) => item2.type === type);
        return (_b = data.away) != null ? _b : "-";
      } catch {
        return "-";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b, _c, _d;
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_BaseImage = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-a3e93680><div style="${ssrRenderStyle({ "overflow-x": "auto" })}" data-v-a3e93680><table class="${ssrRenderClass([{
        skeleton: isLoading.value
      }, "team__table"])}" data-v-a3e93680><tr data-v-a3e93680><th data-v-a3e93680>Li\xEAn \u0111o\xE0n</th><th data-v-a3e93680>Ng\xE0y di\u1EC5n ra</th><th data-v-a3e93680>\u0110\u1ED9i nh\xE0</th><th data-v-a3e93680>T\u1EF7 s\u1ED1</th><th data-v-a3e93680>\u0110\u1ED9i kh\xE1ch</th><th data-v-a3e93680>Th\u1EBB \u0111\u1ECF</th><th data-v-a3e93680>Th\u1EBB v\xE0ng</th><th data-v-a3e93680>T\u1EA5n c\xF4ng nguy hi\u1EC3m</th><th data-v-a3e93680>TL ki\u1EC3m so\xE1t b\xF3ng</th><th data-v-a3e93680>T\u1EA5n c\xF4ng</th><th data-v-a3e93680>Penalty</th><th data-v-a3e93680>G\xF3c</th><th data-v-a3e93680>S\xFAt tr\xFAng</th><th data-v-a3e93680>D\u1EEF li\u1EC7u</th></tr>`);
      if (scheduleSeleted.value.initData.length) {
        _push(`<!--[-->`);
        ssrRenderList(scheduleSeleted.value.initData, (item, index) => {
          var _a3, _b2, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l;
          _push(`<tr data-v-a3e93680><td style="${ssrRenderStyle({
            backgroundColor: item.competition_primary_color && item.competition_primary_color !== "#C7FF00" ? item.competition_primary_color : "#427242",
            color: "white"
          })}" data-v-a3e93680>${ssrInterpolate((item == null ? void 0 : item.competition_name) || item.competition_short_name)}</td><td data-v-a3e93680>${ssrInterpolate(("formatDateMomentUTCTimeZone" in _ctx ? _ctx.formatDateMomentUTCTimeZone : unref(formatDateMomentUTCTimeZone))(
            item.match_time,
            "DD-MM-yyyy HH:mm",
            unref(timeZone)
          ))}</td><td class="${ssrRenderClass([
            "team-name",
            {
              "team-name--active": ((_c2 = (_b2 = (_a3 = __props.info) == null ? void 0 : _a3.lineUpTeam) == null ? void 0 : _b2.team_info) == null ? void 0 : _c2.team_id) === ((_d2 = item == null ? void 0 : item.home_team) == null ? void 0 : _d2.id)
            }
          ])}" data-v-a3e93680>`);
          if (((_g = (_f = (_e = __props.info) == null ? void 0 : _e.lineUpTeam) == null ? void 0 : _f.team_info) == null ? void 0 : _g.team_id) !== ((_h = item == null ? void 0 : item.home_team) == null ? void 0 : _h.id)) {
            _push(`<div data-v-a3e93680>`);
            _push(ssrRenderComponent(_component_nuxt_link, {
              to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${item.home_team.id}?tab=${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).SUMMARY}`
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(item.home_team.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.home_team.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          } else {
            _push(`<span data-v-a3e93680>${ssrInterpolate(item.home_team.name)}</span>`);
          }
          _push(`</td><td data-v-a3e93680>${ssrInterpolate(item.home_scores[0])}-${ssrInterpolate(item.away_scores[0])}</td><td class="${ssrRenderClass([
            "team-name",
            {
              "team-name--active": ((_k = (_j = (_i = __props.info) == null ? void 0 : _i.lineUpTeam) == null ? void 0 : _j.team_info) == null ? void 0 : _k.team_id) === ((_l = item == null ? void 0 : item.away_team) == null ? void 0 : _l.id)
            }
          ])}" data-v-a3e93680>`);
          if (__props.info.lineUpTeam.team_info.team_id !== item.away_team.id) {
            _push(`<div data-v-a3e93680>`);
            _push(ssrRenderComponent(_component_nuxt_link, {
              to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${item.away_team.id}?tab=${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).SUMMARY}`
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(item.away_team.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.away_team.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          } else {
            _push(`<span data-v-a3e93680>${ssrInterpolate(item.away_team.name)}</span>`);
          }
          _push(`</td><td data-v-a3e93680>${ssrInterpolate(item.home_scores[2])}</td><td data-v-a3e93680>${ssrInterpolate(item.home_scores[3])}</td><td data-v-a3e93680>${ssrInterpolate(getStart(
            item.live_stats,
            __props.info.lineUpTeam.team_info.team_id === item.home_team.id,
            24
          ))}</td><td data-v-a3e93680>${ssrInterpolate(getStart(
            item.live_stats,
            __props.info.lineUpTeam.team_info.team_id === item.home_team.id,
            25
          ))}</td><td data-v-a3e93680>${ssrInterpolate(getStart(
            item.live_stats,
            __props.info.lineUpTeam.team_info.team_id === item.home_team.id,
            23
          ))}</td><td data-v-a3e93680>${ssrInterpolate(getStart(
            item.live_stats,
            __props.info.lineUpTeam.team_info.team_id === item.home_team.id,
            8
          ))}</td><td data-v-a3e93680>${ssrInterpolate(getStart(
            item.live_stats,
            __props.info.lineUpTeam.team_info.team_id === item.home_team.id,
            2
          ))}</td><td data-v-a3e93680>${ssrInterpolate(getStart(
            item.live_stats,
            __props.info.lineUpTeam.team_info.team_id === item.home_team.id,
            21
          ))}</td><td data-v-a3e93680>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            class: "highlighted",
            to: `${("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL}${item.id}?tab=h2h`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_BaseImage, {
                  style: { "width": "15px", "height": "15px" },
                  src: `/icon/analysis.png`,
                  alt: "analysis"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_BaseImage, {
                    style: { "width": "15px", "height": "15px" },
                    src: `/icon/analysis.png`,
                    alt: "analysis"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value && !((_b = (_a2 = scheduleSeleted.value) == null ? void 0 : _a2.initData) == null ? void 0 : _b.length)) {
        _push(`<!--[-->`);
        ssrRenderList(Array.from({ length: 15 }, (_, i) => i + 1), (item) => {
          _push(`<tr data-v-a3e93680><td data-v-a3e93680></td><td style="${ssrRenderStyle({ "padding": "18px" })}" data-v-a3e93680></td><td data-v-a3e93680>dummy data dummy data</td><td data-v-a3e93680></td><td data-v-a3e93680></td><td data-v-a3e93680></td><td data-v-a3e93680></td><td data-v-a3e93680></td><td data-v-a3e93680></td><td data-v-a3e93680></td><td data-v-a3e93680></td><td data-v-a3e93680></td><td data-v-a3e93680></td><td data-v-a3e93680></td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</table>`);
      if (!((_d = (_c = scheduleSeleted.value) == null ? void 0 : _c.initData) == null ? void 0 : _d.length) && !isLoading.value) {
        _push(`<div data-v-a3e93680><div class="d-flex flex-column align-items-center" data-v-a3e93680>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-a3e93680>D\u1EEF li\u1EC7u \u0111ang \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/TableSumary.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-a3e93680"]]);
const _sfc_main$4 = {
  __name: "PaginationSumary",
  __ssrInlineRender: true,
  props: {
    "pageActive": {},
    "pageActiveModifiers": {},
    "scheduleSeleted": {},
    "scheduleSeletedModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels("scroll", ["update:pageActive", "update:scheduleSeleted"]),
  setup(__props, { emit: __emit }) {
    useModel(__props, "pageActive");
    const scheduleSeleted = useModel(__props, "scheduleSeleted");
    return (_ctx, _push, _parent, _attrs) => {
      if (scheduleSeleted.value.initData.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "team__pagination d-flex justify-content-center py-5" }, _attrs))} data-v-09ee4427><button data-v-09ee4427>\u0110\u1EA7u</button><button class="prev" data-v-09ee4427><div class="icon" data-v-09ee4427></div></button><div class="team__pagination-page" data-v-09ee4427><span data-v-09ee4427>Page</span><select class="form-select form-select-sm" aria-label=".form-select-sm example" data-v-09ee4427><!--[-->`);
        ssrRenderList(scheduleSeleted.value.pages, (item, index) => {
          _push(`<option${ssrRenderAttr("value", item)} data-v-09ee4427>${ssrInterpolate(item)}</option>`);
        });
        _push(`<!--]--></select></div><button class="next" data-v-09ee4427><div class="icon icon--next" data-v-09ee4427></div></button><button data-v-09ee4427>Cu\u1ED1i</button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/PaginationSumary.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-09ee4427"]]);
const _sfc_main$3 = {
  __name: "[id]",
  __ssrInlineRender: true,
  props: {
    info: Object
  },
  setup(__props) {
    var _a;
    const route = useRoute();
    const objectIdSlug = ref(((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.id) || "");
    const listCompetition = ref([]);
    const selectedCompetition = ref("");
    const limit = ref(20);
    const schedules = ref([]);
    const pageActive = ref(1);
    const listDetailData = ref([]);
    const isLoading = ref(true);
    const honorList = ref([]);
    const scheduleSeleted = computed(() => {
      let initData = schedules.value;
      if (selectedCompetition.value) {
        initData = schedules.value.filter(
          (item) => item.competition_id === selectedCompetition.value
        );
      }
      const pages = Array.from(
        { length: Math.ceil(initData.length / limit.value) },
        (_, i) => i + 1
      );
      initData = initData.slice(
        (pageActive.value - 1) * limit.value,
        pageActive.value * limit.value
      );
      return {
        pages,
        initData
      };
    });
    const getListCompetition = (competitions) => {
      listCompetition.value = competitions.reduce((acc, value) => {
        if (!acc.some((item) => item.competition_id === value.competition_id)) {
          acc.push({
            competition_id: value.competition_id,
            competition_name: value.competition_name
          });
        }
        return acc;
      }, []);
      listCompetition.value.unshift({
        competition_id: "",
        competition_name: "T\u1EA5t c\u1EA3"
      });
    };
    const scrollToItem = () => {
      console.log("===========");
      (void 0).getElementById("scroll").scrollIntoView();
    };
    const fetchOldSchedule = async () => {
      try {
        await useApiLiveScore(
          API_ROUTERS.LIVESCORE.OLD_SCHEDULE + "?team-id=" + objectIdSlug.value
        ).then((resData) => {
          console.log("resData", resData);
          if (resData) {
            getListCompetition(resData);
            schedules.value = resData;
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    const fetchHonorTeam = async () => {
      var _a2, _b;
      try {
        const data = await useApiLiveScore(
          API_ROUTERS.LIVESCORE.TEAM_HONOR + `?team-id=${objectIdSlug.value}`
        );
        if (data == null ? void 0 : data.length) {
          honorList.value = (_b = (_a2 = data == null ? void 0 : data[0]) == null ? void 0 : _a2.honors) == null ? void 0 : _b.reduce((acc, value) => {
            if (!Object.keys(acc).includes(value.honor.id)) {
              acc[value.honor.id] = data[0].honors.filter(
                (item) => item.honor.id === value.honor.id
              );
            }
            return acc;
          }, {});
        }
      } catch (e) {
        console.log(e);
      }
    };
    watch(
      () => scheduleSeleted.value.initData,
      async () => {
        if (scheduleSeleted.value.initData.length === 0) {
          pageActive.value = 1;
        }
      },
      { immediate: true }
    );
    Promise.all([
      fetchOldSchedule(),
      fetchHonorTeam()
    ]).finally(() => {
      isLoading.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TeamsLayouts = __nuxt_component_0;
      const _component_TeamsTableSumary = __nuxt_component_1;
      const _component_TeamsPaginationSumary = __nuxt_component_2;
      const _component_TeamsTableHonor = __nuxt_component_3;
      _push(ssrRenderComponent(_component_TeamsLayouts, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2;
          if (_push2) {
            _push2(`<div class="team__title" data-v-21d81f04${_scopeId}>`);
            if (((_a2 = unref(listCompetition)) == null ? void 0 : _a2.length) && !unref(isLoading)) {
              _push2(`<select class="form-select form-select-sm" aria-label=".form-select-sm example" data-v-21d81f04${_scopeId}><!--[-->`);
              ssrRenderList(unref(listCompetition), (item, index) => {
                _push2(`<option${ssrRenderAttr("value", item.competition_id)} data-v-21d81f04${_scopeId}>${ssrInterpolate(item.competition_name)}</option>`);
              });
              _push2(`<!--]--></select>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span id="scroll" data-v-21d81f04${_scopeId}>D\u1EEF li\u1EC7u \u0111\u1ED9i b\xF3ng</span></div>`);
            _push2(ssrRenderComponent(_component_TeamsTableSumary, {
              info: __props.info,
              isLoading: unref(isLoading),
              "onUpdate:isLoading": ($event) => isRef(isLoading) ? isLoading.value = $event : null,
              scheduleSeleted: unref(scheduleSeleted),
              "onUpdate:scheduleSeleted": ($event) => isRef(scheduleSeleted) ? scheduleSeleted.value = $event : null,
              listDetailData: unref(listDetailData),
              "onUpdate:listDetailData": ($event) => isRef(listDetailData) ? listDetailData.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TeamsPaginationSumary, {
              onScroll: scrollToItem,
              pageActive: unref(pageActive),
              "onUpdate:pageActive": ($event) => isRef(pageActive) ? pageActive.value = $event : null,
              scheduleSeleted: unref(scheduleSeleted),
              "onUpdate:scheduleSeleted": ($event) => isRef(scheduleSeleted) ? scheduleSeleted.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TeamsTableHonor, {
              isLoading: unref(isLoading),
              "onUpdate:isLoading": ($event) => isRef(isLoading) ? isLoading.value = $event : null,
              info: unref(honorList)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "team__title" }, [
                createVNode(Transition, null, {
                  default: withCtx(() => {
                    var _a3;
                    return [
                      ((_a3 = unref(listCompetition)) == null ? void 0 : _a3.length) && !unref(isLoading) ? withDirectives((openBlock(), createBlock("select", {
                        key: 0,
                        class: "form-select form-select-sm",
                        "aria-label": ".form-select-sm example",
                        "onUpdate:modelValue": ($event) => isRef(selectedCompetition) ? selectedCompetition.value = $event : null
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(listCompetition), (item, index) => {
                          return openBlock(), createBlock("option", {
                            value: item.competition_id,
                            key: index
                          }, toDisplayString(item.competition_name), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"])), [
                        [vModelSelect, unref(selectedCompetition)]
                      ]) : createCommentVNode("", true)
                    ];
                  }),
                  _: 1
                }),
                createVNode("span", { id: "scroll" }, "D\u1EEF li\u1EC7u \u0111\u1ED9i b\xF3ng")
              ]),
              createVNode(_component_TeamsTableSumary, {
                info: __props.info,
                isLoading: unref(isLoading),
                "onUpdate:isLoading": ($event) => isRef(isLoading) ? isLoading.value = $event : null,
                scheduleSeleted: unref(scheduleSeleted),
                "onUpdate:scheduleSeleted": ($event) => isRef(scheduleSeleted) ? scheduleSeleted.value = $event : null,
                listDetailData: unref(listDetailData),
                "onUpdate:listDetailData": ($event) => isRef(listDetailData) ? listDetailData.value = $event : null
              }, null, 8, ["info", "isLoading", "onUpdate:isLoading", "scheduleSeleted", "onUpdate:scheduleSeleted", "listDetailData", "onUpdate:listDetailData"]),
              createVNode(_component_TeamsPaginationSumary, {
                onScroll: scrollToItem,
                pageActive: unref(pageActive),
                "onUpdate:pageActive": ($event) => isRef(pageActive) ? pageActive.value = $event : null,
                scheduleSeleted: unref(scheduleSeleted),
                "onUpdate:scheduleSeleted": ($event) => isRef(scheduleSeleted) ? scheduleSeleted.value = $event : null
              }, null, 8, ["pageActive", "onUpdate:pageActive", "scheduleSeleted", "onUpdate:scheduleSeleted"]),
              createVNode(_component_TeamsTableHonor, {
                isLoading: unref(isLoading),
                "onUpdate:isLoading": ($event) => isRef(isLoading) ? isLoading.value = $event : null,
                info: unref(honorList)
              }, null, 8, ["isLoading", "onUpdate:isLoading", "info"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/summary/[id].vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Summary = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-21d81f04"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  props: {
    info: Array
  },
  setup(__props) {
    var _a, _b;
    const route = useRoute();
    const objectIdSlug = ref(((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.id) || "");
    const schedules = ref([]);
    const isLoading = ref(true);
    const settingsData = useCookie("settingsData");
    const timeZone = ref(((_b = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _b.timeZone) || "");
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
    const fetchSchedule = async () => {
      try {
        await useApiLiveScore(
          API_ROUTERS.LIVESCORE.SCHEDULE + "?team-id=" + objectIdSlug.value
        ).then((resData) => {
          if (resData) {
            const colorMap = {};
            resData.forEach((item) => {
              if (!colorMap[item.competition_id]) {
                colorMap[item.competition_id] = colors[Object.keys(colorMap).length % colors.length];
              }
              item.bgColor = colorMap[item.competition_id];
            });
            schedules.value = resData;
          }
        });
      } catch (e) {
        console.log(e);
      } finally {
        isLoading.value = false;
      }
    };
    fetchSchedule();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TeamsLayouts = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_BaseImage = _sfc_main$e;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_TeamsLayouts, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d;
          if (_push2) {
            _push2(`<div class="team__title" data-v-e26e873e${_scopeId}>Gi\u1EA3i \u0111\u1EA5u</div><div data-v-e26e873e${_scopeId}><div style="${ssrRenderStyle({ "overflow-x": "auto" })}" data-v-e26e873e${_scopeId}><table class="${ssrRenderClass({
              skeleton: unref(isLoading)
            })}" data-v-e26e873e${_scopeId}><tr data-v-e26e873e${_scopeId}><th data-v-e26e873e${_scopeId}>Li\xEAn \u0111o\xE0n</th><th data-v-e26e873e${_scopeId}>Ng\xE0y di\u1EC5n ra</th><th data-v-e26e873e${_scopeId}>\u0110\u1ED9i nh\xE0</th><th data-v-e26e873e${_scopeId}>\u0110\u1ED9i kh\xE1ch</th></tr>`);
            if ((_a2 = unref(schedules)) == null ? void 0 : _a2.length) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(schedules), (item, index) => {
                _push2(`<tr data-v-e26e873e${_scopeId}><td style="${ssrRenderStyle({ backgroundColor: item.bgColor, color: "white" })}" data-v-e26e873e${_scopeId}>${ssrInterpolate((item == null ? void 0 : item.competition_name) || item.competition_short_name)}</td><td data-v-e26e873e${_scopeId}>${ssrInterpolate(("formatDateMomentUTCTimeZone" in _ctx ? _ctx.formatDateMomentUTCTimeZone : unref(formatDateMomentUTCTimeZone))(
                  item.match_time,
                  "DD-MM-yyyy HH:mm",
                  unref(timeZone)
                ))}</td><td data-v-e26e873e${_scopeId}>`);
                _push2(ssrRenderComponent(_component_nuxt_link, {
                  to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${item.home_team.id}?tab=${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).SUMMARY}`,
                  class: [
                    "team-name",
                    {
                      "team-name--active": __props.info.lineUpTeam.team_info.team_id === item.home_team.id
                    }
                  ]
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(item.home_team.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(item.home_team.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</td><td data-v-e26e873e${_scopeId}>`);
                _push2(ssrRenderComponent(_component_nuxt_link, {
                  to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${item.away_team.id}?tab=${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).SUMMARY}`,
                  class: [
                    "team-name",
                    {
                      "team-name--active": __props.info.lineUpTeam.team_info.team_id === item.away_team.id
                    }
                  ]
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(item.away_team.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(item.away_team.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</td></tr>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(isLoading) && !((_b2 = unref(schedules)) == null ? void 0 : _b2.length)) {
              _push2(`<!--[-->`);
              ssrRenderList(Array.from({ length: 15 }, (_2, i) => i + 1), (item) => {
                _push2(`<tr data-v-e26e873e${_scopeId}><td data-v-e26e873e${_scopeId}></td><td style="${ssrRenderStyle({ "padding": "18px" })}" data-v-e26e873e${_scopeId}></td><td data-v-e26e873e${_scopeId}></td><td data-v-e26e873e${_scopeId}></td></tr>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</table></div></div>`);
          } else {
            return [
              createVNode("div", { class: "team__title" }, "Gi\u1EA3i \u0111\u1EA5u"),
              createVNode("div", null, [
                createVNode("div", { style: { "overflow-x": "auto" } }, [
                  createVNode("table", {
                    class: {
                      skeleton: unref(isLoading)
                    }
                  }, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Li\xEAn \u0111o\xE0n"),
                      createVNode("th", null, "Ng\xE0y di\u1EC5n ra"),
                      createVNode("th", null, "\u0110\u1ED9i nh\xE0"),
                      createVNode("th", null, "\u0110\u1ED9i kh\xE1ch")
                    ]),
                    ((_c = unref(schedules)) == null ? void 0 : _c.length) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(schedules), (item, index) => {
                      return openBlock(), createBlock("tr", { key: index }, [
                        createVNode("td", {
                          style: { backgroundColor: item.bgColor, color: "white" }
                        }, toDisplayString((item == null ? void 0 : item.competition_name) || item.competition_short_name), 5),
                        createVNode("td", null, toDisplayString(("formatDateMomentUTCTimeZone" in _ctx ? _ctx.formatDateMomentUTCTimeZone : unref(formatDateMomentUTCTimeZone))(
                          item.match_time,
                          "DD-MM-yyyy HH:mm",
                          unref(timeZone)
                        )), 1),
                        createVNode("td", null, [
                          createVNode(_component_nuxt_link, {
                            to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${item.home_team.id}?tab=${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).SUMMARY}`,
                            class: [
                              "team-name",
                              {
                                "team-name--active": __props.info.lineUpTeam.team_info.team_id === item.home_team.id
                              }
                            ]
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.home_team.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["to", "class"])
                        ]),
                        createVNode("td", null, [
                          createVNode(_component_nuxt_link, {
                            to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${item.away_team.id}?tab=${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).SUMMARY}`,
                            class: [
                              "team-name",
                              {
                                "team-name--active": __props.info.lineUpTeam.team_info.team_id === item.away_team.id
                              }
                            ]
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.away_team.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["to", "class"])
                        ])
                      ]);
                    }), 128)) : createCommentVNode("", true),
                    unref(isLoading) && !((_d = unref(schedules)) == null ? void 0 : _d.length) ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(Array.from({ length: 15 }, (_2, i) => i + 1), (item) => {
                      return openBlock(), createBlock("tr", null, [
                        createVNode("td"),
                        createVNode("td", { style: { "padding": "18px" } }),
                        createVNode("td"),
                        createVNode("td")
                      ]);
                    }), 256)) : createCommentVNode("", true)
                  ], 2)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!unref(schedules).length && !unref(isLoading)) {
        _push(`<div data-v-e26e873e><div class="d-flex flex-column align-items-center" data-v-e26e873e>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-e26e873e>Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/teamsche/[id].vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const TeamSche = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-e26e873e"]]);
const _sfc_main$1 = {
  __name: "index",
  __ssrInlineRender: true,
  props: {
    info: Object
  },
  setup(__props) {
    const { info } = __props;
    const listPerformance = ref({});
    const route = useRoute();
    const isLoading = ref(true);
    const sortYear = (items) => {
      try {
        return items.sort((a, b) => {
          if (!a.year)
            return 1;
          if (!b.year)
            return -1;
          const [startYearA, endYearA = startYearA] = a.year.split("-").map(Number);
          const [startYearB, endYearB = startYearB] = b.year.split("-").map(Number);
          if (startYearA !== startYearB) {
            return endYearB - endYearA;
          }
          return endYearB - endYearA;
        });
      } catch (e) {
        console.log(e);
      }
    };
    const fetchTeamPerformance = async () => {
      var _a, _b;
      if ((_b = (_a = info == null ? void 0 : info.lineUpTeam) == null ? void 0 : _a.team_info) == null ? void 0 : _b.competition_id) {
        await useApiLiveScore(
          `${API_ROUTERS.LIVESCORE.TEAM_ACHIEVEMENT}?team-id=${route.params.id}&competition-id=${info.lineUpTeam.team_info.competition_id}`
        ).then((resData) => {
          if (resData && (resData == null ? void 0 : resData[0])) {
            const data = resData[0];
            data.near_years = sortYear(data.near_years);
            listPerformance.value = data;
            isLoading.value = false;
          } else {
            isLoading.value = false;
          }
        });
      } else {
        isLoading.value = false;
      }
    };
    fetchTeamPerformance();
    const perCentItem = (item1, item2) => {
      try {
        if (item2 === 0) {
          return "0%";
        }
        const result = item1 / item2 * 100;
        if (isNaN(result) || !isFinite(result)) {
          return "0%";
        }
        return Math.ceil(result) + "%";
      } catch {
        return "0%";
      }
    };
    const calcAvg = (item1, item2) => {
      try {
        if (item2 === 0) {
          return "0";
        }
        const result = item1 / item2;
        if (isNaN(result) || !isFinite(result)) {
          return "0";
        }
        return parseFloat(result.toFixed(2));
      } catch {
        return "0";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_BaseImage = _sfc_main$e;
      _push(`<!--[-->`);
      if (((_a = Object.keys(unref(listPerformance))) == null ? void 0 : _a.length) && !unref(isLoading)) {
        _push(`<div class="table" data-v-281db55c><!--[-->`);
        ssrRenderList(unref(listPerformance).near_years, (item, index) => {
          var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca;
          _push(`<div data-v-281db55c><div class="table__title" data-v-281db55c> Th\u1ED1ng k\xEA \u0111i\u1EC3m gi\u1EA3i \u0111\u1EA5u ${ssrInterpolate(unref(listPerformance).short_name)} ${ssrInterpolate(item.year)}</div><div class="table__content" style="${ssrRenderStyle({ "overflow": "auto" })}" data-v-281db55c><table class="${ssrRenderClass({
            skeleton: unref(isLoading)
          })}" data-v-281db55c><tr data-v-281db55c><th data-v-281db55c></th><th data-v-281db55c>S\u1ED1 tr\u1EADn</th><th data-v-281db55c>Th\u1EAFng</th><th data-v-281db55c>H\xF2a</th><th data-v-281db55c>B\u1EA1i</th><th data-v-281db55c>BT</th><th data-v-281db55c>BB</th><th data-v-281db55c>HS</th><th data-v-281db55c>Th\u1EAFng%</th><th data-v-281db55c>H\xF2a%</th><th data-v-281db55c>B\u1EA1i%</th><th data-v-281db55c>Avg BT</th><th data-v-281db55c>Avg BB</th><th data-v-281db55c>\u0110i\u1EC3m</th><th data-v-281db55c>V\u1ECB tr\xED</th></tr><tr data-v-281db55c><td data-v-281db55c>T\u1EA5t c\u1EA3</td><td data-v-281db55c>${ssrInterpolate((_a2 = item == null ? void 0 : item.filtered_row) == null ? void 0 : _a2.total)}</td><td data-v-281db55c>${ssrInterpolate((_b2 = item == null ? void 0 : item.filtered_row) == null ? void 0 : _b2.won)}</td><td data-v-281db55c>${ssrInterpolate((_c = item == null ? void 0 : item.filtered_row) == null ? void 0 : _c.draw)}</td><td data-v-281db55c>${ssrInterpolate((_d = item == null ? void 0 : item.filtered_row) == null ? void 0 : _d.loss)}</td><td data-v-281db55c>${ssrInterpolate((_e = item == null ? void 0 : item.filtered_row) == null ? void 0 : _e.goals)}</td><td data-v-281db55c>${ssrInterpolate((_f = item == null ? void 0 : item.filtered_row) == null ? void 0 : _f.goals_against)}</td><td data-v-281db55c>${ssrInterpolate((_g = item == null ? void 0 : item.filtered_row) == null ? void 0 : _g.goal_diff)}</td><td data-v-281db55c>${ssrInterpolate(perCentItem((_h = item == null ? void 0 : item.filtered_row) == null ? void 0 : _h.won, (_i = item == null ? void 0 : item.filtered_row) == null ? void 0 : _i.total))}</td><td data-v-281db55c>${ssrInterpolate(perCentItem((_j = item == null ? void 0 : item.filtered_row) == null ? void 0 : _j.draw, (_k = item == null ? void 0 : item.filtered_row) == null ? void 0 : _k.total))}</td><td data-v-281db55c>${ssrInterpolate(perCentItem((_l = item == null ? void 0 : item.filtered_row) == null ? void 0 : _l.loss, (_m = item == null ? void 0 : item.filtered_row) == null ? void 0 : _m.total))}</td><td data-v-281db55c>${ssrInterpolate(calcAvg((_n = item == null ? void 0 : item.filtered_row) == null ? void 0 : _n.goals, (_o = item == null ? void 0 : item.filtered_row) == null ? void 0 : _o.total))}</td><td data-v-281db55c>${ssrInterpolate(calcAvg(
            (_p = item == null ? void 0 : item.filtered_row) == null ? void 0 : _p.goals_against,
            (_q = item == null ? void 0 : item.filtered_row) == null ? void 0 : _q.total
          ))}</td><td data-v-281db55c>${ssrInterpolate((_r = item == null ? void 0 : item.filtered_row) == null ? void 0 : _r.points)}</td><td data-v-281db55c>${ssrInterpolate((_s = item == null ? void 0 : item.filtered_row) == null ? void 0 : _s.position)}</td></tr><tr class="bg-gray" data-v-281db55c><td data-v-281db55c>\u0110\u1ED9i nh\xE0</td><td data-v-281db55c>${ssrInterpolate((_t = item == null ? void 0 : item.filtered_row) == null ? void 0 : _t.home_total)}</td><td data-v-281db55c>${ssrInterpolate((_u = item == null ? void 0 : item.filtered_row) == null ? void 0 : _u.home_won)}</td><td data-v-281db55c>${ssrInterpolate((_v = item == null ? void 0 : item.filtered_row) == null ? void 0 : _v.home_draw)}</td><td data-v-281db55c>${ssrInterpolate((_w = item == null ? void 0 : item.filtered_row) == null ? void 0 : _w.home_loss)}</td><td data-v-281db55c>${ssrInterpolate((_x = item == null ? void 0 : item.filtered_row) == null ? void 0 : _x.home_goals)}</td><td data-v-281db55c>${ssrInterpolate((_y = item == null ? void 0 : item.filtered_row) == null ? void 0 : _y.home_goals_against)}</td><td data-v-281db55c>${ssrInterpolate((_z = item == null ? void 0 : item.filtered_row) == null ? void 0 : _z.home_goal_diff)}</td><td data-v-281db55c>${ssrInterpolate(perCentItem(
            (_A = item == null ? void 0 : item.filtered_row) == null ? void 0 : _A.home_won,
            (_B = item == null ? void 0 : item.filtered_row) == null ? void 0 : _B.home_total
          ))}</td><td data-v-281db55c>${ssrInterpolate(perCentItem(
            (_C = item == null ? void 0 : item.filtered_row) == null ? void 0 : _C.home_draw,
            (_D = item == null ? void 0 : item.filtered_row) == null ? void 0 : _D.home_total
          ))}</td><td data-v-281db55c>${ssrInterpolate(perCentItem(
            (_E = item == null ? void 0 : item.filtered_row) == null ? void 0 : _E.home_loss,
            (_F = item == null ? void 0 : item.filtered_row) == null ? void 0 : _F.home_total
          ))}</td><td data-v-281db55c>${ssrInterpolate(calcAvg(
            (_G = item == null ? void 0 : item.filtered_row) == null ? void 0 : _G.home_goals,
            (_H = item == null ? void 0 : item.filtered_row) == null ? void 0 : _H.home_total
          ))}</td><td data-v-281db55c>${ssrInterpolate(calcAvg(
            (_I = item == null ? void 0 : item.filtered_row) == null ? void 0 : _I.home_goals_against,
            (_J = item == null ? void 0 : item.filtered_row) == null ? void 0 : _J.home_total
          ))}</td><td data-v-281db55c>${ssrInterpolate((_K = item == null ? void 0 : item.filtered_row) == null ? void 0 : _K.home_points)}</td><td data-v-281db55c>${ssrInterpolate((_L = item == null ? void 0 : item.filtered_row) == null ? void 0 : _L.home_position)}</td></tr><tr data-v-281db55c><td data-v-281db55c>\u0110\u1ED9i kh\xE1ch</td><td data-v-281db55c>${ssrInterpolate((_M = item == null ? void 0 : item.filtered_row) == null ? void 0 : _M.away_total)}</td><td data-v-281db55c>${ssrInterpolate((_N = item == null ? void 0 : item.filtered_row) == null ? void 0 : _N.away_won)}</td><td data-v-281db55c>${ssrInterpolate((_O = item == null ? void 0 : item.filtered_row) == null ? void 0 : _O.away_draw)}</td><td data-v-281db55c>${ssrInterpolate((_P = item == null ? void 0 : item.filtered_row) == null ? void 0 : _P.away_loss)}</td><td data-v-281db55c>${ssrInterpolate((_Q = item == null ? void 0 : item.filtered_row) == null ? void 0 : _Q.away_goals)}</td><td data-v-281db55c>${ssrInterpolate((_R = item == null ? void 0 : item.filtered_row) == null ? void 0 : _R.away_goals_against)}</td><td data-v-281db55c>${ssrInterpolate((_S = item == null ? void 0 : item.filtered_row) == null ? void 0 : _S.away_goal_diff)}</td> ${ssrInterpolate()} <td data-v-281db55c>${ssrInterpolate(perCentItem(
            (_T = item == null ? void 0 : item.filtered_row) == null ? void 0 : _T.away_won,
            (_U = item == null ? void 0 : item.filtered_row) == null ? void 0 : _U.away_total
          ))}</td><td data-v-281db55c>${ssrInterpolate(perCentItem(
            (_V = item == null ? void 0 : item.filtered_row) == null ? void 0 : _V.away_draw,
            (_W = item == null ? void 0 : item.filtered_row) == null ? void 0 : _W.away_total
          ))}</td><td data-v-281db55c>${ssrInterpolate(perCentItem(
            (_X = item == null ? void 0 : item.filtered_row) == null ? void 0 : _X.away_loss,
            (_Y = item == null ? void 0 : item.filtered_row) == null ? void 0 : _Y.away_total
          ))}</td><td data-v-281db55c>${ssrInterpolate(calcAvg(
            (_Z = item == null ? void 0 : item.filtered_row) == null ? void 0 : _Z.away_goals,
            (__ = item == null ? void 0 : item.filtered_row) == null ? void 0 : __.away_total
          ))}</td><td data-v-281db55c>${ssrInterpolate(calcAvg(
            (_$ = item == null ? void 0 : item.filtered_row) == null ? void 0 : _$.away_goals_against,
            (_aa = item == null ? void 0 : item.filtered_row) == null ? void 0 : _aa.away_total
          ))}</td><td data-v-281db55c>${ssrInterpolate((_ba = item == null ? void 0 : item.filtered_row) == null ? void 0 : _ba.away_points)}</td><td data-v-281db55c>${ssrInterpolate((_ca = item == null ? void 0 : item.filtered_row) == null ? void 0 : _ca.away_position)}</td></tr></table></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isLoading) && !((_b = Object.keys(unref(listPerformance))) == null ? void 0 : _b.length)) {
        _push(`<div class="table" data-v-281db55c><!--[-->`);
        ssrRenderList(Array.from({ length: 5 }, (_, i) => i + 1), (item, index) => {
          _push(`<div data-v-281db55c><div class="table__title" data-v-281db55c>Th\u1ED1ng k\xEA \u0111i\u1EC3m gi\u1EA3i \u0111\u1EA5u</div><div class="table__content" style="${ssrRenderStyle({ "overflow": "auto" })}" data-v-281db55c><table class="skeleton" data-v-281db55c><tr data-v-281db55c><th data-v-281db55c></th><th data-v-281db55c>S\u1ED1 tr\u1EADn</th><th data-v-281db55c>Th\u1EAFng</th><th data-v-281db55c>H\xF2a</th><th data-v-281db55c>B\u1EA1i</th><th data-v-281db55c>BT</th><th data-v-281db55c>BB</th><th data-v-281db55c>HS</th><th data-v-281db55c>Th\u1EAFng%</th><th data-v-281db55c>H\xF2a%</th><th data-v-281db55c>B\u1EA1i%</th><th data-v-281db55c>Avg BT</th><th data-v-281db55c>Avg BB</th><th data-v-281db55c>\u0110i\u1EC3m</th><th data-v-281db55c>V\u1ECB tr\xED</th></tr><!--[-->`);
          ssrRenderList(Array.from({ length: 3 }, (_, i) => i + 1), (item2, index2) => {
            _push(`<tr data-v-281db55c><td data-v-281db55c></td><td data-v-281db55c></td><td data-v-281db55c></td><td data-v-281db55c></td><td data-v-281db55c></td><td data-v-281db55c></td><td data-v-281db55c></td><td data-v-281db55c></td><td data-v-281db55c></td><td data-v-281db55c></td><td data-v-281db55c></td><td data-v-281db55c></td><td data-v-281db55c></td><td data-v-281db55c></td><td data-v-281db55c></td></tr>`);
          });
          _push(`<!--]--></table></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!Object.keys(unref(listPerformance)).length && !unref(isLoading)) {
        _push(`<div data-v-281db55c><div class="table" data-v-281db55c><div data-v-281db55c><div class="table__title" data-v-281db55c>Th\u1ED1ng k\xEA \u0111i\u1EC3m gi\u1EA3i \u0111\u1EA5u</div><div class="table__content" style="${ssrRenderStyle({ "overflow": "auto" })}" data-v-281db55c><table class="skeleton" data-v-281db55c><tr data-v-281db55c><th data-v-281db55c></th><th data-v-281db55c>S\u1ED1 tr\u1EADn</th><th data-v-281db55c>Th\u1EAFng</th><th data-v-281db55c>H\xF2a</th><th data-v-281db55c>B\u1EA1i</th><th data-v-281db55c>BT</th><th data-v-281db55c>BB</th><th data-v-281db55c>HS</th><th data-v-281db55c>Th\u1EAFng%</th><th data-v-281db55c>H\xF2a%</th><th data-v-281db55c>B\u1EA1i%</th><th data-v-281db55c>Avg BT</th><th data-v-281db55c>Avg BB</th><th data-v-281db55c>\u0110i\u1EC3m</th><th data-v-281db55c>V\u1ECB tr\xED</th></tr></table></div></div></div><div class="d-flex flex-column align-items-center" data-v-281db55c>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`<p class="fw-bold text-center mt-3" data-v-281db55c>Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/teamnearyear/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TeamNearYear = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-281db55c"]]);
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d;
    let __temp, __restore;
    const { info, fetchObjectMeta, fetchLineUpTeam, h1Content, content } = useShareTeams();
    const teamInfo = ref(null);
    const route = useRoute();
    const getComponentActive = computed(() => {
      var _a2;
      if (route.query.tab) {
        const tab = tabs.value.find((item) => {
          if (Array.isArray(item.redirect)) {
            return item.redirect.includes(route.fullPath);
          } else {
            return item.redirect === route.fullPath;
          }
        });
        return (_a2 = tab == null ? void 0 : tab.components) != null ? _a2 : false;
      } else {
        return Summary;
      }
    });
    const tabs = ref([
      {
        id: 1,
        name: "D\u1EEF li\u1EC7u \u0111\u1ED9i b\xF3ng",
        redirect: [
          `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.SUMMARY}`,
          `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}`
        ],
        components: Summary
      },
      {
        id: 2,
        name: "L\u1ECBch thi \u0111\u1EA5u",
        redirect: `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.TEAMSCHE}`,
        components: TeamSche
      },
      {
        id: 3,
        name: "\u0110\u1ED9i h\xECnh",
        redirect: `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.LINEUP}`,
        components: LineUp
      },
      {
        id: 4,
        name: "Chuy\u1EC3n nh\u01B0\u1EE3ng",
        redirect: `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.PLAYERZH}`,
        components: _sfc_main$6
      },
      {
        id: 5,
        name: "H\u1ED3 s\u01A1 c\u1EA7u th\u1EE7",
        redirect: `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.PLAYERDATA}`,
        components: PlayerData
      },
      {
        id: 6,
        name: "Th\xE0nh t\xEDch",
        redirect: `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.ACHIEVEMENTS}`,
        components: TeamNearYear
      }
    ]);
    if (route.query.tab && ![
      ROUTER_TEAM_NAME.SUMMARY,
      ROUTER_TEAM_NAME.TEAMSCHE,
      ROUTER_TEAM_NAME.LINEUP,
      ROUTER_TEAM_NAME.PLAYERZH,
      ROUTER_TEAM_NAME.PLAYERDATA,
      ROUTER_TEAM_NAME.ACHIEVEMENTS
    ].includes(route.query.tab)) {
      navigateTo(tabs.value[0].redirect[1]);
    }
    if (!route.query.tab && ((_a = Object.keys(route.query)) == null ? void 0 : _a.length)) {
      navigateTo(tabs.value[0].redirect[1]);
    }
    const { data } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("allData", async () => {
      try {
        const [lineUpTeam] = await Promise.all([fetchLineUpTeam(route.params.id)]);
        if (!lineUpTeam || lineUpTeam.length === 0) {
          showError({
            statusCode: 404,
            statusMessage: "D\u1EEF li\u1EC7u kh\xF4ng t\u1ED3n t\u1EA1i!"
          });
        }
        return {
          lineUpTeam
        };
      } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
      }
    })), __temp = await __temp, __restore(), __temp);
    info.value = data.value;
    teamInfo.value = data.value;
    fetchObjectMeta((_d = (_c = (_b = info.value) == null ? void 0 : _b.lineUpTeam) == null ? void 0 : _c.team_info) == null ? void 0 : _d.team_name, route.fullPath);
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_TeamsTabsRedirect = __nuxt_component_0$1;
      const _component_TeamsInfoTeam = __nuxt_component_1$2;
      const _component_BaseImage = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container bg-white team" }, _attrs))} data-v-c1b607fc><div data-v-c1b607fc>`);
      _push(ssrRenderComponent(_component_TeamsTabsRedirect, { tabs: unref(tabs) }, null, _parent));
      if ((_a2 = unref(teamInfo).lineUpTeam) == null ? void 0 : _a2.team_info) {
        _push(ssrRenderComponent(_component_TeamsInfoTeam, {
          teamInfo: unref(teamInfo).lineUpTeam.team_info
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(teamInfo).lineUpTeam === null) {
        _push(`<div data-v-c1b607fc><div class="d-flex flex-column align-items-center" data-v-c1b607fc>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-c1b607fc>Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(teamInfo).lineUpTeam) {
        _push(`<div data-v-c1b607fc>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(getComponentActive)), { info: unref(info) }, null), _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(teamInfo).lineUpTeam !== null && !unref(teamInfo).lineUpTeam) {
        _push(`<div class="fw-bold text-center d-flex flex-column align-items-center mt-4" data-v-c1b607fc><div class="spinner-border text-success" role="status" data-v-c1b607fc><span class="visually-hidden" data-v-c1b607fc>Loading...</span></div><p class="fw-bold mt-2" data-v-c1b607fc>\u0110ang t\u1EA3i vui l\xF2ng ch\u1EDD</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div id="content-page" class="mt-5" data-v-c1b607fc>`);
      if (unref(h1Content)) {
        _push(`<h1 class="page_title" data-v-c1b607fc>${ssrInterpolate(unref(h1Content))}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center" data-v-c1b607fc>${ssrInterpolate(unref(content))}</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/team/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c1b607fc"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-ZFrciVrl.mjs.map
