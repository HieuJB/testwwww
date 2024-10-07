<template>
   <div class="modal-content searchWin">
    <div class="modal-header">
      <div class="modal-title  d-none" id="modal_search_label">{{ $t('Search') }}</div>
      <div class="popupbox sch hot">
        <div class="popuptit">
          <span class="tit">{{ $t('Search') }}</span><span class="searchbox fl">
            <input v-model="quickSearch" ref="searchInput" type="text" @input="onChangeSearch" :autofocus="isautofocus" autocomplete="off" :placeholder="$t('League/Team')" :title="$t('Search')">
          </span>
          <ul class="typebtn sort">
            <li id="searchTab1" class="nav-link searchTab" :class="searchTab === 1 ? 'on' : ''" @click="switchSearchDiv(1)">{{ $t('Match') }}</li>
            <li id="searchTab2" class="nav-link searchTab" :class="searchTab === 2 ? 'on' : ''" @click="switchSearchDiv(2)">{{ $t('League') }}</li>
            <li id="searchTab3" class="nav-link searchTab" :class="searchTab === 3 ? 'on' : ''" @click="switchSearchDiv(3)">{{ $t('Team') }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="modal-body">
      <div class="layui-layer-content oddscomp-filterwin">
        <div id="" class="layui-layer-content">
          <div class="popupbox sch">
            <div id="searchDiv" class="popupinfo">
              <template v-if="quickSearch?.trim()?.length >= 3">
                <div v-if="searchTab === 1" id="searchMatchDiv" class="searchDiv searchDiv1" >
                  <template v-if="matchSearchLength > 0">
                    <template 
                    v-for="(item, index) in renderTopList"
                    :key="index"
                    >
                      <div class="leaguetit">
                        <i class="icon iconfont icon-font-collect-off add-info-l l0 favL favL_25" :title="$t('Follow the league')" v-show="!favouritesLeagues?.includes(item?.[1]?.[0].competition)"  @click="addFavouritesLeagues(item?.[1]?.[0].competition)"></i>
                        <i class="icon iconfont l0 favL favL_284 on icon-font-collect-on add-info-l2" v-show="favouritesLeagues?.includes(item?.[1]?.[0].competition)"  @click="removeFavouritesLeagues(item?.[1]?.[0].competition)"></i>
                        <div class="mh2">
                          <nuxt-link :to="ROUTERS_OLD.LEAGUES + '/' + item?.[1]?.[0].competition" target="_blank"  class="match">
                            {{ compsListByKey.get(item?.[1]?.[0].competition)?.[0]?.comp_name }}
                            {{ compsListByKey.get(item?.[1]?.[0].competition)?.[0]?.season_year ? ' - ' + compsListByKey.get(item?.[1]?.[0].competition)?.[0]?.season_year : ''}}
                          </nuxt-link>
                        </div>
                      </div>
                      <template v-for="match in item[1]" :key="match?.id">
                        <nuxt-link :to="ROUTERS_OLD.MATCH_DETAIL + match?.id" target="_blank"  class="match">
                          <div class="scorelists" data-mlid="2">
                            <i class="icon iconfont icon-font-collect-off add-info favM" :title="$t('Follow the match')" v-show="!favouritesList?.includes(match?.id)"  @click.prevent="addFavourites(match?.id)"></i>
                            <i class="icon iconfont favM on icon-font-collect-on add-info2" v-show="favouritesList?.includes(match?.id)"  @click.prevent="removeFavourites(match?.id)"></i>
                            <span class="time">{{formatDateMomentUTCTimeZone(match?.match_time, 'DD/MM HH:mm')}}</span>
                            <span class="state" v-html="getStatusDisplayMobile(match, $t)"></span>
                            <span class="htname">{{ match?.home_team?.name }}</span>
                            <span class="score ft">{{ [...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match.status) ? '' : (typeof match?.home_scores[0] !== 'undefined') ? match?.home_scores[0] : '' }} - {{
                               [...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match.status) ? '' : (typeof match?.away_scores[0] !== 'undefined') ? match?.away_scores[0] : '' }}</span>
                            <span class="gtname"> {{ match?.away_team?.name }}</span>
                          </div>
                        </nuxt-link>
                      </template>
                    </template>
                  </template>
                  <template v-else>
                    <div class="popupinfo searchwin_nodata nodata"><nuxt-img loading="lazy" class="nodata_pic" alt="nodata pic" width="200" height="200"  src="/icon/nodata.svg"/><div class="mh2">{{ $t('No results found') }}</div></div>
                  </template>
                </div>
                <div v-else-if="searchTab === 2" id="searchLeagueResultDiv" class="searchDiv searchDiv2 ">
                  <template v-if="compSearchLength > 0">
                    <ul>
                      <template
                      v-for="(item, index) in compsDataListSearch"
                      :key="index"
                      >
                        <li class="sch_list">
                          <nuxt-link :to="ROUTERS_OLD.LEAGUES + '/' + item?.id" target="_blank"  class="match">
                            <div class="sch_box fl"><b>{{ item?.comp_name}} {{ item?.season_year ? ' - ' + item?.season_year : ''}} </b><span class="remark">{{ contriesOriginKeyList?.[item?.country]?.name ?? $t('Other')  }}</span></div>
                            <i class="icon iconfont icon-font-collect-off add-info-l l0 favL favL_25" :title="$t('Follow the league')" v-show="!favouritesLeagues?.includes(item?.id)"  @click.prevent="addFavouritesLeagues(item?.id)"></i>
                            <i class="icon iconfont l0 favL favL_284 on icon-font-collect-on add-info-l2" v-show="favouritesLeagues?.includes(item?.id)"  @click.prevent="removeFavouritesLeagues(item?.id)"></i>
                          </nuxt-link>
                        </li>
                      </template>
                    </ul>
                  </template>
                  <template v-else>
                    <div class="popupinfo searchwin_nodata nodata"><nuxt-img loading="lazy" class="nodata_pic" alt="nodata pic"  width="200" height="200" src="/icon/nodata.svg"/><div class="mh2">{{ $t('No results found') }}</div></div>
                  </template>
                </div>
                <div v-else-if="searchTab === 3" id="searchTeamResultDiv" class="searchDiv searchDiv3 ">
                  <template v-if="!isLoadingSearch">
                    <template v-if="teamsSearch?.length > 0">
                      <ul>
                        <template
                        v-for="(item, index) in teamsSearch"
                        :key="index"
                        >
                          <li class="sch_list">
                            <nuxt-link :to="ROUTERS_OLD.TEAM + item?.id" target="_blank"  class="match">
                              <div class="sch_box fl"><b>{{ item?.name }}</b><span class="remark">{{ contriesOriginKeyList?.[item?.country]?.name ?? $t('Other')  }}</span></div>
                              <i class="icon iconfont icon-font-collect-off add-info-l l0 favL favL_25" :title="$t('Follow the team')" v-show="!favouritesTeams?.includes(item?.id)"  @click.prevent="addFavouritesTeam(item?.id)"></i>
                              <i class="icon iconfont l0 favL favL_284 on icon-font-collect-on add-info-l2" v-show="favouritesTeams?.includes(item?.id)"  @click.prevent="removeFavouritesTeam(item?.id)"></i>
                            </nuxt-link>
                          </li>
                        </template>
                      </ul>
                    </template>
                    <template v-else>
                      <div class="popupinfo searchwin_nodata nodata"><nuxt-img loading="lazy" class="nodata_pic" alt="nodata pic"  width="200" height="200" src="/icon/nodata.svg"/><div class="mh2">{{ $t('No results found') }}</div></div>
                    </template>
                  </template>
                  <template v-else>
                    <div class="popupinfo searchwin_nodata nodata"><div class="mh2">{{ $t('Loading...') }}</div></div>
                  </template>
                </div>
              </template>
              <template v-else>
                <div class="popupinfo searchwin_nodata" >
                  <nuxt-img loading="lazy" class="nodata_pic" alt="nodata pic"  width="200" height="200" src="/icon/nodata.svg"/>
                <div class="mh2">{{ $t('Please enter at least 3 characters. Search results will be displayed here immediately') }}</div>
                <div class="hotlist">
                  <div class="title">{{ $t('Hot leagues') }}</div>
                  <ul>
                    <template
                    v-for="(item, index) in compsHotList?.slice(0, 8)"
                    :key="index"
                    >
                      <li>
                        <nuxt-link :to="ROUTERS_OLD.LEAGUES + '/' + item?.id" class="match" target="_blank">
                          <img v-if="item?.comp_logo" :src="getLiveScoreImage(item?.comp_logo, 'competition') + '!h20'" :alt="item?.comp_name" /> {{ item?.comp_name }}
                        </nuxt-link>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer" style="display: none">
      <button type="button" class="btn btn-primary">{{ $t('Ok') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core'
import { actionsStore } from '~/stores/useActions'
import { systemsStore } from '~/stores/systems'
import { decodeDataAPI, groupBy } from '~/utils/livescore_helper';
import moment from 'moment-timezone';
import { formatDateMomentUTCTimeZone } from '@/utils/moment_helper'
import { socketStore } from '@/stores/wsocket'
import { useMatchStore } from '@/stores/useMatchStore'
import { useStorage, useDebounceFn } from '@vueuse/core'
import { getStatusDisplayMobile } from '/utils/livescore_helper.ts'
import '~/utils/moment.locale.vi.ts';
const { useLocale, $t } = useShareCommon()
moment.locale(useLocale?.value.defaultLocale ?? 'en');
const useAction = actionsStore()

const socket = socketStore()
const matchStore = useMatchStore()
const eventSocketData = ref()
const storeSystems = systemsStore()
//const localePath = useLocalePath()

const props = defineProps<{
  page: string | undefined,
  isLoading: boolean | false,
  content: string | undefined,
  favorites: string | undefined
}>()

const emit = defineEmits<{
}>()

const router = useRouter()
const route = useRouter()
const routerUrl = ref('')

//const $t = ref('')
const ITEM_PER_PAGE = 10
const compsList = ref()
const compsListByKey = ref([])
const renderTopList = ref([])
const renderTopFTList = ref([])
const compsDataList = ref([])
const compsDataFilterList = ref([])
const compsDataListByKey = ref()
const compOriginsList = ref([])
const compChooseLeagueList = ref([])
const matchOriginsList = ref()
const matchsList = ref([])
const matchLivesList = ref([])
const activeTab = ref(router?.currentRoute?.value?.hash === '#hot' ? LIVESCORE_ACTIVE_TAB.HOT : LIVESCORE_ACTIVE_TAB.ALL)
const isLoadingData = ref(false)
const isLoadingMore = ref(true)
const oddCompanySelected = ref(ODD_COMPANY_DEFAULT)
const oddsIMain = ref([])

const orderByTime = ref(true) // false -Theo giải đấu; true - theo thời gian
const matchActiveLiveFlash = ref()
const qSearch = ref()
const compsDataListSearch = ref([])
const contriesOriginKeyList = ref([])
const searchTab = ref(parseIntO(router?.currentRoute?.value?.params?.query) || 1)
const compsHotList = ref([])
const teamsSearch = ref([])
const isLoadingSearch = ref(false)
const quickSearch = ref()

const contriesList = ref([])
const contriesOriginList = ref([])

const matchesList = ref<HTMLElement | null>(null)
const matchesFTList = ref<HTMLElement | null>(null)
const loaderMatcher = ref(null)
const loaderMatcherFT = ref(null)
const limitData = ref(ITEM_PER_PAGE)
const limitDataFT = ref(ITEM_PER_PAGE)

// favourites
const favouritesList = ref([])
const favouritesLeagues = ref([])
const favouritesTeams = ref([])

const refSearchInputPage = ref(null)
// const searchInput = ref(storeSystems.keywordSearch ? storeSystems.keywordSearch : router.currentRoute.value.query?.q)
const searchInput = ref<HTMLElement | null>(null)
const matchSearchLength = ref(1)
const compSearchLength = ref(1)

const statePopup = reactive({
  modal_search: null,
});

const focusSearch = () => {
  nextTick(() => {
    isautofocus.value = true
    const refSearchInputValue = searchInput?.value?.$el || searchInput?.value
    refSearchInputValue.focus()
    // document.querySelector('#searchInput').focus()
  })
}

const openModalSearch = async(tab = 1) => {
  const { $loadScripts } = useNuxtApp()
  $loadScripts().then(async() => {
    await nextTick()

    statePopup.modal_search = new bootstrap.Modal(
      "#modal_search",
      {}
    );

    // Reset the search input value
    quickSearch.value = '';  // Clear the v-model bound variable
    searchInput.value = '';  // Clear the input field itself

    statePopup.modal_search.show();
    searchTab.value = tab
    
    await fetchMatchsRecent(dateChoose.value)
    await fetchCountries()
    await fetchCompHotList()

    setTimeout(() => {
      const refSearchInputValue = searchInput?.value?.$el || searchInput?.value
      if (refSearchInputValue) {
        refSearchInputValue.focus()
      }
    }, 500)
  })
}

const closeModalSearch = () => {
  statePopup.modal_search.hide();
  useAction.isOpenSearchForm = false;
  
  // Reset the search input value
  quickSearch.value = '';  // Clear the v-model bound variable
  searchInput.value = '';  // Clear the input field itself
}


const onChangeSearch = useDebounceFn(() => {
  if (quickSearch.value?.trim()?.length >= 3) {
    qSearch.value = quickSearch.value.trim()
  } else {
    qSearch.value = ''
  }
}, 300)


const clearSearch = () => {
  searchInput.value = ''
  qSearch.value = ''
}

const keyupEnter = (e) => {
  if (e.key === 'Enter') {
    storeSystems.keywordSearch = searchInput.value?.trim()
    return navigateTo(ROUTERS.SEARCH + '?q=' + searchInput.value?.trim())
  }
}

const searchSubmit = () => {
  if (searchInput.value?.trim()) {
    storeSystems.keywordSearch = searchInput.value?.trim()
    return navigateTo(ROUTERS.SEARCH + '?q=' + searchInput.value?.trim())
  }
}

const switchSearchDiv = async (val) => {
  searchTab.value = val
  if (searchTab.value === 2) {
    fetchCompHotList()
  } else  if (searchTab.value === 3) {
    if (qSearch.value !== '') {
      isLoadingSearch.value = true
      await useApiLiveScore(API_ROUTERS.LIVESCORE.TEAMS, {
        name: qSearch.value,
        lang: useLocale?.value.defaultLocale
      }).then(resData => {
        if (resData) {
          teamsSearch.value = resData?.results
        }
        isLoadingSearch.value = false
      })
      
    } else {
      teamsSearch.value = []
    }
  }
}

// Cookie
const cFavouritesData = useCookie('favouritesData', {
  maxAge: 60 * 60 * 24, // 30 days in seconds
});
const cFavouritesLeagues = useCookie('favouritesLeagues', {
  maxAge: 60 * 60 * 24, // 30 days in seconds
});
const cFavouritesTeams = useCookie('favouritesTeams', {
  maxAge: 60 * 60 * 24, // 30 days in seconds
});

const datePara = router?.currentRoute?.value?.query?.date
const dateChoose = ref(datePara ? datePara : moment().format("yyyy-MM-DD"))

const { isActive, pause, resume } = useIntersectionObserver(
  loaderMatcher,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      // isVisible.value = isIntersecting
      limitData.value += ITEM_PER_PAGE
    }
  },
  { matchesList },
)

const {} = useIntersectionObserver(
  loaderMatcherFT,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      // isVisible.value = isIntersecting
      limitDataFT.value += ITEM_PER_PAGE
    }
  },
  { matchesList },
)

