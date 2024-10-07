<template>
  <div id="" class="match-detail">
    <div id="">
      <div class="content">
        <div class="content" id="oddsDiv">
          <div>
            <h2 class="team-table-title">
              {{ $t('Live Odds') }}
              <select id="detail-hfSel" v-model="detailHfSel">
                <option value="1">{{ $t('FT') }}</option>
                <option value="2">{{ $t('HT') }}</option>
              </select>
              <select id="detail-oddsSel" v-model="oddCompanySelected">
                <option v-for="(odd_company, index) in ODD_COMPANYS" :key="index" :value="odd_company?.id">
                  {{ odd_company?.name }}
                </option>
              </select>
            </h2>
            <div class="oddsDiv" ref="tableWrapper" :class="wrapperClass">
              <div :class="productSelectorClass" v-show="isMobileView" style="display:flex">
                <span
                  v-for="(content, index) in mobileContents"
                  :key="index"
                  :data-product="'product-' + (index + 1)"
                  @click.prevent="selectProduct('product-' + (index + 1))"
                  :class="{ active: selectedProduct === 'product-' + (index + 1) }"
                >
                  <div>{{ content }}</div>
                </span>
              </div>

              <table ref="table" id="oddsTable31" class="tr-table team-table-other oddsTable text-center">
                <thead>
                  <tr v-if="$isMobile">
                    <th style="background: white; border: none;" data-mobile-collapse></th>
                    <th style="background: white; border: none;" data-mobile-content="HDP"><b></b></th>
                    <th style="background: white; border: none;" :data-mobile-content="$t('Over/Under')" data-featured><b></b></th>
                    <th style="background: white; border: none;" data-mobile-content="1x2"><b></b></th>
                  </tr>
                  <tr v-if="!$isMobile">
                    <th data-mobile-collapse></th>
                    <th data-mobile-content="HDP"><b>HDP</b></th>
                    <th :data-mobile-content="$t('Over/Under')" data-featured><b>{{$t('Over/Under')}}</b></th>
                    <th data-mobile-content="1x2"><b>1x2</b></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center title-table">
                          <span>{{ $t('Hour') }}</span>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center title-table">
                          <span>{{ $t('Score') }}</span>
                        </div>
                      </div>
                    </th>
                    <td data-product="product-1">
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1">
                          <span>{{ $t('Initial') }}</span>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1">
                          <span>{{ $t('Live') }}</span>
                        </div>
                      </div>
                    </td>
                    <td data-product="product-2">
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1">
                          <span>{{ $t('Initial') }}</span>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1">
                          <span>{{ $t('Live') }}</span>
                        </div>
                      </div>
                    </td>
                    <td data-product="product-3">
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1">
                          <span>{{ $t('Initial') }}</span>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0 th-bg1">
                          <span>{{ $t('Live') }}</span>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr v-if="detailHfSel == 2">
                    <th>
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center fx-green">
                          <span>{{ $t('Initial') }}</span>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center red_number">
                          <span class="rl">-</span>
                        </div>
                      </div>
                    </th>
                    <td data-product="product-1">
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'handicapHalf', 'initial', 1)) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'handicapHalf', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'handicapHalf', 'initial', 2)) }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="ll">{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'handicapHalf', 'initial', 1)) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="">{{ getDetailOdds(oddsDetail, 'handicapHalf', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="rl">{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'handicapHalf', 'initial', 2)) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td data-product="product-2">
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'overUnderHalf', 'initial', 1)) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'overUnderHalf', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'overUnderHalf', 'initial', 2)) }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="ll">{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'overUnderHalf', 'initial', 1)) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="">{{ getDetailOdds(oddsDetail, 'overUnderHalf', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="rl">{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'overUnderHalf', 'initial', 2)) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td data-product="product-3">
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'europeOddsHalf', 'initial', 1) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'europeOddsHalf', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'europeOddsHalf', 'initial', 2) }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="ll">{{ getDetailOdds(oddsDetail, 'europeOddsHalf', 'initial', 1) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="">{{ getDetailOdds(oddsDetail, 'europeOddsHalf', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="rl">{{ getDetailOdds(oddsDetail, 'europeOddsHalf', 'initial', 2) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr v-if="detailHfSel == 1">
                    <th>
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center fx-green">
                          <span>{{ $t('Initial') }}</span>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center red_number">
                          <span class="rl">-</span>
                        </div>
                      </div>
                    </th>
                    <td data-product="product-1">
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'handicap', 'initial', 1)) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'handicap', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'handicap', 'initial', 2)) }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="ll">{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'handicap', 'initial', 1)) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="">{{ getDetailOdds(oddsDetail, 'handicap', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="rl">{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'handicap', 'initial', 2)) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td data-product="product-2">
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'overUnder', 'initial', 1)) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'overUnder', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'overUnder', 'initial', 2)) }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="ll">{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'overUnder', 'initial', 1)) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="">{{ getDetailOdds(oddsDetail, 'overUnder', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="rl">{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'overUnder', 'initial', 2)) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td data-product="product-3">
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 1) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 2) }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="ll">{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 1) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="">{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="rl">{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 2) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr v-if="detailHfSel == 1">
                    <th>
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center fx-red">
                          <span>{{ $t('Live') }}</span>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center red_number">
                          <span class="rl">-</span>
                        </div>
                      </div>
                    </th>
                    <td data-product="product-1">
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'handicap', 'initial', 1)) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'handicap', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'handicap', 'initial', 2)) }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="ll">{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'handicap', 'initial', 1)) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="">{{ getDetailOdds(oddsDetail, 'handicap', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="rl">{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'handicap', 'initial', 2)) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td data-product="product-2">
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'overUnder', 'initial', 1)) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'overUnder', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'overUnder', 'initial', 2)) }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="ll">{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'overUnder', 'initial', 1)) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="">{{ getDetailOdds(oddsDetail, 'overUnder', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="rl">{{ getOddNumberToNegativeTX(getDetailOdds(oddsDetail, 'overUnder', 'initial', 2)) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td data-product="product-3">
                      <div class="row mlr-0">
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 1) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                              <span>{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 2) }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                          <div class="row mlr-0">
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="ll">{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 1) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="">{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 0) }}</span>
                            </div>
                            <div class="col-4 col-md-4 col-lg-4 text-center align-self-center hbg-td2">
                              <span class="rl">{{ getDetailOdds(oddsDetail, 'europeOdds', 'initial', 2) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <template v-for="(item, index) in Object.keys(oddsDetailHistories).sort()" :key="index">
                    <tr>
                      <th>
                        <div class="row mlr-0">
                          <div class="col-6 col-md-6 col-lg-6 text-center align-self-center fx-blue">
                            <span>{{ oddsDetailHistories?.[item]?.[0] }}</span>
                          </div>
                          <div class="col-6 col-md-6 col-lg-6 text-center align-self-center red_number">
                            <span class="rl">{{ oddsDetailHistories?.[item]?.[1] }}:{{ oddsDetailHistories?.[item]?.[2] }}</span>
                          </div>
                        </div>
                      </th>
                      <td data-product="product-1" style="display: table-cell;">
                        <div class="row mlr-0">
                          <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                            <div class="row mlr-0">
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                                <span>{{ getOddNumberToNegativeTX(oddsDetailHistories?.[item]?.[3]) }}</span>
                              </div>
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                                <span>{{ oddsDetailHistories?.[item]?.[4] }}</span>
                              </div>
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                                <span>{{ getOddNumberToNegativeTX(oddsDetailHistories?.[item]?.[5]) }}</span>
                              </div>
                            </div>
                          </div>
                          <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                            <div class="row mlr-0">
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center" :class="(index == (oddsDetailHistoriesLength - 1)) ? 'hbg-td1' : 'hbg-td2'">
                                <span class="ll">{{ getOddNumberToNegativeTX(oddsDetailHistories?.[item]?.[6]) }}</span>
                              </div>
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center" :class="(index == (oddsDetailHistoriesLength - 1)) ? 'hbg-td1' : 'hbg-td2'">
                                <span class="">{{ oddsDetailHistories?.[item]?.[7] }}</span>
                              </div>
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center" :class="(index == (oddsDetailHistoriesLength - 1)) ? 'hbg-td1' : 'hbg-td2'">
                                <span class="rl ">{{ getOddNumberToNegativeTX(oddsDetailHistories?.[item]?.[8]) }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td data-product="product-2">
                        <div class="row mlr-0">
                          <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                            <div class="row mlr-0">
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                                <span>{{ getOddNumberToNegativeTX(oddsDetailHistories?.[item]?.[9]) }}</span>
                              </div>
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                                <span>{{ oddsDetailHistories?.[item]?.[10] }}</span>
                              </div>
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                                <span>{{ getOddNumberToNegativeTX(oddsDetailHistories?.[item]?.[11]) }}</span>
                              </div>
                            </div>
                          </div>
                          <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                            <div class="row mlr-0">
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center" :class="(index == (oddsDetailHistoriesLength - 1)) ? 'hbg-td1' : 'hbg-td2'">
                                <span class="ll">{{ getOddNumberToNegativeTX(oddsDetailHistories?.[item]?.[12]) }}</span>
                              </div>
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center" :class="(index == (oddsDetailHistoriesLength - 1)) ? 'hbg-td1' : 'hbg-td2'">
                                <span class="">{{ oddsDetailHistories?.[item]?.[13] }}</span>
                              </div>
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center" :class="(index == (oddsDetailHistoriesLength - 1)) ? 'hbg-td1' : 'hbg-td2'">
                                <span class="rl">{{ getOddNumberToNegativeTX(oddsDetailHistories?.[item]?.[14]) }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td data-product="product-3">
                        <div class="row mlr-0">
                          <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                            <div class="row mlr-0">
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                                <span>{{ oddsDetailHistories?.[item]?.[15] }}</span>
                              </div>
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                                <span>{{ oddsDetailHistories?.[item]?.[16] }}</span>
                              </div>
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center">
                                <span>{{ oddsDetailHistories?.[item]?.[17] }}</span>
                              </div>
                            </div>
                          </div>
                          <div class="col-6 col-md-6 col-lg-6 text-center align-self-center plr-0">
                            <div class="row mlr-0">
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center" :class="(index == (oddsDetailHistoriesLength - 1)) ? 'hbg-td1' : 'hbg-td2'">
                                <span class="ll">{{ oddsDetailHistories?.[item]?.[18] }}</span>
                              </div>
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center" :class="(index == (oddsDetailHistoriesLength - 1)) ? 'hbg-td1' : 'hbg-td2'">
                                <span class="">{{ oddsDetailHistories?.[item]?.[19] }}</span>
                              </div>
                              <div class="col-4 col-md-4 col-lg-4 text-center align-self-center" :class="(index == (oddsDetailHistoriesLength - 1)) ? 'hbg-td1' : 'hbg-td2'">
                                <span class="">{{ oddsDetailHistories?.[item]?.[20] }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <div class="discription">
              <span class="hbg-td2"></span> :{{ $t('Historical data') }}
              <span class="hbg-td1"></span> :{{ $t('Latest data') }}
            </div>
          </div>
        </div>
        <div class="content" id="cornerOddsDiv" v-if="matchOddsCorner?.corner && matchOddsCorner?.hadicap">
          <div>
            <h2 class="team-table-title">{{ $t('Corner Odd') }}</h2>


            <div class="team-table-other text-center">
              <div class="row" v-if="matchOddsCorner?.hadicap">
                <div class="col-12 text-center align-self-center bdtable bg_header1">
                  <b>{{ $t('HDP') }}</b>
                </div>
              </div>
              <div class="row" v-if="matchOddsCorner?.hadicap">
                <div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable bg_header2">
                  <span class="th-bg3 rl">{{ $t('Initial') }}</span>
                </div>
                <div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable">
                  {{ getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.initial, 1) }}
                </div>
                <div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable">
                  {{ getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.initial, 0) }}
                </div>
                <div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable">
                  {{getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.initial, 2) }}
                </div>
                <div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable bg_header2">
                  <span class="th-bg3 ll rl">{{ $t('Live') }}</span>
                </div>
                <div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable" :class="getClassOddCorner(getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay, 1), getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay_older, 1))">
                  {{ getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay, 1)
                    ? getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay, 1)
                    : getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.instant, 1) }}
                </div>
                <div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable" :class="getClassOddCorner(getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay, 0), getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay_older, 0))">
                  {{ getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay, 0)
                    ? getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay, 0)
                    : getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.instant, 0) }}
                </div>
                <div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable" :class="getClassOddCorner(getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay, 2), getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay_older, 2))">
                  {{ getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay, 2)
                    ? getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.inplay, 2)
                    : getOddCornerValue(matchOddsCorner?.hadicap?.[0]?.instant, 2) }}
                </div>
                <div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable">
                  <!-- <a href="#" style="color: #3f9ed8" target="_blank">Chi tiết</a> -->
                </div>
              </div>
              <div class="row" v-if="matchOddsCorner?.corner">
                <div class="col-12 text-center align-self-center bdtable bg_header1">
                  <b>{{ $t('Over/Under') }}</b>
                </div>
              </div>
              <div class="row" v-if="matchOddsCorner?.corner">
                <div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable bg_header2">
                  <span class="th-bg3 ll rl">{{ $t('Initial') }}</span>
                </div>
                <div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable">
                  {{ getOddNumberToNegativeTX(matchOddsCorner?.corner?.early?.[0]?.over) }}
                </div>
                <div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable">
                  {{ getOddNumberToNegativeTX(matchOddsCorner?.corner?.early?.[0]?.total_corners) }}
                </div>
                <div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable">
                  {{ getOddNumberToNegativeTX(matchOddsCorner?.corner?.early?.[0]?.under) }}
                </div>
                <div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable bg_header2">
                  <span class="th-bg3 ll rl">{{ $t('Live') }}</span>
                </div>
                <div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable" :class="getClassOddCorner(matchOddsCorner?.corner?.live?.[0]?.over, matchOddsCorner?.corner?.live_older?.[0]?.over)">
                  {{ getOddNumberToNegativeTX(matchOddsCorner?.corner?.live?.[0]?.over) }}
                </div>
                <div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable" :class="getClassOddCorner(matchOddsCorner?.corner?.live?.[0]?.total_corners, matchOddsCorner?.corner?.live_older?.[0]?.total_corners)">
                  {{ matchOddsCorner?.corner?.live?.[0]?.total_corners }}
                </div>
                <div class="col-4 col-md-1 col-lg-1 text-center align-self-center bdtable" :class="getClassOddCorner(matchOddsCorner?.corner?.live?.[0]?.under, matchOddsCorner?.corner?.live_older?.[0]?.under)">
                  {{ getOddNumberToNegativeTX(matchOddsCorner?.corner?.live?.[0]?.under) }}
                </div>
                <div class="col-12 col-md-2 col-lg-2 text-center align-self-center bdtable">
                  <nuxt-link :to="{path: ROUTERS_OLD.MATCH_DETAIL + matchIdSlug, query: { tab: MATCH_TAB.ODDS, type: MATCH_TAB.CORNER_OU_ODDS }}"target="_blank">{{ $t('Detail') }}</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div id="mactbox-black">
            <div id="lineupMenu" class="lineup-menu" style="display: block">
              <div class="switch-btn">
                <span :class="{ on: activeSection === 'lineup' }" @click="switchSection('lineup')"
                  name="lineup">{{ $t('Lineup') }}</span>
                <span :class="{ on: activeSection === 'animation' }" @click="switchSection('animation')"
                  name="animation">{{ $t('Animation') }}</span>
              </div>
              <nuxt-link v-if="liveStream && availableStreamUrl" target="_blank"
                :to="availableStreamUrl + '?ls-id=' + matchIdLive" class="video">
                <span class="tv-btn" style="display: inline">
                  <span class="livebtn">
                    <i class="icon iconfont icon-icon-live2"></i>{{ $t('Video') }}
                  </span>
                </span>
              </nuxt-link>
            </div>
            <div id="lineupBox" v-if="activeSection === 'lineup'">
              <div class="teamNames">
                <span class="tn-home home-bg">
                  <span class="teamname">{{ homeTeamName }}</span>
                  <span>{{ homeFormation }}</span>
                </span>

                <span class="tn-away away-bg">
                  <span>{{ awayFormation }}</span>
                  <span class="teamname">{{ awayTeamName }}</span>
                </span>
              </div>
              <div id="matchBox">
                <div class="plays">
                  <div class="home five">
                    <PlayBoxComponent v-for="player in lineup.home" :key="player.id" :player="player"
                      :style="getPlayerStyle(player, 'home')" />
                  </div>
                  <div class="guest five">
                    <PlayBoxComponent v-for="player in lineup.away" :key="player.id" :player="player"
                      :style="getPlayerStyle(player, 'away')" />
                  </div>
                </div>
                <div class="shutup-btn linebackup" id="lineBackup-btn" :class="{ on: isBackupPlayVisible }"
                  @click="isBackupPlayVisible = !isBackupPlayVisible" v-if="lineBackup.home.length || lineBackup.away.length">
                  <span id="shutup-btn-txt">{{
                    isBackupPlayVisible ? $t('Hide substitute players') : $t('See more substitute players')
                    }}</span>
                  <i class="icon iconfont icon-drop-down"></i>
                </div>
                <div id="backupPlay" class="backupPlay" v-if="isBackupPlayVisible">
                  <div class="home">
                    <PlayBackupComponent v-for="player in lineBackup.home" :key="player.id" :player="player" />
                  </div>
                  <div class="guest">
                    <PlayBackupComponent v-for="player in lineBackup.away" :key="player.id" :player="player" />
                  </div>
                </div>
                <div class="shutup-btn" id="shutup-btn" :class="{ on: iconsVisible }"
                  @click="iconsVisible = !iconsVisible">
                  <span id="shutup-btn-txt">{{
                    iconsVisible ? $t('Close') : $t('More')
                    }}</span>
                  <i class="icon iconfont icon-drop-down"></i>
                </div>
              </div>
              <div id="icons" v-if="iconsVisible">
                <div class="icon">
                  <img src="/img/incident/1.png" alt="Goal" />{{ $t('Goal') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/2.png" alt="Corner" />{{ $t('Corner') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/3.png" alt="Yellow card" />{{ $t('Yellow card') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/4.png" alt="Red card" />{{ $t('Red card') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/5.png" alt="Offside" />{{ $t('Offside') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/6.png" alt="Free kick" />{{ $t('Free kick') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/36.png" alt="Goal kick" />{{ $t('Goal kick') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/8.png" alt="Penalty" />{{ $t('Yellow card') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/9.png" alt="Sub in" />{{ $t('Sub in') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/9.2.png" alt="Sub out" />{{ $t('Sub out') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/11.png" alt="Midfield" />{{ $t('Midfield') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/12.png" alt="End" />{{ $t('End') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/55.png" alt="Halftime score" />{{ $t('Halftime score') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/15.png" alt="Card upgrade confirmed" />{{ $t('Card upgrade confirmed') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/16.png" alt="Penalty missed" />{{ $t('Penalty missed') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/17.png" alt="Own goal" />{{ $t('Own goal') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/32.png" alt="Injury time" />{{ $t('Injury time') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/30.png" alt="Shots on target" />{{ $t('Shots on target') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/33.png" alt="Shots off target" />{{ $t('Shots off target') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/31.png" alt="Dangerous Attack" />{{ $t('Dangerous Attack') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/34.png" alt="Ball possession" />{{ $t('Ball possession') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/12.png" alt="Overtime is over" />{{ $t('Overtime is over') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/6.png" alt="Penalty kick ended" />{{ $t('Penalty kick ended') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/28.png" alt="VAR" />{{ $t('VAR') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/8.png" alt="Penalty(Penalty Shoot-out)" />{{ $t('Penalty(Penalty Shoot-out)') }}
                </div>
                <div class="icon">
                  <img src="/img/incident/16.png" alt="Penalty missed(Penalty Shoot-out)" />{{ $t('Penalty missed(Penalty Shoot-out)') }}
                </div>
              </div>
            </div>
            <div id="flashBox" class="flash" v-if="activeSection === 'animation'">
              <div class="embed-responsive-item-widget">
                <AnimationComponent :key-encode="keyEncode" :match-id-slug="matchIdSlug" v-if="showAnimation" :lang="useLocale.defaultLocale"/>
              </div>
            </div>
          </div>
        </div>
        <div id="teamEventDiv_detail" class="content">
          <div class="team-table-title row">
            <span class="team-table-xq-home col-4">
              <span>{{ homeTeamName }}</span>
            </span>
            <span class="col-4"> {{ $t('Main event') }}</span>
            <span class="team-table-xq-guest col-4">
              <span>{{ awayTeamName }}</span>
            </span>
          </div>
          <div class="team-bg-h1">
            <span class="home-bg"></span>
            <span class="away-bg"></span>
          </div>

          <div class="team-table-other ky" v-if="matchLiveDetail?.match?.home_scores[6] != 0 ||  matchLiveDetail?.match?.away_scores[6] != 0">
            <div class="ky_tit">
              <div class="row text-center">
                <div class="col-5 text-end">
                  <span class="t15"><b>{{ matchLiveDetail?.match?.home_scores[6] }}</b></span>
                </div>
                <div class="col-2">
                  <span class="min">{{ $t('Penalty') }}</span>
                </div>
                <div class="col-5 text-start">
                  <span class="t15 blue">{{
                    matchLiveDetail?.match?.away_scores[6]
                    }}</span>
                </div>
              </div>
            </div>
            <template v-for="(incident, index) in matchLiveDetailIncidents" :key="index">
              <div class="ky_list" v-if="
                  [29, 30].includes(
                    incident?.type
                  )
                ">
                <div class="row">
                  <div class="col-5 text-end home" v-html="getIncidents(incident, 1)"></div>
                  <div class="col-2 text-center align-self-center">
                    <b>{{ incident?.home_score || 0 }} - {{ incident?.away_score || 0 }}</b>
                  </div>
                  <div class="col-5 text-start away" v-html="getIncidentsRight(incident, 2)"></div>
                </div>
              </div>
            </template>
          </div>
          <div class="team-table-other ky">
            <div class="ky_tit">
              <div class="row text-center">
                <div class="col-5 text-end">
                  <span class="t15"><b>{{ matchLiveDetail?.match?.home_scores[0] }}</b></span>
                </div>
                <div class="col-2">
                  <span class="min">{{ $t('Minute') }}</span>
                </div>
                <div class="col-5 text-start">
                  <span class="t15 blue">{{
                    matchLiveDetail?.match?.away_scores[0]
                    }}</span>
                </div>
              </div>
            </div>
            <template v-for="(incident, index) in matchLiveDetailIncidents" :key="index">
              <div class="ky_list" v-if="
                  [1, 2, 3, 4, 5, 8, 9, 15, 16, 17, 28].includes(
                    incident?.type
                  )
                ">
                <div class="row">
                  <div class="col-5 text-end home" v-html="getIncidents(incident, 1)"></div>
                  <div class="col-2 text-center align-self-center">
                    <b>{{ incident?.time }}'</b>
                  </div>
                  <div class="col-5 text-start away" v-html="getIncidentsRight(incident, 2)"></div>
                </div>
              </div>
            </template>
          </div>
        </div>  
        <PlayerStatsticsTableDetail/>
        <div id="teamTechDiv_detail" class="content">
          <div>
            <h2 class="team-table-title">{{ $t('Technical statistics') }}</h2>
            <div class="team-bg-h1">
              <span class="home-bg"></span>
              <span class="away-bg"></span>
            </div>
            <div class="fx20">
              <ul class="stat">
                <template v-for="(stat, index) in matchLiveDetail?.stats" :key="index">
                  <li>
                    <span class="stat-c">{{ stat?.home }} %</span>
                    <span
                      :class="['stat-bar-wrapper homes', { hollow: stat?.home === 0 && stat?.away === 0 }]"
                    >
                      <span
                        class="stat-bar fr"
                        :style="
                          'width: ' +
                          (stat?.home + stat?.away > 0
                            ? (stat?.home * 100) / (stat?.home + stat?.away)
                            : 0) +
                          '%'
                        "
                      ></span>
                    </span>
                    <span class="stat-title">{{ $t(getStats(stat?.type)) }}</span>
                    <span 
                      :class="['stat-bar-wrapper aways', { hollow: stat?.home === 0 && stat?.away === 0 }]"
                    >
                      <span
                        class="stat-bar fl"
                        :style="
                          'width: ' +
                          (stat?.home + stat?.away > 0
                            ? (stat?.away * 100) / (stat?.home + stat?.away)
                            : 0) +
                          '%'
                        "
                      ></span>
                    </span>
                    <span class="stat-c two">{{ stat?.away }} %</span>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
        <div class="content">
          <div>
            <h2 class="team-table-title">{{ $t('Team data') }}</h2>
            <div class="team-h1">
              <span class="home-bg"></span>
              <span class="away-bg"></span>
            </div>
            <table id="team-statistics" class="team-table-other text-center" width="100%" cellpadding="0"
              cellspacing="0">
              <tr>
                <th>{{ $t('Home') }}</th>
                <th>{{ $t('Recent 3') }}</th>
                <th>{{ $t('Away') }}</th>
                <th>{{ $t('Home') }}</th>
                <th>{{ $t('Recent 10') }}</th>
                <th>{{ $t('Away') }}</th>
              </tr>
              <tr>
                <td :class="
                    stateComparison?.[0]?.[42] > stateComparison?.[0]?.[43]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[0]?.[42] }}
                </td>
                <td>
                  <b>{{ $t('Goal') }}</b>
                </td>
                <td :class="
                    stateComparison?.[0]?.[43] > stateComparison?.[0]?.[42]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[0]?.[43] }}
                </td>
                <td :class="
                    stateComparison?.[1]?.[42] > stateComparison?.[1]?.[43]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[1]?.[42] }}
                </td>
                <td>
                  <b>{{ $t('Goal') }}</b>
                </td>
                <td :class="
                    stateComparison?.[1]?.[43] > stateComparison?.[1]?.[42]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[1]?.[43] }}
                </td>
              </tr>
              <tr>
                <td :class="
                    stateComparison?.[0]?.[36] > stateComparison?.[0]?.[37]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[0]?.[36] }}
                </td>
                <td>
                  <b>{{ $t('Conceded') }}</b>
                </td>
                <td :class="
                    stateComparison?.[0]?.[37] > stateComparison?.[0]?.[36]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[0]?.[37] }}
                </td>
                <td :class="
                    stateComparison?.[1]?.[36] > stateComparison?.[1]?.[37]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[1]?.[36] }}
                </td>
                <td>
                  <b>{{ $t('Conceded') }}</b>
                </td>
                <td :class="
                    stateComparison?.[1]?.[37] > stateComparison?.[1]?.[36]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[1]?.[37] }}
                </td>
              </tr>
              <tr>
                <td :class="
                    stateComparison?.[0]?.[38] > stateComparison?.[0]?.[39]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[0]?.[38] }}
                </td>
                <td>
                  <b>{{ $t('Corner') }}</b>
                </td>
                <td :class="
                    stateComparison?.[0]?.[39] > stateComparison?.[0]?.[38]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[0]?.[39] }}
                </td>
                <td :class="
                    stateComparison?.[1]?.[38] > stateComparison?.[1]?.[39]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[1]?.[38] }}
                </td>
                <td>
                  <b>{{ $t('Corner') }}</b>
                </td>
                <td :class="
                    stateComparison?.[1]?.[39] > stateComparison?.[1]?.[38]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[1]?.[39] }}
                </td>
              </tr>
              <tr>
                <td :class="
                    stateComparison?.[0]?.[40] > stateComparison?.[0]?.[41]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[0]?.[40] }}
                </td>
                <td>
                  <b>{{ $t('Red card') }}</b>
                </td>
                <td :class="
                    stateComparison?.[0]?.[41] > stateComparison?.[0]?.[40]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[0]?.[41] }}
                </td>
                <td :class="
                    stateComparison?.[1]?.[40] > stateComparison?.[1]?.[41]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[1]?.[40] }}
                </td>
                <td>
                  <b>{{ $t('Red card') }}</b>
                </td>
                <td :class="
                    stateComparison?.[1]?.[41] > stateComparison?.[1]?.[40]
                      ? 'red'
                      : ''
                  ">
                  {{ stateComparison?.[1]?.[41] }}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="fx20 posediv content" style="margin-top: 20px">
          <div class="fx-title row">
            <span class="fx-title-name col-4 text-start team-table-xq-home"><span>{{ homeTeamName }}</span>
            </span>
            <span class="fx-title-vs col-4 text-center">{{ $t('Goal scoring rate') }}</span>
            <span class="fx-title-name col-4 text-end team-table-xq-away"><span>{{ awayTeamName }}</span>
            </span>
          </div>
          <div class="team-bg-h1">
            <span class="home-bg"></span>
            <span class="away-bg"></span>
          </div>
          <div class="fx-tab2">
            <span>
              <div id="lastMatchBtn1" class="lastMatchBtn" :class="{
                  'fx-tab2-on': activeSectionTable === 'ThirtyrateOfScored',
                }" @click="setActiveSectionTable('ThirtyrateOfScored')">
                {{ $t('Recent 20') }}
              </div>
              <!-- <div id="lastMatchBtn2" class="lastMatchBtn" :class="{ 'fx-tab2-on': activeSectionTable === 'FiftyrateOfScored' }" @click="setActiveSectionTable('FiftyrateOfScored')">50 trận gần nhất</div> -->
            </span>
          </div>
          <div class="fx-tab row">
            <div class="coredBtn col-12">
              <div id="hScoredBtn1" class="fx-tab-on">{{ $t('Goal') }}</div>
            </div>
            <!-- <div class="coredBtn col-6"><div id="gScoredBtn1" class="gScoredBtn fx-tab-on2">Mất bàn</div></div> -->
          </div>
          <div id="rateOfScored1" class="rateOfScored ThirtyrateOfScored row"
            v-if="activeSectionTable === 'ThirtyrateOfScored'">
            <template v-for="(value, index) in matchesAnalysis?.home_shoot_time?.[0]" :key="index">
              <div class="fx-comparision missComp col-12 col-md-6">
                <ul class="fx-data-left">
                  <li class="hScoredLi hScoredLi2">
                    <span class="fx-c-l home-bg" :style="
                        'width:' +
                        (
                          (parseFloatO(value) * 100) /
                          shootTime?.['sumHome']
                        ).toFixed(0) +
                        '%'
                      "></span>
                    <span class="fx-c2">{{
                      shootTime?.['sumHome'] > 0 ? (
                      (parseFloatO(value) * 100) /
                      shootTime?.["sumHome"]
                      ).toFixed(0) : ''
                      }}</span>
                  </li>
                </ul>
                <span class="fx-c-3" v-if="index === 4">
                  <span>41~45</span>
                </span>
                <span class="fx-c-3" v-else-if="index === 5">
                  <span>46~50</span>
                </span>
                <span class="fx-c-3" v-else>
                  <span v-if="index < 4">{{ 10 * index + 1 }}~{{ 10 * (index + 1) }}</span>
                  <span v-else="index > 4">{{ 10 * (index - 1) + 1 }}~{{ 10 * index }}</span>
                </span>
                <ul class="fx-data-right">
                  <li class="gScoredLi gScoredLi2">
                    <span class="fx-c-r away-bg" :style="
                        'width:' +
                        (
                          (parseFloatO(
                            matchesAnalysis?.away_shoot_time?.[0]?.[index]
                          ) *
                            100) /
                          shootTime?.['sumAway']
                        ).toFixed(0) +
                        '%'
                      "></span>
                    <span class="fx-c2">
                      {{
                      shootTime?.["sumAway"] > 0 ? (matchesAnalysis?.away_shoot_time?.[0]?.[index] ? (
                      (parseFloatO(
                      matchesAnalysis?.away_shoot_time?.[0]?.[index]
                      ) *
                      100) /
                      shootTime?.["sumAway"]
                      ).toFixed(0) : '') : ''
                      }}</span>
                  </li>
                </ul>
              </div>
            </template>
          </div>
          <div style="clear: both"></div>
        </div>
      </div>
    </div>

    <div id="content-page" class="mt-5">
      <h1 class="page_title" v-if="matchTitle">{{ matchTitle }}</h1>
      {{ matchContent }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { generateMetaSeo } from "~/utils/livescore_helper";
import { socketStore } from '@/stores/wsocket'
import { useMatchStore } from '@/stores/useMatchStore'
import { systemsStore } from '~/stores/systems'
import 'lazysizes';
import { useWindowScroll } from '@vueuse/core'
const { $isMobile } = useNuxtApp()
const storeSystems = systemsStore()
const availableStreamUrl = getConfig(storeSystems?.configurations, 'available_stream_url');
const { y } = useWindowScroll()
const showAnimation = ref(false)
const keyEncode = ref('');
const { useLocale, $t, $trouter } = useShareCommon()

const fetchKeyEncode = () => {
  // const script = document.createElement('script');
  // script.src = 'https://stats.ultraffic.info/js/script.js?ver=1.0.1';
  // script.onload = () => {
  //   keyEncode.value = window.dec_spdb || '';
  // };
  // document.head.appendChild(script);

  keyEncode.value = dec_spdb;
};
onMounted(() => {
  fetchKeyEncode();
});

const socket = socketStore()
const matchStore = useMatchStore()
const route = useRoute();
// const { isMobile } = useDevice();
const ODD_COMPANY_SBOBET = 13; //31 - isport
const activeSectionTable = ref("ThirtyrateOfScored");
const iconsVisible = ref(false);
const activeSection = ref("lineup");
const matchLiveDetail = ref([]);
const matchLiveDetailIncidents = ref([])
const matchsRecentDetail = ref([]);
const matchOddsCorner = ref([]);
const oddsDetail = ref();
const oddsOverUnderDetail = ref()
const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
const oddCompanyIsportSelected = computed(() => {
  const oddCompany = ODD_COMPANYS.find(({ id }) => id === oddCompanySelected.value)
  return oddCompany?.isportsapi
})
const oddCompanyIsport = ref(oddCompanyIsportSelected)
const lineupDataList = ref();
const isLoadingData = ref(false);
const matchIdSlug = ref(route?.params?.id || "");
const matchRecentResult = ref([]);
const stateComparison = ref([]);
const matchesAnalysis = ref([]);
const oddsDetailResDataHistories = ref([])
const oddsDetailHistories = ref([])
const detailMobileOddHistories = ref([])
const oddsDetailHistoriesLength  = ref()
const detailHfSel = ref(1)
const oddCompanys = ref([])
ODD_COMPANYS.forEach((item) => {
  // List company
  oddCompanys.value[item?.id] = item
});
const detailMobileOddOverUnderHistories = ref([])

const staticTab = ref(10)

const is_flash = ref(true)
const is_eventDetail = ref(true)
const is_e1_1 = ref(true)
const is_e2_1 = ref(true)
const is_e5_1 = ref(true)
const is_e7_1 = ref(true)
const is_e8_1 = ref(true)
const is_e10_1 = ref(true)
const swTabs_21 = ref(13)
const swTabs_22 = ref(13)

const eventSocketData = ref()

const breakpoint = 768;
const wrapperClass = 'tr-wrapper';
const productSelectorClass = 'product-selector';
const tooltipClass = 'tr-tooltip';
const activeClass = 'active';
const selectedProduct = ref('product-1');
const isMobileView = ref(false);
const mobileContents = ref<string[]>([]);
const table = ref<HTMLElement | null>(null);
const tableWrapper = ref<HTMLElement | null>(null);
// Get data from cookie
const settingsData = useCookie<any>('settingsData')
const timeZone = ref(getConfig(storeSystems?.configurations, 'TIMEZONE') || settingsData?.value?.timeZone);
const matchTitle = defineModel('matchTitle')
const matchContent = defineModel('matchContent')
const initDataMatch = defineModel('initDataMatch')

const emit = defineEmits<{
  (e: 'socketData', data: any): void
}>()

const chooseStaticTab = (val) => {
  staticTab.value = val
}

function switchSection(section) {
  activeSection.value = section;
}
function setActiveSectionTable(table) {
  activeSectionTable.value = table;
}

watch(
  () => route.path,
  (newPath) => {
    matchIdSlug.value = route?.params?.id || "";
  },
  { immediate: true }
);

const lineup = reactive({ home: [], away: [] });
const lineBackup = reactive({ home: [], away: [] });
const isBackupPlayVisible = ref(false);
const toggleBackupPlay = () => {
  isBackupPlayVisible.value = !isBackupPlayVisible.value;
};
const homeTeamName = computed(
  () => matchsRecentDetail.value.match?.home_team?.name || ""
);
const awayTeamName = computed(
  () => matchsRecentDetail.value.match?.away_team?.name || ""
);
const homeFormation = computed(
  () => lineupDataList.value?.home_formation || ""
);
const awayFormation = computed(
  () => lineupDataList.value?.away_formation || ""
);

const liveStream = computed(
  () => matchsRecentDetail.value.match?.match_info?.variable_stream || false
);

const matchIdLive = computed(
  () => matchsRecentDetail.value.match?.id || ""
);

const shootTime = ref([]);

const oddCompanyName = ref()
const oddCompanyId = ref()
const showOddsPopup = ref(false)

const openModalDetailChange = async (companyId, companyName) => {
  oddCompanyId.value = companyId
  oddCompanyName.value = companyName

  await fetchOddsChangeHistory(companyId)
  statedetailwin.modal_detail_win.show();
}

const closeCorner = () => {
  showOddsPopup.value = false;
}

const oddTypeSelected = ref()
const companyIdoddTypeSelected = ref()
const oddTypeSelectedLab = ref('')

const handleClickHistory = async(val, companyId) => {
  oddTypeSelected.value = val
  companyIdoddTypeSelected.value = companyId
  showOddsPopup.value = true;

  switch(val) {
    case 'handicap':
      oddTypeSelectedLab.value = 'Châu Á'
      break;
    case 'overUnder':
      oddTypeSelectedLab.value = 'Tài xỉu'
      break;
    case 'europeOdds':
      oddTypeSelectedLab.value = '1X2'
      break;
    case 'cornertx':
      oddTypeSelectedLab.value = 'Phạt góc T/X'
      break;
    case 'correctScore':
      oddTypeSelectedLab.value = 'Điểm số chính xác'
      break;
    case 'euroHandicap':
      oddTypeSelectedLab.value = 'Euro Handicap'
      break;
    case 'doubleChance':
      oddTypeSelectedLab.value = 'Cơ hội kép'
      break;
    default:
      oddTypeSelectedLab.value = ' '
  }
}

const fetchMatchLineup = async () => {
  isLoadingData.value = true;
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.MATCHS_LINEUP + "/" + matchIdSlug.value
  ).then((resData) => {
    lineupDataList.value = resData;

    lineup.home =
      lineupDataList.value?.lineup?.home.filter(
        (player) => player.x !== 0 && player.y !== 0
      ) ?? [];
    lineup.away =
      lineupDataList.value?.lineup?.away.filter(
        (player) => player.x !== 0 && player.y !== 0
      ) ?? [];
    lineBackup.home =
      lineupDataList.value?.lineup?.home.filter(
        (player) => player.x === 0 && player.y === 0
      ) ?? [];
    lineBackup.away =
      lineupDataList.value?.lineup?.away.filter(
        (player) => player.x === 0 && player.y === 0
      ) ?? [];
    activeSection.value =
      lineup?.home?.length === 0 && lineup?.away?.length === 0
        ? "animation"
        : "lineup";
    setTimeout(() => {
      isLoadingData.value = false;
    }, 500);
  });
};

