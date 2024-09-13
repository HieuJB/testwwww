import { _ as __nuxt_component_0 } from './BaseInput-CqVHwZ5d.mjs';
import { _ as _sfc_main$2 } from './BaseImage-oG5tRcgk.mjs';
import { useSSRContext, ref, watch, mergeProps, unref, isRef, useModel, computed } from 'vue';
import { a as getLiveScoreImage } from './livescore_helper-4bdWaxk-.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "dropdown",
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
          (item) => {
            var _a;
            return (_a = item.country_name) == null ? void 0 : _a.toLowerCase().includes(search.value.toLowerCase());
          }
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "select-box" }, _attrs))} data-v-4bb440cf><div class="select-box__current" tabindex="1" data-v-4bb440cf><div class="select-box__value" data-v-4bb440cf><div class="${ssrRenderClass([
        "select-box__input-text",
        {
          "select-box__input-text--active": unref(isShow)
        }
      ])}" data-v-4bb440cf>`);
      _push(ssrRenderComponent(_component_BaseImage, {
        src: ((_a = compActive.value) == null ? void 0 : _a.country_id) !== 1 ? ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))((_b = compActive.value) == null ? void 0 : _b.logo_o, "country") + "!h20" : compActive.value.logo_league_o,
        alt: (_c = compActive.value) == null ? void 0 : _c.country_id
      }, null, _parent));
      _push(`<div data-v-4bb440cf>${ssrInterpolate((_d = compActive.value) == null ? void 0 : _d.country_name)}</div></div></div>`);
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
      _push(`</div><ul style="${ssrRenderStyle(unref(isShow) ? null : { display: "none" })}" class="select-box__list" data-v-4bb440cf><div class="select-box__list-input" data-v-4bb440cf><input${ssrRenderAttr("value", unref(search))} type="text" class="input-search mb-1" placeholder="Nh\u1EADp t\xEAn qu\u1ED1c gia..." data-v-4bb440cf></div><div class="select-box__list-comp" data-v-4bb440cf><!--[-->`);
      ssrRenderList(unref(listComp), (item, index2) => {
        var _a3;
        var _a2;
        _push(`<li class="${ssrRenderClass({
          "item--active": compActive.value.country_id === item.country_id
        })}" data-v-4bb440cf><div class="select-box__option" for="0" aria-hidden="true" data-v-4bb440cf>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          src: item.country_id !== 1 ? ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(item == null ? void 0 : item.logo_o, "country") + "!h20" : item.logo_league_o,
          alt: (_a2 = compActive.value) == null ? void 0 : _a2.country_id
        }, null, _parent));
        _push(` ${ssrInterpolate((_a3 = item.country_name) != null ? _a3 : item.country_name)}</div></li>`);
      });
      _push(`<!--]-->`);
      if (!unref(listComp).length) {
        _push(`<div data-v-4bb440cf><div class="d-flex flex-column align-items-center mt-5" data-v-4bb440cf>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "150",
          height: "150",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-4bb440cf>Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle({ "opacity": "0" })}" data-v-4bb440cf>-</div></div></ul></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/teams/player/dropdown.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4bb440cf"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const storeSystems = systemsStore();
    const el = ref(null);
    const isInfinity = ref(false);
    const search = ref("");
    const page = ref(1);
    const limit = ref(12);
    const playerList = ref([]);
    const contries = ref([]);
    const isLoading = ref(false);
    const compActive = ref({
      country_id: 1,
      country_name: "T\u1EA5t c\u1EA3",
      logo_league_o: "/icon/player-statistics/1.png"
    });
    const title = ref(null);
    const content = ref(null);
    const description = ref(null);
    const keyword = ref(null);
    function splitName(name) {
      const index2 = name.indexOf(" ");
      if (index2 === -1) {
        return ["", name];
      } else {
        return [name.slice(0, index2), name.slice(index2 + 1)];
      }
    }
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      try {
        if (isIntersecting && playerList.value.length >= limit.value && !isInfinity.value) {
          page.value = page.value + 1;
          fetchPlayer(true);
        }
      } catch {
      }
    });
    const fetchWarehouse = async () => {
      await useApiLiveScore(API_ROUTERS.LIVESCORE.WAREHOUSE, []).then((resData) => {
        if (resData) {
          contries.value = resData.reduce((acc, cur) => {
            acc = [...acc, cur.countries];
            return acc;
          }, []).flat().filter((item) => item.country_id);
          contries.value.unshift({
            country_id: 1,
            country_name: "T\u1EA5t c\u1EA3",
            logo_league_o: "/icon/player-statistics/1.png"
          });
        }
      });
    };
    const fetchPlayer = async (isLoadingInfinity = false) => {
      if (!isLoadingInfinity) {
        isLoading.value = true;
      }
      if (isLoadingInfinity) {
        isInfinity.value = true;
      }
      await useApiLiveScore(
        `${API_ROUTERS.LIVESCORE.PLAYER_LIST}?page=${page.value}&limit=${limit.value}&country-id=${compActive.value.country_id !== 1 ? compActive.value.country_id : ""}&name=${search.value}`
      ).then((resData) => {
        if (resData) {
          if (isLoadingInfinity) {
            playerList.value = [...playerList.value, ...resData];
          } else {
            playerList.value = resData;
          }
        }
      }).finally(() => {
        isLoading.value = false;
        isInfinity.value = false;
      });
    };
    fetchWarehouse();
    fetchPlayer();
    const debouncedFetchPlayer = debounce(() => {
      page.value = 1;
      fetchPlayer();
    }, 300);
    watch(
      () => search.value,
      () => {
        debouncedFetchPlayer();
      }
    );
    watch(
      () => compActive.value,
      () => {
        page.value = 1;
        fetchPlayer();
      }
    );
    const fetchSeoMeta = () => {
      try {
        title.value = getConfig(
          storeSystems.configurations,
          "PLAYER_TITLE_REPOSITORY"
        );
        description.value = getConfig(
          storeSystems.configurations,
          "PLAYER_DESCRIPTION_REPOSITORY"
        );
        keyword.value = getConfig(
          storeSystems.configurations,
          "PLAYER_KEYWORD_REPOSITORY"
        );
        content.value = getConfig(
          storeSystems.configurations,
          "PLAYER_CONTENT_REPOSITORY"
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
      const _component_TeamsPlayerDropdown = __nuxt_component_1;
      const _component_BaseImage = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container bg-white team" }, _attrs))} data-v-95cc915e><div class="team__header" data-v-95cc915e><div class="title" data-v-95cc915e>Danh S\xE1ch C\u1EA7u Th\u1EE7</div><div class="team__header-right" style="${ssrRenderStyle({ "margin-right": "8px" })}" data-v-95cc915e>`);
      _push(ssrRenderComponent(_component_TeamsBaseInput, {
        placeholder: `Nh\u1EADp t\xEAn c\u1EA7u th\u1EE7`,
        search: unref(search),
        "onUpdate:search": ($event) => isRef(search) ? search.value = $event : null
      }, null, _parent));
      _push(ssrRenderComponent(_component_TeamsPlayerDropdown, {
        info: unref(contries),
        "onUpdate:info": ($event) => isRef(contries) ? contries.value = $event : null,
        compActive: unref(compActive),
        "onUpdate:compActive": ($event) => isRef(compActive) ? compActive.value = $event : null
      }, null, _parent));
      _push(`</div></div>`);
      if (unref(playerList).length) {
        _push(`<div${ssrRenderAttrs({
          name: "list",
          class: [
            "player__list mt-4",
            {
              "opacity-0": unref(isLoading)
            }
          ]
        })} data-v-95cc915e>`);
        ssrRenderList(unref(playerList), (item, index2) => {
          var _a2, _b2, _c, _d, _e, _f;
          var _a, _b;
          _push(`<div class="player__item" data-v-95cc915e><div class="player__card" data-v-95cc915e><div class="Image__Wrapper aspect-ratio--child" data-v-95cc915e><div class="${ssrRenderClass([
            "player__card-img",
            {
              "player__card-img-country": !item.team_logo_o && item.country_logo
            }
          ])}" data-v-95cc915e>`);
          _push(ssrRenderComponent(_component_BaseImage, {
            alt: "Chelsea",
            class: "",
            imgDefault: "/img/team-default.png",
            src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(
              item.team_logo_o ? item.team_logo_o : item.country_logo,
              item.team_logo_o ? "team" : "country"
            ) + "!h120"
          }, null, _parent));
          _push(`</div><div class="PlayerHeader__Overlay_Detail" data-v-95cc915e></div><div class="PlayerHeader__Overlay PlayerHeader__Overlay--right PlayerHeader__Overlay--opaque" data-v-95cc915e></div>`);
          _push(ssrRenderComponent(_component_BaseImage, {
            class: "player-avt",
            imgDefault: `/img/playericon.png`,
            src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(item.logo_o, "player") + "!h80"
          }, null, _parent));
          _push(`</div></div><div class="player__card-right" data-v-95cc915e><div class="player__card-name" data-v-95cc915e><div data-v-95cc915e>${ssrInterpolate((_a2 = (_a = splitName(item.name)) == null ? void 0 : _a[0]) != null ? _a2 : "")} <br data-v-95cc915e></div><div data-v-95cc915e>${ssrInterpolate((_b2 = (_b = splitName(item.name)) == null ? void 0 : _b[1]) != null ? _b2 : "")}</div></div><div class="d-flex align-items-center gap-1 py-2" data-v-95cc915e>`);
          _push(ssrRenderComponent(_component_BaseImage, {
            alt: "Chelsea",
            class: "",
            "data-mptype": "image",
            width: "20px",
            src: ("getLiveScoreImage" in _ctx ? _ctx.getLiveScoreImage : unref(getLiveScoreImage))(
              item.team_logo_o ? item.team_logo_o : item.country_logo,
              item.team_logo_o ? "team" : "country"
            ) + "!h20"
          }, null, _parent));
          _push(`<span class="team-name" data-v-95cc915e>${ssrInterpolate((_c = item.team_name) != null ? _c : item.country_name)}</span></div><button data-v-95cc915e> Chi ti\u1EBFt </button></div><div class="player__info" data-v-95cc915e><div class="player__info-item" data-v-95cc915e><div class="player__info-item-left" data-v-95cc915e>CC/CN :</div><div class="player__info-item-right" data-v-95cc915e>${ssrInterpolate((_d = item.height) != null ? _d : "-")} cm, ${ssrInterpolate(item.weight)} kg </div></div><div class="player__info-item" data-v-95cc915e><div class="player__info-item-left" data-v-95cc915e>Ng\xE0y sinh :</div><div class="player__info-item-right" data-v-95cc915e>${ssrInterpolate((_e = item.birthday) != null ? _e : "-")} (${ssrInterpolate((_f = item.age) != null ? _f : "-")}) </div></div><div class="player__info-item" data-v-95cc915e><div class="player__info-item-left" data-v-95cc915e>Qu\u1ED1c gia :</div><div class="player__info-item-right" data-v-95cc915e>${ssrInterpolate(item.country_name)}</div></div></div></div>`);
        });
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isInfinity)) {
        _push(`<div class="mx-auto d-flex justify-content-center" data-v-95cc915e><div class="spinner-border text-success" role="status" data-v-95cc915e><span class="visually-hidden" data-v-95cc915e>Loading...</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle({ "opacity": "0" })}" data-v-95cc915e>infiniti</div>`);
      if (!unref(playerList).length && !unref(isLoading)) {
        _push(`<div class="d-flex flex-column align-items-center mx-auto mt-5" data-v-95cc915e><div data-v-95cc915e>`);
        _push(ssrRenderComponent(_component_BaseImage, {
          class: "nodata_pic",
          alt: "nodata pic",
          width: "200",
          height: "200",
          src: "/icon/nodata.svg"
        }, null, _parent));
        _push(`</div><p class="fw-bold text-center mt-3" data-v-95cc915e>Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isLoading)) {
        _push(`<div class="loading" data-v-95cc915e><div class="spinner-border text-success" role="status" data-v-95cc915e><span class="visually-hidden" data-v-95cc915e>Loading...</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div id="content-page" class="mt-5" data-v-95cc915e>`);
      if (unref(title)) {
        _push(`<h1 class="page_title" data-v-95cc915e>${ssrInterpolate(unref(title))}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center" data-v-95cc915e>${ssrInterpolate(unref(content))}</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/player/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-95cc915e"]]);

export { index as default };
//# sourceMappingURL=index-Bo_1CAao.mjs.map
