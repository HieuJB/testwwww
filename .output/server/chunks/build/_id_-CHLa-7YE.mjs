import { _ as __nuxt_component_0 } from './HeaderComponent-DbPuztAv.mjs';
import { u as useRoute, a as useState, b as useCookie, n as navigateTo, d as useHead } from './server.mjs';
import { defineComponent, ref, watch, computed, withAsyncContext, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { M as MATCH_TAB, a as MATCH_ODD_TAB } from './constants-DJp0NbxW.mjs';
import { g as getConfig } from './helper-CGhdpGxz.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { R as ROUTERS, A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { g as generateMetaSeo } from './livescore_helper-4bdWaxk-.mjs';
import { u as useAsyncData, a as useFetch } from './fetch-CC0zbYw2.mjs';
import { c as createUrl } from './createUrl-DyOxdY5I.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useMatchStore } from './useMatchStore-Dgc_MSrX.mjs';
import _sfc_main$5 from './_match_id_-B-CzY3G3.mjs';
import H2h from './h2h-_match_id_-DnTE4_qf.mjs';
import Oddscomp from './_match_id_-Bi2yLpen.mjs';
import Odds1x2 from './_match_id_-DgBn2GK_.mjs';
import _sfc_main$1 from './_match_id_-aorvxJwD.mjs';
import _sfc_main$2 from './_match_id_-BbXRf1T_.mjs';
import CorrectScoreOdds from './_match_id_-BDpnHR3K.mjs';
import DoubleChanceOdds from './_match_id_-ChAASbBf.mjs';
import EuroHandicapOdds from './_match_id_-DUS0qPUp.mjs';
import _sfc_main$3 from './_match_id_-C98MNxp6.mjs';
import _sfc_main$4 from './player-statistics-BPdKMXL2.mjs';
import { useDebounceFn } from '@vueuse/core';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import './BaseImage-oG5tRcgk.mjs';
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
import './server-placeholder-BFzIFO-1.mjs';
import './wsocket-BREvIJI8.mjs';
import './formatters-C2E2Vg5w.mjs';
import './virtual_public-5pavRNUp.mjs';
import 'echarts/core';
import 'echarts/components';
import 'echarts/charts';
import 'echarts/renderers';
import 'vuedraggable';
import './TabTableMobile-Bxqz4q-j.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    let __temp, __restore;
    const matchStore = useMatchStore();
    const route = useRoute();
    const tab = ref(((_a = route == null ? void 0 : route.query) == null ? void 0 : _a.tab) || "");
    const type = ref(((_b = route == null ? void 0 : route.query) == null ? void 0 : _b.type) || MATCH_TAB.ODDSCOMP);
    const eventSocketData = ref();
    const homeTeamId = ref(null);
    const isHidden = useState("my-shallow-state");
    if (tab.value === MATCH_TAB.ODDS && !((_d = MATCH_ODD_TAB) == null ? void 0 : _d[(_c = type.value) == null ? void 0 : _c.toUpperCase()])) {
      type.value = MATCH_TAB.ODDSCOMP;
    }
    const socketData = (wssItem) => {
      eventSocketData.value = wssItem;
    };
    watch(
      () => route == null ? void 0 : route.query,
      () => {
        var _a2, _b2, _c2, _d2;
        tab.value = ((_a2 = route == null ? void 0 : route.query) == null ? void 0 : _a2.tab) || "";
        type.value = ((_b2 = route == null ? void 0 : route.query) == null ? void 0 : _b2.type) || MATCH_TAB.ODDS;
        if (tab.value === MATCH_TAB.ODDS && !((_d2 = MATCH_ODD_TAB) == null ? void 0 : _d2[(_c2 = type.value) == null ? void 0 : _c2.toUpperCase()])) {
          type.value = MATCH_TAB.ODDSCOMP;
        }
      },
      { immediate: true }
    );
    const initKeySeo = computed(() => {
      const getSeoData = (suffix) => ({
        title: `MATCH_TITLE_${suffix}`,
        description: `MATCH_DESCRIPTION_${suffix}`,
        keyword: `MATCH_KEYWORD_${suffix}`,
        content: `MATCH_CONTENT_${suffix}`,
        tab: suffix.toLowerCase()
      });
      const suffixMap = {
        [MATCH_TAB.H2H]: "H2H",
        [MATCH_TAB.STATISTICAL]: "PLAYERTECH",
        [MATCH_TAB.DETAIL]: "DETAIL",
        [MATCH_TAB.ODDS]: String(route.query.type).toUpperCase()
      };
      if (tab.value) {
        return getSeoData(suffixMap[tab.value] || "");
      }
      return getSeoData(suffixMap[MATCH_TAB.DETAIL]);
    });
    const initDataMatch = ref([]);
    const settingsData = useCookie("settingsData");
    const storeSystems = systemsStore();
    const timeZone = ref(
      getConfig(storeSystems == null ? void 0 : storeSystems.configurations, "TIMEZONE") || ((_e = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _e.timeZone)
    );
    const seoMeta = ref({
      title: "",
      description: "",
      keyword: "",
      content: ""
    });
    const fetchMatchsRecentDetail = async () => {
      var _a2;
      try {
        const resData = await useApiLiveScore(
          API_ROUTERS.LIVESCORE.MATCHS_RECENT_DETAIL + "?match_id=" + ((_a2 = route == null ? void 0 : route.params) == null ? void 0 : _a2.id)
        );
        if (!resData || (resData == null ? void 0 : resData.length) === 0) {
          return navigateTo(ROUTERS.HOMEPAGE, { redirectCode: 301 });
        }
        return resData;
      } catch (e) {
        return null;
      }
    };
    const setObjectMeta = async (payload, resData) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j, _k, _l;
      try {
        const timeZoneTitle = timeZone.value;
        let title = resData == null ? void 0 : resData.title;
        let description = resData == null ? void 0 : resData.meta_description;
        if (!title || title == "") {
          title = getConfig(
            storeSystems.configurations,
            initKeySeo.value.title
          ) || tab.value === MATCH_TAB.ODDS && getConfig(storeSystems.configurations, "MATCH_TITLE_ODDSCOMP") || getConfig(storeSystems.configurations, "SEO_META_TITLE");
          title = generateMetaSeo(
            title,
            (_a2 = payload.home_team) == null ? void 0 : _a2.name,
            (_b2 = payload.away_team) == null ? void 0 : _b2.name,
            payload.match_time,
            timeZoneTitle,
            (_c2 = payload.competition) == null ? void 0 : _c2.name
          );
        }
        if (!description || description == "") {
          description = getConfig(
            storeSystems.configurations,
            initKeySeo.value.description
          ) || tab.value === MATCH_TAB.ODDS && getConfig(storeSystems.configurations, "MATCH_DESCRIPTION_ODDSCOMP") || getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION");
          description = generateMetaSeo(
            description,
            (_d2 = payload.home_team) == null ? void 0 : _d2.name,
            (_e2 = payload.away_team) == null ? void 0 : _e2.name,
            payload.match_time,
            timeZoneTitle,
            (_f2 = payload.competition) == null ? void 0 : _f2.name
          );
        }
        let keyword = resData == null ? void 0 : resData.keyword;
        if (!keyword || keyword == "") {
          keyword = getConfig(
            storeSystems.configurations,
            initKeySeo.value.keyword
          ) || tab.value === MATCH_TAB.ODDS && getConfig(storeSystems.configurations, "MATCH_KEYWORD_ODDSCOMP") || "";
          keyword = generateMetaSeo(
            keyword,
            (_g2 = payload.home_team) == null ? void 0 : _g2.name,
            (_h2 = payload.away_team) == null ? void 0 : _h2.name,
            payload.match_time,
            timeZoneTitle,
            (_i2 = payload.competition) == null ? void 0 : _i2.name
          );
        }
        let content = resData == null ? void 0 : resData.content;
        if (!content || content == "") {
          content = getConfig(
            storeSystems.configurations,
            initKeySeo.value.content
          ) || tab.value === MATCH_TAB.ODDS && getConfig(storeSystems.configurations, "MATCH_CONTENT_ODDSCOMP") || "";
          content = generateMetaSeo(
            content,
            (_j = payload.home_team) == null ? void 0 : _j.name,
            (_k = payload.away_team) == null ? void 0 : _k.name,
            payload.match_time,
            timeZoneTitle,
            (_l = payload.competition) == null ? void 0 : _l.name
          );
          seoMeta.value.title = title;
          seoMeta.value.description = description;
          seoMeta.value.keyword = keyword;
          seoMeta.value.content = content;
        }
      } catch (e) {
        console.log(e);
      }
    };
    const fetchObjectMeta = async () => {
      try {
        const resData = await useFetch(
          createUrl(API_ROUTERS.OBJECTS_META.DETAIL + "/" + route.params.id, {
            query: {
              type: "match",
              tab: initKeySeo.value.tab
            }
          }),
          "$Rwr9iQmWHe"
        );
        return resData.data.value;
      } catch (e) {
        return null;
      }
    };
    const { data } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("match", async () => {
      try {
        const [match, seo] = await Promise.all([
          fetchMatchsRecentDetail(),
          fetchObjectMeta()
        ]);
        return {
          match,
          seo
        };
      } catch (e) {
        return null;
      }
    })), __temp = await __temp, __restore(), __temp);
    if ((_g = (_f = data == null ? void 0 : data.value) == null ? void 0 : _f.match) == null ? void 0 : _g[0]) {
      initDataMatch.value = (_h = data == null ? void 0 : data.value) == null ? void 0 : _h.match;
      setObjectMeta(initDataMatch.value[0], (_i = data.value) == null ? void 0 : _i.seo);
    } else {
      navigateTo(ROUTERS.HOMEPAGE, { redirectCode: 301 });
    }
    const wssMatch = (socketData2) => {
      try {
        if (socketData2) {
          eventSocketData.value = socketData2;
        }
      } catch (e) {
        return false;
      }
    };
    watch(
      matchStore,
      () => {
        wssMatch(matchStore == null ? void 0 : matchStore.socketData);
      },
      { deep: true, immediate: true }
    );
    useHead({
      title: () => seoMeta.value.title,
      meta: [
        { name: "description", content: () => seoMeta.value.description },
        { property: "og:title", content: () => seoMeta.value.title },
        { property: "og:description", content: () => seoMeta.value.description },
        { name: "keywords", content: () => seoMeta.value.keyword }
      ]
    });
    const handleChangeTab = useDebounceFn(async () => {
      const data2 = await fetchObjectMeta();
      setObjectMeta(initDataMatch.value[0], data2);
    }, 1);
    watch(
      () => route.query.tab,
      () => {
        handleChangeTab();
      }
    );
    watch(
      () => route.query.type,
      () => {
        handleChangeTab();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
      const _component_HeaderComponent = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "info",
        class: ["match-detail", { container: !unref(isHidden) }]
      }, _attrs))}><div id="matchData">`);
      if ((_b2 = (_a2 = unref(initDataMatch)) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.id) {
        _push(ssrRenderComponent(_component_HeaderComponent, {
          modelValue: unref(homeTeamId),
          "onUpdate:modelValue": ($event) => isRef(homeTeamId) ? homeTeamId.value = $event : null,
          "socket-data": unref(eventSocketData),
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (((_d2 = (_c2 = unref(initDataMatch)) == null ? void 0 : _c2[0]) == null ? void 0 : _d2.id) && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).H2H) {
        _push(ssrRenderComponent(H2h, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_f2 = (_e2 = unref(initDataMatch)) == null ? void 0 : _e2[0]) == null ? void 0 : _f2.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDSCOMP && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(Oddscomp, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_h2 = (_g2 = unref(initDataMatch)) == null ? void 0 : _g2[0]) == null ? void 0 : _h2.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS_1X2 && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(Odds1x2, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_j = (_i2 = unref(initDataMatch)) == null ? void 0 : _i2[0]) == null ? void 0 : _j.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ASIAN_HANDICAP_ODDS && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(_sfc_main$1, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_l = (_k = unref(initDataMatch)) == null ? void 0 : _k[0]) == null ? void 0 : _l.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORNER_OU_ODDS && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(_sfc_main$2, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_n = (_m = unref(initDataMatch)) == null ? void 0 : _m[0]) == null ? void 0 : _n.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).CORRECT_SCORE_ODDS && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(CorrectScoreOdds, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_p = (_o = unref(initDataMatch)) == null ? void 0 : _o[0]) == null ? void 0 : _p.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).DOUBLE_CHANCE_ODDS && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(DoubleChanceOdds, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_r = (_q = unref(initDataMatch)) == null ? void 0 : _q[0]) == null ? void 0 : _r.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).EURO_HANDICAP_ODDS && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(EuroHandicapOdds, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_t = (_s = unref(initDataMatch)) == null ? void 0 : _s[0]) == null ? void 0 : _t.id) && unref(type) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).OVER_UNDER_ODDS && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).ODDS) {
        _push(ssrRenderComponent(_sfc_main$3, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else if (((_v = (_u = unref(initDataMatch)) == null ? void 0 : _u[0]) == null ? void 0 : _v.id) && unref(tab) === ("MATCH_TAB" in _ctx ? _ctx.MATCH_TAB : unref(MATCH_TAB)).STATISTICAL) {
        _push(ssrRenderComponent(_sfc_main$4, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          modelValue: unref(homeTeamId),
          "onUpdate:modelValue": ($event) => isRef(homeTeamId) ? homeTeamId.value = $event : null
        }, null, _parent));
      } else if ((_x = (_w = unref(initDataMatch)) == null ? void 0 : _w[0]) == null ? void 0 : _x.id) {
        _push(ssrRenderComponent(_sfc_main$5, {
          matchTitle: unref(seoMeta).title,
          "onUpdate:matchTitle": ($event) => unref(seoMeta).title = $event,
          matchContent: unref(seoMeta).content,
          "onUpdate:matchContent": ($event) => unref(seoMeta).content = $event,
          initDataMatch: unref(initDataMatch),
          "onUpdate:initDataMatch": ($event) => isRef(initDataMatch) ? initDataMatch.value = $event : null,
          onSocketData: socketData
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span id="allCornerDate"></span></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/match/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CHLa-7YE.mjs.map
