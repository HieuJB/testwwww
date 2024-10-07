<template>
    <div id="mobile-header">
    <div class="match innerPage" id="match">
        <div class="gameBox">
            <div class="header">
            <div class="gameName">
              <nuxt-link
                  :to="initDataMatch?.[0]?.season_id ? `${ROUTERS_OLD.LEAGUES}/${initDataMatch?.[0]?.competition?.id}`: ''">
                  <div class="bor">
                      <span id="wi">{{ competitionName }}</span>
                  </div>
                </nuxt-link>
                <span class="date" id="liveMt" v-html="formatDateMomentUTCTimeZone(matchTime, 'DD-MM-yyyy HH:mm - dddd', timeZone)"></span>
            </div>
            <div class="match-tools">
                <i class="icon iconfont icon-font-collect-off" id="btnOnTop"></i>
                <i class="shareTop icon iconfont icon-font-share"></i>
            </div>
            </div>
            <div class="gameInfo">
            <div class="home">
                <i
                class="icon iconfont icon-font-collect-off collect"
                id="btnHomeTeamTop"
                ></i>
                <div class="icon logo_match">
                  <div target="_self" class="img_logo_match">
                    <BaseImage :class="!!initDataMatch?.[0]?.home_team?.national ? 'p-14' : 'p-1'" v-if="homeTeamLogo" :src="getLiveScoreImage(homeTeamLogo, 'team') + '!h80'" :alt="homeTeamName"/>
                  </div>
                </div>
                <div class="name">
                <nuxt-link
                  :to="`/${ROUTER_TEAM_NAME.TEAM}/${initDataMatch?.[0]?.home_team?.id}`"
                  >{{ homeTeamName }}
                </nuxt-link>
              </div>
            </div>
            <div class="vs">
                <div id="liveHS" class="hs score" style="display: ">{{ homeAll }}</div>
                <div id="liveGS" class="as score" style="display: ">{{ awayAll }}</div>
                <span id="liveSt" class="status" v-html="getStatusDisplay(initDataMatch?.match, $t, timeZone)"></span>
                <div id="liveFt" class="FT" style="display: none">VS</div>
                <div id="liveVS" class="FT xsVS" style=""  v-html="getStatusDisplay(initDataMatch?.[0], $t, timeZone)"></div>
                <div id="liveHt" class="HT">({{ homeFirst }}-{{ awayFirst }})</div>
                <nuxt-link v-if="liveStream && availableStreamUrl" target="_blank"
                  :to="availableStreamUrl + '?ls-id=' + matchIdLive" class="video">
                  <span class="icon iconfont icon-font-live video"></span>
                </nuxt-link>
            </div>
            <div class="guest">
              <i
              class="icon iconfont icon-font-collect-off collect"
              id="btnGuestTeamTop"
              ></i>
              <div class="icon logo_match">
                <div target="_self" class="img_logo_match">
                  <BaseImage :class="!!initDataMatch?.[0]?.away_team?.national ? 'p-14' : 'p-1'" v-if="awayTeamLogo" name="" :src="getLiveScoreImage(awayTeamLogo, 'team') + '!h80'" :alt="awayTeamName"/>
                </div>
              </div>
              <span class="name">
                <nuxt-link
                  :to="`/${ROUTER_TEAM_NAME.TEAM}/${initDataMatch?.[0]?.away_team?.id}`"
                  >{{ awayTeamName }}
                </nuxt-link>
              </span>
            </div>
          </div>
          <div id="liveHt" class="HT">
            <template v-if="initDataMatch?.[0]?.home_scores[6] != 0 || initDataMatch?.[0]?.away_scores[6] != 0">
              <span class="explain" id="explain" data-explainlist="90,0-0;;1,0-0;3-0;1" >
                90 {{ $t('Minute')}} [{{initDataMatch?.[0]?.home_scores[0]}}-{{initDataMatch?.[0]?.away_scores[0]}}], 
                120 {{ $t('Minute')}}[{{initDataMatch?.[0]?.home_scores[5]}}-{{initDataMatch?.[0]?.away_scores[5]}}], 
                {{ $t('Penalty')}}[{{initDataMatch?.[0]?.home_scores[6]}}-{{initDataMatch?.[0]?.away_scores[6]}}]
                {{initDataMatch?.[0]?.home_scores[6] > initDataMatch?.[0]?.away_scores[6] ? homeTeamName + ' ' + $t('Win') : awayTeamName + ' ' + $t('Win')}}
              </span>
            </template>
            <template v-else-if="initDataMatch?.[0]?.home_scores[5] != 0 || initDataMatch?.[0]?.away_scores[5] != 0">
              <span class="explain" id="explain" data-explainlist="90,0-0;;1,0-0;3-0;1" >
                90 {{ $t('Minute')}}[{{initDataMatch?.[0]?.home_scores[0]}}-{{initDataMatch?.[0]?.away_scores[0]}}], 
                120 {{ $t('Minute')}}[{{initDataMatch?.[0]?.home_scores[5]}}-{{initDataMatch?.[0]?.away_scores[5]}}],
                {{initDataMatch?.[0]?.home_scores[5] > initDataMatch?.[0]?.away_scores[5] ? homeTeamName + ' ' + $t('Win') : awayTeamName + ' ' + $t('Win')}}
              </span>
            </template>
          </div>
        </div>
        <nav class="detailMenu peerBox">
          <nuxt-link class="item d-flex justify-content-center align-items-center" :class="(tab === MATCH_TAB.DETAIL || tab === '') ? 'on' : ''" :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: MATCH_TAB.DETAIL }}">{{ $t('Detail')}}</nuxt-link>
          <nuxt-link class="item d-flex justify-content-center align-items-center" :class="tab === MATCH_TAB.H2H  ? 'on' : ''" :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: MATCH_TAB.H2H }}" >{{ $t('Analysis')}}</nuxt-link>
          <nuxt-link class="item d-flex justify-content-center align-items-center" :class="tab === MATCH_TAB.ODDS ? 'on' : ''" :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: MATCH_TAB.ODDS, type: MATCH_TAB.ODDSCOMP}}">{{ $t('Odds')}}</nuxt-link>
          <nuxt-link class="item d-flex justify-content-center align-items-center" :class="tab === MATCH_TAB.STATISTICAL ? 'on' : ''" :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: MATCH_TAB.STATISTICAL}}">{{ width > 768 ? $t('Player statistics') : $t('Player statistic') }}</nuxt-link>
        </nav>
        <div class="tabs_box" id="subMenu" style="display: none">
            <ul class="tabs_group"></ul>
        </div>
        <div class="match-odds-menu" v-if="tab === MATCH_TAB.ODDS">
            <div class="d-flex">
                <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: MATCH_TAB.ODDS, type: MATCH_TAB.ODDSCOMP }}" :class="type === MATCH_TAB.ODDSCOMP ? 'on' : ''">{{ $t('3in1 Odd')}}</nuxt-link>
                <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: MATCH_TAB.ODDS, type: MATCH_TAB.ASIAN_HANDICAP_ODDS }}" :class="type === MATCH_TAB.ASIAN_HANDICAP_ODDS ? 'on' : ''">{{ $t('Hadicap Odd')}}</nuxt-link>
                <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: MATCH_TAB.ODDS, type: MATCH_TAB.OVER_UNDER_ODDS }}" :class="type === MATCH_TAB.OVER_UNDER_ODDS ? 'on' : ''">{{ $t('Over/Under Odd')}}</nuxt-link>
                <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: MATCH_TAB.ODDS, type: MATCH_TAB.ODDS_1X2 }}" :class="type === MATCH_TAB.ODDS_1X2 ? 'on' : ''">{{ $t('1x2 Odd')}}</nuxt-link>
                <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: MATCH_TAB.ODDS, type: MATCH_TAB.CORNER_OU_ODDS }}" :class="type === MATCH_TAB.CORNER_OU_ODDS ? 'on' : ''">{{ $t('Corner Odd T/X')}}</nuxt-link>
                <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: MATCH_TAB.ODDS, type: MATCH_TAB.CORRECT_SCORE_ODDS }}" :class="type === MATCH_TAB.CORRECT_SCORE_ODDS ? 'on' : ''">{{ $t('Correct Score')}}</nuxt-link>
                <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: MATCH_TAB.ODDS, type: MATCH_TAB.EURO_HANDICAP_ODDS }}" :class="type === MATCH_TAB.EURO_HANDICAP_ODDS ? 'on' : ''">{{ $t('Euro Handicap')}}</nuxt-link>
                <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: MATCH_TAB.ODDS, type: MATCH_TAB.DOUBLE_CHANCE_ODDS }}" :class="type === MATCH_TAB.DOUBLE_CHANCE_ODDS ? 'on' : ''">{{ $t('Double Chance')}}</nuxt-link>
            </div>
            <div class="tabsBox ms-3" v-show="type === MATCH_TAB.ODDSCOMP || type === MATCH_TAB.ASIAN_HANDICAP_ODDS 
                || type === MATCH_TAB.OVER_UNDER_ODDS || type === MATCH_TAB.CORNER_OU_ODDS">
                <div id="ftBtn" class="item" :class="!isHaft ? 'on' : ''">
                    <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: tab, type: type, haft: 0 }}">FT</nuxt-link>
                </div>
                <div id="htBtn" class="item" :class="isHaft ? 'on' : ''">
                    <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: tab, type: type, haft: 1 }}">HT</nuxt-link>
                </div>
            </div>
        </div>
        </div>
    </div>
  </template>
  
