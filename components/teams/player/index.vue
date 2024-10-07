<template>
  <div class="player">
    <div class="player__team">
      <TeamsPlayerTeamInfo
        v-model:listCompetition="listCompetition"
        v-model:competitionActive="competitionActive"
        v-model:seasonList="seasonList"
        v-model:seasonActive="seasonActive"
        v-model:playerPerformance="playerPerformance"
        v-model:isLoading="isLoading"
      />
    </div>
    <div class="player__info">
      <TeamsPlayerPersonal
        v-if="info && info.player.length"
        @showModal="showModal"
        :info="info.player[0]"
      />
      <TeamsPlayerTablePayroll
        v-if="info && info.player[0]"
        :info="info.player[0]"
      />
      <TeamsPlayerStatistical :info="transfer" />
      <TeamsPlayerStatisticalTwoYear :info="matchPlayer" />
      <TeamsTableHonor
        :title="translate('Award')"
        :info="honorList"
      />
    </div>
  </div>

  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary d-none"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    id="btn-open-modal"
  ></button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div
            class="modal-close-btn"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <BaseImage :src="'/img/close.gif'" alt="closeModal"></BaseImage>
          </div>
          <TeamsPlayerTeamInfo
            v-model:listCompetition="listCompetition"
            v-model:competitionActive="competitionActive"
            v-model:seasonList="seasonList"
            v-model:seasonActive="seasonActive"
            v-model:playerPerformance="playerPerformance"
            v-model:isLoading="isLoading"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { initSchemaPlayer } = useSchema()
const { $t, useLocale } = useShareCommon();
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const route = useRoute();
const transfer = ref(null);
const matchPlayer = ref([]);
const honorList = ref({});
const listCompetition = ref([]);
const isLoading = ref(false);
const competitionActive = ref({});
const seasonList = ref([]);
const seasonActive = ref(null);
const playerPerformance = ref({});
const { info } = defineProps({
  info: Object,
});


const showModal = () => {
  document.getElementById('btn-open-modal').click();
};

const fetchPlayerStatistical = async () => {
  await useApiLiveScore(
    `${API_ROUTERS.LIVESCORE.PLAYER_TRANSFERS}?player-id=${route.params.id}`
  )
    .then((resData) => {
      if (resData && resData[0] && resData[0].transfer) {
        transfer.value = resData[0].transfer;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const fetchMatchPlayer = async () => {
  await useApiLiveScore(
    `${API_ROUTERS.LIVESCORE.PLAYER_MATCH}?player-id=${route.params.id}&lang=${useLocale.value.defaultLocale}`
  )
    .then((resData) => {
      if (resData) {
        matchPlayer.value = resData;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
const fetchHonor = async () => {
  await useApiLiveScore(
    `${API_ROUTERS.LIVESCORE.PLAYER_HONOR}?player-id=${route.params.id}`
  )
    .then((resData) => {      
      if (resData && resData[0] && resData[0].honors) {
        const data = resData[0].honors.reduce((acc, value) => {
          if (!Object.keys(acc).includes(value.honor.id)) {
            acc[value.honor.id] = resData[0].honors.filter(
              (item) => item.honor.id === value.honor.id
            );
          }
          return acc;
        }, {});
        honorList.value = data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const fetchPerfomancePlayerBySeason = async () => {
  isLoading.value = true;
  await useApiLiveScore(
    `${API_ROUTERS.LIVESCORE.PLAYER_PERFORMANCE}?player-id=${route.params.id}&season-id=${seasonActive.value}`
  )
  .then((resData) => {
      if (resData && resData[0]) {
        playerPerformance.value = resData[0];
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const fetchCompetitionsOfPlayer = async () => {
  await useApiLiveScore(
    `${API_ROUTERS.LIVESCORE.PLAYER_COMPETITIONS}?player-id=${route.params.id}&lang=${useLocale.value.defaultLocale}`
  ).then((resData) => {
    if (resData) {
      listCompetition.value = resData;
      competitionActive.value = resData?.[0]?.competition_id;
      seasonList.value = resData?.[0]?.seasons;
      seasonActive.value = resData?.[0]?.seasons?.[0]?.id;
      if(seasonActive.value) {
        fetchPerfomancePlayerBySeason()
      } else {
        isLoading.value = false;
      }
    }
  });
};

watch(
  () => seasonActive.value,
  () => {
    if(seasonActive.value) {
      fetchPerfomancePlayerBySeason()
    }
  }
);

watch(
  () => competitionActive.value,
  () => {
    if (competitionActive.value) {
      const data = listCompetition.value.find(
        (item) => item.competition_id === competitionActive.value
      );
      seasonList.value = data.seasons;
      seasonActive.value = data.seasons?.[0].id;
    }
  }
);

fetchCompetitionsOfPlayer();
await Promise.all([fetchPlayerStatistical(), fetchMatchPlayer(), fetchHonor()]);

initSchemaPlayer(
  {
    player: info?.player?.[0],
    transfer: transfer.value,
    honor: honorList.value
  }
)
</script>

<style lang="scss" scoped>
.player {
  display: flex;
  position: relative;
  gap: 10px;
  &__team {
    width: 220px;
    flex-shrink: 0;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &__info {
    width: 100%;
  }
}
.modal-close-btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  img {
    width: 20px;
  }
}
:deep() {
  .team {
    &__title {
      background: $secondary;
      height: 30px;
      color: white;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
    }
    .team__table {
      tr th {
        background-color: #e6e6e6;
        color: #666;
        padding: 2px;
      }
    }
  }
}
</style>
