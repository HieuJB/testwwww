<template>
  <nuxt-img :src="initSrcImage" @error="handleError" v-bind="$attrs" :alt="alt ?? initSrcImage"></nuxt-img>
</template>

<script setup lang="ts">
const props = defineProps({
  src: String,
  imgDefault: String,
  alt: String
});
const isError = ref(false);

const initSrcImage = computed(() => {
  return !isError.value ? props.src : (props.imgDefault ?? '/img/default-image.webp');
});

const handleError = () => {
  isError.value = true;
};
</script>

<style scoped></style>