import { s as systemsStore, u as useRouter, a as useRoute, ak as useRequestURL, e as useCookie, ab as useHead, R as ROUTERS_GROUP, aG as active_class, aa as ROUTERS, aF as LIVESCORE_ACTIVE_TAB, h as ROUTERS_OLD, ad as useFetch, ae as createUrl, E as API_ROUTERS, m as __nuxt_component_0$3 } from './server.mjs';
import { defineComponent, ref, computed, watch, withCtx, createVNode, toDisplayString, unref, createTextVNode, withDirectives, vShow, useSSRContext } from 'vue';
import { ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b;
    const storeSystems = systemsStore();
    const router = useRouter();
    useRoute();
    const configurations = ref([]);
    ref();
    ref();
    const routerUrl = ref("");
    const routerName = ref("");
    const title = ref("");
    const description = ref("");
    ref(false);
    const imageDownloadApp = ref([]);
    const iconSocial = ref([]);
    const codeHeader = ref("");
    const codeBody = ref("");
    const codeFooter = ref("");
    const hiddenTopTools = ref(false);
    const url = useRequestURL();
    const selectedMenu = ref(null);
    const isMenuActive = ref(false);
    const isNavVisible = ref(true);
    const selectedMenuName = computed(() => {
      var _a2;
      if (selectedMenu.value) {
        return selectedMenu.value.name;
      } else if (((_a2 = menus.value) == null ? void 0 : _a2.length) > 0) {
        return menus.value[0].name;
      }
      return "";
    });
    const selectedMenuIcon = computed(() => {
      var _a2;
      if (selectedMenu.value) {
        return "icon-font-" + selectedMenu.value.icon;
      } else if (((_a2 = menus.value) == null ? void 0 : _a2.length) > 0) {
        return "icon-font-" + menus.value[0].icon;
      }
      return "icon-footballclass2";
    });
    const selectMenu = (menu) => {
      selectedMenu.value = menu;
      isMenuActive.value = false;
    };
    const menus = ref([]);
    const favCount = ref(((_a = useCookie("favouritesData").value) == null ? void 0 : _a.length) ? (_b = useCookie("favouritesData").value) == null ? void 0 : _b.length : null);
    useHead({
      title: "Trang kh\xF4ng t\u1ED3n t\u1EA1i",
      meta: [
        { name: "description", content: "" }
      ]
    });
    useHead(() => ({
      link: [
        {
          rel: "canonical",
          href: "https://" + url.hostname + url.pathname
        }
      ]
    }));
    computed(() => {
      return ROUTERS_GROUP.LIVESCORE.includes(routerUrl.value) || routerUrl.value.includes(ROUTERS_GROUP.MATCH) || routerUrl.value.includes(ROUTERS_GROUP.ODDS) || routerUrl.value.includes(ROUTERS_GROUP.ASIAN_HANDICAP_ODDS) || routerUrl.value.includes(ROUTERS_GROUP.ODDS_1X2) || routerUrl.value.includes(ROUTERS_GROUP.OVER_UNDER_ODDS) || routerUrl.value.includes(ROUTERS_GROUP.CORNER_OU_ODDS) || routerUrl.value.includes(ROUTERS_GROUP.EURO_HANDICAP_ODDS) || routerUrl.value.includes(ROUTERS_GROUP.DOUBLE_CHANCE_ODDS) || routerUrl.value.includes(ROUTERS_GROUP.CORRECT_SCORE_ODDS);
    });
    const getConfig = (key) => {
      var _a2, _b2, _c, _d;
      return key && ((_b2 = (_a2 = configurations.value) == null ? void 0 : _a2.filter((config) => config.code === key)[0]) == null ? void 0 : _b2.value) ? (_d = (_c = configurations.value) == null ? void 0 : _c.filter((config) => config.code === key)[0]) == null ? void 0 : _d.value : "";
    };
    const fetchConfigurations = async () => {
      var _a2, _b2;
      try {
        const resData = await useFetch(createUrl(API_ROUTERS.CONFIGURATIONS), "$8deu89mYer");
        configurations.value = ((_a2 = resData.data.value) == null ? void 0 : _a2.configurations) || [];
        storeSystems.configurations = ((_b2 = resData.data.value) == null ? void 0 : _b2.configurations) || [];
        title.value = getConfig("SEO_META_TITLE") ? getConfig("SEO_META_TITLE") : "";
        description.value = getConfig("SEO_META_DESCRIPTION") ? getConfig("SEO_META_DESCRIPTION") : "";
        const imagesDownloadApp = getConfig("download_app");
        imageDownloadApp.value = imagesDownloadApp ? JSON.parse(imagesDownloadApp) : [];
        const iconsSocial = getConfig("icon_social");
        iconSocial.value = iconsSocial ? JSON.parse(iconsSocial) : [];
        codeHeader.value = getConfig("code_header") ? getConfig("code_header") : "";
        codeBody.value = getConfig("code_body") ? getConfig("code_body") : "";
        codeFooter.value = getConfig("code_footer") ? getConfig("code_footer") : "";
        if (getConfig("HIDDEN_TOP_TOOLS") == "True") {
          hiddenTopTools.value = true;
        }
      } catch (e) {
      }
    };
    const fetchMenus = async () => {
      try {
        const resData = await useFetch(createUrl(API_ROUTERS.MENU), "$7N9eorbSnv");
        menus.value = resData.data.value;
      } catch (e) {
      }
    };
    fetchConfigurations();
    fetchMenus();
    watch(
      () => {
        var _a2;
        return (_a2 = router == null ? void 0 : router.currentRoute.value) == null ? void 0 : _a2.path;
      },
      () => {
        var _a2, _b2, _c, _d;
        routerUrl.value = (_b2 = (_a2 = router == null ? void 0 : router.currentRoute) == null ? void 0 : _a2.value) == null ? void 0 : _b2.path;
        routerName.value = (_d = (_c = router == null ? void 0 : router.currentRoute) == null ? void 0 : _c.value) == null ? void 0 : _d.name;
        const url2 = useRequestURL();
        useHead(() => ({
          link: [
            {
              rel: "canonical",
              href: "https://" + url2.hostname + url2.pathname
            }
          ]
        }));
      },
      { deep: true, immediate: true }
    );
    watch(
      () => useCookie("favouritesData"),
      () => {
        var _a2;
        favCount.value = (_a2 = useCookie("favouritesData").value) == null ? void 0 : _a2.length;
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a3;
      var _a2;
      const _component_nuxt_link = __nuxt_component_0$3;
      _push(`<!--[--><div id="header-wrapper"><div style="${ssrRenderStyle(!hiddenTopTools.value ? null : { display: "none" })}" id="top-tools"><div class="top-tools-c container"><div class="row"><div class="top-tools-left col-md-6"><div class="Choose-tool d-inline-block" id="chooseOddsType"><span id="selectedOddsType">Hong Kong Odds</span><i></i><ul id="ddlOddsType" style="${ssrRenderStyle({ "display": "none" })}"><li id="oddsType_4">Decimal Odds</li></ul></div></div><div class="top-tools-left2 col-md-6"><div class="swiper-wrapper" id="noteSwiper"></div></div></div></div></div><div id="top"><div id="topAdDiv container"></div><div class="top container"><div class="row"><div class="col-md-12"><nav class="navbar navbar-expand-md py-3 navbar-dark"><div class="container">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/",
        class: "navbar-brand d-flex align-items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", getConfig("logo"))}${ssrRenderAttr("alt", title.value)} srcset="" style="${ssrRenderStyle({ "max-height": "45px" })}"${_scopeId}><h1 class="d-none"${_scopeId}>${ssrInterpolate(title.value)}</h1>`);
          } else {
            return [
              createVNode("img", {
                src: getConfig("logo"),
                alt: title.value,
                srcset: "",
                style: { "max-height": "45px" }
              }, null, 8, ["src", "alt"]),
              createVNode("h1", { class: "d-none" }, toDisplayString(title.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="navbarcollapse"><div class="${ssrRenderClass([{ on: isMenuActive.value }, "menu_active d-block d-md-none"])}"><i class="${ssrRenderClass("icon iconfont " + unref(selectedMenuIcon))}"></i><span>${ssrInterpolate(unref(selectedMenuName))}</span></div><ul id="menu" class="${ssrRenderClass([{ "d-none d-md-flex": !isMenuActive.value }, "navbar-nav me-auto"])}"><!--[-->`);
      ssrRenderList(menus.value, (menu) => {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: menu == null ? void 0 : menu.code,
          class: ("active_class" in _ctx ? _ctx.active_class : unref(active_class))(routerUrl.value, menu == null ? void 0 : menu.code, routerName.value) ? "tab_on" : "",
          onClick: ($event) => selectMenu(menu)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="${ssrRenderClass(["icon-font-" + (menu == null ? void 0 : menu.icon), "icon iconfont"])}"${_scopeId}></i>${ssrInterpolate(menu == null ? void 0 : menu.name)}`);
            } else {
              return [
                createVNode("i", {
                  class: ["icon iconfont", "icon-font-" + (menu == null ? void 0 : menu.icon)]
                }, null, 2),
                createTextVNode(toDisplayString(menu == null ? void 0 : menu.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul><div class="loginBox d-none d-md-flex"><div id="login_icon">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: "wd-white",
        to: "/dang-nhap"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="sign_in_btn"${_scopeId}>\u0110\u0103ng nh\u1EADp</span>`);
          } else {
            return [
              createVNode("span", { class: "sign_in_btn" }, "\u0110\u0103ng nh\u1EADp")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="list_icon_mobile d-block d-md-none"><span id="login_icon" class="icon"><a title="\u0110\u0103ng nh\u1EADp" class="wd-white" href="/dang-nhap"><span class="iconfont icon-font-username"></span></a></span><span class="icon iconfont icon-font-setup2"></span><span id="search_icon" class="icon"><span class="iconfont icon-font-search"></span></span><span class="${ssrRenderClass([{ active: isNavVisible.value }, "icon iconfont icon-font-menu"])}"></span></div></div></div></nav></div></div></div></div><div id="fulltab"><div id="newtop" class="container"><nav class="navigation"><ul class="nav__list menu2"><li class="nav__item d-none d-sm-none d-md-inline-block">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE,
        class: ["nav__list", routerUrl.value === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE ? "on" : ""]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` T\u1EF7 l\u1EC7 k\xE8o `);
          } else {
            return [
              createTextVNode(" T\u1EF7 l\u1EC7 k\xE8o ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav__item d-inline-block d-md-none">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE,
        class: ["nav__list", _ctx.activeTab !== ("LIVESCORE_ACTIVE_TAB" in _ctx ? _ctx.LIVESCORE_ACTIVE_TAB : unref(LIVESCORE_ACTIVE_TAB)).HOT && routerUrl.value === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE ? "on" : ""]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` T\u1EF7 l\u1EC7 k\xE8o `);
          } else {
            return [
              createTextVNode(" T\u1EF7 l\u1EC7 k\xE8o ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav__item d-inline-block d-md-none">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: ["sub1_2 nav__list", _ctx.activeTab === ("LIVESCORE_ACTIVE_TAB" in _ctx ? _ctx.LIVESCORE_ACTIVE_TAB : unref(LIVESCORE_ACTIVE_TAB)).HOT && routerUrl.value === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE ? "on" : ""],
        to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_LIVESCORE_TAB + ("LIVESCORE_ACTIVE_TAB" in _ctx ? _ctx.LIVESCORE_ACTIVE_TAB : unref(LIVESCORE_ACTIVE_TAB)).HOT
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Hot `);
          } else {
            return [
              createTextVNode(" Hot ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav__item">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_FAVORITES,
        class: ["sub1_2 nav__list", routerUrl.value === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_FAVORITES ? "on" : ""]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon iconfont icon-font-collect-on"${_scopeId}></i> Theo d\xF5i <i id="favCount" class="fav_count" style="${ssrRenderStyle(favCount.value > 0 ? null : { display: "none" })}"${_scopeId}>${ssrInterpolate(favCount.value)}</i>`);
          } else {
            return [
              createVNode("i", { class: "icon iconfont icon-font-collect-on" }),
              createTextVNode(" Theo d\xF5i "),
              withDirectives(createVNode("i", {
                id: "favCount",
                class: "fav_count"
              }, toDisplayString(favCount.value), 513), [
                [vShow, favCount.value > 0]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav__item">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_RESULT,
        class: ["sub1_2 nav__list", routerUrl.value === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_RESULT ? "on" : ""]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` K\u1EBFt qu\u1EA3 `);
          } else {
            return [
              createTextVNode(" K\u1EBFt qu\u1EA3 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav__item">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_SCHEDULE,
        class: ["sub1_2 nav__list", routerUrl.value === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_SCHEDULE ? "on" : ""]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` L\u1ECBch thi \u0111\u1EA5u `);
          } else {
            return [
              createTextVNode(" L\u1ECBch thi \u0111\u1EA5u ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav__item d-none d-md-inline-block">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).NEWS_PAGE,
        class: ["sub1_2 nav__list", routerUrl.value === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).NEWS_PAGE ? "on" : ""]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tips <i class="icon iconfont icon-font-heat hot"${_scopeId}></i>`);
          } else {
            return [
              createTextVNode(" Tips "),
              createVNode("i", { class: "icon iconfont icon-font-heat hot" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav__item d-none d-md-inline-block">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).LEAGUES,
        class: ["sub1_2 nav__list", ((_a2 = routerUrl.value) == null ? void 0 : _a2.includes(("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).LEAGUES)) ? "on" : ""]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kho d\u1EEF li\u1EC7u `);
          } else {
            return [
              createTextVNode(" Kho d\u1EEF li\u1EC7u ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></nav></div></div></div><div class="crumbs container mb-4"></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<footer id="bottom">${(_a3 = codeFooter.value) != null ? _a3 : ""}</footer><div class="icon-list_match-setting d-block d-sm-block d-md-none"><div class="list_match"><a class="btn-icon" data-bs-toggle="offcanvas" href="#offcanvasLeft" role="button" aria-controls="offcanvasLeft" aria-label="Tournament list"><i class="icon iconfont icon-font-menu"></i></a></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=error-B97MH4ph.mjs.map
