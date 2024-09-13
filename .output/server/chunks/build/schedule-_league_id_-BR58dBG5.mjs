import { _ as _sfc_main$1 } from './BaseImage-oG5tRcgk.mjs';
import { _ as _sfc_main$2 } from './HeaderLeagueComponent-BOzNxgdw.mjs';
import { _ as _export_sfc, u as useRoute, f as __nuxt_component_0$2 } from './server.mjs';
import { _ as __nuxt_component_0 } from './server-placeholder-BFzIFO-1.mjs';
import { useSSRContext, defineComponent, ref, computed, watch, unref, withCtx, createVNode, toDisplayString } from 'vue';
import { I as ISPORT_COMPANY_DEFAULT, T as TABLE_STANDING_LIST, b as ODD_COMPANYS, g as LIVESCORE_STATUS, M as MATCH_TAB } from './constants-DJp0NbxW.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { b as ROUTER_TEAM_NAME, R as ROUTERS, A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { a as getLiveScoreImage, O as getValueByPositionWarehourse } from './livescore_helper-4bdWaxk-.mjs';
import { f as formatDateMomentUTCTimeZone } from './moment_helper-C2kP4D4M.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseEqual } from 'vue/server-renderer';
import { useWindowSize } from '@vueuse/core';
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
import './fetch-CC0zbYw2.mjs';
import './createUrl-DyOxdY5I.mjs';
import './helper-CGhdpGxz.mjs';
import 'crypto-js';
import 'pako';
import 'buffer';
import 'moment-timezone';

