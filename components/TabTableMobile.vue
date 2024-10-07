<template>
  <div class="pb-3">
    <div class="product-selector" style="display: flex">
      <span
        :class="[
          {
            active: tabActive === item.id,
          },
        ]"
        @click="handleActiveTab(item.id)"
        v-for="(item, index) in titleList"
        :key="index"
        >
        <div>{{ item.name }}</div>
      </span>
    </div>
    
  </div>
</template>

<script setup>
const props = defineProps({
  titleList: Array,
  isHideTitle: Boolean
});
const emit = defineEmits(['onActiveTab']);

const tabActive = defineModel();

const titleActive = computed(() => {
  return props.titleList.find((item) => item.id === tabActive.value);
});

const handleActiveTab = (id) => {
  tabActive.value = id;
};
</script>

<style lang="scss" scoped>
.title-name {
  font-size: 13px;
  font-weight: bold;
  height: 31px;
  background: #e5e5e5;
  align-items: center;
  justify-content: center;
}
.product-selector {
  position: relative;
  span {
    background: #e6e6e6 !important;
    color: #333333;
  }
  .active {
    position: relative;
    z-index: 1; 
    font-weight: 600;
    div {
      position: relative;
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
</style>
