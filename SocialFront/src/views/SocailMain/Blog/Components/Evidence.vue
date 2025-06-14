<template>
    <div class="custom-modal-overlay">
        <div class="custom-modal-content">
            <div class="modal-header">
                <h5 class="modal-title">證據列表</h5>
                <button type="button" class="close" @click="$emit('close')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="evidence-area mt-3">
                    <hr>
                    <ul class="post-evidences list-inline p-0 m-0 evidence-list">
                        <li v-for="evidence in evidences" :key="evidence.id">
                            <div class="d-flex">
                                <div class="user-img">
                                    <img :src="'data:image/png;base64,' + evidence.avatar" alt="userimg"
                                        class="avatar-35 rounded-circle img-fluid">
                                </div>
                                <div class="evidence-data-block ms-3 w-100">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <!-- 左邊的部分 -->
                                        <div class="d-flex align-items-center">
                                            <h6 class="mb-0">{{ evidence.username }}</h6>
                                            <span class="ms-2 text-muted">{{ formatDate(evidence.evidenceDate) }}</span>
                                        </div>

                                        <!-- 右邊的部分 -->
                                        <div class="d-flex align-items-center ms-auto">
                                            <!-- 鏈上資訊圖標 -->
                                            <span v-if="evidence.chained" class="material-symbols-outlined me-3 chain-info-highlight" role="button" title="鏈上資訊"
                                                @click="showPopups(evidence.id)"
                                                style="font-size: 32px; line-height: 1.5; vertical-align: middle;">
                                                dataset_linked
                                            </span>

                                            <!-- 鏈上資訊彈窗 -->
                                            <ChainInfo :chainInfo="chainInfo" :mode="2" v-if="showPopup"
                                                @close="() => showPopup = false"></ChainInfo>

                                            <!-- 支持按鈕 -->
                                            <button @click="supperEvidence(evidence)" class="btn btn-link pt-0">
                                                <i class="material-symbols-outlined"
                                                    :class="{ 'custom-color': evidence.supported }">
                                                    thumb_up
                                                </i>
                                                {{ evidence.supportCount }}
                                            </button>
                                        </div>
                                    </div>

                                    <p class="mb-0">{{ evidence.description }}</p>
                                    <!-- 圖片顯示區域 -->
                                    <div v-if="evidence.images && evidence.images.length > 0">
                                        <div v-for="(pic, picIndex) in evidence.images" :key="picIndex"
                                            :class="getImageClass(evidence.images.length)"
                                            class="row-span-1 img-container mt-2">
                                            <img :src="'data:image/png;base64,' + pic" alt="post-image"
                                                class="img-fluid rounded w-75">
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
</template>

<script setup>
import { ref, onMounted, defineProps, reactive } from 'vue';
import { getEvidenceApi, supportEvidenceApi, getEvidenceChainInfoApi } from "@/api/evidence.js";
import { formatDate } from "@/utilities/tools.js";
import { useStore } from 'vuex';
import ChainInfo from "@/components/float/ChainInfo.vue";
import useWeb3 from "@/hooks/useWeb3.js";
const { contractAddress } = useWeb3();

const store = useStore();
const props = defineProps({
    verificationId: {
        type: Number,
        required: true
    }
});

const showPopup = ref(false);
const chainInfo = reactive({
   transactionHash: '...',
   authorAddress: '...',
   smartContractAddress: contractAddress,
   timestamp: '...'
});
const showPopups = async (id) => {
   showPopup.value = true;
   const response = await getEvidenceChainInfoApi(id);
   console.log("response", response);
   if (response.data.code === 1) {
      chainInfo.transactionHash = response.data.data.transactionHash;
      chainInfo.authorAddress = response.data.data.authorAddress;
    //   chainInfo.title = response.data.data.title;
      chainInfo.timestamp = response.data.data.timestamp;
      console.log("chainInfo", chainInfo);
   }
   else {
      console.error("getVerificationChainInfoApi error", response.data.message);
   }
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

const supperEvidence = async (evidence) => {
    try {
        // console.log('supperEvidence', evidence.id);
        const userId = store.state.userInfo?.id; // 確保 userId 是正確的
        if (userId === undefined) {
            alert('請先登入');
            return;
        }
        const response = await supportEvidenceApi(userId, evidence.id);
        if (response.data.code === 1) {
            evidence.supportCount += 1;
            evidence.supported = true;
        } else {
            console.error('按讚失敗:', response.data.message);
        }
    } catch (error) {
        console.error('按讚時發生錯誤:', error);
    }
};

const evidences = ref([]);
const isModalVisible = ref(false); // 控制彈窗顯示
const getevidenceList = async () => {
    try {
        const response = await getEvidenceApi(props.verificationId, store.state.userInfo?.id);
        if (response.data.code === 1) {
            evidences.value = response.data.data;
            console.log('evidences:', evidences.value);
        } else {
            console.error('Failed to fetch evidences:', response.data.message);
        }
    } catch (error) {
        console.error('Failed to fetch evidences:', error);
    }
};


onMounted(getevidenceList);
</script>

<style scoped>
.custom-color {
    color: red !important;
}

.custom-modal-overlay {
    position: fixed;
    top: 5vh;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.custom-modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 60vw;
    max-width: 60vw;
    /* 使用相同單位的寬度限制 */
    max-height: 80vh;
    /* 限制彈窗最大高度，避免超過視窗 */
    overflow-y: auto;
    /* 當內容超出時，允許滾動 */
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-body {
    margin-top: 10px;
}

.modal-footer {
    text-align: right;
}

.close {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 1.5rem;
    padding: 0;
}
</style>
