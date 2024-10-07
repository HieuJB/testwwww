<template>
  <div
    class="modal fade"
    id="modal_search"
    tabindex="-1"
    aria-labelledby="modal_search_label"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered container">
      <SearchPopupComponent />
    </div>
  </div>
</template>

<script setup>
const modalSearch = ref(null);

onMounted(() => {
  modalSearch.value = new bootstrap.Modal(document.getElementById('modal_search'), {});
  modalSearch.value.show(); 
});
</script>

<style lang="scss" scoped>

</style>