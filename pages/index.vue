<template>
  <div>dsads111111111111111111111111111111
    dadaada
    {{ test }}
  </div>
</template>

<script setup>
onMounted(async()=> {
  const test= ref('')
  const resData = await useFetch('http://trunghieuit.click/api/time')
  test.value = JSON.stringify(resData.data.value)
},2000)
</script>

<style scoped>

</style>