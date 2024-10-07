<template>
  <div id="oddsMenu" class="match-odds-menu">
    <div class="d-flex">
      <span class="tab"
        :class="{ on: activeSection === 'allLive' }"
        @click="setActiveSection('allLive')"
        >{{ $t('All Odd') }}
      </span>
      <span class="tab"
        :class="{ on: activeSection === 'ahDetail' }"
        @click="setActiveSection('ahDetail')"
        >{{ $t('3in1 Odd') }}</span
      >
      <span class="tab"
        :class="{ on: activeSection === 'cornertx' }"
        @click="setActiveSection('cornertx')"
        >{{ $t('Corner Odd T/X') }}</span
      >
      <span class="tab"
        :class="{ on: activeSection === 'correctScore' }"
        @click="setActiveSection('correctScore')"
        >{{ $t('Correct Score') }}</span
      >
      <span class="tab"
        :class="{ on: activeSection === 'handicapDetail' }"
        @click="setActiveSection('handicapDetail')"
        >{{ $t('Euro Handicap') }}</span
      >
      <span class="tab"
        :class="{ on: activeSection === 'doubleChance' }"
        @click="setActiveSection('doubleChance')"
        >{{ $t('Double Chance') }}</span
      >
    </div>
    <div
        id="ftTabsBox"
        class="tabsBox"
        v-show="activeSection === 'ahDetail' || activeSection === 'correctDetail' || activeSection === 'cornertx'"
      >
        <div id="winFTBtn" class="item" :class="!isHaft ? 'on' : ''">
          <span class="tab" @click="isHaft = false">FT</span>
        </div>
        <div id="winHTBtn" class="item" :class="isHaft ? 'on' : ''">
          <span class="tab" @click="isHaft = true">HT</span>
        </div>
      </div>
  </div>
  <div id="detailtable" class="detailtable">
    <div class="alllive" id="allLive" v-show="activeSection === 'allLive'">
      <div class="title">{{ $t('Hadicap Odd') }}</div>
      <table id="ahLive" class="team-table-other text-center" width="100%">
        <tbody>
          <tr class="flexed">
            <th width="30%" class="rb">{{ $t('Home') }}</th>
            <th width="30%" class="rb">{{ $t('HDP') }}</th>
            <th width="30%">{{ $t('Away') }}</th>
          </tr>
          <tr class="tb-bgcolor1">
            <td class="rb">
              <span>{{
                getOddNumberToNegative(
                  oddCompanys?.find((item) => item?.isportsapi === oddCompanyId)
                    ?.handicap?.run?.[1]
                )
              }}</span>
            </td>
            <td class="rb">
              <span>{{
                getOddNumberToNegative(
                  oddCompanys?.find((item) => item?.isportsapi === oddCompanyId)
                    ?.handicap?.run?.[0]
                )
              }}</span>
            </td>
            <td>
              <span>{{
                getOddNumberToNegative(
                  oddCompanys?.find((item) => item?.isportsapi === oddCompanyId)
                    ?.handicap?.run?.[2]
                )
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="title">{{ $t('Over/Under Odd') }}</div>
      <table id="ouLive" class="team-table-other text-center" width="100%">
        <tbody>
          <tr>
            <th width="30%" class="rb">{{ $t('Over') }}</th>
            <th width="30%" class="rb">{{ $t('Odd') }}</th>
            <th width="30%">{{ $t('Under') }}</th>
          </tr>
          <tr class="tb-bgcolor1">
            <td class="rb">
              <span>{{
                getOddNumberToNegative(
                  oddCompanys?.find((item) => item?.isportsapi === oddCompanyId)
                    ?.overUnder?.run?.[1]
                )
              }}</span>
            </td>
            <td class="rb">
              <span>{{
                getOddNumberToNegative(
                  oddCompanys?.find((item) => item?.isportsapi === oddCompanyId)
                    ?.overUnder?.run?.[0]
                )
              }}</span>
            </td>
            <td>
              <span>{{
                getOddNumberToNegative(
                  oddCompanys?.find((item) => item?.isportsapi === oddCompanyId)
                    ?.overUnder?.run?.[2]
                )
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="title">1X2</div>
      <table id="opLive" class="team-table-other text-center" width="100%">
        <tbody>
          <tr>
            <th width="30%" class="rb">{{ $t('Home') }}</th>
            <th width="30%" class="rb">{{ $t('Draw') }}</th>
            <th width="30%">{{ $t('Away') }}</th>
          </tr>
          <tr class="tb-bgcolor1">
            <td class="rb">
              <span>{{
                getOddNumber(
                  oddCompanys?.find((item) => item?.isportsapi === oddCompanyId)
                    ?.europeOdds?.run?.[0]
                )
              }}</span>
            </td>
            <td class="rb">
              <span>{{
                getOddNumber(
                  oddCompanys?.find((item) => item?.isportsapi === oddCompanyId)
                    ?.europeOdds?.run?.[1]
                )
              }}</span>
            </td>
            <td>
              <span>{{
                getOddNumber(
                  oddCompanys?.find((item) => item?.isportsapi === oddCompanyId)
                    ?.europeOdds?.run?.[2]
                )
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="title" style="display: none">{{ $t('Correct Score') }}</div>
      <table
        id="bodanLive"
        class="team-table-other text-center"
        width="100%"
        style="display: none"
      >
        <tbody>
          <tr>
            <th width="10%" class="rb">{{ $t('Type') }}</th>
            <th colspan="10">TL</th>
          </tr>
          <tr class="tb-bgcolor1">
            <td class="rb">{{ $t('Home') }}</td>
            <td class="rb">
              <span>1:0</span>
              <span>6.9</span>
            </td>
            <td class="rb">
              <span>2:0</span>
              <span>5.8</span>
            </td>
            <td class="rb">
              <span>2:1</span>
              <span>7.4</span>
            </td>
            <td class="rb">
              <span>3:0</span>
              <span>7.8</span>
            </td>
            <td class="rb">
              <span>3:1</span>
              <span>10</span>
            </td>
            <td class="rb">
              <span>3:2</span>
              <span>25</span>
            </td>
            <td class="rb">
              <span>4:0</span>
              <span>14</span>
            </td>
            <td class="rb">
              <span>4:1</span>
              <span>17.5</span>
            </td>
            <td class="rb">
              <span>4:2</span>
              <span>43</span>
            </td>
            <td>
              <span>4:3</span>
              <span>159</span>
            </td>
          </tr>
          <tr class="tb-bgcolor1">
            <td class="rb">{{ $t('Draw') }}</td>
            <td class="rb">
              <span>0:0</span>
              <span>17.5</span>
            </td>
            <td class="rb">
              <span>1:1</span>
              <span>8.8</span>
            </td>
            <td class="rb">
              <span>2:2</span>
              <span>19</span>
            </td>
            <td class="rb">
              <span>3:3</span>
              <span>84</span>
            </td>
            <td class="rb">
              <span>4:4</span>
              <span>219</span>
            </td>
            <td class="rb">
              <span>{{ $t('Other') }}</span>
              <span>8.2</span>
            </td>
            <td class="no-bd-lr"></td>
            <td class="no-bd-lr"></td>
            <td class="no-bd-lr"></td>
            <td class="no-bd-lr"></td>
          </tr>
          <tr class="tb-bgcolor1">
            <td class="rb">{{ $t('Away') }}</td>
            <td class="rb">
              <span>0:1</span>
              <span>21</span>
            </td>
            <td class="rb">
              <span>0:2</span>
              <span>54</span>
            </td>
            <td class="rb">
              <span>1:2</span>
              <span>22</span>
            </td>
            <td class="rb">
              <span>0:3</span>
              <span>199</span>
            </td>
            <td class="rb">
              <span>1:3</span>
              <span>84</span>
            </td>
            <td class="rb">
              <span>2:3</span>
              <span>74</span>
            </td>
            <td class="rb">
              <span>0:4</span>
              <span>224</span>
            </td>
            <td class="rb">
              <span>1:4</span>
              <span>224</span>
            </td>
            <td class="rb">
              <span>2:4</span>
              <span>209</span>
            </td>
            <td>
              <span>3:4</span>
              <span>219</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="title" style="display: none">{{ $t('Double Chance') }}</div>
      <table
        id="doubleLive"
        class="team-table-other text-center"
        width="100%"
        style="display: none"
      >
        <tbody>
          <tr>
            <th width="25%" class="rb">1X</th>
            <th width="25%" class="rb">12</th>
            <th width="25%">X2</th>
          </tr>
          <tr class="tb-bgcolor1">
            <td class="rb">
              <span>0.07</span>
            </td>
            <td class="rb">
              <span>0.14</span>
            </td>
            <td>
              <span>-0.52</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="ahdetail row ps-2" id="ahDetail" v-show="activeSection === 'ahDetail'">
      <table id="ahdetail " class="col-sm-12 col-md-4 threemix-table team-table-other text-center mb-3">
        <tbody>
          <tr class="flexed">
            <th colspan="6" class="no-bd-lr">{{ $t('Hadicap Odd') }}</th>
          </tr>
          <tr class="flexed1">
            <th class="no-bd-lr">
              <i class="icon iconfont icon-font-time"></i>
            </th>
            <th class="no-bd-lr">
              <i class="icon iconfont icon-font-footballclass fb"></i>
            </th>
            <th class="no-bd-lr">{{ $t('Home') }}</th>
            <th class="no-bd-lr">{{ $t('HDP') }}</th>
            <th class="no-bd-lr">{{ $t('Away') }}</th>
            <th class="no-bd-lr">{{ $t('Update') }}</th>
          </tr>
          <template
            v-for="(item, index) in reduceOddsHistories(
              isHaft === false ?
              oddsDetailHistories?.data?.inplay?.filter((item) => item?.type === 1 || item?.type === 6) : oddsDetailHistories?.data?.inplay_haft?.filter((item) => item?.type === 1 || item?.type === 6) 
            )"
            :key="index"
          >
            <tr>
              <td class="bd-r">
                {{ item?.match_time !== "HT" ? item?.match_time + "'" : "HT" }}
              </td>
              <td class="bd-r">
                {{ item?.home_score }}-{{ item?.away_score }}
              </td>
              <template v-if="item?.type === 1">
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd1_class">{{ item?.odds1 }}</span>
                </td>
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd2_class">{{ item?.odds2 }}</span>
                </td>
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd3_class">{{ item?.odds3 }}</span>
                </td>
              </template>
              <template v-if="item?.type === 6">
                <td colspan="3" class="red">{{ $t('Close') }}</td>
              </template>
              <td class="lb time">
                {{
                  timeStamp2DateUTCTimeZone(
                    item?.update_time,
                    "yyyy-MM-DD hh:mm",
                    timeZone
                  )
                }}
              </td>
            </tr>
          </template>
          <template
            v-for="(item, index) in reduceOddsHistories(isHaft === false ? oddsDetailHistories?.data?.live?.handicap : oddsDetailHistories?.data?.live_haft?.handicap)"
            :key="index"
          >
            <tr>
              <td class="bd-r">
                {{ $t('Live') }}
              </td>
              <td class="bd-r">
                
              </td>
              <template v-if="item?.close === false">
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd1_class">{{ item?.odds1 }}</span>
                </td>
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd2_class">{{ item?.odds2 }}</span>
                </td>
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd3_class">{{ item?.odds3 }}</span>
                </td>
              </template>
              <template v-if="item?.close === true">
                <td colspan="3" class="red">{{ $t('Live') }}</td>
              </template>
              <td class="lb time">
                {{
                  timeStamp2DateUTCTimeZone(
                    item?.update_time,
                    "yyyy-MM-DD hh:mm",
                    timeZone
                  )
                }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <table id="oudetail" class="col-sm-12 col-md-4 threemix-table team-table-other text-center mb-3">
        <tbody>
          <tr class="flexed">
            <th colspan="6" class="no-bd-lr">{{ $t('Over/Under Odd') }}</th>
          </tr>
          <tr class="flexed1">
            <th class="no-bd-lr">
              <i class="icon iconfont icon-font-time"></i>
            </th>
            <th class="no-bd-lr">
              <i class="icon iconfont icon-font-footballclass fb"></i>
            </th>
            <th class="no-bd-lr">{{ $t('Over') }}</th>
            <th class="no-bd-lr">{{ $t('Odd') }}</th>
            <th class="no-bd-lr">{{ $t('Under') }}</th>
            <th class="no-bd-lr">{{ $t('Update') }}</th>
          </tr>
          <template
            v-for="(item, index) in reduceOddsHistories(isHaft === false ?
              oddsDetailHistories?.data?.inplay?.filter((item) => item?.type === 2 || item?.type === 7) : oddsDetailHistories?.data?.inplay_haft?.filter((item) => item?.type === 2 || item?.type === 7)
            )"
            :key="index"
          >
            <tr>
              <td class="bd-r">
                {{ item?.match_time !== "HT" ? item?.match_time + "'" : "HT" }}
              </td>
              <td class="bd-r">
                {{ item?.home_score }}-{{ item?.away_score }}
              </td>
              <template v-if="item?.type === 2">
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd1_class">{{ getOddNumberToNegative(item?.odds1) }}</span>
                </td>
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd2_class">{{ item?.odds2 }}</span>
                </td>
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd3_class">{{ getOddNumberToNegative(item?.odds3) }}</span>
                </td>
              </template>
              <template v-if="item?.type === 7">
                <td colspan="3" class="red">{{ $t('Close') }}</td>
              </template>
              <td class="lb time">
                {{
                  timeStamp2DateUTCTimeZone(
                    item?.update_time,
                    "yyyy-MM-DD hh:mm",
                    timeZone
                  )
                }}
              </td>
            </tr>
          </template>
          <template
            v-for="(item, index) in reduceOddsHistories(oddsDetailHistories?.data?.live?.overUnder)"
            :key="index"
          >
            <tr>
              <td class="bd-r">
                {{ $t('Live') }}
              </td>
              <td class="bd-r">
                
              </td>
              <template v-if="item?.close === false">
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd1_class">{{ getOddNumberToNegative(item?.odds1) }}</span>
                </td>
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd2_class">{{ getOddNumberToNegative(item?.odds2) }}</span>
                </td>
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd3_class">{{ getOddNumberToNegative(item?.odds3) }}</span>
                </td>
              </template>
              <template v-if="item?.close === true">
                <td colspan="3" class="red">{{ $t('Close') }}</td>
              </template>
              <td class="lb time">
                {{
                  timeStamp2DateUTCTimeZone(
                    item?.update_time,
                    "yyyy-MM-DD hh:mm",
                    timeZone
                  )
                }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <table id="opdetail" class="col-sm-12 col-md-4 threemix-table team-table-other text-center mb-3">
        <tbody>
          <tr class="flexed">
            <th colspan="6" class="no-bd-lr">{{ $t('1X2') }}</th>
          </tr>
          <tr class="flexed1">
            <th class="no-bd-lr">
              <i class="icon iconfont icon-font-time"></i>
            </th>
            <th class="no-bd-lr">
              <i class="icon iconfont icon-font-footballclass fb"></i>
            </th>
            <th class="no-bd-lr">{{ $t('Home') }}</th>
            <th class="no-bd-lr">{{ $t('Draw') }}</th>
            <th class="no-bd-lr">{{ $t('Away') }}</th>
            <th class="no-bd-lr">{{ $t('Update') }}</th>
          </tr>
          <template
            v-for="(item, index) in reduceOddsHistories(oddsDetailHistories?.data?.inplay?.filter(
              (item) => item?.type === 4 || item?.type === 5
            ))"
            :key="index"
          >
            <tr>
              <td class="bd-r">
                {{ item?.match_time !== "HT" ? item?.match_time + "'" : "HT" }}
              </td>
              <td class="bd-r">
                {{ item?.home_score }}-{{ item?.away_score }}
              </td>
              <template v-if="item?.type === 4">
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd1_class">{{ item?.odds1 }}</span>
                </td>
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd2_class">{{ item?.odds2 }}</span>
                </td>
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd3_class">{{ item?.odds3 }}</span>
                </td>
              </template>
              <template v-if="item?.type === 5">
                <td colspan="3" class="red">{{ $t('Close') }}</td>
              </template>
              <td class="lb time">
                {{
                  timeStamp2DateUTCTimeZone(
                    item?.update_time,
                    "yyyy-MM-DD hh:mm",
                    timeZone
                  )
                }}
              </td>
            </tr>
          </template>
          <template
            v-for="(item, index) in reduceOddsHistories(oddsDetailHistories?.data?.live?.europeOdds)"
            :key="index"
          >
            <tr>
              <td class="bd-r">
                {{ $t('Live') }}
              </td>
              <td class="bd-r">
                
              </td>
              <template v-if="item?.close === false">
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd1_class">{{ item?.odds1 }}</span>
                </td>
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd2_class">{{ item?.odds2 }}</span>
                </td>
                <td class="no-bd-lr">
                  <span data-o="" :class="item?.odd3_class">{{ item?.odds3 }}</span>
                </td>
              </template>
              <template v-if="item?.close === true">
                <td colspan="3" class="red">{{ $t('Close') }}</td>
              </template>
              <td class="lb time">
                {{
                  timeStamp2DateUTCTimeZone(
                    item?.update_time,
                    "yyyy-MM-DD hh:mm",
                    timeZone
                  )
                }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div
      class="correctdetail"
      id="correctDetail"
      v-show="activeSection === 'cornertx'"
    >
      <table class="team-table-other text-center" width="100%">
        <tbody>
          <tr class="flexed">
            <th width="16%">{{ $t('Hour') }}</th>
            <th width="16%">{{ $t('Corner kick') }}</th>
            <th width="16%">{{ $t('Over') }}</th>
            <th width="16%">{{ $t('Corner kick') }}</th>
            <th width="16%">{{ $t('Under') }}</th>
            <th width="20%">{{ $t('Update') }}</th>
          </tr>
          <template
            v-for="(item, index) in reduceOddsHistoriesCorner(oddsCornerHistories?.data?.inplay)"
            :key="index"
          >
            <tr>
              <td width="20%" class="">
                {{ item?.match_time ? item?.match_time : '-' }}
              </td>
              <td width="15%" class="">
                -
              </td>
              <td width="15%" :class="item?.odd1_class">{{ item?.over }}</td>
              <td width="15%" :class="item?.odd2_class">{{ item?.total_corners }}</td>
              <td width="15%" :class="item?.odd3_class">{{ item?.under }}</td>
              <td width="20%" class="lb time">
                {{
                  timeStamp2DateUTCTimeZone(item?.update_time, "yyyy-MM-DD hh:mm", timeZone)
                }}
              </td>
            </tr>
          </template>
          <template
            v-for="(item, index) in reduceOddsHistoriesCorner(oddsCornerHistories?.data?.live)"
            :key="index"
          >
            <tr>
              <td width="20%" class="red">
                Live
              </td>
              <td width="15%" class="">
                -
              </td>
              <td width="15%" :class="item?.odd1_class">{{ item?.over }}</td>
              <td width="15%" :class="item?.odd2_class">{{ item?.total_corners }}</td>
              <td width="15%" :class="item?.odd3_class">{{ item?.under }}</td>
              <td width="20%" class="lb time">
                {{
                  timeStamp2DateUTCTimeZone(item?.update_time, "yyyy-MM-DD HH:mm", timeZone)
                }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div
      class="handicapdetail"
      id="handicapDetail"
      v-show="activeSection === 'handicapDetail'"
    >
      <table class="team-table-other text-center" width="100%">
        <tbody>
          <tr class="flexed">
            <th width="16%">{{ $t('Home') }}</th>
            <th width="16%">{{ $t('HDP') }}</th>
            <th width="16%">{{ $t('Home') }}</th>
            <th width="16%">{{ $t('Draw') }}</th>
            <th width="16%">{{ $t('Away') }}</th>
            <th width="20%">{{ $t('Update') }}</th>
          </tr>
          <template
            v-for="(item, index) in reduceOddsHistoriesEuroHandicap(oddsEuropeanHistory?.data)"
            :key="index"
          >
            <tr>
              <td width="20%">
                {{ $t('Live') }}
              </td>
              <td width="15%" class="">
                {{ item?.handicap }}
              </td>
              <td width="15%" :class="item?.odd1_class">{{ item?.home }}</td>
              <td width="15%" :class="item?.odd2_class">{{ item?.draw }}</td>
              <td width="15%" :class="item?.odd3_class">{{ item?.away }}</td>
              <td width="20%" class="p5">
                {{
                  timeStamp2DateUTCTimeZone(item?.update_time, "yyyy-MM-DD HH:mm", timeZone)
                }}
              </td>
            </tr>
          </template>
          <tr>
            <td class="rb">-</td>
            <td class="rb">-</td>
            <td>
              <span class="" data-o="1.05">-</span>
            </td>
            <td>
              <span class="" data-o="2.75">-</span>
            </td>
            <td>
              <span class="" data-o="1.75">-</span>
            </td>
            <td
              class="lb time"
              name="timeData"
            >
              -
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="handicapdetail"
      v-show="activeSection === 'correctScore'"
    >
      <table class="team-table-other text-center" width="100%">
        <tbody>
          <tr align="center" class="flexed">
            <th width="10%">{{ $t('Hour') }}</th>
            <th colspan="10">{{ $t('TL') }}</th>
            <th width="15%">{{ $t('Update') }}</th>
          </tr>
          <template
            v-for="(item, index) in oddsCorrectScoreHistory?.data"
            :key="index"
          >
            <tr>
              <td rowspan="3" class="rb">{{ $t('Live') }}</td>
              <td width="7.5%" class="rb ">1:0<br><span>{{ getOddsCorrectScore(item?.odds, 1, 0) }}</span></td>
              <td width="7.5%" class="rb ">2:0<br><span>{{ getOddsCorrectScore(item?.odds, 2, 0) }}</span></td>
              <td width="7.5%" class="rb ">2:1<br><span>{{ getOddsCorrectScore(item?.odds, 2, 1) }}</span></td>
              <td width="7.5%" class="rb ">3:0<br><span>{{ getOddsCorrectScore(item?.odds, 3, 0) }}</span></td>
              <td width="7.5%" class="rb ">3:1<br><span>{{ getOddsCorrectScore(item?.odds, 3, 1) }}</span></td>
              <td width="7.5%" class="rb ">3:2<br><span>{{ getOddsCorrectScore(item?.odds, 3, 2) }}</span></td>
              <td width="7.5%" class="rb ">4:0<br><span>{{ getOddsCorrectScore(item?.odds, 4, 0) }}</span></td>
              <td width="7.5%" class="rb ">4:1<br><span>{{ getOddsCorrectScore(item?.odds, 4, 1) }}</span></td>
              <td width="7.5%" class="rb ">4:2<br><span>{{ getOddsCorrectScore(item?.odds, 4, 2) }}</span></td>
              <td width="7.5%" class="rb ">4:3<br><span>{{ getOddsCorrectScore(item?.odds, 4, 3) }}</span></td>
              <td class="time" rowspan="3" name="timeData" >{{ timeStamp2DateUTCTimeZone(item?.update_time, "MM-DD",) }} {{ timeStamp2DateUTCTimeZone(item?.update_time, "HH:mm", timeZone) }}</td>
            </tr>
            <tr>
              <td class="rb ">0:0<br><span>{{ getOddsCorrectScore(item?.odds, 0, 0) }}</span></td>
              <td class="rb ">1:1<br><span>{{ getOddsCorrectScore(item?.odds, 1, 1) }}</span></td>
              <td class="rb ">2:2<br><span>{{ getOddsCorrectScore(item?.odds, 2, 2) }}</span></td>
              <td class="rb ">3:3<br><span>{{ getOddsCorrectScore(item?.odds, 3, 3) }}</span></td>
              <td class="rb ">4:4<br><span>{{ getOddsCorrectScore(item?.odds, 4, 4) }}</span></td>
              <td class="rb ">{{ $t('Other') }}<br><span>{{ item?.odds?.otherScoresOdds }}</span></td>
              <td class="rb"></td>
              <td class="rb"></td>
              <td class="rb"></td>
              <td class="rb"></td>
            </tr>
            <tr>
              <td class="rb ">0:1<br><span>{{ getOddsCorrectScore(item?.odds, 0, 1) }}</span></td>
              <td class="rb ">0:2<br><span>{{ getOddsCorrectScore(item?.odds, 0, 2) }}</span></td>
              <td class="rb ">1:2<br><span>{{ getOddsCorrectScore(item?.odds, 1, 2) }}</span></td>
              <td class="rb ">0:3<br><span>{{ getOddsCorrectScore(item?.odds, 0, 3) }}</span></td>
              <td class="rb ">1:3<br><span>{{ getOddsCorrectScore(item?.odds, 1, 3) }}</span></td>
              <td class="rb ">2:3<br><span>{{ getOddsCorrectScore(item?.odds, 1, 3) }}</span></td>
              <td class="rb ">0:4<br><span>{{ getOddsCorrectScore(item?.odds, 0, 4) }}</span></td>
              <td class="rb ">1:4<br><span>{{ getOddsCorrectScore(item?.odds, 1, 4) }}</span></td>
              <td class="rb ">2:4<br><span>{{ getOddsCorrectScore(item?.odds, 2, 4) }}</span></td>
              <td class="rb ">3:4<br><span>{{ getOddsCorrectScore(item?.odds, 3, 4) }}</span></td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div
      class="pointdetail"
      id="pointDetail"
      v-show="activeSection === 'pointDetail'"
    >
      <table class="team-table-other text-center" width="100%">
        <tbody>
          <tr class="flexed">
            <th width="10%">{{ $t('Hour') }}</th>
            <th colspan="10">{{ $t('TL') }}</th>
            <th width="15%">{{ $t('Update') }}</th>
          </tr>
          <tr>
            <td rowspan="3" class="rb">{{ $t('Live') }}</td>
            <td width="7.5%" class="rb">
              1:0 <br />
              <span data-o="6.9">6.9</span>
            </td>
            <td width="7.5%" class="rb">
              2:0 <br />
              <span data-o="5.8">5.8</span>
            </td>
            <td width="7.5%" class="rb">
              2:1 <br />
              <span data-o="7.4">7.4</span>
            </td>
            <td width="7.5%" class="rb">
              3:0 <br />
              <span data-o="7.8">7.8</span>
            </td>
            <td width="7.5%" class="rb">
              3:1 <br />
              <span data-o="10">10</span>
            </td>
            <td width="7.5%" class="rb">
              3:2 <br />
              <span data-o="25">25</span>
            </td>
            <td width="7.5%" class="rb">
              4:0 <br />
              <span data-o="14">14</span>
            </td>
            <td width="7.5%" class="rb">
              4:1 <br />
              <span data-o="17.5">17.5</span>
            </td>
            <td width="7.5%" class="rb">
              4:2 <br />
              <span data-o="43">43</span>
            </td>
            <td width="7.5%" class="rb down3">
              4:3 <br />
              <span data-o="159">159</span>
            </td>
            <td
              class="time"
              rowspan="3"
              name="timeData"
              data-t="Sun Apr 21 2024 23:56:55 GMT+0800"
              data-tf="6"
            >
              22/04 07:56
            </td>
          </tr>
          <tr>
            <td class="rb">
              0:0 <br />
              <span data-o="17.5">17.5</span>
            </td>
            <td class="rb">
              1:1 <br />
              <span data-o="8.8">8.8</span>
            </td>
            <td class="rb">
              2:2 <br />
              <span data-o="19">19</span>
            </td>
            <td class="rb">
              3:3 <br />
              <span data-o="84">84</span>
            </td>
            <td class="rb">
              4:4 <br />
              <span data-o="219">219</span>
            </td>
            <td class="rb up3">
              {{ $t('Other') }} <br />
              <span data-o="8.2">8.2</span>
            </td>
            <td class="rb"></td>
            <td class="rb"></td>
            <td class="rb"></td>
            <td class="rb"></td>
          </tr>
          <tr>
            <td class="rb down3">
              0:1 <br />
              <span data-o="21">21</span>
            </td>
            <td class="rb">
              0:2 <br />
              <span data-o="54">54</span>
            </td>
            <td class="rb down3">
              1:2 <br />
              <span data-o="22">22</span>
            </td>
            <td class="rb down3">
              0:3 <br />
              <span data-o="199">199</span>
            </td>
            <td class="rb down3">
              1:3 <br />
              <span data-o="84">84</span>
            </td>
            <td class="rb">
              2:3 <br />
              <span data-o="74">74</span>
            </td>
            <td class="rb">
              0:4 <br />
              <span data-o="224">224</span>
            </td>
            <td class="rb">
              1:4 <br />
              <span data-o="224">224</span>
            </td>
            <td class="rb">
              2:4 <br />
              <span data-o="209">209</span>
            </td>
            <td class="rb">
              3:4 <br />
              <span data-o="219">219</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="doubledetail"
      id="doubleDetail"
      v-show="activeSection === 'doubleChance'"
    >
      <table class="team-table-other text-center" width="100%">
        <tbody>
          <tr class="flexed">
            <th width="16%">{{ $t('Hour') }}</th>
            <th width="16%">{{ $t('1X') }}</th>
            <th width="16%">{{ $t('12') }}</th>
            <th width="16%">{{ $t('X2') }}</th>
            <th width="20%">{{ $t('Update') }}</th>
          </tr>
          <template
            v-for="(item, index) in reduceOddsHistoriesDoubeChance(oddsDoubleChangeHistory?.data)"
            :key="index"
          >
            <tr>
              <td width="20%">
                {{ $t('Live') }}
              </td>
              <td width="15%" :class="item?.odd1_class">{{ getOddNumberToNegativeTX(item?.odds?.home_draw) }}</td>
              <td width="15%" :class="item?.odd2_class">{{ getOddNumberToNegativeTX(item?.odds?.home_away) }}</td>
              <td width="15%" :class="item?.odd3_class">{{ getOddNumberToNegativeTX(item?.odds?.draw_away) }}</td>
              <td width="20%" class="p5">
                {{
                  timeStamp2DateUTCTimeZone(item?.update_time, "yyyy-MM-DD HH:mm", timeZone)
                }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import moment from 'moment-timezone';
import '~/utils/moment.locale.vi.ts';
const { useLocale, $t, $trouter } = useShareCommon()
moment.locale(useLocale?.value.defaultLocale ?? 'en');
// Get data from cookie
const settingsData = useCookie<any>('settingsData')
const timeZone = ref(settingsData?.value?.timeZone || '')

const route = useRoute();

const props = defineProps<{
    oddCompId: any,
    matchId: any,
    section: any,
    oddCompanysList: []
    refreshTime: any
}>()

const isHaft = ref(false)
const oddsDetail = ref();
const matchIdSlug = ref(route?.params?.id || "");
const activeSection = ref(props?.section ? props?.section : "ahDetail");
const oCompanySelected = ref(useCookie<any>("oCompanyOddSelected").value ? useCookie<any>("oCompanyOddSelected").value : []);
const oCompList = ref([]);
const oddsList = ref([])
const oddCompanys = ref([])
const oddCompanysList = ref([])
ODD_COMPANYS.forEach((item) => {
  oddCompanysList.value[item?.id] = item
  oCompList.value[item?.id] = oCompanySelected.value.includes(item?.id)
    ? true
    : false;
});

const oddCompanyName = ref()
const oddsDetailHistories = ref([])
const oddCompanyId = ref()
const oddsEuroHadicap = ref([])
const oddsCornerHistories = ref([])
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
  oddCompanyId.value = companyId
  oddCompanyName.value = companyName

  await fetchOddsChangeHistory(companyId)
  statedetailwin.modal_detail_win.show();
}

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
        i_company_id: isportsapi_id
    }).then(resData => {

      oddsDetailHistories.value = resData
    })
}

const fetchOdds = async (matchIdSlug) => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL + '?match_id=' + props?.matchId).then(async resData => {
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

    })
    
    oddCompanys.value = oddCompanysList
  });
};

