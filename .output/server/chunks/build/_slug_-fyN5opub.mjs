import { a7 as useState, a as useRoute, b as useShareCommon, s as systemsStore, ag as CATEGORY_TAG_POST_PER_LIMIT, u as useRouter, g as getConfig, ah as SCREEN_WIDTH, ab as useHead, ai as formatTimeSince, ak as useRequestURL, ad as useFetch, ae as createUrl, E as API_ROUTERS, aj as showError, al as POST_TYPE, h as ROUTERS_OLD, af as _sfc_main$f, m as __nuxt_component_0$3, am as ITEMS_PER_LIMIT, n as _sfc_main$d, _ as _export_sfc } from './server.mjs';
import { useSSRContext, ref, withAsyncContext, mergeProps, unref, defineComponent, computed, watch, withCtx, createVNode, toDisplayString, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0$1, a as _imports_1 } from './virtual_public-LYG_J-af.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { Icon } from '@iconify/vue';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'devalue';
import '@unhead/addons';
import 'vue3-snackbar';
import '@vueuse/core';
import 'moment-timezone';
import 'crypto-js';
import 'pako';
import 'buffer';
import '@vueuse/sound';
import 'vue-bundle-renderer/runtime';
import '@unhead/ssr';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CategoryPost",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const storeSystems = systemsStore();
    const { useLocale, $t, $trouter } = useShareCommon();
    const posts = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(CATEGORY_TAG_POST_PER_LIMIT);
    const totalPages = ref(0);
    const router = useRouter();
    const categories = ref([]);
    ref(false);
    let postCode = router.currentRoute.value.params.category;
    if (!postCode) {
      postCode = router.currentRoute.value.path;
      postCode = (postCode == null ? void 0 : postCode.indexOf("/")) == 0 ? postCode == null ? void 0 : postCode.substring(1) : postCode;
      if ((postCode == null ? void 0 : postCode.lastIndexOf("/")) !== -1) {
        postCode = postCode == null ? void 0 : postCode.slice(0, postCode.lastIndexOf("/"));
      }
    }
    const imageSize = ref([]);
    const imagesSizeConfig = getConfig(storeSystems.configurations, "image_size");
    imageSize.value = imagesSizeConfig == null ? void 0 : imagesSizeConfig.split(",");
    const screenWidth = ref(0);
    const title = ref();
    const description = ref();
    ref();
    const metaTitle = ref("");
    const breadcrumbs = ref([
      {
        label: "",
        to: "",
        last: "on"
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
    const generatePageRange = (currentPage2, totalPages2) => {
      let start = currentPage2 - 2;
      let end = currentPage2 + 2;
      if (start < 1) {
        start = 1;
        end = Math.min(5, totalPages2);
      }
      if (end > totalPages2) {
        end = totalPages2;
        start = Math.max(1, end - 4);
      }
      const range = [];
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    };
    const pageRange = computed(() => generatePageRange(currentPage.value, totalPages.value));
    const fetchPosts = async (categoryCode) => {
      var _a, _b;
      try {
        const { data } = await useFetch(API_ROUTERS.POST.LIST, {
          params: {
            category_code: categoryCode,
            limit: pageSize.value,
            page: currentPage.value
          }
        }, "$47OYsaj8vY");
        posts.value = (_a = data == null ? void 0 : data.value) == null ? void 0 : _a.posts;
        totalPages.value = Math.ceil(((_b = data == null ? void 0 : data.value) == null ? void 0 : _b.count_all) / pageSize.value);
      } catch (e) {
        console.error(e);
      }
    };
    const fetchCategories = async (postCode2) => {
      try {
        await useFetch(createUrl(API_ROUTERS.POST.CATEGORY.DETAIL + postCode2, {}), "$LMUUmalzmV").then((resData) => {
          var _a2;
          var _a, _b, _c, _d, _e, _f, _g, _h, _i;
          categories.value = (_a = resData == null ? void 0 : resData.data) == null ? void 0 : _a.value;
          title.value = (_b = categories.value) == null ? void 0 : _b.name;
          metaTitle.value = (_c = categories.value) == null ? void 0 : _c.meta_title;
          description.value = (_a2 = (_d = categories.value) == null ? void 0 : _d.meta_description) != null ? _a2 : (_e = categories.value) == null ? void 0 : _e.name;
          breadcrumbs.value[0].label = (_g = (_f = resData == null ? void 0 : resData.data) == null ? void 0 : _f.value) == null ? void 0 : _g.name;
          breadcrumbs.value[0].to = "/" + ((_i = (_h = resData == null ? void 0 : resData.data) == null ? void 0 : _h.value) == null ? void 0 : _i.code);
        });
      } catch (e) {
      }
    };
    [__temp, __restore] = withAsyncContext(() => fetchCategories(postCode)), await __temp, __restore();
    useHead({
      title: () => metaTitle.value || title.value,
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
    const robotsMeta = ref("");
    useHead(() => ({
      meta: [{ name: "robots", content: () => robotsMeta.value }]
    }));
    robotsMeta.value = getConfig(storeSystems.configurations, "robot_meta_news_category") ? getConfig(storeSystems.configurations, "robot_meta_news_category") : "index, follow";
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b;
      const _component_BreadcrumbsLite = _sfc_main$f;
      const _component_NuxtLink = __nuxt_component_0$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_BreadcrumbsLite, { breadcrumbs: breadcrumbs.value }, null, _parent));
      _push(`<div class="container"><div id="main" class="listpage"><div class="newsbox"><h1 class="Htitle" id="tag">${ssrInterpolate((_a = categories.value) == null ? void 0 : _a.name)}</h1><ul class="news row d-flex" id="alist"><!--[-->`);
      ssrRenderList(posts.value, (post) => {
        _push(`<li class="article mb-3 col-12 col-sm-6 col-lg-3">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/" + (post == null ? void 0 : post.slug)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a22, _b2, _c, _d;
            if (_push2) {
              _push2(`<div class="artimg"${_scopeId}><img${ssrRenderAttr("src", unref(selectedImageSize) ? `${(_a22 = post == null ? void 0 : post.thumbnail) == null ? void 0 : _a22.file_path}!${unref(selectedImageSize)}` : (_b2 = post == null ? void 0 : post.thumbnail) == null ? void 0 : _b2.file_path)}${ssrRenderAttr("alt", post.title)}${_scopeId}></div><h2 class="match"${_scopeId}>${ssrInterpolate(post == null ? void 0 : post.title)}</h2>`);
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
        _push(`<div class="pagination-container mt-4 d-flex justify-content-center"><button${ssrIncludeBooleanAttr(currentPage.value <= 1) ? " disabled" : ""}><img${ssrRenderAttr("src", _imports_0$1)} width="20px" height="20px"></button><!--[-->`);
        ssrRenderList(unref(pageRange), (page) => {
          _push(`<button${ssrIncludeBooleanAttr(page === currentPage.value) ? " disabled" : ""} class="${ssrRenderClass(page === currentPage.value ? "on" : "")}">${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--><button${ssrIncludeBooleanAttr(currentPage.value >= totalPages.value) ? " disabled" : ""}><img${ssrRenderAttr("src", _imports_1)} width="20px" height="20px"></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div id="content-page">${(_a2 = (_b = categories.value) == null ? void 0 : _b.content) != null ? _a2 : ""}</div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CategoryPost.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/icon/user.svg");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ContentPost",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a2;
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
    let __temp, __restore;
    const { useLocale, $t, $trouter } = useShareCommon();
    const postDetail = ref(null);
    const postLists = ref([]);
    ref([]);
    ref(1);
    ref(true);
    const storeSystems = systemsStore();
    useRouter();
    const route = useRoute();
    const postCode = ref(route.params.slug);
    const breadcrumbs = ref(
      [
        {
          label: "",
          to: "",
          last: "off"
        },
        {
          label: "",
          to: "",
          last: "on"
        }
      ]
    );
    const currentIndex = computed(() => postLists.value.findIndex((post) => post.slug === postDetail.value.slug));
    computed(() => postLists.value[currentIndex.value - 1]);
    computed(() => postLists.value[currentIndex.value + 1]);
    const imageSize = ref([]);
    const imagesSizeConfig = getConfig(storeSystems.configurations, "image_size");
    imageSize.value = imagesSizeConfig == null ? void 0 : imagesSizeConfig.split(",");
    const screenWidth = ref(0);
    const title = ref();
    const description = ref();
    ref();
    const postType = ref();
    const keyword = ref();
    const indexFlag = ref();
    const iconSocial = ref();
    const url = useRequestURL();
    const urlPost = "https://" + url.hostname + url.pathname;
    const onOffFollowSocial = ref(getConfig(storeSystems.configurations, "OPTION_FOLLOW_SOCIAL"));
    const onOffShareSocial = ref(getConfig(storeSystems.configurations, "OPTION_SHARE_SOCIAL"));
    let followSocial = getConfig(storeSystems.configurations, "followsocial");
    iconSocial.value = followSocial ? JSON.parse(followSocial) : [];
    const selectedImageSize = computed(() => {
      var _a22, _b2, _c2;
      if (screenWidth.value < SCREEN_WIDTH.MD && ((_a22 = imageSize == null ? void 0 : imageSize.value) == null ? void 0 : _a22.length) >= 1) {
        return imageSize.value[1];
      } else if (screenWidth.value >= SCREEN_WIDTH.MD && screenWidth.value < SCREEN_WIDTH.LG && ((_b2 = imageSize == null ? void 0 : imageSize.value) == null ? void 0 : _b2.length) >= 2) {
        return imageSize.value[2];
      } else if (screenWidth.value >= SCREEN_WIDTH.LG && screenWidth.value < SCREEN_WIDTH.XXL && ((_c2 = imageSize == null ? void 0 : imageSize.value) == null ? void 0 : _c2.length) >= 3) {
        return imageSize.value[3];
      } else {
        return "";
      }
    });
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(createUrl(API_ROUTERS.POST.SLUG + `?slug=` + postCode.value, {}), "$9icYSM8L8v")), __temp = await __temp, __restore(), __temp);
    if (!(data == null ? void 0 : data.value)) {
      showError({
        statusCode: 404,
        statusMessage: $t("Article does not exist")
      });
    }
    postDetail.value = data == null ? void 0 : data.value;
    title.value = (_a = postDetail.value) == null ? void 0 : _a.title, description.value = (_a2 = (_b = postDetail.value) == null ? void 0 : _b.meta_description) != null ? _a2 : (_c = postDetail.value) == null ? void 0 : _c.summary, postType.value = (_d = postDetail.value) == null ? void 0 : _d.type;
    keyword.value = (_e = postDetail.value) == null ? void 0 : _e.keyword;
    indexFlag.value = (_f = postDetail.value) == null ? void 0 : _f.is_index_flag;
    if ((_i = (_h = (_g = data == null ? void 0 : data.value) == null ? void 0 : _g.post_brand_category) == null ? void 0 : _h[0]) == null ? void 0 : _i.slug) {
      breadcrumbs.value[0].label = (_k = (_j = data == null ? void 0 : data.value) == null ? void 0 : _j.post_brand_category) == null ? void 0 : _k[0].name;
      breadcrumbs.value[0].to = ((_n = (_m = (_l = data == null ? void 0 : data.value) == null ? void 0 : _l.post_brand_category) == null ? void 0 : _m[0]) == null ? void 0 : _n.slug) ? "/" + ((_p = (_o = data == null ? void 0 : data.value) == null ? void 0 : _o.post_brand_category) == null ? void 0 : _p[0].slug) : "";
      breadcrumbs.value[1].label = (_q = data == null ? void 0 : data.value) == null ? void 0 : _q.title;
      breadcrumbs.value[1].to = "/" + ((_r = data == null ? void 0 : data.value) == null ? void 0 : _r.slug);
    } else {
      breadcrumbs.value[0].label = (_s = data == null ? void 0 : data.value) == null ? void 0 : _s.title;
      breadcrumbs.value[0].to = "/" + ((_t = data == null ? void 0 : data.value) == null ? void 0 : _t.slug);
      breadcrumbs.value[0].last = "on";
      breadcrumbs.value = breadcrumbs.value.slice(0, 1);
    }
    useHead({
      title: () => title.value,
      meta: [
        { name: "description", content: () => description.value },
        { property: "og:title", content: () => title.value },
        { property: "og:description", content: () => description.value },
        { name: "keywords", content: () => keyword.value }
      ]
    });
    useHead(() => ({
      meta: [
        {
          name: "robots",
          content: indexFlag.value ? "index, follow" : "noindex, follow"
        }
      ]
    }));
    const fetchListPosts = async () => {
      try {
        await useFetch(createUrl(API_ROUTERS.POST.LIST, {
          query: {
            limit: ITEMS_PER_LIMIT
          }
        }), "$pW41BUNvBH").then((resData) => {
          var _a22, _b2, _c2;
          postLists.value = (_c2 = (_b2 = (_a22 = resData == null ? void 0 : resData.data) == null ? void 0 : _a22.value) == null ? void 0 : _b2.posts) == null ? void 0 : _c2.filter((post) => (post == null ? void 0 : post.slug) !== postCode.value);
        });
      } catch (e) {
      }
    };
    fetchListPosts();
    return (_ctx, _push, _parent, _attrs) => {
      var _a3, _b3;
      var _a22, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2;
      const _component_BreadcrumbsLite = _sfc_main$f;
      const _component_BaseImage = _sfc_main$d;
      const _component_nuxt_link = __nuxt_component_0$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_BreadcrumbsLite, { breadcrumbs: breadcrumbs.value }, null, _parent));
      _push(`<div class="mcontent container" data-v-cbebf831>`);
      if (postDetail.value) {
        _push(`<div id="main" class="articlebox row" data-v-cbebf831><h1 class="Htitle col-12" data-v-cbebf831>${ssrInterpolate((_a22 = postDetail.value) == null ? void 0 : _a22.title)}</h1><div class="${ssrRenderClass([postType.value === ("POST_TYPE" in _ctx ? _ctx.POST_TYPE : unref(POST_TYPE)).POST ? "col-12 col-md-8" : "col-12 col-md-12", "left"])}" data-v-cbebf831><div class="d-flex justify-content-between align-items-center mt-2 mb-4 article-header" data-v-cbebf831><div class="d-flex gap-3 align-items-center mb-2" data-v-cbebf831><div class="d-flex gap-2 align-items-center" data-v-cbebf831><img${ssrRenderAttr("src", _imports_0)} width="18px" height="18px" alt="user" title="user" data-v-cbebf831><small data-v-cbebf831>${ssrInterpolate((_c2 = (_b2 = postDetail.value) == null ? void 0 : _b2.user) == null ? void 0 : _c2.name)}</small></div><div data-v-cbebf831><small class="" data-v-cbebf831>${ssrInterpolate(((_d2 = postDetail.value) == null ? void 0 : _d2.published_time) ? ("formatTimeSince" in _ctx ? _ctx.formatTimeSince : unref(formatTimeSince))((_e2 = postDetail.value) == null ? void 0 : _e2.published_time, unref(useLocale)) : "")}</small></div></div>`);
        if (onOffFollowSocial.value === "True") {
          _push(`<div class="d-flex gap-3" data-v-cbebf831><div class="fs-18 fw-500" data-v-cbebf831>${ssrInterpolate(unref($t)("Follow"))}: </div><!--[-->`);
          ssrRenderList(iconSocial.value, (social, index) => {
            var _a32;
            _push(`<a class="followsocial"${ssrRenderAttr("href", social == null ? void 0 : social.url)}${ssrRenderAttr("alt", social == null ? void 0 : social.iconcode)}${ssrRenderAttr("title", (_a32 = postDetail.value) == null ? void 0 : _a32.title)}${ssrRenderAttr("rel", (social == null ? void 0 : social.followurl) ? "dofollow" : "nofollow")} target="_blank" data-v-cbebf831>`);
            _push(ssrRenderComponent(unref(Icon), {
              icon: social == null ? void 0 : social.iconcode,
              inline: true,
              style: { fontSize: "25px" },
              class: "table-icon"
            }, null, _parent));
            _push(`</a>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (postType.value === ("POST_TYPE" in _ctx ? _ctx.POST_TYPE : unref(POST_TYPE)).POST) {
          _push(`<div class="d-flex align-items-center w-100" data-v-cbebf831>`);
          _push(ssrRenderComponent(_component_BaseImage, {
            src: (_g2 = (_f2 = postDetail.value) == null ? void 0 : _f2.thumbnail) == null ? void 0 : _g2.file_path,
            alt: (_h2 = postDetail.value) == null ? void 0 : _h2.title,
            class: "w-100"
          }, null, _parent));
          _push(`<br data-v-cbebf831></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="mt-3" style="${ssrRenderStyle({ "font-style": "italic" })}" data-v-cbebf831>${(_a3 = (_i2 = postDetail.value) == null ? void 0 : _i2.summary) != null ? _a3 : ""}</p><div class="mt-3" data-v-cbebf831>${(_b3 = (_j2 = postDetail.value) == null ? void 0 : _j2.content) != null ? _b3 : ""}</div><br data-v-cbebf831>`);
        if (onOffShareSocial.value === "True") {
          _push(`<div class="d-flex gap-1 align-items-center share-social" data-v-cbebf831>${ssrInterpolate(unref($t)("Share"))}: <a${ssrRenderAttr("href", "https://www.facebook.com/sharer.php?u=" + urlPost)} data-label="Facebook" onclick="window.open(this.href,this.title,&#39;width=500,height=500,top=300px,left=300px&#39;); return false;" rel="noopener noreferrer nofollow" target="_blank" class="fa fa-facebook" aria-label="Share on Facebook" data-v-cbebf831>`);
          _push(ssrRenderComponent(unref(Icon), {
            icon: "tabler-brand-facebook",
            inline: true,
            style: { fontSize: "25px" },
            color: "#fff"
          }, null, _parent));
          _push(`</a><a${ssrRenderAttr("href", "https://twitter.com/share?url=" + urlPost)} class="fa fa-twitter" data-label="Twitter" onclick="window.open(this.href,this.title,&#39;width=500,height=500,top=300px,left=300px&#39;); return false;" rel="noopener noreferrer nofollow" target="_blank" aria-label="Share on Twitter" data-v-cbebf831>`);
          _push(ssrRenderComponent(unref(Icon), {
            icon: "tabler:brand-x",
            inline: true,
            style: { fontSize: "25px" },
            color: "#fff"
          }, null, _parent));
          _push(`</a><a${ssrRenderAttr("href", "https://t.me/share/url?url=" + urlPost + "&text=" + ((_k2 = postDetail.value) == null ? void 0 : _k2.title))} class="fa fa-telegram" data-label="Telegram" onclick="window.open(this.href,this.title,&#39;width=500,height=500,top=300px,left=300px&#39;); return false;" rel="noopener noreferrer nofollow" target="_blank" aria-label="Share on Telegram" data-v-cbebf831>`);
          _push(ssrRenderComponent(unref(Icon), {
            icon: "tabler:brand-telegram",
            inline: true,
            style: { fontSize: "25px" },
            color: "#fff"
          }, null, _parent));
          _push(`</a><a${ssrRenderAttr("href", "https://www.linkedin.com/shareArticle?mini=true&url=" + urlPost)} class="fa fa-linkedin" data-label="Linkedin" onclick="window.open(this.href,this.title,&#39;width=500,height=500,top=300px,left=300px&#39;); return false;" rel="noopener noreferrer nofollow" target="_blank" aria-label="Share on Linkedin" data-v-cbebf831>`);
          _push(ssrRenderComponent(unref(Icon), {
            icon: "tabler:brand-linkedin",
            inline: true,
            style: { fontSize: "25px" },
            color: "#fff"
          }, null, _parent));
          _push(`</a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<br data-v-cbebf831></div>`);
        if (postType.value === ("POST_TYPE" in _ctx ? _ctx.POST_TYPE : unref(POST_TYPE)).POST) {
          _push(`<div class="right col-12 col-md-4" data-v-cbebf831>`);
          if (((_m2 = (_l2 = postDetail.value) == null ? void 0 : _l2.post_brand_tag) == null ? void 0 : _m2.length) > 0) {
            _push(`<div class="side-box" data-v-cbebf831><div class="box" data-v-cbebf831><div class="tagtitle" data-v-cbebf831>${ssrInterpolate(unref($t)("TAGS"))}</div><!--[-->`);
            ssrRenderList((_n2 = postDetail.value) == null ? void 0 : _n2.post_brand_tag, (tag) => {
              _push(ssrRenderComponent(_component_nuxt_link, {
                key: tag == null ? void 0 : tag.id,
                class: "tags",
                to: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).NEWS_TAG + "/" + (tag == null ? void 0 : tag.code)
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(tag == null ? void 0 : tag.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(tag == null ? void 0 : tag.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            });
            _push(`<!--]--></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="side-box" data-v-cbebf831><div class="Htitle" data-v-cbebf831>${ssrInterpolate(unref($t)("Latest News"))}</div><ul data-v-cbebf831><!--[-->`);
          ssrRenderList(postLists.value, (post) => {
            var _a32, _b32;
            _push(`<li class="article d-flex" data-v-cbebf831><div class="artimg" data-v-cbebf831><img${ssrRenderAttr("src", selectedImageSize.value ? `${(_a32 = post == null ? void 0 : post.thumbnail) == null ? void 0 : _a32.file_path}!${selectedImageSize.value}` : (_b32 = post == null ? void 0 : post.thumbnail) == null ? void 0 : _b32.file_path)}${ssrRenderAttr("alt", post.title)} data-v-cbebf831></div><div class="match" data-v-cbebf831>${ssrInterpolate(post == null ? void 0 : post.title)}</div></li>`);
          });
          _push(`<!--]--></ul></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContentPost.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-cbebf831"]]);
const _sfc_main = {
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const categoryState = useState("category-state", () => []);
    const route = useRoute();
    const { isNavVisible } = useShareCommon();
    isNavVisible.value = false;
    const isDisplayCategory = ref(null);
    const checkDisplayCategory = (data) => {
      for (const value of data) {
        if (value.code === route.params.slug) {
          isDisplayCategory.value = true;
        }
      }
      if (isDisplayCategory.value === null) {
        isDisplayCategory.value = false;
      }
    };
    const fetchMenus = async () => {
      var _a, _b, _c, _d, _e;
      try {
        if ((_a = categoryState.value) == null ? void 0 : _a.length) {
          checkDisplayCategory(categoryState.value);
          return;
        }
        const { data } = await useFetch(API_ROUTERS.POST.CATEGORY.LIST, "$f42VrABMu9");
        if ((_c = (_b = data == null ? void 0 : data.value) == null ? void 0 : _b.post_categories) == null ? void 0 : _c.length) {
          categoryState.value = (_d = data == null ? void 0 : data.value) == null ? void 0 : _d.post_categories;
          checkDisplayCategory((_e = data == null ? void 0 : data.value) == null ? void 0 : _e.post_categories);
        }
      } catch {
      }
    };
    [__temp, __restore] = withAsyncContext(() => fetchMenus()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CategoryPost = _sfc_main$2;
      const _component_ContentPost = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "min-height": "80vh" } }, _attrs))}>`);
      if (unref(isDisplayCategory) === true) {
        _push(ssrRenderComponent(_component_CategoryPost, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(isDisplayCategory) === false) {
        _push(ssrRenderComponent(_component_ContentPost, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-fyN5opub.mjs.map
