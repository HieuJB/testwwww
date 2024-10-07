<template>
  <div id="" class="match-analysis">
    <div id="analysis-main">
      <div class="innerPage">
        <!-- <HeaderComponent :socket-data="eventSocketData"/> -->
      </div>
      <div id="porletP_Group">
        <div class="porletP" id="porletP0" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP0')?.show === true" 
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP0')?.order">
          <div id="liveCompareDiv">
            <h2 class="team-table-title">{{ $t('Compare odds') }}</h2>
            <div class="oddsAnalysis" ref="tableWrapper" :class="wrapperClass">
              <div :class="productSelectorClass" v-show="isMobileView" style="display:flex">
                <span
                  v-for="(content, index) in mobileContents"
                  :key="index"
                  :data-product="'columodds-' + (index + 1)"
                  @click.prevent="selectProduct('columodds-' + (index + 1))"
                  :class="{ active: selectedProduct === 'columodds-' + (index + 1) }"
                >
                  <div>{{ content }}</div>
                </span>
              </div>

              <table ref="table" class="tr-table team-table-other oddsTable text-center">
                <thead>
                  <tr v-if="$isMobile">
                    <th style="background: white; border: none;" data-mobile-collapse colspan="2"></th>
                    <th style="background: white; border: none;" :data-mobile-content="$t('Hadicap Odd')"><b></b></th>
                    <th style="background: white; border: none;" :data-mobile-content="$t('Over/Under Odd')" data-featured><b></b></th>
                    <th style="background: white; border: none;" :data-mobile-content="$t('European Odd')"><b></b></th>
                    <th style="background: white; border: none;" data-mobile-collapse colspan="2"></th>
                  </tr>
                  <tr v-else>
                    <th data-mobile-collapse colspan="2"></th>
                    <th :data-mobile-content="$t('Hadicap Odd')"><b>{{ $t('Hadicap Odd') }}</b></th>
                    <th :data-mobile-content="$t('Over/Under Odd')" data-featured><b>{{ $t('Over/Under Odd') }}</b></th>
                    <th :data-mobile-content="$t('European Odd')"><b>{{ $t('European Odd') }}</b></th>
                    <th data-mobile-collapse colspan="2"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colspan="2">
                      <div class="row mlr-0">
                        <div class="col-12 col-md-12 col-lg-12 text-center align-self-center title-table">
                          <span><b>{{ $t('Company') }}</b></span>
                        </div>
                      </div>
                    </th>
                    <td data-product="columodds-1">
                      <div class="row mlr-0">
                        <div class="col-4 col-md-4 col-lg-4 text-center align-self-center plr-0">
                          <span>{{ $t('Home') }}</span>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 text-center align-self-center plr-0">
                          <span>HDP</span>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 text-center align-self-center title-table">
                          <span>{{ $t('Away') }}</span>
                        </div>
                      </div>
                    </td>
                    <td data-product="columodds-2">
                      <div class="row mlr-0">
                        <div class="col-4 col-md-4 col-lg-4 text-center align-self-center plr-0">
                          <span>{{ $t('Home') }}</span>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 text-center align-self-center plr-0">
                          <span>{{ $t('Draw') }}</span>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 text-center align-self-center title-table">
                          <span>{{ $t('Away') }}</span>
                        </div>
                      </div>
                    </td>
                    <td data-product="columodds-3">
                      <div class="row mlr-0">
                        <div class="col-4 col-md-4 col-lg-4 text-center align-self-center plr-0">
                          <span>{{ $t('Over') }}</span>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 text-center align-self-center plr-0">
                          <span>{{ $t('First odd') }}</span>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 text-center align-self-center title-table">
                          <span>{{ $t('Under') }}</span>
                        </div>
                      </div>
                    </td>
                    <th class="no-b-l">
                      <div class="row mlr-0">
                        <div class="col-12 col-md-12 col-lg-12 text-center align-self-center title-table">
                          <span><b>{{ $t('History') }}</b></span>
                        </div>
                      </div>
                    </th>
                    <th class="no-b-r">
                      <div class="row mlr-0">
                        <div class="col-12 col-md-12 col-lg-12 text-center align-self-center title-table" :title="$t('Choose a Company')">
                          <img src="/img/fx.svg" alt="plus" @click="showSettingsCompany = true" style="cursor: pointer"/>
                        </div>
                      </div>
                    </th>
                  </tr>

                  <template v-if="oCompanySelected?.length > 0">
                    <template 
                    v-for="(item, index) in oddCompanys?.filter(item => item !== null && !item?.isEmpty)"
                    :key="index"
                    >
                      <template v-if="oCompanySelected.includes(item?.id)">
                        <tr name="earlyOdds">
                          <td rowspan="3" class="companyBg">
                            <b>{{ item?.name }}</b>
                          </td>
                          <td class="fixed-data">{{ $t('Initial') }}</td>

                          <td data-product="columodds-1">
                            <div class="row mlr-0">
                              <div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0">
                                <div class="row mlr-0">
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2 no-b-r">
                                    {{ getOddNumber(item?.handicap?.first?.[1]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2 no-b-lr">
                                    {{ getOddNumber(item?.handicap?.first?.[0]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2 no-b-l">
                                    {{ getOddNumber(item?.handicap?.first?.[2]) }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td data-product="columodds-2">
                            <div class="row mlr-0">
                              <div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0">
                                <div class="row mlr-0">
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center no-b-r">
                                    {{ getOddNumber(item?.overUnder?.first?.[1]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center no-b-lr">
                                    {{ getOddNumber(item?.overUnder?.first?.[0]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center no-b-l">
                                    {{ getOddNumber(item?.overUnder?.first?.[2]) }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td data-product="columodds-3">
                            <div class="row mlr-0">
                              <div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0">
                                <div class="row mlr-0">
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1 no-b-r">
                                    {{ getOddNumber(item?.europeOdds?.first?.[0]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1 no-b-lr">
                                    {{ getOddNumber(item?.europeOdds?.first?.[1]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1 no-b-l">
                                    {{ getOddNumber(item?.europeOdds?.first?.[2]) }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td class="no-b-r" rowspan="3">
                            <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchLiveDetail?.match?.id, query: { tab: MATCH_TAB.ODDS, type: MATCH_TAB.ODDSCOMP }}">
                              <span class="odds-icon" :title="$t('Odd detail')">
                                <i class="icon iconfont icon-odds"></i>
                              </span>
                            </nuxt-link>
                          </td>
                          <td class="no-b-l" rowspan="3" :title="$t('Delete')">
                            <i class="icon iconfont icon-font-reduce cursor-pointer" @click="checkOCompany(item?.id)"></i>
                          </td>
                        </tr>

                        <tr class="oddsdata" id="tr_o_2_8" name="liveOdds">
                          <td class="fixed-data">Live</td>
                          <td data-product="columodds-1">
                            <div class="row mlr-0">
                              <div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0">
                                <div class="row mlr-0">
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2 no-b-r">
                                    {{ getOddNumber(item?.handicap?.live?.[1]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2 no-b-lr">
                                    {{ getOddNumber(item?.handicap?.live?.[0]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2 no-b-l">
                                    {{ getOddNumber(item?.handicap?.live?.[2]) }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td data-product="columodds-2">
                            <div class="row mlr-0">
                              <div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0">
                                <div class="row mlr-0">
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center no-b-r">
                                    {{ getOddNumber(item?.overUnder?.live?.[1]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center no-b-lr">
                                    {{ getOddNumber(item?.overUnder?.live?.[0]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center no-b-l">
                                    {{ getOddNumber(item?.overUnder?.live?.[2]) }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td data-product="columodds-3">
                            <div class="row mlr-0">
                              <div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0">
                                <div class="row mlr-0">
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1 no-b-r">
                                    {{ getOddNumber(item?.europeOdds?.live?.[0]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1 no-b-lr">
                                    {{ getOddNumber(item?.europeOdds?.live?.[1]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1 no-b-l">
                                    {{ getOddNumber(item?.europeOdds?.live?.[2]) }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>

                        <tr class="oddsdata" id="tr_o_3_8" name="runOdds">
                          <td class="lo-f2 fixed-data">{{ $t('Run') }}</td>
                          <td data-product="columodds-1">
                            <div class="row mlr-0">
                              <div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0">
                                <div class="row mlr-0">
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2r no-b-r">
                                    {{ getOddNumber(item?.handicap?.run?.[1]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2r no-b-lr">
                                    {{ getOddNumber(item?.handicap?.run?.[0]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2r no-b-l">
                                    {{ getOddNumber(item?.handicap?.run?.[2]) }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td data-product="columodds-2">
                            <div class="row mlr-0">
                              <div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0">
                                <div class="row mlr-0">
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td4r no-b-r">
                                    {{ getOddNumber(item?.overUnder?.run?.[1]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td4r no-b-lr">
                                    {{ getOddNumber(item?.overUnder?.run?.[0]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td4r no-b-l">
                                    {{ getOddNumber(item?.overUnder?.run?.[2]) }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td data-product="columodds-3">
                            <div class="row mlr-0">
                              <div class="col-12 col-md-12 col-lg-12 text-center align-self-center plr-0">
                                <div class="row mlr-0">
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1r no-b-r">
                                    {{ getOddNumber(item?.europeOdds?.run?.[0]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1r no-b-lr">
                                    {{ getOddNumber(item?.europeOdds?.run?.[1]) }}
                                  </div>
                                  <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td1r no-b-l">
                                    {{ getOddNumber(item?.europeOdds?.run?.[2]) }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </template>
                    </template>
                  </template>
                  <tr v-else>
                    <td colspan="13" class="nodata" style="display: table-cell;">{{ $t('This company has no data temporarily, please choose another company') }}
                      <div class="btn" @click="showSettingsCompany = true"><i class="icon iconfont icon-font-injured"></i>{{ $t('Select') }}<div></div></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="porletP" id="porletP1" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP1')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP1')?.order">
          <div>
            <h2 class="team-table-title">{{ $t('Who will win?') }}</h2>
            <div class="fx">
              <div class="vote">
                <div class="teamicon" style="width: 50px  !important; height: 50px; display: flex; justify-content: center; align-items: center;">
                  <img style="" :class="!!matchLiveDetail?.match?.home_team?.national ? 'national' : 'p-1'" :src="getLiveScoreImage(!!matchLiveDetail?.match?.home_team?.national && matchLiveDetail?.match?.home_team?.country_logo_o ? matchLiveDetail?.match?.home_team?.country_logo_o : matchLiveDetail?.match?.home_team?.logo_o, 'team') + '!h50'"  :alt="matchLiveDetail?.match?.home_team?.name">
                </div>
                <div id="voteBtn" class="button on">
                  <span class="pItem win-f" @click="AddNote(1)" :class="voteBtn === 1 ? 'o-win' : ''">{{ $t('Home') }}</span>
                  <span class="pItem draw-f" @click="AddNote(2)" :class="voteBtn === 2 ? 'o-draw' : ''">{{ $t('Draw') }}</span>
                  <span class="pItem lose-f" @click="AddNote(3)" :class="voteBtn === 3 ? 'o-lose' : ''">{{ $t('Away') }}</span>
                </div>
                <div class="teamicon">
                  <img :class="!!matchLiveDetail?.match?.away_team?.national ? 'national' : 'p-1'" :src="getLiveScoreImage(!!matchLiveDetail?.match?.away_team?.national && matchLiveDetail?.match?.away_team?.country_logo_o ? matchLiveDetail?.match?.away_team?.country_logo_o : matchLiveDetail?.match?.away_team?.logo_o, 'team') + '!h50'" :alt="matchLiveDetail?.match?.away_team?.name">
                </div>
              </div>
              <div class="text-vote text-center">
                <!-- <span class="ext">See the results after voting. Votes: 33</span> -->
              </div>
              <div class="vote" id="voteTxt">
                <div class="win-f">{{ (winF * 100 / (winF + drawF + loseF)).toFixed(1) }}% <span>({{ winF }})</span></div>
                <div class="draw-f">{{ (drawF * 100 / (winF + drawF + loseF)).toFixed(1) }}% <span>({{ drawF }})</span></div>
                <div class="lose-f">{{ (loseF * 100 / (winF + drawF + loseF)).toFixed(1) }}% <span>({{ loseF }})</span></div>
              </div>
              <div id="voteBar" class="vote-bar o-draw">
                <i id="hbar" class="barH o-win" :style="'width: ' + (winF * 100 / (winF + drawF + loseF)).toFixed(1) + '%'"></i>
                <i id="gbar" class="barG o-lose" :style="'width: ' + (loseF * 100 / (winF + drawF + loseF)).toFixed(1) + '%'"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="porletP" id="porletP2" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP2')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP2')?.order">
          <div
            class="content strength"
            id="strengthChart"
            style="display: block"
          >
            <div class="team-table-title row">
              <span class="team-table-xq-home col-4 text-start">
                <span>
                  {{ matchLiveDetail?.match?.home_team?.name }}
                </span>
              </span>
              <span class="col-4">{{ $t('Compare Strength') }}</span>
              <span class="team-table-xq-guest col-4 text-end">
                <span>
                  {{ matchLiveDetail?.match?.away_team?.name }}
                </span>
              </span>
            </div>
            <div class="team-bg-h1">
              <span class="home-bg"></span>
              <span class="away-bg"></span>
            </div>
            <div class="box-radar row">
              <div id="radar" class="radar col-sm-12 col-md-6">
                <div id="point_score">
                  <div class="home_score d-block d-sm-block d-md-none" id="hRadarScore">{{ homeTotalComparisonChar }}</div>
                  <div class="guest_score d-block d-sm-block d-md-none" id="gRadarScore">{{ awayTotalComparisonChar }}</div>
                </div>
                <div class="box_map_radar row">
                  <div class="home_score col-lg-2 col-sm-2 d-none d-sm-none d-md-inline-block" id="hRadarScore">{{ homeTotalComparisonChar }}</div>
                  <div class="map col-lg-8 col-sm-8">
                    <div id="chartContainer"
                      ref="chartContainer"
                      style="width: 100%; height:218px;"
                    ></div>
                  </div>
                  <div class="guest_score col-lg-2 col-sm-2 d-none d-sm-none d-md-inline-block" id="gRadarScore">{{ awayTotalComparisonChar }}</div>
                </div>
              </div>
              <div class="bar col-sm-12 col-md-6">
                <ul class="options">
                  <span id="strengthOptions">
                    <li
                      option="1"
                      :class="{ on: activeSectionTable === 'h2h' }"
                      @click="setActiveSectionTable('h2h')"
                    >
                      {{ $t('Confrontation') }}
                    </li>
                    <li
                      option="2"
                      :class="{ on: activeSectionTable === 'state' }"
                      @click="setActiveSectionTable('state')"
                    >
                      {{ $t('Recent status') }}
                    </li>
                    <li
                      option="3"
                      :class="{ on: activeSectionTable === 'attack' }"
                      @click="setActiveSectionTable('attack')"
                    >
                      {{ $t('Attack') }}
                    </li>
                    <li
                      option="4"
                      :class="{ on: activeSectionTable === 'defence' }"
                      @click="setActiveSectionTable('defence')"
                    >
                      {{ $t('Defense') }}
                    </li>
                    <li
                      option="5"
                      :class="{ on: activeSectionTable === 'value' }"
                      @click="setActiveSectionTable('value')"
                    >
                      {{ $t('Value') }}
                    </li>
                    <li
                      option="6"
                      :class="{ on: activeSectionTable === 'others' }"
                      @click="setActiveSectionTable('others')"
                    >
                      {{ $t('Other') }} 
                    </li>
                  </span>
                </ul>
                <div class="h2h" v-show="activeSectionTable === 'h2h'" :class="{ active: activeSectionTable === 'h2h' }">
                  <ul id="barCompareList" class="fx-tb-a compare">
                    <li>
                      <div class="fx-tb-title title">
                        <span class="team-home-f">{{ h2hComparison?.[8] }}%</span>
                        <span> {{ $t('Compare Head to Head') }}</span>
                        <span class="team-away-f">{{ h2hComparison?.[9] }}%</span>
                      </div>
                      <div class="team-h1">
                        <span class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? h2hComparison?.[8] + '%' : '50%' }"></span>
                        <span class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? h2hComparison?.[9] + '%' : '50%' }"></span>
                      </div>
                    </li>
                    <li class="fx-tb-label">
                      <div class="fx-tb-title">
                        <span class="tb-title-all">{{ $t('All') }}</span>
                      </div>
                    </li>
                    <li>
                      <div class="detail f-l">{{ h2hComparison?.[2] }}</div>
                      <div class="fx-td-data">
                        <div class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? h2hComparison?.[0] + '%' : '0%' }"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? h2hComparison?.[1] + '%' : '0%' }"></div>
                      </div>
                      <div class="detail f-r">{{ h2hComparison?.[3] }}</div>
                    </li>
                    <li class="fx-tb-label">
                      <div class="fx-tb-title">
                        <span class="tb-title-all">{{ $t('Home - Away similar') }}</span>
                      </div>
                    </li>
                    <li>
                      <div class="detail f-l">{{ h2hComparison?.[6] }}</div>
                      <div class="fx-td-data">
                        <div class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? h2hComparison?.[4] + '%' : '0%' }"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? h2hComparison?.[5] + '%' : '0%' }"></div>
                      </div>
                      <div class="detail f-r">{{ h2hComparison?.[7] }}</div>
                    </li>
                  </ul>
                </div>
                <div class="state" v-show="activeSectionTable === 'state'" :class="{ active: activeSectionTable === 'state' }">
                  <ul id="barCompareList" class="fx-tb-a compare">
                    <li>
                      <div class="fx-tb-title title">
                        <span class="team-home-f">{{ stateComparison?.[8] }}%</span>
                        <span>{{ $t('Compare Performance') }}</span>
                        <span class="team-away-f">{{ stateComparison?.[9] }}%</span>
                      </div>
                      <div class="team-h1">
                        <span class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[8] + '%' : '50%' }"></span>
                        <span class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[9] + '%' : '50%' }"></span>
                      </div>
                    </li>
                    <li class="fx-tb-label">
                      <div class="fx-tb-title">
                        <span class="tb-title-all">{{ $t('All') }}</span>
                      </div>
                    </li>
                    <li>
                      <div class="detail f-l">{{ stateComparison?.[2] }}</div>
                      <div class="fx-td-data">
                        <div class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[0] + '%' : '0%' }"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[1] + '%' : '0%' }"></div>
                      </div>
                      <div class="detail f-r">{{ stateComparison?.[3] }}</div>
                    </li>
                    <li class="fx-tb-label">
                      <div class="fx-tb-title">
                        <span class="tb-title-all">{{ $t('Home - Away similar') }}</span>
                      </div>
                    </li>
                    <li>
                      <div class="detail f-l">{{ stateComparison?.[6] }}</div>
                      <div class="fx-td-data">
                        <div class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[4] + '%' : '0%' }"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[5] + '%' : '0%' }"></div>
                      </div>
                      <div class="detail f-r">{{ stateComparison?.[7] }}</div>
                    </li>
                  </ul>
                </div>
                <div class="attack" v-show="activeSectionTable === 'attack'" :class="{ active: activeSectionTable === 'attack' }">
                  <ul id="barCompareList" class="fx-tb-a compare">
                    <li>
                      <div class="fx-tb-title title">
                        <span class="team-home-f">{{ stateComparison?.[18] }}%</span>
                        <span>{{ $t('Attack Comparison') }}</span>
                        <span class="team-away-f">{{ stateComparison?.[19] }}%</span>
                      </div>
                      <div class="team-h1">
                        <span class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[18] + '%' : '50%' }"></span>
                        <span class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[19] + '%' : '50%' }"></span>
                      </div>
                    </li>
                    <li class="fx-tb-label">
                      <div class="fx-tb-title">
                        <span class="tb-title-all">{{ $t('All') }}</span>
                      </div>
                    </li>
                    <li>
                      <div class="detail f-l">{{ stateComparison?.[12] }}</div>
                      <div class="fx-td-data">
                        <div class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[10] + '%' : '0%' }"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[11] + '%' : '0%' }"></div>
                      </div>
                      <div class="detail f-r">{{ stateComparison?.[13] }}</div>
                    </li>
                    <li class="fx-tb-label">
                      <div class="fx-tb-title">
                        <span class="tb-title-all">{{ $t('Home - Away similar') }}</span>
                      </div>
                    </li>
                    <li>
                      <div class="detail f-l">{{ stateComparison?.[16] }}</div>
                      <div class="fx-td-data">
                        <div class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[14] + '%' : '0%' }"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[15] + '%' : '0%' }"></div>
                      </div>
                      <div class="detail f-r">{{ stateComparison?.[17] }}</div>
                    </li>
                  </ul>
                </div>
                <div class="defence" v-show="activeSectionTable === 'defence'" :class="{ active: activeSectionTable === 'defence' }">
                  <ul id="barCompareList" class="fx-tb-a compare">
                    <li>
                      <div class="fx-tb-title title">
                        <span class="team-home-f">{{ stateComparison?.[28] }}%</span>
                        <span>{{ $t('Defense Comparison') }}</span>
                        <span class="team-away-f">{{ stateComparison?.[29] }}%</span>
                      </div>
                      <div class="team-h1">
                        <span class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[28] + '%' : '50%' }"></span>
                        <span class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[29] + '%' : '50%' }"></span>
                      </div>
                    </li>
                    <li class="fx-tb-label">
                      <div class="fx-tb-title">
                        <span class="tb-title-all">{{ $t('All') }}</span>
                      </div>
                    </li>
                    <li>
                      <div class="detail f-l">{{ stateComparison?.[20] }}</div>
                      <div class="fx-td-data">
                        <div class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[22] + '%' : '0%' }"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[23] + '%' : '0%' }"></div>
                      </div>
                      <div class="detail f-r">{{ stateComparison?.[21] }}</div>
                    </li>
                    <li class="fx-tb-label">
                      <div class="fx-tb-title">
                        <span class="tb-title-all">{{ $t('Home - Away similar') }}</span>
                      </div>
                    </li>
                    <li>
                      <div class="detail f-l">{{ stateComparison?.[24] }}</div>
                      <div class="fx-td-data">
                        <div class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[26] + '%' : '0%' }"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[27] + '%' : '0%' }"></div>
                      </div>
                      <div class="detail f-r">{{ stateComparison?.[25] }}</div>
                    </li>
                  </ul>
                </div>
                <div class="value" v-show="activeSectionTable === 'value'" :class="{ active: activeSectionTable === 'value' }">
                  <ul id="barCompareList" class="fx-tb-a compare">
                    <li>
                      <div class="fx-tb-title title">
                        <span class="team-home-f">{{ homeValue }}%</span>
                        <span>{{ $t('Compare Values') }}</span>
                        <span class="team-away-f">{{ awayValue }}%</span>
                      </div>
                      <div class="team-h1">
                        <span class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? homeValue + '%' : '50%' }"></span>
                        <span class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? awayValue + '%' : '50%' }"></span>
                      </div>
                    </li>
                    <li class="fx-tb-label">
                      <div class="fx-tb-title">
                        <span class="tb-title-all">{{ $t('Compare Values') }}</span>
                      </div>
                    </li>
                    <li>
                      <div class="detail f-l">{{ currencyFormatter(matchesAnalysis?.team?.home_value) }}</div>
                      <div class="fx-td-data">
                        <div class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? homeValue + '%' : '0%' }"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? awayValue + '%' : '0%' }"></div>
                      </div>
                      <div class="detail f-r">{{ currencyFormatter(matchesAnalysis?.team?.away_value) }}</div>
                    </li>
                  </ul>
                </div>
                <div class="others" v-show="activeSectionTable === 'others'" :class="{ active: activeSectionTable === 'others' }">
                  <ul id="barCompareList" class="fx-tb-a compare">
                    <li class="fx-tb-label">
                      <div class="fx-tb-title">
                        <span class="tb-title-all">{{ $t('Corners per match') }}</span>
                      </div>
                    </li>
                    <li>
                      <div class="detail f-l">{{ stateComparison?.[30] }}</div>
                      <div class="fx-td-data">
                        <div class="home-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[32] + '%' : '0%' }"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg bar_shade" :class="{ 'start-transition': startTransition }" :style="{ width: startTransition ? stateComparison?.[33] + '%' : '0%' }"></div>
                      </div>
                      <div class="detail f-r">{{ stateComparison?.[31] }}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="survey" id="survey">
              <div class="tips">
                * {{ $t('The above data is for reference only and is generated from recent match statistics') }}
              </div>
              <div class="supportbtn">
                <span
                  class="icon iconfont icon-font-small-support-off1 good" :class="surveyGood > GOOD_F ? 'o-lose' : 'win-f'" @click="surveyGood++"
                  >{{surveyGood}}</span
                >
                <span
                  class="icon iconfont icon-font-small-support-off1 bad " :class="surveyBad > BAD_F ? 'o-win' : 'lose-f'"  @click="surveyBad++"
                  >{{surveyBad}}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="porletP" id="porletP4" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP4')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP4')?.order">
          <div>
            <h2 class="team-table-title">{{ $t('Standing info') }}</h2>
            <div class="team-div table-score row">
              <div class="home-div">
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  class="team-table-home table-no-db-lr text-center"
                >
                  <tbody>
                    <tr class="team-home">
                      <td height="28" colspan="10">
                        <span>
                          [{{  matchLiveDetail?.match?.competition?.short_name }}-{{  standingsTable?.home?.position }}] {{ matchLiveDetail?.match?.home_team?.name }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="rankbox">
                  <table class="eTable adaptMt" id="etable-header" width="15%" cellspacing="0" cellpadding="0" style="float: left; min-width: 80px">
                    <tbody>
                      <tr class="bd-l">
                        <th :title="$t('Full time')">FT</th>
                      </tr>
                      <tr class="bd-l">
                        <td>{{ $t('Total') }}</td>
                      </tr>
                      <tr class="bd-l">
                        <td>
                          <span class="team-home-f">{{ $t('Home') }}</span>
                        </td>
                      </tr>
                      <tr class="bd-l">
                        <td>
                          <span class="team-away-f">{{ $t('Away') }}</span>
                        </td>
                      </tr>
                      <tr class="bd-l">
                        <td>{{ $t('SRecent 6') }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="rankdata w-100" width="85%">
                    <table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%">
                      <tbody>
                        <tr>
                          <th>{{ $t('Match') }}</th>
                          <th>{{ $t('Win') }}</th>
                          <th>{{ $t('Draw') }}</th>
                          <th>{{ $t('Loss') }}</th>
                          <th>{{ $t('SGoal') }}</th>
                          <th>{{ $t('Missed') }}</th>
                          <th>{{ $t('Points') }}</th>
                          <th>{{ $t('Rank') }}</th>
                          <th :title="$t('Win rate')">{{ $t('W') }}%</th>
                        </tr>
                        <tr>
                          <td>{{ standingsTable?.home?.total }}</td>
                          <td>{{ standingsTable?.home?.won }}</td>
                          <td>{{ standingsTable?.home?.draw }}</td>
                          <td>{{ standingsTable?.home?.loss }}</td>
                          <td>{{ standingsTable?.home?.goals }}</td>
                          <td>{{ standingsTable?.home?.goals_against }}</td>
                          <td class="red">{{ standingsTable?.home?.points }}</td>
                          <td class="red">{{ standingsTable?.home?.position }}</td>
                          <td>{{ standingsTable?.home?.total > 0 ? (standingsTable?.home?.won * 100 / standingsTable?.home?.total).toFixed(1) : ''}}%</td>
                        </tr>
                        <tr>
                          <td>{{ standingsTable?.home?.home_total }}</td>
                          <td>{{ standingsTable?.home?.home_won }}</td>
                          <td>{{ standingsTable?.home?.home_draw }}</td>
                          <td>{{ standingsTable?.home?.home_loss }}</td>
                          <td>{{ standingsTable?.home?.home_goals }}</td>
                          <td>{{ standingsTable?.home?.home_goals_against }}</td>
                          <td class="red">{{ standingsTable?.home?.home_points }}</td>
                          <td class="red">{{ standingsTable?.home?.home_position }}</td>
                          <td>{{ standingsTable?.home?.home_total > 0 ? (standingsTable?.home?.home_won * 100 / standingsTable?.home?.home_total).toFixed(1) : ''}}%</td>
                        </tr>
                        <tr>
                          <td>{{ standingsTable?.home?.away_total }}</td>
                          <td>{{ standingsTable?.home?.away_won }}</td>
                          <td>{{ standingsTable?.home?.away_draw }}</td>
                          <td>{{ standingsTable?.home?.away_loss }}</td>
                          <td>{{ standingsTable?.home?.away_goals }}</td>
                          <td>{{ standingsTable?.home?.away_goals_against }}</td>
                          <td class="red">{{ standingsTable?.home?.away_points }}</td>
                          <td class="red">{{ standingsTable?.home?.away_position }}</td>
                          <td>{{ standingsTable?.home?.away_total > 0 ? (standingsTable?.home?.away_won * 100 / standingsTable?.home?.away_total).toFixed(1) : ''}}%</td>
                        </tr>
                        <tr>
                          <td>{{ standingsTable?.home?.lastest?.[0] }}</td>
                          <td>{{ standingsTable?.home?.lastest?.[1] }}</td>
                          <td>{{ standingsTable?.home?.lastest?.[2] }}</td>
                          <td>{{ standingsTable?.home?.lastest?.[3] }}</td>
                          <td>{{ standingsTable?.home?.lastest?.[4] }}</td>
                          <td>{{ standingsTable?.home?.lastest?.[5] }}</td>
                          <td class="red">{{ standingsTable?.home?.lastest?.[6] }}</td>
                          <td></td>
                          <td>{{ standingsTable?.home?.lastest?.[7] }}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="guest-div">
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  class="team-table-guest table-no-db-lr text-center"
                >
                  <tbody>
                    <tr class="team-guest">
                      <td height="28" colspan="10">
                        <span>
                          [{{  matchLiveDetail?.match?.competition?.short_name }}-{{  standingsTable?.away?.position }}] {{ matchLiveDetail?.match?.away_team?.name }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="rankbox">
                  <table class="eTable adaptMt" id="etable-header" width="15%" cellspacing="0" cellpadding="0" style="float: left; min-width: 80px">
                    <tbody>
                      <tr class="bd-l">
                        <th :title="$t('Full time')">FT</th>
                      </tr>
                      <tr class="bd-l">
                        <td>{{ $t('Total') }}</td>
                      </tr>
                      <tr class="bd-l">
                        <td>
                          <span class="team-home-f">{{ $t('Home') }}</span>
                        </td>
                      </tr>
                      <tr class="bd-l">
                        <td>
                          <span class="team-away-f">{{ $t('Away') }}</span>
                        </td>
                      </tr>
                      <tr class="bd-l">
                        <td>{{ $t('SRecent 6') }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="rankdata w-100" width="85%">
                    <table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%">
                      <tbody>
                        <tr>
                          <th>{{ $t('Match') }}</th>
                          <th>{{ $t('Win') }}</th>
                          <th>{{ $t('Draw') }}</th>
                          <th>{{ $t('Loss') }}</th>
                          <th>{{ $t('SGoal') }}</th>
                          <th>{{ $t('Missed') }}</th>
                          <th>{{ $t('Points') }}</th>
                          <th>{{ $t('Rank') }}</th>
                          <th :title="$t('Win rate')">{{ $t('W') }}%</th>
                        </tr>
                        <tr>
                          <td>{{ standingsTable?.away?.total }}</td>
                          <td>{{ standingsTable?.away?.won }}</td>
                          <td>{{ standingsTable?.away?.draw }}</td>
                          <td>{{ standingsTable?.away?.loss }}</td>
                          <td>{{ standingsTable?.away?.goals }}</td>
                          <td>{{ standingsTable?.away?.goals_against }}</td>
                          <td class="red">{{ standingsTable?.away?.points }}</td>
                          <td class="red">{{ standingsTable?.away?.position }}</td>
                          <td>{{ standingsTable?.away?.total > 0 ? (standingsTable?.away?.won * 100 / standingsTable?.away?.total).toFixed(1) : ''}}%</td>
                        </tr>
                        <tr>
                          <td>{{ standingsTable?.away?.home_total }}</td>
                          <td>{{ standingsTable?.away?.home_won }}</td>
                          <td>{{ standingsTable?.away?.home_draw }}</td>
                          <td>{{ standingsTable?.away?.home_loss }}</td>
                          <td>{{ standingsTable?.away?.home_goals }}</td>
                          <td>{{ standingsTable?.away?.home_goals_against }}</td>
                          <td class="red">{{ standingsTable?.away?.home_points }}</td>
                          <td class="red">{{ standingsTable?.away?.home_position }}</td>
                          <td>{{ standingsTable?.away?.home_total > 0 ? (standingsTable?.away?.home_won * 100 / standingsTable?.away?.home_total).toFixed(1) : ''}}%</td>
                        </tr>
                        <tr>
                          <td>{{ standingsTable?.away?.away_total }}</td>
                          <td>{{ standingsTable?.away?.away_won }}</td>
                          <td>{{ standingsTable?.away?.away_draw }}</td>
                          <td>{{ standingsTable?.away?.away_loss }}</td>
                          <td>{{ standingsTable?.away?.away_goals }}</td>
                          <td>{{ standingsTable?.away?.away_goals_against }}</td>
                          <td class="red">{{ standingsTable?.away?.away_points }}</td>
                          <td class="red">{{ standingsTable?.away?.away_position }}</td>
                          <td>{{ standingsTable?.away?.away_total> 0 ? (standingsTable?.away?.away_won * 100 / standingsTable?.away?.away_total).toFixed(1) : ''}}%</td>
                        </tr>
                        <tr>
                          <td>{{ standingsTable?.away?.lastest?.[0] }}</td>
                          <td>{{ standingsTable?.away?.lastest?.[1] }}</td>
                          <td>{{ standingsTable?.away?.lastest?.[2] }}</td>
                          <td>{{ standingsTable?.away?.lastest?.[3] }}</td>
                          <td>{{ standingsTable?.away?.lastest?.[4] }}</td>
                          <td>{{ standingsTable?.away?.lastest?.[5] }}</td>
                          <td class="red">{{ standingsTable?.away?.lastest?.[6] }}</td>
                          <td></td>
                          <td>{{ standingsTable?.away?.lastest?.[7] }}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="porletP" id="porletP5" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP5')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP5')?.order">
          <div>
            <h2 class="team-table-title">{{ $t('Head to head record') }}</h2>
            <table
              id="table_v3"
              width="100%"
              cellpadding="0"
              cellspacing="0"
              class="table-no-db-lr text-center"
            >
              <tbody>
                <tr class="other-title">
                  <td colspan="16">
                    <span>
                      {{ matchLiveDetail?.match?.home_team?.name }}
                    </span>
                    &nbsp;&nbsp;
                    <input type="checkbox" id="cb_sos3" v-model="cb_sos3"/>
                    <label for="cb_sos3">{{ $t('Home') }}</label>&nbsp;&nbsp;
                    <input
                      type="checkbox"
                      id="checkboxleague3"
                      value="2"
                      name="checkboxleague3"
                      v-model="checkboxleague3"
                    />
                    <label for="checkboxleague3"> {{ $t('Similar tournaments') }}</label>&nbsp;&nbsp;
                    <input type="checkbox" id="ftType_3" disabled/>
                    <label for="ftType_3" :title="$t('Haft time')">HT</label>&nbsp;&nbsp;
                    <select id="selectMatchCount3" class="countSelect" v-model="selectMatchCount3">
                      <option 
                        v-for="(item) in MATCH_LIST_OPTION" 
                        :key="item?.key"
                        :value="item?.key">
                        {{ $t(item?.value) }}{{$t('Recent last') }}
                      </option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="rankbox">
              <table class="eTable adaptMt team-table-home table-no-db-lr " id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="float: left; min-width: 135px">
                <tbody>
                  <tr class="bd-l">
                    <th width="" rowspan="2">{{ $t('Home - Away') }}</th>
                  </tr>
                  <tr class="bd-l">
                    <th></th>
                  </tr>
                  <template 
                    v-for="(item, index) in matchesAnalysis?.head_to_head?.filter(match => cb_sos3 ? matchLiveDetail?.match?.home_team?.i_team == match?.[5] : match)?.filter(match => checkboxleague3 ? matchLiveDetail?.match?.i_competition_id == match?.[2] : match)" 
                    :key="index">
                    <tr vs="0" name="2" class="bd-l bd-b"
                    v-if="(index < selectMatchCount3)"
                    >
                      <td>
                        <span class="home lRow draw">
                          <a href="">
                            <span :class="(matchLiveDetail?.match?.home_team?.i_team == item?.[5]) ? 'team-home-f' : ''">{{ item?.[4] }}</span>
                          </a>
                        </span>
                        <span class="guest lRow">
                          <a href="">
                            <span :class="(matchLiveDetail?.match?.home_team?.i_team == item?.[7]) ? 'team-home-f' : ''">{{ item?.[6] }}</span>
                          </a>
                        </span>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <div class="rankdata" width="75%">
                <table class="eTable adaptMt team-table-home table-no-db-lr " cellspacing="0" cellpadding="0" width="100%">
                  <tbody>
                    <tr>
                      <th width="" rowspan="2">{{ $t('League') }}</th>
                      <th width="" rowspan="2">{{ $t('Day') }} </th>
                      <th width="" rowspan="2" id="FScore_1">{{ $t('Score') }}</th>
                      <th width="" rowspan="2" id="FCorner_1">{{ $t('Corner kick') }} </th>
                      <th width="" colspan="4" class="table-bd-lr">
                        <p class="d-flex justify-content-center">
                          <select id="sSelect_1" disabled>
                              <option value="281">Bet365</option>
                              <option value="474">Sbobet</option>
                              <option value="18">12Bet</option>
                              <option value="545" selected>Crown</option>
                              <option value="0">1x2</option>
                              <option value="90">Easybet </option>
                              <option value="115">William Hill</option>
                              <option value="80">Macauslot</option>
                              <option value="82">Ladbrokes</option>
                          </select>  
                          <select id="sType_1" disabled>
                              <option value="0">{{ $t('First') }}</option>
                              <option value="1" selected>{{ $t('Last') }}</option>
                          </select>
                        </p>
                      </th>
                      <th width="" colspan="4" class="table-bd-lr">
                        <p class="d-flex justify-content-center">
                          <select id="hSelect_1" disabled>
                              <option value="8">Bet365</option>
                              <option value="31">Sbobet</option>
                              <option value="24">12bet</option>
                              <option value="3" selected>Crown</option>
                              <option value="12">Easybets</option>
                          </select>  
                          <select id="hType_1" disabled>
                              <option value="0">{{ $t('First') }}</option>
                              <option value="1" selected>{{ $t('Last') }}</option>
                          </select>
                        </p>
                      </th>
                      <th width="" class="rl ll" rowspan="2">{{ $t('T/X') }}</th>
                    </tr>
                    <tr>
                      <th class="table-bd-l" :title="$t('Home win')">{{ $t('HW') }}</th>
                      <th :title="$t('Draw')">{{ $t('D') }}</th>
                      <th :title="$t('Away win')">{{ $t('AW') }}</th>
                      <th class="table-bd-r" :title="$t('Win/Loss')">{{ $t('W/L') }}</th>
                      <th class="table-bd-l" :title="$t('Home')">{{ $t('H') }}</th>
                      <th>{{ $t('AH') }}</th>
                      <th title="$t('Away')">{{ $t('A') }}</th>
                      <th class="table-bd-r">{{ $t('AH') }}</th>
                    </tr>
                    <template 
                      v-for="(item, index) in matchesAnalysis?.head_to_head?.filter(match => cb_sos3 ? matchLiveDetail?.match?.home_team?.i_team == match?.[5] : match)?.filter(match => checkboxleague3 ? matchLiveDetail?.match?.i_competition_id == match?.[2] : match)" 
                      :key="index">
                      <tr vs="0" name="2"
                      v-if="(index < selectMatchCount3)"
                      >
                        <td height="25" :title="item?.[1]">{{ item?.[1] }}</td>
                        <td>
                          <span
                            name="timeData"
                            data-tf="3"
                          >
                            {{ timeStamp2DateUTCTimeZone(item?.[3], 'DD-MM-YY', timeZone) }}
                          </span>
                        </td>
                        <td>
                          <span class="fscore_3 red2">{{ item?.[8] }} - {{ item?.[9] }}</span><br>
                          <span class="hscore_3"> ({{ item?.[10] }} - {{ item?.[11] }})</span>
                        </td>
                        <td>
                          <span class="fcorner_3">{{ item?.[14] }} - {{ item?.[15] }}</span>
                          <span class="hcorner_3"></span>
                        </td>
                        <td class="hbg-td1">{{ item?.[22] }}</td>
                        <td class="hbg-td1">{{ item?.[23] }}</td>
                        <td class="hbg-td1">{{ item?.[24] }}</td>
                        <template v-if="matchLiveDetail?.match?.home_team?.i_team == item?.[5]">
                          <td v-html="getH2HOddEU(item?.[8], item?.[9], $t)"></td>
                        </template>
                        <template v-else-if="matchLiveDetail?.match?.home_team?.i_team == item?.[7]">
                          <td v-html="getH2HOddEU(item?.[9], item?.[8], $t)"></td>
                        </template>
                        <td>{{ item?.[16] }}</td>
                        <td>{{ item?.[17] }}</td>
                        <td>{{ item?.[18] }}</td>
                        <template v-if="matchLiveDetail?.match?.home_team?.i_team == item?.[5]">
                          <td v-html="getH2HOddHadicap(item?.[8], item?.[9], item?.[17], $t)"></td>
                        </template>
                        <template v-else-if="matchLiveDetail?.match?.home_team?.i_team == item?.[7]">
                          <td v-html="getH2HOddHadicap(item?.[9], item?.[8], item?.[17], $t)"></td>
                        </template>
                        <td v-html="getH2HOddTX(item?.[8], item?.[9], item?.[29], $t)"></td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>

            <p class="text-center mt-2" v-html="getH2HStatistics(matchesAnalysis?.head_to_head?.filter(match => checkboxleague3 ? matchLiveDetail?.match?.i_competition_id == match?.[2] : match), selectMatchCount3, matchLiveDetail?.match?.home_team?.i_team, cb_sos3, true, $t)"></p>
          </div>
        </div>
        <div class="porletP" id="porletP6" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP6')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP6')?.order">
          <div>
            <h2 class="team-table-title">{{ $t('Recent achievements') }}</h2>
            <table id="table_v1" width="100%" cellpadding="0" cellspacing="0" class="team-table-home table-no-db-lr text-center">
                <tbody>
                <tr class="team-home">
                    <td colspan="16">
                    <span>
                      {{ matchLiveDetail?.match?.home_team?.name }}
                    </span>  &nbsp;&nbsp;
                    <input type="checkbox" id="cb_sos1" v-model="cb_sos1"><label for="cb_sos1">{{ $t('Home') }}</label> &nbsp;&nbsp;
                    <input type="checkbox" id="checkboxleague1" value="2" name="checkboxleague1" v-model="checkboxleague1">
                    <label for="checkboxleague1"> {{ $t('Similar tournaments') }}</label>  &nbsp;&nbsp;
                    <input type="checkbox" id="ftType_1" disabled> <label for="ftType_1">HT</label>&nbsp;&nbsp; 
                    <select id="selectMatchCount1" class="countSelect" v-model="selectMatchCount1">
                      <option 
                        v-for="(item) in MATCH_LIST_OPTION" 
                        :key="item?.key"
                        :value="item?.key">
                        {{ $t(item?.value) }}{{ $t('Recent last') }}
                      </option>
                    </select>
                    </td>
                </tr>
              </tbody>
            </table>
            <div class="rankbox">
              <table class="eTable adaptMt team-table-home table-no-db-lr " id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="float: left; min-width: 135px">
                <tbody>
                  <tr class="bd-l">
                    <th width="" rowspan="2" class="toolbox">{{ $t('Home - Away') }}</th>
                  </tr>
                  <tr class="bd-l" >
                    <th class="toolbox"></th>
                  </tr>
                  <template 
                  v-for="(item, index) in matchesAnalysis?.home_last_matches?.filter(match => cb_sos1 ? matchLiveDetail?.match?.home_team?.i_team == match?.[5] : match)?.filter(match => checkboxleague1 ? matchLiveDetail?.match?.i_competition_id == match?.[2] : match)" 
                    :key="index">
                    <tr vs="0" name="2" class="bd-l bd-b"
                    v-if="(index < selectMatchCount1)"
                    >
                      <td>
                        <a href="">
                          <span class="home lRow draw" :class="(matchLiveDetail?.match?.home_team?.i_team == item?.[5]) ? 'team-home-f' : ''">{{ item?.[4] }}</span>
                        </a>
                        <a href="">
                          <span  class="lRow" :class="(matchLiveDetail?.match?.home_team?.i_team == item?.[7]) ? 'team-home-f' : ''">{{ item?.[6] }}</span>
                        </a>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <div class="rankdata" width="75%">
                <table class="eTable adaptMt team-table-home table-no-db-lr " cellspacing="0" cellpadding="0" width="100%">
                  <tbody>
                    <tr>
                      <th width="" rowspan="2" class="toolbox">{{ $t('League') }}</th>
                      <th width="" rowspan="2"  class="toolbox">{{ $t('Day') }} </th>
                      <th width="" rowspan="2" id="FScore_1"  class="toolbox">{{ $t('Score') }} </th>
                      <th width="" rowspan="2" id="FCorner_1"  class="toolbox">{{ $t('Corner kick') }} </th>
                      <th width="" colspan="4" class="table-bd-lr toolbox" >
                        <p class="d-flex justify-content-center">
                          <select id="sSelect_1" disabled>
                              <option value="281">Bet365</option>
                              <option value="474">Sbobet</option>
                              <option value="18">12Bet</option>
                              <option value="545" selected>Crown</option>
                              <option value="0">1x2</option>
                              <option value="90">Easybet </option>
                              <option value="115">William Hill</option>
                              <option value="80">Macauslot</option>
                              <option value="82">Ladbrokes</option>
                          </select>  
                          <select id="sType_1" disabled>
                              <option value="0">{{ $t('First') }}</option>
                              <option value="1" selected>{{ $t('Last') }}</option>
                          </select>
                        </p>
                      </th>
                      <th width="" colspan="4" class="table-bd-lr toolbox">
                        <p class="d-flex justify-content-center">
                          <select id="hSelect_1" disabled>
                              <option value="8">Bet365</option>
                              <option value="31">Sbobet</option>
                              <option value="24">12bet</option>
                              <option value="3" selected>Crown</option>
                              <option value="12">Easybets</option>
                          </select>  
                          <select id="hType_1" disabled>
                            <option value="0">{{ $t('First') }}</option>
                            <option value="1" selected>{{ $t('Last') }}</option>
                          </select>
                        </p>
                      </th>
                      <th width="" class="rl ll toolbox" rowspan="2">{{ $t('T/X') }}</th>
                    </tr>
                    <tr>
                      <th class="table-bd-l" :title="$t('Home win')">{{ $t('HW') }}</th>
                      <th :title="$t('Draw')">{{ $t('D') }}</th>
                      <th :title="$t('Away win')">{{ $t('AW') }}</th>
                      <th class="table-bd-r" :title="$t('Win/Loss')">{{ $t('W/L') }}</th>
                      <th class="table-bd-l" :title="$t('Home')">{{ $t('H') }}</th>
                      <th>{{ $t('AH') }}</th>
                      <th title="$t('Away')">{{ $t('A') }}</th>
                      <th class="table-bd-r">{{ $t('AH') }}</th>
                    </tr>
                    <template 
                      v-for="(item, index) in matchesAnalysis?.home_last_matches?.filter(match => cb_sos1 ? matchLiveDetail?.match?.home_team?.i_team == match?.[5] : match)?.filter(match => checkboxleague1 ? matchLiveDetail?.match?.i_competition_id == match?.[2] : match)" 
                      :key="index">
                      <tr vs="0" name="2"
                      v-if="(index < selectMatchCount1)"
                      >
                        <td height="25" :title="item?.[1]">{{ item?.[1] }}</td>
                        <td>
                          <span
                            name="timeData"
                            data-tf="3"
                          >
                            {{ timeStamp2DateUTCTimeZone(item?.[3], 'DD-MM-YY', timeZone) }}
                          </span>
                        </td>
                        <td>
                          <span class="fscore_3 red2">{{ item?.[8] }} - {{ item?.[9] }}</span><br>
                          <span class="hscore_3"> ({{ item?.[10] }} - {{ item?.[11] }})</span>
                        </td>
                        <td>
                          <span class="fcorner_3">{{ item?.[14] }} - {{ item?.[15] }}</span>
                          <span class="hcorner_3"></span>
                        </td>
                        <td class="hbg-td1">{{ item?.[22] }}</td>
                        <td class="hbg-td1">{{ item?.[23] }}</td>
                        <td class="hbg-td1">{{ item?.[24] }}</td>
                        <template v-if="matchLiveDetail?.match?.home_team?.i_team == item?.[5]">
                          <td v-html="getH2HOddEU(item?.[8], item?.[9], $t)"></td>
                        </template>
                        <template v-else-if="matchLiveDetail?.match?.home_team?.i_team == item?.[7]">
                          <td v-html="getH2HOddEU(item?.[9], item?.[8], $t)"></td>
                        </template>
                        <td v-else class="hbg-td1"></td>
                        <td>{{ item?.[16] }}</td>
                        <td>{{ item?.[17] }}</td>
                        <td>{{ item?.[18] }}</td>
                        <template v-if="matchLiveDetail?.match?.home_team?.i_team == item?.[5]">
                          <td v-html="getH2HOddHadicap(item?.[8], item?.[9], item?.[17], $t)"></td>
                        </template>
                        <template v-else-if="matchLiveDetail?.match?.home_team?.i_team == item?.[7]">
                          <td v-html="getH2HOddHadicap(item?.[9], item?.[8], item?.[17], $t)"></td>
                        </template>
                        <td v-else class="hbg-td1"></td>
                        <td v-html="getH2HOddTX(item?.[8], item?.[9], item?.[29], $t)"></td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
            <p class="text-center mt-2" v-html="getH2HStatistics(matchesAnalysis?.home_last_matches?.filter(match => checkboxleague1 ? matchLiveDetail?.match?.i_competition_id == match?.[2] : match), selectMatchCount1, matchLiveDetail?.match?.home_team?.i_team, cb_sos1, true, $t)"></p>
          </div>
          <div>
            <table id="table_v2" width="100%" cellpadding="0" cellspacing="0" class="team-table-guest table-no-db-lr text-center">
              <tbody>
                <tr class="team-guest">
                  <td colspan="16">
                    <span>
                      {{ matchLiveDetail?.match?.away_team?.name }}
                    </span>  &nbsp;&nbsp;
                    <input type="checkbox" id="cb_sos2" v-model="cb_sos2"><label for="cb_sos2">{{$t('Away') }}</label> &nbsp;&nbsp;
                    <input type="checkbox" id="checkboxleague2" value="2" name="checkboxleague2" v-model="checkboxleague2"> <label for="checkboxleague2">{{$t('Similar tournaments') }}</label> &nbsp;&nbsp;
                    <input type="checkbox" id="ftType_2" disabled><label for="ftType_2" >HT</label> &nbsp;&nbsp;
                    <select id="selectMatchCount2" class="countSelect" v-model="selectMatchCount2">
                      <option 
                        v-for="(item) in MATCH_LIST_OPTION" 
                        :key="item?.key"
                        :value="item?.key">
                        {{ $t(item?.value) }}{{$t('Recent last') }}
                      </option>
                    </select>
                  </td>
                </tr>
                </tbody>
            </table>

            <div class="rankbox">
              <table class="eTable adaptMt team-table-home table-no-db-lr " id="etable-header" width="25%" cellspacing="0" cellpadding="0" style="float: left; min-width: 135px">
                <tbody>
                  <tr class="bd-l">
                    <th width="" rowspan="2" class="toolbox">{{ $t('Home - Away') }}</th>
                  </tr>
                  <tr class="bd-l" >
                    <th class="toolbox"></th>
                  </tr>
                  <template 
                    v-for="(item, index) in matchesAnalysis?.away_last_matches?.filter(match => cb_sos2 ? matchLiveDetail?.match?.away_team?.i_team == match?.[7] : match)?.filter(match => checkboxleague2 ? matchLiveDetail?.match?.i_competition_id == match?.[2] : match)" 
                    :key="index">
                    <tr vs="0" name="2" class="bd-l bd-b"
                    v-if="(index < selectMatchCount2)"
                    >
                      <td>
                        <a href="">
                          <span class="away lRow draw" :class="(matchLiveDetail?.match?.away_team?.i_team == item?.[5]) ? 'team-away-f' : ''">{{ item?.[4] }}</span>
                        </a>
                        <a href="">
                          <span class="lRow" :class="(matchLiveDetail?.match?.away_team?.i_team == item?.[7]) ? 'team-away-f' : ''">{{ item?.[6] }}</span>
                        </a>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <div class="rankdata" width="75%">
                <table class="eTable adaptMt team-table-home table-no-db-lr " cellspacing="0" cellpadding="0" width="100%">
                  <tbody>
                    <tr>
                      <th width="" rowspan="2" class="toolbox">{{ $t('League') }}</th>
                      <th width="" rowspan="2"  class="toolbox">{{ $t('Day') }} </th>
                      <th width="" rowspan="2" id="FScore_1"  class="toolbox">{{ $t('Score') }} </th>
                      <th width="" rowspan="2" id="FCorner_1"  class="toolbox">{{ $t('Corner kick') }} </th>
                      <th width="" colspan="4" class="table-bd-lr toolbox" >
                        <p class="d-flex justify-content-center">
                          <select id="sSelect_1" disabled>
                              <option value="281">Bet365</option>
                              <option value="474">Sbobet</option>
                              <option value="18">12Bet</option>
                              <option value="545" selected>Crown</option>
                              <option value="0">1x2</option>
                              <option value="90">Easybet </option>
                              <option value="115">William Hill</option>
                              <option value="80">Macauslot</option>
                              <option value="82">Ladbrokes</option>
                          </select>  
                          <select id="sType_1" disabled>
                            <option value="0">{{ $t('First') }}</option>
                            <option value="1" selected>{{ $t('Last') }}</option>
                          </select>
                        </p>
                      </th>
                      <th width="" colspan="4" class="table-bd-lr toolbox">
                        <p class="d-flex justify-content-center">
                          <select id="hSelect_1" disabled>
                              <option value="8">Bet365</option>
                              <option value="31">Sbobet</option>
                              <option value="24">12bet</option>
                              <option value="3" selected>Crown</option>
                              <option value="12">Easybets</option>
                          </select>  
                          <select id="hType_1" disabled>
                            <option value="0">{{ $t('First') }}</option>
                            <option value="1" selected>{{ $t('Last') }}</option>
                          </select>
                        </p>
                      </th>
                      <th width="" class="rl ll toolbox" rowspan="2">{{ $t('T/X') }}</th>
                    </tr>
                    <tr>
                      <th class="table-bd-l" :title="$t('Home win')">{{ $t('HW') }}</th>
                      <th :title="$t('Draw')">{{ $t('D') }}</th>
                      <th :title="$t('Away win')">{{ $t('AW') }}</th>
                      <th class="table-bd-r" :title="$t('Win/Loss')">{{ $t('W/L') }}</th>
                      <th class="table-bd-l" :title="$t('Home')">{{ $t('H') }}</th>
                      <th>{{ $t('AH') }}</th>
                      <th title="$t('Away')">{{ $t('A') }}</th>
                      <th class="table-bd-r">{{ $t('AH') }}</th>
                    </tr>
                    <template 
                      v-for="(item, index) in matchesAnalysis?.away_last_matches?.filter(match => cb_sos2 ? matchLiveDetail?.match?.away_team?.i_team == match?.[7] : match)?.filter(match => checkboxleague2 ? matchLiveDetail?.match?.i_competition_id == match?.[2] : match)" 
                      :key="index">
                      <tr vs="0" name="2"
                      v-if="(index < selectMatchCount2)"
                      >
                        <td height="25" :title="item?.[1]">{{ item?.[1] }}</td>
                        <td>
                          <span
                            name="timeData"
                            data-tf="3"
                          >
                            {{ timeStamp2DateUTCTimeZone(item?.[3], 'DD-MM-YY', timeZone) }}
                          </span>
                        </td>
                        <td>
                          <span class="fscore_3 red2">{{ item?.[8] }} - {{ item?.[9] }}</span><br>
                          <span class="hscore_3"> ({{ item?.[10] }} - {{ item?.[11] }})</span>
                        </td>
                        <td>
                          <span class="fcorner_3">{{ item?.[14] }} - {{ item?.[15] }}</span>
                          <span class="hcorner_3"></span>
                        </td>
                        <td class="hbg-td1">{{ item?.[22] }}</td>
                        <td class="hbg-td1">{{ item?.[23] }}</td>
                        <td class="hbg-td1">{{ item?.[24] }}</td>
                        <template v-if="matchLiveDetail?.match?.home_team?.i_team == item?.[5]">
                          <td v-html="getH2HOddEU(item?.[8], item?.[9], $t)"></td>
                        </template>
                        <template v-else-if="matchLiveDetail?.match?.home_team?.i_team == item?.[7]">
                          <td v-html="getH2HOddEU(item?.[9], item?.[8], $t)"></td>
                        </template>
                        <td v-else class="hbg-td1"></td>
                        <td>{{ item?.[16] }}</td>
                        <td>{{ item?.[17] }}</td>
                        <td>{{ item?.[18] }}</td>
                        <template v-if="matchLiveDetail?.match?.home_team?.i_team == item?.[5]">
                          <td v-html="getH2HOddHadicap(item?.[8], item?.[9], item?.[17], $t)"></td>
                        </template>
                        <template v-else-if="matchLiveDetail?.match?.home_team?.i_team == item?.[7]">
                          <td v-html="getH2HOddHadicap(item?.[9], item?.[8], item?.[17], $t)"></td>
                        </template>
                        <td v-else class="hbg-td1"></td>
                        <td v-html="getH2HOddTX(item?.[8], item?.[9], item?.[29], $t)"></td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
            <p class="text-center mt-2" v-html="getH2HStatistics(matchesAnalysis?.away_last_matches?.filter(match => checkboxleague2 ? matchLiveDetail?.match?.i_competition_id == match?.[2] : match), selectMatchCount2, matchLiveDetail?.match?.away_team?.i_team, cb_sos2, false, $t)"></p>
          </div>
        </div>
        <div class="porletP" id="porletP8_1" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP8_1')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP8_1')?.order" style="display: none;">
          <h2 class="team-table-title">
            So sánh số liệu
            <select id="com_s" class="data-comp-select" v-model="com_s">
              <option 
                v-for="(item) in MATCH_LIST_OPTION" 
                :key="item?.key"
                :value="item?.key">
                {{ $t(item?.value) }}{{$t('Recent last') }}
              </option>
            </select>
          </h2>
          <table
            width="100%"
            cellpadding="1"
            cellspacing="0"
            class="team-table-other table-no-db-lr text-center"
          >
            <tbody>
              <tr>
                <th>Đội</th>
                <th>Ghi</th>
                <th>Mất</th>
                <th title="Goal Difference">+/-</th>
                <th title="Average Goal">TB được điểm</th>
                <th title="Win Rate">T%</th>
                <th title="Draw Rate">H%</th>
                <th title="Loss Rate">B%</th>
                <th title="Home/Away">C/K</th>
                <th>Ghi</th>
                <th>Mất</th>
                <th title="Goal Difference">+/-</th>
                <th title="Average Goal">TB được điểm</th>
                <th title="Win Rate">T%</th>
                <th title="Draw Rate">H%</th>
                <th title="Loss Rate">B%</th>
              </tr>
              <tr id="tr_com_h">
                <td class="home-m">{{ matchLiveDetail?.match?.home_team?.name }}</td>
                <td 
                v-for="(value, index) in getDataComparison(matchesAnalysis?.home_last_matches, matchLiveDetail?.match?.home_team?.i_team, true, com_s, $t)"
                :key="index"
                >
                  {{ value }}
                </td>
              </tr>
              <tr id="tr_com_g">
                <td class="guest-m">{{ matchLiveDetail?.match?.away_team?.name }}</td>
                <td 
                v-for="(value, index) in getDataComparison(matchesAnalysis?.away_last_matches, matchLiveDetail?.match?.away_team?.i_team, false, com_s, $t)"
                :key="index"
                >
                  {{ value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="porletP" id="porletP8" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP8')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP8')?.order">
          <div
            class="content strength"
            id="strengthChart"
            style="display: block"
          >
            <div class="team-table-title row">
              <span class="team-table-xq-home col-4 text-start">
                <span>
                  {{ matchLiveDetail?.match?.home_team?.name }}
                </span>
              </span>
              <span class="col-4">{{ $t('Compare data') }}</span>
              <span class="team-table-xq-guest col-4 text-end">
                <span>
                  {{ matchLiveDetail?.match?.away_team?.name }}
                </span>
              </span>
            </div>
            <div class="team-bg-h1">
              <span class="home-bg"></span>
              <span class="away-bg"></span>
            </div>
            <div class="option-table d-flex mt-3">
              <!-- <div class="">
                <input
                  type="checkbox"
                  id="checkboxleague4"
                  value="2"
                  name="checkboxleague4"
                  v-model="checkboxleague4"
                />
                <label for="checkboxleague4" class=" ms-2"> H/A tương đồng</label>&nbsp;&nbsp;
              </div> -->
              <select id="com_s" class="" v-model="com_s">
                <option 
                  v-for="(item) in MATCH_LIST_OPTION" 
                  :key="item?.key"
                  :value="item?.key">
                  {{ $t(item?.value) }}{{$t('Recent last') }}
                </option>
              </select>
            </div>

            <div class="datacom-box row" id="e9_1">
              <div class="col-12 col-sm-6 col-md-6">
                <ul id="dataCompBar" class="text-center">
                  <li class="datacom-lists">
                    <div class="data">
                      <span class="b" :class="stateComparisonLast?.[42] > stateComparisonLast?.[43] ? 'Ht red' : 'Ht'">{{ stateComparisonLast?.[42] }}</span>
                      <span>{{ $t('Total goals scored') }}</span>
                      <span class="b" :class="stateComparisonLast?.[43] > stateComparisonLast?.[42] ? 'Gt red' : 'Gt'">{{ stateComparisonLast?.[43] }}</span>
                    </div>
                    <div class="barbox">
                      <span class="bar">
                          <span class="Ht" 
                          :class="(stateComparisonLast?.[42] > stateComparisonLast?.[43]) ? 'Ht win' : 'Ht loss'"
                          :style="'width:' + stateComparisonLast?.[44] + '%'"></span>
                      </span>
                      <span class="bar">
                        <span class="Gt" 
                        :class="stateComparisonLast?.[43] > stateComparisonLast?.[42] ? 'Gt win' : 'Gt loss'"
                        :style="'width:' + stateComparisonLast?.[45] + '%'"></span>
                      </span>
                    </div>
                  </li>
                  <li class="datacom-lists">
                    <div class="data">
                      <span class="b " :class="stateComparisonLast?.[46] > stateComparisonLast?.[47] ? 'red' : ''">{{ stateComparisonLast?.[46] }}</span>
                      <span>{{ $t('Average goals scored') }}</span>
                      <span class="b " :class="stateComparisonLast?.[47] > stateComparisonLast?.[46] ? 'red' : ''">{{ stateComparisonLast?.[47] }}</span>
                    </div>
                    <div class="barbox">
                      <span class="bar">
                        <span class="Ht"
                        :class="stateComparisonLast?.[46] > stateComparisonLast?.[47] ? 'win' : 'loss'"
                        :style="'width:' + stateComparisonLast?.[10] + '%'"></span>
                      </span>
                      <span class="bar">
                        <span class="Gt"
                        :class="stateComparisonLast?.[47] > stateComparisonLast?.[46] ? 'win' : 'loss'"
                        :style="'width:' + stateComparisonLast?.[11] + '%'"></span>
                      </span>
                    </div>
                  </li>
                  <li class="datacom-lists">
                    <div class="data">
                      <span class="b" :class="stateComparisonLast?.[36] > stateComparisonLast?.[37] ? 'red' : ''">{{ stateComparisonLast?.[36] }}</span>
                      <span>{{ $t('Total lost tables') }}</span>
                      <span class="b" :class="stateComparisonLast?.[37] > stateComparisonLast?.[36] ? 'red' : ''">{{ stateComparisonLast?.[37] }}</span>
                    </div>
                    <div class="barbox">
                      <span class="bar">
                        <span class="Ht"
                        :class="stateComparisonLast?.[36] > stateComparisonLast?.[37] ? 'win' : 'loss'"
                        :style="'width:' + stateComparisonLast?.[22] + '%'">
                        </span>
                      </span>
                      <span class="bar">
                        <span class="Gt"
                        :class="stateComparisonLast?.[37] > stateComparisonLast?.[36] ? 'win' : 'loss'"
                        :style="'width:' + stateComparisonLast?.[23] + '%'"></span>
                      </span>
                    </div>
                  </li>
                  <li class="datacom-lists">
                    <div class="data">
                        <span class="b" :class="stateComparisonLast?.[48] > stateComparisonLast?.[49] ? 'red' : ''">{{ stateComparisonLast?.[48] }}</span>
                        <span>{{ $t('Average lost table') }}</span>
                        <span class="b" :class="stateComparisonLast?.[49] > stateComparisonLast?.[48] ? 'red' : ''">{{ stateComparisonLast?.[49] }}</span>
                    </div>
                    <div class="barbox">
                        <span class="bar">
                          <span class="Ht"
                          :class="stateComparisonLast?.[48] > stateComparisonLast?.[49] ? 'win' : 'loss'"
                          :style="'width:' + stateComparisonLast?.[22] + '%'">
                          </span>
                        </span>
                        <span class="bar">
                          <span class="Gt"
                          :class="stateComparisonLast?.[49] > stateComparisonLast?.[48] ? 'win' : 'loss'"
                          :style="'width:' + stateComparisonLast?.[23] + '%'"></span>
                        </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="col-12 col-sm-6 col-md-6">
                <ul id="dataCompBar" class="text-center">
                  <li class="datacom-lists">
                    <div class="data">
                      <span class="b" :class="stateComparisonLast?.[50] > stateComparisonLast?.[51] ? 'red' : ''">{{ stateComparisonLast?.[50] }}%</span>
                      <span>{{ $t('Win rate') }}</span>
                      <span class="b" :class="stateComparisonLast?.[51] > stateComparisonLast?.[50] ? 'red' : ''">{{ stateComparisonLast?.[51] }}%</span>
                    </div>
                    <div class="barbox">
                      <span class="bar">
                        <span class="Ht"
                        :class="stateComparisonLast?.[50] > stateComparisonLast?.[51] ? 'win' : 'loss'"
                        :style="'width:' + stateComparisonLast?.[50] + '%'">
                        </span>
                      </span>
                      <span class="bar">
                        <span class="Gt"
                        :class="stateComparisonLast?.[51] > stateComparisonLast?.[50] ? 'win' : 'loss'"
                        :style="'width:' + stateComparisonLast?.[51] + '%'"></span>
                      </span>
                    </div>
                  </li>
                  <li class="datacom-lists">
                    <div class="data">
                      <span class="b" :class="stateComparisonLast?.[52] > stateComparisonLast?.[53] ? 'red' : ''">{{ stateComparisonLast?.[52] }}%</span>
                      <span>{{ $t('Draw rate') }}</span>
                      <span class="b" :class="stateComparisonLast?.[53] > stateComparisonLast?.[52] ? 'red' : ''">{{ stateComparisonLast?.[53] }}%</span>
                    </div>
                    <div class="barbox">
                      <span class="bar">
                        <span class="Ht"
                        :class="stateComparisonLast?.[52] > stateComparisonLast?.[53] ? 'win' : 'loss'"
                        :style="'width:' + stateComparisonLast?.[52] + '%'">
                      </span>
                      </span>
                      <span class="bar">
                        <span class="Gt"
                        :class="stateComparisonLast?.[53] > stateComparisonLast?.[52] ? 'win' : 'loss'"
                        :style="'width:' + stateComparisonLast?.[53] + '%'"></span>
                      </span>
                    </div>
                  </li>
                  <li class="datacom-lists">
                    <div class="data">
                        <span class="b" :class="stateComparisonLast?.[54] > stateComparisonLast?.[55] ? 'red' : ''">{{ stateComparisonLast?.[54] }}%</span>
                        <span>{{ $t('Loss rate') }}</span>
                        <span class="b" :class="stateComparisonLast?.[55] > stateComparisonLast?.[54] ? 'red' : ''">{{ stateComparisonLast?.[55] }}%</span>
                    </div>
                    <div class="barbox">
                        <span class="bar">
                          <span class="Ht"
                            :class="stateComparisonLast?.[54] > stateComparisonLast?.[55] ? 'win' : 'loss'"
                            :style="'width:' + stateComparisonLast?.[54] + '%'">
                          </span>
                        </span>
                        <span class="bar">
                          <span class="Gt"
                            :class="stateComparisonLast?.[55] > stateComparisonLast?.[54] ? 'win' : 'loss'"
                            :style="'width:' + stateComparisonLast?.[55] + '%'">
                          </span>
                        </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="porletP" id="porletP9" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP9')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP9')?.order">
          <h2 class="team-table-title">{{$t('Asian handicap statistics') }}</h2>
          <div class="team-div row">
            <div class="home-div col-12 col-md-6">
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                class="team-table-home table-no-db-lr text-center"
              >
                <tbody>
                  <tr class="team-home">
                    <td colspan="12">
                      <span>
                        <span>
                          {{ matchLiveDetail?.match?.home_team?.name }}
                        </span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="rankbox">
                <table class="eTable adaptMt" id="etable-header" width="15%" cellspacing="0" cellpadding="0" style="float: left; min-width: 80px">
                  <tbody>
                    <tr class="bd-l" rowspan="2">
                      <th :title="$t('Full time')">{{ $t('FT') }}</th>
                    </tr>
                    <tr class="bd-l">
                      <td>{{ $t('Total') }}</td>
                    </tr>
                    <tr class="bd-l">
                      <td>
                        <span class="team-home-f">{{ $t('Home') }}</span>
                      </td>
                    </tr>
                    <tr class="bd-l">
                      <td>
                        <span class="team-away-f">{{ $t('Away') }}</span>
                      </td>
                    </tr>
                    <tr class="bd-l">
                      <td>{{ $t('Recent 6') }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="rankdata" width="85%">
                  <table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%">
                    <tbody>
                      <tr>
                        <th colspan="6" class="hbg1" :title="$t('Handicap')">{{ $t('HDP') }}</th>
                        <th colspan="5">{{ $t('Over/Under') }}</th>
                      </tr>
                      <tr>
                        <th>{{ $t('Match') }}</th>
                        <th :title="$t('Win')">{{ $t('W') }}</th>
                        <th :title="$t('Draw')">{{ $t('D') }}</th>
                        <th :title="$t('Loss')">{{ $t('L') }}</th>
                        <th :title="$t('Win rate')">{{ $t('Win rate') }}%</th>
                        <th>{{ $t('Detail') }}</th>
                        <th :title="$t('Win')">{{ $t('O') }}</th>
                        <th :title="$t('Win rate')">{{ $t('O') }}%</th>
                        <th :title="$t('Loss')">{{ $t('U') }}</th>
                        <th>{{ $t('U') }}%</th>
                        <th>{{ $t('Detail') }}</th>
                      </tr>
                      <tr>
                        <template v-for="(odd, index) in matchesAnalysis?.home_odds?.[0]?.slice(0, 9)" :key="index">
                          <td>{{odd ? odd : '0'}}</td>
                          <td v-show="index === 4">
                            <a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a>
                          </td>
                          <td v-show="index === 8">
                            <a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a>
                          </td>
                        </template>
                      </tr>
                      <tr>
                        <template v-for="(odd, index) in matchesAnalysis?.home_odds?.[1]?.slice(0, 9)" :key="index">
                          <template
                          v-if="index < 9"
                          >
                            <td>{{odd ? odd : '0'}}</td>
                            <td v-show="index === 4"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                            <td v-show="index === 8"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                          </template>
                        </template>
                      </tr>
                      <tr>
                        <template v-for="(odd, index) in matchesAnalysis?.home_odds?.[2]?.slice(0, 9)" :key="index">
                          <td>{{odd ? odd : '0'}}</td>
                          <td v-show="index === 4"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                          <td v-show="index === 8"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                        </template>
                      </tr>
                      <tr>
                        <td>{{matchesAnalysis?.home_odds?.[3]?.[0]}}</td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.home_odds?.[3]?.[1], 'w')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.home_odds?.[3]?.[1], 'v')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.home_odds?.[3]?.[1], 'l')"></td>
                        <td>{{matchesAnalysis?.home_odds?.[3]?.[2]}}</td>
                        <td>
                          <a href="#" class="dl blueLink" target="_blank" v-if="matchesAnalysis?.home_odds?.[3]?.length > 0">{{ $t('View') }}</a>
                        </td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.home_odds?.[3]?.[3], 'o')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.home_odds?.[3]?.[3], 'o', '%')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.home_odds?.[3]?.[3], 'u')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.home_odds?.[3]?.[3], 'u', '%')"></td>
                        <td>
                          <a href="#" class="dl blueLink" target="_blank" v-if="matchesAnalysis?.home_odds?.[3]?.length > 0">{{ $t('View') }}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="guest-div col-12 col-md-6">
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                class="team-table-guest table-no-db-lr text-center"
              >
                <tbody>
                  <tr class="team-guest">
                    <td colspan="12">
                      <span>
                        <span>
                          {{ matchLiveDetail?.match?.away_team?.name }}
                        </span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="rankbox">
                <table class="eTable adaptMt" id="etable-header" width="15%" cellspacing="0" cellpadding="0" style="float: left; min-width: 80px">
                  <tbody>
                    <tr class="bd-l" rowspan="2">
                      <th :title="$t('Full time')">{{ $t('FT') }}</th>
                    </tr>
                    <tr class="bd-l">
                      <td>{{ $t('Total') }}</td>
                    </tr>
                    <tr class="bd-l">
                      <td>
                        <span class="team-home-f">{{ $t('Home') }}</span>
                      </td>
                    </tr>
                    <tr class="bd-l">
                      <td>
                        <span class="team-away-f">{{ $t('Away') }}</span>
                      </td>
                    </tr>
                    <tr class="bd-l">
                      <td>{{ $t('Recent 6') }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="rankdata" width="85%">
                  <table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%">
                    <tbody>
                      <tr>
                        <th colspan="6" class="hbg1" :title="$t('Handicap')">{{ $t('HDP') }}</th>
                        <th colspan="5">{{ $t('Over/Under') }}</th>
                      </tr>
                      <tr>
                        <th>{{ $t('Match') }}</th>
                        <th :title="$t('Win')">{{ $t('W') }}</th>
                        <th :title="$t('Draw')">{{ $t('D') }}</th>
                        <th :title="$t('Loss')">{{ $t('L') }}</th>
                        <th :title="$t('Win rate')">{{ $t('Win rate') }}%</th>
                        <th>{{ $t('Detail') }}</th>
                        <th :title="$t('Win')">{{ $t('O') }}</th>
                        <th :title="$t('Win rate')">{{ $t('O') }}%</th>
                        <th :title="$t('Loss')">{{ $t('U') }}</th>
                        <th>{{ $t('U') }}%</th>
                        <th>{{ $t('Detail') }}</th>
                      </tr>
                      <tr>
                        <template v-for="(odd, index) in matchesAnalysis?.away_odds?.[0]?.slice(0, 9)" :key="index">
                          <td>{{odd ? odd : '0'}}</td>
                          <td v-show="index === 4"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                          <td v-show="index === 8"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                        </template>
                      </tr>
                      <tr>
                        <template v-for="(odd, index) in matchesAnalysis?.away_odds?.[1]?.slice(0, 9)" :key="index">
                          <td>{{odd ? odd : '0'}}</td>
                          <td v-show="index === 4"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                          <td v-show="index === 8"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                        </template>
                      </tr>
                      <tr>
                        <template v-for="(odd, index) in matchesAnalysis?.away_odds?.[2]?.slice(0, 9)" :key="index">
                          <td>{{odd ? odd : '0'}}</td>
                          <td v-show="index === 4"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                          <td v-show="index === 8"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                        </template>
                      </tr>
                      <tr>
                        <td>{{matchesAnalysis?.away_odds?.[3]?.[0]}}</td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.away_odds?.[3]?.[1], 'w')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.away_odds?.[3]?.[1], 'v')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.away_odds?.[3]?.[1], 'l')"></td>
                        <td>{{matchesAnalysis?.away_odds?.[3]?.[2]}}</td>
                        <td>
                          <a href="#" class="dl blueLink" target="_blank" v-if="matchesAnalysis?.away_odds?.[3]?.length > 0">{{ $t('View') }}</a>
                        </td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.away_odds?.[3]?.[3], 'o')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.away_odds?.[3]?.[3], 'o', '%')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.away_odds?.[3]?.[3], 'u')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.away_odds?.[3]?.[3], 'u', '%')"></td>
                        <td>
                          <a href="#" class="dl blueLink" target="_blank" v-if="matchesAnalysis?.away_odds?.[3]?.length > 0">{{ $t('View') }}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="team-div row">
            <div class="home-div col-12 col-md-6">
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                class="team-table-home table-no-db-lr text-center"
              >
              <tbody>
                  <tr class="team-home">
                    <td colspan="12">
                      <span>
                        <span>
                          {{ matchLiveDetail?.match?.home_team?.name }}
                        </span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="rankbox">
                <table class="eTable adaptMt" id="etable-header" width="15%" cellspacing="0" cellpadding="0" style="float: left; min-width: 80px">
                  <tbody>
                    <tr class="bd-l" rowspan="2">
                      <th :title="$t('Haft time')">{{ $t('HT') }}</th>
                    </tr>
                    <tr class="bd-l">
                      <td>{{ $t('Total') }}</td>
                    </tr>
                    <tr class="bd-l">
                      <td>
                        <span class="team-home-f">{{ $t('Home') }}</span>
                      </td>
                    </tr>
                    <tr class="bd-l">
                      <td>
                        <span class="team-away-f">{{ $t('Away') }}</span>
                      </td>
                    </tr>
                    <tr class="bd-l">
                      <td>{{ $t('Recent 6') }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="rankdata" width="85%">
                  <table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%">
                    <tbody>
                      <tr>
                        <th colspan="6" class="hbg1" :title="$t('Handicap')">{{ $t('HDP') }}</th>
                        <th colspan="5">{{ $t('Over/Under') }}</th>
                      </tr>
                      <tr>
                        <th>{{ $t('Match') }}</th>
                        <th :title="$t('Win')">{{ $t('W') }}</th>
                        <th :title="$t('Draw')">{{ $t('D') }}</th>
                        <th :title="$t('Loss')">{{ $t('L') }}</th>
                        <th :title="$t('Win rate')">{{ $t('Win rate') }}%</th>
                        <th>{{ $t('Detail') }}</th>
                        <th :title="$t('Win')">{{ $t('O') }}</th>
                        <th :title="$t('Win rate')">{{ $t('O') }}%</th>
                        <th :title="$t('Loss')">{{ $t('U') }}</th>
                        <th>{{ $t('U') }}%</th>
                        <th>{{ $t('Detail') }}</th>
                      </tr>
                      <tr>
                        <template v-for="(odd, index) in matchesAnalysis?.home_odds?.[4]?.slice(0, 9)" :key="index">
                          <td>{{odd ? odd : '0'}}</td>
                          <td v-show="index === 4"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                          <td v-show="index === 8"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                        </template>
                      </tr>
                      <tr>
                        <template v-for="(odd, index) in matchesAnalysis?.home_odds?.[5]?.slice(0, 9)" :key="index">
                          <template
                          v-if="index < 9"
                          >
                          <td>{{odd ? odd : '0'}}</td>
                          <td v-show="index === 4"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                          <td v-show="index === 8"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                          </template>
                        </template>
                      </tr>
                      <tr>
                        <template v-for="(odd, index) in matchesAnalysis?.home_odds?.[6]?.slice(0, 9)" :key="index">
                          <td>{{odd ? odd : '0'}}</td>
                          <td v-show="index === 4"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                          <td v-show="index === 8"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                        </template>
                      </tr>
                      <tr>
                        <td>{{matchesAnalysis?.home_odds?.[7]?.[0]}}</td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.home_odds?.[7]?.[1], 'w')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.home_odds?.[7]?.[1], 'v')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.home_odds?.[7]?.[1], 'l')"></td>
                        <td>{{matchesAnalysis?.home_odds?.[7]?.[2]}}</td>
                        <td>
                          <a href="#" class="dl blueLink" target="_blank" v-if="matchesAnalysis?.home_odds?.[7]?.length > 0">{{ $t('View') }}</a>
                        </td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.home_odds?.[7]?.[3], 'o')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.home_odds?.[7]?.[3], 'o', '%')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.home_odds?.[7]?.[3], 'u')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.home_odds?.[7]?.[3], 'u', '%')"></td>
                        <td>
                          <a href="#" class="dl blueLink" target="_blank" v-if="matchesAnalysis?.home_odds?.[7]?.length > 0">{{ $t('View') }}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="guest-div col-12 col-md-6">
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                class="team-table-guest table-no-db-lr text-center"
              >
              <tbody>
                  <tr class="team-guest">
                    <td colspan="12">
                      <span>
                        <span>
                          {{ matchLiveDetail?.match?.away_team?.name }}
                        </span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="rankbox">
                <table class="eTable adaptMt" id="etable-header" width="15%" cellspacing="0" cellpadding="0" style="float: left; min-width: 80px">
                  <tbody>
                    <tr class="bd-l" rowspan="2">
                      <th :title="$t('Haft time')">{{ $t('HT') }}</th>
                    </tr>
                    <tr class="bd-l">
                      <td>{{ $t('Total') }}</td>
                    </tr>
                    <tr class="bd-l">
                      <td>
                        <span class="team-home-f">{{ $t('Home') }}</span>
                      </td>
                    </tr>
                    <tr class="bd-l">
                      <td>
                        <span class="team-away-f">{{ $t('Away') }}</span>
                      </td>
                    </tr>
                    <tr class="bd-l">
                      <td>{{ $t('Recent 6') }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="rankdata" width="85%">
                  <table class="eTable adaptMt" cellspacing="0" cellpadding="0" width="100%">
                    <tbody>
                      <tr>
                        <th colspan="6" class="hbg1" :title="$t('Handicap')">{{ $t('HDP') }}</th>
                        <th colspan="5">{{ $t('Over/Under') }}</th>
                      </tr>
                      <tr>
                        <th>{{ $t('Match') }}</th>
                        <th :title="$t('Win')">{{ $t('W') }}</th>
                        <th :title="$t('Draw')">{{ $t('D') }}</th>
                        <th :title="$t('Loss')">{{ $t('L') }}</th>
                        <th :title="$t('Win rate')">{{ $t('Win rate') }}%</th>
                        <th>{{ $t('Detail') }}</th>
                        <th :title="$t('Win')">{{ $t('O') }}</th>
                        <th :title="$t('Win rate')">{{ $t('O') }}%</th>
                        <th :title="$t('Loss')">{{ $t('U') }}</th>
                        <th>{{ $t('U') }}%</th>
                        <th>{{ $t('Detail') }}</th>
                      </tr>
                      <tr>
                        <template v-for="(odd, index) in matchesAnalysis?.away_odds?.[4]?.slice(0, 9)" :key="index">
                          <td>{{odd ? odd : '0'}}</td>
                          <td v-show="index === 4"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                          <td v-show="index === 8"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                        </template>
                      </tr>
                      <tr>
                        <template v-for="(odd, index) in matchesAnalysis?.away_odds?.[5]?.slice(0, 9)" :key="index">
                          <td>{{odd ? odd : '0'}}</td>
                          <td v-show="index === 4"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                          <td v-show="index === 8"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                        </template>
                      </tr>
                      <tr>
                        <template v-for="(odd, index) in matchesAnalysis?.away_odds?.[6]?.slice(0, 9)" :key="index">
                          <td>{{odd ? odd : '0'}}</td>
                          <td v-show="index === 4"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                          <td v-show="index === 8"><a href="#" class="dl blueLink" target="_blank">{{ $t('View') }}</a></td>
                        </template>
                      </tr>
                      <tr>
                        <td>{{matchesAnalysis?.away_odds?.[7]?.[0]}}</td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.away_odds?.[7]?.[1], 'w')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.away_odds?.[7]?.[1], 'v')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.away_odds?.[7]?.[1], 'l')"></td>
                        <td>{{matchesAnalysis?.away_odds?.[7]?.[2]}}</td>
                        <td>
                          <a href="#" class="dl blueLink" target="_blank" v-if="matchesAnalysis?.away_odds?.[7]?.length > 0">{{ $t('View') }}</a>
                        </td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.away_odds?.[7]?.[3], 'o')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.away_odds?.[7]?.[3], 'o', '%')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.away_odds?.[7]?.[3], 'u')"></td>
                        <td class="text-nowrap" v-html="getStaticsOdd(matchesAnalysis?.away_odds?.[7]?.[3], 'u', '%')"></td>
                        <td>
                          <a href="#" class="dl blueLink" target="_blank" v-if="matchesAnalysis?.away_odds?.[7]?.length > 0">{{ $t('View') }}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <p class="mt-2">{{ $t('FT: Full time, HT: 1st half, W: Win, H: Draw, B: Lose, Win rate%: Win percentage, Over/Under - W: Over, Over/Under - X: Under') }}</p>
        </div>
        <div class="porletP table-two mt-3" id="porletP10" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP10')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP10')?.order">
          <div class="team-table-title row">
            <div class="col-12 team-table-xq-title">{{ $t('Number of goals in H1&H2') }}</div>
          </div>
          <div class="team-div row">
            <div class="home-div col-12 col-md-6">
              <div class="team-table-xq-home col-12 team-table-title text-start">
                <span>
                  {{ matchLiveDetail?.match?.home_team?.name }}
                </span>
              </div>
              <div class="team-bg-h1">
                <span class="home-bg"></span>
              </div>
              <table
                width="100%"
                cellspacing="0"
                class="team-table-home table-no-db-lr text-center"
              >
                <tbody>
                  <tr class="team-home">
                    <th height="25"></th>
                    <th>0</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4+</th>
                    <th>{{ $t('1st half') }}</th>
                    <th>{{ $t('1st half') }}</th>
                  </tr>
                  <tr class="bg-td1">
                    <td>{{ $t('Total') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.home_goals?.[0]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr class="bg-td1">
                    <td>{{ $t('Home') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.home_goals?.[1]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr class="bg-td1">
                    <td>{{ $t('Away') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.home_goals?.[2]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="guest-div col-12 col-md-6">
              <div class="team-table-xq-guest col-12 text-md-end team-table-title">
                <span>
                  {{ matchLiveDetail?.match?.away_team?.name }}
                </span>
              </div>
              <div class="team-bg-h1">
                <span class="away-bg"></span>
              </div>
              <table
                width="100%"
                cellspacing="0"
                class="team-table-guest table-no-db-lr text-center"
              >
                <tbody>
                  <tr class="team-guest">
                    <th height="25"></th>
                    <th>0</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4+</th>
                    <th>{{ $t('1st half') }}</th>
                    <th>{{ $t('1st half') }}</th>
                  </tr>
                  <tr class="bg-td1">
                    <td>{{ $t('Total') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.away_goals?.[0]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr class="bg-td1">
                    <td>{{ $t('Home') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.away_goals?.[1]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr class="bg-td1">
                    <td>{{ $t('Away') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.away_goals?.[2]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="porletP table-two mt-3" id="porletP11" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP11')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP11')?.order">
          <div class="team-table-title row">
            <span class="col-12 text-center">{{ $t('HT/FT Details') }}</span>
          </div>
          <div class="team-div row">
            <div class="home-div col-12 col-md-6">
              <div class="team-table-xq-home col-12 team-table-title text-start">
                <span>
                  {{ matchLiveDetail?.match?.home_team?.name }}
                </span>
              </div>
              <div class="team-bg-h1">
                <span class="home-bg"></span>
              </div>
              <table
                width="100%"
                cellspacing="0"
                class="team-table-home table-no-db-lr text-center"
              >
                <tbody>
                  <tr class="">
                    <th>{{ $t('HT') }}</th>
                    <th>{{ $t('W') }}</th>
                    <th>{{ $t('W') }}</th>
                    <th>{{ $t('W') }}</th>
                    <th>{{ $t('D') }}</th>
                    <th>{{ $t('D') }}</th>
                    <th>{{ $t('D') }}</th>
                    <th>{{ $t('L') }}</th>
                    <th>{{ $t('L') }}</th>
                    <th>{{ $t('L') }}</th>
                  </tr>
                  <tr class="">
                    <th>{{ $t('FT') }}</th>
                    <th>{{ $t('W') }}</th>
                    <th>{{ $t('D') }}</th>
                    <th>{{ $t('L') }}</th>
                    <th>{{ $t('W') }}</th>
                    <th>{{ $t('D') }}</th>
                    <th>{{ $t('L') }}</th>
                    <th>{{ $t('W') }}</th>
                    <th>{{ $t('D') }}</th>
                    <th>{{ $t('L') }}</th>
                  </tr>
                  <tr class="bg-td1">
                    <td>{{ $t('Total') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.home_ht?.[0]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr class="bg-td1">
                    <td class="team-home-f">{{ $t('Home') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.home_ht?.[1]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr class="bg-td1">
                    <td class="team-away-f">{{ $t('Away') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.home_ht?.[2]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="guest-div col-12 col-md-6">
              <div class="team-table-xq-guest col-12 text-md-end team-table-title">
                <span>
                  {{ matchLiveDetail?.match?.away_team?.name }}
                </span>
              </div>
              <div class="team-bg-h1">
                <span class="away-bg"></span>
              </div>
              <table
                width="100%"
                cellspacing="0"
                class="team-table-guest table-no-db-lr text-center"
              >
                <tbody>
                  <tr class="">
                    <th>{{ $t('HT') }}</th>
                    <th>{{ $t('W') }}</th>
                    <th>{{ $t('W') }}</th>
                    <th>{{ $t('W') }}</th>
                    <th>{{ $t('D') }}</th>
                    <th>{{ $t('D') }}</th>
                    <th>{{ $t('D') }}</th>
                    <th>{{ $t('L') }}</th>
                    <th>{{ $t('L') }}</th>
                    <th>{{ $t('L') }}</th>
                  </tr>
                  <tr class="">
                    <th>{{ $t('FT') }}</th>
                    <th>{{ $t('W') }}</th>
                    <th>{{ $t('D') }}</th>
                    <th>{{ $t('L') }}</th>
                    <th>{{ $t('W') }}</th>
                    <th>{{ $t('D') }}</th>
                    <th>{{ $t('L') }}</th>
                    <th>{{ $t('W') }}</th>
                    <th>{{ $t('D') }}</th>
                    <th>{{ $t('L') }}</th>
                  </tr>
                  <tr class="bg-td1">
                    <td>{{ $t('Total') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.away_ht?.[0]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr class="bg-td1">
                    <td class="team-home-f">{{ $t('Home') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.away_ht?.[1]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr class="bg-td1">
                    <td class="team-away-f">{{ $t('Away') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.away_ht?.[2]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="porletP table-two mt-3" id="porletP13" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP13')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP13')?.order">
          <div class="team-table-title row">
            <div class="col-12 text-center team-table-xq-title">{{ $t('Goal scoring time') }}</div>
          </div>
          <div class="team-div row">
            <div class="home-div col-12 col-md-6">
            <div class="team-table-xq-home col-12 team-table-title text-start">
              <span>
                {{ matchLiveDetail?.match?.home_team?.name }}
              </span>
            </div>
              <div class="team-bg-h1">
                <span class="home-bg"></span>
              </div>
              <table
                width="100%"
                cellspacing="0"
                class="team-table-home table-no-db-lr text-center"
              >
                <tbody>
                  <tr>
                    <th height="25"></th>
                    <th>1-10</th>
                    <th>11-20</th>
                    <th>21-30</th>
                    <th>31-40</th>
                    <th>41-45</th>
                    <th>46-50</th>
                    <th>51-60</th>
                    <th>61-70</th>
                    <th>71-80</th>
                    <th>81-90+</th>
                  </tr>
                  <tr>
                    <td height="25">{{ $t('Total') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.home_shoot_time?.[0]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr>
                    <td height="25">{{ $t('Home') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.home_shoot_time?.[1]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr>
                    <td height="25">{{ $t('Away') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.home_shoot_time?.[2]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr>
                    <td colspan="11">
                      <b>{{ $t('Time of first goal') }}</b>
                    </td>
                  </tr>
                  <tr>
                    <td height="25">{{ $t('Total') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.home_shoot_time?.[3]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr>
                    <td height="25">{{ $t('Home') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.home_shoot_time?.[4]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr>
                    <td height="25">{{ $t('Away') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.home_shoot_time?.[5]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="guest-div col-12 col-md-6">
              <div class="team-table-xq-guest col-12 text-md-end team-table-title">
                <span>
                  {{ matchLiveDetail?.match?.away_team?.name }}
                </span>
              </div>
              <div class="team-bg-h1">
                <span class="away-bg"></span>
              </div>
              <table
                width="100%"
                cellspacing="0"
                class="team-table-guest table-no-db-lr text-center"
              >
                <tbody>
                  <tr>
                    <th height="25"></th>
                    <th>1-10</th>
                    <th>11-20</th>
                    <th>21-30</th>
                    <th>31-40</th>
                    <th>41-45</th>
                    <th>46-50</th>
                    <th>51-60</th>
                    <th>61-70</th>
                    <th>71-80</th>
                    <th>81-90+</th>
                  </tr>
                  <tr>
                    <td height="25">{{ $t('Total') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.away_shoot_time?.[0]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr>
                    <td height="25">{{ $t('Home') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.away_shoot_time?.[1]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr>
                    <td height="25">{{ $t('Away') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.away_shoot_time?.[2]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr>
                    <td colspan="11">
                      <b>{{ $t('Time of first goal') }}</b>
                    </td>
                  </tr>
                  <tr>
                    <td height="25">{{ $t('Total') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.away_shoot_time?.[3]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr>
                    <td height="25">{{ $t('Home') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.away_shoot_time?.[4]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                  <tr>
                    <td height="25">{{ $t('Away') }}</td>
                    <template v-for="(value, index) in matchesAnalysis?.away_shoot_time?.[5]" :key="index">
                      <td>{{value ? value : '0'}}</td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="porletP table-two mt-3" id="porletP14" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP14')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP14')?.order">
          <div class="team-table-title row">
            <div class="col-12 text-center">{{ $t('3 upcoming matches') }}</div>
          </div>
          <div class="team-div row">
            <div class="home-div col-12 col-md-6">
              <div class="team-table-xq-home col-12 team-table-title text-start">
                <span>
                  {{ matchLiveDetail?.match?.home_team?.name }}
                </span>
              </div>
              <div class="team-bg-h1">
                <span class="home-bg"></span>
              </div>
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                class="team-table-home table-no-db-lr text-center"
              >
                <tbody>
                  <tr>
                    <th>{{ $t('League') }}</th>
                    <th>{{ $t('Day') }}</th>
                    <th>{{ $t('Type') }}</th>
                    <th>{{ $t('VS') }}</th>
                    <th>{{ $t('Countdown time') }}</th>
                  </tr>
                  <template v-if="matchesAnalysis?.away_schedule?.length > 0">
                    <template v-for="(item, index) in matchesAnalysis?.home_schedule" :key="index">
                      <tr v-if="index < 3">
                        <td>{{item?.[1]}}</td>
                        <td>
                          <span
                            name="timeData"
                            data-tf="3"
                          >
                          {{ timeStamp2DateUTCTimeZone(item?.[3], 'DD-MM-yyyy', timeZone) }}
                          </span>
                        </td>
                        <td>{{matchLiveDetail?.match?.home_team?.i_team == item?.[5] ? $t('Home') : $t('Away') }}</td>
                        <td>{{matchLiveDetail?.match?.home_team?.i_team == item?.[5] ? item?.[6] : item?.[4] }}</td>
                        <td>{{item?.[8]}} {{ $t('Day') }}</td>
                      </tr>
                    </template>
                  </template>
                  <tr v-else>
                    <td colspan="5">{{ $t('Empty Data') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="guest-div col-12 col-md-6">
              <div class="team-table-xq-guest col-12  text-md-end team-table-title">
                <span>
                  {{ matchLiveDetail?.match?.away_team?.name }}
                </span>
              </div>
              <div class="team-bg-h1">
                <span class="away-bg"></span>
              </div>
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                class="team-table-guest table-no-db-lr text-center"
              >
                <tbody>
                  <tr>
                    <th>{{ $t('League') }}</th>
                    <th>{{ $t('Day') }}</th>
                    <th>{{ $t('Type') }}</th>
                    <th>{{ $t('VS') }}</th>
                    <th>{{ $t('Countdown time') }}</th>
                  </tr>
                  <template v-if="matchesAnalysis?.away_schedule?.length > 0">
                    <template v-for="(item, index) in matchesAnalysis?.away_schedule" :key="index">
                      <tr v-if="index < 3">
                        <td>{{item?.[1]}}</td>
                        <td>
                          <span
                            name="timeData"
                            data-tf="3"
                          >
                          {{ timeStamp2DateUTCTimeZone(item?.[3], 'DD-MM-yyyy', timeZone) }}
                          </span>
                        </td>
                        <td>{{matchLiveDetail?.match?.away_team?.i_team == item?.[5] ? $t('Home') : $t('Away')}}</td>
                        <td>{{matchLiveDetail?.match?.away_team?.i_team == item?.[5] ? item?.[6] : item?.[4] }}</td>
                        <td>{{item?.[8]}} {{ $t('Day') }}</td>
                      </tr>
                    </template>
                  </template>
                  <tr v-else>
                    <td colspan="5">{{ $t('Empty Data') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="porletP table-three" id="porletP15" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP15')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP15')?.order"
          >
          <template v-if="!settingsH2hList?.find(item => item?.div_id === 'porletP15')?.hidden_match">
            <h2 class="team-table-title">{{ $t('Injuries and Suspensions') }}</h2>
            <div class="team-div row">
              <div class="home-div col-12 col-md-6">
                <div class="home-m">
                  <b>
                    <span>
                      {{ matchLiveDetail?.match?.home_team?.name }}
                    </span>
                  </b>
                </div>
                <template v-if="matchsLineup?.injury?.home?.filter(item => item?.type === 1)?.length > 0">
                  <div class="Lineup">{{ $t('Injuries') }}</div>
                  <div class="player-list row">
                    <template 
                    v-for="(item, index) in matchsLineup?.injury?.home?.filter(item => item?.type === 1)"
                    :key="index"
                    >
                      <div :playerid="item?.id" class="player-row col-6">
                        <b>{{item?.position}}</b>
                        <a>{{item?.name}}</a>
                      </div>
                    </template>
                  </div>
                </template>
                <template v-if="matchsLineup?.injury?.home?.filter(item => item?.type === 2)?.length > 0">
                  <div class="Backup">{{ $t('Suspensions') }}</div>
                  <div class="player-list row">
                    <template 
                    v-for="(item, index) in matchsLineup?.injury?.home?.filter(item => item?.type === 2)"
                    :key="index"
                    >
                      <div :playerid="item?.id" class="player-row col-6">
                        <b>{{item?.position}}</b>
                        <a>{{item?.name}}</a>
                      </div>
                    </template>
                  </div>
                </template>
              </div>
              <div class="guest-div col-12 col-md-6">
                <div class="guest-m">
                  <b>
                    <span>
                      {{ matchLiveDetail?.match?.away_team?.name }}
                    </span>
                  </b>
                </div>
                <template v-if="matchsLineup?.injury?.away?.filter(item => item?.type === 1)?.length > 0">
                  <div class="Lineup">{{ $t('Injuries') }}</div>
                  <div class="player-list row">
                    <template 
                    v-for="(item, index) in matchsLineup?.injury?.away?.filter(item => item?.type === 1)"
                    :key="index"
                    >
                      <div :playerid="item?.id" class="player-row col-6">
                        <b>{{item?.position}}</b>
                        <a>{{item?.name}}</a>
                      </div>
                    </template>
                  </div>
                </template>
                
                <template v-if="matchsLineup?.injury?.away?.filter(item => item?.type === 2)?.length > 0">
                  <div class="Backup">{{ $t('Suspensions') }}</div>
                  <div class="player-list row">
                    <template 
                    v-for="(item, index) in matchsLineup?.injury?.away?.filter(item => item?.type === 2)"
                    :key="index"
                    >
                      <div :playerid="item?.id" class="player-row col-6">
                        <b>{{item?.position}}</b>
                        <a>{{item?.name}}</a>
                      </div>
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
        <div class="porletP table-three" id="porletP16" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP16')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP16')?.order">
          <template v-if="!settingsH2hList?.find(item => item?.div_id === 'porletP16')?.hidden_match">
            <h2 class="team-table-title">{{ $t('Recent lineup') }}</h2>
            <div class="team-div row">
              <div class="home-div col-12 col-md-6">
                <div class="home-m">
                  <b>
                    <span>
                      {{ matchLiveDetail?.match?.home_team?.name }}
                    </span>
                  </b>
                </div>
                <template v-if="matchsLastLineup.home?.lineup?.filter(item => item?.first === 1)?.length > 0">
                  <div class="Lineup">{{ $t('Lineupp') }} ({{matchsLastLineup.home?.home_formation || matchsLastLineup.home?.away_formation}})</div>
                  <div class="player-list row">
                    <template 
                    v-for="(item, index) in matchsLastLineup.home?.lineup?.filter(item => item?.first === 1)"
                    :key="index"
                    >
                      <div :playerid="item?.id" class="player-row col-6">
                        <b>{{item?.position}}</b>
                        <span>{{item?.shirt_number}}</span>
                        <a>{{item?.name}}</a>
                      </div>
                    </template>
                  </div>
                </template>
                
                <template v-if="matchsLastLineup.home?.lineup?.filter(item => item?.first === 0)?.length > 0">
                  <div class="Backup">{{ $t('Reserve') }}</div>
                  <div class="player-list row">
                    <template 
                    v-for="(item, index) in matchsLastLineup.home?.lineup?.filter(item => item?.first === 0)"
                    :key="index"
                    >
                      <div :playerid="item?.id" class="player-row col-6">
                        <b>{{item?.position}}</b>
                        <span>{{item?.shirt_number}}</span>
                        <a>{{item?.name}}</a>
                      </div>
                    </template>
                  </div>
                </template>
              </div>
              <div class="guest-div col-12 col-md-6">
                <div class="guest-m">
                  <b>
                    <span>
                      {{ matchLiveDetail?.match?.away_team?.name }}
                    </span>
                  </b >
                </div>
                <template v-if="matchsLastLineup.away?.lineup?.filter(item => item?.first === 1)?.length > 0">
                  <div class="Lineup">{{ $t('Lineupp') }} ({{matchsLastLineup.away?.home_formation || matchsLastLineup.away?.away_formation}})</div>
                  <div class="player-list row" onclick="toPlayerInfoPage(event)">
                    <template 
                    v-for="(item, index) in matchsLastLineup.away?.lineup?.filter(item => item?.first === 1)"
                    :key="index"
                    >
                      <div :playerid="item?.id" class="player-row col-6">
                        <b>{{item?.position}}</b>
                        <span>{{item?.shirt_number}}</span>
                        <a>{{item?.name}}</a>
                      </div>
                    </template>
                  </div>
                </template>
                <template v-if="matchsLastLineup.away?.lineup?.filter(item => item?.first === 0)?.length > 0">
                  <div class="Backup">{{ $t('Reserve') }}</div>
                  <div class="player-list row">
                    <template 
                    v-for="(item, index) in matchsLastLineup.away?.lineup?.filter(item => item?.first === 0)"
                    :key="index"
                    >
                      <div :playerid="item?.id" class="player-row col-6">
                        <b>{{item?.position}}</b>
                        <span>{{item?.shirt_number}}</span>
                        <a>{{item?.name}}</a>
                      </div>
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
        <div class="porletP table-compare" id="porletP17" v-show="settingsH2hList?.find(item => item?.div_id === 'porletP17')?.show === true"
          :style="'order: ' + settingsH2hList?.find(item => item?.div_id === 'porletP17')?.order">
          <h2 class="team-table-title">
            {{ $t('This season statistics') }}
          </h2>
          <div class="team-div compare">
            <div class="title row text-center">
              <div class="col-4 d-none d-sm-none d-md-block"><b>{{ $t('Total') }}</b></div>
              <div class="col-12 col-md-4"><b>{{ $t('Performance statistics') }}</b></div>
              <div class="col-4 d-none d-sm-none d-md-block"><b>{{ $t('Home/Away') }}</b></div>
            </div>
            <div class="content row">
              <div class="fx scoreComp col-12 col-md-6">
                <ul class="fx-tb-a">
                  <li clas="">
                    <div class="title row text-center col-12 d-md-none">
                      <div class="">{{ $t('Total') }}</div>
                    </div>
                  </li>
                  <li>
                    <div class="fx-tb-title">
                      <span>[{{standingsTable?.home?.won}}] {{ standingsTable?.home?.total > 0 ? (standingsTable?.home?.won * 100 / standingsTable?.home?.total).toFixed(1) : ''}}%</span>
                      <span>{{ $t('Win') }}</span>
                      <span>{{ standingsTable?.away?.total > 0 ? (standingsTable?.away?.won * 100 / standingsTable?.away?.total).toFixed(1) : ''}}% [{{standingsTable?.away?.won}}]</span>
                    </div>
                    <div class="fx-td-data">
                      <div class="home-bg" :style="'width: '+ (standingsTable?.home?.total > 0 ? (standingsTable?.home?.won * 100 / standingsTable?.home?.total).toFixed(1) : 0) +'%'"></div>
                    </div>
                    <div class="fx-td-data guest">
                      <div class="away-bg" :style="'width: '+ (standingsTable?.away?.total > 0 ? (standingsTable?.away?.won * 100 / standingsTable?.away?.total).toFixed(1) : 0) +'%'"></div>
                    </div>
                  </li>
                  <li>
                    <div class="fx-tb-title">
                      <span>[{{standingsTable?.home?.draw}}] {{ standingsTable?.home?.total > 0 ? (standingsTable?.home?.draw * 100 / standingsTable?.home?.total).toFixed(1) : 0}}%</span>
                      <span>{{ $t('Draw') }}</span>
                      <span>{{ standingsTable?.away?.total > 0 ? (standingsTable?.away?.draw * 100 / standingsTable?.away?.total).toFixed(1) : ''}}% [{{standingsTable?.away?.won}}]</span>
                    </div>
                    <div class="fx-td-data">
                      <div class="home-bg" :style="'width: '+ (standingsTable?.home?.total > 0 ? (standingsTable?.home?.draw * 100 / standingsTable?.home?.total).toFixed(1) : 0) +'%'"></div>
                    </div>
                    <div class="fx-td-data guest">
                      <div class="away-bg" :style="'width: '+ (standingsTable?.away?.total > 0 ? (standingsTable?.away?.draw * 100 / standingsTable?.away?.total).toFixed(1) : 0 ) +'%'"></div>
                    </div>
                  </li>
                  <li>
                    <div class="fx-tb-title">
                      <span>[{{standingsTable?.home?.loss}}] {{ standingsTable?.home?.total > 0 ? (standingsTable?.home?.loss * 100 / standingsTable?.home?.total).toFixed(1) : 0}}%</span>
                      <span>{{ $t('Loss') }}</span>
                      <span>{{ standingsTable?.away?.total > 0 ? (standingsTable?.away?.loss * 100 / standingsTable?.away?.total).toFixed(1) : 0}}% [{{standingsTable?.away?.loss}}]</span>
                    </div>
                    <div class="fx-td-data">
                      <div class="home-bg" :style="'width: '+ (standingsTable?.home?.total > 0 ? (standingsTable?.home?.loss * 100 / standingsTable?.home?.total).toFixed(1) : 0) +'%'"></div>
                    </div>
                    <div class="fx-td-data guest">
                      <div class="away-bg" :style="'width: '+ (standingsTable?.away?.total > 0 ? (standingsTable?.away?.loss * 100 / standingsTable?.away?.total).toFixed(1) : 0) +'%'"></div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="fx missComp col-12 col-md-6">
                <ul class="fx-tb-a">
                  <li clas="">
                    <div class="title row text-center col-12 d-md-none">
                      <div class="">{{ $t('Home/Away') }}</div>
                    </div>
                  </li>
                  <li>
                    <div class="fx-tb-title">
                      <span>[{{standingsTable?.home?.home_won}}] {{ standingsTable?.home?.total > 0 ? (standingsTable?.home?.home_won * 100 / standingsTable?.home?.total).toFixed(1) : 0}}%</span>
                      <span>{{ $t('Win') }}</span>
                      <span>{{ standingsTable?.away?.total > 0 ? (standingsTable?.away?.away_won * 100 / standingsTable?.away?.total).toFixed(1) : 0}}% [{{standingsTable?.away?.away_won}}]</span>
                    </div>
                    <div class="fx-td-data">
                      <div class="home-bg" :style="'width: '+ (standingsTable?.home?.total > 0 ? (standingsTable?.home?.home_won * 100 / standingsTable?.home?.total).toFixed(1) : 0) +'%'"></div>
                    </div>
                    <div class="fx-td-data guest">
                      <div class="away-bg" :style="'width: '+ (standingsTable?.away?.total > 0 ? (standingsTable?.away?.away_won * 100 / standingsTable?.away?.total).toFixed(1) : 0) +'%'"></div>
                    </div>
                  </li>
                  <li>
                    <div class="fx-tb-title">
                      <span>[{{standingsTable?.home?.home_draw}}] {{ standingsTable?.home?.total > 0 ? (standingsTable?.home?.home_draw * 100 / standingsTable?.home?.total).toFixed(1) : 0}}%</span>
                      <span>{{ $t('Draw') }}</span>
                      <span>{{ standingsTable?.away?.total > 0 ? (standingsTable?.away?.away_draw * 100 / standingsTable?.away?.total).toFixed(1) : 0}}% [{{standingsTable?.away?.away_draw}}]</span>
                    </div>
                    <div class="fx-td-data">
                      <div class="home-bg" :style="'width: '+ (standingsTable?.home?.total > 0 ? (standingsTable?.home?.home_draw * 100 / standingsTable?.home?.total).toFixed(1) : 0) +'%'"></div>
                    </div>
                    <div class="fx-td-data guest">
                      <div class="away-bg" :style="'width: '+ (standingsTable?.away?.total > 0 ? (standingsTable?.away?.away_draw * 100 / standingsTable?.away?.total).toFixed(1) : 0) +'%'"></div>
                    </div>
                  </li>
                  <li>
                    <div class="fx-tb-title">
                      <span>[{{standingsTable?.home?.home_loss}}] {{ standingsTable?.home?.total > 0 ? (standingsTable?.home?.home_loss * 100 / standingsTable?.home?.total).toFixed(1) : 0}}%</span>
                      <span>{{ $t('Loss') }}</span>
                      <span>{{ standingsTable?.away?.total > 0 ? (standingsTable?.away?.away_loss * 100 / standingsTable?.away?.total).toFixed(1) : 0 }}% [{{standingsTable?.away?.away_loss}}]</span>
                    </div>
                    <div class="fx-td-data">
                      <div class="home-bg" :style="'width: '+ (standingsTable?.home?.total > 0 ? (standingsTable?.home?.home_loss * 100 / standingsTable?.home?.total).toFixed(1) : 0) +'%'"></div>
                    </div>
                    <div class="fx-td-data guest">
                      <div class="away-bg" :style="'width: '+ (standingsTable?.away?.total > 0 ? (standingsTable?.away?.away_loss * 100 / standingsTable?.away?.total).toFixed(1) : 0 )+'%'"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="div-h4">
              <b>{{ $t('Home team goals scored/conceded') }}</b>
              <b>{{ $t('Away team goals scored/conceded') }}</b>
            </div>
            <div class="content row">
              <div class="col-6 fx ">
                <div class="fx-div fx-home">
                  <div class="fx-logo d-none d-sm-none d-md-block">
                    <img name="" :src="getLiveScoreImage(!!matchLiveDetail?.match?.home_team?.national && matchLiveDetail?.match?.home_team?.country_logo_o ? matchLiveDetail?.match?.home_team?.country_logo_o : matchLiveDetail?.match?.home_team?.logo_o, 'team') + '!h50'" :alt="matchLiveDetail?.match?.home_team?.name">
                  </div>
                  <ul class="fx-tb-b long2">
                    <li><div class="div-h4">{{ $t('Total') }}</div></li>
                    <li>
                      <b>{{ $t('Goal') }}</b>
                      <div class="fx-td-data2 home-bg" :style="'width: '+ ((standingsTable?.home?.goals + standingsTable?.away?.goals) > 0 ? 
                        (standingsTable?.home?.goals  * 100 / ((standingsTable?.home?.goals + standingsTable?.away?.goals) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="win-f">{{ standingsTable?.home?.goals }}&nbsp;</span>
                    </li>
                    <li>
                      <b>{{ $t('Conceded') }}</b>
                      <div class="fx-td-data2 home-bg"  :style="'width: '+ ((standingsTable?.home?.goals_against + standingsTable?.away?.goals_against) > 0 ? 
                      (standingsTable?.home?.goals_against  * 100 / ((standingsTable?.home?.goals_against + standingsTable?.away?.goals_against) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="lose-f">{{ standingsTable?.home?.goals_against }}&nbsp;</span>
                    </li>
                    <li>
                      <b>{{ $t('TB gets points') }}</b>
                      <div class="fx-td-data2 home-bg" :style="'width: '+ ((standingsTable?.home?.goals + standingsTable?.away?.goals) > 0 ? 
                      (standingsTable?.home?.goals  * 100 / ((standingsTable?.home?.goals + standingsTable?.away?.goals) * 4)).toFixed(0) : 0)+ '%'"></div>
                      <span class="win-f">{{ standingsTable?.home?.total > 0 ? (standingsTable?.home?.goals / standingsTable?.home?.total).toFixed(2) : ''}}&nbsp;</span>
                    </li>
                    <li>
                      <b>{{ $t('TB lost points') }}</b>
                      <div class="fx-td-data2 home-bg" :style="'width: '+ ((standingsTable?.home?.goals_against + standingsTable?.away?.goals_against) > 0 ? 
                      (standingsTable?.home?.goals_against  * 100 / ((standingsTable?.home?.goals_against + standingsTable?.away?.goals_against) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="lose-f">{{ standingsTable?.home?.total > 0 ? (standingsTable?.home?.goals_against / standingsTable?.home?.total).toFixed(2) : ''}}&nbsp;</span>
                    </li>
                  </ul>
                  <ul class="fx-tb-b short2">
                    <li> <div class="div-h4">{{ $t('Home/Away') }}</div></li>
                    <li>
                      <b>{{ $t('Goal') }}</b>
                      <div class="fx-td-data2 home-bg" :style="'width: '+ ((standingsTable?.home?.home_goals + standingsTable?.away?.home_goals) > 0 ? 
                      (standingsTable?.home?.home_goals  * 100 / ((standingsTable?.home?.home_goals + standingsTable?.away?.home_goals) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="win-f">{{ standingsTable?.home?.home_goals }}&nbsp;</span>
                    </li>
                    <li>
                      <b>{{ $t('Conceded') }}</b>
                      <div class="fx-td-data2 home-bg" :style="'width: '+ ((standingsTable?.home?.home_goals_against + standingsTable?.away?.home_goals_against) > 0 ?
                      (standingsTable?.home?.home_goals_against  * 100 / ((standingsTable?.home?.home_goals_against + standingsTable?.away?.home_goals_against) * 4)).toFixed(0) : 0)+ '%'"></div>
                      <span class="lose-f">{{ standingsTable?.home?.home_goals_against }}&nbsp;</span>
                    </li>
                    <li>
                      <b>{{ $t('TB gets points') }}</b>
                      <div class="fx-td-data2 home-bg" :style="'width: '+ ((standingsTable?.home?.home_goals + standingsTable?.away?.home_goals) > 0 ? 
                      (standingsTable?.home?.home_goals  * 100 / ((standingsTable?.home?.home_goals + standingsTable?.away?.home_goals) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="win-f">{{ standingsTable?.home?.total > 0 ? (standingsTable?.home?.home_goals / standingsTable?.home?.total).toFixed(2) : ''}}&nbsp;</span>
                    </li>
                    <li>
                      <b>{{ $t('TB lost points') }}</b>
                      <div class="fx-td-data2 home-bg" :style="'width: '+ ((standingsTable?.home?.home_goals_against + standingsTable?.away?.home_goals_against) > 0 ? 
                      (standingsTable?.home?.home_goals_against  * 100 / ((standingsTable?.home?.home_goals_against + standingsTable?.away?.home_goals_against) * 4)).toFixed(0) :  0) + '%'"></div>
                      <span class="lose-f">{{ standingsTable?.home?.total > 0 ? (standingsTable?.home?.home_goals_against / standingsTable?.home?.total).toFixed(2) : ''}}&nbsp;</span>
                    </li>
                  </ul>
                  <ul class="fx-tb-b short3">
                    <li><div class="div-h4">{{ $t('Recent 6') }}</div></li>
                    <li>
                      <b>{{ $t('Goal') }}</b>
                      <div class="fx-td-data2 home-bg" :style="'width: '+ ((standingsTable?.home?.lastest?.[4] + standingsTable?.away?.lastest?.[4]) > 0 ? 
                      (standingsTable?.home?.lastest?.[4] * 100 /((standingsTable?.home?.lastest?.[4] + standingsTable?.away?.lastest?.[4]) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="win-f">{{ standingsTable?.home?.lastest?.[4] }}&nbsp;</span>
                    </li>
                    <li>
                      <b>{{ $t('Conceded') }}</b>
                      <div class="fx-td-data2 home-bg" :style="'width: '+ ((standingsTable?.home?.lastest?.[5] + standingsTable?.away?.lastest?.[5]) > 0 ? 
                      (standingsTable?.home?.lastest?.[5] * 100 /((standingsTable?.home?.lastest?.[5] + standingsTable?.away?.lastest?.[5]) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="lose-f">{{ standingsTable?.home?.lastest?.[5] }}&nbsp;</span>
                    </li>
                    <li>
                      <b>{{ $t('TB gets points') }}</b>
                      <div class="fx-td-data2 home-bg" :style="'width: '+ ((standingsTable?.home?.lastest?.[4] + standingsTable?.away?.lastest?.[4]) > 0 ?
                      (standingsTable?.home?.lastest?.[4] * 100 /((standingsTable?.home?.lastest?.[4] + standingsTable?.away?.lastest?.[4]) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="win-f">{{ parseIntO(standingsTable?.home?.lastest?.[4]) > 0 ? (standingsTable?.home?.lastest?.[4] / 6).toFixed(2) : ''}}&nbsp;</span>
                    </li>
                    <li>
                      <b>{{ $t('TB lost points') }}</b>
                      <div class="fx-td-data2 home-bg" :style="'width: '+ ((standingsTable?.home?.lastest?.[5] + standingsTable?.away?.lastest?.[5]) > 0 ? 
                      (standingsTable?.home?.lastest?.[5] * 100 /((standingsTable?.home?.lastest?.[5] + standingsTable?.away?.lastest?.[5]) * 4)).toFixed(0) : 0)+ '%'"></div>
                      <span class="lose-f">{{ parseIntO(standingsTable?.home?.lastest?.[5]) > 0 ? (standingsTable?.home?.lastest?.[5] / 6).toFixed(2) : ''}}&nbsp;</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-6 fx">
                <div class="fx-div fx-guest">
                  <div class="fx-logo d-none d-sm-none d-md-block">
                    <img name="" :src="getLiveScoreImage(!!matchLiveDetail?.match?.away_team?.national && matchLiveDetail?.match?.away_team?.country_logo_o ? matchLiveDetail?.match?.away_team?.country_logo_o : matchLiveDetail?.match?.away_team?.logo_o, 'team') + '!h50'" :alt="matchLiveDetail?.match?.away_team?.name">
                  </div>
                  <ul class="fx-tb-b long2">
                    <div class="div-h4">{{ $t('Total') }}</div>
                    <li>
                      <b>{{ $t('Goal') }}</b>
                      <div class="fx-td-data2 away-bg" :style="'width: '+ ((standingsTable?.home?.goals + standingsTable?.away?.goals) > 0 ? 
                      (standingsTable?.away?.goals  * 100 / ((standingsTable?.home?.goals + standingsTable?.away?.goals) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="win-f">{{ standingsTable?.away?.goals }}</span>
                    </li>
                    <li>
                      <b>{{ $t('Conceded') }}</b>
                      <div class="fx-td-data2 away-bg"  :style="'width: '+ ((standingsTable?.home?.goals_against + standingsTable?.away?.goals_against) > 0 ? 
                      (standingsTable?.away?.goals_against  * 100 / ((standingsTable?.home?.goals_against + standingsTable?.away?.goals_against) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="lose-f">{{ standingsTable?.away?.goals_against }}</span>
                    </li>
                    <li>
                      <b>{{ $t('TB gets points') }}</b>
                      <div class="fx-td-data2 away-bg" :style="'width: '+ ((standingsTable?.home?.goals + standingsTable?.away?.goals) > 0 ? 
                      (standingsTable?.away?.goals  * 100 / ((standingsTable?.home?.goals + standingsTable?.away?.goals) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="win-f">{{ standingsTable?.away?.total > 0 ? (standingsTable?.away?.goals / standingsTable?.away?.total).toFixed(2) : ''}}</span>
                    </li>
                    <li>
                      <b>{{ $t('TB lost points') }}</b>
                      <div class="fx-td-data2 away-bg" :style="'width: '+ ((standingsTable?.home?.goals_against + standingsTable?.away?.goals_against) > 0 ? 
                      (standingsTable?.away?.goals_against  * 100 / ((standingsTable?.home?.goals_against + standingsTable?.away?.goals_against) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="lose-f">{{ standingsTable?.away?.total > 0 ? (standingsTable?.away?.goals_against / standingsTable?.away?.total).toFixed(2) : ''}}</span>
                    </li>
                  </ul>
                  <ul class="fx-tb-b short2">
                    <li><div class="div-h4">{{ $t('Home/Away') }}</div></li>
                    <li>
                      <b>{{ $t('Goal') }}</b>
                      <div class="fx-td-data2 away-bg" :style="'width: '+ ((standingsTable?.home?.home_goals + standingsTable?.away?.home_goals) > 0 ? 
                        (standingsTable?.away?.home_goals  * 100 / ((standingsTable?.home?.home_goals + standingsTable?.away?.home_goals) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="win-f">{{ standingsTable?.away?.home_goals }}</span>
                    </li>
                    <li>
                      <b>{{ $t('Conceded') }}</b>
                      <div class="fx-td-data2 away-bg" :style="'width: '+ ((standingsTable?.home?.home_goals_against + standingsTable?.away?.home_goals_against) > 0 ? 
                        (standingsTable?.away?.home_goals_against  * 100 / ((standingsTable?.home?.home_goals_against + standingsTable?.away?.home_goals_against) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="lose-f">{{ standingsTable?.away?.home_goals_against }}</span>
                    </li>
                    <li>
                      <b>{{ $t('TB gets points') }}</b>
                      <div class="fx-td-data2 away-bg" :style="'width: '+ ((standingsTable?.home?.home_goals + standingsTable?.away?.home_goals) > 0 ?
                        (standingsTable?.away?.home_goals  * 100 / ((standingsTable?.home?.home_goals + standingsTable?.away?.home_goals) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="win-f">{{ standingsTable?.away?.total > 0 ? (standingsTable?.away?.home_goals / standingsTable?.away?.total).toFixed(2) : ''}}</span>
                    </li>
                    <li>
                      <b>{{ $t('TB lost points') }}</b>
                      <div class="fx-td-data2 away-bg" :style="'width: '+ ((standingsTable?.home?.home_goals_against + standingsTable?.away?.home_goals_against) > 0 ? 
                        (standingsTable?.away?.home_goals_against  * 100 / ((standingsTable?.home?.home_goals_against + standingsTable?.away?.home_goals_against) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="lose-f">{{ standingsTable?.away?.total > 0 ? (standingsTable?.away?.home_goals_against / standingsTable?.away?.total).toFixed(2) : ''}}</span>
                    </li>
                  </ul>
                  <ul class="fx-tb-b short3">
                    <li><div class="div-h4">{{ $t('Recent 6') }}</div></li>
                    <li>
                      <b>{{ $t('Goal') }}</b>
                      <div class="fx-td-data2 away-bg" :style="'width: '+ ((standingsTable?.home?.lastest?.[4] + standingsTable?.away?.lastest?.[4]) > 0 ? 
                        (standingsTable?.away?.lastest?.[4] * 100 /((standingsTable?.home?.lastest?.[4] + standingsTable?.away?.lastest?.[4]) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="win-f">{{ standingsTable?.away?.lastest?.[4] }}</span>
                    </li>
                    <li>
                      <b>{{ $t('Conceded') }}</b>
                      <div class="fx-td-data2 away-bg" :style="'width: '+ ((standingsTable?.home?.lastest?.[5] + standingsTable?.away?.lastest?.[5]) > 0 ?
                        (standingsTable?.away?.lastest?.[5] * 100 /((standingsTable?.home?.lastest?.[5] + standingsTable?.away?.lastest?.[5]) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="lose-f">{{ standingsTable?.away?.lastest?.[5] }}</span>
                    </li>
                    <li>
                      <b>{{ $t('TB gets points') }}</b>
                      <div class="fx-td-data2 away-bg" :style="'width: '+ ((standingsTable?.home?.lastest?.[4] + standingsTable?.away?.lastest?.[4]) > 0 ? 
                        (standingsTable?.away?.lastest?.[4] * 100 /((standingsTable?.home?.lastest?.[4] + standingsTable?.away?.lastest?.[4]) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="win-f">{{ parseIntO(standingsTable?.away?.lastest?.[5]) > 0 ? (parseIntO(standingsTable?.away?.lastest?.[4]) / 6).toFixed(2) : '' }}</span>
                    </li>
                    <li>
                      <b>{{ $t('TB lost points') }}</b>
                      <div class="fx-td-data2 away-bg" :style="'width: '+ ((standingsTable?.home?.lastest?.[5] + standingsTable?.away?.lastest?.[5]) > 0 ? 
                        (standingsTable?.away?.lastest?.[5] * 100 /((standingsTable?.home?.lastest?.[5] + standingsTable?.away?.lastest?.[5]) * 4)).toFixed(0) : 0) + '%'"></div>
                      <span class="lose-f">{{ parseIntO(standingsTable?.away?.lastest?.[5]) > 0 ? (parseIntO(standingsTable?.away?.lastest?.[5]) / 6).toFixed(2) : '' }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="div-h4">
              <b>{{ $t('Goal difference statistics') }}</b>
            </div>
            <div class="row content pt-3">
              <div class="fx col-12 col-md-6 pt-0">
                <div class="fx-div">
                  <ul class="fx-tb-a">
                    <li>
                      <div class="fx-tb-title">
                        <span>[{{matchRecentResult.home?.[0]}}] {{ matchRecentResult.home?.[5] > 0 ? (matchRecentResult.home?.[0] * 100 /  matchRecentResult.home?.[5]).toFixed(2) : ''}}%</span>
                        <span>{{ $t('win by 2 goals') }}+</span>
                        <span>{{matchRecentResult.away?.[5] > 0 ? (matchRecentResult.away?.[0] * 100 / matchRecentResult.away?.[5]).toFixed(2) : ''}}% [{{matchRecentResult.away?.[0]}}]</span>
                      </div>
                      <div class="fx-td-data">
                        <div class="home-bg" :style="'width:' + (matchRecentResult.home?.[5] > 0 ? (matchRecentResult.home?.[0] * 100 / matchRecentResult.home?.[5]).toFixed(2) : 0)+ '%'"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg" :style="'width:' + (matchRecentResult.away?.[5] > 0 ? (matchRecentResult.away?.[0] * 100 / matchRecentResult.away?.[5]).toFixed(2) : 0) + '%'"></div>
                      </div>
                    </li>
                    <li>
                      <div class="fx-tb-title">
                        <span>[{{matchRecentResult.home?.[1]}}] {{matchRecentResult.home?.[5] > 0 ? (matchRecentResult.home?.[1] * 100 /  matchRecentResult.home?.[5]).toFixed(2) : ''}}%</span>
                        <span>{{ $t('win by 1 goals') }} </span>
                        <span>{{matchRecentResult.away?.[5] > 0 ? (matchRecentResult.away?.[1] * 100 / matchRecentResult.away?.[5]).toFixed(2) : ''}}% [{{matchRecentResult.away?.[1]}}]</span>
                      </div>
                      <div class="fx-td-data">
                        <div class="home-bg" :style="'width:' + (matchRecentResult.home?.[5] > 0 ? (matchRecentResult.home?.[1] * 100 /  matchRecentResult.home?.[5]).toFixed(2) : 0) + '%'"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg" :style="'width:' + (matchRecentResult.away?.[5] > 0 ? (matchRecentResult.away?.[1] * 100 / matchRecentResult.away?.[5]).toFixed(2) : 0) + '%'"></div>
                      </div>
                    </li>
                    <li>
                      <div class="fx-tb-title">
                        <span>[{{matchRecentResult.home?.[2]}}] {{matchRecentResult.home?.[5] > 0 ? (matchRecentResult.home?.[2] * 100 / matchRecentResult.home?.[5]).toFixed(2) : ''}}%</span>
                        <span>{{ $t('Draw') }}</span>
                        <span>{{matchRecentResult.away?.[5] > 0 ? (matchRecentResult.away?.[2] * 100 / matchRecentResult.away?.[5]).toFixed(2) : ''}}% [{{matchRecentResult.away?.[2]}}]</span>
                      </div>
                      <div class="fx-td-data">
                        <div class="home-bg" :style="'width:' + (matchRecentResult.home?.[5] > 0 ? (matchRecentResult.home?.[2] * 100 / matchRecentResult.home?.[5]).toFixed(2) : 0) + '%'"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg" :style="'width:' + ( matchRecentResult.away?.[5] > 0 ? (matchRecentResult.away?.[2] * 100 / matchRecentResult.away?.[5]).toFixed(2) : 0) + '%'"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="fx missComp col-12 col-md-6 pt-0">
                <div class="fx-div">
                  <ul class="fx-tb-a">
                    <li>
                      <div class="fx-tb-title">
                        <span>[{{matchRecentResult.home?.[3]}}] {{ matchRecentResult.home?.[5] > 0 ? (matchRecentResult.home?.[3] * 100 / matchRecentResult.home?.[5]).toFixed(2) : ''}}%</span>
                        <span>{{ $t('Conceded by 1') }} </span>
                        <span>{{matchRecentResult.away?.[5] > 0 ? (matchRecentResult.away?.[3] * 100 / matchRecentResult.away?.[5]).toFixed(2) : ''}}% [{{matchRecentResult.away?.[3]}}]</span>
                      </div>
                      <div class="fx-td-data">
                        <div class="home-bg" :style="'width:' + (matchRecentResult.home?.[5] > 0 ? (matchRecentResult.home?.[3] * 100 / matchRecentResult.home?.[5]).toFixed(2) : 0) + '%'"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg" :style="'width:' + (matchRecentResult.away?.[5] > 0 ? (matchRecentResult.away?.[3] * 100 / matchRecentResult.away?.[5]).toFixed(2) : 0) + '%'"></div>
                      </div>
                    </li>
                    <li>
                      <div class="fx-tb-title">
                        <span>[{{matchRecentResult.home?.[4]}}] {{ matchRecentResult.home?.[5] > 0 ? (matchRecentResult.home?.[4] * 100 / matchRecentResult.home?.[5]).toFixed(2) : ''}}%</span>
                        <span>{{ $t('Conceded by 2') }}+ </span>
                        <span>{{ matchRecentResult.away?.[5] > 0 ? (matchRecentResult.away?.[4] * 100 / matchRecentResult.away?.[5]).toFixed(2) : ''}}% [{{matchRecentResult.away?.[4]}}]</span>
                      </div>
                      <div class="fx-td-data">
                        <div class="home-bg" :style="'width:' + (matchRecentResult.home?.[5] > 0 ? (matchRecentResult.home?.[4] * 100 / matchRecentResult.home?.[5]).toFixed(2) : 0) + '%'"></div>
                      </div>
                      <div class="fx-td-data guest">
                        <div class="away-bg" :style="'width:' + (matchRecentResult.away?.[5] > 0 ? (matchRecentResult.away?.[4] * 100 / matchRecentResult.away?.[5]).toFixed(2) : 0) + '%'"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="content-page" class="mt-5">
        <h1 class="page_title" v-if="matchTitle">{{ matchTitle }}</h1>
        {{ matchContent }}
      </div>
    </div>
    <div id="analyMap">
      <a href="javascript:void(0);" @click="showSettings = true">{{ $t('Settings') }}</a>
      <template v-for="(setting, index) in settingsH2hList"
        :key="index"
        >
        <a v-show="setting?.show" :href="'#' +  setting?.div_id" id="" :title="$t(setting?.name)" :class="setting?.hidden_match ? 'disable' : ''">{{ $t(setting?.short_name) }}</a>
      </template>
    </div>

    <div id="popup-settings" class="popup-settings" v-show="showSettings">
      <div id="openNew-container-setting0" class="popup-container" 
      style="">
        <div class="popup-titlebar" title="Drag to move">
          <span class="Pclose" href="" title="Close" @click="showSettings = false">&nbsp;</span>
          <span class="Ptitle">{{ $t('Settings') }}</span>
        </div>
        <div class="popup-content">
          <ul class="yScroll" id="choose_right" data-listidx="0">
            <draggable 
              v-model="settingsH2hList" 
              group="people" 
              @start="drag=true" 
              @end="drag=false" 
              @change="changePossitionSetting"
              item-key="id">
              <template #item="{element}">
                <li id="v0" v="0" :class="element?.show ? 'on' : 'hide'" style="">
                  <img src="/img/order.png" alt="order">{{ $t(element.name) }}
                  <div class="rightBlock" @click="settingVisible(element?.id)"></div>
                </li>
              </template>
            </draggable>
          </ul>
          <div class="popup-bottom">
            <input type="button" :value="$t('All')" class="gl_btn" @click="defaultChoose()">
            <input type="button" :value="$t('Close')" class="gl_btn on" id="drag_conform" @click="showSettings = false">
            <input type="hidden" name="hidValue" id="hidValue">
          </div>
        </div>
      </div>
    </div>

    <div class="popup-h2h" v-show="showSettingsCompany">
      <div id="openNew-container-company" class="popup-container">
      <div class="popup-titlebar" title="Drag to move">
        <span class="Pclose" href="" title="Close" @click="showSettingsCompany = false">&nbsp;</span>
        <span class="Ptitle">{{ $t('Select Company') }}</span></div><div class="popup-content"><div id="addOddsCmp_id">
          <div class="ms-2">
            <template
            v-for="(oddCompany, index) in oddCompanys?.filter(item => item !== null)"
            :key="index"
            >
              <span class="odds_unchecked" @click="checkOCompany(oddCompany?.id)">
                <input type="checkbox" :name="oddCompany?.name" :id="oddCompany?.id" :value="oddCompany?.id"
                  :checked="oCompanySelected.includes(oddCompany?.id) ? true : false"
                  v-model="oCompList[oddCompany?.id]">
                <label :for="oddCompany?.name">{{oddCompany?.name}}</label>
              </span>
            </template>
          </div>
          <div class="popup-bottom">
            <input type="button" :value="$t('All')" class="mx-2" style="width:80px;height:25px;" @click="selectOddsCmp(true)">
            <input type="button" :value="$t('Clear all')" class="mx-2" style="width:80px;height:25px;" @click="selectOddsCmp(false)">
            <!-- <input type="button" value="OK" style="width:80px;height:25px;margin-right:20px;" onclick="submitOddsCmp()"> -->
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $isMobile } = useNuxtApp()
// import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import * as echarts from "echarts/core";
import { TooltipComponent } from "echarts/components";
import { RadarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import moment from 'moment-timezone';
import draggable from 'vuedraggable'
// import { PieChart } from 'echarts/charts';
import { socketStore } from '@/stores/wsocket'
import { useMatchStore } from '@/stores/useMatchStore'
import { decodeDataAPI, groupBy, generateMetaSeo } from "~/utils/livescore_helper";
import { systemsStore } from '~/stores/systems'
const storeSystems = systemsStore()
const { useLocale, $t, $trouter } = useShareCommon()

const emit = defineEmits<{
  (e: 'socketData', data: any): void
}>()

const socket = socketStore()
const matchStore = useMatchStore()
const route = useRoute();
const eventSocketData = ref()
const matchIdSlug = ref(route?.params?.id || "");
const matchesAnalysis = ref([]);
const matchLiveDetail = ref([])
// const { isMobile } = useDevice();
// Setting
const showSettings = ref(false)
// Get data from cookie
const settingsData = useCookie<any>('settingsData')
const timeZone = ref(settingsData?.value?.timeZone || '')

// Head to Head Statistics
const cb_sos1 = ref(false)
const cb_sos2 = ref(false)
const cb_sos3 = ref(false)

const selectMatchCount1 = ref(10)
const selectMatchCount2 = ref(10)
const selectMatchCount3 = ref(10)
const com_s = ref(10)
const sType_3 = ref(0)
const checkboxleague1 = ref(false)
const checkboxleague2 = ref(false)
const checkboxleague3 = ref(false)
const checkboxleague4 = ref(false)

// Who will win?
const WIN_F = 66 
const DRAW_F = 21
const LOSE_F = 38
const winF = ref(WIN_F)
const drawF = ref(DRAW_F)
const loseF = ref(LOSE_F)
const voteBtn = ref()

const GOOD_F = 6
const BAD_F = 1
const surveyGood = ref(GOOD_F)
const surveyBad = ref(BAD_F)

// Strength Comparison
const h2hComparison = ref([])
const stateComparison = ref([])
const attackComparison = ref([])

// Value Comparison
const homeValue = ref()
const awayValue = ref()
const homeTotalComparisonChar = ref()
const awayTotalComparisonChar = ref()

// Standings
const standingsTable = ref([])

// Matchs Lineup
const matchsLineup = ref([])
const matchsLastLineup = ref([])
const matchsLineupInjuryHome = ref([])
const matchsLineupInjuryAway = ref([])

// Goal Difference Statistics
const matchRecentResult = ref([])

// Live Odds Comparison
const oddsList = ref([])
const oddCompanys = ref([])
const showSettingsCompany = ref(false)

// echarts.use([TooltipComponent, PieChart, CanvasRenderer]);

const mobileOddCompanySelected = ref(13) // Scobet
const pieContainer = ref(null);
const pieContainer1 = ref(null);
const pieContainer2 = ref(null);

// Mobile  Show / hidden state
const is_e1_1 = ref(true)
const oddTypeSelected = ref()
const companyIdoddTypeSelected = ref()
const is_e17_1 = ref(true)
const is_e3_1 = ref(true)
const is_e5_1 = ref(true)
const is_e6_1 = ref(true)
const team_head_score = ref('home')
const is_e15_1 = ref(true)
const is_e7_1 = ref(true)
const is_e9_1 = ref(true)
const selectDataCompBar = ref(10)
const cbComp = ref()
const is_e11_1 = ref(true)
const is_e13_1 = ref(true)
const is_e14_1 = ref(true)

const ODD_COMPANY_SBOBET = 13; //31 - isport

const breakpoint = 768;
const wrapperClass = 'tr-wrapper';
const productSelectorClass = 'columodds-selector';
const tooltipClass = 'tr-tooltip';
const activeClass = 'active';
const selectedProduct = ref('columodds-1');
const isMobileView = ref(false);
const mobileContents = ref<string[]>([]);
const table = ref<HTMLElement | null>(null);
const tableWrapper = ref<HTMLElement | null>(null);
const detailHfSel = ref(1);
const oddCompanySelected = ref(null);
const matchTitle = defineModel('matchTitle')
const matchContent = defineModel('matchContent')
const initDataMatch = defineModel('initDataMatch')
const showPorletP15 = ref(true)

const option = {
  tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  series: [
      {
          name: 'Tỷ lệ thắng',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
              { value: 100, name: 'Thắng', itemStyle: { color: '#178109' } }, 
              { value: 50, name: 'Hòa', itemStyle: { color: '#0b73c5' } }, 
              { value: 20, name: 'Thua', itemStyle: { color: '#e00606' } }
          ],
          label: {
              show: false
          },
          labelLine: {
              show: false
          },
          emphasis: {
              itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
};

let myChartMobile = null;
const showOddsPopup = ref(false);

const handleClickCorner = async(val, companyId) => {
  oddTypeSelected.value = val
  companyIdoddTypeSelected.value = companyId
  showOddsPopup.value = true;
}
const closeCorner = () => {
    showOddsPopup.value = false;
}

const oddsVisible = reactive({
    odds1: false,
    odds2: false,
    odds3: false
});

const toggleOdds = (key) => {
    oddsVisible[key] = !oddsVisible[key];
};

// stateComparison
const stateComparisonLast = ref([])

// 
const H2H_LIST = ref([
  {
  id: 1,
  name: "Online Odds Comparison",
  short_name: "Live Odds",
  order: 1,
  show: true,
  div_id: "porletP0"
  },
  {
  id: 2,
  name: "Which side will win?",
  short_name: "Vote",
  order: 2,
  show: true,
  div_id: "porletP1"
  },
  {
  id: 3,
  name: "Strength Comparison",
  short_name: "Strength",
  order: 3,
  show: true,
  div_id: "porletP2"
  },
  {
  id: 4,
  name: "Ranking",
  short_name: "Ranking",
  order: 4,
  show: true,
  div_id: "porletP4"
  },
  {
  id: 5,
  name: "Head-to-head record",
  short_name: "VS",
  order: 5,
  show: true,
  div_id: "porletP5"
  },
  {
  id: 6,
  name: "Recent performance",
  short_name: "Score",
  order: 6,
  show: true,
  div_id: "porletP6"
  },
  {
  id: 7,
  name: "Compare data",
  short_name: "Compare",
  order: 7,
  show: true,
  div_id: "porletP8"
  },
  {
  id: 8,
  name: "Asian handicap statistics",
  short_name: "HDP",
  order: 8,
  show: true,
  div_id: "porletP9"
  },
  {
  id: 9,
  name: "Number of goals in H1&H2",
  short_name: "Goals",
  order: 9,
  show: true,
  div_id: "porletP10"
  },
  {
  id: 10,
  name: "HT/FT Details",
  short_name: "HT/FT",
  order: 10,
  show: true,
  div_id: "porletP11"
  },
  {
  id: 11,
  name: "Goal Time",
  short_name: "Hour",
  order: 11,
  show: true,
  div_id: "porletP13"
  },
  {
  id: 12,
  name: "Next 3 Matches",
  short_name: "LTD",
  order: 12,
  show: true,
  div_id: "porletP14"
  },
  {
  id: 13,
  name: "Injuries and Suspensions",
  short_name: "Injuries",
  order: 13,
  show: true,
  div_id: "porletP15"
  },
  {
  id: 14,
  name: "Recent lineup",
  short_name: "Lineup",
  order: 14,
  show: true,
  div_id: "porletP16"
  },
  {
  id: 15,
  name: "This season statistics",
  short_name: "Season",
  order: 15,
  show: true,
  div_id: "porletP17"
  },
])

const settingsH2hList = ref(useCookie<any>('settingsH2hList').value ? useCookie<any>('settingsH2hList').value : H2H_LIST)

const settingVisible = (id) => {
  settingsH2hList.value = settingsH2hList.value?.map(item => {
    if (item?.id === id) {
      item.show = !item.show
    }
    return item
  })

  useCookie('settingsH2hList').value = JSON.stringify(settingsH2hList.value)
}

const defaultChoose = () => {
  settingsH2hList.value = settingsH2hList.value?.map(item => {
    item.show = true
    return item
  })

  useCookie('settingsH2hList').value = JSON.stringify(settingsH2hList.value)
}

const changePossitionSetting = (event) => {
  
  settingsH2hList.value = settingsH2hList.value?.map((item, index) => {
    item.order = index
    return item
  })

  useCookie('settingsH2hList').value = JSON.stringify(settingsH2hList.value)
}

const oCompanySelected = ref(useCookie<any>('oCompanySelected').value ? useCookie<any>('oCompanySelected').value : COMPANYS_H2H_DEFAULT_LIST)
const oCompList = ref([])
ODD_COMPANYS.forEach(item => {
  oCompList.value[item?.id] = oCompanySelected.value.includes(item?.id) ? true : false
})

const checkOCompany = (companyId) => {
  oCompList.value[companyId] = !oCompList.value[companyId]
  if (oCompList.value[companyId]) {
    if (!oCompanySelected.value?.includes(companyId)) {
      oCompanySelected.value.push(companyId)
    }
  } else {
    const index = oCompanySelected.value.indexOf(companyId, 0);
    if (index > -1) {
      oCompanySelected.value.splice(index, 1);
    }
  }

  useCookie('oCompanySelected').value = JSON.stringify(oCompanySelected.value)
}

const selectOddsCmp = (val) => {
  if (val) {
    ODD_COMPANYS.forEach(item => {
      oCompList.value[item?.id] = true
      oCompanySelected.value.push(item?.id)
    })
  } else {
    ODD_COMPANYS.forEach(item => {
      oCompList.value[item?.id] = false
      oCompanySelected.value = []
    })
  }

  useCookie('oCompanySelected').value = JSON.stringify(oCompanySelected.value)
}

echarts.use([TooltipComponent, RadarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<TooltipComponent | RadarChart>;

const chartContainer = ref<HTMLElement | null>(null);

let optionChart: EChartsOption = {
  radar: {
    indicator: [
      { name: $t("Confrontation"), max: 100 },
      { name: $t("Value"), max: 100 },
      { name: $t("Defense"), max: 100 },
      { name: $t("Attack"), max: 100 },
      { name: $t("Perform"), max: 100 },
    ],
  },
  tooltip: {
    trigger: "item",
  }
};

let myChart: echarts.ECharts | null = null;

const activeSectionTable = ref("h2h");
function setActiveSectionTable(table) {
  activeSectionTable.value = table;
}
const startTransition = ref(false);


const updateColspan = () => {
  if (!table.value) return;
  if (window.innerWidth >= breakpoint) {
    isMobileView.value = false;
    table.value.querySelectorAll('[data-mobile-content]').forEach(th => {
      (th as HTMLElement).setAttribute('colspan', '1');
    });
    table.value.querySelectorAll('[data-product]').forEach(td => {
      (td as HTMLElement).style.display = 'table-cell';
    });
  } else {
    isMobileView.value = true;
    table.value.querySelectorAll('[data-mobile-content]').forEach(th => {
      (th as HTMLElement).setAttribute('colspan', '5');
    });
    selectProduct(selectedProduct.value);
  }
};

const selectProduct = (product: string) => {
  if (!isMobileView.value) return;
  selectedProduct.value = product;
  if (!table.value) return;
  table.value.querySelectorAll('[data-product]').forEach(td => {
    if (td.getAttribute('data-product') === product) {
      (td as HTMLElement).style.display = 'table-cell';
    } else {
      (td as HTMLElement).style.display = 'none';
    }
  });
  table.value.querySelectorAll('th[data-product]').forEach(th => {
    th.classList.remove(activeClass);
  });
  table.value.querySelectorAll(`th[data-product="${product}"]`).forEach(th => {
    th.classList.add(activeClass);
  });
};

const initTooltips = () => {
  if (!tableWrapper.value) return;
  tableWrapper.value.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseover', (e) => {
      const tooltipText = (element as HTMLElement).getAttribute('data-tooltip');
      if (!tooltipText || !tableWrapper.value) return;
      const tooltip = document.createElement('div');
      tooltip.className = tooltipClass;
      tooltip.textContent = tooltipText;
      tableWrapper.value.appendChild(tooltip);
      tooltip.style.left = `${(e as MouseEvent).pageX + 20}px`;
      tooltip.style.top = `${(e as MouseEvent).pageY + 10}px`;
      document.addEventListener('mousemove', (e) => {
        tooltip.style.left = `${(e as MouseEvent).pageX + 20}px`;
        tooltip.style.top = `${(e as MouseEvent).pageY + 10}px`;
      });
      element.addEventListener('mouseout', () => {
        if (tableWrapper.value) {
          tableWrapper.value.removeChild(tooltip);
        }
        document.removeEventListener('mousemove', null as any);
      }, { once: true });
    }, { once: true });
  });
};

const handleFeaturedColumns = () => {
  if (!table.value) return;
  table.value.querySelectorAll('[data-featured]').forEach(th => {
    const product = th.getAttribute('data-product');
    if (!product) return;
    table.value.querySelectorAll(`[data-product="${product}"]`).forEach(td => {
      td.classList.add('tr-featured');
    });
  });
  tableWrapper.value?.classList.add('has-featured-column');
};

const initProductSelector = () => {
  if (!table.value) return;
  const headers = table.value.querySelectorAll('thead th[data-mobile-content]');
  headers.forEach((th, index) => {
    const product = `columodds-${index + 1}`;
    th.setAttribute('data-product', product);
    table.value.querySelectorAll(`tbody td:nth-child(${index + 2}):not(.fixed-data)`).forEach(td => {
      if (!td.hasAttribute('data-product')) {
        td.setAttribute('data-product', product);
      }
    });
    const mobileContent = th.getAttribute('data-mobile-content') || th.textContent;
    mobileContents.value.push(mobileContent || '');
  });
};

const onResize = () => {
  clearTimeout((onResize as any).resizeTimeout);
  (onResize as any).resizeTimeout = setTimeout(updateColspan, 50);
};

watch(activeSectionTable, (newVal) => {
  if (['h2h', 'state', 'attack', 'defence', 'value', 'others'].includes(newVal)) {
    startTransition.value = false;
    // Đảm bảo rằng transition được kích hoạt sau khi DOM cập nhật
    setTimeout(() => {
      startTransition.value = true;
    }, 50);
  }
});
if (activeSectionTable.value === 'h2h') {
  setTimeout(() => {
    startTransition.value = true;
  }, 50);
}
const activeSectionHistorical = ref("ah_odds");
function setActiveSectionHistorical(table) {
  activeSectionHistorical.value = table;
}

const AddNote = (voted) => {
  voteBtn.value = voted
  switch(voted) {
    case 1:
      winF.value = WIN_F + 1
      drawF.value = DRAW_F
      loseF.value = LOSE_F
      break;
    case 2:
      drawF.value = DRAW_F + 1
      winF.value = WIN_F 
      loseF.value = LOSE_F
      break;
    case 3:
      loseF.value = LOSE_F + 1
      winF.value = WIN_F 
      drawF.value = DRAW_F
      break;
    default:
      break;
  }
}

const fetchMatchesAnalysis = async (match_id) => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.MATCHES_ANALYSIS + "?match_id=" + match_id
  ).then((resData) => {
    if (resData) {
      matchesAnalysis.value = getDataObject(resData?.results?.[0]);
      h2hComparison.value = getH2hComparison(matchesAnalysis.value?.head_to_head, matchLiveDetail.value?.match?.home_team?.i_team, matchLiveDetail.value?.match?.away_team?.i_team, matchLiveDetail.value?.match?.i_competition_id, $t)
      stateComparison.value = getStateComparison(matchesAnalysis.value?.home_last_matches, matchesAnalysis.value?.away_last_matches, matchLiveDetail.value?.match?.home_team?.i_team, matchLiveDetail.value?.match?.away_team?.i_team, matchLiveDetail.value?.match?.i_competition_id, 10, $t)

      stateComparisonLast.value = getStateComparison(matchesAnalysis.value?.home_last_matches, matchesAnalysis.value?.away_last_matches, matchLiveDetail.value?.match?.home_team?.i_team, matchLiveDetail.value?.match?.away_team?.i_team, matchLiveDetail.value?.match?.i_competition_id, 10, $t)
    }
  });
};

const fetchObjectMeta = async () => {
  try {
    await useFetch<any>(createUrl(API_ROUTERS.OBJECTS_META.DETAIL + "/" + matchIdSlug.value, {
      query: {
        type: 'match',
        tab: 'h2h',
      },
    })).then((resData) => {
      const timeZoneTitle = getConfig(storeSystems?.configurations, 'TIMEZONE') || timeZone.value;
      let title = resData?.data?._value?.title
      let description = resData?.data?._value?.meta_description
      if (!title || title == '') {
        title = getConfig(storeSystems.configurations, 'MATCH_TITLE_H2H') ? getConfig(storeSystems.configurations, 'MATCH_TITLE_H2H') : getConfig(storeSystems.configurations, 'SEO_META_TITLE')
        title = generateMetaSeo(title, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_time, timeZoneTitle,  matchLiveDetail.value.match?.competition?.name)
      }
      if (!description || description == '') {
        description = getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_H2H') ? getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_H2H') : getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION')
        description = generateMetaSeo(description, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_timetimeZoneTitle, matchLiveDetail.value.match?.competition?.name)
      }
      let keyword = resData?.data?._value?.keyword
      if (!keyword || keyword == '') {
        keyword = getConfig(storeSystems.configurations, 'MATCH_KEYWORD_H2H') ? getConfig(storeSystems.configurations, 'MATCH_KEYWORD_H2H') : ''
        keyword = generateMetaSeo(keyword, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_timetimeZoneTitle, matchLiveDetail.value.match?.competition?.name)
      }
      let content = resData?.data?._value?.content
      if (!content || content == '') {
        content = getConfig(storeSystems.configurations, 'MATCH_CONTENT_H2H') ? getConfig(storeSystems.configurations, 'MATCH_CONTENT_H2H') : ''
        content = generateMetaSeo(content, matchLiveDetail.value.match?.home_team?.name, matchLiveDetail.value.match?.away_team?.name, matchLiveDetail.value.match?.match_timetimeZoneTitle, matchLiveDetail.value.match?.competition?.name)
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

const fetchMatchsRecentDetail = async(matchIdSlug) => {
  // useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_RECENT_DETAIL + '?match_id=' + matchIdSlug).then(async resData => {
  //   if (!resData || resData?.length === 0) {
  //     return navigateTo(ROUTERS.HOMEPAGE, { replace: true })
      /*
      showError({
        statusCode: 404,
        statusMessage: "Trận đấu không tồn tại!"
      })
      */
    // }
    let resData = initDataMatch.value

    matchLiveDetail.value.match = resData?.[0]

    const i_match_id = resData?.[0]?.i_match_id;

    // await fetchObjectMeta(matchIdSlug)
    await fetchMatchesAnalysis(matchIdSlug);
    await fetchSeasonsTable(resData?.[0]?.stage?.season_id)
    await fetchMatchRecentResult(resData?.[0])
  // });
};

const fetchSeasonsTable = async (competitionId) => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.SEASONS_TABLE + '/' + competitionId).then(async resData => {
    standingsTable.value.home =  resData?.tables?.[0]?.rows?.find(item => item.team_id === matchLiveDetail.value?.match?.home_team?.id) ?? []
    standingsTable.value.away =  resData?.tables?.[0]?.rows?.find(item => item.team_id === matchLiveDetail.value?.match?.away_team?.id) ?? []
    
    standingsTable.value.home.lastest =  getStandingLastest(matchesAnalysis.value?.home_last_matches, 6, matchLiveDetail.value?.match?.home_team?.i_team) ?? []
    standingsTable.value.away.lastest =  getStandingLastest(matchesAnalysis.value?.away_last_matches, 6, matchLiveDetail.value?.match?.away_team?.i_team) ?? []
  });
};

const fetchMatchsLineup = (matchIdSlug) => {
  useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_LINEUP + '/' + matchIdSlug).then(async resData => {
    matchsLineup.value = resData
    
    if (!matchsLineup.value || (matchsLineup.value && matchsLineup.value?.injury?.home?.filter(item => item?.type === 1)?.length === 0 &&  matchsLineup.value?.injury?.home?.filter(item => item?.type === 2)?.length === 0 && 
      matchsLineup.value?.injury?.away?.filter(item => item?.type === 1)?.length === 0 &&  matchsLineup.value?.injury?.away?.filter(item => item?.type === 2)?.length  === 0)) {
        settingsH2hList.value?.map(item => {
          if (item?.div_id === 'porletP15') {
            item.hidden_match = true
          }
          return item
        })
    }

    matchsLineupInjuryHome.value = matchsLineup.value?.injury?.home?.filter(item => item?.type === 1)
    matchsLineupInjuryAway.value = matchsLineup.value?.injury?.away?.filter(item => item?.type === 1)
  });
};

const fetchMatchsLastLineup = (matchIdSlug) => {
  useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_LAST_LINEUP + '?match_id=' + matchIdSlug).then(async resData => {
    matchsLastLineup.value = resData
    if (resData?.[0]?.home_team_id === matchLiveDetail.value?.match?.home_team?.id) {
      matchsLastLineup.value.home = resData?.[0]?.home_lineup 

      if (resData?.[0]?.away_team_id === matchLiveDetail.value?.match?.away_team?.id) {
        matchsLastLineup.value.away = resData?.[0]?.away_lineup 
      }
    } else if (resData?.[0]?.away_team_id === matchLiveDetail.value?.match?.home_team?.id) {
      matchsLastLineup.value.home = resData?.[0]?.away_lineup 

      if (resData?.[0]?.home_team_id === matchLiveDetail.value?.match?.away_team?.id) {
        matchsLastLineup.value.away = resData?.[0]?.home_lineup 
      }
    }

    if (!matchsLastLineup.value || matchsLastLineup.value?.length === 0 || (matchsLastLineup.value && matchsLastLineup.value?.home?.lineup?.filter(item => item?.first === 1)?.length === 0 &&  matchsLastLineup.value?.home?.lineup?.filter(item => item?.first === 0)?.length === 0 && 
      matchsLastLineup.value?.away?.lineup?.filter(item => item?.first === 1)?.length === 0 &&  matchsLastLineup.value?.away?.lineup?.filter(item => item?.first === 0)?.length  === 0)) {
        settingsH2hList.value?.map(item => {
          if (item?.div_id === 'porletP16') {
            item.hidden_match = true
          }
          return item
        })
    }
  });
};

const fetchMatchRecentResult = async (match) => {
  if (!match?.stage?.season_id)
    return
  await useApiLiveScore(API_ROUTERS.LIVESCORE.MATCH_RECENT_RESULT, {
    season_id: match?.stage?.season_id,
  }).then(resData => {
    if (resData) {
      const data = resData?.results?.filter(match => match?.status === "8")
      const matchsListArray: any[] = []
      Object.values(data).map(item => {
        matchsListArray.push(item)
      })
      
      const homeRecent = matchsListArray?.filter(item => {
        return ((item?.home_team_id === match?.home_team?.id) || (item?.away_team_id === match?.home_team?.id))
      })
      const awayRecent = matchsListArray?.filter(item => {
        return ((item?.home_team_id === match?.away_team?.id) || (item?.away_team_id === match?.away_team?.id))
      })

      matchRecentResult.value.home = getRecentResultStat(homeRecent, match?.home_team?.id)
      matchRecentResult.value.away = getRecentResultStat(awayRecent, match?.away_team?.id)
    }
  })
}

const fetchOdds = (matchIdSlug) => {
  useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL + '?match_id=' + matchIdSlug).then(async resData => {
    oddsList.value = getDataObjectByList(resData)
    const oddCompanysList = []
    ODD_COMPANYS?.forEach(item => {
      oddCompanysList[item?.isportsapi] = []
      oddCompanysList[item?.isportsapi].id = item?.id
      oddCompanysList[item?.isportsapi].name = item?.name
      oddCompanysList[item?.isportsapi].isportsapi = item?.isportsapi
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

watch(
  () => route.path,
  (newPath) => {
    matchIdSlug.value = route?.params?.id || "";
  },
  { immediate: true }
);


watch(
  cb_sos1,
  () => {
    if (cb_sos1.value) {
      selectMatchCount1.value = matchesAnalysis.value.home_last_matches?.filter(item => matchLiveDetail.value?.match?.home_team?.i_team == item?.[5])?.length
    } else {
      selectMatchCount1.value = 10
    }
  },
  { immediate: true }
);

watch(
  cb_sos3,
  () => {
    if (cb_sos3.value) {
      selectMatchCount3.value = matchesAnalysis.value.head_to_head?.filter(item => matchLiveDetail.value?.match?.home_team?.i_team == item?.[5])?.length
    } else {
      selectMatchCount3.value = 10
    }
  },
  { immediate: true }
);

watch(
  cb_sos2,
  () => {
    if (cb_sos2.value) {
      selectMatchCount2.value = matchesAnalysis.value.away_last_matches?.filter(item => matchLiveDetail.value?.match?.away_team?.i_team == item?.[7])?.length
    } else {
      selectMatchCount2.value = 10
    }
  },
  { immediate: true }
);

watch(
  selectDataCompBar,
  () => {
    stateComparisonLast.value =  getStateComparison(matchesAnalysis.value?.home_last_matches, matchesAnalysis.value?.away_last_matches, matchLiveDetail.value?.match?.home_team?.i_team, matchLiveDetail.value?.match?.away_team?.i_team, matchLiveDetail.value?.match?.i_competition_id, selectDataCompBar.value, $t)
  },
  { immediate: true }
);

watch(
  com_s,
  () => {
    stateComparisonLast.value = getStateComparison(matchesAnalysis.value?.home_last_matches, matchesAnalysis.value?.away_last_matches, matchLiveDetail.value?.match?.home_team?.i_team, matchLiveDetail.value?.match?.away_team?.i_team, matchLiveDetail.value?.match?.i_competition_id, com_s.value, $t)
  },
  { immediate: true }
);

// Socket data
const wssMatch = (socketData: any) => {
  if (socketData) {
    try {
      const wssItem = socketData
      eventSocketData.value = wssItem
      emit('socketData', wssItem)
      if (wssItem.topic == 'thesports/football/match/v1') {
        const payloads = wssItem.payload;
        for (const payload of payloads) {
          const matchId = payload.id;
          // if (matchsList.value[matchId] && payload?.score) {
          //   matchsList.value[matchId].home_scores = payload?.score?.[2]
          //   matchsList.value[matchId].away_scores = payload?.score?.[3]
          // }
        }
      } else if (wssItem.payload.iodds) {
        // ODDS
        const matchOdds = wssItem.payload.iodds;
        if (matchOdds?.handicap) {
          for (const matchOdd of matchOdds.handicap) {
            const matchId = parseIntO(getValueByPosition(matchOdd, 0));
            const companyId = getValueByPosition(matchOdd, 1);
            if (matchId == matchLiveDetail.value?.match?.i_match_id) {
              const oddCompany = oddCompanys.value?.find(item => item?.isportsapi == companyId)
              if (oddCompany) {
                if (!oddCompany?.handicap?.run) {
                  oddCompany.handicap = []
                }

                if (matchLiveDetail.value?.match?.status === '1') {
                  oddCompany.handicap.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                } else {
                  oddCompany.handicap.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                }
              }
            }
          }
        }
        // overUnder
        if (matchOdds?.overUnder) {
          for (const matchOdd of matchOdds.overUnder) {
            const matchId = parseIntO(getValueByPosition(matchOdd, 0));
            const companyId = getValueByPosition(matchOdd, 1);
            if (matchId == matchLiveDetail.value?.match?.i_match_id) {
              const oddCompany = oddCompanys.value?.find(item => item?.isportsapi == companyId)
              if (oddCompany) {
                if (!oddCompany?.overUnder?.run) {
                  oddCompany.overUnder = []
                }
                if (matchLiveDetail.value?.match?.status === '1') {
                  oddCompany.overUnder.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                } else {
                  oddCompany.overUnder.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                }
              }
            }
          }
        }
        // europeOdds
        if (matchOdds?.europeOdds) {
          for (const matchOdd of matchOdds.europeOdds) {
            const matchId = parseIntO(getValueByPosition(matchOdd, 0));
            const companyId = getValueByPosition(matchOdd, 1);
            if (matchId == matchLiveDetail.value?.match?.i_match_id) {
              const oddCompany = oddCompanys.value?.find(item => item?.isportsapi == companyId)
              if (oddCompany) {
                if (!oddCompany?.europeOdds?.run) {
                  oddCompany.europeOdds = []
                }
                if (matchLiveDetail.value?.match?.status === '1') {
                  oddCompany.europeOdds.live = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
                } else {
                  oddCompany.europeOdds.run = [[getValueByPosition(matchOdd, 2)], [getValueByPosition(matchOdd, 3)], [getValueByPosition(matchOdd, 4)]]
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

watch([detailHfSel, oddCompanySelected], async () => {
  await nextTick();
  setTimeout(() => {
    updateColspan();
    selectProduct(selectedProduct.value);
  }, 300);
});

watch(isMobileView, () => {
  updateColspan();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);

  myChart?.dispose();
  myChartMobile?.dispose();
});

await fetchMatchsRecentDetail(matchIdSlug.value)
fetchOdds(matchIdSlug.value)
fetchMatchsLineup(matchIdSlug.value)
fetchMatchsLastLineup(matchIdSlug.value)

onMounted(async() => {
  await nextTick()
  setTimeout(()=> {
    updateColspan();
    initProductSelector();
    selectProduct(selectedProduct.value);
    initTooltips();
    handleFeaturedColumns();
    window.addEventListener('resize', onResize);
  })

  setTimeout(async () => {
    // await fetchMatchsLiveDetail(matchIdSlug)
    // await fetchAnalysis(matchIdSlug.value)
    homeValue.value = (parseFloatO(matchesAnalysis.value?.team?.home_value) + parseFloatO(matchesAnalysis.value?.team?.away_value)) > 0 ? 
      (parseFloatO(matchesAnalysis.value?.team?.home_value) * 100 / (parseFloatO(matchesAnalysis.value?.team?.home_value) + parseFloatO(matchesAnalysis.value?.team?.away_value))).toFixed(0) : 0
    awayValue.value = (parseFloatO(matchesAnalysis.value?.team?.home_value) + parseFloatO(matchesAnalysis.value?.team?.away_value)) > 0 ? 
      (parseFloatO(matchesAnalysis.value?.team?.away_value) * 100 / (parseFloatO(matchesAnalysis.value?.team?.home_value) + parseFloatO(matchesAnalysis.value?.team?.away_value))).toFixed(0) : 0

    if (chartContainer.value) {
      optionChart['series'] = {
        name: matchLiveDetail.value?.match?.home_team?.name + ' VS ' + matchLiveDetail.value?.match?.away_team?.name,
        type: "radar",
        symbol: "none",
        data: [
          {
            itemStyle: { color: "#de682f" },
            value: [h2hComparison.value?.[8], homeValue.value, stateComparison.value?.[28], stateComparison.value?.[18], stateComparison.value?.[8]],
            name: matchLiveDetail.value?.match?.home_team?.name,
          },
          {
            itemStyle: { color: "#2495da" },
            value: [h2hComparison.value?.[9], awayValue.value, stateComparison.value?.[29], stateComparison.value?.[19], stateComparison.value?.[9]],
            name: matchLiveDetail.value?.match?.away_team?.name,
          },
        ]
      }
      myChart = echarts.init(chartContainer.value);
      myChart.setOption(optionChart);

      homeTotalComparisonChar.value = ([h2hComparison.value?.[8], homeValue.value, stateComparison.value?.[28], stateComparison.value?.[18], stateComparison.value?.[8]].reduce((a, b) => parseIntO(a) + parseIntO(b), 0) / 5).toFixed(0) || 0
      awayTotalComparisonChar.value = ([h2hComparison.value?.[9], awayValue.value, stateComparison.value?.[29], stateComparison.value?.[19], stateComparison.value?.[9]].reduce((a, b) => parseIntO(a) + parseIntO(b), 0) / 5).toFixed(0) || 0
    }

    if (pieContainer.value) {
      myChartMobile = echarts.init(pieContainer.value);
      myChartMobile.setOption(option);
    }
    if (pieContainer1.value) {
      myChartMobile = echarts.init(pieContainer1.value);
      myChartMobile.setOption(option);
    }
    if (pieContainer2.value) {
      myChartMobile = echarts.init(pieContainer2.value);
      myChartMobile.setOption(option);
    }
  }, 1);
  // manual active
  setTimeout(()=> {
    selectProduct('columodds-1')
  }, 500)
});
</script>
<style lang="scss" scoped>
#info #analysis-main {
  .active {
    .fx-tb-a {
      li {
        .team-h1 {
          .bar_shade {
            transition: width 1s ease;
            width: 0;
          }
          .bar_shade.start-transition {
            width: auto;
          }
        }
      }
    }
  }
  .bar_shade {
    transition: width 1s ease;
    width: 0;
  }
  .bar_shade.start-transition {
    width: auto;
  }
}

#porletP4, #porletP9 {
  .rankbox {
    .eTable tr {
      th {
        height: 35px;
        padding: 5px 5px;
      }
      td {
        height: 30px !important;
      }
    } 

    .rankdata {
      .eTable tr {
        th {
          height: 35px;
        }
        td {
          height: 30px !important;
        }
      } 
    }
  }
}

#porletP5, #porletP6 {
  .rankbox {
    .eTable tr {
      th {
        height: 25px;
        padding: 5px 5px;

        .toolbox {
          height: 15px;
        }

        p {
          margin-bottom: 0;
        }
      }
      td {
        height: 44px !important;
        padding-top: 0;
        padding-bottom: 0;

        a span {
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            inline-size: 160px;
            text-wrap: nowrap;
          }
      }
    } 

    .rankdata {
      .eTable tr {
        th {
          height: 25px;
          .toolbox {
            height: 15px;
          }

          p {
            margin-bottom: 0;
          }
        }
        td {
          padding-top: 0;
          padding-bottom: 0;
          height: 44px !important;
          min-width: 60px;
        }
      } 
    }
  }
}

#porletP9 {
  .rankbox {
    .eTable tr {
      th {
        height: 65px;
        padding: 5px 5px;
      }
      td {
        height: 30px !important;
      }
    } 

    .rankdata {
      .eTable tr {
        th {
          height: 26px;
        }
        td {
          height: 30px !important;
        }
      } 
    }
  }
}

@media (max-width: 576px) {
  #porletP5, #porletP6 {
    .rankbox {
      .eTable tr {
        th {
          height: 25px;
          padding: 5px 5px;

          p {
            margin-bottom: 0;
          }
        }
        td {
          height: 44px !important;

          a span {
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            inline-size: 100px;
            text-wrap: nowrap;
          }
        }
      } 

      .rankdata {
        .eTable tr {
          th {
            height: 25px;
            
            p {
              margin-bottom: 0;
            }
          }
          td {
            height: 44px !important;
            min-width: 60px;
          }
        } 
      }
    }
  }
}

@media (max-width:1024px) {
  #porletP5, #porletP6, porletP9 {
    table#etable-header  {
        border-bottom: 5px solid #f5f5f5
    }
  }
}


@media (max-width:992px) {
  #porletP5, #porletP6 {
    .rankbox {
      .eTable tr {
        td {
          a span {
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            inline-size: 130px;
            text-wrap: nowrap;
          }
        }
      } 

    }
  }

  .team-table-xq-guest a,
  .team-table-xq-home a {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    inline-size: 235px;
    text-wrap: nowrap;
  }

  .team-table-xq-title {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    inline-size: 170x;
    text-wrap: nowrap;
  }
}
.national {
  padding: 13px;
}

.columodds-selector {
  span {
    background: #e6e6e6 !important;
    color: #333333;
  }
  .active {
    position: relative;
    z-index: 1; 
    font-weight: 600;
    div {
      z-index: 2;
    }
    &::before{
      content: "";
      position: absolute;
      inset: 2px;
      background: white !important;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      border-radius: 4px;
      z-index: 0;
    }
  }
}
</style>