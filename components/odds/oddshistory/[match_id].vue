<template>
  <div id="info" class="match-odds container">
    <div id="odds-main">
      <HeaderComponent />

      <div id="CompanyOddsDiv" class="company-comp">
        <table
          id="oddsCompTable"
          class="text-center"
          cellspacing="1"
          cellpadding="0"
          width="100%"
          style="margin-top: 10px; line-height: 20px"
        >
          <tbody>
            <tr class="tr-title" height="25">
              <th width="15%" rowspan="2" colspan="2">
                <b>Công ty</b>
                <img
                  src="/img/fx.svg"
                  alt="plus"
                  @click="openModaFilterComp"
                />
              </th>
              <th colspan="3" class="bd-lr">
                <b>Tỷ lệ Châu Á</b>
              </th>
              <th colspan="3" class="bd-lr">
                <b>Tỷ lệ tài xỉu</b>
              </th>
              <th colspan="3" class="bd-lr">
                <b>1X2</b>
              </th>
              <th width="10%" rowspan="2" colspan="2">
                <b>Chi tiết</b>
              </th>
            </tr>
            <tr class="tr-title" height="25">
              <th class="bd-l">Chủ</th>
              <th>HDP</th>
              <th class="bd-r">Khách</th>
              <th class="bd-l">Tài</th>
              <th>Kèo đầu</th>
              <th class="bd-r">Xỉu</th>
              <th class="bd-l">Chủ</th>
              <th>Hòa</th>
              <th class="bd-r">Khách</th>
            </tr>
            <template 
              v-for="(item, index) in oddCompanys?.filter(item => item !== null && !item?.isEmpty && oCompanySelected.includes(item?.id))"
              :index="index"
              >
                  <tr name="oddsTr" :class="index % 2 !== 0 ? 'tb-bgcolor' : 'tb-bgcolor1'" cid="31">
                  <td width="10%">{{ item?.name }}</td>
                  <td width="5%" class="bd-l">
                    <span>{{$t('Initial')}}</span>
                    <span>Live</span>
                    <span class="red">Run</span>
                  </td>
                  <td width="7%" class="bd-l">
                    <span data-o="">{{ getOddNumberToNegative(item?.handicap?.first?.[1]) }}</span>
                    <span :class="getOddChange(item?.handicap?.live?.[1], item?.handicap?.first?.[1])">{{ getOddNumber(item?.handicap?.live?.[1]) }}</span>
                    <span data-o="">{{ getOddNumberToNegative(item?.handicap?.run?.[1]) }}</span>
                    <!-- 
                    <span data-o="0.85">0.85</span>
                    <span class="up2" data-o="1.04">-0.96</span>
                    <span data-o="5.00">-0.20</span> -->
                  </td>
                  <td width="7%">
                    <span data-o="">{{ getOddNumberToNegative(item?.handicap?.first?.[0]) }}</span>
                    <span :class="getOddChange(item?.handicap?.live?.[0], item?.handicap?.first?.[0])">{{ getOddNumber(item?.handicap?.live?.[0]) }}</span>
                    <span data-o="">{{ getOddNumberToNegative(item?.handicap?.run?.[0]) }}</span>
                  </td>
                  <td width="7%" class="bd-r">
                    <span data-o="">{{ getOddNumberToNegative(item?.handicap?.first?.[2]) }}</span>
                    <span :class="getOddChange(item?.handicap?.live?.[2], item?.handicap?.first?.[2])">{{ getOddNumber(item?.handicap?.live?.[2]) }}</span>
                    <span data-o="">{{ getOddNumberToNegative(item?.handicap?.run?.[2]) }}</span>
                  </td>
                  <td width="7%" class="bd-l">
                    <span data-o="">{{ getOddNumberToNegative(item?.overUnder?.first?.[1]) }}</span>
                    <span :class="getOddChange(item?.overUnder?.live?.[1], item?.overUnder?.first?.[1])">{{ getOddNumberToNegative(item?.overUnder?.live?.[1]) }}</span>
                    <span data-o="">{{ getOddNumberToNegative(item?.overUnder?.run?.[1]) }}</span>
                  </td>
                  <td width="7%">
                    <span data-o="">{{ getOddNumberToNegative(item?.overUnder?.first?.[0]) }}</span>
                    <span :class="getOddChange(item?.overUnder?.live?.[0], item?.overUnder?.first?.[0])">{{ getOddNumberToNegative(item?.overUnder?.live?.[0]) }}</span>
                    <span data-o="">{{ getOddNumberToNegative(item?.overUnder?.run?.[0]) }}</span>
                  </td>
                  <td width="7%" class="bd-r">
                    <span data-o="">{{ getOddNumberToNegative(item?.overUnder?.first?.[2]) }}</span>
                    <span :class="getOddChange(item?.overUnder?.live?.[2], item?.overUnder?.first?.[2])">{{ getOddNumberToNegative(item?.overUnder?.live?.[2]) }}</span>
                    <span data-o="">{{ getOddNumberToNegative(item?.overUnder?.run?.[2]) }}</span>
                  </td>
                  <td width="7%" class="bd-l">
                    <span data-o="">{{ getOddNumber(item?.europeOdds?.first?.[0]) }}</span>
                    <span :class="getOddChange(item?.europeOdds?.live?.[0], item?.europeOdds?.first?.[0])">{{ getOddNumber(item?.europeOdds?.live?.[0]) }}</span>
                    <span data-o="">{{ getOddNumber(item?.europeOdds?.run?.[0]) }}</span>
                  </td>
                  <td width="7%">
                    <span data-o="">{{ getOddNumber(item?.europeOdds?.first?.[1]) }}</span>
                    <span :class="getOddChange(item?.europeOdds?.live?.[1], item?.europeOdds?.first?.[1])">{{ getOddNumber(item?.europeOdds?.live?.[1]) }}</span>
                    <span data-o="">{{ getOddNumber(item?.europeOdds?.run?.[1]) }}</span>
                  </td>
                  <td width="7%" class="bd-r">
                    <span data-o="">{{ getOddNumber(item?.europeOdds?.first?.[2]) }}</span>
                    <span :class="getOddChange(item?.europeOdds?.live?.[2], item?.europeOdds?.first?.[2])">{{ getOddNumber(item?.europeOdds?.live?.[2]) }}</span>
                    <span data-o="">{{ getOddNumber(item?.europeOdds?.run?.[2]) }}</span>
                  </td>
                  <td width="5%">
                    <a class="odd_a" @click="openModalDetailChange(item?.isportsapi, item?.name)"> Thay đổi </a>
                  </td>
                </tr>
            </template>
          </tbody>
        </table>
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
              {{ oddCompanyName }} Tỷ lệ thay đổi
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
                <div id="oddsMenu" class="match-odds-menu">
                  <a
                    :class="{ on: activeSection === 'allLive' }"
                    @click="setActiveSection('allLive')"
                    >Tất cả tỷ lệ</a
                  >
                  <a
                    :class="{ on: activeSection === 'ahDetail' }"
                    @click="setActiveSection('ahDetail')"
                    >Tỷ lệ 3in1</a
                  >
                  <a
                    :class="{ on: activeSection === 'correctDetail' }"
                    @click="setActiveSection('correctDetail')"
                    >Kèo phạt góc T/X</a
                  >
                  <a
                    :class="{ on: activeSection === 'handicapDetail' }"
                    @click="setActiveSection('handicapDetail')"
                    >Euro Handicap</a
                  >
                  <a
                    :class="{ on: activeSection === 'pointDetail' }"
                    @click="setActiveSection('pointDetail')"
                    style="display: none;"
                    >Điểm số chính xác</a
                  >
                  <a
                    :class="{ on: activeSection === 'doubleDetail' }"
                    @click="setActiveSection('doubleDetail')"
                    style="display: none;"
                    >Cơ hội kép</a
                  >
                  <div id="ftTabsBox" class="tabsBox" v-show="activeSection === 'ahDetail' || activeSection === 'correctDetail'">
                    <div id="winFTBtn" class="item on">
                      <a onclick="_oddsDetailWin.checkedHF(false)">FT</a>
                    </div>
                    <div id="winHTBtn" class="item">
                      <a onclick="_oddsDetailWin.checkedHF(true)">HT</a>
                    </div>
                  </div>
                </div>
                <div id="detailtable" class="detailtable">
                  <div
                    class="alllive"
                    id="allLive"
                    v-show="activeSection === 'allLive'"
                  >
                    <div class="title">Tỷ lệ Châu Á</div>
                    <table
                      id="ahLive"
                      class="team-table-other text-center"
                      width="100%"
                    >
                      <tbody>
                        <tr class="flexed">
                          <th width="30%" class="rb">Chủ</th>
                          <th width="30%" class="rb">HDP</th>
                          <th width="30%">Khách</th>
                        </tr>
                        <tr class="tb-bgcolor1">
                          <td class="rb">
                            <span>{{ getOddNumberToNegative(oddCompanys?.find(item => item?.isportsapi === oddCompanyId)?.handicap?.run?.[1]) }}</span>
                          </td>
                          <td class="rb">
                            <span>{{ getOddNumberToNegative(oddCompanys?.find(item => item?.isportsapi === oddCompanyId)?.handicap?.run?.[0]) }}</span>
                          </td>
                          <td>
                            <span>{{ getOddNumberToNegative(oddCompanys?.find(item => item?.isportsapi === oddCompanyId)?.handicap?.run?.[2]) }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="title">Tỷ lệ tài xỉu</div>
                    <table
                      id="ouLive"
                      class="team-table-other text-center"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <th width="30%" class="rb">Tài</th>
                          <th width="30%" class="rb">Kèo</th>
                          <th width="30%">Xỉu</th>
                        </tr>
                        <tr class="tb-bgcolor1">
                          <td class="rb">
                            <span>{{ getOddNumberToNegative(oddCompanys?.find(item => item?.isportsapi === oddCompanyId)?.overUnder?.run?.[1]) }}</span>
                          </td>
                          <td class="rb">
                            <span>{{ getOddNumberToNegative(oddCompanys?.find(item => item?.isportsapi === oddCompanyId)?.overUnder?.run?.[0]) }}</span>
                          </td>
                          <td>
                            <span>{{ getOddNumberToNegative(oddCompanys?.find(item => item?.isportsapi === oddCompanyId)?.overUnder?.run?.[2]) }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="title">1X2</div>
                    <table
                      id="opLive"
                      class="team-table-other text-center"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <th width="30%" class="rb">Chủ</th>
                          <th width="30%" class="rb">Hòa</th>
                          <th width="30%">Khách</th>
                        </tr>
                        <tr class="tb-bgcolor1">
                          <td class="rb">
                            <span>{{ getOddNumber(oddCompanys?.find(item => item?.isportsapi === oddCompanyId)?.europeOdds?.run?.[0]) }}</span>
                          </td>
                          <td class="rb">
                            <span>{{ getOddNumber(oddCompanys?.find(item => item?.isportsapi === oddCompanyId)?.europeOdds?.run?.[1]) }}</span>
                          </td>
                          <td>
                            <span>{{ getOddNumber(oddCompanys?.find(item => item?.isportsapi === oddCompanyId)?.europeOdds?.run?.[2]) }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="title" style="display: none">Điểm số chính xác</div>
                    <table
                      id="bodanLive"
                      class="team-table-other text-center"
                      width="100%"
                      style="display: none"
                    >
                      <tbody>
                        <tr>
                          <th width="10%" class="rb">Kiểu</th>
                          <th colspan="10">TL</th>
                        </tr>
                        <tr class="tb-bgcolor1">
                          <td class="rb">Chủ</td>
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
                          <td class="rb">Hòa</td>
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
                            <span>Other</span>
                            <span>8.2</span>
                          </td>
                          <td class="no-bd-lr"></td>
                          <td class="no-bd-lr"></td>
                          <td class="no-bd-lr"></td>
                          <td class="no-bd-lr"></td>
                        </tr>
                        <tr class="tb-bgcolor1">
                          <td class="rb">Khách</td>
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
                    <div class="title" style="display: none">Cơ hội kép</div>
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
                  <div
                    class="ahdetail"
                    id="ahDetail"
                    v-show="activeSection === 'ahDetail'"
                  >
                    <table
                      id="ahdetail"
                      class="threemix-table team-table-other text-center"
                    >
                      <tbody>
                        <tr class="flexed">
                          <th colspan="6" class="no-bd-lr">Tỷ lệ Châu Á</th>
                        </tr>
                        <tr class="flexed1">
                          <th class="no-bd-lr">
                            <i class="icon iconfont icon-font-time"></i>
                          </th>
                          <th class="no-bd-lr">
                            <i
                              class="icon iconfont icon-font-footballclass fb"
                            ></i>
                          </th>
                          <th class="no-bd-lr">Chủ</th>
                          <th class="no-bd-lr">HDP</th>
                          <th class="no-bd-lr">Khách</th>
                          <th class="no-bd-lr">Cập nhật</th>
                        </tr>
                        <template 
                        v-for="(item, index) in oddsDetailHistories?.data?.inplay?.filter(item => (item?.type === 1 || item?.type === 6))"
                        :key="index"
                        >
                          <tr>
                            <td class="bd-r">{{item?.match_time !== 'HT' ? item?.match_time + '\'' : 'HT'}}</td>
                            <td class="bd-r">{{item?.home_score}}-{{item?.away_score}}</td>
                            <template v-if="item?.type === 1">
                              <td class="no-bd-lr">
                              <span data-o="" class="">{{item?.odds1}}</span>
                              </td>
                              <td class="no-bd-lr">
                                <span data-o="" class="">{{item?.odds2}}</span>
                              </td>
                              <td class="no-bd-lr">
                                <span data-o="" class="">{{item?.odds3}}</span>
                              </td>
                            </template>
                            <template v-if="item?.type === 6">
                              <td colspan="3" class="red">Đóng</td>
                            </template>
                            <td class="lb time">{{ timeStamp2DateUTCTimeZone(item?.update_time, 'yyyy-MM-DD HH:mm')}}</td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                    <table
                      id="oudetail"
                      class="threemix-table team-table-other text-center"
                    >
                      <tbody>
                        <tr class="flexed">
                          <th colspan="6" class="no-bd-lr">Tỷ lệ tài xỉu</th>
                        </tr>
                        <tr class="flexed1">
                          <th class="no-bd-lr">
                            <i class="icon iconfont icon-font-time"></i>
                          </th>
                          <th class="no-bd-lr">
                            <i
                              class="icon iconfont icon-font-footballclass fb"
                            ></i>
                          </th>
                          <th class="no-bd-lr">Tài</th>
                          <th class="no-bd-lr">Kèo</th>
                          <th class="no-bd-lr">Xỉu</th>
                          <th class="no-bd-lr">Cập nhật</th>
                        </tr>
                        <template 
                        v-for="(item, index) in oddsDetailHistories?.data?.inplay?.filter(item => (item?.type === 2 || item?.type === 7))"
                        :key="index"
                        >
                          <tr>
                            <td class="bd-r">{{item?.match_time !== 'HT' ? item?.match_time + '\'' : 'HT'}}</td>
                            <td class="bd-r">{{item?.home_score}}-{{item?.away_score}}</td>
                            <template v-if="item?.type === 2">
                              <td class="no-bd-lr">
                              <span data-o="" class="">{{item?.odds1}}</span>
                              </td>
                              <td class="no-bd-lr">
                                <span data-o="" class="">{{item?.odds2}}</span>
                              </td>
                              <td class="no-bd-lr">
                                <span data-o="" class="">{{item?.odds3}}</span>
                              </td>
                            </template>
                            <template v-if="item?.type === 7">
                              <td colspan="3" class="red">Đóng</td>
                            </template>
                            <td class="lb time">{{ timeStamp2DateUTCTimeZone(item?.update_time, 'yyyy-MM-DD HH:mm')}}</td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                    <table
                      id="opdetail"
                      class="threemix-table team-table-other text-center"
                    >
                      <tbody>
                        <tr class="flexed">
                          <th colspan="6" class="no-bd-lr">1X2</th>
                        </tr>
                        <tr class="flexed1">
                          <th class="no-bd-lr">
                            <i class="icon iconfont icon-font-time"></i>
                          </th>
                          <th class="no-bd-lr">
                            <i
                              class="icon iconfont icon-font-footballclass fb"
                            ></i>
                          </th>
                          <th class="no-bd-lr">Chủ</th>
                          <th class="no-bd-lr">Hòa</th>
                          <th class="no-bd-lr">Khách</th>
                          <th class="no-bd-lr">Cập nhật</th>
                        </tr>
                        <template 
                        v-for="(item, index) in oddsDetailHistories?.data?.inplay?.filter(item => (item?.type === 4 || item?.type === 5))"
                        :key="index"
                        >
                          <tr>
                            <td class="bd-r">{{item?.match_time !== 'HT' ? item?.match_time + '\'' : 'HT'}}</td>
                            <td class="bd-r">{{item?.home_score}}-{{item?.away_score}}</td>
                            <template v-if="item?.type === 4">
                              <td class="no-bd-lr">
                              <span data-o="" class="">{{item?.odds1}}</span>
                              </td>
                              <td class="no-bd-lr">
                                <span data-o="" class="">{{item?.odds2}}</span>
                              </td>
                              <td class="no-bd-lr">
                                <span data-o="" class="">{{item?.odds3}}</span>
                              </td>
                            </template>
                            <template v-if="item?.type === 5">
                              <td colspan="3" class="red">Đóng</td>
                            </template>
                            <td class="lb time">{{ timeStamp2DateUTCTimeZone(item?.update_time, 'yyyy-MM-DD HH:mm')}}</td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="correctdetail"
                    id="correctDetail"
                    v-show="activeSection === 'correctDetail'"
                  >
                    <table class="team-table-other text-center" width="100%">
                      <tbody>
                        <tr class="flexed">
                          <th width="16%">Giờ</th>
                          <th width="16%">Phạt góc</th>
                          <th width="16%">Tài</th>
                          <th width="16%">Phạt góc</th>
                          <th width="16%">Xỉu</th>
                          <th width="20%">Cập nhật</th>
                        </tr>
                        <tr>
                          <td class="rb">93'</td>
                          <td class="rb">9-0</td>
                          <td colspan="3" class="red">Đóng</td>
                          <td
                            class="lb time"
                            name="timeData"
                            data-t="Mon Apr 22 2024 01:53:31 GMT+0800 (Giờ Chuẩn Trung Quốc)"
                            data-tf="6"
                          >
                            22/04 09:53
                          </td>
                        </tr>
                        <tr>
                          <td class="rb">93'</td>
                          <td class="rb">9-0</td>
                          <td>
                            <span data-o="1.68" class="up2">-0.60</span>
                          </td>
                          <td>
                            <span data-o="9.5" class="">9.5</span>
                          </td>
                          <td>
                            <span data-o="0.45" class="down2">0.45</span>
                          </td>
                          <td
                            class="lb time"
                            name="timeData"
                            data-t="Mon Apr 22 2024 01:53:17 GMT+0800 (Giờ Chuẩn Trung Quốc)"
                            data-tf="6"
                          >
                            22/04 09:53
                          </td>
                        </tr>
                        <tr>
                          <td class="rb">1'</td>
                          <td class="rb">0-0</td>
                          <td>
                            <span data-o="0.98" class="up2">0.98</span>
                          </td>
                          <td>
                            <span data-o="10" class="up2">10</span>
                          </td>
                          <td>
                            <span data-o="0.83" class="down2">0.83</span>
                          </td>
                          <td
                            class="lb time"
                            name="timeData"
                            data-t="Mon Apr 22 2024 00:00:57 GMT+0800 (Giờ Chuẩn Trung Quốc)"
                            data-tf="6"
                          >
                            22/04 08:00
                          </td>
                        </tr>
                        <tr>
                          <td class="rb">Live</td>
                          <td class="rb">-</td>
                          <td>
                            <span data-o="0.80" class="">0.80</span>
                          </td>
                          <td>
                            <span data-o="9.5" class="">9.5</span>
                          </td>
                          <td>
                            <span data-o="1.00" class="">1.00</span>
                          </td>
                          <td
                            class="lb time"
                            name="timeData"
                            data-t="Sun Apr 14 2024 15:16:50 GMT+0800 (Giờ Chuẩn Trung Quốc)"
                            data-tf="6"
                          >
                            14/04 23:16
                          </td>
                        </tr>
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
                          <th width="16%">Chủ</th>
                          <th width="16%">HDP</th>
                          <th width="16%">Chủ</th>
                          <th width="16%">Hòa</th>
                          <th width="16%">Khách</th>
                          <th width="20%">Cập nhật</th>
                        </tr>
                        <tr>
                          <td class="rb">Live</td>
                          <td class="rb">1</td>
                          <td>
                            <span class="down2" data-o="1.05">1.05</span>
                          </td>
                          <td>
                            <span class="down2" data-o="2.75">2.75</span>
                          </td>
                          <td>
                            <span class="" data-o="1.75">1.75</span>
                          </td>
                          <td
                            class="lb time"
                            name="timeData"
                            data-t="Sun Apr 21 2024 20:34:06 GMT+0800 (Giờ Chuẩn Trung Quốc)"
                            data-tf="6"
                          >
                            22/04 04:34
                          </td>
                        </tr>
                        <tr>
                          <td class="rb">Live</td>
                          <td class="rb">1</td>
                          <td>
                            <span class="" data-o="1.30">1.30</span>
                          </td>
                          <td>
                            <span class="" data-o="2.60">2.60</span>
                          </td>
                          <td>
                            <span class="" data-o="1.625">1.625</span>
                          </td>
                          <td
                            class="lb time"
                            name="timeData"
                            data-t="Tue Apr 16 2024 19:02:56 GMT+0800 (Giờ Chuẩn Trung Quốc)"
                            data-tf="6"
                          >
                            17/04 03:02
                          </td>
                        </tr>
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
                          <th width="10%">Giờ</th>
                          <th colspan="10">TL</th>
                          <th width="15%">Cập nhật</th>
                        </tr>
                        <tr>
                          <td rowspan="3" class="rb">Live</td>
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
                            data-t="Sun Apr 21 2024 23:56:55 GMT+0800 (Giờ Chuẩn Trung Quốc)"
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
                            other <br />
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
                    v-show="activeSection === 'doubleDetail'"
                  >
                    <table class="team-table-other text-center" width="100%">
                      <tbody>
                        <tr class="flexed">
                          <th width="16%">Giờ</th>
                          <th width="16%">1X</th>
                          <th width="16%">12</th>
                          <th width="16%">X2</th>
                          <th width="20%">Cập nhật</th>
                        </tr>
                        <tr>
                          <td class="rb">Live</td>
                          <td>
                            <span class="up2" data-o="0.07">0.07</span>
                          </td>
                          <td>
                            <span class="up2" data-o="0.14">0.14</span>
                          </td>
                          <td>
                            <span class="down2" data-o="1.94">-0.52</span>
                          </td>
                          <td
                            class="lb time"
                            name="timeData"
                            data-t="Sun Apr 21 2024 23:56:55 GMT+0800 (Giờ Chuẩn Trung Quốc)"
                            data-tf="6"
                          >
                            22/04 07:56
                          </td>
                        </tr>
                        <tr>
                          <td class="rb">Live</td>
                          <td>
                            <span class="down2" data-o="0.066">0.066</span>
                          </td>
                          <td>
                            <span class="" data-o="0.13">0.13</span>
                          </td>
                          <td>
                            <span class="" data-o="1.98">-0.51</span>
                          </td>
                          <td
                            class="lb time"
                            name="timeData"
                            data-t="Sun Apr 21 2024 23:55:52 GMT+0800 (Giờ Chuẩn Trung Quốc)"
                            data-tf="6"
                          >
                            22/04 07:55
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
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
              Chọn công ty
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
              <div id="winTips" class="tips" v-show="oCompanySelected?.length === 0">*Chọn ít nhất 1 công ty</div>
            </div>
          </div>
          <div class="modal-footer" style="display: none">
            <button type="button" class="btn btn-primary" :disabled="oCompanySelected?.length === 0 ? true : false">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { decodeDataAPI, groupBy } from "~/utils/livescore_helper";

const route = useRoute();

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
const oddsDetailHistories = ref([])
const oddCompanyId = ref()


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
        match_id: matchIdSlug.value,
        i_company_id: isportsapi_id
    }).then(resData => {


      oddsDetailHistories.value = resData
    })
}

