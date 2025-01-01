<script setup lang="ts">
import type { FormRules } from 'element-plus';
defineOptions({
  name: 'Register'
});
useSeoMeta({
  title: '註冊頁',
  description: '註冊頁',
});
definePageMeta({
  layout: 'login',
});

/** form */
interface LoginInForm {
  email: string;
  password: string;
};
const form = ref<LoginInForm>({
  email: '',
  password: '',
});
const form2 = ref({
  name: '',
  phone: '',
  birthday: '',
  zipcode: '',
  detail: '',
  city: '',
  county: '',
});
/** 驗證 */
const rules = reactive<FormRules>({
  email: [
    { required: true, message: '電子信箱為必填', trigger: ['blur', 'change'] },
    { type: 'email', message: '電子信箱格式錯誤', trigger: ['blur', 'change'] },
  ],
  password: [{ required: true, message: ' 密碼為必填', trigger: ['blur', 'change'] }]
});
const step2Rules = reactive<FormRules>({
  name: [{ required: true, message: '姓名為必填', trigger: ['blur', 'change'] }],
  phone: [{ required: true, message: '手機號碼為必填', trigger: ['blur', 'change'] }],
  birthday: [{ required: true, message: '生日為必填', trigger: ['blur', 'change'] }],
  zipcode: [{ required: true, message: '郵遞區號為必填', trigger: ['blur', 'change'] }],
  detail: [{ required: true, message: '詳細地址為必填', trigger: ['blur', 'change'] }],
  city: [{ required: true, message: '縣市為必填', trigger: ['blur', 'change'] }],
  county: [{ required: true, message: '區域為必填', trigger: ['blur', 'change'] }],
});

const cities = [
  {label:'台北',value:'台北'},
  {label:'高雄',value:'高雄'},
];
const county = [
  {label:'中山區',value:'中山區'},
  {label:'新興區',value:'新興區'},
]
// #region 步驟相關
/** 步驟 */
interface Step {
  value: number;
  label: string;
  completed: boolean;
};
const steps = ref<Step[]>([
  { value: 1, label: '輸入信箱及密碼', completed: false },
  { value: 2, label: '填寫基本資料', completed: false },
])
const activeStep = ref(2);
/** 下一步 */
const nextStep = () => {
  if (activeStep.value < steps.value.length) {
    steps.value[activeStep.value - 1].completed = true;
    activeStep.value++;
  }
};
/** 返回上一步 */
const prevStep = () => {
  if (activeStep.value > 1) {
    steps.value[activeStep.value - 2].completed = false;
    activeStep.value--;
  }
};
/** 判斷是否為最後一步 */
const isLastStep = () => activeStep.value === steps.value.length;
// #endregion 步驟相關

const agreeRules = ref(false);
</script>

