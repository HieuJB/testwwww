<template>
  <div id="header-wrapper">
    <div v-show="!hiddenTopTools" id="top-tools">
      <div class="top-tools-c container">
        <div class="row">
          <div class="top-tools-left col-md-6">
            <div class="Choose-tool d-inline-block" id="chooseOddsType" @click="showHideOddsType">
              <span id="selectedOddsType">Hong Kong Odds</span>
              <i></i>
              <ul id="ddlOddsType" style="display: none;">
                <li @click="changeTopOddsType(4)" id="oddsType_4">Decimal Odds</li>
                <!-- Add remaining odds types -->
              </ul>
            </div>
          </div>
          <div class="top-tools-left2 col-md-6">
            <div class="swiper-wrapper" id="noteSwiper">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="top">
      <div id="topAdDiv container"></div>
      <div class="top container">
        <div class="row">
          <div class="col-md-12">
            <nav class="navbar navbar-expand-md py-3 navbar-dark">
              <div class="container">
                <nuxt-link :to="'/'" class="navbar-brand d-flex align-items-center">
                  <img
                    :src="getConfig('logo')"
                    :alt="title"
                    srcset=""
                    style="max-height: 45px"
                  >
                  <h1 class="d-none">
                    {{ title }}
                  </h1>
                </nuxt-link>
                <div class="navbarcollapse">
                  <div 
                    class="menu_active d-block d-md-none" 
                    :class="{ on: isMenuActive }" 
                    @click="toggleMenu"
                  >
                    <i :class="'icon iconfont ' + selectedMenuIcon"></i>
                    <span>{{ selectedMenuName }}</span>
                  </div>
                  <ul id="menu" class="navbar-nav me-auto" :class="{ 'd-none d-md-flex': !isMenuActive }">
                    <li
                      class="nav-item"
                      v-for="menu in menus"
                      :key="menu?.id"
                    >
                    <nuxt-link 
                      :to="menu?.code" 
                      :class="active_class(routerUrl, menu?.code, routerName) ? 'tab_on' : ''"
                      @click="selectMenu(menu)"
                    >
                      <i class="icon iconfont" :class="'icon-font-' + menu?.icon"></i>{{ menu?.name }}
                    </nuxt-link>
                    </li>
                  </ul>
                  <div class="loginBox d-none d-md-flex">
                    <div id="login_icon">
                      <nuxt-link  class="wd-white" to="/dang-nhap">
                        <span class="sign_in_btn">Đăng nhập</span>
                      </nuxt-link>
                    </div>
                  </div>
                  <div class="list_icon_mobile d-block d-md-none">
                    <span id="login_icon" class="icon">
                      <a title="Đăng nhập" class="wd-white" href="/dang-nhap">
                        <span class="iconfont icon-font-username"></span>
                      </a>
                    </span>
                    <span class="icon iconfont icon-font-setup2" @click="toSetting()"></span>
                    <span id="search_icon" class="icon" @click="openModalSearch(1)">
                      <span class="iconfont icon-font-search"></span>
                    </span>
                    <span 
                      class="icon iconfont icon-font-menu"
                      :class="{ active: isNavVisible }"
                      @click="toggleNav"
                    ></span>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div id="fulltab">
      <div id="newtop" class="container">
        <nav class="navigation" ref="containerRef">
          <ul class="nav__list menu2">
            <li class="nav__item d-none d-sm-none d-md-inline-block">
              <nuxt-link :to="ROUTERS.HOMEPAGE" class="nav__list" :class="(routerUrl === ROUTERS.HOMEPAGE) ? 'on' : ''">
                Tỷ lệ kèo
              </nuxt-link>
            </li>
            <li class="nav__item d-inline-block d-md-none">
              <nuxt-link :to="ROUTERS.HOMEPAGE" class="nav__list" :class="((activeTab !== LIVESCORE_ACTIVE_TAB.HOT) && routerUrl === ROUTERS.HOMEPAGE) ? 'on' : ''">
                Tỷ lệ kèo
              </nuxt-link>
            </li>
            <li class="nav__item d-inline-block d-md-none">
              <nuxt-link class="sub1_2 nav__list" :class="((activeTab === LIVESCORE_ACTIVE_TAB.HOT) && routerUrl === ROUTERS.HOMEPAGE)  ? 'on' : ''"  
              :to="ROUTERS.FOOTBALL_LIVESCORE_TAB + LIVESCORE_ACTIVE_TAB.HOT">
                Hot
              </nuxt-link>
            </li>
            <li class="nav__item">
              <nuxt-link :to="ROUTERS.FOOTBALL_FAVORITES" class="sub1_2 nav__list" :class="routerUrl === ROUTERS.FOOTBALL_FAVORITES ? 'on' : ''">
                <i class="icon iconfont icon-font-collect-on"></i>
                Theo dõi
                <i id="favCount" class="fav_count" v-show="favCount > 0">{{favCount}}</i>
              </nuxt-link>
            </li>
            <li class="nav__item">
              <nuxt-link :to="ROUTERS.FOOTBALL_RESULT" class="sub1_2 nav__list" :class="routerUrl === ROUTERS.FOOTBALL_RESULT ? 'on' : ''">
                Kết quả
              </nuxt-link>
            </li>
            <li class="nav__item">
              <nuxt-link :to="ROUTERS.FOOTBALL_SCHEDULE" class="sub1_2 nav__list" :class="routerUrl === ROUTERS.FOOTBALL_SCHEDULE ? 'on' : ''">
                Lịch thi đấu
              </nuxt-link>
            </li>
            <li class="nav__item d-none d-md-inline-block">
              <nuxt-link :to="ROUTERS.NEWS_PAGE" class="sub1_2 nav__list" :class="routerUrl === ROUTERS.NEWS_PAGE ? 'on' : ''">
                Tips <i class="icon iconfont icon-font-heat hot"></i>
              </nuxt-link>
            </li>
            <!-- <li class="nav__item">
              <a href='#' class="sub1_7 nav__list">6in1</a>
            </li> -->
            <li class="nav__item d-none d-md-inline-block">
              <nuxt-link :to="ROUTERS_OLD.LEAGUES" class="sub1_2 nav__list" :class="routerUrl?.includes(ROUTERS_OLD.LEAGUES) ? 'on' : ''">
                Kho dữ liệu
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <div class="crumbs container mb-4">
  </div>
  <slot />

  <footer id="bottom" v-html="codeFooter">
  </footer>

  <div class="icon-list_match-setting d-block d-sm-block d-md-none">
    <div class="list_match">
      <a class="btn-icon" data-bs-toggle="offcanvas" href="#offcanvasLeft" role="button" aria-controls="offcanvasLeft" aria-label="Tournament list">
        <i class="icon iconfont icon-font-menu"></i>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { systemsStore } from '~/stores/systems';

