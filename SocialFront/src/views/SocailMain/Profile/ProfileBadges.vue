<template>
  <div v-if="!showPost" class="row">
    <div>
      <h1>看板</h1>
    </div>
    <div class="col-sm-12">
      <iq-card>
        <div class="card-body profile-page p-0"></div>
      </iq-card>
    </div>
    <div class="col-lg-4 col-md-6 mt-5" v-for="(profile, index) in boards" :key="index">
      <iq-card class="card-block card-stretch card-height">
        <div class="card-body">
          <div class="badges text-start">
            <div class="badges-icon">
              <img :src="'data:image/png;base64,' + profile.logoBase64" alt="">
            </div>
            <div>
              <h3 class="mb-2 title">
                <a :href="`/${profile.path}`">{{ profile.name }}</a>
              </h3>
            </div>

            <!-- <button 
              type="button" 
              class="btn btn-outline-primary mb-3 me-1"
              @click="toggleFollow(index)"
            >
              {{ profile.following ? '追蹤中' : '追蹤' }}
            </button> -->
            <p>{{ profile.desc }}</p>
            <div class="link-style" @click="showPost = true; boardId = profile.id">瀏覽看板</div>
          </div>
        </div>
      </iq-card>
    </div>
  </div>

  <SocialPost v-if="showPost" :boardId="boardId" />

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { boardListApi } from '@/api/home.js';
import SocialPost from '@/views/Apps/Social/Components/SocialPost.vue';
const boards = ref([]);
const boardId = ref(0);
const showPost = ref(false);
boardListApi()
  .then((res) => {
    if (res.data.code === 1) {
      boards.value = res.data.data || [];
    } else {
      console.error("請求出錯:", res.data.msg);
    }
  })
  .catch((err) => {
    console.error("請求出錯:", err);
  });
const toggleFollow = (index) => {
  // profiles.value[index].following = !profiles.value[index].following;
};

// 模擬數據獲取
const fetchProfiles = () => {
  // 若需要從API獲取數據可在此調用
};

onMounted(() => {
  fetchProfiles();
});
</script>

<style scoped>
.badges-icon {
  max-width: 100px;
  /* Adjust as needed */
  max-height: 100px;
  /* Adjust as needed */
  overflow: hidden;
  margin: 10px
    /* Center the icon horizontally */
}

.badges-icon img {
  width: 60%;
  height: auto;
}
</style>
