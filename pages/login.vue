<script setup lang="ts">
import type { FormRules } from 'element-plus';
defineOptions({
  name: 'Login'
});
useSeoMeta({
  title: '登入頁',
  description: '登入頁',
});
definePageMeta({
  layout: 'login',
});
/** form */
interface LoginInForm{
  email: string;
  password: string;
};
const form = ref<LoginInForm>({
  email:'',
  password: '',
});
/** 驗證 */
const rules = reactive<FormRules>({
  email:[
    {required: true, message:' 電子信箱為必填', trigger:['blur', 'change']},
    {type:'email', message:' 電子信箱格式錯誤', trigger:['blur', 'change']},
  ],
  password:[{required: true, message:' 密碼為必填', trigger:['blur', 'change']}]
});

const rememberAccount = ref(false);
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
        <h2 class="text-8 text-white font-bold tracking-wide">立即開始旅程</h2>
      </div>
      <!-- form -->
      <el-form :model="form":rules="rules" class="flex flex-col gap-4">
        <el-form-item label="電子信箱" label-position="top" prop="email">
          <el-input v-model="form.email"  placeholder="請輸入電子信箱" />
        </el-form-item>
        <el-form-item label="密碼" label-position="top"  prop="password">
          <el-input v-model="form.password" type="password" placeholder="請輸入密碼" show-password />
        </el-form-item>
      </el-form>
      <!-- submit -->
      <DefaultBtn to="/register" text="會員登入" class="font-bold" />
      <div class="flex items-center justify-between">
        <el-checkbox v-model="rememberAccount" label="記住帳號" size="large" class="custom-checkbox" />
        <NuxtLink to="/forget" class="text-primary text-3.5 fw-bold cursor-pointer duration-300 hover:opacity-60">忘記密碼?</NuxtLink>
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
:deep(.el-form-item__label){
  color: white;
}
:deep(.el-checkbox){
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
