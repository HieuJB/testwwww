<template>
  <div id="table_live_score" class="table_livescore" :class="[{ 'col-md-8': !isHidden, 'col-lg-8': !isHidden }, page]">
    <div class="d-flex d-md-none fast-search">
      <FastSearchLivescore v-model:searchMatch="searchMatch" v-model:activeTab="activeTab" v-model:orderByTime="orderByTime" v-model:renderTopListSearch="renderTopListSearch" v-model:compsList="compsList" v-model:renderTopList="renderTopList" v-model:compsListSearch="compsListSearch"/>
    </div>
    <div id="Layer1">
      <div id="showoptional2" v-if="isFilterBoxLeague">
        <div class="box_showoptional2">
          <div class="sotit">{{ $t('Choose league') }}
            <span class="cc">
              <span style="cursor: pointer;" @click="hideFilterLeague"></span>
            </span>
          </div>
          <div class="rbl " v-if="props?.page === LIVESCORE_PAGE.LIVESCORE">
            <label for="rb0" class="el-radio">
              <input type="radio" name="selectType" id="rb0" value="0" checked v-on:change="onClickLeagueStatus(0)" />
              <span class="el-radio-style">{{ $t('All matches') }}</span>
            </label>
            <label for="rb3" class="el-radio">
              <input type="radio" name="selectType" id="rb3" value="3" v-on:change="onClickLeagueStatus(3)" />
              <span class="el-radio-style">{{ $t('Not started yet') }}</span>
            </label>
            <label for="rb2" class="el-radio">
              <input type="radio" name="selectType" id="rb2" value="2" v-on:change="onClickLeagueStatus(2)" />
              <span class="el-radio-style">{{ $t('Ended') }}</span>
            </label>
            <label for="rb1" class="el-radio">
              <input type="radio" name="selectType" id="rb1" value="1" v-on:change="onClickLeagueStatus(1)" />
              <span class="el-radio-style">{{ $t('In progress') }}</span>
            </label>
          </div>
          <div id="myleague2" class="myleague2">
            <template v-if="isGroupByCountry">
              <template v-for="country in contriesList" :key="country?.id">
                <div :cid="country?.id" class="fg_Title" :id="'country_' + country?.id">
                  <b>{{country?.name}}</b>
                </div>
                <ul>
                  <li v-for="(comp) in country?.league" :key="comp?.id" id="leaguesContent_36" style="display: block;">
                    <input type="checkbox" :id="'myleague_' + comp?.id" v-model="compsDataFilterList[comp?.id]" />
                    <label class="" style="cursor:pointer;" :for="'myleague_' + comp?.id">{{comp?.name}}
                      [{{ comp?.matchs?.length }}]
                      <span class="smallf" id="numtip_36" num="3"></span>
                      <span class="smallf" id="numtip2_36" num="3" style="display:none"></span>
                    </label>
                  </li>
                </ul>
              </template>
            </template>
            <template v-else-if="isGroupByAlphabet">
              <div v-for="country in contriesList" :key="country?.id" class="fg_Title" :id="'country_' + country?.id"
                :cid="country?.id"><b>{{country?.name}}
                </b>
                <ul>
                  <li v-for="(comp) in country?.league" :key="comp?.id" id="leaguesContent_36" style="display: block;">
                    <input type="checkbox" :id="'myleague_' + comp?.id" v-model="compsDataFilterList[comp?.id]" />
                    <label class="" style="cursor:pointer;" :for="'myleague_' + comp?.id">{{comp?.name}}
                      [{{ comp?.matchs?.length }}]
                      <span class="smallf" id="numtip_36" num="3"></span>
                      <span class="smallf" id="numtip2_36" num="3" style="display:none"></span>
                    </label>
                  </li>
                </ul>
              </div>
            </template>
            <template v-else>
              <ul>
                <li v-for="(comp, index) in compChooseLeagueList" :key="index" id="leaguesContent_36"
                  style="display: block;">
                  <input type="checkbox" :id="'myleague_' + comp?.id" v-model="compsDataFilterList[comp?.id]" />
                  <label class="" style="cursor:pointer;" :for="'myleague_' + comp?.id">{{comp?.name}}
                    [{{ comp?.matchs?.length }}]
                    <span class="smallf" id="numtip_36" num="3"></span>
                    <span class="smallf" id="numtip2_36" num="3" style="display:none"></span>
                  </label>
                </li>
              </ul>
            </template>
          </div>
          <!-- <div class="bt-selected">
            <b id='countryNum'>0</b> Matches Selected
          </div> -->
          <p class="bts">
            <span class="fgSpan" title="Sort leagues by Countries.">
              <input type="checkbox" id="cbbSortLeaByCountry" @click="onClickByCountry" v-model="isGroupByCountry" />
              <label for="cbbSortLeaByCountry" style="font-weight: bold;">{{ $t('Select country') }}</label>
            </span>
            <!-- <span class="fgSpan" title="Sort leagues by first letter.">
              <input type="checkbox" id="cbbSortLea" />
              <label for="cbbSortLea" style="font-weight: bold;">A - Z</label>
            </span>  -->
            <span id="button2" @click="selectAll">{{ $t('All') }}</span>
            <span id="button3" @click="selectOthers">{{ $t('Deselect all') }}</span>
            <span id="button" class="ent" @click="confirmCompFilter">{{ $t('Confirm') }}</span>
          </p>
        </div>
      </div>
      <div id="showFilterBox" style="width: 430px;" v-if="isFilterBoxVisible">
        <div class="box_showFilterBox">
          <div class="sotit">Odds Filter
            <span class="cc">
              <span style="cursor: pointer;" @click="hideFilterBox"></span>
            </span>
          </div>

          <div class="rbl">
            <label for="oddsFilter1" class="el-radio">
              <input type="radio" name="oddsFilterType" id="oddsFilter1"
                :class="{ 'checked': activeFilterOdds === 'oddsFilter1' }" @click="setActiveFilterOdds('oddsFilter1')">
              <span class="el-radio-style">Odds Filter</span>
            </label>
            <label for="oddsFilter2" class="el-radio">
              <input type="radio" name="oddsFilterType" id="oddsFilter2"
                :class="{ 'checked': activeFilterOdds === 'oddsFilter2' }" @click="setActiveFilterOdds('oddsFilter2')">
              <span class="el-radio-style">Filter(Crown Odds)</span>
            </label>
          </div>

          <div id="OddsFilter" class="oddsFilter1" v-if="activeFilterOdds === 'oddsFilter1'">
            <div id="goalTable">
              <div class="goalTitle">Asian Handicap</div>
              <table width="95%" cellpadding="0" cellspacing="0">
                <tbody>
                  <tr style="height:24px;">
                    <td width="4%">
                      <input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_0">
                    </td>
                    <td width="21%">3 <span class="smallf">[1]</span>
                    </td>
                    <td width="4%">
                      <input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_1">
                    </td>
                    <td width="21%">2.5/3 <span class="smallf">[1]</span>
                    </td>
                    <td width="4%">
                      <input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_2">
                    </td>
                    <td width="21%">2.5 <span class="smallf">[1]</span>
                    </td>
                    <td width="4%">
                      <input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_3">
                    </td>
                    <td width="21%">2/2.5 <span class="smallf">[1]</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="goalTitle">Over/Under</div>
              <table width="95%" cellpadding="0" cellspacing="0">
                <tbody>
                  <tr style="height:24px;">
                    <td width="4%">
                      <input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_24">
                    </td>
                    <td width="21%">0.5/1 <span class="smallf">[1]</span>
                    </td>
                    <td width="4%">
                      <input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_25">
                    </td>
                    <td width="21%">1 <span class="smallf">[1]</span>
                    </td>
                    <td width="4%">
                      <input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_26">
                    </td>
                    <td width="21%">1/1.5 <span class="smallf">[2]</span>
                    </td>
                    <td width="4%">
                      <input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_27">
                    </td>
                    <td width="21%">1.5 <span class="smallf">[2]</span>
                    </td>
                  </tr>
                  <tr style="height:24px;">
                    <td width="4%">
                      <input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_40">
                    </td>
                    <td width="21%">6.5 <span class="smallf">[1]</span>
                    </td>
                    <td width="4%">
                      <input type="checkbox" name="filterOdds" title="Filter Odds" checked="checked" id="myodds_41">
                    </td>
                    <td width="21%">No Odds <span class="smallf">[321]</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="bt-selected">
              <b id="oddsNum">332</b> Matches Selected
            </div>
            <div id="selectGoals_div" style="text-align: center" class="bts">
              <span>Select All</span>
              <span>Select Others</span>
              <span class="ent">Confirm</span>
            </div>
          </div>

          <div id="StreaksFilter" class="oddsFilter2" v-if="activeFilterOdds === 'oddsFilter2'">
            <div id="filterList">
              <div class="item">
                <span class="name">Winning Streaks</span>
                <span>
                  <label class="ef-radio" for="condition_0_0">
                    <input type="radio" id="condition_0_0" name="filterCid" checked="checked">
                    <span class="ef-radio-style checked">3~4</span>
                  </label>
                </span>
                <span>
                  <label class="ef-radio" for="condition_0_1">
                    <input type="radio" id="condition_0_1" name="filterCid">
                    <span class="ef-radio-style">5~6</span>
                  </label>
                </span>
                <span>
                  <label class="ef-radio" for="condition_0_2">
                    <input type="radio" id="condition_0_2" name="filterCid">
                    <span class="ef-radio-style">7+</span>
                  </label>
                </span>
              </div>
            </div>
            <p class="bts">
              <label id="countBox" style="float: left; margin-top: 10px">
                <b id="conditionNum">0</b> Matches Selected </label>
              <span id="button7" class="ent" style="float: right">Confirm</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div id="Layer2" v-if="(isShowGoalWindow || isShowRedWindow) && isScoreGoal">
      <div id="showoptional2">
        <div class="box_showoptional2">
          <!-- v-show="(isShowGoalWindow || isShowRedWindow) && isScoreGoal" -->
          <table id="flGoalDiv" width="620" border="0" cellpadding="0" cellspacing="0">
            <tbody>
              <tr>
                <td class="GoalDiv-t" height="32" colspan="6">
                  <b>{{ compsListByKey?.get(matchOriginsList?.[isScoreGoalMatchId]?.competition)?.[0]?.name }}</b><b class="goal-time">{{  matchOriginsList?.[isScoreGoalMatchId]?.matchMinutesEvent }}<img src="/icon/in2.gif" border="0" alt="in" width="3" height="8"></b>
                  <span class="iconfont icon-close" @click="isScoreGoal = null"></span>
                </td>
              </tr>
              <tr align="center" class="line">
                <!-- /icon/goal.png -->
                 <!-- /img/incident/4.png -->
                <td width="40"><img class="sjicon" :src="scoreChangeType"></td>
                <td width="180"><span class="teamname"><font class=""><b>{{  matchOriginsList?.[isScoreGoalMatchId]?.home_team?.name }}</b></font></span></td>
                <td width="60" style="font-size: 16px;"><b><font class="blue">{{ matchOriginsList?.[isScoreGoalMatchId]?.home_scores?.[0] }}</font></b> - <b><font class="blue">{{ matchOriginsList?.[isScoreGoalMatchId]?.away_scores?.[0] }}</font></b></td>
                <td width="180"> <span class="teamname"><b><font class="">{{  matchOriginsList?.[isScoreGoalMatchId]?.away_team?.name }}</font></b></span></td>
                <td width="40"></td>
              </tr>
              <tr align="center" class="line">
                <td width="40"></td>
                <td width="180"><i>{{ matchOriginsList?.[isScoreGoalMatchId]?.home_team?.playerName  }}</i></td>
                <td width="60" style="font-size: 16px;"></td>
                <td width="180"><i>{{ matchOriginsList?.[isScoreGoalMatchId]?.away_team?.playerName }}</i></td>
                <td width="40"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="date-now-none"
    v-if="props?.page === LIVESCORE_PAGE.SCHEDULE"
    >
      <div>
        <div class="date-picker">
          <ul class="on">
            <li v-for="itemDate in datesList"
            :key="itemDate?.dayValue"
            :class="dateChoose === itemDate?.dayValue ? 'on' : ''"
             @click="ChoseDate(itemDate?.dayValue)">
              <span>{{ itemDate?.label }}</span><span>{{itemDate?.day}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="tools" class="tools d-none d-md-flex" style="justify-content: space-between;" v-if="!props?.favorites">
      <ul>
        <li id="li_ShowAll" :class="activeTab === LIVESCORE_ACTIVE_TAB.ALL ? 'on' : ''"
          @click="filterMatchs(LIVESCORE_ACTIVE_TAB.ALL)">
          <span>{{ $t('All') }}</span>
        </li>
        <li id="li_FilterHot" :class="activeTab === LIVESCORE_ACTIVE_TAB.HOT ? 'on' : ''"
          @click="filterMatchs(LIVESCORE_ACTIVE_TAB.HOT)">
          <span>{{ $t('Hot') }}</span>
        </li>
        <li id="li_FilterLea" class="filterLi" :class="activeTab === LIVESCORE_ACTIVE_TAB.LEAGUE ? 'on' : ''">
          <span id="LeaSelBtn" @click="showFilterLeague(LIVESCORE_ACTIVE_TAB.LEAGUE)">{{ $t('Leagues') }} <i
              class="icon iconfont icon-drop-down"></i>
          </span>
        </li>
      </ul>
      <FastSearchLivescore v-model:searchMatch="searchMatch" v-model:activeTab="activeTab" v-model:orderByTime="orderByTime" v-model:renderTopListSearch="renderTopListSearch" v-model:compsList="compsList" v-model:renderTopList="renderTopList" v-model:compsListSearch="compsListSearch"/>
    </div>
    <div id="tools" class="tools" v-if="props?.favorites">
      <ul>
        <li @click="favoritesInit = FAVORITES_TYPE.MATCHES" id="li_ShowAll" :class="props?.favorites === $trouter(FAVORITES_TYPE.MATCHES) ? 'on' : ''">
          <div  >
            <span>{{ $t('Match') }}</span>
          </div>
        </li>
        <li  @click="favoritesInit = FAVORITES_TYPE.LEAGUES" id="li_FilterHot" :class="props?.favorites === $trouter(FAVORITES_TYPE.LEAGUES) ? 'on' : ''">
          <div >
            <span>{{ $t('League') }}</span>
          </div>
        </li>
        <li  @click="favoritesInit = FAVORITES_TYPE.TEAMS" id="li_FilterLea" class="tab" :class="props?.favorites === $trouter(FAVORITES_TYPE.TEAMS) ? 'on' : ''">
          <div >
            <span>{{ $t('Team') }}</span>
          </div>
        </li>
      </ul>

    </div>

    <div class="container-fluid" :class="{ 'p-0': !isHidden }">
      <div id="mintable">
        <span id="notify"></span>
        <span id="live">
          <div :class="{ container: !isHidden }" id="table_live">
            <div id="tr_0" class="row scoretitle">
              <div class="col-8 col-sm-8 col-md-1 col-lg-1 align-self-center ps-3">
                <span class="allno" :title="$t('Delete all followed teams')" @click="removeAllFavourites"></span>
              </div>
              <div class="col-md-1 col-lg-1 text-left d-none d-sm-none d-md-inline-block align-self-center">
                {{ $t('Hour') }}
              </div>
              <div 
                id="home"
                class="text-end d-none d-sm-none d-md-inline-block align-self-center" 
                :class="{'col-md-2 col-lg-2': isShowOddsHDP || isShowOddsTX || isShowOdds1X2, 'col-md-3 col-lg-3': !(isShowOddsHDP || isShowOddsTX || isShowOdds1X2)}"
              >
                {{ $t('Home') }}
              </div>
              <div id="ScoreTh" class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center">
                {{ $t('Score') }}
              </div>
              <div 
                id="away"
                class="text-start d-none d-sm-none d-md-inline-block align-self-center" 
                :class="{'col-md-2 col-lg-2': isShowOddsHDP || isShowOddsTX || isShowOdds1X2, 'col-md-3 col-lg-3': !(isShowOddsHDP || isShowOddsTX || isShowOdds1X2)}"
              >
                {{ $t('Away') }}
              </div>
              <div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center">
                <i class="icon iconfont icon-font-report3" :title="$t('Corner')"></i>
              </div>
              <div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" id="HtTh" :title="$t('First half result')">
                {{ $t('H-T') }}
              </div>
              <div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center data_td">
                {{ $t('Data') }}
              </div>
              <div class="col-4 col-sm-4 col-md-2 col-lg-2 text-center align-self-center oddsHead" v-if="isShowOddsHDP || isShowOddsTX || isShowOdds1X2" id="oddsHead">
                <select id="CompanySel" v-model="oddCompanySelected" aria-label="Company Select">
                  <option v-for="(odd_company, index) in ODD_COMPANYS_LIVESCORE" :key="index" :value="odd_company?.id">{{
                   $t(odd_company?.name) }}</option>
                </select>
              </div>
            </div>
            <template v-if="!orderByTime">
              <template v-for="(comp, index) in compsListSearch !== null ? compsListSearch : compsList" :key="comp?.id">
                <template v-if="index < limitData">
                  <div v-if="comp?.matchs?.length" class="row Leaguestitle fbHead isLeaTop" id="tr_2" leaindex="2" data-lidx="2" sclassid="34" isleatop="1">
                    <div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center add-div">
                      <i class="icon iconfont icon-font-collect-off" v-show="!favouritesLeagues?.includes(comp?.id)"  @click="addFavouritesLeagues(comp?.id)"></i>
                      <i class="icon iconfont icon-font-collect-on on " v-show="favouritesLeagues?.includes(comp?.id)"  @click="removeFavouritesLeagues(comp?.id)"></i>
                    </div>
                    <div class="col-9 col-sm-9 col-md-9 col-lg-9 align-self-center">
                      <div class="l1">
                        <div class="league-img">
                            <nuxt-img :src="liveScoresImage + (comp.matchs?.[0]?.isFlatCountry ?  'country/'+comp.country_logo : 'competition/'+comp.logo_o) + imageHeight"  loading="lazy" class="cImg lazy"
                            :alt="comp?.name" style="display: inline;"/>
                        </div>
                        <nuxt-link :to="comp?.matchs?.[0]?.stage?.season_id ? ROUTERS_OLD.LEAGUES + '/' +  comp.id : ''">
                          <span class="LGname">{{ comp?.name }}</span>
                        </nuxt-link>
                      </div>
                    </div>
                    <div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center">
                      <nuxt-link v-if="comp?.matchs?.[0]?.stage?.season_id"
                        :to="ROUTERS_OLD.LEAGUES + '/' +  comp.id" aria-label="Standing" style="display: flex; gap: 4px; justify-content: flex-end;">
                        <nuxt-img src="/img/rank.svg" alt="Standing" :title="$t('Standing info')" loading="lazy" height="24" width="24" class="rankicon" style="display: inline;"/>
                      </nuxt-link>
                    </div>
                    <div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center">
                      <div class="l2">
                        <span class="l5">
                          <span
                            v-show="!toggleCompetition.includes(index)"
                            class="hidden-info r0" @click="collapseMatchesInCompetition($event, index)">
                            <span id="collapse2" class="collapse" :title="$t('Collapse')"></span>
                          </span>
                          <span
                            v-show="toggleCompetition.includes(index)"
                            class="display-info r0" @click="expandMatchesInCompetition($event, index)">
                            <span id="expand2" class="expand"></span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <template v-for="match in comp?.matchs" :key="match?.id">
                    <nuxt-link :to="ROUTERS_OLD.MATCH_DETAIL + match?.id" class="match row">
                      <div :class="`row tds ${props?.page}-col`" style="min-height: 46px;" v-show="!toggleCompetition.includes(index)" :id="'tr1_'+ match?.id" index="2" leaindex="2">
                        <div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center star-like">
                          <div class="add-div">
                            <i class="icon iconfont icon-font-collect-off" v-show="!favouritesList?.includes(match?.id)"  @click.prevent="addFavourites(match?.id)"></i>
                            <i class="icon iconfont icon-font-collect-on on " v-show="favouritesList?.includes(match?.id)"  @click.prevent="removeFavourites(match?.id)"></i>
                            <span v-if="match?.available_stream && availableStreamUrl" target="_blank" @click.prevent="locationHref(availableStreamUrl + '?ls-id=' + match?.id, true)"
                              class="d-none d-md-inline-block liveicon">
                              <span class="icon iconfont icon-icon-live2 live"></span>
                            </span>
                          </div>
                        </div>
                        <div class="col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-none d-md-block" >
                          <div name="timeData" id="mt" v-html="getStatusDisplay(match, $t, timeZone)"></div>
                          <div v-if="LIVESCORE_STATUS.NOT_LIVE.includes(match.status)" style="font-size: 12px; color: var(--secondary, #27660a);">
                            {{ match.status === '12' ? '' : $t('Postpone') }}
                          </div>
                        </div>
                       
                        <div class="col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-sm-inline-block d-md-none">
                          <span class="time">{{formatDateMomentUTCTimeZone(match?.match_time, 'HH:mm', timeZone)}}</span>
                          <span v-if="match?.available_stream && availableStreamUrl" target="_blank" class="liveicon" @click.prevent="locationHref(availableStreamUrl + '?ls-id=' + match?.id, true)"
                            :to="availableStreamUrl + '?ls-id=' + match?.id">
                            <span class="icon iconfont icon-icon-live2 live"></span>
                          </span>
                          <span v-if="LIVESCORE_STATUS.NOT_LIVE.includes(match.status)" style="font-size: 12px; color: var(--secondary, #27660a); margin-left: 3px;">
                              {{ match.status === '12' ? '' : $t('Postpone')}}
                          </span>
                        </div>
                        <div class="col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center">
                            <span class="hafttime_mobile"></span>
                        </div>
                        <div class="col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center score bd_time_mobile">
                            <i class="injury fulltime_mobile">
                              <text></text>
                              <text v-html="getStatusDisplayMobile(match, $t, timeZone)"/>
                            </i>
                        </div>
                        <div class="col-3 col-sm-3 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center conner_mobile">
                          <i class="icon iconfont icon-font-report3"></i>
                            <template v-if="![...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match?.status)">
                              <span id="cr" class="conner_span">
                                {{ (typeof match?.home_scores[4] !== 'undefined') ? match?.home_scores[4] : '' }}-{{ (typeof
                                match?.away_scores[4] !== 'undefined') ? match?.away_scores[4] : '' }}
                              </span>
                            </template>
                            <template v-else>
                              -
                            </template>
                        </div>
                        <div class="col-8 col-sm-8 col-md-2 col-lg-2 text-end d-inline-block d-sm-inline-block d-md-none align-self-center">
                            <div class="row">
                                <div class="col-10 col-sm-10 text-start align-self-center">
                                    <div id="ht">
                                      {{ match?.home_team?.name }}
                                      <span v-if="isShowRanking" id="horder" class="team-hg">{{ match?.home_position ? '[' +
                                        match?.home_position + ']' : '' }}</span>
                                      <span v-if="match?.home_scores[3] && isShowCardYellow" class="yellow1 mx-1">{{
                                        (match?.home_scores[3]) ? match?.home_scores[3] : '' }}</span>
                                      <span v-if="match?.home_scores[2] && isShowCardRed" class="redcard1 mx-1">{{
                                        (match?.home_scores[2]) ? match?.home_scores[2] : '' }}</span>
                                    </div>
                                    <div id="gt">
                                      {{ match?.away_team?.name }}
                                      <span v-if="match?.away_scores[2] && isShowCardRed" class="redcard2 mx-1">{{
                                        (match?.away_scores[2]) ? match?.away_scores[2] : '' }}</span>
                                      <span v-if="match?.away_scores[3] && isShowCardYellow" class="yellow2 mx-1">{{
                                        (match?.away_scores[3]) ? match?.away_scores[3] : '' }}</span>
                                      <span v-if="isShowRanking" id="gorder" class="team-hg">{{ match?.away_position ? '[' +
                                        match?.away_position + ']' : '' }}</span>
                                    </div>
                                </div>
                                <div class="col-1 col-sm-1 text-center align-self-center">
                                  <template v-if="![...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match?.status)">
                                    <span id="hht">
                                      <p>{{ (typeof match?.home_scores[1] !== 'undefined') ? match?.home_scores[1] : '' }}</p>
                                      <p>{{ (typeof match?.away_scores[1] !== 'undefined') ? match?.away_scores[1] : '' }}</p>
                                    </span>
                                  </template>
                                  <template v-else>
                                    -
                                  </template>
                                </div>
                                <div class="col-1 col-sm-1 text-center align-self-center" @mouseover="handleMouseOver($event, match)" @mouseleave="handleMouseLeave">
                                  <b>
                                    <template v-if="![...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match?.status)">
                                    <p>{{ (typeof match?.home_scores[0] !== 'undefined') ? match?.home_scores[0] : '' }}</p>
                                    <p>{{ (typeof match?.away_scores[0] !== 'undefined') ? match?.away_scores[0] : '' }}</p>
                                    </template>
                                    <template v-else>
                                      -
                                    </template>
                                  </b>
                                </div>
                            </div>
                        </div>
                        <div id="ht" class="text-end d-none d-sm-none d-md-inline-block align-self-center"
                          :class="{'col-md-2 col-lg-2': isShowOddsHDP || isShowOddsTX || isShowOdds1X2, 'col-md-3 col-lg-3': !(isShowOddsHDP || isShowOddsTX || isShowOdds1X2)}"
                        >
                          <span v-if="isShowRanking" id="horder" class="team-hg">{{ match?.home_position ? '[' +
                            match?.home_position + ']' : '' }}</span>
                          <span v-if="match?.home_scores[3] && isShowCardYellow" class="yellow1 mx-1">{{
                            (match?.home_scores[3]) ? match?.home_scores[3] : '' }}</span>
                          <span v-if="match?.home_scores[2] && isShowCardRed" class="redcard1 mx-1">{{
                            (match?.home_scores[2]) ? match?.home_scores[2] : '' }}</span>
                          <span class="team-name">{{ match?.home_team?.name }}</span>
                        </div>
                        <div class="handpoint col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center align-content-center height-100"
                          :class="LIVESCORE_STATUS.IS_END.includes(match?.status) ? 'red' : 'blue'"
                          @mouseover="handleMouseOver($event, match)" @mouseleave="handleMouseLeave">
                            <b>
                              <template v-if="![...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match?.status)">
                              {{ (typeof match?.home_scores[0] !== 'undefined') ? match?.home_scores[0] : '' }} - {{
                              (typeof
                              match?.away_scores[0] !== 'undefined') ? match?.away_scores[0] : '' }}
                              </template>
                              <template v-else>
                                -
                              </template>
                            </b>
                        </div>
                        <div id="gt" class="d-none d-sm-none d-md-inline-block align-self-center"
                          :class="{'col-md-2 col-lg-2': isShowOddsHDP || isShowOddsTX || isShowOdds1X2, 'col-md-3 col-lg-3': !(isShowOddsHDP || isShowOddsTX || isShowOdds1X2)}"
                        >
                          <span class="team-name">{{ match?.away_team?.name }}</span>
                          <span v-if="match?.away_scores[2] && isShowCardRed" class="redcard2 mx-1">{{
                            (match?.away_scores[2]) ? match?.away_scores[2] : '' }}</span>
                          <span v-if="match?.away_scores[3] && isShowCardYellow" class="yellow2 mx-1">{{
                            (match?.away_scores[3]) ? match?.away_scores[3] : '' }}</span>
                          <span v-if="isShowRanking" id="gorder" class="team-hg">{{ match?.away_position ? '[' +
                            match?.away_position + ']' : '' }}</span>
                        </div>
                        <div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center" @click.prevent="handleClickCorner($event, match)">
                          <template v-if="![...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match?.status)">
                            <span id="cr" class="conner_span">
                              {{ (typeof match?.home_scores[4] !== 'undefined') ? match?.home_scores[4] : '' }}-{{ (typeof
                              match?.away_scores[4] !== 'undefined') ? match?.away_scores[4] : '' }}
                            </span>
                          </template>
                          <template v-else>
                            -
                          </template>
                        </div>
                        <div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center">
                          <template v-if="![...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match?.status)">
                            <span id="hht" style="display:block;">{{ (typeof match?.home_scores[1] !== 'undefined') ?
                              match?.home_scores[1] : '' }}-{{ (typeof match?.away_scores[1] !== 'undefined') ?
                              match?.away_scores[1] : '' }}
                            </span>
                          </template>
                          <template v-else>
                            -
                          </template>
                        </div>
                        <div class="toolimg col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center">
                          <span class="analyze-icon l0" @click.prevent="locationHref(ROUTERS_OLD.MATCH_DETAIL + match?.id + '?tab=h2h')">
                            <i class="icon iconfont icon-analysis" :title="$t('Analysis')"></i>
                          </span>

                          <span
                            v-if="props?.page === LIVESCORE_PAGE.LIVESCORE || props?.page === LIVESCORE_PAGE.FAVORITES"
                            :id="'flashSpan_' + match?.id" class="matchdata-iconpc l0"
                            @click.prevent="toggleSubInfoSport($event, match)">
                            <span class="icon icon-pc icon-matchdata-pc" :title="$t('Data')"
                              :class="match?.id === matchActiveLiveFlash ? 'on' : ''"></span>
                          </span>
                        </div>
                        <div class="col-4 col-sm-4 col-md-2 col-lg-2 align-self-center oddstd" v-if="(isShowOddsHDP || isShowOddsTX || isShowOdds1X2) && (props?.page === LIVESCORE_PAGE.LIVESCORE || props?.page === LIVESCORE_PAGE.FAVORITES)" @mouseenter="handleMouseOverOdds($event, match)" @mouseleave="handleMouseLeaveOdds">
                            <div class="text-center" style="min-height: 42px;">
                                <ClientOnly>
                                  <table>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <p v-if="isShowOddsHDP" class="odds1" v-html="getOdds(match, 0, 1, true)"></p>
                                        <p v-if="isShowOddsTX" class="odds2" v-html="getOdds(match, 1, 1, true)"></p>
                                        <p v-if="isShowOdds1X2" class="odds3" v-html="getOdds(match, 2, 0)"></p>
                                      </td>
                                      <td v-if="isShowOddsHDP || isShowOddsTX || isShowOdds1X2" class="oddstd">
                                        <p v-if="isShowOddsHDP" class="odds1" v-html="getOdds(match, 0, 0)"></p>
                                        <p v-if="isShowOddsTX" class="odds2" v-html="getOdds(match, 1, 0)"></p>
                                        <p v-if="isShowOdds1X2" class="odds3" v-html="getOdds(match, 2, 1)"></p>
                                      </td>
                                      <td v-if="isShowOddsHDP || isShowOddsTX || isShowOdds1X2" class="oddstd">
                                        <p v-if="isShowOddsHDP" class="odds1" v-html="getOdds(match, 0, 2, true)"></p>
                                        <p v-if="isShowOddsTX" class="odds2" v-html="getOdds(match,  1, 2, true)"></p>
                                        <p v-if="isShowOdds1X2" class="odds3" v-html="getOdds(match, 2, 2)"></p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                </ClientOnly>
                            </div>
                        </div>
                      </div>
                      <div class="table_matchdata">
                        <div v-if="match?.id === matchActiveLiveFlash" :id="'trF_' + match?.id" bgcolor="#FFFFFF">
                          <div colspan="13" align="center" height="18" :id="'flashLive_' + match?.id">
                            <div class="ant row">
                              <div class="flash col-6 p-0">
                                <div class="nodata">
                                  <Loading/>
                                </div>
                                <iframe id="flash" :src="'https://tracker.sportdb.live/?code='+ keyEncode +'&id=' + match?.id + '&lang=' + useLocale?.defaultLocale"
                                onload="this.previousSibling.style.display='none'"></iframe>
                              </div>
                              <div class="matchdata col-6 p-0">
                                <div class="databtns">
                                  <div class="btns" id="divBtns">
                                    <span class="btn_scoredconceded" :class="{ 'on': activeSection === 'scoredConceded' }"
                                      @click.prevent="setActiveSection($event, match, 'scoredConceded')">{{ $t('Scored conceded') }}</span>
                                    <span class="btn_recentstatus" :class="{ 'on': activeSection === 'recentStatus' }"
                                      @click.prevent="setActiveSection($event, match, 'recentStatus')">{{ $t('Recent status') }}</span>
                                  </div>
                                </div>
                                <div class="recentStatus" id="recentStatus" v-show="activeSection === 'recentStatus'">
                                  <div class="liveBox mx2">
                                    <template v-if="matchRecentResult?.[match?.home_team?.id] || matchRecentResult?.[match?.away_team?.id]">
                                      <div class="lb-title">{{ $t('Recent 6') }}</div>
                                      <div class="lb-ms">
                                        <span class="homeSix" v-html="matchRecentResult?.[match?.home_team?.id]">
                                        </span>
                                        <span class="lb-m"><span></span></span>
                                        <span class="guestSix" v-html="matchRecentResult?.[match?.away_team?.id]">
                                        </span>
                                      </div>
                                    </template>
                                    <ul v-if="matchSummary?.stats">
                                      <li>
                                        <template v-for="(stat, index) in matchSummary?.stats" :key="index">
                                          <div class="lb-td1">
                                            <span class="left red">{{ stat?.home }}</span>
                                            <span class="center">{{ $t(getStats(stat?.type)) }}</span>
                                            <span class="right ">{{ stat?.away }}</span>
                                          </div>
                                          <div class="lb-td2">
                                            <span class="home-w">
                                              <span class="home-bar"
                                                :style="'width: ' + ((stat?.home + stat?.away) > 0 ? (stat?.home * 100 / (stat?.home + stat?.away)) : 0) + '%'"></span>
                                            </span>
                                            <span class="guest-w">
                                              <span class="guest-bar"
                                                :style="'width: ' + ((stat?.home + stat?.away) > 0 ? (stat?.away * 100 / (stat?.home + stat?.away)) : 0) + '%'"></span>
                                            </span>
                                          </div>
                                        </template>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div class="guessBox scoredConceded" id="guessDiv"
                                  v-if="activeSection === 'scoredConceded'">
                                  <table width="100%">
                                    <tbody>
                                      <tr>
                                        <th colspan="5">
                                          <div class="cvd">
                                            <div class="btns">
                                              <span class="thirtygames"
                                                :class="{ 'on': activeSectionTable === 'ThirtyGames' }"
                                                @click.prevent="setActiveSectionTable('ThirtyGames')">{{ $t('20 matches') }}</span>
                                              <!-- <span class="fiftygames"
                                                :class="{ 'on': activeSectionTable === 'FiftyGames' }"
                                                @click.prevent="setActiveSectionTable('FiftyGames')">50 trận</span> -->
                                            </div>
                                          </div>
                                        </th>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table width="100%" cellspacing="1" cellpadding="0" id="JSQ_2404596_30"
                                      class="ThirtyGames" v-if="activeSectionTable === 'ThirtyGames'">
                                      <tbody>
                                        <tr>
                                          <td width="20%">{{ $t('Home') }}</td>
                                          <td width="20%" class="y">{{ $t('Minute') }}</td>
                                          <td width="20%">{{ $t('Away') }}</td>
                                        </tr>
                                        <template v-if="matchesAnalysis?.home_shoot_time?.[0]?.length > 0">
                                          <template v-for="(value, index) in matchesAnalysis?.home_shoot_time?.[0]" :key="index">
                                            <tr>
                                              <td>{{ shootTime?.['sumHome'] > 0 ? ((parseFloatO(value) * 100) / shootTime?.["sumHome"]).toFixed(0) : '0' }}%</td>
                                              <td class="y" v-if="index === 4">41~45</td>
                                              <td class="y" v-else-if="index === 5">46~50</td>
                                              <td class="y" v-else>
                                                <span v-if="index < 4">{{ 10 * index + 1 }}~{{ 10 * (index + 1) }}</span>
                                                <span v-else="index > 4">{{ 10 * (index - 1) + 1 }}~{{ 10 * index }}</span>
                                              </td>
                                              <td>
                                                {{ shootTime?.["sumAway"] > 0 ? (matchesAnalysis?.away_shoot_time?.[0]?.[index] ? 
                                                  ((parseFloatO(matchesAnalysis?.away_shoot_time?.[0]?.[index]) * 100) / shootTime?.["sumAway"]).toFixed(0) : '0') : '0' }}%
                                              </td>
                                            </tr>
                                          </template>
                                        </template>
                                        <template v-else>
                                          <tr>
                                            <td colspan="3">{{ $t('Empty Data') }}</td>
                                          </tr>
                                        </template>
                                      </tbody>
                                    </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </nuxt-link>
                  </template>
                </template>
              </template>
              <div ref="loaderMatcher">
                <div colspan="11">
                  <p class="text-center mb-5 load-more-data">
                  </p>
                </div>
              </div>
              <div id="noFavTip" v-if="compsList?.length === 0 && props?.favorites === FAVORITES_TYPE.MATCHES">
                <div class="no_fav_data">
                    <div id="nodatatip" class="no_data">
                        <p class="title">{{ $t('Favorites the match') }}</p>
                        <p class="">{{ $t('Click the check mark') }} <i class="icon iconfont icon-font-collect-off"></i> {{ $t('To follow the match') }} </p>
                        <p><span class="searchbtn" @click="openModalSearch(1)"><i class="icon iconfont icon-font-search"></i>{{ $t('Find a match') }}</span></p>
                    </div>
                </div>
              </div>
              <div id="noFavTip" v-else-if="compsList?.length === 0 && props?.favorites === FAVORITES_TYPE.LEAGUES">
                <div class="no_fav_data">
                    <div id="nodatatip" class="no_data">
                        <p class="title">{{ $t('Favorites the league') }}</p>
                        <p class="">{{ $t('Click the check mark') }} <i class="icon iconfont icon-font-collect-off"></i> {{ $t('To follow the league') }}  </p>
                        <p><span class="searchbtn" @click="openModalSearch(2)"><i class="icon iconfont icon-font-search"></i>{{ $t('Find a league') }}</span></p>
                    </div>
                </div>
              </div>
              <div id="noFavTip" v-else-if="matchsListLength === 0 && props?.favorites === FAVORITES_TYPE.TEAMS">
                <div class="no_fav_data">
                    <div id="nodatatip" class="no_data">
                        <p class="title">{{ $t('Favorites the team') }}</p>
                        <p class="">{{ $t('Click the check mark') }} <i class="icon iconfont icon-font-collect-off"></i>  {{ $t('To follow the team') }} </p>
                        <p><span class="searchbtn" @click="openModalSearch(3)"><i class="icon iconfont icon-font-search"></i>{{ $t('Find a team') }}</span></p>
                    </div>
                </div>
              </div>
            </template>

            <template v-else>
              <template v-for="(item, index) in (renderTopListSearch !== null ? renderTopListSearch : renderTopList)" :key="index">
                
                <template v-if="index < limitData">
                  <ClientOnly>
                    <div v-if="page === LIVESCORE_PAGE.LIVESCORE">{{initTimeTomorrow(item?.[1]?.[0])}}</div>
                    <div class="tomorrow" v-if="item?.[1]?.[0].id === idMatchTomorrow && renderTopListSearch === null && page === LIVESCORE_PAGE.LIVESCORE">{{$t('Tomorrow')}}</div>
                  </ClientOnly>
                  <template v-if="item?.[1]?.[0]?.favouriteTeams && props?.favorites === FAVORITES_TYPE.TEAMS">                   
                    <template v-for="(team, key) in item?.[1]?.[0]?.favouriteTeams" :key="key">
                      <div class="row Leaguestitle fbHead isLeaTop" id="tr_2">
                        <div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center add-div">
                          <i class="icon iconfont icon-font-collect-off add-info-l l0 favL favL_25" :title="$t('Favorites the league')" v-show="!favouritesTeams?.includes(team?.id)"  @click.prevent="addFavouritesTeam(team?.id)"></i>
                          <i class="icon iconfont l0 favL favL_284 on icon-font-collect-on add-info-l2" v-show="favouritesTeams?.includes(team?.id)"  @click.prevent="removeFavouritesTeam(team?.id)"></i>
                        </div>
                        <div class="col-9 col-sm-9 col-md-9 col-lg-9 align-self-center">
                          <div class="l1">
                            <span class="LGname">{{ team?.name }}</span>
                          </div>
                        </div>
                        <div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center">
                        </div>
                        <div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center">
                          <div class="l2">
                            <span class="l5">
                              <span
                                v-show="!toggleCompetition.includes(index)"
                                class="hidden-info r0" @click="collapseMatchesInCompetition($event, index)">
                                <span id="collapse2" class="collapse" :title="$t('Collapse')"></span>
                              </span>
                              <span
                                v-show="toggleCompetition.includes(index)"
                                class="display-info r0" @click="expandMatchesInCompetition($event, index)">
                                <span id="expand2" class="expand"></span>
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </template>
                  </template>
                  <div class="row Leaguestitle fbHead isLeaTop" id="tr_2">
                    <div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center add-div" v-show="props?.favorites !== FAVORITES_TYPE.TEAMS">
                      <i class="icon iconfont icon-font-collect-off add-info-l l0 favL favL_25" :title="$t('Favorites the league')" v-show="!favouritesLeagues?.includes(item?.[1]?.[0].competition)"  @click="addFavouritesLeagues(item?.[1]?.[0].competition)"></i>
                      <i class="icon iconfont l0 favL favL_284 on icon-font-collect-on add-info-l2" v-show="favouritesLeagues?.includes(item?.[1]?.[0].competition)"  @click="removeFavouritesLeagues(item?.[1]?.[0].competition)"></i>
                    </div>
                    <div class="col-9 col-sm-9 col-md-9 col-lg-9 align-self-center">
                      <div class="l1">
                        <div class="league-img">
                            <nuxt-img :src="liveScoresImage+ (item?.[1]?.[0]?.isFlatCountry ? 'country/'+ item?.[1]?.[0].comp.country_logo : 'competition/'+ item?.[1]?.[0].comp.logo_o) + imageHeight"
                            :alt="item?.[1]?.[0].comp.name" class="cImg " style="display: inline;"/>
                        </div>
                        <nuxt-link :to="item?.[1]?.[0]?.stage?.season_id ? ROUTERS_OLD.LEAGUES + '/' +  item?.[1]?.[0].comp.id : ''">
                          <span class="LGname">{{ item?.[1]?.[0].comp.name }}</span>
                        </nuxt-link>
                      </div>
                    </div>
                    <div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center">
                      <nuxt-link v-if="item?.[1]?.[0]?.stage?.season_id"
                        :to="ROUTERS_OLD.LEAGUES + '/' +  item?.[1]?.[0].comp.id" aria-label="Standing" style="display: flex; gap: 4px; justify-content: flex-end;">
                        <nuxt-img src="/img/rank.svg" alt="Standing" :title="$t('Standing info')" height="24" width="24" class="rankicon" style="display: inline;"/>
                      </nuxt-link>
                    </div>
                    <div class="col-1 col-sm-1 col-md-1 col-lg-1 text-center align-self-center">
                      <div class="l2" v-show="props?.favorites !== FAVORITES_TYPE.TEAMS">
                        <span class="l5">
                          <span
                            v-show="!toggleCompetition.includes(index)"
                            class="hidden-info r0" @click="collapseMatchesInCompetition($event, index)">
                            <span id="collapse2" class="collapse" :title="$t('Collapse')"></span>
                          </span>
                          <span
                            v-show="toggleCompetition.includes(index)"
                            class="display-info r0" @click="expandMatchesInCompetition($event, index)">
                            <span id="expand2" class="expand"></span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                 
                  <template v-if="!toggleCompetition.includes(index)">
                    <template v-for="match in item[1]" :key="match?.id">
                      <nuxt-link :to="ROUTERS_OLD.MATCH_DETAIL + match?.id" class="match row">
                        <div class="row tds" style="min-height: 46px;" v-show="!toggleCompetition.includes(index)" :id="'tr1_' + match?.id" :index="match?.id" leaindex="2">
                          <div class="col-1 col-sm-1 col-md-1 col-lg-1 align-self-center">
                            <div class="add-div">
                              <i class="icon iconfont icon-font-collect-off add-info favM" :title="$t('Follow the match')" v-show="!favouritesList?.includes(match?.id)"  @click.prevent="addFavourites(match?.id)"></i>
                              <i class="icon iconfont favM on icon-font-collect-on add-info2" v-show="favouritesList?.includes(match?.id)"  @click.prevent="removeFavourites(match?.id)"></i>
                              <span v-if="match?.available_stream && availableStreamUrl" target="_blank" @click.prevent="locationHref(availableStreamUrl + '?ls-id=' + match?.id, true)"
                                class="d-none d-md-inline-block liveicon">
                                <span class="icon iconfont icon-icon-live2 live"></span>
                              </span>
                            </div>
                          </div>
                          <div class="col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-none d-md-block">
                            <div name="timeData" id="mt" v-html="getStatusDisplay(match, $t, timeZone)"></div>
                            <div v-if="LIVESCORE_STATUS.NOT_LIVE.includes(match.status)" style="font-size: 12px; color: var(--secondary);">
                              {{ match.status === '12' ? '' : $t('Postpone') }}
                            </div>
                          </div>

                          <div class="col-6 col-sm-6 col-md-1 col-lg-1 align-self-center time handpoint d-sm-inline-block d-md-none">
                            <span class="time">{{formatDateMomentUTCTimeZone(match?.match_time, 'HH:mm', timeZone)}}</span>
                            <span v-if="match?.available_stream && availableStreamUrl" target="_blank" class="liveicon" @click.prevent="locationHref(availableStreamUrl + '?ls-id=' + match?.id, true)">
                              <span class="icon iconfont icon-icon-live2 live"></span>
                            </span>
                            <span v-if="LIVESCORE_STATUS.NOT_LIVE.includes(match.status)" style="font-size: 12px; color: var(--secondary); margin-left: 3px;">
                              {{ match.status === '12' ? '' : $t('Postpone') }}
                            </span>
                          </div>
                          <div class="col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center">
                              <span class="hafttime_mobile"></span>
                          </div>
                          <div class="col-1 col-sm-1 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center score bd_time_mobile">
                              <i class="injury fulltime_mobile">
                                <text></text>
                                <text v-html="getStatusDisplayMobile(match, $t, timeZone)"/>
                              </i>
                          </div>
                          <div class="col-3 col-sm-3 col-md-1 col-lg-1 d-sm-inline-block d-md-none align-self-center conner_mobile">
                            <i class="icon iconfont icon-font-report3"></i>
                            <template v-if="![...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match?.status)">
                              <span id="hht">
                                {{ (typeof match?.home_scores[1] !== 'undefined') ? match?.home_scores[1] : '' }}-{{ (typeof match?.away_scores[1] !== 'undefined') ? match?.away_scores[1] : '' }}
                              </span>
                            </template>
                            <template v-else>
                              -
                            </template>
                          </div>
                          <div class="col-8 col-sm-8 col-md-2 col-lg-2 text-end d-inline-block d-sm-inline-block d-md-none align-self-center">
                            <div class="row">
                              <div class="col-10 col-sm-10 text-start align-self-center">
                                  <div id="ht">
                                    {{ match?.home_team?.name }}
                                    <span v-if="isShowRanking" id="horder" class="team-hg">{{ match?.home_position ? '[' +
                                      match?.home_position + ']' : '' }}</span>
                                    <span v-if="match?.home_scores[3] && isShowCardYellow" class="yellow1 mx-1">{{
                                      (match?.home_scores[3]) ? match?.home_scores[3] : '' }}</span>
                                    <span v-if="match?.home_scores[2] && isShowCardRed" class="redcard1 mx-1">{{
                                      (match?.home_scores[2]) ? match?.home_scores[2] : '' }}</span>
                                  </div>
                                  <div id="gt">
                                    {{ match?.away_team?.name }}
                                    <span v-if="match?.away_scores[2] && isShowCardRed" class="redcard2 mx-1">{{
                                      (match?.away_scores[2]) ? match?.away_scores[2] : '' }}</span>
                                    <span v-if="match?.away_scores[3] && isShowCardYellow" class="yellow2 mx-1">{{
                                      (match?.away_scores[3]) ? match?.away_scores[3] : '' }}</span>
                                    <span v-if="isShowRanking" id="gorder" class="team-hg">{{ match?.away_position ? '[' +
                                      match?.away_position + ']' : '' }}</span>
                                  </div>
                              </div>
                              <div class="col-1 col-sm-1 text-center align-self-center">
                                <template v-if="![...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match?.status)">
                                  <span id="hht">
                                    <p>{{ (typeof match?.home_scores[1] !== 'undefined') ? match?.home_scores[1] : '' }}</p>
                                    <p>{{ (typeof match?.away_scores[1] !== 'undefined') ? match?.away_scores[1] : '' }}</p>
                                  </span>
                                </template>
                                <template v-else>
                                  -
                                </template>
                              </div>
                              <div class="col-1 col-sm-1 text-center align-self-center"  @mouseenter="handleMouseOver($event, match)"
                                @mouseleave="handleMouseLeave">
                                  <b>
                                    <template v-if="![...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match?.status)">
                                    <p>{{ (typeof match?.home_scores[0] !== 'undefined') ? match?.home_scores[0] : '' }}</p>
                                    <p>{{ (typeof match?.away_scores[0] !== 'undefined') ? match?.away_scores[0] : '' }}</p>
                                    </template>
                                    <template v-else>
                                      -
                                    </template>
                                  </b>
                              </div>
                            </div>
                          </div>
                          <div id="ht" class="text-end d-none d-sm-none d-md-inline-block align-self-center"
                            :class="{'col-md-2 col-lg-2': isShowOddsHDP || isShowOddsTX || isShowOdds1X2, 'col-md-3 col-lg-3': !(isShowOddsHDP || isShowOddsTX || isShowOdds1X2)}"
                          >
                            <span v-if="isShowRanking" id="horder" class="team-hg">{{ match?.home_position ? '[' +
                              match?.home_position + ']' : '' }}</span>
                            <span v-if="match?.home_scores[3] && isShowCardYellow" class="yellow1 mx-1">{{
                              (match?.home_scores[3]) ? match?.home_scores[3] : '' }}</span>
                            <span v-if="match?.home_scores[2] && isShowCardRed" class="redcard1 mx-1">{{
                              (match?.home_scores[2]) ? match?.home_scores[2] : '' }}</span>
                            <span class="team-name">{{ match?.home_team?.name }}</span>
                          </div>
                          <div class="handpoint col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center align-content-center height-100"
                            :class="LIVESCORE_STATUS.IS_END.includes(match?.status) ? 'red' : 'blue'"
                            @mouseenter="handleMouseOver($event, match)" @mouseleave="handleMouseLeave">
                              <b>
                                <template v-if="![...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match?.status)">
                                {{ (typeof match?.home_scores[0] !== 'undefined') ? match?.home_scores[0] : '' }} - {{
                                (typeof
                                match?.away_scores[0] !== 'undefined') ? match?.away_scores[0] : '' }}
                                </template>
                                <template v-else>
                                  -
                                </template>
                              </b>
                          </div>
                          <div id="gt" class="d-none d-sm-none d-md-inline-block align-self-center "
                            :class="{'col-md-2 col-lg-2': isShowOddsHDP || isShowOddsTX || isShowOdds1X2, 'col-md-3 col-lg-3': !(isShowOddsHDP || isShowOddsTX || isShowOdds1X2)}"
                          >
                            <span class="team-name">{{ match?.away_team?.name }}</span>
                            <span v-if="match?.away_scores[2] && isShowCardRed" class="redcard2 mx-1">{{
                              (match?.away_scores[2]) ? match?.away_scores[2] : '' }}</span>
                            <span v-if="match?.away_scores[3] && isShowCardYellow" class="yellow2 mx-1">{{
                              (match?.away_scores[3]) ? match?.away_scores[3] : '' }}</span>
                            <span v-if="isShowRanking" id="gorder" class="team-hg">{{ match?.away_position ? '[' +
                              match?.away_position + ']' : '' }}</span>
                          </div>
                          <div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center">
                            <template v-if="![...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match?.status)">
                              <span id="cr" class="conner_span" @click.prevent="handleClickCorner($event, match)">
                                {{ (typeof match?.home_scores[4] !== 'undefined') ? match?.home_scores[4] : '' }}-{{ (typeof
                                match?.away_scores[4] !== 'undefined') ? match?.away_scores[4] : '' }}
                              </span>
                            </template>
                            <template v-else>
                              -
                            </template>
                          </div>
                          <div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center">
                            <template v-if="![...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match?.status)">
                              <span id="hht" style="display:block;">{{ (typeof match?.home_scores[1] !== 'undefined') ?
                                match?.home_scores[1] : '' }}-{{ (typeof match?.away_scores[1] !== 'undefined') ?
                                match?.away_scores[1] : '' }}
                              </span>
                            </template>
                            <template v-else>
                              -
                            </template>
                          </div>
                          <div class="col-md-1 col-lg-1 text-center d-none d-sm-none d-md-inline-block align-self-center toolimg">
                            <span class="analyze-icon l0" @click.prevent="locationHref(ROUTERS_OLD.MATCH_DETAIL + match?.id + '?tab=h2h')">
                              <i class="icon iconfont icon-analysis" :title="$t('Analysis')"></i>
                            </span>
                            <span
                              v-if="props?.page === LIVESCORE_PAGE.LIVESCORE || props?.page === LIVESCORE_PAGE.FAVORITES"
                              :id="'flashSpan_' + match?.id" class="matchdata-iconpc l0"
                              @click.prevent="toggleSubInfoSport($event, match)">
                              <span class="icon icon-pc icon-matchdata-pc" :title="$t('Data')"
                                :class="match?.id === matchActiveLiveFlash ? 'on' : ''"></span>
                            </span>
                          </div>
                          <div class="col-4 col-sm-4 col-md-2 col-lg-2 align-self-center oddstd" v-if="(isShowOddsHDP || isShowOddsTX || isShowOdds1X2) && (props?.page === LIVESCORE_PAGE.LIVESCORE || props?.page === LIVESCORE_PAGE.FAVORITES  )" @mouseenter="handleMouseOverOdds($event, match)" @mouseleave="handleMouseLeaveOdds">
                            <div class="text-center oddstd-grid" style="min-height: 42px;">
                              <ClientOnly>
                              <span class="oddstd">
                                <p v-if="isShowOddsHDP" class="odds1" v-html="getOdds(match, 0, 1, true)"></p>
                                <p v-if="isShowOddsTX" class="odds2" v-html="getOdds(match, 1, 1, true)"></p>
                                <p v-if="isShowOdds1X2" class="odds3" v-html="getOdds(match, 2, 0)"></p>
                              </span>
                              <span v-if="isShowOddsHDP || isShowOddsTX || isShowOdds1X2" class="oddstd">
                                <p v-if="isShowOddsHDP" class="odds1" v-html="getOdds(match, 0, 0)"></p>
                                <p v-if="isShowOddsTX" class="odds2" v-html="getOdds(match, 1, 0)"></p>
                                <p v-if="isShowOdds1X2" class="odds3" v-html="getOdds(match, 2, 1)"></p>
                              </span>
                              <span v-if="isShowOddsHDP || isShowOddsTX || isShowOdds1X2" class="oddstd">
                                <p v-if="isShowOddsHDP" class="odds1" v-html="getOdds(match, 0, 2, true)"></p>
                                <p v-if="isShowOddsTX" class="odds2" v-html="getOdds(match,  1, 2, true)"></p>
                                <p v-if="isShowOdds1X2" class="odds3" v-html="getOdds(match, 2, 2)"></p>
                              </span>
                              </ClientOnly>
                              </div>
                          </div>
                        </div>
                        <div class="table_matchdata p-0">
                            <div v-if="match?.id === matchActiveLiveFlash" :id="'trF_' + match?.id" bgcolor="#FFFFFF">
                              <div colspan="13" align="center" height="18" :id="'flashLive_' + match?.id">
                                <div class="ant row">
                                  <div class="flash col-6 p-0">
                                    <div class="nodata">
                                      <Loading/>
                                    </div>
                                    <iframe id="flash" :src="'https://tracker.sportdb.live/?code='+ keyEncode +'&id=' + match?.id + '&lang=' + useLocale?.defaultLocale"
                                      onload="this.previousSibling.style.display='none'"></iframe>
                                  </div>
                                  <div class="matchdata col-6 p-0">
                                    <div class="databtns">
                                      <div class="btns" id="divBtns">
                                        <span class="btn_scoredconceded" :class="{ 'on': activeSection === 'scoredConceded' }"
                                          @click.prevent="setActiveSection($event, match, 'scoredConceded')">{{ $t('Scored conceded') }}</span>
                                        <span class="btn_recentstatus" :class="{ 'on': activeSection === 'recentStatus' }"
                                          @click.prevent="setActiveSection($event, match, 'recentStatus')">{{ $t('Recent status') }}</span>
                                      </div>
                                    </div>
                                    <div class="recentStatus" id="recentStatus" v-show="activeSection === 'recentStatus'">
                                      <div class="liveBox mx2">
                                        <template v-if="matchRecentResult?.[match?.home_team?.id] || matchRecentResult?.[match?.away_team?.id]">
                                          <div class="lb-title">{{ $t('Recent 6') }}</div>
                                          <div class="lb-ms">

                                            <span class="homeSix" v-html="matchRecentResult?.[match?.home_team?.id]">
                                            </span>
                                            <span class="lb-m"><span></span></span>
                                            <span class="guestSix" v-html="matchRecentResult?.[match?.away_team?.id]">
                                            </span>
                                          </div>
                                        </template>
                                        <ul v-if="matchSummary?.stats">
                                          <li>
                                            <template v-for="(stat, index) in matchSummary?.stats" :key="index">
                                              <div class="lb-td1">
                                                <span class="left red">{{stat?.home}}</span>
                                                <span class="center">{{ $t(getStats(stat?.type)) }}</span>
                                                <span class="right ">{{stat?.away}}</span>
                                              </div>
                                              <div class="lb-td2">
                                                <span class="home-w">
                                                  <span class="home-bar"
                                                    :style="'width: ' + ((stat?.home + stat?.away) > 0 ? (stat?.home * 100 / (stat?.home + stat?.away)) : 0)  + '%'"></span>
                                                </span>
                                                <span class="guest-w">
                                                  <span class="guest-bar"
                                                    :style="'width: ' + ((stat?.home + stat?.away) > 0 ? (stat?.away * 100/ (stat?.home + stat?.away)) : 0)  + '%'"></span>
                                                </span>
                                              </div>
                                            </template>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div class="guessBox scoredConceded" id="guessDiv"
                                      v-show="activeSection === 'scoredConceded'">
                                      <table width="100%">
                                        <tbody>
                                          <tr>
                                            <th colspan="5">
                                              <div class="cvd">
                                                <div class="btns">
                                                  <span class="thirtygames"
                                                    :class="{ 'on': activeSectionTable === 'ThirtyGames' }"
                                                    @click.prevent="setActiveSectionTable('ThirtyGames')">{{ $t('20 matches') }}</span>
                                                  <!-- <span class="fiftygames"
                                                    :class="{ 'on': activeSectionTable === 'FiftyGames' }"
                                                    @click.prevent="setActiveSectionTable('FiftyGames')">50 trận</span> -->
                                                </div>
                                              </div>
                                            </th>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table width="100%" cellspacing="1" cellpadding="0" id="JSQ_2404596_30"
                                        class="ThirtyGames" v-show="activeSectionTable === 'ThirtyGames'">
                                        <tbody>
                                          <tr>
                                            <td width="20%">{{ $t('Home') }}</td>
                                            <td width="20%" class="y">{{ $t('Minute') }}</td>
                                            <td width="20%">{{ $t('Away') }}</td>
                                          </tr>
                                          <template v-if="matchesAnalysis?.home_shoot_time?.[0]?.length > 0">
                                            <template v-for="(value, index) in matchesAnalysis?.home_shoot_time?.[0]" :key="index">
                                              <tr>
                                                <td>{{ shootTime?.['sumHome'] > 0 ? ((parseFloatO(value) * 100) / shootTime?.["sumHome"]).toFixed(0) : '0' }}%</td>
                                                <td class="y" v-if="index === 4">41~45</td>
                                                <td class="y" v-else-if="index === 5">46~50</td>
                                                <td class="y" v-else>
                                                  <span v-if="index < 4">{{ 10 * index + 1 }}~{{ 10 * (index + 1) }}</span>
                                                  <span v-else="index > 4">{{ 10 * (index - 1) + 1 }}~{{ 10 * index }}</span>
                                                </td>
                                                <td>
                                                  {{ shootTime?.["sumAway"] > 0 ? (matchesAnalysis?.away_shoot_time?.[0]?.[index] ?
                                                    ((parseFloatO(matchesAnalysis?.away_shoot_time?.[0]?.[index]) * 100) / shootTime?.["sumAway"]).toFixed(0) : '0') : '0' }}%
                                                </td>
                                              </tr>
                                            </template>
                                          </template>
                                          <template v-else>
                                            <tr>
                                              <td colspan="3">{{ $t('Empty Data') }}</td>
                                            </tr>
                                          </template>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                      </nuxt-link>
                    </template>
                  </template>
                </template>
              </template>
              <div ref="loaderMatcher">
                <div colspan="11">
                  <p class="text-center mb-5 load-more-data">
                  </p>
                </div>
              </div>
              <div id="noFavTip" v-if="matchsListLength === 0 && props?.favorites === FAVORITES_TYPE.MATCHES">
                <div class="no_fav_data">
                    <div id="nodatatip" class="no_data">
                        <p class="title">{{ $t('Favorites the match') }}</p>
                        <p class="">{{ $t('Click the check mark') }} <i class="icon iconfont icon-font-collect-off"></i>  {{ $t('To follow the match') }}</p>
                        <p><span class="searchbtn" @click="openModalSearch(1)"><i class="icon iconfont icon-font-search"></i>{{ $t('Find a match') }}</span></p>
                    </div>
                </div>
              </div>
              <div id="noFavTip" v-else-if="matchsListLength === 0 && props?.favorites === FAVORITES_TYPE.LEAGUES">
                <div class="no_fav_data">
                    <div id="nodatatip" class="no_data">
                        <p class="title">{{ $t('Favorites the league') }}</p>
                        <p class="">{{ $t('Click the check mark') }} <i class="icon iconfont icon-font-collect-off"></i>  {{ $t('To follow the league') }}</p>
                        <p><span class="searchbtn" @click="openModalSearch(2)"><i class="icon iconfont icon-font-search"></i>{{ $t('Find a league') }}</span></p>
                    </div>
                </div>
              </div>
              <div id="noFavTip" v-else-if="matchsListLength === 0 && props?.favorites === FAVORITES_TYPE.TEAMS">
                <div class="no_fav_data">
                    <div id="nodatatip" class="no_data">
                        <p class="title">{{ $t('Favorites the team') }}</p>
                        <p class="">{{ $t('Click the check mark') }} <i class="icon iconfont icon-font-collect-off"></i>  {{ $t('To follow the team') }}</p>
                        <p><span class="searchbtn" @click="openModalSearch(3)"><i class="icon iconfont icon-font-search"></i>{{ $t('Find a team') }}</span></p>
                    </div>
                </div>
              </div>
            </template>
          </div>
          <div v-if="!isHidden" id="content-page" :class="expand ? 'content-expand' : 'content-collapse'" v-html="formattedContentPage" v-show="showContentPage"/>
          <p v-if="formattedContentPage && showContentPage && !isHidden && (props.h1 || props.content)"
            id="readmorecontent"
            class="readmore-content item-align-right me-3 mt-3"
            @click="expand = !expand"
          >
            <span>{{ expand ? $t('Collapse') : $t('Read more') }}</span>
          </p>
        </span>
      </div>
    </div>

    <div id="winScore" class="scoretab" v-if="showWinScore && !$isMobile"
      :style="{ position: 'absolute', top: winScorePosition.top, left: winScorePosition.left, zIndex: 100 }"
      @mouseenter="handleMouseOverBlock"
      @mouseleave="handleMouseLeaveBlock">
      <div class="closebtn" @click="closeWinScore"><span></span></div>
      <table width="500" cellpadding="0" cellspacing="1" class="odds-table-bg">
        <tbody>
          <tr>
            <td height="20" colspan="5" class="hand-bg">
              <span color="white">
                <b>{{ $t('Match data') }}</b>
              </span>
            </td>
          </tr>
          <tr class="jqSubTitle">
            <td height="20" width="44%">
              <span>
                <b>{{ matchSummary?.match?.home_team?.name }}</b>
              </span>
            </td>
            <td width="12%">
              <b>{{ $t('Minute') }}</b>
            </td>
            <td width="44%">
              <span>
                <b>{{ matchSummary?.match?.away_team?.name }}</b>
              </span>
            </td>
          </tr>

          <template v-for="(incident, index) in matchSummary?.incidents" :key="index">
            <tr v-if="[1, 3, 4, 9].includes(incident?.type) ">
              <td height="18" class="white-bg right" style="padding:0 2px" v-html="getIncidents(incident, 1)" />
              <td width="12%" class="gray-bg2">{{ incident?.time }}'</td>
              <td class="white-bg left" v-html="getIncidentsRight(incident, 2)" />
            </tr>
          </template>
        </tbody>
      </table>
      <table width="100%" cellpadding="0" cellspacing="1" class="odds-table-bg">
        <tbody>
          <tr>
            <td height="20" colspan="3" class="hand-bg">
              <span color="white">
                <b>{{ $t('Statistical') }}</b>
              </span>
            </td>
          </tr>
          <template v-for="(stat, index) in matchSummary?.stats" :key="index">
            <tr v-if="[21, 22, 25].includes(stat?.type) " height="18" class="white-bg">
              <td width="25%">{{stat?.home}}</td>
              <td class="gray-bg2">{{ $t(getStats(stat?.type)) }}</td>
              <td width="25%">{{stat?.away}}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div id="sbOddsCorner" class="livetab" v-if="showWinScoreCorner"
      :style="{ position: 'absolute', top: winScorePositionCorner.top, left: winScorePositionCorner.left, zIndex: 100 }">
      <div class="closebtn" @click="closeCorner"><span></span></div>
      <table width="100%" cellpadding="0" cellspacing="1" id="tab_CornerOdds" class="odds-table-bg2">
        <tbody>
          <tr>
            <td colspan="2">
              <div class="jqTitle">{{ $t('Corner kick') }}</div>
            </td>
          </tr>
          <tr class="jqSubTitle">
            <td style="width:50%">{{ matchHover?.home_team?.name }}</td>
            <td style="width:50%">{{ matchHover?.away_team?.name }}</td>
          </tr>
        </tbody>
      </table>
      <div class="info" id="div_cornerOdds">
        <div class="jqSubTitle2">
          <span :title="$t('Handicap')">HDP</span>
          <span :title="$t('HanOver/Underdicap')">T/X</span>
        </div>
        <table width="100%" cellpadding="0" cellspacing="1" id="tab_CornerOdds" class="odds-table-bg2">
          <tbody>
            <tr>
              <td width="56" class="white-bg">{{ getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.initial, 1) }}</td>
              <td width="56" class="white-bg">{{ getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.initial, 0) }}</td>
              <td width="56" class="white-bg">{{ getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.initial, 2) }}</td>
              <td class="gray-bg2" width="62">{{ $t('Haft time') }}</td>
              <td width="56" class="white-bg">{{ matchOddsCorner?.corner?.early?.[0]?.over}}</td>
              <td width="56" class="white-bg">{{ matchOddsCorner?.corner?.early?.[0]?.total_corners}}</td>
              <td width="56" class="white-bg">{{ matchOddsCorner?.corner?.early?.[0]?.under}}</td>
            </tr>
            <tr>
              <td class="handOdds">{{ (matchHover?.status === 1) ? getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.instant, 1) : getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay, 1) }}</td>
              <td class="handOdds">{{ (matchHover?.status === 1) ? getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.instant, 0) : getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay, 0) }}</td>
              <td class="handOdds">{{ (matchHover?.status === 1) ? getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.instant, 2) : getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay, 2) }}</td>
              <td class="gray-bg2">{{ $t('Live') }}</td>
              <td class="handOdds">
                <div class="">{{ matchOddsCorner?.corner?.live?.[0]?.over}}</div>
              </td>
              <td class="handOdds">{{ matchOddsCorner?.corner?.live?.[0]?.total_corners}}</td>
              <td class="handOdds">
                <div class="">{{ matchOddsCorner?.corner?.live?.[0]?.under}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="info" id="div_cornerDetail" style="display:">
        <div class="jqTitle2">{{ $t('Detail') }}</div>
        <table id="tab_CornerDetail" width="100%" cellpadding="0" cellspacing="1" style="margin-top:-1px;"
          class="odds-table-bg2">
          <tbody>
            <tr>
              <td width="165" class="white-bg">{{ matchCorner?.home_corner ? matchCorner?.home_corner : '0' }}</td>
              <td width="60" class="gray-bg2">Cả trận</td>
              <td class="white-bg">{{ matchCorner?.away_corner ? matchCorner?.away_corner : '0' }}</td>
            </tr>
            <tr>
              <td class="white-bg">{{ matchCorner?.home_haft_corner ? matchCorner?.home_haft_corner : '0' }}</td>
              <td class="gray-bg2">{{ $t('Haft time') }}</td>
              <td class="white-bg">{{ matchCorner?.away_haft_corner ? matchCorner?.away_haft_corner : '0' }}</td>
            </tr>
            <template v-for="(cornerEvent, index) in matchCorner?.event_list" :key="index">
              <tr>
                <td width="165" class="white-bg" v-html="getCorner(cornerEvent, matchHover?.home_team?.i_team, 1)" />
                <td width="60" class="gray-bg2">{{ cornerEvent?.minute }}'</td>
                <td class="white-bg" v-html="getCorner(cornerEvent, matchHover?.away_team?.i_team, 2)" />
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <div id="oddsChange" class="oddsdetail" v-if="showWinScoreOdds && !$isMobile" @mouseenter="handleMouseOverOddsBlock"
      @mouseleave="handleMouseLeaveOddsBlock"
      :style="{ position: 'absolute', top: winScorePositionOdds.top, left: winScorePositionOdds.left, zIndex: 100 }">
      <div class="closebtn" @click="closeOddsChange"><span></span></div>
      <table width="555" class="oddschanges m5" cellpadding="0" cellspacing="0">
        <tbody>
          <tr class="position-relative">
            <b class="isport-name">{{ iCompanyName(matchHover?.i_company_id) }}</b>
            <td width="48%" class="white-bg2 odd-teamname fw-bold" style="text-align:right;padding-right:10px; ">
               <div style="display: flex; justify-content: flex-end;">
                <div style="max-width: 200px;">{{ matchHover?.home_team?.name }}</div>
               </div>
            </td>
            <td id="ffScoreDetail" sid="2419844" width="2%" class="white-bg2 odd-score">VS</td>
            <td width="48%" class="white-bg2 odd-teamname fw-bold" style="text-align:left;padding:0 20px 0 10px; ">
              <div style="display: flex; justify-content: flex-start;">
                <div style="max-width: 200px;">{{ matchHover?.away_team?.name }}</div>
               </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table id="ffOddsDetail" width="555px" class="oddschanges" cellpadding="0" cellspacing="1"
        style="margin-bottom:5px" odds="">
        <tbody>
          <tr>
            <td width="15%" class="odd-bg1" :title="$t('Full time')">FT</td>
            <td colspan="3" class="gray">{{ $t('Running') }}</td>
            <td colspan="3" class="oddschanges-bg1" :title="$t('Live instant')">TL</td>
            <td colspan="3" class="oddschanges-bg2">{{ $t('Initial') }}</td>
          </tr>
          <tr>
            <td class="odd-bg1" style="padding:0 4px;" :title="$t('Handicap')">
              <b>HDP</b>
            </td>
            <td width="8%" id="ah_run1" class="gray">{{ getDetailOdds(oddsDetail, 'handicap', 'inplay', 1) }}</td>
            <td width="13%" id="ah_run2" class="gray">{{ getDetailOdds(oddsDetail, 'handicap', 'inplay', 0) }}</td>
            <td width="8%" id="ah_run3" class="gray">{{ getDetailOdds(oddsDetail, 'handicap', 'inplay', 2) }}</td>
              <!-- {{ getDetailOdds(oddsDetail, 'handicap', 'instant', 1) }} -->
            <td width="8%" id="ah_live1" class="oddschanges-bg1" v-html="getDetailOddsChange(oddsDetail, 'handicap', 'instant', 1)"></td>
            <!-- {{ getDetailOdds(oddsDetail, 'handicap', 'instant', 0) }} -->
            <td width="13%" id="ah_live2" class="oddschanges-bg1" v-html="getDetailOddsChange(oddsDetail, 'handicap', 'instant', 0)"> </td>
            <!-- {{ getDetailOdds(oddsDetail, 'handicap', 'instant', 2) }} -->
            <td width="8%" id="ah_live3" class="oddschanges-bg1" v-html="getDetailOddsChange(oddsDetail, 'handicap', 'instant', 2)"></td>
            <td width="8%" id="ah_first1" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'handicap', 'initial', 1)
              }}</td>
            <td width="13%" id="ah_first2" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'handicap', 'initial',
              0) }}</td>
            <td width="8%" id="ah_first3" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'handicap', 'initial', 2)
              }}</td>
          </tr>
          <tr>
            <td class="odd-bg1" style="padding:0 4px;":title="$t('Over/Under')"><b>{{ $t('T/X') }}</b></td>
            <td id="ou_run1" class="gray">{{ getDetailOdds(oddsDetail, 'overUnder', 'inplay', 1) }}</td>
            <td id="ou_run2" class="gray">{{ getDetailOdds(oddsDetail, 'overUnder', 'inplay', 0) }}</td>
            <td id="ou_run3" class="gray">{{ getDetailOdds(oddsDetail, 'overUnder', 'inplay', 2) }}</td>
            <td id="ou_live1" class="oddschanges-bg1" v-html="getDetailOddsChange(oddsDetail, 'overUnder', 'instant', 1)"></td>
            <td id="ou_live2" class="oddschanges-bg1" v-html="getDetailOddsChange(oddsDetail, 'overUnder', 'instant', 0)"></td>
            <td id="ou_live3" class="oddschanges-bg1" v-html="getDetailOddsChange(oddsDetail, 'overUnder', 'instant', 2)"></td>
            <td id="ou_fist1" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'overUnder', 'initial', 1) }}</td>
            <td id="ou_fist2" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'overUnder', 'initial', 0) }}</td>
            <td id="ou_fist3" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'overUnder', 'initial', 2) }}</td>
          </tr>
          <tr>
            <td class="odd-bg1" style="padding:0 4px;" :title="$t('1x2')"><b>{{ $t('1x2') }}</b></td>
            <td id="1x2_run1" class="gray">{{ getDetailOdds(oddsDetail, 'europeOdds', 'inplay', 0) }}</td>
            <td id="1x2_run2" class="gray">{{ getDetailOdds(oddsDetail, 'europeOdds', 'inplay', 1) }}</td>
            <td id="1x2_run3" class="gray">{{ getDetailOdds(oddsDetail, 'europeOdds', 'inplay', 2) }}</td>
            <td id="1x2_live1" class="oddschanges-bg1" v-html="getDetailOddsChange(oddsDetail, 'europeOdds', 'instant', 0)"></td>
            <td id="1x2_live2" class="oddschanges-bg1" v-html="getDetailOddsChange(oddsDetail, 'europeOdds', 'instant', 1)"></td>
            <td id="1x2_live3" class="oddschanges-bg1" v-html="getDetailOddsChange(oddsDetail, 'europeOdds', 'instant', 2)"></td>
            <td id="1x2_fist1" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 0) }}</td>
            <td id="1x2_fist2" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 1) }}</td>
            <td id="1x2_fist3" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 2) }}</td>
          </tr>
          <tr class="more">
            <td colspan="10">
              <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL +  matchHover?.id, query: { tab: MATCH_TAB.ODDS, type: MATCH_TAB.ODDSCOMP}}"><span>{{ $t('View more data') }}</span></nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
      <table id="fhOddsDetail" width="555px" class="oddschanges" cellpadding="0" cellspacing="1" border="0"
        odds="0,0.50,1.42,1.14,6.60,8.20,1.5,4.16,0.10">
        <tbody>
          <tr>
            <td width="14%" class="odd-bg1" :title="$t('Haft time')">HT</td>
            <td colspan="3" class="gray">{{ $t('Running') }}</td>
            <td colspan="3" class="oddschanges-bg1" :title="$t('Live instant')">TL</td>
            <td colspan="3" class="oddschanges-bg2">{{ $t('Initial') }}</td>
          </tr>
          <tr>
            <td class="odd-bg1" style="padding:0 4px;" :title="$t('HDP')"><b>{{ $t('HDP') }}</b></td>
            <td id="ah_ht_run1" width="8%" class="gray" >{{ getDetailOdds(oddsDetail, 'handicapHalf', 'inplay', 1) }}
            </td>
            <td id="ah_ht_run2" width="13%" class="gray">{{ getDetailOdds(oddsDetail, 'handicapHalf', 'inplay', 0) }}
            </td>
            <td id="ah_ht_run3" width="8%" class="gray">{{ getDetailOdds(oddsDetail, 'handicapHalf', 'inplay', 1) }}
            </td>
            <td id="ah_ht_live1" width="8%" class="oddschanges-bg1">
              <div class="">{{ getDetailOdds(oddsDetail, 'handicapHalf', 'instant', 1) }}</div>
            </td>
            <td id="ah_ht_live2" width="13%" class="oddschanges-bg1">{{ getDetailOdds(oddsDetail, 'handicapHalf',
              'instant', 0) }}</td>
            <td id="ah_ht_live3" width="8%" class="oddschanges-bg1">
              <div class="">{{ getDetailOdds(oddsDetail, 'handicapHalf', 'instant', 2) }}</div>
            </td>
            <td id="ah_ht_first1" width="8%" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'handicapHalf',
              'initial', 1) }}</td>
            <td id="ah_ht_first2" width="13%" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'handicapHalf',
              'initial', 0) }}</td>
            <td id="ah_ht_first3" width="8%" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'handicapHalf',
              'initial', 1) }}</td>
          </tr>
          <tr>
            <td class="odd-bg1" style="padding:0 4px;" :title="$t('T/X')"><b>{{ $t('T/X') }}</b></td>
            <td id="ou_ht_run1" class="gray">{{ getDetailOdds(oddsDetail, 'overUnderHalf', 'inplay', 1) }}</td>
            <td id="ou_ht_run2" class="gray">{{ getDetailOdds(oddsDetail, 'overUnderHalf', 'inplay', 0) }}</td>
            <td id="ou_ht_run3" class="gray">{{ getDetailOdds(oddsDetail, 'overUnderHalf', 'inplay', 2) }}</td>
            <td id="ou_ht_live1" class="oddschanges-bg1">
              <div class="">{{ getDetailOdds(oddsDetail, 'overUnderHalf', 'instant', 1) }}</div>
            </td>
            <td id="ou_ht_live2" class="oddschanges-bg1">{{ getDetailOdds(oddsDetail, 'overUnderHalf', 'instant', 0) }}
            </td>
            <td id="ou_ht_live3" class="oddschanges-bg1">
              <div class="">{{ getDetailOdds(oddsDetail, 'overUnderHalf', 'instant', 2) }}</div>
            </td>
            <td id="ou_ht_first1" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'overUnderHalf', 'initial', 1) }}
            </td>
            <td id="ou_ht_first2" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'overUnderHalf', 'initial', 0) }}
            </td>
            <td id="ou_ht_first3" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'overUnderHalf', 'initial', 2) }}
            </td>
          </tr>
          <tr>
            <td class="odd-bg1" style="padding:0 4px;" :title="$t('1x2')"><b>{{ $t('1x2') }}</b></td>
            <td id="1x2_ht_run1" class="gray">{{ getDetailOdds(oddsDetail, 'europeanHaft', 'inplay', 0) }}</td>
            <td id="1x2_ht_run2" class="gray">{{ getDetailOdds(oddsDetail, 'europeanHaft', 'inplay', 1) }}</td>
            <td id="1x2_ht_run3" class="gray">{{ getDetailOdds(oddsDetail, 'europeanHaft', 'inplay', 2) }}</td>
            <td id="1x2_ht_live1" class="oddschanges-bg1">
              <div class="">{{ getDetailOdds(oddsDetail, 'europeanHaft', 'instant', 0) }}</div>
            </td>
            <td id="1x2_ht_live2" class="oddschanges-bg1">
              <div class="">{{ getDetailOdds(oddsDetail, 'europeanHaft', 'instant', 1) }}</div>
            </td>
            <td id="1x2_ht_live3" class="oddschanges-bg1">
              <div class="">{{ getDetailOdds(oddsDetail, 'europeanHaft', 'instant', 2) }}</div>
            </td>
            <td id="1x2_ht_first1" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'europeanHaft', 'initial', 0) }}
            </td>
            <td id="1x2_ht_first2" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'europeanHaft', 'initial', 1) }}
            </td>
            <td id="1x2_ht_first3" class="oddschanges-bg2">{{ getDetailOdds(oddsDetail, 'europeanHaft', 'initial', 2) }}
            </td>
          </tr>
          <tr class="more">
            <td colspan="10">
              <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL +  matchHover?.id, query: { tab: MATCH_TAB.ODDS, type: MATCH_TAB.ODDSCOMP, haft: 1}}"><span>{{ $t('View more data') }}</span></nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!--right start -->
  <div v-if="!isHidden" :class="{'col-md-2 col-lg-2 d-none d-sm-none d-md-inline-block': true, 'settings_table_mobile': isRightClassAdded}" id="right">
    <div class="n-search">
      <input type="text" id="rightSearchInput" class="input_text" :placeholder="$t('Advanced Search')"
        autoComplete="off" @click="openModalSearch(1)" title="Search"/>
    </div>
    <div class="lrdiv newsetting">
      <div class="toolsBox">
        <div class="matchinfo_setting">
          <div class="lr_tit on" :title="$t('Sort by')">{{ $t('Sort by') }}</div>
          <ul class="setList" id="set_order" style="min-height: 45.6px">
            <li class="chose radio" :class="!orderByTime ? 'on' : ''" @click="orberBy()">
              <span class="ro"><label  for="radio-2"><input id="radio-2" name="radio-2" type="radio" :checked="!orderByTime"><span @click="orberBy()">{{ $t('Leagues') }}</span></label></span>
            </li>
            <li class="chose radio mb-2" :class="orderByTime ? 'on' : ''" @click="orberBy()">
              <span class="ro"><label for="radio-1"><input id="radio-1" name="radio-1" type="radio" :checked="orderByTime"><span @click="orberBy()">{{ $t('Time') }}</span></label></span>
            </li>
          </ul>
        </div>
        <div class="matchinfo_setting">
          <template v-if="props?.page !== LIVESCORE_PAGE.SCHEDULE">
            <!-- <div class="lr_tit">{{ $t('Show TL') }}</div>
            <div id="odds_setting" class="odds_setting">
              <span class="odds_detail">
                <span>
                  <input type="checkbox" id="otc_1" v-model="isShowOddsHDP" name="goalType" />
                  <label for="otc_1" :title="$t('Handicap')">HDP</label>
                  <input type="checkbox" id="otc_2" v-model="isShowOddsTX" name="goalType" />
                  <label for="otc_2" :title="$t('Over/Under')">T/X</label>
                  <input type="checkbox" id="otc_3" v-model="isShowOdds1X2" name="goalType" />
                  <label for="otc_3" :title="$t('Odd 1X2')">1x2</label>
                </span>
              </span>
            </div> -->

             <div class="lr_tit on" :title="$t('Show TL')">{{ $t('Show TL') }}</div>
          <ul class="Preferences">
            <li>
              <label for='isShowOddsHDP1' class="switch">{{ $t('Handicap') }}
                <input v-model="isShowOddsHDP" type="checkbox" name="isShowOddsHDP1" id="isShowOddsHDP1" />
                <span class="switch-style"></span>
              </label>
            </li>
            <li>
              <label for="ShowOddsTX" class="switch">{{ $t('Over/Under') }}
                <input v-model="isShowOddsTX" type="checkbox" name="ShowOddsTX" id="ShowOddsTX" />
                <span class="switch-style"></span>
              </label>
            </li>
            <li>
              <label for='ShowOdds1X2' class="switch">{{ $t('1x2') }}
                <input v-model="isShowOdds1X2" type="checkbox" name="ShowOdds1X2" id="ShowOdds1X2" />
                <span class="switch-style"></span>
              </label>
            </li>
          </ul>

          </template>
        </div>
        <div class="matchinfo_setting">
          <div class="preferences_setting">
            <div class="lr_tit on" :title="$t('Show notification')">{{ $t('Show notification') }}</div>
            <div class="selectbox" id="selectbox">
              <span value="0" @click="checkSettingType(0)" :class="settingType === 0 ? 'on' : ''" :title="$t('All')">{{ $t('All') }}</span>
              <span value="1" @click="checkSettingType(1)" :class="settingType === 1 ? 'on' : ''" :title="$t('Favorites')">{{ $t('Favorites') }}</span>
            </div>
            <ul class="Preferences nopadding" style="margin-bottom: 16px">
              <li>
                <label for="goalWindowCheck" class="switch">{{ $t('Goal window') }}
                  <input v-model="isShowGoalWindow" type="checkbox" name="goalWindowCheck" id="goalWindowCheck" checked="">
                  <span class="switch-style"></span>
                </label>
              </li>
              <li>
                <label for="redWindowCheck" class="switch">{{ $t('Red card window') }}
                  <input v-model="isShowRedWindow" type="checkbox" name="redWindowCheck" id="redWindowCheck" checked="">
                  <span class="switch-style"></span>
                </label>
              </li>
            </ul>

            <div class="lr_tit on" :title="$t('Sound')">{{ $t('Sound') }}</div>
            <div class="soundbox">
                <div>{{ $t('Home team scores') }}:</div>
                <div class="selectbox sound" id="selectsound1">
                    <span value="0" @click="CheckSound(0)" :class="soundHome === 0 ? 'on' : ''">1</span>
                    <span value="1" @click="CheckSound(1)" :class="soundHome === 1 ? 'on' : ''">2</span>
                    <span value="2" @click="CheckSound(2)" :class="soundHome === 2 ? 'on' : ''">3</span>
                    <span value="3" @click="CheckSound(3)" :class="soundHome === 3 ? 'on' : ''">4</span>
                    <span value="4" @click="CheckSound(4)" :class="soundHome === 4 ? 'on' : ''">NO</span>
                </div>
            </div>
            <div class="soundbox">
                <div>{{ $t('Away team scores') }}:</div>
                <div class="selectbox sound" id="selectsound2">
                    <span value="0" @click="CheckSound2(0)" :class="soundAway === 0 ? 'on' : ''">1</span>
                    <span value="1" @click="CheckSound2(1)" :class="soundAway === 1 ? 'on' : ''">2</span>
                    <span value="2" @click="CheckSound2(2)" :class="soundAway === 2 ? 'on' : ''">3</span>
                    <span value="3" @click="CheckSound2(3)" :class="soundAway === 3 ? 'on' : ''">4</span>
                    <span value="4" @click="CheckSound2(4)" :class="soundAway === 4 ? 'on' : ''">NO</span>
                </div>
            </div>
          </div>
        </div>
        <div class="matchinfo_setting">
          <div class="lr_tit on" :title="$t('Show page')">{{ $t('Show page') }}</div>
          <ul class="Preferences">
            <li>
              <label for='TeamOrderCheck' class="switch">{{ $t('Ranking') }}
                <input v-model="isShowRanking" type="checkbox" name="TeamOrderCheck" id="TeamOrderCheck" />
                <span class="switch-style"></span>
              </label>
            </li>
            <li>
              <label for="YellowCheck" class="switch">{{ $t('Yellow card') }}
                <input v-model="isShowCardYellow" type="checkbox" name="YellowCard" id="YellowCheck" />
                <span class="switch-style"></span>
              </label>
            </li>
            <li>
              <label for='ShowRemarkCheck' class="switch">{{ $t('Red card') }}
                <input v-model="isShowCardRed" type="checkbox" name="ShowRemarkCheck" id="ShowRemarkCheck" />
                <span class="switch-style"></span>
              </label>
            </li>
          </ul>
        </div>
        <div class="matchinfo_setting" v-if="isTurnOnTimeZone">
          <div class="lr_tit on" for="timeZone">Múi giờ</div>
          <select v-model="timeZone" aria-label="timeZone">
            <template v-for="(item, key) in TIME_ZONE_LIST" :key="key">
              <option  :value="item?.value" :selected="timeZone === item?.value ? true : false">{{ item?.key }}</option>
            </template>
          </select>
        </div>
        <div class="matchinfo_setting" v-if="onOffIframe == 'True'">
          <ul class="Preferences iframe">
            <li>
              <label class="switch">
                {{ $t('Embed code') }}
                <input type="checkbox" name="iframe" id="iframeCheck" @change="toggleIframe" />
                <span class="switch-style"></span>
              </label>
            </li>
          </ul>
          <div class="content_iframe" v-if="isIframeVisible">
            <textarea id="embedCodeTextarea" readonly v-model="embedCode" style="height: 155px; width: 100%"></textarea>
          </div>
        </div>

      </div>
    </div>
  </div>
  <SoundLiveScore v-if="isShowSoundLiveScore" v-model:sound="sound"/>
