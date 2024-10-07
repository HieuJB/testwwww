import { aC as useError, p as socketStore, q as useMatchStore, s as systemsStore, aD as actionsStore, u as useRouter, a as useRoute, b as useShareCommon, e as useCookie, ak as useRequestURL, aE as TIME_ZONE_LIST, aa as ROUTERS, h as ROUTERS_OLD, ab as useHead, aF as LIVESCORE_ACTIVE_TAB, a7 as useState, aG as active_class, aH as NAME_ROUTERS, aB as defineStore, C as useNuxtApp, k as ROUTER_TEAM_NAME, ad as useFetch, E as API_ROUTERS, ae as createUrl, m as __nuxt_component_0$3, o as _sfc_main$e, aI as getScriptMetaTags, aJ as handleInjectScript, aK as handleInjectMetaTags } from './server.mjs';
import { defineAsyncComponent, defineComponent, ref, reactive, watch, computed, withAsyncContext, unref, withCtx, createVNode, createTextVNode, toDisplayString, withDirectives, vShow, openBlock, createBlock, createCommentVNode, isRef, useSSRContext, nextTick } from 'vue';
import { useSnackbar } from 'vue3-snackbar';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { LazyHydrationWrapper } from 'vue3-lazy-hydration';
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
import 'moment-timezone';
import 'crypto-js';
import 'pako';
import 'buffer';
import '@vueuse/sound';

