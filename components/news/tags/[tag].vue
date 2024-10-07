<template>
  <TagPost/>
</template>

<script setup>
const { isNavVisible } = useShareCommon()
isNavVisible.value = false
</script>
