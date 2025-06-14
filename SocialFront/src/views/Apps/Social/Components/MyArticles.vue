<template>
    <div class="col-sm-12" v-for="(post, index) in posts" :key="index">
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
                                        <span class="material-symbols-outlined chain-info-highlight" role="button" title="鏈上資訊"
                                            @click="showPopups(post.id)"
                                            style="font-size: 32px; line-height: 1.5; vertical-align: middle;">
                                            dataset_linked
                                        </span>
                                        <ChainInfo :chainInfo="chainInfo" v-if="showPopup"
                                            @close="() => showPopup = false"></ChainInfo>
                                    </div>


                                    <!-- 發起上鏈按鈕 -->
                                    <div class="me-2" v-if="!post.chained">
                                        <button type="button" class="btn btn-outline-primary"
                                            @click="handleChin(post)">上鏈</button>
                                    </div>

                                    <!-- 檢查分數按鈕 -->
                                    <div class="me-2">
                                        <button @click="handleAIVerify(post.id)" class="btn btn-primary"
                                            style="white-space: nowrap;">AI分析</button>
                                        <AIVerify v-if="post.id === selectedArticleId && showAIVerify"
                                            :title="post.title" :content="post.content" @close="handleClose"></AIVerify>
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
                    <div class="me-4 d-flex align-items-center" >
                        <i class="material-symbols-outlined pe-2 md-18 text-primary"
                            :class="{ 'custom-color': post.liked }">
                            arrow_circle_up
                        </i>{{ post.likeCount }} 支持者
                    </div>
                    <div class="me-4 d-flex align-items-center" >
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
                </div>
            </div>
        </div>
    </div>
    <SocialVerify v-if="showVerify" @close="showVerify = false" @verify="verify" :articleId="selectedArticleId"
        :articleTitle="selectedArticleTitle" />
    <div v-if="isLoading" class="loading-spinner">
        加載中...
    </div>

    <Notification v-if="notificationState.show" :message="notificationState.message" :type="notificationState.type"
    @close="notificationState.show = false" />

</template>

<script setup>
import { ref, onMounted, reactive, defineProps, watchEffect, onUnmounted } from 'vue';
import ChainInfo from "./SocialPostChinInfo.vue";
import { myArticleListApi, articleChainInfoApi, addLikeApi, addDislikeApi, recordBlockchainApi } from '@/api/article.js';
import { useStore } from 'vuex';
import { formatDate, getFromLocalStorage } from "@/utilities/tools.js";
import SocialVerify from "./SocialVerify.vue";
import AIVerify from "@/components/ai/AIVerify.vue";
import useWeb3 from "@/hooks/useWeb3.js";
import Notification from "@/components/float/Notification.vue";

const { web3, socialContract, getAccount, contractAddress } = useWeb3();

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

// 使用 reactive 封裝通知的狀態
const notificationState = reactive({
  show: false,
  message: '',
  type: 'info'
});

let data = null;
const handleChin = async (post) => {
    if (!store.state.userInfo) {
        notificationState.show = true;
        notificationState.message = "請先登入!";
        notificationState.type = "warning";
        return;
    }
    let account = await getAccount();
    if (account != store.state.userInfo?.address) {
        // console.log(account, store.state.userInfo?.address)
        notificationState.show = true;
        notificationState.message = "請切換metamask帳戶為您註冊時帳號!";
        notificationState.type = "error";
        return;
    }
    data = {
        id: "",
        articleId: post.id,
        authorAddress: account,
        title: post.title,
        address: store.state.userInfo?.address,
        // content: post.content,
        timestamp: Date.now(),
        transactionHash: ""
    }
    // const res = await uploadToIPFS(data.content);
    // if (res.data.code === 1) {
    // console.log('Data uploaded successfully with CID:', res.data.data);
    const successChain = await uploadArticleBlockchain(data.title, post.content, data.timestamp);
    // console.log("successChain", successChain);

    const articleCount = await getArticleCount();
    data.id = Number(articleCount);
    console.log("data", data);
    if (!successChain) {
        notificationState.show = true;
        notificationState.message = "上鏈失敗請重試!";
        notificationState.type.error;
        return;
    }
    const result = await recordBlockchainApi(data);
    if (result.data.code === 1) {
        post.chained = true;
        notificationState.message = "上鏈成功!";
        notificationState.type = "success";
        notificationState.show = true;
    } else {
        notificationState.message = "區塊鏈記錄失敗";
        notificationState.type = 'error';
        notificationState.show = true;
    }
}


const getArticleCount = async () => {
    try {
        const articleCount = await socialContract.methods.articleCount().call();
        // console.log("文章數量:", articleCount);
        return articleCount;
    } catch (error) {
        console.error("獲取文章數量時出錯:", error);
        return null;
    }
};

const uploadArticleBlockchain = async (title, content, timestamp) => {
    // console.log("uploadArticleBlockchain", title, content, publicationDate);
    const account = await getAccount();
    const transactionParameters = {
        from: account,
        to: contractAddress,
        value: "0",
        data: socialContract.methods.publish(title, content, timestamp).encodeABI(),
    };

    try {
        // 發送交易並獲取交易哈希
        const transactionHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        data.transactionHash = transactionHash;
        console.log("交易已提交，交易哈希:", transactionHash);
        return true;
    } catch (error) {
        console.error("發送交易或監聽事件時出錯:", error);
        return false;
    }
};

const showVerify = ref(false);
const selectedArticleId = ref(null);
const selectedArticleTitle = ref(null);

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


const loadArticles = async (page = 1) => {
    if (isLoading.value) return; // 防止多次觸發加載
    isLoading.value = true;
    try {
        const res = await myArticleListApi(store.state.userInfo?.id, page);
        if (res.data.code === 1) {
            // 過濾掉重複的文章
            const newPosts = res.data.data.filter(newPost => {
                return !posts.value.some(existingPost => existingPost.id === newPost.id);
            });
            // 追加非重複的文章到 posts 中
            posts.value = [...posts.value, ...newPosts];
        } else {
            console.log('error');
        }
    } catch (error) {
        console.error('請求出錯:', error);
    } finally {
        isLoading.value = false;
    }
};



const handleScroll = () => {
    if (isLoading.value) return; // 防止多次觸發加載

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        console.log('請求下一頁的文章', currentPage.value);
        loadArticles(currentPage.value).then(() => {
            // 只有當加載成功後才增加頁數
            currentPage.value++;
        });
    }
};



// 監聽滾動事件
window.addEventListener('scroll', handleScroll);

// 移除滾動事件監聽器（當組件銷毀時）
onMounted(() => {
    currentPage.value = 1; // 初始化頁數為 1
    loadArticles(currentPage.value);
});

watchEffect(() => {
    
});


onMounted(() => {
    loadArticles(null);
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
</style>