<!-- components/Notification.vue -->
<template>
  <div class="notification" :class="notificationClass">
    <span>{{ message }}</span>
    <!-- <button @click="closeNotification" disabled="disabled">關閉</button> -->
  </div>
</template>

<script setup>
import { computed, onMounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info',
  },
});

const emit = defineEmits(['close']);

// 根據通知類型計算不同的 class
const notificationClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'error':
      return 'error';
    default:
      return 'info';
  }
});

// 發送事件通知父組件關閉通知
const closeNotification = () => {
  emit('close');
};

// 通知顯示後，1秒自動關閉
onMounted(() => {
  setTimeout(() => {
    closeNotification();
  }, 3000); // 1秒 = 1000 毫秒
});
</script>

<style scoped>
.notification {
  border-radius: 30px; /* 圓角，形成橢圓形 */
  padding: 10px 20px;  /* 調整內邊距，保持橢圓形 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 300px; /* 控制通知的最大寬度 */
  word-wrap: break-word; /* 當訊息過長時自動換行 */

  /* 使通知顯示在螢幕偏上，正中央 */
  position: fixed;
  top: 15%; /* 距離螢幕頂部 10% */
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 將元素的水平中心點對齊到螢幕正中央 */
  z-index: 1000; /* 保證通知顯示在其他元素的上方 */
}

.info {
  background-color: #5fa5ff; /* 更亮的藍色 */
}

.success {
  background-color: #63ff68; /* 更亮的綠色 */
}

.warning {
  background-color: #f0d266; /* 更亮的黃色 */
}

.error {
  background-color: #fa7070; /* 更亮的紅色 */
}

button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}
</style>
