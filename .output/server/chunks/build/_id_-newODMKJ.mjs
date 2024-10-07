import { _ as _export_sfc, b as useShareCommon, k as ROUTER_TEAM_NAME, a6 as getPlayerPosition, aw as formatTimestamp, a as useRoute, e as useCookie, i as formatDateMomentUTCTimeZone, d as useSchema, a9 as navigateTo, a8 as useAsyncData, aj as showError, j as getLiveScoreImage, m as __nuxt_component_0$3, n as _sfc_main$d$1, ay as getTransferType, h as ROUTERS_OLD, D as useApiLiveScore, E as API_ROUTERS, aA as __nuxt_component_1$1$1 } from './server.mjs';
import { useSSRContext, defineComponent, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, ref, computed, withAsyncContext, mergeProps, resolveDynamicComponent, reactive, withDirectives, isRef, vModelSelect, mergeModels, useModel, watch, Transition } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderAttrs, ssrRenderVNode, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { useSnackbar } from 'vue3-snackbar';
import { u as useShareTeams } from './useShareTeams-B6S0ikqM.mjs';
import { _ as __nuxt_component_3$1 } from './TableHonor-B_ZJxE2U.mjs';
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
import '@vueuse/core';
import 'moment-timezone';
import 'crypto-js';
import 'pako';
import 'buffer';
import '@vueuse/sound';

