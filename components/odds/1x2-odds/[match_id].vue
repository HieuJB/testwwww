<!-- eslint-disable prefer-spread -->
<template>
  <div id="" class="">
    <div id="odds-main" ref="oddsMain">
      <div class="nav_select" style="margin-top:7px;display: none">
        <span class="sbtn2">
        <a id="a_solutions" @click="openModaFilterComp">
          {{ $t('Odd company custome') }}
        </a>
        </span>
        <span class="sbtn">{{ $t('Hide') }} </span>
        <span class="sbtn">{{ $t('Select') }} </span>
        <span class="sbtn">
          <span class="sbtn2 sel">
            <a id="choose">{{ $t('Live') }}</a>
            <select name="sel_showType" id="sel_showType" style="border:none">
              <option value="1"> {{ $t('All') }}Tất cả</option>
              <option value="2">{{ $t('Init') }}</option>
              <option value="3" selected="selected">{{ $t('Live') }}</option>
            </select>
          </span>
        </span>
        <span class="sbtn">Lọc</span>

        <span style="color:#fff;">
          <div style="float:left; padding-left:20px;cursor:default;" id="divNumCount">Tổng[ <b>173</b>/173]Nhà cái </div>
          <span style="float:left;color:#FF0;cursor:pointer;padding-left: 6px;">[Hiện thị]</span>
        </span>
      </div>

      <div style="left:auto; " id="divHeadFloat" class="">
        <div class="oddDivBox">
          <div class="twin" id="div_companySelect">
            <table width="100%" cellspacing="0" cellpadding="0" class="tgs2">
              <tbody>
                <tr>
                  <td>
                    <a>{{ $t('All') }}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a>{{ $t('Bookmaker hot') }}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a>{{ $t('Betting Exchange') }}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a>{{ $t('No betting exchange') }}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="rankbox">
            <table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="float: left; min-width: 135px">
              <tbody>
                <tr class="tb-bgcolor">
                  <th width="22" rowspan="1" class="lb rb"><input type="checkbox" name="chkall" id="chkall"></th>
                  <th colspan="2" rowspan="1">
                    <span class="sbtn3" style="float:left; text-align:left" id="a_companySelect">{{ $t('Bookmaker') }}</span>
                  </th>
                </tr>
                <template 
                  v-for="(item, index) in oddsEuropean"
                  >
                  <tr class="tr-title">
                    <td width="25" rowspan="2" class="lb rb"><input type="checkbox" name="Show" value="0"></td>
                    <td width="185" rowspan="2" class="rb" style="text-align:left;padding-left:4px;">
                      <span class="flex ms-2">
                        <span>{{ item?.company_name }}</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </template>
              </tbody>
            </table>
            <div class="rankdata" width="75%"  id="dataList">
              <table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" id="oddsList_tab">
                <tbody>
                  <tr class="tb-bgcolor" >
                    <th width="5%"><b>{{ $t('Home') }}</b></th>
                    <th width="5%"><b>{{ $t('Draw') }}</b></th>
                    <th width="5%"><b>{{ $t('Away') }}</b></th>
                    <th width="5%"><b>{{ $t('Home') }}%</b></th>
                    <th width="5%"><b>{{ $t('D') }}H%</b></th>
                    <th width="5%"><b>{{ $t('Away') }}%</b></th>
                    <th width="5%"><b>{{ $t('Return on Investment') }}%</b></th>
                    <th width="5%" colspan="3"><b>{{ $t('Kelly criterion') }}</b></th>
                    <th width="5%"><b>{{ $t('Last change') }}</b></th>
                    <!-- <th width="5%"><b></b></th> -->
                  </tr>
                  <template 
                    v-for="(item, index) in oddsEuropean"
                    >
                    <tr id="oddstr_474">
                      <td width="75" style="cursor:pointer;"><span name="oddsData" >{{ getOddNumber(item?.odds_init?.odds?.[0]) }}</span></td>
                      <td width="75" style="cursor:pointer;"><span name="oddsData" >{{ getOddNumber(item?.odds_init?.odds?.[1]) }}</span></td>
                      <td width="75" class="rb" style="cursor:pointer;"><span name="oddsData" >{{ getOddNumber(item?.odds_init?.odds?.[2]) }}</span></td>
                      <td width="75">{{ item?.odds_init?.odds?.[3]?.toFixed(2) }}</td>
                      <td width="75">{{ item?.odds_init?.odds?.[4]?.toFixed(2) }}</td>
                      <td width="75">{{ item?.odds_init?.odds?.[5]?.toFixed(2) }}</td>
                      <td width="75" class="rb">{{ item?.odds_init?.odds?.[6]?.toFixed(2) }}</td>
                      <td width="75" rowspan="2" class="rb" :class="(getOddNumber(item?.odds_init?.odds?.[0]) * avg_live?.[3] / 100) >= 1 ? 'red' : ''">{{ (getOddNumber(item?.odds_init?.odds?.[0]) * avg_live?.[3] / 100).toFixed(2) }}</td>
                      <td width="75" rowspan="2" class="rb" :class="(getOddNumber(item?.odds_init?.odds?.[1]) * avg_live?.[4] / 100) >= 1 ? 'red' : ''">{{ (getOddNumber(item?.odds_init?.odds?.[1]) * avg_live?.[4] / 100).toFixed(2) }}</td>
                      <td width="75" rowspan="2" class="rb" :class="(getOddNumber(item?.odds_init?.odds?.[2]) * avg_live?.[5] / 100) >= 1 ? 'red' : ''">{{ (getOddNumber(item?.odds_init?.odds?.[2]) * avg_live?.[5] / 100).toFixed(2) }}</td>
                      <td rowspan="2" class="rb time"><span name="timeData">{{ timeStamp2DateUTCTimeZone(item?.odds_live?.[0]?.update_time, "MM/DD HH:mm", timeZone) }}</span></td>
                      <!-- <td width="40" rowspan="2" class="rb">
                        <BaseImage src="/img/ss.png" width="20" height="20" alt="search"></BaseImage>
                      </td> -->
                    </tr>
                    <tr>
                      <td style="cursor:pointer;"  @mouseenter="handleMouseOverOdds($event, item)" @mouseleave="handleMouseLeaveOdds">
                        <span :class="getOddChange(item?.odds_live?.[0]?.odds?.[0], item?.odds_init?.odds?.[0])">{{ getOddNumber(item?.odds_live?.[0]?.odds?.[0]) }}</span>
                      </td>
                      <td style="cursor:pointer;" @mouseenter="handleMouseOverOdds($event, item)" @mouseleave="handleMouseLeaveOdds">
                        <span :class="getOddChange(item?.odds_live?.[0]?.odds?.[1], item?.odds_init?.odds?.[1])">{{ getOddNumber(item?.odds_live?.[0]?.odds?.[1]) }}</span>
                      </td>
                      <td class="rb" style="cursor:pointer;" @mouseenter="handleMouseOverOdds($event, item)" @mouseleave="handleMouseLeaveOdds">
                        <span :class="getOddChange(item?.odds_live?.[0]?.odds?.[2], item?.odds_init?.odds?.[2])">{{ getOddNumber(item?.odds_live?.[0]?.odds?.[2]) }}</span>
                      </td>
                      <td>{{ item?.odds_live?.[0]?.odds?.[3]?.toFixed(2) }}</td>
                      <td>{{ item?.odds_live?.[0]?.odds?.[4]?.toFixed(2) }}</td>
                      <td>{{ item?.odds_live?.[0]?.odds?.[5]?.toFixed(2) }}</td>
                      <td class="rb">{{ item?.odds_live?.[0]?.odds?.[6]?.toFixed(2) }}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
          <p ref="divnotes">
          </p>
        </div>
      </div>

      <div id="divFooterFload" :class="!isShowDivnotes ? 'oddfooterDiv' : ''">
        <input type="checkbox" name="inputFloat" id="inputFloat" style="display:none;">
        <div class="oddDivBox" style="z-index: 194;">
          <div class="rankbox">
            <table class="eTable adaptMt" id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="float: left; min-width: 135px">
              <tbody>
                <tr class="f_odds bl">
                  <th width="208" class="lb rb">&nbsp;</th>
                </tr>
                <tr id="highFObj">
                  <td width="208" class="gbg lb rb">{{ $t('Highest initial rate') }}</td>
                </tr>
                <tr id="highFObj">
                  <td width="208" class="gbg lb rb">{{ $t('Highest rate') }}</td>
                </tr>
                <tr id="highFObj">
                  <td width="208" class="gbg lb rb">{{ $t('Lowest initial rate') }}</td>
                </tr>
                <tr id="highFObj">
                  <td width="208" class="gbg lb rb">{{ $t('Lowest rate') }}</td>
                </tr>
                <tr id="highFObj">
                  <td width="208" class="gbg lb rb">{{ $t('Average initial rate') }}</td>
                </tr>
                <tr id="highFObj">
                  <td width="208" class="gbg lb rb">{{ $t('Average rate') }}	</td>
                </tr>
              </tbody>
            </table>
            <div class="rankdata" width="75%"  id="dataList">
              <table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%" id="oddsList_tab">
                <tbody>
                  <tr class="tb-bgcolor" >
                    <th width="5%"><b>{{ $t('Home') }}</b></th>
                    <th width="5%"><b>{{ $t('Draw') }}</b></th>
                    <th width="5%"><b>{{ $t('Away') }}</b></th>
                    <th width="5%"><b>{{ $t('Home') }}%</b></th>
                    <th width="5%"><b>{{ $t('D') }}H%</b></th>
                    <th width="5%"><b>{{ $t('Away') }}%</b></th>
                    <th width="5%"><b>{{ $t('Return on Investment') }}%</b></th>
                    <th width="5%" colspan="3"><b>{{ $t('Kelly criterion') }}</b></th>
                    <th width="5%"><b style="color: #f5f5f5">{{ $t('Last') }}</b></th>
                    <th width="5%"><b style="color: #f5f5f5">{{ $t('Read more') }}</b></th>
                  </tr>
                  <tr id="highFObj">
                    <td name="oddsData">{{ max_init?.[0] }}</td>
                    <td name="oddsData">{{ max_init?.[1] }}</td>
                    <td class="rb" name="oddsData">{{ max_init?.[2] }}</td>
                    <td >{{ Number.isNaN(max_init?.[3]) ? '' : max_init?.[3]?.toFixed(2) }}</td>
                    <td>{{ Number.isNaN(max_init?.[4]) ? '' : max_init?.[4]?.toFixed(2) }}</td>
                    <td>{{ Number.isNaN(max_init?.[5]) ? '' : max_init?.[5]?.toFixed(2) }}</td>
                    <td class="rb">{{ Number.isNaN(max_init?.[6]) ? '' : max_init?.[6]?.toFixed(2) }}</td>
                    <td rowspan="2" :class="(max_live?.[0] * avg_live?.[3] / 100) >= 1 ? 'red' : ''">{{ (max_live?.[0] * avg_live?.[3] / 100) ? (max_live?.[0] * avg_live?.[3] / 100).toFixed(2) : '' }}</td>
                    <td rowspan="2" :class="(max_live?.[1] * avg_live?.[4] / 100) >= 1 ? 'red' : ''">{{ (max_live?.[1] * avg_live?.[4] / 100) ? (max_live?.[1] * avg_live?.[4] / 100).toFixed(2) : '' }}</td>
                    <td class="rb" rowspan="2" :class="(max_live?.[2] * avg_live?.[5] / 100) >= 1 ? 'red' : ''">{{ (max_live?.[2] * avg_live?.[5] / 100) ? (max_live?.[2] * avg_live?.[5] / 100).toFixed(2) : ''}}</td>
                    <td class="rb" rowspan="2" colspan="2">&nbsp;</td>
                  </tr>
                  <tr id="highRObj">
                    <td>
                        <span class="down2" name="oddsData">{{ max_live?.[0] }}</span>
                    </td>
                    <td>
                        <span class="up2" name="oddsData">{{ max_live?.[1] }}</span>
                    </td>
                    <td class="rb">
                        <span class="up2" name="oddsData">{{ max_live?.[2] }}</span>
                    </td>
                    <td>{{ Number.isNaN(max_live?.[3]) ? '' : max_live?.[3]?.toFixed(2) }}</td>
                    <td>{{ Number.isNaN(max_live?.[4]) ? '' : max_live?.[4]?.toFixed(2) }}</td>
                    <td>{{ Number.isNaN(max_live?.[5]) ? '' : max_live?.[5]?.toFixed(2) }}</td>
                    <td class="rb">{{ Number.isNaN(max_live?.[6]) ? '' : max_live?.[6]?.toFixed(2) }}</td>
                  </tr>
                  <tr id="lowFObj" style="text-align:center;">
                    <td name="oddsData">{{ min_init?.[0] }}</td>
                    <td name="oddsData">{{ min_init?.[1] }}</td>
                    <td class="rb" name="oddsData">{{ min_init?.[2] }}</td>
                    <td>{{ Number.isNaN(min_init?.[3]) ? '' : min_init?.[3]?.toFixed(2) }}</td>
                    <td>{{ Number.isNaN(min_init?.[4]) ? '' : min_init?.[4]?.toFixed(2) }}</td>
                    <td>{{ Number.isNaN(min_init?.[5]) ? '' : min_init?.[5]?.toFixed(2) }}</td>
                    <td class="rb">{{ Number.isNaN(min_init?.[6]) ? '' :  min_init?.[6]?.toFixed(2) }}</td>
                    <td rowspan="2" :class="(min_live?.[0] * avg_live?.[3] / 100) >= 1 ? 'red' : ''">{{ (min_live?.[0] * avg_live?.[3] / 100) ? (min_live?.[0] * avg_live?.[3] / 100).toFixed(2) : '' }}</td>
                    <td rowspan="2" :class="(min_live?.[1] * avg_live?.[4] / 100) >= 1 ? 'red' : ''">{{ (min_live?.[1] * avg_live?.[4] / 100) ? (min_live?.[1] * avg_live?.[4] / 100).toFixed(2) : '' }}</td>
                    <td class="rb" rowspan="2" :class="(min_live?.[2] * avg_live?.[5] / 100) >= 1 ? 'red' : ''">{{ (min_live?.[2] * avg_live?.[5] / 100) ? (min_live?.[2] * avg_live?.[5] / 100).toFixed(2) : '' }}</td>
                    <td class="rb" rowspan="2" colspan="2">&nbsp;</td>
                  </tr>
                  <tr id="lowRObj">
                    <td>
                        <span class="down2" name="oddsData">{{ min_live?.[0] }}</span>
                    </td>
                    <td>
                        <span class="up2" name="oddsData">{{ min_live?.[1] }}</span>
                    </td>
                    <td class="rb">
                        <span class="up2" name="oddsData">{{ min_live?.[2] }}</span>
                    </td>
                    <td>{{ Number.isNaN(min_live?.[3]) ? '' : min_live?.[3]?.toFixed(2) }}</td>
                    <td>{{ Number.isNaN(min_live?.[4]) ? '' : min_live?.[4]?.toFixed(2) }}</td>
                    <td>{{ Number.isNaN(min_live?.[5]) ? '' : min_live?.[5]?.toFixed(2) }}</td>
                    <td class="rb">{{ Number.isNaN(min_live?.[6]) ? '' : min_live?.[6]?.toFixed(2) }}</td>
                  </tr>
                  <tr id="avgFObj" style="text-align:center;">
                    <td name="oddsData">{{ avg_init?.[0]?.toFixed(2) }}</td>
                    <td name="oddsData">{{ avg_init?.[1]?.toFixed(2) }}</td>
                    <td class="rb" name="oddsData">{{ avg_init?.[2]?.toFixed(2) }}</td>
                    <td>{{ Number.isNaN(avg_init?.[3]) ? '' : avg_init?.[3]?.toFixed(2) }}</td>
                    <td>{{ Number.isNaN(avg_init?.[4]) ? '' : avg_init?.[4]?.toFixed(2) }}</td>
                    <td>{{ Number.isNaN(avg_init?.[5]) ? '' : avg_init?.[5]?.toFixed(2) }}</td>
                    <td class="rb">{{ Number.isNaN(avg_init?.[6]) ? '' : avg_init?.[6]?.toFixed(2) }}</td>
                    <td rowspan="2" :class="(avg_live?.[0] * avg_live?.[3] / 100) >= 1 ? 'red' : ''">{{ (avg_live?.[0] * avg_live?.[3] / 100) ? (avg_live?.[0] * avg_live?.[3] / 100).toFixed(2) : '' }}</td>
                    <td rowspan="2" :class="(avg_live?.[1] * avg_live?.[4] / 100) >= 1 ? 'red' : ''">{{ (avg_live?.[1] * avg_live?.[4] / 100) ? (avg_live?.[1] * avg_live?.[4] / 100).toFixed(2) : ''}}</td>
                    <td class="rb" rowspan="2" :class="(avg_live?.[2] * avg_live?.[5] / 100) >= 1 ? 'red' : ''">{{ (avg_live?.[2] * avg_live?.[5] / 100) ? (avg_live?.[2] * avg_live?.[5] / 100).toFixed(2) : '' }}</td>
                    <td class="rb" rowspan="2" colspan="2">&nbsp;</td>
                  </tr>
                  <tr id="avgRObj">
                    <td>
                        <span class="down2" name="oddsData">{{ avg_live?.[0]?.toFixed(2) }}</span>
                    </td>
                    <td>
                        <span class="up2" name="oddsData">{{ avg_live?.[1]?.toFixed(2) }}</span>
                    </td>
                    <td class="rb">
                        <span class="up2" name="oddsData">{{ avg_live?.[2]?.toFixed(2) }}</span>
                    </td>
                    <td>{{ Number.isNaN(avg_live?.[3]) ? '' : avg_live?.[3]?.toFixed(2) }}</td>
                    <td>{{ Number.isNaN(avg_live?.[4]) ? '' : avg_live?.[4]?.toFixed(2) }}</td>
                    <td>{{ Number.isNaN(avg_live?.[5]) ? '' : avg_live?.[5]?.toFixed(2) }}</td>
                    <td class="rb">{{ Number.isNaN(avg_live?.[6]) ? '' : avg_live?.[6]?.toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div id="divnotes" style="margin:0 auto; width:100%; background-color:#FFF; text-align:center;">
        <table width="100%" cellspacing="0" cellpadding="1" class="tcenter" style="line-height:22px;" id="helptxt">
          <tbody>
              <tr>
                <td colspan="13" bgcolor="#F7F7F7" class="lb rb" style="text-align:left;padding: 5px 20px;">
                  <div class="tipsPre" style="-webkit-text-size-adjust: none;">
                    <p>{{ $t('Note') }}:</p>
                    <p>1. {{ $t('Home win rate (HWR), draw rate (DR), away win rate (AWR): Match results are calculated by home win rate, draw rate and away win rate, which is calculated by home win rate, away win rate and draw rate. Return rate: Home win rate, away win rate, draw rate') }}</p>
                    <p>2. {{ $t('Payback ratio: measures the payout ratio of bookmakers, higher payback ratio means more profit bettors can get.Formula: P=AxBxC/:AxB BxC AxC:P=Payback ratio A=Win ratio B=Draw ratio C=Loss ratio') }}</p>
                    <p>3. {{ $t('Kelly Index: Reflects the payment risk of rates, that is, the difference in payment rate between the market rate and the established rate. If the Kelly Index is higher than the payout rate, the risk is large and difficult to overcome. On the contrary, the risk is small and easy to overcome') }}</p>
                    <p>4. {{ $t('Help: If the Kelly Index is higher than 1 side bongdalu will show the word in red. Select "home, draw, away, return rate" on top you can re-rank. Select the score you can see all the scores; If "time change" is shown in red then the score has changed in 30 minutes') }}</p>
                  </div>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div id="content-page" class="mt-5">
      <h1 class="page_title" v-if="matchTitle">{{ matchTitle }}</h1>
      {{ matchContent }}
    </div>
  </div>

  <div class="twin" v-show="showWinScoreOdds" :style="{ position: 'absolute', top: winScorePositionOdds.top, left: winScorePositionOdds.left, zIndex: 999 }">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tgs2">
      <tbody>
          <tr>
            <td height="26" colspan="4" class="hbg-td1">
              <b>{{oddsItemHover?.company_name}} {{ $t('Odd history') }}</b>
            </td>
          </tr>
          <template
          v-for="(item, index) in oddsItemHover?.odds_live"
          :key="index"
          >
            <tr>
              <td style="width:19%;">
                <span name="oddsData" :class="getOddChange(item?.odds?.[0], oddsItemHover?.odds_live?.[index + 1]?.odds?.[0])">{{ getOddNumber(item?.odds?.[0]) }}</span>
              </td>
              <td style="width:19%;">
                <span name="oddsData" :class="getOddChange(item?.odds?.[1], oddsItemHover?.odds_live?.[index + 1]?.odds?.[1])">{{ getOddNumber(item?.odds?.[1]) }}</span>
              </td>
              <td style="width:19%;">
                <span name="oddsData" :class="getOddChange(item?.odds?.[2], oddsItemHover?.odds_live?.[index + 1]?.odds?.[2])">{{ getOddNumber(item?.odds?.[2]) }}</span>
              </td>
              <td name="timeData">{{ timeStamp2DateUTCTimeZone(item?.update_time, "MM/DD HH:mm", timeZone) }}</td>
            </tr>
          </template>
          <tr>
            <td colspan="4">{{ $t('Read more') }}</td>
          </tr>
          <tr>
            <td style="width:19%;" name="oddsData">{{ getOddNumber(oddsItemHover?.odds_init?.odds?.[0]) }}</td>
            <td style="width:19%;" name="oddsData">{{ getOddNumber(oddsItemHover?.odds_init?.odds?.[1]) }}</td>
            <td style="width:19%;" name="oddsData">{{ getOddNumber(oddsItemHover?.odds_init?.odds?.[2]) }}</td>
            <td name="timeData">{{ timeStamp2DateUTCTimeZone(oddsItemHover?.odds_init?.update_time, "MM/DD HH:mm", timeZone) }}({{ $t('Init') }})</td>
          </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal -->
  <div class="match-odds container">
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
                <PopupOddsChange :odd-comp-id="oddCompanyId" :match-id="matchIdSlug" :section="'ahDetail'" :odd-companys-list="oddCompanys"/>
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

      <div v-show="isLoadingData" id="sloading" class="sloading">
        <div class="bar icon1"></div>
        <div class="bar icon2"></div>
        <div class="bar icon3"></div>
        <div class="bar icon4"></div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useIntersectionObserver, useWindowScroll } from '@vueuse/core'
import { socketStore } from '@/stores/wsocket'
import { useMatchStore } from '@/stores/useMatchStore'
const { useLocale, $t } = useShareCommon()
const emit = defineEmits<{
  (e: 'socketData', data: any): void
}>()

const storeSystems = systemsStore()
const matchStore = useMatchStore()
const eventSocketData = ref()

const oddsMain = ref<HTMLElement | null>(null)
const divnotes = ref(null)
const isShowDivnotes = ref(true)
const { isActive, pause, resume } = useIntersectionObserver(
  divnotes,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isShowDivnotes.value = isIntersecting
    }
  },
  { oddsMain },
)

