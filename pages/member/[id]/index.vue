<script setup lang="ts">
const api = useApi();
const { selectedCity, selectedCounty, getAreaList, getZipCode, resetCity, getCityCountyFromZip } = useAddress();
const { $swal } = useNuxtApp() as any;
const { $dayjs } = useNuxtApp();
import { useUserInfoStore } from '@/stores/userInfo';
const userStore = useUserInfoStore();
import type { FormRules } from 'element-plus';
import type { UserQuery } from '@/api/Users/types';
import CityCountyData from 'assets/json/cityCountyData.json';

defineOptions({
  name: 'MemberIndex'
});
definePageMeta({
  headerBgColor: 'bg-gray-120',
});

/* ── 取得最新會員資料 ── */
const getUserData = async () => {
  const { result = null } = await api.Users.GetInfo();
  if (result && result.address) {
    if (!result.address.city || !result.address.county) {
      const zipStr = String(result.address.zipcode);
      const cityCounty = getCityCountyFromZip(zipStr);
      if (cityCounty) {
        result.address.city = cityCounty.city;
        result.address.county = cityCounty.county;
      }
    }
    userStore.user = { ...result, id: result._id };
  }
};

onMounted(() => {
  getUserData();
});

/* ── 更新會員資料 ── */
const updateUserData = async (data: UserQuery) => {
  const param: UserQuery = { ...data };
  const { result: updatedUser } = await api.Users.UpdateInfo(param);
  userStore.user = { ...updatedUser, id: updatedUser._id };

  await $swal.fire({
    icon: 'success',
    iconColor: '#52DD7E',
    title: '修改成功！',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
};

// #region 修改密碼相關
/* ── 修改密碼區域 ── */
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
/** 生日日期 disabled */
const disabledDate = (time: any) => !$dayjs(time).isBefore($dayjs().startOf('day'));

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
/** 提交修改密碼 */
const formRef = ref();
const submitPassword = async () => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    await updateUserData({
      userId: userStore.user?.id || '',
      oldPassword: form.value.oldPassword,
      newPassword: form.value.newPassword,
    });

    isEditPassword.value = false;
    nextTick(() => {
      navigateTo({ path: `/member/${userStore?.user?.id}`, query: { tab: 'personalData' } });
    });
  } else {
    await $swal.fire({
      icon: 'error',
      iconColor: '#DA3E51',
      title: '修改失敗！',
      text: '請聯絡客服人員',
      showConfirmButton: true
    });
  };
};
// #endregion 修改密碼相關

// #region 基本資料相關
/* ── 基本資料區域 ── */
const user = computed(() => userStore.user)!;

const isEditUserInfo = ref(false);
const editUserInfo = reactive({
  name: '',
  phone: '',
  birthday: '',
  city: selectedCity,
  county: selectedCounty,
  addr: '',
  address: ''
});

// 啟動編輯模式時，同步 store 最新資料到編輯資料
const startEditUserInfo = () => {
  if (userStore.user) {
    editUserInfo.name = userStore.user.name;
    editUserInfo.phone = userStore.user.phone;
    editUserInfo.birthday = userStore.user.birthday;
    editUserInfo.city = userStore.user.address?.city || selectedCity.value;
    editUserInfo.county = userStore.user.address?.county || selectedCounty.value;
    editUserInfo.addr = userStore.user.address?.detail || '';
    editUserInfo.address = `${editUserInfo.city} ${editUserInfo.county} ${editUserInfo.addr}`.trim();
  }
  isEditUserInfo.value = true;
};

/** 儲存基本資料 */
const userInfoFormRef = ref();
const saveUserInfo = async () => {
  const isValid = await userInfoFormRef.value?.validate();
  if (isValid) {
    const zipcode = +getZipCode(editUserInfo.city, editUserInfo.county);
    await updateUserData({
      userId: userStore.user?.id || '',
      name: editUserInfo.name,
      phone: editUserInfo.phone,
      birthday: editUserInfo.birthday,
      address: {
        zipcode,
        detail: editUserInfo.addr,
      },
    });
    if (userStore.user?.address) {
      userStore.user.address.city = editUserInfo.city;
      userStore.user.address.county = editUserInfo.county;
    };
    nextTick(() => {
      isEditUserInfo.value = false;
    });
  } else {
    await $swal.fire({
      icon: 'error',
      iconColor: '#DA3E51',
      title: '修改失敗！',
      text: '請聯絡客服人員',
      showConfirmButton: true
    });
  };
};

/** 使用者資料驗證 */
const userInfoRules = reactive<FormRules>({
  name: [{ required: true, message: '請輸入姓名', trigger: ['blur', 'change'] },],
  phone: [{ required: true, message: '請輸入手機號碼', trigger: ['blur', 'change'] },],
  birthday: [{ required: true, message: '請輸入生日', trigger: ['blur', 'change'] },],
  address: [{ required: true, message: '請輸入地址', trigger: ['blur', 'change'] },],
});

