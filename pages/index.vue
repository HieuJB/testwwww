<template>
  <div>dsads
    {{ test }}
    <div v-if="$isMobile">
      Mobile
    </div>
    <div v-if="!$isMobile">
      PC
    </div>
  </div>
</template>

<script setup>
const test= ref('')
const { $isBot, $isMobile, $header } = useNuxtApp()


const {data} = await useAsyncData('config', async () => {
  
  const resData = await useFetch('http://trunghieuit.click/api/time')
  return {
   resData: resData.data.value,
  }
})

test.value = data.value.resData
</script>

<style scoped>

</style>