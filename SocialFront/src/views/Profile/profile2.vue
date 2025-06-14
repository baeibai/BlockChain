<template>
  <div class="content-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="card mb-3">
            <div class="card-body text-center">
              <img class="img-fluid rounded-circle avatar-130" :src="'data:image/png;base64,' + profile.avatar" alt="profile-img">
              <h4 class="mt-2 mb-2">{{ profile.name }}</h4>
              <button v-if="judgeYourself()" class="btn btn-outline-primary mb-3" @click="togglemyFollowing">
                {{ profile.myFollowing ? '追蹤中' : '追蹤' }}
              </button>
              <div class="d-flex justify-content-evenly mt-2">
                <div>
                  <p class="mb-0">文章數量</p>
                  <h6 class="mb-0 fw-bold">{{ profile.articleCount }}</h6>
                </div>
                <div>
                  <p class="mb-0">關注中</p>
                  <h6 class="mb-0 fw-bold">{{ profile.followerCount }}</h6>
                </div>
                <div>
                  <p class="mb-0">被追蹤</p>
                  <h6 class="mb-0 fw-bold">{{ profile.followedCount }}</h6>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">個人資料</h4>
            </div>
            <div class="card-body">
              <p>{{ profile.intro }}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card cardnavbar mb-3">
            <div class="user-tabing">
              <ul class="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0 round">
                <li class="nav-item col-sm-2 p-0" @click="toggleFollower">
                  <a class="nav-link" href="#pills-follower" data-bs-toggle="pill" role="button">關注者</a>
                </li>
                <li class="nav-item col-sm-2 p-0" @click="toggleFollowed">
                  <a class="nav-link" href="#pills-follow" data-bs-toggle="pill" role="button">追蹤中</a>
                </li>
                <li class="nav-item col-sm-2 p-0" @click="toggleArticle">
                  <a class="nav-link active" href="#pills-myarticle" data-bs-toggle="pill" role="button">他的文章</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="tab-content forum-content">
            <Article v-if="showArticle" :id="userId"></Article>
            <Follower v-if="showFollower" :id="userId"></Follower>
            <Followed v-if="showFollowed" :id="userId"></Followed>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { useRoute } from 'vue-router'
import { profileApi, trackApi, unTrackApi } from '@/api/profile.js';
import Follower from './Components/follower.vue'
import Followed from './Components/followed.vue'
import Article from './Components/article.vue'

import { useStore } from 'vuex'
const store = useStore();

const route = useRoute();

const profile = ref([]);

const showArticle = ref(true);
const showFollower = ref(false);
const showFollowed = ref(false);

const toggleFollower = () => {
  showFollower.value = true;
  showFollowed.value = false;
  showArticle.value = false;
}

const toggleFollowed = () => {
  showFollowed.value = true;
  showFollower.value = false;
  showArticle.value = false;
}


const toggleArticle = () => {
  showArticle.value = true;
  showFollower.value = false;
  showFollowed.value = false;
}

const judgeYourself = () => {
  return String(store.state.userInfo?.id) !== String(userId);
};

const fetchProfile = async (userId) => {
  console.log("fetchProfile:", userId);
  const response = await profileApi(userId, store.state.userInfo?.id);
  if (response.data.code === 1) {
    profile.value = response.data.data;
    console.log(profile.value);
  } else {
    console.log('error');
  }
}


const togglemyFollowing = async () => {
  if(store.state.userInfo === null) {
    alert('請先登入');
    return;
  }
  console.log(profile.value.myFollowing);
  const response = profile.value.myFollowing ? await trackApi(store.state.userInfo?.id, userId.value) : await unTrackApi(userId.value, store.state.userInfo?.id);
  console.log(response.data);
  if (response.data.code !== 1) {
    console.error('失敗');
    return;
  }
  profile.value.myFollowing = !profile.value.myFollowing;
}


let userId = ref(route.params.userId);
onMounted(() => {
  // userId.value = route.params.userId;
  fetchProfile(userId.value);
})
</script>