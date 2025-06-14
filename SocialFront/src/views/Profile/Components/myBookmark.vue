<template>
    <div class="tab-pane fade show active" id="pills-collectarticle">
        <div class="card">
            <div class="card-body">
                <div v-for="(ma, maindex) in mybookmark" :key="maindex" class="borderbox1 mt-3 rounded d-flex">
                    <div class="user-img me-2">
                        <!-- <img :src="ma.mauserimg" alt="userimg" class="avatar-40 rounded-circle" loading="lazy"> -->
                    </div>
                    <div class="borderbox border rounded p-2 w-100">
                        <div class="d-flex align-items-center flex-wrap">
                            <h6>{{ ma.authorName }}</h6>
                            <div class="ms-auto d-flex align-items-center">
                                <i class="material-symbols-outlined md-16">schedule</i>
                                <span class="mx-1"><small>{{ formatDate(ma.publicationDate) }}</small></span>
                            </div>
                        </div>
                        <h6>{{ ma.content }}</h6>
                        <div class="row mt-2">
                            <div class="col-lg-4 col-md-6 mt-1" v-for="(maimg, imgindex) in ma.maimage" :key="imgindex">
                                <img :src="maimg.avatar" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                            </div>
                        </div>
                        <div class="d-flex flex-wrap justify-content-evenly mb-0 mt-2">
                            <div class="d-flex align-items-center">
                                <i class="material-symbols-outlined pe-2 md-18 text-primary">arrow_circle_up</i>
                                <h6 class="ms-1">{{ ma.likeCount }} 支持者</h6>
                            </div>
                            <hr class="hr-vertical">
                            <div class="d-flex align-items-center">
                                <i class="material-symbols-outlined pe-2 md-18 text-primary">arrow_circle_down</i>
                                <h6 class="ms-1">{{ ma.dislikeCount }} 不支持者</h6>
                            </div>
                            <hr class="hr-vertical">
                            <div class="d-flex align-items-center">
                                <i class="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>
                                <h6 class="ms-1">{{ ma.commentCount }} 評論數</h6>
                            </div>
                            <i class="material-symbols-outlined pe-2 md-18 text-primary custom-color" @click="toggleIcon(maindex, ma.id)">
                                bookmark
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup>
import { onMounted, ref, defineProps } from 'vue';
import { mybookmarkApi } from '@/api/profile.js';
import {removeBookmarkApi} from '@/api/article.js';
import { formatDate } from "@/utilities/tools.js";
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});
const mybookmark = ref([]);
const fetchMyBookmark = async () => {
    const response = await mybookmarkApi(props.id);
    if (response.data.code === 1) {
        mybookmark.value = response.data.data;
        console.log(mybookmark.value, "test");
    } else {
        console.log('error');
    }
}

const removeBookmark = async (postId) => {
    const response = await removeBookmarkApi(props.id, postId);
    if (response.data.code !== 1) {
        console.error("取消收藏錯誤!");
    }
}

function toggleIcon(index, postId) {
    removeBookmark(postId).then(() => {
        mybookmark.value.splice(index, 1); // 從列表中移除該文章
    }).catch((error) => {
        console.error("Error removing bookmark:", error);
    });
}
onMounted(() => {
    fetchMyBookmark();
});
</script>

<style scoped>
.custom-color {
    color: red !important;
}
</style>