<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog" style="background: rgba(0, 0, 0, 0.5);">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">發起驗證</h5>
                    <button type="button" class="close" aria-label="Close" @click="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="original-post mb-3">
                        <h2>原始文章</h2>
                        <p>{{ postContent }}</p>
                    </div>
                    <div class="verification-reason mb-3">
                        <h2>驗證原因</h2>
                        <textarea v-model="verificationReason" placeholder="請輸入為什麼想要驗證此文章..." class="form-control"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="close">取消</button>
                    <button type="button" class="btn btn-primary" @click="submitVerification">發起驗證</button>
                </div>
            </div>
        </div>
    </div>

    <Notification v-if="notificationState.show" :message="notificationState.message" :type="notificationState.type"
    @close="notificationState.show = false" />
</template>

<script setup>
import { ref, defineProps, defineEmits, watchEffect, reactive } from 'vue';
import { verificationApi, getArticleChainIdApi } from '@/api/verify';
import { useStore } from 'vuex';
const store = useStore();
import useWeb3 from "@/hooks/useWeb3.js";
import Notification from "@/components/float/Notification.vue";

const { web3, socialContract, getAccount, contractAddress } = useWeb3();

const props = defineProps({
    articleId: Number,
    articleTitle: String
});
const emit = defineEmits(['close', 'verify']);

const postContent = ref(''); // 根據 articleId 獲取實際的文章內容
const verificationReason = ref('');

// 使用 reactive 封裝通知的狀態
const notificationState = reactive({
  show: false,
  message: '',
  type: 'info'
});

const showNotification = (message, type = 'info') => {
    notificationState.show = true;
    notificationState.message = message;
    notificationState.type = type;
}


const close = () => {
    emit('close');
};
const submitVerification = async () => {
    if (!verificationReason.value.trim()) {
        showNotification('請輸入驗證原因', 'warning');
        return;
    }
    if(verificationReason.value.length > 100) {
        showNotification('驗證原因字數超過限制!', 'warning');
    }

    // try {
    let articleChainId = null;
    const res = await getArticleChainIdApi(props.articleId);
    if (res.data.code === 1) {
        articleChainId = res.data.data;
    }
    else return;

    // 確保 articleChainId 不為 null
    if (articleChainId === null) {
        console.error("Failed to fetch article chain ID");
        showNotification("無法獲取文章鏈接ID", 'error');
        return;
    }

    let data = {
        id: null,
        userId: store.state.userInfo.id,
        articleId: props.articleId,
        articleChainId: articleChainId,
        reason: verificationReason.value,
        transactionHash: "",
        verificationDate: Date.now()
    }

    const responseChain = await verifyArticle(data);
    console.log("responseChain", responseChain);
    if (!responseChain) {
        showNotification("發起驗證失敗，請稍後再試!", 'error');
        return;
    }
    console.log("data", data);
    const response = await verificationApi(data);
    if (response.data.code === 1) {
        showNotification('驗證發起成功，恭喜獲得0.007ETH', 'success');
        verificationReason.value = ''; // 清空驗證原因
    } else {
        showNotification('驗證發起失敗', 'success');
    }


    // } catch (error) {
    //     console.error('發起驗證時出錯', error);
    //     showNotification('發起驗證時出錯');
    // }

    close();
};

const verifyArticle = async (data) => {
    try {
        console.log("發送驗證請求的數據:", data);
        // showNotification(web3.utils.toWei("0.02", "ether"));
        const account = await getAccount();
        console.log("當前帳戶:", account);

        const transactionParameters = {
            from: account,
            to: contractAddress,
            value: 0,
            data: socialContract.methods.requestVerification(data.articleChainId, data.reason, data.verificationDate).encodeABI(),
        };

        const transactionHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });

        console.log("交易已提交，交易哈希:", transactionHash);
        data.transactionHash = transactionHash;
        const verifyCount = await socialContract.methods.verificationCount().call();
        data.id = Number(verifyCount);
        return true;
        // 等待交易被挖掘並獲取交易回執
        // const receipt = await web3.eth.getTransactionReceipt(transactionHash);
        // if (!receipt) {
        //     console.error("未能獲取交易回執，交易可能尚未被挖掘");
        //     return false;
        // }

        // if (receipt.status) {
        //     console.log("交易成功，交易回執:", receipt);

        //     // 遍歷交易回執中的事件日誌
        //     for (const log of receipt.logs) {
        //         try {
        //             const decodedLog = web3.eth.abi.decodeLog(
        //                 [
        //                     {
        //                         type: 'uint256',
        //                         name: 'verifyCount',
        //                         indexed: false
        //                     }
        //                 ],
        //                 log.data,
        //                 log.topics.slice(1)
        //             );
        //             console.log("驗證已發布，事件數據:", decodedLog);
        //             data.id = Number(decodedLog.verifyCount);
        //             return true;
        //         } catch (e) {
        //             console.error("解析事件日誌時出錯:", e);
        //         }
        //     }
        // } else {
        //     console.error("交易失敗，回執狀態為 false");
        //     return false;
        // }
    } catch (error) {
        console.error("發送交易時出錯:", error);
        return false;
    }
};


watchEffect(() => {
    if (props.articleTitle !== null) {
        // 根據 articleId 獲取文章內容並設置到 postContent
        postContent.value = props.articleTitle; // 這裡應該是實際的 API 調用
    }
});
</script>

<style scoped>
.original-post h2,
.verification-reason h2 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
}

.verification-reason textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    font-size: 1rem;
}
</style>
