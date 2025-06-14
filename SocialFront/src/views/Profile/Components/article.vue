<template>
    <div class="tab-pane fade show active" id="pills-myarticle">
        <div class="card">
            <div class="card-body">
                <div v-for="(item, index) in article" :key="index" class="borderbox1 mt-3 rounded d-flex">
                    <!-- <div class="user-img me-2">
                        <img :src="'data:image/png;base64,' + item.avatar" alt="userimg" class="avatar-40 rounded-circle" loading="lazy" />
                    </div> -->
                    <div class="borderbox border rounded p-2">
                        <div class="d-flex align-items-center flex-wrap">
                            <h6>{{ item.username }}</h6>
                            <div class="ms-auto d-flex align-items-center">
                                <i class="material-symbols-outlined md-16">schedule</i>
                                <span class="mx-1"><small>{{ formatDate(item.publicationDate) }}</small></span>
                            </div>
                        </div>
                        <h6>{{ item.content }}</h6>
                        <div class="row mt-2">
                            <div class="col-lg-4 col-md-6 mt-1" v-for="(maimg, imgindex) in item.maimage"
                                :key="imgindex">
                                <img :src="maimg.maimage" class="img-fluid rounded" alt="Responsive image"
                                    loading="lazy" />
                            </div>
                        </div>
                        <div class="d-flex flex-wrap justify-content-evenly mb-0 mt-2">
                            <div class="d-flex align-items-center">
                                <i class="material-symbols-outlined pe-2 md-18 text-primary">arrow_circle_up</i>
                                <h6 class="ms-1">{{ item.likeCount }} 支持者</h6>
                            </div>
                            <hr class="hr-vertical" />
                            <div class="d-flex align-items-center">
                                <i class="material-symbols-outlined pe-2 md-18 text-primary">arrow_circle_down</i>
                                <h6 class="ms-1">{{ item.dislikeCount }} 不支持者</h6>
                            </div>
                            <hr class="hr-vertical" />
                            <div class="d-flex align-items-center">
                                <i class="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>
                                <h6 class="ms-1">{{ item.commentCount }} 評論數</h6>
                            </div>
                            <i class="material-symbols-outlined" @click="toggleIcon(index)">
                                {{ item.iscollect ? 'bookmark_heart' : 'bookmark' }}
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { myArticleApi } from '@/api/profile.js';
import { formatDate } from "@/utilities/tools.js";
// import { useStore } from 'vuex'
// const store = useStore();
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});
const article = ref([]);

const fetchArticle = async (userId) => {
    console.log("fetchArticle:", userId);
    const response = await myArticleApi(userId);
    if (response.data.code === 1) {
        article.value = response.data.data;
        console.log(article.value);
    } else {
        console.log('error');
    }
}

function toggleIcon(index) {
    //   const collect = profile.value.collectarticle[index]
    //   collect.iscollect = !collect.iscollect
}
onMounted(() => {
    fetchArticle(props.id);
});
</script>

<style scoped>
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