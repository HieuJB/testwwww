<template>
  <div id="" class="match-odds">
    <div id="">
      <div id="CompanyOddsDiv" class="company-comp">
        <TabTableMobile v-show="isMobile"  :titleList="titleList" v-model="tabActive"/>
        <div class="rankbox">
            <table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="float: left; min-width: 135px">
              <tbody>
                <tr class="tr-title"  >
                  <th colspan="2" rowspan="2">
                    <b>{{ $t('Company') }}</b>
                    <img
                      alt="plus"
                      src="/img/fx.svg"
                      @click="openModaFilterComp"
                    />
                  </th>
                  <th></th>
                </tr>
                <tr class="tb-bgcolor1">
                  <th></th>
                </tr>
                <template 
                v-for="(item, index) in oddCompanys?.filter(item => item !== null && !item?.isEmpty && oCompanySelected.includes(item?.id))"
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
                      <th colspan="3" v-show="!isMobile"><b>{{ $t('Init') }}</b></th>
                      <th colspan="3" v-show="!isMobile"><b>{{ $t('Live') }}</b></th>
                      <th colspan="3" v-show="!isMobile"><b>{{ $t('Run Odds') }}</b></th>
                      <th rowspan="2" v-show="!isMobile"><b>{{ $t('Detail') }}</b></th>
                  </tr>
                  <tr class="tr-title" >
                      <th>{{ $t('Home') }}</th>
                      <th>{{ $t('HDP') }}</th>
                      <th>{{ $t('Away') }}</th>
                      <th v-show="!isMobile">{{ $t('Home') }}</th>
                      <th v-show="!isMobile">{{ $t('HDP') }}</th>
                      <th v-show="!isMobile">{{ $t('Away') }}</th>
                      <th v-show="!isMobile">{{ $t('Home') }}</th>
                      <th v-show="!isMobile">{{ $t('HDP') }}</th>
                      <th v-show="!isMobile">{{ $t('Away') }}</th>
                      <th v-show="isMobile">{{ $t('Detail') }}</th>
                  </tr>
                  <template 
                  v-for="(item, index) in oddCompanys?.filter(item => item !== null && !item?.isEmpty && oCompanySelected.includes(item?.id))"
                  :index="index"
                  >
                    <tr name="oddsTr" style="text-align:center" cid="3" :class="index % 2 !== 0 ? 'tb-bgcolor1' : 'tb-bgcolor1'">
                      <td v-show="showColumn.first" width="6%"><span class="span2" :class="getClassOddChange(item?.handicap, 1, 1)">{{ getOddNumberToNegative(item?.handicap?.first?.[1]) }}</span></td>
                      <td v-show="showColumn.first" width="6%"><span class="span2" :class="getClassOddChange(item?.handicap, 0, 1)">{{ getOddNumber(item?.handicap?.first?.[0]) }}</span></td>
                      <td v-show="showColumn.first" width="6%" class="rb span2"><span :class="getClassOddChange(item?.handicap, 0, 2)">{{ getOddNumberToNegative(item?.handicap?.first?.[2]) }}</span></td>
                      <td v-show="showColumn.second"  width="6%"><span class="span2" :class="getOddChange(item?.handicap?.live?.[1], item?.handicap?.first?.[1]) + ' ' + getClassOddChange(item?.handicap, 1, 2)">{{ getOddNumberToNegative(item?.handicap?.live?.[1]) }}</span></td>
                      <td v-show="showColumn.second"  width="6%"><span class="span2" :class="getOddChange(item?.handicap?.live?.[0], item?.handicap?.first?.[0]) + ' ' + getClassOddChange(item?.handicap, 0, 2)">{{ getOddNumber(item?.handicap?.live?.[0]) }}</span></td>
                      <td v-show="showColumn.second"  width="6%" class="rb span2"><span :class="getOddChange(item?.handicap?.live?.[2], item?.handicap?.first?.[2]) + ' ' + getClassOddChange(item?.handicap, 2, 2)">{{ getOddNumberToNegative(item?.handicap?.live?.[2]) }}</span></td>
                      <td v-show="showColumn.third" width="6%"><span class="span2" :class="getClassOddChange(item?.handicap, 1, 3)">{{ getOddNumberToNegative(item?.handicap?.run?.[1]) }}</span></td>
                      <td v-show="showColumn.third" width="6%"><span class="span2" :class="getClassOddChange(item?.handicap, 0, 3)">{{ getOddNumber(item?.handicap?.run?.[0]) }}</span></td>
                      <td v-show="showColumn.third" width="6%" class="rb span2"><span :class="getClassOddChange(item?.handicap, 2, 3)">{{ getOddNumberToNegative(item?.handicap?.run?.[2]) }}</span></td>
                      <!-- <td width="5%">
                        <nuxt-link name="oddsStats" class="odd_a" :to="'#'">Xem thêm</nuxt-link>
                      </td> -->
                      <td width="10%" style="min-width: 60px">
                        <span class="odd_a" @click="openModalDetailChange(item?.isportsapi, item?.name)"> {{ $t('History') }}</span>
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
                <PopupOddsChange :odd-comp-id="oddCompanyId" :match-id="matchIdSlug" :section="'ahDetail'" :odd-companys-list="oddCompanys" :refresh-time="refreshTime"/>
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
const { useLocale, $t } = useShareCommon()
const { width } = useWindowSize()
const emit = defineEmits<{
  (e: 'socketData', data: any): void
}>()

