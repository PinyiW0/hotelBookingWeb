<script setup lang="ts">
const { $dayjs } = useNuxtApp();
const router = useRouter();
import type { FormRules } from 'element-plus';

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
/** 驗證 */
const rules = reactive<FormRules>({
  email: [
    { required: true, message: '電子信箱為必填', trigger: ['blur', 'change'] },
    { type: 'email', message: '電子信箱格式錯誤', trigger: ['blur', 'change'] },
  ],
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
/** 監聽tab切換 */
// watch(() => route.query.tab, (newTab) => {
//   if (newTab && tabList.value.some((tab) => tab.value === newTab)) {
//     defaultTab.value = newTab as string;
//     getList(newTab as string);
//   } else {
//     defaultTab.value = '學生';
//     getList('學生')
//   };
// });
/** 修改密碼 */
const submit = () => {
  alert('密碼修改成功！');
  router.push('/member');
};
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
        <div class="p-6 w-full flex flex-col gap-6 bg-white rounded-5">
          <h3 class="text-5 font-bold">修改密碼</h3>
          <!-- 電子信箱 -->
          <div class="flex flex-col gap-2">
            <p class="text-3.5 text-gray-80">電子信箱</p>
            <p class="text-3.4 font-bold">Jessica@exsample.com</p>
          </div>
          <!-- 密碼 -->
          <div class="flex items-center justify-between gap-2">
            <div class="flex flex-col gap-2">
              <p class="text-3.5 text-gray-80">密碼</p>
              <p class="text-3.4 font-bold">XXX</p>
            </div>
            <DefaultBtn @click="submit" text="重設" btnStyle="onlyText" class="font-bold" />
          </div>
          <el-form ref="formRef" :model="form" :rules="rules" class="flex flex-col gap-4">
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
          <DefaultBtn @click="submit" to="/register" text="儲存設定" class="font-bold" />
        </div>
        <!-- 基本資料 -->
        <div class="p-6 w-full flex flex-col gap-6 bg-white rounded-5">
          <h3 class="text-5 font-bold">基本資料</h3>
          <!-- 姓名 -->
          <div class="flex flex-col gap-2">
            <p class="text-3.5 text-gray-80">姓名</p>
            <p class="text-3.4 font-bold">Jessica Ｗang</p>
            <el-input v-if="false" v-model="form.oldPassword" type="password" placeholder="請輸入密碼" show-password />
          </div>
          <!-- 手機號碼 -->
          <div class="flex flex-col gap-2">
            <p class="text-3.5 text-gray-80">手機號碼</p>
            <p class="text-3.4 font-bold">+886 912 345 678</p>
            <el-input v-if="false" v-model="form.oldPassword" type="password" placeholder="請輸入密碼" show-password />
          </div>
          <!-- 生日 -->
          <div class="flex flex-col gap-2">
            <p class="text-3.5 text-gray-80">生日</p>
            <p class="text-3.4 font-bold">1990 年 8 月 15 日</p>
            <el-input v-if="false" v-model="form.oldPassword" type="password" placeholder="請輸入密碼" show-password />
          </div>
          <!-- 地址 -->
          <div class="flex flex-col gap-2">
            <p class="text-3.5 text-gray-80">地址</p>
            <p class="text-3.4 font-bold">高雄市新興區六角路 123 號</p>
            <el-input v-if="false" v-model="form.oldPassword" type="password" placeholder="請輸入密碼" show-password />
          </div>
          <DefaultBtn @click="submit" text="編輯" btnStyle="secondary" class="font-bold" />
          <DefaultBtn @click="submit" to="/member" text="儲存設定" class="font-bold" />
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
  color: black;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
