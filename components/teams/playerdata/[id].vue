<template>
  <TeamsLayouts>
    <div class="player">
  <div class="player__header">
    <select
      v-if="competitionSeasonList?.length"
      @change="onCompetitionChange"
      v-model="competitionActive"
      class="form-select"
    >
      <option
        :value="item.competition_id"
        v-for="(item, index) in competitionSeasonList"
        :key="index"
      >
        {{ item?.competition_name || item.competition_short_name }}
      </option>
    </select>
    <div class="player__title">{{ translate('Player Profile') }}</div>
    <select
      v-if="season?.list?.length"
      @change="fetchPlayer"
      v-model="season.active"
      class="form-select"
    >
      <option
        :value="item.season_id"
        v-for="(item, index) in season.list"
        :key="index"
      >
        {{ item.season_year }}
      </option>
    </select>
  </div>

  <div style="overflow-x: auto">
    <table
      :class="{
        skeleton: isLoading,
      }"
    >
      <tr>
        <th>{{ translate('Rank') }}</th>
        <th>{{ translate('Player') }}</th>
        <th>{{ translate('Goals') }}</th>
        <th>{{ translate('Assists') }}</th>
        <th>{{ translate('Matches Played') }}</th>
        <th>{{ translate('Accurate Passes') }}</th>
        <th>{{ translate('Challenges') }}</th>
        <th>{{ translate('Fouls') }}</th>
        <th>{{ translate('Yellow Cards') }}</th>
        <th>{{ translate('Red Cards') }}</th>
      </tr>
      <tr
        :class="[
          'team-table__init',
          {
            'team-table__init--bg': index % 2 !== 0,
          },
        ]"
        v-if="playerInfo?.length"
        v-for="(item, index) in playerInfo"
        :key="index"
      >
        <td>{{ ++index }}</td>
        <td>
          <nuxt-link
            class="player-name text-capitalize"
            :to="`/${ROUTER_TEAM_NAME.PLAYER}/${item.player_id}`"
            >{{ item.player_name }}</nuxt-link
          >
        </td>
        <td>{{ item.goals }}</td>
        <td>{{ item.assists }}</td>
        <td>{{ item.matches }}</td>
        <td>{{ item.passes_accuracy }}</td>
        <td>{{ item.duels }}</td>
        <td>{{ item.fouls }}</td>
        <td>{{ item.yellow_cards }}</td>
        <td>{{ item.red_cards }}</td>
      </tr>

      <tr
        v-if="isLoading && !playerInfo?.length"
        v-for="item in Array.from({ length: 20 }, (_, i) => i + 1)"
      >
        <td></td>
        <td style="padding: 18px"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>

    <div v-if="!playerInfo.length && !isLoading">
      <div class="d-flex flex-column align-items-center">
        <BaseImage
          class="nodata_pic"
          alt="nodata pic"
          width="200"
          height="200"
          src="/icon/nodata.svg"
        />
      </div>
      <p class="fw-bold text-center mt-3">{{ translate('No Data Available') }}</p>
    </div>
  </div>
</div>

  </TeamsLayouts>
</template>

<script setup>
const { $t, useLocale } = useShareCommon();
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const route = useRoute();
const objectIdSlug = ref(route?.params?.id || '');
const playerInfo = ref([]);
const competitionSeasonList = ref([]);
const competitionActive = ref(null);
const isLoading = ref(true);

const season = reactive({
  list: [],
  active: null,
});

const sortedSeasons = (seasons) => {
  if (seasons) {
    return seasons.sort((a, b) => {
      const getLatestYear = (seasonYear) => {
        const years = seasonYear.split('-').map(Number);
        return Math.max(...years);
      };

      return getLatestYear(b.season_year) - getLatestYear(a.season_year);
    });
  }
  return null;
};

const fetchCompetitionSeason = async () => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.COMPETITION_SEASON + `?team-id=${objectIdSlug.value}&lang=${useLocale.value.defaultLocale}`
  )
    .then(async (resData) => {
      if (resData) {
        competitionSeasonList.value = resData;
        competitionActive.value = resData[0]?.competition_id ?? null;
        season.list = sortedSeasons(resData[0]?.seasons);
        season.active = season.list?.[0]?.season_id ?? null;
        await fetchPlayer();
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const fetchPlayer = async () => {
  if (playerInfo.value.length) {
    isLoading.value = true;
  }

  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.PLAYER_INFO +
      `?team-id=${objectIdSlug.value}&season-id=${season.active}`
  )
    .then((resData) => {
      if (resData) {
        playerInfo.value = resData.sort((a, b) => {
          if (b.goals !== a.goals) {
            return b.goals - a.goals;
          } else {
            return b.assists - a.assists;
          }
        });
      }
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const onCompetitionChange = async () => {
  try {
    const data = competitionSeasonList.value.find(
      (item) => item.competition_id === competitionActive.value
    );
    if (data) {
      season.list = sortedSeasons(data.seasons);
      season.active = season.list[0].season_id;
      await fetchPlayer();
    }
  } catch (e) {
    console.log(e);
  }
};

fetchCompetitionSeason();
</script>

<style lang="scss" scoped>
.player {
  &__header {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    min-height: 30px;
    background: $menu;
    padding: 5px 10px;
    gap: 5px;
    @media (max-width: 768px) {
      .form-select {
        width: 150px;
        padding-right: 25px;
        padding-left: 2px;
      }
    }
    @media (max-width: 450px) {
      .form-select {
        width: 100px;
        padding-left: 2px;
      }
    }
  }
  &__title {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: white;
    text-align: center;
    @media (max-width: 768px) {
      position: relative;
    }
    &--loading {
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.form-select {
  position: relative;
  font-size: 10px;
  z-index: 2;
  width: unset;
  padding-top: 2px;
  padding-bottom: 2px;
  &:focus {
    border-color: $primary;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.158);
  }
}

.team-table {
  &__header {
    font-size: 14px;
    color: white;
    background: $menu;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    font-weight: bold;
  }
  &__init {
    transition: all 0.2s;
    &:hover {
      background-color: rgba(219, 217, 217, 0.678) !important;
    }
    &--bg {
      background-color: rgb(247, 247, 247);
    }
    .player-name {
      color: $primary;
      cursor: pointer;
      &:hover {
        color: $tabsactive;
        text-decoration: underline;
      }
    }
  }
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  min-width: 500px;
  border: 1px solid #ddd;
}
th {
  background: #e6e6e6;
}
th,
td {
  text-align: center;
  padding: 8px;
  border: 1px solid #ddd;
}

.skeleton {
  th {
    height: 35px !important;
  }
}
</style>
