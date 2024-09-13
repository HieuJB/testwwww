import { z as useError, e as useRouter, u as useRoute, b as useCookie, d as useHead, a as useState, l as defineStore, i as useNuxtApp, f as __nuxt_component_0$2, y as __nuxt_component_2$1 } from './server.mjs';
import { _ as _sfc_main$1 } from './NuxtImg-z5Tschba.mjs';
import { defineAsyncComponent, defineComponent, ref, reactive, watch, computed, withAsyncContext, unref, withCtx, createVNode, createTextVNode, toDisplayString, withDirectives, vShow, isRef, useSSRContext, nextTick } from 'vue';
import { s as socketStore } from './wsocket-BREvIJI8.mjs';
import { u as useRequestURL } from './url-DZIKx68S.mjs';
import { j as TIME_ZONE_LIST, i as LIVESCORE_ACTIVE_TAB } from './constants-DJp0NbxW.mjs';
import { useSnackbar } from 'vue3-snackbar';
import { a as useFetch } from './fetch-CC0zbYw2.mjs';
import { R as ROUTERS, A as API_ROUTERS } from './routers-Dr-sal51.mjs';
import { k as getScriptMetaTags, l as handleInjectScript, m as handleInjectMetaTags } from './helper-CGhdpGxz.mjs';
import { a as active_class } from './router_helper-BQtO3to1.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';
import { a as actionsStore } from './useActions-CkrJjy4V.mjs';
import { u as useMatchStore } from './useMatchStore-Dgc_MSrX.mjs';
import { useWindowSize } from '@vueuse/core';
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

