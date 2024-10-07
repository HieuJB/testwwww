<template>
  <div class="sub_menu cup">
    <nuxt-link :to="{path: ROUTERS_OLD.LEAGUES + '/' + leagueId, query: { tab: WAREHOUSE_LEAGUE_TAB.SCHEDULE, curSeasonId: props?.curSeasonId }}">
      <span style="" name="0" :class="(tab === WAREHOUSE_LEAGUE_TAB.SCHEDULE || tab === '') ? 'on' : ''" ><i></i>
        {{ $t('Schedule') }}
      </span>
    </nuxt-link>
    <nuxt-link :to="{path: ROUTERS_OLD.LEAGUES + '/' + leagueId, query: { tab: WAREHOUSE_LEAGUE_TAB.STANDING, curSeasonId: props?.curSeasonId}}">
      <span style="" name="0" :class="(tab === WAREHOUSE_LEAGUE_TAB.STANDING) ? 'on' : ''" ><i></i>
        {{ $t('Standing') }}
      </span>
    </nuxt-link>
  </div>
</template>
  
<script setup lang="ts">
const route = useRoute();
const { $t } = useShareCommon()

const tab = ref(route?.query?.tab || WAREHOUSE_LEAGUE_TAB.SCHEDULE)
const leagueId = ref()

const props = defineProps<{
  compDetail: any | undefined
  curSeasonId: any | undefined
}>()

if (![WAREHOUSE_LEAGUE_TAB.SCHEDULE, WAREHOUSE_LEAGUE_TAB.STANDING].includes(tab.value)) {
  tab.value = WAREHOUSE_LEAGUE_TAB.SCHEDULE
}

watch(
  () => route.params, 
  () => {
    leagueId.value = route?.params?.league_id || "";
  },
  { immediate: true }
);

watch(
  () => route?.query, 
  () => {
    tab.value = route?.query?.tab || "";
    
    if (![WAREHOUSE_LEAGUE_TAB.SCHEDULE, WAREHOUSE_LEAGUE_TAB.STANDING].includes(tab.value)) {
      tab.value = WAREHOUSE_LEAGUE_TAB.SCHEDULE
    }
  }, 
  { immediate: true }
);

</script>