</template>

<script setup lang="ts">
const { initSchemaLivescore } = useSchema()
const { $isMobile } = useNuxtApp()
import { nextTick, ref } from 'vue';
import { useIntersectionObserver, useWindowScroll } from '@vueuse/core'
import { systemsStore } from '~/stores/systems'
import { groupBy } from '~/utils/livescore_helper';
import moment from 'moment-timezone';
import { formatDateMomentUTCTimeZone } from '@/utils/moment_helper'
import { socketStore } from '@/stores/wsocket'
import { useMatchStore } from '@/stores/useMatchStore'
import { useDebounceFn } from '@vueuse/core'
import '~/utils/moment.locale.vi.ts';

import { actionsStore } from '~/stores/useActions'
// import { useSound } from '@vueuse/sound'
// import _soundGoal0 from "@/public/assets/sound/sound0.mp3";
// import _soundGoal1 from "@/public/assets/sound/sound1.mp3";
// import _soundGoal2 from "@/public/assets/sound/sound2.mp3";
// import _soundGoal3 from "@/public/assets/sound/sound3.mp3";
// import _soundGoal4 from "@/public/assets/sound/sound4.mp3";
// import _soundRed from "@/public/assets/sound/red.mp3";
const { y } = useWindowScroll()
const keyEncode = ref('');
const fetchKeyEncode = () => {
  keyEncode.value = dec_spdb;
};