<script setup lang="ts">
import moment from 'moment-timezone';
  import { useWindowSize } from '@vueuse/core'
  const { width } = useWindowSize()
  import { ref, computed } from "vue";
  const router = useRouter();
  const route = useRoute();
  const routerUrl = ref("");
  const storeSystems = systemsStore()
  const availableStreamUrl = getConfig(storeSystems?.configurations, 'available_stream_url');
  const matchIdSlug = ref(route?.params?.id || "");
  const showMatchOddsMenu = ref(false);
  const isHaft = ref(false);
  const tab = ref(route?.query?.tab || MATCH_TAB.DETAIL)
  const type = ref(route?.query?.type || MATCH_TAB.ODDSCOMP)
  const initDataMatch = defineModel('initDataMatch')
  const { useLocale, $t } = useShareCommon()
  moment.locale(useLocale?.value.defaultLocale ?? 'en');
  const {initSchemaMatch} = useSchema()
  // Get data from cookie
  const settingsData = useCookie<any>('settingsData')
  const timeZone = ref(settingsData?.value?.timeZone || getConfig(storeSystems?.configurations, 'TIMEZONE'))
  if (![...MATCH_TAB.DETAIL, MATCH_TAB.H2H, MATCH_TAB.ODDS].includes(tab.value)) {
      tab.value = MATCH_TAB.DETAIL
  }

