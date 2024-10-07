<template>
  <div id="" class="match-odds">
    <div id="">
      <!-- <HeaderComponent :socket-data="eventSocketData"/> -->

      <div id="CompanyOddsDiv" class="company-comp">
        <div class="rankbox">
          <table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="float: left; min-width: 135px">
            <tbody>
              <tr class="tr-title"  >
                <th colspan="2" rowspan="1">
                  <b>{{ $t('Company') }}</b>
                </th>
                <th></th>
              </tr>
              <template 
              v-for="(item, index) in oddsCorrectScore"
              :index="index"
              >
                <tr name="oddsTr" style="text-align:center" cid="31" :class="(index % 2 === 0) ? 'tb-bgcolor1' : 'tb-bgcolor1'">
                  <td width="60%" height="30" class="rb">{{ ODD_COMPANYS?.find(comp => comp?.isportsapi === item?.i_company_id)?.name }}</td>
                  <td><span>{{ $t('Home') }}</span><span>{{ $t('Away') }}</span></td>
                </tr>
              </template>
            </tbody>
          </table>
          <div class="rankdata" width="75%">
            <table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%">
              <tbody>
                <tr class="tr-title" >
                  <th width="5%"><b>1:0</b></th>
                  <th width="5%"><b>2:0</b></th>
                  <th width="5%"><b>2:1</b></th>
                  <th width="5%"><b>3:0</b></th>
                  <th width="5%"><b>3:1</b></th>
                  <th width="5%"><b>3:2</b></th>
                  <th width="5%"><b>4:0</b></th>
                  <th width="5%"><b>4:1</b></th>
                  <th width="5%"><b>4:2</b></th>
                  <th width="5%"><b>4:3</b></th>
                  <th width="5%"><b>0:0</b></th>
                  <th width="5%"><b>1:1</b></th>
                  <th width="5%"><b>2:2</b></th>
                  <th width="5%"><b>3:3</b></th>
                  <th width="5%"><b>4:4</b></th>
                  <th width="5%"><b>{{ $t('Other') }}</b></th>
                  <th width="6%"><b>{{ $t('Detail') }}</b></th>
                </tr>
                <template 
                  v-for="(item, index) in oddsCorrectScore"
                  :index="index"
                  >
                    <tr name="oddsTr" style="text-align:center" cid="31" :class="(index % 2 === 0) ? 'tb-bgcolor1' : 'tb-bgcolor1'">
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 1, 0) }}</span><span>{{  getOddsCorrectScore(item?.odds, 0, 1) }}</span></td>
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 2, 0) }}</span><span>{{  getOddsCorrectScore(item?.odds, 0, 2) }}</span></td>
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 2, 1) }}</span><span>{{  getOddsCorrectScore(item?.odds, 1, 2) }}</span></td>
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 3, 0) }}</span><span>{{  getOddsCorrectScore(item?.odds, 0, 3) }}</span></td>
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 3, 1) }}</span><span>{{  getOddsCorrectScore(item?.odds, 1, 3) }}</span></td>
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 3, 2) }}</span><span>{{  getOddsCorrectScore(item?.odds, 2, 3) }}</span></td>
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 4, 0) }}</span><span>{{  getOddsCorrectScore(item?.odds, 0, 4) }}</span></td>
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 4, 1) }}</span><span>{{  getOddsCorrectScore(item?.odds, 1, 4) }}</span></td>
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 4, 2) }}</span><span>{{  getOddsCorrectScore(item?.odds, 2, 4) }}</span></td>
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 4, 3) }}</span><span>{{  getOddsCorrectScore(item?.odds, 3, 4) }}</span></td>
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 0, 0) }}</span></td>
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 1, 1) }}</span></td>
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 2, 2) }}</span></td>
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 3, 3) }}</span></td>
                      <td width="3%"><span>{{  getOddsCorrectScore(item?.odds, 4, 4) }}</span></td>
                      <td width="3%"><span>{{ item?.odds?.otherScoresOdds  }}</span></td>
                      <td width="3%">
                        <span class="odd_a" @click="openModalDetailChange(item?.i_company_id, ODD_COMPANYS?.find(comp => comp?.isportsapi === item?.i_company_id)?.name)"> {{ $t('History') }} </span>
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
              {{ oddCompanyName }}  {{ $t('Odd history') }}
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
                <PopupOddsChange :odd-comp-id="oddCompanyId" :match-id="matchIdSlug" :section="'correctScore'" :odd-companys-list="oddCompanys" :refresh-time="refreshTime"/>
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
const { useLocale, $t } = useShareCommon()

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
const oddCompanysList = ref([])
ODD_COMPANYS.forEach((item) => {
  // List company
  oddCompanysList.value[item?.id] = item

  oCompList.value[item?.id] = oCompanySelected.value.includes(item?.id)
    ? true
    : false;
});

