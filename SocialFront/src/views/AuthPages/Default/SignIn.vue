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
                </div>
                <div class="col-md-6 bg-white pt-5 pt-5 pb-lg-0 pb-5">
                    <div class="sign-in-from pb-5">
                        <h1 class="mb-0"><router-link :to="{ name: 'social.list' }">登入</router-link></h1>
                        <p>輸入您的電子郵件和密碼</p>
                        <form class="mt-4" @submit.prevent="submitForm">
                            <div class="form-group">
                                <label class="form-label" for="exampleInputMail">電子郵件</label>
                                <input type="text" class="form-control mb-0" id="exampleInputMail" placeholder="電子郵件"
                                    v-model="mail">
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="exampleInputPassword1">密碼</label>
                                <router-link :to="{ name: 'auth.recoverpassword1' }"
                                    class="float-end">忘記密碼</router-link>
                                <input type="password" class="form-control mb-0" id="exampleInputPassword1"
                                    placeholder="密碼" v-model="password">
                            </div>
                            <div class="d-inline-block w-100">
                                <div class="sign-info d-inline-block mt-2 pt-1">
                                    <span class="dark-color d-inline-block line-height-2">
                                        <router-link :to="{ name: 'auth.sign-up' }">建立新帳號</router-link>
                                    </span>
                                </div>
                                <button type="submit" class="btn btn-primary float-end">登入</button>
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
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { loginApi } from "@/api/login_signUp.js";
import Notification from "@/components/float/Notification.vue";

const store = useStore();
const router = useRouter();
const mail = ref('');
const password = ref('');

const notificationState = reactive({
  show: false,
  message: '',
  type: 'info'  // 'info', 'warning', 'error', 'success'
});



const submitForm = async () => {
    // 檢查郵件是否為空
    if (mail.value.length === 0) {
        notificationState.message = 'Please enter a mail.';
        notificationState.type = 'warning';
        notificationState.show = true;
        return;
    }

    // 檢查密碼是否為空
    if (password.value.length === 0) {
        notificationState.message = 'Please enter a password.';
        notificationState.type = 'warning';
        notificationState.show = true;
        return;
    }

    // 檢查密碼長度是否足夠
    if (password.value.length < 6) {
        notificationState.message = '密碼長度至少6個字元。';
        notificationState.type = 'warning';
        notificationState.show = true;
        password.value = '';  // 清空密碼
        return;
    }

    try {
        const data = {
            mail: mail.value,
            password: password.value,
        }

        const res = await loginApi(data);
        if (res.data.code === 1) {
            const user = res.data.data;
            localStorage.setItem("userInfo", JSON.stringify(user));
            store.dispatch('initializeStore');
            router.push({ name: 'social.list' });
        } else {
            notificationState.message = res.data.msg;
            notificationState.type = 'error';
            notificationState.show = true;
        }
    } catch (err) {
        notificationState.message = `Request failed: ${err.message}`;
        notificationState.type = 'error';
        notificationState.show = true;
        console.error("請求出錯:", err.message);
    }
};

</script>