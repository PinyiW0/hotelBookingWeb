<script setup lang="ts">
import { ElForm } from 'element-plus';

const api = useApi();
const { $swal } = useNuxtApp() as any;

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
const rules: FormRules = {
  email: [
    { required: true, message: '電子信箱為必填', trigger: ['blur', 'change'] },
    { type: 'email', message: '電子信箱格式錯誤', trigger: ['blur', 'change'] },
  ],
  newPassword: [{ required: true, message: '密碼為必填', trigger: ['blur', 'change'] }],
  code: [{ required: true, message: '驗證碼為必填', trigger: ['blur', 'change'] }]
};

/** 驗證與重設用的狀態 */
const isLoading = useState('loading');
const resetForm = reactive({
  email: '',
  code: '',
  newPassword: '',
});
const checkForm = ref<InstanceType<typeof ElForm> | null>(null);
const resetPsw = async () => {
  const isValid = await checkForm.value?.validate();
  if (!isValid) return;
  const { status = false } = await api.Verify.CheckMail(resetForm);
  if (status) {
    await $swal.fire({
      icon: 'success',
      iconColor: '#52DD7E',
      title: '重設密碼成功',
      text: '請使用新密碼登入',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
    navigateTo('/login');
  } else {
    $swal.fire({
      icon: 'error',
      iconColor: '#DA3E51',
      title: '重設失敗！',
      text: '請稍後再試，或是聯絡客服',
      showConfirmButton: true
    });
  };
};
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
      <div class="z-2 flex flex-col gap-2">
        <p class="text-sm text-primary font-bold">享樂酒店，誠摯歡迎</p>
        <h2 class="text-8 text-white font-bold tracking-wide">重設密碼</h2>
      </div>
      <!-- form -->
      <div class="flex flex-col gap-8">
        <el-form ref="checkForm" :model="resetForm" :rules="rules" class="flex flex-col gap-8">
          <el-form-item label="電子信箱" label-position="top" prop="email">
            <el-input v-model="resetForm.email" placeholder="請輸入電子信箱" />
          </el-form-item>
          <el-form-item label="新密碼" label-position="top" prop="newPassword">
            <el-input v-model="resetForm.newPassword" type="password" placeholder="請輸入密碼" show-password />
          </el-form-item>
          <el-form-item label="驗證碼" label-position="top" prop="code">
            <el-input v-model="resetForm.code" placeholder="請輸入驗證碼" />
          </el-form-item>
          <el-form-item>
            <DefaultBtn @click="resetPsw" text="重設密碼" class="mt-8 font-bold" />
          </el-form-item>
        </el-form>
      </div>
      <!-- go to login -->
      <DefaultBtn to="/login" text="已經是會員,前往登入頁" btnStyle="onlyText" class="ml-auto font-bold" />
    </div>
  </div>
</template>

<style scoped>
:deep(.el-form-item__label) {
  color: white;
}
</style>