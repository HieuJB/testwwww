<template>
  <BreadcrumbsLite :breadcrumbs="breadcrumbs" />
  <div class="mcontent">
    <div id="main" class="container row">
      <div class="col-md-8 col-lg-8 newLeft">
        <template v-for="(item, index) in categoriesList"
        :key="index"
        >
          <div class="newsbox" v-if="item">
            <div class="Htitle">
              <h2>
                <nuxt-link :to="ROUTERS_OLD.NEWS_CATEGORY + '/' + item?.slug">
                  {{item?.name }}
                </nuxt-link>
              </h2>
              <nuxt-link :to="ROUTERS_OLD.NEWS_CATEGORY + '/' + item?.slug" class="more"  v-if="item?.posts?.length > 0">
                {{ $t('Read more') }}
              </nuxt-link>
            </div>
            <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 news_post"  v-if="item?.posts?.length > 0">
              <div
              v-for="post in item?.posts"
              :key="post?.id"
              class="col-12 col-sm-6 col-lg-4 article">
                <nuxt-link :to="'/' + post?.slug" class="more" >
                <div class="artimg">
                  <img :src="post?.thumbnail?.file_path" :alt="post?.title">
                </div>
                <p class="match">{{post?.title}}</p>
              </nuxt-link>
              </div>
            </div>
            <p v-else class="text-center">{{ $t('No posts') }}</p>
          </div>
        </template>

        <div id="content-page" style="cursor: unset;" class="mt-3 newsbox p-3" v-if="title || pageContent">
          <h1 class="page_title" v-if="title">{{ title }}</h1>
          {{ pageContent }}
        </div>
      </div>
      <div class="col-md-4 col-lg-4 newRight">
        <div class="side-box" v-if="matchsListLength > 0">
          <div class="Htitle nobr">
            <div>{{ $t('Hot Match') }}</div>
            <nuxt-link class="more"  target="_blank" :to="'/'">
              {{ $t('Read more') }}
            </nuxt-link>
          </div>
          <template 
          v-for="(match, index) in renderTopList?.slice(0, 10)"
          :key="index"
          >
            <div class="matchItem v2" @click="locationHref(ROUTERS_OLD.MATCH_DETAIL + match?.id)">
              <div class="home">
                <span class="teamName">{{ match?.home_team?.name }}</span>
                <img class="teamIcon" name="" :src="getLiveScoreImage(match?.home_team?.logo_o, 'team')" height="80" :alt="match?.home_team?.name ">
              </div>
              <div class="vs date">
                <span data-fmt="3">{{formatDateMomentUTCTimeZone(match?.match_time, 'DD-MM')}}</span>
                <span data-fmt="4">{{formatDateMomentUTCTimeZone(match?.match_time, 'HH:mm')}}</span>
              </div>
              <div class="guest">
                <img class="teamIcon" name="" :src="getLiveScoreImage(match?.away_team?.logo_o, 'team')" height="80" :alt="match?.away_team?.name ">
                <span class="teamName">{{ match?.away_team?.name }}</span>
              </div>
            </div>
          </template>
        </div>
        <div class="side-box">
          <div class="Htitle nobr">
            <div>{{ $t('Ranking') }}</div>
            <select id="optionsListCompList" class="selectbox" v-model="optionsListCompList">
              <template
              v-for="(item, index) in compList"
              :key="index"
              >
                <option :value="item?.id">{{ item?.comp_name }}</option>
              </template>
            </select>
          </div>
          <table id="nba_1" class="listtab fcg" width="100%" border="0" cellspacing="0">
            <tbody>
              <template
              v-for="(item, index) in seasonTableStandingList"
              :key="index"
              >
              <tr v-if="seasonTableStandingList?.length > 1" class="group-tit">
                <td colspan="7">{{ $t('Table') }} {{ TABLE_STANDING_LIST?.[item?.group] }}</td>
              </tr>
              <tr class="stsw">
                <td width="10%" :title="$t('Ranking')">#</td>
                <td>{{ $t('Team') }}</td>
                <td width="10%" :title="$t('Win')">{{ $t('W') }}</td>
                <td width="10%" :title="$t('Draw')">{{ $t('D') }}</td>
                <td width="10%" :title="$t('Loss')">{{ $t('L') }}</td>
                <td width="10%">{{ $t('Points') }}</td>
              </tr>
              <template
              v-for="(row, row_index) in item?.rows"
              :key="row_index"
              >
                <tr style="height: 22px;">
                  <td>{{ row?.position }}</td>
                  <td class="teamname"><nuxt-link :to="ROUTERS_OLD.TEAM + row?.team_info?.team_id">{{ row?.team_info?.team_name }}</nuxt-link></td>
                  <td>{{ row?.goals }}</td>
                  <td>{{ row?.draw }}</td>
                  <td>{{ row?.loss }}</td>
                  <td class="blue">{{ row?.points }}</td>
                </tr>
              </template>
            </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { systemsStore } from '~/stores/systems'
