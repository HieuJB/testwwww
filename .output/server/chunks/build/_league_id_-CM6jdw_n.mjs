import { _ as __nuxt_component_0 } from './server-placeholder-BFzIFO-1.mjs';
import { u as useRoute, d as useHead, v as showError } from './server.mjs';
import { defineComponent, ref, watch, withAsyncContext, mergeProps, unref, useSSRContext, nextTick } from 'vue';
import { W as WAREHOUSE_LEAGUE_TAB } from './constants-DJp0NbxW.mjs';
import { u as useShareLeague } from './useShareLeague-D0Pb7jdL.mjs';
import { u as useAsyncData, a as useFetch } from './fetch-CC0zbYw2.mjs';
import { c as createUrl } from './createUrl-DyOxdY5I.mjs';
import { A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { g as getConfig } from './helper-CGhdpGxz.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import Schedule from './schedule-_league_id_-BR58dBG5.mjs';
import Standings from './standings-_league_id_-LsRM1Nin.mjs';
import { N as generateCompetitionMetaSeo } from './livescore_helper-4bdWaxk-.mjs';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
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
import './BaseImage-oG5tRcgk.mjs';
import './NuxtImg-z5Tschba.mjs';
import './HeaderLeagueComponent-BOzNxgdw.mjs';
import './moment_helper-C2kP4D4M.mjs';
import 'moment-timezone';
import 'crypto-js';
import 'pako';
import 'buffer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[league_id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a2;
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    let __temp, __restore;
    const storeSystems = systemsStore();
    const route = useRoute();
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
              type: "competition"
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
      var _a3, _b3, _c3, _d3, _e3, _f3, _g3, _h3, _i3, _j3, _k3, _l3;
      var _a22, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2;
      try {
        let title = (_b2 = (_a22 = resData == null ? void 0 : resData.data) == null ? void 0 : _a22._value) == null ? void 0 : _b2.title;
        let description = (_d2 = (_c2 = resData == null ? void 0 : resData.data) == null ? void 0 : _c2._value) == null ? void 0 : _d2.meta_description;
        if (!title || title == "") {
          title = (_a3 = getConfig(storeSystems.configurations, "COMPETITION_TITLE_" + ((_e2 = tab.value) == null ? void 0 : _e2.toUpperCase()))) != null ? _a3 : getConfig(storeSystems.configurations, "COMPETITION_TITLE") ? getConfig(storeSystems.configurations, "COMPETITION_TITLE") : getConfig(storeSystems.configurations, "SEO_META_TITLE");
          title = generateCompetitionMetaSeo(
            title,
            (_c3 = (_b3 = competitionDetail2 == null ? void 0 : competitionDetail2.name_vi_overwrite) != null ? _b3 : competitionDetail2 == null ? void 0 : competitionDetail2.name_vi) != null ? _c3 : competitionDetail2 == null ? void 0 : competitionDetail2.name
          );
        }
        if (!description || description == "") {
          description = (_d3 = getConfig(storeSystems.configurations, "COMPETITION_DESCRIPTION_" + ((_f2 = tab.value) == null ? void 0 : _f2.toUpperCase()))) != null ? _d3 : getConfig(
            storeSystems.configurations,
            "COMPETITION_DESCRIPTION"
          ) ? getConfig(storeSystems.configurations, "COMPETITION_DESCRIPTION") : getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION");
          description = generateCompetitionMetaSeo(
            description,
            (_f3 = (_e3 = competitionDetail2 == null ? void 0 : competitionDetail2.name_vi_overwrite) != null ? _e3 : competitionDetail2 == null ? void 0 : competitionDetail2.name_vi) != null ? _f3 : competitionDetail2 == null ? void 0 : competitionDetail2.name
          );
        }
        let keyword = (_h2 = (_g2 = resData == null ? void 0 : resData.data) == null ? void 0 : _g2._value) == null ? void 0 : _h2.keyword;
        if (!keyword || keyword == "") {
          keyword = (_g3 = getConfig(storeSystems.configurations, "COMPETITION_KEYWORD_" + ((_i2 = tab.value) == null ? void 0 : _i2.toUpperCase()))) != null ? _g3 : getConfig(storeSystems.configurations, "COMPETITION_KEYWORD") ? getConfig(storeSystems.configurations, "COMPETITION_KEYWORD") : "";
          keyword = generateCompetitionMetaSeo(
            keyword,
            (_i3 = (_h3 = competitionDetail2 == null ? void 0 : competitionDetail2.name_vi_overwrite) != null ? _h3 : competitionDetail2 == null ? void 0 : competitionDetail2.name_vi) != null ? _i3 : competitionDetail2 == null ? void 0 : competitionDetail2.name
          );
        }
        let content = (_k2 = (_j2 = resData == null ? void 0 : resData.data) == null ? void 0 : _j2._value) == null ? void 0 : _k2.content;
        if (!content || content == "") {
          content = (_j3 = getConfig(storeSystems.configurations, "COMPETITION_CONTENT_" + ((_l2 = tab.value) == null ? void 0 : _l2.toUpperCase()))) != null ? _j3 : getConfig(storeSystems.configurations, "COMPETITION_CONTENT");
          content = generateCompetitionMetaSeo(
            content,
            (_l3 = (_k3 = competitionDetail2 == null ? void 0 : competitionDetail2.name_vi_overwrite) != null ? _k3 : competitionDetail2 == null ? void 0 : competitionDetail2.name_vi) != null ? _l3 : competitionDetail2 == null ? void 0 : competitionDetail2.name
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
          comp_id: compId.value
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
        []
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
    } else {
      showError({
        statusCode: 404,
        statusMessage: "Gi\u1EA3i \u0111\u1EA5u kh\xF4ng t\u1ED3n t\u1EA1i!"
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
      _push(`<div id="content-page" class="mt-5">`);
      if (unref(leagueContent)) {
        _push(`<div height="21" colspan="15" id="th_information"><div align="center" class="write"><strong>Th\xF4ng tin gi\u1EA3i \u0111\u1EA5u</strong></div></div>`);
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
//# sourceMappingURL=_league_id_-CM6jdw_n.mjs.map
