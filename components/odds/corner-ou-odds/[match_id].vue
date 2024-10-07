<template>
  <div id="" class="match-odds">
    <div id="">
      <!-- <HeaderComponent :socket-data="eventSocketData"/> -->

      <div id="CompanyOddsDiv" class="company-comp">
        <TabTableMobile v-show="isMobile" :titleList="titleList" v-model="tabActive"/>
        <div class="rankbox">
            <table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="float: left; min-width: 135px">
              <tbody>
                <tr class="tr-title">
                  <th colspan="2" rowspan="2">
                    <b>{{ $t('Company') }}</b>
                  </th>
                  <th ></th>
                </tr>
                <tr class="tr-title">
                  <th></th>
                </tr>
                <template 
                v-for="(item, index) in oddsCorner?.filter(item => item !== null && !item?.isEmpty)"
                :index="index"
                >
                  <tr :class="index % 2 !== 0 ? 'tb-bgcolor1' : 'tb-bgcolor1'">
                    <td rowspan="1">
                        <span>{{ item?.name }}</span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div class="rankdata w-100">
              <table class="eTable adaptMt w-100" cellspacing="0" cellpadding="0" width="100%">
                <tbody>
                  <tr class="tr-title" >
                      <th  colspan="3" v-show="!isMobile"><b>{{ $t('Init') }}</b></th>
                      <th colspan="3" v-show="!isMobile"><b>{{ $t('Live') }}</b></th>
                      <th colspan="3" v-show="!isMobile"><b>{{ $t('Run Odds') }}</b></th>
                      <th rowspan="2" v-show="!isMobile"><b>{{ $t('Detail') }}</b></th>
                  </tr>
                  <tr class="tr-title" >
                      <th>{{ $t('Over') }}</th>
                      <th>{{ $t('Corner') }}</th>
                      <th>{{ $t('Under') }}</th>
                      <th v-show="!isMobile">{{ $t('Over') }}</th>
                      <th v-show="!isMobile">{{ $t('Corner') }}</th>
                      <th v-show="!isMobile">{{ $t('Under') }}</th>
                      <th v-show="!isMobile">{{ $t('Over') }}</th>
                      <th v-show="!isMobile">{{ $t('Corner') }}</th>
                      <th v-show="!isMobile">{{ $t('Under') }}</th>
                      <th v-show="isMobile">{{ $t('Detail') }}</th>
                  </tr>
                  <template 
                    v-for="(item, index) in oddsCorner?.filter(item => item !== null && !item?.isEmpty)"
                    :index="index"
                    >
                      <tr name="oddsTr" style="text-align:center" cid="3" :class="index % 2 !== 0 ? 'tb-bgcolor1' : 'tb-bgcolor1'">
                        <td v-show="showColumn.first" width="6%"><span class="span2">{{ getOddNumberToNegativeTX(item?.first?.['over']) }}</span></td>
                        <td v-show="showColumn.first" width="6%"><span class="span2">{{ getOddNumber(item?.first?.['total_corners']) }}</span></td>
                        <td v-show="showColumn.first" width="6%" ><span  class="span2">{{ getOddNumberToNegativeTX(item?.first?.['under']) }}</span></td>
                        <td v-show="showColumn.second" width="6%"  class="bd-l"><span class="span2" :class="getOddChange(item?.live?.['over'], item?.first?.[1])">{{ getOddNumberToNegativeTX(item?.live?.['over']) }}</span></td>
                        <td v-show="showColumn.second" width="6%"><span class="span2" :class="getOddChange(item?.live?.['total_corners'], item?.first?.['total_corners'])">{{ getOddNumber(item?.live?.['total_corners']) }}</span></td>
                        <td v-show="showColumn.second" width="6%" ><span class="span2" :class="getOddChange(item?.live?.['under'], item?.first?.['under'])">{{ getOddNumberToNegativeTX(item?.live?.['under']) }}</span></td>
                        <td v-show="showColumn.third" width="6%"  class="bd-l"><span class="span2" :class="getClassOddCornerChange(item, 'over')">{{ getOddNumberToNegativeTX(item?.run?.['over']) }}</span></td>
                        <td v-show="showColumn.third" width="6%" ><span class="span2" :class="getClassOddCornerChange(item, 'total_corners')">{{ getOddNumber(item?.run?.['total_corners']) }}</span></td>
                        <td v-show="showColumn.third" width="6%"><span class="span2" :class="getClassOddCornerChange(item, 'under')">{{ getOddNumberToNegativeTX(item?.run?.['under']) }}</span></td>
                        <td width="10%" style="min-width: 60px"  class="bd-l">
                          <span class="odd_a" @click="openModalDetailChange(item?.isportsapi, item?.name)" >{{ $t('History') }}</span>
                        </td>
                      </tr>
                  </template>
                </tbody>
              </table>
            </div>
        </div>
      </div>

      <div id="content-page" class="mt-5">
        <h1 class="page_title" v-if="matchTitle">{{ matchTitle }}</h1>
        {{ matchContent }}
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modal_detail_win"
      tabindex="-1"
      aria-labelledby="modal_detail_win_label"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered container">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="modal_detail_win_label">
              {{ oddCompanyName }} {{ $t('Odd history') }}
            </div>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="closeModalDetailWin"
            ></button>
          </div>
          <div class="modal-body">
            <div
              id=""
              class="layui-layer-content detail_win"
            >
              <div class="popinfo">
                <PopupOddsChange :odd-comp-id="oddCompanyId" :match-id="matchIdSlug" :section="activeSection" :odd-companys-list="oddCompanys" :refresh-time="refreshTime"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modal_filter_comp"
      tabindex="-1"
      aria-labelledby="modal_filter_comp_label"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="modal_filter_comp_label">
              {{ $t('Select Company') }}
            </div>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="closeModalFilterComp"
            ></button>
          </div>
          <div class="modal-body">
            <div class="layui-layer-content oddscomp-filterwin">
              <ul id="oddscompFilterWin" class="popinfo">
                <li
                  class="complist"
                  v-for="(oddCompany, index) in ODD_COMPANYS"
                  :key="index"
                  :value="oddCompany?.id"
                  @click="checkOCompany(oddCompany?.id)"
                  :class="oCompanySelected.includes(oddCompany?.id) ? 'on' : ''"
                >
                  <i class="check-circled"></i> {{ oddCompany?.name }}
                </li>
              </ul>
              <div id="winTips" class="tips" v-show="oCompanySelected?.length === 0">*{{ $t('Select at least 1 company') }}</div>
            </div>
          </div>
          <div class="modal-footer" style="display: none">
            <button type="button" class="btn btn-primary" :disabled="oCompanySelected?.length === 0 ? true : false">{{ $t('OK') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { socketStore } from '@/stores/wsocket'
import { useMatchStore } from '@/stores/useMatchStore'
import { useWindowSize } from '@vueuse/core'
const { useLocale, $t} = useShareCommon()
const { width } = useWindowSize()
const emit = defineEmits<{
  (e: 'socketData', data: any): void
}>()

const storeSystems = systemsStore()
const socket = socketStore()
const matchStore = useMatchStore()
const eventSocketData = ref()
const route = useRoute();

const isHaft = ref(false)
const matchLiveDetail = ref([]);
const oddsDetail = ref();
const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
const matchIdSlug = ref("");
const activeSection = ref("ahDetail");
const oCompanySelected = ref(useCookie<any>("oCompanyOddSelected").value ? useCookie<any>("oCompanyOddSelected").value : []);
const oCompList = ref([]);
const oddsList = ref([])
const oddCompanys = ref([])
const oddsCorner = ref([])
ODD_COMPANYS.forEach((item) => {
  oCompList.value[item?.id] = oCompanySelected.value.includes(item?.id)
    ? true
    : false;
});

const oddCompanyName = ref()
const oddsDetailHistories = ref([])
const oddCompanyId = ref()
const tab = ref(route?.query?.type || "")
const tabActive = ref(1)
const isInitModal = ref(false)
const refreshTime = ref(Date.now())
const titleList = ref([
  {
    id: 1,
    name: $t('Init')
  },
  {
    id: 2,
    name: $t('Live')
  },
  {
    id: 3,
    name: $t('Run Odds')
  }
])
const matchTitle = defineModel('matchTitle')
const matchContent = defineModel('matchContent')
const initDataMatch = defineModel('initDataMatch')


const isMobile = computed(()=> {
  return width.value <= 768
})

const showColumn = computed(()=> {
  return {
    first : !isMobile.value ? true : tabActive.value === 1 ? true : false,
    second: !isMobile.value ? true : tabActive.value === 2 ? true : false,
    third: !isMobile.value ? true : tabActive.value === 3 ? true : false,
  }
})
function setActiveSection(section) {
  activeSection.value = section;
}
const statedetailwin = reactive({
  modal_detail_win: null,
});

const openModalDetailChange = async (companyId, companyName) => {
  oddCompanyId.value = companyId
  oddCompanyName.value = companyName
  activeSection.value = 'cornertx'
  refreshTime.value = Date.now()
  await initModalElement()
  statedetailwin.modal_detail_win.show();
}

function closeModalDetailWin() {
  activeSection.value = ''
  statedetailwin.modal_detail_win.hide();
}
const statefiltercomp = reactive({
  modal_filter_comp: null,
});

const openModaFilterComp = async() => {
  await initModalElement()
  statefiltercomp.modal_filter_comp.show();
}
function closeModalFilterComp() {
  statefiltercomp.modal_filter_comp.hide();
}

// Get data from cookie
const settingsData = useCookie<any>('settingsData')
const timeZone = ref(getConfig(storeSystems?.configurations, 'TIMEZONE') || settingsData?.value?.timeZone);
const fetchObjectMeta = async () => {
  try {
    await useFetch<any>(createUrl(API_ROUTERS.OBJECTS_META.DETAIL + "/" + matchIdSlug.value, {
      query: {
        type: 'match',
        tab: tab.value,
      },
    })).then((resData) => {
      let title = resData?.data?._value?.title
      let description = resData?.data?._value?.meta_description
      if (!title || title == '') {
        title = getConfig(storeSystems.configurations, 'MATCH_TITLE_' + tab.value?.toUpperCase()) || getConfig(storeSystems.configurations, 'MATCH_TITLE_ODDSCOMP')
        title = generateMetaSeo(title, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZone.value, matchLiveDetail.value.match?.competition?.name)
      }
      if (!description || description == '') {
        description = getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_' + tab.value?.toUpperCase()) || getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_ODDSCOMP')
        description = generateMetaSeo(description, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZone.value, matchLiveDetail.value.match?.competition?.name)
      }
      let keyword = resData?.data?._value?.keyword
      if (!keyword || keyword == '') {
        keyword = getConfig(storeSystems.configurations, 'MATCH_KEYWORD_' + tab.value?.toUpperCase()) || getConfig(storeSystems.configurations, 'MATCH_KEYWORD_ODDSCOMP')
        keyword = generateMetaSeo(keyword, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZone.value, matchLiveDetail.value.match?.competition?.name)
      }
      let content = resData?.data?._value?.content
      if (!content || content == '') {
        content = getConfig(storeSystems.configurations, 'MATCH_CONTENT_' + tab.value?.toUpperCase()) || getConfig(storeSystems.configurations, 'MATCH_CONTENT_ODDSCOMP')
        content = generateMetaSeo(content, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZone.value, matchLiveDetail.value.match?.competition?.name)
      }
      matchTitle.value = title
      matchContent.value = content

      useSeoMeta({
        title: title,
        description: description,
        ogTitle: title,
        ogDescription: description,
        keywords: keyword,
      })
    })
  }
  catch (e: any) {
  }
};

const fetchMatchsRecentDetail = async () => {
  // await useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_RECENT_DETAIL + '?match_id=' + matchIdSlug.value).then(async resData => {
  //   if (!resData || resData?.length === 0) {
  //     return navigateTo(ROUTERS.HOMEPAGE, { replace: true })
  //     /*
  //     showError({
  //       statusCode: 404,
  //       statusMessage: "Trận đấu không tồn tại!"
  //     })
  //     */
  //   }
    let resData = initDataMatch.value
    matchLiveDetail.value.match = resData?.[0]

    const i_match_id = resData?.[0]?.i_match_id;

    // await fetchObjectMeta()
    
    if (i_match_id) {
      fetchOddsDetail(i_match_id, oddCompanySelected.value);
    }
  // });
};

const fetchMatchsLiveDetail = async () => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.MATCHS_LIVE_DETAIL + "/" + matchIdSlug.value
  ).then(async (resData) => {
    if (!resData) {
      return navigateTo(ROUTERS.HOMEPAGE, { replace: true })
      /*
      showError({
        statusCode: 404,
        statusMessage: "Trận đấu không tồn tại!"
      })
      */
    }
    matchLiveDetail.value = resData;

    await fetchObjectMeta()
  });
};