const storeSystems = systemsStore()
//const localePath = useLocalePath()
const useAction = actionsStore()
const { useLocale, $t, $trouter, isNavVisible } = useShareCommon()
isNavVisible.value = true
moment.locale(useLocale?.value.defaultLocale ?? 'en');

const embedCode = ref('');
const isIframeVisible = ref(false);
const imageHeight = getConfig(storeSystems?.configurations, 'LEAGUE_IMAGE_HEIGHT') ?? '!h50';
const liveScoresImage = computed(()=> {
  return useRuntimeConfig().public.liveScoreImage + '/'
})
const toggleIframe = () => {
  isIframeVisible.value = !isIframeVisible.value;
  if (isIframeVisible.value) {
    generateEmbedCode();
  }
};

const generateEmbedCode = () => {
  const currentUrl = window.location.href;
  const iframeUrl = `${currentUrl}?mode=iframe`;
  embedCode.value = `<iframe src="${iframeUrl}" frameborder="0" height="950px" width="100%"></iframe>`;
};

const searchMatch = ref('')

const getIframe = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode');
  const selector = urlParams.get('selector');

  if (mode === 'iframe') {
    // Kiểm tra và thêm `?mode=iframe` vào URL nếu nó chưa có
    const currentUrl = window.location.href;
    if (!currentUrl.includes('mode=iframe')) {
      const newUrl = currentUrl.includes('?') 
        ? `${currentUrl}&mode=iframe`
        : `${currentUrl}?mode=iframe`;

      // Cập nhật URL mà không tải lại trang
      window.history.replaceState({}, '', newUrl);
    }

    // Theo dõi các thay đổi URL và luôn thêm `?mode=iframe` nếu thiếu
    window.addEventListener('popstate', () => {
      const updatedUrl = window.location.href;
      if (!updatedUrl.includes('mode=iframe')) {
        const newUpdatedUrl = updatedUrl.includes('?') 
          ? `${updatedUrl}&mode=iframe`
          : `${updatedUrl}?mode=iframe`;
        window.history.replaceState({}, '', newUpdatedUrl);
      }
    });

    // Lắng nghe sự kiện click trên tất cả các liên kết trong trang
    document.addEventListener('click', function(event) {
      const target = event.target.closest('a'); // Lấy thẻ <a> được bấm
      if (target && target.href) {
        const newHref = target.href.includes('?') 
          ? `${target.href}&mode=iframe`
          : `${target.href}?mode=iframe`;
        
        event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
        window.location.href = newHref; // Điều hướng tới URL mới với `?mode=iframe`
      }
    });
  }
};

