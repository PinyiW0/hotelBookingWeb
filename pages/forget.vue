<script setup lang="ts">
const api = useApi();
const { $swal } = useNuxtApp() as any;
import { useRouter } from 'vue-router';
const router = useRouter();
import type { FormRules } from 'element-plus';
import type { ForgotPswQuery } from '@/api/Users/types';

defineOptions({
  name: 'Forget'
});
useSeoMeta({
  title: '忘記密碼頁',
  description: '忘記密碼頁',
});
definePageMeta({
  layout: 'login',
});

/** 驗證 */
const email = ref<string>('');
const isEmailValid = computed(() => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.value.trim());
});

/** 寄送電子信箱邏輯 */
const sendMail = async () => {
  if (!isEmailValid.value) {
    $swal.fire({
      icon: 'error',
      iconColor: '#DA3E51',
      title: '登入失敗！',
      text: '電子信箱格式不正確',
      showConfirmButton: true
    });
    return;
  };
  const params: ForgotPswQuery = {
    email: email.value,
    code: "0Zvjde",
    newPassword: "Dirt5528295"
  };
  try {
    const res = await api.Users.ForgotPsw({ ...params, showError: false });
    $swal.fire({
      icon: 'success',
      iconColor: '#52DD7E',
      title: '已寄出驗證信！',
      text: '請前往您的電子信箱查看密碼重設指示',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
    router.push('/login');
  } catch (error: any) {
    $swal.fire({
      icon: 'error',
      title: '發生錯誤',
      text: '此使用者不存在',
      showConfirmButton: false,
    });
  }
};
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
        <h2 class="text-8 text-white font-bold tracking-wide">忘記密碼嗎？</h2>
      </div>
      <!-- form -->
      <div class="flex flex-col gap-3">
        <el-input v-model="email" placeholder="請輸入電子信箱" />
        <p v-if="email.trim() && !isEmailValid" class="text-error">電子信箱格式不正確</p>
      </div>
      <!-- submit -->
      <DefaultBtn @click="sendMail" text="寄送密碼遺失認證信" :disabled="!isEmailValid" class="font-bold" />
      <!-- go to login -->
      <NuxtLink to="/login" class="text-primary text-end text-3.5 fw-bold cursor-pointer hover:opacity-60">已經是會員,前往登入頁
      </NuxtLink>
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
</style>