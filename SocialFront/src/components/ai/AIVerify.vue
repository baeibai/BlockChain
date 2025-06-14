<template>
    <div class="modal fade show d-block" id="scoreModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">AI分析流程</h5>
                    <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- 橫向流程展示 -->
                    <div class="horizontal-flow">
                        <div class="flow-stage" v-for="(stage, index) in stages" :key="index"
                             :class="{ active: currentStage === stage.name }">
                            <div class="stage-icon">
                                <i :class="stage.icon"></i>
                            </div>
                            <div class="stage-name">{{ stage.label }}</div>
                            <div class="stage-progress" v-if="index < stages.length - 1"></div>
                        </div>
                    </div>

                    <!-- 最終分數和解釋 -->
                    <div v-if="currentStage === 'complete'" class="final-score">
                        <strong>最終可信度評分:</strong>
                        <span class="score-display text-primary">{{ score }}</span> / 100
                    </div>
                    <div class="mt-3">
                        <strong>AI分數解析:</strong>
                        <p>{{ explanation }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>





<script setup>
import { ref, defineProps, onMounted, defineEmits } from 'vue';
import { getScore } from '@/api/score.js';

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isVisible: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['close']);

const score = ref('');
const explanation = ref('');
onMounted(() => {
    console.log("props", props.title, props.content);
    handleScore();
});

// const handleScore = async () => {
//     // 模擬一個 API 調用來獲取分數
//     // const response = { data: { code: 1, data: 85 } }; // 假設 API 返回分數為 85
//     const response = await articleGptApi(props.title, props.content);
//     if (response.data.code === 1) {
//         score.value = response.data.data || [];
//         console.log("score", score.value);
//     } else {
//         console.log("Error");
//     }
// };

// function formattedExplanation(str) {
//     // 將換行符替換為 <br> 標籤
//     return this.explanation.replace(/\n/g, '<br>');
// }
const currentStage = ref('visionAI');
const stages = [
    { name: 'visionAI', label: '圖片分析', icon: 'fas fa-image' }, // 圖片分析圖示
    { name: 'semanticAnalysis', label: '商業司資料分析', icon: 'fas fa-chart-bar' }, // 商業分析圖示
    { name: 'dataRetrieval', label: '事實查核中心', icon: 'fas fa-search' }, // 查核或檢索圖示
    { name: 'evidenceFusion', label: '證據融合', icon: 'fas fa-layer-group' }, // 證據融合圖示
    { name: 'scoring', label: '評分生成', icon: 'fas fa-star-half-alt' }, // 評分生成圖示
    { name: 'complete', label: '完成', icon: 'fas fa-flag-checkered' } // 完成圖示
];


// const handleScore = async () => {
//     for (const stage of stages) {
//         currentStage.value = stage.name;
//         await new Promise(resolve => setTimeout(resolve, 1000));
//     }

//     // 最終分數和解釋
//     score.value = 10;
//     explanation.value = "內容荒謬：不可能招募「無AI知識」的AI總裁，月薪500萬台幣的說法過於誇張。\n福利不合理：如「核能筆電」和「晶片隨便拿」等，完全不符合現實。\n語氣不專業：語言輕浮，像「養過倉鼠也能應徵」等，與台積電的風格不符。\n無可信來源：沒有提及任何官方公告或來源。";
// };


const handleScore = async () => {
  const data = {
    id: props.id,
    content: props.title + props.content,
    image_path: ""
  };

  // 遍歷每個 `stage` 並逐一等待
//   for (const stage of stages) {
//     currentStage.value = stage.name;
//     await new Promise(resolve => setTimeout(resolve, 1000));  // 每個 `stage` 等待 1 秒
//   }
  let n = stages.length;
  for (let i = 0; i < n-1; i++) {
    currentStage.value = stages[i].name;
    await new Promise(resolve => setTimeout(resolve, 1000));  // 每個 `stage` 等待 1 秒
  }

  // 所有 `stages` 完成後，開始獲取分數
  try {
    // const res = await getScore(data);
    const res = await getScore(data);
    currentStage.value = stages[n-1].name;
    // 假設後端返回的結果包含 `score` 和 `comment` 字段
    if (res) {
      score.value = res.score;
    //   等待 1 秒
      await new Promise(resolve => setTimeout(resolve, 500));
      explanation.value = res.comment;
    } else {
      score.value = 0;
      explanation.value = "";
    }
    
  } catch (error) {
    console.error("Error fetching score:", error);
    score.value = 0;
    explanation.value = "無法取得評分，請稍後重試";
  }
};




const closeModal = () => {
    emit('close');
};
</script>

<style scoped>
.score-display {
    font-size: 2em;
    /* 調整分數的字體大小 */
    font-weight: bold;
    /* 加粗分數顯示 */
}
.horizontal-flow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    gap: 10px; /* 增加或減少間距 */
}

.flow-stage {
    flex: 1; /* 讓每個階段等寬 */
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 10px;
    text-align: center;
}

.stage-progress {
    width: 100%; /* 延伸至下一個階段 */
    height: 2px;
    background-color: #007bff;
    position: absolute;
    top: 20px;
    left: 50%; /* 調整連接線的起點 */
    z-index: -1;
    transform: translateX(-50%); /* 居中連接線 */
}

.flow-stage .stage-icon {
    font-size: 24px;
    color: #007bff;
    margin-bottom: 5px;
}

.flow-stage .stage-name {
    font-size: 12px;
    font-weight: bold;
    color: #666;
}

.flow-stage.active .stage-icon {
    color: #ff9800;
    animation: pulse 1s infinite alternate;
}

.stage-progress {
    width: 50px;
    height: 2px;
    background-color: #007bff;
    position: absolute;
    top: 20px;
    left: 100%;
    z-index: -1;
}

@keyframes pulse {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.1);
    }
}
</style>
