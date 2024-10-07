<template>
  <div id="" class="match-odds">
    <div id="">
      <div id="CompanyOddsDiv" class="company-comp">
        <TabTableMobile v-show="isMobile" :titleList="titleList" v-model="tabActive"/>
        <div class="rankbox">
          <table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="float: left; min-width: 135px">
            <tbody>
              <tr class="tr-title">
                <th colspan="2" rowspan="2">
                  <b>{{ $t('Company') }}</b>
                  <nuxt-img
                    src="/img/fx.svg"
                    alt="plus"
                    height="16"
                    width="16"
                    @click="openModaFilterComp"
                  />
                </th>
                <th></th>
              </tr>
              <tr class="tb-bgcolor1">
                <th></th>
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
                    <td class="bd-l"><span>{{ $t('Init') }}</span><span>{{ $t('Live') }}</span><span class="red">{{ $t('Run') }}</span></td>
                </tr>
              </template>
            </tbody>
          </table>
          <div class="rankdata" style="width: 100%">
            <table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%">
              <tbody>
                <tr class="tr-title">
                    <th colspan="3" v-show="!isMobile"><b>{{ $t('Hadicap Odd') }}</b></th>
                    <th colspan="3" v-show="!isMobile"><b>{{ $t('Over/Under Odd') }}</b></th>
                    <th colspan="3" v-show="!isMobile"><b>{{ $t('1x2 Odd') }}</b></th>
                    <th rowspan="2" v-show="!isMobile"><b>{{ $t('Detail') }}</b></th>
                </tr>
                <tr class="tr-title" >
                    <th v-show="showColumn.first">{{ $t('Home') }}</th>
                    <th v-show="showColumn.first">{{ $t('HDP') }}</th>
                    <th v-show="showColumn.first">{{ $t('Away') }}</th>
                    <th v-show="showColumn.second">{{ $t('Over') }}</th>
                    <th v-show="showColumn.second" class="middle-width">{{ $t('First odd') }}</th>
                    <th v-show="showColumn.second">{{ $t('Under') }}</th>
                    <th v-show="showColumn.third">{{ $t('Home') }}</th>
                    <th v-show="showColumn.third">{{ $t('Draw') }}</th>
                    <th v-show="showColumn.third">{{ $t('Away') }}</th>
                    <th v-show="isMobile" class="middle-width">{{ $t('Detail') }}</th>
                </tr>
                <template
                v-for="(item, index) in oddCompanys?.filter(item => item !== null && !item?.isEmpty && oCompanySelected.includes(item?.id))"
                :index="index"
                >
                  <tr name="oddsTr" :class="index % 2 !== 0 ? 'tb-bgcolor1' : 'tb-bgcolor1'">
                    <td v-show="showColumn.first" width="7%" class="bd-l">
                      <span data-o="">{{ getOddNumberToNegative(item?.handicap?.first?.[1]) }}</span>
                      <span  :class="getOddChange(item?.handicap?.live?.[1], item?.handicap?.first?.[1])">{{ getOddNumber(item?.handicap?.live?.[1]) }}</span>
                      <span  :class="getClassOddChange(item?.handicap, 1)">{{ getOddNumberToNegative(item?.handicap?.run?.[1]) }}</span>
                    </td>
                    <td v-show="showColumn.first" width="7%">
                      <span data-o="">{{ getOddNumber(item?.handicap?.first?.[0]) }}</span>
                      <span :class="getOddChange(item?.handicap?.live?.[0], item?.handicap?.first?.[0])">{{ getOddNumber(item?.handicap?.live?.[0]) }}</span>
                      <span :class="getClassOddChange(item?.handicap, 0)">{{ getOddNumber(item?.handicap?.run?.[0]) }}</span>
                    </td>
                    <td v-show="showColumn.first" width="7%" class="bd-r">
                      <span data-o="">{{ getOddNumberToNegative(item?.handicap?.first?.[2]) }}</span>
                      <span :class="getOddChange(item?.handicap?.live?.[2], item?.handicap?.first?.[2])">{{ getOddNumber(item?.handicap?.live?.[2]) }}</span>
                      <span :class="getClassOddChange(item?.handicap, 2)">{{ getOddNumberToNegative(item?.handicap?.run?.[2]) }}</span>
                    </td>
                    <td v-show="showColumn.second" width="7%" class="bd-l">
                      <span data-o="">{{ getOddNumberToNegative(item?.overUnder?.first?.[1]) }}</span>
                      <span :class="getOddChange(item?.overUnder?.live?.[1], item?.overUnder?.first?.[1])">{{ getOddNumberToNegative(item?.overUnder?.live?.[1]) }}</span>
                      <span :class="getClassOddChange(item?.overUnder, 1)">{{ getOddNumberToNegative(item?.overUnder?.run?.[1]) }}</span>
                    </td>
                    <td v-show="showColumn.second" width="7%">
                      <span data-o="">{{ getOddNumber(item?.overUnder?.first?.[0]) }}</span>
                      <span :class="getOddChange(item?.overUnder?.live?.[0], item?.overUnder?.first?.[0])">{{ getOddNumber(item?.overUnder?.live?.[0]) }}</span>
                      <span :class="getClassOddChange(item?.overUnder, 0)">{{ getOddNumber(item?.overUnder?.run?.[0]) }}</span>
                    </td>
                    <td v-show="showColumn.second" width="7%" class="bd-r">
                      <span data-o="">{{ getOddNumberToNegative(item?.overUnder?.first?.[2]) }}</span>
                      <span :class="getOddChange(item?.overUnder?.live?.[2], item?.overUnder?.first?.[2])">{{ getOddNumberToNegative(item?.overUnder?.live?.[2]) }}</span>
                      <span :class="getClassOddChange(item?.overUnder, 2)">{{ getOddNumberToNegative(item?.overUnder?.run?.[2]) }}</span>
                    </td>
                    <td v-show="showColumn.third" width="7%" class="bd-l">
                      <span data-o="">{{ getOddNumber(item?.europeOdds?.first?.[0]) }}</span>
                      <span :class="getOddChange(item?.europeOdds?.live?.[0], item?.europeOdds?.first?.[0])">{{ getOddNumber(item?.europeOdds?.live?.[0]) }}</span>
                      <span :class="getClassOddChange(item?.europeOdds, 0)">{{ getOddNumber(item?.europeOdds?.run?.[0]) }}</span>
                    </td>
                    <td v-show="showColumn.third" width="7%">
                      <span data-o="">{{ getOddNumber(item?.europeOdds?.first?.[1]) }}</span>
                      <span :class="getOddChange(item?.europeOdds?.live?.[1], item?.europeOdds?.first?.[1])">{{ getOddNumber(item?.europeOdds?.live?.[1]) }}</span>
                      <span :class="getClassOddChange(item?.europeOdds, 1)">{{ getOddNumber(item?.europeOdds?.run?.[1]) }}</span>
                    </td>
                    <td v-show="showColumn.third" width="7%" class="bd-r">
                      <span data-o="">{{ getOddNumber(item?.europeOdds?.first?.[2]) }}</span>
                      <span :class="getOddChange(item?.europeOdds?.live?.[2], item?.europeOdds?.first?.[2])">{{ getOddNumber(item?.europeOdds?.live?.[2]) }}</span>
                      <span :class="getClassOddChange(item?.europeOdds, 2)">{{ getOddNumber(item?.europeOdds?.run?.[2]) }}</span>
                    </td>
                    <td width="5%">
                      <span class="odd_a" @click="openModalDetailChange(item?.isportsapi, item?.name)"> {{ $t('History') }} </span>
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
import { useMatchStore } from '@/stores/useMatchStore'
import {  generateMetaSeo } from "~/utils/livescore_helper";
import { systemsStore } from '~/stores/systems'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
const { useLocale, $t } = useShareCommon()
const emit = defineEmits<{
  (e: 'socketData', data: any): void
}>()