const addFavourites = (matchId) =>{
  if (!favouritesList.value?.includes(matchId)) {
    favouritesList.value.push(matchId)
  }
  cFavouritesData.value = JSON.stringify(favouritesList.value)
}

const removeFavourites = (matchId) =>{
  const index =  favouritesList.value.indexOf(matchId, 0);
  if (index > -1) {
    favouritesList.value.splice(index, 1);
  }
  cFavouritesData.value = JSON.stringify(favouritesList.value)
}

const addFavouritesLeagues = (leagueId) =>{
  if (!favouritesLeagues.value?.includes(leagueId)) {
    favouritesLeagues.value.push(leagueId)
  }

  cFavouritesLeagues.value = JSON.stringify(favouritesLeagues.value)
}

const removeFavouritesLeagues = (leagueId) =>{
  const index =  favouritesLeagues.value.indexOf(leagueId, 0);
  if (index > -1) {
    favouritesLeagues.value.splice(index, 1);
  }
  cFavouritesLeagues.value = JSON.stringify(favouritesLeagues.value)
}

const addFavouritesTeam = (teamId) =>{
  if (!favouritesTeams.value?.includes(teamId)) {
    favouritesTeams.value.push(teamId)
  }

  cFavouritesTeams.value = JSON.stringify(favouritesTeams.value)
}