const fetchOddsDetail = async (
  i_match_id,
  i_company_id = ODD_COMPANY_DEFAULT
) => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL, {
    i_match_id: i_match_id,
    i_company_id: i_company_id,
  }).then((resData) => {
    oddsDetail.value = resData;

  });
};

const checkOCompany = (companyId) => {
  oCompList.value[companyId] = !oCompList.value[companyId];
  
  if (oCompList.value[companyId]) {
    if (!oCompanySelected.value?.includes(companyId)) {
      oCompanySelected.value.push(companyId);
    }
  } else {
    const index = oCompanySelected.value.indexOf(companyId, 0);
    if (index > -1) {
      oCompanySelected.value.splice(index, 1);
    }
  }

  useCookie("oCompanyOddSelected").value = JSON.stringify(oCompanySelected.value);
};

const selectOddsCmp = (val) => {
  if (val) {
    ODD_COMPANYS.forEach((item) => {
      oCompList.value[item?.id] = true;
      oCompanySelected.value.push(item?.id);
    });
  } else {
    ODD_COMPANYS.forEach((item) => {
      oCompList.value[item?.id] = false;
      oCompanySelected.value = [];
    });
  }

  useCookie("oCompanyOddSelected").value = JSON.stringify(oCompanySelected.value);
};