if (tab.value === MATCH_TAB.ODDS && !MATCH_ODD_TAB?.[type.value?.toUpperCase()]) {
    type.value = MATCH_TAB.ODDSCOMP
}
  
  watch(
    () => route.path,
    (newPath) => {
      const matches = newPath.match(/[^/-]+$/);
      matchIdSlug.value = matches ? matches[0] : "";
      showMatchOddsMenu.value =
        newPath.includes(ROUTERS_GROUP.ODDS) ||
        newPath.includes(ROUTERS_GROUP.ASIAN_HANDICAP_ODDS) ||
        newPath.includes(ROUTERS_GROUP.ODDS_1X2) ||
        newPath.includes(ROUTERS_GROUP.OVER_UNDER_ODDS) ||
        newPath.includes(ROUTERS_GROUP.CORNER_OU_ODDS) ||
        newPath.includes(ROUTERS_GROUP.EURO_HANDICAP_ODDS);
    },
    { immediate: true }
  );
  
  watch(
      () => route.params, 
      () => {
          matchIdSlug.value = route?.params?.id || "";
      },
      { immediate: true }
  );
  
  watch(
  () => route?.query, 
  () => {
    tab.value = route?.query?.tab || "";
    type.value = route?.query?.type || "";
    
    if (![...MATCH_TAB.DETAIL, MATCH_TAB.H2H, MATCH_TAB.ODDS, MATCH_TAB.STATISTICAL].includes(tab.value)) {
        tab.value = MATCH_TAB.DETAIL
    }
    if (tab.value === MATCH_TAB.ODDS && !MATCH_ODD_TAB?.[type.value?.toUpperCase()]) {
        type.value = MATCH_TAB.ODDSCOMP
    }
    showMatchOddsMenu.value =  route.path.includes(ROUTERS_GROUP.MATCH) && (MATCH_ODD_TAB?.[type.value?.toUpperCase()]);
  }, 
  { immediate: true }
);

  const matchRecentData = ref();
  
  const weatherMap = {
    1: "Có mây vài nơi",
    2: "Mây",
    3: "Có mây/mưa rải rác",
    4: "Tuyết",
    5: "Nắng",
    6: "Mưa u ám/Giông từng phần",
    7: "U ám",
    8: "Sương mù",
    9: "Có mây và mưa",
    10: "Mây có mưa",
    11: "Có mây kèm theo mưa/có giông bão từng phần",
    12: "Mây/mưa và giông cục bộ",
    13: "Sương mù",
  };
  const weatherDescription = computed(() => {
    const weatherId = Number(weather.value);
    return weatherMap[weatherId] || "";
  });
  const liveStream = ref("");
  const matchIdLive = ref("");
  const humidity = ref("");
  const pressure = ref("");
  const temperature = ref("");
  const weather = ref("");
  const wind = ref("");
  const venueCapacity = ref("");
  const venueCity = ref("");
  const venueName = ref("");
  const competitionName = ref("");
  const homeTeamName = ref("");
  const homeTeamLogo = ref("");
  const awayTeamName = ref("");
  const awayTeamLogo = ref("");
  const matchTime = ref("");
  const homeAll = ref("");
  const awayAll = ref("");
  const homeFirst = ref("");
  const awayFirst = ref("");
  const homePenaltyShootOut = ref("");
  const awayPenaltyShootOut = ref("");
  const homeTeamId = defineModel()
  const resultSecond = computed(() => {
    let homeSecond = homeAll.value - homeFirst.value;
    let awaySecond = awayAll.value - awayFirst.value;
    return `${homeSecond}-${awaySecond}`;
  });

  const props = defineProps<{
    socketData: any | undefined
  }>()
  
  const fetchMatchRecentDetail = async () => {
    if (!initDataMatch.value?.[0]) {
      return
    }
    matchIdLive.value = initDataMatch.value?.[0]?.id || "";
    liveStream.value = initDataMatch.value?.[0]?.match_info?.variable_stream || false;
    humidity.value = initDataMatch.value?.[0]?.match_info?.environment?.humidity || "";
    pressure.value = initDataMatch.value?.[0]?.match_info?.environment?.pressure || "";
    temperature.value = initDataMatch.value?.[0]?.match_info?.environment?.temperature || "";
    weather.value = initDataMatch.value?.[0]?.match_info?.environment?.weather || "";
    wind.value = initDataMatch.value?.[0]?.match_info?.environment?.wind || "";
    venueCapacity.value = initDataMatch.value?.[0]?.venue_info?.capacity || "";
    venueCity.value = initDataMatch.value?.[0]?.venue_info?.city || "";
    venueName.value = initDataMatch.value?.[0]?.venue_info?.name || "";
    competitionName.value = initDataMatch.value?.[0]?.competition?.name || "";
    homeTeamName.value = initDataMatch.value?.[0]?.home_team?.name || "";
    homeTeamLogo.value = !!initDataMatch.value?.[0]?.home_team?.national && initDataMatch.value?.[0]?.home_team?.country_logo_o ? initDataMatch.value?.[0]?.home_team?.country_logo_o : (initDataMatch.value?.[0]?.home_team?.logo_o || initDataMatch.value?.[0]?.home_team?.country_logo_o) ;
    awayTeamName.value = initDataMatch.value?.[0]?.away_team?.name || "";
    awayTeamLogo.value = !!initDataMatch.value?.[0]?.away_team?.national && initDataMatch.value?.[0]?.away_team?.country_logo_o ? initDataMatch.value?.[0]?.away_team?.country_logo_o : (initDataMatch.value?.[0]?.away_team?.logo_o ||  initDataMatch.value?.[0]?.away_team?.country_logo_o) ;
    
    matchTime.value = initDataMatch.value?.[0]?.match_time || "";
    homeAll.value = initDataMatch.value?.[0]?.home_scores[0] || 0;
    awayAll.value = initDataMatch.value?.[0]?.away_scores[0] || 0;
    homeFirst.value = initDataMatch.value?.[0]?.home_scores[1] || 0;
    awayFirst.value = initDataMatch.value?.[0]?.away_scores[1] || 0;
    homePenaltyShootOut.value = initDataMatch.value?.[0]?.home_scores[6] || "";
    awayPenaltyShootOut.value = initDataMatch.value?.[0]?.away_scores[6] || "";
    homeTeamId.value = initDataMatch.value?.[0].home_team?.name

    initSchemaMatch(initDataMatch.value?.[0]);

    /*
    await useApiLiveScore(
      API_ROUTERS.LIVESCORE.MATCHS_RECENT_DETAIL +
        "?match_id=" +
        matchIdSlug.value,
      null,
      true
    ).then((resData) => {
      matchRecentData.value = resData;
      matchIdLive.value = matchRecentData.value[0]?.id || "";
      liveStream.value = matchRecentData.value[0]?.match_info?.variable_stream || false;
      humidity.value = matchRecentData.value[0]?.match_info?.environment?.humidity || "";
      pressure.value = matchRecentData.value[0]?.match_info?.environment?.pressure || "";
      temperature.value = matchRecentData.value[0]?.match_info?.environment?.temperature || "";
      weather.value = matchRecentData.value[0]?.match_info?.environment?.weather || "";
      wind.value = matchRecentData.value[0]?.match_info?.environment?.wind || "";
      venueCapacity.value = matchRecentData.value[0]?.venue_info?.capacity || "";
      venueCity.value = matchRecentData.value[0]?.venue_info?.city || "";
      venueName.value = matchRecentData.value[0]?.venue_info?.name || "";
      competitionName.value = matchRecentData.value[0]?.competition?.name || "";
      homeTeamName.value = matchRecentData.value[0]?.home_team?.name || "";
      homeTeamLogo.value = matchRecentData.value[0]?.home_team?.logo_o || matchRecentData.value[0]?.home_team?.country_logo_o;
      awayTeamName.value = matchRecentData.value[0]?.away_team?.name || "";
      awayTeamLogo.value = matchRecentData.value[0]?.away_team?.logo_o || matchRecentData.value[0]?.away_team?.country_logo_o;
      matchTime.value = matchRecentData.value[0]?.match_time || "";
      homeAll.value = matchRecentData.value[0]?.home_scores[0] || 0;
      awayAll.value = matchRecentData.value[0]?.away_scores[0] || 0;
      homeFirst.value = matchRecentData.value[0]?.home_scores[1] || 0;
      awayFirst.value = matchRecentData.value[0]?.away_scores[1] || 0;
      homePenaltyShootOut.value = matchRecentData.value[0]?.home_scores[6] || "";
      awayPenaltyShootOut.value = matchRecentData.value[0]?.away_scores[6] || "";
      homeTeamId.value = resData[0].home_team.name
    });
    */
  };
  
  watch(
    () => router?.currentRoute?.value?.path,
    () => {
      routerUrl.value = router?.currentRoute?.value?.path;
    },
    { deep: true, immediate: true }
  );
  
  watch(
    () => route.query,
    (newQuery) => {
      isHaft.value = route.query?.haft == 1 ? true : false;
    },
    { immediate: true }
  );
  
  watch(
    props,
    () => {
      try {
        const wssItem = props?.socketData
        if (wssItem.payload.match_live) {
          // Thoi gian
          const matchLive = wssItem.payload.match_live;
  
          const matchStatusMapping = {
            3: 'HT',
            8: 'Fulltime',
            7: 'PS',
            5: 'OT',
            9: 'Delay',
          };
  
          for (const match of matchLive) {
            const matchId = match.matchId;
            const status = match.status;
            const timestampKickOff = match.timestamp_kick_off;
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (status !== 1 && timestampKickOff !== 0) {
              if (initDataMatch.value?.[0]?.id == matchId) {
                let statusText = null;
                if (status === 2) {
                  const matchMinutes = Math.floor((currentTimestamp - timestampKickOff) / 60 + 1);
                  statusText = `<i class="fas fa-circle blink-icon"></i><span class="countstatus">${matchMinutes}</span>`;
                  initDataMatch.value[0].matchMinutes = statusText;
                } else if (status === 4) {
                  const matchMinutes = Math.floor(((currentTimestamp - timestampKickOff) / 60) + 45 + 1);
                  statusText = `<i class="fas fa-circle blink-icon"></i><span class="countstatus">${matchMinutes}</span>`;
                  initDataMatch.value[0].matchMinutes = statusText;
                } else {
                    initDataMatch.value[0].matchMinutes = statusText;
                }
              }
            }
          }
        } else if (wssItem.payload) {
            // Tỷ số, thẻ, phạt góc,..
            const matchScores = wssItem.payload;
            for (const match of matchScores) {
                const matchId = match.id;
                if (initDataMatch.value?.[0].id == matchId && match?.score) {
                    homeAll.value = match?.score?.[2]?.[0]
                    awayAll.value = match?.score?.[3]?.[0]
  
                    homeFirst.value = match?.score?.[2]?.[1]
                    awayFirst.value = match?.score?.[3]?.[1]
                }
            }
        }
      }
      catch (e: any) {
        return false
      }
    }
  )
  
  fetchMatchRecentDetail();
  </script>
<style scoped lang="scss">
.p-14 {
  padding: 14px;
}

#mobile-header {
  background: #fff;
  color: #000;
  line-height: 20px;
  margin: 0 auto;
  position: relative;
  @media (max-width: 768px) {
    top: 0;
    z-index: 9;
    position: sticky;
  }
}
</style>