const storeSystems = systemsStore()
const matchStore = useMatchStore()
const eventSocketData = ref()
const route = useRoute();
const router = useRouter()
// const { isMobile } = useDevice();
const tabActive = ref(1)
const refreshTime = ref(Date.now())

const titleList = ref([
  {
    id: 1,
    name: $t('Hadicap Odd')
  },
  {
    id: 2,
    name: $t('Over/Under Odd')
  },
  {
    id: 3,
    name: $t('1x2 Odd')
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

const matchLiveDetail = ref([]);
const oddsDetail = ref();
const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
const matchIdSlug = ref(route?.params?.id || "");
const activeSection = ref("ahDetail");
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

const oddCompanyName = ref()
const oddsDetailHistories = ref([])
const oddCompanyId = ref()
const tab = ref(route?.query?.type || "")
// Get data from cookie
const settingsData = useCookie<any>('settingsData')
const timeZone = ref(getConfig(storeSystems?.configurations, 'TIMEZONE') || settingsData?.value?.timeZone);

// Ref Mobile
const is_e_1 = ref(true)
const is_e_2 = ref(true)
const is_e_3 = ref(true)
const is_e_4 = ref(true)
const is_e_5 = ref(true)
const oddsTabs = ref(0)
const liveTabs = ref(1)
const isHaftHDP = ref(false);
const ftPopTabs = ref(0)
const ftCornerTabs = ref(0)
const oddsCorner = ref([])
const oddsCorrectScore = ref([])
const swBoDanTabs = ref(31)
const statedetailwin = reactive({
  modal_detail_win: null,
});
const isInitModal = ref(false)
const showModal = ref(false)
const matchTitle = defineModel('matchTitle')
const matchContent = defineModel('matchContent')
const initDataMatch = defineModel('initDataMatch')

const openModalDetailChange = async (companyId, companyName) => {
  oddCompanyId.value = companyId
  oddCompanyName.value = companyName
  refreshTime.value = Date.now()
  
  //await fetchOddsChangeHistory(companyId)
  await initModalElement()
  statedetailwin.modal_detail_win.show();
  showModal.value = true
}

function closeModalDetailWin() {
  statedetailwin.modal_detail_win.hide();
}
const statefiltercomp = reactive({
  modal_filter_comp: null,
});

const openModaFilterComp = async () =>  {
  await initModalElement()
  statefiltercomp.modal_filter_comp.show();
}
function closeModalFilterComp() {
  statefiltercomp.modal_filter_comp.hide();
}

const fetchOddsChangeHistory = async (isportsapi_id) => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_CHANGE_HISTORY, {
      match_id: matchIdSlug.value,
      i_company_id: isportsapi_id
  }).then(resData => {
    oddsDetailHistories.value = resData
  })
}

const fetchObjectMeta = async () => {
  try {
    await useFetch<any>(createUrl(API_ROUTERS.OBJECTS_META.DETAIL + "/" + matchIdSlug.value, {
      query: {
        type: 'match',
        tab: 'oddscomp',
      },
    })).then((resData) => {
      let title = resData?.data?._value?.title
      let description = resData?.data?._value?.meta_description
      if (!title || title == '') {
        title = getConfig(storeSystems.configurations, 'MATCH_TITLE_ODDSCOMP') ? getConfig(storeSystems.configurations, 'MATCH_TITLE_ODDSCOMP') : getConfig(storeSystems.configurations, 'SEO_META_TITLE')
        title = generateMetaSeo(title, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZone.value,  matchLiveDetail.value.match?.competition?.name)
      }
      if (!description || description == '') {
        description = getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_ODDSCOMP') ? getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_ODDSCOMP') : getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION')
        description = generateMetaSeo(description, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZone.value,  matchLiveDetail.value.match?.competition?.name)
      }
      let keyword = resData?.data?._value?.keyword
      if (!keyword || keyword == '') {
        keyword = getConfig(storeSystems.configurations, 'MATCH_KEYWORD_ODDSCOMP') ? getConfig(storeSystems.configurations, 'MATCH_KEYWORD_ODDSCOMP') : ''
        keyword = generateMetaSeo(keyword, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZone.value,  matchLiveDetail.value.match?.competition?.name)
      }

      let content = resData?.data?._value?.content
      if (!content || content == '') {
        content = getConfig(storeSystems.configurations, 'MATCH_CONTENT_ODDSCOMP') ? getConfig(storeSystems.configurations, 'MATCH_CONTENT_ODDSCOMP') : ''
        content = generateMetaSeo(content, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZone.value,  matchLiveDetail.value.match?.competition?.name)
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
  //   matchLiveDetail.value.match = resData?.[0]
    let resData = initDataMatch.value

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

const fetchOddsCorner = async () => {
  await useApiLiveScore(
    (ftCornerTabs.value === 0 ? API_ROUTERS.LIVESCORE.ODDS_CONNER_FULL : API_ROUTERS.LIVESCORE.ODDS_CONNER_HAFT) + "?match_id=" + matchIdSlug.value
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

const fetchOddsCorrectScore = async () => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.ODDS_CORRECT_SCORE + "?match_id=" + matchIdSlug.value
  ).then((resData) => {
    oddsCorrectScore.value = resData?.data?.find(item => item?.i_company_id === swBoDanTabs.value)?.odds; 
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
  () => route.path,
  (newPath) => {
    matchIdSlug.value = route?.params?.id || "";
  },
  { immediate: true }
);

watch(
  ftCornerTabs,
  async() => {
    await fetchOddsCorner()
  },
  { immediate: true }
);

watch(
  swBoDanTabs,
  async() => {
    await fetchOddsCorrectScore()
  },
  { immediate: true }
);

watch(
  ([() => route.query, ftPopTabs]),
  () => {
    const europeOdds = (route.query?.haft == 1 || ftPopTabs.value === 1) ? "europeanHaft" : "europeOdds"
    const handicap = (route.query?.haft == 1 || ftPopTabs.value === 1) ? "handicapHalf" : "handicap"
    const overUnder =(route.query?.haft == 1 || ftPopTabs.value === 1) ? "overUnderHalf" : "overUnder"
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

await fetchMatchsRecentDetail()
await fetchOdds(matchIdSlug.value);

// Socket data
const wssMatch = (socketData: any) => {
  if (matchStore.wssSocket) {
    try {
      const wssItem = socketData
      eventSocketData.value = wssItem
      emit('socketData', wssItem)

      if (wssItem.payload.iodds) {
        // ODDS - https://www.isportsapi.com/docs.html?id=25
        const matchOdds = wssItem.payload.iodds;
        const handicap = (route.query?.haft == 1 || ftPopTabs.value === 1) ? "handicapHalf" : "handicap"
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
                }
                if (oddsType == 1) {
                  oddCompany.handicap.first_older = oddCompany?.handicap?.first ? JSON.parse(JSON.stringify(oddCompany.handicap.first)) : []
                  oddCompany.handicap.first = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                } else if (oddsType == 2) {
                  oddCompany.handicap.live_older = oddCompany?.handicap?.live ? JSON.parse(JSON.stringify(oddCompany.handicap.live)) : []
                  oddCompany.handicap.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                } else if (oddsType == 3) {
                  oddCompany.handicap.run_older = oddCompany?.handicap?.run ? JSON.parse(JSON.stringify(oddCompany.handicap.run)) : []
                  oddCompany.handicap.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                }
              }
            }
          }
        }
        // overUnder
        const overUnder =(route.query?.haft == 1 || ftPopTabs.value === 1) ? "overUnderHalf" : "overUnder"
        if (matchOdds?.[overUnder]) {
          for (const matchOdd of matchOdds?.[overUnder]) {
            const matchId = parseIntO(getValueByPosition(matchOdd, 0));
            const companyId = getValueByPosition(matchOdd, 1);
            const oddsType	=  getValueByPosition(matchOdd, 7);
            if (matchId == matchLiveDetail.value?.match?.i_match_id) {
              const oddCompany = oddCompanys.value?.find(item => item?.isportsapi == companyId)
              if (oddCompany) {
                if (!oddCompany?.overUnder) {
                  oddCompany.overUnder = []
                }
                if (oddsType == 1) {
                  oddCompany.overUnder.first_older = oddCompany?.overUnder?.first ? JSON.parse(JSON.stringify(oddCompany.overUnder.first)) : []
                  oddCompany.overUnder.first = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                } else if (oddsType == 2) {
                  oddCompany.overUnder.live_older = oddCompany?.overUnder?.live ? JSON.parse(JSON.stringify(oddCompany.overUnder.live)) : []
                  oddCompany.overUnder.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                } else if (oddsType == 3) {
                  oddCompany.overUnder.run_older = oddCompany?.overUnder?.run ? JSON.parse(JSON.stringify(oddCompany.overUnder.run)) : []
                  oddCompany.overUnder.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                }
              }
            }
          }
        }
        // europeOdds
        const europeOdds = (route.query?.haft == 1 || ftPopTabs.value === 1) ? "europeanHaft" : "europeOdds"
        if (matchOdds?.[europeOdds]) {
          for (const matchOdd of matchOdds?.[europeOdds]) {
            const matchId = parseIntO(getValueByPosition(matchOdd, 0));
            const companyId = getValueByPosition(matchOdd, 1);
            const oddsType	=  getValueByPosition(matchOdd, 7);
            if (matchId == matchLiveDetail.value?.match?.i_match_id) {
              const oddCompany = oddCompanys.value?.find(item => item?.isportsapi == companyId)
              if (oddCompany) {
                if (!oddCompany?.europeOdds) {
                  oddCompany.europeOdds = []
                }
                if (oddsType == 1) {
                  oddCompany.europeOdds.first_older = oddCompany?.europeOdds?.first ? JSON.parse(JSON.stringify(oddCompany.europeOdds.first)) : []
                  oddCompany.europeOdds.first = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                } else if (oddsType == 2) {
                  oddCompany.europeOdds.live_older = oddCompany?.europeOdds?.live ? JSON.parse(JSON.stringify(oddCompany.europeOdds.live)) : []
                  oddCompany.europeOdds.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                } else if (oddsType == 3) {
                  oddCompany.europeOdds.run_older = oddCompany?.europeOdds?.run ? JSON.parse(JSON.stringify(oddCompany.europeOdds.run)) : []
                  oddCompany.europeOdds.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                }
              }
            }
          }
        }
      } else if (wssItem.payload.iodds_euro_ht) {
        // Euro hafttime
        for (const matchOdd of wssItem.payload.iodds_euro_ht) {
            const matchId = matchOdd?.matchId;
            if (matchId == matchLiveDetail.value?.match?.i_match_id) {
              for (const odd of matchOdd?.odds) {
                const oddCompany = oddCompanys.value?.find(item => item?.isportsapi == odd?.companyId)
                if (oddCompany) {
                  if (!oddCompany?.europeOdds) {
                    oddCompany.europeOdds = []
                    oddCompany.europeOdds.run = []
                  }
                  oddCompany.europeOdds.run_older = oddCompany?.europeOdds?.run ? JSON.parse(JSON.stringify(oddCompany.europeOdds.run)) : []
                  oddCompany.europeOdds.run = [[odd?.instantHome], [odd?.instantDraw], [odd?.instantAway]]
                }
              }
            }
          }
      } else if (wssItem.topic == 'livescore/football/iodds_corner/v1') {
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

watch(
  matchStore,
  () => {
    wssMatch(matchStore?.socketData)
}, { deep: true, immediate: true })

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
  @media (max-width: 920px) {
    table#etable-header {
      border-bottom: none;
    }
  }

  @media (max-width: 368px) {
    table#etable-header {
      border-bottom: 3px solid #f5f5f5
    }
  }
</style>