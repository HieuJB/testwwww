<template>
  <h1>Football</h1>
</template>

<script setup>
const isActive = ref(false);

const toggleClass = () => {
  isActive.value = !isActive.value;
};

const convertToPath = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
</script>
