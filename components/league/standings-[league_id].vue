<!-- There are multiple root elements -->
<template>
  <div class="info_title" id="InfoTitle">
    <div class="info_title_left" id="TitleLeft">
      <div class="img">
        <BaseImage :src="getLiveScoreImage(competitionDetail?.logo_o, 'competition') + '!h50'" loading="lazy" alt=""/>
      </div>
      <h1>{{ props?.title }}</h1>
      <div class="selectbox" v-if="compSeason?.seasons_stages?.length > 0">
        <select name="seasonList" id="seasonList" v-model="curSeasonId" @change="onChangeCurSeason">
          <template v-for="(item, index) in compSeason?.seasons_stages">
            <option :value="item?.season_id">{{ item?.season_years }}</option>
          </template>
        </select>
      </div>
    </div>
    <!-- <div class="info_title_right" id="TitleRight">
      <div id="favLeagueIcon" class="follow_btn on" onclick="favLeague('113')">Đã theo dõi<i class="icon iconfont icon-font-collect-on"></i></div>
    </div> -->
  </div>
  <HeaderLeagueComponent :comp-detail="competitionDetail" :cur-season-id="curSeasonId"/>
  <div class="data mb-3">
    <div style="clear:both;"></div>
    <div class="tdsolid" id="ScoreGroupDiv" style="display: block;">
      <div class="rankbox" v-if="seasonTableStandingList?.length > 0">
        <table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="float: left; min-width: 135px">
          <tbody>
            <template
              v-for="(item, index) in seasonTableStandingList"
              :key="index"
              >
              <tr align="center">
                <th class="groupTitle table-bd-lr" :title="$t('Ranking')">{{ $t('R') }}</th>
                <th class="groupTitle league-name" colspan="2" v-if="seasonTableStandingList?.length > 1" :title="`${item?.stage_info?.stage_name}-${TABLE_STANDING_LIST?.[item?.group]}`">
                  <span >{{item?.stage_info?.stage_name}} </span> - {{ TABLE_STANDING_LIST?.[item?.group] }}
                </th>
                <th class="groupTitle" colspan="2" v-else>{{ $t('Team') }}</th>
              </tr>
              <template
              v-for="(row, row_index) in item?.rows"
              :key="row_index"
              >
                <tr align="center">
                  <td width="44" class="table-bd-lr" :bgcolor="row?.promotion_color">{{ row?.position }}</td>
                  <td style="text-align:left;width:338px;padding-left: 2px;" class="league-name" :title="row.team_info.team_name"><nuxt-link class="highlighted" :to="`/${ROUTER_TEAM_NAME.TEAM}/${row.team_info.team_id}`">{{ row.team_info.team_name }} </nuxt-link></td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
        <div class="rankdata" width="75%">
          <table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%">
            <tbody>
              <template
                v-for="(item, index) in seasonTableStandingList"
                :key="index"
                >
                <tr align="center">
                  <th class="groupTabTitle groupTitle">{{ $t('All') }}</th>
                  <th class="groupTabTitle groupTitle">{{ $t('Win') }}</th>
                  <th class="groupTabTitle groupTitle">{{ $t('Draw') }}</th>
                  <th class="groupTabTitle groupTitle">{{ $t('Lose') }}</th>
                  <th class="groupTabTitle groupTitle" :title="$t('Goal')">{{ $t('Goal') }}</th>
                  <th class="groupTabTitle groupTitle" :title="$t('Goal conceded')">{{ $t('Goal conceded') }}</th>
                  <th class="groupTabTitle groupTitle" style="width: 100px;">{{ $t('Distance') }}</th>
                  <th class="groupTabTitle groupTitle">{{ $t('Points') }}</th>
                  <th class="groupTabTitle groupTitle last-match">{{ $t('Recent 6') }}</th>
                </tr>
                <template
                v-for="(row, row_index) in item?.rows"
                :key="row_index"
                >
                  <tr align="center">
                    <td>{{ row?.total }}</td>
                    <td>{{ row?.won }}</td>
                    <td>{{ row?.draw }}</td>
                    <td>{{ row?.loss }}</td>
                    <td>{{ row?.points }}</td>
                    <td>{{ row?.goals_against }}</td>
                    <td>{{ row?.goal_diff }}</td>
                    <td class="bg-lgreen">{{ row?.points }}</td>
                    <td style="text-align: left" v-html="row?.lastest"></td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <p id="leaBtm" v-else>{{ $t('Empty Data') }}</p>
      <p class="text-center promotions" >
        <template
          v-for="(promotion, index) in promotions"
          :key="row_index"
          >
          <span style="text-wrap: nowrap"><span style="color:#FF9966; font-size: 20px" :style="`color:${promotion?.color}`" class="ms-3">■</span> {{ $t(promotion?.name) }}</span>
        </template>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { systemsStore } from '~/stores/systems'
const route = useRoute();
const { useLocale, $t } = useShareCommon()

const idSlug = route?.params?.league_id || ""
const compId = ref(route?.params?.league_id || "");
const competitionDetail = ref([])
const seasonTableStandingList = ref([])
const compSeason = ref([])
const curSeasonId = ref(route?.query?.curSeasonId || null)
const stageId = ref()
const OddsSeasonImain = ref()
const iCompanyId = ref(ISPORT_COMPANY_DEFAULT)
const roundCount = ref(0)
const curRound = ref()
const listMatchInSeason = ref([])
const curStageId = ref()
const stagesList = ref([])
const oddsList = ref([])
const promotions = ref([])

const props = defineProps<{
  compDetail: any | undefined
  title: string
}>()