const storeSystems = systemsStore()
const matchStore = useMatchStore()
const eventSocketData = ref()
const route = useRoute();
const isHaft = ref(false)
const matchLiveDetail = ref([]);
const oddsDetail = ref();
const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
const matchIdSlug = ref("");
const oCompanySelected = ref(useCookie<any>("oCompanyOddSelected").value ? useCookie<any>("oCompanyOddSelected").value : []);
const isEmptyCompanySelected = ref(oCompanySelected.value?.length > 0 ? false : true);
const oCompList = ref([]);
const oddsList = ref([])
const oddCompanys = ref([])
ODD_COMPANYS.forEach((item) => {
  if (isEmptyCompanySelected.value) {
    oCompList.value[item?.id] = true
  } else {
    oCompList.value[item?.id] = oCompanySelected.value.includes(item?.id) ? true : false;
  }
});
const tabActive = ref(1)
const isInitModal = ref(false)
const refreshTime = ref(Date.now())
const matchTitle = defineModel('matchTitle')
const matchContent = defineModel('matchContent')
const initDataMatch = defineModel('initDataMatch')


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

const oddCompanyName = ref()
const oddCompanyId = ref()
const tab = ref(route?.query?.type || "")

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
        title = generateMetaSeo(title, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZone.value,  matchLiveDetail.value.match?.competition?.name)
      }
      if (!description || description == '') {
        description = getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_' + tab.value?.toUpperCase()) || getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_ODDSCOMP')
        description = generateMetaSeo(description, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZone.value,  matchLiveDetail.value.match?.competition?.name)
      }
      let keyword = resData?.data?._value?.keyword
      if (!keyword || keyword == '') {
        keyword = getConfig(storeSystems.configurations, 'MATCH_KEYWORD_' + tab.value?.toUpperCase()) || getConfig(storeSystems.configurations, 'MATCH_KEYWORD_ODDSCOMP')
        keyword = generateMetaSeo(keyword, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZone.value,  matchLiveDetail.value.match?.competition?.name)
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

const fetchOdds = async (matchIdSlug) => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL + '?match_id=' + matchIdSlug).then(async resData => {
    
    oddsList.value = getDataObjectByList(resData)
    const oddCompanysList = []
    ODD_COMPANYS?.forEach(item => {
      oddCompanysList[item?.isportsapi] = []
      oddCompanysList[item?.isportsapi].id = item?.id
      oddCompanysList[item?.isportsapi].isportsapi = item?.isportsapi
      oddCompanysList[item?.isportsapi].name = item?.name
      oddCompanysList[item?.isportsapi].handicap = []
      oddCompanysList[item?.isportsapi]['handicap'].first = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === "handicap")?.initial
      oddCompanysList[item?.isportsapi]['handicap'].live = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === "handicap")?.instant
      oddCompanysList[item?.isportsapi]['handicap'].run = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === "handicap")?.inplay 

      oddCompanysList[item?.isportsapi].europeOdds = []
      oddCompanysList[item?.isportsapi]['europeOdds'].first = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === "europeOdds")?.initial
      oddCompanysList[item?.isportsapi]['europeOdds'].live = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === "europeOdds")?.instant
      oddCompanysList[item?.isportsapi]['europeOdds'].run = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === "europeOdds")?.inplay

      oddCompanysList[item?.isportsapi].overUnder = []
      oddCompanysList[item?.isportsapi]['overUnder'].first = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === "overUnder")?.initial
      oddCompanysList[item?.isportsapi]['overUnder'].live = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === "overUnder")?.instant
      oddCompanysList[item?.isportsapi]['overUnder'].run = oddsList.value?.find(odd => odd.i_company_id === item?.isportsapi && odd.type === "overUnder")?.inplay

      if (typeof oddCompanysList[item?.isportsapi]['handicap'].first === 'undefined' && typeof oddCompanysList[item?.isportsapi]['handicap'].live === 'undefined' && typeof oddCompanysList[item?.isportsapi]['handicap'].run === 'undefined' && 
        typeof oddCompanysList[item?.isportsapi]['europeOdds'].first === 'undefined' && typeof oddCompanysList[item?.isportsapi]['europeOdds'].live === 'undefined' && typeof oddCompanysList[item?.isportsapi]['europeOdds'].run === 'undefined' && 
        typeof oddCompanysList[item?.isportsapi]['overUnder'].first === 'undefined' && typeof oddCompanysList[item?.isportsapi]['overUnder'].live === 'undefined' && typeof oddCompanysList[item?.isportsapi]['overUnder'].run === 'undefined'
      ) {
        oddCompanysList[item?.isportsapi].isEmpty = true
      }

      // Push to list company
      if (isEmptyCompanySelected.value && !oCompanySelected.value?.includes(item?.id)) {
        oCompanySelected.value.push(item?.id);
      }

    })
    
    oddCompanys.value = oddCompanysList
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

