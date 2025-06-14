<template>
  <div class="row">
    <div class="col-lg-12">
      <iq-card>
        <div class="iq-card-body p-0">
          <div class="iq-edit-list">
            <tab-nav :pills="true" id="pills-tab"
              class="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items edit-profile">
              <tab-nav-items class="col-sm-3 p-0" :active="true" id="pills-peronal-tab" href="#personal-information"
                ariaControls="pills-personal" role="tab" :ariaSelected="true" title="個人資訊" />
              <tab-nav-items class="col-sm-3 p-0" :active="false" id="pills-password-tab" href="#chang-pwd"
                ariaControls="pills-password" role="tab" :ariaSelected="false" title="變更密碼" />
              <tab-nav-items class="col-sm-3 p-0" :active="false" id="pills-sms-tab" href="#emailandsms"
                ariaControls="pills-sms" role="tab" :ariaSelected="false" title="電子郵件設定" />
              <tab-nav-items class="col-sm-3 p-0" :active="false" id="pills-contact-tab" href="#manage-contact"
                ariaControls="pills-contact" role="tab" :ariaSelected="false" title="管理通知" />
            </tab-nav>
          </div>
        </div>
      </iq-card>
    </div>
    <div class="col-lg-12">
      <div class="iq-edit-list-data">
        <div class="tab-content">
          <tab-content-item :active="true" id="personal-information" aria-labelled-by="pills-peronal-tab">
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">個人資料</h4>
              </template>
              <template v-slot:body>
                <div class="form-group row align-items-center">
                  <div class="col-md-12">
                    <div class="profile-img-edit">
                      <img class="profile-pic" :src="avatarPreview ? avatarPreview : 'data:image/png;base64,' + avatar"
                        alt="profile-pic">
                      <div class="p-image">
                        <i class="ri-pencil-line upload-button text-white" @click="triggerFileUpload"></i>
                        <input ref="fileInput" type="file" accept="image/*" @change="previewImage"
                          style="display: none;" />
                      </div>
                    </div>
                  </div>
                </div>
                <form @submit.prevent="handleSubmit">
                  <div class=" row align-items-center">
                    <div class="form-group col-sm-6">
                      <label for="uname" class="form-label">暱稱：</label>
                      <input type="text" class="form-control" v-model="username" placeholder="Username...">
                    </div>
                    <div class="form-group col-sm-6">
                      <label for="cname" class="form-label">區塊鏈地址：</label>
                      <input type="text" class="form-control" v-model="address" placeholder="Address..." readonly>
                    </div>
                    <div class="form-group col-sm-6">
                      <label for="cname" class="form-label">電子郵件：</label>
                      <input type="text" class="form-control" v-model="email" placeholder="Email...">
                    </div>
                    <div class="form-group col-sm-6">
                      <label for="cname" class="form-label">性別：</label>
                      <select v-model="sex" class="form-select">
                        <option value="M">男</option>
                        <option value="F">女</option>
                      </select>
                    </div>
                    <div class="form-group col-sm-12">
                      <label class="form-label">個人簡介：</label>
                      <textarea class="form-control" name="intro" rows="5" style="line-height: 20px;" v-model="intro">
                        </textarea>
                    </div>
                  </div>
                  <button class="btn btn-primary me-2" type="submit">更改</button>
                  <button type="reset" class="btn bg-soft-danger">取消</button>
                </form>
              </template>
            </iq-card>
          </tab-content-item>
          <tab-content-item :active="false" id="chang-pwd" aria-labelled-by="pills-password-tab">
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">變更密碼</h4>
              </template>
              <template v-slot:body>
                <form>
                  <div class="form-group">
                    <label for="cpass" class="form-label">目前密碼：</label>
                    <a href="javascripe:void();" class="float-end">Forgot Password</a>
                    <input type="Password" class="form-control" id="cpass" value="">
                  </div>
                  <div class="form-group">
                    <label for="npass" class="form-label">新密碼：</label>
                    <input type="Password" class="form-control" id="npass" value="">
                  </div>
                  <div class="form-group">
                    <label for="vpass" class="form-label">請輸入欲更改的密碼：</label>
                    <input type="Password" class="form-control" id="vpass" value="">
                  </div>
                  <button type="submit" class="btn btn-primary me-2">更改</button>
                  <button type="reset" class="btn bg-soft-danger">取消</button>
                </form>
              </template>
            </iq-card>
          </tab-content-item>
          <tab-content-item :active="false" id="emailandsms" aria-labelled-by="pills-sms-tab">
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">Email and SMS</h4>
              </template>
              <template v-slot:body>
                <form>
                  <div class="form-group row align-items-center">
                    <label class="col-md-3" for="emailnotification">Email Notification:</label>
                    <div class="col-md-9 form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked11" checked>
                      <label class="form-check-label" for="flexSwitchCheckChecked11">Checked switch checkbox
                        input</label>
                    </div>
                  </div>
                  <div class="form-group row align-items-center">
                    <label class="col-md-3" for="smsnotification">SMS Notification:</label>
                    <div class="col-md-9 form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked12" checked>
                      <label class="form-check-label" for="flexSwitchCheckChecked12">Checked switch checkbox
                        input</label>
                    </div>
                  </div>
                  <div class="form-group row align-items-center">
                    <label class="col-md-3" for="npass">When To Email</label>
                    <div class="col-md-9">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault12">
                        <label class="form-check-label" for="flexCheckDefault12">
                          You have new notifications.
                        </label>
                      </div>
                      <div class="form-check d-block">
                        <input class="form-check-input" type="checkbox" value="" id="email02">
                        <label class="form-check-label" for="email02">You're sent a direct message</label>
                      </div>
                      <div class="form-check d-block">
                        <input type="checkbox" class="form-check-input" id="email03" checked="">
                        <label class="form-check-label" for="email03">Someone adds you as a connection</label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row align-items-center">
                    <label class="col-md-3" for="npass">When To Escalate Emails</label>
                    <div class="col-md-9">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="email04">
                        <label class="form-check-label" for="email04">
                          Upon new order.
                        </label>
                      </div>
                      <div class="form-check d-block">
                        <input class="form-check-input" type="checkbox" value="" id="email05">
                        <label class="form-check-label" for="email05">New membership approval</label>
                      </div>
                      <div class="form-check d-block">
                        <input type="checkbox" class="form-check-input" id="email06" checked="">
                        <label class="form-check-label" for="email06">Member registration</label>
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary me-2">Submit</button>
                  <button type="reset" class="btn bg-soft-danger">Cancle</button>
                </form>
              </template>
            </iq-card>
          </tab-content-item>
          <tab-content-item :active="false" id="manage-contact" aria-labelled-by="pills-contact-tab">
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">Manage Contact</h4>
              </template>
              <template v-slot:body>
                <form>
                  <div class="form-group">
                    <label for="cno" class="form-label">Contact Number:</label>
                    <input type="text" class="form-control" id="cno" value="001 2536 123 458">
                  </div>
                  <div class="form-group">
                    <label for="email" class="form-label">Email:</label>
                    <input type="text" class="form-control" id="email" value="Bnijone@demo.com">
                  </div>
                  <div class="form-group">
                    <label for="url" class="form-label">Url:</label>
                    <input type="text" class="form-control" id="url" value="https://getbootstrap.com">
                  </div>
                  <button type="submit" class="btn btn-primary me-2">Submit</button>
                  <button type="reset" class="btn bg-soft-danger">Cancle</button>
                </form>
              </template>
            </iq-card>
          </tab-content-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { editApi, putprofileApi, uploadImageApi } from '@/api/profile.js';

