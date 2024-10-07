<template>
 <div
  v-if="scheduleSeleted.initData.length"
  class="team__pagination d-flex justify-content-center py-5"
>
  <button @click="onClickBtnPagination('first')">{{ translate('Start') }}</button>
  <button @click="onClickBtnPagination('minus')" class="prev">
    <div class="icon"></div>
  </button>
  <div class="team__pagination-page">
    <span>{{ translate('Page') }}</span>
    <select
      class="form-select form-select-sm"
      aria-label=".form-select-sm example"
      v-model="pageActive"
    >
      <option
        :value="item"
        v-for="(item, index) in scheduleSeleted.pages"
        :key="index"
      >
        {{ item }}
      </option>
    </select>
  </div>
  <button @click="onClickBtnPagination('plus')" class="next">
    <div class="icon icon--next"></div>
  </button>
  <button @click="onClickBtnPagination('last')">{{ translate('End') }}</button>
</div>
</template>

<script setup>
const { $t } = useShareCommon()
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const pageActive = defineModel('pageActive');
const scheduleSeleted = defineModel('scheduleSeleted');
const emit = defineEmits('scroll')
const onClickBtnPagination = (item) => {
  const actions = {
    plus: () => {
      if (
        pageActive.value <
        scheduleSeleted.value.pages[scheduleSeleted.value.pages.length - 1]
      ) {
        pageActive.value += 1;
      }
    },
    minus: () => {
      if (pageActive.value > scheduleSeleted.value.pages[0]) {
        pageActive.value -= 1;
      }
    },
    first: () => {
      pageActive.value = scheduleSeleted.value.pages[0];
    },
    last: () => {
      pageActive.value =
        scheduleSeleted.value.pages[scheduleSeleted.value.pages.length - 1];
    },
  };
  emit('scroll')
  actions[item]?.();
};
</script>

<style lang="scss" scoped>
.form-select:focus {
  border-color: $primary;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(33, 253, 13, 0.158);
}
</style>
