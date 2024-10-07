<template>
  <div class="Hft">
    <div class="tabs" v-show="isHaft === 1 || isHaft === 0">
      <span
        class="tab"
        :class="isHaft === 0 ? 'on' : ''"
        @click="isHaft = 0"
        >FT</span
      >
      <span
        class="tab"
        :class="isHaft === 1 ? 'on' : ''"
        @click="isHaft = 1"
        >HT</span
      >
    </div>
  </div>
  <template v-if="activeSection === 'handicap'">
    <table
      class="oTable tl"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="padding: 0px"
    >
      <tbody>
        <tr>
          <th width="20%">Giờ</th>
          <th width="15%">Tỷ số</th>
          <th width="15%">C</th>
          <th width="15%">HDP</th>
          <th width="15%">K</th>
          <th width="20%">Cập nhật</th>
        </tr>
      </tbody>
    </table>
    <table
      class="oTable"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="padding: 0px; margin-bottom: 228px"
    >
      <tbody>
        <template
          v-for="(item, index) in reduceOddsHistoriesMobile(isHaft === 0 ? 
            oddsDetailHistories?.data?.inplay?.filter(
              (item) => item?.type === 1 || item?.type === 6
            ) : 
            oddsDetailHistories?.data?.inplay_haft?.filter(
              (item) => item?.type === 1 || item?.type === 6
            )
          )"
          :key="index"
        >
          <tr>
            <td width="20%" class="red">
              {{ item?.match_time !== "HT" ? item?.match_time + "'" : "HT" }}
            </td>
            <td width="15%" class="">
              {{ item?.home_score }}-{{ item?.away_score }}
            </td>
            <td width="15%" :class="item?.odd1_class">{{ item?.odds1 }}</td>
            <td width="15%" :class="item?.odd2_class">{{ item?.odds2 }}</td>
            <td width="15%" :class="item?.odd3_class">{{ item?.odds3 }}</td>
            <td width="20%" class="p5">
              {{
                timeStamp2DateUTCTimeZone(item?.update_time, "yyyy-MM-DD hh:mm")
              }}
            </td>
          </tr>
        </template>
        <template
          v-for="(item, index) in reduceOddsHistoriesMobile(isHaft === 0 ? 
            oddsDetailHistories?.data?.live?.handicap : oddsDetailHistories?.data?.live_haft?.handicap
          )"
          :key="index"
        >
          <tr>
            <td width="20%" class="red">Live</td>
            <td width="15%" class="">-</td>
            <template v-if="item?.close === false">
              <td width="15%" :class="item?.odd1_class">{{ item?.odds1 }}</td>
              <td width="15%" :class="item?.odd2_class">{{ item?.odds2 }}</td>
              <td width="15%" :class="item?.odd3_class">{{ item?.odds3 }}</td>
            </template>
            <template v-if="item?.close === true">
              <td colspan="3" class="red">Đóng</td>
            </template>
            <td class="lb time">
              {{
                timeStamp2DateUTCTimeZone(item?.update_time, "yyyy-MM-DD hh:mm")
              }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </template>
  <template v-else-if="activeSection === 'overUnder'">
    <table
      class="oTable tl"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="padding: 0px"
    >
      <tbody>
        <tr>
          <th width="20%">Giờ</th>
          <th width="15%">Tỷ số</th>
          <th width="15%">T</th>
          <th width="15%">TX</th>
          <th width="15%">X</th>
          <th width="20%">Cập nhật</th>
        </tr>
      </tbody>
    </table>
    <table
      class="oTable"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="padding: 0px; margin-bottom: 228px"
    >
      <tbody>
        <template
          v-for="(item, index) in reduceOddsHistoriesMobile(isHaft === 0 ? 
            oddsDetailHistories?.data?.inplay?.filter(
              (item) => item?.type === 2 || item?.type === 7
            ) :
            oddsDetailHistories?.data?.inplay_haft?.filter(
              (item) => item?.type === 2 || item?.type === 7
            )
          )"
          :key="index"
        >
          <tr>
            <td width="20%" class="red">
              {{ item?.match_time !== "HT" ? item?.match_time + "'" : "HT" }}
            </td>
            <td width="15%" class="">
              {{ item?.home_score }}-{{ item?.away_score }}
            </td>
            <td width="15%" :class="item?.odd1_class">{{ item?.odds1 }}</td>
            <td width="15%" :class="item?.odd2_class">{{ item?.odds2 }}</td>
            <td width="15%" :class="item?.odd3_class">{{ item?.odds3 }}</td>
            <td width="20%" class="p5">
              {{
                timeStamp2DateUTCTimeZone(item?.update_time, "yyyy-MM-DD hh:mm")
              }}
            </td>
          </tr>
        </template>
        <template
          v-for="(item, index) in reduceOddsHistoriesMobile(isHaft === 0 ? 
            oddsDetailHistories?.data?.live?.overUnder : oddsDetailHistories?.data?.live_haft?.overUnder
          )"
          :key="index"
        >
          <tr>
            <td width="20%" class="red">Live</td>
            <td width="15%" class="">-</td>
            <template v-if="item?.close === false">
              <td width="15%" :class="item?.odd1_class">{{ item?.odds1 }}</td>
              <td width="15%" :class="item?.odd2_class">{{ item?.odds2 }}</td>
              <td width="15%" :class="item?.odd3_class">{{ item?.odds3 }}</td>
            </template>
            <template v-if="item?.close === true">
              <td colspan="3" class="red">Đóng</td>
            </template>
            <td class="lb time">
              {{
                timeStamp2DateUTCTimeZone(item?.update_time, "yyyy-MM-DD hh:mm")
              }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </template>
  <template  v-else-if="activeSection === 'europeOdds'">
    <table
      class="oTable tl"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="padding: 0px"
    >
      <tbody>
        <tr>
          <th width="20%">Giờ</th>
          <th width="15%">Tỷ số</th>
          <th width="15%">C</th>
          <th width="15%">H</th>
          <th width="15%">K</th>
          <th width="20%">Cập nhật</th>
        </tr>
      </tbody>
    </table>
    <table
      class="oTable"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="padding: 0px; margin-bottom: 228px"
    >
      <tbody>
        <template
          v-for="(item, index) in reduceOddsHistoriesMobile(isHaft === 0 ? 
            oddsDetailHistories?.data?.inplay?.filter(
              (item) => item?.type === 4 || item?.type === 5
            ) :
            oddsDetailHistories?.data?.inplay_haft?.filter(
              (item) => item?.type === 4 || item?.type === 5
            )
          )"
          :key="index"
        >
          <tr>
            <td width="20%" class="red">
              {{ item?.match_time !== "HT" ? item?.match_time + "'" : "HT" }}
            </td>
            <td width="15%" class="">
              {{ item?.home_score }}-{{ item?.away_score }}
            </td>
            <td width="15%" :class="item?.odd1_class">{{ item?.odds1 }}</td>
            <td width="15%" :class="item?.odd2_class">{{ item?.odds2 }}</td>
            <td width="15%" :class="item?.odd3_class">{{ item?.odds3 }}</td>
            <td width="20%" class="p5">
              {{
                timeStamp2DateUTCTimeZone(item?.update_time, "yyyy-MM-DD hh:mm")
              }}
            </td>
          </tr>
        </template>
        <template
          v-for="(item, index) in reduceOddsHistoriesMobile(isHaft === 0 ? 
            oddsDetailHistories?.data?.live?.europeOdds : oddsDetailHistories?.data?.live_haft?.europeOdds
          )"
          :key="index"
        >
          <tr>
            <td width="20%" class="red">Live</td>
            <td width="15%" class="">-</td>
            <template v-if="item?.close === false">
              <td width="15%" :class="item?.odd1_class">{{ item?.odds1 }}</td>
              <td width="15%" :class="item?.odd2_class">{{ item?.odds2 }}</td>
              <td width="15%" :class="item?.odd3_class">{{ item?.odds3 }}</td>
            </template>
            <template v-if="item?.close === true">
              <td colspan="3" class="red">Đóng</td>
            </template>
            <td class="lb time">
              {{
                timeStamp2DateUTCTimeZone(item?.update_time, "yyyy-MM-DD hh:mm")
              }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </template>
  <template  v-else-if="activeSection === 'cornertx'">
    <table
      class="oTable tl"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="padding: 0px"
    >
      <tbody>
        <tr>
          <th width="20%">Giờ</th>
          <th width="15%">PHẠT GÓC</th>
          <th width="15%">T</th>
          <th width="15%">TX</th>
          <th width="15%">X</th>
          <th width="20%">Cập nhật</th>
        </tr>
      </tbody>
    </table>
    <table
      class="oTable"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="padding: 0px; margin-bottom: 228px"
    >
      <tbody>
        <template
          v-for="(item, index) in reduceOddsHistoriesCorner(oddsCornerHistories?.data?.inplay)"
          :key="index"
        >
          <tr>
            <td width="20%" class="red">
              {{ item?.match_time ? item?.match_time : '-' }}
            </td>
            <td width="15%" class="">
              -
            </td>
            <td width="15%" :class="item?.odd1_class">{{ item?.over }}</td>
            <td width="15%" :class="item?.odd2_class">{{ item?.total_corners }}</td>
            <td width="15%" :class="item?.odd3_class">{{ item?.under }}</td>
            <td width="20%" class="p5">
              {{
                timeStamp2DateUTCTimeZone(item?.update_time, "yyyy-MM-DD hh:mm")
              }}
            </td>
          </tr>
        </template>
        <template
          v-for="(item, index) in reduceOddsHistoriesCorner(oddsCornerHistories?.data?.live)"
          :key="index"
        >
          <tr>
            <td width="20%" class="red">Live</td>
            <td width="15%" class="">-</td>
            <td width="15%" :class="item?.odd1_class">{{ item?.over }}</td>
            <td width="15%" :class="item?.odd2_class">{{ item?.total_corners }}</td>
            <td width="15%" :class="item?.odd3_class">{{ item?.under }}</td>
            <td class="lb time">
              {{
                timeStamp2DateUTCTimeZone(item?.update_time, "yyyy-MM-DD hh:mm")
              }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </template>
  <template  v-else-if="activeSection === 'correctScore'">
    <table class="oTable tl" width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 0px;">
      <tbody><tr>
          <th width="13%">Giờ</th>
          <th colspan="10">TL</th>
      </tr>
    </tbody>
  </table>
  <table class="oTable bodanTable" width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 0px; margin-bottom: 135px;">
    <tbody>
      <template v-for="(item, index) in oddsCorrectScoreHistory?.data"
      :key="index"
      >
      <tr>
        <td rowspan="4">
          Trực tuyến
          <br>
          {{ timeStamp2DateUTCTimeZone(item?.update_time, "MM-DD") }}
          <br>
          {{ timeStamp2DateUTCTimeZone(item?.update_time, "hh:mm") }}
        </td>
      </tr>
      <tr>
        <td>1:0<br>{{  getOddsCorrectScore(item?.odds, 1, 0) }}</td>
        <td>2:0<br>{{  getOddsCorrectScore(item?.odds, 2, 0) }}</td>
        <td>2:1<br>{{  getOddsCorrectScore(item?.odds, 2, 1) }}</td>
        <td>3:0<br>{{  getOddsCorrectScore(item?.odds, 3, 0) }}</td>
        <td>3:1<br>{{  getOddsCorrectScore(item?.odds, 3, 1) }}</td>
        <td>3:2<br>{{  getOddsCorrectScore(item?.odds, 3, 2) }}</td>
        <td>4:0<br>{{  getOddsCorrectScore(item?.odds, 4, 0) }}</td>
        <td>4:1<br>{{  getOddsCorrectScore(item?.odds, 4, 1) }}</td>
        <td>4:2<br>{{  getOddsCorrectScore(item?.odds, 4, 2) }}</td>
        <td>4:3<br>{{  getOddsCorrectScore(item?.odds, 4, 3) }}</td>
      </tr>
      <tr>
        <td>0:0<br>{{  getOddsCorrectScore(item?.odds, 0, 0) }}</td>
        <td>1:1<br>{{  getOddsCorrectScore(item?.odds, 1, 1) }}</td>
        <td>2:2<br>{{  getOddsCorrectScore(item?.odds, 2, 2) }}</td>
        <td>3:3<br>{{  getOddsCorrectScore(item?.odds, 3, 3) }}</td>
        <td>4:4<br>{{  getOddsCorrectScore(item?.odds, 4, 4) }}</td>
        <td colspan="2" class="">Khác<br>{{ item?.odds?.otherScoresOdds }}</td>
        <td colspan="3"></td>
      </tr>
      <tr>
        <td>0:1<br>{{  getOddsCorrectScore(item?.odds, 0, 1) }}</td>
        <td>0:2<br>{{  getOddsCorrectScore(item?.odds, 0, 2) }}</td>
        <td>1:2<br>{{  getOddsCorrectScore(item?.odds, 1, 2) }}</td>
        <td>0:3<br>{{  getOddsCorrectScore(item?.odds, 0, 3) }}</td>
        <td>1:3<br>{{  getOddsCorrectScore(item?.odds, 1, 3) }}</td>
        <td>2:3<br>{{  getOddsCorrectScore(item?.odds, 2, 3) }}</td>
        <td>0:4<br>{{  getOddsCorrectScore(item?.odds, 0, 4) }}</td>
        <td>1:4<br>{{  getOddsCorrectScore(item?.odds, 1, 4) }}</td>
        <td>2:4<br>{{  getOddsCorrectScore(item?.odds, 2, 4) }}</td>
        <td>3:4<br>{{  getOddsCorrectScore(item?.odds, 3, 4) }}</td>
      </tr>
      </template>
    </tbody>
  </table>
  </template>
  <template v-if="activeSection === 'euroHandicap'">
    <table
      class="oTable tl"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="padding: 0px"
    >
      <tbody>
        <tr>
          <th width="20%">Giờ</th>
          <th width="15%">HANDICAP</th>
          <th width="15%">1</th>
          <th width="15%">X</th>
          <th width="15%">2</th>
          <th width="20%">Cập nhật</th>
        </tr>
      </tbody>
    </table>
    <table
      class="oTable"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="padding: 0px; margin-bottom: 228px"
    >
      <tbody>
        <template
          v-for="(item, index) in reduceOddsHistoriesEuroHandicap(oddsEuropeanHistory?.data)"
          :key="index"
        >
          <tr>
            <td width="20%">
              Trực tuyến
            </td>
            <td width="15%" class="">
              {{ item?.handicap }}
            </td>
            <td width="15%" :class="item?.odd1_class">{{ item?.home }}</td>
            <td width="15%" :class="item?.odd2_class">{{ item?.draw }}</td>
            <td width="15%" :class="item?.odd3_class">{{ item?.away }}</td>
            <td width="20%" class="p5">
              {{
                timeStamp2DateUTCTimeZone(item?.update_time, "yyyy-MM-DD hh:mm")
              }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </template>
  <template v-if="activeSection === 'doubleChance'">
    <table
      class="oTable tl"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="padding: 0px"
    >
      <tbody>
        <tr>
          <th width="20%">Giờ</th>
          <th width="15%">1/X</th>
          <th width="15%">1/2</th>
          <th width="15%">X/2</th>
          <th width="20%">Cập nhật</th>
        </tr>
      </tbody>
    </table>
    <table
      class="oTable"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="padding: 0px; margin-bottom: 228px"
    >
      <tbody>
        <template
          v-for="(item, index) in reduceOddsHistoriesDoubeChance(oddsDoubleChangeHistory?.data)"
          :key="index"
        >
          <tr>
            <td width="20%">
              Trực tuyến
            </td>
            <td width="15%" :class="item?.odd1_class">{{ getOddNumberToNegativeTX(item?.odds?.home_draw) }}</td>
            <td width="15%" :class="item?.odd2_class">{{ getOddNumberToNegativeTX(item?.odds?.home_away) }}</td>
            <td width="15%" :class="item?.odd3_class">{{ getOddNumberToNegativeTX(item?.odds?.draw_away) }}</td>
            <td width="20%" class="p5">
              {{
                timeStamp2DateUTCTimeZone(item?.update_time, "yyyy-MM-DD hh:mm")
              }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </template>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import moment from 'moment-timezone';

const route = useRoute();

const props = defineProps<{
  oddCompId: any;
  matchId: any;
  section: any;
  oddCompanysList: [];
  isHaft: any;
}>();

const isHaft = ref(props?.isHaft ? props.isHaft : 0);
const oddsDetail = ref();
const matchIdSlug = ref("");
const activeSection = ref(props?.section ? props?.section : "handicap");
const oCompanySelected = ref(
  useCookie<any>("oCompanyOddSelected").value
    ? useCookie<any>("oCompanyOddSelected").value
    : []
);
const oCompList = ref([]);
const oddsList = ref([]);
const oddCompanys = ref([]);
const oddCompanysList = ref([]);
ODD_COMPANYS.forEach((item) => {
  oddCompanysList.value[item?.id] = item;
  oCompList.value[item?.id] = oCompanySelected.value.includes(item?.id)
    ? true
    : false;
});

const oddCompanyName = ref();
const oddsDetailHistories = ref([]);
const oddsCornerHistories = ref([]);
const oddCompanyId = ref();
const oddsEuroHadicap = ref([]);
const oddsCorrectScoreHistory = ref([])
const oddsEuropeanHistory = ref([])
const oddsDoubleChangeHistory = ref([])

function setActiveSection(section) {
  activeSection.value = section;
}
const statedetailwin = reactive({
  modal_detail_win: null,
});

const openModalDetailChange = async (companyId, companyName) => {
  oddCompanyId.value = companyId;
  oddCompanyName.value = companyName;

  await fetchOddsChangeHistory(companyId);
  statedetailwin.modal_detail_win.show();
};

function closeModalDetailWin() {
  statedetailwin.modal_detail_win.hide();
}
const statefiltercomp = reactive({
  modal_filter_comp: null,
});

function openModaFilterComp() {
  statefiltercomp.modal_filter_comp.show();
}
function closeModalFilterComp() {
  statefiltercomp.modal_filter_comp.hide();
}

const fetchOddsChangeHistory = async (isportsapi_id) => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_CHANGE_HISTORY, {
    match_id: props?.matchId,
    i_company_id: isportsapi_id,
  }).then((resData) => {
    oddsDetailHistories.value = resData;
  });
};

const fetchOdds = async (matchIdSlug) => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.ODDS_DETAIL + "?match_id=" + props?.matchId
  ).then(async (resData) => {
    oddsList.value = getDataObjectByList(resData);
    const oddCompanysList = [];
    ODD_COMPANYS?.forEach((item) => {
      oddCompanysList[item?.isportsapi] = [];
      oddCompanysList[item?.isportsapi].id = item?.id;
      oddCompanysList[item?.isportsapi].isportsapi = item?.isportsapi;
      oddCompanysList[item?.isportsapi].name = item?.name;
      oddCompanysList[item?.isportsapi].handicap = [];
      oddCompanysList[item?.isportsapi]["handicap"].first =
        oddsList.value?.find(
          (odd) =>
            odd.i_company_id === item?.isportsapi && odd.type === "handicap"
        )?.initial;
      oddCompanysList[item?.isportsapi]["handicap"].live = oddsList.value?.find(
        (odd) =>
          odd.i_company_id === item?.isportsapi && odd.type === "handicap"
      )?.instant;
      oddCompanysList[item?.isportsapi]["handicap"].run = oddsList.value?.find(
        (odd) =>
          odd.i_company_id === item?.isportsapi && odd.type === "handicap"
      )?.inplay;

      oddCompanysList[item?.isportsapi].europeOdds = [];
      oddCompanysList[item?.isportsapi]["europeOdds"].first =
        oddsList.value?.find(
          (odd) =>
            odd.i_company_id === item?.isportsapi && odd.type === "europeOdds"
        )?.initial;
      oddCompanysList[item?.isportsapi]["europeOdds"].live =
        oddsList.value?.find(
          (odd) =>
            odd.i_company_id === item?.isportsapi && odd.type === "europeOdds"
        )?.instant;
      oddCompanysList[item?.isportsapi]["europeOdds"].run =
        oddsList.value?.find(
          (odd) =>
            odd.i_company_id === item?.isportsapi && odd.type === "europeOdds"
        )?.inplay;

      oddCompanysList[item?.isportsapi].overUnder = [];
      oddCompanysList[item?.isportsapi]["overUnder"].first =
        oddsList.value?.find(
          (odd) =>
            odd.i_company_id === item?.isportsapi && odd.type === "overUnder"
        )?.initial;
      oddCompanysList[item?.isportsapi]["overUnder"].live =
        oddsList.value?.find(
          (odd) =>
            odd.i_company_id === item?.isportsapi && odd.type === "overUnder"
        )?.instant;
      oddCompanysList[item?.isportsapi]["overUnder"].run = oddsList.value?.find(
        (odd) =>
          odd.i_company_id === item?.isportsapi && odd.type === "overUnder"
      )?.inplay;

      if (
        typeof oddCompanysList[item?.isportsapi]["handicap"].first ===
          "undefined" &&
        typeof oddCompanysList[item?.isportsapi]["handicap"].live ===
          "undefined" &&
        typeof oddCompanysList[item?.isportsapi]["handicap"].run ===
          "undefined" &&
        typeof oddCompanysList[item?.isportsapi]["europeOdds"].first ===
          "undefined" &&
        typeof oddCompanysList[item?.isportsapi]["europeOdds"].live ===
          "undefined" &&
        typeof oddCompanysList[item?.isportsapi]["europeOdds"].run ===
          "undefined" &&
        typeof oddCompanysList[item?.isportsapi]["overUnder"].first ===
          "undefined" &&
        typeof oddCompanysList[item?.isportsapi]["overUnder"].live ===
          "undefined" &&
        typeof oddCompanysList[item?.isportsapi]["overUnder"].run ===
          "undefined"
      ) {
        oddCompanysList[item?.isportsapi].isEmpty = true;
      }
    });

    oddCompanys.value = oddCompanysList;
  });
};

