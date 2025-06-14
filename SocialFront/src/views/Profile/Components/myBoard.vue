<template>
    <div class="tab-pane fade" id="pills-tag">
        <div class="row">
            <div class="col-lg-6 col-md-6" v-for="(tag, tagindex) in myfollowboard" :key="tagindex">
                <div class="card">
                    <div class="profile-page p-0 card-body">
                        <div class="profile-header-image">
                            <div class="profile-info p-4">
                                <div class="user-detail">
                                    <div class="d-flex flex-wrap justify-content-between align-items-start">
                                        <div class="profile-detail d-flex">
                                            <div class="user-data-block mt-md-0 mt-2">
                                                <h4 class="text-primary">
                                                    <img class="avatar-60 rounded-circle" :src="tag.tagimg" alt="">
                                                    <a href="/friendprofile">&nbsp;{{ tag.name }}</a>
                                                </h4>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-outline-primary mb-2 me-1 mt-2"
                                            @click="toggleFollow(tagindex)">
                                            {{ tag.tgfollowing ? '追蹤中' : '追蹤' }}
                                        </button>
                                    </div>
                                    <h6 class="mt-3">{{ tag.description }}</h6> <!-- 移除多餘的 <br> 並使用 margin 調整間距 -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { onMounted, ref, defineProps } from 'vue';
import { myfollowboardApi } from '@/api/profile.js';

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const myfollowboard = ref([]);

const fetchMyFollowBoard = async () => {
    const response = await myfollowboardApi(props.id);
    if (response.data.code === 1) {
        myfollowboard.value = response.data.data;
        console.log('board');
    } else {
        console.error('Error fetching follow board data');
    }
};

const toggleFollow = (tagindex) => {
    const tag = myfollowboard.value[tagindex];
    tag.tgfollowing = !tag.tgfollowing;
    // 在這裡你可以添加 API 調用來更新後端的跟隨狀態
};

onMounted(() => {
    fetchMyFollowBoard();
});
</script>


<style lang="less"></style>