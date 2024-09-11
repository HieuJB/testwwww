<template>
  <div>
    <h1>Bot: {{ $isBot }}</h1>

    <h3>{{ $isMobile }}</h3>
  </div>
</template>

<script setup>
const { $isBot, $isMobile } = useNuxtApp()

</script>

<style scoped>

</style>