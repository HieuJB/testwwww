import { _ as __nuxt_component_0 } from './server-placeholder-BFzIFO-1.mjs';
import { s as systemsStore, a as useRoute, d as useSchema, aq as WAREHOUSE_LEAGUE_TAB, b as useShareCommon, a8 as useAsyncData, ab as useHead, aj as showError, h as ROUTERS_OLD, I as ISPORT_COMPANY_DEFAULT, j as getLiveScoreImage, ar as TABLE_STANDING_LIST, k as ROUTER_TEAM_NAME, r as ODD_COMPANYS, i as formatDateMomentUTCTimeZone, as as LIVESCORE_STATUS, at as getValueByPositionWarehourse, M as MATCH_TAB, _ as _export_sfc, ad as useFetch, ae as createUrl, E as API_ROUTERS, g as getConfig, av as generateCompetitionMetaSeo, D as useApiLiveScore, m as __nuxt_component_0$3, n as _sfc_main$d, au as getLastResult } from './server.mjs';
import { useSSRContext, defineComponent, ref, watch, withAsyncContext, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, computed, nextTick } from 'vue';
import { u as useShareLeague } from './useShareLeague-acnhoowq.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual } from 'vue/server-renderer';
import { useWindowSize } from '@vueuse/core';
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
import 'moment-timezone';
import 'crypto-js';
import 'pako';
import 'buffer';
import '@vueuse/sound';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "HeaderLeagueComponent",
  __ssrInlineRender: true,
  props: {
    compDetail: {},
    curSeasonId: {}
  },
  setup(__props) {
    var _a;
    const route = useRoute();
    const { $t } = useShareCommon();
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
      const _component_nuxt_link = __nuxt_component_0$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sub_menu cup" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).LEAGUES + "/" + unref(leagueId), query: { tab: ("WAREHOUSE_LEAGUE_TAB" in _ctx ? _ctx.WAREHOUSE_LEAGUE_TAB : unref(WAREHOUSE_LEAGUE_TAB)).SCHEDULE, curSeasonId: props == null ? void 0 : props.curSeasonId } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span style="${ssrRenderStyle({})}" name="0" class="${ssrRenderClass(unref(tab) === ("WAREHOUSE_LEAGUE_TAB" in _ctx ? _ctx.WAREHOUSE_LEAGUE_TAB : unref(WAREHOUSE_LEAGUE_TAB)).SCHEDULE || unref(tab) === "" ? "on" : "")}"${_scopeId}><i${_scopeId}></i> ${ssrInterpolate(unref($t)("Schedule"))}</span>`);
          } else {
            return [
              createVNode("span", {
                style: {},
                name: "0",
                class: unref(tab) === ("WAREHOUSE_LEAGUE_TAB" in _ctx ? _ctx.WAREHOUSE_LEAGUE_TAB : unref(WAREHOUSE_LEAGUE_TAB)).SCHEDULE || unref(tab) === "" ? "on" : ""
              }, [
                createVNode("i"),
                createTextVNode(" " + toDisplayString(unref($t)("Schedule")), 1)
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).LEAGUES + "/" + unref(leagueId), query: { tab: ("WAREHOUSE_LEAGUE_TAB" in _ctx ? _ctx.WAREHOUSE_LEAGUE_TAB : unref(WAREHOUSE_LEAGUE_TAB)).STANDING, curSeasonId: props == null ? void 0 : props.curSeasonId } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span style="${ssrRenderStyle({})}" name="0" class="${ssrRenderClass(unref(tab) === ("WAREHOUSE_LEAGUE_TAB" in _ctx ? _ctx.WAREHOUSE_LEAGUE_TAB : unref(WAREHOUSE_LEAGUE_TAB)).STANDING ? "on" : "")}"${_scopeId}><i${_scopeId}></i> ${ssrInterpolate(unref($t)("Standing"))}</span>`);
          } else {
            return [
              createVNode("span", {
                style: {},
                name: "0",
                class: unref(tab) === ("WAREHOUSE_LEAGUE_TAB" in _ctx ? _ctx.WAREHOUSE_LEAGUE_TAB : unref(WAREHOUSE_LEAGUE_TAB)).STANDING ? "on" : ""
              }, [
                createVNode("i"),
                createTextVNode(" " + toDisplayString(unref($t)("Standing")), 1)
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeaderLeagueComponent.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "schedule-[league_id]",
  __ssrInlineRender: true,
  props: {
    compDetail: {},
    title: {}
  },
  setup(__props) {
    var _a, _b;
    const route = useRoute();
    useRoute();
    const { useLocale, $t } = useShareCommon();
    const compId = ref(((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.league_id) || "");
    const competitionDetail = ref([]);
    const matchsBySeason = ref([]);
    const compSeason = ref([]);
    const selectSeasonId = ref(((_b = route == null ? void 0 : route.query) == null ? void 0 : _b.curSeasonId) || null);
    ref();
    const OddsSeasonImain = ref();
    const iCompanyId = ref(ISPORT_COMPANY_DEFAULT);
    const oddType = ref("handicap");
    const groupCount = ref(0);
    const roundCount = ref(0);
    const curRound = ref();
    const curGroupNum = ref();
    const listMatchInSeason = ref([]);
    const curStageId = ref();
    const selectStageId = ref();
    const stagesList = ref([]);
    const oddsList = ref([]);
    const playerBestLinup = ref([]);
    const selectStage = ref();
    const roundsList = ref([]);
    const groupsList = ref([]);
    const stageName = ref();
    const calcGroupDiv = computed(() => groupCount.value < 10 ? groupCount.value : (groupCount.value / 2).toFixed());
    const calcDiv = computed(() => roundCount.value < 10 ? roundCount.value : (roundCount.value / 2).toFixed());
    const { width } = useWindowSize();
    computed(() => {
      return width.value <= 768;
    });
    const props = __props;
    const getPlayerStyle = (player, teamType) => {
      {
        return { bottom: player.location_x - 10 + "%", left: player.location_y - 10 + "%" };
      }
    };
    const fetchMatchesBySeason = async () => {
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.MATCHES_BY_SEASON,
        { season_id: selectSeasonId.value }
      ).then(async (resData) => {
        var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
        listMatchInSeason.value = resData;
        matchsBySeason.value = (resData == null ? void 0 : resData.filter((item) => {
          var _a3;
          return ((_a3 = item == null ? void 0 : item.stage) == null ? void 0 : _a3.id) == selectStageId.value;
        })) || [];
        (_a2 = matchsBySeason.value) == null ? void 0 : _a2.forEach((match) => {
          if ((match == null ? void 0 : match.round_num) && !roundsList.value.includes(match == null ? void 0 : match.round_num)) {
            roundsList.value.push(match == null ? void 0 : match.round_num);
          }
        });
        (_b2 = matchsBySeason.value) == null ? void 0 : _b2.forEach((match) => {
          if ((match == null ? void 0 : match.group_num) && !groupsList.value.includes(match == null ? void 0 : match.group_num)) {
            groupsList.value.push(match == null ? void 0 : match.group_num);
          }
        });
        groupCount.value = (_c = groupsList.value) == null ? void 0 : _c.length;
        roundCount.value = (_d = roundsList.value) == null ? void 0 : _d.length;
        if (groupCount.value == 0 && roundCount.value > 0) {
          if (selectSeasonId.value === ((_e = competitionDetail.value) == null ? void 0 : _e.cur_season_id)) {
            curRound.value = (_f = competitionDetail.value) == null ? void 0 : _f.cur_round;
          } else {
            curRound.value = 1;
          }
        }
        if (curRound.value > 0 && ((_h = (_g = matchsBySeason.value) == null ? void 0 : _g[0]) == null ? void 0 : _h.round_num)) {
          matchsBySeason.value = ((_i = matchsBySeason.value) == null ? void 0 : _i.filter((item) => (item == null ? void 0 : item.round_num) == curRound.value)) || [];
        }
      });
    };
    const fetchOddsSeasonImain = async () => {
      if (!selectSeasonId.value || !iCompanyId.value)
        return;
      const query = {
        "i-company-id": iCompanyId.value,
        "season-id": selectSeasonId.value
        // 'stage-id': curStageId.value
      };
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.ODDS_SEASON_IMAIN,
        query
      ).then(async (resData) => {
        var _a2;
        oddsList.value = resData;
        let oddsListData = [];
        (_a2 = resData == null ? void 0 : resData.filter((item) => (item == null ? void 0 : item.type) === oddType.value)) == null ? void 0 : _a2.map((item) => {
          oddsListData["i_match_id_" + (item == null ? void 0 : item.i_match_id)] = item;
        });
        OddsSeasonImain.value = oddsListData;
      });
    };
    const fetchBestLineup = async () => {
      if (!selectSeasonId.value)
        return;
      let query = [];
      if (groupCount.value == 0 && curRound.value > 0) {
        query = {
          "season-id": selectSeasonId.value,
          "name": curRound.value
        };
      } else {
        query = {
          "season-id": selectSeasonId.value,
          "stage-id": selectStageId.value
        };
      }
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.SEASONS_BEST_LINEUP,
        query
      ).then(async (resData) => {
        var _a2;
        playerBestLinup.value = (_a2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a2.lineup_details;
      });
    };
    watch(
      () => route,
      (newPath) => {
        var _a2, _b2;
        ((_a2 = route == null ? void 0 : route.params) == null ? void 0 : _a2.league_id) || "";
        compId.value = ((_b2 = route == null ? void 0 : route.params) == null ? void 0 : _b2.league_id) || "";
      },
      { immediate: true }
    );
    watch(
      oddType,
      () => {
        var _a2, _b2;
        let oddsListData = [];
        (_b2 = (_a2 = oddsList.value) == null ? void 0 : _a2.filter((item) => (item == null ? void 0 : item.type) === oddType.value)) == null ? void 0 : _b2.map((item) => {
          oddsListData["i_match_id_" + (item == null ? void 0 : item.i_match_id)] = item;
        });
        OddsSeasonImain.value = oddsListData;
      }
    );
    watch(
      () => props == null ? void 0 : props.compDetail,
      async () => {
        var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        competitionDetail.value = props == null ? void 0 : props.compDetail;
        if (!selectSeasonId.value) {
          selectSeasonId.value = (_a2 = competitionDetail.value) == null ? void 0 : _a2.cur_season_id;
        }
        if (!((_c = (_b2 = competitionDetail.value) == null ? void 0 : _b2.seasons_stages) == null ? void 0 : _c.find((item) => item.season_id === selectSeasonId.value))) {
          selectSeasonId.value = (_f = (_e = (_d = competitionDetail.value) == null ? void 0 : _d.seasons_stages) == null ? void 0 : _e[0]) == null ? void 0 : _f.season_id;
        }
        compSeason.value = competitionDetail.value || [];
        compId.value = (_g = competitionDetail.value) == null ? void 0 : _g.id;
        selectStageId.value = (_h = competitionDetail.value) == null ? void 0 : _h.cur_stage_id;
        stagesList.value = (_l = (_k = (_j = (_i = competitionDetail.value) == null ? void 0 : _i.seasons_stages) == null ? void 0 : _j.find((item) => item.season_id === selectSeasonId.value)) == null ? void 0 : _k.stages) == null ? void 0 : _l.sort((a, b) => {
          return (a == null ? void 0 : a.order) - (b == null ? void 0 : b.order);
        });
        selectStage.value = (_m = stagesList.value) == null ? void 0 : _m.find((item) => item.id === selectStageId.value);
        if (selectSeasonId.value != ((_n = competitionDetail.value) == null ? void 0 : _n.cur_season_id)) {
          selectStageId.value = (_p = (_o = stagesList.value) == null ? void 0 : _o[0]) == null ? void 0 : _p.id;
          selectStage.value = (_q = stagesList.value) == null ? void 0 : _q.find((item) => item.id === selectStageId.value);
        } else {
          roundCount.value = (_r = competitionDetail.value) == null ? void 0 : _r.round_count;
          curStageId.value = (_s = competitionDetail.value) == null ? void 0 : _s.cur_stage_id;
          curRound.value = (_t = competitionDetail.value) == null ? void 0 : _t.cur_round;
        }
        if (selectStage.value && ((_u = stagesList.value) == null ? void 0 : _u.length) > 1) {
          stageName.value = (_v = selectStage.value) == null ? void 0 : _v.name;
        } else {
          stageName.value = (_w = competitionDetail.value) == null ? void 0 : _w.name;
        }
        if (compId.value) {
          await fetchMatchesBySeason();
          fetchOddsSeasonImain();
          fetchBestLineup();
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
      const _component_BaseImage = _sfc_main$d;
      const _component_HeaderLeagueComponent = _sfc_main$3;
      const _component_nuxt_link = __nuxt_component_0$3;
      const _component_PlayBoxBestLineupComponent = __nuxt_component_0;
      _push(`<!--[--><div class="info_title" id="InfoTitle" data-v-0677d7a0><div class="info_title_left" id="TitleLeft" data-v-0677d7a0><div class="img" data-v-0677d7a0>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))((_a2 = unref(competitionDetail)) == null ? void 0 : _a2.logo_o, "competition") + "!h50",
        loading: "lazy",
        alt: (_b2 = unref(competitionDetail)) == null ? void 0 : _b2.name
      }, null, _parent));
      _push(`</div><h1 data-v-0677d7a0>${ssrInterpolate(props == null ? void 0 : props.title)}</h1>`);
      if (((_d = (_c = unref(compSeason)) == null ? void 0 : _c.seasons_stages) == null ? void 0 : _d.length) > 0) {
        _push(`<div class="selectbox" data-v-0677d7a0><select name="seasonList" aria-label="Company season" id="seasonList" data-v-0677d7a0><!--[-->`);
        ssrRenderList((_e = unref(compSeason)) == null ? void 0 : _e.seasons_stages, (item, index) => {
          _push(`<option${ssrRenderAttr("value", item == null ? void 0 : item.season_id)} data-v-0677d7a0>${ssrInterpolate(item == null ? void 0 : item.season_years)}</option>`);
        });
        _push(`<!--]--></select></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_HeaderLeagueComponent, {
        "comp-detail": unref(competitionDetail),
        "cur-season-id": unref(selectSeasonId)
      }, null, _parent));
      _push(`<div class="data mb-3" data-v-0677d7a0>`);
      if (((_f = unref(stagesList)) == null ? void 0 : _f.length) > 1) {
        _push(`<div class="nav_select" id="SubSelectDiv" data-v-0677d7a0><ul data-v-0677d7a0><!--[-->`);
        ssrRenderList(unref(stagesList), (item, index) => {
          _push(`<li class="${ssrRenderClass(item.id === unref(selectStageId) ? "nav_selected" : "")}" data-v-0677d7a0>${ssrInterpolate(unref($t)(item == null ? void 0 : item.name))}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_g = unref(groupsList)) == null ? void 0 : _g.length) > 0 || ((_h = unref(roundsList)) == null ? void 0 : _h.length) > 0) {
        _push(`<div id="showRound" data-v-0677d7a0>`);
        if (((_i = unref(groupsList)) == null ? void 0 : _i.length) > 0) {
          _push(`<ul data-v-0677d7a0><!--[-->`);
          ssrRenderList((_j = unref(groupsList)) == null ? void 0 : _j.sort((a, b) => a - b), (index) => {
            var _a3;
            _push(`<li class="${ssrRenderClass([unref(curGroupNum) === index ? "round_now" : "", "lsm2 table-bd-b table-bd-r"])}" style="${ssrRenderStyle(`width: calc(100% / ${unref(calcGroupDiv)})`)}" data-v-0677d7a0>${ssrInterpolate((_a3 = "TABLE_STANDING_LIST" in _ctx ? _ctx.TABLE_STANDING_LIST : unref(TABLE_STANDING_LIST)) == null ? void 0 : _a3[index])}</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        if (((_k = unref(groupsList)) == null ? void 0 : _k.length) == 0 && ((_l = unref(roundsList)) == null ? void 0 : _l.length) > 0) {
          _push(`<ul data-v-0677d7a0><!--[-->`);
          ssrRenderList((_m = unref(roundsList)) == null ? void 0 : _m.sort((a, b) => a - b), (index) => {
            _push(`<li class="${ssrRenderClass([unref(curRound) === index ? "round_now" : "", "lsm2 table-bd-b table-bd-r"])}" style="${ssrRenderStyle(`width: calc(100% / ${unref(calcDiv)})`)}" data-v-0677d7a0>${ssrInterpolate(index)}</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle({ "clear": "both" })}" data-v-0677d7a0></div><div class="tdsolid" id="ScoreGroupDiv" data-v-0677d7a0><div class="rankbox" data-v-0677d7a0><table class="eTable adaptMt team-table-home table-no-db-lr" id="etable-header" width="30%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-0677d7a0><tbody data-v-0677d7a0><tr class="bd-l" data-v-0677d7a0><th width="bd-l" rowspan="2" class="bd-l" data-v-0677d7a0>${ssrInterpolate(unref($t)("Home - Away"))}</th></tr><tr class="bd-l" data-v-0677d7a0></tr><!--[-->`);
      ssrRenderList(unref(matchsBySeason), (item, index) => {
        var _a3, _b3, _c2, _d2;
        _push(`<tr vs="0" class="bd-l bd-b" data-v-0677d7a0><td class="league-name" data-v-0677d7a0><span class="d-flex align-items-center justify-content-space-between pe-1" data-v-0677d7a0><span class="home lRow draw"${ssrRenderAttr("title", (_a3 = item == null ? void 0 : item.home_team) == null ? void 0 : _a3.name)} data-v-0677d7a0>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${(_b3 = item == null ? void 0 : item.home_team) == null ? void 0 : _b3.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a4, _b4;
            if (_push2) {
              _push2(`<span class="team-home-f" data-v-0677d7a0${_scopeId}>${ssrInterpolate((_a4 = item == null ? void 0 : item.home_team) == null ? void 0 : _a4.name)}</span>`);
            } else {
              return [
                createVNode("span", { class: "team-home-f" }, toDisplayString((_b4 = item == null ? void 0 : item.home_team) == null ? void 0 : _b4.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</span>`);
        if (item == null ? void 0 : item.home_position) {
          _push(`<span id="horder" class="team-hg me-1" data-v-0677d7a0>[${ssrInterpolate(item == null ? void 0 : item.home_position)}]</span>`);
        } else {
          _push(`<!---->`);
        }
        if (item == null ? void 0 : item.home_scores[2]) {
          _push(`<span class="redcard2 me-1" data-v-0677d7a0>${ssrInterpolate(item == null ? void 0 : item.home_scores[2])}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (item == null ? void 0 : item.home_scores[3]) {
          _push(`<span class="yellow1 me-1" data-v-0677d7a0>${ssrInterpolate(item == null ? void 0 : item.home_scores[3])}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span><span class="d-flex align-items-center justify-content-space-between pe-1" data-v-0677d7a0><span class="guest lRow"${ssrRenderAttr("title", (_c2 = item == null ? void 0 : item.away_team) == null ? void 0 : _c2.name)} data-v-0677d7a0>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${(_d2 = item == null ? void 0 : item.away_team) == null ? void 0 : _d2.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a4, _b4;
            if (_push2) {
              _push2(`<span class="team-away-f" data-v-0677d7a0${_scopeId}>${ssrInterpolate((_a4 = item == null ? void 0 : item.away_team) == null ? void 0 : _a4.name)}</span>`);
            } else {
              return [
                createVNode("span", { class: "team-away-f" }, toDisplayString((_b4 = item == null ? void 0 : item.away_team) == null ? void 0 : _b4.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</span>`);
        if (item == null ? void 0 : item.away_position) {
          _push(`<span id="horder" class="team-hg me-1" data-v-0677d7a0>[${ssrInterpolate(item == null ? void 0 : item.away_position)}]</span>`);
        } else {
          _push(`<!---->`);
        }
        if (item == null ? void 0 : item.away_scores[2]) {
          _push(`<span class="redcard2 me-1" data-v-0677d7a0>${ssrInterpolate(item == null ? void 0 : item.away_scores[2])}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (item == null ? void 0 : item.away_scores[3]) {
          _push(`<span class="yellow1 me-1" data-v-0677d7a0>${ssrInterpolate(item == null ? void 0 : item.away_scores[3])}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata" width="75%" data-v-0677d7a0><table class="eTable adaptMt team-table-home table-no-db-lr" cellspacing="0" cellpadding="0" width="100%" data-v-0677d7a0><tbody data-v-0677d7a0><tr data-v-0677d7a0><th width="" rowspan="2" class="bd-r" data-v-0677d7a0>${ssrInterpolate(unref($t)("Day"))}</th><th width="" rowspan="2" id="FScore_1" data-v-0677d7a0>${ssrInterpolate(unref($t)("Score"))}</th><th width="" colspan="3" class="table-bd-lr" data-v-0677d7a0><p class="d-flex justify-content-center" data-v-0677d7a0><span class="me-2 d-flex justify-content-center" data-v-0677d7a0><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(oddType), "europeOdds")) ? " checked" : ""} value="europeOdds"${ssrRenderAttr("title", unref($t)("Odd 1X2"))} class="me-1" data-v-0677d7a0> 1X2</span><span class="me-2 d-flex justify-content-center" data-v-0677d7a0><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(oddType), "overUnder")) ? " checked" : ""} value="overUnder"${ssrRenderAttr("title", unref($t)("Odd Over/Under"))} class="me-1" data-v-0677d7a0> TX</span><span class="d-flex justify-content-center" data-v-0677d7a0><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(oddType), "handicap")) ? " checked" : ""} value="handicap"${ssrRenderAttr("title", unref($t)("Odd Hadicap"))} class="me-1" data-v-0677d7a0> HDP</span></p></th><th width="" class="rl ll bd-r" rowspan="2"${ssrRenderAttr("title", unref($t)("Data"))} data-v-0677d7a0>${ssrInterpolate(unref($t)("Data"))}</th><th width="" class="rl ll" rowspan="2"${ssrRenderAttr("title", unref($t)("HT"))} data-v-0677d7a0>${ssrInterpolate(unref($t)("HT"))}</th></tr><tr data-v-0677d7a0><th class="table-bd-lr" colspan="3" title="" data-v-0677d7a0><p class="d-flex justify-content-center align-items-center" data-v-0677d7a0>${ssrInterpolate(unref($t)("First Odds"))}: <select id="CompanySel" aria-label="Company Select" data-v-0677d7a0><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (odd_company, index) => {
        _push(`<option${ssrRenderAttr("value", odd_company == null ? void 0 : odd_company.isportsapi)} data-v-0677d7a0>${ssrInterpolate(odd_company == null ? void 0 : odd_company.name)}</option>`);
      });
      _push(`<!--]--></select></p></th></tr><!--[-->`);
      ssrRenderList(unref(matchsBySeason), (item, index) => {
        var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2;
        _push(`<tr vs="0" name="2" data-v-0677d7a0><td class="match-date" data-v-0677d7a0><span class="timeData" name="timeData" data-tf="3" data-v-0677d7a0>${ssrInterpolate(("formatDateMomentUTCTimeZone" in _ctx ? _ctx.formatDateMomentUTCTimeZone : unref(formatDateMomentUTCTimeZone))(item == null ? void 0 : item.match_time, "DD-MM HH:mm"))}</span></td><td data-v-0677d7a0><span class="fscore_3 red2" data-v-0677d7a0><b data-v-0677d7a0>`);
        if ([...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_LIVE, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_END].includes((_a3 = item == null ? void 0 : item.status) == null ? void 0 : _a3.toString())) {
          _push(`<!--[--><span class="team-home-f" data-v-0677d7a0>${ssrInterpolate((_b3 = item == null ? void 0 : item.home_scores) == null ? void 0 : _b3[0])}</span> - <span class="team-away-f" data-v-0677d7a0>${ssrInterpolate((_c2 = item == null ? void 0 : item.away_scores) == null ? void 0 : _c2[0])}</span><!--]-->`);
        } else {
          _push(`<!--[--> - <!--]-->`);
        }
        _push(`</b></span><br data-v-0677d7a0></td><td data-v-0677d7a0><span class="" data-v-0677d7a0>${ssrInterpolate(("getValueByPositionWarehourse" in _ctx ? _ctx.getValueByPositionWarehourse : unref(getValueByPositionWarehourse))((_e2 = (_d2 = unref(OddsSeasonImain)) == null ? void 0 : _d2["i_match_id_" + (item == null ? void 0 : item.i_match_id)]) == null ? void 0 : _e2.initial, 0))}</span></td><td class="" data-v-0677d7a0>${ssrInterpolate(("getValueByPositionWarehourse" in _ctx ? _ctx.getValueByPositionWarehourse : unref(getValueByPositionWarehourse))((_g2 = (_f2 = unref(OddsSeasonImain)) == null ? void 0 : _f2["i_match_id_" + (item == null ? void 0 : item.i_match_id)]) == null ? void 0 : _g2.initial, 1))}</td><td class="" data-v-0677d7a0>${ssrInterpolate(("getValueByPositionWarehourse" in _ctx ? _ctx.getValueByPositionWarehourse : unref(getValueByPositionWarehourse))((_i2 = (_h2 = unref(OddsSeasonImain)) == null ? void 0 : _h2["i_match_id_" + (item == null ? void 0 : item.i_match_id)]) == null ? void 0 : _i2.initial, 2))}</td><td data-v-0677d7a0>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + (item == null ? void 0 : item.id), query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).H2H } },
          title: unref($t)("Analysis"),
          class: "analyze-icon me-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="analyze-icon l0" data-v-0677d7a0${_scopeId}><i class="icon iconfont icon-analysis"${ssrRenderAttr("title", unref($t)("Analysis"))} data-v-0677d7a0${_scopeId}></i></span>`);
            } else {
              return [
                createVNode("span", { class: "analyze-icon l0" }, [
                  createVNode("i", {
                    class: "icon iconfont icon-analysis",
                    title: unref($t)("Analysis")
                  }, null, 8, ["title"])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL + (item == null ? void 0 : item.id), query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP } }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="odds-icon"${ssrRenderAttr("title", unref($t)("Odd detail"))} data-v-0677d7a0${_scopeId}><i class="icon iconfont icon-odds" data-v-0677d7a0${_scopeId}></i></span>`);
            } else {
              return [
                createVNode("span", {
                  class: "odds-icon",
                  title: unref($t)("Odd detail")
                }, [
                  createVNode("i", { class: "icon iconfont icon-odds" })
                ], 8, ["title"])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td><td data-v-0677d7a0><b data-v-0677d7a0>`);
        if ([...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_LIVE, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_END].includes((_j2 = item == null ? void 0 : item.status) == null ? void 0 : _j2.toString())) {
          _push(`<!--[--><span class="team-home-f" data-v-0677d7a0>${ssrInterpolate((_k2 = item == null ? void 0 : item.home_scores) == null ? void 0 : _k2[1])}</span> - <span class="team-away-f" data-v-0677d7a0>${ssrInterpolate((_l2 = item == null ? void 0 : item.away_scores) == null ? void 0 : _l2[1])}</span><!--]-->`);
        } else {
          _push(`<!--[--> - <!--]-->`);
        }
        _push(`</b></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
      if (((_n = unref(matchsBySeason)) == null ? void 0 : _n.length) > 0) {
        _push(`<div class="rankbox" data-v-0677d7a0></div>`);
      } else {
        _push(`<p id="leaBtm" data-v-0677d7a0>${ssrInterpolate(unref($t)("Empty Data"))}</p>`);
      }
      _push(`</div>`);
      if (((_o = unref(playerBestLinup)) == null ? void 0 : _o.length) > 0) {
        _push(`<div id="matchBox" class="mt-3 overflow-hidden" data-v-0677d7a0><div class="playsTitle" data-v-0677d7a0>${ssrInterpolate(unref($t)("Best lineup"))}</div><div class="plays" data-v-0677d7a0><div class="home five" data-v-0677d7a0><!--[-->`);
        ssrRenderList(unref(playerBestLinup), (player) => {
          _push(ssrRenderComponent(_component_PlayBoxBestLineupComponent, {
            key: player.id,
            player,
            style: getPlayerStyle(player)
          }, null, _parent));
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/league/schedule-[league_id].vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Schedule = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0677d7a0"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "standings-[league_id]",
  __ssrInlineRender: true,
  props: {
    compDetail: {},
    title: {}
  },
  async setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
    let __temp, __restore;
    const route = useRoute();
    const { useLocale, $t } = useShareCommon();
    ((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.league_id) || "";
    const compId = ref(((_b = route == null ? void 0 : route.params) == null ? void 0 : _b.league_id) || "");
    const competitionDetail = ref([]);
    const seasonTableStandingList = ref([]);
    const compSeason = ref([]);
    const curSeasonId = ref(((_c = route == null ? void 0 : route.query) == null ? void 0 : _c.curSeasonId) || null);
    const stageId = ref();
    ref();
    ref(ISPORT_COMPANY_DEFAULT);
    const roundCount = ref(0);
    const curRound = ref();
    const listMatchInSeason = ref([]);
    const curStageId = ref();
    const stagesList = ref([]);
    ref([]);
    const promotions = ref([]);
    const props = __props;
    const fetchMatchesBySeason = async () => {
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.MATCHES_BY_SEASON,
        { season_id: curSeasonId.value }
      ).then(async (resData) => {
        var _a2, _b2;
        listMatchInSeason.value = resData;
        stageId.value = (_b2 = (_a2 = resData == null ? void 0 : resData[0]) == null ? void 0 : _a2.stage) == null ? void 0 : _b2.id;
      });
    };
    const fetchSeasonsTable = async () => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.SEASONS_TABLE + "/" + curSeasonId.value).then(async (resData) => {
        var _a2;
        promotions.value = (resData == null ? void 0 : resData.promotions) || [];
        seasonTableStandingList.value = (resData == null ? void 0 : resData.tables) || [];
        (_a2 = seasonTableStandingList.value) == null ? void 0 : _a2.forEach(
          (table) => {
            var _a3;
            return (_a3 = table == null ? void 0 : table.rows) == null ? void 0 : _a3.map((item) => {
              var _a4, _b2, _c2;
              item.promotion_color = (_b2 = (_a4 = promotions.value) == null ? void 0 : _a4.find((promotion) => promotion.id === item.promotion_id)) == null ? void 0 : _b2.color;
              let lastest = (_c2 = listMatchInSeason.value) == null ? void 0 : _c2.filter((match) => (match.home_team.id === item.team_info.team_id || match.away_team.id === item.team_info.team_id) && match.status == 8);
              item.lastest = getLastResult(lastest, item.team_info.team_id, false, $t);
              return item;
            });
          }
        );
      });
    };
    watch(
      () => route,
      (newPath) => {
        var _a2, _b2;
        ((_a2 = route == null ? void 0 : route.params) == null ? void 0 : _a2.league_id) || "";
        compId.value = ((_b2 = route == null ? void 0 : route.params) == null ? void 0 : _b2.league_id) || "";
      },
      { immediate: true }
    );
    watch(
      curRound,
      () => {
        var _a2, _b2;
        seasonTableStandingList.value = ((_a2 = listMatchInSeason.value) == null ? void 0 : _a2.filter((item) => {
          var _a3;
          return ((_a3 = item == null ? void 0 : item.stage) == null ? void 0 : _a3.id) == curStageId.value;
        })) || [];
        if (curRound.value > 0) {
          seasonTableStandingList.value = ((_b2 = seasonTableStandingList.value) == null ? void 0 : _b2.filter((item) => (item == null ? void 0 : item.round_num) == curRound.value)) || [];
        }
      },
      { immediate: true }
    );
    watch(
      curStageId,
      () => {
        var _a2, _b2;
        seasonTableStandingList.value = ((_a2 = listMatchInSeason.value) == null ? void 0 : _a2.filter((item) => {
          var _a3;
          return ((_a3 = item == null ? void 0 : item.stage) == null ? void 0 : _a3.id) == curStageId.value;
        })) || [];
        if (curRound.value > 0) {
          seasonTableStandingList.value = ((_b2 = seasonTableStandingList.value) == null ? void 0 : _b2.filter((item) => (item == null ? void 0 : item.round_num) == curRound.value)) || [];
        }
      },
      { immediate: true }
    );
    competitionDetail.value = props == null ? void 0 : props.compDetail;
    if (!curSeasonId.value) {
      curSeasonId.value = (_d = competitionDetail.value) == null ? void 0 : _d.cur_season_id;
    }
    if (!((_f = (_e = competitionDetail.value) == null ? void 0 : _e.seasons_stages) == null ? void 0 : _f.find((item) => item.season_id === curSeasonId.value))) {
      curSeasonId.value = (_i = (_h = (_g = competitionDetail.value) == null ? void 0 : _g.seasons_stages) == null ? void 0 : _h[0]) == null ? void 0 : _i.season_id;
    }
    compSeason.value = competitionDetail.value || [];
    compId.value = (_j = competitionDetail.value) == null ? void 0 : _j.id;
    roundCount.value = (_k = competitionDetail.value) == null ? void 0 : _k.round_count;
    curRound.value = (_l = competitionDetail.value) == null ? void 0 : _l.cur_round;
    curStageId.value = (_m = competitionDetail.value) == null ? void 0 : _m.cur_stage_id;
    stagesList.value = (_p = (_o = (_n = competitionDetail.value) == null ? void 0 : _n.seasons_stages) == null ? void 0 : _o.find((item) => item.season_id === curSeasonId.value)) == null ? void 0 : _p.stages;
    if (curSeasonId.value != ((_q = competitionDetail.value) == null ? void 0 : _q.cur_season_id)) {
      curStageId.value = (_s = (_r = stagesList.value) == null ? void 0 : _r[0]) == null ? void 0 : _s.id;
    }
    if ((_t = props == null ? void 0 : props.compDetail) == null ? void 0 : _t.id) {
      [__temp, __restore] = withAsyncContext(() => fetchMatchesBySeason()), await __temp, __restore();
      [__temp, __restore] = withAsyncContext(() => fetchSeasonsTable()), await __temp, __restore();
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d2, _e2;
      const _component_BaseImage = _sfc_main$d;
      const _component_HeaderLeagueComponent = _sfc_main$3;
      const _component_nuxt_link = __nuxt_component_0$3;
      _push(`<!--[--><div class="info_title" id="InfoTitle" data-v-97b25e91><div class="info_title_left" id="TitleLeft" data-v-97b25e91><div class="img" data-v-97b25e91>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))((_a2 = unref(competitionDetail)) == null ? void 0 : _a2.logo_o, "competition") + "!h50",
        loading: "lazy",
        alt: ""
      }, null, _parent));
      _push(`</div><h1 data-v-97b25e91>${ssrInterpolate(props == null ? void 0 : props.title)}</h1>`);
      if (((_c2 = (_b2 = unref(compSeason)) == null ? void 0 : _b2.seasons_stages) == null ? void 0 : _c2.length) > 0) {
        _push(`<div class="selectbox" data-v-97b25e91><select name="seasonList" id="seasonList" data-v-97b25e91><!--[-->`);
        ssrRenderList((_d2 = unref(compSeason)) == null ? void 0 : _d2.seasons_stages, (item, index) => {
          _push(`<option${ssrRenderAttr("value", item == null ? void 0 : item.season_id)} data-v-97b25e91>${ssrInterpolate(item == null ? void 0 : item.season_years)}</option>`);
        });
        _push(`<!--]--></select></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_HeaderLeagueComponent, {
        "comp-detail": unref(competitionDetail),
        "cur-season-id": unref(curSeasonId)
      }, null, _parent));
      _push(`<div class="data mb-3" data-v-97b25e91><div style="${ssrRenderStyle({ "clear": "both" })}" data-v-97b25e91></div><div class="tdsolid" id="ScoreGroupDiv" style="${ssrRenderStyle({ "display": "block" })}" data-v-97b25e91>`);
      if (((_e2 = unref(seasonTableStandingList)) == null ? void 0 : _e2.length) > 0) {
        _push(`<div class="rankbox" data-v-97b25e91><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-97b25e91><tbody data-v-97b25e91><!--[-->`);
        ssrRenderList(unref(seasonTableStandingList), (item, index) => {
          var _a3, _b3, _c3, _d3, _e3;
          _push(`<!--[--><tr align="center" data-v-97b25e91><th class="groupTitle table-bd-lr"${ssrRenderAttr("title", unref($t)("Ranking"))} data-v-97b25e91>${ssrInterpolate(unref($t)("R"))}</th>`);
          if (((_a3 = unref(seasonTableStandingList)) == null ? void 0 : _a3.length) > 1) {
            _push(`<th class="groupTitle league-name" colspan="2"${ssrRenderAttr("title", `${(_b3 = item == null ? void 0 : item.stage_info) == null ? void 0 : _b3.stage_name}-${(_c3 = "TABLE_STANDING_LIST" in _ctx ? _ctx.TABLE_STANDING_LIST : unref(TABLE_STANDING_LIST)) == null ? void 0 : _c3[item == null ? void 0 : item.group]}`)} data-v-97b25e91><span data-v-97b25e91>${ssrInterpolate((_d3 = item == null ? void 0 : item.stage_info) == null ? void 0 : _d3.stage_name)}</span> - ${ssrInterpolate((_e3 = "TABLE_STANDING_LIST" in _ctx ? _ctx.TABLE_STANDING_LIST : unref(TABLE_STANDING_LIST)) == null ? void 0 : _e3[item == null ? void 0 : item.group])}</th>`);
          } else {
            _push(`<th class="groupTitle" colspan="2" data-v-97b25e91>${ssrInterpolate(unref($t)("Team"))}</th>`);
          }
          _push(`</tr><!--[-->`);
          ssrRenderList(item == null ? void 0 : item.rows, (row, row_index) => {
            _push(`<tr align="center" data-v-97b25e91><td width="44" class="table-bd-lr"${ssrRenderAttr("bgcolor", row == null ? void 0 : row.promotion_color)} data-v-97b25e91>${ssrInterpolate(row == null ? void 0 : row.position)}</td><td style="${ssrRenderStyle({ "text-align": "left", "width": "338px", "padding-left": "2px" })}" class="league-name"${ssrRenderAttr("title", row.team_info.team_name)} data-v-97b25e91>`);
            _push(ssrRenderComponent(_component_nuxt_link, {
              class: "highlighted",
              to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${row.team_info.team_id}`
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(row.team_info.team_name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(row.team_info.team_name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</td></tr>`);
          });
          _push(`<!--]--><!--]-->`);
        });
        _push(`<!--]--></tbody></table><div class="rankdata" width="75%" data-v-97b25e91><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" data-v-97b25e91><tbody data-v-97b25e91><!--[-->`);
        ssrRenderList(unref(seasonTableStandingList), (item, index) => {
          _push(`<!--[--><tr align="center" data-v-97b25e91><th class="groupTabTitle groupTitle" data-v-97b25e91>${ssrInterpolate(unref($t)("All"))}</th><th class="groupTabTitle groupTitle" data-v-97b25e91>${ssrInterpolate(unref($t)("Win"))}</th><th class="groupTabTitle groupTitle" data-v-97b25e91>${ssrInterpolate(unref($t)("Draw"))}</th><th class="groupTabTitle groupTitle" data-v-97b25e91>${ssrInterpolate(unref($t)("Lose"))}</th><th class="groupTabTitle groupTitle"${ssrRenderAttr("title", unref($t)("Goal"))} data-v-97b25e91>${ssrInterpolate(unref($t)("Goal"))}</th><th class="groupTabTitle groupTitle"${ssrRenderAttr("title", unref($t)("Goal conceded"))} data-v-97b25e91>${ssrInterpolate(unref($t)("Goal conceded"))}</th><th class="groupTabTitle groupTitle" style="${ssrRenderStyle({ "width": "100px" })}" data-v-97b25e91>${ssrInterpolate(unref($t)("Distance"))}</th><th class="groupTabTitle groupTitle" data-v-97b25e91>${ssrInterpolate(unref($t)("Points"))}</th><th class="groupTabTitle groupTitle last-match" data-v-97b25e91>${ssrInterpolate(unref($t)("Recent 6"))}</th></tr><!--[-->`);
          ssrRenderList(item == null ? void 0 : item.rows, (row, row_index) => {
            var _a3;
            _push(`<tr align="center" data-v-97b25e91><td data-v-97b25e91>${ssrInterpolate(row == null ? void 0 : row.total)}</td><td data-v-97b25e91>${ssrInterpolate(row == null ? void 0 : row.won)}</td><td data-v-97b25e91>${ssrInterpolate(row == null ? void 0 : row.draw)}</td><td data-v-97b25e91>${ssrInterpolate(row == null ? void 0 : row.loss)}</td><td data-v-97b25e91>${ssrInterpolate(row == null ? void 0 : row.points)}</td><td data-v-97b25e91>${ssrInterpolate(row == null ? void 0 : row.goals_against)}</td><td data-v-97b25e91>${ssrInterpolate(row == null ? void 0 : row.goal_diff)}</td><td class="bg-lgreen" data-v-97b25e91>${ssrInterpolate(row == null ? void 0 : row.points)}</td><td style="${ssrRenderStyle({ "text-align": "left" })}" data-v-97b25e91>${(_a3 = row == null ? void 0 : row.lastest) != null ? _a3 : ""}</td></tr>`);
          });
          _push(`<!--]--><!--]-->`);
        });
        _push(`<!--]--></tbody></table></div></div>`);
      } else {
        _push(`<p id="leaBtm" data-v-97b25e91>${ssrInterpolate(unref($t)("Empty Data"))}</p>`);
      }
      _push(`<p class="text-center promotions" data-v-97b25e91><!--[-->`);
      ssrRenderList(unref(promotions), (promotion, index) => {
        _push(`<span style="${ssrRenderStyle({ "text-wrap": "nowrap" })}" data-v-97b25e91><span style="${ssrRenderStyle([{ "color": "#FF9966", "font-size": "20px" }, `color:${promotion == null ? void 0 : promotion.color}`])}" class="ms-3" data-v-97b25e91>\u25A0</span> ${ssrInterpolate(unref($t)(promotion == null ? void 0 : promotion.name))}</span>`);
      });
      _push(`<!--]--></p></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/league/standings-[league_id].vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Standings = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-97b25e91"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[league_id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a2;
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
    let __temp, __restore;
    const storeSystems = systemsStore();
    const route = useRoute();
    const { initSchemaLeague } = useSchema();
    ((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.league_id) || "";
    const compId = ref(((_b = route == null ? void 0 : route.params) == null ? void 0 : _b.league_id) || "");
    const competitionDetail = ref();
    const warehouseOriginData = ref([]);
    const categoryCountry = ref([]);
    const activeCategoryCountry = ref("");
    const activeCountry = ref("");
    const tab = ref(((_c = route == null ? void 0 : route.query) == null ? void 0 : _c.tab) || WAREHOUSE_LEAGUE_TAB.SCHEDULE);
    const leagueTitle = ref("");
    const leagueContent = ref("");
    const robotsMeta = ref("");
    const { infoLeague } = useShareLeague();
    const { useLocale, $t, isNavVisible } = useShareCommon();
    isNavVisible.value = false;
    const teamInfo = ref([]);
    if (![WAREHOUSE_LEAGUE_TAB.SCHEDULE, WAREHOUSE_LEAGUE_TAB.STANDING].includes(tab.value)) {
      tab.value = WAREHOUSE_LEAGUE_TAB.SCHEDULE;
    }
    const seoMeta = ref({
      title: "",
      description: "",
      keyword: "",
      content: ""
    });
    const onClickLeague = () => {
      nextTick(() => {
        (void 0).documentElement.querySelector("#close-league").click();
      });
    };
    const fetchObjectMeta = async () => {
      if (!compId.value)
        return;
      try {
        const resData = await useFetch(
          createUrl(API_ROUTERS.OBJECTS_META.DETAIL + "/" + compId.value, {
            query: {
              type: "competition",
              lang: useLocale == null ? void 0 : useLocale.value.defaultLocale
            }
          }),
          "$jYdetAvmR1"
        );
        return resData.data.value;
      } catch (e) {
        return null;
      }
    };
    const setObjectMeta = async (competitionDetail2, resData) => {
      var _a3, _b3, _c3, _d3;
      var _a22, _b2, _c2, _d2;
      try {
        let title = resData == null ? void 0 : resData.title;
        let description = resData == null ? void 0 : resData.meta_descriptions;
        if (!title || title == "") {
          title = (_a3 = getConfig(storeSystems.configurations, "COMPETITION_TITLE_" + ((_a22 = tab.value) == null ? void 0 : _a22.toUpperCase()))) != null ? _a3 : getConfig(storeSystems.configurations, "COMPETITION_TITLE") ? getConfig(storeSystems.configurations, "COMPETITION_TITLE") : getConfig(storeSystems.configurations, "SEO_META_TITLE");
          title = generateCompetitionMetaSeo(
            title,
            competitionDetail2 == null ? void 0 : competitionDetail2.name
          );
          if (title == "") {
            title = competitionDetail2 == null ? void 0 : competitionDetail2.name;
          }
        }
        if (!description || description == "") {
          description = (_b3 = getConfig(storeSystems.configurations, "COMPETITION_DESCRIPTION_" + ((_b2 = tab.value) == null ? void 0 : _b2.toUpperCase()))) != null ? _b3 : getConfig(
            storeSystems.configurations,
            "COMPETITION_DESCRIPTION"
          ) ? getConfig(storeSystems.configurations, "COMPETITION_DESCRIPTION") : getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION");
          description = generateCompetitionMetaSeo(
            description,
            competitionDetail2 == null ? void 0 : competitionDetail2.name
          );
        }
        let keyword = resData == null ? void 0 : resData.keyword;
        if (!keyword || keyword == "") {
          keyword = (_c3 = getConfig(storeSystems.configurations, "COMPETITION_KEYWORD_" + ((_c2 = tab.value) == null ? void 0 : _c2.toUpperCase()))) != null ? _c3 : getConfig(storeSystems.configurations, "COMPETITION_KEYWORD") ? getConfig(storeSystems.configurations, "COMPETITION_KEYWORD") : "";
          keyword = generateCompetitionMetaSeo(
            keyword,
            competitionDetail2 == null ? void 0 : competitionDetail2.name
          );
        }
        let content = resData == null ? void 0 : resData.content;
        if (!content || content == "") {
          content = (_d3 = getConfig(storeSystems.configurations, "COMPETITION_CONTENT_" + ((_d2 = tab.value) == null ? void 0 : _d2.toUpperCase()))) != null ? _d3 : getConfig(storeSystems.configurations, "COMPETITION_CONTENT");
          content = generateCompetitionMetaSeo(
            content,
            competitionDetail2 == null ? void 0 : competitionDetail2.name
          );
        }
        leagueTitle.value = title;
        leagueContent.value = content;
        seoMeta.value.title = title;
        seoMeta.value.description = description;
        seoMeta.value.keyword = keyword;
        seoMeta.value.content = content;
      } catch (e) {
      }
    };
    const fetchCompDetail = async () => {
      try {
        const query = {
          comp_id: compId.value,
          lang: useLocale == null ? void 0 : useLocale.value.defaultLocale
        };
        const resData = await useApiLiveScore(
          API_ROUTERS.LIVESCORE.COMP_DETAIL,
          query
        );
        return resData;
      } catch (e) {
        return null;
      }
    };
    const fetchWarehouse = async () => {
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.WAREHOUSE,
        { lang: useLocale == null ? void 0 : useLocale.value.defaultLocale }
      ).then(async (resData) => {
        warehouseOriginData.value = resData;
        categoryCountry.value = resData == null ? void 0 : resData.filter((item) => !["x4zp5rzgh2q82w1"].includes(item.category_id));
      });
    };
    watch(
      () => route,
      (newPath) => {
        var _a22, _b2;
        ((_a22 = route == null ? void 0 : route.params) == null ? void 0 : _a22.league_id) || "";
        compId.value = ((_b2 = route == null ? void 0 : route.params) == null ? void 0 : _b2.league_id) || "";
      },
      { immediate: true }
    );
    const handleChangeTab = async () => {
      try {
        const seo = await fetchObjectMeta();
        setObjectMeta(competitionDetail.value, seo);
      } catch {
      }
    };
    watch(
      () => route == null ? void 0 : route.query,
      () => {
        var _a22;
        tab.value = ((_a22 = route == null ? void 0 : route.query) == null ? void 0 : _a22.tab) || WAREHOUSE_LEAGUE_TAB.SCHEDULE;
        if (![WAREHOUSE_LEAGUE_TAB.SCHEDULE, WAREHOUSE_LEAGUE_TAB.STANDING].includes(tab.value)) {
          tab.value = WAREHOUSE_LEAGUE_TAB.SCHEDULE;
        }
        handleChangeTab();
      }
    );
    const { data } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("league", async () => {
      try {
        const [league, seo] = await Promise.all([fetchCompDetail(), fetchObjectMeta()]);
        return {
          league,
          seo
        };
      } catch (e) {
        return null;
      }
    })), __temp = await __temp, __restore(), __temp);
    const fetchTeamBySeasonId = async (id) => {
      try {
        if (id) {
          const data2 = await useApiLiveScore(API_ROUTERS.LIVESCORE.SEASONS_TABLE + "/" + id);
          if (data2 == null ? void 0 : data2.tables) {
            let team = [];
            for (const value of data2.tables) {
              for (const data3 of value == null ? void 0 : value.rows) {
                (data3 == null ? void 0 : data3.team_info) && team.push(data3 == null ? void 0 : data3.team_info);
              }
            }
            return team;
          }
          return [];
        }
      } catch {
      }
    };
    if ((_e = (_d = data.value) == null ? void 0 : _d.league) == null ? void 0 : _e[0]) {
      if (((_h = (_g = (_f = data.value) == null ? void 0 : _f.league) == null ? void 0 : _g[0]) == null ? void 0 : _h.is_deleted) === true) {
        robotsMeta.value = "noindex,nofollow";
        useHead(() => ({
          meta: [{ name: "robots", content: robotsMeta.value }]
        }));
      }
      infoLeague.value = (_j = (_i = data.value) == null ? void 0 : _i.league) == null ? void 0 : _j[0];
      compId.value = (_m = (_l = (_k = data.value) == null ? void 0 : _k.league) == null ? void 0 : _l[0]) == null ? void 0 : _m.id;
      competitionDetail.value = (_o = (_n = data.value) == null ? void 0 : _n.league) == null ? void 0 : _o[0];
      activeCategoryCountry.value = (_r = (_q = (_p = data.value) == null ? void 0 : _p.league) == null ? void 0 : _q[0]) == null ? void 0 : _r.category_id;
      activeCountry.value = (_a2 = (_u = (_t = (_s = data.value) == null ? void 0 : _s.league) == null ? void 0 : _t[0]) == null ? void 0 : _u.country_id) != null ? _a2 : "National";
      setObjectMeta((_w = (_v = data.value) == null ? void 0 : _v.league) == null ? void 0 : _w[0], (_x = data.value) == null ? void 0 : _x.seo);
      fetchWarehouse();
      if ((_z = (_y = data.value) == null ? void 0 : _y.league) == null ? void 0 : _z[0].cur_season_id) {
        teamInfo.value = ([__temp, __restore] = withAsyncContext(() => {
          var _a22, _b2;
          return fetchTeamBySeasonId((_b2 = (_a22 = data.value) == null ? void 0 : _a22.league) == null ? void 0 : _b2[0].cur_season_id);
        }), __temp = await __temp, __restore(), __temp);
      }
      initSchemaLeague({
        league: (_B = (_A = data.value) == null ? void 0 : _A.league) == null ? void 0 : _B[0],
        team: teamInfo.value
      });
    } else {
      showError({
        statusCode: 404,
        statusMessage: $t("League does not exist!")
      });
    }
    useHead({
      title: () => seoMeta.value.title,
      meta: [
        { name: "description", content: () => seoMeta.value.description },
        { property: "og:title", content: () => seoMeta.value.title },
        { property: "og:description", content: () => seoMeta.value.description },
        { name: "keywords", content: () => seoMeta.value.keyword }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a22, _b2;
      const _component_LeaguesComponent = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "warehouse-page",
        class: "mcontent container"
      }, _attrs))}><div id="main" class="container row"><div id="left" class="col-12 col-md-2 col-lg-2 ps-0 d-none d-sm-none d-md-inline-block">`);
      _push(ssrRenderComponent(_component_LeaguesComponent, {
        "category-country": unref(categoryCountry),
        "active-category-country": unref(activeCategoryCountry),
        "active-country": unref(activeCountry),
        "comp-id": unref(compId)
      }, null, _parent));
      _push(`</div><div id="i_main" class="col-md-10 col-lg-10">`);
      if (((_a22 = unref(competitionDetail)) == null ? void 0 : _a22.id) && unref(tab) === ("WAREHOUSE_LEAGUE_TAB" in _ctx ? _ctx.WAREHOUSE_LEAGUE_TAB : unref(WAREHOUSE_LEAGUE_TAB)).SCHEDULE) {
        _push(ssrRenderComponent(Schedule, {
          "comp-detail": unref(competitionDetail),
          title: unref(leagueTitle)
        }, null, _parent));
      } else if (((_b2 = unref(competitionDetail)) == null ? void 0 : _b2.id) && unref(tab) === ("WAREHOUSE_LEAGUE_TAB" in _ctx ? _ctx.WAREHOUSE_LEAGUE_TAB : unref(WAREHOUSE_LEAGUE_TAB)).STANDING) {
        _push(ssrRenderComponent(Standings, {
          "comp-detail": unref(competitionDetail),
          title: unref(leagueTitle)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div id="content-page" class="mt-5 row">`);
      if (unref(leagueContent)) {
        _push(`<div height="21" colspan="15" id="th_information"><div align="center" class="write"><strong>${ssrInterpolate(unref($t)("League information"))}</strong></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(leagueContent))}</div></div><span class="clear"></span></div><div class="icon-list_match-setting d-block d-sm-block d-md-none"><div class="list_match"><a class="btn-icon" data-bs-toggle="offcanvas" href="#offcanvasLeft" role="button" aria-controls="offcanvasLeft" aria-label="Tournament list"><i class="icon iconfont icon-font-menu"></i></a></div></div><div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel"><div class="offcanvas-header d-none"><div class="offcanvas-title" id="offcanvasLeftLabel">Leagues</div><button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" id="close-league"></button></div><div class="offcanvas-body">`);
      _push(ssrRenderComponent(_component_LeaguesComponent, {
        "category-country": unref(categoryCountry),
        "active-category-country": unref(activeCategoryCountry),
        "active-country": unref(activeCountry),
        "comp-id": unref(compId),
        onOnClick: onClickLeague
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/league/[league_id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_league_id_-D87XgT_F.mjs.map
