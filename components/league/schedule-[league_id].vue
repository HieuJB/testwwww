<template>
  <div class="info_title" id="InfoTitle">
    <div class="info_title_left" id="TitleLeft">
      <div class="img">
        <BaseImage :src="getLiveScoreImage(competitionDetail?.logo_o, 'competition') + '!h50'" loading="lazy" :alt="competitionDetail?.name" />
      </div>
      <h1>{{ props?.title }}</h1>
      <div class="selectbox" v-if="compSeason?.seasons_stages?.length > 0">
        <select name="seasonList" aria-label="Company season" id="seasonList" v-model="selectSeasonId" @change="onChangeCurSeason($event)">
          <option v-for="(item, index) in compSeason?.seasons_stages" :key="index"  :value="item?.season_id">{{ item?.season_years }}</option>
        </select>
      </div>
    </div>
    <!-- <div class="info_title_right" id="TitleRight">
      <div id="favLeagueIcon" class="follow_btn on" onclick="favLeague('113')">Đã theo dõi<i class="icon iconfont icon-font-collect-on"></i></div>
    </div> -->
  </div>
  <HeaderLeagueComponent :comp-detail="competitionDetail" :cur-season-id="selectSeasonId"/>
  <div class="data mb-3">
    <div class="nav_select" id="SubSelectDiv" v-if="stagesList?.length > 1">
      <ul>
        <template v-for="(item, index) in stagesList" :key="index">
          <li :class="item.id === selectStageId ? 'nav_selected' : ''" @click="onClickStage(item.id)">{{ $t(item?.name) }}</li>
        </template>
      </ul>
    </div>
    <div id="showRound" v-if="groupsList?.length > 0 || roundsList?.length > 0">
      <!-- <div class="write"><strong>{{ stageName }}</strong></div> -->
      <ul v-if="groupsList?.length > 0">
        <template v-for="index in groupsList?.sort((a,b) => a - b)" :key="index">
          <li class="lsm2 table-bd-b table-bd-r" :class="curGroupNum === index ? 'round_now' : ''" :style="`width: calc(100% / ${calcGroupDiv})`"
          @click="onClickGroup(index)">{{ TABLE_STANDING_LIST?.[index] }} </li>
        </template>
      </ul>
      <ul v-if="groupsList?.length == 0 && roundsList?.length > 0">
        <template v-for="index in roundsList?.sort((a,b) => a - b)" :key="index">
          <li class="lsm2 table-bd-b table-bd-r" :class="curRound === index ? 'round_now' : ''" :style="`width: calc(100% / ${calcDiv})`"
          @click="onClickRound(index)">{{index }} </li>
        </template>
      </ul>
    </div>
    <div style="clear:both;"></div>
    <div class="tdsolid" id="ScoreGroupDiv">
      <div class="rankbox">
        <table class="eTable adaptMt team-table-home table-no-db-lr " id="etable-header" width="30%" cellspacing="0" cellpadding="0" style="float: left; min-width: 135px">
          <tbody>
            <tr class="bd-l">
              <!-- <th width="" rowspan="2" title="Vòng / Bảng">{{ $t('No.') }}</th> -->
              <th width="bd-l" rowspan="2" class="bd-l">{{ $t('Home - Away') }}</th>
            </tr>
            <tr class="bd-l">
            </tr>
            <template
              v-for="(item, index) in matchsBySeason"
              :key="index">
              <tr vs="0" class="bd-l bd-b"
              >
                <!-- <td>{{ groupsList?.length > 0 ? TABLE_STANDING_LIST?.[item?.group_num]  : item?.round_num }}</td> -->
                <td class="league-name" >
                  <span class="d-flex align-items-center justify-content-space-between pe-1">
                    <span class="home lRow draw" :title="item?.home_team?.name">
                      <nuxt-link :to="`/${ROUTER_TEAM_NAME.TEAM}/${item?.home_team?.id}`">
                        <span class="team-home-f">{{ item?.home_team?.name }}</span>
                      </nuxt-link>
                    </span>
                    <span id="horder" class="team-hg me-1" v-if="item?.home_position">[{{ item?.home_position }}]</span>
                    <span class="redcard2 me-1" v-if="item?.home_scores[2]">{{ item?.home_scores[2] }}</span>
                    <span class="yellow1 me-1" v-if="item?.home_scores[3]">{{ item?.home_scores[3] }}</span>
                  </span>
                  <span class="d-flex align-items-center justify-content-space-between pe-1">
                    <span class="guest lRow" :title="item?.away_team?.name">
                      <nuxt-link :to="`/${ROUTER_TEAM_NAME.TEAM}/${item?.away_team?.id}`">
                        <span class="team-away-f">{{ item?.away_team?.name }}</span>
                      </nuxt-link>
                    </span>
                    <span id="horder" class="team-hg me-1" v-if="item?.away_position">[{{ item?.away_position }}]</span>
                    <span class="redcard2 me-1" v-if="item?.away_scores[2]">{{ item?.away_scores[2] }}</span>
                    <span class="yellow1 me-1" v-if="item?.away_scores[3]">{{ item?.away_scores[3]  }}</span>
                  </span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="rankdata" width="75%">
          <table class="eTable adaptMt team-table-home table-no-db-lr " cellspacing="0" cellpadding="0" width="100%">
            <tbody>
              <tr>
                <th width="" rowspan="2"  class="bd-r">{{ $t('Day') }} </th>
                <th width="" rowspan="2" id="FScore_1">{{ $t('Score') }} </th>
                <th width="" colspan="3" class="table-bd-lr">
                  <p class="d-flex justify-content-center">
                      <span class="me-2 d-flex justify-content-center"><input type="radio" v-model="oddType" value="europeOdds" :title="$t('Odd 1X2')" class="me-1"> 1X2</span>
                      <span class="me-2 d-flex justify-content-center"><input type="radio" v-model="oddType" value="overUnder" :title="$t('Odd Over/Under')"  class="me-1"> TX</span>
                      <span class="d-flex justify-content-center"><input type="radio" v-model="oddType" value="handicap" :title="$t('Odd Hadicap')"  class="me-1"> HDP</span>
                  </p>
                </th>
                <th width="" class="rl ll bd-r" rowspan="2" :title="$t('Data')">{{ $t('Data') }}</th>
                <th width="" class="rl ll" rowspan="2" :title="$t('HT')">{{ $t('HT') }}</th>
              </tr>
              <tr>
                <th class="table-bd-lr" colspan="3"  title="">
                  <p class="d-flex justify-content-center align-items-center">
                    {{ $t('First Odds') }}:
                    <select id="CompanySel" aria-label="Company Select" @change="onChangeCompany($event)">
                      <option v-for="(odd_company, index) in ODD_COMPANYS" :key="index" :value="odd_company?.isportsapi">{{
                        odd_company?.name }}</option>
                    </select>
                  </p>
                </th>
              </tr>
              <template
                v-for="(item, index) in matchsBySeason"
                :key="index">
                <tr vs="0" name="2"
                >
                  <td class="match-date">
                    <span
                      class="timeData "
                      name="timeData"
                      data-tf="3"
                    >
                      {{ formatDateMomentUTCTimeZone(item?.match_time, 'DD-MM HH:mm') }}
                    </span>
                  </td>
                  <td>
                    <span class="fscore_3 red2">
                      <b>
                        <template v-if="[...LIVESCORE_STATUS.IS_LIVE, ...LIVESCORE_STATUS.IS_END].includes(item?.status?.toString())">
                          <span class="team-home-f">{{ item?.home_scores?.[0] }}</span> - <span class="team-away-f">{{ item?.away_scores?.[0] }}</span>
                        </template>
                        <template v-else> - </template>
                      </b>
                    </span><br>
                  </td>
                  <td><span class="">{{ getValueByPositionWarehourse(OddsSeasonImain?.['i_match_id_' + item?.i_match_id]?.initial, 0) }} </span></td>
                  <td class="">{{ getValueByPositionWarehourse(OddsSeasonImain?.['i_match_id_'  + item?.i_match_id]?.initial, 1) }}</td>
                  <td class="">{{ getValueByPositionWarehourse(OddsSeasonImain?.['i_match_id_'  + item?.i_match_id]?.initial, 2) }}</td>
                  <td>
                    <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL + item?.id, query: { tab: MATCH_TAB.H2H }}" :title="$t('Analysis')" class="analyze-icon me-2">
                      <span class="analyze-icon l0"><i class="icon iconfont icon-analysis" :title="$t('Analysis')"></i></span>
                    </nuxt-link>
                    <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL + item?.id, query: { tab: MATCH_TAB.ODDS, type: MATCH_TAB.ODDSCOMP }}" >
                      <span class="odds-icon" :title="$t('Odd detail')">
                        <i class="icon iconfont icon-odds"></i>
                      </span>
                    </nuxt-link>
                  </td>
                  <td>
                    <b>
                      <template v-if="[...LIVESCORE_STATUS.IS_LIVE, ...LIVESCORE_STATUS.IS_END].includes(item?.status?.toString())">
                        <span class="team-home-f">{{ item?.home_scores?.[1] }}</span> - <span class="team-away-f">{{ item?.away_scores?.[1] }}</span>
                      </template>
                      <template v-else> - </template>
                    </b>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="rankbox" v-if="matchsBySeason?.length > 0">
      </div>
      <p id="leaBtm" v-else>{{ $t('Empty Data') }}</p>
    </div>

    <div id="matchBox" class="mt-3 overflow-hidden" v-if="playerBestLinup?.length > 0">
      <div class="playsTitle">{{ $t('Best lineup') }}</div>
      <div class="plays">
        <div class="home five">
          <PlayBoxBestLineupComponent v-for="player in playerBestLinup" :key="player.id" :player="player" :style="getPlayerStyle(player, 'home')"/>
        </div>
      </div>
    </div>

    <!-- <div class="modal fade show" tabindex="-1" aria-labelledby="modal_login_label" aria-modal="true" role="dialog" v-show="loading">
      <div class="modal-dialog modal-dialog-centered">
        <div class="loading-content">
          <Loading/>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
