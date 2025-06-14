<template>
    <div class="tab-pane fade show active" id="pills-myarticle">
        <div class="card">
            <div class="card-body">
                <div v-for="(item, index) in article" :key="index" class="borderbox1 mt-3 rounded">
                    <div class="borderbox border rounded p-3">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <div>
                                <h6 class="mb-1">{{ item.content }}</h6>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="material-symbols-outlined md-16">schedule</i>
                                <span class="mx-1"><small>{{ formatDate(item.publicationDate) }}</small></span>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-lg-4 col-md-6 mt-1" v-for="(maimg, imgindex) in item.maimage"
                                :key="imgindex">
                                <img :src="maimg.maimage" class="img-fluid rounded" alt="Responsive image"
                                    loading="lazy" />
                            </div>
                        </div>
                        <div class="d-flex flex-wrap justify-content-between align-items-center mt-3">
                            <div class="d-flex align-items-center">
                                <!-- <i class="material-symbols-outlined pe-2 md-18 text-primary">arrow_circle_up</i> -->
                                <h6 class="ms-1">{{ item.likeCount }} 支持者</h6>
                            </div>
                            <div class="d-flex align-items-center">
                                <!-- <i class="material-symbols-outlined pe-2 md-18 text-primary">arrow_circle_down</i> -->
                                <h6 class="ms-1">{{ item.dislikeCount }} 不支持者</h6>
                            </div>
                            <div class="d-flex align-items-center">
                                <!-- <i class="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i> -->
                                <h6 class="ms-1">{{ item.commentCount }} 評論數</h6>
                            </div>
                            <i class="material-symbols-outlined custom-color" @click="toggleIcon(index, item.id)">
                                <!-- {{ item.iscollect ? 'bookmark_heart' : 'bookmark' }} -->
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import {removeBookmarkApi} from '@/api/article.js';
import { myArticleApi } from '@/api/profile.js';
import { formatDate } from "@/utilities/tools.js";
import { useStore } from 'vuex'
const store = useStore();
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});
const article = ref([]);

const fetchArticle = async (userId) => {
    console.log("fetchArticle:", userId);
    const response = await myArticleApi(userId);
    if (response.data.code === 1) {
        article.value = response.data.data;
        console.log(article.value);
    } else {
        console.log('error');
    }
}

const removeBookmark = async (postId) => {
    const response = await removeBookmarkApi(store.state.$userInfo?.id, postId);
    if (response.data.code !== 1) {
        console.error("取消收藏錯誤!");
    }
}

function toggleIcon(index, postId) {
    removeBookmark(postId).then(() => {
        article.value.splice(index, 1); // 從列表中移除該文章
    }).catch((error) => {
        console.error("Error removing bookmark:", error);
    });
}

onMounted(() => {
    fetchArticle(props.id);
});
</script>

<style scoped>
.custom-color {
    color: red !important;
}
.img-fluid {
    margin-right: 0;
    margin-left: 0;
}

.fixed-size-img {
    width: 75px;
    height: 75px;
    object-fit: cover;
}

.borderbox1 {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 15px;
}

.borderbox {
    background-color: #f9f9f9;
}

.hr-vertical {
    border-left: 1px solid #ddd;
    height: 20px;
    margin: 0 10px;
}
</style>
