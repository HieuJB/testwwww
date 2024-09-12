<template>
  <div>dsads111
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
  
  const resData = await useFetch('https://bongdalu61.com/oapi/v1/configurations')
  return {
    resData: resData.data.value.configurations
  }
})

setTimeout(() => {
    console.log(data,'================');
    
}, 2000);
</script>

<style scoped>

</style>