const route = useRoute();

// Get data from cookie
const settingsData = useCookie<any>('settingsData')
const timeZone = ref(settingsData?.value?.timeZone || '')

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
ODD_COMPANYS.forEach((item) => {
  oCompList.value[item?.id] = oCompanySelected.value.includes(item?.id)
    ? true
    : false;
});

const oddCompanyName = ref()
const oddCompanyId = ref()
const oddsEuropean = ref([])
const tab = ref(route?.query?.type || "")
const isLoadingData = ref(false)

const max_init = ref([])
const max_live = ref([])
const min_init = ref([])
const min_live = ref([])
const avg_init = ref([])
const avg_live = ref([])

const init_list_home = ref([])
const init_list_draw = ref([])
const init_list_away = ref([])

const live_list_home = ref([])
const live_list_draw = ref([])
const live_list_away = ref([])

const oddsItemHover = ref()
const showWinScoreOdds = ref(false)
const winScorePositionOdds = ref({ top: '0px', left: '0px' });
const isFocusWinScoreOdds = ref(false)
const winScorePosition = ref({ top: 0, left: 0 });
const isInitModal = ref(false)
const matchTitle = defineModel('matchTitle')
const matchContent = defineModel('matchContent')
const initDataMatch = defineModel('initDataMatch')

