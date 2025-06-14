<template>
   <div class="row justify-content-center">
      <!-- 驗證首頁標題 -->
      <div class="col-sm-9 mx-auto">
         <h1 class="text-start">驗證首頁(用戶觀點)</h1> <!-- 使用 text-start 將標題文本對齊到左側 -->
      </div>

      <!-- 文章卡片區塊 -->
      <div class="col-sm-9 mx-auto" v-for="article in articles" :key="article.id">
         <div class="card card-block card-stretch card-height">
            <div class="card-body">
               <div class="user-article-data d-flex">
                  <!-- 左側的支持與不支持按鈕 -->
                  <div class="vote-buttons d-flex flex-column me-5 align-items-center" style="width: 100px;">
                     <!-- 支持按鈕 -->
                     <button class="btn btn-success mb-2 w-100" @click="handleVote(article, true)">支持</button>
                     <!-- 進度條顯示支持與不支持的比例 -->
                     <div class="progress mb-2 w-100" style="height: 20px;">
                        <div class="progress-bar bg-success" role="progressbar"
                           :style="{ width: countSuport(article.supportVote, article.againstVote) + '%' }">
                           {{ article.supportVote }}
                        </div>
                        <div class="progress-bar bg-danger" role="progressbar"
                           :style="{ width: countSuport(article.againstVote, article.supportVote) + '%' }">
                           {{ article.againstVote }}
                        </div>
                     </div>

                     <!-- 不支持按鈕 -->
                     <button class="btn btn-danger w-100" @click="handleVote(article, false)">不支持</button>
                  </div>
                  <!-- 右側文章信息 -->
                  <div class="w-100">
                     <!-- 頭像與文章信息的橫向佈局 -->
                     <div class="d-flex justify-content-between align-items-start">
                        <router-link :to="{ name: 'social.profile2', params: { userId: article.userId } }">
                           <img class="rounded-circle img-fluid fixed-size-img"
                              :src="'data:image/png;base64,' + article.avatar" alt="">
                        </router-link>
                        <div class="w-100 ms-3">
                           <!-- 文章發布者與日期 -->
                           <div class="d-flex justify-content-between">
                              <div>
                                 <div class="d-flex align-items-center">
                                    <router-link :to="{ name: 'social.profile2', params: { userId: article.userId } }">
                                       <h5 class="mb-0 d-inline-block me-2">{{ article.userName }}</h5>
                                    </router-link>
                                    <span class="mb-0 text-primary">{{ formatDate(article.verificationDate) }}</span>
                                 </div>
                                 <p class="mb-0 text-muted">{{ article.reason }}</p>
                              </div>
                              <span class="material-symbols-outlined chain-info-highlight" role="button" title="鏈上資訊"
                                 @click="showPopups(article.id)"
                                 style="font-size: 32px; line-height: 1.5; vertical-align: middle;">
                                 dataset_linked
                              </span>
                              <ChainInfo :chainInfo="chainInfo" :mode="0" v-if="showPopup"
                                 @close="() => showPopup = false">
                              </ChainInfo>
                           </div>


                        </div>
                     </div>

                     <!-- 文章的主要內容 -->
                     <div class="mt-4">
                        <!-- 顯示文章標題 -->
                        <h5 class="mb-0 font-weight-bold article-title" @click="showArticleToggle(article.articleId)">
                           {{ article.title }}
                        </h5>
                     </div>

                     <!-- 查看回答與回應區塊，放置到右側 -->
                     <div class="d-flex justify-content-between align-items-center">
                        <div class="comment d-flex align-items-center"
                           @click="handleRequest(article.id, article.title)">
                           <i class="material-symbols-outlined me-2 md-18">chat_bubble_outline</i>
                           回答問題
                        </div>
                        <div @click="handleEvidence(article.id)" class="text-primary cursor-pointer">
                           查看回答
                        </div>
                     </div>
                     <!-- 回答的彈窗 -->
                     <Evidence v-if="showComment && article.id === selectId" :verificationId="article.id"
                        @close="showComment = false"></Evidence>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <!-- 提供證據彈窗 -->
      <ProvideEvidence :isVisible="showEvidence" :verifyId="chainVerifyId" :title="evidenceTitle"
         @close="showEvidence = false">
      </ProvideEvidence>

      <!-- 加載中顯示 -->
      <div v-if="isLoading" class="loading-spinner">
         加載中...
      </div>
   </div>
   <Notification v-if="notificationState.show" :message="notificationState.message" :type="notificationState.type"
      @close="notificationState.show = false" />

   <Article v-if="showArticle" :id="articleId" @close="showArticle = false"></Article>
</template>




<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import ProvideEvidence from './Components/ProvideEvidence.vue';
import Evidence from "./Components/Evidence.vue";
import ChainInfo from "@/components/float/ChainInfo.vue";
import { getVerificationApi, getVerificationChainInfoApi } from '@/api/verify.js';
import { formatDate } from "@/utilities/tools.js";
import { useStore } from 'vuex';
import Article from "@/components/float/Article.vue";
const store = useStore();
import useWeb3 from "@/hooks/useWeb3.js";
const { web3, socialContract, getAccount, contractAddress } = useWeb3();
import Notification from "@/components/float/Notification.vue";

const showArticle = ref(false);
const showArticleToggle = (id) => {
   showArticle.value = true;
   articleId.value = id;
}

const notificationState = reactive({
   show: false,
   message: '',
   type: 'info'
});


const showNotification = (message, type = 'info') => {
   notificationState.message = message;
   notificationState.type = type;
   notificationState.show = true;
};

