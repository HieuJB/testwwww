<template>
  <div>dsads1
    dadaada
  </div>
</template>

<script setup>
const test= ref('')


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