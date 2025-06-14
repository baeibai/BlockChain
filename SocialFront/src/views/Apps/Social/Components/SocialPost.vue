<template>
    <div class="col-sm-12" v-for="(post, index) in posts" :key="index" :class="{ 'chained-article': post.chained }">
        <div class="card card-block card-stretch card-height">
            <div class="card-body">
                <div class="user-post-data">
                    <h3 class="m-2">{{ post.title }}</h3>
                    <div class="d-flex justify-content-between">
                        <router-link :to="{ name: 'social.profile2', params: { userId: post.authorId } }">
                            <img class="rounded-circle img-fluid fixed-size-img me-5"
                                :src="'data:image/png;base64,' + post.avatar" alt="">
                        </router-link>
                        <div class="w-100">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="col-7">
                                    <div class="d-flex align-items-center">
                                        <router-link
                                            :to="{ name: 'social.profile2', params: { userId: post.authorId } }">
                                            <h4 class="mb-0 d-inline-block me-2">{{ post.authorName }}</h4>
                                        </router-link>
                                        <span class="mb-0 text-primary">{{ formatDate(post.publicationDate) }}</span>
                                    </div>
                                    <p class="mb-0 text-muted" @click="handlerClickBoard(post.boardName)">
                                        {{ post.boardName }}
                                    </p>
                                </div>
                                <div class="d-flex justify-content-end align-items-center">
                                    <!-- 上鏈按鈕 -->
                                    <div class="me-2" v-if="post.chained">
                                        <span class="material-symbols-outlined chain-info-highlight" role="button"
                                            title="鏈上資訊" @click="showPopups(post.id)"
                                            style="font-size: 32px; line-height: 1.5; vertical-align: middle;">
                                            dataset_linked
                                        </span>
                                        <ChainInfo :chainInfo="chainInfo" v-if="showPopup"
                                            @close="() => showPopup = false"></ChainInfo>
                                        <button type="button" class="btn btn-outline-primary ms-1"
                                            @click="handleVerify(post.id, post.title)">發起驗證</button>
                                    </div>

                                    <!-- 檢查分數按鈕 -->
                                    <div class="me-2">
                                        <!-- <button @click="queryBalance" class="btn btn-outline-primary">查詢餘額</button> -->
                                        <button @click="handleAIVerify(post.id)" class="btn btn-primary"
                                            style="white-space: nowrap;">AI分析</button>
                                        <AIVerify v-if="post.id === selectedArticleId && showAIVerify"
                                            :id="post.id" :title="post.title" :content="post.content" @close="handleClose"></AIVerify>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <p>{{ post.content }}</p>
                </div>
                <div class="user-post">
                    <div :class="{ 'row': post.images.length > 1 }">
                        <div v-for="(pic, picIndex) in post.images" :key="picIndex"
                            :class="getImageClass(post.images.length)">
                            <img :src="'data:image/png;base64,' + pic" alt="post-image" class="img-fluid rounded">
                        </div>
                    </div>
                </div>
                <div class="blog-meta d-flex align-items-center mt-3 mb-3 flex-wrap">
                    <div class="me-4 d-flex align-items-center" @click="toggleLike(post)">
                        <i class="material-symbols-outlined pe-2 md-18 text-primary"
                            :class="{ 'custom-color': post.liked }">
                            arrow_circle_up
                        </i>{{ post.likeCount }} 支持者
                    </div>
                    <div class="me-4 d-flex align-items-center" @click="toggleDislike(post)">
                        <i class="material-symbols-outlined pe-2 md-18 text-primary"
                            :class="{ 'custom-color': post.disliked }">
                            arrow_circle_down
                        </i>{{ post.dislikeCount }} 不支持者
                    </div>
                    <div @click="openComment(post.id)" class="comments me-4 d-flex align-items-center">
                        <i class="material-symbols-outlined pe-2 md-18 text-primary">
                            mode_comment
                        </i>
                        {{ post.commentCount }} 評論數
                    </div>
                    <div class="ms-auto d-flex align-items-center" @click="toggleBookmark(post)">
                        <i class="material-symbols-outlined pe-2 md-18 text-primary"
                            :class="{ 'custom-color': post.bookmarked }" style="font-size: 28px;">
                            bookmark
                        </i>
                    </div>
                </div>
                <Comment v-if="showComment && selectedId === post.id" :article_id="post.id"></Comment>
                <form v-if="selectedId === post.id" class="comment-text d-flex align-items-center mt-3"
                    action="javascript:void(0);">
                    <input type="text" class="form-control rounded" placeholder="輸入你的留言" v-model="newComment">
                    <div class="comment-attagement d-flex" @click="submitComment(post)">
                        <img src="@/assets/images/icon/comment_send.png" alt="userimg" class="me-3 img-fluid">
                    </div>
                </form>
            </div>
        </div>
    </div>
    <SocialVerify v-if="showVerify" @close="showVerify = false" @verify="verify" :articleId="selectedArticleId"
        :articleTitle="selectedArticleTitle" />
    <Notification v-if="notificationState.show" :message="notificationState.message" :type="notificationState.type"
        @close="notificationState.show = false" />
    <div v-if="isLoading" class="loading-spinner">
        加載中...
    </div>

