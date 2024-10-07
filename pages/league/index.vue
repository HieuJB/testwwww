<template>
  <div id="warehouse-screen" class="mcontent container">
    <div id="info" class="" style="min-height: 800px">
      <div id="flag-content">
        <div class="Area d-none d-md-flex">
          <ul class="d-flex">
            <li id="menu_0"  :class="categoryIdSelected === '' ? 'Area-selected' : 'Area-unselected'"  @click="showSclasses('');" >
              <span>
              {{ $t('All') }}
              </span>
            </li>
            <template v-for="(item, index) in categoryCountry" :key="index">
              <li :id="'tab_category_' + item?.category_id" :class="categoryIdSelected === item?.category_id ? 'Area-selected' : 'Area-unselected'" @click="showSclasses(item?.category_id);">
                <span>
                {{  item?.category_name }}
                </span>
              </li>
            </template>
          </ul>
        </div>
        <div class="area-mobile d-block d-sm-block mt-2 d-md-none" :class="isFixedTop ? 'fixed-top-tab' : ''" id="menu-category-country">
          <ul class="d-flex">
            <li id="menu_0"  :class="categoryIdSelected === '' ? 'Area-selected' : 'Area-unselected'"  @click="showSclasses('');" >
              <a href="#header-wrapper" :title="$t('All')">
                <span>
                  {{ $t('All') }}
                </span>
              </a>
            </li>
            <template v-for="(item, index) in categoryCountry" :key="index">
              <li id="menu_1" :class="categoryIdSelected === item?.category_id ? 'Area-selected' : 'Area-unselected'" @click="showSclasses(item?.category_id);">
                <a href="#header-wrapper" :title="item?.category_name">
                  <span>
                  {{  item?.category_name }}
                  </span>
                </a>
              </li>
            </template>
          </ul>
        </div>
        <div class="gameList" id="allSclassList">
          <template v-for="(country, index) in warehouseData?.filter(country => country?.country_name)" :key="index">
            <div
            v-if="country?.country_name"
            class="divList" :class="divListBgHover === index ? 'divList_hover' : ''" infotype="1" style="display: block;"
            @mouseenter="handleMouseOverCountry($event, index, country)" @mouseleave="handleMouseLeaveCountry($event, index)">
              <div class="div_inner_top">
                <div class="div-inner-top-img">
                  <BaseImage :src="getLiveScoreImage(country?.logo_o, 'country') + '!h80'" :alt="country?.country_name || ''" v-if="!country?.type" loading="lazy"/>
                  <BaseImage :src="'/icon/flag/' + country?.logo_o" :alt="country?.country_name || ''" v-else loading="lazy" height="70"/>
                </div>
              </div>
              <div class="div_inner_bottom" id="InfoID_1bottomDiv">
                <span class="div_inner_bottom_span" id="InfoID_1bottomSpan">{{ country?.country_name }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
      
      <div class="floatDiv" :class="positionPopup" style="position: absolute;"
      :style="{ position: 'absolute', top: winPositionList.top, left: winPositionList.left, zIndex: 100 }"
      v-show="showListLeagues" @mouseenter="handleMouseOverListLeage" @mouseleave="handleMouseLeaveListLeage"
      >
        <div class="ulDiv" style="z-index: 19; left: -2px;">
          <ul v-if="leagueList?.length > 0" class="div_inner_bottom_span_ul">
            <template v-for="(item, index) in leagueList" :key="index">
              <li class="data-league"><nuxt-link :href="ROUTERS_OLD.LEAGUES + '/' + item?.competition_id" :title="item?.competition_name">{{ item?.competition_name }}</nuxt-link></li>
            </template>
          </ul>
          <ul v-else class="div_inner_bottom_span_ul">
            <li class="no-data">{{ $t('Empty Data') }}</li>
          </ul>
        </div>
      </div>

      <div id="content-page" class="mt-5">
        <h1 class="page_title" v-if="leagueTitle">{{ leagueTitle }}</h1>
        {{ leagueContent }}
      </div>

      <br style="clear:both;"><br style="clear:both;">
    </div>
  </div>
</template>

<script setup lang="ts">
import { systemsStore } from '~/stores/systems'
import { useWindowScroll } from '@vueuse/core'

const storeSystems = systemsStore()
const route = useRoute();
const { useLocale, $t, isNavVisible  } = useShareCommon();
isNavVisible.value = false
const { y } = useWindowScroll()

const winPositionList = ref({ top: '0px', left: '0px' });
const positionPopup = ref('')
const compId = ref("");
const warehouseOriginData = ref([])
const warehouseData = ref([])
const screenWidth = ref(0);
const showListLeagues = ref(false)
const divListHover = ref()
const divListBgHover = ref()
const leagueList = ref([])
const categoryCountry = ref([])
const categoryIdSelected = ref('')
const virtualCountry = ref([])
const leagueContent = ref('')
const leagueTitle = ref('')

const title = ref()
const description = ref()
const keyword = ref()
const isFixedTop = ref(false)

const handleMouseOverCountry = async (event, index, country) =>{ 
  const oddsTdRect = event.target.getBoundingClientRect();
  winPositionList.value = {
      top: `${oddsTdRect.top + window.scrollY + 120}px`, 
      left: `${oddsTdRect.left + window.scrollX}px` 
  };

  if (screenWidth.value < SCREEN_WIDTH.SM) {
     winPositionList.value = {
      top: `${oddsTdRect.top + window.scrollY + 120}px`, 
      left: `0%` 
    };
  } else if (screenWidth.value >= SCREEN_WIDTH.SM && screenWidth.value < SCREEN_WIDTH.MD) {
    winPositionList.value = {
      top: `${oddsTdRect.top + window.scrollY + 120}px`, 
      left: `0%` 
    };
  } else if (screenWidth.value >= SCREEN_WIDTH.MD && screenWidth.value < SCREEN_WIDTH.LG) {
    winPositionList.value = {
      top: `${oddsTdRect.top + window.scrollY + 120}px`, 
      left: `0%` 
    };
  } else if (screenWidth.value >= SCREEN_WIDTH.LG && screenWidth.value < SCREEN_WIDTH.LGG) {
    winPositionList.value = {
      top: `${oddsTdRect.top + window.scrollY + 120}px`, 
      left: `0%` 
    };
  } else if (screenWidth.value >= SCREEN_WIDTH.LGG && screenWidth.value < SCREEN_WIDTH.XXL) {
     positionPopup.value =  ((index) % 9 > 4) ? 'spDiv' : ''
  } else if (screenWidth.value >= SCREEN_WIDTH.XXL) {
     positionPopup.value =  ((index) % 9 > 4) ? 'spDiv' : ''
  }

  leagueList.value = country?.competitions ?? []
  divListHover.value = index
  divListBgHover.value = index
  showListLeagues.value = true
}

const handleMouseLeaveCountry = () => {
  divListHover.value = ''
  showListLeagues.value = false
}

const handleMouseOverListLeage = () => {
  showListLeagues.value = true
}

const handleMouseLeaveListLeage = () => {
  showListLeagues.value = false
  divListBgHover.value = ''
}

const showSclasses = (category_id) => {
  categoryIdSelected.value = category_id
  let countryAppend = virtualCountry.value
  if (category_id) {
    warehouseData.value = warehouseOriginData.value?.filter(item => item.category_id === category_id)?.map(item => item?.countries)?.flat()
    countryAppend = virtualCountry.value?.filter(item => item.category_id === category_id)
  } else {
    warehouseData.value = warehouseOriginData.value?.map(item => item?.countries)?.flat()
  }
  warehouseData.value = [...warehouseData.value, ...countryAppend]
}

const fetchWarehouse = async () => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.WAREHOUSE, {lang: useLocale?.value.defaultLocale}
  ).then(async (resData) => {
    if (resData) {
      categoryCountry.value = resData?.filter(item => !["x4zp5rzgh2q82w1"].includes(item.category_id))
      virtualCountry.value = categoryCountry.value?.map(item => {
        return {
          category_id: item.category_id,
          type: 'category',
          logo_o: item.category_id + '.png',
          country_name: item.category_name,
          competitions: item?.national?.competitions,
        }
      })
      warehouseOriginData.value = resData
      warehouseData.value = resData?.map(item => item?.countries)?.flat()
      warehouseData.value = [...warehouseData.value, ...virtualCountry.value]
    }
  });
};

