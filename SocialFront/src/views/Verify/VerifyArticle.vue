<template>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div class="card iq-border-radius-40">
        <div class="card-body">
          <div class="row">
            <div class="col-md-10 mb-3">
              <h5 class="text-primary card-title d-flex gap-1">
                <span class="material-symbols-outlined">verified</span>
                文章查驗
              </h5>
            </div>
          </div>
          <form class="email-form justify-content-center" @submit.prevent="verifyTransaction">
            <div class="form-group row">
              <label for="type" class="col-sm-2 col-form-label">驗證種類</label>
              <div class="col-sm-10">

                <select class="form-control" v-model="type">
                  <!-- <option value="請選擇看板">請選擇看板</option> -->
                  <option :value="type.id" v-for="type in types" :key="type.id">{{ type.name }}</option>
                </select>
              </div>
            </div>
            <!-- 交易哈希輸入欄 -->
            <div class="form-group row">
              <label for="transactionHash" class="col-sm-2 col-form-label">交易哈希</label>
              <div class="col-sm-10">
                <input type="text" id="transactionHash" v-model="transactionHash" class="form-control"
                  placeholder="輸入交易哈希" required />
              </div>
            </div>
            <div v-if="type === 1">
              <!-- 文章標題輸入欄 -->
              <div class="form-group row">
                <label for="articleTitle" class="col-sm-2 col-form-label">文章標題</label>
                <div class="col-sm-10">
                  <input type="text" id="articleTitle" v-model="articleTitle" class="form-control" placeholder="輸入文章標題"
                    required />
                </div>
              </div>
              <!-- 文章內容輸入欄 -->
              <div class="form-group row">
                <label for="articleContent" class="col-sm-2 col-form-label">文章內容</label>
                <div class="col-sm-10">
                  <textarea id="articleContent" v-model="articleContent" class="form-control" rows="5"
                    placeholder="輸入文章內容" required></textarea>
                </div>
              </div>
            </div>
            <div v-else-if="type === 2">
              <!-- 驗證請求內容輸入欄 -->
              <div class="form-group row">
                <label for="verifyReason" class="col-sm-2 col-form-label">驗證理由</label>
                <div class="col-sm-10">
                  <input type="text" id="verifyReason" v-model="verifyReason" class="form-control" placeholder="輸入驗證理由"
                    required />
                </div>
              </div>
            </div>
            <div v-else-if="type === 3">
              <!-- 驗證請求內容輸入欄 -->
              <div class="form-group row">
                <label for="verifyReason" class="col-sm-2 col-form-label">內文</label>
                <div class="col-sm-10">
                  <textarea type="text" id="verifyReason" v-model="verifyReason" class="form-control" placeholder="輸入內容"
                    required />
                </div>
              </div>
            </div>
            <div v-else-if="type === 4">

            </div>


            <!-- 發布時間 -->
            <div v-if="type !== 4" class="form-group row">
              <label for="articleContent" class="col-sm-2 col-form-label">發文時間</label>
              <div class="col-sm-10">
                <input type="text" id="postTime" v-model="articleTime" class="form-control" placeholder="發布時間"
                  required />
              </div>
            </div>
            <!-- 驗證按鈕 -->
            <div class="form-group d-flex justify-content-center">
              <button type="submit" class="btn btn-primary">驗證文章</button>
            </div>
          </form>

          <!-- <div class="form-group d-flex justify-content-center">
              <button type="submit" class="btn btn-primary" @click="queryBalance">查詢餘額</button>
          </div> -->

          <!-- 驗證結果通知框 -->
          <transition name="fade" class="notificationClass">
            <div v-if="showNotification" :class="notificationClass" class="notification-box">
              <span class="notification-message">{{ verificationResult }}</span>
            </div>
          </transition>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useWeb3 from "@/hooks/useWeb3.js";

// 從 useWeb3 中獲取 web3 實例與合約等信息
const { web3, socialContract } = useWeb3();

// const queryBalance = async () => {
//   const num = await socialContract.methods.getBalance().call();
//   console.log(num);
// }

