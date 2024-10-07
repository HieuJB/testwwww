<template>
  <TeamsLayouts>
    <div class="team__title">{{translate('Tournament')}}</div>
    <div>
      <div style="overflow-x: auto">
        <table
          :class="{
            skeleton: isLoading,
          }"
        >
          <tr>
            <th>{{translate('League')}}</th>
            <th>{{translate('Match Date')}}</th>
            <th>{{translate('Home Team')}}</th>
            <th>{{translate('Away Team')}}</th>
          </tr>
          <tr v-if="schedules?.length" v-for="(item, index) in schedules" :key="index">
            <td :style="{ backgroundColor: item.bgColor, color: 'white' }">
              {{ item?.competition_name || item.competition_short_name }}
            </td>
            <td>
              {{
                formatDateMomentUTCTimeZone(
                  item.match_time,
                  'DD-MM-yyyy HH:mm',
                  timeZone
                )
              }}
            </td>
            <td>
              <nuxt-link
                :to="`/${ROUTER_TEAM_NAME.TEAM}/${item.home_team.id}?tab=${ROUTER_TEAM_NAME.SUMMARY}`"
                :class="[
                  'team-name',
                  {
                    'team-name--active':
                      info.lineUpTeam.team_info.team_id === item.home_team.id,
                  },
                ]"
                >{{ item.home_team.name }}
              </nuxt-link>
            </td>
            <td>
              <nuxt-link
                :to="`/${ROUTER_TEAM_NAME.TEAM}/${item.away_team.id}?tab=${ROUTER_TEAM_NAME.SUMMARY}`"
                :class="[
                  'team-name',
                  {
                    'team-name--active':
                      info.lineUpTeam.team_info.team_id === item.away_team.id,
                  },
                ]"
                >{{ item.away_team.name }}
              </nuxt-link>
            </td>
          </tr>

          <tr
            v-if="isLoading && !schedules?.length"
            v-for="item in Array.from({ length: 15 }, (_, i) => i + 1)"
          >
            <td></td>
            <td style="padding: 18px"></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  </TeamsLayouts>
  <div v-if="!schedules.length && !isLoading">
    <div class="d-flex flex-column align-items-center">
      <BaseImage
        class="nodata_pic"
        alt="nodata pic"
        width="200"
        height="200"
        src="/icon/nodata.svg"
      />
    </div>
    <p class="fw-bold text-center mt-3">{{translate('No Data Available')}}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  info: Array,
});
const route = useRoute();
const objectIdSlug = ref(route?.params?.id || '');
const schedules = ref([]);
const isLoading = ref(true);
const settingsData = useCookie<any>('settingsData');
const timeZone = ref(settingsData?.value?.timeZone || '');
const { $t, useLocale } = useShareCommon()
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const colors = [
  '#1F77B4', // xanh dương
  '#FF7F0E', // cam
  '#2CA02C', // xanh lá
  '#D62728', // đỏ
  '#9467BD', // tím
  '#8C564B', // nâu
  '#E377C2', // hồng
  '#7F7F7F', // xám
  '#BCBD22', // vàng
  '#17BECF', // xanh ngọc
];

const fetchSchedule = async () => {
  try {
    await useApiLiveScore(
      API_ROUTERS.LIVESCORE.SCHEDULE + '?team-id=' + objectIdSlug.value + `&lang=${useLocale.value.defaultLocale}`
    ).then((resData) => {
      if (resData) {
        const colorMap = {};

        resData.forEach((item) => {
          if (!colorMap[item.competition_id]) {
            colorMap[item.competition_id] =
              colors[Object.keys(colorMap).length % colors.length];
          }
          item.bgColor = colorMap[item.competition_id];
        });

        schedules.value = resData;
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};

fetchSchedule();
</script>

<style lang="scss" scoped>
.team {
  &__title {
    height: 30px;
    background: $menu;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
  }
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
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
  @media (max-width: 450px) {
    padding: 1px;
    font-size: 11.5px;
  }
}

tr:nth-child(2n + 1) {
  background-color: rgb(247, 247, 247);
}

.team-name {
  cursor: pointer;
  color: black;
  &:hover {
    color: $tabsactive;
    text-decoration-line: underline;
  }
  &--active {
    color: $primary;
  }
}
.skeleton {
  th {
    height: 34px !important;
  }
}
</style>
