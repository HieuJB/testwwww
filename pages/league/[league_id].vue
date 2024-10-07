<template>
  <div id="warehouse-page" class="mcontent container">
    <div id="main" class="container row">
      <!--left start -->
      <div id="left" class="col-12 col-md-2 col-lg-2 ps-0 d-none d-sm-none d-md-inline-block">
        <LeaguesComponent :category-country="categoryCountry" :active-category-country="activeCategoryCountry" :active-country="activeCountry" :comp-id="compId"/>
      </div>
      <div id="i_main" class="col-md-10 col-lg-10">
        <Schedule v-if="competitionDetail?.id && tab === WAREHOUSE_LEAGUE_TAB.SCHEDULE"  :comp-detail="competitionDetail" :title="leagueTitle"/>
        <Standings v-else-if="competitionDetail?.id && tab === WAREHOUSE_LEAGUE_TAB.STANDING"  :comp-detail="competitionDetail" :title="leagueTitle"/>

        <div id="content-page" class="mt-5 row">
          <div height="21" colspan="15" id="th_information" v-if="leagueContent"><div align="center" class="write"><strong>{{ $t('League information') }}</strong></div></div>
          {{ leagueContent }}
        </div>
      </div>
      <span class="clear"></span>
    </div>

    <div class="icon-list_match-setting d-block d-sm-block d-md-none">
      <div class="list_match">
        <a class="btn-icon" data-bs-toggle="offcanvas" href="#offcanvasLeft" role="button" aria-controls="offcanvasLeft" aria-label="Tournament list">
          <i class="icon iconfont icon-font-menu"></i>
        </a>
      </div>
    </div>
  
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
    <div class="offcanvas-header d-none">
      <div class="offcanvas-title" id="offcanvasLeftLabel">Leagues</div>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" id="close-league"></button>
    </div>
    <div class="offcanvas-body">
      <LeaguesComponent :category-country="categoryCountry" :active-category-country="activeCategoryCountry" :active-country="activeCountry" :comp-id="compId"  @on-click="onClickLeague"/>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import Schedule from '@/components/league/schedule-[league_id].vue'
import Standings from '@/components/league/standings-[league_id].vue'
import { generateCompetitionMetaSeo } from "~/utils/livescore_helper";
import { systemsStore } from '~/stores/systems'
const storeSystems = systemsStore()
const route = useRoute();
const { initSchemaLeague } = useSchema()
const idSlug = route?.params?.league_id || "";
const compId = ref(route?.params?.league_id || "");
const competitionDetail = ref()
const warehouseOriginData = ref([])
const categoryCountry = ref([])
const activeCategoryCountry = ref('')
const activeCountry = ref('')
const tab = ref(route?.query?.tab || WAREHOUSE_LEAGUE_TAB.SCHEDULE)
const leagueTitle = ref('')
const leagueContent = ref('')
const robotsMeta = ref('')
const { infoLeague } = useShareLeague();
const { useLocale, $t, isNavVisible } = useShareCommon()
isNavVisible.value = false
const teamInfo = ref([])


if (![WAREHOUSE_LEAGUE_TAB.SCHEDULE, WAREHOUSE_LEAGUE_TAB.STANDING].includes(tab.value)) {
  tab.value = WAREHOUSE_LEAGUE_TAB.SCHEDULE
}
const seoMeta = ref({
  title: '',
  description: '',
  keyword: '',
  content: ''
});

const onClickLeague = () => {
  nextTick(() => {
    document.documentElement.querySelector("#close-league").click();
  })
}

const fetchObjectMeta = async () => {
  if (!compId.value)
    return
  
  try {
    const resData = await useFetch<any>(
      createUrl(API_ROUTERS.OBJECTS_META.DETAIL + "/" + compId.value, {
        query: {
          type: "competition",
          lang: useLocale?.value.defaultLocale
        },
      })
    )
    return resData.data.value;
  } catch (e) {
    return null
  }
}