// 定義變量
const transactionHash = ref('');
const articleTitle = ref('');
const articleContent = ref('');
const verificationResult = ref('');
const showNotification = ref(false);
const notificationClass = ref('');
const articleTime = ref('');
const verifyReason = ref('');
const types = ref([
  { id: 1, name: "用戶文章", value: "article" },
  { id: 2, name: "驗證請求", value: "verify" },
  { id: 3, name: "文章證據", value: "evidence" },
  { id: 4, name: "查驗哈希", value: "showHash" }
]);
const type = ref(1);



// 驗證交易函數
const verifyTransaction = async () => {
  showNotification.value = false; // 驗證開始時隱藏通知框
  try {
    const transaction = await web3.eth.getTransaction(transactionHash.value);
    if (!transaction) {
      throw new Error('交易無效');
    }
    const inputData = transaction.input;

    let decoded;
    // 解碼區分不同的驗證種類
    try {
      decoded = web3.eth.abi.decodeParameters(['uint256', 'string', 'uint256'], inputData.slice(10));
    } catch (error) {
      throw new Error('解碼失敗，請檢查輸入資料');
    }
    console.log(decoded);
    // if (type.value === 1) {
    //   // 文章查驗邏輯
    //   verificationResult.value = (articleTitle.value === decoded[1] && articleContent.value === decoded[2] && articleTime.value === String(decoded[3]))
    //     ? '驗證成功! 文章與區塊鏈紀錄一致!'
    //     : '文章標題或內容不符合';
    // } 
    if (type.value === 1) {
      // 文章查驗邏輯
      verificationResult.value = (articleContent.value === decoded[1] && articleTime.value === String(decoded[2]))
        ? '驗證成功! 文章與區塊鏈紀錄一致!'
        : '文章標題或內容不符合';
    } else if (type.value === 2) {
      // 驗證請求查驗邏輯
      verificationResult.value = (verifyReason.value === decoded[1] && articleTime.value === String(decoded[2]))
        ? '驗證成功! 文章與區塊鏈紀錄一致!'
        : '驗證請求內容或發文時間不符合';
    } else if(type.value === 3) {
      // 其他查驗邏輯
      verificationResult.value = (articleTime.value === decoded[1] && verifyReason.value === String(decoded[2]))
        ? '驗證成功! 文章與區塊鏈紀錄一致!'
        : '內文或發文時間不符合';
    }
    else {
      verificationResult.value = "鏈上id:" + decoded[0] + "\n內文:" + decoded[1] + "\n發文時間:"+ decoded[2];
    }

    // 根據驗證結果設定通知樣式
    notificationClass.value = verificationResult.value === '驗證成功! 文章與區塊鏈紀錄一致!' ? 'notification-success' : 'notification-error';
    if(type.value === 4) {
      notificationClass.value = "notification-success";
    }
  } catch (error) {
    // 驗證失敗
    verificationResult.value = error.message || '驗證失敗，請檢查輸入的資料。';
    notificationClass.value = 'notification-error';
    console.error(error);
  }
  showNotification.value = true; // 顯示通知框
};
</script>

<style scoped>
/* 通知框的過渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* 修改通知框的樣式，讓其居中並不會太高 */
.notification-box {
  position: fixed;
  bottom: 20px;
  /* 調整到屏幕底部 20px */
  left: 50%;
  transform: translateX(-50%);
  /* 水平居中 */
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: white;
  z-index: 1000;
  opacity: 0.9;
  /* 增加一些透明度 */
}

/* 驗證成功的樣式 */
.notification-success {
  background-color: #28a745;
  animation: slideIn 0.5s ease forwards;
}

/* 驗證失敗的樣式 */
.notification-error {
  background-color: #dc3545;
  animation: slideIn 0.5s ease forwards;
}

.notification-message {
  white-space: pre-line; /* 允許換行 */
}

/* 通知框的進場動畫 */
@keyframes slideIn {
  0% {
    transform: translateX(-50%) translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}
</style>
