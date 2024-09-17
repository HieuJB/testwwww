<template>
  <div class="center">
    <h1>Nuxt3 PWA</h1>
    <!-- TODO waiting for https://github.com/nuxt/framework/pull/2262 -->
    <img :src="'/pwa.jpg'" alt="Nuxt3 PWA">
    <p>
      This page can be displayed offline !
    </p>
  </div>
</template>

<script scipt>
if (process.client) {
  window.addEventListener('load', () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('serviceWorker is not supported in current browser!')
    }

    navigator.serviceWorker.register('/sw.js')
  })
}

onMounted(() => {
  // Yêu cầu quyền thông báo
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      alert('Permission granted for notifications.');
    } else {
      alert('Permission denied for notifications.');
    }
  });
});
</script>

<style>
.center {
  text-align: center;
}
img {
  width: 100%;
  max-width: 760px;
}
</style>