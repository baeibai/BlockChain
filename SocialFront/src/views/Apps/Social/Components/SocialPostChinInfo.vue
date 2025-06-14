<template>
    <div v-if="show" class="modal fade show d-block" tabindex="-1" role="dialog"
        style="background: rgba(0, 0, 0, 0.5);">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">鏈上資訊</h5>
                    <button type="button" class="close" aria-label="Close" @click="$emit('close')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p><strong>交易序號：</strong> {{ chainInfo.transactionHash }}</p>
                    <p><strong>發文者地址：</strong> {{ chainInfo.authorAddress }}</p>
                    <!-- <p><strong>交易手續費：</strong> {{ chainInfo.transactionFee }}</p> -->
                    <p><strong>智慧合約位址：</strong> {{ chainInfo.smartContractAddress }}</p>
                    <p><strong>文章標題：</strong> {{ chainInfo.title }}</p>
                    <p><strong>交易時間：</strong> {{ chainInfo.timestamp }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['chainInfo']);
const show = ref(true); // 控制彈出視窗的顯示與隱藏
</script>

<style scoped>
/* 根據需要新增自訂樣式 */
.modal-dialog {
    max-width: 600px;
}

.modal-content {
    padding: 20px;
}
</style>