const getPlayerStyle = (player, teamType) => {
  if (teamType === "home") {
    return { bottom: player.x - 10 + "%", left: player.y - 10 + "%" };
  } else if (teamType === "away") {
    return { top: player.x - 10 + "%", right: player.y - 10 + "%" };
  }
  return {};
};

const getPlayerStyleMobile = (player, teamType) => {
  if (teamType === "home") {
    return { 
      position: "absolute",
      left: player.x - 10 + "%", 
      top: player.y - 10 + "%" 
    };
  } else if (teamType === "away") {
    return { 
      position: "absolute",
      left: player.x - 10 + "%", 
      bottom: player.y - 10 + "%" 
    };
  }
  return { position: "absolute" };
};


const fetchMatchsLiveDetail = async () => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.MATCHS_LIVE_DETAIL + "/" + matchIdSlug.value
  ).then((resData) => {
    if (resData) {
      matchLiveDetail.value = resData;
      matchLiveDetailIncidents.value = resData?.incidents?.reverse() || []
    }
   
    // const i_match_id = resData?.match?.i_match_id;
    // if (i_match_id) {
    //     fetchOddsDetail(matchIdSlug.value, oddCompanySelected.value);
    //     fetchOddsCorner(matchIdSlug.value);
    // }
  });
};

