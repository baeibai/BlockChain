<template>
    <div class="modal fade" tabindex="-1" :class="{ 'show d-block': isVisible }">
        <div class="modal-dialog">
            <div class="modal-content iq-border-radius-40">
                <div class="modal-header">
                    <h5 class="text-primary modal-title">
                        <span class="material-symbols-outlined">drive_file_rename_outline</span>
                        回答提問
                    </h5>
                </div>
                <div class="modal-body">
                    <form class="email-form justify-content-center" @submit.prevent="handleSubmit">
                        <div class="form-group row">
                            <label for="title" class="col-sm-2 col-form-label">標題</label>
                            <div class="col-sm-10">
                                <h5 class="text-primary"> {{ title }}</h5>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-12">
                                <textarea v-model="formData.content" class="textarea form-control" rows="5"
                                    placeholder="輸入內文"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="cover-photo" class="form-label">Cover Photo</label>
                            <input type="file" id="cover-photo" multiple @change="handleFileUpload"
                                class="form-control">
                            <div v-for="(image, index) in imagePreviews" :key="index" class="mt-2">
                                <img :src="image" class="img-thumbnail" width="200" />
                            </div>
                            <small class="form-text text-muted">PNG, JPG, GIF up to 10MB</small>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-12">
                                <select v-model="formData.chained" class="form-control">
                                    <option :value="false">是否上鏈-否</option>
                                    <option :value="true">是否上鏈-是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group d-flex flex-wrap align-items-center justify-content-between mb-0">
                            <div class="d-flex align-items-center">
                                <div class="send-btn pl-3 mb-2">
                                    <button type="submit" class="btn btn-primary">確定</button>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <div class="send-btn pl-3 mb-2" @click="emit('close');">
                                    <button type="button" class="btn">取消</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <Notification v-if="notificationState.show" :message="notificationState.message" :type="notificationState.type"
        @close="notificationState.show = false" />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { uploadEvidenceApi } from "@/api/evidence.js";
import { useStore } from 'vuex';
const store = useStore();
import useWeb3 from "@/hooks/useWeb3.js";
import Notification from "@/components/float/Notification.vue";
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

const { web3, socialContract, getAccount, contractAddress } = useWeb3();

const props = defineProps({
    isVisible: {
        type: Boolean,
        required: true
    },
    verifyId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['close']);

let formData = reactive({
    content: '',
    images: [],
    chained: false
});

const imagePreviews = ref([]);

const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    imagePreviews.value = [];
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
            imagePreviews.value.push(e.target.result);
        };
        reader.readAsDataURL(file);
    });
    formData.images = files;
};
let data;
const handleSubmit = async () => {
    if(!formData.content.trim()) {
        showNotification('內文不可為空!', 'warning');
    }
    if(formData.content.length > 300) {
        showNotification('字數超過限制!', 'warning');
    }
    // Handle form submission
    data = {
        verificationId: props.verifyId,
        timestamp: Date.now(),
        description: formData.content,
        userId: store.state.userInfo?.id,
        transactionHash: "",
        images: imagePreviews.value,
    };
    let result = true;
    if (formData.chained) result = await uploadEvidenceBlockchain(data);
    if (!result) return;
    const form = new FormData();
    form.append("verificationId", data.verificationId);
    form.append("description", data.description);
    form.append("timestamp", data.timestamp);
    form.append("userId", data.userId);
    form.append("chained", formData.chained)
    form.append("transactionHash", data.transactionHash);
    formData.images.forEach((image, index) => {
        form.append('images', image);
    });
    // console.log("Evidence data", data);
    // 將資料上傳至後端
    uploadEvidenceApi(form).then(response => {
        console.log("Evidence uploaded successfully", response);
        if (response.data.code === 1) {
            closeModal();
            showNotification("回答成功!", 'success');
        }
        else {
            // console.error("Evidence upload failed", response.data.message);
            showNotification("回答失敗!", 'error');
        }
    }).catch(error => {
        console.error("Evidence upload failed", error);
    });

    formData.content = '';
    formData.images = [];
    formData.chained = false;
};

const uploadEvidenceBlockchain = async (data) => {
    console.log("uploadEvidenceBlockchain", data);
    const account = await getAccount();
    const transactionParameters = {
        from: account,
        to: contractAddress,
        value: "0",
        data: socialContract.methods.provideEvidence(data.verificationId, data.description, data.timestamp).encodeABI(),
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

const closeModal = () => {
    emit('close');
};
</script>

<style>
.modal-content {
    border-radius: 20px;
}

.modal.show.d-block {
    display: block;
}

.modal-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100% - 1rem);
    /* 使其在垂直方向上居中 */
}
</style>