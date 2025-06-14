<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-9 row m-0 p-0">
        <div class="col-sm-12">
          <tab-content id="pills-tabContent-2">
            <tab-content-item :active="true" id="profile-feed" aria-labelled-by="pills-feed-tab">
            </tab-content-item>
          </tab-content>
        </div>
        <tab-content id="pills-tabContent-2">
          <tab-content-item :active="true" id="profile-feed" class="m-2" aria-labelled-by="pills-feed-tab">
            <SocialPost :boardId="boardId" />
          </tab-content-item>
        </tab-content>
      </div>
      <div class="col-lg-3">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">看板</h4>
          </template>
          <template v-slot:body>
            <ul class="media-story list-inline m-0 p-0">
              <li v-for="(item, index) in boards" :key="index" class="d-flex mb-3 align-items-center active"
                :class="item.isActive + ' ' + item.class" @click="handleBoardClick(item.id)">
                <img :src="'data:image/png;base64,' + item.logoBase64" alt="story-img"
                  class="img-fluid rounded-image" />
                <div class="stories-data ms-3">
                  <h5>{{ item.name }}</h5>
                </div>
              </li>
            </ul>
            <a href="profilebadges" class="btn btn-primary d-block mt-3">查看全部</a>
          </template>
        </iq-card>
      </div>
      <!-- <SocialBoard /> -->
      <div class="col-sm-12 text-center">
        <img src="../../../assets/images/page-img/page-load-loader.gif" alt="loader" style="height: 100px;">
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import SocialPost from '../Social/Components/SocialPost';
import { boardListApi } from '@/api/home.js';
import { saveToLocalStorage } from "@/utilities/tools.js";
const boardId = ref(null);
const handleBoardClick = (id) => {
  console.log("handleBoardClick:", id);
  boardId.value = id;
};

const boards = ref([]);

boardListApi()
  .then((res) => {
    if (res.data.code === 1) {
      boards.value = res.data.data || [];
      const boardsData = boards.value.map((item) => {
        return {
          id: item.id,
          name: item.name
        };
      });
      saveToLocalStorage("boards", boardsData);
    } else {
      console.error("請求出錯:", res.data.msg);
    }
  })
  .catch((err) => {
    console.error("請求出錯:", err);
  });

</script>

<style scoped>
.rounded-image {
  /* width: 100px;  */
  /* height: 100px;  */
  object-fit: cover; /* 確保圖片不會失真 */
  border-radius: 15px; /* 設置邊角弧度 */
}</style>
