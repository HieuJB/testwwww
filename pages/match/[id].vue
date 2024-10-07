<template>
  <BreadcrumbsLite :breadcrumbs="breadcrumbs"/>
  <div id="info" class="match-detail" :class="{ container: !isHidden }">
    <div id="matchData">
      <HeaderComponent v-model="homeTeamId" :socket-data="eventSocketData" v-model:initDataMatch="initDataMatch" v-if="initDataMatch?.[0]?.id"/>
      <H2h v-model:matchTitle="seoMeta.title" v-model:matchContent="seoMeta.content" v-model:initDataMatch="initDataMatch" v-if="initDataMatch?.[0]?.id && tab === MATCH_TAB.H2H" @socket-data="socketData" />
      <Oddscomp v-model:matchTitle="seoMeta.title" v-model:matchContent="seoMeta.content" v-model:initDataMatch="initDataMatch" v-else-if="initDataMatch?.[0]?.id && type === MATCH_TAB.ODDSCOMP && tab === MATCH_TAB.ODDS" @socket-data="socketData" />
      <Odds1x2 v-model:matchTitle="seoMeta.title" v-model:matchContent="seoMeta.content" v-model:initDataMatch="initDataMatch" v-else-if="initDataMatch?.[0]?.id && type === MATCH_TAB.ODDS_1X2 && tab === MATCH_TAB.ODDS" @socket-data="socketData" />
      <AsianHandicapOdds v-model:matchTitle="seoMeta.title" v-model:matchContent="seoMeta.content" v-model:initDataMatch="initDataMatch" v-else-if="initDataMatch?.[0]?.id && type === MATCH_TAB.ASIAN_HANDICAP_ODDS && tab === MATCH_TAB.ODDS" @socket-data="socketData" />
      <CornerOuOdds v-model:matchTitle="seoMeta.title" v-model:matchContent="seoMeta.content" v-model:initDataMatch="initDataMatch" v-else-if="initDataMatch?.[0]?.id && type === MATCH_TAB.CORNER_OU_ODDS && tab === MATCH_TAB.ODDS" @socket-data="socketData" />
      <CorrectScoreOdds v-model:matchTitle="seoMeta.title" v-model:matchContent="seoMeta.content" v-model:initDataMatch="initDataMatch" v-else-if="initDataMatch?.[0]?.id && type === MATCH_TAB.CORRECT_SCORE_ODDS && tab === MATCH_TAB.ODDS" @socket-data="socketData" />
      <DoubleChanceOdds v-model:matchTitle="seoMeta.title" v-model:matchContent="seoMeta.content" v-model:initDataMatch="initDataMatch" v-else-if="initDataMatch?.[0]?.id && type === MATCH_TAB.DOUBLE_CHANCE_ODDS && tab === MATCH_TAB.ODDS" @socket-data="socketData" />
      <EuroHandicapOdds v-model:matchTitle="seoMeta.title" v-model:matchContent="seoMeta.content" v-model:initDataMatch="initDataMatch" v-else-if="initDataMatch?.[0]?.id && type === MATCH_TAB.EURO_HANDICAP_ODDS && tab === MATCH_TAB.ODDS" @socket-data="socketData" />
      <OverUnderOdds v-model:matchTitle="seoMeta.title" v-model:matchContent="seoMeta.content" v-model:initDataMatch="initDataMatch" v-else-if="initDataMatch?.[0]?.id && type === MATCH_TAB.OVER_UNDER_ODDS && tab === MATCH_TAB.ODDS" @socket-data="socketData" />
      <PlayerStatistics v-model:matchTitle="seoMeta.title" v-model:matchContent="seoMeta.content" v-model:initDataMatch="initDataMatch" v-model="homeTeamId" v-else-if="initDataMatch?.[0]?.id && tab === MATCH_TAB.STATISTICAL"/>
      <Live v-model:matchTitle="seoMeta.title" v-model:matchContent="seoMeta.content" v-model:initDataMatch="initDataMatch" v-else-if="initDataMatch?.[0]?.id" @socket-data="socketData"/>
    </div>
    <span id="allCornerDate"></span>
  </div>
</template>

<script setup lang="ts">


