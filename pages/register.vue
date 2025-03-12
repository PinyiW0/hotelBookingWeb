<script setup lang="ts">
const { selectedCity, selectedCounty, getAreaList, resetCity, getZipCode, formatAddr } = useAddress();
import type { FormRules, FormInstance } from 'element-plus';
import CityCountyData from 'assets/json/cityCountyData.json';

const api = useApi();
const { $swal } = useNuxtApp() as any;
const { $dayjs } = useNuxtApp();

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

/** accountForm */
interface LoginInForm {
  email: string;
  password: string;
  confirmPassword: string;
};
const accountForm = ref<LoginInForm>({
  email: '',
  password: '',
  confirmPassword: '',
});
const profileForm = ref({
  name: '',
  phone: '',
  birthday: '',
  zipcode: '',
  detail: '',
  city: selectedCity,
  county: selectedCounty,
  addr: '',
  // 此為用來做驗證的欄位
  address: ''
});

/** 驗證 */
/** 驗證確認密碼 */
const checkConfirmPwd = (rule: any, value: string, callback: any) => {
  if (value !== accountForm.value.password) {
    callback(new Error("密碼不一致"));
  };
  callback();
};

/** Step.1 帳號資訊驗證 */
const accountFormRules = reactive<FormRules>({
  email: [
    { required: true, message: '電子信箱為必填', trigger: ['blur', 'change'] },
    { type: 'email', message: '電子信箱格式錯誤', trigger: ['blur', 'change'] },
  ],
  password: [{ required: true, message: ' 密碼為必填', trigger: ['blur', 'change'] }],
  confirmPassword: [
    { required: true, message: '必填，請再次輸入密碼', trigger: ['blur', 'change'] },
    { required: true, validator: checkConfirmPwd, trigger: ['blur', 'change'] },
  ],
});
/** Step.2 會員資料驗證 */
const profileFormRules = reactive<FormRules>({
  name: [{ required: true, message: '姓名為必填', trigger: ['blur', 'change'] }],
  phone: [
    { required: true, message: '手機號碼為必填', trigger: ['blur', 'change'] },
    { pattern: /^09\d{8}$/, message: '請輸入正確的手機號碼格式', trigger: ['blur', 'change'] }
  ],
  birthday: [{ required: true, message: '生日為必填', trigger: ['blur', 'change'] }],
  zipcode: [{ required: true, message: '郵遞區號為必填', trigger: ['blur', 'change'] }],
  detail: [{ required: true, message: '詳細地址為必填', trigger: ['blur', 'change'] }],
  address: [{ required: true, message: '請輸入地址', trigger: ['blur', 'change'] },],
});

/** 地址驗證欄位處理 */
watch(() => [profileForm.value.city, profileForm.value.county, profileForm.value.addr],
  ([newCity, newCounty, newAddr]) => {
    profileForm.value.address = formatAddr(newCity, newCounty, newAddr);
  }
);

/** 生日日期 disabled */
const disabledDate = (time: any) => !$dayjs(time).isBefore($dayjs().startOf('day'));

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
const activeStep = ref(1);

/** 表單 ref */
const accountFormRef = ref<FormInstance | null>(null);
const profileFormRef = ref<FormInstance | null>(null);

/** 下一步 */
const nextStep = () => {
  accountFormRef.value?.validate(async (isValid: boolean) => {
    if (isValid) {
      steps.value[activeStep.value - 1].completed = true;
      activeStep.value++;
    };
  });
};
const isCompleted = computed(() => {
  const { email, password, confirmPassword } = accountForm.value;
  return email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';
});

/** 完成註冊 */
const agreeRules = ref(false);