/** 地址驗證欄位處理 */
watch(() => [editUserInfo.city, editUserInfo.county, editUserInfo.addr],
  ([newCity, newCounty, newAddr]) => {
    editUserInfo.address = `${newCity} ${newCounty} ${newAddr}`.trim();
  }
);
// 重置表單驗證狀態及欄位數值
const cancelEditUserInfo = () => {
  userInfoFormRef.value?.resetFields();
  isEditUserInfo.value = false;
};
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
        <p class="text-3.4 font-bold">{{ user?.email }}</p>
      </div>
      <!-- 密碼 -->
      <div v-if="!isEditPassword" class="flex items-center justify-between gap-2">
        <div class="flex flex-col gap-2">
          <p class="text-3.5 text-gray-80">密碼</p>
          <p class="text-base font-bold password-hidden">{{ '●'.repeat(8) }}</p>
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
        <DefaultBtn @click="submitPassword" text="儲存設定"
          :disabled="!form.oldPassword || !form.newPassword || !form.confirmPassword" class="font-bold" />
        <DefaultBtn @click="isEditPassword = false" text="取消" btnStyle="secondary" class="w-full font-bold" />
      </div>
    </div>
    <!-- 基本資料 -->
    <div class="p-6 w-full flex flex-col gap-6 bg-white rounded-5">
      <h3 class="text-5 font-bold">基本資料</h3>
      <el-form ref="userInfoFormRef" :model="editUserInfo" :rules="userInfoRules" label-position="top"
        class="flex flex-col gap-4">
        <!-- 姓名 -->
        <el-form-item label="姓名" prop="name">
          <template v-if="isEditUserInfo">
            <el-input v-model="editUserInfo.name" placeholder="請輸入姓名" />
          </template>
          <template v-else>
            <p class="text-3.4 font-bold">{{ user?.name }}</p>
          </template>
        </el-form-item>

        <!-- 手機號碼 -->
        <el-form-item label="手機號碼" prop="phone">
          <template v-if="isEditUserInfo">
            <el-input v-model="editUserInfo.phone" placeholder="請輸入手機號碼" />
          </template>
          <template v-else>
            <p class="text-3.4 font-bold">{{ user?.phone }}</p>
          </template>
        </el-form-item>

        <!-- 生日 -->
        <el-form-item label="生日" prop="birthday">
          <template v-if="isEditUserInfo">
            <el-date-picker v-model="editUserInfo.birthday" :disabled-date="disabledDate" type="date"
              placeholder="請輸入生日" size="large" class="!w-full !h-52px" />
          </template>
          <template v-else>
            <p class="text-3.4 font-bold">{{ $dayjs(user?.birthday).format('YYYY 年 MM 月 DD 日') }}</p>
          </template>
        </el-form-item>

        <!-- 地址 -->
        <el-form-item label="地址" prop="address" class="pb-6">
          <template v-if="isEditUserInfo">
            <div class="w-full flex items-center gap-2">
              <el-select @change="(city) => { resetCity(city); editUserInfo.city = city; editUserInfo.county = ''; }"
                v-model="editUserInfo.city" placeholder="請選擇縣市" class="!h-52px" size="large">
                <el-option v-for="city in CityCountyData" :key="city.CityName" :label="city.CityName"
                  :value="city.CityName" />
              </el-select>
              <el-select v-model="editUserInfo.county" :disabled="!getAreaList.length" placeholder="請選擇區域"
                class="!h-52px" size="large">
                <el-option v-for="area in getAreaList" :key="area.ZipCode" :label="area.AreaName"
                  :value="area.AreaName" />
              </el-select>
            </div>
            <el-input v-model="editUserInfo.addr" placeholder="請輸入詳細地址" class="mt-4" />
          </template>
          <template v-else>
            <p class="text-3.4 font-bold">
              {{ user?.address?.city || '' }} {{ user?.address?.county || '' }} {{ user?.address?.detail || '' }}
            </p>
          </template>
        </el-form-item>
      </el-form>
      <DefaultBtn v-if="!isEditUserInfo" @click="startEditUserInfo" text="編輯" btnStyle="secondary" class="font-bold" />
      <DefaultBtn v-if="!!isEditUserInfo" @click="saveUserInfo" text="儲存設定"
        :disabled="!editUserInfo.name || !editUserInfo.phone || !editUserInfo.birthday || !editUserInfo.addr"
        class="font-bold" />
      <DefaultBtn v-if="!!isEditUserInfo" @click="cancelEditUserInfo" text="取消" btnStyle="secondary"
        class="w-full font-bold" />
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