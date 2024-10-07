<template>
  <div class="table">
    <div class="table__title">
      {{ translate('Statistics for the Last 2 Years') }}
    </div>
    <div class="table__content" style="overflow-x: auto">
      <table>
        <tr>
          <th>{{ translate('Tournament') }}</th>
          <th>{{ translate('Date') }}</th>
          <th>{{ translate('Home Team') }}</th>
          <th style="width: 50px">{{ translate('Score') }}</th>
          <th>{{ translate('Away Team') }}</th>
          <th>{{ translate('Goals') }}</th>
          <th>{{ translate('Assists') }}</th>
          <th>{{ translate('Penalty Kicks') }}</th>
          <th>{{ translate('Yellow Cards') }}</th>
          <th>{{ translate('Red Cards') }}</th>
        </tr>
        <tr
          v-if="initMatch.length"
          v-for="(item, index) in initMatch"
          :key="index"
          :class="{
            'bg-gray': index % 2 !== 0,
          }"
        >
          <td :style="{ backgroundColor: item.bgColor, color: 'white' }">
            {{ item.match_info?.comp_name ?? item.match_info?.comp_short_name }}
          </td>
          <td>
            {{
              formatDateMomentUTCTimeZone(
                item.match_info.match_time,
                'DD-MM-yyyy HH:mm',
                timeZone
              )
            }}
          </td>
          <td>
            <nuxt-link
              :to="`/${ROUTER_TEAM_NAME.TEAM}/${item.home_team_info.id}`"
              >{{ item.home_team_info.name }}
            </nuxt-link>
          </td>
          <td>
            <div
              class="d-flex gap-1"
              style="
                min-width: 100px;
                justify-content: center;
                align-items: center;
              "
            >
              <div
                style="
                  width: 20px;
                  height: 20px;
                  object-fit: contain;
                  flex: 0 0 35px;
                "
              >
                <BaseImage
                  style="height: 100%; width: auto; object-fit: contain"
                  :src="
                    getLiveScoreImage(
                      item?.home_team_info?.country_logo_o
                        ? item?.home_team_info?.country_logo_o
                        : item?.home_team_info?.logo_o,
                      'team'
                    ) + '!h50'
                  "
                  :alt="`team-home`"
                />
              </div>
              <span class="flex: 0 0 20px;">
                {{ item.match_info.home_scores[0] }}-{{
                  item.match_info.away_scores[0]
                }}
              </span>
              <div
                style="
                  width: 20px;
                  height: 20px;
                  object-fit: contain;
                  flex: 0 0 35px;
                "
              >
                <BaseImage
                  style="height: 100%; width: auto; object-fit: contain"
                  :src="
                    getLiveScoreImage(
                      item?.away_team_info?.country_logo_o
                        ? item?.away_team_info?.country_logo_o
                        : item?.away_team_info?.logo_o,
                      'team'
                    ) + '!h50'
                  "
                  :alt="`team-away`"
                />
              </div>
            </div>
          </td>

          <td>
            <nuxt-link
              :to="`/${ROUTER_TEAM_NAME.TEAM}/${item.away_team_info.id}`"
              >{{ item.away_team_info.name }}
            </nuxt-link>
          </td>
          <td>{{ item.goals }}</td>
          <td>{{ item.assists }}</td>
          <td>{{ item.penalty }}</td>
          <td>{{ item.yellow_cards }}</td>
          <td>{{ item.red_cards }}</td>
        </tr>
      </table>

      <div
        v-if="!initMatch.length"
        class="d-flex flex-column align-items-center w-100"
        style="border: 1px solid #dee2e6; border-top: none"
      >
        <BaseImage
          class="nodata_pic p-0"
          alt="nodata pic"
          width="200"
          height="200"
          src="/icon/nodata.svg"
        />
        <p class="fw-bold text-center p-0">
          {{ translate('No Data Available') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const settingsData = useCookie('settingsData');
const timeZone = ref(settingsData?.value?.timeZone || '');

const { info } = defineProps({
  info: Array,
});
const { $t } = useShareCommon()
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

const initMatch = computed(() => {
  const colorMap = {};
  info.forEach((item) => {
    if (!colorMap[item.match_info.comp_short_name]) {
      colorMap[item.match_info.comp_short_name] =
        colors[Object.keys(colorMap).length % colors.length];
    }
    item.bgColor = colorMap[item.match_info.comp_short_name];
  });
  return info;
});
</script>

<style lang="scss" scoped>
.table {
  &__title {
    height: 30px;
    font-weight: bold;
    font-size: 14px;
    color: white;
    background: $secondary;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    min-width: 600px;
    border: 1px solid #ddd;
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
    padding: 2px;
  }
  td a {
    margin-right: 5px;
    color: $primary;
    cursor: pointer;
    &:hover {
      color: $tabsactive;
      text-decoration: underline;
    }
  }

  tr {
    &:hover {
      background-color: #57555527;
    }
  }

  .bg-gray {
    background-color: #e5e5e575;
  }
}
</style>
