<template>
  <div class="lrdiv">
    <div class="lr_tit on" aria-label="Hot Leagues">
      {{ $t('Hot Leagues') }}
    </div>
    <nav id="nav" aria-label="Hot Leagues Menu">
      <ul class="leftnav tli">
        <template v-for="comp in compSeason" :key="comp?.id">
          <li :id="'hot-league-' + comp?.id">
            <nuxt-link
              :to="ROUTERS_OLD.LEAGUES + '/' + comp?.id"
              :title="comp?.comp_name"
              @click="onClick"
            >
              <div class="league-img">
                <BaseImage
                  :src="
                    getLiveScoreImage(
                      comp?.comp_logo + imageHeight,
                      'competition'
                    )
                  "
                  :alt="comp?.comp_name"
                  class="cImg"
                  style="display: inline"
                />
              </div>
              <div class="comp-name">
                {{ comp?.comp_name }}
              </div>
            </nuxt-link>
          </li>
        </template>
      </ul>
    </nav>
    <span id="leaBtm"></span>
  </div>
</template>
<script setup lang="ts">
const compSeason = ref([]);
const compSeasonState = useState('compSeasonState', () => []);
const compSeasonList = useState('compSeasonState') as Ref<[]>;
const storeSystems = systemsStore();
const { useLocale, $t} = useShareCommon()

const imageHeight =
  getConfig(storeSystems?.configurations, 'LEAGUE_IMAGE_HEIGHT') ?? '!h50';

const emit = defineEmits<{
  (e: 'onClick'): void;
}>();

const onClick = () => {
  emit('onClick');
};

const fetchCompSeason = async () => {
  if (compSeasonList.value?.length) {
    compSeason.value = compSeasonList.value;
    return;
  }
  useApiLiveScore(API_ROUTERS.LIVESCORE.COMP_LIST, {
    limit: 30,
    page: 1,
    hot: '5',
    lang: useLocale?.value.defaultLocale
  }).then(async (resData) => {
    compSeason.value = resData;
    compSeasonState.value = resData;
  });
};

await fetchCompSeason();

onMounted(() => {
  if (!compSeason.value.length) {
    setTimeout(async()=> {
      await fetchCompSeason()
    },0)
  }
});
</script>
<style scoped></style>