const showPopup = ref(false);
const chainInfo = reactive({
   transactionHash: '...',
   authorAddress: '...',
   smartContractAddress: contractAddress,
   title: '...',
   timestamp: '...'
});
const showPopups = async (id) => {
   showPopup.value = true;
   const response = await getVerificationChainInfoApi(id);
   console.log("response", response);
   if (response.data.code === 1) {
      chainInfo.transactionHash = response.data.data.transactionHash;
      chainInfo.authorAddress = response.data.data.authorAddress;
      chainInfo.title = response.data.data.title;
      chainInfo.timestamp = response.data.data.timestamp;
   }
   else {
      console.error("getVerificationChainInfoApi error", response.data.message);
   }
};

const handleVote = async (verification, support) => {
   if (store.state.userInfo === null) {
      showNotification('請先登入', 'warning');
      return;
   }
   console.log(String(store.state.userInfo.id), String(verification.id))
   if (String(store.state.userInfo.id) === String(verification.userId)) {
      showNotification('不能自己投票喔!', 'warning');
      return;
   }
   const account = await getAccount();

   const voted = await socialContract.methods.getVote(verification.id, account).call();
   if (voted != 0) {
      showNotification('您以投過票了!', 'warning');
      return;
   }
   const result = await VoteChain(verification.id, support);
   if (!result) {
      showNotification('投票失敗，請稍後再試!', 'error');
      return;
   }
   // 成功後，更新文章的支持與反對票數
   if (support) verification.supportVote++;
   else verification.againstVote++;
   // countSuport();
   // 並重新計算支持與反對的百分比
   // 並顯示成功訊息
}

const articleId = ref(null);

const VoteChain = async (verificationId, support) => {
   // 呼叫 API 進行投票
   const account = await getAccount();
   const transactionParameters = {
      from: account,
      to: contractAddress,
      value: "0",
      data: socialContract.methods.voteVerification(verificationId, support).encodeABI(),
   };

   try {
      // 發送交易並獲取交易哈希
      const transactionHash = await window.ethereum.request({
         method: "eth_sendTransaction",
         params: [transactionParameters],
      });
      //   data.transactionHash = transactionHash;
      console.log("交易已提交，交易哈希:", transactionHash);
      return true;
   } catch (error) {
      console.error("發送交易或監聽事件時出錯:", error);
      return false;
   }
}


const countSuport = (vote1, vote2) => {
   const totalVote = Number(vote1) + Number(vote2);
   // console.log(totalVote, vote1, vote2);
   return totalVote === 0 ? 50 : Math.round((Number(vote1) / totalVote) * 100);
}



const showComment = ref(false);
const selectId = ref(null);
const handleEvidence = (id) => {
   console.log('handleEvidence', id);
   if (selectId.value === id && showComment.value === true) showComment.value = false;
   else {
      showComment.value = true;
      selectId.value = id;
   }
}


const articles = ref([]);
const showEvidence = ref(false);
let evidenceTitle = ref('');
let chainVerifyId = ref(0);
const handleRequest = (id, title) => {
   console.log('handleRequest', id);
   showEvidence.value = true;
   evidenceTitle.value = title;
   chainVerifyId.value = id;
};


const currentPage = ref(1);
const isLoading = ref(false);

const fetchArticles = async (page = 1) => {
   if (isLoading.value) return; // 防止多次觸發加載
   isLoading.value = true;
   try {
      const response = await getVerificationApi(page);
      if (response.data.code === 1) {
         const newArticles = response.data.data || [];
         if (newArticles.length > 0) {
            // 遍歷新獲取的文章列表
            for (let article of newArticles) {
               try {
                  // 使用 article.id 去調用智能合約的 verificationRequests
                  const verificationRequest = await socialContract.methods.verificationRequests(article.id).call();
                  // 將 supportVotes 和 againstVotes 添加到文章的資料中
                  article.supportVote = verificationRequest.supportVotes;
                  article.againstVote = verificationRequest.againstVotes;
                  console.log("aa", verificationRequest);
               } catch (contractError) {
                  console.error(`Error fetching verification request for article ${article.id}:`, contractError);
               }
            }

            // 在迴圈結束後，將新文章一次性添加到現有文章中
            articles.value = [...articles.value, ...newArticles];
         } else {
            // 如果返回的文章數為0，則停止滾動加載
            window.removeEventListener('scroll', handleScroll);
         }
      } else {
         console.error('Failed to fetch articles:', response.data.message);
      }
   } catch (error) {
      console.error('Error fetching articles:', error);
   } finally {
      isLoading.value = false; // 無論成功或失敗，重置 isLoading 標誌
   }
};



const handleScroll = async () => {
   const scrollHeight = document.documentElement.scrollHeight;
   const scrollTop = document.documentElement.scrollTop;
   const clientHeight = document.documentElement.clientHeight;

   if (scrollTop + clientHeight >= scrollHeight - 3) {
      // 滾動到底部，請求下一頁的文章
      currentPage.value++;
      console.log('請求下一頁的文章', currentPage.value);
      await fetchArticles(currentPage.value);
   }
};



// 移除滾動事件監聽器（當組件銷毀時）
onUnmounted(() => {
   window.removeEventListener('scroll', handleScroll);
   // countSuport();
   // supportVotes = await socialContract.methods.verificationRequests().call();


});



onMounted(() => {
   // 監聽滾動事件
   window.addEventListener('scroll', handleScroll);
   fetchArticles();
});
</script>



<style scoped>
.blog-description {
   /* border-bottom: 2px solid #ccc; */
   padding-bottom: 6px;
}

.text-primary {
   color: #007bff !important;
}

.fixed-size-img {
   width: 60px;
   height: 60px;
   object-fit: cover;
}

.article-title:hover {
    color: #007bff; /* 懸停時顯示藍色 */
}
</style>