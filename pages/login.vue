<script setup lang="ts">
const api = useApi();
const { $swal } = useNuxtApp() as any;

import { useUserInfoStore } from '@/stores/userInfo';
import type { FormRules } from 'element-plus';
import { ElForm } from 'element-plus';

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

// #region 登入
/** form */
interface LoginInForm {
  email: string;
  password: string;
};
const loginForm = ref<InstanceType<typeof ElForm> | null>(null);
const formTemplate = ref<LoginInForm>({
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
const handleLogin = async () => {
  const isValid = await loginForm.value?.validate();
  if (isValid) {
    try {
      // 記住帳號
      if (rememberAccount.value) {
        loginInfoCookie.value = formTemplate.value.email;
      } else {
        loginInfoCookie.value = null;
      };

      // 呼叫 API 登入
      const response = await api.Users.Login(formTemplate.value);
      const { token, result = null } = response;

      if (result && token) {
        const userStore = useUserInfoStore();
        userStore.setUserInfo(result, token);
        await $swal.fire({
          icon: 'success',
          iconColor: '#52DD7E',
          title: '登入成功！',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });
        // 清空表單（如果不記住帳號）
        if (!rememberAccount.value) {
          loginForm.value?.resetFields();
        };
        navigateTo('/');
      } else {
        await $swal.fire({
          icon: 'error',
          iconColor: '#DA3E51',
          title: '登入失敗！',
          text: '請檢查您的電子信箱與密碼是否正確',
          showConfirmButton: true
        });
      }
    } catch (error: any) {
      await $swal.fire({
        icon: 'error',
        iconColor: '#DA3E51',
        title: '登入失敗！',
        text: '很抱歉，此帳號不存在',
        showConfirmButton: true
      });
    }
  } else {
    await $swal.fire({
      icon: 'error',
      iconColor: '#DA3E51',
      title: '登入失敗！',
      text: '請稍後再試，或是聯絡客服',
      showConfirmButton: true
    });
  }
};

/** 載入記住的帳號資訊 */
onMounted(() => {
  if (loginInfoCookie.value) {
    formTemplate.value.email = loginInfoCookie.value;
    rememberAccount.value = true;
  }
});
// #endregion 登入
</script>

<template>
  <div class="relative grid grid-cols-1 xl:grid-cols-2 h-screen">
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
      <div class="flex flex-col gap-2">
        <p class="text-sm text-primary font-bold">享樂酒店，誠摯歡迎</p>
        <h2 class="text-8 text-white font-bold tracking-wide">立即開始旅程</h2>
      </div>
      <!-- form -->
      <el-form ref="loginForm" :model="formTemplate" :rules="rules" class="flex flex-col gap-4">
        <el-form-item label="電子信箱" label-position="top" prop="email">
          <el-input v-model="formTemplate.email" placeholder="請輸入電子信箱" />
        </el-form-item>
        <el-form-item label="密碼" label-position="top" prop="password">
          <el-input v-model="formTemplate.password" type="password" placeholder="請輸入密碼" show-password />
        </el-form-item>
      </el-form>
      <!-- submit -->
      <DefaultBtn @click="handleLogin" text="會員登入" class="font-bold" />
      <div class="flex items-center justify-between">
        <el-checkbox v-model="rememberAccount" label="記住帳號" size="large" class="custom-checkbox" />
        <NuxtLink to="/forget" class="text-primary text-3.5 fw-bold cursor-pointer duration-300 hover:opacity-60">忘記密碼?
        </NuxtLink>
      </div>
      <!-- go to signup -->
      <div class="flex items-center gap-2">
        <p class="text-sm text-white">沒有會員嗎？</p>
        <DefaultBtn to="/register" text="前往註冊" btnStyle="onlyText" class="font-bold" />
      </div>
    </div>
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