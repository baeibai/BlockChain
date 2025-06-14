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
          <!-- <router-link :to="{ name: 'auth.sign-in' }"> -->
        </div>
        <div class="col-md-6 bg-white pt-5 pt-5 pb-lg-0 pb-5">
          <div class="sign-in-from pb-5">
            <h1 class="mb-0"><router-link :to="{ name: 'social.list' }">註冊</router-link></h1>
            <p>輸入您的電子郵件和密碼</p>
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
                  @click="connectMetaMask">連接錢包</button>
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
          </div>
        </div>
      </div>
    </div>
  </section>
  <Notification v-if="notificationState.show" :message="notificationState.message" :type="notificationState.type"
    @close="notificationState.show = false" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useWeb3 from "@/hooks/useWeb3.js";
import { useRouter } from 'vue-router';
import { signUpApi } from "@/api/login_signUp.js";
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
  type: 'info'
});

function connectMetaMask() {
  if (window.ethereum) {
    console.log('MetaMask 已安裝');
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        ethereumAddress.value = accounts[0];
      })
      .catch(err => {
        console.error(err);
        alert('請先登入 MetaMask');
      });
  } else {
    alert('未偵測到 MetaMask，請先安裝!');
  }
}

onMounted(async () => {
  const account = await getAccount();
  ethereumAddress.value = account;
});

const registerUser = async (username) => {
  const account = await getAccount();
  const transactionParameters = {
    from: account,
    to: contractAddress,
    value: "0",
    data: socialContract.methods.registerUser(username).encodeABI(),
  };
  try {
    const transactionHash = await ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    console.log("交易已提交，交易哈希:", transactionHash);
    return true;
  } catch (error) {
    console.error("發送交易時出錯:", error);
    return false;
  }
};

const submitForm = async () => {
  // 檢查電子郵件
  if (!isValidEmail(email.value)) {
    notificationState.show = true;
    notificationState.message = '請輸入有效的電子郵件地址';
    notificationState.type = 'warning';
    email.value = '';
    return;
  }

  // 檢查密碼長度
  if (password.value.length < 6) {
    notificationState.show = true;
    notificationState.message = '密碼需至少6個字';
    notificationState.type = 'warning';
    password.value = '';
    return;
  }

  // 檢查用戶名是否為空
  if (!username.value.trim()) {
    notificationState.show = true;
    notificationState.message = '請輸入用戶名';
    notificationState.type = 'warning';
    return;
  }

  // 檢查用戶名長度
  if (username.value.length > 20) {
    notificationState.show = true;
    notificationState.message = '用戶名需少於20個字';
    notificationState.type = 'warning';
    return;
  }

  // 檢查以太坊地址是否為空
  if (!ethereumAddress.value.trim()) {
    notificationState.show = true;
    notificationState.message = '請輸入以太坊地址';
    notificationState.type = 'warning';
    ethereumAddress.value = '';
    return;
  }

  // 檢查以太坊地址是否有效
  if (!web3.utils.isAddress(ethereumAddress.value)) {
    notificationState.show = true;
    notificationState.message = '以太坊地址無效';
    notificationState.type = 'warning';
    ethereumAddress.value = '';
    return;
  }

  // 構造數據
  const data = {
    email: email.value,
    address: ethereumAddress.value,
    username: username.value,
    password: password.value,
  };

  console.log("Form data:", data);

  try {
    // 調用 API 進行註冊
    const res = await signUpApi(data);

    if (res.data.code === 1) {
      console.log("註冊成功!");
      // 嘗試註冊用戶到鏈上
      const isRegistered = await registerUser(username.value);
      if (!isRegistered) {
        notificationState.show = true;
        notificationState.message = '交易失敗';
        notificationState.type = 'error';
        return;
      }
      // 註冊成功後跳轉至登入頁
      router.push('/login');
    } else {
      notificationState.show = true;
      notificationState.message = `請求出錯: ${res.data.msg}`;
      notificationState.type = 'error';
    }
  } catch (err) {
    notificationState.show = true;
    notificationState.message = `請求出錯: ${err.message}`;
    notificationState.type = 'error';
    console.error("請求出錯:", err.message);
  }

  console.log('Form submitted!');
};


const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
</script>

<style scoped>
.stat-item {
  text-align: center;
  margin-top: 5px;
}

.stat-item span {
  display: block;
}
</style>
