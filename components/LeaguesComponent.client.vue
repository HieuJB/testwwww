<template>
  <div id="new_date_me">
    <template v-for="(item, index) in props?.categoryCountry" :key="index">
      <div :class="activeCategoryCountry === item?.category_id ? 'da_nav_on' : 'da_nav'" style="cursor:pointer;" @click="actionActiveCategoryCountry(item?.category_id)">{{ item?.category_name }}</div>
      <template v-if="activeCategoryCountry === item?.category_id">
        <div :class="activeCountry === 'National' ? 'left_list_on' : 'left_list'" @click="actionActiveCountry('National')">{{  item?.category_name }}</div>
        <div class="left_list3" >
          <template v-if="activeCountry === 'National'">
            <ul>
              <template v-for="(comp, index_comp) in item?.national?.competitions" :key="index_comp">
                <li><nuxt-link :href="ROUTERS_OLD.LEAGUES +  '/' + comp?.competition_id" :title="comp?.competition_name"  :class="comp?.competition_id == compId ? 'on' : ''" @click="onClick">{{ comp?.competition_name }}</nuxt-link></li>
              </template>
            </ul>
          </template>
        </div>

        <template v-for="(country, index_country) in item?.countries" :key="index_country">
          <div :class="activeCountry === country?.country_id ? 'left_list_on' : 'left_list'" @click="actionActiveCountry(country?.country_id)">{{ country?.country_name }}</div>
          <div class="left_list3" >
            <template v-if="activeCountry === country?.country_id">
              <ul>
                <template v-for="(comp, index_comp) in country?.competitions" :key="index_comp">
                  <li><nuxt-link :href="ROUTERS_OLD.LEAGUES +  '/' + comp?.competition_id" :title="comp?.competition_name"  :class="comp?.competition_id == compId ? 'on' : ''" @click="onClick">{{ comp?.competition_name }}</nuxt-link></li>
                </template>
              </ul>
            </template>
          </div>
        </template>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
const activeCategoryCountry = ref()
const activeCountry = ref()
const compId = ref()

const props = defineProps<{
  categoryCountry: any | []
  activeCategoryCountry: any
  activeCountry: any
  compId: any
}>()

const emit = defineEmits<{
  (e: 'onClick'): void
}>()

const onClick = () => {
  emit('onClick')
}

const actionActiveCategoryCountry = (val) => {
  activeCategoryCountry.value = activeCategoryCountry.value === val ? null : val
}
const actionActiveCountry = (val) => {
  activeCountry.value = activeCountry.value === val ? null : val
}

watch(
  props,
  () => {
    activeCategoryCountry.value = props?.activeCategoryCountry
    activeCountry.value = props?.activeCountry
    compId.value = props?.compId
  },
  { immediate: true }
)
</script>