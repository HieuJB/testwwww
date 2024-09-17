<template>
   <NuxtLayout :name="'default'">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
if (process.client && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    console.log('Service Worker Registered');
  });dsadsa
}
</script>


<style lang="scss" scoped>

</style>