const isTurnOnTimeZone = computed(()=> {
  try {
    return (String(getConfig(storeSystems?.configurations, 'OPTION_TIMEZONE')).toLowerCase()) === 'true'
  } catch {
    return false
  }
})


const props = defineProps<{
  page: string,
  isLoading?: boolean | false,
  content: string,
  favorites?: string | undefined,
  h1: string
}>()

const emit = defineEmits<{
}>()

const isRightClassAdded = ref()
// Get data from cookie
const settingsData = useCookie<any>('settingsData')
const isHidden =  useState('my-shallow-state')
const router = useRouter()
const route = useRouter()
const ITEM_PER_PAGE = 10
const socket = socketStore()
const matchStore = useMatchStore()
const isVisible = ref(false)
const liveScores = ref([])
const renderOrderBy = ref(1)// 1 -Theo giải đấu; 2- theo thời gian
const compKeysList = ref()
const compsList = ref()
const compsListByKey = ref()
const renderTopList = ref()
const compsDataList = ref([])
const compsDataFilterList = ref([])
const compsDataListByKey = ref()
const compOriginsList = ref([])
const compChooseLeagueList = ref([])
const compOriginsListByCountry = ref([])
const compOriginsListByAlphabet = ref([])
const countriesKeysList = ref()
const matchsGroupList = ref()
const matchOriginsList = ref()
const matchsList = ref([])
const matchLivesList = ref([])
const matchRecentResult = ref([])
const activeTab = ref(LIVESCORE_ACTIVE_TAB.ALL)
const isLoadingData = ref(true)
const isLoadingMore = ref(true)
const matchSocketUpdate = ref(false)
const oddCompanySelected = ref(ODD_COMPANY_DEFAULT_LIVESCORE)
const oddCompanyIsport = computed(() => {
  const oddCompany = ODD_COMPANYS_LIVESCORE.find(({ id }) => id === oddCompanySelected.value)
  return oddCompany?.isportsapi
})
const formattedContentPage = computed(() => {
  //return contentPage.value
  return `<h1 class="page_title">${props.h1 ?? ''}</h1>${props?.content ?? ''}`
}); 
const winScorePositionCorner = ref({ top: '0px', left: '0px' });
const showWinScoreCorner = ref(false);
const orderByTime = ref(false) // false -Theo giải đấu; true - theo thời gian
const winScorePositionOdds = ref({ top: '0px', left: '0px' });
const showWinScoreOdds = ref(false);
const isFocusWinScoreOdds = ref(false)
const winScorePosition = ref({ top: 0, left: 0 });
const showWinScore = ref(false);
const isFocusWinScore = ref(false)
const showSubInfoSport = ref(false);
const activeSection = ref('scoredConceded');
const activeSectionTable = ref('ThirtyGames');
const availableStreamUrl = getConfig(storeSystems?.configurations, 'available_stream_url') || '';
const onOffIframe = storeSystems?.optionIframe;
const matchSummary = ref([])
const matchCorner = ref([])
const matchOddsCorner = ref([])
const matchHover = ref()
const oddsDetail = ref()
const matchActiveLiveFlash = ref()

