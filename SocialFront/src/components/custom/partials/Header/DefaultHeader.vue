<template>
    <div class="iq-top-navbar">
        <nav class="nav navbar navbar-expand-lg navbar-light iq-navbar p-lg-0">
            <div class="container-fluid navbar-inner">
                <div class="d-flex align-items-center gap-3">
                    <router-link :to="{ name: 'social.list' }"
                        class="d-flex align-items-center gap-2 iq-header-logo d-none d-lg-flex iq-logo-none">
                        <!-- <svg width="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M1.67733 9.50001L7.88976 20.2602C9.81426 23.5936 14.6255 23.5936 16.55 20.2602L22.7624 9.5C24.6869 6.16666 22.2813 2 18.4323 2H6.00746C2.15845 2 -0.247164 6.16668 1.67733 9.50001ZM14.818 19.2602C13.6633 21.2602 10.7765 21.2602 9.62181 19.2602L9.46165 18.9828L9.46597 18.7275C9.48329 17.7026 9.76288 16.6993 10.2781 15.8131L12.0767 12.7195L14.1092 16.2155C14.4957 16.8803 14.7508 17.6132 14.8607 18.3743L14.9544 19.0239L14.818 19.2602ZM16.4299 16.4683L19.3673 11.3806C18.7773 11.5172 18.172 11.5868 17.5629 11.5868H13.7316L15.8382 15.2102C16.0721 15.6125 16.2699 16.0335 16.4299 16.4683ZM20.9542 8.63193L21.0304 8.5C22.1851 6.5 20.7417 4 18.4323 4H17.8353L17.1846 4.56727C16.6902 4.99824 16.2698 5.50736 15.9402 6.07437L13.8981 9.58676H17.5629C18.4271 9.58676 19.281 9.40011 20.0663 9.03957L20.9542 8.63193ZM14.9554 4C14.6791 4.33499 14.4301 4.69248 14.2111 5.06912L12.0767 8.74038L10.0324 5.22419C9.77912 4.78855 9.48582 4.37881 9.15689 4H14.9554ZM6.15405 4H6.00746C3.69806 4 2.25468 6.50001 3.40938 8.50001L3.4915 8.64223L4.37838 9.04644C5.15962 9.40251 6.00817 9.58676 6.86672 9.58676H10.2553L8.30338 6.22943C7.9234 5.57587 7.42333 5.00001 6.8295 4.53215L6.15405 4ZM5.07407 11.3833L7.88909 16.2591C8.05955 15.7565 8.28025 15.2702 8.54905 14.8079L10.4218 11.5868H6.86672C6.26169 11.5868 5.66037 11.5181 5.07407 11.3833Z"
                                fill="currentColor" />
                        </svg> -->
                        <img src="@/assets/images/icon/blogchain_tech_icon_output.png" width="50" alt="Custom SVG">
                    </router-link>
                    <router-link class="sidebar-toggle" @click="toggleSidebar" data-toggle="sidebar" data-active="true"
                        to="#">
                        <div class="icon material-symbols-outlined iq-burger-menu">
                            menu
                        </div>
                    </router-link>
                </div>
                <div class="d-block d-lg-none">
                    <router-link :to="{ name: 'social.list' }" class="d-flex align-items-center gap-2 iq-header-logo">
                        <svg width="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M1.67733 9.50001L7.88976 20.2602C9.81426 23.5936 14.6255 23.5936 16.55 20.2602L22.7624 9.5C24.6869 6.16666 22.2813 2 18.4323 2H6.00746C2.15845 2 -0.247164 6.16668 1.67733 9.50001ZM14.818 19.2602C13.6633 21.2602 10.7765 21.2602 9.62181 19.2602L9.46165 18.9828L9.46597 18.7275C9.48329 17.7026 9.76288 16.6993 10.2781 15.8131L12.0767 12.7195L14.1092 16.2155C14.4957 16.8803 14.7508 17.6132 14.8607 18.3743L14.9544 19.0239L14.818 19.2602ZM16.4299 16.4683L19.3673 11.3806C18.7773 11.5172 18.172 11.5868 17.5629 11.5868H13.7316L15.8382 15.2102C16.0721 15.6125 16.2699 16.0335 16.4299 16.4683ZM20.9542 8.63193L21.0304 8.5C22.1851 6.5 20.7417 4 18.4323 4H17.8353L17.1846 4.56727C16.6902 4.99824 16.2698 5.50736 15.9402 6.07437L13.8981 9.58676H17.5629C18.4271 9.58676 19.281 9.40011 20.0663 9.03957L20.9542 8.63193ZM14.9554 4C14.6791 4.33499 14.4301 4.69248 14.2111 5.06912L12.0767 8.74038L10.0324 5.22419C9.77912 4.78855 9.48582 4.37881 9.15689 4H14.9554ZM6.15405 4H6.00746C3.69806 4 2.25468 6.50001 3.40938 8.50001L3.4915 8.64223L4.37838 9.04644C5.15962 9.40251 6.00817 9.58676 6.86672 9.58676H10.2553L8.30338 6.22943C7.9234 5.57587 7.42333 5.00001 6.8295 4.53215L6.15405 4ZM5.07407 11.3833L7.88909 16.2591C8.05955 15.7565 8.28025 15.2702 8.54905 14.8079L10.4218 11.5868H6.86672C6.26169 11.5868 5.66037 11.5181 5.07407 11.3833Z"
                                fill="currentColor" />
                        </svg>
                    </router-link>
                </div>

                <div class="iq-search-bar device-search position-relative">
                    <div>
                        <form action="#" class="searchbox" data-bs-target="#exampleModalFullscreenSm">
                            <a class="search-link d-none d-lg-block" href="javascript:void(0);" @click="handleSerach()">
                                <span class="material-symbols-outlined">search</span>
                            </a>
                            <input type="text" class="text search-input form-control bg-soft-primary d-none d-lg-block"
                                v-model="searchBox" placeholder="Search here...">
                        </form>
                    </div>

                </div>

                <div class="offcanvas offcanvas-end iq-profile-menu-responsive" tabindex="-1" id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header">
                        <h5 id="offcanvasRightLabel">General Setting</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body pt-0">
                        <ul class="navbar-nav ms-auto navbar-list">
                            <li class="nav-item" title="首頁">
                                <router-link :to="{ name: 'social.list' }" class="d-flex align-items-center" >
                                    <i class="material-symbols-outlined">home</i>
                                    <span class="mobile-text d-lg-none ms-3">首頁</span>
                                </router-link>
                            </li>
                            <li class="nav-item dropdown d-none d-lg-block">
                                <a href="javascript:void(0);"
                                    class="search-toggle dropdown-toggle d-flex align-items-center"
                                    id="notification-drop" data-bs-toggle="dropdown">
                                    <i class="material-symbols-outlined">notifications</i>
                                </a>
                                <div class="sub-drop dropdown-menu" aria-labelledby="notification-drop">
                                    <div class="card shadow-none m-0">
                                        <div class="card-header d-flex justify-content-between bg-primary">
                                            <div class="header-title bg-primary">
                                                <h5 class="mb-0 text-white">All Notifications</h5>
                                            </div>
                                            <!-- <small class="badge bg-light text-dark">3</small> -->
                                        </div>
                                        <div class="card-body p-0" v-for="(noti, index) in notification" :key="index">
                                            <router-link
                                                :to="{ name: 'social.profile2', params: { userid: noti.userid } }"
                                                class="iq-sub-card">
                                                <div class="d-flex align-items-center">
                                                    <div class="">

                                                        <img class="avatar-40 rounded" src="@/assets/images/user/01.jpg"
                                                            alt="">
                                                        <!-- <img class="avatar-40 rounded" :src="'data:image/png;base64,' + avatar" alt=""> -->

                                                    </div>
                                                    <div class="ms-3 w-100">
                                                        <h6 class="mb-0 ">{{ noti.username }}</h6>
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <p class="mb-0">{{ noti.message || noti }}</p>
                                                            <small class="float-right font-size-12">Just Now</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item d-lg-none">
                                <router-link :to="{ name: 'social.notification' }" class="d-flex align-items-center" title="通知">
                                    <i class="material-symbols-outlined">notifications</i>
                                    <span class="mobile-text ms-3">Notifications</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'app.smartContractPage' }" class="d-flex align-items-center" title="智能合約">
                                    <i class="material-symbols-outlined">gavel</i> <!-- gavel 可以代表合約或者法律相關的內容 -->
                                    <span class="mobile-text d-lg-none ms-3" >智能合約</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'app.composebody' }" class="d-flex align-items-center" title="發文">
                                    <i class="material-symbols-outlined">edit</i>
                                    <span class="mobile-text d-lg-none ms-3" >發文</span>
                                </router-link>
                            </li>
                            <template v-if="isLoggedIn">
                                <li class="nav-item dropdown d-none d-lg-block">
                                    <a href="javascript:void(0);" class="d-flex align-items-center dropdown-toggle"
                                        id="drop-down-arrow" data-bs-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        <img :src="'data:image/png;base64,' + avatar"
                                            class="img-fluid rounded-circle me-3" alt="user" loading="lazy">
                                        <div class="caption">
                                            <h6 class="mb-0 line-height">{{ userName }}</h6>
                                        </div>
                                    </a>
                                    <div class="sub-drop dropdown-menu caption-menu" aria-labelledby="drop-down-arrow">
                                        <div class="card shadow-none m-0">
                                            <div class="card-body p-0">
                                                <div class="d-flex align-items-center iq-sub-card border-0">
                                                    <span class="material-symbols-outlined" >
                                                        line_style
                                                    </span>
                                                    <div class="ms-3">
                                                        <router-link :to="{ name: 'social.myprofile' }" class="mb-0 h6" title="個人資料">
                                                            我的個人資料
                                                        </router-link>
                                                    </div>
                                                </div>
                                                <div class="d-flex align-items-center iq-sub-card border-0">
                                                    <span class="material-symbols-outlined" >
                                                        edit_note
                                                    </span>
                                                    <div class="ms-3">
                                                        <router-link :to="{ name: 'user.profile-edit' }"
                                                            class="mb-0 h6" title="編輯個人資料">
                                                            編輯個人資料
                                                        </router-link>
                                                    </div>
                                                </div>
                                                <div class="d-flex align-items-center iq-sub-card">
                                                    <span class="material-symbols-outlined" title="登出">
                                                        login
                                                    </span>
                                                    <div class="ms-3" @click="logout" title="登入">
                                                        Sign out
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="nav-item d-lg-none">
                                    <router-link :to="{ name: 'social.myprofile' }"
                                        class="dropdown-toggle d-flex align-items-center">
                                        <span class="material-symbols-outlined">person</span>
                                        <span class="mobile-text ms-3">Profile</span>
                                    </router-link>
                                </li>
                            </template>
                            <template v-else>
                                <li class="nav-item">
                                    <router-link :to="{ name: 'auth.sign-in' }" class="d-flex align-items-center">
                                        <i class="material-symbols-outlined">login</i>
                                        <span class="mobile-text d-lg-none ms-3" title="登入">登入</span>
                                    </router-link>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';