const oddCompanyName = ref()
const oddsDetailHistories = ref([])
const oddsCorrectScore = ref([])
const oddCompanyId = ref()
const tab = ref(route?.query?.type || "")
const isInitModal = ref(false)
const refreshTime = ref(Date.now())
const matchTitle = defineModel('matchTitle')
const matchContent = defineModel('matchContent')
const initDataMatch = defineModel('initDataMatch')

function setActiveSection(section) {
  activeSection.value = section;
}
const statedetailwin = reactive({
  modal_detail_win: null,
});

const openModalDetailChange = async (companyId, companyName) => {
  oddCompanyId.value = companyId
  oddCompanyName.value = companyName
  refreshTime.value = Date.now()
  
  await initModalElement()
  statedetailwin.modal_detail_win.show();
}

function closeModalDetailWin() {
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
        description = description = getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_' + tab.value?.toUpperCase()) || getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_ODDSCOMP')
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

const fetchMatchsLiveDetail = async (matchIdSlug) => {
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

    const i_match_id = resData?.match?.i_match_id;
    if (i_match_id) {
      fetchOddsDetail(i_match_id, oddCompanySelected.value);
    }
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

const fetchOdds = async () => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.ODDS_CORRECT_SCORE + "?match_id=" + matchIdSlug.value
  ).then((resData) => {
    oddsCorrectScore.value = resData?.data; 

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
  (newQuery) => {
      isHaft.value = route.query?.haft == 1 ? true : false
  },
  { immediate: true }
);


watch(
  () => route.query,
  (newQuery) => {
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

// Init socket
const wssInit = () => {
  try {
    // store.wssSocket = useSocket()
    if (!socket.isLoadedWSS) {
      // Close older connect
      //socket.close()
      // Init new
      socket.connect()
      socket.isLoadedWSS = true
    }
    matchStore.wssSocket = socket.wssIntances
  }
  catch (e: any) {
    return false
  }
}

// Socket data
const wssMatch = () => {
  try {
    if (matchStore.wssSocket) {
      const config = useRuntimeConfig()
      matchStore.wssSocket.onmessage = async function (event) {
        if (event.data) {
          try {
            const reader = new FileReader();
            reader.readAsArrayBuffer(event.data)
            reader.onload = function () {
              const arrayBuffer = reader.result;
              const uint8Array = new Uint8Array(arrayBuffer);
              const decompressed = pako.inflate(uint8Array);
              const wssItem = msgpack.decode(decompressed);
            
              eventSocketData.value = wssItem
              emit('socketData', wssItem)
            }
          }
          catch (e: any) {
            return false
          }
        }
      }
    }
  }
  catch (e: any) {
    return false
  }
}

await fetchMatchsRecentDetail()
// await fetchMatchsLiveDetail(matchIdSlug);
await fetchOdds();

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

<style scoped>
.rankbox {
  .eTable tr {
    th {
      height: 62px;
    }
    td {
      height: 62px !important;
    }
  } 

  .rankdata {
    .eTable tr {
      th {
        height: 62px;
      }
      td {
        height: 62px !important;
      }
    } 
  }
}
</style>
