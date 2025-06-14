<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="card-title">文章搜尋</h1>
        <small class="form-text text-muted">搜尋關鍵字為：{{ route.params.searchkeys }}</small>
      </div>
      <div class="col-sm-12" v-for="(article, index) in search" :key="index" @click="openModal(index)">
        <div class="card p-3" style="cursor: pointer;">
          <div>
            <ul class="notification-list m-0 p-0">
              <li class="d-flex align-items-center justify-content-between">
                <div class="user-img img-fluid">
                  <!-- 如文章有圖片載入至左邊 -->
                  <img src="@/assets/images/user/01.jpg" alt="story-img" class="rounded-circle avatar-40 float-right">
                </div>
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <div class="ms-3">
                      <p class="mb-0 text-muted">{{ article.boardName }} • {{ formatDate(article.publicationDate) }}</p>
                      <h5 class="mb-0 d-inline-block me-2" style="font-size: 1.25rem; font-weight: bold;">{{ article.title }}</h5>
                      <div class="d-flex stats-row mt-2">
                        <div class="stat-item">
                          <!-- 字數超過50太多，可以用"..."的方式 -->
                          <p class="mt-3"> {{ truncateText(article.content, 50) }} </p>
                        </div>
                      </div>
                      <div class="me-4 d-flex align-items-center">
                        <i class="material-symbols-outlined md-18 text-primary">
                            arrow_circle_up
                        </i>
                        <i class="material-symbols-outlined md-18 text-primary">
                            arrow_circle_down
                        </i>{{ article.likeCount + article.dislikeCount }}
                        <i class="material-symbols-outlined md-18 ps-2 text-primary">
                            mode_comment
                        <!-- 留言數不對 -->
                        </i>{{ article.commentCount }}
                        <i class="material-symbols-outlined md-18 ps-2 text-primary">
                            bookmark
                        </i>{{ article.bookmarkCount }}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- Modal -->
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <!-- 关闭按钮 -->
      <button class="close-button" @click="closeModal()">X</button>
      <!-- 动态内容 -->
      <div class="modal-header">
        <div class="header-content d-flex justify-content-between align-items-center">
          <div>
            <img src="@/assets/images/user/01.jpg" alt="story-img" class="rounded-circle avatar-40">
            <p class="mb-0">{{ currentArticle.boardName }}</p>
          </div>
          <button type="button" class="btn btn-outline-primary">追蹤</button>
        </div>
      </div>
      <div class="modal-body">
        <h2 class="modal-title">{{ currentArticle.title }}</h2>
        <div>
          <p class="mb-0 d-inline-block me-2">{{ currentArticle.authorName }}</p>
          <p class="mb-0 text-muted">{{ formatDate(currentArticle.publicationDate) }}</p>
        </div>
        <p class="mt-3">{{ currentArticle.content }}</p>
        <div class="me-4 d-flex align-items-center mt-4">
          <i class="material-symbols-outlined md-18 text-primary">
              arrow_circle_up
          </i>
          <i class="material-symbols-outlined md-18 text-primary ms-2">
              arrow_circle_down
          </i>{{ currentArticle.likeCount + currentArticle.dislikeCount }}
          <i class="material-symbols-outlined md-18 text-primary ms-4">
              bookmark
          </i>{{ currentArticle.bookmarkCount }}
        </div>
        <!-- 评论部分 -->
        <Comment :article_id="currentArticle.id" />
      </div>
      <!-- 留言栏 -->
      <form class="comment-text d-flex align-items-center comment-input" action="javascript:void(0);" @submit.prevent="submitComment(currentArticle)">
        <input type="text" class="form-control rounded" placeholder="輸入你的留言" v-model="newComment">
        <div class="comment-attagement d-flex">
          <img src="@/assets/images/icon/comment_send.png" alt="userimg" class="me-3 img-fluid" @click="submitComment(currentArticle)">
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { searchApi } from '@/api/home.js';
import { addCommentApi } from '@/api/article.js';
import { useStore } from 'vuex';
import Comment from "@/views/Apps/Social/Components/SocialPostComment.vue";
import { useRoute } from 'vue-router';
import { formatDate } from "@/utilities/tools.js";

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

const store = useStore();
const route = useRoute();
const search = ref([]);
const isModalOpen = ref(false)

// 存储当前显示的文章
const currentArticle = ref({})
// 打开模态框并设置当前文章内容
function openModal(index) {
  currentArticle.value = search.value[index]
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'; // 禁用背景滚动
}

function closeModal(){
  isModalOpen.value = false
  document.body.style.overflow = ''; // 启用背景滚动
}

const fetchArticle = async () => {
    const response = await searchApi(route.params.searchkeys);
    if (response.data.code === 1) {
        search.value = response.data.data;
        console.log('search結果', search.value); 
    }else{
        console.log('error');
    }
}

const newComment = ref('');
const submitComment = async (post) => {
    if (newComment.value.trim()) {
        try {
            const comment = {
                articleId: post.id,
                userId: store.state.userInfo.id, // 確保 userId 是正確的
                content: newComment.value,
            };
            console.log(comment);
            const response = await addCommentApi(comment);
            if (response.data.code === 1) {
                // await getCommentList(); // 刷新評論列表
                post.commentCount++;
                newComment.value = '';
            } else {
                console.error('發表評論失敗:', response.data.message);
            }
        } catch (error) {
            console.error('發表評論時發生錯誤:', error);
        }
    }
};

onMounted(() => {
  fetchArticle();
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* 背景变暗 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 12px; /* 圆角 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  width: 600px; /* 宽度设置为较宽 */
  max-width: 90%;
  max-height: 80vh; /* 设置最大高度为视口高度的80% */
  overflow: auto;
  position: relative;
  margin-top: 20px;
  padding-bottom: 70px; /* 给留言栏留出空间 */
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #333;
}

/* 头部内容布局 */
.header-content {
  display: flex;
  align-items: center;
  justify-content: center; /* 将内容居中 */
  gap: 15px; /* 设置两者之间的间距 */
}

.modal-header {
  padding: 15px;
  border-bottom: 1px solid #eee;
  background-color: #f7f8fa;
  flex-shrink: 0; /* 确保头部不被压缩 */
}

.modal-title {
  padding: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: #333;
  border-bottom: 1px solid #eee;
  flex-shrink: 0; /* 确保标题不被压缩 */
}

.modal-body {
  padding: 20px;
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  background-color: #fff;
  overflow-y: auto; /* 允许垂直滚动 */
  flex-grow: 1; /* 占据剩余的空间 */
}

.modal-body p {
  margin-left: 20px;
}

.comment-input {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f7f8fa;
  padding: 10px;
  border-top: 1px solid #eee;
}

.comment-input input {
  flex-grow: 1;
}

.comment-attagement {
  cursor: pointer;
}

@media (max-width: 768px) {
  .modal-content {
    width: 90%;
  }
}
</style>