const useDefault = () => {
  const route = useRoute();
  const lazyLoadStyle = async () => {
    useHead({
      link: [
        {
          rel: "preconnect",
          href: "https://cdn.jsdelivr.net"
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
          href: "/assets/css/index.css"
        }
      ]
    });
  }
  const setColorDynamic = (item) => {
    useHead({
      style: [
        {
          children: `
            ${item}
          `
        }
      ]
    });
  };
  return {
    setColorDynamic
  };
};
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
const __nuxt_component_2_lazy = defineAsyncComponent(() => import('./Breadcrumbs-DyUlRNhN.mjs').then((c) => c.default || c));
const __nuxt_component_3_lazy = defineAsyncComponent(() => import('./HotLeaguesMobile-CM7u0lGe.mjs').then((c) => c.default || c));
const __nuxt_component_4_lazy = defineAsyncComponent(() => import('./ModalSettingMobile-vmCGutYb.mjs').then((c) => c.default || c));
const __nuxt_component_5_lazy = defineAsyncComponent(() => import('./ModalLogin-D_CHx6mm.mjs').then((c) => c.default || c));
const __nuxt_component_6_lazy = defineAsyncComponent(() => import('./ModalRegister-DyFZ6T-F.mjs').then((c) => c.default || c));
const __nuxt_component_7_lazy = defineAsyncComponent(() => import('./ModalSearch-C-S2XSSZ.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a2, _b2;
    var _a, _b, _c, _d, _e, _f;
    let __temp, __restore;
    const error = useError();
    useAuthStore();
    socketStore();
    useMatchStore();
    const storeSystems = systemsStore();
    const useAction = actionsStore();
    const router = useRouter();
    const route = useRoute();
    const { $isloadScripts, $isMobile, $isBot } = useNuxtApp();
    const { useLocale, $t, $trouter, isNavVisible } = useShareCommon();
    const settingsData = useCookie("settingsData");
    const configurations = ref([]);
    const userData = ref();
    const accessToken = ref();
    const routerUrl = ref("");
    const routerName = ref("");
    const tabName = ref("");
    const activeTab = ref("");
    const settingsLanguage = useCookie("settingsLanguage", {
      maxAge: 60 * 60 * 24 * 30
      // 30 days in seconds
    });
    const language = ref((_a = settingsLanguage == null ? void 0 : settingsLanguage.value) == null ? void 0 : _a.language);
    const { setColorDynamic } = useDefault();
    const logo = ref("");
    const favicon = ref("");
    const siteName = ref("");
    const title = ref("");
    const optionIframe = ref(false);
    const description = ref("");
    const robotsMeta = ref("");
    const jsUrlCodeHeader = ref();
    const embedCodeBody = ref("");
    const embedCodeFooter = ref("");
    const codeHeader = ref("");
    const codeBody = ref("");
    const codeFooter = ref("");
    const url = useRequestURL();
    const showSetting = ref(false);
    const isFilterBoxLeague = ref(false);
    const isLoggedIn = ref(((_b = useCookie("accessToken")) == null ? void 0 : _b.value) ? true : false);
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
    const timeZone = ref((_b2 = (_a2 = (_c = settingsData == null ? void 0 : settingsData.value) == null ? void 0 : _c.timeZone) != null ? _a2 : getConfig(storeSystems == null ? void 0 : storeSystems.configurations)) != null ? _b2 : "");
    const timeZoneLabel = ref((_d = TIME_ZONE_LIST.find((item) => item.value === timeZone.value)) == null ? void 0 : _d.key);
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
    const favCount = ref(((_e = useCookie("favouritesData").value) == null ? void 0 : _e.length) ? (_f = useCookie("favouritesData").value) == null ? void 0 : _f.length : null);
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
    [
      $trouter(ROUTERS.HOMEPAGE),
      $trouter(ROUTERS.FOOTBALL_FAVORITES),
      $trouter(ROUTERS.FOOTBALL_RESULT),
      $trouter(ROUTERS.FOOTBALL_SCHEDULE),
      ROUTERS_OLD.LEAGUES,
      $trouter(ROUTERS.FOOTBALL_FAVORITES_LEAGUES),
      $trouter(ROUTERS.FOOTBALL_FAVORITES_TEAMS),
      ROUTERS_OLD.WAREHOUSE
    ];
    const { width } = useWindowSize();
    const isHideNav = ref(null);
    const isNavShow = computed(() => {
      if (width.value > 767) {
        return true;
      }
      if (width.value <= 767 && isNavVisible.value) {
        return true;
      }
      return false;
    });
    const useHeadRobots = () => {
      var _a22, _b22, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l, _m, _n;
      try {
        if (route.path === "/") {
          robotsMeta.value = "index, follow";
        } else if ((_a22 = route.path) == null ? void 0 : _a22.includes(ROUTERS_OLD.MATCH_DETAIL)) {
          robotsMeta.value = getConfig("robot_meta_match") || "";
        } else if ((_b22 = route.path) == null ? void 0 : _b22.includes($trouter(ROUTERS.FOOTBALL_FAVORITES))) {
          robotsMeta.value = "noindex,nofollow";
          ;
        } else if ((_c2 = route.path) == null ? void 0 : _c2.includes(ROUTERS_OLD.LEAGUES)) {
          if ((_d2 = route.name) == null ? void 0 : _d2.includes(NAME_ROUTERS.DETAIL_LEAGUE)) {
            robotsMeta.value = getConfig("robot_meta_league_detail") || "";
          } else {
            robotsMeta.value = getConfig("robot_meta_league") || "";
          }
        } else if ((_e2 = route.path) == null ? void 0 : _e2.includes(ROUTERS_OLD.WAREHOUSE)) {
          robotsMeta.value = getConfig("robot_meta_warehouse") || "";
        } else if ((_f2 = route.path) == null ? void 0 : _f2.includes(ROUTERS_OLD.PLAYER)) {
          robotsMeta.value = getConfig("robot_meta_player") || "";
        } else if ((_g = route.path) == null ? void 0 : _g.includes(ROUTERS_OLD.TEAM)) {
          robotsMeta.value = getConfig("robot_meta_team") || "";
        } else if (((_h = route.path) == null ? void 0 : _h.includes(ROUTER_TEAM_NAME.TEAM)) && !route.params.id) {
          robotsMeta.value = getConfig("robot_meta_team_repository") || "";
        } else if ((_i = route.path) == null ? void 0 : _i.includes(ROUTERS_OLD.PLAYER)) {
          robotsMeta.value = getConfig("robot_meta_player") || "";
        } else if (((_j = route.path) == null ? void 0 : _j.includes(ROUTER_TEAM_NAME.PLAYER)) && !route.params.id) {
          robotsMeta.value = getConfig("robot_meta_player_repository") || "";
        } else if ((_k = route.path) == null ? void 0 : _k.includes(ROUTERS_OLD.COACH)) {
          robotsMeta.value = getConfig("robot_meta_coach") || "";
        } else if ((_l = route.path) == null ? void 0 : _l.includes(ROUTERS_OLD.NEWS)) {
          robotsMeta.value = getConfig("robot_meta_news") || "";
        } else if ((_m = route.path) == null ? void 0 : _m.includes(ROUTERS_OLD.NEWS_TAG)) {
          robotsMeta.value = getConfig("robot_meta_news_tag") || "";
        } else {
          if ((_n = route.path) == null ? void 0 : _n.includes($trouter(ROUTERS.FOOTBALL_FAVORITES))) {
            robotsMeta.value = "noindex,nofollow";
            ;
          } else {
            robotsMeta.value = "index, follow";
          }
        }
        return;
      } catch (e) {
        console.log(e);
        return;
      }
    };
    watch(
      () => route.path,
      () => {
        useHeadRobots();
      }
    );
    const initConfigScriptMeta = () => {
      try {
        const configHeader = configurations.value.find((item) => item.code === "header_script");
        if (configHeader == null ? void 0 : configHeader.value) {
          const metaScriptHeaderList = getScriptMetaTags(configHeader == null ? void 0 : configHeader.value);
          injectTagsHeader.script = handleInjectScript(metaScriptHeaderList == null ? void 0 : metaScriptHeaderList.scriptTags);
          injectTagsHeader.meta = handleInjectMetaTags(metaScriptHeaderList == null ? void 0 : metaScriptHeaderList.metaTags);
        }
      } catch (e) {
        console.log(e);
        return;
      }
    };
    useHead(() => ({
      meta: [{ name: "robots", content: "noindex,nofollow" }]
    }));
    useHead(() => ({
      script: jsUrlCodeHeader.value,
      __dangerouslyDisableSanitizers: ["script"],
      htmlAttrs: {
        lang: useLocale.value.defaultLocale || "vi"
      }
    }));
    useHead(() => ({
      titleTemplate: "%s" + (siteName.value ? " | " + siteName.value : ""),
      link: [
        {
          rel: "canonical",
          href: "https://" + url.hostname + url.pathname
        },
        {
          rel: "icon",
          href: () => favicon.value,
          sizes: "any",
          type: "image/x-icon"
        }
      ],
      script: injectTagsHeader.script,
      meta: injectTagsHeader.meta,
      __dangerouslyDisableSanitizers: ["script"]
    }));
    const fetchConfigurations = (resData) => {
      var _a3, _b3, _c2, _d2;
      try {
        const timeGmt = resData.find((item) => (item == null ? void 0 : item.code) === "TIMEZONE");
        if (timeGmt && timeGmt.value === "") {
          timeGmt.value = "GMT+07:00";
        }
        if (!timeGmt) {
          resData.push({
            name: "Timezone",
            code: "TIMEZONE",
            value: "GMT+07:00"
          });
        }
        configurations.value = resData || [];
        storeSystems.configurations = resData || [];
        language.value = (_a3 = getConfig("language")) != null ? _a3 : "";
        useLocale.value.defaultLocale = (_b3 = getConfig("language")) != null ? _b3 : "";
        siteName.value = getConfig("SITE_NAME") ? getConfig("SITE_NAME") : "";
        logo.value = (_c2 = getConfig("logo")) != null ? _c2 : getConfig("logo");
        favicon.value = (_d2 = getConfig("favicon")) != null ? _d2 : getConfig("favicon");
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
        console.log(e);
      }
    };
    const parseJsList = (text) => {
      try {
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
      } catch (e) {
        console.log(e);
        return "";
      }
    };
    const fetchMenus = async () => {
      try {
        const resData = await useFetch(API_ROUTERS.MENU, "$EkOtDekJM5");
        menus.value = resData.data.value;
      } catch (e) {
      }
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
      try {
        const resData = await useFetch(API_ROUTERS.CONFIGURATIONS, "$5qyVLgIcY3");
        if ((_b22 = (_a22 = resData == null ? void 0 : resData.data) == null ? void 0 : _a22.value) == null ? void 0 : _b22.configurations) {
          fetchConfigurations(resData.data.value.configurations);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const fetchLanguages = async () => {
      try {
        await useFetch(createUrl(API_ROUTERS.LANGUAGE.LIST, {
          query: {
            limit: 1e4
            //lang: useLocale.value.defaultLocale
          }
        }), "$tUSMYLzgYh").then((resData) => {
          var _a22, _b22, _c2;
          if (resData) {
            const mess = [];
            (_c2 = (_b22 = (_a22 = resData == null ? void 0 : resData.data) == null ? void 0 : _a22.value) == null ? void 0 : _b22.languages) == null ? void 0 : _c2.forEach((element) => {
              mess[element == null ? void 0 : element.key] = element == null ? void 0 : element.value;
            });
            useLocale.value.LocaleMessage = mess;
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    [__temp, __restore] = withAsyncContext(() => Promise.all([fetchConfig(), fetchLanguages(), fetchMenus()])), await __temp, __restore();
    const cssVariable = getConfig("CSS_VARIABLE");
    if (cssVariable) {
      setColorDynamic(getConfig("CSS_VARIABLE").replace(/\s+/g, ""));
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a3;
      var _a22, _b22;
      const _component_nuxt_link = __nuxt_component_0$3;
      const _component_nuxt_img = _sfc_main$e;
      const _component_LazyBreadcrumbs = __nuxt_component_2_lazy;
      const _component_LazyHotLeaguesMobile = __nuxt_component_3_lazy;
      const _component_LazyModalSettingMobile = __nuxt_component_4_lazy;
      const _component_LazyModalLogin = __nuxt_component_5_lazy;
      const _component_LazyModalRegister = __nuxt_component_6_lazy;
      const _component_LazyModalSearch = __nuxt_component_7_lazy;
      _push(`<!--[--><div>${(_a3 = unref(embedCodeBody)) != null ? _a3 : ""}</div>`);
      if (unref(route).query.mode !== "iframe" && !unref(iddHideIframe)) {
        _push(`<div id="header-wrapper"><div id="top"><div class="top container"><div class="row"><div class="col-md-12"><nav class="navbar navbar-expand-md py-0 navbar-dark"><div class="container" id="container-padding">`);
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
                class: "cImg logo-brand"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_nuxt_img, {
                  preload: "",
                  src: unref(logo),
                  alt: unref(title),
                  class: "cImg logo-brand"
                }, null, 8, ["src", "alt"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="navbarcollapse"><div style="${ssrRenderStyle({ "min-width": "144px" })}" class="${ssrRenderClass([{ on: unref(isMenuActive) }, "menu_active d-block d-md-none"])}"><i class="${ssrRenderClass("icon iconfont " + unref(selectedMenuIcon))}"></i><span>${ssrInterpolate(unref(selectedMenuName))}</span></div>`);
        if (unref($isloadScripts) || !unref($isMobile)) {
          _push(`<ul id="menu" class="${ssrRenderClass([{ "d-none": !unref(isMenuActive) }, "navbar-nav me-auto"])}"><!--[-->`);
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
                  _push2(`<i class="${ssrRenderClass(["icon-font-" + (menu == null ? void 0 : menu.icon), "icon iconfont"])}"${_scopeId}></i>${ssrInterpolate(unref($t)(menu == null ? void 0 : menu.name))}`);
                } else {
                  return [
                    createVNode("i", {
                      class: ["icon iconfont", "icon-font-" + (menu == null ? void 0 : menu.icon)]
                    }, null, 2),
                    createTextVNode(toDisplayString(unref($t)(menu == null ? void 0 : menu.name)), 1)
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
        _push(`<ul id="menu" class="d-none d-sm-none d-md-flex"><!--[-->`);
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
                _push2(`<i class="${ssrRenderClass(["icon-font-" + (menu == null ? void 0 : menu.icon), "icon iconfont"])}"${_scopeId}></i>${ssrInterpolate(unref($t)(menu == null ? void 0 : menu.name))}`);
              } else {
                return [
                  createVNode("i", {
                    class: ["icon iconfont", "icon-font-" + (menu == null ? void 0 : menu.icon)]
                  }, null, 2),
                  createTextVNode(toDisplayString(unref($t)(menu == null ? void 0 : menu.name)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul><div class="loginBox d-none d-sm-none d-md-flex"><div id="login_icon">`);
        if (!unref(isLoggedIn)) {
          _push(`<span class="wd-white btn-login"><span class="sign_in_btn">${ssrInterpolate(unref($t)("Login"))}</span></span>`);
        } else {
          _push(`<span class="loginBox wd-white btn-login"><div id="login_icon"><span class="member-login-icon"><img${ssrRenderAttr("src", unref(avatarUserLogin) || "/icon/user.png")} alt="" width="100%" height="100%"></span><span class="member-login-icon ms-2"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><g fill="none" stroke="#FF8C00" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"></path><path d="M9 12h12l-3-3m0 6l3-3"></path></g></svg></span></div></span>`);
        }
        _push(`</div></div><div class="list_icon_mobile d-flex d-md-none" style="${ssrRenderStyle({ "min-height": "28px", "display": "flex", "align-items": "center" })}">`);
        if (!unref(isLoggedIn)) {
          _push(`<span id="login_icon" class="icon"><span class="iconfont icon-font-username"></span></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="icon iconfont icon-font-setup2"></span><span id="search_icon" class="icon"><span class="iconfont icon-font-search"></span></span><span class="${ssrRenderClass([{ active: unref(isHideNav) !== null ? unref(isHideNav) : unref(isNavShow) }, "icon iconfont icon-font-menu"])}"></span>`);
        if (unref(isLoggedIn)) {
          _push(`<span id="logout_icon me-1" class=""><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><g fill="none" stroke="#FF8C00" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"></path><path d="M9 12h12l-3-3m0 6l3-3"></path></g></svg></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></nav></div></div><div id="navWrapperContainer" class="d-block d-sm-block d-md-none"><div id="navWrapper" class="row"><div class="col-4 text-center">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE),
          class: ["sub1_2 nav__list", unref(routerUrl) === unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE) ? "on" : ""]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Score"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Score")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="col-4 text-center">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).NEWS_PAGE),
          class: ["sub1_2 nav__list", unref(routerUrl) === unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).NEWS_PAGE) || unref(route).name === ("NAME_ROUTERS" in _ctx ? _ctx.NAME_ROUTERS : unref(NAME_ROUTERS)).NEWS || unref(route).name === ("NAME_ROUTERS" in _ctx ? _ctx.NAME_ROUTERS : unref(NAME_ROUTERS)).SLUG || unref(route).name === ("NAME_ROUTERS" in _ctx ? _ctx.NAME_ROUTERS : unref(NAME_ROUTERS)).TAG ? "on router-link-active" : ""]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Tips"))} <i class="icon iconfont icon-font-heat hot"${_scopeId}></i>`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Tips")) + " ", 1),
                createVNode("i", { class: "icon iconfont icon-font-heat hot" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="col-4 text-center">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).LEAGUES,
          class: ["sub1_2 nav__list", unref(routerName) === ("NAME_ROUTERS" in _ctx ? _ctx.NAME_ROUTERS : unref(NAME_ROUTERS)).LEAGUE || unref(routerName) === ("NAME_ROUTERS" in _ctx ? _ctx.NAME_ROUTERS : unref(NAME_ROUTERS)).DETAIL_LEAGUE ? "on router-link-active" : ""]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Leagues"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Leagues")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div></div><div id="fulltab" style="${ssrRenderStyle((unref(isHideNav) !== null ? unref(isHideNav) : unref(isNavShow)) ? null : { display: "none" })}"><div id="newtop" class="container"><nav class="navigation"><ul class="nav__list menu2"><li class="nav__item d-none d-sm-none d-md-inline-block">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE),
          class: ["nav__list", unref(routerUrl) === unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE) ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Home odds"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Home odds")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li class="nav__item d-inline-block d-md-none">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE),
          class: ["nav__list", unref(activeTab) !== ("LIVESCORE_ACTIVE_TAB" in _ctx ? _ctx.LIVESCORE_ACTIVE_TAB : unref(LIVESCORE_ACTIVE_TAB)).HOT && unref(routerUrl) === unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE) ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Home odds"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Home odds")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li class="nav__item d-inline-block d-md-none">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          class: ["sub1_2 nav__list", unref(activeTab) === ("LIVESCORE_ACTIVE_TAB" in _ctx ? _ctx.LIVESCORE_ACTIVE_TAB : unref(LIVESCORE_ACTIVE_TAB)).HOT && unref(routerUrl) === unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).HOMEPAGE) ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" },
          to: unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_LIVESCORE_TAB) + ("LIVESCORE_ACTIVE_TAB" in _ctx ? _ctx.LIVESCORE_ACTIVE_TAB : unref(LIVESCORE_ACTIVE_TAB)).HOT
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Hot"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Hot")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li class="nav__item">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_FAVORITES),
          class: ["sub1_2 nav__list", unref(routerUrl) === unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_FAVORITES) || unref(routerUrl) === unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_FAVORITES_LEAGUES) || unref(routerUrl) === unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_FAVORITES_TEAMS) ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="icon iconfont icon-font-collect-on"${_scopeId}></i> ${ssrInterpolate(unref($t)("Favorites"))} <i id="favCount" class="fav_count" style="${ssrRenderStyle(unref(favCount) > 0 ? null : { display: "none" })}"${_scopeId}>${ssrInterpolate(unref(favCount))}</i>`);
            } else {
              return [
                createVNode("i", { class: "icon iconfont icon-font-collect-on" }),
                createTextVNode(" " + toDisplayString(unref($t)("Favorites")) + " ", 1),
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
          to: unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_RESULT),
          class: ["sub1_2 nav__list", unref(routerUrl) === unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_RESULT) ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Results"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Results")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li class="nav__item">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_SCHEDULE),
          class: ["sub1_2 nav__list", unref(routerUrl) === unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_SCHEDULE) ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Schedule"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Schedule")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li class="nav__item d-none d-md-inline-block">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).NEWS_PAGE),
          class: ["sub1_2 nav__list", unref(routerUrl) === unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).NEWS_PAGE) || unref(route).name === ("NAME_ROUTERS" in _ctx ? _ctx.NAME_ROUTERS : unref(NAME_ROUTERS)).NEWS || unref(route).name === ("NAME_ROUTERS" in _ctx ? _ctx.NAME_ROUTERS : unref(NAME_ROUTERS)).SLUG || unref(route).name === ("NAME_ROUTERS" in _ctx ? _ctx.NAME_ROUTERS : unref(NAME_ROUTERS)).TAG ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Tips"))} <i class="icon iconfont icon-font-heat hot"${_scopeId}></i>`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Tips")) + " ", 1),
                createVNode("i", { class: "icon iconfont icon-font-heat hot" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li class="nav__item d-none d-md-inline-block">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: ("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).LEAGUES,
          class: ["sub1_2 nav__list", unref(routerName) === ("NAME_ROUTERS" in _ctx ? _ctx.NAME_ROUTERS : unref(NAME_ROUTERS)).LEAGUE || unref(routerName) === ("NAME_ROUTERS" in _ctx ? _ctx.NAME_ROUTERS : unref(NAME_ROUTERS)).DETAIL_LEAGUE ? "on" : ""],
          style: { "min-width": "35px", "min-height": "35px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref($t)("Leagues"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref($t)("Leagues")), 1)
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
        _push(`<div class="crumbs container mb-4" style="${ssrRenderStyle({ "min-height": "26px" })}"><nav aria-label="breadcrumb" class="my-1"><ol class="breadcrumb"><li class="breadcrumb-item on d-flex align-items-center"><a class="router-link-active router-link-exact-active on">${ssrInterpolate(unref($t)("Home page"))}</a></li></ol></nav></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(isHomePage) && !unref(error) && unref(route).query.mode !== "iframe" && !unref(iddHideIframe) && !((_b22 = (_a22 = unref(route)) == null ? void 0 : _a22.params) == null ? void 0 : _b22.slug) && ![unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_FAVORITES), unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_RESULT), unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).FOOTBALL_SCHEDULE), unref($trouter)(("ROUTERS" in _ctx ? _ctx.ROUTERS : unref(ROUTERS)).NEWS)].includes(unref(route).path) && !unref(route).path.includes(("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).MATCH_DETAIL) && !unref(route).path.includes(("ROUTERS_OLD" in _ctx ? _ctx.ROUTERS_OLD : unref(ROUTERS_OLD)).NEWS_TAG)) {
        _push(ssrRenderComponent(_component_LazyBreadcrumbs, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(ssrRenderComponent(unref(LazyHydrationWrapper), { "when-triggered": unref($isloadScripts) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a4, _b3;
          if (_push2) {
            if (unref(route).query.mode !== "iframe" && !unref(iddHideIframe)) {
              _push2(`<footer id="bottom"${_scopeId}><div${_scopeId}><div${_scopeId}>${(_a4 = unref(codeFooter)) != null ? _a4 : ""}</div><div${_scopeId}>${(_b3 = unref(embedCodeFooter)) != null ? _b3 : ""}</div></div></footer>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(route).query.mode !== "iframe" && !unref(iddHideIframe) ? (openBlock(), createBlock("footer", {
                key: 0,
                id: "bottom"
              }, [
                createVNode("div", null, [
                  createVNode("div", { innerHTML: unref(codeFooter) }, null, 8, ["innerHTML"]),
                  createVNode("div", { innerHTML: unref(embedCodeFooter) }, null, 8, ["innerHTML"])
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(iddHideIframe) && !unref(isHomePage)) {
        _push(`<div class="backhome"><a>${ssrInterpolate(unref($t)("Back to Livescore"))}</a></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref($isBot) || unref($isloadScripts)) {
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
//# sourceMappingURL=default-Dct6dV4D.mjs.map