const removeFavouritesTeam = (teamId) =>{
  const index =  favouritesTeams.value.indexOf(teamId, 0);
  if (index > -1) {
    favouritesTeams.value.splice(index, 1);
  }
  cFavouritesTeams.value = JSON.stringify(favouritesTeams.value)
}

const fetchCountries = async () => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.COUNTRIES).then(resData => {
    
    contriesOriginList.value = resData?.results?.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    contriesList.value = contriesOriginList.value

    contriesOriginList.value?.forEach(item=> {
      contriesOriginKeyList.value[item?.id] = item
    })
  })
}

const renderDataList = () => {
  // For render list
  compsListByKey.value = groupBy(compsDataList.value, x => x.id)

  let compsKeyDataList = []
  let matchsListArray = []
  const search = qSearch.value?.toUpperCase()
  if (typeof qSearch.value !== 'undefined') {
    compsDataListSearch.value = compsDataList.value?.filter(item => (item?.comp_name_vi_overwrite?.toUpperCase()?.includes(search) || item?.comp_name_vi?.toUpperCase()?.includes(search) || item?.comp_name?.toUpperCase()?.includes(search)))
    compsKeyDataList = compsDataListSearch.value?.map(item => item.id)
    compSearchLength.value = compsDataListSearch.value?.length
  }

  Object.keys(matchOriginsList.value).map(index => {
    if (typeof qSearch.value !== 'undefined') {
      if (matchOriginsList.value[index]?.home_team?.name?.toUpperCase()?.includes(search) || matchOriginsList.value[index]?.away_team?.name?.toUpperCase()?.includes(search) 
      || compsKeyDataList.includes(matchOriginsList.value[index]?.competition)) {
        matchsListArray.push(matchOriginsList.value[index])
      }
    }
  })
  
  matchSearchLength.value = matchsListArray?.length
  let matchsGroup = sortByTime(matchsListArray, false)
  matchsGroup = groupByTimeAndComp(matchsGroup)
  // const matchsGroupIsLive = matchsGroup.filter((item: { status: string; }) => LIVESCORE_STATUS.IS_LIVE.includes(item.status))
  // const matchsGroupNotStarted = matchsGroup.filter((item: { status: string; }) => LIVESCORE_STATUS.NOT_START.includes(item.status))
  // const matchsGroupNotLive = matchsGroup.filter((item: { status: string; }) => LIVESCORE_STATUS.NOT_LIVE.includes(item.status))
  // const matchsGroupEnd = matchsGroup.filter((item: { status: string; }) => LIVESCORE_STATUS.IS_END.includes(item.status))
  
  renderTopList.value = matchsGroup
  //renderTopFTList.value = groupByTimeAndComp(matchsGroupEnd)

  isLoadingData.value = false
}