const fetchPage = async (slug: string) => {
  try {
    await useFetch<any>(createUrl(API_ROUTERS.PAGE.SLUG, {
      query: {
        slug: slug,
      },
    })).then(resData => {
      title.value = resData?.data?.value?.meta_title ?? getConfig(storeSystems.configurations, 'SEO_META_TITLE'),
      description.value = resData?.data?.value?.meta_description ?? getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION')
    })
  }
  catch (e: any) {
    title.value = getConfig(storeSystems.configurations, 'SEO_META_TITLE') ? getConfig(storeSystems.configurations, 'SEO_META_TITLE') : ''
    description.value = getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION') ? getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION') : ''
  }
}

const fetchConfigurations = async () => {
  try {
    const resData = await useFetch<any>(createUrl(API_ROUTERS.CONFIGURATIONS));
    storeSystems.configurations = resData.data.value?.configurations || [];
  } catch (e) {
  }
};

watch(
  () => route,
  (newPath) => {
    const idSlug = newPath?.path?.match(/[^/-]+$/);
    compId.value = idSlug ? idSlug[0] : "";
  },
  { immediate: true }
);

watch(
  y,
  () => {
    if (y.value > 200) {
      isFixedTop.value = true
    } else {
      isFixedTop.value = false
    }
}, { deep: true, immediate: true })

