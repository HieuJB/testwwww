<template>
  <div class="tabs">
    <button
      @click="handleRedirect(tab.redirect)"
      :class="['tab', getActiveTab(tab.redirect)]"
      v-for="(tab, index) in tabs"
      :key="index"
    >
      {{ translate(tab.name) }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  tabs: Array,
});
const route = useRoute();

const handleRedirect = (item) => {
  if(Array.isArray(item)) {
    navigateTo(item[0])
  }else {
    navigateTo(item);
  }
};
const { $t } = useShareCommon()
const translate = (key) => {
  const fullKey = `${key} team`;
  const translation = $t(fullKey);
  return translation !== fullKey ? translation : key;
};
const getActiveTab = (item) => {
  const url = route.fullPath;
  if(Array.isArray(item)) {
    return item.includes(route.fullPath) ? 'tab--active' : '';
  }
  return item === url ? 'tab--active' : '';
};
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  gap: 2px;
  border-bottom: 3px solid $primary;
  .tab {
    border: none;
    padding: 0 10px;
    height: 32px;
    font-size: 11px;
    color: rgb(102, 102, 102);
    background: #e5e5e5;
    transition: all 0.3s;
    line-height: 1.2;
    &--active {
      background: $primary;
      color: white;
    }
    @media (max-width: 430px) {
      padding: 0 5px;
    }
  }
}
</style>