// Socket data
const wssMatch = (socketData: any) => {
  try {
    if (socketData) {
      try {
        const wssItem = socketData
        eventSocketData.value = wssItem
        emit('socketData', wssItem)
        if (wssItem.payload?.iodds) {
          // ODDS - https://www.isportsapi.com/docs.html?id=25
          const matchOdds = wssItem.payload.iodds;
          const handicap = (route.query?.haft == 1) ? "handicapHalf" : "handicap"
          if (matchOdds?.[handicap]) {
            for (const matchOdd of matchOdds?.[handicap]) {
              const matchId = parseIntO(getValueByPosition(matchOdd, 0));
              const companyId = getValueByPosition(matchOdd, 1);
              const oddsType	=  getValueByPosition(matchOdd, 9);
              if (matchId == matchLiveDetail.value?.match?.i_match_id) {
                const oddCompany = oddCompanys.value?.find(item => item?.isportsapi == companyId)
                if (oddCompany) {
                  if (!oddCompany?.handicap) {
                    oddCompany.handicap = []
                    oddCompany.handicap.first = []
                    oddCompany.handicap.live = []
                    oddCompany.handicap.run = []
                  }
                  if (oddsType == 1) {
                    oddCompany.handicap.first_older = oddCompany?.handicap?.first ? JSON.parse(JSON.stringify(oddCompany.handicap.first)) : []
                    oddCompany.handicap.first = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                  } else if (oddsType == 2) {
                    oddCompany.handicap.live_older =oddCompany?.handicap?.live ? JSON.parse(JSON.stringify(oddCompany.handicap.live)) : []
                    oddCompany.handicap.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                  } else if (oddsType == 3) {
                    oddCompany.handicap.run_older = oddCompany?.handicap?.run ? JSON.parse(JSON.stringify(oddCompany.handicap.run)) : []
                    oddCompany.handicap.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
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
// await fetchMatchsLiveDetail(matchIdSlug);
await fetchOdds(matchIdSlug.value);

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