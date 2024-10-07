<template>
  <div >


  <div id="settingPopCtn">
    <div id="popMask"></div>
    <div class="fadeInBottom" id="settingPop">
      <div class="title">
        <span>{{ $t('Settings') }}</span>
        <div class="close_b" @click="showSetting = false"></div>
      </div>
      <div class="info">
        <ul>
          <li>
            <div class="name">{{ $t('Match order') }}</div>
            <ul class="setList" id="set_order">
              <li class="chose" :class="orderByTime ? 'on' : ''" @click="orberBy()">
                <span class="ro"></span>{{ $t('Time order') }}
              </li>
              <li class="chose" :class="!orderByTime ? 'on' : ''" @click="orberBy()">
                <span class="ro"></span>{{ $t('League order') }}
              </li>
            </ul>
          </li>
          <li style="">
            <div class="name">{{ $t('Bookmaker company') }}</div>
            <span id="displayCompany" class="selectLabel cursor-pointer" @click="showModalCompBet">{{$t(oddCompanyNameSelected)}}</span>
            <i class="more"></i>
          </li>
          <li style="" v-show="routerUrl === ROUTERS_OLD.HOMEPAGE || routerUrl === ROUTERS_OLD.FOOTBALL_RESULT || routerUrl === ROUTERS_OLD.FOOTBALL_SCHEDULE">
            <div class="name">{{ $t('Select league') }}</div>
            <span id="displayCompany" class="selectLabel cursor-pointer" @click="$emit('showFilterLeague')">{{ $t('Choose') }}</span>
            <i class="more"></i>
          </li> 
          <li id="os_li" style="">
            <div class="name">{{ $t('Show TL') }}</div>
            <ul class="setList" id="set_Odds">
              <li class="chose" :class="isShowOddsTX ? 'on' : ''" @click="isShowOddsTX = !isShowOddsTX">
                {{ $t('Over/Under') }}
              </li>
              <li class="chose" :class="isShowOdds1X2 ? 'on' : ''" @click="isShowOdds1X2 = !isShowOdds1X2">
                {{ $t('1x2') }}1x2
              </li>
              <li class="chose" :class="isShowOddsHDP ? 'on' : ''" @click="isShowOddsHDP = !isShowOddsHDP">
                {{ $t('HDP') }}
              </li>
            </ul>
          </li>
          <li>
            <div class="name">{{ $t('Show page') }}</div>
            <ul class="setList" id="set_pShow">
              <li class="chose" :class="isShowCardRed ? 'on' : ''" @click="isShowCardRed = !isShowCardRed">
                {{ $t('Red card') }}
              </li>
              <li class="chose" :class="isShowCardYellow ? 'on' : ''" @click="isShowCardYellow = !isShowCardYellow">
                {{ $t('Yellow card') }}
              </li>
              <li class="chose" :class="isShowRanking ? 'on' : ''" @click="isShowRanking = !isShowRanking">
                {{ $t('Ranking') }}
              </li>
            </ul>
          </li>
          <li class="subtitle">{{ $t('Show notification') }}</li>
          <li>
            <div class="name"></div>
            <ul class="setList" id="set_pShow">
              <li class="chose" @click="checkSettingType(1)" :class="settingType === 1 ? 'on' : ''">
                {{ $t('Favorites') }}
              </li>
              <li class="chose" @click="checkSettingType(0)" :class="settingType === 0 ? 'on' : ''">
                {{ $t('All') }}
              </li>
            </ul>
          </li>
          <li>
            <div class="name"></div>
            <ul class="setList" id="set_pShow">
              <li class="chose" :class="isShowRedWindow ? 'on' : ''" @click="isShowRedWindow = !isShowRedWindow">
                {{ $t('Red card window') }}
              </li>
              <li class="chose" :class="isShowGoalWindow ? 'on' : ''" @click="isShowGoalWindow = !isShowGoalWindow">
                {{ $t('Goal window') }}
              </li>
            </ul>
          </li>
          <li class="subtitle">{{ $t('Sound') }}</li>
          <li>
            <div class="name">{{ $t('Home') }}</div>
            <ul class="setList sound-list" id="set_pShow">
              <li class="chose" :class="soundHome === 4 ? 'on' : ''" @click="CheckSound(4)">
                NO 
              </li>
              <li class="chose" :class="soundHome === 3 ? 'on' : ''" @click="CheckSound(3)">
                &nbsp; 4 &nbsp;
              </li>
              <li class="chose" :class="soundHome === 2 ? 'on' : ''" @click="CheckSound(2)">
                &nbsp; 3 &nbsp; 
              </li>
              <li class="chose" :class="soundHome === 1 ? 'on' : ''" @click="CheckSound(1)">
                &nbsp; 2 &nbsp;
              </li>
              <li class="chose" :class="soundHome === 0 ? 'on' : ''" @click="CheckSound(0)">
                &nbsp; 1 &nbsp;
              </li>
            </ul>
          </li>
          <li>
            <div class="name">{{ $t('Away') }}</div>
            <ul class="setList sound-list" id="set_pShow">
              <li class="chose" :class="soundAway === 4 ? 'on' : ''" @click="CheckSound2(4)">
                NO
              </li>
              <li class="chose" :class="soundAway === 3 ? 'on' : ''" @click="CheckSound2(3)">
                &nbsp; 4 &nbsp;
              </li>
              <li class="chose" :class="soundAway === 2 ? 'on' : ''" @click="CheckSound2(2)">
                &nbsp; 3 &nbsp;
              </li>
              <li class="chose" :class="soundAway === 1 ? 'on' : ''" @click="CheckSound2(1)">
                &nbsp; 2 &nbsp;
              </li>
              <li class="chose" :class="soundAway === 0 ? 'on' : ''" @click="CheckSound2(0)">
                &nbsp; 1 &nbsp;
              </li>
            </ul>
          </li>
          <li v-if="isTurnOnTimeZone" class="subtitle">{{ $t('General Settings') }}</li>
          <li v-if="isTurnOnTimeZone" @click="showModalTimeZone">
            <div class="name">{{ $t('Time zone') }}</div>
            <span id="displayZone" class="selectLabel cursor-pointer">{{ timeZoneLabel || $t('Auto') }}</span><i class="more"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modal_comp_bet" tabindex="-1" aria-labelledby="modal_comp_bet_label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered container">
      <div class="modal-content">
        <div class="modal-header d-none">
          <div class="modal-title" id="modal_comp_bet_label">{{ $t('Select Betting Company') }}</div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div id="setting_popSel">
            <div class="popMask2"></div>
            <div class="fadeInBottom" id="setting_popSel">
              <ul class="selectpop" id="selCompany">
                <li 
                  v-for="(odd_company, index) in ODD_COMPANYS_LIVESCORE" 
                  :key="index"
                  :value="odd_company?.id"
                  :class="oddCompanySelected === odd_company?.id ? 'on' : ''"
                  class="odd_li"
                  @click="selectOddCompany(odd_company?.id)">
                    {{ `${$t(odd_company?.name)}`.toUpperCase() }}
                </li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modal_timezone" tabindex="-1" aria-labelledby="modal_timezone_label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered container">
      <div class="modal-content">
        <div class="modal-header d-none">
          <div class="modal-title" id="modal_timezone_label">{{ $t('Select Time Zone') }}</div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div id="setting_popSel">
          <div class="popMask2"></div>
          <div class="fadeInBottom" id="setting_popSel">
            <ul class="selectpop" id="timeZoneList" >
              <template v-for="(item, key) in TIME_ZONE_LIST" :key="key">
                <li class="odd_li" :value="item?.value" @click="changeTopTimeZone(item?.value)" :class="timeZone ===  item?.value ? 'on' : ''">{{ item?.key }}</li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
