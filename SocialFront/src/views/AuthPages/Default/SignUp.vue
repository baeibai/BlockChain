<template>
  <section class="sign-in-page">
    <div id="container-inside">
      <div id="circle-small"></div>
      <div id="circle-medium"></div>
      <div id="circle-large"></div>
      <div id="circle-xlarge"></div>
      <div id="circle-xxlarge"></div>
    </div>
    <div class="container p-0">
      <div class="row no-gutters">
        <div class="col-md-6 text-center pt-5">
          <!-- <router-link :to="{ name: 'auth1.sign-in1'}"> -->
        </div>
        <div class="col-md-6 bg-white pt-5 pt-5 pb-lg-0 pb-5">
          <div class="sign-in-from pb-5">
            <h1 class="mb-0"><router-link :to="{ name: 'social.list' }">註冊</router-link></h1>
            <!-- <p>輸入您的電子郵件和密碼</p> -->
            <form class="mt-4" @submit.prevent="submitForm">
              <div class="form-group">
                <label class="form-label" for="exampleInputEmail2">電子郵件</label>
                <input type="email" class="form-control mb-0" id="exampleInputEmail2" v-model="email"
                  placeholder="電子郵件">
              </div>
              <div class="form-group">
                <label class="form-label" for="exampleInputusername">用戶名稱</label>
                <input type="text" class="form-control mb-0" id="exampleInputusername" v-model="username"
                  placeholder="用戶名稱">
              </div>
              <div class="form-group d-flex align-items-center">
                <label class="form-label float-start" for="exampleInputethereum1"
                  style="margin-bottom: 0;">以太坊地址</label>
                <span style="flex-grow: 1;"></span>
                <label class="form-label" for="exampleInputethereum1" style="margin-bottom: 0;">
                  <a href="https://metamask.io/download/">點擊了解如何註冊及連接</a>
                </label>
                <button type="button" class="btn btn-outline-primary mb-3 ms-3 float-end" style="margin-left: auto;"
                  @click="connectMetaMask()">連接錢包</button>
              </div>
              <textarea class="form-control" id="exampleInputethereum1" v-model="ethereumAddress" placeholder="以太坊地址"
                rows="2"></textarea>
              <div class="form-group">
                <label class="form-label" for="exampleInputPassword1">密碼</label>
                <input type="password" class="form-control mb-0" id="exampleInputPassword1" v-model="password"
                  placeholder="密碼">
              </div>
              <div class="form-group">
                <label class="form-label" for="exampleInputConfirmPassword1">確認密碼</label>
                <input type="password" class="form-control mb-0" id="exampleInputConfirmPassword1"
                  v-model="confirmPassword" placeholder="確認密碼">
              </div>
              <div v-if="passwordMismatch" class="text-danger mb-3">
                密碼不匹配，請重新輸入。
              </div>
              <div class="d-inline-block w-100">
                <span class="dark-color d-inline-block line-height-2"><router-link
                    :to="{ name: 'auth.sign-in' }">返回登入</router-link></span>
                <button type="submit" class="btn btn-primary float-end">註冊</button>
              </div>
            </form>
            <!-- <button @click="test">test</button> -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <Notification v-if="notificationState.show" :message="notificationState.message" :type="notificationState.type"
    @close="notificationState.show = false" />
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import useWeb3 from "@/hooks/useWeb3.js";
import { useRouter } from 'vue-router';
import { signUpApi, checkUsernameApi } from "@/api/login_signUp.js";
import Notification from "@/components/float/Notification.vue";

const router = useRouter();
const { web3, socialContract, getAccount, contractAddress } = useWeb3();
const email = ref('');
const password = ref('');
const username = ref('');
const ethereumAddress = ref('');
const confirmPassword = ref('');

const notificationState = reactive({
  show: false,
  message: '',
  type: 'info'  // 'info', 'success', 'warning', 'error'
});


// 添加一個標誌來跟踪請求狀態
let isRequestingAccounts = false;

const showNotification = (message, type = 'info') => {
  notificationState.message = message;
  notificationState.type = type;
  notificationState.show = true;
};

async function connectMetaMask() {
  if (isRequestingAccounts) {
    showNotification('正在處理連接請求，請稍候...', 'info');
    return;
  }

  if (window.ethereum) {
    console.log('MetaMask 已安裝');

    try {
      isRequestingAccounts = true;

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      if (accounts.length > 0) {
        ethereumAddress.value = accounts[0];
        console.log("MetaMask 登入成功，地址:", ethereumAddress.value);
        showNotification("MetaMask 連接成功！", 'success');
      } else {
        showNotification('請登入 MetaMask', 'warning');
      }
    } catch (err) {
      if (err.code === -32002) {
        showNotification('請求已在處理中，請稍候...', 'info');
      } else {
        console.error('連接 MetaMask 失敗:', err);
        showNotification('MetaMask 連接失敗，請重試。', 'error');
      }
    } finally {
      isRequestingAccounts = false;
    }
  } else {
    showNotification('未偵測到 MetaMask，請先安裝!', 'error');
  }
}

const registerUser = async (username) => {
  try {
    const account = await getAccount();
    console.log(account);
    const transactionParameters = {
      from: account,
      to: contractAddress,
      value: "0",
      data: socialContract.methods.registerUser(username).encodeABI(),
    };

    const transactionHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    console.log("交易已提交，交易哈希:", transactionHash);
    showNotification("交易已提交，交易哈希: " + transactionHash, 'success');
    return true;

  } catch (error) {
    console.error("發送交易時出錯:", error);
    showNotification("發送交易時出錯: " + error.message, 'error');
    return false;
  }
};

const submitForm = async () => {
  if (!ethereumAddress.value) {
    showNotification('請先連接 MetaMask', 'warning');
    await connectMetaMask();
    if (!ethereumAddress.value) return;
  }

  if (!isValidEmail(email.value)) {
    showNotification('請輸入有效的電子郵件地址。', 'warning');
    return;
  }

  if (password.value.length < 6) {
    showNotification('密碼必須至少為 6 個字符長。', 'warning');
    password.value = '';
    return;
  }

  if (!username.value.trim()) {
    showNotification('請輸入用戶名稱。', 'warning');
    return;
  }

  if (username.value.length > 20) {
    showNotification('用戶名稱需小於20字。', 'warning');
    return;
  }

  if (!ethereumAddress.value.trim()) {
    showNotification('請輸入以太坊地址。', 'warning');
    return;
  }

  if (password.value !== confirmPassword.value) {
    showNotification('密碼不匹配，請重新輸入。', 'warning');
    return;
  }

  const data = {
    email: email.value,
    address: ethereumAddress.value,
    username: username.value,
    password: password.value,
  };

  try {
    const isUsernameExists = await checkUsernameApi(username.value);
    if (isUsernameExists.data.code === 0) {
      showNotification(isUsernameExists.data.msg, 'warning');
      return;
    }

    const isRegistered = await registerUser(username.value);
    if (!isRegistered) {
      showNotification("交易失敗", 'error');
      return;
    }

    const res = await signUpApi(data);
    if (res.data.code === 1) {
      showNotification("註冊成功!", 'success');
      router.push('/auth/signin');
    } else {
      showNotification("請求出錯: " + res.data.msg, 'error');
    }
  } catch (err) {
    console.error("請求出錯:", err.message);
    showNotification("請求出錯: " + err.message, 'error');
  }

  console.log('Form submitted!');
};

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

onMounted(() => {

});
</script>

<style scoped>
/* 您的樣式 */
</style>
