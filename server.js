const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path'); // Thêm module path để lấy đường dẫn tuyệt đối

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

const VAPID_PUBLIC_KEY = 'BIW-fd8gsZvkjU0AEnm5AtdSNox2a6NpXlS7zPqY5Oumyxa53Mro48Up22MlxRGqLg_A0ScH_ZRztisfWD1lB9M';
const VAPID_PRIVATE_KEY = 'ExWXxk9Ti3QaTkPddqB1BSNFoi9ZL5gZDjQQPkAWrKI';

webpush.setVapidDetails(
  'mailto:youremail@example.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

let subscriptions = [];

// Xử lý đăng ký Push Notifications
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

// Gửi thông báo đẩy
app.post('/send-notification', (req, res) => {
  const notificationPayload = JSON.stringify({
    title: req.body.title,
    body: req.body.body,
    icon: req.body.icon || '/default-icon.png',  // Nếu có icon mặc định
    url: req.body.url
  });

  const notifications = subscriptions.map(subscription => {
    return webpush.sendNotification(subscription, notificationPayload)
      .catch(error => {
        console.error('Error sending notification:', error);
      });
  });

  Promise.all(notifications).then(() => res.status(200).json({ message: 'Notifications sent' }));
});

// Phục vụ index.html tại đường dẫn gốc "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Đảm bảo index.html nằm cùng thư mục với server.js
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