import { systemsStore } from '~/stores/systems'
const storeSystems = systemsStore()
const orderByTime = ref(false)
const settingsData = useCookie('settingsData')
const showSetting = defineModel('showSetting')
const routerUrl = useRoute().path
const { useLocale, $t, $trouter } = useShareCommon()

const oddCompanySelected = ref(ODD_COMPANY_DEFAULT);
const oddCompany = ODD_COMPANYS.find(({ id }) => id === ODD_COMPANY_DEFAULT);
const oddCompanyNameSelected = ref(oddCompany?.name);

const isShowOddsHDP = ref(true)
const isShowOddsTX = ref(true)
const isShowOdds1X2 = ref(false)
const isShowCardYellow = ref(true)
const isShowCardRed = ref(true)
const isShowRanking = ref(true)

const settingType = ref(settingsData?.value?.settingType || 1)
const isShowGoalWindow = ref(settingsData?.value?.isShowGoalWindow || true)
const isShowRedWindow = ref(settingsData?.value?.isShowRedWindow || true)
const soundHome = ref (settingsData?.value?.soundHome || 0)
const soundAway = ref (settingsData?.value?.soundAway || 1)

const timeZoneLabel = defineModel('timeZoneLabel')
const timeZone = defineModel('timeZone')

const changeTopTimeZone = (val) => {
  timeZone.value = val
  statefiltercomp.modal_timezone.hide()
}

