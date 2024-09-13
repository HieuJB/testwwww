import { _ as _sfc_main$2 } from './BaseImage-oG5tRcgk.mjs';
import { _ as _export_sfc, e as useRouter, v as showError, d as useHead, f as __nuxt_component_0$2 } from './server.mjs';
import { g as getConfig } from './helper-CGhdpGxz.mjs';
import { u as useRequestURL } from './url-DZIKx68S.mjs';
import { d as SCREEN_WIDTH, P as POST_TYPE, e as ITEMS_PER_LIMIT } from './constants-DJp0NbxW.mjs';
import { a as useFetch } from './fetch-CC0zbYw2.mjs';
import { R as ROUTERS, A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { useSSRContext, defineComponent, ref, computed, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { c as createUrl } from './createUrl-DyOxdY5I.mjs';
import { a as formatTimeSince } from './moment_helper-C2kP4D4M.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import { Icon } from '@iconify/vue';
import './NuxtImg-z5Tschba.mjs';
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
import 'vue-bundle-renderer/runtime';
import '@unhead/ssr';
import 'moment-timezone';

const _imports_0 = publicAssetsURL("/icon/user.svg");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ContentPost",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a2;
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    let __temp, __restore;
    const postDetail = ref(null);
    const postLists = ref([]);
    ref([]);
    ref(1);
    ref(true);
    const storeSystems = systemsStore();
    const router = useRouter();
    useRouter();
    const postCode = (_c = (_b = (_a = router == null ? void 0 : router.currentRoute) == null ? void 0 : _a.value) == null ? void 0 : _b.params) == null ? void 0 : _c.news;
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
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(createUrl(API_ROUTERS.POST.SLUG + `?slug=` + postCode, {}), "$9icYSM8L8v")), __temp = await __temp, __restore(), __temp);
    if (!(data == null ? void 0 : data.value)) {
      showError({
        statusCode: 404,
        statusMessage: "B\xE0i vi\u1EBFt kh\xF4ng t\u1ED3n t\u1EA1i!"
      });
    }
    postDetail.value = data == null ? void 0 : data.value;
    title.value = (_d = postDetail.value) == null ? void 0 : _d.title, description.value = (_a2 = (_e = postDetail.value) == null ? void 0 : _e.meta_description) != null ? _a2 : (_f = postDetail.value) == null ? void 0 : _f.summary, postType.value = (_g = postDetail.value) == null ? void 0 : _g.type;
    keyword.value = (_h = postDetail.value) == null ? void 0 : _h.keyword;
    indexFlag.value = (_i = postDetail.value) == null ? void 0 : _i.is_index_flag;
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
          postLists.value = (_c2 = (_b2 = (_a22 = resData == null ? void 0 : resData.data) == null ? void 0 : _a22.value) == null ? void 0 : _b2.posts) == null ? void 0 : _c2.filter((post) => (post == null ? void 0 : post.slug) !== postCode);
        });
      } catch (e) {
      }
    };
    fetchListPosts();
    return (_ctx, _push, _parent, _attrs) => {
      var _a3, _b3;
      var _a22, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j, _k, _l, _m, _n;
      const _component_BaseImage = _sfc_main$2;
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mcontent container" }, _attrs))} data-v-e8f76280>`);
      if (postDetail.value) {
        _push(`<div id="main" class="articlebox row" data-v-e8f76280><h1 class="Htitle col-12" data-v-e8f76280>${ssrInterpolate((_a22 = postDetail.value) == null ? void 0 : _a22.title)}</h1><div class="${ssrRenderClass([postType.value === ("POST_TYPE" in _ctx ? _ctx.POST_TYPE : unref(POST_TYPE)).POST ? "col-12 col-md-8" : "col-12 col-md-12", "left"])}" data-v-e8f76280><div class="d-flex justify-content-between align-items-center mt-2 mb-4 article-header" data-v-e8f76280><div class="d-flex gap-3 align-items-center mb-2" data-v-e8f76280><div class="d-flex gap-2 align-items-center" data-v-e8f76280><img${ssrRenderAttr("src", _imports_0)} width="18px" height="18px" alt="user" title="user" data-v-e8f76280><small data-v-e8f76280>${ssrInterpolate((_c2 = (_b2 = postDetail.value) == null ? void 0 : _b2.user) == null ? void 0 : _c2.name)}</small></div><div data-v-e8f76280><small class="" data-v-e8f76280>${ssrInterpolate(((_d2 = postDetail.value) == null ? void 0 : _d2.published_time) ? ("formatTimeSince" in _ctx ? _ctx.formatTimeSince : unref(formatTimeSince))((_e2 = postDetail.value) == null ? void 0 : _e2.published_time) : "")}</small></div></div>`);
        if (onOffFollowSocial.value === "True") {
          _push(`<div class="d-flex gap-3" data-v-e8f76280><div class="fs-18 fw-500" data-v-e8f76280> Theo do\u0303i: </div><!--[-->`);
          ssrRenderList(iconSocial.value, (social, index) => {
            var _a32;
            _push(`<a class="followsocial"${ssrRenderAttr("href", social == null ? void 0 : social.url)}${ssrRenderAttr("alt", social == null ? void 0 : social.iconcode)}${ssrRenderAttr("title", (_a32 = postDetail.value) == null ? void 0 : _a32.title)}${ssrRenderAttr("rel", (social == null ? void 0 : social.followurl) ? "dofollow" : "nofollow")} target="_blank" data-v-e8f76280>`);
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
          _push(`<div class="d-flex align-items-center w-100" data-v-e8f76280>`);
          _push(ssrRenderComponent(_component_BaseImage, {
            src: (_g2 = (_f2 = postDetail.value) == null ? void 0 : _f2.thumbnail) == null ? void 0 : _g2.file_path,
            alt: (_h2 = postDetail.value) == null ? void 0 : _h2.title,
            class: "w-100"
          }, null, _parent));
          _push(`<br data-v-e8f76280></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="mt-3" style="${ssrRenderStyle({ "font-style": "italic" })}" data-v-e8f76280>${(_a3 = (_i2 = postDetail.value) == null ? void 0 : _i2.summary) != null ? _a3 : ""}</p><div class="mt-3" data-v-e8f76280>${(_b3 = (_j = postDetail.value) == null ? void 0 : _j.content) != null ? _b3 : ""}</div><br data-v-e8f76280>`);
        if (onOffShareSocial.value === "True") {
          _push(`<div class="d-flex gap-1 align-items-center share-social" data-v-e8f76280> Chia se\u0309: <a${ssrRenderAttr("href", "https://www.facebook.com/sharer.php?u=" + urlPost)} data-label="Facebook" onclick="window.open(this.href,this.title,&#39;width=500,height=500,top=300px,left=300px&#39;); return false;" rel="noopener noreferrer nofollow" target="_blank" class="fa fa-facebook" aria-label="Share on Facebook" data-v-e8f76280>`);
          _push(ssrRenderComponent(unref(Icon), {
            icon: "tabler-brand-facebook",
            inline: true,
            style: { fontSize: "25px" },
            color: "#fff"
          }, null, _parent));
          _push(`</a><a${ssrRenderAttr("href", "https://twitter.com/share?url=" + urlPost)} class="fa fa-twitter" data-label="Twitter" onclick="window.open(this.href,this.title,&#39;width=500,height=500,top=300px,left=300px&#39;); return false;" rel="noopener noreferrer nofollow" target="_blank" aria-label="Share on Twitter" data-v-e8f76280>`);
          _push(ssrRenderComponent(unref(Icon), {
            icon: "tabler:brand-x",
            inline: true,
            style: { fontSize: "25px" },
            color: "#fff"
          }, null, _parent));
          _push(`</a><a${ssrRenderAttr("href", "https://t.me/share/url?url=" + urlPost + "&text=" + ((_k = postDetail.value) == null ? void 0 : _k.title))} class="fa fa-telegram" data-label="Telegram" onclick="window.open(this.href,this.title,&#39;width=500,height=500,top=300px,left=300px&#39;); return false;" rel="noopener noreferrer nofollow" target="_blank" aria-label="Share on Telegram" data-v-e8f76280>`);
          _push(ssrRenderComponent(unref(Icon), {
            icon: "tabler:brand-telegram",
            inline: true,
            style: { fontSize: "25px" },
            color: "#fff"
          }, null, _parent));
          _push(`</a><a${ssrRenderAttr("href", "https://www.linkedin.com/shareArticle?mini=true&url=" + urlPost)} class="fa fa-linkedin" data-label="Linkedin" onclick="window.open(this.href,this.title,&#39;width=500,height=500,top=300px,left=300px&#39;); return false;" rel="noopener noreferrer nofollow" target="_blank" aria-label="Share on Linkedin" data-v-e8f76280>`);
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
        _push(`<br data-v-e8f76280></div>`);
        if (postType.value === ("POST_TYPE" in _ctx ? _ctx.POST_TYPE : unref(POST_TYPE)).POST) {
          _push(`<div class="right col-12 col-md-4" data-v-e8f76280>`);
          if (((_m = (_l = postDetail.value) == null ? void 0 : _l.post_brand_tag) == null ? void 0 : _m.length) > 0) {
            _push(`<div class="side-box" data-v-e8f76280><div class="box" data-v-e8f76280><div class="tagtitle" data-v-e8f76280>TAGS</div><!--[-->`);
            ssrRenderList((_n = postDetail.value) == null ? void 0 : _n.post_brand_tag, (tag) => {
              _push(ssrRenderComponent(_component_nuxt_link, {
                key: tag == null ? void 0 : tag.id,
                class: "tags",
                to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).NEWS_TAG + "/" + (tag == null ? void 0 : tag.code)
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
          _push(`<div class="side-box" data-v-e8f76280><div class="Htitle" data-v-e8f76280>Tin m\u1EDBi nh\u1EA5t</div><ul data-v-e8f76280><!--[-->`);
          ssrRenderList(postLists.value, (post) => {
            var _a32, _b32;
            _push(`<li class="article d-flex" data-v-e8f76280><div class="artimg" data-v-e8f76280><img${ssrRenderAttr("src", selectedImageSize.value ? `${(_a32 = post == null ? void 0 : post.thumbnail) == null ? void 0 : _a32.file_path}!${selectedImageSize.value}` : (_b32 = post == null ? void 0 : post.thumbnail) == null ? void 0 : _b32.file_path)}${ssrRenderAttr("alt", post.title)} data-v-e8f76280></div><div class="match" data-v-e8f76280>${ssrInterpolate(post == null ? void 0 : post.title)}</div></li>`);
          });
          _push(`<!--]--></ul></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContentPost.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e8f76280"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ContentPost = __nuxt_component_0;
  _push(ssrRenderComponent(_component_ContentPost, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/[news].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _news_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _news_ as default };
//# sourceMappingURL=_news_-CaV_tR7U.mjs.map