import { useMatchStore } from '@/stores/useMatchStore'
import Live from '@/components/match/[match_id].vue'
import H2h from '@/components/match/h2h-[match_id].vue'
import Oddscomp from '@/components/odds/oddscomp/[match_id].vue'
import Odds1x2 from '@/components/odds/1x2-odds/[match_id].vue'
import AsianHandicapOdds from '@/components/odds/asian-handicap-odds/[match_id].vue'
import CornerOuOdds from '@/components/odds/corner-ou-odds/[match_id].vue'
import CorrectScoreOdds from '@/components/odds/correct-score-odds/[match_id].vue'
import DoubleChanceOdds from '@/components/odds/double-chance-odds/[match_id].vue'
import EuroHandicapOdds from '@/components/odds/euro-handicap-odds/[match_id].vue'
import OverUnderOdds from '@/components/odds/over-under-odds/[match_id].vue'
import PlayerStatistics from '@/components/match/player-statistics.vue'
import { useDebounceFn } from '@vueuse/core'

const { useLocale, $t, $trouter, isNavVisible } = useShareCommon()
isNavVisible.value = false
const matchStore = useMatchStore();
const route = useRoute();
const tab = ref(route?.query?.tab || '');

const type = ref(route?.query?.type || MATCH_TAB.ODDSCOMP);
const eventSocketData = ref();
const homeTeamId = ref(null);
const isHidden = useState('my-shallow-state');
if (
  tab.value === MATCH_TAB.ODDS &&
  !MATCH_ODD_TAB?.[type.value?.toUpperCase()]
) {
  type.value = MATCH_TAB.ODDSCOMP;
}

const socketData = (wssItem) => {
  eventSocketData.value = wssItem;
};

watch(
  () => route?.query,
  () => {
    tab.value = route?.query?.tab || '';
    type.value = route?.query?.type || MATCH_TAB.ODDS;

    if (
      tab.value === MATCH_TAB.ODDS &&
      !MATCH_ODD_TAB?.[type.value?.toUpperCase()]
    ) {
      type.value = MATCH_TAB.ODDSCOMP;
    }
  },
  { immediate: true }
);


const initKeySeo = computed(() => {
  const getSeoData = (suffix:any) => ({
    title: `MATCH_TITLE_${suffix}`,
    description: `MATCH_DESCRIPTION_${suffix}`,
    keyword: `MATCH_KEYWORD_${suffix}`,
    content: `MATCH_CONTENT_${suffix}`,
    tab: suffix.toLowerCase()
  });

  const suffixMap = {
    [MATCH_TAB.H2H]: 'H2H',
    [MATCH_TAB.STATISTICAL]: 'PLAYERTECH',
    [MATCH_TAB.DETAIL]: 'DETAIL',
    [MATCH_TAB.ODDS]: String(route.query.type).toUpperCase()
  };

  if(tab.value) {
    return getSeoData(suffixMap[tab.value] || '');
  }
  return getSeoData(suffixMap[MATCH_TAB.DETAIL])
});


import { systemsStore } from '~/stores/systems';
const initDataMatch = ref([]);
const settingsData = useCookie<any>('settingsData');
const storeSystems = systemsStore();
const timeZone = ref(
  getConfig(storeSystems?.configurations, 'TIMEZONE') ||
    settingsData?.value?.timeZone
);
const seoMeta = ref({
  title: '',
  description: '',
  keyword: '',
  content: ''
});

const breadcrumbs = ref([
  {
    label: "",
    to: "",
    last: "off"
  },
  {
    label: "",
    to: "",
    last: "on"
  }
])

const fetchMatchsRecentDetail = async () => {
  try {
    const resData = await useApiLiveScore(
      API_ROUTERS.LIVESCORE.MATCHS_RECENT_DETAIL, {
        match_id: route?.params?.id,
        lang: useLocale?.value.defaultLocale
      }
    );    
    if (!resData || resData?.length === 0) {
      return navigateTo($trouter(ROUTERS.HOMEPAGE),  { redirectCode: 301 })
      // const router = useRouter()
      // router.push(ROUTERS.HOMEPAGE)
    }
    return resData;
  } catch (e) {
    return null
  }
};