</template>

<script setup>
import { ref, onMounted, reactive, defineProps, watch, onUnmounted } from 'vue';
// import ChainInfo from "./SocialPostChinInfo.vue";
import ChainInfo from "@/components/float/ChainInfo.vue";
import Comment from "./SocialPostComment.vue";
import { articleListApi, searchApi } from "@/api/home.js";
import { articleChainInfoApi, addBookmarkApi, removeBookmarkApi, addLikeApi, addDislikeApi, removeLoveApi, recordBlockchainApi } from '@/api/article.js';
import { addCommentApi } from '@/api/article.js';
import { useStore } from 'vuex';
import { formatDate, getFromLocalStorage } from "@/utilities/tools.js";
import SocialVerify from "./SocialVerify.vue";
import AIVerify from "@/components/ai/AIVerify.vue";
import Notification from "@/components/float/Notification.vue";
import useWeb3 from "@/hooks/useWeb3.js";
const { web3, socialContract, getAccount, contractAddress } = useWeb3();
// const queryBalance = async () => {
//   const num = await socialContract.methods.getBalance().call();
//   console.log(num);
// }
const store = useStore();

const props = defineProps({ boardId: Number });

const showAIVerify = ref(false);
const handleAIVerify = (id) => {
    console.log("handleAIVerify");
    selectedArticleId.value = id;
    showAIVerify.value = true;
}

const handleClose = () => {
    showAIVerify.value = false;
};

// const judgeYourself = (userId) => {
//     // console.log("judgeYourself", String(store.state.userInfo?.id) + " ==? "+ String(userId));
//     return String(store.state.userInfo?.id) === String(userId);
// };

const showNotification = (message, type = 'info') => {
    notificationState.show = true;
    notificationState.message = message;
    notificationState.type = type;
}

const notificationState = reactive({
    show: false,
    message: '',
    type: 'info'
});



const getImageClass = (imageCount) => {
    switch (imageCount) {
        case 1:
            return 'col-10';  // 單張圖片佔滿整行
        case 2:
            return 'col-6';   // 兩張圖片各佔一半
        case 3:
            return 'col-4';   // 三張圖片各佔三分之一
        case 4:
            return 'col-6 col-md-3'; // 四張圖片佔四分之一
        default:
            return 'col-6 col-md-4';  // 其他情況下，每張圖片佔一定寬度
    }
};


const showVerify = ref(false);
const selectedArticleId = ref(null);
const selectedArticleTitle = ref(null);
const handleVerify = (articleId, title) => {
    // console.log("handleVerify");
    selectedArticleId.value = articleId;
    showVerify.value = true;
    selectedArticleTitle.value = title;
}

const selectedId = ref(null);
const openComment = (id) => {
    showComment.value = !showComment.value;
    selectedId.value = id;
}
const showComment = ref(false);

const showPopup = ref(false); // 控制弹出窗口的显示与隐藏

// 父组件中的链上信息
const chainInfo = reactive({
    transactionHash: '...',
    authorAddress: '...',
    // transactionFee: '...',
    smartContractAddress: '...',
    title: '...',
    timestamp: '...'
});

const showPopups = (articleId) => {
    articleChainInfoApi(articleId).then((res) => {
        if (res.data.code === 1) {
            console.log("res.data", res.data.data);
            const result = res.data.data;
            chainInfo.transactionHash = result.transactionHash;
            // chainInfo.transactionFee = result.transactionFee;
            chainInfo.smartContractAddress = process.env.VUE_APP_CONTRACT_ADDRESS;
            chainInfo.title = result.title;
            chainInfo.timestamp = result.timestamp;
            chainInfo.authorAddress = result.authorAddress;
            showPopup.value = true;
        }
        else {
            console.log("error:", res.data.msg);
        }
    });
}
const handlerClickBoard = (name) => {
    const boards = getFromLocalStorage("boards");
    const board = boards.find(board => board.name === name);
    if (board.id) {
        loadArticles(board.id);
    } else {
        console.error('未找到對應的看板 ID');
    }
}

