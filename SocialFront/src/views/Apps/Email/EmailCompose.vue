<template>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div class="card iq-border-radius-40">
        <div class="card-body">
          <div class="row">
            <div class="col-md-10 mb-3">
              <h5 class="text-primary card-title d-flex gap-1">
                <span class="material-symbols-outlined">drive_file_rename_outline</span>
                建立新文章
              </h5>
              <!-- <button type="button" class="float-end close-popup" v-if="modal" @click="close" data-dismiss="modal">
                <i class="ri-close-fill"></i>
              </button> -->
            </div>
          </div>
          <form class="email-form justify-content-center" @submit.prevent="handleSubmit">
            <div class="form-group row">
              <label for="title" class="col-sm-2 col-form-label">輸入標題</label>
              <div class="col-sm-10">
                <input type="text" id="title" v-model="formData.title" class="form-control" placeholder="輸入標題">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-12">
                <textarea v-model="formData.content" class="textarea form-control" rows="5"
                  placeholder="輸入內文"></textarea>
              </div>
            </div>
            <div class="form-group">
              <label for="cover-photo" class="form-label">上傳圖片</label>
              <input type="file" id="cover-photo" multiple @change="handleFileUpload" class="form-control">
              <div v-for="(image, index) in imagePreviews" :key="index" class="mt-2">
                <img :src="image" class="img-thumbnail" width="200" />
              </div>
              <small class="form-text text-muted">PNG, JPG, GIF up to 10MB</small>
            </div>
            <div class="form-group row">
              <label for="board" class="form-label">請選擇看板</label>
              <div class="col-sm-12">
                <select class="form-control" v-model="formData.boardId">
                  <!-- 提示選項，默認顯示，值為空字串 -->
                  <!-- <option disabled value="">請選擇看板</option> -->
                  <!-- 循環生成選項 -->
                  <option :value="board.id" v-for="board in boards" :key="board.id">{{ board.name }}</option>
                </select>
              </div>
            </div>
            <div class="form-group d-flex flex-wrap align-items-center justify-content-between mb-0">
              <div class="d-flex flex-wrap flex-grow-1 align-items-center">
                <div class="send-btn pl-3 mb-2">
                  <button type="submit" class="btn btn-primary">確定</button>
                </div>
                <div class="send-panel mb-2">
                  <label class="ms-2 mb-0 bg-soft-primary rounded" for="file">
                    <input type="file" id="file" style="display: none">
                    <a><i class="ri-attachment-line text-primary"></i></a>
                  </label>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <div class="send-panel float-right">
                  <label class="ms-2 mb-0 bg-soft-primary rounded">
                    <a href="../../" class="material-symbols-outlined">delete</a>
                  </label>
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
import { ref, reactive, onMounted } from 'vue';
import { articlePortApi } from '@/api/article.js';
import { useStore } from 'vuex';
import { getFromLocalStorage } from '@/utilities/tools.js';
import { useRouter } from 'vue-router';
import Notification from "@/components/float/Notification.vue";

// 使用 reactive 封裝通知的狀態
const notificationState = reactive({
  show: false,
  message: '',
  type: 'info'
});

const router = useRouter();
const store = useStore();
const boards = ref(getFromLocalStorage('boards'));

// const findBoardId = (name) => {
//   const board = boards.value.find(board => board.name === name);
//   return board ? board.id : null;
// };

let formData = reactive({
  author_id: store.state.userInfo?.id,
  title: '',
  content: '',
  username: store.state.userInfo?.name,
  address: store.state.userInfo?.address,
  publicationDate: '',
  chained: false,
  images: [],
});

const imagePreviews = ref([]);

// 監聽圖片上傳
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

const handleSubmit = async () => {
  console.log(formData.boardId);
  if (!formData.title || formData.title.length > 30 || !formData.content || formData.boardId === undefined) {
    notificationState.message = '請填寫標題、內容並選擇看板。';
    notificationState.type = 'warning';
    notificationState.show = true;
    return;
  }
  if(formData.content.length > 500) {
    notificationState.message = '文章請勿超過500字。';
    notificationState.type = 'warning';
    notificationState.show = true;
  }

  try {
    const form = new FormData();
    form.append('id', formData.author_id);
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('username', formData.username);
    form.append('address', formData.address);
    form.append('publicationDate', new Date().getTime());
    form.append('chained', formData.chained);
    form.append('boardId', formData.boardId);

    formData.images.forEach(image => {
      form.append('images', image);
    });
    // console.log("form.boardId", form.boardId);
    const response = await articlePortApi(form);
    if (response.data.code === 1) {
      router.push("/");
      notificationState.message = '文章發布成功!';
      notificationState.type = 'success';
      notificationState.show = true;
    } else {
      notificationState.message = '上傳失敗，請稍後再試。';
      notificationState.type = 'error';
      notificationState.show = true;
    }

    // 重置表單
    formData.title = '';
    formData.content = '';
    formData.chained = false;
    formData.images = [];
    imagePreviews.value = [];
  } catch (error) {
    console.error('Error uploading article:', error);
  }
};

onMounted(() => {
  if (store.state.userInfo === null) {
    notificationState.message = '請先登入。';
    notificationState.type = 'warning';
    notificationState.show = true;
    router.push("/");
  }
});
</script>