const setObjectMeta = async (payload, resData) => {
  try {
    const timeZoneTitle = timeZone.value;
    let title = resData?.title;
    let description = resData?.meta_descriptions;
    if (!title || title == '') {
      title = 
         getConfig(
            storeSystems.configurations,
            initKeySeo.value.title 
          ) 
        || (tab.value ===  MATCH_TAB.ODDS && getConfig(storeSystems.configurations, 'MATCH_TITLE_ODDSCOMP')) || getConfig(storeSystems.configurations, 'SEO_META_TITLE');
        
        title = generateMetaSeo(
        title,
        payload.home_team?.name,
        payload.away_team?.name,
        payload.match_time,
        timeZoneTitle,
        payload.competition?.name
      );
    }
    
    if (!description || description == '') {
      description =
       getConfig(
            storeSystems.configurations,
            initKeySeo.value.description
          )
        || (tab.value ===  MATCH_TAB.ODDS && getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_ODDSCOMP')) || getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION');
      description = generateMetaSeo(
        description,
        payload.home_team?.name,
        payload.away_team?.name,
        payload.match_time,
        timeZoneTitle,
        payload.competition?.name
      );
    }

    let keyword = resData?.keyword;
    if (!keyword || keyword == '') {
      keyword = getConfig(
            storeSystems.configurations,
            initKeySeo.value.keyword
          )
      || (tab.value ===  MATCH_TAB.ODDS && getConfig(storeSystems.configurations, 'MATCH_KEYWORD_ODDSCOMP')) || '';
      keyword = generateMetaSeo(
        keyword,
        payload.home_team?.name,
        payload.away_team?.name,
        payload.match_time,
        timeZoneTitle,
        payload.competition?.name
      );
    }
    let content = resData?.content;
    if (!content || content == '') {
      content = getConfig(
            storeSystems.configurations,
            initKeySeo.value.content
          )
      || (tab.value ===  MATCH_TAB.ODDS && getConfig(storeSystems.configurations, 'MATCH_CONTENT_ODDSCOMP')) || '';
      content = generateMetaSeo(
        content,
        payload.home_team?.name,
        payload.away_team?.name,
        payload.match_time,
        timeZoneTitle,
        payload.competition?.name
      );

      seoMeta.value.title = title;
      seoMeta.value.description = description;
      seoMeta.value.keyword = keyword;
      seoMeta.value.content = content;
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchObjectMeta = async () => {
  try {
    const resData = await useFetch<any>(
      createUrl(API_ROUTERS.OBJECTS_META.DETAIL + '/' + route.params.id, {
        query: {
          type: 'match',
          tab: initKeySeo.value.tab
        },
      })
    );

    return resData.data.value;
  } catch (e) {
    return null
  }
};

const { data } = await useAsyncData('match', async () => {
  try {
    const [match, seo] = await Promise.all([
      fetchMatchsRecentDetail(),
      fetchObjectMeta(),
    ]);

    return {
      match,
      seo,
    };
  } catch (e) {
    return null
  }
});

if (data?.value?.match?.[0]) {
  initDataMatch.value = data?.value?.match;
  breadcrumbs.value[0].label = data?.value?.match?.[0].competition.name
  breadcrumbs.value[0].to = data?.value?.match?.[0]?.season_id ? ROUTERS_OLD.LEAGUES + '/' +data?.value?.match?.[0].competition.id : ROUTERS_OLD.MATCH + '/' + data?.value?.match?.[0].id 
  breadcrumbs.value[1].label = data?.value?.match?.[0].home_team.name + ' VS ' + data?.value?.match?.[0].away_team.name
  breadcrumbs.value[1].to = ROUTERS_OLD.MATCH + '/' + data?.value?.match?.[0].id 

  setObjectMeta(initDataMatch.value[0], data.value?.seo);
}  else {
  navigateTo($trouter(ROUTERS.HOMEPAGE),  { redirectCode: 301 })
}

// Socket data
const wssMatch = (socketData) => {
  try {
    if (socketData) {
      eventSocketData.value = socketData;
    }
  } catch (e: any) {
    return false;
  }
};

watch(
  matchStore,
  () => {
    wssMatch(matchStore?.socketData);
  },
  { deep: true, immediate: true }
);

useSeoMeta({
  title: () => seoMeta.value.title,
  description: () => seoMeta.value.description,
  ogTitle: () => seoMeta.value.title,
  ogDescription: () => seoMeta.value.description,
  keywords: () => seoMeta.value.keyword,
});

const handleChangeTab = useDebounceFn(async() => {
  const data = await fetchObjectMeta()
  
  setObjectMeta(initDataMatch.value[0],data)  
},1)

watch(
  ()=> route.query.tab,
  ()=> {
    handleChangeTab()
  }
)

watch(
  ()=> route.query.type,
  ()=> {
    handleChangeTab()
  }
)
</script>

<style scoped></style>