import { useStore } from 'vuex';
import { searchApi, notificationApi } from '@/api/home.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
    image: {
        type: String,
        default: require('@/assets/images/logo.png')
    }
});

const store = useStore();
const sidebarType = computed(() => store.getters['setting/sidebar_type']);

const isLoggedIn = computed(() => !!store.state.userInfo);
const userName = computed(() => store.state.userInfo?.name || 'Guest');
const avatar = computed(() => store.state.userInfo?.avatar || '@/assets/images/default-user.jpg');
const searchBox = ref('');
const notification = ref([]);


const handleSerach = async () => {
    const res = await searchApi(searchBox.value);
    if(res.data.code === 1) {
        const data = res.data.data;
        store.dispatch('setSearchData', data); 
        // console.log(data);
    }
    location.reload();
}

// const handleNotification = async () => {
//     const response = await notificationApi(store.state.userInfo.id);
//     if (response.data.code === 1) {
//         data.value = response.data.data;
//         if(data.value.type === 'like'){
//             notification.value = `${data.value.userId} 按like了你的文章`;
//         }else{
//             notification.value = data.value;
//         }
//         console.log(notification.value);
//     }else{
//         console.log('error');
//     }
// }

const handleNotification = async () => {
    try {
        const response = await notificationApi(store.state.userInfo.id);
        if (response.data.code === 1) {
            const notifications = response.data.data.map(noti => {
                if (noti.type === 'like') {
                    return {
                        ...noti,
                        message: `${noti.username} 對你的文章按讚`
                    };
                }
                return noti;
            });
            notification.value = notifications;
            console.log(notification.value);
        } else {
            console.log('error');
        }
    } catch (error) {
        console.error('API call failed:', error);
    }
};

const toggleSidebar = () => {
    if (sidebarType.value.includes('sidebar-mini')) {
        store.dispatch(
            'setting/sidebar_type',
            sidebarType.value.filter((item) => item !== 'sidebar-mini')
        );
    } else {
        store.dispatch('setting/sidebar_type', [...sidebarType.value, 'sidebar-mini']);
    }
};


const logout = () => {
    // 刪除 LocalStorage 中的資料
    localStorage.removeItem('userInfo');

    // 重置 Vuex 狀態
    store.commit('logout');

    // 重定向到登錄頁面
    router.push({ name: 'auth.sign-in' });
}

onMounted(() => {
    // handleNotification();
});
</script>