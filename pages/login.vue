<script setup lang="ts">
import { ElForm } from 'element-plus';

const api = useApi();
const { $swal } = useNuxtApp() as any;

import { useUserInfoStore } from '@/stores/userInfo';
const userStore = useUserInfoStore();

import type { FormRules } from 'element-plus';
import type { LoginQuery } from '@/api/Users/types';


defineOptions({
  name: 'Login'
});
useSeoMeta({
  title: '登入頁',
  description: '登入頁',
});
definePageMeta({
  headerBgColor: 'bg-gray-120',
  layout: 'login',
});

// #region === 登入流程處理 ===
/* 按鈕loading */
const isLoading = ref<boolean>(false);
/** form */
const loginForm = ref<InstanceType<typeof ElForm> | null>(null);
const loginData = ref<LoginQuery>({
  email: '',
  password: '',
});
const rememberAccount = ref(false);
const loginInfoCookie = useCookie('loginInfo');

/** 驗證 */
const rules: FormRules = {
  email: [
    { required: true, message: '電子信箱為必填', trigger: ['blur', 'change'] },
    { type: 'email', message: '電子信箱格式錯誤', trigger: ['blur', 'change'] },
  ],
  password: [{ required: true, message: '密碼為必填', trigger: ['blur', 'change'] }]
};

/** 登入 */
const handleLogin = () => {
  loginForm.value?.validate((isValid: boolean) => {
    if (isValid) {
      isLoading.value = true;

      if (rememberAccount.value) {
        loginInfoCookie.value = loginData.value.email;
      } else {
        loginInfoCookie.value = null;
      }

      api.Users.Login(loginData.value)
        .then((response) => {
          const { token, result = null } = response;

          if (result && token) {
            userStore.setUserInfo(result, token);

            return $swal.fire({
              icon: 'success',
              iconColor: '#52DD7E',
              title: '登入成功！',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true
            }).then(() => {
              if (!rememberAccount.value) {
                loginForm.value?.resetFields();
              }

              navigateTo('/');
            });
          } else {
            return $swal.fire({
              icon: 'error',
              iconColor: '#DA3E51',
              title: '登入失敗！',
              text: '請檢查您的電子信箱與密碼是否正確',
              showConfirmButton: true
            });
          }
        })
        .catch(() => {
          $swal.fire({
            icon: 'error',
            iconColor: '#DA3E51',
            title: '登入失敗！',
            text: '請先輸入正確的帳號密碼',
            showConfirmButton: true
          });
        })
        .finally(() => { isLoading.value = false });
    }
  });
};
// #endregion === 登入流程處理 ===

// #region === 忘記密碼流程 ===
const dialogVisible = ref<boolean>(false);
const mailForm = reactive({ email: "" });
const emailForm = ref<InstanceType<typeof ElForm> | null>(null);
/** 忘記密碼 */
const handlePsw = () => {
  emailForm.value?.validate((isValid: boolean) => {
    if (isValid) {
      isLoading.value = true;

      api.Verify.CheckMail({ email: mailForm.email })
        .then(({ status = false, result = null }) => {
          if (status && result?.isEmailExists) {
            return $swal.fire({
              icon: 'success',
              iconColor: '#52DD7E',
              title: '驗證碼寄送成功',
              showConfirmButton: true,
            }).then(() => {
              navigateTo('/forget');
            });
          } else {
            return $swal.fire({
              icon: 'error',
              iconColor: '#DA3E51',
              title: '信箱不存在',
              text: '請確認您的電子信箱是否正確',
              showConfirmButton: true,
            });
          }
        })
        .catch(() => {
          $swal.fire({
            icon: 'error',
            iconColor: '#DA3E51',
            title: '驗證失敗',
            text: '請稍後再試',
            showConfirmButton: true,
          });
        })
        .finally(() => { isLoading.value = false });
    }
  });
};
// #endregion === 忘記密碼流程 ===

/** 載入記住的帳號資訊 */
onMounted(() => {
  if (loginInfoCookie.value) {
    loginData.value.email = loginInfoCookie.value;
    rememberAccount.value = true;
  };
});
</script>