const fetchMatchsRecent = async (date = null) => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.COMP_LIST_ALL, {lang: useLocale?.value.defaultLocale}).then(decodedData => {
    compsDataList.value = decodedData
    compOriginsList.value = decodedData
    compChooseLeagueList.value  = decodedData

    const dataMcompsDataListByKey: never[] = []
    decodedData.forEach(item=> {
      // Init select leagues
      compsDataFilterList.value[item?.id] = true
      dataMcompsDataListByKey[item?.id] = item
    })
    compsDataListByKey.value = dataMcompsDataListByKey
  })

  const status = [...LIVESCORE_STATUS.IS_LIVE, ...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE, ...LIVESCORE_STATUS.IS_END].toString()
  const query = {
    date:  moment().format("yyyy-MM-DD"),
    tz: String((getConfig(storeSystems?.configurations, 'TIMEZONE') ?? 'GMT+07:00')).slice(3),
    lang: useLocale?.value.defaultLocale
  }
  
  if (status !== null) {
    query.status = status
  }
  const [data1, data2, data3] = await Promise.all([
    useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_RECENT, {
      ...query,
      date: moment().clone().subtract(1, 'days').format('yyyy-MM-DD')
    }),
    useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_RECENT, query),
    useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_RECENT,
      {
        ...query,
        date: moment().clone().add(1, 'days').format('yyyy-MM-DD')
      }
    ),
  ])
  
  const resData = [...data1, ...data2,...data3].reduce((acc, current) => {
    const x = acc.find(item => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

    const matchsDataList: never[] = []
    const matchData = resData ? [...matchLivesList.value, ...resData] : matchLivesList.value
    matchData.forEach(item => {
      item.odds = oddsIMain.value?.[item.i_match_id] || []
      matchsDataList[item?.id] = item
    })

    matchsList.value = matchsDataList
    matchOriginsList.value = Object.assign([], matchsDataList);

    // Lay danh sach giai dau co tran dau khi request
    const matchsGroup = groupBy(matchData, x => x.competition)
    const matchsGroupKey = [...matchsGroup.keys()]

    compOriginsList.value = compsDataList.value?.filter((item: { id: any; }) => {
      return matchsGroupKey?.includes(item?.id)
    }).map((item: { matchs: any; id: any; }) => {
      item.matchs = matchsGroup?.get(item?.id)
      return item
    })

    // renderDataList()
}

const fetchCompHotList = async () => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.COMP_LIST, {
      limit: 8,
      page: 1,
      hot: "5",
      lang: useLocale?.value.defaultLocale
    }
  ).then(async (resData) => {
    compsHotList.value = resData
  });
};