const storeSystems = systemsStore();
const router = useRouter();
const route = useRoute();
const configurations = ref([]);
const userData = ref();
const accessToken = ref();
const routerUrl = ref('');
const routerName = ref('');

const title = ref('');
const description = ref('');

const isNavbarFixed = ref(false);
const imageDownloadApp = ref([]);
const iconSocial = ref([]);

const codeHeader = ref('');
const codeBody = ref('');
const codeFooter = ref('');
const hiddenTopTools = ref(false)
const url = useRequestURL()
const selectedMenu = ref(null);
const isMenuActive = ref(false);
const isNavVisible = ref(true);
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
const toggleNav = () => {
  isNavVisible.value = !isNavVisible.value;
};

const menus = ref([]);
const favCount = ref(useCookie<any>('favouritesData').value?.length ? useCookie<any>('favouritesData').value?.length : null);
// const cFavouritesLeagues = useCookie('favouritesLeagues', {
//   maxAge: 60 * 60 * 24, // 30 days in seconds
// });

useSeoMeta({
  title: "Trang không tồn tại",
  description: "",
});

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: 'https://' + url.hostname + url.pathname,
    },
  ],
}))

const shouldShowFullTab = computed(() => {
  return ROUTERS_GROUP.LIVESCORE.includes(routerUrl.value) || routerUrl.value.includes(ROUTERS_GROUP.MATCH) 
    || routerUrl.value.includes(ROUTERS_GROUP.ODDS) || routerUrl.value.includes(ROUTERS_GROUP.ASIAN_HANDICAP_ODDS)
    || routerUrl.value.includes(ROUTERS_GROUP.ODDS_1X2) || routerUrl.value.includes(ROUTERS_GROUP.OVER_UNDER_ODDS)
    || routerUrl.value.includes(ROUTERS_GROUP.CORNER_OU_ODDS) || routerUrl.value.includes(ROUTERS_GROUP.EURO_HANDICAP_ODDS) 
    || routerUrl.value.includes(ROUTERS_GROUP.DOUBLE_CHANCE_ODDS) || routerUrl.value.includes(ROUTERS_GROUP.CORRECT_SCORE_ODDS);
});

const getConfig = (key) => {
  return key && configurations.value?.filter(config => config.code === key)[0]?.value ? configurations.value?.filter(config => config.code === key)[0]?.value : '';
};