import { locationHref } from '@/utils/router_helper'
import moment from 'moment-timezone';
const { useLocale, $t, $trouter, isNavVisible } = useShareCommon()
isNavVisible.value = false
const CATEGORIES = {
  SWIPE: {
    SLUG: 'swiperpost',
    LIMIT: 5
  },
  PREVIEW: {
    SLUG: 'nhan-dinh',
    LIMIT: 4
  },
  NEWS_HOST: {
    SLUG: 'tin-nong',
    LIMIT: 12
  },
  PHOTO: {
    SLUG: 'anh-dep',
    LIMIT: 4
  },
  OTHER: {
    LIMIT: 6
  }
}
const storeSystems = systemsStore()
const breadcrumbs = ref([
  {
    label: $t('News'),
    to: ROUTERS_OLD.NEWS,
    last: 'on',
  }
])
const categoriesList = ref()
const previewCategory = ref()
const previewsPost = ref()
const newsHotCategory = ref()
const newsHotPost = ref()
const photoCategory = ref()
const photoPost = ref()
const swiperCategory = ref()
const swiperPost = ref()
const compsDataList  = ref ([])
const compOriginsList = ref([])
const compsListByKey  = ref([])
const matchOriginsList = ref([])
const matchsList = ref([])
const compKeysList = ref([])
const renderTopList = ref([])
const compList = ref([])
const optionsListCompList = ref()
const seasonTableStandingList = ref()
const matchsListLength = ref(0)

const title = ref()
const description = ref()
const pageContent = ref()
const keyword = ref()

const posts = ref([]);
const currentPage = ref(1);
const pageSize = ref(8);
const totalPages = ref(0);
const router = useRouter();
const category = ref([]);
const isContentExpanded = ref(false);
const previewsList = ref()


const imageSize = ref([]);
const imagesSizeConfig = getConfig(storeSystems.configurations, 'image_size');
imageSize.value = imagesSizeConfig?.split(',');
const limitPostCategory = getConfig(storeSystems.configurations, 'LIMIT_POST_CATEGORY') || CATEGORIES.OTHER.LIMIT;

const screenWidth = ref(0);
const selectedImageSize = computed(() => {
  if (screenWidth.value < SCREEN_WIDTH.MD && imageSize?.value?.length >= 1) {
    return imageSize.value[1];
  } else if (screenWidth.value >= SCREEN_WIDTH.MD && screenWidth.value < SCREEN_WIDTH.LG && imageSize?.value?.length >= 2) {
    return imageSize.value[2];
  } else if (screenWidth.value >= SCREEN_WIDTH.LG && screenWidth.value < SCREEN_WIDTH.XXL && imageSize?.value?.length >= 3) {
    return imageSize.value[3];
  } else {
    return '';
  }
});

const fetchPosts = async (categoryCode: string | string[], limit: number | 0) => {
  try {
    const { data } = await useFetch(API_ROUTERS.POST.LIST, {
      params: {
        category_code: categoryCode,
        limit: limit,
      },
    });
    return data?.value?.posts;
  } catch (e) {
    return []
  }
};

const fetchCategory = async (categorySlug: string | string[]) => {
  try {
    const { data } =  await useFetch<any>(createUrl(API_ROUTERS.POST.CATEGORY.DETAIL + categorySlug))
    return data?.value;
  }
  catch (e: any) {
    return []
  }
}

const fetchCategories = async () => {
  try {
    const { data } =  await useFetch(API_ROUTERS.POST.CATEGORY.LIST_POST, {
      params: {
        limit: 100,
        page: 1,
        limit_post: limitPostCategory
      }
    })
    if (data?.value?.post_categories) {
      const categories = data?.value?.post_categories?.filter(item => item?.code !== 'swiperpost')
      if (categories) {
        // categories?.forEach(async(category) => {
        //   category.posts = await fetchPosts(category?.slug, limitPostCategory);
        // })

        return categories
      }
    }

    return []
  }
  catch (e: any) {
    return []
  }
}