const isTurnOnTimeZone = computed(()=> {
  try {
    return (String(getConfig(storeSystems?.configurations, 'OPTION_TIMEZONE')).toLowerCase()) === 'true'
  } catch {
    return false
  }
})


const orberBy = () => {
  orderByTime.value = !orderByTime.value
  if (settingsData.value) {
    settingsData.value.orderByTime = orderByTime.value
    useCookie('settingsData').value = JSON.stringify(settingsData.value)
    
  } else {
    useCookie('settingsData').value = JSON.stringify( {
      settingsData: orderByTime.value,
    })
  }
}
const statefiltercomp = reactive({
    modal_comp_bet: null,
    modal_timezone: null
})

const showModalCompBet = () => {
  statefiltercomp.modal_comp_bet.show()
}


const CheckSound = (val) => {
  soundHome.value = val
}

const CheckSound2 = (val) => {
  soundAway.value = val
}

const checkSettingType = (val) => {
  settingType.value = val
}

const showModalTimeZone =async () => {
  statefiltercomp.modal_timezone.show()
}

const selectOddCompany = (val) => {
  oddCompanySelected.value = val
  const oddCompany = ODD_COMPANYS_LIVESCORE.find(({ id }) => id === val)
  oddCompanyNameSelected.value = oddCompany?.name

  statefiltercomp.modal_comp_bet.hide()

  if (settingsData?.value) {
    settingsData.value.oddCompanySelected = val
    useCookie('settingsData').value = JSON.stringify(settingsData.value)
  } else {
    useCookie('settingsData').value = JSON.stringify( {
      oddCompanySelected: val,
    })
  }
}

const setValueByCookie = () => {
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
      const oddCompany = ODD_COMPANYS_LIVESCORE.find(({ id }) => id === oddCompanySelected.value)
      oddCompanyNameSelected.value = oddCompany?.name
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
}


watch(
  timeZone,
  () => {
    timeZoneLabel.value = TIME_ZONE_LIST.find(item => item.value === timeZone.value)?.key
  }
);

onMounted(async()=> {
    await nextTick()
    setTimeout(()=> {
      statefiltercomp.modal_comp_bet = new bootstrap.Modal('#modal_comp_bet', {})
      statefiltercomp.modal_timezone = new bootstrap.Modal('#modal_timezone', {})
    },100)
    setValueByCookie()

    
})


watch(
  ([isShowOddsHDP, isShowOddsTX, isShowOdds1X2, isShowCardYellow, isShowCardRed, isShowRanking, settingType, isShowGoalWindow, isShowRedWindow, soundHome, soundAway, timeZone]),
  () => {
    if (settingsData?.value) {
      settingsData.value.isShowOddsHDP = isShowOddsHDP.value
      settingsData.value.isShowOddsTX = isShowOddsTX.value
      settingsData.value.isShowOdds1X2 = isShowOdds1X2.value
      settingsData.value.isShowCardYellow = isShowCardYellow.value
      settingsData.value.isShowCardRed = isShowCardRed.value
      settingsData.value.isShowRanking = isShowRanking.value
      settingsData.value.timeZone = timeZone.value
      settingsData.value.settingType = settingType.value
      settingsData.value.isShowGoalWindow = isShowGoalWindow.value
      settingsData.value.isShowRedWindow = isShowRedWindow.value
      settingsData.value.soundHome = soundHome.value
      settingsData.value.soundAway = soundAway.value

      useCookie('settingsData').value = JSON.stringify(settingsData.value)
    } else {
      useCookie('settingsData').value = JSON.stringify( {
        isShowOddsHDP: isShowOddsHDP.value,
        isShowOddsTX: isShowOddsTX.value,
        isShowOdds1X2: isShowOdds1X2.value,
        isShowCardYellow: isShowCardYellow.value,
        isShowCardRed: isShowCardRed.value,
        isShowRanking: isShowRanking.value,
        timeZone: timeZone.value,
        settingType: settingType.value,
        isShowGoalWindow: isShowGoalWindow.value,
        isShowRedWindow: isShowRedWindow.value,
        soundHome: soundHome.value,
        soundAway: soundAway.value,
      })
    }
  }
)
</script>

<style lang="scss" scoped>

</style>