const searchInput = ref<HTMLElement | null>(null)
const qSearch = ref()
const matchSearchsList = ref([])
const compKeySearchList = ref([])
const matchSearchList = ref([])
const matchSearchLength = ref(1)
const compSearchLength = ref(1)
const isautofocus = ref()
const compsHotList = ref([])
const searchTab = ref(1)
const compsDataListSearch = ref([])
const contriesOriginKeyList = ref([])
const teamsSearch = ref([])
const isLoadingSearch = ref(false)
const matchsListLength = ref(0)
const expand = ref(false)
const contentPage = ref('')
const showContentPage = ref(false)
const isScroll = ref(false)

const title = ref('')

// Option show
const isShowOddsHDP = ref(true)
const isShowOddsTX = ref(true)
const isShowOdds1X2 = ref(false)
const isShowCardYellow = ref(settingsData?.value?.isShowCardYellow || true)
const isShowCardRed = ref(settingsData?.value?.isShowCardRed || true)
const isShowRanking = ref(settingsData?.value?.isShowRanking || true)

const isShowGoalWindow = ref(settingsData?.value?.isShowGoalWindow || true)
const isScoreGoal = ref(null)
const isScoreGoalMatchId = ref(null)
const isShowRedWindow = ref(settingsData?.value?.isShowRedWindow || true)
const timeoutID  = ref()
const settingType = ref(settingsData?.value?.settingType || 0)
const scoreChangeType = ref(null)
const playerName = ref()
const soundHome = ref (settingsData?.value?.soundHome || 0)
const soundAway = ref (settingsData?.value?.soundAway || 1)
// Search
const quickSearch = ref()

// League
const isSelectAll = ref(true)
const isGroupByCountry = ref(false)
const isGroupByAlphabet = ref(false)

const contriesList = ref([])
const contriesOriginList = ref([])

// League status
const leagueTabStatus = ref(0)
// const compOriginsList = ref([])
const toggleCompetition = ref([])

// favourites
const favouritesList = ref([])
const favouritesLeagues = ref([])
const favouritesTeams = ref([])

const matchesAnalysis = ref([]);
const shootTime = ref([]);

const timeZone = ref(settingsData?.value?.timeZone ?? getConfig(storeSystems?.configurations, 'TIMEZONE') ?? '')

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

const matchesList = ref<HTMLElement | null>(null)
const loaderMatcher = ref(null)
const limitData = ref(ITEM_PER_PAGE)
const oddsIMain = ref([])
const oddsIMainWS = ref([])
const oddsIMainList = ref([])

const datesList = ref([])
const datePara = router?.currentRoute?.value?.query?.date
const dateChoose = ref(datePara ? datePara : moment().format("yyyy-MM-DD"))
const timeRefesh = ref(Date.now())
const detailTimeRefesh = ref(Date.now())
const lastHoverMatchId = ref()
const contriesState = useState('contriesState',() => null)
const contriesListState = useState('contriesState')
const compList = ref([])
const favoritesInit = defineModel('favoritesInit')
const isShowSoundLiveScore = ref(false)
for (let i = -7; i < 8; i++) {
  datesList.value.push({
    day: moment().add(i, 'days').format("DD"),
    dayValue: moment().add(i, 'days').format("yyyy-MM-DD"),
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    label: moment().add(i, 'days').format("ddd"),
  })
}

const ChoseDate = (val) => {
  dateChoose.value = val
};

const compsListSearch = ref(null)
const renderTopListSearch = ref(null)

const { isActive, pause, resume } = useIntersectionObserver(
  loaderMatcher,
  ([{ isIntersecting }]) => {
    //if (isIntersecting && y.value > 0) {
    if (isIntersecting) {
      // isVisible.value = isIntersecting
      limitData.value += ITEM_PER_PAGE
    }
  },
  { matchesList },
)

const iCompanyName = (i_company_id: any) => {
  try {
    if (i_company_id) {
      const data = ODD_COMPANYS.find(item => item?.isportsapi === i_company_id)
      if (data) {
        return data.name ?? ''
      }
    }
  } catch {
    return ''
  }
}

function formatTimeWithGMT(gmtString) {
  if (!gmtString)
    return ''
  const offset = parseInt(gmtString?.split("GMT")?.[1]?.split(":")[0], 10);
  const date = new Date();
  const utcDate = new Date(date.getTime() + offset * 60 * 60 * 1000);
  const formattedDate = utcDate.toISOString()?.split?.('T')[0];
  return formattedDate;
}

const resetPopup = () => {
  showWinScoreOdds.value = false
  isFilterBoxLeague.value = false;
  isFilterBoxVisible.value = false;
}

const activeFilterOdds = ref('oddsFilter1');
const isFilterBoxLeague = ref(false);
const isFilterBoxVisible = ref(false);
const sound = ref(null)
function setActiveFilterOdds(table) {
  activeFilterOdds.value = table;
}

async function showFilterLeague(tab) {
  let isAddCountry = false
  if(compList.value.length) {
    isAddCountry = true
  }
  // activeTab.value = tab
  isFilterBoxLeague.value = true;
  showWinScoreOdds.value = false
  isFilterBoxVisible.value = false;

  await fetchComp()
  await fetchCountries()
  if(!isAddCountry) {
    compOriginsList.value = compOriginsList.value.map((item)=> {
      const key = compList.value.find((key)=> key.id === item.id)
      return {
        ...item,
        country: key?.country ?? null
      }
    })
  }
}
function hideFilterLeague() {
  isFilterBoxLeague.value = false;

  useAction.isOpenFilterLeague = false
}

function showFilterBox() {
  isFilterBoxVisible.value = true;
  isFilterBoxLeague.value = false;
  showWinScoreOdds.value = false
}

function hideFilterBox() {
  isFilterBoxVisible.value = false;
}

const filterMatchs = (tab = LIVESCORE_ACTIVE_TAB.ALL) => {
  activeTab.value = tab

  isFilterBoxLeague.value = false;
  isFilterBoxVisible.value = false

  limitData.value = ITEM_PER_PAGE
  showContentPage.value = true
}

const statePopup = reactive({
  modal_search: null,
});

