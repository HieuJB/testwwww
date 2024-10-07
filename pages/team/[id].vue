<template>
  <div class="container bg-white team">
    <div>
      <TeamsTabsRedirect :tabs="tabs" />
      <TeamsInfoTeam
        v-if="teamInfo.lineUpTeam?.team_info"
        :teamInfo="teamInfo.lineUpTeam.team_info"
      />
      <div v-if="teamInfo.lineUpTeam === null">
        <div class="d-flex flex-column align-items-center">
          <BaseImage
            class="nodata_pic"
            alt="nodata pic"
            width="200"
            height="200"
            src="/icon/nodata.svg"
          />
        </div>
        <p class="fw-bold text-center mt-3">
          {{ translate('No Data Available') }}
        </p>
      </div>
      <div v-if="teamInfo.lineUpTeam">
        <KeepAlive>
          <component :is="getComponentActive" :info="info"></component>
        </KeepAlive>
      </div>
      <div
        class="fw-bold text-center d-flex flex-column align-items-center mt-4"
        v-if="teamInfo.lineUpTeam !== null && !teamInfo.lineUpTeam"
      >
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="fw-bold mt-2">{{ translate('Data does not exist!') }}</p>
      </div>
    </div>
    <div id="content-page" class="mt-5">
      <h1 class="page_title" v-if="h1Content">{{ h1Content }}</h1>
      <div class="text-center">{{ content }}</div>
    </div>
  </div>
</template>

<script setup>
import LineUp from '@/components/teams/lineup/[id].vue';
import PlayerData from '@/components/teams/playerdata/[id].vue';
import PlayerZh from '@/components/teams/playerzh/[id].vue';
import Summary from '@/components/teams/summary/[id].vue';
import TeamSche from '@/components/teams/teamsche/[id].vue';
import TeamNearYear from '@/components/teams/teamnearyear/index.vue';
const { $t, isNavVisible } = useShareCommon();
isNavVisible.value = false
const { initSchemaTeam } = useSchema()
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const { info, fetchObjectMeta, fetchLineUpTeam, h1Content, content } =
  useShareTeams();

const teamInfo = ref(null);

const route = useRoute();

const getComponentActive = computed(() => {
  if (route.query.tab) {
    const tab = tabs.value.find((item) => {
      if (Array.isArray(item.redirect)) {
        return item.redirect.includes(route.fullPath);
      } else {
        return item.redirect === route.fullPath;
      }
    });
    return tab?.components ?? false;
  } else {
    return Summary;
  }
});

const tabs = ref([
  {
    id: 1,
    name: 'Team Data',
    redirect: [
      `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.SUMMARY}`,
      `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}`,
    ],
    components: Summary,
  },
  {
    id: 2,
    name: 'Match Schedule',
    redirect: `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.TEAMSCHE}`,
    components: TeamSche,
  },
  {
    id: 3,
    name: 'Lineup',
    redirect: `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.LINEUP}`,
    components: LineUp,
  },
  {
    id: 4,
    name: 'Transfers',
    redirect: `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.PLAYERZH}`,
    components: PlayerZh,
  },
  {
    id: 5,
    name: 'Player Profile',
    redirect: `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.PLAYERDATA}`,
    components: PlayerData,
  },
  {
    id: 6,
    name: 'Achievements',
    redirect: `/${ROUTER_TEAM_NAME.TEAM}/${route.params.id}?tab=${ROUTER_TEAM_NAME.ACHIEVEMENTS}`,
    components: TeamNearYear,
  },
]);

if (
  route.query.tab &&
  ![
    ROUTER_TEAM_NAME.SUMMARY,
    ROUTER_TEAM_NAME.TEAMSCHE,
    ROUTER_TEAM_NAME.LINEUP,
    ROUTER_TEAM_NAME.PLAYERZH,
    ROUTER_TEAM_NAME.PLAYERDATA,
    ROUTER_TEAM_NAME.ACHIEVEMENTS,
  ].includes(route.query.tab)
) {
  navigateTo(tabs.value[0].redirect[1]);
}

if (!route.query.tab && Object.keys(route.query)?.length) {
  navigateTo(tabs.value[0].redirect[1]);
}

const fetchHonorTeam = async () => {
  try {
    const data = await useApiLiveScore(
      API_ROUTERS.LIVESCORE.TEAM_HONOR + `?team-id=${route.params.id}`
    );

    if (data?.length) {
      return data?.[0]?.honors?.reduce((acc, value) => {
        if (!Object.keys(acc).includes(value.honor.id)) {
          acc[value.honor.id] = data[0].honors.filter(
            (item) => item.honor.id === value.honor.id
          );
        }
        return acc;
      }, {});
    }
  } catch (e) {
    console.log(e);
  }
};

const { data } = await useAsyncData('allData', async () => {
  try {
    const [lineUpTeam, honorList] = await Promise.all([fetchLineUpTeam(route.params.id), fetchHonorTeam()]);

    // if (!lineUpTeam || lineUpTeam.length === 0) {
    //   showError({
    //     statusCode: 404,
    //     statusMessage: 'Dữ liệu không tồn tại!',
    //   });
    // }
    return {
      lineUpTeam,
      honorList
    };
  } catch (error) {
    console.error('Error fetching all data:', error);
    throw error;
  }
});
info.value = data.value;

if (!info.value?.lineUpTeam) {
  showError({
    statusCode: 404,
    statusMessage: translate('Data does not exist!'),
  });
}
teamInfo.value = data.value;

if(data.value?.lineUpTeam) {
  initSchemaTeam(data.value)
}
fetchObjectMeta(info.value?.lineUpTeam?.team_info?.team_name, route.fullPath);
</script>

<style lang="scss" scoped>
.team {
  border-radius: 6px;
  padding: 10px;
  min-height: 70vh;
  @media (max-width: 768px) {
    padding: 8px;
  }
}
@import url('~/assets/css/skeleton.scss');
</style>