<template>
  <div class="relative grid grid-cols-1 xl:grid-cols-2 h-screen">
    <!-- deco line -->
    <img src="/images/deco/login-line-web.svg" aria-hidden="true"
      class="hidden xl:block absolute top-10 sm:top-12 right-0 w-1/2">
    <img src="/images/deco/login-line.svg" aria-hidden="true" class="xl:hidden absolute top-10 sm:top-0 w-full">
    <!-- bg -->
    <div class="max-w-960px overflow-hidden">
      <img src="/images/Image/Login_BG.png" aria-hidden="true" class="hidden xl:block object-cover">
    </div>
    <div class="px-5 sm:px-20 3xl:(px-68 pt-40) pb-41 w-full">
      <div class="flex flex-col gap-4">
        <!-- title -->
        <div class="flex flex-col gap-2">
          <p class="text-sm text-primary font-bold">享樂酒店，誠摯歡迎</p>
          <h2 class="text-8 text-white font-bold tracking-wide">立即註冊</h2>
        </div>
        <!-- 步驟選擇器 -->
        <el-steps :space="200" :active="activeStep" finish-status="success" align-center class="my-4 flex justify-center">
          <el-step title="輸入信箱及密碼" />
          <el-step title="填寫基本資料" />
        </el-steps>
      </div>

      <!-- step1 -->
      <div v-if="activeStep === 1" class="mt-8 w-full flex flex-col gap-10">
        <!-- form1 -->
        <el-form :model="form" :rules="rules" class="flex flex-col gap-4">
          <el-form-item label="電子信箱" label-position="top" prop="email">
            <el-input v-model="form.email" placeholder="hello@exsample.com" />
          </el-form-item>
          <el-form-item label="密碼" label-position="top" prop="password">
            <el-input v-model="form.password" type="password" placeholder="請輸入密碼" show-password />
          </el-form-item>
          <el-form-item label="確認密碼" label-position="top" prop="password">
            <el-input v-model="form.password" type="password" placeholder="請再輸入一次密碼" show-password />
          </el-form-item>
        </el-form>
        <!-- nextStep -->
        <DefaultBtn to="/register" text="下一步" class="font-bold" />
        <!-- go to login -->
        <div class="flex items-center gap-2">
          <p class="text-sm text-white">已經有會員了嗎？</p>
          <DefaultBtn to="/login" text="立即登入" btnStyle="onlyText" class="font-bold" />
        </div>
      </div>
      <!-- step2 -->
      <div v-if="activeStep === 2" class="mt-8 w-full flex flex-col gap-10">
        <!-- form2 -->
        <el-form :model="form2" :rules="step2Rules" class="flex flex-col gap-4">
          <el-form-item label="姓名" label-position="top" prop="name">
            <el-input v-model="form2.name" placeholder="請輸入姓名" />
          </el-form-item>
          <el-form-item label="手機號碼" label-position="top" prop="phone">
            <el-input v-model="form2.phone" placeholder="請輸入手機號碼" />
          </el-form-item>
          <el-form-item label="生日" label-position="top" prop="birthday">
            <el-date-picker v-model="form2.birthday" type="date" placeholder="請選擇出生年月日" size="large"
              class="!w-full !h-52px" />
          </el-form-item>
          <el-form-item label="地址" label-position="top" prop="birthday">
            <div class="w-full flex items-center gap-2">
              <el-select v-model="form2.city" placeholder="請選擇縣市" class="!h-52px" size="large">
                <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-model="form2.county" placeholder="請選擇區域" class="!h-52px" size="large">
                <el-option v-for="item in county" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
            <el-input v-model="form2.birthday" placeholder="請輸入詳細地址" class="mt-2" />
          </el-form-item>
        </el-form>
        <el-checkbox v-model="agreeRules" label="我已閱讀並同意本網站個資使用規範" size="large" class="custom-checkbox" />
        <!-- nextStep -->
        <DefaultBtn to="/register" text="完成註冊" class="font-bold" />
        <!-- go to login -->
        <div class="flex items-center gap-2">
          <p class="text-sm text-white">已經有會員了嗎？</p>
          <DefaultBtn to="/login" text="立即登入" btnStyle="onlyText" class="font-bold" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-select--large .el-select__wrapper){
  padding: 18px 24px;
  border: 1px solid #909090;
  border-radius: 8px;
}
:deep(.el-form-item__label) {
  color: white;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-step__line) {
  width: 108px;
  display: flex;
  justify-self: center;
  margin: 16px 8px 0 8px;
  border-color: #909090;
}

:deep(.el-step__icon.is-text) {
  color: white;
  background-color: #BF9D7D;
  height: 32px;
  width: 32px;
  border: 0;
}

:deep(.el-step__title.is-success) {
  color: #FFF;
  font-weight: bold;
  font-size: 14px;
}

:deep(.el-step__title) {
  color: #909090;
  font-weight: bold;
  font-size: 14px;
}

/* 步驟二 */
:deep(.el-step:nth-child(2) .el-step__title.is-process) {
  color: #909090;
  font-weight: bold;
  font-size: 14px;
}

:deep(.el-step:nth-child(2) .el-step__icon.is-text) {
  color: #909090;
  background-color: transparent;
  height: 32px;
  width: 32px;
  border: 1px solid #909090;
}

:deep(.el-checkbox) {
  color: white;
  font-size: 16px;
  font-weight: bold;
}
</style>
