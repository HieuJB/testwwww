import { _ as __nuxt_component_0 } from './BaseInput-CqVHwZ5d.mjs';
import { _ as _sfc_main$2 } from './BaseImage-oG5tRcgk.mjs';
import { useSSRContext, ref, withAsyncContext, watch, mergeProps, unref, isRef, useModel, computed } from 'vue';
import { a as getLiveScoreImage } from './livescore_helper-4bdWaxk-.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { useIntersectionObserver, onClickOutside } from '@vueuse/core';
import { _ as _export_sfc, d as useHead } from './server.mjs';
import { u as useApiLiveScore } from './useApi-C5Ep8F8o.mjs';
import { A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { j as debounce, g as getConfig } from './helper-CGhdpGxz.mjs';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
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
import './constants-DJp0NbxW.mjs';
import 'crypto-js';
import 'pako';
import 'buffer';
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

const _sfc_main$1 = {
  __name: "BaseDropdown",
  __ssrInlineRender: true,
  props: {
    "info": {},
    "infoModifiers": {},
    "compActive": {},
    "compActiveModifiers": {}
  },
  emits: ["update:info", "update:compActive"],
  setup(__props) {
    const info = useModel(__props, "info");
    const isShow = ref(false);
    const target = ref(null);
    const ignoreElRef = ref();
    const el = ref(null);
    const limit = ref(1);
    const search = ref("");
    const compActive = useModel(__props, "compActive");
    const listComp = computed(() => {
      if (search.value) {
        return info.value.filter(
          (item) => item.comp_name.toLowerCase().includes(search.value.toLowerCase())
        );
      }
      return info.value.slice(0, limit.value * 20);
    });
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        if (!search.value) {
          limit.value = limit.value + 1;
        }
      }
    });
    onClickOutside(target, () => isShow.value = false, { ignore: [ignoreElRef] });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_BaseImage = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "select-box" }, _attrs))} data-v-548d5c96><div class="select-box__current" tabindex="1" data-v-548d5c96><div class="select-box__value" data-v-548d5c96><div class="${ssrRenderClass([
        "select-box__input-text",
        {
          "select-box__input-text--active": unref(isShow)
        }
      ])}" data-v-548d5c96>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: ((_a = compActive.value) == null ? void 0 : _a.id) !== 1 ? ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))((_b = compActive.value) == null ? void 0 : _b.comp_logo, "competition") + "!h20" : compActive.value.comp_logo,
        alt: (_c = compActive.value) == null ? void 0 : _c.comp_name
      }, null, _parent));
      _push(`<div data-v-548d5c96>${ssrInterpolate((_d = compActive.value) == null ? void 0 : _d.comp_name)}</div></div></div>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        class: [
          "select-box__icon",
          {
            "select-box__icon--active": unref(isShow)
          }
        ],
        src: "/img/dropdown.svg",
        alt: "Arrow Icon",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</div><ul style="${ssrRenderStyle(unref(isShow) ? null : { display: "none" })}" class="select-box__list" data-v-548d5c96><div class="select-box__list-input" data-v-548d5c96><input${ssrRenderAttr("value", unref(search))} type="text" class="input-search mb-1" placeholder="Nh\u1EADp t\xEAn gi\u1EA3i \u0111\u1EA5u..." data-v-548d5c96></div><div class="select-box__list-comp" data-v-548d5c96><!--[-->`);
      ssrRenderList(unref(listComp), (item, index2) => {
        var _a2;
        _push(`<li class="${ssrRenderClass({
          "item--active": compActive.value.id === item.id
        })}" data-v-548d5c96><div class="select-box__option" for="0" aria-hidden="true" data-v-548d5c96>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          width: "15px",
          src: item.id !== 1 ? ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(item == null ? void 0 : item.comp_logo, "competition") + "!h20" : item.comp_logo,
          alt: (_a2 = item == null ? void 0 : item.comp_name_vi) != null ? _a2 : item == null ? void 0 : item.comp_name
        }, null, _parent));
        _push(` ${ssrInterpolate(item.comp_name)}</div></li>`);
      });
      _push(`<!--]-->`);
      if (!unref(listComp).length) {
        _push(`<div data-v-548d5c96><div class="d-flex flex-column align-items-center mt-5" data-v-548d5c96>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "150",
          height: "150",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-548d5c96>Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle({ "opacity": "0" })}" data-v-548d5c96>-</div></div></ul></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BaseDropdown.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-548d5c96"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const storeSystems = systemsStore();
    const isLoading = ref(false);
    const listComp = ref([]);
    const search = ref("");
    const page = ref(1);
    const teams = ref([]);
    const limit = ref(102);
    const title = ref(null);
    const content = ref(null);
    const description = ref(null);
    const keyword = ref(null);
    const compActive = ref({
      id: 1,
      comp_name: "T\u1EA5t c\u1EA3",
      comp_logo: "/icon/player-statistics/1.png"
    });
    const el = ref(null);
    const isInfinity = ref(false);
    const fetchCompHotList = async () => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.COMP_LIST_ALL, []).then(
        (resData) => {
          if (resData) {
            listComp.value = resData;
            listComp.value = [
              {
                id: 1,
                comp_name: "T\u1EA5t c\u1EA3",
                comp_logo: "/icon/player-statistics/1.png"
              },
              ...listComp.value
            ];
          }
        }
      );
    };
    fetchCompHotList();
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      try {
        if (isIntersecting && teams.value.length >= 100 && !isInfinity.value) {
          page.value = page.value + 1;
          fetchTeam(true);
        }
      } catch {
      }
    });
    const fetchTeam = async (isLoadingInfinity = false) => {
      if (!isLoadingInfinity) {
        isLoading.value = true;
      }
      if (isLoadingInfinity) {
        isInfinity.value = true;
      }
      await useApiLiveScore(
        `${API_ROUTERS.LIVESCORE.TEAM_LIST}?page=${page.value}&limit=${limit.value}&competition-id=${compActive.value.id === 1 ? "" : compActive.value.id}&name=${search.value}`
      ).then((resData) => {
        if (resData) {
          if (isLoadingInfinity) {
            teams.value = [...teams.value, ...resData];
          } else {
            teams.value = resData;
          }
        }
      }).finally(() => {
        isLoading.value = false;
        isInfinity.value = false;
      });
    };
    [__temp, __restore] = withAsyncContext(() => fetchTeam()), await __temp, __restore();
    const debouncedFetchTeam = debounce(() => {
      page.value = 1;
      fetchTeam();
    }, 300);
    watch(
      () => search.value,
      () => {
        debouncedFetchTeam();
      }
    );
    watch(
      () => compActive.value,
      () => {
        page.value = 1;
        fetchTeam();
      }
    );
    const fetchSeoMeta = () => {
      try {
        title.value = getConfig(
          storeSystems.configurations,
          "TEAM_TITLE_REPOSITORY"
        );
        description.value = getConfig(
          storeSystems.configurations,
          "TEAM_DESCRIPTION_REPOSITORY"
        );
        keyword.value = getConfig(
          storeSystems.configurations,
          "TEAM_KEYWORD_REPOSITORY"
        );
        content.value = getConfig(
          storeSystems.configurations,
          "TEAM_CONTENT_REPOSITORY"
        );
      } catch {
      }
    };
    fetchSeoMeta();
    useHead({
      title: title.value,
      meta: [
        { name: "description", content: description.value },
        { property: "og:title", content: title.value },
        { property: "og:description", content: description.value },
        { name: "keywords", content: keyword.value }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TeamsBaseInput = __nuxt_component_0;
      const _component_BaseDropdown = __nuxt_component_1;
      const _component_BaseImage = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container bg-white team" }, _attrs))} data-v-52bacf18><div class="team__header" data-v-52bacf18><div class="title" data-v-52bacf18>\u0110\u1ED9i B\xF3ng \u0110\xE1</div><div class="team__header-right" data-v-52bacf18>`);
      _push(ssrRenderComponent(_component_TeamsBaseInput, {
        search: unref(search),
        "onUpdate:search": ($event) => isRef(search) ? search.value = $event : null
      }, null, _parent));
      if (unref(listComp)) {
        _push(ssrRenderComponent(_component_BaseDropdown, {
          info: unref(listComp),
          "onUpdate:info": ($event) => isRef(listComp) ? listComp.value = $event : null,
          compActive: unref(compActive),
          "onUpdate:compActive": ($event) => isRef(compActive) ? compActive.value = $event : null
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-3" data-v-52bacf18><div${ssrRenderAttrs({
        name: "list",
        class: "team__list"
      })} data-v-52bacf18>`);
      ssrRenderList(unref(teams), (item, index2) => {
        _push(`<div class="team__item" data-v-52bacf18>`);
        if (!unref(isLoading)) {
          _push(`<div class="team__item-img" data-v-52bacf18>`);
          _push(ssrRenderComponent(_component_BaseImage, {
            src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(item.logo_o, "team") + "!h50",
            alt: item.logo_o,
            imgDefault: "/img/team-default.png"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(isLoading)) {
          _push(`<p class="card-text placeholder-glow" data-v-52bacf18><span class="placeholder bg-secondary" style="${ssrRenderStyle({ "width": "60px", "height": "60px", "border-radius": "50%" })}" data-v-52bacf18></span></p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-52bacf18>`);
        if (!unref(isLoading)) {
          _push(`<div class="team__item-name" data-v-52bacf18>${ssrInterpolate(item.name)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(isLoading)) {
          _push(`<p class="card-text placeholder-glow" data-v-52bacf18><span class="placeholder bg-secondary" style="${ssrRenderStyle({ "width": "100px" })}" data-v-52bacf18></span></p>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(isLoading)) {
          _push(`<div class="team__item-country" data-v-52bacf18>${ssrInterpolate(item.country_name)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(isLoading)) {
          _push(`<p class="card-text placeholder-glow mb-2" data-v-52bacf18><span class="placeholder bg-secondary" style="${ssrRenderStyle({ "width": "50px" })}" data-v-52bacf18></span></p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`</div>`);
      if (!unref(teams).length && unref(isLoading)) {
        _push(`<div class="team__loading" data-v-52bacf18><div class="spinner-border text-success" role="status" data-v-52bacf18><span class="visually-hidden" data-v-52bacf18>Loading...</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(isInfinity)) {
        _push(`<div class="loading mx-auto d-flex justify-content-center" data-v-52bacf18><div class="spinner-border text-success" role="status" data-v-52bacf18><span class="visually-hidden" data-v-52bacf18>Loading...</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle({ "opacity": "0" })}" data-v-52bacf18>infiniti</div>`);
      if (!unref(teams).length && !unref(isLoading)) {
        _push(`<div class="mt-5" data-v-52bacf18><div class="d-flex flex-column align-items-center" data-v-52bacf18>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-52bacf18>Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div id="content-page" class="mt-5" data-v-52bacf18>`);
      if (unref(title)) {
        _push(`<h1 class="page_title" data-v-52bacf18>${ssrInterpolate(unref(title))}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center" data-v-52bacf18>${ssrInterpolate(unref(content))}</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/team/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-52bacf18"]]);

export { index as default };
//# sourceMappingURL=index-DZTaMHO3.mjs.map