const fetchMatchsLiveDetail = async (matchIdSlug) => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.MATCHS_LIVE_DETAIL + "/" + matchIdSlug.value
  ).then((resData) => {
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
      if (!useCookie<any>("oCompanyOddSelected").value && !oCompanySelected.value?.includes(item?.id)) {
        oCompanySelected.value.push(item?.id);
      }

    })
    
    oddCompanys.value = oddCompanysList
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
    const europeOdds = route.query?.haft == 1 ? "europeanHaft" : "europeOdds"
    const handicap = route.query?.haft == 1 ? "handicapHalf" : "handicap"
    const overUnder = route.query?.haft == 1 ? "overUnderHalf" : "overUnder"
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
  },
  { immediate: true }
);

onMounted(async () => {
  statefiltercomp.modal_filter_comp = new bootstrap.Modal(
    "#modal_filter_comp",
    {}
  );
  statedetailwin.modal_detail_win = new bootstrap.Modal(
    "#modal_detail_win",
    {}
  );
  setTimeout(async () => {
    await fetchMatchsLiveDetail(matchIdSlug);
    await fetchOdds(matchIdSlug.value);
  }, 1);
});
</script>

<style>
@import url("~/assets/css/main_detail.scss");
@import url("~/assets/css/match_odds.scss");
@import url("~/assets/fonts/iconfont.css");
</style>
