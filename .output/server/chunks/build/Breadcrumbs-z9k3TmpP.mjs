import { e as useRouter, u as useRoute, a as useState, f as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { u as useShareTeams } from './useShareTeams-D9VcFqox.mjs';
import { u as useShareLeague } from './useShareLeague-D0Pb7jdL.mjs';
import { R as ROUTERS, N as NAME_ROUTERS, b as ROUTER_TEAM_NAME, A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { B as BREADCRUMBS_MAP } from './constants-DJp0NbxW.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { a as useFetch } from './fetch-CC0zbYw2.mjs';
import { c as createUrl } from './createUrl-DyOxdY5I.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
import './helper-CGhdpGxz.mjs';
import '@vueuse/core';
import './systems-4bvS4IvZ.mjs';
import './livescore_helper-4bdWaxk-.mjs';
import './moment_helper-C2kP4D4M.mjs';
import 'moment-timezone';
import 'crypto-js';
import 'pako';
import 'buffer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Breadcrumbs",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const router = useRouter();
    const route = useRoute();
    const breadcrumbs = ref([]);
    const objectIdSlug = ref(((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.id) || "");
    const match = ref([]);
    const postDetail = ref([]);
    const competitionDetail = ref([]);
    const compDetail = ref([]);
    const tags = ref([]);
    const { info } = useShareTeams();
    useState("league-state");
    const { infoLeague } = useShareLeague();
    const updateBreadcrumbs = () => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j, _k, _l, _m, _n, _o;
      if (route.path === ROUTERS.HOMEPAGE) {
        breadcrumbs.value = [
          {
            label: "Trang ch\u1EE7",
            to: route.path,
            last: "on"
          }
        ];
      } else {
        const pathArray = router.currentRoute.value.path.split("/").filter(Boolean);
        const breadcrumbLength = pathArray.length;
        const breadcrumbArray = pathArray.map((path, index) => {
          var _a4, _b4, _c4, _d4, _e4, _f4, _g4, _h4;
          var _a3, _b3, _c3, _d3, _e3, _f3, _g3, _h3, _i3, _j2, _k2, _l2, _m2, _n2, _o2, _p, _q, _r;
          let fullPath = "/" + pathArray.slice(0, index + 1).join("/");
          let label = path.replace(/-/g, " ");
          if (fullPath === ROUTERS.FOOTBALL) {
            label = (_a4 = (_a3 = BREADCRUMBS_MAP) == null ? void 0 : _a3[label]) != null ? _a4 : label;
            fullPath = ROUTERS.HOMEPAGE;
          } else if (fullPath == null ? void 0 : fullPath.includes(ROUTERS.MATCH_DETAIL)) {
            label = ((_c3 = (_b3 = match.value) == null ? void 0 : _b3.home_team) == null ? void 0 : _c3.name) + " VS " + ((_e3 = (_d3 = match.value) == null ? void 0 : _d3.away_team) == null ? void 0 : _e3.name);
          } else if (fullPath == null ? void 0 : fullPath.includes(ROUTERS.MATCH)) {
            fullPath = ROUTERS.LEAGUES + "/" + ((_g3 = (_f3 = match.value) == null ? void 0 : _f3.competition) == null ? void 0 : _g3.id);
            label = (_i3 = (_h3 = match.value) == null ? void 0 : _h3.competition) == null ? void 0 : _i3.name;
          } else if ((_j2 = route.name) == null ? void 0 : _j2.includes(NAME_ROUTERS.DETAIL_NEWS)) {
            label = (_b4 = (_k2 = postDetail.value) == null ? void 0 : _k2.title) != null ? _b4 : label;
          } else if (fullPath == null ? void 0 : fullPath.includes(ROUTERS.LEAGUES)) {
            if (index > 0) {
              if (compDetail.value) {
                label = (_e4 = (_d4 = (_c4 = (_l2 = compDetail.value) == null ? void 0 : _l2.name_vi_overwrite) != null ? _c4 : (_m2 = compDetail.value) == null ? void 0 : _m2.name_vi) != null ? _d4 : (_n2 = compDetail.value) == null ? void 0 : _n2.name) != null ? _e4 : label;
              } else {
                label = "";
              }
            }
          }
          if (fullPath == null ? void 0 : fullPath.includes(ROUTERS.WAREHOUSE)) {
            label = "Kho d\u1EEF li\u1EC7u";
          } else if ((_o2 = route.path) == null ? void 0 : _o2.includes(ROUTERS.NEWS_TAG)) {
            if (fullPath == null ? void 0 : fullPath.includes(ROUTERS.NEWS_TAG + "/")) {
              label = (_f4 = (_p = tags.value) == null ? void 0 : _p.name) != null ? _f4 : label;
            } else {
              fullPath = ROUTERS.NEWS_PAGE;
              label = (_g4 = (_q = BREADCRUMBS_MAP) == null ? void 0 : _q[label]) != null ? _g4 : label;
            }
          } else {
            label = (_h4 = (_r = BREADCRUMBS_MAP) == null ? void 0 : _r[label]) != null ? _h4 : label;
          }
          return {
            label,
            to: fullPath,
            last: index + 1 === breadcrumbLength ? "on" : "off"
          };
        });
        if ((_a2 = route.name) == null ? void 0 : _a2.includes(NAME_ROUTERS.DETAIL_NEWS)) {
          const parents = [
            {
              label: "Trang ch\u1EE7",
              to: ROUTERS.HOMEPAGE,
              last: "off"
            }
          ];
          if (((_b2 = postDetail.value) == null ? void 0 : _b2.type) && ((_c2 = postDetail.value) == null ? void 0 : _c2.type) === "post") {
            parents.push(
              {
                label: (_f2 = (_e2 = (_d2 = postDetail.value) == null ? void 0 : _d2.post_brand_category) == null ? void 0 : _e2[0]) == null ? void 0 : _f2.name,
                to: ROUTERS.HOMEPAGE + ((_i2 = (_h2 = (_g2 = postDetail.value) == null ? void 0 : _g2.post_brand_category) == null ? void 0 : _h2[0]) == null ? void 0 : _i2.slug),
                last: "off"
              }
            );
          }
          breadcrumbs.value = [...parents, ...breadcrumbArray];
        } else if (((_j = route.name) == null ? void 0 : _j.includes(ROUTERS.NEWS_CATEGORY_NAME)) || ((_k = route.path) == null ? void 0 : _k.includes(ROUTERS.NEWS_PAGE)) || ((_l = route.name) == null ? void 0 : _l.includes(NAME_ROUTERS.LEAGUE)) || ((_m = route.name) == null ? void 0 : _m.includes(NAME_ROUTERS.DETAIL_LEAGUE)) || ((_n = route.path) == null ? void 0 : _n.includes(ROUTERS.WAREHOUSE))) {
          const parents = [{
            label: "Trang ch\u1EE7",
            to: ROUTERS.HOMEPAGE,
            last: "off"
          }];
          breadcrumbs.value = [...parents, ...breadcrumbArray];
        } else if ((_o = route.path) == null ? void 0 : _o.includes(ROUTERS.MATCH_DETAIL)) {
          const parents = [{
            label: "Trang ch\u1EE7",
            to: ROUTERS.HOMEPAGE,
            last: "off"
          }];
          breadcrumbs.value = [...parents, ...breadcrumbArray];
        } else if ([ROUTERS.TEAM, ROUTERS.COACH, ROUTERS.PLAYER, ROUTER_TEAM_NAME.TEAM, ROUTER_TEAM_NAME.PLAYER].some((item) => {
          var _a3;
          return (_a3 = route.fullPath) == null ? void 0 : _a3.includes(item);
        })) {
          if (route.fullPath.includes(ROUTER_TEAM_NAME.TEAM)) {
            if (route.params.id) {
              breadcrumbs.value = [
                {
                  label: "Trang ch\u1EE7",
                  to: ROUTERS.HOMEPAGE,
                  last: "off"
                },
                {
                  label: "Danh s\xE1ch \u0111\u1ED9i b\xF3ng",
                  to: `/${ROUTER_TEAM_NAME.TEAM}`,
                  last: "off"
                },
                {
                  label: `${competitionDetail.value}`,
                  last: "on"
                }
              ];
            } else {
              breadcrumbs.value = [
                {
                  label: "Trang ch\u1EE7",
                  to: ROUTERS.HOMEPAGE,
                  last: "off"
                },
                {
                  label: `Danh s\xE1ch \u0111\u1ED9i b\xF3ng`,
                  last: "on"
                }
              ];
            }
          } else if (route.fullPath.includes(ROUTER_TEAM_NAME.PLAYER)) {
            if (route.params.id) {
              breadcrumbs.value = [
                {
                  label: "Trang ch\u1EE7",
                  to: ROUTERS.HOMEPAGE,
                  last: "off"
                },
                {
                  label: "Danh s\xE1ch c\u1EA7u th\u1EE7",
                  to: `/${ROUTER_TEAM_NAME.PLAYER}`,
                  last: "off"
                },
                {
                  label: `${competitionDetail.value}`,
                  last: "on"
                }
              ];
            } else {
              breadcrumbs.value = [
                {
                  label: "Trang ch\u1EE7",
                  to: ROUTERS.HOMEPAGE,
                  last: "off"
                },
                {
                  label: "Danh s\xE1ch c\u1EA7u th\u1EE7",
                  last: "on"
                }
              ];
            }
          } else {
            breadcrumbs.value = [
              {
                label: "Trang ch\u1EE7",
                to: ROUTERS.HOMEPAGE,
                last: "off"
              },
              {
                label: `${competitionDetail.value}`,
                last: "on"
              }
            ];
          }
        } else {
          breadcrumbs.value = breadcrumbArray;
        }
      }
    };
    const fetchCompDetail = async (objectIdSlug2) => {
      compDetail.value = infoLeague.value;
      updateBreadcrumbs();
    };
    const fetchMatchsRecentDetail = async (objectIdSlug2) => {
      try {
        useApiLiveScore(
          API_ROUTERS.LIVESCORE.MATCHS_RECENT_DETAIL + "?match_id=" + objectIdSlug2
        ).then((resData) => {
          if (resData == null ? void 0 : resData[0]) {
            match.value = resData == null ? void 0 : resData[0];
            updateBreadcrumbs();
          } else
            return null;
        });
      } catch (e) {
        return null;
      }
    };
    const fetchDetailPost = async (postCode) => {
      try {
        useFetch(createUrl(API_ROUTERS.POST.SLUG + `?slug=` + postCode, {}), "$N0I3KNwXcV").then((resData) => {
          var _a2;
          postDetail.value = (_a2 = resData == null ? void 0 : resData.data) == null ? void 0 : _a2.value;
          updateBreadcrumbs();
        });
      } catch (e) {
      }
    };
    const fetchTag = async (postCode) => {
      try {
        useFetch(createUrl(API_ROUTERS.POST.TAG.SLUG + postCode, {}), "$9GI11cMxBw").then((resData) => {
          var _a2;
          tags.value = (_a2 = resData == null ? void 0 : resData.data) == null ? void 0 : _a2.value;
          updateBreadcrumbs();
        });
      } catch (e) {
      }
    };
    const fetchLineUpTeam = async () => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j, _k, _l, _m, _n, _o;
      try {
        if (((_c2 = (_b2 = (_a2 = info.value) == null ? void 0 : _a2.lineUpTeam) == null ? void 0 : _b2.team_info) == null ? void 0 : _c2.team_name) && route.fullPath.includes(ROUTERS.TEAM)) {
          competitionDetail.value = (_f2 = (_e2 = (_d2 = info.value) == null ? void 0 : _d2.lineUpTeam) == null ? void 0 : _e2.team_info) == null ? void 0 : _f2.team_name;
        } else if (((_i2 = (_h2 = (_g2 = info.value) == null ? void 0 : _g2.player) == null ? void 0 : _h2[0]) == null ? void 0 : _i2.name) && route.fullPath.includes(ROUTERS.PLAYER)) {
          competitionDetail.value = (_j = info.value.player) == null ? void 0 : _j[0].name;
        } else if (((_m = (_l = (_k = info.value) == null ? void 0 : _k.personalInfo) == null ? void 0 : _l[0]) == null ? void 0 : _m.name) && route.fullPath.includes(ROUTERS.COACH)) {
          competitionDetail.value = (_o = (_n = info.value) == null ? void 0 : _n.personalInfo) == null ? void 0 : _o[0].name;
        } else {
          competitionDetail.value = "";
        }
        updateBreadcrumbs();
      } catch (e) {
        console.log(e);
      }
    };
    if ((_b = route.path) == null ? void 0 : _b.includes(ROUTERS.MATCH_DETAIL)) {
      objectIdSlug.value = (_c = route == null ? void 0 : route.params) == null ? void 0 : _c.id;
      fetchMatchsRecentDetail(objectIdSlug.value);
    } else if ((_d = route.name) == null ? void 0 : _d.includes(NAME_ROUTERS.DETAIL_NEWS)) {
      objectIdSlug.value = (_e = route == null ? void 0 : route.params) == null ? void 0 : _e.news;
      fetchDetailPost(objectIdSlug.value);
    } else if ((_f = route.name) == null ? void 0 : _f.includes(NAME_ROUTERS.DETAIL_LEAGUE)) {
      objectIdSlug.value = (_g = route == null ? void 0 : route.params) == null ? void 0 : _g.league_id;
      fetchCompDetail(objectIdSlug.value);
    } else if ((_h = route.path) == null ? void 0 : _h.includes(ROUTERS.NEWS_TAG)) {
      objectIdSlug.value = (_i = route == null ? void 0 : route.params) == null ? void 0 : _i.tag;
      fetchTag(objectIdSlug.value);
    }
    watch(
      () => route.path,
      () => {
        var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
        if ((_a2 = route.path) == null ? void 0 : _a2.includes(ROUTERS.MATCH_DETAIL)) {
          objectIdSlug.value = ((_b2 = route == null ? void 0 : route.params) == null ? void 0 : _b2.id) || "";
          fetchMatchsRecentDetail(objectIdSlug.value);
        } else if ((_c2 = route.name) == null ? void 0 : _c2.includes(NAME_ROUTERS.DETAIL_NEWS)) {
          objectIdSlug.value = (_d2 = route == null ? void 0 : route.params) == null ? void 0 : _d2.news;
          fetchDetailPost(objectIdSlug.value);
        } else if ((_e2 = route.name) == null ? void 0 : _e2.includes(NAME_ROUTERS.DETAIL_LEAGUE)) {
          objectIdSlug.value = (_f2 = route == null ? void 0 : route.params) == null ? void 0 : _f2.league_id;
          fetchCompDetail(objectIdSlug.value);
        } else if ((_g2 = route.path) == null ? void 0 : _g2.includes(ROUTERS.NEWS_TAG)) {
          objectIdSlug.value = (_h2 = route == null ? void 0 : route.params) == null ? void 0 : _h2.tag;
          fetchTag(objectIdSlug.value);
        } else if ([ROUTERS.TEAM, ROUTERS.PLAYER, ROUTERS.CATEGORY, ROUTER_TEAM_NAME.TEAM, ROUTER_TEAM_NAME.PLAYER].some((item) => {
          var _a3;
          return (_a3 = route.path) == null ? void 0 : _a3.includes(item);
        })) {
          fetchLineUpTeam();
        } else {
          updateBreadcrumbs();
        }
      },
      { immediate: true }
    );
    watch(
      () => info.value && [ROUTERS.TEAM, ROUTERS.COACH, ROUTERS.PLAYER].some((item) => {
        var _a2;
        return (_a2 = route.fullPath) == null ? void 0 : _a2.includes(item);
      }),
      () => {
        fetchLineUpTeam();
      },
      { immediate: true, deep: true }
    );
    watch(
      () => {
        var _a2;
        return infoLeague.value && ((_a2 = route.name) == null ? void 0 : _a2.includes(NAME_ROUTERS.DETAIL_LEAGUE));
      },
      () => {
        fetchCompDetail(objectIdSlug.value);
      },
      { immediate: true, deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "crumbs container mb-4" }, _attrs))}><nav aria-label="breadcrumb" class="my-1"><ol class="breadcrumb"><!--[-->`);
      ssrRenderList(unref(breadcrumbs), (breadcrumb, index) => {
        _push(`<li class="breadcrumb-item on d-flex align-items-center">`);
        if (breadcrumb == null ? void 0 : breadcrumb.to) {
          _push(ssrRenderComponent(_component_nuxt_link, {
            target: breadcrumb == null ? void 0 : breadcrumb.target,
            to: breadcrumb == null ? void 0 : breadcrumb.to,
            class: breadcrumb == null ? void 0 : breadcrumb.last
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(String(breadcrumb == null ? void 0 : breadcrumb.label).includes("undefined") ? "" : breadcrumb == null ? void 0 : breadcrumb.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(String(breadcrumb == null ? void 0 : breadcrumb.label).includes("undefined") ? "" : breadcrumb == null ? void 0 : breadcrumb.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span>${ssrInterpolate(String(breadcrumb == null ? void 0 : breadcrumb.label).includes("undefined") ? "" : breadcrumb == null ? void 0 : breadcrumb.label)}</span>`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ol></nav></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Breadcrumbs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Breadcrumbs-z9k3TmpP.mjs.map
