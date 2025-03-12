<script setup lang="ts">
const api = useApi();
const { selectedCity, selectedCounty, getAreaList, resetCity } = useAddress();
const { $swal } = useNuxtApp() as any;
const { $dayjs } = useNuxtApp();
import type { FormRules } from 'element-plus';
import CityCountyData from 'assets/json/cityCountyData.json';

defineOptions({
  name: 'MemberIndex'
});
definePageMeta({
  headerBgColor: 'bg-gray-120',
});

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
  navigateTo('/member');
};
// #endregion 修改密碼相關

// #region 基本資料相關
/** 取得基本資料 */
const isEditUserInfo = ref(false);
const userInfo = reactive({
  name: 'Jessica Wang',
  phone: '+886 912 345 678',
  birthday: '1990 年 8 月 15 日',
  city: selectedCity,
  county: selectedCounty,
  addr: '六角路123號',
  // 此為用來做驗證的欄位
  address: ''
});

/** 儲存基本資料 */
const saveUserInfo = () => {
  isEditUserInfo.value = false;
  alert('資料修改成功！');
};

/** 使用者資料驗證 */
const userInfoRules = reactive<FormRules>({
  name: [{ required: true, message: '請輸入姓名', trigger: ['blur', 'change'] },],
  phone: [{ required: true, message: '請輸入手機號碼', trigger: ['blur', 'change'] },],
  birthday: [{ required: true, message: '請輸入生日', trigger: ['blur', 'change'] },],
  address: [{ required: true, message: '請輸入地址', trigger: ['blur', 'change'] },],
})

/** 地址驗證欄位處理 */
watch(() => [userInfo.city, userInfo.county, userInfo.addr],
  ([newCity, newCounty, newAddr]) => {
    userInfo.address = `${newCity} ${newCounty} ${newAddr}`.trim();
  }
);
// #endregion 基本資料相關
</script>

<template>
  <!-- 個人資料 -->
  <div class="flex flex-col gap-6 xl:(flex-row gap-10)">
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
          <p class="text-3.4 font-bold password-hidden">密碼內容</p>
          <!-- <p class="text-3.4 font-bold">XXX</p> -->
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
          <el-form-item label="確認新密碼" label-position="top" prop="confirmPassword" class="pb-6">
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
        <el-form-item label="地址" prop="address" class="pb-6">
          <template v-if="isEditUserInfo">
            <div class="w-full flex items-center gap-2">
              <el-select @change="resetCity" v-model="userInfo.city" placeholder="請選擇縣市" class="!h-52px" size="large">
                <el-option v-for="city in CityCountyData" :key="city.CityName" :label="city.CityName"
                  :value="city.CityName" />
              </el-select>
              <el-select v-model="userInfo.county" :disabled="!getAreaList.length" placeholder="請選擇區域" class="!h-52px"
                size="large">
                <el-option v-for="area in getAreaList" :key="area.ZipCode" :label="area.AreaName"
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
</template>

<style scoped>
:deep(.el-form-item__label) {
  color: #4B4B4B;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

/** 隱藏密碼 */
.password-hidden {
  -webkit-text-security: disc;
  user-select: none;
}
</style>