const route = useRoute();
const router = useRoute();
const { useLocale, $t } = useShareCommon()

const compId = ref(route?.params?.league_id || "");
const competitionDetail = ref([])
const matchsBySeason = ref([])
const compSeason = ref([])
const selectSeasonId = ref(route?.query?.curSeasonId || null)
const stageId = ref()
const OddsSeasonImain = ref()
const iCompanyId = ref(ISPORT_COMPANY_DEFAULT)
const oddType = ref("handicap")
const groupCount = ref(0)
const roundCount = ref(0)
const curRound = ref()
const curGroupNum = ref()
const listMatchInSeason = ref([])
const curStageId = ref()
const selectStageId = ref()
const stagesList = ref([])
const oddsList = ref([])
const playerBestLinup = ref([])
const selectStage = ref()
const roundsList = ref([])
const groupsList = ref([])
const stageName = ref()

const calcGroupDiv = computed(() => groupCount.value < 10 ? groupCount.value : (groupCount.value / 2).toFixed());
const calcDiv = computed(() => roundCount.value < 10 ? roundCount.value : (roundCount.value / 2).toFixed());
const { width } = useWindowSize()
const isMobile = computed(()=> {
  return width.value <= 768
})

const props = defineProps<{
  compDetail: any | undefined
  title: string
}>()