const fetchOddsEuroHadicap = async (matchIdSlug) => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.ODDS_EUROHADICAP + "?match_id=" + props?.matchId
  ).then(async (resData) => {
    oddsEuroHadicap.value = resData?.data;
  });
};

const fetchOddsCornerChangeHistory = async (isportsapi_id) => {
  await useApiLiveScore(isHaft.value === 0 ? API_ROUTERS.LIVESCORE.ODDS_CONNER_HISTORY_FULL : API_ROUTERS.LIVESCORE.ODDS_CONNER_HISTORY_HAFT, {
    match_id: props?.matchId,
    i_company_id: isportsapi_id,
  }).then((resData) => {
    oddsCornerHistories.value = resData;
  });
};

const fetchOddsCorrectScoreHistory = async (isportsapi_id) => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.ODDS_CORRECT_SCORE_HISTORY, {
    match_id: matchIdSlug.value,
    i_company_id: isportsapi_id,
  }).then((resData) => {
    oddsCorrectScoreHistory.value = resData;
  });
};

const fetchOddsEuropeanHistory = async (isportsapi_id) => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.ODDS_EURO_HANDICAP_HISTORY, {
    match_id: matchIdSlug.value,
    i_company_id: isportsapi_id,
  }).then((resData) => {
    oddsEuropeanHistory.value = resData;
  });
};