const onChangeCurSeason = async () => {
  await fetchMatchesBySeason()
  await fetchSeasonsTable()
  // await fetchListSeasonByComp();
}

const fetchMatchesBySeason = async () => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.MATCHES_BY_SEASON, {season_id: curSeasonId.value }
  ).then(async (resData) => {
    listMatchInSeason.value = resData
    stageId.value = resData?.[0]?.stage?.id
  });
}

const fetchSeasonsTable = async () => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.SEASONS_TABLE + '/' + curSeasonId.value).then(async resData => {
    promotions.value = resData?.promotions || []
    seasonTableStandingList.value = resData?.tables || []
    seasonTableStandingList.value?.forEach(
      table => {
        return table?.rows?.map(item => {
          item.promotion_color = promotions.value?.find(promotion => promotion.id === item.promotion_id)?.color
          let lastest = listMatchInSeason.value?.filter(match => (match.home_team.id === item.team_info.team_id || match.away_team.id === item.team_info.team_id ) && match.status == 8)
          item.lastest =  getLastResult(lastest, item.team_info.team_id, false, $t)
          return item
        })
      }
    )
  });
};

watch(
  () => route,
  (newPath) => {
    const idSlug = route?.params?.league_id || "";
    compId.value = route?.params?.league_id || "";
  },
  { immediate: true }
);

watch(
  curRound,
  () => {
    seasonTableStandingList.value = listMatchInSeason.value?.filter(item => item?.stage?.id == curStageId.value) || []
    if (curRound.value > 0) {
      seasonTableStandingList.value = seasonTableStandingList.value?.filter(item => item?.round_num == curRound.value) || []
    }
  },
  { immediate: true }
);

watch(
  curStageId,
  () => {
    seasonTableStandingList.value = listMatchInSeason.value?.filter(item => item?.stage?.id == curStageId.value) || []
    if (curRound.value > 0) {
      seasonTableStandingList.value = seasonTableStandingList.value?.filter(item => item?.round_num == curRound.value) || []
    }
  },
  { immediate: true }
);

competitionDetail.value = props?.compDetail

if (!curSeasonId.value) {
  curSeasonId.value = competitionDetail.value?.cur_season_id
}
if (!competitionDetail.value?.seasons_stages?.find(item => item.season_id === curSeasonId.value)) {
  curSeasonId.value = competitionDetail.value?.seasons_stages?.[0]?.season_id
}

compSeason.value = competitionDetail.value || []
compId.value = competitionDetail.value?.id
roundCount.value = competitionDetail.value?.round_count
curRound.value = competitionDetail.value?.cur_round
curStageId.value = competitionDetail.value?.cur_stage_id
stagesList.value = competitionDetail.value?.seasons_stages?.find(item => item.season_id === curSeasonId.value)?.stages
if (curSeasonId.value != competitionDetail.value?.cur_season_id) {
  curStageId.value = stagesList.value?.[0]?.id
}

if (props?.compDetail?.id) {
  await fetchMatchesBySeason();
  await fetchSeasonsTable()
}

onMounted(async () => {});
</script>

<style lang="scss" scoped>
@media (max-width: 920px) {
  .rankbox {
    .eTable tr {
      th {
        height: 56px !important;
      }
    }
    .rankdata {
      .eTable tr {
        th {
          height: 56px !important;
        }
      } 
    }
  }
}

@media only screen and (max-width: 767px) {
  #leagues-screen {
    padding-right: 0;
  }
  #showRound {
    display: block;
  }
}

@media only screen and (max-width: 576px) {
  .league-name {
    max-width: 80px !important;
  }
}

.league-name {
  max-width: 130px;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.rankbox {
  .eTable tr {
    th {
      height: 57px;
      min-width: 35px;
      p {
        padding: 2 10px;
        margin-bottom: 0;
      }
    }

    td {
      height: 45px !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      text-wrap: nowrap;
    }
  } 

  .rankdata {
    .eTable tr {
      th {
        height: 20px;
        width: 70px;
        p {
          padding: 2 10px;
          margin-bottom: 0;
        }
        span {
          min-width: 90px;
        }
      }
      .last-match {
        width: 180px;
        white-space: nowrap;
      }
      td {
        height: 45px !important;
        min-width: 50px;

        .timeData {
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }
  }
}
.highlighted {
  color: #212529;
  &:hover {
    color: $primary;
    text-decoration-line: underline;
  }
}

#showRound {
  border: 1px solid #d2d2d2;
  display: flex;
  align-items: center;
  background-color: rgb(255, 51, 51);
  justify-content: space-between;

  .write {
    // width: 130px;
    color: #fff;
    display: flex;
    // min-height: 60px;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    border-left: 1px solid #d2d2d2;
    background-color: #fff;
    li {
      width: 40px;
      height: 30px;
      text-align: center;
      vertical-align: middle;
      line-height: 30px;

      &:hover {
        background-color: #fdfccc;
      }
    }
    .round_now {
      background: #f4731f !important;
      color: #fff !important;
    }
  }
  table td {
    border: 1px solid #d2d2d2;
  }
}

.nav_select {
  background-color: $menu;
  padding: 0px;

  ul {
    margin: 0;
  }
}
.nav_select .nav_selected {
    background-color: $menu;
}
.nav_select .nav_selected {
    background-color: $primary;
    border-radius: 3px;
    opacity: 1;
}
.nav_select li {
    color: #fff;
    line-height: 24px;
    display: inline-block;
    padding: 0 10px;
    float: left;
    margin: 5px 0 5px 8px;
    cursor: pointer;
}
.promotions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