const focusSearch = () => {
  nextTick(() => {
    isautofocus.value = true
    const refSearchInputValue = searchInput?.value?.$el || searchInput?.value
    refSearchInputValue.focus()
  })
}

const openModalSearch = async(tab = 1) => {
    useAction.isOpenSearchForm = false // Reset
    useAction.isOpenSearchForm = tab
}

function closeModalSearch() {
  statePopup.modal_search.hide();
  useAction.isOpenSearchForm = false
}

const switchSearchDiv = (val) => {
  searchTab.value = val
}

// const soundGoal0 = useSound(_soundGoal0, {
//   playbackRate,
//   interrupt: true,
// })
// const soundGoal1 = useSound(_soundGoal1, {
//   playbackRate,
//   interrupt: true,
// })
// const soundGoal2 = useSound(_soundGoal2, {
//   playbackRate,
//   interrupt: true,
// })
// const soundGoal3 = useSound(_soundGoal3, {
//   playbackRate,
//   interrupt: true,
// })
// const soundRed = useSound(_soundRed, {
//   playbackRate,
//   interrupt: true,
// })

const checkSettingType = (val) => {
  settingType.value = val
}

const CheckSound = (val) => {
  soundHome.value = val
}

const CheckSound2 = (val) => {
  soundAway.value = val
}

const orberBy = () => {
  resetPopup()

  limitData.value = ITEM_PER_PAGE
  
  orderByTime.value = !orderByTime.value
  toggleCompetition.value = []

  const settingsData = useCookie<any>('settingsData')
  if (settingsData?.value) {
    settingsData.value.orderByTime = orderByTime.value

    useCookie('settingsData').value = JSON.stringify(settingsData.value)
  } else {
    useCookie('settingsData').value = JSON.stringify( {
      settingsData: orderByTime.value,
    })
  }
}

const reduceMatch = (match: any) => {
  match[match?.home_team?.i_team] = match?.home_team
  match[match?.away_team?.i_team] = match?.away_team

  return match
}

const onChangeSearch = useDebounceFn(() => {
  if (quickSearch.value?.trim()?.length >= 3) {
    qSearch.value = quickSearch.value.trim()
  } else {
    qSearch.value = ''
  }
}, 300)

const handleClickCorner = async(event, match) => {
  if (props?.page === LIVESCORE_PAGE.RESULTS || props?.page === LIVESCORE_PAGE.SCHEDULE
  || [...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match?.status)) {
    return
  }

  matchHover.value = reduceMatch(match)
  const cornerSpanRect = event.target.getBoundingClientRect();
  winScorePositionCorner.value = {
      top: `${cornerSpanRect.top + window.scrollY}px`, 
      left: `${cornerSpanRect.left + window.scrollX - 400}px`
  };

  showWinScoreCorner.value = true;
  
  await fetchMatchsCorner(match?.id)
  await fetchOddsCorner(match?.id)
}
    
const closeCorner = () => {
  showWinScoreCorner.value = false;
}

const closeOddsChange = () => {
  showWinScoreOdds.value = false;
}

const handleMouseOverOdds = async (event, match) =>{
  if (props?.page === LIVESCORE_PAGE.RESULTS || props?.page === LIVESCORE_PAGE.SCHEDULE) {
    return
  }
  if (!match?.odds || match?.odds?.length === 0) 
    return
  
  matchHover.value = reduceMatch(match)

  const oddCompany = ODD_COMPANYS_LIVESCORE.find(({ id }) => id === oddCompanySelected.value)

  const oddsTdRect = event.target.getBoundingClientRect();
  winScorePositionOdds.value = {
      top: `${oddsTdRect.top + window.scrollY}px`, 
      left: `${oddsTdRect.left + window.scrollX - 555}px` 
  };

  showWinScoreOdds.value = true;

  const currentTime = Date.now()
  if ((currentTime - timeRefesh.value) / 1000 > 5) {
    timeRefesh.value = Date.now()

    await fetchOddsIMain(dateChoose.value)

    Object.keys(matchsList.value).map(index => {
      matchsList.value[index].odds_older = []
      matchsList.value[index].odds = oddsIMain.value?.[matchsList.value?.[index]?.i_match_id] || []
    })
  }
  oddsDetail.value = oddsIMainList.value?.filter(item => item?.i_match_id === match?.i_match_id)
}

const handleMouseLeaveOdds = () => {
  showWinScoreOdds.value = false;
}

const handleMouseOverOddsBlock = () => {
  showWinScoreOdds.value = true;
  isFocusWinScoreOdds.value = true
}

const handleMouseLeaveOddsBlock = () => {
  isFocusWinScoreOdds.value = false
  showWinScoreOdds.value = false;
}

const handleMouseOver = async(event, match) => {
  closeCorner()
  closeOddsChange()
  if (props?.page === LIVESCORE_PAGE.RESULTS || props?.page === LIVESCORE_PAGE.SCHEDULE 
  || [...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].includes(match?.status)) {
    return
  }

  !LIVESCORE_STATUS.NOT_START.includes(match?.status)

  const tipsTdRect = event.target.getBoundingClientRect();
  winScorePosition.value = {
      top: `${tipsTdRect.bottom + window.scrollY }px`,
      left: `${tipsTdRect.left + window.scrollX + (tipsTdRect.width / 2) - 230}px`
  };
  showWinScore.value = true;

  const currentTime = Date.now()
  if (!lastHoverMatchId.value || (lastHoverMatchId.value !== match?.id) || (lastHoverMatchId.value === match?.id && currentTime - detailTimeRefesh.value) / 1000 > 5) {
    detailTimeRefesh.value = Date.now()

    await fetchMatchsLiveDetail(match?.id)
    // Set lastHoverMatchId
    lastHoverMatchId.value = match?.id
  }
}

const handleMouseLeave = () =>{
  showWinScore.value = false;
}

const closeWinScore = () => {
  showWinScore.value = false;
}

const handleMouseOverBlock = () => {
  if (!showWinScore.value) {
    showWinScore.value = true;
  }

  isFocusWinScore.value = true
}

const handleMouseLeaveBlock = () => {
  isFocusWinScore.value = false
  showWinScore.value = false;
}

const toggleSubInfoSport = async (event, match) =>{
  activeSection.value = 'scoredConceded'

  if (matchActiveLiveFlash.value === match?.id) {
    showSubInfoSport.value = false
    matchActiveLiveFlash.value = null
  } else {
    showSubInfoSport.value = !showSubInfoSport.value;
    // matchsList.value[match?.id].flash_live = true
    matchActiveLiveFlash.value = match?.id
  }

  await fetchMatchesAnalysis(match?.id);
}

const collapseMatchesInCompetition = (event, competitionId) =>{
  if (!toggleCompetition.value.includes(competitionId)) {
    toggleCompetition.value.push(competitionId)
  }
}

const expandMatchesInCompetition = (event, competitionId) =>{
  const index =  toggleCompetition.value.indexOf(competitionId, 0);
  if (index > -1) {
    toggleCompetition.value.splice(index, 1);
  }
}

const setActiveSection = async (event, match, section) =>{
  activeSection.value = section;

  if (section === 'scoredConceded') {
    await fetchMatchesAnalysis(match?.id);
  } else {
    await fetchMatchsLiveDetail(match?.id)

    //if (match?.stage?.season_id) {
      await fetchMatchAnalysis(match)
    //}
  }
}

const  setActiveSectionTable = (table) =>{
  activeSectionTable.value = table;
}

const onClickLeagueStatus = (status) => {
  leagueTabStatus.value = status
}

const onClickCompsFilter = (comp) => {
}

const onClickByCountry = () => {
  isGroupByCountry.value = !isGroupByCountry.value
}

const removeAllFavourites = () => {

  if (favouritesLeagues.value?.length > 0) {
    favouritesLeagues.value = []
    cFavouritesLeagues.value = JSON.stringify(favouritesLeagues.value)
  }

  if (favouritesList.value?.length > 0) {
    favouritesList.value = [];
    cFavouritesData.value = JSON.stringify(favouritesList.value)
  }

  if (favouritesTeams.value?.length > 0) {
    favouritesTeams.value = [];
    cFavouritesTeams.value = JSON.stringify(favouritesTeams.value)
  }
}

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

watch(
  ([isGroupByCountry, leagueTabStatus]),
  async ([nIsGroupByCountry, nLeagueTabStatus]) => {
    let statusList = null
    switch(nLeagueTabStatus) {
      case 0: 
        statusList = null
        break; 
      case 1:
        statusList = ['2', '3', '4', '5', '6', '7']
        break; 
      case 2:
        statusList = ['8']
        break; 
      case 3:
        statusList = ['1']
        break; 
      default:
        statusList = null
        break; 
    }
    if (statusList !== null) {
      const matchesWithStatus = []
      Object.keys(matchOriginsList.value).map(index => {
        if (statusList.includes(matchOriginsList.value[index]?.status)) {
          matchesWithStatus.push(matchOriginsList.value[index])
        }
      })
      const matchsGroup = groupBy(matchesWithStatus, x => x.competition)
      const matchsGroupKey = [...matchsGroup.keys()]

      compChooseLeagueList.value = compOriginsList.value?.filter((item: { id: any; }) => {
        return matchsGroupKey?.includes(item?.id)
      }).map((item: { matchs: any; id: any; }) => {
        item.matchs = matchsGroup?.get(item?.id)
        return item
      })
    } else {
      const matchesWithStatus = []
      Object.keys(matchOriginsList.value).map(index => {
        matchesWithStatus.push(matchOriginsList.value[index])
      })

      const matchsGroup = groupBy(matchesWithStatus, x => x.competition)
      const matchsGroupKey = [...matchsGroup.keys()]

      compChooseLeagueList.value = compOriginsList.value?.map((item: { matchs: any; id: any; }) => {
        item.matchs = matchsGroup?.get(item?.id)
        return item
      })
    }
    const countriesHasKey = compChooseLeagueList.value?.map(item => item?.country)
    if (nIsGroupByCountry) {
      contriesList.value = contriesOriginList.value?.filter(item => countriesHasKey.includes(item?.id))

      const compsGroup = groupBy(compChooseLeagueList.value, x => x.country)
      const compsGroupKey = [...compsGroup.keys()]

      contriesList.value = contriesList.value?.map(item => {
        item.league = compsGroup?.get(item?.id)
        return item
      })
    }
  }, 
  { deep: true }
)

const selectAll = () => {
  isSelectAll.value = true

  Object.keys(compOriginsList.value).map(index => {
    if (compOriginsList.value[index]) {
      compsDataFilterList.value[compOriginsList.value[index]?.id] = true
    }
  })
}

const selectOthers = () => {
  isSelectAll.value = false
  compsDataFilterList.value = []
}

const confirmCompFilter = () => {
  activeTab.value = LIVESCORE_ACTIVE_TAB.LEAGUE
  
  limitData.value = ITEM_PER_PAGE
  showContentPage.value = true

  useAction.isOpenFilterLeague = false
  isFilterBoxLeague.value = false
  toggleCompetition.value = []
  
  const compKeyFilter = []
  Object.keys(compsDataFilterList.value).map(index => {
    if (compsDataFilterList.value[index]) {
      compKeyFilter.push(index)
    }
  })

  const matchsListArray = []
  Object.keys(matchOriginsList.value).map(index => {
    if (compKeyFilter.includes(matchOriginsList.value[index]?.competition)) {
      matchsListArray.push(matchOriginsList.value[index])
    }
  })

  matchsList.value = matchsListArray
} 

const fetchCountries = async () => {
  if(contriesListState.value?.results?.length) {
    contriesOriginList.value = contriesListState.value?.results?.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    contriesList.value = contriesOriginList.value

    contriesOriginList.value?.forEach(item=> {
      contriesOriginKeyList.value[item?.id] = item
    })
    return
  }
  await useApiLiveScore(API_ROUTERS.LIVESCORE.COUNTRIES, {lang: useLocale?.value.defaultLocale}).then(resData => {
    contriesState.value = resData
    
    contriesOriginList.value = resData?.results?.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    contriesList.value = contriesOriginList.value
    
    contriesOriginList.value?.forEach(item=> {
      contriesOriginKeyList.value[item?.id] = item
    })
  })
}

const fetchMatchsLive = async (date = null) => {
  if ((date && date === moment().format("yyyy-MM-DD")) || !date) {
    useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_LIVE, {
      date: date ? date : moment().format("yyyy-MM-DD"),
      tz: String((getConfig(storeSystems?.configurations, 'TIMEZONE') ?? 'GMT+07:00')).slice(3),      
      lang: useLocale?.value.defaultLocale
    }).then(resData => {
      matchLivesList.value = resData
    })
  } else {
    matchLivesList.value = []
  }
}

const fetchMatchRecentResult = async (match) => {
  useApiLiveScore(API_ROUTERS.LIVESCORE.MATCH_RECENT_RESULT, {
    season_id: match?.stage?.season_id,
    lang: useLocale?.value.defaultLocale
  }).then(resData => {
    if (resData) {
      const data = resData?.results?.filter(match => match?.status === "8")
      const matchsListArray: any[] = []
      Object.values(data).map(item => {
        matchsListArray.push(item)
      })
      
      const homeRecent = matchsListArray?.filter(item => {
        return ((item?.home_team_id === match?.home_team?.id) || (item?.away_team_id === match?.home_team?.id))
      }).slice(0, 6)

      const awayRecent = matchsListArray?.filter(item => {
        return ((item?.home_team_id === match?.away_team?.id) || (item?.away_team_id === match?.away_team?.id))
      }).slice(0, 6)

      matchRecentResult.value[match?.home_team?.id] = getRecentResult(homeRecent, match?.home_team?.id)
      matchRecentResult.value[match?.away_team?.id] = getRecentResult(awayRecent, match?.away_team?.id)
    }
  })
}

const fetchMatchAnalysis = async (match) => {
  useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_ANALYSIS + '/' + match?.id).then(resData => {
    if (resData) {
      matchRecentResult.value[match?.home_team?.id] = getRecentResultTheSport(resData?.history?.home, match?.home_team?.id, true, $t)
      matchRecentResult.value[match?.away_team?.id] = getRecentResultTheSport(resData?.history?.away, match?.away_team?.id, false, $t)
    }
  })
}


const fetchComp = async()=> {
  if(compList.value.length) {
    return compList.value
  }
  const resData = await useApiLiveScore(API_ROUTERS.LIVESCORE.COMP, {lang: useLocale?.value.defaultLocale})
  compList.value = resData
  return resData
}


const fetchMatch = async(date = null) => {
    let status = null
    switch(props?.page) {
      case LIVESCORE_PAGE.LIVESCORE:
        status = [...LIVESCORE_STATUS.IS_LIVE, ...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].toString()
        break;
      case LIVESCORE_PAGE.RESULTS:
        status = LIVESCORE_STATUS.IS_END.toString()
        break;
      case LIVESCORE_PAGE.FAVORITES:
        status = [...LIVESCORE_STATUS.IS_LIVE, ...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE, ...LIVESCORE_STATUS.IS_END].toString()
        break;
      // case LIVESCORE_PAGE.SCHEDULE:
      //   status = [...LIVESCORE_STATUS.IS_LIVE, ...LIVESCORE_STATUS.NOT_START, LIVESCORE_STATUS.NOT_LIVE].toString()
      //   break;
    }
    const timeZone = String((getConfig(storeSystems?.configurations, 'TIMEZONE') ?? 'GMT+07:00')).slice(3)
    const query = {
      date: date ? date : formatTimeWithGMT(getConfig(storeSystems?.configurations, 'TIMEZONE') ?? '+07:00'),
      tz: timeZone,
      // limit: 20,
      // page: 1,
      // decode: 1,
      lang: useLocale?.value.defaultLocale
    }    
    if (status !== null) {
      query.status = status
    }
    
    const resData = await useApiLiveScore((props?.page === LIVESCORE_PAGE.LIVESCORE || props?.page === LIVESCORE_PAGE.FAVORITES) ? API_ROUTERS.LIVESCORE.MATCHS_RECENT_SCHEDULE : props?.page === LIVESCORE_PAGE.RESULTS ? API_ROUTERS.LIVESCORE.MATCHS_RECENT_RESULT : API_ROUTERS.LIVESCORE.MATCHS_RECENT, query)
    return resData || [];
}

const handleInitschema = () => {
  try {
    if(process.server && props?.page === LIVESCORE_PAGE.LIVESCORE && Array.isArray(compOriginsList.value)) {
    const compHot = compOriginsList.value.filter(item => item?.number_hot === 5 || item?.number_hot === 4)
      if(compHot?.length) {
        initSchemaLivescore(compHot)
      }
    }
  } catch(e) {
    console.log(e);
  }
}

const fetchMatchsRecent = async (date, result = null) => {
  let resData
  if(result) {
    resData = result
  } else {
    resData = await fetchMatch(date)
  }
  resData = resData.map((item)=> {
    if((item.number_hot === 1 || item.number_hot === 2 ) && item.away_team.country === item.home_team.country && item.comp.country_logo) {
      item.isFlatCountry = true
    }
    return item
  })

  const arr = resData.reduce((acc,cur)=> {
    const findKey = acc?.find((item)=> item?.id === cur.comp.id)

    if(!findKey) {
      acc.push(cur.comp)
    }
    return acc
  }, [])

  compsDataList.value = arr
  compOriginsList.value = arr
  compChooseLeagueList.value  = arr
  const dataMcompsDataListByKey: never[] = []
  arr?.forEach(item=> {
    // Init select leagues
    compsDataFilterList.value[item?.id] = true
    dataMcompsDataListByKey[item?.id] = item
  })
  compsDataListByKey.value = dataMcompsDataListByKey
  const matchsDataList: never[] = []
  const matchData = resData ? [...matchLivesList.value, ...resData] : matchLivesList.value
  matchData.forEach(item => {
    item.odds = oddsIMain.value?.[item.i_match_id] || []
    matchsDataList[item?.id] = item
  })
  
  matchsList.value = matchsDataList
  matchOriginsList.value = Object.assign([], matchsDataList);
  
  const matchsGroup = groupBy(matchData, x => x.competition)
  const matchsGroupKey = [...matchsGroup.keys()]
  
  compOriginsList.value = compsDataList.value?.filter((item: { id: any; }) => {
    return matchsGroupKey?.includes(item?.id)
  }).map((item: { matchs: any; id: any; }) => {
      item.matchs = matchsGroup?.get(item?.id)
      return item
  })

  handleInitschema()
  
  renderDataList()
}

const fetchMatchsLiveDetail = async (match_id) => {
  useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_LIVE_DETAIL + '/' + match_id, {lang: useLocale?.value.defaultLocale}).then(resData => {
    matchSummary.value = resData
  })
}

const fetchMatchesAnalysis = async (match_id) => {
  useApiLiveScore(
    API_ROUTERS.LIVESCORE.MATCHES_ANALYSIS + "?match_id=" + match_id
  ).then((resData) => {
    matchesAnalysis.value = getDataObject(resData?.results?.[0]);

    shootTime.value["sumHome"] =
      matchesAnalysis.value?.home_shoot_time?.[0]?.reduce(
        (sumHome, val) => sumHome + parseInt(val),
        0
      );
    shootTime.value["sumAway"] =
      matchesAnalysis.value?.away_shoot_time?.[0]?.reduce(
        (sumAway, val) => sumAway + parseInt(val),
        0
      );
  });
};

const fetchMatchsCorner = async (match_id) => {
  matchCorner.value = []

  useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_CORNER, {
    match_id: match_id,
  }).then(resData => {
    if (resData?.length > 0 ) {
      matchCorner.value = resData?.[0]
      const eventList = JSON.parse(resData?.[0]?.event_list?.replace(new RegExp(escapeRegExp("'"), 'g'), "\""))
      matchCorner.value.event_list = eventList
    }
  })
}

const fetchOddsCorner = async (match_id) => {
   useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_CORNER_MAIN, {
    match_id: match_id,
  }).then(resData => {
    matchOddsCorner.value = resData?.data
  })
}

const fetchOddsDetail = async (match_id, i_company_id = ODD_COMPANY_DEFAULT) => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL, {
    match_id: match_id,
    i_company_id: i_company_id
  }).then(resData => {
    oddsDetail.value = resData
  })
}

const fetchCompList = async () => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.COMP).then(decodedData => {

    compsDataList.value = decodedData
    compOriginsList.value = decodedData
    compChooseLeagueList.value  = decodedData

    const dataMcompsDataListByKey: never[] = []
    decodedData?.forEach(item=> {
      // Init select leagues
      compsDataFilterList.value[item?.id] = true
      dataMcompsDataListByKey[item?.id] = item
    })
    compsDataListByKey.value = dataMcompsDataListByKey
  })
}