const fetchOddsDoubleChangeHistory = async (isportsapi_id) => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.ODDS_DOUBLE_CHANCE_HISTORY, {
    match_id: matchIdSlug.value,
    i_company_id: isportsapi_id,
  }).then((resData) => {
    oddsDoubleChangeHistory.value = resData;
  });
};


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
  () => {
    isHaft.value = route.query?.haft == 1 ? true : false;
  },
  { immediate: true }
);

watch(
  props,
  () => {
    isHaft.value = props?.isHaft
  },
  { immediate: true }
);

watch(
  ([() => route.query, isHaft]),
  () => {
    if (activeSection.value !== 'cornertx') {
      const europeOdds = (route.query?.haft == 1 || isHaft.value === 1) ? "europeanHaft" : "europeOdds"
      const handicap = (route.query?.haft == 1 || isHaft.value === 1) ? "handicapHalf" : "handicap"
      const overUnder =(route.query?.haft == 1 || isHaft.value === 1) ? "overUnderHalf" : "overUnder"

      const oddCompanysList = [];
      ODD_COMPANYS?.forEach((item) => {
        oddCompanysList[item?.isportsapi] = [];
        oddCompanysList[item?.isportsapi].id = item?.id;
        oddCompanysList[item?.isportsapi].name = item?.name;
        oddCompanysList[item?.isportsapi].isportsapi = item?.isportsapi
        oddCompanysList[item?.isportsapi].handicap = [];
        oddCompanysList[item?.isportsapi]["handicap"].first =
          oddsList.value?.find(
            (odd) =>
              odd.i_company_id === item?.isportsapi && odd.type === handicap
          )?.initial;
        oddCompanysList[item?.isportsapi]["handicap"].live = oddsList.value?.find(
          (odd) => odd.i_company_id === item?.isportsapi && odd.type === handicap
        )?.instant;
        oddCompanysList[item?.isportsapi]["handicap"].run = oddsList.value?.find(
          (odd) => odd.i_company_id === item?.isportsapi && odd.type === handicap
        )?.inplay;

        oddCompanysList[item?.isportsapi].europeOdds = [];
        oddCompanysList[item?.isportsapi]["europeOdds"].first =
          oddsList.value?.find(
            (odd) =>
              odd.i_company_id === item?.isportsapi && odd.type === europeOdds
          )?.initial;
        oddCompanysList[item?.isportsapi]["europeOdds"].live =
          oddsList.value?.find(
            (odd) =>
              odd.i_company_id === item?.isportsapi && odd.type === europeOdds
          )?.instant;
        oddCompanysList[item?.isportsapi]["europeOdds"].run =
          oddsList.value?.find(
            (odd) =>
              odd.i_company_id === item?.isportsapi && odd.type === europeOdds
          )?.inplay;

        oddCompanysList[item?.isportsapi].overUnder = [];
        oddCompanysList[item?.isportsapi]["overUnder"].first =
          oddsList.value?.find(
            (odd) =>
              odd.i_company_id === item?.isportsapi && odd.type === overUnder
          )?.initial;
        oddCompanysList[item?.isportsapi]["overUnder"].live =
          oddsList.value?.find(
            (odd) =>
              odd.i_company_id === item?.isportsapi && odd.type === overUnder
          )?.instant;
        oddCompanysList[item?.isportsapi]["overUnder"].run = oddsList.value?.find(
          (odd) => odd.i_company_id === item?.isportsapi && odd.type === overUnder
        )?.inplay;

        if (
          typeof oddCompanysList[item?.isportsapi]["handicap"].first ===
            "undefined" &&
          typeof oddCompanysList[item?.isportsapi]["handicap"].live ===
            "undefined" &&
          typeof oddCompanysList[item?.isportsapi]["handicap"].run ===
            "undefined" &&
          typeof oddCompanysList[item?.isportsapi]["europeOdds"].first ===
            "undefined" &&
          typeof oddCompanysList[item?.isportsapi]["europeOdds"].live ===
            "undefined" &&
          typeof oddCompanysList[item?.isportsapi]["europeOdds"].run ===
            "undefined" &&
          typeof oddCompanysList[item?.isportsapi]["overUnder"].first ===
            "undefined" &&
          typeof oddCompanysList[item?.isportsapi]["overUnder"].live ===
            "undefined" &&
          typeof oddCompanysList[item?.isportsapi]["overUnder"].run ===
            "undefined"
        ) {
          oddCompanysList[item?.isportsapi].isEmpty = true;
        }
      });

      oddCompanys.value = oddCompanysList;
    }
  },
  { immediate: true }
);