const getPlayerStyle = (player, teamType) => {
  if (teamType === "home") {
    return { bottom: player.location_x - 10 + "%", left: player.location_y - 10 + "%" };
  } else if (teamType === "away") {
    return { top: player.location_x - 10 + "%", right: player.location_y - 10 + "%" };
  }
  return {};
};

const fetchMatchesBySeason = async () => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.MATCHES_BY_SEASON, {season_id: selectSeasonId.value }
  ).then(async (resData) => {
    listMatchInSeason.value = resData

    matchsBySeason.value = resData?.filter(item => item?.stage?.id == selectStageId.value) || []
    matchsBySeason.value?.forEach(match  => {
      if (match?.round_num && !roundsList.value.includes(match?.round_num)) {
        roundsList.value.push(match?.round_num)
      }
    })
    matchsBySeason.value?.forEach(match  => {
      if (match?.group_num && !groupsList.value.includes(match?.group_num)) {
        groupsList.value.push(match?.group_num)
      }
    })

    groupCount.value = groupsList.value?.length
    roundCount.value = roundsList.value?.length

    if (groupCount.value == 0 && roundCount.value > 0) {
      if (selectSeasonId.value === competitionDetail.value?.cur_season_id) {
        curRound.value = competitionDetail.value?.cur_round
      } else {
        curRound.value = 1
      }
    }

    if (curRound.value > 0 && matchsBySeason.value?.[0]?.round_num) {
      matchsBySeason.value = matchsBySeason.value?.filter(item => item?.round_num == curRound.value ) || []
    }
  });
}

const fetchListSeasonByComp = async () => {
  if (compId.value) {
    await fetchMatchesBySeason();
    fetchOddsSeasonImain();
  }
};

