<template>
  <div v-if="!isLoading">
    <div
      v-if="!infoPlayer?.length"
      class="d-flex justify-content-center flex-column align-items-center"
    >
      <div class="popupinfo searchwin_nodata nodata">
        <nuxt-img
          loading="lazy"
          class="nodata_pic"
          alt="nodata pic"
          width="200"
          height="200"
          src="/icon/nodata.svg"
        />
      </div>
      <p class="fw-bold text-center mt-3">{{ translate('Data is being updated')}}</p>
    </div>
    <div v-else>
      <div>
        <PlayerStatsticsTableInfo
          :bestPlayer="bestPlayer"
          :info="infoPlayer[0]"
        />
      </div>
      <div class="mt-5">
        <PlayerStatsticsTableInfo
          :bestPlayer="bestPlayer"
          :info="infoPlayer[1]"
          :posizione="true"
        />
      </div>
      <PlayerStatsticsTableDetail />
    </div>

    <div id="content-page" class="mt-5">
      <h1 class="page_title" v-if="matchTitle">{{ matchTitle }}</h1>
      {{ matchContent }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { $t } = useShareCommon()
const translate = (key: string) => {
  const fullKey = `${key} playertech`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
import { systemsStore } from '~/stores/systems'
const storeSystems = systemsStore()
const route = useRoute();
const objectIdSlug = ref(route?.params?.id || '');
const infoPlayer = ref([]);
const isLoading = ref(true);
const homeTeamId = defineModel();
const bestPlayer = ref();
const matchIdSlug = ref(route?.params?.id || "");
const matchsRecentDetail = ref([]);
const matchTitle = defineModel('matchTitle')
const matchContent = defineModel('matchContent')
const initDataMatch = defineModel('initDataMatch')

// Get data from cookie
const settingsData = useCookie<any>('settingsData')
const timeZone = ref(getConfig(storeSystems?.configurations, 'TIMEZONE') || settingsData?.value?.timeZone);

const homeTeamName = computed(
  () => matchsRecentDetail.value.match?.home_team?.name || ""
);
const awayTeamName = computed(
  () => matchsRecentDetail.value.match?.away_team?.name || ""
);

const getBestPlayer = () => {
  let highestRatedPlayer = { player_id: null, rating: null };

  if (infoPlayer.value && Array.isArray(infoPlayer.value)) {
  infoPlayer.value.forEach((team) => {
    if (team.stats && Array.isArray(team.stats)) {
      team.stats.forEach((player) => {
        if (player.rating != null && player.rating > highestRatedPlayer.rating) {
          highestRatedPlayer = {
            player_id: player.player_id || null, 
            rating: player.rating,
          };
        }
      });
    }
    });
  }
  bestPlayer.value = highestRatedPlayer;
};


const getPlayerStatistics = async () => {
  isLoading.value = true;
  try {
    infoPlayer.value = await useApiLiveScore(
      API_ROUTERS.LIVESCORE.PLAYER_STATISTICS +
        '?match-id=' +
        objectIdSlug.value
    );
    if (infoPlayer.value && infoPlayer.value[0]?.team_name !== homeTeamId.value) {
      infoPlayer.value = infoPlayer.value.reverse();
    }

    getBestPlayer();
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

const fetchObjectMeta = async () => {
  try {
    await useFetch<any>(createUrl(API_ROUTERS.OBJECTS_META.DETAIL + "/" + matchIdSlug.value, {
      query: {
        type: 'match',
        tab: 'playertech',
      },
    })).then((resData) => {
      
      let title = resData?.data?._value?.title
      let description = resData?.data?._value?.meta_description
      if (!title || title == '') {
        title = getConfig(storeSystems.configurations, 'MATCH_TITLE_PLAYERTECH') ? getConfig(storeSystems.configurations, 'MATCH_TITLE_PLAYERTECH') : getConfig(storeSystems.configurations, 'SEO_META_TITLE')
        title = generateMetaSeo(title, homeTeamName?.value, awayTeamName?.value, matchsRecentDetail.value.match?.match_time, timeZone.value,  matchsRecentDetail.value.match?.competition?.name)
      }
      if (!description || description == '') {
        description = getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_PLAYERTECH') ? getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_PLAYERTECH') : getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION')
        description = generateMetaSeo(description, homeTeamName?.value, awayTeamName?.value, matchsRecentDetail.value.match?.match_time, timeZone.value,  matchsRecentDetail.value.match?.competition?.name)
      }
      let keyword = resData?.data?._value?.keyword
      if (!keyword || keyword == '') {
        keyword = getConfig(storeSystems.configurations, 'MATCH_KEYWORD_PLAYERTECH') ? getConfig(storeSystems.configurations, 'MATCH_KEYWORD_PLAYERTECH') : ''
        keyword = generateMetaSeo(keyword, homeTeamName?.value, awayTeamName?.value, matchsRecentDetail.value.match?.match_time, timeZone.value,  matchsRecentDetail.value.match?.competition?.name)
      }
      let content = resData?.data?._value?.content
      if (!content || content == '') {
        content = getConfig(storeSystems.configurations, 'MATCH_CONTENT_PLAYERTECH') ? getConfig(storeSystems.configurations, 'MATCH_CONTENT_PLAYERTECH') : ''
        content = generateMetaSeo(content, homeTeamName?.value, awayTeamName?.value, matchsRecentDetail.value.match?.match_time, timeZone.value,  matchsRecentDetail.value.match?.competition?.name)
      }
      matchTitle.value = title
      matchContent.value = content

      useSeoMeta({
        title: title,
        description: description,
        ogTitle: title,
        ogDescription: description,
        keywords: keyword,
      })
    })
  }
  catch (e: any) {
  }
};

const fetchMatchsRecentDetail = async (matchIdSlug) => {
  // await useApiLiveScore(
  //   API_ROUTERS.LIVESCORE.MATCHS_RECENT_DETAIL + "?match_id=" + matchIdSlug
  // ).then(async (resData) => {
  //   if (!resData || resData?.length === 0) {
  //     return navigateTo(ROUTERS.HOMEPAGE, { replace: true })
  //   }
    let resData = initDataMatch.value;
    matchsRecentDetail.value.match = resData?.[0];
    // await fetchObjectMeta(matchIdSlug)
  // });
};

await fetchMatchsRecentDetail(matchIdSlug.value);


if (homeTeamId.value) {
  await getPlayerStatistics();
}
</script>

<style scoped></style>
