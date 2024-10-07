<template>
<div v-html="embedCodeBody"></div>








  <div id="header-wrapper" v-if="route.query.mode !== 'iframe' && !iddHideIframe">
    <div id="top">
      <div class="top container">
        <div class="row">
          <div class="col-md-12">
            <nav class="navbar navbar-expand-md py-0 navbar-dark">
              <div class="container" id="container-padding">
                <nuxt-link :to="'/'" style="padding: 3.75px 0;" :aria-label="title">
                  <nuxt-img preload :src="logo" :alt="title" class="cImg logo-brand" />
                </nuxt-link>
                <div class="navbarcollapse">
                  <div style="min-width: 144px;" class="menu_active d-block d-md-none" :class="{ on: isMenuActive }" @click="toggleMenu">
                    <i :class="'icon iconfont ' + selectedMenuIcon"></i>
                    <span>{{ selectedMenuName }}</span>
                  </div>
                  <ul v-if="$isloadScripts || !$isMobile" id="menu" class="navbar-nav me-auto"
                    :class="{ 'd-none': !isMenuActive }">
                    <li class="nav-item" v-for="menu in menus" :key="menu?.id">
                      <nuxt-link :to="menu?.code"
                        :class="active_class(routerUrl, menu?.code, routerName) ? 'tab_on' : ''"
                        @click="selectMenu(menu)" style="min-width: 35px; min-height: 35px;">
                        <i class="icon iconfont" :class="'icon-font-' + menu?.icon"></i>{{ $t(menu?.name) }}
                      </nuxt-link>
                    </li>
                  </ul>
                  <ul id="menu" class="d-none d-sm-none d-md-flex" >
                    <li class="nav-item" v-for="menu in menus" :key="menu?.id">
                      <nuxt-link :to="menu?.code"
                        :class="active_class(routerUrl, menu?.code, routerName) ? 'tab_on' : ''"
                        @click="selectMenu(menu)" style="min-width: 35px; min-height: 35px;">
                        <i class="icon iconfont" :class="'icon-font-' + menu?.icon"></i>{{ $t(menu?.name) }}
                      </nuxt-link>
                    </li>
                  </ul>
                  <div class="loginBox d-none d-sm-none d-md-flex">
                    <div id="login_icon">
                      <span class="wd-white btn-login" @click="openModalLogin" v-if="!isLoggedIn">
                        <span class="sign_in_btn">{{ $t('Login') }}</span>
                      </span>
                      <span class="loginBox wd-white btn-login" v-else>
                        <div id="login_icon">
                          <span class="member-login-icon">
                            <!-- LEO -->
                            <img :src="avatarUserLogin || '/icon/user.png'" alt="" width="100%" height="100%">
                          </span>
                          <span class="member-login-icon ms-2" @click="logout">
                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
                              <g fill="none" stroke="#FF8C00" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2">
                                <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
                                <path d="M9 12h12l-3-3m0 6l3-3" />
                              </g>
                            </svg>
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div class="list_icon_mobile d-flex d-md-none" style="min-height: 28px; display: flex; align-items: center;">
                    <span id="login_icon" class="icon" @click="openModalLogin" v-if="!isLoggedIn">
                      <span class="iconfont icon-font-username"></span>
                    </span>
                    <span class="icon iconfont icon-font-setup2" @click="toSetting()"></span>
                    <span id="search_icon" class="icon" @click="openModalSearch(1)">
                      <span class="iconfont icon-font-search"></span>
                    </span>
                    <span class="icon iconfont icon-font-menu" :class="{ active: isHideNav !== null ? isHideNav : isNavShow }"
                      @click="toggleNav"></span>
                    <span id="logout_icon me-1" class="" @click="logout" v-if="isLoggedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                      <g fill="none" stroke="#FF8C00" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
                        <path d="M9 12h12l-3-3m0 6l3-3" />
                      </g>
                    </svg>
                  </span>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div id="navWrapperContainer" class="d-block d-sm-block d-md-none">
          <div id="navWrapper" class="row">
            <div class="col-4 text-center">
              <nuxt-link :to="$trouter(ROUTERS.HOMEPAGE)" class="sub1_2 nav__list"
                :class="routerUrl === $trouter(ROUTERS.HOMEPAGE) ? 'on' : ''">
                {{ $t('Score') }}
              </nuxt-link>
            </div>
            <div class="col-4 text-center">
              <nuxt-link :to="$trouter(ROUTERS.NEWS_PAGE)" class="sub1_2 nav__list"
                :class="(routerUrl === $trouter(ROUTERS.NEWS_PAGE) || route.name === NAME_ROUTERS.NEWS || route.name === NAME_ROUTERS.SLUG || route.name === NAME_ROUTERS.TAG) ? 'on router-link-active' : ''">
                {{ $t('Tips') }} <i class="icon iconfont icon-font-heat hot"></i>
              </nuxt-link>
            </div>
            <div class="col-4 text-center">
              <nuxt-link :to="ROUTERS_OLD.LEAGUES" class="sub1_2 nav__list" 
              :class="(routerName === NAME_ROUTERS.LEAGUE || routerName === NAME_ROUTERS.DETAIL_LEAGUE)  ? 'on router-link-active' : ''">
                {{ $t('Leagues') }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="fulltab" v-show="isHideNav !== null ? isHideNav : isNavShow">
      <div id="newtop" class="container">
        <nav class="navigation" ref="containerRef">
          <ul class="nav__list menu2">
            <li class="nav__item d-none d-sm-none d-md-inline-block">
              <nuxt-link :to="$trouter(ROUTERS.HOMEPAGE)" class="nav__list" :class="(routerUrl === $trouter(ROUTERS.HOMEPAGE)) ? 'on' : ''"
                style="min-width: 35px; min-height: 35px;">
                {{ $t('Home odds') }}
              </nuxt-link>
            </li>
            <li class="nav__item d-inline-block d-md-none">
              <nuxt-link :to="$trouter(ROUTERS.HOMEPAGE)" class="nav__list"
                :class="((activeTab !== LIVESCORE_ACTIVE_TAB.HOT) && routerUrl === $trouter(ROUTERS.HOMEPAGE)) ? 'on' : ''"
                style="min-width: 35px; min-height: 35px;">
                {{ $t('Home odds') }}
              </nuxt-link>
            </li>
            <li class="nav__item d-inline-block d-md-none">
              <nuxt-link class="sub1_2 nav__list"
                :class="((activeTab === LIVESCORE_ACTIVE_TAB.HOT) && routerUrl === $trouter(ROUTERS.HOMEPAGE))  ? 'on' : ''"
                style="min-width: 35px; min-height: 35px;"
                :to="$trouter(ROUTERS.FOOTBALL_LIVESCORE_TAB) + LIVESCORE_ACTIVE_TAB.HOT">
                {{ $t('Hot') }}
              </nuxt-link>
            </li>
            <li class="nav__item">
              <nuxt-link :to="$trouter(ROUTERS.FOOTBALL_FAVORITES)" class="sub1_2 nav__list"
                :class="(routerUrl === $trouter(ROUTERS.FOOTBALL_FAVORITES) || routerUrl === $trouter(ROUTERS.FOOTBALL_FAVORITES_LEAGUES) || routerUrl === $trouter(ROUTERS.FOOTBALL_FAVORITES_TEAMS)) ? 'on' : ''"
                style="min-width: 35px; min-height: 35px;">
                <i class="icon iconfont icon-font-collect-on"></i>
                {{ $t('Favorites') }}
                <i id="favCount" class="fav_count" v-show="favCount > 0">{{favCount}}</i>
              </nuxt-link>
            </li>
            <li class="nav__item">
              <nuxt-link :to="$trouter(ROUTERS.FOOTBALL_RESULT)" class="sub1_2 nav__list"
                :class="routerUrl === $trouter(ROUTERS.FOOTBALL_RESULT) ? 'on' : ''" style="min-width: 35px; min-height: 35px;">
                {{ $t('Results') }}
              </nuxt-link>
            </li>
            <li class="nav__item">
              <nuxt-link :to="$trouter(ROUTERS.FOOTBALL_SCHEDULE)" class="sub1_2 nav__list"
                :class="routerUrl === $trouter(ROUTERS.FOOTBALL_SCHEDULE) ? 'on' : ''" style="min-width: 35px; min-height: 35px;">
                {{ $t('Schedule') }}
              </nuxt-link>
            </li>
            <li class="nav__item d-none d-md-inline-block">
              <nuxt-link :to="$trouter(ROUTERS.NEWS_PAGE)" class="sub1_2 nav__list"
              :class="(routerUrl === $trouter(ROUTERS.NEWS_PAGE) || route.name === NAME_ROUTERS.NEWS || route.name === NAME_ROUTERS.SLUG || route.name === NAME_ROUTERS.TAG) ? 'on' : ''" style="min-width: 35px; min-height: 35px;">
                {{ $t('Tips') }} <i class="icon iconfont icon-font-heat hot"></i>
              </nuxt-link>
            </li>
            <!-- <li class="nav__item">
              <a href='#' class="sub1_7 nav__list">6in1</a>
            </li> -->
            <li class="nav__item d-none d-md-inline-block">
              <nuxt-link :to="ROUTERS_OLD.LEAGUES" class="sub1_2 nav__list"
                :class="(routerName === NAME_ROUTERS.LEAGUE || routerName === NAME_ROUTERS.DETAIL_LEAGUE)  ? 'on' : ''" style="min-width: 35px; min-height: 35px;">
                {{ $t('Leagues') }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <div>
    <div v-if="isHomePage" class="crumbs container mb-4" style="min-height: 26px;">
      <nav aria-label="breadcrumb" class="my-1">
        <ol class="breadcrumb">
          <li class="breadcrumb-item on d-flex align-items-center"><a
              class="router-link-active router-link-exact-active on">{{ $t('Home page') }}</a></li>
        </ol>
      </nav>
    </div>
    <!-- <LazyBreadcrumbs v-if="!isHomePage && !error && route.query.mode !== 'iframe' && !iddHideIframe && !route?.params?.slug && ![$trouter(ROUTERS.FOOTBALL_FAVORITES), $trouter(ROUTERS.FOOTBALL_RESULT), $trouter(ROUTERS.FOOTBALL_SCHEDULE), $trouter(ROUTERS.NEWS)].includes(route.path) && !route.path.includes(ROUTERS_OLD.MATCH_DETAIL) && !route.path.includes(ROUTERS_OLD.NEWS_TAG)"/> -->
  </div>

  <!-- <slot />

  <LazyHydrationWrapper :when-triggered="$isloadScripts">
    <footer id="bottom" v-if="route.query.mode !== 'iframe' && !iddHideIframe">
      <div>
        <div v-html="codeFooter"></div>
        <div v-html="embedCodeFooter"></div>
      </div>
    </footer>
  </LazyHydrationWrapper>

  <div v-if="iddHideIframe && !isHomePage" class="backhome">
    <a @click="goBackHome">{{ $t('Back to Livescore') }}</a>
  </div>

  <LazyHotLeaguesMobile v-if="!$isBot || $isloadScripts" />

  <LazyModalSettingMobile v-if="showSetting" 
    @showFilterLeague="showFilterLeague"
    v-model:timeZoneLabel="timeZoneLabel"
    v-model:timeZone="timeZone"
    v-model:showSetting="showSetting"
  />

  <LazyModalLogin @openModalRegister="openModalRegister" v-if="isInitModal"/>

  <LazyModalRegister @openModalRegister="openModalRegister" @openModalLogin="openModalLogin" v-if="isInitModalRegister"/>

  <LazyModalSearch v-if="isInitModalSearch"/> -->

</template>
<script setup lang="ts">
import { LazyHydrationWrapper } from 'vue3-lazy-hydration';
import { systemsStore } from '~/stores/systems';
import { actionsStore } from '~/stores/useActions'
import { useMatchStore } from '@/stores/useMatchStore'
import { useAuthStore } from '~/stores/auth';
const error = useError()
const authStore = useAuthStore()
const socket = socketStore()
const matchStore = useMatchStore()
const storeSystems = systemsStore();
const useAction = actionsStore()
const router = useRouter();
const route = useRoute();
const { $isloadScripts, $isMobile, $isBot } = useNuxtApp()
const { useLocale, $t, $trouter, isNavVisible } = useShareCommon()

// Get data from cookie
const settingsData = useCookie<any>('settingsData')
const configurations = ref([]);
const userData = ref();
const accessToken = ref();
const routerUrl = ref('');
const routerName = ref('');
const tabName = ref('');
const activeTab  = ref('')
const settingsLanguage = useCookie('settingsLanguage', {
  maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
});
const language = ref(settingsLanguage?.value?.language)
const { setColorDynamic } = useDefault()
const logo = ref('')
const favicon = ref('')
const siteName = ref('')
const title = ref('');
const optionIframe = ref(false);
const description = ref('');

const robotsMeta = ref('')
const jsUrlCodeHeader = ref();
const embedCodeBody = ref('');
const embedCodeFooter = ref('');
const codeHeader = ref('');
const codeBody = ref('');
const codeFooter = ref('');
const url = useRequestURL()
const showSetting = ref(false);


const isFilterBoxLeague = ref(false)
const isLoggedIn = ref(useCookie('accessToken')?.value ? true : false)
const avatarUserLogin = ref()
const userName = ref('')
const isInitModal = ref(false)
const isInitModalRegister = ref(false)
const isInitModalSearch = ref(false)
const injectTagsHeader = reactive({
  script: [],
  meta: []
})

const getConfig = (key) => {
  return key && configurations.value.find(config => config.code === key)?.value;
};
const timeZone = ref(settingsData?.value?.timeZone ?? getConfig(storeSystems?.configurations, 'TIMEZONE') ?? '')
const timeZoneLabel = ref(TIME_ZONE_LIST.find(item => item.value === timeZone.value)?.key)

const toSetting = () => {
  showSetting.value = true
}

const openModalLogin = async() => {
  const { $loadScripts } = useNuxtApp()
  $loadScripts().then(async() => {
    isInitModal.value = false
    await nextTick()
    isInitModal.value = true
  })
}

const openModalRegister = () => {
  const { $loadScripts } = useNuxtApp()
  $loadScripts().then(async() => {
    isInitModalRegister.value = false
    await nextTick()
    isInitModalRegister.value = true
  })
}

const openModalSearch = (tab) => {
  useAction.isOpenSearchForm = false // Reset
  useAction.isOpenSearchForm = tab
}

const openModalSearchInit = (tab) => {
  const { $loadScripts } = useNuxtApp()
  $loadScripts().then(async() => {
    isInitModalSearch.value = false
    await nextTick()
    isInitModalSearch.value = true
  })
}

watch(
  useAction,
  () => {
    if (useAction?.isOpenSearchForm) {
      openModalSearchInit(useAction?.isOpenSearchForm)
    }
}, { deep: true })

const snackbar = useSnackbar();
const logout = async () => {
  try {
    const { data, pending, error, refresh } =  useFetch(API_ROUTERS.AUTH.LOGOUT, {
      method: 'POST',
      headers: {
        Authorization: useCookie('accessToken')?.value,
      },
    })

    useCookie('accessToken').value = null
    useCookie('refreshToken').value = null
    useCookie('userData').value = null

    storeSystems.accessToken = ''
    storeSystems.userData = []
    //storeSystems.$reset()
    authStore.$reset()
    useAction.$reset()
    //socket.close()
    //socket.$reset()
    snackbar.add({
      type: 'success',
      text: $t('Logout successful')
    })
  }
  catch (e: any) {
    if (e?.response?._data?.detail)
      snackbar.add({
          type: 'error',
          text: $t(e?.response?._data?.detail)
      })
    else
      snackbar.add({
          type: 'error',
          text: $t('An error occurred')
      })
  }
}


const menus = ref([]);
const favCount = ref(useCookie<any>('favouritesData').value?.length ? useCookie<any>('favouritesData').value?.length : null);
// const cFavouritesLeagues = useCookie('favouritesLeagues', {
//   maxAge: 60 * 60 * 24, // 30 days in seconds
// });

const selectedMenu = ref(null);
const isMenuActive = ref(false);
const selectedMenuName = computed(() => {
  if (selectedMenu.value) {
    return selectedMenu.value.name;
  } else if (menus.value?.length > 0) {
    return menus.value[0].name;
  }
  return '';
});

const selectedMenuIcon = computed(() => {
  if (selectedMenu.value) {
    return 'icon-font-' + selectedMenu.value.icon;
  } else if (menus.value?.length > 0) {
    return 'icon-font-' + menus.value[0].icon;
  }
  return 'icon-footballclass2';
});

const selectMenu = (menu) => {
  selectedMenu.value = menu;
  isMenuActive.value = false;
};
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
};

const showFilterLeague = () => {
  isFilterBoxLeague.value = true
  activeTab.value = LIVESCORE_ACTIVE_TAB.LEAGUE
  showSetting.value = false
  useAction.isOpenFilterLeague = true
}


////////////////////////
const showPaths = [
  $trouter(ROUTERS.HOMEPAGE),
  $trouter(ROUTERS.FOOTBALL_FAVORITES),
  $trouter(ROUTERS.FOOTBALL_RESULT),
  $trouter(ROUTERS.FOOTBALL_SCHEDULE),
  ROUTERS_OLD.LEAGUES,
  $trouter(ROUTERS.FOOTBALL_FAVORITES_LEAGUES),
  $trouter(ROUTERS.FOOTBALL_FAVORITES_TEAMS),
  ROUTERS_OLD.WAREHOUSE
];
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize(); 

const isHideNav= ref(null)
// const isNavVisible = ref(true)

const isNavShow = computed(() => {
  if (width.value > 767) {
    return true;
  }
  if (width.value <= 767 && (isNavVisible.value)) {
    return true;
  }

  return false;
});

const toggleNav = () => {
  if(isHideNav.value === null) {
    isHideNav.value = !isNavShow.value
  }else {
    isHideNav.value = !isHideNav.value
  }
};
const useHeadRobots = () => {
  try {
    // Meta robots
    if(route.path === '/') {
      robotsMeta.value = 'index, follow';
    } else if (route.path?.includes(ROUTERS_OLD.MATCH_DETAIL)) {
      robotsMeta.value = getConfig('robot_meta_match') || '';
    } else if (route.path?.includes($trouter(ROUTERS.FOOTBALL_FAVORITES))) {
      robotsMeta.value = 'noindex,nofollow';;
    } else if (route.path?.includes(ROUTERS_OLD.LEAGUES)) {
      if (route.name?.includes(NAME_ROUTERS.DETAIL_LEAGUE)) {
        robotsMeta.value = getConfig('robot_meta_league_detail') || '';
      } else {
        robotsMeta.value = getConfig('robot_meta_league') || '';
      }
    }  else if (route.path?.includes(ROUTERS_OLD.WAREHOUSE)) {
      robotsMeta.value = getConfig('robot_meta_warehouse') || '';
    } else if (route.path?.includes(ROUTERS_OLD.PLAYER)) {
      robotsMeta.value = getConfig('robot_meta_player') || '';
    } else if (route.path?.includes(ROUTERS_OLD.TEAM)) {
      robotsMeta.value =  getConfig('robot_meta_team') || '';
    } else if (route.path?.includes(ROUTER_TEAM_NAME.TEAM) && !route.params.id) {
      robotsMeta.value = getConfig('robot_meta_team_repository') || '';
    } else if (route.path?.includes(ROUTERS_OLD.PLAYER)) {
      robotsMeta.value = getConfig('robot_meta_player') || '';
    } else if (route.path?.includes(ROUTER_TEAM_NAME.PLAYER) && !route.params.id) {
      robotsMeta.value = getConfig('robot_meta_player_repository') || '';
    } else if (route.path?.includes(ROUTERS_OLD.COACH)) {
      robotsMeta.value = getConfig('robot_meta_coach') || '';
    } else if (route.path?.includes(ROUTERS_OLD.NEWS)) {
      robotsMeta.value = getConfig('robot_meta_news') || '';
    } else if (route.path?.includes(ROUTERS_OLD.NEWS_TAG)) {
      robotsMeta.value = getConfig('robot_meta_news_tag') || '';
    } else {
      // Page theo doi
      if (route.path?.includes($trouter(ROUTERS.FOOTBALL_FAVORITES))) {
        robotsMeta.value = 'noindex,nofollow';;
      } else {
        robotsMeta.value = 'index, follow';
      }
    }
    return;
  } catch(e) {
    console.log(e)
    return;
  }
}
//////////////////////////////
watch(
  () => route.path,
  () => {
    useHeadRobots();
  }
);

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleClickOutside = (event) => {
  const menuActiveElement = document.querySelector('.menu_active');
  if (menuActiveElement && !menuActiveElement.contains(event.target)) {
    isMenuActive.value = false;
  }
};


const initConfigScriptMeta = () => {
  try {
    const configHeader = configurations.value.find(item => item.code === 'header_script')
  
    if(configHeader?.value) {
      const metaScriptHeaderList = getScriptMetaTags(configHeader?.value)
      injectTagsHeader.script = handleInjectScript(metaScriptHeaderList?.scriptTags)
      injectTagsHeader.meta = handleInjectMetaTags(metaScriptHeaderList?.metaTags)
    }
  } catch(e) {
    console.log(e)
    return
  }
}

useHead(() => ({
  meta: [ {name: "robots", content: 'noindex,nofollow' }]
}));

useHead(() => ({
  script: jsUrlCodeHeader.value,
  __dangerouslyDisableSanitizers: ['script'],
  
  htmlAttrs: {
    lang: useLocale.value.defaultLocale || 'vi', 
  },
}));

useHead(() => ({
  titleTemplate: '%s' + (siteName.value ? (' | ' + siteName.value) : ''),
  link: [
    {
      rel: 'canonical',
      href: 'https://' + url.hostname + url.pathname,
    },
    {
      rel: 'icon',
      href: () => favicon.value,
      sizes: 'any',
      type: 'image/x-icon'
    },
  ],
  script: injectTagsHeader.script,
  meta: injectTagsHeader.meta,
  __dangerouslyDisableSanitizers: ['script'],
}));

const fetchConfigurations = (resData) => {
  try {
    //checkTimeZoneExist
    const timeGmt = resData.find((item) => item?.code === 'TIMEZONE')
    
    if (timeGmt && timeGmt.value === '') {
      timeGmt.value = "GMT+07:00"
    } 

    if(!timeGmt) {
      resData.push({
        name: "Timezone",
        code: "TIMEZONE",
        value: "GMT+07:00"
      })
    }
    //end
    configurations.value = resData || [];
    storeSystems.configurations = resData || [];
    language.value = getConfig('language') ?? '';
    useLocale.value.defaultLocale = getConfig('language') ?? '';
    siteName.value = getConfig('SITE_NAME') ? getConfig('SITE_NAME') : '';
    
    logo.value = getConfig('logo') ?? getConfig('logo');
    favicon.value = getConfig('favicon') ?? getConfig('favicon');
    title.value = getConfig('SEO_META_TITLE') ? getConfig('SEO_META_TITLE') : '';
    storeSystems.updateTitle(title.value);
    
    optionIframe.value = getConfig('option_iframe');
    storeSystems.updateoptionIframe(optionIframe.value);
    
    description.value = getConfig('SEO_META_DESCRIPTION') ? getConfig('SEO_META_DESCRIPTION') : '';
    useHeadRobots()
    if (timeZone.value === '' && getConfig('TIMEZONE') !== '') {
      timeZone.value = getConfig('TIMEZONE')
    }
    codeHeader.value = getConfig('code_header') ? getConfig('code_header') : '';
    codeBody.value = getConfig('code_body') ? getConfig('code_body') : '';
    codeFooter.value = getConfig('code_footer') ? getConfig('code_footer') : '';
    jsUrlCodeHeader.value = parseJsList(getConfig('js_url_header') || '')
    embedCodeBody.value = getConfig('embed_code_body') || '';
    embedCodeFooter.value = getConfig('embed_code_footer') || '';
    // initConfigScriptMeta()
  } catch (e) {
    console.log(e)
  }
};

const parseJsList = (text) => {
  try {
    if (text?.trim().length === 0)
      return ''
    const elements = text.split("\n");
    let jsLists = []
    if (elements) {
      elements?.forEach(element => {
        var jsObj = {}
        jsObj['src'] = element
        jsObj['defer'] = true
        jsLists.push(jsObj)
      });
    }
    return jsLists;
  } catch(e) {
    console.log(e)
    return ''
  }
};

const fetchMenus = async () => {
  try {
    const resData = await useFetch<any>(API_ROUTERS.MENU);
    menus.value = resData.data.value;
  } catch (e) {
  }
};

watch(
  () => router?.currentRoute.value?.path,
  () => {
    routerUrl.value = router?.currentRoute?.value?.path;
    routerName.value = router?.currentRoute?.value?.name;
    const url = useRequestURL()
    useHead(() => ({
      link: [
        {
          rel: 'canonical',
          href: 'https://' + url.hostname + url.pathname,
        },
      ],
    }))
  },
  { deep: true, immediate: true }
);

watch(
  () => router?.currentRoute.value?.query,
  () => {
    tabName.value = router?.currentRoute.value?.query?.livescore_tab
    if (tabName.value === LIVESCORE_ACTIVE_TAB.HOT) {
      activeTab.value = LIVESCORE_ACTIVE_TAB.HOT
    } else {
      activeTab.value = LIVESCORE_ACTIVE_TAB.ALL
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => useCookie<any>('favouritesData'),
  () => {
    favCount.value = useCookie<any>('favouritesData').value?.length;
  },
  { deep: true }
);

watch(
  storeSystems,
() => {
  userData.value = storeSystems?.userData
  accessToken.value = storeSystems?.accessToken
  isLoggedIn.value = accessToken?.value
  userName.value = userData?.value?.nick_name
  avatarUserLogin.value = userData?.value?.avatar
})

const state = useState('my-shallow-state', () => false)
const iddHideIframe = ref(false);

watch(
  () => route.fullPath, 
  () => {
    if(route.query.mode === 'iframe') {
    iddHideIframe.value = true;
    state.value = true;
    }
  },
  { immediate: true }
)

const goBackHome = () => {
  router.push('/?mode=iframe');
}

const isHomePage = computed(() => {
  return route.path === '/';
});

// Init socket
const wssInit = () => {
  try {
    // store.wssSocket = useSocket()
    if (!socket.isLoadedWSS) {
      // Close older connect
      //socket.close()
      // Init new
      socket.connect()
      socket.isLoadedWSS = true
    }
    matchStore.wssSocket = socket.wssIntances
  }
  catch (e: any) {
    return false
  }
}

// Socket data
const wssMatch = async() => {
  try {
    if (matchStore.wssSocket) {
      const config = useRuntimeConfig()
      matchStore.wssSocket.onmessage = async function (event) {
        if (event.data) {
          try {
            const reader = new FileReader();
            reader.readAsArrayBuffer(event.data)
            reader.onload = async function () {
              const arrayBuffer = reader.result;
              const uint8Array = new Uint8Array(arrayBuffer);
              const { default: pako } = await import('pako');
              const { default: msgpack } = await import('msgpack-lite');
              const decompressed = pako.inflate(uint8Array);
              const wssItem = msgpack.decode(decompressed);
              matchStore.socketData = wssItem
            }
          }
          catch (e: any) {
            return false
          }
        }
      }
    }
  }
  catch (e: any) {
    return false
  }
}


const fetchConfig = async() => {
    try {
      // console.time("Time")
      const startTime = performance.now()
      // const resData = await useFetch<any>(API_ROUTERS.CONFIGURATIONS); 
      // if(resData?.data?.value?.configurations) {
        // console.log(resData?.data?.value?.configurations);
        
        fetchConfigurations(CONFIG)
      // }
      const endTime = performance.now()
      console.log(endTime-startTime);
      
    } catch (e) {
      console.log(e)
    }
}


const fetchLanguages = async () => {
  try {
    await useFetch<any>(createUrl(API_ROUTERS.LANGUAGE.LIST, {
      query: {
        limit: 10000,
        //lang: useLocale.value.defaultLocale
      },
    })).then(resData => {
      if (resData) {
        const mess = []
        //const messEn = []
        resData?.data?.value?.languages?.forEach(element => {
          mess[element?.key] = element?.value
          //messEn[element?.key] = element?.en
        })
        useLocale.value.LocaleMessage = mess
      }
    })
  }
  catch (e: any) {
    console.log(e)
  }
}

await Promise.all([fetchConfig()])

const cssVariable = getConfig('CSS_VARIABLE')
if(cssVariable) {
  setColorDynamic(getConfig('CSS_VARIABLE').replace(/\s+/g, ''))
}

const setLanguage = () => {
  if (!settingsLanguage?.value) {
    settingsLanguage.value = JSON.stringify( {
      language: language.value,
    })
  }
}
onMounted(async () => {
  if (error.value) {
    setTimeout(async()=> {
      const resData = await useFetch<any>(API_ROUTERS.CONFIGURATIONS); 
      if(resData?.data?.value?.configurations) {
        fetchConfigurations(resData.data.value.configurations)
      }

      await fetchLanguages()
    })
  }
  if ('requestIdleCallback' in window) {
    // setTimeout(()=> {
    //   fetchMenus()
    // },0)
    userData.value = useCookie('userData')?.value
    accessToken.value = useCookie('accessToken')?.value
    isLoggedIn.value = accessToken?.value ? true : false
    userName.value = userData?.value?.nick_name
    avatarUserLogin.value = userData?.value?.avatar
    setLanguage()
    wssInit()
    wssMatch()
    document.addEventListener('click', handleClickOutside);

  } else {
    setTimeout(async() => {
      // fetchMenus()

      userData.value = useCookie('userData')?.value
      accessToken.value = useCookie('accessToken')?.value
      isLoggedIn.value = accessToken?.value ? true : false
      userName.value = userData?.value?.nick_name
      avatarUserLogin.value = userData?.value?.avatar

      setLanguage()
      wssInit()
      wssMatch()
      document.addEventListener('click', handleClickOutside);
    }, 0);
  }
});
</script>

<style lang="scss">
</style>