watch(
  isHaft,
  async () => {
    if (activeSection.value === 'cornertx') {
      await fetchOddsCornerChangeHistory(oddCompanyId.value);
    } 
  },
  { immediate: true }
);


watch(props, async () => {
  oddCompanyId.value = props?.oddCompId;
  //oddCompanys.value = props?.oddCompanysList
  activeSection.value = props?.section;

  if (activeSection.value === 'handicap' || activeSection.value === 'overUnder' || activeSection.value === 'europeOdds') {
    await fetchOddsChangeHistory(oddCompanyId.value);
    await fetchOddsEuroHadicap(oddCompanyId.value);
    await fetchOdds(oddCompanyId.value);
  } else if (activeSection.value === 'cornertx') {
    await fetchOddsCornerChangeHistory(oddCompanyId.value);
  } else if (activeSection.value === 'correctScore') {
    await fetchOddsCorrectScoreHistory(oddCompanyId.value);
  } else if (activeSection.value === 'euroHandicap') {
    await fetchOddsEuropeanHistory(oddCompanyId.value);
  } else if (activeSection.value === 'doubleChance') {
    await fetchOddsDoubleChangeHistory(oddCompanyId.value);
  }  
  
});

onMounted(async () => {
  // statefiltercomp.modal_filter_comp = new bootstrap.Modal(
  //   "#modal_filter_comp",
  //   {}
  // );
  // statedetailwin.modal_detail_win = new bootstrap.Modal(
  //   "#modal_detail_win",
  //   {}
  // );
});
</script>
<style scoped>
@import url("~/assets/css/detail_mobile.scss");
@import url("~/assets/css/match_odds.scss");
@import url("~/assets/css/league.scss");
</style>
<style></style>
