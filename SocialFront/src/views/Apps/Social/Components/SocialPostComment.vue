<template>
    <div class="comment-area mt-3">
        <hr>
        <ul class="post-comments list-inline p-0 m-0">
            <li v-for="(comment, commentIndex) in comments" :key="commentIndex">
                <div class="d-flex">
                    <div class="user-img">
                        <img :src="'data:image/png;base64,' + comment.avatar" alt="userimg"
                            class="avatar-35 rounded-circle img-fluid">
                    </div>
                    <div class="comment-data-block ms-3">
                        <div class="d-flex align-items-center">
                            <h6 class="mb-0">{{ comment.authorName }}</h6>
                            <span class="ms-2 text-muted">{{ formatDate(comment.commentDate) }}</span>
                        </div>
                        <p class="mb-0">{{ comment.content }}</p>
                        <div>
                            <button @click="likeComment(comment.id)" class="btn btn-link p-0">
                                <i class="material-symbols-outlined" :class="{ 'text-primary': comment.liked }">
                                    thumb_up
                                </i>
                                {{ comment.likeCount }}
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineExpose } from 'vue';
import { commentListApi, likeCommentApi } from '@/api/article.js';
import { formatDate } from "@/utilities/tools.js";
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({ article_id: String });
const comments = ref([]);

const getCommentList = async () => {
    try {
        // console.log("props.article_id:", props.article_id);
        // console.log("store.userInfo.id:", store.state.userInfo?.id);
        const response = await commentListApi(props.article_id, store.state.userInfo?.id);
        if (response.data.code === 1) {
            comments.value = response.data.data;
            console.log("comments:", comments.value);
        } else {
            console.error('取得評論列表失敗:', response.data.message);
        }
    } catch (error) {
        console.error('取得評論列表時發生錯誤:', error);
    }
};


const likeComment = async (commentId) => {
    try {
        const userId = store.state.userInfo?.id; // 確保 userId 是正確的
        const response = await likeCommentApi(commentId, userId);
        if (response.data.code === 1) {
            // 讓按讚數加一
            const comment = comments.value.find(comment => comment.id === commentId);
            if (comment) {
                comment.likeCount += 1;
                comment.liked = true;
            }
        } else {
            console.error('按讚失敗:', response.data.message);
        }
    } catch (error) {
        console.error('按讚時發生錯誤:', error);
    }
};
// defineExpose({
//     submitComment,
// });
onMounted(getCommentList);
</script>

<style lang="less"></style>