const store = useStore();
const personInfo = ref([]);
const username = ref('');
const address = ref('');
const email = ref('');
const sex = ref('');
const intro = ref('');
const avatar = ref(null);  // 改為存儲文件對象

// 請求編輯用戶信息
const editApi1 = async () => {
  const response = await editApi(store.state.userInfo?.id);
  if (response.data.code === 1) {
    personInfo.value = response.data.data || [];
    username.value = personInfo.value.name;
    address.value = personInfo.value.address;
    email.value = personInfo.value.email;
    intro.value = personInfo.value.intro;
    sex.value = personInfo.value.sex;
    avatar.value = personInfo.value.avatar;
    console.log(response.data.data);
  } else {
    console.log('error');
  }
};

// 提交資料和圖片
const handleSubmit = async () => {
  const putpersonInfo = {
    id: store.state.userInfo?.id,
    name: username.value,
    address: address.value,
    email: email.value,
    sex: sex.value,
    intro: intro.value,
  };

  const form = new FormData();
  form.append('id', store.state.userInfo?.id);
  if (avatarPreview.value) {
    form.append('avatar', avatar.value); // 添加新選擇的圖片到 FormData 中
  }

  try {
    const res = await putprofileApi(putpersonInfo); // 用戶信息更新
    store.dispatch('updateUserInfo', putpersonInfo);
    console.log('用戶信息更新成功:', res.data.data);
    // 處理圖片上傳
    if (res.data.code === 1 && avatarPreview.value) {
      const response = await uploadImageApi(form); // 圖片上傳
      if (response.data.code !== 1) {
        console.error('圖片上傳失敗:', response.data.msg);
        return;
      }
      store.dispatch('updateAvatar', avatarPreview.value.split(',')[1]);
    }

    if (res.data.code === 1) {
      console.log('資料提交成功', putpersonInfo);
      window.location.reload();
    } else {
      console.error('資料提交失敗:', res.data.msg);
    }

  } catch (err) {
    console.error('請求出錯:', err);
  }
};

const avatarPreview = ref(null);  // 圖片預覽
// 預覽上傳的圖片
const previewImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target.result;  // 保存 Base64 字符串作為圖片預覽base64String.split(',')[1]
    };
    reader.readAsDataURL(file);  // 將文件轉換為 Base64
    avatar.value = file;  // 保存文件對象
  }
};

// 點擊觸發文件上傳
const triggerFileUpload = () => {
  fileInput.value.click();
};

const fileInput = ref(null);

// 組件掛載時初始化用戶信息
onMounted(() => {
  editApi1();
});
</script>

<style scoped>
.profile-img-edit {
  position: relative;
  display: inline-block;
  height: 150px;
  width: 150px;
}

.profile-pic {
  width: 100%;
  /* 確保圖片符合容器的寬度 */
  height: 100%;
  /* 確保圖片符合容器的高度 */
  object-fit: cover;
  /* 圖片裁剪並保持比例 */
  border-radius: 50%;
  /* 將圖片變成圓形（可選） */
}

.p-image {
  position: absolute;
  top: auto;
  right: 8px;
  bottom: 10px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: #50b5ff;
  color: #fff;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  line-height: 28px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}

.file-upload {
  display: none;
}

.upload-button {
  font-size: 1.5em;
}
</style>