/** 註冊 */
const submit = () => {
  if (!agreeRules.value) {
    $swal.fire({
      icon: "error",
      iconColor: '#DA3E51',
      title: "重要提醒",
      text: "請閱讀並同意本網站個資使用規範",
      timer: 2000,
    });
    return;
  };

  profileFormRef.value?.validate(async (isValid: boolean) => {
    if (isValid) {
      const { email, password } = accountForm.value;
      const { name, phone, birthday, city, county, addr } = profileForm.value;
      // 合併帳號與會員資料
      const registrationData = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        birthday: $dayjs(birthday).format('YYYY/MM/DD'),
        address: {
          zipcode: getZipCode(city, county),
          detail: formatAddr(city, county, addr)
        }
      } as any;

      const { status } = await api.Users.SignIn(registrationData);
      if (status) {
        await $swal.fire({
          icon: 'success',
          iconColor: '#52DD7E',
          title: '註冊成功！',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });

        steps.value[activeStep.value - 1].completed = true;
        accountFormRef.value?.resetFields();
        profileFormRef.value?.resetFields();
        navigateTo('/login');
      } else {
        $swal.fire({
          icon: 'error',
          iconColor: '#DA3E51',
          title: '註冊失敗！',
          text: '請稍後再試，或是聯絡客服',
          showConfirmButton: true
        });
      };
    }
  });
};
// #endregion 步驟相關
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
        <el-steps :space="200" :active="activeStep" finish-status="success" align-center
          class="my-4 flex justify-center">
          <el-step v-for="step in steps" :key="step.value" :title="step.label"
            :status="step.completed ? 'success' : step.value === activeStep ? 'process' : 'wait'" />
        </el-steps>
      </div>

      <!-- step1 -->
      <div v-if="activeStep === 1" class="mt-8 w-full flex flex-col gap-10">
        <!-- accountForm -->
        <el-form ref="accountFormRef" :model="accountForm" :rules="accountFormRules" class="flex flex-col gap-4">
          <el-form-item label="電子信箱" label-position="top" prop="email">
            <el-input v-model="accountForm.email" placeholder="hello@exsample.com" />
          </el-form-item>
          <el-form-item label="密碼" label-position="top" prop="password">
            <el-input v-model="accountForm.password" type="password" placeholder="請輸入密碼" show-password />
          </el-form-item>
          <el-form-item label="確認密碼" label-position="top" prop="confirmPassword">
            <el-input v-model="accountForm.confirmPassword" type="password" placeholder="請再輸入一次密碼" show-password />
          </el-form-item>
        </el-form>
        <!-- nextStep -->
        <DefaultBtn @click="nextStep" :disabled="!isCompleted" text="下一步" class="font-bold" />
        <!-- go to login -->
        <div class="flex items-center gap-2">
          <p class="text-sm text-white">已經有會員了嗎？</p>
          <DefaultBtn to="/login" text="立即登入" btnStyle="onlyText" class="font-bold" />
        </div>
      </div>
      <!-- step2 -->
      <div v-if="activeStep === 2" class="mt-8 w-full flex flex-col gap-10">
        <!-- form2 -->
        <el-form ref="profileFormRef" :model="profileForm" :rules="profileFormRules" class="flex flex-col gap-4">
          <el-form-item label="姓名" label-position="top" prop="name">
            <el-input v-model.trim="profileForm.name" placeholder="請輸入姓名" />
          </el-form-item>
          <el-form-item label="手機號碼" label-position="top" prop="phone">
            <el-input v-model="profileForm.phone" placeholder="請輸入手機號碼" />
          </el-form-item>
          <el-form-item label="生日" label-position="top" prop="birthday">
            <el-date-picker v-model="profileForm.birthday" :disabled-date="disabledDate" type="date"
              placeholder="請選擇出生年月日" size="large" class="!w-full !h-52px" />
          </el-form-item>
          <el-form-item label="地址" label-position="top" prop="address">
            <div class="w-full flex items-center gap-2">
              <el-select @change="resetCity" v-model="profileForm.city" placeholder="請選擇縣市" class="!h-52px"
                size="large">
                <el-option v-for="city in CityCountyData" :key="city.CityName" :label="city.CityName"
                  :value="city.CityName" />
              </el-select>
              <el-select v-model="profileForm.county" :disabled="!getAreaList.length" placeholder="請選擇區域"
                class="!h-52px" size="large">
                <el-option v-for="area in getAreaList" :key="area.ZipCode" :label="area.AreaName"
                  :value="area.AreaName" />
              </el-select>
            </div>
            <el-input v-model="profileForm.addr" placeholder="請輸入詳細地址" class="mt-4" />
          </el-form-item>
        </el-form>
        <el-checkbox v-model="agreeRules" label="我已閱讀並同意本網站個資使用規範" size="large" class="custom-checkbox" />
        <!-- nextStep -->
        <DefaultBtn @click="submit" text="完成註冊" class="font-bold" />
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
:deep(.el-select--large .el-select__wrapper) {
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