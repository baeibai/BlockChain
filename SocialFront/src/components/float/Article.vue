<template>
    <div class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <button type="button" class="btn-close position-absolute top-0 end-0 m-3" @click="closeModal" aria-label="Close"></button>
            <div class="card card-block card-stretch shadow-lg rounded-3 overflow-hidden">
                <div class="card-body p-4">
                    <div class="user-post-data text-center">
                        <!-- 顯示文章標題 -->
                        <h2 class="mb-4 font-weight-bold text-primary">{{ post.title }}</h2>
                    </div>
                    <div class="post-content mt-2">
                        <!-- 顯示文章內文 -->
                        <p class="text-muted" style="line-height: 1.6; font-size: 1.1rem;">
                            {{ post.content }}
                        </p>
                    </div>
                </div>
                <!-- 底部的關閉按鈕 -->
                <div class="card-footer text-center py-3">
                    <button class="btn btn-primary" @click="closeModal">關閉</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits } from 'vue';
import { articleGetApi } from "@/api/article.js";

const emit = defineEmits(['close']);
const closeModal = () => {
    emit('close');
};

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
});

const post = ref({});
const getArticle = async () => {
    const response = await articleGetApi(props.id);
    if (response.data.code === 1) {
        post.value = response.data.data;
        console.log(post.value);
    }
};

onMounted(() => {
    getArticle();
});
</script>

<style scoped>
/* 背景遮罩層 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6); /* 半透明背景 */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    animation: fadeIn 0.3s ease;
}

/* 彈窗樣式 */
.modal-content {
    background: #fff;
    width: 80%; /* 設置更寬 */
    max-width: 900px; /* 最大寬度 */
    max-height: 70vh; /* 限制最大高度 */
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    overflow-y: auto; /* 內容溢出時滾動 */
    position: relative;
    animation: slideIn 0.4s ease;
}

/* 動畫效果 */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideIn {
    from { transform: translateY(-30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

/* 按鈕調整 */
.btn-close {
    font-size: 1.2rem;
    color: #555;
    opacity: 0.8;
    transition: opacity 0.2s;
}

.btn-close:hover {
    opacity: 1;
}
</style>