const fetchOddsIMain = async (date = null) => {
  const oddCompany = ODD_COMPANYS_LIVESCORE.find(({ id }) => id === oddCompanySelected.value)
  const query = {
    date: date ? date : moment().format("yyyy-MM-DD"),
    tz: String((getConfig(storeSystems?.configurations, 'TIMEZONE') ?? 'GMT+07:00')).slice(3),    
  }
  if(oddCompany?.id !== 21) {
    query.i_company_id = oddCompany?.isportsapi
  }
  
  const apiLink = oddCompany?.id !== 21 ? API_ROUTERS.LIVESCORE.ODDS_IMAIN : API_ROUTERS.LIVESCORE.ODDS_ALL_IMAIN

  useApiLiveScore(apiLink, query).then(resData => {
    if (resData) {
      try {
        oddsIMainList.value = JSON.parse(JSON.stringify(resData))
        const oddsList = []
        const iSport = []
        resData?.forEach(item => {
          if (!oddsList[item.i_match_id]) {
            oddsList[item.i_match_id] = []
          }
          if (!iSport[item.i_match_id]) {
            iSport[item.i_match_id] = []
          }

          iSport[item.i_match_id] = item.i_company_id

          const handicap =  resData?.find(odd => odd.i_match_id === item.i_match_id && odd.type === 'handicap')
          if (handicap) {
            handicap.initial = handicap?.initial?.replace(/[^0-9.,]/g, '');
            handicap.inplay = handicap?.inplay?.replace(/[^0-9.,]/g, '');
            handicap.instant = handicap?.instant?.replace(/[^0-9.,]/g, '');
          }
          oddsList[item.i_match_id][0] =  handicap?.instant || handicap?.inplay || handicap?.initial || null
          const overUnder =  resData?.find(odd => odd.i_match_id === item.i_match_id && odd.type === 'overUnder')
          if (overUnder) {
            overUnder.initial = overUnder?.initial?.replace(/[^0-9.,]/g, '');
            overUnder.inplay = overUnder?.inplay?.replace(/[^0-9.,]/g, '');
            overUnder.instant = overUnder?.instant?.replace(/[^0-9.,]/g, '');
          }
          oddsList[item.i_match_id][1] = overUnder?.instant || overUnder?.inplay || overUnder?.initial || null

          const europeOdds = resData?.find(odd => odd.i_match_id === item.i_match_id && odd.type === 'europeOdds')
          if (europeOdds) {
            europeOdds.initial = europeOdds?.initial?.replace(/[^0-9.,]/g, '');
            europeOdds.inplay = europeOdds?.inplay?.replace(/[^0-9.,]/g, '');
            europeOdds.instant = europeOdds?.instant?.replace(/[^0-9.,]/g, '');
          }
          oddsList[item.i_match_id][2] = europeOdds?.instant || europeOdds?.inplay || europeOdds?.initial || null
        })
        oddsIMain.value = oddsList

        Object.keys(matchsList.value)?.map(index => {
          matchsList.value[index].odds_older = []
          matchsList.value[index].odds = oddsIMain.value?.[matchsList.value?.[index]?.i_match_id] || []
          if(Object.keys(iSport).includes(String(matchsList.value?.[index]?.i_match_id))){
            matchsList.value[index].i_company_id = iSport[matchsList.value[index].i_match_id]
          }
        })
      } catch(e: any) {
        oddsIMain.value = oddsList
      }
    }
  })
}
const time = ref(1)