const posts = ref([]);
const currentPage = ref(1);
const isLoading = ref(false);

const loadArticles = async (boardId, page = 1) => {
    if (isLoading.value) return; // 防止多次觸發加載
    isLoading.value = true;
    console.log('loadArticles', boardId, page);
    try {
        let res = await articleListApi(store.state.userInfo?.id, boardId, page);
        if (res.data.code === 1) {
            // 將新文章追加到已有的文章列表中
            posts.value = [...posts.value, ...(res.data.data || [])];
            // console.log(posts.value);
        } else {
            console.error('請求出錯:', res.data.msg);
        }
    } catch (err) {
        console.error('請求出錯:', err);
    } finally {
        isLoading.value = false;
    }
};

const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        // 滾動到底部，請求下一頁的文章
        currentPage.value++;
        console.log('請求下一頁的文章', currentPage.value);
        loadArticles(props.boardId, currentPage.value);
    }
};



// 移除滾動事件監聽器（當組件銷毀時）
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

watch(() => props.boardId, (newBoardId) => {
    if (newBoardId !== null) {
        // 重置頁碼和文章列表
        currentPage.value = 1;
        posts.value = [];

        // 加載新的文章
        loadArticles(newBoardId, currentPage.value);
    }
});


onMounted(() => {
    console.log("store.state.posts", store.state.posts.length);
    if (store.state.posts.length > 0) {
        posts.value = store.state.posts;
        isLoading.value = false;
        localStorage.removeItem("searchData");
    }
    else {
        loadArticles(props.boardId || null);
        // 監聽滾動事件
        window.addEventListener('scroll', handleScroll);
    }

});



const toggleLike = async (post) => {
    if (!post.liked && !post.disliked) {
        const result = await addLike(post.id);
        if (result) post.liked = true;
    }
};

const addLike = async (postId) => {
    try {
        const response = await addLikeApi(store.state.userInfo?.id, postId);
        if (response.data.code === 1) {
            // console.log(response.data.data);
            const post = posts.value.find((p) => p.id === postId);
            post.likeCount++;
            return true;
        }
    } catch (error) {
        console.error('添加愛心失敗:', error);
    }
    return false;
};

const removeLove = async (postId) => {
    try {
        const response = await removeLoveApi(store.state.$userInfo.id, postId);
        if (response.data.code === 1) {
            const post = posts.value.find((p) => p.id === postId);
            post.likeCount--;
        }
    } catch (error) {
        console.error('取消愛心失敗:', error);
    }
};

const toggleDislike = async (post) => {
    if (!post.disliked && !post.liked) {
        const result = await addDislike(post.id);
        if (result) post.disliked = true;
    }

};

const addDislike = async (postId) => {
    try {
        const response = await addDislikeApi(store.state.userInfo?.id, postId);
        if (response.data.code === 1) {
            // console.log(response.data.data);
            const post = posts.value.find((p) => p.id === postId);
            post.dislikeCount++;
            return true;
        }
    } catch (error) {
        console.error('不支持失敗:', error);
    }
    return false;
};



const toggleBookmark = async (post) => {
    console.log("toggleBookmark", post.bookmarked);
    if (post.bookmarked) {
        await removeBookmark(post.id);
    } else {
        await addBookmark(post.id);
    }
    post.bookmarked = !post.bookmarked;
};

const addBookmark = async (postId) => {
    try {
        const response = await addBookmarkApi(store.state.userInfo?.id, postId);
        if (response.data.code === 1) {
            const post = posts.value.find((p) => p.id === postId);
            post.bookmarkCount++;
            showNotification('收藏成功', 'success');
        }
    } catch (error) {
        console.error('添加收藏失敗:', error);
    }
};

const removeBookmark = async (postId) => {
    try {
        const response = await removeBookmarkApi(store.state.$userInfo?.id, postId);
        if (response.data.code === 1) {
            const post = posts.value.find((p) => p.id === postId);
            post.bookmarkCount--;
            showNotification('取消藏成功', 'success');
        }
    } catch (error) {
        console.error('取消收藏失敗:', error);
    }
};

const newComment = ref('');
const submitComment = async (post) => {
    if (newComment.value.trim()) {
        try {
            const comment = {
                articleId: post.id,
                userId: store.state.userInfo.id, // 確保 userId 是正確的
                content: newComment.value,
            };
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

.chained-article {
    border-left: 5px solid #fadc7c;
    /* 高亮邊框 */
    background-color: #f5faff;
    /* 背景顏色 */
}
</style>