// Socket data
const wssMatch = (socketData: any) => {
  if (socketData) {
    try {
      const company = ODD_COMPANYS.find(({ id }) => id === oddCompanySelected.value)
      const wssItem = socketData
      if (wssItem?.payload?.match_live) {
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
            if (matchsList.value[matchId]) {
              let statusText = null;
              if (status === 2) {
                const matchMinutes = Math.floor((currentTimestamp - timestampKickOff) / 60 + 1);
                statusText = `<i class="fas fa-circle blink-icon"></i><span class="countstatus">${matchMinutes}</span>`;
                matchsList.value[matchId].matchMinutes = statusText;
              } else if (status === 4) {
                const matchMinutes = Math.floor(((currentTimestamp - timestampKickOff) / 60) + 45 + 1);
                statusText = `<i class="fas fa-circle blink-icon"></i><span class="countstatus">${matchMinutes}</span>`;
                matchsList.value[matchId].matchMinutes = statusText;
              } else {
                matchsList.value[matchId].matchMinutes = statusText;
              }
            }
          }
        }
      } else if (wssItem?.payload?.iodds) {
        const matchOdds = wssItem.payload.iodds;
        const oddsList = []
        // Handicap
        if (matchOdds?.handicap) {
          for (const matchOdd of matchOdds.handicap) {
            const matchId = parseIntO(getValueByPosition(matchOdd, 0));
            const companyId = getValueByPosition(matchOdd, 1);
            if (companyId == company?.isportsapi) {
              //matchsList.value[matchId].odds_older = JSON.parse(JSON.stringify(matchsList.value[matchId].odds))
              if (!oddsList[matchId]) {
                oddsList[matchId] = []
              }
              oddsList[matchId][0] = getValueByPosition(matchOdd, 2) + ',' + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4)

              // Detail match when hover
              if (showWinScoreOdds.value && matchHover.value?.i_match_id == matchId) {
                let odddetail = oddsDetail.value?.find(item => item.i_company_id == companyId && item.i_match_id == matchId && item.type == 'handicap')
                if (odddetail) {
                  odddetail.instant_older = JSON.parse(JSON.stringify(odddetail.instant))
                  odddetail.instant = '[' + getValueByPosition(matchOdd, 2) + ',' + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4) + ']'
                }
                // oddsDetail.value?.find(item => item.i_company_id === companyId && item.i_match_id === matchId && item.type === 'handicap').inplay = '[' + getValueByPosition(matchOdd, 2) + ',' + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4) + ']'
              }
            }
          }
        }
        // overUnder
        if (matchOdds?.overUnder) {
          for (const matchOdd of matchOdds.overUnder) {
            const matchId = parseIntO(getValueByPosition(matchOdd, 0));
            const companyId = getValueByPosition(matchOdd, 1);
            if (companyId == company?.isportsapi) {
              //matchsList.value[matchId].odds_older = JSON.parse(JSON.stringify(matchsList.value[matchId].odds))
              
              if (!oddsList[matchId]) {
                oddsList[matchId] = []
              }
              oddsList[matchId][1] = getValueByPosition(matchOdd, 2) + ',' + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4)
              // Detail match when hover
              let odddetail = oddsDetail.value?.find(item => item.i_company_id == companyId && item.i_match_id == matchId && item.type == 'overUnder')
              if (odddetail) {
                odddetail.instant_older = JSON.parse(JSON.stringify(odddetail.instant))
                odddetail.instant = '[' + getValueByPosition(matchOdd, 2) + ',' + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4) + ']'
              }
            }
          }
        }
        // europeOdds
        if (matchOdds?.europeOdds) {
          for (const matchOdd of matchOdds.europeOdds) {
            const matchId = parseIntO(getValueByPosition(matchOdd, 0));
            const companyId = getValueByPosition(matchOdd, 1);
            if (companyId == company?.isportsapi) {
              //matchsList.value[matchId].odds_older = JSON.parse(JSON.stringify(matchsList.value[matchId].odds))
              
              if (!oddsList[matchId]) {
                oddsList[matchId] = []
              }
              oddsList[matchId][2] = getValueByPosition(matchOdd, 2) + ',' + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4)
              
              // Detail match when hover
              let odddetail = oddsDetail.value?.find(item => item.i_company_id == companyId && item.i_match_id == matchId && item.type == 'europeOdds')
              if (odddetail) {
                odddetail.instant_older = JSON.parse(JSON.stringify(odddetail.instant))
                odddetail.instant = '[' + getValueByPosition(matchOdd, 2) + ',' + getValueByPosition(matchOdd, 3) + "," + getValueByPosition(matchOdd, 4) + ']'
              }
            }
          }
        }

        oddsIMainWS.value = oddsList
      } else if (wssItem?.topic && wssItem.topic == 'thesports/football/match/v1') {
        const payloads = wssItem.payload;
        for (const payload of payloads) {
          const matchId = payload.id;
          if (matchsList.value[matchId] && payload?.score) {
            matchsList.value[matchId].home_scores = payload?.score?.[2]
            matchsList.value[matchId].away_scores = payload?.score?.[3]
          }
        }
      }
    }
    catch (e: any) {
      return false
    }
  }
}

