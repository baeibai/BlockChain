<template>
    <div class="row" v-for="(item, index) in followed" :key="index">
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
                                  <span>最後發文時間: {{ item.fglastpost }}</span>
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
import { myfollowedApi } from '@/api/profile.js';
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const followed = ref([]);
const fetchFollowed = async (userId) => {
    const response = await myfollowedApi(userId);
    if (response.data.code === 1) {
        followed.value = response.data.data;
        // console.log("followed", followed.value);
    } else {
        console.log('error');
    }
}
onMounted(() => {
    fetchFollowed(props.id);
});
</script>

<style lang="less"></style>