const { y } = useWindowScroll()

const heightScreen = ref()

function setActiveSection(section) {
  activeSection.value = section;
}
const statedetailwin = reactive({
  modal_detail_win: null,
});

const openModalDetailChange = async (companyId, companyName) => {
  oddCompanyId.value = companyId
  oddCompanyName.value = companyName
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

const fetchObjectMeta = async () => {
  try {
    await useFetch<any>(createUrl(API_ROUTERS.OBJECTS_META.DETAIL + "/" + matchIdSlug.value, {
      query: {
        type: 'match',
        tab: tab.value,
      },
    })).then((resData) => {
      const timeZoneTitle = getConfig(storeSystems?.configurations, 'TIMEZONE') || timeZone.value;
      let title = resData?.data?._value?.title
      let description = resData?.data?._value?.meta_description
      if (!title || title == '') {
        title = getConfig(storeSystems.configurations, 'MATCH_TITLE_' + tab.value?.toUpperCase()) || getConfig(storeSystems.configurations, 'MATCH_TITLE_ODDSCOMP')
        title = generateMetaSeo(title, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZoneTitle, matchLiveDetail.value.match?.competition?.name)
      }
      if (!description || description == '') {
        description = getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_' + tab.value?.toUpperCase()) || getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_ODDSCOMP')
        description = generateMetaSeo(description, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZoneTitle, matchLiveDetail.value.match?.competition?.name)
      }
      let keyword = resData?.data?._value?.keyword
      if (!keyword || keyword == '') {
        keyword = getConfig(storeSystems.configurations, 'MATCH_KEYWORD_' + tab.value?.toUpperCase()) || getConfig(storeSystems.configurations, 'MATCH_KEYWORD_ODDSCOMP')
        keyword = generateMetaSeo(keyword, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZoneTitle, matchLiveDetail.value.match?.competition?.name)
      }

      let content = resData?.data?._value?.content
      if (!content || content == '') {
        content = getConfig(storeSystems.configurations, 'MATCH_CONTENT_' + tab.value?.toUpperCase()) || getConfig(storeSystems.configurations, 'MATCH_CONTENT_ODDSCOMP')
        content = generateMetaSeo(content, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZoneTitle, matchLiveDetail.value.match?.competition?.name)
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

const fetchMatchsRecentDetail = async (matchIdSlug) => {
  // await useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_RECENT_DETAIL + '?match_id=' + matchIdSlug).then(async resData => {
  //   if (!resData || resData?.length === 0) {
  //     return navigateTo(ROUTERS.HOMEPAGE, { replace: true })
  //   }
    let resData = initDataMatch.value
    matchLiveDetail.value.match = resData?.[0]

    const i_match_id = resData?.[0]?.i_match_id;
    // await fetchObjectMeta()
  // });
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

const handleMouseOverOdds = async (event, odds) =>{
  // if (!odds || odds?.length === 0) 
  //   return

  const oddsTdRect = event.target.getBoundingClientRect();
  winScorePositionOdds.value = {
      top: `${oddsTdRect.top + window.scrollY}px`, 
      left: `${oddsTdRect.left + window.scrollX - 300}px` 
  };

  oddsItemHover.value = odds
  showWinScoreOdds.value = true;
}

const handleMouseLeaveOdds = () => {
  showWinScoreOdds.value = false;
}

const fetchOdds = async () => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.ODDS_EUROPEAN + "?match_id=" + matchIdSlug.value
  ).then((resData) => {
    const oddsList = getDataObjectByList(resData?.data)
    
    oddsList?.map(item => {
      let new_item = []
      
      // Live
      item.odds_live = (item?.odds_data?.[0]?.odds_data?.odds_live || item?.odds_data?.[1]?.odds_data?.odds_live)?.map(item_odd => {
        item_odd = getDataObject(item_odd)

        live_list_home.value.push(item_odd.odds?.[0] ? getOddOfData(item_odd.odds?.[0]) : null)
        live_list_draw.value.push(item_odd.odds?.[1] ? getOddOfData(item_odd.odds?.[1]) : null)
        live_list_away.value.push(item_odd.odds?.[2] ? getOddOfData(item_odd.odds?.[2]) : null)

        item_odd.odds[3] = 1 / (1 +  item_odd.odds?.[0]/item_odd.odds?.[1] + item_odd.odds?.[0]/item_odd.odds?.[2]) * 100
        item_odd.odds[4] = 1 / (1 +  item_odd.odds?.[1]/item_odd.odds?.[0] + item_odd.odds?.[1]/item_odd.odds?.[2]) * 100
        item_odd.odds[5] = 1 / (1 +  item_odd.odds?.[2]/item_odd.odds?.[0] + item_odd.odds?.[2]/item_odd.odds?.[1]) * 100
        item_odd.odds[6] = item_odd.odds[0] * item_odd.odds[3]
        return item_odd
      })

      // Init
      item.odds_init = getDataObject(item?.odds_data?.[0]?.odds_data?.odds_init?.[0] || item?.odds_data?.[1]?.odds_data?.odds_init?.[0])

      init_list_home.value.push(item.odds_init.odds?.[0] ? getOddOfData(item.odds_init.odds?.[0]) : null) 
      init_list_draw.value.push(item.odds_init.odds?.[1] ? getOddOfData(item.odds_init.odds?.[1]) : null)
      init_list_away.value.push(item.odds_init.odds?.[2] ? getOddOfData(item.odds_init.odds?.[2]) : null)

      item.odds_init.odds[3] = 1 / (1 +  item.odds_init.odds?.[0]/item.odds_init.odds?.[1] + item.odds_init.odds?.[0]/item.odds_init.odds?.[2]) * 100
      item.odds_init.odds[4] = 1 / (1 +  item.odds_init.odds?.[1]/item.odds_init.odds?.[0] + item.odds_init.odds?.[1]/item.odds_init.odds?.[2]) * 100
      item.odds_init.odds[5] = 1 / (1 +  item.odds_init.odds?.[2]/item.odds_init.odds?.[0] + item.odds_init.odds?.[2]/item.odds_init.odds?.[1]) * 100
      item.odds_init.odds[6] = item.odds_init.odds[0] * item.odds_init.odds[3]
      return item
    })

    max_init.value = [
      init_list_home.value?.length > 0 ? Math.max.apply(Math, init_list_home.value) : 0, 
      init_list_draw.value?.length > 0 ? Math.max.apply(Math, init_list_draw.value) : 0, 
      init_list_away.value?.length > 0 ? Math.max.apply(Math, init_list_away.value) : 0,
      1 / (1 +  Math.max.apply(Math, init_list_home.value)/Math.max.apply(Math, init_list_draw.value) + Math.max.apply(Math, init_list_home.value)/Math.max.apply(Math, init_list_away.value)) * 100,
      1 / (1 +  Math.max.apply(Math, init_list_draw.value)/Math.max.apply(Math, init_list_home.value) + Math.max.apply(Math, init_list_draw.value)/Math.max.apply(Math, init_list_away.value)) * 100,
      1 / (1 +  Math.max.apply(Math, init_list_away.value)/Math.max.apply(Math, init_list_home.value) + Math.max.apply(Math, init_list_away.value)/Math.max.apply(Math, init_list_draw.value)) * 100,
    ]
    max_init.value[6] = max_init.value[0] * max_init.value[3]

    min_init.value = [
      init_list_home.value?.length > 0 ? Math.min.apply(Math, init_list_home.value) : 0,  
      init_list_draw.value?.length > 0 ? Math.min.apply(Math, init_list_draw.value) : 0, 
      init_list_away.value?.length > 0 ? Math.min.apply(Math, init_list_away.value) : 0,
      1 / (1 +  Math.min.apply(Math, init_list_home.value)/Math.min.apply(Math, init_list_draw.value) + Math.min.apply(Math, init_list_home.value)/Math.min.apply(Math, init_list_away.value)) * 100,
      1 / (1 +  Math.min.apply(Math, init_list_draw.value)/Math.min.apply(Math, init_list_home.value) + Math.min.apply(Math, init_list_draw.value)/Math.min.apply(Math, init_list_away.value)) * 100,
      1 / (1 +  Math.min.apply(Math, init_list_away.value)/Math.min.apply(Math, init_list_home.value) + Math.min.apply(Math, init_list_away.value)/Math.min.apply(Math, init_list_draw.value)) * 100
    ]
    min_init.value[6] = min_init.value[0] * min_init.value[3]

    let avg_data = [
      (init_list_home.value?.reduce((a, b) => a + b, 0) / init_list_home.value?.length) || 0,
      (init_list_draw.value?.reduce((a, b) => a + b, 0) / init_list_draw.value?.length) || 0,
      (init_list_away.value?.reduce((a, b) => a + b, 0) / init_list_away.value?.length) || 0
    ]

    avg_init.value = [
      ...avg_data,
      1 / (1 + avg_data?.[0] / avg_data?.[1] + avg_data?.[0] / avg_data?.[2]) * 100,
      1 / (1 + avg_data?.[1] / avg_data?.[0] + avg_data?.[1] / avg_data?.[2]) * 100,
      1 / (1 + avg_data?.[2] / avg_data?.[0] + avg_data?.[2] / avg_data?.[1]) * 100,
    ]
    avg_init.value[6] = avg_init.value[0] * avg_init.value[3]

    max_live.value = [
      live_list_home.value?.length > 0 ? Math.max.apply(Math, live_list_home.value) : 0, 
      live_list_draw.value?.length > 0 ? Math.max.apply(Math, live_list_draw.value) : 0, 
      live_list_away.value?.length > 0 ? Math.max.apply(Math, live_list_away.value) : 0,
      
      1 / (1 +  Math.max.apply(Math, live_list_home.value)/Math.max.apply(Math, live_list_draw.value) + Math.max.apply(Math, live_list_home.value)/Math.max.apply(Math, live_list_away.value)) * 100,
      1 / (1 +  Math.max.apply(Math, live_list_draw.value)/Math.max.apply(Math, live_list_home.value) + Math.max.apply(Math, live_list_draw.value)/Math.max.apply(Math, live_list_away.value)) * 100,
      1 / (1 +  Math.max.apply(Math, live_list_away.value)/Math.max.apply(Math, live_list_home.value) + Math.max.apply(Math, live_list_away.value)/Math.max.apply(Math, live_list_draw.value)) * 100
    ]
    max_live.value[6] = max_live.value[0] * max_live.value[3]

    min_live.value = [
      live_list_home.value?.length > 0 ? Math.min.apply(Math, live_list_home.value) : 0, 
      live_list_draw.value?.length > 0 ? Math.min.apply(Math, live_list_draw.value) : 0, 
      live_list_away.value?.length > 0 ? Math.min.apply(Math, live_list_away.value) : 0,

      1 / (1 +  Math.min.apply(Math, live_list_home.value)/Math.min.apply(Math, live_list_draw.value) + Math.min.apply(Math, live_list_home.value)/Math.min.apply(Math, live_list_away.value)) * 100,
      1 / (1 +  Math.min.apply(Math, live_list_draw.value)/Math.min.apply(Math, live_list_home.value) + Math.min.apply(Math, live_list_draw.value)/Math.min.apply(Math, live_list_away.value)) * 100,
      1 / (1 +  Math.min.apply(Math, live_list_away.value)/Math.min.apply(Math, live_list_home.value) + Math.min.apply(Math, live_list_away.value)/Math.min.apply(Math, live_list_draw.value)) * 100
    ]
    min_live.value[6] = min_live.value[0] * min_live.value[3]

    let avg_live_data = [
      (live_list_home.value?.reduce((a, b) => a + b, 0) / live_list_home.value?.length) || 0,
      (live_list_draw.value?.reduce((a, b) => a + b, 0) / live_list_draw.value?.length) || 0,
      (live_list_away.value?.reduce((a, b) => a + b, 0) / live_list_away.value?.length) || 0
    ]
    avg_live.value = [
      ...avg_live_data,
      1 / (1 + avg_live_data?.[0] / avg_live_data?.[1] + avg_live_data?.[0] / avg_live_data?.[2]) * 100,
      1 / (1 + avg_live_data?.[1] / avg_live_data?.[0] + avg_live_data?.[1] / avg_live_data?.[2]) * 100,
      1 / (1 + avg_live_data?.[2] / avg_live_data?.[0] + avg_live_data?.[2] / avg_live_data?.[1]) * 100,
    ]
    avg_live.value[6] = avg_live.value[0] * avg_live.value[3]

    oddsEuropean.value = oddsList

    // isLoadingData.value = false
    nextTick(() => {
      heightScreen.value = window?.innerHeight
      // isLoadingData.value = false
    })
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

watch(
  () => route?.query, 
  () => {
  tab.value = route?.query?.type || "";
  //isLoadingData.value = true
  }, 
  { immediate: true }
);

// Socket data
const wssMatch = (socketData: any) => {
  try {
    if (matchStore.wssSocket) {
      if (socketData) {
        eventSocketData.value = socketData
        emit('socketData', socketData)
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

await fetchMatchsRecentDetail(matchIdSlug.value)
await fetchOdds(matchIdSlug.value);

const initModalElement = async() => {
  if(!isInitModal.value) {
    isInitModal.value = true
    await nextTick()
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
#odds-main {
  overflow: hidden;
}
.rankbox {
  .eTable tr {
    th {
      height: 75px;
    }
    td {
      height: 40px !important;
    }
  } 

  .rankdata {
    margin-left: -1px;
    
    .eTable tr {
      th {
        height: 75px;
      }
      td {
        height: 40px !important;
        width: 94px;
      }
    } 
  }
}

#divFooterFload {
  .rankbox {
    .eTable tr {
      th {
        height: 40px;
        padding-top: 1px;
        padding-bottom: 1px;
      }
    } 

    .rankdata {
      margin-left: -1px;
      
      .eTable tr {
        th {
          height: 40px;
          padding-top: 1px;
          padding-bottom: 1px;
        }
      } 
    }
  }
}

@media (max-width: 920px) {
  .rankbox {
    .eTable tr {
      th {
        height: 85px;
      }
      td {
        height: 40px !important;
      }
    } 

    .rankdata {
      .eTable tr {
        th {
          height: 85px;
        }
        td {
          height: 50px !important;
        }
      } 
    }
  }

  #divFooterFload {

    width: 100vw;
    overflow-x: scroll;

    .rankbox {
      .eTable tr {
        th {
          height: 36px;
          padding-top: 1px;
          padding-bottom: 1px;
        }
      } 

      .rankdata {
        margin-left: -1px;
        
        .eTable tr {
          th {
            height: 45px;
            padding-top: 1px;
            padding-bottom: 1px;
          }
        } 
      }
    }
    
  }
}
</style>