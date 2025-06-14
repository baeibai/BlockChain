<template>
    <!-- Sidebar Menu Start -->
    <ul class="navbar-nav iq-main-menu" id="sidebar-menu">
        <br>
        <li class="nav-item">
            <router-link :class="checkActive('social.list') ? 'active nav-link' : 'nav-link'" aria-current="page"
                :to="{ name: 'social.list' }">
                <i class="icon material-symbols-outlined">
                    newspaper
                </i>
                <span class="item-name">首頁</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link v-if="logined" :class="checkActive('social.myprofile') ? 'active nav-link' : 'nav-link'"
                aria-current="page" :to="{ name: 'social.myprofile' }">
                <i class="icon material-symbols-outlined">
                    person
                </i>
                <span class="item-name">個人資料</span>
            </router-link>
            <span v-else class="nav-link" @click="redirectLogin">
                <i class="icon material-symbols-outlined">
                    person
                </i>
                <span class="item-name">個人資料</span>
            </span>
        </li>
        <li class="nav-item">
            <router-link v-if="logined" :class="checkActive('social.myarticles') ? 'active nav-link' : 'nav-link'"
                aria-current="page" :to="{ name: 'social.myarticles' }">
                <i class="icon material-symbols-outlined">
                    article
                </i>
                <span class="item-name">我的文章</span>
            </router-link>
            <span v-else class="nav-link" @click="redirectLogin">
                <i class="icon material-symbols-outlined">
                    article
                </i>
                <span class="item-name">我的文章</span>
            </span>
        </li>

        <li class="nav-item">
            <router-link v-if="logined" :class="checkActive('social.profilebadges') ? 'active nav-link' : 'nav-link'"
                aria-current="page" :to="{ name: 'social.profilebadges' }">
                <i class="icon material-symbols-outlined">
                    sell
                </i>
                <span class="item-name">標籤</span>
            </router-link>
            <span v-else class="nav-link" @click="redirectLogin">
                <i class="icon material-symbols-outlined">
                    sell
                </i>
                <span class="item-name">標籤</span>
            </span>
        </li>
        <li class="nav-item">
            <router-link :class="checkActive('blog.blog-list') ? 'active nav-link' : 'nav-link'"
                :to="{ name: 'blog.blog-list' }">
                <i class="icon material-symbols-outlined">
                    data_check
                </i>
                <span class="item-name">驗證總覽</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link v-if="logined" :class="checkActive('app.composebody') ? 'active nav-link' : 'nav-link'"
                aria-current="page" :to="{ name: 'app.composebody' }">
                <i class="material-symbols-outlined">
                    edit
                </i>
                <span class="item-name">發文</span>
            </router-link>
            <span v-else class="nav-link" @click="redirectLogin">
                <i class="material-symbols-outlined">
                    edit
                </i>
                <span class="item-name">發文</span>
            </span>
        </li>
        <li class="nav-item">
            <router-link v-if="logined" :class="checkActive('verify.verify-article') ? 'active nav-link' : 'nav-link'"
                aria-current="page" :to="{ name: 'verify.verify-article' }">
                <i class="material-symbols-outlined">
                    verified
                </i>
                <span class="item-name">查驗文章</span>
            </router-link>
            <span v-else class="nav-link" @click="redirectLogin">
                <i class="material-symbols-outlined">
                    verified
                </i>
                <span class="item-name">查驗文章</span>
            </span>
        </li>

    </ul>
    <!-- Sidebar Menu End -->
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

// 獲取當前用戶是否登入
const logined = store.state.isLoggedIn;

// 使用 `useRoute` 來獲取當前路由
const route = useRoute();

// 判斷路由是否處於激活狀態
const checkActive = (routeName) => {
    return route.name === routeName || routeName.includes(route.name);
};

// 導向登入頁面
const redirectLogin = () => {
    router.push("/");  // 使用 router.push 進行導航
};
</script>
