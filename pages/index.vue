<template>
  <div>dsads1
    <div v-if="$isMobile">
      Mobile1
    </div>
    <div v-if="!$isMobile">
      PC1
    </div>
  </div>
</template>

<script setup>
const test= ref('')
const { $isBot, $isMobile } = useNuxtApp()


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