import { _ as _sfc_main$1 } from './BaseImage-oG5tRcgk.mjs';
import { _ as _sfc_main$2 } from './HeaderLeagueComponent-BOzNxgdw.mjs';
import { _ as _export_sfc, u as useRoute, f as __nuxt_component_0$2 } from './server.mjs';
import { useSSRContext, defineComponent, ref, watch, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { I as ISPORT_COMPANY_DEFAULT, T as TABLE_STANDING_LIST } from './constants-DJp0NbxW.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { b as ROUTER_TEAM_NAME, A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { a as getLiveScoreImage, P as getLastResult } from './livescore_helper-4bdWaxk-.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
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
import './moment_helper-C2kP4D4M.mjs';
import 'moment-timezone';
import './helper-CGhdpGxz.mjs';
import 'crypto-js';
import 'pako';
import 'buffer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "standings-[league_id]",
  __ssrInlineRender: true,
  props: {
    compDetail: {},
    title: {}
  },
  setup(__props) {
    var _a, _b, _c;
    const route = useRoute();
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
              item.lastest = getLastResult(lastest, item.team_info.team_id);
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
    watch(
      () => props == null ? void 0 : props.compDetail,
      async () => {
        var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
        competitionDetail.value = props == null ? void 0 : props.compDetail;
        if (!curSeasonId.value) {
          curSeasonId.value = (_a2 = competitionDetail.value) == null ? void 0 : _a2.cur_season_id;
        }
        if (!((_c2 = (_b2 = competitionDetail.value) == null ? void 0 : _b2.seasons_stages) == null ? void 0 : _c2.find((item) => item.season_id === curSeasonId.value))) {
          curSeasonId.value = (_f = (_e = (_d = competitionDetail.value) == null ? void 0 : _d.seasons_stages) == null ? void 0 : _e[0]) == null ? void 0 : _f.season_id;
        }
        compSeason.value = competitionDetail.value || [];
        compId.value = (_g = competitionDetail.value) == null ? void 0 : _g.id;
        roundCount.value = (_h = competitionDetail.value) == null ? void 0 : _h.round_count;
        curRound.value = (_i = competitionDetail.value) == null ? void 0 : _i.cur_round;
        curStageId.value = (_j = competitionDetail.value) == null ? void 0 : _j.cur_stage_id;
        stagesList.value = (_m = (_l = (_k = competitionDetail.value) == null ? void 0 : _k.seasons_stages) == null ? void 0 : _l.find((item) => item.season_id === curSeasonId.value)) == null ? void 0 : _m.stages;
        if (curSeasonId.value != ((_n = competitionDetail.value) == null ? void 0 : _n.cur_season_id)) {
          curStageId.value = (_p = (_o = stagesList.value) == null ? void 0 : _o[0]) == null ? void 0 : _p.id;
        }
        if (compId.value) {
          await fetchMatchesBySeason();
          await fetchSeasonsTable();
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d, _e;
      const _component_BaseImage = _sfc_main$1;
      const _component_HeaderLeagueComponent = _sfc_main$2;
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<!--[--><div class="info_title" id="InfoTitle" data-v-659ea2d0><div class="info_title_left" id="TitleLeft" data-v-659ea2d0><div class="img" data-v-659ea2d0>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))((_a2 = unref(competitionDetail)) == null ? void 0 : _a2.logo_o, "competition") + "!h50",
        loading: "lazy",
        alt: ""
      }, null, _parent));
      _push(`</div><h1 data-v-659ea2d0>${ssrInterpolate(props == null ? void 0 : props.title)}</h1>`);
      if (((_c2 = (_b2 = unref(compSeason)) == null ? void 0 : _b2.seasons_stages) == null ? void 0 : _c2.length) > 0) {
        _push(`<div class="selectbox" data-v-659ea2d0><select name="seasonList" id="seasonList" data-v-659ea2d0><!--[-->`);
        ssrRenderList((_d = unref(compSeason)) == null ? void 0 : _d.seasons_stages, (item, index) => {
          _push(`<option${ssrRenderAttr("value", item == null ? void 0 : item.season_id)} data-v-659ea2d0>${ssrInterpolate(item == null ? void 0 : item.season_years)}</option>`);
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
      _push(`<div class="data mb-3" data-v-659ea2d0><div style="${ssrRenderStyle({ "clear": "both" })}" data-v-659ea2d0></div><div class="tdsolid" id="ScoreGroupDiv" style="${ssrRenderStyle({ "display": "block" })}" data-v-659ea2d0>`);
      if (((_e = unref(seasonTableStandingList)) == null ? void 0 : _e.length) > 0) {
        _push(`<div class="rankbox" data-v-659ea2d0><table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="${ssrRenderStyle({ "float": "left", "min-width": "135px" })}" data-v-659ea2d0><tbody data-v-659ea2d0><!--[-->`);
        ssrRenderList(unref(seasonTableStandingList), (item, index) => {
          var _a3, _b3, _c3, _d2, _e2;
          _push(`<!--[--><tr align="center" data-v-659ea2d0><th class="groupTitle table-bd-lr" title="X\xEA\u0301p ha\u0323ng" data-v-659ea2d0>XH</th>`);
          if (((_a3 = unref(seasonTableStandingList)) == null ? void 0 : _a3.length) > 1) {
            _push(`<th class="groupTitle league-name" colspan="2"${ssrRenderAttr("title", `${(_b3 = item == null ? void 0 : item.stage_info) == null ? void 0 : _b3.stage_name}-${(_c3 = "TABLE_STANDING_LIST" in _ctx ? _ctx.TABLE_STANDING_LIST : unref(TABLE_STANDING_LIST)) == null ? void 0 : _c3[item == null ? void 0 : item.group]}`)} data-v-659ea2d0><span data-v-659ea2d0>${ssrInterpolate((_d2 = item == null ? void 0 : item.stage_info) == null ? void 0 : _d2.stage_name)}</span> - ${ssrInterpolate((_e2 = "TABLE_STANDING_LIST" in _ctx ? _ctx.TABLE_STANDING_LIST : unref(TABLE_STANDING_LIST)) == null ? void 0 : _e2[item == null ? void 0 : item.group])}</th>`);
          } else {
            _push(`<th class="groupTitle" colspan="2" data-v-659ea2d0>\u0110\u1ED9i</th>`);
          }
          _push(`</tr><!--[-->`);
          ssrRenderList(item == null ? void 0 : item.rows, (row, row_index) => {
            _push(`<tr align="center" data-v-659ea2d0><td width="44" class="table-bd-lr"${ssrRenderAttr("bgcolor", row == null ? void 0 : row.promotion_color)} data-v-659ea2d0>${ssrInterpolate(row == null ? void 0 : row.position)}</td><td style="${ssrRenderStyle({ "text-align": "left", "width": "338px", "padding-left": "2px" })}" class="league-name"${ssrRenderAttr("title", row.team_info.team_name)} data-v-659ea2d0>`);
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
        _push(`<!--]--></tbody></table><div class="rankdata" width="75%" data-v-659ea2d0><table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" data-v-659ea2d0><tbody data-v-659ea2d0><!--[-->`);
        ssrRenderList(unref(seasonTableStandingList), (item, index) => {
          _push(`<!--[--><tr align="center" data-v-659ea2d0><th class="groupTabTitle groupTitle" data-v-659ea2d0>T\u1EA5t c\u1EA3</th><th class="groupTabTitle groupTitle" data-v-659ea2d0>Th\u1EAFng</th><th class="groupTabTitle groupTitle" data-v-659ea2d0>H\xF2a</th><th class="groupTabTitle groupTitle" data-v-659ea2d0>B\u1EA1i</th><th class="groupTabTitle groupTitle" title="B\xE0n th\u1EAFng" data-v-659ea2d0>BT</th><th class="groupTabTitle groupTitle" title="B\xE0n thua" data-v-659ea2d0>BB</th><th class="groupTabTitle groupTitle" style="${ssrRenderStyle({ "width": "100px" })}" data-v-659ea2d0>C\xE1ch bi\u1EC7t</th><th class="groupTabTitle groupTitle" data-v-659ea2d0>\u0110i\u1EC3m</th><th class="groupTabTitle groupTitle last-match" data-v-659ea2d0>6 tr\u1EADn g\u1EA7n \u0111\xE2y</th></tr><!--[-->`);
          ssrRenderList(item == null ? void 0 : item.rows, (row, row_index) => {
            var _a3;
            _push(`<tr align="center" data-v-659ea2d0><td data-v-659ea2d0>${ssrInterpolate(row == null ? void 0 : row.total)}</td><td data-v-659ea2d0>${ssrInterpolate(row == null ? void 0 : row.won)}</td><td data-v-659ea2d0>${ssrInterpolate(row == null ? void 0 : row.draw)}</td><td data-v-659ea2d0>${ssrInterpolate(row == null ? void 0 : row.loss)}</td><td data-v-659ea2d0>${ssrInterpolate(row == null ? void 0 : row.points)}</td><td data-v-659ea2d0>${ssrInterpolate(row == null ? void 0 : row.goals_against)}</td><td data-v-659ea2d0>${ssrInterpolate(row == null ? void 0 : row.goal_diff)}</td><td class="bg-lgreen" data-v-659ea2d0>${ssrInterpolate(row == null ? void 0 : row.points)}</td><td style="${ssrRenderStyle({ "text-align": "left" })}" data-v-659ea2d0>${(_a3 = row == null ? void 0 : row.lastest) != null ? _a3 : ""}</td></tr>`);
          });
          _push(`<!--]--><!--]-->`);
        });
        _push(`<!--]--></tbody></table></div></div>`);
      } else {
        _push(`<p id="leaBtm" data-v-659ea2d0>Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u</p>`);
      }
      _push(`<p class="text-center promotions" data-v-659ea2d0><!--[-->`);
      ssrRenderList(unref(promotions), (promotion, index) => {
        _push(`<span style="${ssrRenderStyle({ "text-wrap": "nowrap" })}" data-v-659ea2d0><span style="${ssrRenderStyle([{ "color": "#FF9966", "font-size": "20px" }, `color:${promotion == null ? void 0 : promotion.color}`])}" class="ms-3" data-v-659ea2d0>\u25A0</span> ${ssrInterpolate(promotion == null ? void 0 : promotion.name)}</span>`);
      });
      _push(`<!--]--></p></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/league/standings-[league_id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Standings = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-659ea2d0"]]);

export { Standings as default };
//# sourceMappingURL=standings-_league_id_-LsRM1Nin.mjs.map
