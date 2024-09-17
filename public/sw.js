self.addEventListener('push', function(event) {
  const options = {
    body: 'Thời gian hiện tại: ' + new Date().toLocaleTimeString(),
    icon: '/icon.png',
  };

  event.waitUntil(
    self.registration.showNotification('Thông báo', options)
  );
});
