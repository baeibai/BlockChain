<template>
  <div class="content-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="card">
            <div class="card-body">
              <div class="text-center">
                <img class="img-fluid rounded-circle avatar-130" :src="'data:image/png;base64,' + profile.avatar"
                  alt="profile-img">
                <h4 class="mt-2">{{ profile.name }}</h4>
                <br><br>
              </div>
              <div class="d-flex justify-content-evenly">
                <p class="mb-0">文章數量</p>
                <p class="mb-0">我關注中</p>
                <p class="mb-0">已關注我</p>
              </div>
              <div class="d-flex justify-content-evenly">
                <h6 class="mb-0 fw-bold">{{ profile.articleCount }}</h6>
                <h6 class="mb-0 fw-bold">{{ profile.followerCount }}</h6>
                <h6 class="mb-0 fw-bold">{{ profile.followedCount }}</h6>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header d-flex justify-content-between">
              <div class="header-title">
                <h4 class="card-title">個人資料</h4>
              </div>
            </div>
            <div class="card-body">
              <div class="ui-block-content">
                <ul class="list-unstyled ">
                  <li class="mb-4">
                    <span class="text">{{ profile.intro }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card cardnavbar">
            <div class="user-tabing">
              <ul
                class="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0 round">
                <li class="nav-item col-12 col-sm-2 p-0" @click="toggleComponents('follower')">
                  <a class="nav-link" href="#pills-follower" data-bs-toggle="pill" data-bs-target="#pills-follower"
                    role="button">我關注中</a>
                </li>
                <li class="nav-item col-12 col-sm-2 p-0" @click="toggleComponents('follow')">
                  <a class="nav-link " href="#pills-follow" data-bs-toggle="pill" data-bs-target="#pills-follow"
                    role="button">已關注我</a>
                </li>
                <li class="nav-item col-12 col-sm-2 p-0" @click="toggleComponents('article')">
                  <a class="nav-link  active" href="#pills-myarticle" data-bs-toggle="pill"
                    data-bs-target="#pills-myarticle" role="button">我的文章</a>
                </li>
                <li class="nav-item col-12 col-sm-2 p-0" @click="toggleComponents('bookmark')">
                  <a class="nav-link" href="#pills-collectarticle" data-bs-toggle="pill"
                    data-bs-target="#pills-collectarticle" role="button">收藏文章</a>
                </li>
                <li class="nav-item col-12 col-sm-2 p-0" @click="toggleComponents('board')">
                  <a class="nav-link" href="#pills-tag" data-bs-toggle="pill" data-bs-target="#pills-tag"
                    role="button">追蹤看板</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="tab-content forum-content">
            <MyFollower v-if="showComponent === 'follower'" :id="userId"></MyFollower>
            <Followed v-if="showComponent === 'follow'" :id="userId"></Followed>
            <MyArticle v-if="showComponent === 'article'" :id="userId"></MyArticle>
            <MyBookmark v-if="showComponent === 'bookmark'" :id="userId"></MyBookmark>
            <myBoard v-if="showComponent === 'board'" :id="userId"></myBoard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { profileApi } from '@/api/profile.js';
import MyFollower from './Components/myFollower.vue'
import Followed from './Components/followed.vue'
import MyArticle from './Components/myArticle.vue'
import MyBookmark from './Components/myBookmark.vue'
import myBoard from './Components/myBoard.vue';


const showComponent = ref('article');

const toggleComponents = (str) => {
  showComponent.value = str;
}


const store = useStore();
const profile = ref([]);




const userId = ref(store.state.userInfo?.id);
const fetchProfile = async () => {
  const response = await profileApi(store.state.userInfo?.id, null);
  if (response.data.code === 1) {
    profile.value = response.data.data;
    console.log(profile.value);
  } else {
    console.log('error');
  }
}






// 如果你需要在组件挂载时执行某些操作，可以使用onMounted钩子
onMounted(() => {
  // 例如加载数据等
  // userId.value = ;
  fetchProfile();
  // fetchMyBookmark();
});
</script>