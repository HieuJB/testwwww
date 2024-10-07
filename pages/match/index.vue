<template>
  <div>
  </div>
</template>

<script setup lang="ts">
const { useLocale, $t, isNavVisible } = useShareCommon()
isNavVisible.value = false
showError({
  statusCode: 404,
  statusMessage: $t("The match does not exist!"),
});
onMounted(async () => {});
</script>

<style>
</style>