watch(activeTab,
  (activeTab) => {
    matchActiveLiveFlash.value = null

    if (activeTab === LIVESCORE_ACTIVE_TAB.HOT) {
      compsList.value = compOriginsList.value?.filter((item: { number_hot: number; }) => (item?.number_hot === 5 || item?.number_hot === 4 || item?.number_hot === 3))
      
      const matchsGroup = groupBy(compsList.value, x => x.id)
      const compKeysList = [...matchsGroup.keys()]
      matchsList.value = Object.values(matchOriginsList.value).filter((item) => compKeysList.includes(item?.competition))

    } else if (activeTab === LIVESCORE_ACTIVE_TAB.ALL) {
      compsList.value = compOriginsList.value
      matchsList.value = matchOriginsList.value

    } else if (activeTab === LIVESCORE_ACTIVE_TAB.LEAGUE) {
      // const matchsGroup = groupBy(matchsListArray, x => x.competition)
    }
  }
)

watch((qSearch),
  async(nSearch) => {
    let matchsListArray: any[] = []
    if (qSearch.value !== '') {

      renderDataList()

      // Search Team
      if (searchTab.value === 3) {
        isLoadingSearch.value = true
        await useApiLiveScore(API_ROUTERS.LIVESCORE.TEAMS + '?name=' + qSearch.value).then(resData => {
          if (resData) {
            teamsSearch.value = resData?.results
          }
          isLoadingSearch.value = false
        })
      }
    } else {
      matchsList.value = []
      matchSearchLength.value = 0
      compSearchLength.value = 0
    }
  },
  { deep: true }
)

watch(
  ([matchsList, orderByTime]),
  ([nMatchsList, nOrderByTime], [oMatchsList, oOrderByTime]) => {
    renderDataList()
  },
  { deep: true }
)

watch(
  () => router?.currentRoute?.value?.path,
  () => {
    routerUrl.value = router?.currentRoute?.value?.path
  },
  {deep: true, immediate: true}
)

watch(
  storeSystems,
  () => {
    searchInput.value = storeSystems?.keywordSearch
})

watch(
  useAction,
  () => {
    if (useAction?.isOpenSearchForm) {
      openModalSearch(useAction?.isOpenSearchForm)
    }
}, { deep: true, immediate: true })

watch(
  matchStore,
  () => {
    wssMatch(matchStore?.socketData)
}, { deep: true, immediate: true })
onMounted(async () => {})
</script>

<style scoped>
@import url("~/assets/css/searchwin.scss");
</style>