const fetchMatchsRecent = async () => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.COMP, {lang: useLocale?.value.defaultLocale}).then(decodedData => {
    if (decodedData) {
      compsDataList.value = decodedData
      compOriginsList.value = decodedData

      const dataMcompsDataListByKey: never[] = []
      decodedData?.forEach(item=> {
        // Init select leagues
        dataMcompsDataListByKey[item?.id] = item
      })
    }
  })

  let status = null
  status = [...LIVESCORE_STATUS.IS_LIVE, ...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].toString()
  const query = {
    date: moment().format("yyyy-MM-DD"),
    tz: moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('Z'),
    lang: useLocale?.value.defaultLocale
  }
  if (status !== null) {
    query.status = status
  }
  await useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_RECENT, query).then(resData => {
    if (resData) {
      const matchsDataList: never[] = []
      const matchData = resData
      matchData.forEach(item => {
        matchsDataList[item?.id] = item
      })

      matchsListLength.value = matchsDataList?.length
      matchsList.value = matchsDataList
      matchOriginsList.value = Object.assign([], matchsDataList);
      // Lay danh sach giai dau co tran dau khi request
      let matchsGroup = groupBy(matchData, x => x.competition)
      const matchsGroupKey = [...matchsGroup.keys()]

      compOriginsList.value = compsDataList.value?.filter((item: { id: any; }) => {
        return matchsGroupKey?.includes(item?.id)
      }).map((item: { matchs: any; id: any; }) => {
        item.matchs = matchsGroup?.get(item?.id)
        return item
      })

    // For render list
      compsListByKey.value = groupBy(compsDataList.value, x => x.id)

      const compsList = compOriginsList.value?.filter((item: { number_hot: number; }) => (item?.number_hot === 5 || item?.number_hot === 4))
      const matchsGroupHot = groupBy(compsList, x => x.id)
      const compKeysListHot = [...matchsGroupHot.keys()]
      const dataList = []
      let matchsListArray = Object.values(matchOriginsList.value).filter((item) => compKeysListHot.includes(item?.competition))

      matchsGroup = sortByTime(matchsListArray, false)

      compKeysList.value = [...matchsGroup.keys()]
      renderTopList.value = matchsGroup
    }
  })
}

const fetchSeasonTableStanding = async (comp_id) => {
  const query = {
    comp_id: comp_id
  }
  await useApiLiveScore(API_ROUTERS.LIVESCORE.SEASONS_TABLE_STANDING, query).then(resData => {
    seasonTableStandingList.value = resData?.results?.[0]?.tables
    // compsDataList.value = decodedData?.data?.value
    // compOriginsList.value = decodedData?.data?.value
    // compChooseLeagueList.value = decodedData?.data?.value

    // const dataMcompsDataListByKey: never[] = []
    // decodedData?.data?.value?.forEach(item=> {
    //   compsDataFilterList.value[item?.id] = true
    //   dataMcompsDataListByKey[item?.id] = item
    // })

    // compsDataListByKey.value = dataMcompsDataListByKey
  })
}

const fetchCompList = async () => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.COMP_LIST, {lang: useLocale?.value.defaultLocale}
  ).then(async (resData) => {
    compList.value = resData?.filter((item: { number_hot: number; }) => item?.number_hot === 5 || item?.number_hot === 4)

    if (compList.value?.length > 0) {
      optionsListCompList.value = compList.value?.[0]?.id
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
      title.value = resData?.data?.value?.meta_title ?? resData?.data?.value?.title ?? getConfig(storeSystems.configurations, 'SEO_META_TITLE'),
      description.value = resData?.data?.value?.meta_description ?? resData?.data?.value?.summary ?? getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION')
      pageContent.value = resData?.data?.value?.content
    })
  }
  catch (e: any) {
    title.value = getConfig(storeSystems.configurations, 'SEO_META_TITLE') ? getConfig(storeSystems.configurations, 'SEO_META_TITLE') : ''
    description.value = getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION') ? getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION') : ''
  }
}

const getDataConfig = () => {
  title.value = getConfig(storeSystems.configurations, 'NEWS_TITLE') ?? getConfig(storeSystems.configurations, 'SEO_META_TITLE')
  description.value = getConfig(storeSystems.configurations, 'NEWS_DESCRIPTION') ?? getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION')
  keyword.value = getConfig(storeSystems.configurations, 'NEWS_KEYWORD') ?? ''
  pageContent.value = getConfig(storeSystems.configurations, 'NEWS_CONTENT') ?? ''
}

const fetchConfigurations = async () => {
  try {
    const resData = await useFetch<any>(createUrl(API_ROUTERS.CONFIGURATIONS));
    storeSystems.configurations = resData.data.value?.configurations || [];
  } catch (e) {
  }
};

//swiperCategory.value = await fetchCategory(CATEGORIES.SWIPE.SLUG);

categoriesList.value = await fetchCategories()
await fetchMatchsRecent()
await fetchCompList();
// await fetchSeasonTableStanding();
const slug = router.currentRoute.value.path
//await fetchPage(slug?.indexOf('/') == 0 ? slug?.substring(1) : slug)

if (!storeSystems.configurations) {
  await fetchConfigurations()
}
getDataConfig()

useSeoMeta({
  title: () => title.value,
  description: () => description.value,
  ogTitle: () => title.value,
  ogDescription: () => description.value,
  keywords: () => keyword.value,
})

watch(
  optionsListCompList,
  async () => {
    await fetchSeasonTableStanding(optionsListCompList.value)
  },
  { immediate: true }
)
onMounted(async() => {
  screenWidth.value = window.innerWidth;
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
  });
});

</script>