const fetchOddsCorner = async () => {
  await useApiLiveScore(
    (isHaft.value === false ? API_ROUTERS.LIVESCORE.ODDS_CONNER_FULL : API_ROUTERS.LIVESCORE.ODDS_CONNER_HAFT) + "?match_id=" + matchIdSlug.value
  ).then((resData) => {
    const oddCompanysList = []
    ODD_COMPANYS?.forEach(item => {
      oddCompanysList[item?.isportsapi] = []
      oddCompanysList[item?.isportsapi].id = item?.id
      oddCompanysList[item?.isportsapi].isportsapi = item?.isportsapi
      oddCompanysList[item?.isportsapi].name = item?.name
      oddCompanysList[item?.isportsapi].first = resData?.data?.early?.find(odd => odd.i_company_id === item?.isportsapi)
      oddCompanysList[item?.isportsapi].live = resData?.data?.live?.find(odd => odd.i_company_id === item?.isportsapi)
      oddCompanysList[item?.isportsapi].run = resData?.data?.run?.find(odd => odd.i_company_id === item?.isportsapi)

      if (typeof oddCompanysList[item?.isportsapi].first === 'undefined' && typeof oddCompanysList[item?.isportsapi].live === 'undefined' && typeof oddCompanysList[item?.isportsapi].run === 'undefined' && 
        typeof oddCompanysList[item?.isportsapi].first === 'undefined' && typeof oddCompanysList[item?.isportsapi].live === 'undefined' && typeof oddCompanysList[item?.isportsapi].run === 'undefined' && 
        typeof oddCompanysList[item?.isportsapi].first === 'undefined' && typeof oddCompanysList[item?.isportsapi].live === 'undefined' && typeof oddCompanysList[item?.isportsapi].run === 'undefined'
      ) {
        oddCompanysList[item?.isportsapi].isEmpty = true
      }
    })
    oddsCorner.value = oddCompanysList;
  });
};

