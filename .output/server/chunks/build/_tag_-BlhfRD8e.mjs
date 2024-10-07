import { b as useShareCommon, s as systemsStore, ag as CATEGORY_TAG_POST_PER_LIMIT, u as useRouter, g as getConfig, h as ROUTERS_OLD, ah as SCREEN_WIDTH, ab as useHead, ai as formatTimeSince, ad as useFetch, E as API_ROUTERS, ae as createUrl, aj as showError, af as _sfc_main$f, m as __nuxt_component_0$3 } from './server.mjs';
import { useSSRContext, defineComponent, ref, computed, withAsyncContext, watch, withCtx, unref, createVNode, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_1 } from './virtual_public-LYG_J-af.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TagPost",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { useLocale, $t, $trouter } = useShareCommon();
    const storeSystems = systemsStore();
    const posts = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(CATEGORY_TAG_POST_PER_LIMIT);
    const totalPages = ref(0);
    const router = useRouter();
    const tags = ref([]);
    ref(false);
    const postCode = router.currentRoute.value.params.tag;
    const imageSize = ref([]);
    const imagesSizeConfig = getConfig(storeSystems.configurations, "image_size");
    imageSize.value = imagesSizeConfig == null ? void 0 : imagesSizeConfig.split(",");
    const screenWidth = ref(0);
    const title = ref();
    const description = ref();
    const pageContent = ref();
    const breadcrumbs = ref([
      {
        "label": $t("News"),
        "to": $trouter(ROUTERS_OLD.NEWS),
        "last": "off"
      },
      {
        "label": "",
        "to": "",
        "last": "on"
      }
    ]);
    const selectedImageSize = computed(() => {
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
    const fetchPosts = async (tagCode) => {
      var _a, _b;
      try {
        const { data } = await useFetch(API_ROUTERS.POST.LIST, {
          params: {
            tag_code: tagCode,
            limit: pageSize.value,
            page: currentPage.value
          }
        }, "$YfM77AMoWF");
        posts.value = (_a = data == null ? void 0 : data.value) == null ? void 0 : _a.posts;
        totalPages.value = Math.ceil(((_b = data == null ? void 0 : data.value) == null ? void 0 : _b.count_all) / pageSize.value);
      } catch (e) {
        console.error(e);
      }
    };
    const fetchTags = async (postCode2) => {
      var _a2;
      var _a, _b, _c;
      try {
        const { data } = await useFetch(createUrl(API_ROUTERS.POST.TAG.SLUG + postCode2, {}), "$9z3A1WvLvk");
        if (!(data == null ? void 0 : data.value)) {
          showError({
            statusCode: 404,
            statusMessage: $t("Tag does not exist")
          });
        }
        tags.value = data == null ? void 0 : data.value;
        breadcrumbs.value[1].label = data == null ? void 0 : data.value.name;
        breadcrumbs.value[1].to = ROUTERS_OLD.NEWS_TAG + "/" + (data == null ? void 0 : data.value.code);
        title.value = (_a = tags.value) == null ? void 0 : _a.name;
        description.value = (_a2 = (_b = tags.value) == null ? void 0 : _b.meta_description) != null ? _a2 : (_c = tags.value) == null ? void 0 : _c.name;
      } catch (e) {
        showError({
          statusCode: 404,
          statusMessage: $t("Tag does not exist")
        });
      }
    };
    const getDataConfig = () => {
      var _a;
      pageContent.value = (_a = getConfig(storeSystems.configurations, "NEWS_CONTENT_TAG")) != null ? _a : "";
    };
    const fetchConfigurations = async () => {
      var _a;
      try {
        const resData = await useFetch(createUrl(API_ROUTERS.CONFIGURATIONS), "$EpTEmqgbac");
        storeSystems.configurations = ((_a = resData.data.value) == null ? void 0 : _a.configurations) || [];
      } catch (e) {
      }
    };
    if (!storeSystems.configurations) {
      [__temp, __restore] = withAsyncContext(() => fetchConfigurations()), await __temp, __restore();
    }
    [__temp, __restore] = withAsyncContext(() => fetchTags(postCode)), await __temp, __restore();
    getDataConfig();
    useHead({
      title: () => title.value,
      meta: [
        { name: "description", content: () => description.value },
        { property: "og:title", content: () => title.value },
        { property: "og:description", content: () => description.value }
      ]
    });
    watch(() => postCode, () => {
      fetchPosts(postCode);
    });
    fetchPosts(postCode);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_BreadcrumbsLite = _sfc_main$f;
      const _component_NuxtLink = __nuxt_component_0$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_BreadcrumbsLite, {
        breadcrumbs: breadcrumbs.value,
        isCustom: ""
      }, null, _parent));
      _push(`<div class="mcontent"><div id="main" class="listpage container"><div class="newsbox"><h1 class="Htitle" id="tag">${ssrInterpolate((_a = tags.value) == null ? void 0 : _a.name)}</h1><ul class="news row d-flex" id="alist"><!--[-->`);
      ssrRenderList(posts.value, (post) => {
        _push(`<li class="article col-12 col-sm-6 col-lg-3">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/" + (post == null ? void 0 : post.slug)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b, _c, _d;
            if (_push2) {
              _push2(`<div class="artimg"${_scopeId}><img${ssrRenderAttr("src", unref(selectedImageSize) ? `${(_a2 = post == null ? void 0 : post.thumbnail) == null ? void 0 : _a2.file_path}!${unref(selectedImageSize)}` : (_b = post == null ? void 0 : post.thumbnail) == null ? void 0 : _b.file_path)}${ssrRenderAttr("alt", post.title)}${_scopeId}></div><h2 class="match"${_scopeId}>${ssrInterpolate(post == null ? void 0 : post.title)}</h2>`);
            } else {
              return [
                createVNode("div", { class: "artimg" }, [
                  createVNode("img", {
                    src: unref(selectedImageSize) ? `${(_c = post == null ? void 0 : post.thumbnail) == null ? void 0 : _c.file_path}!${unref(selectedImageSize)}` : (_d = post == null ? void 0 : post.thumbnail) == null ? void 0 : _d.file_path,
                    alt: post.title
                  }, null, 8, ["src", "alt"])
                ]),
                createVNode("h2", { class: "match" }, toDisplayString(post == null ? void 0 : post.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="time"><span>${ssrInterpolate((post == null ? void 0 : post.post_date) ? ("formatTimeSince" in _ctx ? _ctx.formatTimeSince : unref(formatTimeSince))(post == null ? void 0 : post.post_date, unref(useLocale)) : "")}</span></div></li>`);
      });
      _push(`<!--]--></ul>`);
      if (totalPages.value > 0) {
        _push(`<div class="pagination-container mt-4 d-flex justify-content-center"><button${ssrIncludeBooleanAttr(currentPage.value <= 1) ? " disabled" : ""}><img${ssrRenderAttr("src", _imports_0)} width="20px" height="20px"></button><!--[-->`);
        ssrRenderList(totalPages.value, (page) => {
          _push(`<button${ssrIncludeBooleanAttr(page === currentPage.value) ? " disabled" : ""} class="${ssrRenderClass(page === currentPage.value ? "on" : "")}">${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--><button${ssrIncludeBooleanAttr(currentPage.value >= totalPages.value) ? " disabled" : ""}><img${ssrRenderAttr("src", _imports_1)} width="20px" height="20px"></button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (pageContent.value) {
        _push(`<div id="content-page" class="mt-3 newsbox p-3">${ssrInterpolate(pageContent.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TagPost.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "[tag]",
  __ssrInlineRender: true,
  setup(__props) {
    const { isNavVisible } = useShareCommon();
    isNavVisible.value = false;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TagPost = _sfc_main$1;
      _push(ssrRenderComponent(_component_TagPost, _attrs, null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/news/tags/[tag].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_tag_-BlhfRD8e.mjs.map