<template>
  <div class="lrdiv" style="padding-right: 0">
    <div class="n-search">
      <input type="text" id="rightSearchInput" class="input_text" @input="onChangeSearch" placeholder="Giải đấu" v-model="quickSearch" autofocus="true" autocomplete="off" />
    </div>
    <ul class="leftnav tli" id="leagues-list" v-if="props?.compSeason?.length > 0">
      <template 
        v-for="comp in props?.compSeason"
      :key="comp?.id"
      >
        <li>
          <nuxt-link :to="ROUTERS_OLD.LEAGUES + '/' + comp?.id + '?q=' + quickSearch" :title="comp?.comp_name_vi_overwrite ?? comp?.comp_name_vi ?? comp?.comp_name">
            <img :src="getLiveScoreImage(comp?.comp_logo + '!h20', 'competition')" :alt="comp?.comp_name_vi_overwrite ?? comp?.comp_name_vi ?? comp?.comp_name" />
            {{ comp?.comp_name_vi_overwrite ?? comp?.comp_name_vi ?? comp?.comp_name }}
          </nuxt-link>
        </li>
      </template>
    </ul>
    <p id="leaBtm" v-else>Không có dữ liệu</p>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
const route = useRoute();
const compSeason = ref([])
const quickSearch = ref(route?.query?.q || '')
const qSearch = ref()

const props = defineProps<{
  compSeason: any | []
}>()

const emit = defineEmits<{
  (e: 'onChangeSearch', qSearch: string): void
}>()

const fetchCompSeason = async () => {
  await useApiLiveScore(
    API_ROUTERS.LIVESCORE.COMP_LIST, []
  ).then(async (resData) => {
    compSeason.value = resData
  });
};

// watch(
//   quickSearch,
//   () => {
//     emit('onChangeSearch', quickSearch.value.trim())
//   }
// )
const onChangeSearch = useDebounceFn(() => {
  emit('onChangeSearch', quickSearch.value.trim())
}, 300)

// fetchCompSeason();
onMounted(async () => {
  //await fetchCompSeason();
})

</script>

<style scoped>
#offcanvasLeft .n-search {
  margin-top: 10px;
  margin-bottom: 10px;
}
.n-search .input_text {
    border-radius: 4px;
    outline: 0;
    border: 0;
    font-size: 12px;
    background: url(/img/f.png) no-repeat 5px;
    border-radius: 2px;
    padding: 5px 0 5px 30px;
}
</style>