<template>
  <div>
    <div style="overflow-x: auto">
      <table
        class="team__table"
        :class="{
          skeleton: isLoading,
        }"
      >
        <tr>
          <th>{{ translate('League') }}</th>
          <th>{{ translate('Match Date') }}</th>
          <th>{{ translate('Home Team') }}</th>
          <th>{{ translate('Score') }}</th>
          <th>{{ translate('Away Team') }}</th>
          <th>{{ translate('Red Card') }}</th>
          <th>{{ translate('Yellow Card') }}</th>
          <th>{{ translate('Dangerous Attacks') }}</th>
          <th>{{ translate('Ball Possession') }}</th>
          <th>{{ translate('Attack') }}</th>
          <th>{{ translate('Penalty') }}</th>
          <th>{{ translate('Corners') }}</th>
          <th>{{ translate('Shots on Target') }}</th>
          <th>{{ translate('Data') }}</th>
        </tr>
        <tr
          v-if="scheduleSeleted.initData.length"
          v-for="(item, index) in scheduleSeleted.initData"
          :key="index"
        >
          <td
            :style="{
              backgroundColor:
                item.competition_primary_color &&
                item.competition_primary_color !== '#C7FF00'
                  ? item.competition_primary_color
                  : '#427242',
              color: 'white',
            }"
          >
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
          <td
            :class="[
              'team-name',
              {
                'team-name--active':
                  info?.lineUpTeam?.team_info?.team_id === item?.home_team?.id,
              },
            ]"
          >
            <div
              v-if="
                info?.lineUpTeam?.team_info?.team_id !== item?.home_team?.id
              "
            >
              <nuxt-link
                :to="`/${ROUTER_TEAM_NAME.TEAM}/${item.home_team.id}?tab=${ROUTER_TEAM_NAME.SUMMARY}`"
                >{{ item.home_team.name }}
              </nuxt-link>
            </div>
            <span v-else>{{ item.home_team.name }}</span>
          </td>
          <td>{{ item.home_scores[0] }}-{{ item.away_scores[0] }}</td>
          <td
            :class="[
              'team-name',
              {
                'team-name--active':
                  info?.lineUpTeam?.team_info?.team_id === item?.away_team?.id,
              },
            ]"
          >
            <div v-if="info.lineUpTeam.team_info.team_id !== item.away_team.id">
              <nuxt-link
                :to="`/${ROUTER_TEAM_NAME.TEAM}/${item.away_team.id}?tab=${ROUTER_TEAM_NAME.SUMMARY}`"
                >{{ item.away_team.name }}
              </nuxt-link>
            </div>
            <span v-else>{{ item.away_team.name }}</span>
          </td>
          <td>{{ item.home_scores[2] }}</td>
          <td>{{ item.home_scores[3] }}</td>
          <td>
            {{
              getStart(
                item.live_stats,
                info.lineUpTeam.team_info.team_id === item.home_team.id,
                24
              )
            }}
          </td>
          <td>
            {{
              getStart(
                item.live_stats,
                info.lineUpTeam.team_info.team_id === item.home_team.id,
                25
              )
            }}
          </td>
          <td>
            {{
              getStart(
                item.live_stats,
                info.lineUpTeam.team_info.team_id === item.home_team.id,
                23
              )
            }}
          </td>
          <td>
            {{
              getStart(
                item.live_stats,
                info.lineUpTeam.team_info.team_id === item.home_team.id,
                8
              )
            }}
          </td>
          <td>
            {{
              getStart(
                item.live_stats,
                info.lineUpTeam.team_info.team_id === item.home_team.id,
                2
              )
            }}
          </td>
          <td>
            {{
              getStart(
                item.live_stats,
                info.lineUpTeam.team_info.team_id === item.home_team.id,
                21
              )
            }}
          </td>
          <td>
            <nuxt-link
              class="highlighted"
              :to="`${ROUTERS_OLD.MATCH_DETAIL}${item.id}?tab=h2h`"
            >
              <BaseImage
                style="width: 15px; height: 15px"
                :src="`/icon/analysis.png`"
                alt="analysis"
              />
            </nuxt-link>
          </td>
        </tr>
        <tr
          v-if="isLoading && !scheduleSeleted?.initData?.length"
          v-for="item in Array.from({ length: 15 }, (_, i) => i + 1)"
        >
          <td></td>
          <td style="padding: 18px"></td>
          <td>dummy data dummy data</td>
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
      <div v-if="!scheduleSeleted?.initData?.length && !isLoading">
        <div class="d-flex flex-column align-items-center">
          <BaseImage
            class="nodata_pic"
            alt="nodata pic"
            width="200"
            height="200"
            src="/icon/nodata.svg"
          />
        </div>
        <p class="fw-bold text-center mt-3">Dữ liệu đang được cập nhật</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  info: Object,
});
const { $t } = useShareCommon()
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const isLoading = defineModel('isLoading');
const scheduleSeleted = defineModel('scheduleSeleted');
const listDetailData = defineModel('listDetailData');
const settingsData = useCookie('settingsData');
const timeZone = ref(settingsData?.value?.timeZone || '');

const getStart = (item, isHometeam, type) => {
  try {
    if (isHometeam) {
      const data = item.find((item) => item.type === type);
      return data.home ?? '-';
    }

    const data = item.find((item) => item.type === type);
    return data.away ?? '-';
  } catch {
    return '-';
  }
};
</script>

<style lang="scss" scoped>
.team-name {
  color: black;

  &--active {
    color: $primary;
  }
}
td a {
  color: black;
  &:hover {
    text-decoration: underline;
    color: $tabsactive;
  }
}
</style>
