<script setup lang="ts">
const { $dayjs } = useNuxtApp();
const router = useRouter();
import type { FormRules } from 'element-plus';
import CityCountyData from 'assets/json/cityCountyData.json';

defineOptions({
  name: 'MemberIndex'
});
definePageMeta({
  headerBgColor: 'bg-gray-120',
});
/** Tab */
const defaultTab = ref<string>('personalData');
const tabList = ref<any[]>([
  { title: '個人資料', val: 'personalData' },
  { title: '我的訂單', val: 'myOrder' },
]);
const handleChangeTab = (val: string) => {
  router.push({
    path: '/member',
    query: { tab: val },
  });
  // getList(val);
};

// watch(() => route.query.tab, (newTab) => {
//   if (newTab && tabList.value.some((tab) => tab.value === newTab)) {
//     defaultTab.value = newTab as string;
//     getList(newTab as string);
//   } else {
//     defaultTab.value = '學生';
//     getList('學生')
//   };
// });

// #region 修改密碼相關
/** updatePasswordform */
interface updatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const form = ref<updatePassword>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

/** 密碼驗證 */
const pswRules = reactive<FormRules>({
  oldPassword: [{ required: true, message: '舊密碼為必填', trigger: ['blur', 'change'] }],
  newPassword: [{ required: true, message: '新密碼為必填', trigger: ['blur', 'change'] }],
  confirmPassword: [
    { required: true, message: '請再次輸入密碼', trigger: ['blur', 'change'] },
    {
      validator: (rule, value, callback) => {
        if (value === form.value.oldPassword) {
          callback(new Error('新密碼與舊密碼不得一樣'));
        } else if (value !== form.value.newPassword) {
          callback(new Error('兩次輸入的密碼不一致'));
        } else {
          callback();
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
});

/** 修改密碼 */
const isEditPassword = ref(false);
const resetPassword = () => {
  isEditPassword.value = true;
};
/** 修改密碼提交 */
const submit = () => {
  alert('密碼修改成功！');
  isEditPassword.value = false;
  router.push('/member');
};
// #endregion 修改密碼相關

// #region 基本資料相關
/** 取得基本資料 */
const isEditUserInfo = ref(false);
const userInfo = reactive({
  name: 'Jessica Wang',
  phone: '+886 912 345 678',
  birthday: '1990 年 8 月 15 日',
  city: '高雄市',
  county: '新興區',
  addr: '六角路123號',
  // 此為用來做驗證的欄位
  address: ''
});

/** 儲存基本資料 */
const saveUserInfo = () => {
  isEditUserInfo.value = false;
  alert('資料修改成功！');
};
/** 篩選相對應區域 */
const filteredAreas = computed(() => {
  const selectedCity = CityCountyData.find(city => city.CityName === userInfo.city);
  return selectedCity ? selectedCity.AreaList : [];
});
/** 清除區域選擇 */
const updateAreas = () => {
  userInfo.county = '';
};

/** 使用者資料驗證 */
const userInfoRules = reactive<FormRules>({
  name: [
    { required: true, message: '請輸入姓名', trigger: ['blur', 'change'] },
  ],
  phone: [
    { required: true, message: '請輸入手機號碼', trigger: ['blur', 'change'] },
  ],
  birthday: [
    { required: true, message: '請輸入生日', trigger: ['blur', 'change'] },
  ],
  address: [
    { required: true, message: '請輸入地址', trigger: ['blur', 'change'] },
  ],
})

/** 地址驗證欄位處理 */
watch(
  () => [userInfo.city, userInfo.county, userInfo.addr],
  ([newCity, newCounty, newAddr]) => {
    userInfo.address = `${newCity} ${newCounty} ${newAddr}`.trim();
  }
);
// #endregion 基本資料相關
</script>

<template>
  <section class="w-full flex flex-col bg-gray-120">
    <!-- 會員 BN 區 -->
    <div class="w-full max-h-384px bg-[url(/images/Image/member.png)] bg-no-repeat bg-cover bg-top">
      <div
        class="px-5 py-10 w-full flex flex-col gap-4 xl:(px-0 py-30 max-w-1296px mx-auto flex-row items-center gap-6 )">
        <div class="w-18 h-18 xl:(w-36 h-36)">
          <img src="/images/Image/memeberIcon.png" alt="會員照片" class="w-full h-full object-cover">
        </div>
        <h2 class="text-8 xl:text-12 text-white font-bold tracking-wider">Hello，Jessica</h2>
      </div>
    </div>
    <div class="px-3 py-10 w-full flex flex-col gap-10 xl:(pt-20 pb-30 max-w-1296px mx-auto gap-20)">
      <Tab @update:model-value="handleChangeTab" v-model="defaultTab" :list="tabList" />
      <!-- 個人資料 -->
      <div v-if="defaultTab === 'personalData'" class="flex flex-col gap-6 xl:(flex-row gap-10)">
        <!-- 修改密碼 -->
        <div class="p-6 w-full h-fit flex flex-col gap-6 bg-white rounded-5">
          <h3 class="text-5 font-bold">修改密碼</h3>
          <!-- 電子信箱 -->
          <div class="flex flex-col gap-2">
            <p class="text-3.5 text-gray-80">電子信箱</p>
            <p class="text-3.4 font-bold">Jessica@exsample.com</p>
          </div>
          <!-- 密碼 -->
          <div v-if="!isEditPassword" class="flex items-center justify-between gap-2">
            <div class="flex flex-col gap-2">
              <p class="text-3.5 text-gray-80">密碼</p>
              <p class="text-3.4 font-bold">XXX</p>
            </div>
            <DefaultBtn @click="resetPassword" text="重設" btnStyle="onlyText" class="font-bold" />
          </div>
          <div v-else class="flex flex-col gap-2">
            <el-form ref="formRef" :model="form" :rules="pswRules" class="flex flex-col gap-4">
              <el-form-item label="舊密碼" label-position="top" prop="oldPassword">
                <el-input v-model="form.oldPassword" type="password" placeholder="請輸入密碼" show-password />
              </el-form-item>
              <el-form-item label="新密碼" label-position="top" prop="newPassword">
                <el-input v-model="form.newPassword" type="password" placeholder="請輸入密碼" show-password />
              </el-form-item>
              <el-form-item label="確認新密碼" label-position="top" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" type="password" placeholder="請再輸入一次密碼" show-password />
              </el-form-item>
            </el-form>
            <DefaultBtn @click="submit" to="/register" text="儲存設定"
              :disabled="!form.oldPassword || !form.newPassword || !form.confirmPassword" class="font-bold" />
          </div>
        </div>
        <!-- 基本資料 -->
        <div class="p-6 w-full flex flex-col gap-6 bg-white rounded-5">
          <h3 class="text-5 font-bold">基本資料</h3>
          <el-form ref="userInfoFormRef" :model="userInfo" :rules="userInfoRules" label-position="top"
            class="flex flex-col gap-4">
            <!-- 姓名 -->
            <el-form-item label="姓名" prop="name">
              <template v-if="isEditUserInfo">
                <el-input v-model="userInfo.name" placeholder="請輸入姓名" />
              </template>
              <template v-else>
                <p class="text-3.4 font-bold">{{ userInfo.name }}</p>
              </template>
            </el-form-item>

            <!-- 手機號碼 -->
            <el-form-item label="手機號碼" prop="phone">
              <template v-if="isEditUserInfo">
                <el-input v-model="userInfo.phone" placeholder="請輸入手機號碼" />
              </template>
              <template v-else>
                <p class="text-3.4 font-bold">{{ userInfo.phone }}</p>
              </template>
            </el-form-item>

            <!-- 生日 -->
            <el-form-item label="生日" prop="birthday">
              <template v-if="isEditUserInfo">
                <el-input v-model="userInfo.birthday" placeholder="請輸入生日" />
              </template>
              <template v-else>
                <p class="text-3.4 font-bold">{{ userInfo.birthday }}</p>
              </template>
            </el-form-item>

            <!-- 地址 -->
            <el-form-item label="地址" prop="address">
              <template v-if="isEditUserInfo">
                <div class="w-full flex items-center gap-2">
                  <el-select @change="updateAreas" v-model="userInfo.city" placeholder="請選擇縣市" class="!h-52px"
                    size="large">
                    <el-option v-for="city in CityCountyData" :key="city.CityName" :label="city.CityName"
                      :value="city.CityName" />
                  </el-select>
                  <el-select v-model="userInfo.county" :disabled="!filteredAreas.length" placeholder="請選擇區域"
                    class="!h-52px" size="large">
                    <el-option v-for="area in filteredAreas" :key="area.ZipCode" :label="area.AreaName"
                      :value="area.AreaName" />
                  </el-select>
                </div>
                <el-input v-model="userInfo.addr" placeholder="請輸入詳細地址" class="mt-4" />
              </template>
              <template v-else>
                <p class="text-3.4 font-bold">{{ userInfo.city }}{{ userInfo.county }}{{ userInfo.addr }}</p>
              </template>
            </el-form-item>
          </el-form>
          <DefaultBtn v-if="!isEditUserInfo" @click="isEditUserInfo = true" text="編輯" btnStyle="secondary"
            class="font-bold" />
          <DefaultBtn @click="saveUserInfo" v-if="!!isEditUserInfo" to="/member" text="儲存設定"
            :disabled="!userInfo.name || !userInfo.phone || !userInfo.birthday || !userInfo.addr" class="font-bold" />
        </div>
      </div>
    </div>
    <!-- DECO -->
    <img src="/images/deco/success-mob.svg" aria-hidden class="md:hidden w-full object-cover">
    <img src="/images/deco/success-line.svg" aria-hidden class="hidden md:block object-cover">
  </section>
</template>

<style scoped>
:deep(.el-form-item__label) {
  color: #4B4B4B;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