const fetchMatchRecentResult = async (match) => {
  if (!match?.stage?.season_id)
    return
  await useApiLiveScore(API_ROUTERS.LIVESCORE.MATCH_RECENT_RESULT, {
    season_id: match?.stage?.season_id,
  }).then((resData) => {
    if (resData) {
      const data = resData?.results?.filter((match) => match?.status === "8");
      const matchsListArray: any[] = [];
      Object.values(data).map((item) => {
        matchsListArray.push(item);
      });

      const homeRecent = matchsListArray?.filter((item) => {
        return (
          item?.home_team_id === match?.home_team?.id ||
          item?.away_team_id === match?.home_team?.id
        );
      });
      const awayRecent = matchsListArray?.filter((item) => {
        return (
          item?.home_team_id === match?.away_team?.id ||
          item?.away_team_id === match?.away_team?.id
        );
      });

      matchRecentResult.value.home = getRecentResultStat(
        homeRecent,
        match?.home_team?.id
      );
      matchRecentResult.value.away = getRecentResultStat(
        awayRecent,
        match?.away_team?.id
      );
    }
  });
};

const fetchOddsDetail = async (
  match_id,
  company_id
) => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL, {
    match_id: match_id,
    i_company_id:  ODD_COMPANYS?.find(item => item?.id === company_id)?.isportsapi,
  }).then((resData) => {
    oddsDetail.value = resData;
  });
};