const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false
  }),
  actions: {
    // async authenticateUser({ username, password }: UserPayloadInterface) {
    //   // useFetch from nuxt 3
    //   const { data, pending }: any = await useFetch('https://dummyjson.com/auth/login', {
    //     method: 'post',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: {
    //       username,
    //       password,
    //     },
    //   });
    //   this.loading = pending;
    //   if (data.value) {
    //     const token = useCookie('token'); // useCookie new hook in nuxt 3
    //     token.value = data?.value?.token; // set token to cookie
    //     this.authenticated = true; // set authenticated  state value to true
    //   }
    // },
    authenticateUser() {
      this.authenticated = true;
    },
    logUserOut() {
      this.authenticated = false;
    }
  }
});
const __nuxt_component_3_lazy = defineAsyncComponent(() => import('./Breadcrumbs-z9k3TmpP.mjs').then((c) => c.default || c));
const __nuxt_component_4_lazy = defineAsyncComponent(() => import('./HotLeaguesMobile-CM7u0lGe.mjs').then((c) => c.default || c));
const __nuxt_component_5_lazy = defineAsyncComponent(() => import('./ModalSettingMobile-Bc0Oca6C.mjs').then((c) => c.default || c));
const __nuxt_component_6_lazy = defineAsyncComponent(() => import('./ModalLogin-MZ8Gx6_L.mjs').then((c) => c.default || c));
const __nuxt_component_7_lazy = defineAsyncComponent(() => import('./ModalRegister-C-UufsAP.mjs').then((c) => c.default || c));
const __nuxt_component_8_lazy = defineAsyncComponent(() => import('./ModalSearch-C-S2XSSZ.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a2, _b2;
    var _a, _b, _c, _d, _e;
    let __temp, __restore;
    const error = useError();
    useAuthStore();
    socketStore();
    useMatchStore();
    const storeSystems = systemsStore();
    const useAction = actionsStore();
    const router = useRouter();
    const route = useRoute();
    const { $isloadScripts, $isMobile } = useNuxtApp();
    const settingsData = useCookie("settingsData");
    const configurations = ref([]);
    const userData = ref();
    const accessToken = ref();
    const routerUrl = ref("");
    const routerName = ref("");
    const tabName = ref("");
    const activeTab = ref("");
    const logo = ref("");
    const siteName = ref("");
    const title = ref("");
    const optionIframe = ref(false);
    const description = ref("");
    ref("");
    const jsUrlCodeHeader = ref();
    const embedCodeBody = ref("");
    const embedCodeFooter = ref("");
    const codeHeader = ref("");
    const codeBody = ref("");
    const codeFooter = ref("");
    const url = useRequestURL();
    const showSetting = ref(false);
    const isFilterBoxLeague = ref(false);
    const isLoggedIn = ref(((_a = useCookie("accessToken")) == null ? void 0 : _a.value) ? true : false);
    const avatarUserLogin = ref();
    const userName = ref("");
    const isInitModal = ref(false);
    const isInitModalRegister = ref(false);
    const isInitModalSearch = ref(false);
    const injectTagsHeader = reactive({
      script: [],
      meta: []
    });
    const getConfig = (key) => {
      var _a22;
      return key && ((_a22 = configurations.value.find((config) => config.code === key)) == null ? void 0 : _a22.value);
    };
    const timeZone = ref((_b2 = (_a2 = (_b = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _b.timeZone) != null ? _a2 : getConfig(storeSystems == null ? void 0 : storeSystems.configurations)) != null ? _b2 : "");
    const timeZoneLabel = ref((_c = TIME_ZONE_LIST.find((item) => item.value === timeZone.value)) == null ? void 0 : _c.key);
    const openModalLogin = async () => {
      const { $loadScripts } = useNuxtApp();
      $loadScripts().then(async () => {
        isInitModal.value = false;
        await nextTick();
        isInitModal.value = true;
      });
    };
    const openModalRegister = () => {
      const { $loadScripts } = useNuxtApp();
      $loadScripts().then(async () => {
        isInitModalRegister.value = false;
        await nextTick();
        isInitModalRegister.value = true;
      });
    };
    const openModalSearchInit = (tab) => {
      const { $loadScripts } = useNuxtApp();
      $loadScripts().then(async () => {
        isInitModalSearch.value = false;
        await nextTick();
        isInitModalSearch.value = true;
      });
    };
    watch(
      useAction,
      () => {
        if (useAction == null ? void 0 : useAction.isOpenSearchForm) {
          openModalSearchInit(useAction == null ? void 0 : useAction.isOpenSearchForm);
        }
      },
      { deep: true }
    );
    useSnackbar();
    const menus = ref([]);
    const favCount = ref(((_d = useCookie("favouritesData").value) == null ? void 0 : _d.length) ? (_e = useCookie("favouritesData").value) == null ? void 0 : _e.length : null);
    const selectedMenu = ref(null);
    const isMenuActive = ref(false);
    const selectedMenuName = computed(() => {
      var _a22;
      if (selectedMenu.value) {
        return selectedMenu.value.name;
      } else if (((_a22 = menus.value) == null ? void 0 : _a22.length) > 0) {
        return menus.value[0].name;
      }
      return "";
    });
    const selectedMenuIcon = computed(() => {
      var _a22;
      if (selectedMenu.value) {
        return "icon-font-" + selectedMenu.value.icon;
      } else if (((_a22 = menus.value) == null ? void 0 : _a22.length) > 0) {
        return "icon-font-" + menus.value[0].icon;
      }
      return "icon-footballclass2";
    });
    const selectMenu = (menu) => {
      selectedMenu.value = menu;
      isMenuActive.value = false;
    };
    const showFilterLeague = () => {
      isFilterBoxLeague.value = true;
      activeTab.value = LIVESCORE_ACTIVE_TAB.LEAGUE;
      showSetting.value = false;
      useAction.isOpenFilterLeague = true;
    };
    const showPaths = [
      ROUTERS.HOMEPAGE,
      ROUTERS.FOOTBALL_FAVORITES,
      ROUTERS.FOOTBALL_RESULT,
      ROUTERS.FOOTBALL_SCHEDULE,
      ROUTERS.LEAGUES,
      ROUTERS.FOOTBALL_FAVORITES_LEAGUES,
      ROUTERS.FOOTBALL_FAVORITES_TEAMS,
      ROUTERS.WAREHOUSE
    ];
    const { width } = useWindowSize();
    const isHideNav = ref(null);
    const isNavVisible = computed(() => {
      const isMatchDetail = route.path.includes("/match/");
      const isLeagueDetail = route.path.includes("/league/");
      if (width.value <= 768 && (isMatchDetail || isLeagueDetail)) {
        return false;
      }
      return showPaths.includes(route.path) || isMatchDetail || isLeagueDetail || error;
    });
    const useHeadRobots = () => {
      useHead(() => ({
        meta: [{ name: "robots", content: "noindex,nofollow" }]
      }));
    };
    watch(
      () => route.path,
      () => {
        useHeadRobots();
      }
    );
    const initConfigScriptMeta = () => {
      const configHeader = configurations.value.find((item) => item.code === "header_script");
      if (configHeader.value) {
        const metaScriptHeaderList = getScriptMetaTags(configHeader.value);
        injectTagsHeader.script = handleInjectScript(metaScriptHeaderList.scriptTags);
        injectTagsHeader.meta = handleInjectMetaTags(metaScriptHeaderList.metaTags);
      }
    };
    useHead(() => ({
      script: jsUrlCodeHeader.value,
      __dangerouslyDisableSanitizers: ["script"]
    }));
    useHead(() => ({
      titleTemplate: "%s" + (siteName.value ? " | " + siteName.value : ""),
      link: [
        {
          rel: "canonical",
          href: "https://" + url.hostname + url.pathname
        }
      ],
      script: injectTagsHeader.script,
      meta: injectTagsHeader.meta,
      __dangerouslyDisableSanitizers: ["script"]
    }));
    const fetchConfigurations = async (resData) => {
      var _a3;
      try {
        configurations.value = resData || [];
        storeSystems.configurations = resData || [];
        siteName.value = getConfig("SITE_NAME") ? getConfig("SITE_NAME") : "";
        logo.value = (_a3 = getConfig("logo")) != null ? _a3 : getConfig("logo");
        title.value = getConfig("SEO_META_TITLE") ? getConfig("SEO_META_TITLE") : "";
        storeSystems.updateTitle(title.value);
        optionIframe.value = getConfig("option_iframe");
        storeSystems.updateoptionIframe(optionIframe.value);
        description.value = getConfig("SEO_META_DESCRIPTION") ? getConfig("SEO_META_DESCRIPTION") : "";
        useHeadRobots();
        if (timeZone.value === "" && getConfig("TIMEZONE") !== "") {
          timeZone.value = getConfig("TIMEZONE");
        }
        codeHeader.value = getConfig("code_header") ? getConfig("code_header") : "";
        codeBody.value = getConfig("code_body") ? getConfig("code_body") : "";
        codeFooter.value = getConfig("code_footer") ? getConfig("code_footer") : "";
        jsUrlCodeHeader.value = parseJsList(getConfig("js_url_header") || "");
        embedCodeBody.value = getConfig("embed_code_body") || "";
        embedCodeFooter.value = getConfig("embed_code_footer") || "";
        initConfigScriptMeta();
      } catch (e) {
      }
    };
    const parseJsList = (text) => {
      if ((text == null ? void 0 : text.trim().length) === 0)
        return "";
      const elements = text.split("\n");
      let jsLists = [];
      if (elements) {
        elements == null ? void 0 : elements.forEach((element) => {
          var jsObj = {};
          jsObj["src"] = element;
          jsObj["defer"] = true;
          jsLists.push(jsObj);
        });
      }
      return jsLists;
    };
    watch(
      () => {
        var _a22;
        return (_a22 = router == null ? void 0 : router.currentRoute.value) == null ? void 0 : _a22.path;
      },
      () => {
        var _a22, _b22, _c2, _d2;
        routerUrl.value = (_b22 = (_a22 = router == null ? void 0 : router.currentRoute) == null ? void 0 : _a22.value) == null ? void 0 : _b22.path;
        routerName.value = (_d2 = (_c2 = router == null ? void 0 : router.currentRoute) == null ? void 0 : _c2.value) == null ? void 0 : _d2.name;
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
      () => {
        var _a22;
        return (_a22 = router == null ? void 0 : router.currentRoute.value) == null ? void 0 : _a22.query;
      },
      () => {
        var _a22, _b22;
        tabName.value = (_b22 = (_a22 = router == null ? void 0 : router.currentRoute.value) == null ? void 0 : _a22.query) == null ? void 0 : _b22.livescore_tab;
        if (tabName.value === LIVESCORE_ACTIVE_TAB.HOT) {
          activeTab.value = LIVESCORE_ACTIVE_TAB.HOT;
        } else {
          activeTab.value = LIVESCORE_ACTIVE_TAB.ALL;
        }
      },
      { deep: true, immediate: true }
    );
    watch(
      () => useCookie("favouritesData"),
      () => {
        var _a22;
        favCount.value = (_a22 = useCookie("favouritesData").value) == null ? void 0 : _a22.length;
      },
      { deep: true }
    );
    watch(
      storeSystems,
      () => {
        var _a22, _b22;
        userData.value = storeSystems == null ? void 0 : storeSystems.userData;
        accessToken.value = storeSystems == null ? void 0 : storeSystems.accessToken;
        isLoggedIn.value = accessToken == null ? void 0 : accessToken.value;
        userName.value = (_a22 = userData == null ? void 0 : userData.value) == null ? void 0 : _a22.nick_name;
        avatarUserLogin.value = (_b22 = userData == null ? void 0 : userData.value) == null ? void 0 : _b22.avatar;
      }
    );
    const state = useState("my-shallow-state", () => false);
    const iddHideIframe = ref(false);
    watch(
      () => route.fullPath,
      () => {
        if (route.query.mode === "iframe") {
          iddHideIframe.value = true;
          state.value = true;
        }
      },
      { immediate: true }
    );
    const isHomePage = computed(() => {
      return route.path === "/";
    });
    const fetchConfig = async () => {
      var _a22, _b22;
      if (!error.value) {
        const resData = await useFetch(API_ROUTERS.CONFIGURATIONS, "$5qyVLgIcY3");
        if ((_b22 = (_a22 = resData == null ? void 0 : resData.data) == null ? void 0 : _a22.value) == null ? void 0 : _b22.configurations) {
          fetchConfigurations(resData.data.value.configurations);
        }
      }
    };
    [__temp, __restore] = withAsyncContext(() => fetchConfig()), await __temp, __restore();
    const lazyLoadStyle = async () => {
      useHead({
        link: [
          {
            rel: "preconnect",
            href: "https://cdn.jsdelivr.net"
          },
          {
            rel: "preload",
            href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
            as: "style",
            onload: 'this.onload=null;this.rel="stylesheet"'
          },
          {
            rel: "stylesheet",
            href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          },
          {
            rel: "stylesheet",
            href: "/assets/css/mergecss.css"
          }
        ]
      });
      Promise.resolve({});
    };
    if (route.path !== "/") {
      lazyLoadStyle();
    } else {
      useHead({
        link: [
          {
            rel: "stylesheet",
            href: "/assets/css/bootraps.min.css"
          }
        ]
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a3, _b3, _c2;
      var _a22;
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_nuxt_img = _sfc_main$1;
      const _component_ClientOnly = __nuxt_component_2$1;
      const _component_LazyBreadcrumbs = __nuxt_component_3_lazy;
      const _component_LazyHotLeaguesMobile = __nuxt_component_4_lazy;
      const _component_LazyModalSettingMobile = __nuxt_component_5_lazy;
      const _component_LazyModalLogin = __nuxt_component_6_lazy;
      const _component_LazyModalRegister = __nuxt_component_7_lazy;
      const _component_LazyModalSearch = __nuxt_component_8_lazy;
      _push(`<!--[--><div>${(_a3 = unref(embedCodeBody)) != null ? _a3 : ""}</div>`);
      if (unref(route).query.mode !== "iframe" && !unref(iddHideIframe)) {
        _push(`<div id="header-wrapper"><div id="top"><div class="top container"><div class="row"><div class="col-md-12"><nav class="navbar navbar-expand-md py-0 navbar-dark"><div class="container">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: "/",
          style: { "padding": "3.75px 0" },
          "aria-label": unref(title)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_nuxt_img, {
                preload: "",
                src: unref(logo),
                alt: unref(title),
                height: "45",
                width: "131",
                class: "cImg",
                style: { "display": "inline", "object-fit": "cover" }
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_nuxt_img, {
                  preload: "",
                  src: unref(logo),
                  alt: unref(title),
                  height: "45",
                  width: "131",
                  class: "cImg",
                  style: { "display": "inline", "object-fit": "cover" }
                }, null, 8, ["src", "alt"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="navbarcollapse"><div style="${ssrRenderStyle({ "min-width": "144px" })}" class="${ssrRenderClass([{ on: unref(isMenuActive) }, "menu_active d-block d-md-none"])}"><i class="${ssrRenderClass("icon iconfont " + unref(selectedMenuIcon))}"></i><span>${ssrInterpolate(unref(selectedMenuName))}</span></div>`);
        if (unref($isloadScripts) || !unref($isMobile)) {
          _push(`<ul id="menu" class="${ssrRenderClass([{ "d-none d-md-flex": !unref(isMenuActive) }, "navbar-nav me-auto"])}"><!--[-->`);
          ssrRenderList(unref(menus), (menu) => {
            _push(`<li class="nav-item">`);
            _push(ssrRenderComponent(_component_nuxt_link, {
              to: menu == null ? void 0 : menu.code,
              class: ("active_class" in _ctx ? _ctx.active_class : unref(active_class))(unref(routerUrl), menu == null ? void 0 : menu.code, unref(routerName)) ? "tab_on" : "",
              onClick: ($event) => selectMenu(menu),
              style: { "min-width": "35px", "min-height": "35px" }
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
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref($isMobile)) {
          _push(`<div class="loginBox d-none d-md-flex"><div id="login_icon">`);
          if (!unref(isLoggedIn)) {
            _push(`<span class="wd-white btn-login"><span class="sign_in_btn">\u0110\u0103ng nh\u1EADp</span></span>`);
          } else {
            _push(`<span class="loginBox wd-white btn-login"><div id="login_icon"><span class="member-login-icon"><img${ssrRenderAttr("src", unref(avatarUserLogin) || "/icon/user.png")} alt="" width="100%" height="100%"></span><span class="member-login-icon ms-2"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><g fill="none" stroke="#FF8C00" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"></path><path d="M9 12h12l-3-3m0 6l3-3"></path></g></svg></span></div></span>`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="list_icon_mobile d-flex d-md-none" style="${ssrRenderStyle({ "min-height": "28px" })}">`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div></div></div></nav></div></div><div id="navWrapperContainer" class="d-block d-sm-block d-md-none"><div id="navWrapper" class="row" style="${ssrRenderStyle((unref(isHideNav) !== null ? unref(isHideNav) : unref(isNavVisible)) ? null : { display: "none" })}"><div class="col-4 text-center">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE,
          class: ["sub1_2 nav__list", unref(routerUrl) === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE ? "on" : ""]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` T\u1EF7 s\u1ED1 `);
            } else {
              return [
                createTextVNode(" T\u1EF7 s\u1ED1 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="col-4 text-center">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).NEWS_PAGE,
          class: ["sub1_2 nav__list", unref(routerUrl) === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).NEWS_PAGE ? "on" : ""]
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
        _push(`</div><div class="col-4 text-center">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).LEAGUES,
          class: ["sub1_2 nav__list", ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).LEAGUES ? "on" : ""]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Gia\u0309i \u0111\xE2\u0301u `);
            } else {
              return [
                createTextVNode(" Gia\u0309i \u0111\xE2\u0301u ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div></div><div id="fulltab" style="${ssrRenderStyle((unref(isHideNav) !== null ? unref(isHideNav) : unref(isNavVisible)) ? null : { display: "none" })}"><div id="newtop" class="container"><nav class="navigation"><ul class="nav__list menu2"><li class="nav__item d-none d-sm-none d-md-inline-block">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE,
          class: ["nav__list", unref(routerUrl) === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" }
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
          class: ["nav__list", unref(activeTab) !== ("LIVESCORE_ACTIVE_TAB" in _ctx ? _ctx.LIVESCORE_ACTIVE_TAB : unref(LIVESCORE_ACTIVE_TAB)).HOT && unref(routerUrl) === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" }
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
          class: ["sub1_2 nav__list", unref(activeTab) === ("LIVESCORE_ACTIVE_TAB" in _ctx ? _ctx.LIVESCORE_ACTIVE_TAB : unref(LIVESCORE_ACTIVE_TAB)).HOT && unref(routerUrl) === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" },
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
          class: ["sub1_2 nav__list", unref(routerUrl) === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_FAVORITES ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="icon iconfont icon-font-collect-on"${_scopeId}></i> Theo d\xF5i <i id="favCount" class="fav_count" style="${ssrRenderStyle(unref(favCount) > 0 ? null : { display: "none" })}"${_scopeId}>${ssrInterpolate(unref(favCount))}</i>`);
            } else {
              return [
                createVNode("i", { class: "icon iconfont icon-font-collect-on" }),
                createTextVNode(" Theo d\xF5i "),
                withDirectives(createVNode("i", {
                  id: "favCount",
                  class: "fav_count"
                }, toDisplayString(unref(favCount)), 513), [
                  [vShow, unref(favCount) > 0]
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li class="nav__item">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_RESULT,
          class: ["sub1_2 nav__list", unref(routerUrl) === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_RESULT ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" }
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
          class: ["sub1_2 nav__list", unref(routerUrl) === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_SCHEDULE ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" }
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
          class: ["sub1_2 nav__list", unref(routerUrl) === ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).NEWS_PAGE ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" }
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
          to: ("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).LEAGUES,
          class: ["sub1_2 nav__list", ((_a22 = unref(routerUrl)) == null ? void 0 : _a22.includes(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).LEAGUES)) ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Gia\u0309i \u0111\xE2\u0301u `);
            } else {
              return [
                createTextVNode(" Gia\u0309i \u0111\xE2\u0301u ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></ul></nav></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div>`);
      if (unref(isHomePage)) {
        _push(`<div class="crumbs container mb-4" style="${ssrRenderStyle({ "min-height": "26px" })}"><nav aria-label="breadcrumb" class="my-1"><ol class="breadcrumb"><li class="breadcrumb-item on d-flex align-items-center"><a class="router-link-active router-link-exact-active on">Trang ch\u1EE7</a></li></ol></nav></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(isHomePage) && !unref(error) && unref(route).query.mode !== "iframe" && !unref(iddHideIframe)) {
        _push(ssrRenderComponent(_component_LazyBreadcrumbs, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      if (unref(route).query.mode !== "iframe" && !unref(iddHideIframe)) {
        _push(`<footer id="bottom"><div><div>${(_b3 = unref(codeFooter)) != null ? _b3 : ""}</div><div>${(_c2 = unref(embedCodeFooter)) != null ? _c2 : ""}</div></div></footer>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(iddHideIframe) && !unref(isHomePage)) {
        _push(`<div class="backhome"><a>Quay l\u1EA1i b\u1EA3ng</a></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!_ctx.$isBot) {
        _push(ssrRenderComponent(_component_LazyHotLeaguesMobile, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(showSetting)) {
        _push(ssrRenderComponent(_component_LazyModalSettingMobile, {
          onShowFilterLeague: showFilterLeague,
          timeZoneLabel: unref(timeZoneLabel),
          "onUpdate:timeZoneLabel": ($event) => isRef(timeZoneLabel) ? timeZoneLabel.value = $event : null,
          timeZone: unref(timeZone),
          "onUpdate:timeZone": ($event) => isRef(timeZone) ? timeZone.value = $event : null,
          showSetting: unref(showSetting),
          "onUpdate:showSetting": ($event) => isRef(showSetting) ? showSetting.value = $event : null
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(isInitModal)) {
        _push(ssrRenderComponent(_component_LazyModalLogin, { onOpenModalRegister: openModalRegister }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(isInitModalRegister)) {
        _push(ssrRenderComponent(_component_LazyModalRegister, {
          onOpenModalRegister: openModalRegister,
          onOpenModalLogin: openModalLogin
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(isInitModalSearch)) {
        _push(ssrRenderComponent(_component_LazyModalSearch, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-DW_eXSdq.mjs.map
