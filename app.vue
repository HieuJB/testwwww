<template>
  <div>
    <h2>{{$header}}</h2>
    <h1>Bot: {{ $isBot }}</h1>

    <h3>{{ $isMobile }}</h3>
  </div>
</template>

<script setup>
const { $isBot, $isMobile, $header } = useNuxtApp()

</script>

<style scoped>

</style>