const fetchOddsOverUnderDetail = async (
  match_id,
  company_id
) => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_DETAIL, {
    match_id: match_id,
    i_company_id:  ODD_COMPANYS?.find(item => item?.id === company_id)?.isportsapi,
  }).then((resData) => {
    oddsOverUnderDetail.value = resData;
  });
};

const fetchOddsCorner = async (match_id) => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_CORNER_MAIN, {
    match_id: match_id,
  }).then((resData) => {
    matchOddsCorner.value = resData?.data;
  });
};

const fetchMatchesAnalysis = async (match_id) => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.MATCHES_ANALYSIS + "?match_id=" + match_id
  ).then((resData) => {
    matchesAnalysis.value = getDataObject(resData?.results?.[0]);
    stateComparison.value = [
      getStateComparison(
        matchesAnalysis.value?.home_last_matches,
        matchesAnalysis.value?.away_last_matches,
        matchsRecentDetail.value?.match?.home_team?.i_team,
        matchsRecentDetail.value?.match?.away_team?.i_team,
        matchsRecentDetail.value?.match?.i_competition_id,
        3, 
        $t
      ),
      getStateComparison(
        matchesAnalysis.value?.home_last_matches,
        matchesAnalysis.value?.away_last_matches,
        matchsRecentDetail.value?.match?.home_team?.i_team,
        matchsRecentDetail.value?.match?.away_team?.i_team,
        matchsRecentDetail.value?.match?.i_competition_id,
        10,
        $t
      ),
    ];

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

const fetchMatchsRecentDetail = async (matchIdSlug) => {
  // await useApiLiveScore(
  //   API_ROUTERS.LIVESCORE.MATCHS_RECENT_DETAIL + "?match_id=" + matchIdSlug
  // ).then(async (resData) => {
  //   if (!resData || resData?.length === 0) {
  //     return navigateTo(ROUTERS.HOMEPAGE, { replace: true })

      /*
      useSeoMeta({
        title: 'Trang không tồn tại',
        ogTitle: 'Trang không tồn tại'
      })
      
      showError({
        statusCode: 404,
        statusMessage: "Trận đấu không tồn tại!"
      })
        */
    // }
    let resData = initDataMatch.value
    matchsRecentDetail.value.match = resData?.[0];
    const i_match_id = resData?.[0]?.i_match_id;

    // await fetchObjectMeta(matchIdSlug)

    await fetchMatchesAnalysis(matchIdSlug);
    // await fetchSeasonsTable(resData?.[0]?.stage?.season_id)
    // await fetchMatchRecentResult(resData?.[0])
  // });
};

const reduceOddChangeHistory = () => {
  const detailOddHistories = []
    let scoreKey = '0:0'
    // https://www.isportsapi.com/docs.html?id=73
    const inplay_key = detailHfSel.value == 1 ? 'inplay' : 'inplay_haft'
    // Handicap
    const hadicapList =  oddsDetailResDataHistories.value?.[inplay_key]?.filter((item) => (item?.type === 1))?.reverse()
    hadicapList?.forEach((item, index) => {
      if(((item?.home_score + ':' + item?.away_score) != scoreKey) || (item?.match_time === 'HT' && !detailOddHistories?.includes('key_45_1'))) {
        const key = item?.match_time === 'HT' ? 'key_45_1' : 'key_' + item?.match_time
        detailOddHistories[key] = [
          item?.match_time, item?.home_score, item?.away_score, 
          hadicapList?.[index-1]?.odds1, hadicapList?.[index-1]?.odds2, hadicapList?.[index-1]?.odds3,
          item?.odds1, item?.odds2, item?.odds3]
      }
      scoreKey = item?.home_score + ':' + item?.away_score
    })
    // Tài xỉu 
    scoreKey = '0:0'
    const overUnderList = oddsDetailResDataHistories.value?.[inplay_key]?.filter((item) => (item?.type === 2))?.reverse()
    overUnderList?.forEach((item, index) => {
      if(((item?.home_score + ':' + item?.away_score) != scoreKey) || (item?.match_time === 'HT' && !detailOddHistories?.includes('key_45_1'))) {
        const key = item?.match_time === 'HT' ? 'key_45_1' : 'key_' + item?.match_time
        if (!detailOddHistories?.[key]) {
          detailOddHistories[key] = []
        }
        detailOddHistories[key][0] = item?.match_time
        detailOddHistories[key][1] = item?.home_score
        detailOddHistories[key][2] = item?.away_score
        // 9 ->
        detailOddHistories[key][9] = overUnderList?.[index-1]?.odds1, 
        detailOddHistories[key][10] = overUnderList?.[index-1]?.odds2, 
        detailOddHistories[key][11] = overUnderList?.[index-1]?.odds3,
        detailOddHistories[key][12] = item?.odds1
        detailOddHistories[key][13] = item?.odds2
        detailOddHistories[key][14] = item?.odds3
      }
      scoreKey = item?.home_score + ':' + item?.away_score
    })
    // 1x2
    scoreKey = '0:0'
    const euroHandicapList =  oddsDetailResDataHistories.value?.[inplay_key]?.filter((item) => (item?.type === 4))?.reverse()
    euroHandicapList?.forEach((item, index) => {
      if(((item?.home_score + ':' + item?.away_score) != scoreKey) || (item?.match_time === 'HT' && !detailOddHistories?.includes('key_45_1'))) {
        const key = item?.match_time === 'HT' ? 'key_45_1' : 'key_' + item?.match_time
        if (!detailOddHistories?.[key]) {
          detailOddHistories[key] = []
        }
        detailOddHistories[key][0] = item?.match_time
        detailOddHistories[key][1] = item?.home_score
        detailOddHistories[key][2] = item?.away_score

        // 9 ->
        detailOddHistories[key][15] = euroHandicapList?.[index-1]?.odds1, 
        detailOddHistories[key][16] = euroHandicapList?.[index-1]?.odds2, 
        detailOddHistories[key][17] = euroHandicapList?.[index-1]?.odds3,
        detailOddHistories[key][18] = item?.odds1
        detailOddHistories[key][19] = item?.odds2
        detailOddHistories[key][20] = item?.odds3
      }
      scoreKey = item?.home_score + ':' + item?.away_score
    })

    oddsDetailHistories.value = detailOddHistories
    oddsDetailHistoriesLength.value = Object.keys(oddsDetailHistories.value)?.length
}

const detailMobileOddHadicapHistories = ref([])
const reduceMobileOddChangeHistory = (company_id) => {
  const detailOddHistories = []
  detailOddHistories[company_id] = []
  detailOddHistories[company_id]['hadicap'] = []

  let scoreKey = '0:0'
  const inplay_key = 'inplay'
  // Handicap
  const hadicapList =  oddsDetailResDataHistories.value?.[inplay_key]?.filter((item) => (item?.type === 1))?.reverse()
  hadicapList?.forEach((item, index) => {
    if(((item?.home_score + ':' + item?.away_score) != scoreKey) || (item?.match_time === 'HT' && !detailOddHistories?.includes('45_1'))) {
      const key = item?.match_time === 'HT' ? '45_1' : item?.match_time
      detailOddHistories[company_id]['hadicap'][key] = [
        item?.match_time, item?.home_score, item?.away_score,
        hadicapList?.[index-1]?.odds1, hadicapList?.[index-1]?.odds2, hadicapList?.[index-1]?.odds3,
        item?.odds1, item?.odds2, item?.odds3
      ]
    }
    scoreKey = item?.home_score + ':' + item?.away_score
  })

  detailMobileOddHadicapHistories.value = detailOddHistories[company_id]['hadicap']
}

const reduceMobileOddOverUnderChangeHistory = (company_id) => {
  const detailOddHistories = []
  detailOddHistories[company_id] = []
  detailOddHistories[company_id]['overUnder'] = []

  let scoreKey = '0:0'
  const inplay_key = 'inplay'
  // Tài xỉu
  scoreKey = '0:0'
  const overUnderList = oddsDetailResDataHistories.value?.[inplay_key]?.filter((item) => (item?.type === 2))?.reverse()
  overUnderList?.forEach((item, index) => {
    if(((item?.home_score + ':' + item?.away_score) != scoreKey) || (item?.match_time === 'HT' && !detailOddHistories?.includes('45_1'))) {
      const key = item?.match_time === 'HT' ? '45_1' : item?.match_time

      detailOddHistories[company_id]['overUnder'][key] = [
        item?.match_time, item?.home_score, item?.away_score,
        overUnderList?.[index-1]?.odds1, overUnderList?.[index-1]?.odds2, overUnderList?.[index-1]?.odds3,
        item?.odds1, item?.odds2, item?.odds3
      ]
    }
    scoreKey = item?.home_score + ':' + item?.away_score
  })

  detailMobileOddOverUnderHistories.value = detailOddHistories[company_id]['overUnder']
}


const fetchOddsChangeHistory = async (company_id) => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_CHANGE_HISTORY, {
      match_id: matchIdSlug.value,
      i_company_id: ODD_COMPANYS?.find(item => item?.id === company_id)?.isportsapi,
  }).then(resData => {
    oddsDetailResDataHistories.value = resData?.data
    //if (!isMobile) {
      reduceOddChangeHistory()
    // } else {
    //   reduceMobileOddChangeHistory(company_id)
    // }
  })
}