const _sfc_main = /* @__PURE__ */ defineComponent({
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
        var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
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
          stageName.value = ((_w = competitionDetail.value) == null ? void 0 : _w.name_vi_overwrite) || ((_x = competitionDetail.value) == null ? void 0 : _x.name_vi) || ((_y = competitionDetail.value) == null ? void 0 : _y.name);
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
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
      const _component_BaseImage = _sfc_main$1;
      const _component_HeaderLeagueComponent = _sfc_main$2;
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_PlayBoxBestLineupComponent = __nuxt_component_0;
      _push(`<!--[--><div class="info_title" id="InfoTitle" data-v-b6e22041><div class="info_title_left" id="TitleLeft" data-v-b6e22041><div class="img" data-v-b6e22041>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))((_a2 = unref(competitionDetail)) == null ? void 0 : _a2.logo_o, "competition") + "!h50",
        loading: "lazy",
        alt: ""
      }, null, _parent));
      _push(`</div><h1 data-v-b6e22041>${ssrInterpolate(props == null ? void 0 : props.title)}</h1>`);
      if (((_c = (_b2 = unref(compSeason)) == null ? void 0 : _b2.seasons_stages) == null ? void 0 : _c.length) > 0) {
        _push(`<div class="selectbox" data-v-b6e22041><select name="seasonList" aria-label="Company season" id="seasonList" data-v-b6e22041><!--[-->`);
        ssrRenderList((_d = unref(compSeason)) == null ? void 0 : _d.seasons_stages, (item, index) => {
          _push(`<option${ssrRenderAttr("value", item == null ? void 0 : item.season_id)} data-v-b6e22041>${ssrInterpolate(item == null ? void 0 : item.season_years)}</option>`);
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
      _push(`<div class="data mb-3" data-v-b6e22041>`);
      if (((_e = unref(stagesList)) == null ? void 0 : _e.length) > 1) {
        _push(`<div class="nav_select" id="SubSelectDiv" data-v-b6e22041><ul data-v-b6e22041><!--[-->`);
        ssrRenderList(unref(stagesList), (item, index) => {
          _push(`<li class="${ssrRenderClass(item.id === unref(selectStageId) ? "nav_selected" : "")}" data-v-b6e22041>${ssrInterpolate(item == null ? void 0 : item.name)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_f = unref(groupsList)) == null ? void 0 : _f.length) > 0 || ((_g = unref(roundsList)) == null ? void 0 : _g.length) > 0) {
        _push(`<div id="showRound" data-v-b6e22041><div class="write" data-v-b6e22041><strong data-v-b6e22041>${ssrInterpolate(unref(stageName))}</strong></div>`);
        if (((_h = unref(groupsList)) == null ? void 0 : _h.length) > 0) {
          _push(`<ul data-v-b6e22041><!--[-->`);
          ssrRenderList((_i = unref(groupsList)) == null ? void 0 : _i.sort((a, b) => a - b), (index) => {
            var _a3;
            _push(`<li class="${ssrRenderClass([unref(curGroupNum) === index ? "round_now" : "", "lsm2 table-bd-b table-bd-r"])}" style="${ssrRenderStyle(`width: calc(100% / ${unref(calcGroupDiv)})`)}" data-v-b6e22041>${ssrInterpolate((_a3 = "TABLE_STANDING_LIST" in _ctx ? _ctx.TABLE_STANDING_LIST : unref(TABLE_STANDING_LIST)) == null ? void 0 : _a3[index])}</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        if (((_j = unref(groupsList)) == null ? void 0 : _j.length) == 0 && ((_k = unref(roundsList)) == null ? void 0 : _k.length) > 0) {
          _push(`<ul data-v-b6e22041><!--[-->`);
          ssrRenderList((_l = unref(roundsList)) == null ? void 0 : _l.sort((a, b) => a - b), (index) => {
            _push(`<li class="${ssrRenderClass([unref(curRound) === index ? "round_now" : "", "lsm2 table-bd-b table-bd-r"])}" style="${ssrRenderStyle(`width: calc(100% / ${unref(calcDiv)})`)}" data-v-b6e22041>${ssrInterpolate(index)}</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle({ "clear": "both" })}" data-v-b6e22041></div><div class="tdsolid" id="ScoreGroupDiv" data-v-b6e22041><div class="rankbox" data-v-b6e22041><table class="eTable adaptMt team-table-home table-no-db-lr" id="etable-header" width="30%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "260px" })}" data-v-b6e22041><tbody data-v-b6e22041><tr class="bd-l" data-v-b6e22041><th width="" rowspan="2" title="Vo\u0300ng / Ba\u0309ng" data-v-b6e22041>STT</th><th width="bd-l" rowspan="2" class="bd-l" data-v-b6e22041>Ch\u1EE7 - Kh\xE1ch</th></tr><tr class="bd-l" data-v-b6e22041></tr><!--[-->`);
      ssrRenderList(unref(matchsBySeason), (item, index) => {
        var _a3, _b3, _c2, _d2, _e2, _f2;
        _push(`<tr vs="0" class="bd-l bd-b" data-v-b6e22041><td data-v-b6e22041>${ssrInterpolate(((_a3 = unref(groupsList)) == null ? void 0 : _a3.length) > 0 ? (_b3 = "TABLE_STANDING_LIST" in _ctx ? _ctx.TABLE_STANDING_LIST : unref(TABLE_STANDING_LIST)) == null ? void 0 : _b3[item == null ? void 0 : item.group_num] : item == null ? void 0 : item.round_num)}</td><td class="league-name" data-v-b6e22041><span class="d-flex align-items-center justify-content-space-between pe-1" data-v-b6e22041><span class="home lRow draw"${ssrRenderAttr("title", (_c2 = item == null ? void 0 : item.home_team) == null ? void 0 : _c2.name)} data-v-b6e22041>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${(_d2 = item == null ? void 0 : item.home_team) == null ? void 0 : _d2.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a4, _b4;
            if (_push2) {
              _push2(`<span class="team-home-f" data-v-b6e22041${_scopeId}>${ssrInterpolate((_a4 = item == null ? void 0 : item.home_team) == null ? void 0 : _a4.name)}</span>`);
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
          _push(`<span id="horder" class="team-hg me-1" data-v-b6e22041>[${ssrInterpolate(item == null ? void 0 : item.home_position)}]</span>`);
        } else {
          _push(`<!---->`);
        }
        if (item == null ? void 0 : item.home_scores[2]) {
          _push(`<span class="redcard2 me-1" data-v-b6e22041>${ssrInterpolate(item == null ? void 0 : item.home_scores[2])}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (item == null ? void 0 : item.home_scores[3]) {
          _push(`<span class="yellow1 me-1" data-v-b6e22041>${ssrInterpolate(item == null ? void 0 : item.home_scores[3])}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span><span class="d-flex align-items-center justify-content-space-between pe-1" data-v-b6e22041><span class="guest lRow"${ssrRenderAttr("title", (_e2 = item == null ? void 0 : item.away_team) == null ? void 0 : _e2.name)} data-v-b6e22041>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: `/${("ROUTER_TEAM_NAME" in _ctx ? _ctx.ROUTER_TEAM_NAME : unref(ROUTER_TEAM_NAME)).TEAM}/${(_f2 = item == null ? void 0 : item.away_team) == null ? void 0 : _f2.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a4, _b4;
            if (_push2) {
              _push2(`<span class="team-away-f" data-v-b6e22041${_scopeId}>${ssrInterpolate((_a4 = item == null ? void 0 : item.away_team) == null ? void 0 : _a4.name)}</span>`);
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
          _push(`<span id="horder" class="team-hg me-1" data-v-b6e22041>[${ssrInterpolate(item == null ? void 0 : item.away_position)}]</span>`);
        } else {
          _push(`<!---->`);
        }
        if (item == null ? void 0 : item.away_scores[2]) {
          _push(`<span class="redcard2 me-1" data-v-b6e22041>${ssrInterpolate(item == null ? void 0 : item.away_scores[2])}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (item == null ? void 0 : item.away_scores[3]) {
          _push(`<span class="yellow1 me-1" data-v-b6e22041>${ssrInterpolate(item == null ? void 0 : item.away_scores[3])}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table><div class="rankdata" width="75%" data-v-b6e22041><table class="eTable adaptMt team-table-home table-no-db-lr" cellspacing="0" cellpadding="0" width="100%" data-v-b6e22041><tbody data-v-b6e22041><tr data-v-b6e22041><th width="" rowspan="2" class="bd-r" data-v-b6e22041>Ng\xE0y </th><th width="" rowspan="2" id="FScore_1" data-v-b6e22041>T\u1EF7 s\u1ED1 </th><th width="" colspan="3" class="table-bd-lr" data-v-b6e22041><p class="d-flex justify-content-center" data-v-b6e22041><span class="me-2 d-flex justify-content-center" data-v-b6e22041><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(oddType), "europeOdds")) ? " checked" : ""} value="europeOdds" title="Ke\u0300o 1X2" class="me-1" data-v-b6e22041> 1X2</span><span class="me-2 d-flex justify-content-center" data-v-b6e22041><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(oddType), "overUnder")) ? " checked" : ""} value="overUnder" title="Ke\u0300o Ta\u0300i xi\u0309u" class="me-1" data-v-b6e22041> TX</span><span class="d-flex justify-content-center" data-v-b6e22041><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(oddType), "handicap")) ? " checked" : ""} value="handicap" title="Ke\u0300o Hadicap" class="me-1" data-v-b6e22041> HDP</span></p></th><th width="" class="rl ll bd-r" rowspan="2" title="D\u01B0\u0303 li\xEA\u0323u" data-v-b6e22041>Data</th><th width="" class="rl ll" rowspan="2" title="Hi\xEA\u0323p 1" data-v-b6e22041>HT</th></tr><tr data-v-b6e22041><th class="table-bd-lr" colspan="3" title="" data-v-b6e22041><p class="d-flex justify-content-center align-items-center" data-v-b6e22041> T\u1EF7 l\u1EC7 ban \u0111\u1EA7u: <select id="CompanySel" aria-label="Company Select" data-v-b6e22041><!--[-->`);
      ssrRenderList("ODD_COMPANYS" in _ctx ? _ctx.ODD_COMPANYS : unref(ODD_COMPANYS), (odd_company, index) => {
        _push(`<option${ssrRenderAttr("value", odd_company == null ? void 0 : odd_company.isportsapi)} data-v-b6e22041>${ssrInterpolate(odd_company == null ? void 0 : odd_company.name)}</option>`);
      });
      _push(`<!--]--></select></p></th></tr><!--[-->`);
      ssrRenderList(unref(matchsBySeason), (item, index) => {
        var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2;
        _push(`<tr vs="0" name="2" data-v-b6e22041><td class="match-date" data-v-b6e22041><span class="timeData" name="timeData" data-tf="3" data-v-b6e22041>${ssrInterpolate(("formatDateMomentUTCTimeZone" in _ctx ? _ctx.formatDateMomentUTCTimeZone : unref(formatDateMomentUTCTimeZone))(item == null ? void 0 : item.match_time, "DD-MM HH:mm"))}</span></td><td data-v-b6e22041><span class="fscore_3 red2" data-v-b6e22041><b data-v-b6e22041>`);
        if ([...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_LIVE, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_END].includes((_a3 = item == null ? void 0 : item.status) == null ? void 0 : _a3.toString())) {
          _push(`<!--[--><span class="team-home-f" data-v-b6e22041>${ssrInterpolate((_b3 = item == null ? void 0 : item.home_scores) == null ? void 0 : _b3[0])}</span> - <span class="team-away-f" data-v-b6e22041>${ssrInterpolate((_c2 = item == null ? void 0 : item.away_scores) == null ? void 0 : _c2[0])}</span><!--]-->`);
        } else {
          _push(`<!--[--> - <!--]-->`);
        }
        _push(`</b></span><br data-v-b6e22041></td><td data-v-b6e22041><span class="" data-v-b6e22041>${ssrInterpolate(("getValueByPositionWarehourse" in _ctx ? _ctx.getValueByPositionWarehourse : unref(getValueByPositionWarehourse))((_e2 = (_d2 = unref(OddsSeasonImain)) == null ? void 0 : _d2["i_match_id_" + (item == null ? void 0 : item.i_match_id)]) == null ? void 0 : _e2.initial, 0))}</span></td><td class="" data-v-b6e22041>${ssrInterpolate(("getValueByPositionWarehourse" in _ctx ? _ctx.getValueByPositionWarehourse : unref(getValueByPositionWarehourse))((_g2 = (_f2 = unref(OddsSeasonImain)) == null ? void 0 : _f2["i_match_id_" + (item == null ? void 0 : item.i_match_id)]) == null ? void 0 : _g2.initial, 1))}</td><td class="" data-v-b6e22041>${ssrInterpolate(("getValueByPositionWarehourse" in _ctx ? _ctx.getValueByPositionWarehourse : unref(getValueByPositionWarehourse))((_i2 = (_h2 = unref(OddsSeasonImain)) == null ? void 0 : _h2["i_match_id_" + (item == null ? void 0 : item.i_match_id)]) == null ? void 0 : _i2.initial, 2))}</td><td data-v-b6e22041>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + (item == null ? void 0 : item.id), query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).H2H } },
          title: "Ph\xE2n t\xEDch",
          class: "analyze-icon me-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="analyze-icon l0" data-v-b6e22041${_scopeId}><i class="icon iconfont icon-analysis" title="Ph\xE2n t\xEDch" data-v-b6e22041${_scopeId}></i></span>`);
            } else {
              return [
                createVNode("span", { class: "analyze-icon l0" }, [
                  createVNode("i", {
                    class: "icon iconfont icon-analysis",
                    title: "Ph\xE2n t\xEDch"
                  })
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: { path: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).MATCH_DETAIL + (item == null ? void 0 : item.id), query: { tab: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS, type: ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP } }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="odds-icon" title="Chi ti\u1EBFt k\xE8o" data-v-b6e22041${_scopeId}><i class="icon iconfont icon-odds" data-v-b6e22041${_scopeId}></i></span>`);
            } else {
              return [
                createVNode("span", {
                  class: "odds-icon",
                  title: "Chi ti\u1EBFt k\xE8o"
                }, [
                  createVNode("i", { class: "icon iconfont icon-odds" })
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td><td data-v-b6e22041><b data-v-b6e22041>`);
        if ([...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_LIVE, ...("LIVESCORE_STATUS" in _ctx ? _ctx.LIVESCORE_STATUS : unref(LIVESCORE_STATUS)).IS_END].includes((_j2 = item == null ? void 0 : item.status) == null ? void 0 : _j2.toString())) {
          _push(`<!--[--><span class="team-home-f" data-v-b6e22041>${ssrInterpolate((_k2 = item == null ? void 0 : item.home_scores) == null ? void 0 : _k2[1])}</span> - <span class="team-away-f" data-v-b6e22041>${ssrInterpolate((_l2 = item == null ? void 0 : item.away_scores) == null ? void 0 : _l2[1])}</span><!--]-->`);
        } else {
          _push(`<!--[--> - <!--]-->`);
        }
        _push(`</b></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
      if (((_m = unref(matchsBySeason)) == null ? void 0 : _m.length) > 0) {
        _push(`<div class="rankbox" data-v-b6e22041></div>`);
      } else {
        _push(`<p id="leaBtm" data-v-b6e22041>Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u</p>`);
      }
      _push(`</div>`);
      if (((_n = unref(playerBestLinup)) == null ? void 0 : _n.length) > 0) {
        _push(`<div id="matchBox" class="mt-3 overflow-hidden" data-v-b6e22041><div class="playsTitle" data-v-b6e22041>\u0110\u1ED9i h\xECnh t\u1ED1t nh\u1EA5t</div><div class="plays" data-v-b6e22041><div class="home five" data-v-b6e22041><!--[-->`);
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/league/schedule-[league_id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Schedule = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b6e22041"]]);

export { Schedule as default };
//# sourceMappingURL=schedule-_league_id_-BR58dBG5.mjs.map
