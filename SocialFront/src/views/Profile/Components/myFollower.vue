<template>
    <div class="row" v-for="(item, index) in follower" :key="index">
        <div class="col-lg-6 col-md-6">
            <div class="card">
                <div class="profile-header-image">
                    <div class="profile-info p-4">
                        <div class="user-detail">
                            <div class="d-flex flex-wrap justify-content-between align-items-start">
                                <div class="profile-detail d-flex">
                                    <div class="user-data-block mt-md-0 mt-2">
                                        <img class="avatar-60 rounded-circle" :src="'data:image/png;base64,' + item.avatar" alt="">
                                    </div>
                                </div>
                                <button type="button" class="btn btn-outline-primary mb-3 me-1"
                                  @click="togglemyFollowing(item.id)">
                                  取消追蹤
                                </button>
                            </div>
                            <h4><a href="/friendprofile">&nbsp;{{ item.name }}</a></h4>
                            <div class="mt-1">
                                <div class="stat-item">
                                    <span>文章數量: {{ item.articleCount }}</span>
                                </div>
                                <div class="stat-item">
                                    <span>我關注中: {{ item.followerCount }}</span>
                                </div>
                                <div class="stat-item">
                                    <span>已關注我: {{ item.followedCount }}</span>
                                </div>
                                <!-- <div class="stat-item">
                                    <span>最後發文時間: {{ item.frlastpost }}</span>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { myfollowerApi, unTrackApi } from '@/api/profile.js';
import { useStore } from 'vuex'
const store = useStore();
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});
const follower = ref([]);
const fetchFollower = async (userId) => {
    const response = await myfollowerApi(userId);
    if (response.data.code === 1) {
        follower.value = response.data.data;
        console.log("follower", follower.value);
    } else {
        console.log('error');
    }
}

const togglemyFollowing = async (id) => {
  const response = await unTrackApi(id, store.state.userInfo?.id);
  console.log(response.data);
  if (response.data.code !== 1) {
    console.error('失敗');
    return;
  }
//   profile.value.myFollowing = !profile.value.myFollowing;
}

onMounted(() => {
    fetchFollower(props.id);
});
</script>

<style lang="less"></style>