const fetchOddsSeasonImain = async () => {
  if (!selectSeasonId.value || !iCompanyId.value)
    return

  const query = {
    'i-company-id': iCompanyId.value,
    'season-id': selectSeasonId.value,
    // 'stage-id': curStageId.value
  }
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.ODDS_SEASON_IMAIN, query
  ).then(async (resData) => {
    oddsList.value = resData

    let oddsListData = []
    resData?.filter(item => item?.type === oddType.value)?.map(item => {
      oddsListData['i_match_id_' + item?.i_match_id] = item
    })
    OddsSeasonImain.value = oddsListData
  });
}

const fetchBestLineup = async () => {
  if (!selectSeasonId.value)
    return

    // Vòng bảng truyền lên
  let query = []
  if (groupCount.value == 0 && curRound.value > 0) {
    query = {
      'season-id': selectSeasonId.value,
      'name': curRound.value,
    }
  } else {
    query = {
      'season-id': selectSeasonId.value,
      'stage-id': selectStageId.value,
    }
  }

  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.SEASONS_BEST_LINEUP, query
  ).then(async (resData) => {
    playerBestLinup.value = resData?.[0]?.lineup_details
  });
}

const onChangeCompany = async (event) => {
  iCompanyId.value = event.target.value
  await fetchOddsSeasonImain();
}

const onChangeCurSeason = async (event) => {
  //roundsList.value = []
  curRound.value = 0
  //stageId.value = null
  roundsList.value = []
  groupsList.value = []
  selectSeasonId.value = event.target.value;
  //const router = useRouter()
  //router.push({path: ROUTERS_OLD.LEAGUES + '/' + compId.value, query: { tab: WAREHOUSE_LEAGUE_TAB.SCHEDULE, curSeasonId: selectSeasonId.value}})

  stagesList.value = competitionDetail.value?.seasons_stages?.find(item => item.season_id === selectSeasonId.value)?.stages?.sort((a, b) => {return a?.order - b?.order})
  if (selectSeasonId.value === competitionDetail.value?.cur_season_id) {
    selectStageId.value = competitionDetail.value?.cur_stage_id
  } else {
    selectStageId.value = stagesList.value?.[0]?.id
  }

  await fetchListSeasonByComp();

  if (groupCount.value == 0 && roundCount.value > 0) {
    if (selectSeasonId.value === competitionDetail.value?.cur_season_id) {
      curRound.value = competitionDetail.value?.cur_round
    } else {
      curRound.value = 1
    }
  }
  if (curRound.value > 0) {
    matchsBySeason.value = matchsBySeason.value?.filter(item => item?.round_num == curRound.value ) || []
  }

  fetchBestLineup()
}


const onClickStage = (val) => {
  selectStageId.value = val
  roundsList.value = []
  groupsList.value = []
  curRound.value = 0
  matchsBySeason.value = listMatchInSeason.value?.filter(item => item?.stage?.id == selectStageId.value) || []
  selectStage.value = stagesList.value?.find(item => item.id === selectStageId.value)
  matchsBySeason.value?.forEach(match  => {
    if (match?.round_num && !roundsList.value.includes(match?.round_num)) {
      roundsList.value.push(match?.round_num)
    }
  })
  matchsBySeason.value?.forEach(match  => {
    if (match?.group_num && !groupsList.value.includes(match?.group_num)) {
      groupsList.value.push(match?.group_num)
    }
  })
  groupCount.value = groupsList.value?.length

  if (roundsList.value?.length > 0) {
    curRound.value = 1
  }
  if (curRound.value > 0 && groupCount.value == 0) {
    matchsBySeason.value = matchsBySeason.value?.filter(item => item?.round_num == curRound.value) || []
  }

  stageName.value = selectStage.value?.name
  roundCount.value = roundsList.value?.length
  fetchBestLineup()
}

const onClickGroup = (val) => {
  curGroupNum.value = val
  if (curGroupNum.value > 0) {
    matchsBySeason.value = listMatchInSeason.value?.filter(item => (item?.stage?.id == selectStageId.value) && (item?.group_num == curGroupNum.value)) || []
    fetchBestLineup()
  }
}

const onClickRound = (val) => {
  curRound.value = val
  if (curRound.value > 0) {
    matchsBySeason.value = listMatchInSeason.value?.filter(item => (item?.stage?.id == selectStageId.value) && (item?.round_num == curRound.value)) || []
    fetchBestLineup()
  }
}