const fetchConfigurations = async () => {
  try {
    const resData = await useFetch<any>(createUrl(API_ROUTERS.CONFIGURATIONS));
    configurations.value = resData.data.value?.configurations || [];
    storeSystems.configurations = resData.data.value?.configurations || [];

    title.value = getConfig('SEO_META_TITLE') ? getConfig('SEO_META_TITLE') : '';
    description.value = getConfig('SEO_META_DESCRIPTION') ? getConfig('SEO_META_DESCRIPTION') : '';

    const imagesDownloadApp = getConfig('download_app');
    imageDownloadApp.value = imagesDownloadApp ? JSON.parse(imagesDownloadApp) : [];

    const iconsSocial = getConfig('icon_social');
    iconSocial.value = iconsSocial ? JSON.parse(iconsSocial) : [];

    codeHeader.value = getConfig('code_header') ? getConfig('code_header') : '';
    codeBody.value = getConfig('code_body') ? getConfig('code_body') : '';
    codeFooter.value = getConfig('code_footer') ? getConfig('code_footer') : '';

    if (getConfig('HIDDEN_TOP_TOOLS') == 'True') {
      hiddenTopTools.value = true
    }
    /*
    localStorage.setItem('primaryColor', getConfig('primaryColor'))
    localStorage.setItem('secondaryColor', getConfig('secondaryColor'))
    localStorage.setItem('textColor', getConfig('textColor'))
    localStorage.setItem('hoverColor', getConfig('hoverColor'))
    localStorage.setItem('backgroundColor', getConfig('backgroundColor'))
    localStorage.setItem('backgroundfooterColor', getConfig('backgroundfooterColor'))
    */

  } catch (e) {
  }
};

const fetchMenus = async () => {
  try {
    const resData = await useFetch<any>(createUrl(API_ROUTERS.MENU));
    menus.value = resData.data.value;
  } catch (e) {
  }
};

fetchConfigurations();
fetchMenus();

watch(
  () => router?.currentRoute.value?.path,
  () => {
    
    routerUrl.value = router?.currentRoute?.value?.path;
    routerName.value = router?.currentRoute?.value?.name

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
  () => useCookie<any>('favouritesData'),
  () => {
    favCount.value = useCookie<any>('favouritesData').value?.length;
  },
  { deep: true }
);

onMounted(async() => {
  // Set color from MK
  if (!configurations.value) {
    fetchConfigurations();
  }
  // document.documentElement.style.setProperty('--primary', getConfig('primaryColor'))
  // document.documentElement.style.setProperty('--secondary', getConfig('secondaryColor'))
  // document.documentElement.style.setProperty('--textcolor', getConfig('textColor'))
  // document.documentElement.style.setProperty('--hovercolor', getConfig('hoverColor'))
  // document.documentElement.style.setProperty('--backgroundcolor', getConfig('backgroundColor'))
  // document.documentElement.style.setProperty('--backgroundfooter', getConfig('backgroundfooterColor'))
  // document.documentElement.style.setProperty('--toptools', getConfig('toptoolsColor'))
  // document.documentElement.style.setProperty('--livescore-header-table', getConfig('livescoreHeaderTableColor'))

  const container = document.querySelector('.navigation');
  if (!container) return;

  const secondary = container.querySelector('.nav__list__more');
  if (!secondary) return;

  const secondaryItems = secondary.querySelectorAll('li');
  const allItems = container.querySelectorAll('li');
  const moreLi = primary.querySelector('.nav__item__more');
  if (!moreLi) return;

  const moreBtn = moreLi.querySelector('button');
  if (!moreBtn) return;

  const handleMoreBtnClick = (e: Event) => {
    e.preventDefault();
    container.classList.toggle('nav__active');
    moreBtn.setAttribute('aria-expanded', String(container.classList.contains('nav__active')));
  };

  moreBtn.addEventListener('click', handleMoreBtnClick);

  const doAdapt = () => {
    allItems.forEach((item) => {
      (item as HTMLElement).classList.remove('nav__hidden');
    });

    let stopWidth = (moreBtn as HTMLElement).offsetWidth;
    let hiddenItems: number[] = [];
    const primaryWidth = (primary as HTMLElement).offsetWidth;

    primaryItems.forEach((item, i) => {
      if (primaryWidth >= stopWidth + (item as HTMLElement).offsetWidth) {
        stopWidth += (item as HTMLElement).offsetWidth;
      } else {
        (item as HTMLElement).classList.add('nav__hidden');
        hiddenItems.push(i);
      }
    });

    if (!hiddenItems?.length) {
      (moreLi as HTMLElement).classList.add('nav__hidden');
      container.classList.remove('nav__active');
      moreBtn.setAttribute('aria-expanded', 'false');
    } else {
      secondaryItems.forEach((item, i) => {
        if (!hiddenItems.includes(i)) {
          (item as HTMLElement).classList.add('nav__hidden');
        }
      });
    }
  };

  doAdapt();
  window.addEventListener('resize', doAdapt);

  const handleClickOutside = (e: MouseEvent) => {
    let el = e.target as HTMLElement | null;
    while (el) {
      if (el === secondary || el === moreBtn) {
        return;
      }
      el = el.parentElement;
    }
    container.classList.remove('nav__active');
    moreBtn.setAttribute('aria-expanded', 'false');
  };

  document.addEventListener('click', handleClickOutside);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', doAdapt);
    document.removeEventListener('click', handleClickOutside);
  });

});

</script>

<style>
@import url("~/assets/css/main.scss");
@import url("~/assets/fonts/iconfont.css");
</style>