const fetchOddsEuroHadicap = async (matchIdSlug) => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_EUROHADICAP + '?match_id=' + matchIdSlug).then(async resData => {
      oddsEuroHadicap.value = resData?.data
  });
};

const fetchOddsCornerChangeHistory = async (isportsapi_id) => {
  await useApiLiveScore(isHaft.value === false ? API_ROUTERS.LIVESCORE.ODDS_CONNER_HISTORY_FULL : API_ROUTERS.LIVESCORE.ODDS_CONNER_HISTORY_HAFT, {
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
  () => route.path,
  (newPath) => {
    matchIdSlug.value = route?.params?.id || "";
  },
  { immediate: true }
);

watch(
  () => route.query,
  () => {
      isHaft.value = route.query?.haft == 1 ? true : false
  },
  { immediate: true }
);

const renderData = (europeOdds, handicap, overUnder) => {
  const oddCompanysList = []
    ODD_COMPANYS?.forEach(item => {
      oddCompanysList[item?.isportsapi] = []
      oddCompanysList[item?.isportsapi].id = item?.id
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
}

const loadData = async () => {
  if (activeSection.value === 'handicap' || activeSection.value === 'overUnder' || activeSection.value === 'europeOdds' || activeSection.value === 'ahDetail' || activeSection.value === 'allLive') {
    const europeOdds = (isHaft.value === true) ? "europeanHaft" : "europeOdds"
    const handicap = (isHaft.value === true) ? "handicapHalf" : "handicap"
    const overUnder = (isHaft.value === true) ? "overUnderHalf" : "overUnder"
    await fetchOddsChangeHistory(oddCompanyId.value);
    await fetchOddsEuroHadicap(oddCompanyId.value);
    await fetchOdds(oddCompanyId.value);
    //renderData(europeOdds, handicap, overUnder)
  } else if (activeSection.value === 'cornertx') {
    await fetchOddsCornerChangeHistory(oddCompanyId.value);
  } else if (activeSection.value === 'correctScore') {
    await fetchOddsCorrectScoreHistory(oddCompanyId.value);
  } else if (activeSection.value === 'handicapDetail') {
    await fetchOddsEuropeanHistory(oddCompanyId.value);
  } else if (activeSection.value === 'doubleChance') {
    await fetchOddsDoubleChangeHistory(oddCompanyId.value);
  }
}

// watch(
//   () => route.query,
//   () => {
//     // const europeOdds = (route.query?.haft == 1) ? "europeanHaft" : "europeOdds"
//     // const handicap = (route.query?.haft == 1) ? "handicapHalf" : "handicap"
//     // const overUnder = (route.query?.haft == 1) ? "overUnderHalf" : "overUnder"
//     // renderData(europeOdds, handicap, overUnder)
//     loadData()
//   },
//   { immediate: true }
// );

watch(
  (isHaft),
  async () => {
    if (props?.section !== "" && props?.oddCompId) {
      loadData()
    }
  },
  { immediate: true }
);

watch(
  props,
  async () => {
    activeSection.value = props?.section
    if (props?.section !== "" && props?.oddCompId) {
      oddCompanyId.value = props?.oddCompId
      //oddCompanys.value = props?.oddCompanysList
      loadData()
    }
  }
)

watch(
  activeSection,
  async () => {
    if (activeSection.value !== "") {
      oddCompanyId.value = props?.oddCompId
      loadData()
    }
  }
)
onMounted(async () => {
});
</script>
<style scoped>
@import url("~/assets/css/match_odds.scss");
@import url("~/assets/css/league.scss");
</style>
<style scoped>
#oddsMenu {
  position: relative;
  height: 45px;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;

  span.tab {
    height: 35px;
  }

  a {
    height: 35px;
  }

  .tabsBox {
      float: right;
      min-width: 100px;
      overflow: hidden;
      border-radius: 4px;
      border: 1px solid #e5e5e5;
      padding: 0;
      height: 35px;
  }

  .tabsBox .item {
    line-height: 26px;
    width: 50%;
    float: left;
    text-align: center;
    font-weight: 600;
  }

  &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.3);
      background-color: #F5F5F5;
  }

  &::-webkit-scrollbar {
      position: fixed ;
      bottom: 10px;
      top: 0px;
      height: 2px;
      background-color: #F5F5F5;
  }

  &::-webkit-scrollbar-thumb {
      background-color: #000000;
      border: 0px solid #555555;
  }
}

@media (max-width: 920px) {
    .match-odds-menu {
        overflow-x: scroll;
      
        a {
          min-width: 120px;
        }
        span.tab {
          min-width: 120px;
        }
    }

    #oddsMenu {
      a {
        min-width: 125px;
      }
      span.tab {
        min-width: 125px;
      }
      #ftTabsBox {
        span.tab {
          min-width: 50px;
        }
      }
    }
}

</style>
