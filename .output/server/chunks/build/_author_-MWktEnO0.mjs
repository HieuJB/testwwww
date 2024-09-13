import { e as useRouter, d as useHead, v as showError, f as __nuxt_component_0$2 } from './server.mjs';
import { a as useFetch } from './fetch-CC0zbYw2.mjs';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, unref, useSSRContext } from 'vue';
import { c as createUrl } from './createUrl-DyOxdY5I.mjs';
import { A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { c as getUserMeta, d as getUserMetaGroup } from './helper-CGhdpGxz.mjs';
import { a as avatarText } from './formatters-C2E2Vg5w.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { useIntersectionObserver, useDebounceFn } from '@vueuse/core';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[author]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/data", "$c5p7H6eE9a")), __temp = await __temp, __restore(), __temp);
    data.value.liverooms;
    systemsStore();
    const router = useRouter();
    ref([]);
    ref(true);
    const streamerId = ref();
    ref([]);
    ref(true);
    const searchStreamer = ref("");
    const queryStreamer = ref("");
    ref([]);
    const streamerInfo = ref([]);
    const streamerUserMeta = ref([]);
    const biographyOf = ref("");
    const introduction = ref("");
    ref([]);
    const socials = ref([]);
    ref(false);
    const streamerSchedulesList = ref(null);
    const loaderSchedules = ref(null);
    const schedulePage = ref(1);
    useIntersectionObserver(
      loaderSchedules,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          if ((schedulePage == null ? void 0 : schedulePage.value) > 0) {
            schedulePage.value = (schedulePage == null ? void 0 : schedulePage.value) + 1;
            fetchMoreSchedules(streamerId.value);
          }
        }
      },
      { streamerSchedulesList }
    );
    ref(false);
    const streamersList = ref(null);
    const loaderStreamers = ref(null);
    const pageStreamer = ref(1);
    useIntersectionObserver(
      loaderStreamers,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          if ((pageStreamer == null ? void 0 : pageStreamer.value) > 0) {
            pageStreamer.value = (pageStreamer == null ? void 0 : pageStreamer.value) + 1;
            fetchMoreStreamers(queryStreamer.value);
          }
        }
      },
      { streamersList }
    );
    useDebounceFn(() => {
      queryStreamer.value = searchStreamer.value.trim();
      pageStreamer.value = 1;
      fetchStreamers(queryStreamer.value);
    }, 300);
    const title = ref();
    const description = ref();
    useHead({
      title,
      meta: [
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description }
      ]
    });
    const fetchAuthor = async (streamerId2) => {
      try {
        await useFetch(createUrl(API_ROUTERS.AUTHOR.INFO + "/" + streamerId2), "$0P8xcluMfs").then((resData) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
          streamerInfo.value = (_b = (_a = resData == null ? void 0 : resData.data) == null ? void 0 : _a.value) == null ? void 0 : _b.info;
          streamerUserMeta.value = (_d = (_c = resData == null ? void 0 : resData.data) == null ? void 0 : _c.value) == null ? void 0 : _d.user_meta;
          biographyOf.value = getUserMeta((_f = (_e = resData == null ? void 0 : resData.data) == null ? void 0 : _e.value) == null ? void 0 : _f.user_meta, "biography_of");
          introduction.value = getUserMeta((_h = (_g = resData == null ? void 0 : resData.data) == null ? void 0 : _g.value) == null ? void 0 : _h.user_meta, "article_author");
          const socicalList = getUserMetaGroup((_j = (_i = resData == null ? void 0 : resData.data) == null ? void 0 : _i.value) == null ? void 0 : _j.user_meta, "[social]");
          if ((socicalList == null ? void 0 : socicalList.length) > 0) {
            socials.value = socicalList == null ? void 0 : socicalList.map((item) => {
              var _a2;
              item.meta_code_icon = (item == null ? void 0 : item.meta_code) ? "tabler-brand-" + ((_a2 = item == null ? void 0 : item.meta_code) == null ? void 0 : _a2.replace("[social][", "").replace("]", "")) : "";
              return item;
            });
          }
          title.value = (_m = (_l = (_k = resData == null ? void 0 : resData.data) == null ? void 0 : _k.value) == null ? void 0 : _l.info) == null ? void 0 : _m.name;
          description.value = introduction.value;
        });
      } catch (e) {
        return false;
      }
    };
    const InitData = async () => {
      var _a, _b, _c, _d;
      const authorSlug = (_d = (_c = (_b = (_a = router == null ? void 0 : router.currentRoute) == null ? void 0 : _a.value) == null ? void 0 : _b.params) == null ? void 0 : _c.author) == null ? void 0 : _d.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
      if (authorSlug && authorSlug.length > 0) {
        streamerId.value = authorSlug[0];
        await fetchAuthor(authorSlug[0]);
      } else {
        showError({
          statusCode: 404,
          statusMessage: "Page Not Found"
        });
      }
    };
    InitData();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2;
      var _a, _b, _c, _d, _e, _f;
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "row mt-3 border-top" }, _attrs))}><div class="col-12 col-md-12 col-lg-12 p-3"><div class="d-flex gap-3"><div class="p-3"><div class="blv-img position-relative blv-avatar border border-1 rounded-circle" style="${ssrRenderStyle({ "width": "80px", "height": "80px" })}">`);
      if ((_a = unref(streamerInfo)) == null ? void 0 : _a.avatar) {
        _push(`<img${ssrRenderAttr("src", (_b = unref(streamerInfo)) == null ? void 0 : _b.avatar)} alt="" width="100%" height="100%">`);
      } else {
        _push(`<span class="">${ssrInterpolate(((_c = unref(streamerInfo)) == null ? void 0 : _c.nick_name) ? ("avatarText" in _ctx ? _ctx.avatarText : unref(avatarText))((_d = unref(streamerInfo)) == null ? void 0 : _d.nick_name) : ("avatarText" in _ctx ? _ctx.avatarText : unref(avatarText))("No Name"))}</span>`);
      }
      _push(`</div></div><div class="row"><div class="d-flex flex-wrap"><div class="d-flex align-items-center gap-2 flex-grow-1"><div style="${ssrRenderStyle({ "color": "#fc7853" })}">${ssrInterpolate((_a2 = (_e = unref(streamerInfo)) == null ? void 0 : _e.nick_name) != null ? _a2 : (_f = unref(streamerInfo)) == null ? void 0 : _f.name)}</div><span class="rounded-pill text-light px-2 py-1 font-smaller border-linear-radius cursor-pointer"> Theo d\xF5i </span></div>`);
      if (unref(socials).length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(socials), (social) => {
          _push(`<div class="d-flex gap-3 me-3">`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: (social == null ? void 0 : social.meta_value) ? social == null ? void 0 : social.meta_value : "#",
            target: "_blank"
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><ul class="mt-3 px-4 ps-2"><li>${(_b2 = unref(introduction) ? unref(introduction) : "<i>(T\xE1c gi\u1EA3 ch\u01B0a c\u1EADp nh\u1EADt gi\u1EDBi thi\u1EC7u)</i>") != null ? _b2 : ""}</li></ul></div></div><div class="mt-3"><ul id="myTab" class="nav nav-tabs" role="tablist"><li class="nav-item" role="presentation"><button id="profile-tab" class="nav-link" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true"> Ti\u1EC3u s\u1EED </button></li><li class="nav-item" role="presentation"><button id="record-tab" class="nav-link active" data-bs-toggle="tab" data-bs-target="#record" type="button" role="tab" aria-controls="record" aria-selected="false"> B\xE0i vi\u1EBFt </button></li></ul><div id="myTabContent" class="tab-content"><div id="profile" class="tab-pane fade mt-3" role="tabpanel" aria-labelledby="profile-tab">${(_c2 = unref(biographyOf) ? unref(biographyOf) : "<i>(T\xE1c gi\u1EA3 ch\u01B0a c\u1EADp nh\u1EADt ti\u1EC3u s\u1EED)</i>") != null ? _c2 : ""}</div><div id="record" class="tab-pane fade show active" role="tabpanel" aria-labelledby="record-tab"></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/author/[author].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_author_-MWktEnO0.mjs.map
