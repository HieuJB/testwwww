<template>
  <TeamsLayouts>
   <div style="min-height: 40px; margin-top: 10px;">
    <ClientOnly>
    <TeamsSelectSeason
      :seasonList="seasonList"
      v-model:seasonActive="seasonActive"
    />
   </ClientOnly>
   </div>

    <TeamsTablePlayerzh
      v-model:isLoading="isLoading"
      :info="moveInResults"
      :title="translate('Join')"
      isJoinTable
    />

    <TeamsTablePlayerzh
      v-model:isLoading="isLoading"
      :info="leaveResults"
      :title="translate('Leave')"
    />
  </TeamsLayouts>
</template>

<script setup>
const { $t } = useShareCommon();
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const props = defineProps({
  info: Array,
});
const seasonList = ref([]);
const seasonActive = defineModel('seasonActive');
const isLoading = ref(true);
const moveInResults = ref([]);
const leaveResults = ref([]);

const sortYear = (items) => {
  try {
    return items.sort((a, b) => {
      if (!a.season_years) return 1;
      if (!b.season_years) return -1;

      const [startYearA, endYearA = startYearA] = a.season_years
        .split('-')
        .map(Number);
      const [startYearB, endYearB = startYearB] = b.season_years
        .split('-')
        .map(Number);

      if (startYearA !== startYearB) {
        return endYearB - endYearA;
      }
      return endYearB - endYearA;
    });
  } catch (e) {
    console.log(e);
  }
};

const fetchSeasonTeam = async (id) => {
  if (id) {
    await useApiLiveScore(
      API_ROUTERS.LIVESCORE.SEASON_TRANSFER + '?comp_id=' + id
    )
      .then((resData) => {
        if (resData && resData[0]?.seasons_stages) {
          const data = sortYear(resData[0]?.seasons_stages) ?? null;
          seasonList.value = data;
          seasonActive.value = data[0]?.season_years ?? null;
        } else {
          isLoading.value = false;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    isLoading.value = false;
  }
};

const fetchPlayerTransfer = async () => {
  isLoading.value = true;
  const teamId = props.info.lineUpTeam.team_info.team_id;
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.PLAYER_TRANSFER +
      `?team-id=${teamId}&season-year=${seasonActive.value}`
  )
    .then((resData) => {
      if (resData) {
        initPromisePlayerPosition(resData[0]);
      } else {
        isLoading.value = false;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const fetchPlayerPosition = async (item) => {
  try {
    const data = await useApiLiveScore(
      API_ROUTERS.LIVESCORE.PLAYER_POSITION + '?player-id=' + item.player_id
    );

    data[0] = {
      ...data[0],
      ...item,
    };
    return data;
  } catch {
    console.log(e);
  }
};

const initPromisePlayerPosition = async (item) => {
  try {
    isLoading.value = true;
    moveInResults.value = item.move_in;
    leaveResults.value = item.leave;
  } catch (error) {
    console.error('Error processing transfers:', error);
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => seasonActive.value,
  () => {
    if (seasonActive.value) {
      fetchPlayerTransfer();
    }
  },
  { immediate: true }
);

watch(
  () => props.info.lineUpTeam,
  () => {
    if (props.info.lineUpTeam) {
      fetchSeasonTeam(props.info.lineUpTeam.team_info.competition_id);
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped></style>