watch(
  () => route?.query, 
  () => {
  tab.value = route?.query?.type || "";
  }, 
  { immediate: true }
);


watch(
  () => route,
  (newPath) => {
    const matches = newPath?.path?.match(/[^/-]+$/);
    matchIdSlug.value = matches ? matches[0] : "";
  },
  { immediate: true }
);

watch(
  () => route.query,
  async() => {
      isHaft.value = route.query?.haft == 1 ? true : false

      await fetchOddsCorner(matchIdSlug.value);
  },
  { immediate: true }
);


watch(
  () => route.query,
  () => {
    const europeOdds = route.query?.haft == 1 ? "europeanHaft" : "europeOdds"
    const handicap = route.query?.haft == 1 ? "handicapHalf" : "handicap"
    const overUnder = route.query?.haft == 1 ? "overUnderHalf" : "overUnder"
    const oddCompanysList = []
    ODD_COMPANYS?.forEach(item => {
      oddCompanysList[item?.isportsapi] = []
      oddCompanysList[item?.isportsapi].id = item?.id
      oddCompanysList[item?.isportsapi].isportsapi = item?.isportsapi
      oddCompanysList[item?.isportsapi].name = item?.name
      oddCompanysList[item?.isportsapi].handicap = []
      oddCompanysList[item?.isportsapi]['handicap'].first = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === handicap)?.initial
      oddCompanysList[item?.isportsapi]['handicap'].live = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === handicap)?.instant
      oddCompanysList[item?.isportsapi]['handicap'].run = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === handicap)?.inplay 

      oddCompanysList[item?.isportsapi].europeOdds = []
      oddCompanysList[item?.isportsapi]['europeOdds'].first = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === europeOdds)?.initial
      oddCompanysList[item?.isportsapi]['europeOdds'].live = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === europeOdds)?.instant
      oddCompanysList[item?.isportsapi]['europeOdds'].run = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === europeOdds)?.inplay

      oddCompanysList[item?.isportsapi].overUnder = []
      oddCompanysList[item?.isportsapi]['overUnder'].first = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === overUnder)?.initial
      oddCompanysList[item?.isportsapi]['overUnder'].live = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === overUnder)?.instant
      oddCompanysList[item?.isportsapi]['overUnder'].run = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === overUnder)?.inplay

      if (typeof oddCompanysList[item?.isportsapi]['handicap'].first === 'undefined' && typeof oddCompanysList[item?.isportsapi]['handicap'].live === 'undefined' && typeof oddCompanysList[item?.isportsapi]['handicap'].run === 'undefined' && 
        typeof oddCompanysList[item?.isportsapi]['europeOdds'].first === 'undefined' && typeof oddCompanysList[item?.isportsapi]['europeOdds'].live === 'undefined' && typeof oddCompanysList[item?.isportsapi]['europeOdds'].run === 'undefined' && 
        typeof oddCompanysList[item?.isportsapi]['overUnder'].first === 'undefined' && typeof oddCompanysList[item?.isportsapi]['overUnder'].live === 'undefined' && typeof oddCompanysList[item?.isportsapi]['overUnder'].run === 'undefined'
      ) {
        oddCompanysList[item?.isportsapi].isEmpty = true
      }

    })
    
    oddCompanys.value = oddCompanysList
  },
  { immediate: true }
);

