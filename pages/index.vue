<template>
  dsadsadsadass
</template>

<script setup>


onMounted(() => {
  if (process.client && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (reg) {
      setTimeout(() => {
        console.log('============');
        
        reg.showNotification('Thông báo', {
          body: 'Thời gian hiện tại: ' + new Date().toLocaleTimeString(),
          icon: '/icon.png',
        });
      }, 10000); // 10 giây
    });
  }
});
</script>

<style scoped>

</style>