const setObjectMeta = async (competitionDetail, resData) => {
  try {
      let title = resData?.title;
      let description = resData?.meta_descriptions;
      if (!title || title == "") {
        title = getConfig(storeSystems.configurations, "COMPETITION_TITLE_" + tab.value?.toUpperCase()) ?? (getConfig(storeSystems.configurations, "COMPETITION_TITLE")
          ? getConfig(storeSystems.configurations, "COMPETITION_TITLE")
          : getConfig(storeSystems.configurations, "SEO_META_TITLE"));
        title = generateCompetitionMetaSeo(
          title,
          competitionDetail?.name
        );

        if (title == "") {
          title = competitionDetail?.name
        }
      }
      if (!description || description == "") {
        description = getConfig(storeSystems.configurations, "COMPETITION_DESCRIPTION_" + tab.value?.toUpperCase()) ?? 
        (getConfig(
          storeSystems.configurations,
          "COMPETITION_DESCRIPTION"
        )
          ? getConfig(storeSystems.configurations, "COMPETITION_DESCRIPTION")
          : getConfig(storeSystems.configurations, "SEO_META_DESCRIPTION"));
        description = generateCompetitionMetaSeo(
          description,
          competitionDetail?.name
        );
      }
      let keyword = resData?.keyword;
      if (!keyword || keyword == "") {
        keyword = getConfig(storeSystems.configurations, "COMPETITION_KEYWORD_" + tab.value?.toUpperCase()) ?? (getConfig(storeSystems.configurations, "COMPETITION_KEYWORD")
          ? getConfig(storeSystems.configurations, "COMPETITION_KEYWORD")
          : "");
        keyword = generateCompetitionMetaSeo(
          keyword,
          competitionDetail?.name
        );
      }

      let content = resData?.content
      if (!content || content == '') {
        content = getConfig(storeSystems.configurations,  "COMPETITION_CONTENT_" + tab.value?.toUpperCase()) ?? getConfig(storeSystems.configurations, 'COMPETITION_CONTENT')
        content = generateCompetitionMetaSeo(
          content,
          competitionDetail?.name
        );
      }

      leagueTitle.value = title
      leagueContent.value = content
      
      seoMeta.value.title = title;
      seoMeta.value.description = description;
      seoMeta.value.keyword = keyword;
      seoMeta.value.content = content;
  } catch (e: any) {}
};

const fetchCompDetail = async () => {
  try {
    const query = {
      comp_id: compId.value,
      lang: useLocale?.value.defaultLocale
    }
    const resData = await useApiLiveScore(
      API_ROUTERS.LIVESCORE.COMP_DETAIL, query
    )
    return resData
  } catch(e) {
    return null
  }
};

const fetchWarehouse = async () => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.WAREHOUSE, {lang: useLocale?.value.defaultLocale}
  ).then(async (resData) => {
    warehouseOriginData.value = resData
    categoryCountry.value = resData?.filter(item => !["x4zp5rzgh2q82w1"].includes(item.category_id))
  });
};

watch(
  () => route,
  (newPath) => {
    const idSlug = route?.params?.league_id || ""
    compId.value = route?.params?.league_id || ""
  },
  { immediate: true }
);

const handleChangeTab = async() => {
  try {
    const seo = await fetchObjectMeta()
    setObjectMeta(competitionDetail.value, seo)
  } catch {}
}

watch(
  () => route?.query, 
  () => {
    tab.value = route?.query?.tab ||  WAREHOUSE_LEAGUE_TAB.SCHEDULE;
    if (![WAREHOUSE_LEAGUE_TAB.SCHEDULE, WAREHOUSE_LEAGUE_TAB.STANDING].includes(tab.value)) {
      tab.value = WAREHOUSE_LEAGUE_TAB.SCHEDULE
    }

    handleChangeTab()
  }, 
);


const { data } = await useAsyncData('league', async () => {
  try {
    const [league, seo] = await Promise.all([fetchCompDetail(), fetchObjectMeta()])
    return {
      league,
      seo
    }
  } catch (e) {
    return null
  }
})

const fetchTeamBySeasonId = async (id: string): Promise<any> => {
  try {
    if (id) {
      const data = await useApiLiveScore(API_ROUTERS.LIVESCORE.SEASONS_TABLE + '/' + id)
      if (data?.tables) {
        let team = []
        for(const value of data.tables) {
          for(const data of value?.rows) {
            data?.team_info && team.push(data?.team_info)
          }
        }
        return team
      }
      return []
    }
  } catch {}
}


if (data.value?.league?.[0]) {
  if (data.value?.league?.[0]?.is_deleted === true) {
    robotsMeta.value = 'noindex,nofollow';

    useHead(() => ({
      meta: [ {name: "robots", content: robotsMeta.value }]
    }));
  }

  infoLeague.value = data.value?.league?.[0]
  compId.value = data.value?.league?.[0]?.id
  competitionDetail.value = data.value?.league?.[0]
  activeCategoryCountry.value = data.value?.league?.[0]?.category_id
  activeCountry.value = data.value?.league?.[0]?.country_id ?? 'National'

  setObjectMeta(data.value?.league?.[0], data.value?.seo)

  fetchWarehouse()

  if(data.value?.league?.[0].cur_season_id) {
    teamInfo.value = await fetchTeamBySeasonId(data.value?.league?.[0].cur_season_id)
  }
  initSchemaLeague({
    league: data.value?.league?.[0],
    team: teamInfo.value,
  })

} else {
  showError({
    statusCode: 404,
    statusMessage: $t("League does not exist!"),
  });
}

useSeoMeta({
  title: () => seoMeta.value.title,
  description: () => seoMeta.value.description,
  ogTitle: () => seoMeta.value.title,
  ogDescription: () => seoMeta.value.description,
  keywords: () => seoMeta.value.keyword,
});

onMounted(async () => {});
</script>