const fetchOddsOverUnderChangeHistory = async (company_id) => {
  await useApiLiveScore(API_ROUTERS.LIVESCORE.ODDS_CHANGE_HISTORY, {
      match_id: matchIdSlug.value,
      i_company_id: ODD_COMPANYS?.find(item => item?.id === company_id)?.isportsapi,
  }).then(resData => {
    oddsDetailResDataHistories.value = resData?.data

    reduceMobileOddOverUnderChangeHistory(company_id)
  })
}

const fetchObjectMeta = async () => {
  try {
    await useFetch<any>(createUrl(API_ROUTERS.OBJECTS_META.DETAIL + "/" + matchIdSlug.value, {
      query: {
        type: 'match',
        tab: 'detail',
      },
    })).then((resData) => {
      let title = resData?.data?._value?.title
      let description = resData?.data?._value?.meta_description
      if (!title || title == '') {
        title = getConfig(storeSystems.configurations, 'MATCH_TITLE_DETAIL') ? getConfig(storeSystems.configurations, 'MATCH_TITLE_DETAIL') : getConfig(storeSystems.configurations, 'SEO_META_TITLE')
        title = generateMetaSeo(title, homeTeamName?.value, awayTeamName?.value, matchsRecentDetail.value.match?.match_time, timeZone.value, matchsRecentDetail.value.match?.competition?.name)
      }
      if (!description || description == '') {
        description = getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_DETAIL') ? getConfig(storeSystems.configurations, 'MATCH_DESCRIPTION_DETAIL') : getConfig(storeSystems.configurations, 'SEO_META_DESCRIPTION')
        description = generateMetaSeo(description, homeTeamName?.value, awayTeamName?.value, matchsRecentDetail.value.match?.match_time, timeZone.value, matchsRecentDetail.value.match?.competition?.name)
      }
      let keyword = resData?.data?._value?.keyword
      if (!keyword || keyword == '') {
        keyword = getConfig(storeSystems.configurations, 'MATCH_KEYWORD_DETAIL') ? getConfig(storeSystems.configurations, 'MATCH_KEYWORD_DETAIL') : ''
        keyword = generateMetaSeo(keyword, homeTeamName?.value, awayTeamName?.value, matchsRecentDetail.value.match?.match_time, timeZone.value, matchsRecentDetail.value.match?.competition?.name)
      }

      let content = resData?.data?._value?.content
      if (!content || content == '') {
        content = getConfig(storeSystems.configurations, 'MATCH_CONTENT_DETAIL') ? getConfig(storeSystems.configurations, 'MATCH_CONTENT_DETAIL') : ''
        content = generateMetaSeo(content, homeTeamName?.value, awayTeamName?.value, matchsRecentDetail.value.match?.match_time, timeZone.value, matchsRecentDetail.value.match?.competition?.name)
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

watch(
  detailHfSel,
  () => {
    reduceOddChangeHistory()
  },
  { immediate: true }
)

watch(
  oddCompanySelected,
  () => {
    const company = ODD_COMPANYS.find(({ id }) => id === oddCompanySelected.value)
    oddCompanyIsport.value = company?.thesports

    fetchOddsChangeHistory(oddCompanySelected.value)
  },
  { immediate: true }
)

// watch(
//     swTabs_21,
//     () => {
//         fetchOddsDetail(matchIdSlug.value, swTabs_21.value)
//         fetchOddsChangeHistory(swTabs_21.value)
//     },
//     { immediate: true }
// )

watch(
    swTabs_22,
    () => {
        fetchOddsOverUnderDetail(matchIdSlug.value, swTabs_22.value)
        fetchOddsOverUnderChangeHistory(swTabs_22.value)
    },
    { immediate: true }
)

// Socket data
const wssMatch = (socketData: any) => {
  if (socketData) {
    try {
      const wssItem = socketData
      eventSocketData.value = wssItem
      emit('socketData', wssItem)
      if (wssItem.topic == 'livescore/football/iodds_corner/v1') {
        // KÈO GÓC TX
        const matchOdds = wssItem.payload.inplay;
        if (matchOdds) {
          for (const matchOdd of matchOdds) {
            const companyId = matchOdd?.companyId;
            
            if (matchOdd?.matchId == matchsRecentDetail.value?.match?.i_match_id && companyId == ISPORT_COMPANY_DEFAULT) {
              if (!matchOddsCorner.value?.corner) {
                matchOddsCorner.value.corner = []
              }
              matchOddsCorner.value.corner.live_older = matchOddsCorner.value?.corner?.live ? JSON.parse(JSON.stringify(matchOddsCorner.value.corner.live)) : []
              matchOddsCorner.value.corner.live = [{
                i_company_id: companyId,
                over: matchOdd?.odds?.over,
                total_corners: matchOdd?.odds?.totalCorners,
                under: matchOdd?.odds?.under
              }]
            }
          }
        }
      } else if (wssItem.topic == 'livescore/football/iodds_hdc_corner/v1') {
        // KÈO GÓC HDC
        const matchOdds = wssItem.payload.inplay;
        if (matchOdds) {
          for (const matchOdd of matchOdds) {
            const companyId = matchOdd?.companyId;
            
            // for bET365
            if (matchOdd?.matchId == matchsRecentDetail.value?.match?.i_match_id && companyId == ISPORT_COMPANY_DEFAULT) {
              if (!matchOddsCorner.value?.hadicap) {
                matchOddsCorner.value.hadicap = []
              }
              const hadicap = matchOddsCorner.value.hadicap?.[0]
              if (hadicap) {
                hadicap.inplay_older = hadicap?.inplay ? JSON.parse(JSON.stringify(hadicap?.inplay)) : []
                hadicap.inplay = "['" + matchOdd?.odds?.handicapCorners + "','" +  matchOdd?.odds?.home + "','" +  matchOdd?.odds?.away + "']"
              }
            }
          }
        }
      } else if (wssItem.payload?.iodds) {
        // ODDS
        const matchOdds = wssItem.payload.iodds;
        const keyList = Object.keys(oddsDetailHistories.value).sort()
        const lengthKeyList = keyList?.length
        const lastElementHistory = oddsDetailHistories.value[keyList[lengthKeyList-1]]
        if (lastElementHistory) {
          // Handicap
          if (matchOdds?.handicap) {
            for (const matchOdd of matchOdds.handicap) {
              const matchId = parseIntO(getValueByPosition(matchOdd, 0));
              const companyId = getValueByPosition(matchOdd, 1);
              if (parseInt(companyId) == parseInt(oddCompanyIsport.value) && (matchId == matchsRecentDetail.value?.match?.i_match_id)) {
                lastElementHistory[6] = getValueByPosition(matchOdd, 3)
                lastElementHistory[7] = getValueByPosition(matchOdd, 2)
                lastElementHistory[8] = getValueByPosition(matchOdd, 4)
              }
            }
          }
          // overUnder
          if (matchOdds?.overUnder) {
            for (const matchOdd of matchOdds.overUnder) {
              const matchId = parseIntO(getValueByPosition(matchOdd, 0));
              const companyId = getValueByPosition(matchOdd, 1);
              if (parseInt(companyId) == parseInt(oddCompanyIsport.value) && (matchId == matchsRecentDetail.value?.match?.i_match_id)) {
                lastElementHistory[12] = getValueByPosition(matchOdd, 2)
                lastElementHistory[13] = getValueByPosition(matchOdd, 3)
                lastElementHistory[14] = getValueByPosition(matchOdd, 4)
              }
            }
          }
          // europeOdds
          if (matchOdds?.europeOdds) {
            for (const matchOdd of matchOdds.europeOdds) {
              const matchId = parseIntO(getValueByPosition(matchOdd, 0));
              const companyId = getValueByPosition(matchOdd, 1);
              if (parseInt(companyId) == parseInt(oddCompanyIsport.value) && (matchId == matchsRecentDetail.value?.match?.i_match_id)) {
                lastElementHistory[18] = getValueByPosition(matchOdd, 2)
                lastElementHistory[19] = getValueByPosition(matchOdd, 3)
                lastElementHistory[20] = getValueByPosition(matchOdd, 4)
              }
            }
          }
        }
      } else if (wssItem.payload) {
        // Tỷ số, thẻ, phạt góc,..
        const matchScores = wssItem.payload;
        for (const match of matchScores) {
          const matchId = match.id;
         
          if (matchLiveDetail.value?.match?.id == matchId && match?.score) {
            if(matchLiveDetail.value.match.home_scores[0] !=  match?.score?.[2]?.[0]) {
              setTimeout(()=> {
                fetchMatchsLiveDetail(matchIdSlug.value);
              }, 60000)
            }
            if(matchLiveDetail.value.match.away_scores[0] !=  match?.score?.[3]?.[0]) {
              setTimeout(()=> {
                fetchMatchsLiveDetail(matchIdSlug.value);
              }, 60000)
            }
            matchLiveDetail.value.match.home_scores[0] = match?.score?.[2]?.[0]
            matchLiveDetail.value.match.away_scores[0] = match?.score?.[3]?.[0]
          }
        }
      }
    }
    catch (e: any) {
      return false
    }
  }
}

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
      (th as HTMLElement).setAttribute('colspan', '2');
    });
    selectProduct(selectedProduct.value);
  }
};

const selectProduct = (product: string) => {
  selectedProduct.value = product;
  if (!table.value) return;
  table.value.querySelectorAll('[data-product]').forEach(td => {
    (td as HTMLElement).style.display = 'none';
  });
  table.value.querySelectorAll(`[data-product="${product}"]`).forEach(td => {
    (td as HTMLElement).style.display = 'table-cell';
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
    const product = `product-${index + 1}`;
    th.setAttribute('data-product', product);
    table.value.querySelectorAll(`tbody td:nth-child(${index + 2})`).forEach(td => {
      td.setAttribute('data-product', product);
    });
    const mobileContent = th.getAttribute('data-mobile-content') || th.textContent;
    mobileContents.value.push(mobileContent || '');
  });
};

const onResize = () => {
  clearTimeout((onResize as any).resizeTimeout);
  (onResize as any).resizeTimeout = setTimeout(updateColspan, 50);
};

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

watch([detailHfSel, oddCompanySelected], () => {
  nextTick(() => {
    selectProduct(selectedProduct.value);
    updateColspan();
  }) 
});

watch(isMobileView, () => {
  updateColspan();
  selectProduct(selectedProduct.value);
});

watch(
  matchStore,
  () => {
    wssMatch(matchStore?.socketData)
}, { deep: true, immediate: true })

watch(
  y,
  () => {
    if (y.value > 0) {
      showAnimation.value = true
    }
}, { deep: true, immediate: true })

await fetchMatchsRecentDetail(matchIdSlug.value);
fetchMatchRecentResult(matchIdSlug.value);
fetchMatchsLiveDetail(matchIdSlug.value);
fetchOddsDetail(matchIdSlug.value, oddCompanySelected.value);
fetchOddsCorner(matchIdSlug.value);
fetchMatchLineup();
fetchOddsChangeHistory(oddCompanySelected.value)
// if (isMobile) {
//   fetchOddsOverUnderDetail(matchIdSlug.value, oddCompanySelected.value);
//   fetchOddsOverUnderChangeHistory(oddCompanySelected.value)
// }

onMounted(async() => {
  nextTick(()=> {
    updateColspan();
    initProductSelector();
    initTooltips();
    handleFeaturedColumns();
    window.addEventListener('resize', onResize);
  })
})

</script>
<style lang="scss" scoped>
.product-selector {
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
.col-4.col-md-4.col-lg-4.text-center.align-self-center {
  color: #333333;
}
.col-4.col-md-4.col-lg-4.text-center.align-self-center:nth-of-type(2) {
  color: rgb(13 110 253 / 74%);
}
.col-6.col-md-6.col-lg-6.text-center.align-self-center.plr-0:nth-of-type(1){
  .row.mlr-0 {
    background-color:#adff2f14;
  }
}
.col-12.text-center.align-self-center.bdtable.bg_header1{
  background: $primary;
  color: white;
}
.col-6.col-md-6.col-lg-6.text-center.align-self-center.red_number {
  background: #ffffffcf;
}
</style>