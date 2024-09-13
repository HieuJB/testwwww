import { e as useRouter, d as useHead, f as __nuxt_component_0$2 } from './server.mjs';
import { g as getConfig } from './helper-CGhdpGxz.mjs';
import { defineComponent, ref, computed, withAsyncContext, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { d as SCREEN_WIDTH, L as LABEL_NEWS_READMORE, T as TABLE_STANDING_LIST, g as LIVESCORE_STATUS } from './constants-DJp0NbxW.mjs';
import { a as useFetch } from './fetch-CC0zbYw2.mjs';
import { R as ROUTERS, A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { c as createUrl } from './createUrl-DyOxdY5I.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { a as getLiveScoreImage, F as groupBy } from './livescore_helper-4bdWaxk-.mjs';
import { f as formatDateMomentUTCTimeZone, s as sortByTime } from './moment_helper-C2kP4D4M.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import moment from 'moment-timezone';
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
import 'crypto-js';
import 'pako';
import 'buffer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const CATEGORIES = {
      SWIPE: {
        SLUG: "swiperpost",
        LIMIT: 5
      },
      PREVIEW: {
        SLUG: "nhan-dinh",
        LIMIT: 4
      },
      NEWS_HOST: {
        SLUG: "tin-nong",
        LIMIT: 12
      },
      PHOTO: {
        SLUG: "anh-dep",
        LIMIT: 4
      },
      OTHER: {
        LIMIT: 6
      }
    };
    const storeSystems = systemsStore();
    const categoriesList = ref();
    ref();
    ref();
    ref();
    ref();
    ref();
    ref();
    ref();
    ref();
    const compsDataList = ref([]);
    const compOriginsList = ref([]);
    const compsListByKey = ref([]);
    const matchOriginsList = ref([]);
    const matchsList = ref([]);
    const compKeysList = ref([]);
    const renderTopList = ref([]);
    const compList = ref([]);
    const optionsListCompList = ref();
    const seasonTableStandingList = ref();
    const matchsListLength = ref(0);
    const title = ref();
    const description = ref();
    const pageContent = ref();
    const keyword = ref();
    ref([]);
    ref(1);
    ref(8);
    ref(0);
    const router = useRouter();
    ref([]);
    ref(false);
    ref();
    const imageSize = ref([]);
    const imagesSizeConfig = getConfig(storeSystems.configurations, "image_size");
    imageSize.value = imagesSizeConfig == null ? void 0 : imagesSizeConfig.split(",");
    const limitPostCategory = getConfig(storeSystems.configurations, "LIMIT_POST_CATEGORY") || CATEGORIES.OTHER.LIMIT;
    const screenWidth = ref(0);
    computed(() => {
      var _a, _b, _c;
      if (screenWidth.value < SCREEN_WIDTH.MD && ((_a = imageSize == null ? void 0 : imageSize.value) == null ? void 0 : _a.length) >= 1) {
        return imageSize.value[1];
      } else if (screenWidth.value >= SCREEN_WIDTH.MD && screenWidth.value < SCREEN_WIDTH.LG && ((_b = imageSize == null ? void 0 : imageSize.value) == null ? void 0 : _b.length) >= 2) {
        return imageSize.value[2];
      } else if (screenWidth.value >= SCREEN_WIDTH.LG && screenWidth.value < SCREEN_WIDTH.XXL && ((_c = imageSize == null ? void 0 : imageSize.value) == null ? void 0 : _c.length) >= 3) {
        return imageSize.value[3];
      } else {
        return "";
      }
    });
    const fetchPosts = async (categoryCode, limit) => {
      var _a;
      try {
        const { data } = await useFetch(API_ROUTERS.POST.LIST, {
          params: {
            category_code: categoryCode,
            limit
          }
        }, "$v1z7EKdfk2");
        return (_a = data == null ? void 0 : data.value) == null ? void 0 : _a.posts;
      } catch (e) {
        return [];
      }
    };
    const fetchCategories = async () => {
      var _a, _b, _c;
      try {
        const { data } = await useFetch(createUrl(API_ROUTERS.POST.CATEGORY.LIST), "$j0Kac2iFt0");
        if ((_a = data == null ? void 0 : data.value) == null ? void 0 : _a.post_categories) {
          const categories = (_c = (_b = data == null ? void 0 : data.value) == null ? void 0 : _b.post_categories) == null ? void 0 : _c.filter((item) => (item == null ? void 0 : item.code) !== "swiperpost");
          if (categories) {
            categories == null ? void 0 : categories.forEach(async (category2) => {
              category2.posts = await fetchPosts(category2 == null ? void 0 : category2.slug, limitPostCategory);
            });
            return categories;
          }
        }
        return [];
      } catch (e) {
        return [];
      }
    };
    const fetchMatchsRecent = async () => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.COMP).then((decodedData) => {
        if (decodedData) {
          compsDataList.value = decodedData;
          compOriginsList.value = decodedData;
          const dataMcompsDataListByKey = [];
          decodedData == null ? void 0 : decodedData.forEach((item) => {
            dataMcompsDataListByKey[item == null ? void 0 : item.id] = item;
          });
        }
      });
      let status = null;
      status = [...LIVESCORE_STATUS.IS_LIVE, ...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].toString();
      const query = {
        date: moment().format("yyyy-MM-DD"),
        tz: moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format("Z")
      };
      if (status !== null) {
        query.status = status;
      }
      await useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_RECENT, query).then((resData) => {
        var _a, _b;
        if (resData) {
          const matchsDataList = [];
          const matchData = resData;
          matchData.forEach((item) => {
            matchsDataList[item == null ? void 0 : item.id] = item;
          });
          matchsListLength.value = matchsDataList == null ? void 0 : matchsDataList.length;
          matchsList.value = matchsDataList;
          matchOriginsList.value = Object.assign([], matchsDataList);
          let matchsGroup = groupBy(matchData, (x) => x.competition);
          const matchsGroupKey = [...matchsGroup.keys()];
          compOriginsList.value = (_a = compsDataList.value) == null ? void 0 : _a.filter((item) => {
            return matchsGroupKey == null ? void 0 : matchsGroupKey.includes(item == null ? void 0 : item.id);
          }).map((item) => {
            item.matchs = matchsGroup == null ? void 0 : matchsGroup.get(item == null ? void 0 : item.id);
            return item;
          });
          compsListByKey.value = groupBy(compsDataList.value, (x) => x.id);
          const compsList = (_b = compOriginsList.value) == null ? void 0 : _b.filter((item) => (item == null ? void 0 : item.number_hot) === 5 || (item == null ? void 0 : item.number_hot) === 4);
          const matchsGroupHot = groupBy(compsList, (x) => x.id);
          const compKeysListHot = [...matchsGroupHot.keys()];
          let matchsListArray = Object.values(matchOriginsList.value).filter((item) => compKeysListHot.includes(item == null ? void 0 : item.competition));
          matchsGroup = sortByTime(matchsListArray, false);
          compKeysList.value = [...matchsGroup.keys()];
          renderTopList.value = matchsGroup;
        }
      });
    };
    const fetchSeasonTableStanding = async (comp_id) => {
      const query = {
        comp_id
      };
      await useApiLiveScore(API_ROUTERS.LIVESCORE.SEASONS_TABLE_STANDING, query).then((resData) => {
        var _a, _b;
        seasonTableStandingList.value = (_b = (_a = resData == null ? void 0 : resData.results) == null ? void 0 : _a[0]) == null ? void 0 : _b.tables;
      });
    };
    const fetchCompList = async () => {
      await useApiLiveScore(
        API_ROUTERS.LIVESCORE.COMP_LIST,
        []
      ).then(async (resData) => {
        var _a, _b, _c;
        compList.value = resData == null ? void 0 : resData.filter((item) => (item == null ? void 0 : item.number_hot) === 5 || (item == null ? void 0 : item.number_hot) === 4);
        if (((_a = compList.value) == null ? void 0 : _a.length) > 0) {
          optionsListCompList.value = (_c = (_b = compList.value) == null ? void 0 : _b[0]) == null ? void 0 : _c.id;
        }
      });
    };
    const getDataConfig = () => {
      var _a, _b, _c, _d;
      title.value = (_a = getConfig(storeSystems.configurations, "NEWS_TITLE")) != null ? _a : getConfig(storeSystems.configurations, "SEO_META_TITLE");
      description.value = (_b = getConfig(storeSystems.configurations, "NEWS_DESCRIPTION")) != null ? _b : getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION");
      keyword.value = (_c = getConfig(storeSystems.configurations, "NEWS_KEYWORD")) != null ? _c : "";
      pageContent.value = (_d = getConfig(storeSystems.configurations, "NEWS_CONTENT")) != null ? _d : "";
    };
    const fetchConfigurations = async () => {
      var _a;
      try {
        const resData = await useFetch(createUrl(API_ROUTERS.CONFIGURATIONS), "$F3HPh0pPCU");
        storeSystems.configurations = ((_a = resData.data.value) == null ? void 0 : _a.configurations) || [];
      } catch (e) {
      }
    };
    categoriesList.value = ([__temp, __restore] = withAsyncContext(() => fetchCategories()), __temp = await __temp, __restore(), __temp);
    [__temp, __restore] = withAsyncContext(() => fetchMatchsRecent()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => fetchCompList()), await __temp, __restore();
    router.currentRoute.value.path;
    if (!storeSystems.configurations) {
      [__temp, __restore] = withAsyncContext(() => fetchConfigurations()), await __temp, __restore();
    }
    getDataConfig();
    useHead({
      title: () => title.value,
      meta: [
        { name: "description", content: () => description.value },
        { property: "og:title", content: () => title.value },
        { property: "og:description", content: () => description.value },
        { name: "keywords", content: () => keyword.value }
      ]
    });
    watch(
      optionsListCompList,
      async () => {
        await fetchSeasonTableStanding(optionsListCompList.value);
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mcontent" }, _attrs))}><div id="main" class="container row"><div class="col-md-8 col-lg-8 newLeft"><!--[-->`);
      ssrRenderList(categoriesList.value, (item, index) => {
        var _a2, _b;
        _push(`<!--[-->`);
        if (item) {
          _push(`<div class="newsbox"><div class="Htitle"><h2>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).NEWS_CATEGORY + "/" + (item == null ? void 0 : item.slug)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item == null ? void 0 : item.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item == null ? void 0 : item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</h2>`);
          if (((_a2 = item == null ? void 0 : item.posts) == null ? void 0 : _a2.length) > 0) {
            _push(ssrRenderComponent(_component_nuxt_link, {
              to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).NEWS_CATEGORY + "/" + (item == null ? void 0 : item.slug),
              class: "more"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate("LABEL_NEWS_READMORE" in _ctx ? _ctx.LABEL_NEWS_READMORE : unref(LABEL_NEWS_READMORE))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString("LABEL_NEWS_READMORE" in _ctx ? _ctx.LABEL_NEWS_READMORE : unref(LABEL_NEWS_READMORE)), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (((_b = item == null ? void 0 : item.posts) == null ? void 0 : _b.length) > 0) {
            _push(`<div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 news_post"><!--[-->`);
            ssrRenderList(item == null ? void 0 : item.posts, (post) => {
              _push(`<div class="col-12 col-sm-6 col-lg-3 article">`);
              _push(ssrRenderComponent(_component_nuxt_link, {
                to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).NEWS + "/" + (post == null ? void 0 : post.slug),
                class: "more"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  var _a3, _b2;
                  if (_push2) {
                    _push2(`<div class="artimg"${_scopeId}><img${ssrRenderAttr("src", (_a3 = post == null ? void 0 : post.thumbnail) == null ? void 0 : _a3.file_path)}${ssrRenderAttr("alt", post == null ? void 0 : post.title)}${_scopeId}></div><p class="match"${_scopeId}>${ssrInterpolate(post == null ? void 0 : post.title)}</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "artimg" }, [
                        createVNode("img", {
                          src: (_b2 = post == null ? void 0 : post.thumbnail) == null ? void 0 : _b2.file_path,
                          alt: post == null ? void 0 : post.title
                        }, null, 8, ["src", "alt"])
                      ]),
                      createVNode("p", { class: "match" }, toDisplayString(post == null ? void 0 : post.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(`</div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<p class="text-center">Kh\xF4ng c\xF3 b\xE0i vi\u1EBFt</p>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]-->`);
      if (title.value || pageContent.value) {
        _push(`<div id="content-page" class="mt-3 newsbox p-3">`);
        if (title.value) {
          _push(`<h1 class="page_title">${ssrInterpolate(title.value)}</h1>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(pageContent.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-md-4 col-lg-4 newRight">`);
      if (matchsListLength.value > 0) {
        _push(`<div class="side-box"><div class="Htitle nobr"><div>Tr\u1EADn \u0111\u1EA5u Hot</div>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          class: "more",
          target: "_blank",
          to: "/"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Xem th\xEAm `);
            } else {
              return [
                createTextVNode(" Xem th\xEAm ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><!--[-->`);
        ssrRenderList((_a = renderTopList.value) == null ? void 0 : _a.slice(0, 10), (match, index) => {
          var _a2, _b, _c, _d, _e, _f;
          _push(`<div class="matchItem v2"><div class="home"><span class="teamName">${ssrInterpolate((_a2 = match == null ? void 0 : match.home_team) == null ? void 0 : _a2.name)}</span><img class="teamIcon" name=""${ssrRenderAttr("src", ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))((_b = match == null ? void 0 : match.home_team) == null ? void 0 : _b.logo_o, "team"))} height="80"${ssrRenderAttr("alt", (_c = match == null ? void 0 : match.home_team) == null ? void 0 : _c.name)}></div><div class="vs date"><span data-fmt="3">${ssrInterpolate(("formatDateMomentUTCTimeZone" in _ctx ? _ctx.formatDateMomentUTCTimeZone : unref(formatDateMomentUTCTimeZone))(match == null ? void 0 : match.match_time, "DD-MM"))}</span><span data-fmt="4">${ssrInterpolate(("formatDateMomentUTCTimeZone" in _ctx ? _ctx.formatDateMomentUTCTimeZone : unref(formatDateMomentUTCTimeZone))(match == null ? void 0 : match.match_time, "HH:mm"))}</span></div><div class="guest"><img class="teamIcon" name=""${ssrRenderAttr("src", ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))((_d = match == null ? void 0 : match.away_team) == null ? void 0 : _d.logo_o, "team"))} height="80"${ssrRenderAttr("alt", (_e = match == null ? void 0 : match.away_team) == null ? void 0 : _e.name)}><span class="teamName">${ssrInterpolate((_f = match == null ? void 0 : match.away_team) == null ? void 0 : _f.name)}</span></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="side-box"><div class="Htitle nobr"><div>B\u1EA3ng X\u1EBFp H\u1EA1ng</div><select id="optionsListCompList" class="selectbox"><!--[-->`);
      ssrRenderList(compList.value, (item, index) => {
        _push(`<option${ssrRenderAttr("value", item == null ? void 0 : item.id)}>${ssrInterpolate(item == null ? void 0 : item.comp_name_vi)}</option>`);
      });
      _push(`<!--]--></select></div><table id="nba_1" class="listtab fcg" width="100%" border="0" cellspacing="0"><tbody><!--[-->`);
      ssrRenderList(seasonTableStandingList.value, (item, index) => {
        var _a2, _b;
        _push(`<!--[-->`);
        if (((_a2 = seasonTableStandingList.value) == null ? void 0 : _a2.length) > 1) {
          _push(`<tr class="group-tit"><td colspan="7">B\u1EA3ng ${ssrInterpolate((_b = "TABLE_STANDING_LIST" in _ctx ? _ctx.TABLE_STANDING_LIST : unref(TABLE_STANDING_LIST)) == null ? void 0 : _b[item == null ? void 0 : item.group])}</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<tr class="stsw"><td width="10%" title="X\u1EBFp h\u1EA1ng">#</td><td>\u0110\u1ED9i</td><td width="10%" title="Th\u1EAFng">T</td><td width="10%" title="H\xF2a">H</td><td width="10%" title="Thua">B</td><td width="10%">\u0110i\u1EC3m</td></tr><!--[-->`);
        ssrRenderList(item == null ? void 0 : item.rows, (row, row_index) => {
          var _a3;
          _push(`<tr style="${ssrRenderStyle({ "height": "22px" })}"><td>${ssrInterpolate(row == null ? void 0 : row.position)}</td><td class="teamname">${ssrInterpolate((_a3 = row == null ? void 0 : row.team_info) == null ? void 0 : _a3.team_name)}</td><td>${ssrInterpolate(row == null ? void 0 : row.goals)}</td><td>${ssrInterpolate(row == null ? void 0 : row.draw)}</td><td>${ssrInterpolate(row == null ? void 0 : row.loss)}</td><td class="blue">${ssrInterpolate(row == null ? void 0 : row.points)}</td></tr>`);
        });
        _push(`<!--]--><!--]-->`);
      });
      _push(`<!--]--></tbody></table></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B18Akx_7.mjs.map