const _sfc_main$d = {
  __name: "TabsRedirect",
  __ssrInlineRender: true,
  props: {
    tabs: Array
  },
  setup(__props) {
    const route = useRoute();
    const { $t } = useShareCommon();
    const translate = (key) => {
      const fullKey = `${key} team`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
    const getActiveTab = (item) => {
      const url = route.fullPath;
      if (Array.isArray(item)) {
        return item.includes(route.fullPath) ? "tab--active" : "";
      }
      return item === url ? "tab--active" : "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tabs" }, _attrs))} data-v-d5bfae79><!--[-->`);
      ssrRenderList(__props.tabs, (tab, index) => {
        _push(`<button class="${ssrRenderClass(["tab", getActiveTab(tab.redirect)])}" data-v-d5bfae79>${ssrInterpolate(translate(tab.name))}</button>`);
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
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-d5bfae79"]]);
const _sfc_main$c = {
  __name: "InfoTeam",
  __ssrInlineRender: true,
  props: {
    teamInfo: Object
  },
  setup(__props) {
    useSnackbar();
    const { $t } = useShareCommon();
    const translate = (key) => {
      const fullKey = `${key} team`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
    const { teamInfo } = __props;
    const info = computed(() => {
      return teamInfo;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b, _c;
      const _component_BaseImage = _sfc_main$d$1;
      const _component_nuxt_link = __nuxt_component_0$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "table-team" }, _attrs))} data-v-4286bfe7><div class="table-team__name" data-v-4286bfe7><div class="logo-team" data-v-4286bfe7>`);
      if (unref(info).team_logo_o) {
        _push(ssrRenderComponent(_component_BaseImage, {
          src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(((_a = unref(info)) == null ? void 0 : _a.team_national) ? (_b = unref(info)) == null ? void 0 : _b.team_country_logo_o : (_c = unref(info)) == null ? void 0 : _c.team_logo_o, "team") + "!h80"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p data-v-4286bfe7>${ssrInterpolate(unref(info).team_name)}</p><button class="btn-follow" data-v-4286bfe7>${ssrInterpolate(translate("Follow"))} `);
      _push(ssrRenderComponent(_component_BaseImage, { src: "/icon/star.svg" }, null, _parent));
      _push(`</button></div><div class="table-team__detail" data-v-4286bfe7><div class="table-team__item" data-v-4286bfe7><div class="table-team__item-left" data-v-4286bfe7>${ssrInterpolate(unref(info).venue_location ? translate("City") + ":" : translate("Country") + ":")}</div><div class="table-team__item-right" data-v-4286bfe7>${ssrInterpolate(unref(info).venue_location ? unref(info).venue_location : unref(info).country_name ? unref(info).country_name : "-")}</div></div><div class="table-team__item" data-v-4286bfe7><div class="table-team__item-left" data-v-4286bfe7>${ssrInterpolate(translate("Training Ground"))}:</div><div class="table-team__item-right" data-v-4286bfe7>${ssrInterpolate((_a2 = unref(info).venue_name) != null ? _a2 : "-")}</div></div><div class="table-team__item" data-v-4286bfe7><div class="table-team__item-left" data-v-4286bfe7>${ssrInterpolate(translate("Capacity"))}:</div><div class="table-team__item-right" data-v-4286bfe7>${ssrInterpolate(!!unref(info).venue_capacity ? unref(info).venue_capacity : "-")}</div></div><div class="table-team__item" data-v-4286bfe7><div class="table-team__item-left" data-v-4286bfe7>${ssrInterpolate(translate("Year Founded"))}:</div><div class="table-team__item-right" data-v-4286bfe7>${ssrInterpolate(unref(info).team_foundation_time ? unref(info).team_foundation_time : "-")}</div></div><div class="table-team__item" data-v-4286bfe7><div class="table-team__item-left" data-v-4286bfe7>${ssrInterpolate(translate("Coach"))}:</div><div class="table-team__item-right" data-v-4286bfe7>`);
      if (!unref(info).coach_id) {
        _push(`<div data-v-4286bfe7>-</div>`);
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
      _push(`</div></div><div class="table-team__item" data-v-4286bfe7><div class="table-team__item-left" data-v-4286bfe7>${ssrInterpolate(translate("Website"))}:</div><div class="table-team__item-right" data-v-4286bfe7>`);
      if (!unref(info).team_website) {
        _push(`<div data-v-4286bfe7>-</div>`);
      } else {
        _push(`<a class="${ssrRenderClass({ "highlighted": unref(info).team_website })}" rel="nofollow" target="_blank"${ssrRenderAttr("href", unref(info).team_website)} data-v-4286bfe7>${ssrInterpolate(unref(info).team_website ? translate("Click here") : "-")}</a>`);
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
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-4286bfe7"]]);
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
    const { $t } = useShareCommon();
    const translate = (key, prefix = null) => {
      const fullKey = `${key} ${prefix ? "playertech" : "team"}`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
    const formatBirthday = (item) => {
      if (item) {
        const [year, month, day] = item.split("-");
        return `${day}-${month}-${year}`;
      }
      return "-";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TeamsLayouts = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$3;
      const _component_BaseImage = _sfc_main$d$1;
      _push(ssrRenderComponent(_component_TeamsLayouts, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<div class="team__title" data-v-5457ed77${_scopeId}>${ssrInterpolate(translate("Lineup"))}</div><div data-v-5457ed77${_scopeId}><div style="${ssrRenderStyle({ "overflow-x": "auto" })}" data-v-5457ed77${_scopeId}><table data-v-5457ed77${_scopeId}><tr data-v-5457ed77${_scopeId}><th data-v-5457ed77${_scopeId}>${ssrInterpolate(translate("Number"))}</th><th data-v-5457ed77${_scopeId}>${ssrInterpolate(translate("Name"))}</th><th style="${ssrRenderStyle({ "width": "100px" })}" data-v-5457ed77${_scopeId}>${ssrInterpolate(translate("Date of Birth"))}</th><th data-v-5457ed77${_scopeId}>${ssrInterpolate(translate("Height"))}</th><th data-v-5457ed77${_scopeId}>${ssrInterpolate(translate("Weight"))}</th><th data-v-5457ed77${_scopeId}>${ssrInterpolate(translate("Position"))}</th><th data-v-5457ed77${_scopeId}>${ssrInterpolate(translate("Nationality"))}</th><th data-v-5457ed77${_scopeId}>${ssrInterpolate(translate("Value"))}</th><th data-v-5457ed77${_scopeId}>${ssrInterpolate(translate("Contract Expiry"))}</th></tr>`);
            if ((_b = (_a = __props.info) == null ? void 0 : _a.lineUpTeam) == null ? void 0 : _b.players) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.info.lineUpTeam.players, (item, index) => {
                var _a2;
                _push2(`<tr class="content" data-v-5457ed77${_scopeId}><td data-v-5457ed77${_scopeId}>${ssrInterpolate(item.shirt_number ? item.shirt_number : "-")}</td><td class="text-capitalize" data-v-5457ed77${_scopeId}>`);
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
                _push2(`</td><td data-v-5457ed77${_scopeId}>${ssrInterpolate(formatBirthday(item.birthday.slice(0, 10)))}</td><td data-v-5457ed77${_scopeId}>${ssrInterpolate(item.height)}</td><td data-v-5457ed77${_scopeId}>${ssrInterpolate(item.weight)}</td><td data-v-5457ed77${_scopeId}>${ssrInterpolate(translate(("getPlayerPosition" in _ctx ? _ctx.getPlayerPosition : unref(getPlayerPosition))(item.position), "playertech"))}</td><td data-v-5457ed77${_scopeId}>${ssrInterpolate((_a2 = item.country_name) != null ? _a2 : "-")}</td><td data-v-5457ed77${_scopeId}>${ssrInterpolate(item.market_value_currency)} ${ssrInterpolate(item.market_value ? Number(item.market_value).toLocaleString() : "-")}</td><td data-v-5457ed77${_scopeId}>${ssrInterpolate(item.contract_until ? ("formatTimestamp" in _ctx ? _ctx.formatTimestamp : unref(formatTimestamp))(item.contract_until) : "-")}</td></tr>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</table></div></div>`);
            if (!((_e = (_d = (_c = __props.info) == null ? void 0 : _c.lineUpTeam) == null ? void 0 : _d.players) == null ? void 0 : _e.length)) {
              _push2(`<div data-v-5457ed77${_scopeId}><div class="d-flex flex-column align-items-center" data-v-5457ed77${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseImage, {
                class: "nodata_pic",
                alt: "nodata pic",
                width: "200",
                height: "200",
                src: "/icon/nodata.svg"
              }, null, _parent2, _scopeId));
              _push2(`</div><p class="fw-bold text-center mt-3" data-v-5457ed77${_scopeId}>${ssrInterpolate(translate("Data is being updated"))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "team__title" }, toDisplayString(translate("Lineup")), 1),
              createVNode("div", null, [
                createVNode("div", { style: { "overflow-x": "auto" } }, [
                  createVNode("table", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, toDisplayString(translate("Number")), 1),
                      createVNode("th", null, toDisplayString(translate("Name")), 1),
                      createVNode("th", { style: { "width": "100px" } }, toDisplayString(translate("Date of Birth")), 1),
                      createVNode("th", null, toDisplayString(translate("Height")), 1),
                      createVNode("th", null, toDisplayString(translate("Weight")), 1),
                      createVNode("th", null, toDisplayString(translate("Position")), 1),
                      createVNode("th", null, toDisplayString(translate("Nationality")), 1),
                      createVNode("th", null, toDisplayString(translate("Value")), 1),
                      createVNode("th", null, toDisplayString(translate("Contract Expiry")), 1)
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
                        createVNode("td", null, toDisplayString(translate(("getPlayerPosition" in _ctx ? _ctx.getPlayerPosition : unref(getPlayerPosition))(item.position), "playertech")), 1),
                        createVNode("td", null, toDisplayString((_a2 = item.country_name) != null ? _a2 : "-"), 1),
                        createVNode("td", null, toDisplayString(item.market_value_currency) + " " + toDisplayString(item.market_value ? Number(item.market_value).toLocaleString() : "-"), 1),
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
                createVNode("p", { class: "fw-bold text-center mt-3" }, toDisplayString(translate("Data is being updated")), 1)
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
const LineUp = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-5457ed77"]]);
const _sfc_main$9 = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const { $t, useLocale } = useShareCommon();
    const translate = (key) => {
      const fullKey = `${key} team`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
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
        API_ROUTERS.LIVESCORE.COMPETITION_SEASON + `?team-id=${objectIdSlug.value}&lang=${useLocale.value.defaultLocale}`
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
      const _component_nuxt_link = __nuxt_component_0$3;
      const _component_BaseImage = _sfc_main$d$1;
      _push(ssrRenderComponent(_component_TeamsLayouts, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<div class="player" data-v-0d2dba90${_scopeId}><div class="player__header" data-v-0d2dba90${_scopeId}>`);
            if ((_a2 = unref(competitionSeasonList)) == null ? void 0 : _a2.length) {
              _push2(`<select class="form-select" data-v-0d2dba90${_scopeId}><!--[-->`);
              ssrRenderList(unref(competitionSeasonList), (item, index) => {
                _push2(`<option${ssrRenderAttr("value", item.competition_id)} data-v-0d2dba90${_scopeId}>${ssrInterpolate((item == null ? void 0 : item.competition_name) || item.competition_short_name)}</option>`);
              });
              _push2(`<!--]--></select>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="player__title" data-v-0d2dba90${_scopeId}>${ssrInterpolate(translate("Player Profile"))}</div>`);
            if ((_c = (_b = unref(season)) == null ? void 0 : _b.list) == null ? void 0 : _c.length) {
              _push2(`<select class="form-select" data-v-0d2dba90${_scopeId}><!--[-->`);
              ssrRenderList(unref(season).list, (item, index) => {
                _push2(`<option${ssrRenderAttr("value", item.season_id)} data-v-0d2dba90${_scopeId}>${ssrInterpolate(item.season_year)}</option>`);
              });
              _push2(`<!--]--></select>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div style="${ssrRenderStyle({ "overflow-x": "auto" })}" data-v-0d2dba90${_scopeId}><table class="${ssrRenderClass({
              skeleton: unref(isLoading)
            })}" data-v-0d2dba90${_scopeId}><tr data-v-0d2dba90${_scopeId}><th data-v-0d2dba90${_scopeId}>${ssrInterpolate(translate("Rank"))}</th><th data-v-0d2dba90${_scopeId}>${ssrInterpolate(translate("Player"))}</th><th data-v-0d2dba90${_scopeId}>${ssrInterpolate(translate("Goals"))}</th><th data-v-0d2dba90${_scopeId}>${ssrInterpolate(translate("Assists"))}</th><th data-v-0d2dba90${_scopeId}>${ssrInterpolate(translate("Matches Played"))}</th><th data-v-0d2dba90${_scopeId}>${ssrInterpolate(translate("Accurate Passes"))}</th><th data-v-0d2dba90${_scopeId}>${ssrInterpolate(translate("Challenges"))}</th><th data-v-0d2dba90${_scopeId}>${ssrInterpolate(translate("Fouls"))}</th><th data-v-0d2dba90${_scopeId}>${ssrInterpolate(translate("Yellow Cards"))}</th><th data-v-0d2dba90${_scopeId}>${ssrInterpolate(translate("Red Cards"))}</th></tr>`);
            if ((_d = unref(playerInfo)) == null ? void 0 : _d.length) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(playerInfo), (item, index) => {
                _push2(`<tr class="${ssrRenderClass([
                  "team-table__init",
                  {
                    "team-table__init--bg": index % 2 !== 0
                  }
                ])}" data-v-0d2dba90${_scopeId}><td data-v-0d2dba90${_scopeId}>${ssrInterpolate(++index)}</td><td data-v-0d2dba90${_scopeId}>`);
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
                _push2(`</td><td data-v-0d2dba90${_scopeId}>${ssrInterpolate(item.goals)}</td><td data-v-0d2dba90${_scopeId}>${ssrInterpolate(item.assists)}</td><td data-v-0d2dba90${_scopeId}>${ssrInterpolate(item.matches)}</td><td data-v-0d2dba90${_scopeId}>${ssrInterpolate(item.passes_accuracy)}</td><td data-v-0d2dba90${_scopeId}>${ssrInterpolate(item.duels)}</td><td data-v-0d2dba90${_scopeId}>${ssrInterpolate(item.fouls)}</td><td data-v-0d2dba90${_scopeId}>${ssrInterpolate(item.yellow_cards)}</td><td data-v-0d2dba90${_scopeId}>${ssrInterpolate(item.red_cards)}</td></tr>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(isLoading) && !((_e = unref(playerInfo)) == null ? void 0 : _e.length)) {
              _push2(`<!--[-->`);
              ssrRenderList(Array.from({ length: 20 }, (_2, i) => i + 1), (item) => {
                _push2(`<tr data-v-0d2dba90${_scopeId}><td data-v-0d2dba90${_scopeId}></td><td style="${ssrRenderStyle({ "padding": "18px" })}" data-v-0d2dba90${_scopeId}></td><td data-v-0d2dba90${_scopeId}></td><td data-v-0d2dba90${_scopeId}></td><td data-v-0d2dba90${_scopeId}></td><td data-v-0d2dba90${_scopeId}></td><td data-v-0d2dba90${_scopeId}></td><td data-v-0d2dba90${_scopeId}></td><td data-v-0d2dba90${_scopeId}></td><td data-v-0d2dba90${_scopeId}></td></tr>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</table>`);
            if (!unref(playerInfo).length && !unref(isLoading)) {
              _push2(`<div data-v-0d2dba90${_scopeId}><div class="d-flex flex-column align-items-center" data-v-0d2dba90${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BaseImage, {
                class: "nodata_pic",
                alt: "nodata pic",
                width: "200",
                height: "200",
                src: "/icon/nodata.svg"
              }, null, _parent2, _scopeId));
              _push2(`</div><p class="fw-bold text-center mt-3" data-v-0d2dba90${_scopeId}>${ssrInterpolate(translate("No Data Available"))}</p></div>`);
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
                  createVNode("div", { class: "player__title" }, toDisplayString(translate("Player Profile")), 1),
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
                      createVNode("th", null, toDisplayString(translate("Rank")), 1),
                      createVNode("th", null, toDisplayString(translate("Player")), 1),
                      createVNode("th", null, toDisplayString(translate("Goals")), 1),
                      createVNode("th", null, toDisplayString(translate("Assists")), 1),
                      createVNode("th", null, toDisplayString(translate("Matches Played")), 1),
                      createVNode("th", null, toDisplayString(translate("Accurate Passes")), 1),
                      createVNode("th", null, toDisplayString(translate("Challenges")), 1),
                      createVNode("th", null, toDisplayString(translate("Fouls")), 1),
                      createVNode("th", null, toDisplayString(translate("Yellow Cards")), 1),
                      createVNode("th", null, toDisplayString(translate("Red Cards")), 1)
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
                    createVNode("p", { class: "fw-bold text-center mt-3" }, toDisplayString(translate("No Data Available")), 1)
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
const PlayerData = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-0d2dba90"]]);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "select-season" }, _attrs))} data-v-979063cc><select class="form-select" data-v-979063cc><!--[-->`);
      ssrRenderList(__props.seasonList, (item, index) => {
        _push(`<option${ssrRenderAttr("value", item.season_years)} class="${ssrRenderClass({
          "active-option": item.season_years === seasonActive.value
        })}" data-v-979063cc>${ssrInterpolate(item.season_years)}</option>`);
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
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-979063cc"]]);
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
    const { $t } = useShareCommon();
    const translate = (key, prefix = null) => {
      const fullKey = `${key} ${prefix ? "playertech" : "team"}`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
    const isLoading = useModel(__props, "isLoading");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$3;
      const _component_BaseImage = _sfc_main$d$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "team-table" }, _attrs))} data-v-3af3e401><div class="team-table__header" data-v-3af3e401>${ssrInterpolate(__props.title)}</div><div style="${ssrRenderStyle({ "overflow-x": "auto" })}" class="team-table__content" data-v-3af3e401><table class="${ssrRenderClass({
        skeleton: isLoading.value
      })}" data-v-3af3e401><tr data-v-3af3e401><th data-v-3af3e401>${ssrInterpolate(translate("Time"))}</th><th data-v-3af3e401>${ssrInterpolate(translate("Player"))}</th><th data-v-3af3e401>${ssrInterpolate(translate("Position"))}</th><th data-v-3af3e401>${ssrInterpolate(__props.isJoinTable ? translate("From") : translate("To"))}</th><th data-v-3af3e401>${ssrInterpolate(translate("Transfer Fee"))}</th><th data-v-3af3e401>${ssrInterpolate(translate("Transfer Type"))}</th></tr>`);
      if (__props.info.length) {
        _push(`<!--[-->`);
        ssrRenderList(__props.info, (item, index) => {
          _push(`<tr class="${ssrRenderClass([
            "team-table__init",
            {
              "team-table__init--bg": index % 2 !== 0
            }
          ])}" data-v-3af3e401><td data-v-3af3e401>${ssrInterpolate(("formatTimestamp" in _ctx ? _ctx.formatTimestamp : unref(formatTimestamp))(item.transfer_time))}</td><td class="team-table__item-name" data-v-3af3e401>`);
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
          _push(`</td><td data-v-3af3e401>${ssrInterpolate(translate(("getPlayerPosition" in _ctx ? _ctx.getPlayerPosition : unref(getPlayerPosition))(item.position), "playertech"))}</td><td class="team-table__item-join" data-v-3af3e401>`);
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
          _push(`</td><td data-v-3af3e401>${ssrInterpolate(item.transfer_desc && item.transfer_desc !== "Free" && item.transfer_desc !== "Unknown" ? item.transfer_desc : item.transfer_desc === "Free" ? translate("Free") : "-")}</td><td data-v-3af3e401>${ssrInterpolate(translate(("getTransferType" in _ctx ? _ctx.getTransferType : unref(getTransferType))(item.transfer_type)))}</td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.info.length && isLoading.value) {
        _push(`<!--[-->`);
        ssrRenderList([1, 2, 3, 4, 5], (item) => {
          _push(`<tr data-v-3af3e401><td data-v-3af3e401>${ssrInterpolate(item)}</td><td data-v-3af3e401>${ssrInterpolate(item)}</td><td data-v-3af3e401>${ssrInterpolate(item)}</td><td data-v-3af3e401>${ssrInterpolate(item)}</td><td data-v-3af3e401>${ssrInterpolate(item)}</td><td data-v-3af3e401>${ssrInterpolate(item)}</td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</table>`);
      if (!__props.info.length && !isLoading.value) {
        _push(`<div data-v-3af3e401><div class="d-flex flex-column align-items-center" data-v-3af3e401>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-3af3e401>${ssrInterpolate(translate("No Data Available"))}</p></div>`);
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
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-3af3e401"]]);
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
    const { $t } = useShareCommon();
    const translate = (key) => {
      const fullKey = `${key} team`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
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
        API_ROUTERS.LIVESCORE.PLAYER_TRANSFER + `?team-id=${teamId}&season-year=${seasonActive.value}`
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
      const _component_ClientOnly = __nuxt_component_1$1$1;
      const _component_TeamsSelectSeason = __nuxt_component_2$1;
      const _component_TeamsTablePlayerzh = __nuxt_component_3;
      _push(ssrRenderComponent(_component_TeamsLayouts, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "min-height": "40px", "margin-top": "10px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_TeamsTablePlayerzh, {
              isLoading: unref(isLoading),
              "onUpdate:isLoading": ($event) => isRef(isLoading) ? isLoading.value = $event : null,
              info: unref(moveInResults),
              title: translate("Join"),
              isJoinTable: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TeamsTablePlayerzh, {
              isLoading: unref(isLoading),
              "onUpdate:isLoading": ($event) => isRef(isLoading) ? isLoading.value = $event : null,
              info: unref(leaveResults),
              title: translate("Leave")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { style: { "min-height": "40px", "margin-top": "10px" } }, [
                createVNode(_component_ClientOnly, null, {
                  default: withCtx(() => [
                    createVNode(_component_TeamsSelectSeason, {
                      seasonList: unref(seasonList),
                      seasonActive: seasonActive.value,
                      "onUpdate:seasonActive": ($event) => seasonActive.value = $event
                    }, null, 8, ["seasonList", "seasonActive", "onUpdate:seasonActive"])
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_TeamsTablePlayerzh, {
                isLoading: unref(isLoading),
                "onUpdate:isLoading": ($event) => isRef(isLoading) ? isLoading.value = $event : null,
                info: unref(moveInResults),
                title: translate("Join"),
                isJoinTable: ""
              }, null, 8, ["isLoading", "onUpdate:isLoading", "info", "title"]),
              createVNode(_component_TeamsTablePlayerzh, {
                isLoading: unref(isLoading),
                "onUpdate:isLoading": ($event) => isRef(isLoading) ? isLoading.value = $event : null,
                info: unref(leaveResults),
                title: translate("Leave")
              }, null, 8, ["isLoading", "onUpdate:isLoading", "info", "title"])
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
    const { $t } = useShareCommon();
    const translate = (key) => {
      const fullKey = `${key} team`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
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
      const _component_nuxt_link = __nuxt_component_0$3;
      const _component_BaseImage = _sfc_main$d$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-922456b9><div style="${ssrRenderStyle({ "overflow-x": "auto" })}" data-v-922456b9><table class="${ssrRenderClass([{
        skeleton: isLoading.value
      }, "team__table"])}" data-v-922456b9><tr data-v-922456b9><th data-v-922456b9>${ssrInterpolate(translate("League"))}</th><th data-v-922456b9>${ssrInterpolate(translate("Match Date"))}</th><th data-v-922456b9>${ssrInterpolate(translate("Home Team"))}</th><th data-v-922456b9>${ssrInterpolate(translate("Score"))}</th><th data-v-922456b9>${ssrInterpolate(translate("Away Team"))}</th><th data-v-922456b9>${ssrInterpolate(translate("Red Card"))}</th><th data-v-922456b9>${ssrInterpolate(translate("Yellow Card"))}</th><th data-v-922456b9>${ssrInterpolate(translate("Dangerous Attacks"))}</th><th data-v-922456b9>${ssrInterpolate(translate("Ball Possession"))}</th><th data-v-922456b9>${ssrInterpolate(translate("Attack"))}</th><th data-v-922456b9>${ssrInterpolate(translate("Penalty"))}</th><th data-v-922456b9>${ssrInterpolate(translate("Corners"))}</th><th data-v-922456b9>${ssrInterpolate(translate("Shots on Target"))}</th><th data-v-922456b9>${ssrInterpolate(translate("Data"))}</th></tr>`);
      if (scheduleSeleted.value.initData.length) {
        _push(`<!--[-->`);
        ssrRenderList(scheduleSeleted.value.initData, (item, index) => {
          var _a3, _b2, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l;
          _push(`<tr data-v-922456b9><td style="${ssrRenderStyle({
            backgroundColor: item.competition_primary_color && item.competition_primary_color !== "#C7FF00" ? item.competition_primary_color : "#427242",
            color: "white"
          })}" data-v-922456b9>${ssrInterpolate((item == null ? void 0 : item.competition_name) || item.competition_short_name)}</td><td data-v-922456b9>${ssrInterpolate(("formatDateMomentUTCTimeZone" in _ctx ? _ctx.formatDateMomentUTCTimeZone : unref(formatDateMomentUTCTimeZone))(
            item.match_time,
            "DD-MM-yyyy HH:mm",
            unref(timeZone)
          ))}</td><td class="${ssrRenderClass([
            "team-name",
            {
              "team-name--active": ((_c2 = (_b2 = (_a3 = __props.info) == null ? void 0 : _a3.lineUpTeam) == null ? void 0 : _b2.team_info) == null ? void 0 : _c2.team_id) === ((_d2 = item == null ? void 0 : item.home_team) == null ? void 0 : _d2.id)
            }
          ])}" data-v-922456b9>`);
          if (((_g = (_f = (_e = __props.info) == null ? void 0 : _e.lineUpTeam) == null ? void 0 : _f.team_info) == null ? void 0 : _g.team_id) !== ((_h = item == null ? void 0 : item.home_team) == null ? void 0 : _h.id)) {
            _push(`<div data-v-922456b9>`);
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
            _push(`<span data-v-922456b9>${ssrInterpolate(item.home_team.name)}</span>`);
          }
          _push(`</td><td data-v-922456b9>${ssrInterpolate(item.home_scores[0])}-${ssrInterpolate(item.away_scores[0])}</td><td class="${ssrRenderClass([
            "team-name",
            {
              "team-name--active": ((_k = (_j = (_i = __props.info) == null ? void 0 : _i.lineUpTeam) == null ? void 0 : _j.team_info) == null ? void 0 : _k.team_id) === ((_l = item == null ? void 0 : item.away_team) == null ? void 0 : _l.id)
            }
          ])}" data-v-922456b9>`);
          if (__props.info.lineUpTeam.team_info.team_id !== item.away_team.id) {
            _push(`<div data-v-922456b9>`);
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
            _push(`<span data-v-922456b9>${ssrInterpolate(item.away_team.name)}</span>`);
          }
          _push(`</td><td data-v-922456b9>${ssrInterpolate(item.home_scores[2])}</td><td data-v-922456b9>${ssrInterpolate(item.home_scores[3])}</td><td data-v-922456b9>${ssrInterpolate(getStart(
            item.live_stats,
            __props.info.lineUpTeam.team_info.team_id === item.home_team.id,
            24
          ))}</td><td data-v-922456b9>${ssrInterpolate(getStart(
            item.live_stats,
            __props.info.lineUpTeam.team_info.team_id === item.home_team.id,
            25
          ))}</td><td data-v-922456b9>${ssrInterpolate(getStart(
            item.live_stats,
            __props.info.lineUpTeam.team_info.team_id === item.home_team.id,
            23
          ))}</td><td data-v-922456b9>${ssrInterpolate(getStart(
            item.live_stats,
            __props.info.lineUpTeam.team_info.team_id === item.home_team.id,
            8
          ))}</td><td data-v-922456b9>${ssrInterpolate(getStart(
            item.live_stats,
            __props.info.lineUpTeam.team_info.team_id === item.home_team.id,
            2
          ))}</td><td data-v-922456b9>${ssrInterpolate(getStart(
            item.live_stats,
            __props.info.lineUpTeam.team_info.team_id === item.home_team.id,
            21
          ))}</td><td data-v-922456b9>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            class: "highlighted",
            to: `${("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL}${item.id}?tab=h2h`
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
          _push(`<tr data-v-922456b9><td data-v-922456b9></td><td style="${ssrRenderStyle({ "padding": "18px" })}" data-v-922456b9></td><td data-v-922456b9>dummy data dummy data</td><td data-v-922456b9></td><td data-v-922456b9></td><td data-v-922456b9></td><td data-v-922456b9></td><td data-v-922456b9></td><td data-v-922456b9></td><td data-v-922456b9></td><td data-v-922456b9></td><td data-v-922456b9></td><td data-v-922456b9></td><td data-v-922456b9></td></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</table>`);
      if (!((_d = (_c = scheduleSeleted.value) == null ? void 0 : _c.initData) == null ? void 0 : _d.length) && !isLoading.value) {
        _push(`<div data-v-922456b9><div class="d-flex flex-column align-items-center" data-v-922456b9>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-922456b9>D\u1EEF li\u1EC7u \u0111ang \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt</p></div>`);
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
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-922456b9"]]);
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
    const { $t } = useShareCommon();
    const translate = (key) => {
      const fullKey = `${key} team`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
    useModel(__props, "pageActive");
    const scheduleSeleted = useModel(__props, "scheduleSeleted");
    return (_ctx, _push, _parent, _attrs) => {
      if (scheduleSeleted.value.initData.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "team__pagination d-flex justify-content-center py-5" }, _attrs))} data-v-c63a2601><button data-v-c63a2601>${ssrInterpolate(translate("Start"))}</button><button class="prev" data-v-c63a2601><div class="icon" data-v-c63a2601></div></button><div class="team__pagination-page" data-v-c63a2601><span data-v-c63a2601>${ssrInterpolate(translate("Page"))}</span><select class="form-select form-select-sm" aria-label=".form-select-sm example" data-v-c63a2601><!--[-->`);
        ssrRenderList(scheduleSeleted.value.pages, (item, index) => {
          _push(`<option${ssrRenderAttr("value", item)} data-v-c63a2601>${ssrInterpolate(item)}</option>`);
        });
        _push(`<!--]--></select></div><button class="next" data-v-c63a2601><div class="icon icon--next" data-v-c63a2601></div></button><button data-v-c63a2601>${ssrInterpolate(translate("End"))}</button></div>`);
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
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-c63a2601"]]);
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
    const { $t, useLocale } = useShareCommon();
    const translate = (key) => {
      const fullKey = `${key} team`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
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
        competition_name: translate("All")
      });
    };
    const scrollToItem = () => {
      (void 0).getElementById("scroll").scrollIntoView();
    };
    const fetchOldSchedule = async () => {
      try {
        await useApiLiveScore(
          API_ROUTERS.LIVESCORE.OLD_SCHEDULE + "?team-id=" + objectIdSlug.value + `&lang=${useLocale.value.defaultLocale}`
        ).then((resData) => {
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
      const _component_TeamsTableHonor = __nuxt_component_3$1;
      _push(ssrRenderComponent(_component_TeamsLayouts, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2;
          if (_push2) {
            _push2(`<div class="team__title" data-v-76d89a5d${_scopeId}>`);
            if (((_a2 = unref(listCompetition)) == null ? void 0 : _a2.length) && !unref(isLoading)) {
              _push2(`<select class="form-select form-select-sm" aria-label=".form-select-sm example" data-v-76d89a5d${_scopeId}><!--[-->`);
              ssrRenderList(unref(listCompetition), (item, index) => {
                _push2(`<option${ssrRenderAttr("value", item.competition_id)} data-v-76d89a5d${_scopeId}>${ssrInterpolate(item.competition_name)}</option>`);
              });
              _push2(`<!--]--></select>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span id="scroll" data-v-76d89a5d${_scopeId}>${ssrInterpolate(translate("Team Data"))}</span></div>`);
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
                createVNode("span", { id: "scroll" }, toDisplayString(translate("Team Data")), 1)
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
const Summary = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-76d89a5d"]]);
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
    const { $t, useLocale } = useShareCommon();
    const translate = (key) => {
      const fullKey = `${key} team`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
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
          API_ROUTERS.LIVESCORE.SCHEDULE + "?team-id=" + objectIdSlug.value + `&lang=${useLocale.value.defaultLocale}`
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
      const _component_nuxt_link = __nuxt_component_0$3;
      const _component_BaseImage = _sfc_main$d$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_TeamsLayouts, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d;
          if (_push2) {
            _push2(`<div class="team__title" data-v-9e57d0ef${_scopeId}>${ssrInterpolate(translate("Tournament"))}</div><div data-v-9e57d0ef${_scopeId}><div style="${ssrRenderStyle({ "overflow-x": "auto" })}" data-v-9e57d0ef${_scopeId}><table class="${ssrRenderClass({
              skeleton: unref(isLoading)
            })}" data-v-9e57d0ef${_scopeId}><tr data-v-9e57d0ef${_scopeId}><th data-v-9e57d0ef${_scopeId}>${ssrInterpolate(translate("League"))}</th><th data-v-9e57d0ef${_scopeId}>${ssrInterpolate(translate("Match Date"))}</th><th data-v-9e57d0ef${_scopeId}>${ssrInterpolate(translate("Home Team"))}</th><th data-v-9e57d0ef${_scopeId}>${ssrInterpolate(translate("Away Team"))}</th></tr>`);
            if ((_a2 = unref(schedules)) == null ? void 0 : _a2.length) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(schedules), (item, index) => {
                _push2(`<tr data-v-9e57d0ef${_scopeId}><td style="${ssrRenderStyle({ backgroundColor: item.bgColor, color: "white" })}" data-v-9e57d0ef${_scopeId}>${ssrInterpolate((item == null ? void 0 : item.competition_name) || item.competition_short_name)}</td><td data-v-9e57d0ef${_scopeId}>${ssrInterpolate(("formatDateMomentUTCTimeZone" in _ctx ? _ctx.formatDateMomentUTCTimeZone : unref(formatDateMomentUTCTimeZone))(
                  item.match_time,
                  "DD-MM-yyyy HH:mm",
                  unref(timeZone)
                ))}</td><td data-v-9e57d0ef${_scopeId}>`);
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
                _push2(`</td><td data-v-9e57d0ef${_scopeId}>`);
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
                _push2(`<tr data-v-9e57d0ef${_scopeId}><td data-v-9e57d0ef${_scopeId}></td><td style="${ssrRenderStyle({ "padding": "18px" })}" data-v-9e57d0ef${_scopeId}></td><td data-v-9e57d0ef${_scopeId}></td><td data-v-9e57d0ef${_scopeId}></td></tr>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</table></div></div>`);
          } else {
            return [
              createVNode("div", { class: "team__title" }, toDisplayString(translate("Tournament")), 1),
              createVNode("div", null, [
                createVNode("div", { style: { "overflow-x": "auto" } }, [
                  createVNode("table", {
                    class: {
                      skeleton: unref(isLoading)
                    }
                  }, [
                    createVNode("tr", null, [
                      createVNode("th", null, toDisplayString(translate("League")), 1),
                      createVNode("th", null, toDisplayString(translate("Match Date")), 1),
                      createVNode("th", null, toDisplayString(translate("Home Team")), 1),
                      createVNode("th", null, toDisplayString(translate("Away Team")), 1)
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
        _push(`<div data-v-9e57d0ef><div class="d-flex flex-column align-items-center" data-v-9e57d0ef>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-9e57d0ef>${ssrInterpolate(translate("No Data Available"))}</p></div>`);
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
const TeamSche = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-9e57d0ef"]]);
const _sfc_main$1 = {
  __name: "index",
  __ssrInlineRender: true,
  props: {
    info: Object
  },
  setup(__props) {
    const { $t } = useShareCommon();
    const translate = (key) => {
      const fullKey = `${key} team`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
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
      const _component_BaseImage = _sfc_main$d$1;
      _push(`<!--[-->`);
      if (((_a = Object.keys(unref(listPerformance))) == null ? void 0 : _a.length) && !unref(isLoading)) {
        _push(`<div class="table" data-v-e8fcc483><!--[-->`);
        ssrRenderList(unref(listPerformance).near_years, (item, index) => {
          var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca;
          _push(`<div data-v-e8fcc483><div class="table__title" data-v-e8fcc483>${ssrInterpolate(translate("Tournament Score Statistics"))} ${ssrInterpolate(unref(listPerformance).short_name)} ${ssrInterpolate(item.year)}</div><div class="table__content" style="${ssrRenderStyle({ "overflow": "auto" })}" data-v-e8fcc483><table class="${ssrRenderClass({
            skeleton: unref(isLoading)
          })}" data-v-e8fcc483><tr data-v-e8fcc483><th data-v-e8fcc483></th><th data-v-e8fcc483>${ssrInterpolate(translate("Games"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Wins"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Draws"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Losses"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Goals Scored"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Goals Conceded"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Goal Difference"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Win%"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Draw%"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Loss%"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Avg Goals Scored"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Avg Goals Conceded"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Points"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Position"))}</th></tr><tr data-v-e8fcc483><td data-v-e8fcc483>${ssrInterpolate(translate("All"))}</td><td data-v-e8fcc483>${ssrInterpolate((_a2 = item == null ? void 0 : item.filtered_row) == null ? void 0 : _a2.total)}</td><td data-v-e8fcc483>${ssrInterpolate((_b2 = item == null ? void 0 : item.filtered_row) == null ? void 0 : _b2.won)}</td><td data-v-e8fcc483>${ssrInterpolate((_c = item == null ? void 0 : item.filtered_row) == null ? void 0 : _c.draw)}</td><td data-v-e8fcc483>${ssrInterpolate((_d = item == null ? void 0 : item.filtered_row) == null ? void 0 : _d.loss)}</td><td data-v-e8fcc483>${ssrInterpolate((_e = item == null ? void 0 : item.filtered_row) == null ? void 0 : _e.goals)}</td><td data-v-e8fcc483>${ssrInterpolate((_f = item == null ? void 0 : item.filtered_row) == null ? void 0 : _f.goals_against)}</td><td data-v-e8fcc483>${ssrInterpolate((_g = item == null ? void 0 : item.filtered_row) == null ? void 0 : _g.goal_diff)}</td><td data-v-e8fcc483>${ssrInterpolate(perCentItem((_h = item == null ? void 0 : item.filtered_row) == null ? void 0 : _h.won, (_i = item == null ? void 0 : item.filtered_row) == null ? void 0 : _i.total))}</td><td data-v-e8fcc483>${ssrInterpolate(perCentItem((_j = item == null ? void 0 : item.filtered_row) == null ? void 0 : _j.draw, (_k = item == null ? void 0 : item.filtered_row) == null ? void 0 : _k.total))}</td><td data-v-e8fcc483>${ssrInterpolate(perCentItem((_l = item == null ? void 0 : item.filtered_row) == null ? void 0 : _l.loss, (_m = item == null ? void 0 : item.filtered_row) == null ? void 0 : _m.total))}</td><td data-v-e8fcc483>${ssrInterpolate(calcAvg((_n = item == null ? void 0 : item.filtered_row) == null ? void 0 : _n.goals, (_o = item == null ? void 0 : item.filtered_row) == null ? void 0 : _o.total))}</td><td data-v-e8fcc483>${ssrInterpolate(calcAvg(
            (_p = item == null ? void 0 : item.filtered_row) == null ? void 0 : _p.goals_against,
            (_q = item == null ? void 0 : item.filtered_row) == null ? void 0 : _q.total
          ))}</td><td data-v-e8fcc483>${ssrInterpolate((_r = item == null ? void 0 : item.filtered_row) == null ? void 0 : _r.points)}</td><td data-v-e8fcc483>${ssrInterpolate((_s = item == null ? void 0 : item.filtered_row) == null ? void 0 : _s.position)}</td></tr><tr class="bg-gray" data-v-e8fcc483><td data-v-e8fcc483>${ssrInterpolate(translate("Home Team"))}</td><td data-v-e8fcc483>${ssrInterpolate((_t = item == null ? void 0 : item.filtered_row) == null ? void 0 : _t.home_total)}</td><td data-v-e8fcc483>${ssrInterpolate((_u = item == null ? void 0 : item.filtered_row) == null ? void 0 : _u.home_won)}</td><td data-v-e8fcc483>${ssrInterpolate((_v = item == null ? void 0 : item.filtered_row) == null ? void 0 : _v.home_draw)}</td><td data-v-e8fcc483>${ssrInterpolate((_w = item == null ? void 0 : item.filtered_row) == null ? void 0 : _w.home_loss)}</td><td data-v-e8fcc483>${ssrInterpolate((_x = item == null ? void 0 : item.filtered_row) == null ? void 0 : _x.home_goals)}</td><td data-v-e8fcc483>${ssrInterpolate((_y = item == null ? void 0 : item.filtered_row) == null ? void 0 : _y.home_goals_against)}</td><td data-v-e8fcc483>${ssrInterpolate((_z = item == null ? void 0 : item.filtered_row) == null ? void 0 : _z.home_goal_diff)}</td><td data-v-e8fcc483>${ssrInterpolate(perCentItem(
            (_A = item == null ? void 0 : item.filtered_row) == null ? void 0 : _A.home_won,
            (_B = item == null ? void 0 : item.filtered_row) == null ? void 0 : _B.home_total
          ))}</td><td data-v-e8fcc483>${ssrInterpolate(perCentItem(
            (_C = item == null ? void 0 : item.filtered_row) == null ? void 0 : _C.home_draw,
            (_D = item == null ? void 0 : item.filtered_row) == null ? void 0 : _D.home_total
          ))}</td><td data-v-e8fcc483>${ssrInterpolate(perCentItem(
            (_E = item == null ? void 0 : item.filtered_row) == null ? void 0 : _E.home_loss,
            (_F = item == null ? void 0 : item.filtered_row) == null ? void 0 : _F.home_total
          ))}</td><td data-v-e8fcc483>${ssrInterpolate(calcAvg(
            (_G = item == null ? void 0 : item.filtered_row) == null ? void 0 : _G.home_goals,
            (_H = item == null ? void 0 : item.filtered_row) == null ? void 0 : _H.home_total
          ))}</td><td data-v-e8fcc483>${ssrInterpolate(calcAvg(
            (_I = item == null ? void 0 : item.filtered_row) == null ? void 0 : _I.home_goals_against,
            (_J = item == null ? void 0 : item.filtered_row) == null ? void 0 : _J.home_total
          ))}</td><td data-v-e8fcc483>${ssrInterpolate((_K = item == null ? void 0 : item.filtered_row) == null ? void 0 : _K.home_points)}</td><td data-v-e8fcc483>${ssrInterpolate((_L = item == null ? void 0 : item.filtered_row) == null ? void 0 : _L.home_position)}</td></tr><tr data-v-e8fcc483><td data-v-e8fcc483>${ssrInterpolate(translate("Away Team"))}</td><td data-v-e8fcc483>${ssrInterpolate((_M = item == null ? void 0 : item.filtered_row) == null ? void 0 : _M.away_total)}</td><td data-v-e8fcc483>${ssrInterpolate((_N = item == null ? void 0 : item.filtered_row) == null ? void 0 : _N.away_won)}</td><td data-v-e8fcc483>${ssrInterpolate((_O = item == null ? void 0 : item.filtered_row) == null ? void 0 : _O.away_draw)}</td><td data-v-e8fcc483>${ssrInterpolate((_P = item == null ? void 0 : item.filtered_row) == null ? void 0 : _P.away_loss)}</td><td data-v-e8fcc483>${ssrInterpolate((_Q = item == null ? void 0 : item.filtered_row) == null ? void 0 : _Q.away_goals)}</td><td data-v-e8fcc483>${ssrInterpolate((_R = item == null ? void 0 : item.filtered_row) == null ? void 0 : _R.away_goals_against)}</td><td data-v-e8fcc483>${ssrInterpolate((_S = item == null ? void 0 : item.filtered_row) == null ? void 0 : _S.away_goal_diff)}</td><td data-v-e8fcc483>${ssrInterpolate(perCentItem(
            (_T = item == null ? void 0 : item.filtered_row) == null ? void 0 : _T.away_won,
            (_U = item == null ? void 0 : item.filtered_row) == null ? void 0 : _U.away_total
          ))}</td><td data-v-e8fcc483>${ssrInterpolate(perCentItem(
            (_V = item == null ? void 0 : item.filtered_row) == null ? void 0 : _V.away_draw,
            (_W = item == null ? void 0 : item.filtered_row) == null ? void 0 : _W.away_total
          ))}</td><td data-v-e8fcc483>${ssrInterpolate(perCentItem(
            (_X = item == null ? void 0 : item.filtered_row) == null ? void 0 : _X.away_loss,
            (_Y = item == null ? void 0 : item.filtered_row) == null ? void 0 : _Y.away_total
          ))}</td><td data-v-e8fcc483>${ssrInterpolate(calcAvg(
            (_Z = item == null ? void 0 : item.filtered_row) == null ? void 0 : _Z.away_goals,
            (__ = item == null ? void 0 : item.filtered_row) == null ? void 0 : __.away_total
          ))}</td><td data-v-e8fcc483>${ssrInterpolate(calcAvg(
            (_$ = item == null ? void 0 : item.filtered_row) == null ? void 0 : _$.away_goals_against,
            (_aa = item == null ? void 0 : item.filtered_row) == null ? void 0 : _aa.away_total
          ))}</td><td data-v-e8fcc483>${ssrInterpolate((_ba = item == null ? void 0 : item.filtered_row) == null ? void 0 : _ba.away_points)}</td><td data-v-e8fcc483>${ssrInterpolate((_ca = item == null ? void 0 : item.filtered_row) == null ? void 0 : _ca.away_position)}</td></tr></table></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isLoading) && !((_b = Object.keys(unref(listPerformance))) == null ? void 0 : _b.length)) {
        _push(`<div class="table" data-v-e8fcc483><!--[-->`);
        ssrRenderList(Array.from({ length: 5 }, (_, i) => i + 1), (item, index) => {
          _push(`<div data-v-e8fcc483><div class="table__title" data-v-e8fcc483>${ssrInterpolate(translate("Tournament Score Statistics"))}</div><div class="table__content" style="${ssrRenderStyle({ "overflow": "auto" })}" data-v-e8fcc483><table class="skeleton" data-v-e8fcc483><tr data-v-e8fcc483><th data-v-e8fcc483></th><th data-v-e8fcc483>${ssrInterpolate(translate("Games"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Wins"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Draws"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Losses"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Goals Scored"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Goals Conceded"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Goal Difference"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Win%"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Draw%"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Loss%"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Avg Goals Scored"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Avg Goals Conceded"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Points"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Position"))}</th></tr><!--[-->`);
          ssrRenderList(Array.from({ length: 3 }, (_, i) => i + 1), (item2, index2) => {
            _push(`<tr data-v-e8fcc483><td data-v-e8fcc483></td><td data-v-e8fcc483></td><td data-v-e8fcc483></td><td data-v-e8fcc483></td><td data-v-e8fcc483></td><td data-v-e8fcc483></td><td data-v-e8fcc483></td><td data-v-e8fcc483></td><td data-v-e8fcc483></td><td data-v-e8fcc483></td><td data-v-e8fcc483></td><td data-v-e8fcc483></td><td data-v-e8fcc483></td><td data-v-e8fcc483></td><td data-v-e8fcc483></td></tr>`);
          });
          _push(`<!--]--></table></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!Object.keys(unref(listPerformance)).length && !unref(isLoading)) {
        _push(`<div data-v-e8fcc483><div class="table" data-v-e8fcc483><div data-v-e8fcc483><div class="table__title" data-v-e8fcc483>${ssrInterpolate(translate("Tournament Score Statistics"))}</div><div class="table__content" style="${ssrRenderStyle({ "overflow": "auto" })}" data-v-e8fcc483><table class="skeleton" data-v-e8fcc483><tr data-v-e8fcc483><th data-v-e8fcc483></th><th data-v-e8fcc483>${ssrInterpolate(translate("Games"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Wins"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Draws"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Losses"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Goals Scored"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Goals Conceded"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Goal Difference"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Win%"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Draw%"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Loss%"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Avg Goals Scored"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Avg Goals Conceded"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Points"))}</th><th data-v-e8fcc483>${ssrInterpolate(translate("Position"))}</th></tr></table></div></div></div><div class="d-flex flex-column align-items-center" data-v-e8fcc483>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`<p class="fw-bold text-center mt-3" data-v-e8fcc483>${ssrInterpolate(translate("No Data Available"))}</p></div></div>`);
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
const TeamNearYear = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e8fcc483"]]);
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d, _e, _f;
    let __temp, __restore;
    const { $t, isNavVisible } = useShareCommon();
    isNavVisible.value = false;
    const { initSchemaTeam } = useSchema();
    const translate = (key) => {
      const fullKey = `${key} team`;
      const translation = $t(fullKey);
      return translation !== fullKey ? translation : key;
    };
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
        name: "Team Data",
        redirect: [
          `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.SUMMARY}`,
          `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}`
        ],
        components: Summary
      },
      {
        id: 2,
        name: "Match Schedule",
        redirect: `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.TEAMSCHE}`,
        components: TeamSche
      },
      {
        id: 3,
        name: "Lineup",
        redirect: `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.LINEUP}`,
        components: LineUp
      },
      {
        id: 4,
        name: "Transfers",
        redirect: `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.PLAYERZH}`,
        components: _sfc_main$6
      },
      {
        id: 5,
        name: "Player Profile",
        redirect: `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.PLAYERDATA}`,
        components: PlayerData
      },
      {
        id: 6,
        name: "Achievements",
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
    const fetchHonorTeam = async () => {
      var _a2, _b2;
      try {
        const data2 = await useApiLiveScore(
          API_ROUTERS.LIVESCORE.TEAM_HONOR + `?team-id=${route.params.id}`
        );
        if (data2 == null ? void 0 : data2.length) {
          return (_b2 = (_a2 = data2 == null ? void 0 : data2[0]) == null ? void 0 : _a2.honors) == null ? void 0 : _b2.reduce((acc, value) => {
            if (!Object.keys(acc).includes(value.honor.id)) {
              acc[value.honor.id] = data2[0].honors.filter(
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
    const { data } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("allData", async () => {
      try {
        const [lineUpTeam, honorList] = await Promise.all([fetchLineUpTeam(route.params.id), fetchHonorTeam()]);
        return {
          lineUpTeam,
          honorList
        };
      } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
      }
    })), __temp = await __temp, __restore(), __temp);
    info.value = data.value;
    if (!((_b = info.value) == null ? void 0 : _b.lineUpTeam)) {
      showError({
        statusCode: 404,
        statusMessage: translate("Data does not exist!")
      });
    }
    teamInfo.value = data.value;
    if ((_c = data.value) == null ? void 0 : _c.lineUpTeam) {
      initSchemaTeam(data.value);
    }
    fetchObjectMeta((_f = (_e = (_d = info.value) == null ? void 0 : _d.lineUpTeam) == null ? void 0 : _e.team_info) == null ? void 0 : _f.team_name, route.fullPath);
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_TeamsTabsRedirect = __nuxt_component_0$1;
      const _component_TeamsInfoTeam = __nuxt_component_1$1;
      const _component_BaseImage = _sfc_main$d$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container bg-white team" }, _attrs))} data-v-ca85c17b><div data-v-ca85c17b>`);
      _push(ssrRenderComponent(_component_TeamsTabsRedirect, { tabs: unref(tabs) }, null, _parent));
      if ((_a2 = unref(teamInfo).lineUpTeam) == null ? void 0 : _a2.team_info) {
        _push(ssrRenderComponent(_component_TeamsInfoTeam, {
          teamInfo: unref(teamInfo).lineUpTeam.team_info
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(teamInfo).lineUpTeam === null) {
        _push(`<div data-v-ca85c17b><div class="d-flex flex-column align-items-center" data-v-ca85c17b>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-ca85c17b>${ssrInterpolate(translate("No Data Available"))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(teamInfo).lineUpTeam) {
        _push(`<div data-v-ca85c17b>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(getComponentActive)), { info: unref(info) }, null), _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(teamInfo).lineUpTeam !== null && !unref(teamInfo).lineUpTeam) {
        _push(`<div class="fw-bold text-center d-flex flex-column align-items-center mt-4" data-v-ca85c17b><div class="spinner-border text-success" role="status" data-v-ca85c17b><span class="visually-hidden" data-v-ca85c17b>Loading...</span></div><p class="fw-bold mt-2" data-v-ca85c17b>${ssrInterpolate(translate("Data does not exist!"))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div id="content-page" class="mt-5" data-v-ca85c17b>`);
      if (unref(h1Content)) {
        _push(`<h1 class="page_title" data-v-ca85c17b>${ssrInterpolate(unref(h1Content))}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center" data-v-ca85c17b>${ssrInterpolate(unref(content))}</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/team/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ca85c17b"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-newODMKJ.mjs.map