// Socket data
const wssMatch = (socketData: any) => {
  try {
    if (socketData) {
      const wssItem = socketData
      try {
        eventSocketData.value = wssItem
        emit('socketData', wssItem)
        // Kèo góc TX
        if (wssItem?.topic && wssItem.topic == 'livescore/football/iodds_corner/v1') {
          const matchOdds = wssItem.payload.inplay;
          if (matchOdds) {
            for (const matchOdd of matchOdds) {
              const companyId = matchOdd?.companyId;
              
              if (matchOdd?.matchId == matchLiveDetail.value?.match?.i_match_id) {
                const oddCompany = oddsCorner.value?.find(item => item?.isportsapi == companyId)
                if (oddCompany) {
                  if (!oddCompany?.run) {
                    oddCompany.run = []
                  }
                  oddCompany.run_older = oddCompany?.run ? JSON.parse(JSON.stringify(oddCompany?.run)) : []
                  oddCompany.run = {
                    i_company_id: companyId,
                    over: matchOdd?.odds?.over,
                    total_corners: matchOdd?.odds?.totalCorners,
                    under: matchOdd?.odds?.under
                  }
                }
              }
            }
          }
        }
      }
      catch (e: any) {
        return false
      }
    }
  }
  catch (e: any) {
    return false
  }
}

watch(
  matchStore,
  () => {
    wssMatch(matchStore?.socketData)
}, { deep: true, immediate: true })

await fetchMatchsRecentDetail()
// await fetchMatchsLiveDetail();
await fetchOddsCorner();

const initModalElement = async() => {
  if(!isInitModal.value) {
    isInitModal.value = true
    await nextTick()
    statefiltercomp.modal_filter_comp = new bootstrap.Modal(
      "#modal_filter_comp",
      {}
    );
    statedetailwin.modal_detail_win = new bootstrap.Modal(
      "#modal_detail_win",
      {}
    );
  }
}
onMounted(async () => {

});
</script>
<style>
/* @import url("~/assets/css/match_odds.scss");
@import url("~/assets/css/league.scss"); */

/* .match-odds .company-comp .rankdata  {
  span.span2 {
      margin: 0 24px !important;
  }
}

.rankbox .rankdata .eTable tr td {
  width: 40px;
} */
</style>