if (!storeSystems.configurations) {
  await fetchConfigurations()
}
leagueContent.value = getConfig(storeSystems.configurations,  "LEAGUE_CONTENT") ?? ''
leagueTitle.value = getConfig(storeSystems.configurations,  "LEAGUE_TITLE") ?? ''
description.value = getConfig(storeSystems.configurations,  "LEAGUE_DESCRIPTION") ?? ''
keyword.value = getConfig(storeSystems.configurations,  "LEAGUE_KEYWORD") ?? ''

useSeoMeta({
  title: () => leagueTitle.value,
  description: () => description.value,
  ogTitle: () => leagueTitle.value,
  ogDescription: () => description.value,
  keywords: () => keyword.value,
})

await fetchWarehouse();

const checkOffset = (menuCategoryCountry, footer, footerHeight) => {
  function getRectTop(el){
    var rect = el.getBoundingClientRect();
    return rect.top;
  }
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  // if((getRectTop(menuCategoryCountry) + scrollTop) + menuCategoryCountry.offsetHeight >= (getRectTop(footer) + scrollTop) - 10) {
  //   // menuCategoryCountry.style.position = 'absolute';
  //   //menuCategoryCountry.style.bottom = document.body.scrollTop + window.innerHeight;
  //   menuCategoryCountry.style.bottom = `${footerHeight}px`
  // }
  // if(scrollTop + window.innerHeight < (getRectTop(footer) + scrollTop)) {
  //   menuCategoryCountry.style.position = 'fixed'; // restore when you scroll up
  //   menuCategoryCountry.style.bottom = ''
  // }
  menuCategoryCountry.style.top = ''
  if(window.innerHeight < (getRectTop(footer))) {
    menuCategoryCountry.style.position = 'fixed'; // restore when you scroll up
    menuCategoryCountry.style.bottom = ''
    
    if (window.innerHeight <= 430 && y.value > 200) {
      menuCategoryCountry.style.bottom = ''
      menuCategoryCountry.style.top = '10px'
    } 
  } else if(window.innerHeight < (getRectTop(footer)) + 100) {
    menuCategoryCountry.style.position = 'fixed'; // restore when you scroll up
    menuCategoryCountry.style.bottom = ''
    
    if (window.innerHeight <= 430 && y.value > 200) {
      menuCategoryCountry.style.bottom = ''
      menuCategoryCountry.style.top = '10px'
    } 
  } else {
    let offset = footerHeight - getRectTop(footer) + window.innerHeight - 350
    if (offset < footerHeight) {
      offset = footerHeight
    }
    menuCategoryCountry.style.bottom = `${offset}px`
  }
}

onMounted(async () => {
  setTimeout(async () => {
    //await fetchPage('kho-du-lieu')
  }, 1)

  screenWidth.value = window.innerWidth;
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
  });
  
  var menuCategoryCountry = document.querySelector('#menu-category-country');
  var footer = document.querySelector('#bottom');
  document.addEventListener("scroll", function(){
    checkOffset(menuCategoryCountry, footer, footer?.offsetHeight);
  });
});
</script>

<style scoped lang="scss">
.div-inner-top-img {
  height: 70px;
  width: 70px;
  display: flex;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain
  }
}

@media (max-width: 768px) {
  #flag-content {
    min-height: 500px;
  }

  #content-page {
    margin-left: 85px;
  }
  
  #info .fixed-top-tab {
    // top: 20px !important;
    position: fixed;
    z-index: 1030;
  }

  #info .area-mobile
  {
    position: fixed;
    /* top: 197px; */

    ul {
      display: flex !important;
      flex-direction: column;
      padding: 0;
      padding-left: 3px;

      li {
        cursor: pointer;
        margin-bottom: 5px;
      }
      .Area-selected span{
          background-color: $secondary;
          color: #fff;
          &:hover {
            color: #fff;
          }
      }
      li span {
        border-radius: 10px;
        color: #666;
        display: block;
        /* float: left; */
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
        padding: 13px 2px;
        text-align: center;
        width: 75px;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
          color: #FF8C00;
        }
      }
    }
  }

  #info .div_inner_bottom_span_ul li.data-league {
    width:  calc(100% / 3) !important;
  }
}

@media (max-width: 767px) {
  #info #allSclassList {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-left: 85px;
  }

  #warehouse-screen .floatDiv {
    width: calc(100% - 117px) !important;
    margin-left: 96px;
  }
}

@media only screen and (max-width: 479px) {
  #info .area-mobile {
    position: fixed;
    /* top: 218px; */
  }
  #info .div_inner_bottom_span_ul li.data-league {
    width:  calc(100% / 2) !important;
  }
}
@media only screen and (max-width: 328px) {
  #info .area-mobile {
    position: fixed;
    /* top: 260px; */
  }

  #info .div_inner_bottom_span_ul li.data-league {
    width: 100% !important;
  }
}
</style>
