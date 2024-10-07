<template>
  <div class="lrdiv">
    <div class="lr_tit on" aria-label="Hot Leagues">{{ t('Hot Leagues') }}</div>
    <nav id="nav" aria-label="Hot Leagues Menu">
      <ul class="leftnav tli">
        <template
          v-for="comp in compSeason"
        :key="comp?.id"
        >
          <li :id="'hot-league-' + comp?.id">
            <nuxt-link :to="ROUTERS_OLD.LEAGUES + '/' + comp?.id">
              <nuxt-img :src="getLiveScoreImage(comp?.comp_logo + '!h20', 'competition')" alt=""  loading="lazy" height="18"  class="cImg lazy" style="display: inline;"/>
              {{ comp?.comp_name_vi }}
            </nuxt-link>
          </li>
        </template>
      </ul>
    </nav>
    <span id="leaBtm"></span>
  </div>
</template>

<script setup lang="ts">
const compSeason = ref([])
const { $t } = useShareCommon()

const fetchCompSeason = async () => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.COMP_LIST, {
      limit: 40,
      page: 1,
      hot: "4,5"
    }
  ).then(async (resData) => {
    compSeason.value = resData
  });
};

fetchCompSeason();
onMounted(async () => {
  //await fetchCompSeason();
})

</script>

<style scoped></style>