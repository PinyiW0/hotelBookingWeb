<script setup lang="ts">
import type { FormRules } from 'element-plus';
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
/** TODO: 寄送電子信箱邏輯 */
const sendMail= () => {
  if (!isEmailValid.value) {
    console.error('電子信箱格式不正確');
    return;
  }
  console.log('寄送忘記密碼郵件', email.value);
}
</script>
<template>
  <div class="relative grid grid-cols-1 xl:grid-cols-2 h-screen">
    <!-- deco line -->
    <img src="/images/deco/login-line-web.svg" aria-hidden="true" class="hidden xl:block absolute top-10 sm:top-0 right-0 w-1/2">
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
      <NuxtLink to="/login" class="text-primary text-end text-3.5 fw-bold cursor-pointer hover:opacity-60">已經是會員,前往登入頁</NuxtLink>
    </div>
  </div>
</template>
<style scoped>
:deep(.el-form-item__label){
  color: white;
}
:deep(.el-checkbox){
  color: white;
  font-size: 16px;
  font-weight: bold;
}
</style>