watch(
  () => route,
  (newPath) => {
    const idSlug = route?.params?.league_id || "";
    compId.value = route?.params?.league_id || "";
  },
  { immediate: true }
);

watch(
  oddType,
  () => {
    let oddsListData = []
    oddsList.value?.filter(item => item?.type === oddType.value)?.map(item => {
      oddsListData['i_match_id_' + item?.i_match_id] = item
    })
    OddsSeasonImain.value = oddsListData
  },
);

watch(
  () => props?.compDetail,
  async () => {
    competitionDetail.value = props?.compDetail

    if (!selectSeasonId.value) {
      selectSeasonId.value = competitionDetail.value?.cur_season_id
    }

    if (!competitionDetail.value?.seasons_stages?.find(item => item.season_id === selectSeasonId.value)) {
      selectSeasonId.value = competitionDetail.value?.seasons_stages?.[0]?.season_id
    }

    compSeason.value = competitionDetail.value || []
    compId.value =competitionDetail.value?.id

    selectStageId.value = competitionDetail.value?.cur_stage_id
    stagesList.value = competitionDetail.value?.seasons_stages?.find(item => item.season_id === selectSeasonId.value)?.stages?.sort((a, b) => {return a?.order - b?.order})
    selectStage.value = stagesList.value?.find(item => item.id === selectStageId.value)

    if (selectSeasonId.value != competitionDetail.value?.cur_season_id) {
      selectStageId.value = stagesList.value?.[0]?.id
      selectStage.value = stagesList.value?.find(item => item.id === selectStageId.value)
      //curRound.value = 1
    } else {
      roundCount.value = competitionDetail.value?.round_count
      curStageId.value = competitionDetail.value?.cur_stage_id
      curRound.value = competitionDetail.value?.cur_round
    }
    if (selectStage.value && stagesList.value?.length > 1) {
      stageName.value = selectStage.value?.name
    } else {
      stageName.value = competitionDetail.value?.name
    }
    if (compId.value) {
      await fetchMatchesBySeason();
      fetchOddsSeasonImain();
      fetchBestLineup()
    }

  },
  { immediate: true }
);

</script>
<style lang="scss" scoped>
.justify-content-space-between {
  justify-content: space-between;
}
@media (max-width: 920px) {
  table#etable-header {
    border-bottom: none;
  }
  .rankbox {
    .eTable tr {
      th {
        height: 55px !important;
      }
    }
    .rankdata {
      .eTable tr {
        th {
          height: 55px !important;
        }
      }
    }
  }
}
@media (max-width: 860px) {
  table#etable-header {
    border-bottom: 5px solid #f5f5f5;
  }
}
@media only screen and (max-width: 767px) {
  #leagues-screen {
    padding-right: 0;
  }
  .match-date {
    max-width: 100px;
  }
  #showRound {
    display: block !important;

    .write {
      padding: 8px 2px !important;
      width: 100% !important;
      justify-content: start !important;
    }

    ul {
      width: 100% !important;
      li {
        width: calc(100% / 9) !important;
      }
    }
  }
}
@media (max-width: 727px) {
  .eTable {
    min-width: 135px !important;
  }
  table#etable-header {
    border-bottom: 5px solid #f5f5f5;

  }
}
@media only screen and (max-width: 576px) {
  .league-name {
    max-width: 130px;
  }
}
.league-name {
  .home, .guest {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
}

.timeData {
  max-width: 100px;
}

.rankbox {
  .eTable tr {
    th {
      height: 66px;
      min-width: 35px;
      p {
        margin-bottom: 0;
      }
    }
    td {
      height: 50px !important;

      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      text-wrap: nowrap;
      line-height: normal !important;
    }
  }

  .rankdata {
    .eTable tr {
      th {
        height: 20px;
        width: 90px;
        p {
          padding: 2 10px;
          margin-bottom: 0;
        }
        span {
          min-width: 60px;
        }
      }
      td {
        height: 50px !important;
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
    // justify-content: center;
    align-items: center;
    padding-left: 5px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    border-left: 1px solid #d2d2d2;
    background-color: #fff;
    justify-content: flex-start;
    width: 100%;
    li {
      color:#003366;
      cursor:pointer;
      // width: calc(100% / 10);
      height: 30px;
      text-align: center;
      vertical-align: middle;
      line-height: 30px;
      // min-width: 40px;
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
    padding-left: 10px;
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
.team-hg {
  font-size: 11px;
}
</style>
