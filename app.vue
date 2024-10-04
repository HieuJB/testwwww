<template>
  <div>
   sdadsadasasdsda
  </div>
</template>

<script setup>
const data1 = ref('')

const fetchData = async () => {
  const { data } = await useFetch('https://trunghieuit.click/api/time')
  data1.value = data.value.time
  
}

await fetchData()


</script>

<style lang="scss" scoped>

</style>