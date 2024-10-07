<template>
  <div class="table" v-if="Object.keys(listPerformance)?.length && !isLoading">
    <div v-for="(item, index) in listPerformance.near_years" :key="index">
      <div class="table__title">
        {{ translate('Tournament Score Statistics') }}
        {{ listPerformance.short_name }} {{ item.year }}
      </div>
      <div class="table__content" style="overflow: auto">
        <table
          :class="{
            skeleton: isLoading,
          }"
        >
          <tr>
            <th></th>
            <th>{{ translate('Games') }}</th>
            <th>{{ translate('Wins') }}</th>
            <th>{{ translate('Draws') }}</th>
            <th>{{ translate('Losses') }}</th>
            <th>{{ translate('Goals Scored') }}</th>
            <th>{{ translate('Goals Conceded') }}</th>
            <th>{{ translate('Goal Difference') }}</th>
            <th>{{ translate('Win%') }}</th>
            <th>{{ translate('Draw%') }}</th>
            <th>{{ translate('Loss%') }}</th>
            <th>{{ translate('Avg Goals Scored') }}</th>
            <th>{{ translate('Avg Goals Conceded') }}</th>
            <th>{{ translate('Points') }}</th>
            <th>{{ translate('Position') }}</th>
          </tr>
          <tr>
            <td>{{ translate('All') }}</td>
            <td>{{ item?.filtered_row?.total }}</td>
            <td>{{ item?.filtered_row?.won }}</td>
            <td>{{ item?.filtered_row?.draw }}</td>
            <td>{{ item?.filtered_row?.loss }}</td>
            <td>{{ item?.filtered_row?.goals }}</td>
            <td>{{ item?.filtered_row?.goals_against }}</td>
            <td>{{ item?.filtered_row?.goal_diff }}</td>
            <td>
              {{
                perCentItem(item?.filtered_row?.won, item?.filtered_row?.total)
              }}
            </td>
            <td>
              {{
                perCentItem(item?.filtered_row?.draw, item?.filtered_row?.total)
              }}
            </td>
            <td>
              {{
                perCentItem(item?.filtered_row?.loss, item?.filtered_row?.total)
              }}
            </td>
            <td>
              {{
                calcAvg(item?.filtered_row?.goals, item?.filtered_row?.total)
              }}
            </td>
            <td>
              {{
                calcAvg(
                  item?.filtered_row?.goals_against,
                  item?.filtered_row?.total
                )
              }}
            </td>
            <td>{{ item?.filtered_row?.points }}</td>
            <td>{{ item?.filtered_row?.position }}</td>
          </tr>
          <tr class="bg-gray">
            <td>{{ translate('Home Team') }}</td>
            <td>{{ item?.filtered_row?.home_total }}</td>
            <td>{{ item?.filtered_row?.home_won }}</td>
            <td>{{ item?.filtered_row?.home_draw }}</td>
            <td>{{ item?.filtered_row?.home_loss }}</td>
            <td>{{ item?.filtered_row?.home_goals }}</td>
            <td>{{ item?.filtered_row?.home_goals_against }}</td>
            <td>{{ item?.filtered_row?.home_goal_diff }}</td>
            <td>
              {{
                perCentItem(
                  item?.filtered_row?.home_won,
                  item?.filtered_row?.home_total
                )
              }}
            </td>
            <td>
              {{
                perCentItem(
                  item?.filtered_row?.home_draw,
                  item?.filtered_row?.home_total
                )
              }}
            </td>
            <td>
              {{
                perCentItem(
                  item?.filtered_row?.home_loss,
                  item?.filtered_row?.home_total
                )
              }}
            </td>
            <td>
              {{
                calcAvg(
                  item?.filtered_row?.home_goals,
                  item?.filtered_row?.home_total
                )
              }}
            </td>
            <td>
              {{
                calcAvg(
                  item?.filtered_row?.home_goals_against,
                  item?.filtered_row?.home_total
                )
              }}
            </td>
            <td>{{ item?.filtered_row?.home_points }}</td>
            <td>{{ item?.filtered_row?.home_position }}</td>
          </tr>
          <tr>
            <td>{{ translate('Away Team') }}</td>
            <td>{{ item?.filtered_row?.away_total }}</td>
            <td>{{ item?.filtered_row?.away_won }}</td>
            <td>{{ item?.filtered_row?.away_draw }}</td>
            <td>{{ item?.filtered_row?.away_loss }}</td>
            <td>{{ item?.filtered_row?.away_goals }}</td>
            <td>{{ item?.filtered_row?.away_goals_against }}</td>
            <td>{{ item?.filtered_row?.away_goal_diff }}</td>
            <td>
              {{
                perCentItem(
                  item?.filtered_row?.away_won,
                  item?.filtered_row?.away_total
                )
              }}
            </td>
            <td>
              {{
                perCentItem(
                  item?.filtered_row?.away_draw,
                  item?.filtered_row?.away_total
                )
              }}
            </td>
            <td>
              {{
                perCentItem(
                  item?.filtered_row?.away_loss,
                  item?.filtered_row?.away_total
                )
              }}
            </td>
            <td>
              {{
                calcAvg(
                  item?.filtered_row?.away_goals,
                  item?.filtered_row?.away_total
                )
              }}
            </td>
            <td>
              {{
                calcAvg(
                  item?.filtered_row?.away_goals_against,
                  item?.filtered_row?.away_total
                )
              }}
            </td>
            <td>{{ item?.filtered_row?.away_points }}</td>
            <td>{{ item?.filtered_row?.away_position }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>

  <div class="table" v-if="isLoading && !Object.keys(listPerformance)?.length">
    <div
      v-for="(item, index) in Array.from({ length: 5 }, (_, i) => i + 1)"
      :key="index"
    >
      <div class="table__title">
        {{ translate('Tournament Score Statistics') }}
      </div>
      <div class="table__content" style="overflow: auto">
        <table class="skeleton">
          <tr>
            <th></th>
            <th>{{ translate('Games') }}</th>
            <th>{{ translate('Wins') }}</th>
            <th>{{ translate('Draws') }}</th>
            <th>{{ translate('Losses') }}</th>
            <th>{{ translate('Goals Scored') }}</th>
            <th>{{ translate('Goals Conceded') }}</th>
            <th>{{ translate('Goal Difference') }}</th>
            <th>{{ translate('Win%') }}</th>
            <th>{{ translate('Draw%') }}</th>
            <th>{{ translate('Loss%') }}</th>
            <th>{{ translate('Avg Goals Scored') }}</th>
            <th>{{ translate('Avg Goals Conceded') }}</th>
            <th>{{ translate('Points') }}</th>
            <th>{{ translate('Position') }}</th>
          </tr>

          <tr
            v-for="(item, index) in Array.from({ length: 3 }, (_, i) => i + 1)"
          >
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
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
      </div>
    </div>
  </div>

  <div v-if="!Object.keys(listPerformance).length && !isLoading">
    <div class="table">
      <div>
        <div class="table__title">
          {{ translate('Tournament Score Statistics') }}
        </div>
        <div class="table__content" style="overflow: auto">
          <table class="skeleton">
            <tr>
              <th></th>
              <th>{{ translate('Games') }}</th>
              <th>{{ translate('Wins') }}</th>
              <th>{{ translate('Draws') }}</th>
              <th>{{ translate('Losses') }}</th>
              <th>{{ translate('Goals Scored') }}</th>
              <th>{{ translate('Goals Conceded') }}</th>
              <th>{{ translate('Goal Difference') }}</th>
              <th>{{ translate('Win%') }}</th>
              <th>{{ translate('Draw%') }}</th>
              <th>{{ translate('Loss%') }}</th>
              <th>{{ translate('Avg Goals Scored') }}</th>
              <th>{{ translate('Avg Goals Conceded') }}</th>
              <th>{{ translate('Points') }}</th>
              <th>{{ translate('Position') }}</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column align-items-center">
      <BaseImage
        class="nodata_pic"
        alt="nodata pic"
        width="200"
        height="200"
        src="/icon/nodata.svg"
      />
      <p class="fw-bold text-center mt-3">
        {{ translate('No Data Available') }}
      </p>
    </div>
  </div>
</template>

<script setup>
const { $t } = useShareCommon();
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const { info } = defineProps({
  info: Object,
});

const listPerformance = ref({});
const route = useRoute();
const isLoading = ref(true);
const sortYear = (items) => {
  try {
    return items.sort((a, b) => {
      if (!a.year) return 1;
      if (!b.year) return -1;

      const [startYearA, endYearA = startYearA] = a.year.split('-').map(Number);
      const [startYearB, endYearB = startYearB] = b.year.split('-').map(Number);

      if (startYearA !== startYearB) {
        return endYearB - endYearA;
      }
      return endYearB - endYearA;
    });
  } catch (e) {
    console.log(e);
  }
};

const fetchTeamPerformance = async () => {
  if (info?.lineUpTeam?.team_info?.competition_id) {
    await useApiLiveScore(
      `${API_ROUTERS.LIVESCORE.TEAM_ACHIEVEMENT}?team-id=${route.params.id}&competition-id=${info.lineUpTeam.team_info.competition_id}`
    ).then((resData) => {
      if (resData && resData?.[0]) {
        const data = resData[0];
        data.near_years = sortYear(data.near_years);
        listPerformance.value = data;
        isLoading.value = false;
      } else {
        isLoading.value = false;
      }
    });
  } else {
    isLoading.value = false;
  }
};

fetchTeamPerformance();

const perCentItem = (item1, item2) => {
  try {
    if (item2 === 0) {
      return '0%';
    }

    const result = (item1 / item2) * 100;

    if (isNaN(result) || !isFinite(result)) {
      return '0%';
    }

    return Math.ceil(result) + '%';
  } catch {
    return '0%';
  }
};

const calcAvg = (item1, item2) => {
  try {
    if (item2 === 0) {
      return '0';
    }

    const result = item1 / item2;

    if (isNaN(result) || !isFinite(result)) {
      return '0';
    }

    return parseFloat(result.toFixed(2));
  } catch {
    return '0';
  }
};
</script>

<style lang="scss" scoped>
.table {
  &__title {
    min-height: 30px;
    font-weight: bold;
    font-size: 12px;
    color: white;
    background: $menu;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    min-width: 700px;
  }
  td,
  th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
  }
  tr th {
    background-color: #e6e6e6;
    color: #666;
    padding: 0 2px;
  }
  td {
    &:nth-child(9) {
      background-color: #fbeee9;
    }
    &:nth-child(10) {
      background-color: #fdf4e0;
    }
    &:nth-child(11) {
      background-color: var(--table-honor, #f3fdea);
    }
    &:nth-child(12) {
      background-color: var(--table-honor, #f3fdea);
    }
    &:nth-child(13) {
      background-color: #f0f8fd;
    }
    &:nth-child(14) {
      background-color: #f0f8fd;
    }
    &:nth-child(15) {
      background-color: #ffffe7;
    }
  }
  .bg-gray {
    background-color: #e5e5e575;
  }
}

.skeleton {
  th {
    padding: 2px !important;
    height: unset !important;
  }
  td {
    height: 35px;
    padding: 12px !important;
  }
}
</style>