const timeCountDown = () => {
  try {
    if (process.client) {
      if (useRoute().path === '/') {
        time.value = time.value + 1
        //30 phut thi reload lai page neu o home
        if(time.value > 1800) {
          location.reload();
        }
      }
    }
  } catch {}
}
// Socket data
const wssMatch = (socketData: any) => {
  try {
    if (socketData) {
      timeCountDown()
      try {
        const company = ODD_COMPANYS_LIVESCORE.find(({ id }) => id === oddCompanySelected.value)
        const wssItem = socketData
        
        if (wssItem.payload.match_live) {
          // Thoi gian
          const matchLive = wssItem.payload.match_live;
          const matchStatusMapping = {
            3: 'HT',
            8: 'Fulltime',
            7: 'PS',
            5: 'OT',
            9: 'Delay',
          };

          let reduceMatchList = false
          for (const match of matchLive) {
            const matchId = match.matchId;
            const status = match.status;
            const timestampKickOff = match.timestamp_kick_off;
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (status !== 1 && timestampKickOff !== 0) {
              if (matchsList.value[matchId]) {
                let statusText = null;
                let matchMinutes = 0

                if (status === 2) {
                  matchMinutes = Math.floor((currentTimestamp - timestampKickOff) / 60 + 1);
                  statusText = `<i class="fas fa-circle blink-icon"></i><span class="countstatus">${matchMinutes}</span>`;
                  matchsList.value[matchId].matchMinutes = statusText;
                } else if (status === 4) {
                  matchMinutes = Math.floor(((currentTimestamp - timestampKickOff) / 60) + 45 + 1);
                  statusText = `<i class="fas fa-circle blink-icon"></i><span class="countstatus">${matchMinutes}</span>`;
                  matchsList.value[matchId].matchMinutes = statusText;
                } else {
                  matchsList.value[matchId].matchMinutes = statusText;
                }
                matchsList.value[matchId].since_timestamp_kick_off = matchMinutes;

                // Update status
                if (matchOriginsList.value[matchId].status?.toString() != status.toString()) {
                  matchOriginsList.value[matchId].status = status.toString()
                  matchOriginsList.value[matchId].matchMinutes = statusText;
                  matchsList.value[matchId].status = status.toString()
                  reduceMatchList = true
                }
              }
            }
          }

          if (reduceMatchList === true) {
            renderDataList()
          }
        } else if (wssItem.payload.iodds) {
          const matchOdds = wssItem.payload.iodds;
          const oddsList = []
          // Handicap
          if (matchOdds?.handicap) {
            for (const matchOdd of matchOdds.handicap) {
              const matchId = parseIntO(getValueByPosition(matchOdd, 0));
              const companyId = getValueByPosition(matchOdd, 1);
              let isSelectISportGeneral = false
              
              if(company.id === 21) {
                Object.keys(matchsList.value)?.map(index => {
                  if(String(matchsList.value[index].i_match_id) === String(matchId) && String(matchsList.value[index].i_company_id) === String(companyId) ) {
                    isSelectISportGeneral = true
                  }
                })
              } 

              if ((companyId == company?.isportsapi) || isSelectISportGeneral) {
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
              let isSelectISportGeneral = false
              if(company.id === 21) {
                Object.keys(matchsList.value)?.map(index => {
                  if(String(matchsList.value[index].i_match_id) === String(matchId) && String(matchsList.value[index].i_company_id) === String(companyId) ) {
                    isSelectISportGeneral = true
                  }
                })
              } 
              if ((companyId == company?.isportsapi) || isSelectISportGeneral) {
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
              let isSelectISportGeneral = false
              if(company.id === 21) {
                Object.keys(matchsList.value)?.map(index => {
                  if(String(matchsList.value[index].i_match_id) === String(matchId) && String(matchsList.value[index].i_company_id) === String(companyId) ) {
                    isSelectISportGeneral = true
                  }
                })
              } 
              if ((companyId == company?.isportsapi) || isSelectISportGeneral) {
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
        } else if (wssItem.topic == 'thesports/football/match/v1') {
          const payloads = wssItem.payload;
          let reduceMatchList = false

          const favouritesData = useCookie<any>('favouritesData')
          
          for (const payload of payloads) {
            const matchId = payload?.id;
            if (payload?.score) {
              if (matchsList.value[matchId]) {
                // Update status
                if (matchOriginsList.value[matchId].status?.toString() != payload?.score?.[1]?.toString()) {
                  matchOriginsList.value[matchId].status = payload?.score?.[1]?.toString()
                  matchsList.value[matchId].status = payload?.score?.[1]?.toString()
                  reduceMatchList = true
                }

                matchsList.value[matchId].home_scores = payload?.score?.[2]
                matchsList.value[matchId].away_scores = payload?.score?.[3]
              }
            } else  if (payload?.incidents) {
                // Nếu trong list match
                if (matchsList.value[matchId]) {
                //if (1===1) {
                  for (const incident of payload?.incidents) {
                    let matchMinutes = 0
                    const status = matchsList.value[matchId]?.status?.toString();
                    if (matchsList.value[matchId]?.since_timestamp_kick_off) {
                      matchMinutes = matchsList.value[matchId].since_timestamp_kick_off
                    } else {
                      const timestampKickOff = moment(matchsList.value[matchId]?.match_time).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).unix()
                      const currentTimestamp = Math.floor(Date.now() / 1000);
                      if (status == '2') {
                        matchMinutes = Math.floor((currentTimestamp - timestampKickOff) / 60 + 1);
                      } else if ((status == '4') || (status == '5')) {
                        matchMinutes = Math.floor(((currentTimestamp - timestampKickOff) / 60) + 45 + 1);
                      }
                    }

                    // Thoi gian su kien va thoi gian tran dau <= 2
                    if (Math.abs(matchMinutes - incident?.time) <= 2) {
                      switch (incident?.type) {
                        // Ghi bàn
                        case 1: {
                          // Cac tran theo doi
                          let isMatch = false
                          if (settingType.value === 1) {
                            if (favouritesData?.value?.includes(matchId)) {
                              isMatch = true
                            }
                          } else {
                            // Tat ca
                            isMatch = true
                          }

                          if (isMatch) {
                            // Hiển thị popup
                            if (isShowGoalWindow.value) {
                              isScoreGoal.value = matchId
                              isScoreGoalMatchId.value = matchId
                              scoreChangeType.value = '/icon/goal.png'
                              
                              matchOriginsList.value[matchId].matchMinutesEvent = incident?.time;
                              matchOriginsList.value[matchId].home_team.playerName = ''
                              matchOriginsList.value[matchId].away_team.playerName = ''

                              if (incident?.position == 1) {
                                matchsList.value[matchId].home_scores[0] = incident?.home_score ?? matchsList.value[matchId].home_scores[0]

                                matchOriginsList.value[matchId].home_scores[0] = incident?.home_score ?? matchsList.value[matchId].home_scores[0]
                                matchOriginsList.value[matchId].home_team.playerName = incident?.player_name;
                              } else if (incident?.position == 2) {
                                matchsList.value[matchId].away_scores[0] = incident?.away_score ?? matchsList.value[matchId].away_scores[0]

                                matchOriginsList.value[matchId].away_scores[0] = incident?.away_score ?? matchsList.value[matchId].away_scores[0]
                                matchOriginsList.value[matchId].away_team.playerName = incident?.player_name;
                              }
                            }

                            // Hiển thị âm thanh
                            if (incident?.position == 1) {
                              if (soundHome.value === 0) {
                                sound.value = 'soundGoal0'
                              } else if (soundHome.value === 1) {
                                sound.value = 'soundGoal1'
                              } else if (soundHome.value === 2) {
                                sound.value = 'soundGoal2'
                              } else if (soundHome.value === 3) {
                                sound.value = 'soundGoal3'
                              } 
                            } else if (incident?.position == 2) {
                              if (soundAway.value === 0) {
                                sound.value = 'soundGoal0'
                              } else if (soundAway.value === 1) {
                                sound.value = 'soundGoal1'
                              } else if (soundAway.value === 2) {
                                sound.value = 'soundGoal2'
                              } else if (soundAway.value === 3) {
                                sound.value = 'soundGoal3'
                              } 
                            }
                          }
                          break; 
                        }
                        // Thẻ đỏ
                        case 4: {
                          if (isShowRedWindow.value) {
                            let isMatchShowRedWindow = false
                            // Cac tran theo doi
                            if (settingType.value === 1) {
                              if (favouritesData?.value?.includes(matchId)) {
                                isMatchShowRedWindow = true
                              }
                            } else {
                              // Tat ca
                              isMatchShowRedWindow = true
                            }
                            
                            if (isMatchShowRedWindow) {
                              isScoreGoal.value = matchId
                              isScoreGoalMatchId.value = matchId
                              scoreChangeType.value = '/img/incident/4.png'

                              matchOriginsList.value[matchId].matchMinutesEvent = incident?.time;
                              matchOriginsList.value[matchId].home_team.playerName = ''
                              matchOriginsList.value[matchId].away_team.playerName = ''
                              
                              if (incident?.position == 1) {
                                matchOriginsList.value[matchId].home_team.playerName = incident?.player_name || '';
                              } else if (incident?.position == 2) {
                                matchOriginsList.value[matchId].away_team.playerName = incident?.player_name || '';
                              }
                            }
                          }
                          break; 
                        }
                      }
                    }
                  }
                }
              }
          }

          if (reduceMatchList === true) {
            renderDataList()
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


watch(activeTab,
  (activeTab) => {
    matchActiveLiveFlash.value = null
    toggleCompetition.value = []
    
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

watch(oddCompanySelected,
  async (oddCompany) => {
    const company = ODD_COMPANYS_LIVESCORE.find(({ id }) => id === oddCompanySelected.value)
    oddCompanyIsport.value = company?.thesports

    const settingsData = useCookie<any>('settingsData')
    if (settingsData?.value) {
      settingsData.value.oddCompanySelected = oddCompanySelected.value
      useCookie('settingsData').value = JSON.stringify(settingsData.value)
    } else {
      useCookie('settingsData').value = JSON.stringify( {
        oddCompanySelected: oddCompanySelected.value,
      })
    }

    // iSport
    await fetchOddsIMain(dateChoose.value)
  }
)

watch((qSearch),
  async(nSearch) => {
    let matchsListArray: any[] = []
    if (qSearch.value !== '') {
      let compsKeyDataList = []
      const search = nSearch.toUpperCase()
      if (typeof nSearch !== 'undefined') {
        //compsKeyDataList = compsDataList.value?.filter(item => item?.name?.toUpperCase()?.includes(search))?.map(item => item.id)
        compsDataListSearch.value = compsDataList.value?.filter(item => item?.name?.toUpperCase()?.includes(search))
        compsKeyDataList = compsDataListSearch.value?.map(item => item.id)
        compSearchLength.value = compsDataListSearch.value?.length
      }

      Object.keys(matchOriginsList.value).map(index => {
        if (typeof nSearch !== 'undefined') {
          if (matchOriginsList.value[index]?.home_team?.name?.toUpperCase()?.includes(search) || matchOriginsList.value[index]?.away_team?.name?.toUpperCase()?.includes(search) 
          || compsKeyDataList.includes(matchOriginsList.value[index]?.competition)) {
            matchsListArray.push(matchOriginsList.value[index])
          }
        }
      })

      matchSearchLength.value = matchsListArray?.length
      let matchsGroup = sortByTime(matchsListArray, false)
      matchsGroup = groupByTimeAndComp(matchsGroup)
      // compKeySearchList.value = [...matchsGroup.keys()]
      matchSearchList.value = matchsGroup
      
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
      matchSearchList.value = []
      matchSearchLength.value = 0
      compSearchLength.value = 0
    }
  },
  { deep: true }
)

watch((searchTab),
  async(nSearchTab) => {
    if (qSearch.value !== '') {
      isLoadingSearch.value = true
      await useApiLiveScore(API_ROUTERS.LIVESCORE.TEAMS + '?name=' + qSearch.value).then(resData => {
        if (resData) {
          teamsSearch.value = resData?.results
        }
        isLoadingSearch.value = false
      })
      
    } else {
      teamsSearch.value = []
    }
  },
  { deep: true }
)

watch(dateChoose,
  () => {
    isLoadingData.value = true

    router.replace('?date=' + dateChoose.value)

    fetchMatchsLive(dateChoose.value)
    fetchMatchsRecent(dateChoose.value)
    searchMatch.value = ''
  }
)

watch(
  oddsIMainWS,
  () => {
    Object.keys(matchsList.value).map(index => {
      matchsList.value[index].odds_older = JSON.parse(JSON.stringify(matchsList.value[index].odds))

      if (oddsIMainWS.value?.[matchsList.value?.[index]?.i_match_id]?.[0]) {
        matchsList.value[index].odds[0] = oddsIMainWS.value?.[matchsList.value?.[index]?.i_match_id]?.[0]
      }
      if (oddsIMainWS.value?.[matchsList.value?.[index]?.i_match_id]?.[1]) {
        matchsList.value[index].odds[1] = oddsIMainWS.value?.[matchsList.value?.[index]?.i_match_id]?.[1]
      }
      if (oddsIMainWS.value?.[matchsList.value?.[index]?.i_match_id]?.[2]) {
        matchsList.value[index].odds[2] = oddsIMainWS.value?.[matchsList.value?.[index]?.i_match_id]?.[2]
      }
    })
  },
  {immediate: true}
)

watch(
  () => router?.currentRoute.value?.query,
  () => {
    const tabName = router?.currentRoute.value?.query?.livescore_tab
    if (tabName === LIVESCORE_ACTIVE_TAB.HOT) {
      activeTab.value = LIVESCORE_ACTIVE_TAB.HOT
    } else if (tabName === LIVESCORE_ACTIVE_TAB.LEAGUE) {
      activeTab.value = LIVESCORE_ACTIVE_TAB.LEAGUE
      isFilterBoxLeague.value = true
    } else {
      activeTab.value = LIVESCORE_ACTIVE_TAB.ALL
    }
  },
  { deep: true, immediate: true }
);

watch(
  useAction,
  () => {
    if (useAction?.isOpenFilterLeague) {
      activeTab.value = LIVESCORE_ACTIVE_TAB.LEAGUE
      isFilterBoxLeague.value = true
    }
    // if (useAction?.isOpenSearchForm) {
    //   openModalSearch()
    // }
}, { deep: true, immediate: true })

watch(
  matchStore,
  () => {
    wssMatch(matchStore?.socketData)
}, { deep: true, immediate: true })

const renderDataList = () => {
  try {
    // if (props?.favorites === FAVORITES_TYPE.TEAMS) {
    //   orderByTime.value = true
    //   renderTeamsDataList() 
    //   return
    // } 

    compChooseLeagueList.value  = compOriginsList.value
    // For render list
    compsListByKey.value = groupBy(compsDataList.value, x => x.id)
    if (!orderByTime.value) {
      const matchsListArray: any[] = []

      // Page FAVORITES MATCHES
      if (props?.favorites === FAVORITES_TYPE.MATCHES) {
        const favouritesData = useCookie<any>('favouritesData')
        Object.keys(matchsList.value).map(index => {
          if (favouritesData?.value?.includes(matchsList.value[index]?.id)) {
            matchsListArray.push(matchsList.value[index])
          }
        })
        const matchsGroup = groupBy(matchsListArray, x => x.competition)
        const matchsGroupKey = [...matchsGroup.keys()]
        compsList.value = compOriginsList.value?.filter((item: { id: any; }) => {
          if (matchsGroupKey?.includes(item?.id)) {
            item.matchs =  item?.matchs?.filter(match => favouritesData?.value?.includes(match.id))
            return item
          }
        })
        compsList.value = compsList.value.sort((a, b) => b.number_hot === a.number_hot ? b.matchs?.[0].order_no - a.matchs?.[0].order_no : b.number_hot - a.number_hot);
      } else if (props?.favorites === FAVORITES_TYPE.LEAGUES) {
        const favouritesLeagues = useCookie<any>('favouritesLeagues')
        compsList.value = compOriginsList.value?.filter(item => favouritesLeagues?.value?.includes(item?.id)).sort((a, b) => b.number_hot === a.number_hot ? b.matchs?.[0].order_no - a.matchs?.[0].order_no : b.number_hot - a.number_hot);
      } else if (props?.favorites === FAVORITES_TYPE.TEAMS) {
        const favouritesTeams = useCookie<any>('favouritesTeams')
        Object.keys(matchsList.value).map(index => {
          if (favouritesTeams?.value?.includes(matchsList.value[index]?.home_team?.id) || favouritesTeams?.value?.includes(matchsList.value[index]?.away_team?.id)) {
            matchsListArray.push(matchsList.value[index])
          }
        })
        const matchsGroup = groupBy(matchsListArray, x => x.competition)
        const matchsGroupKey = [...matchsGroup.keys()]
        compsList.value = compOriginsList.value?.filter((item: { id: any; }) => {
          if (matchsGroupKey?.includes(item?.id)) {
            item.matchs =  item?.matchs?.filter(match => (favouritesTeams?.value?.includes(match?.home_team?.id) 
                          || favouritesTeams?.value?.includes(match?.away_team?.id)))
            return item
          }
        })
      } else {
        if (activeTab.value === LIVESCORE_ACTIVE_TAB.LEAGUE) {
          
          Object.keys(matchsList.value).map(index => {
            matchsListArray.push(matchsList.value[index])
          })
          const matchsGroup = groupBy(matchsListArray, x => x.competition)
          const matchsGroupKey = [...matchsGroup.keys()]
          compsList.value = compOriginsList.value?.filter((item: { id: any; }) => {
            return matchsGroupKey?.includes(item?.id)
          })
        } else if (activeTab.value === LIVESCORE_ACTIVE_TAB.HOT) {          
          compsList.value = compOriginsList.value?.filter((item: { number_hot: number; }) => (item?.number_hot === 5 || item?.number_hot === 4))          
        } else {
          compsList.value = compOriginsList.value.sort((a, b) => b.number_hot === a.number_hot ? b.matchs?.[0].order_no - a.matchs?.[0].order_no : b.number_hot - a.number_hot);
          if(router.currentRoute._value.path !== $trouter(ROUTERS.FOOTBALL_SCHEDULE)) {
            let matchLive = []
            matchLive = compsList.value.map(item=> ({
            ...item,
            matchs: item.matchs.filter(match => LIVESCORE_STATUS.IS_LIVE.includes(match.status))
            })).filter(item => item.matchs.length > 0)
            compsList.value = [...matchLive, ...compsList.value].reduce((accumulator, current) => {
                if (!accumulator.some(item => item.id === current.id)) {
                    accumulator.push(current);
                }
                return accumulator;
            }, []);
          }
        }
      }
    } else {
      let matchsListArray: any[] = []

      // Page FAVORITES MATCHES
      if (props?.favorites === FAVORITES_TYPE.MATCHES) {
        const favouritesData = useCookie<any>('favouritesData')
        matchsListArray = []
        Object.keys(matchsList.value).map(index => {
          if (favouritesData?.value?.includes(matchsList.value[index]?.id)) {
            matchsListArray.push(matchsList.value[index])
          }
        })
      } else if (props?.favorites === FAVORITES_TYPE.LEAGUES) {
        const favouritesLeagues = useCookie<any>('favouritesLeagues')
        const compsList = compOriginsList.value?.filter(item => favouritesLeagues?.value?.includes(item?.id))
        const matchsGroup = groupBy(compsList, x => x.id)
        const compKeysList = [...matchsGroup.keys()]
        matchsListArray = Object.values(matchOriginsList.value).filter((item) => compKeysList.includes(item?.competition))
      } else if (props?.favorites === FAVORITES_TYPE.TEAMS) {
        const favouritesTeams = useCookie<any>('favouritesTeams')
        matchsListArray = []
        Object.keys(matchsList.value).map(index => {
          if (favouritesTeams?.value?.includes(matchsList.value[index]?.home_team?.id) || favouritesTeams?.value?.includes(matchsList.value[index]?.away_team?.id)) {
            matchsListArray.push(matchsList.value[index])
          }
        })
      } else {
        if (activeTab.value === LIVESCORE_ACTIVE_TAB.LEAGUE) {
          matchsListArray = []
          Object.keys(matchsList.value).map(index => {
            matchsListArray.push(matchsList.value[index])
          })
        } else if (activeTab.value === LIVESCORE_ACTIVE_TAB.HOT) {
          const compsList = compOriginsList.value?.filter((item: { number_hot: number; }) => (item?.number_hot === 5 || item?.number_hot === 4))
          const matchsGroupHot = groupBy(compsList, x => x.id)
          const compKeysListHot = [...matchsGroupHot.keys()]
          const dataList = []
          matchsListArray = Object.values(matchOriginsList.value).filter((item) => compKeysListHot.includes(item?.competition))
        } else {
          Object.keys(matchOriginsList.value).map(index => {
            matchsListArray.push(matchOriginsList.value[index])
          })
        }
      }
      matchsListLength.value  = matchsListArray?.length
      let matchsGroup = sortByTime(matchsListArray, false)

      if (props?.page === LIVESCORE_PAGE.LIVESCORE) {
        const matchsGroupIsLive = matchsGroup.filter((item: { status }) => LIVESCORE_STATUS.IS_LIVE.includes(item.status))
        const matchsGroupNotStarted = matchsGroup.filter((item: { status }) => LIVESCORE_STATUS.NOT_START.includes(item.status))
        const matchsGroupNotLive = matchsGroup.filter((item: { status }) => LIVESCORE_STATUS.NOT_LIVE.includes(item.status))
        const matchsGroupEnd = matchsGroup.filter((item: { status }) => LIVESCORE_STATUS.IS_END.includes(item.status))
        const data = [...sortByTime(matchsGroupIsLive, false),...sortByTime([...matchsGroupNotStarted, ...matchsGroupEnd], false)].concat(matchsGroupNotLive)
        matchsGroup = groupByTimeAndComp(data)
      } else {
        matchsGroup = groupByTimeAndComp(matchsGroup)
      }
      
      matchsGroupList.value = matchsGroup
      compKeysList.value = [...matchsGroup.keys()]
      renderTopList.value = matchsGroup
    }
    isLoadingData.value = false
  } catch(e: any) {
    isLoadingData.value = false
  }

  nextTick(() => {
    //contentPage.value =  `<h1 class="page_title">${props?.h1}</h1>${props?.content}`
    showContentPage.value = true
  })
}

const renderTeamsDataList = () => {
  compChooseLeagueList.value  = compOriginsList.value
  // For render list
  compsListByKey.value = groupBy(compsDataList.value, x => x.id)
  let matchsListArray: any[] = []

  if (!orderByTime.value) {
    const favouritesTeams = useCookie<any>('favouritesTeams')
      Object.keys(matchsList.value).map(index => {
        if (favouritesTeams?.value?.includes(matchsList.value[index]?.home_team?.id) || favouritesTeams?.value?.includes(matchsList.value[index]?.away_team?.id)) {
          if (!matchsList.value[index].favouriteTeams) {
          matchsList.value[index].favouriteTeams = []
        }
        if (favouritesTeams?.value?.includes(matchsList.value[index]?.home_team?.id) && !matchsList.value[index].favouriteTeams?.find(item => item?.id === matchsList.value[index]?.home_team?.id)) {
          matchsList.value[index].favouriteTeams.push({id: matchsList.value[index]?.home_team?.id, name: matchsList.value[index]?.home_team?.name})
        }
        if (favouritesTeams?.value?.includes(matchsList.value[index]?.away_team?.id) && !matchsList.value[index].favouriteTeams?.find(item => item?.id === matchsList.value[index]?.away_team?.id)) {
          matchsList.value[index].favouriteTeams.push({id: matchsList.value[index]?.away_team?.id, name: matchsList.value[index]?.away_team?.name})
        }

          matchsListArray.push(matchsList.value[index])
        }
      })
      const matchsGroup = groupBy(matchsListArray, x => x.competition)
      const matchsGroupKey = [...matchsGroup.keys()]
      compsList.value = compOriginsList.value?.filter((item: { id: any; }) => {
        if (matchsGroupKey?.includes(item?.id)) {
          item.matchs =  item?.matchs?.filter(match => (favouritesTeams?.value?.includes(match?.home_team?.id) 
                        || favouritesTeams?.value?.includes(match?.away_team?.id)))
          return item
        }
      })
  } else {
    const favouritesTeams = useCookie<any>('favouritesTeams')
    Object.keys(matchsList.value).map(index => {
      if (favouritesTeams?.value?.includes(matchsList.value[index]?.home_team?.id) || favouritesTeams?.value?.includes(matchsList.value[index]?.away_team?.id)) {
        if (!matchsList.value[index].favouriteTeams) {
          matchsList.value[index].favouriteTeams = []
        }

        if (favouritesTeams?.value?.includes(matchsList.value[index]?.home_team?.id) && !matchsList.value[index].favouriteTeams?.find(item => item?.id === matchsList.value[index]?.home_team?.id)) {
          matchsList.value[index].favouriteTeams.push({id: matchsList.value[index]?.home_team?.id, name: matchsList.value[index]?.home_team?.name})
        }
        if (favouritesTeams?.value?.includes(matchsList.value[index]?.away_team?.id) && !matchsList.value[index].favouriteTeams?.find(item => item?.id === matchsList.value[index]?.away_team?.id)) {
          matchsList.value[index].favouriteTeams.push({id: matchsList.value[index]?.away_team?.id, name: matchsList.value[index]?.away_team?.name})
        }

        matchsListArray.push(matchsList.value[index])
      }
    })

    matchsListLength.value  = matchsListArray?.length
    let matchsGroup = sortByTime(matchsListArray, false)
    matchsGroup = groupByTimeAndComp(matchsGroup)
    matchsGroupList.value = matchsGroup
    compKeysList.value = [...matchsGroup.keys()]
    renderTopList.value = matchsGroup
  }


  isLoadingData.value = false
}

watch(
  ([matchsList, orderByTime, timeZone]),
  ([nMatchsList, nOrderByTime], [oMatchsList, oOrderByTime]) => {

    renderDataList()

    // setTimeout(() => {
    //   isLoadingData.value = false
    // }, 500)
  },
  { deep: true}
)

watch(
  () => useCookie<any>('settingsData'), 
  () => {
    setValueByCookie()
  },
  { deep: true }
)

watch(
  ([isShowOddsHDP, isShowOddsTX, isShowOdds1X2, isShowCardYellow, isShowCardRed, isShowRanking, settingType, isShowGoalWindow, isShowRedWindow, soundHome, soundAway, timeZone]),
  () => {
    const settingsData = useCookie<any>('settingsData')

    if (props?.page !== LIVESCORE_PAGE.SCHEDULE) {
      if (settingsData?.value) {
      settingsData.value.isShowOddsHDP = isShowOddsHDP.value
      settingsData.value.isShowOddsTX = isShowOddsTX.value
      settingsData.value.isShowOdds1X2 = isShowOdds1X2.value
      settingsData.value.isShowCardYellow = isShowCardYellow.value
      settingsData.value.isShowCardRed = isShowCardRed.value
      settingsData.value.isShowRanking = isShowRanking.value
      settingsData.value.settingType = settingType.value
      settingsData.value.isShowGoalWindow = isShowGoalWindow.value
      settingsData.value.isShowRedWindow = isShowRedWindow.value
      settingsData.value.soundHome = soundHome.value
      settingsData.value.soundAway = soundAway.value
      settingsData.value.timeZone = timeZone.value

      useCookie('settingsData').value = JSON.stringify(settingsData.value)
    } else {
      useCookie('settingsData').value = JSON.stringify( {
        isShowOddsHDP: isShowOddsHDP.value,
        isShowOddsTX: isShowOddsTX.value,
        isShowOdds1X2: isShowOdds1X2.value,
        isShowCardYellow: isShowCardYellow.value,
        isShowCardRed: isShowCardRed.value,
        isShowRanking: isShowRanking.value,
        settingType: settingType.value,
        isShowGoalWindow: isShowGoalWindow.value,
        isShowRedWindow: isShowRedWindow.value,
        soundHome: soundHome.value,
        soundAway: soundAway.value,
        timeZone: timeZone.value,
      })
    }
    }
  }
)

watch(
  () => useCookie<any>('favouritesData'),
  () => {
    renderDataList()
  },
  { deep: true }
);
watch(
  () => useCookie<any>('favouritesLeagues'),
  () => {
    renderDataList()
  },
  { deep: true }
);
watch(
  () => useCookie<any>('favouritesTeams'),
  () => {
    renderDataList()
  },
  { deep: true }
);

// watch(
//   oddsIMain,
//   () => {

//     fetchMatchsLive(dateChoose.value)
//     fetchMatchsRecent(dateChoose.value)
//     fetchOddIMain(dateChoose.value)
//   },
//   { immediate: true }
// )

watch(isScoreGoal, 
  () => {
    // 30 Seconds
    if (isScoreGoal.value) {
      clearTimeout(timeoutID.value);

      timeoutID.value = setTimeout(() => {
        isScoreGoal.value = false
        isScoreGoalMatchId.value = null
      }, 30000)
    }
  }
)

const setValueByCookie = () => {
  const settingsData = useCookie<any>('settingsData')
  if (settingsData?.value) {
    if (typeof settingsData?.value?.isShowCardYellow !== 'undefined') {
      isShowCardYellow.value = settingsData?.value?.isShowCardYellow
    }
    if (typeof settingsData?.value?.isShowCardRed !== 'undefined') {
      isShowCardRed.value = settingsData?.value?.isShowCardRed
    }
    if (typeof settingsData?.value?.isShowRanking !== 'undefined') {
      isShowRanking.value = settingsData?.value?.isShowRanking
    }
    if (typeof settingsData?.value?.orderByTime !== 'undefined') {
      orderByTime.value = settingsData?.value?.orderByTime
    }
    if (typeof settingsData?.value?.oddCompanySelected !== 'undefined') {
      oddCompanySelected.value = settingsData?.value?.oddCompanySelected
    }
    if (typeof settingsData?.value?.isShowOddsHDP !== 'undefined') {
      isShowOddsHDP.value = settingsData?.value?.isShowOddsHDP
    }
    if (typeof settingsData?.value?.isShowOddsTX !== 'undefined') {
      isShowOddsTX.value = settingsData?.value?.isShowOddsTX
    }
    if (typeof settingsData?.value?.isShowOdds1X2 !== 'undefined') {
      isShowOdds1X2.value = settingsData?.value?.isShowOdds1X2
    }
    if (typeof settingsData?.value?.settingType !== 'undefined') {
      settingType.value = settingsData?.value?.settingType
    }
    if (typeof settingsData?.value?.isShowGoalWindow !== 'undefined') {
      isShowGoalWindow.value = settingsData?.value?.isShowGoalWindow
    }
    if (typeof settingsData?.value?.isShowRedWindow !== 'undefined') {
      isShowRedWindow.value = settingsData?.value?.isShowRedWindow
    }
    if (typeof settingsData?.value?.soundHome !== 'undefined') {
      soundHome.value = settingsData?.value?.soundHome
    }
    if (typeof settingsData?.value?.soundAway !== 'undefined') {
      soundAway.value = settingsData?.value?.soundAway
    }
    if (typeof settingsData?.value?.timeZone !== 'undefined') {
      timeZone.value = settingsData?.value?.timeZone
    }

  }

  favouritesList.value = useCookie<any>('favouritesData').value ? useCookie<any>('favouritesData').value : []

  favouritesLeagues.value = useCookie<any>('favouritesLeagues').value ? useCookie<any>('favouritesLeagues').value : []
  favouritesTeams.value = useCookie<any>('favouritesTeams').value ? useCookie<any>('favouritesTeams').value : []
}

const fetchLiveMatch = async() => {
  try {
    const data = await useApiLiveScore(API_ROUTERS.LIVESCORE.LIVE_MATCH)
    if(data) {
      wssMatch({
        "topic": "livescore/football/match-live/v1",
        "payload": {
          match_live : data
        }
      });
    }
  } catch {}
}

const listMatchLazy = ref([])

if(props.page === LIVESCORE_PAGE.LIVESCORE) {
  const query = reactive({
    date: formatTimeWithGMT(getConfig(storeSystems?.configurations, 'TIMEZONE') ?? '+07:00'),
    tz: String((getConfig(storeSystems?.configurations, 'TIMEZONE') ?? 'GMT+07:00')).slice(3),
    status : [...LIVESCORE_STATUS.IS_LIVE].toString(),
    lang: useLocale?.value.defaultLocale
  })
  const [matchLive, matchNotLive] = await Promise.all([
    await useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_RECENT_SCHEDULE, query),
    await useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_RECENT_SCHEDULE, {
        date: formatTimeWithGMT(getConfig(storeSystems?.configurations, 'TIMEZONE') ?? '+07:00'),
        tz: String((getConfig(storeSystems?.configurations, 'TIMEZONE') ?? 'GMT+07:00')).slice(3),
        status : [...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].toString(),
        hot: ['5','4'].toString(),
        limit: 50,
        page: 1,
        lang: useLocale?.value.defaultLocale
      })
  ])
  if(matchLive && matchNotLive) {
    listMatchLazy.value = [...matchLive, ...matchNotLive]
    listMatchLazy.value = [...new Map(listMatchLazy.value.map(item => [item.id, item])).values()]
  }
  if(listMatchLazy.value.length > 15) {
    await fetchMatchsRecent(datePara ? datePara : formatTimeWithGMT(getConfig(storeSystems?.configurations, 'TIMEZONE') ?? '+07:00'),listMatchLazy.value)
  } else {
    await fetchMatchsRecent(datePara ? datePara : formatTimeWithGMT(getConfig(storeSystems?.configurations, 'TIMEZONE') ?? '+07:00'))
  }
} else {
  await fetchMatchsRecent(datePara ? datePara : formatTimeWithGMT(getConfig(storeSystems?.configurations, 'TIMEZONE') ?? '+07:00'))
}

const idMatchTomorrow = ref(null)
const initTimeTomorrow = (match) => {
  if (!idMatchTomorrow.value) {

    if ([...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].toString().includes(match.status)) {
      const test = formatDateMomentUTCTimeZone(match?.match_time, 'DD-MM-YYYY', getConfig(storeSystems?.configurations, 'TIMEZONE'));
      const currentDay = moment(formatTimeWithGMT(getConfig(storeSystems?.configurations, 'TIMEZONE') ?? '+07:00')).add(1, 'days').format('DD-MM-YYYY');
      if (String(test) === String(currentDay)) {
        idMatchTomorrow.value = match.id
      }
    }
  }
}
onMounted(async () => {
    nextTick(async () => {
      setValueByCookie()

      if(listMatchLazy.value.length > 15 && props.page === LIVESCORE_PAGE.LIVESCORE) {
        const resData = await useApiLiveScore(API_ROUTERS.LIVESCORE.MATCHS_RECENT_SCHEDULE,{
            date: formatTimeWithGMT(getConfig(storeSystems?.configurations, 'TIMEZONE') ?? '+07:00'),
            tz: String((getConfig(storeSystems?.configurations, 'TIMEZONE') ?? 'GMT+07:00')).slice(3),
            // decode: 1,
            status : [...LIVESCORE_STATUS.NOT_START, ...LIVESCORE_STATUS.NOT_LIVE].toString(),
            lang: useLocale?.value.defaultLocale
        })
        if(resData && Array.isArray(resData)) {
          const match = resData.filter((item)=> item.status !== '5' && item.status !== '4')
          const matchMerge = [...listMatchLazy.value, ...match]
          const uniqueArray = [...new Map(matchMerge.map(item => [item.id, item])).values()];
          await fetchMatchsRecent(datePara ? datePara : formatTimeWithGMT(getConfig(storeSystems?.configurations, 'TIMEZONE') ?? '+07:00'), uniqueArray)
        }
      }

      if(props?.page === LIVESCORE_PAGE.LIVESCORE || props?.page === LIVESCORE_PAGE.FAVORITES) {
        await fetchOddsIMain(datePara ? datePara : formatTimeWithGMT(getConfig(storeSystems?.configurations, 'TIMEZONE') ?? '+07:00'))
      }
      if(props?.page !== LIVESCORE_PAGE.RESULTS) {
        fetchLiveMatch()
      }
      // await fetchCountries()
    })
    if (props?.page === LIVESCORE_PAGE.SCHEDULE) {
      isShowOddsHDP.value = false
      isShowOddsTX.value = false
      isShowOdds1X2.value = false
    }
    fetchKeyEncode();
    await getIframe();
    setTimeout(()=> {
      isShowSoundLiveScore.value = true;
    },1000)
})

watch(
  ()=> favoritesInit.value,
  async () => {
    if(favoritesInit.value) {
      await fetchMatchsRecent(dateChoose.value)
    }
  }
)
</script>

<style lang="scss" scoped>
.table_livescore {
  @media (max-width: 768px) {
    position: relative;
  }
}
.tomorrow {
  display: flex;
  justify-content: center;
  font-weight: bold;
  padding: 2px 0;
  margin: 0 -10px;
  background-color: rgb(255 255 0 / 27%);
}
.fast-search {
  position: absolute;
  top: -28px;
  right: 10px;
}
.isport-name {
  position: absolute;
  top: 0;
  color: white;
  background: $primary;
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 10px;
  text-transform: uppercase;
}
.schedule, .results {
  @media (min-width: 768px) {
    #ht, #gt, #home, #away {
     width: 25%;
    }
  }
  .oddsHead {
    display: none;
  }
  .scoretitle {
    background: $livescore-header-table;
  }
}
.height-100 {
  // height: 100%;
}
.align-content-center {
  align-content: center !important;
}
#rightSearchInput {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media (max-width: 767px) {
  body .mcontent #main #table_live_score #mintable #live #table_live .scoretitle div {
    display: none;
  }
}
</style>