<template>
  <div class="relative grid grid-cols-1 xl:grid-cols-2">
    <!-- deco line -->
    <img src="/images/deco/login-line-web.svg" aria-hidden="true"
      class="hidden xl:block absolute top-10 sm:top-0 right-0 w-1/2">
    <img src="/images/deco/login-line.svg" aria-hidden="true" class="xl:hidden absolute top-10 sm:top-0 w-full">
    <!-- bg -->
    <div class="max-w-960px overflow-hidden">
      <img src="/images/Image/Login_BG.png" aria-hidden="true" class="hidden xl:block object-cover">
    </div>
    <!-- login -->
    <div class=" px-5 sm:px-20 3xl:(px-68 pt-40) pt-23 pb-41 w-full flex flex-col gap-10">
      <!-- title -->
      <div class="z-1 flex flex-col gap-2">
        <p class="text-sm text-primary font-bold">享樂酒店，誠摯歡迎</p>
        <h2 class="text-8 text-white font-bold tracking-wide">立即開始旅程</h2>
      </div>
      <!-- form -->
      <el-form ref="loginForm" @keyup.enter="handleLogin" :model="loginData" :rules="rules" class="flex flex-col gap-4">
        <el-form-item label="電子信箱" label-position="top" prop="email">
          <el-input v-model="loginData.email" placeholder="請輸入電子信箱" />
        </el-form-item>
        <el-form-item label="密碼" label-position="top" prop="password">
          <el-input v-model="loginData.password" type="password" placeholder="請輸入密碼" show-password />
        </el-form-item>
        <el-form-item>
          <DefaultBtn @click="handleLogin" :loading="isLoading"
            :disabled="!loginData.email || !loginData.password || isLoading" text="會員登入" class="mt-5 font-bold" />
        </el-form-item>
      </el-form>
      <div class="flex items-center justify-between">
        <el-checkbox v-model="rememberAccount" label="記住帳號" size="large" class="custom-checkbox" />
        <DefaultBtn @click="dialogVisible = true" text="忘記密碼?" btnStyle="onlyText" />
      </div>
      <!-- go to signup -->
      <div class="flex items-center gap-2">
        <p class="text-sm text-white">沒有會員嗎？</p>
        <DefaultBtn to="/register" text="前往註冊" btnStyle="onlyText" class="font-bold" />
      </div>
    </div>

    <!-- 驗證 mail Modal -->
    <el-dialog v-model="dialogVisible" title="請輸入您的電子信箱" width="500" align-center class="!rounded-5 !p-10">
      <el-form ref="emailForm" :model="mailForm"
        :rules="{ email: [{ type: 'email', message: '請輸入有效的電子信箱', trigger: ['blur', 'change'] }] }">
        <el-form-item prop="email">
          <el-input v-model="mailForm.email" placeholder="請輸入電子信箱" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="ml-auto w-1/3 flex items-center justify-end gap-4">
          <DefaultBtn @click="dialogVisible = false" text="取消" btnStyle="secondary" class="!px-4 !py-2" />
          <DefaultBtn @click="handlePsw" text="確認" :loading="isLoading" :disabled="!mailForm.email || isLoading"
            class="!px-4 !py-2" />
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
:deep(.el-form-item__label) {
  color: white;
}

:deep(.el-checkbox) {
  color: white;
  font-size: 16px;
  font-weight: bold;
}

/* 勾選狀態的框樣式 */
:deep(.custom-checkbox .el-checkbox__inner) {
  padding: 10px;
  border: 1px solid white;
  border-radius: 4px;
  background-color: white;
  transition: all 0.3s ease;
}

:deep(.custom-checkbox .el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #BF9D7D;
  border-color: #BF9D7D;
}

/* 勾選狀態label */
:deep(.custom-checkbox .el-checkbox__label) {
  color: white !important;
  font-size: 14px !important;
}

/* 勾勾樣式 */
:deep(.custom-checkbox .el-checkbox__input.is-checked .el-checkbox__inner::after) {
  padding-top: 4px;
  padding-left: 4px;
  border-radius: 1px;
  border-bottom: 2px solid;
  border-right: 2px solid;
}
</style>