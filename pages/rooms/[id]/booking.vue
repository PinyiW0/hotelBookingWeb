<script setup lang="ts">
import type { FormRules } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
import CityCountyData from 'assets/json/cityCountyData.json';
const { $dayjs } = useNuxtApp();
defineOptions({
  name: 'RoomsIdBooking'
});
/** 調整 header 背景色 */
definePageMeta({
  headerBgColor: 'bg-gray-120',
});
// TODO:之後要做動態 SEO
useSeoMeta({
  title: '預約房型',
  description: '預約房型',
});

const id = route.params.id;
/** 返回上一頁 */
const goBack = () => {
  router.back();
};
/** 編輯入住與退房日期 */
const isEditing = ref(false);
const bookingDateRange = ref<any>(null);
if (route.query.checkInDate && route.query.checkOutDate) {
  bookingDateRange.value = [
    new Date(route.query.checkInDate as string),
    new Date(route.query.checkOutDate as string)
  ];
};
/** 時間格式轉換 */
const formattedDates = computed(() => {
  return {
    checkIn: bookingDateRange.value && bookingDateRange.value[0]
      ? $dayjs(bookingDateRange.value[0]).format('MM 月 DD 日 dddd')
      : '未選擇',
    checkOut: bookingDateRange.value && bookingDateRange.value[1]
      ? $dayjs(bookingDateRange.value[1]).format('MM 月 DD 日 dddd')
      : '未選擇'
  };
});
const disabledStartDate = (time: any) => {
  return time.getTime() < $dayjs().subtract(1, 'day');
};

/** form */
interface LoginInForm {
  name: string;
  phone: string;
  email: string;
  city: string;
  cities?: string;
  county: string;
  addr: string;
};
const form = ref<LoginInForm>({
  name: '',
  phone: '',
  email: '',
  city: '',
  county: '',
  addr: '',
});
/** 房間資訊 */
const roomInfoList: any[] = [
  { iconName: 'i-fluent:slide-size-24-filled', txt: '24 坪' },
  { iconName: 'i-material-symbols:bed-rounded', txt: '1 張大床' },
  { iconName: 'i-material-symbols:person', txt: '2-4 人' },
];
/** 房間格局 */
const roomLayout: any[] = [
  { title: '市景', isProvide: true },
  { title: '獨立衛浴', isProvide: true },
  { title: '客廳', isProvide: true },
  { title: '書房', isProvide: true },
  { title: '樓層電梯', isProvide: true },
];
/**房內設備 */
const facilityInfo: any[] = [
  { title: '平面電視', isProvide: true },
  { title: '吹風機', isProvide: true },
  { title: '冰箱', isProvide: true },
  { title: '熱水壺', isProvide: true },
  { title: '檯燈', isProvide: true },
  { title: '衣櫃', isProvide: true },
  { title: '除濕機', isProvide: true },
  { title: '浴缸', isProvide: true },
  { title: '書桌', isProvide: true },
  { title: '音響', isProvide: true },
];
/** 驗證 */
const rules = reactive<FormRules>({
  name: [{ required: true, message: '姓名為必填', trigger: ['blur', 'change'] }],
  phone: [{ required: true, message: '手機號碼為必填', trigger: ['blur', 'change'] }],
  email: [
    { required: true, message: ' 電子信箱為必填', trigger: ['blur', 'change'] },
    { type: 'email', message: ' 電子信箱格式錯誤', trigger: ['blur', 'change'] },
  ],
});
/** 篩選相對應區域 */
const filteredAreas = computed(() => {
  const selectedCity = CityCountyData.find(city => city.CityName === form.value.city);
  return selectedCity ? selectedCity.AreaList : [];
});
// 清除區域選擇
const updateAreas = () => {
  form.value.county = '';
};

// 預定房間
const isLoading = ref(false);
const handleBooking = async () => {
  isLoading.value = true;
  // 模擬延遲，例如 2 秒
  await new Promise(resolve => setTimeout(resolve, 2000));
  await router.push(`/rooms/${route.params.id}/success`).finally(() => isLoading.value = false);
}
</script>

<template>
  <section class="w-full bg-primary-10">
    <div class="px-3 max-w-1296px flex flex-col gap-10">
      <button @click="goBack" class="mt-10 p-0 flex items-center border-0 bg-transparent cursor-pointer">
        <div class="i-material-symbols:arrow-back-ios w-6 h-6" />
        <h2 class="text-6 lg:text-8 font-bold">確認訂房資訊</h2>
      </button>

      <div class="w-full flex flex-col gap-10 lg:(flex-row justify-between gap-18)">
        <div class="flex flex-col">
          <!-- 訂房資訊 -->
          <div class="pb-10 flex flex-col gap-8 border-b-(px solid gray-60)">
            <h3 class="text-5 lg:text-7 font-bold">訂房資訊</h3>
            <div class="flex flex-col gap-8">
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-2">
                  <severTitle title="選擇房型" />
                  <p class="tetx-4 tracking-wider">尊爵雙人房</p>
                </div>
                <button
                  class="p-0 text-4 font-bold border-0 border-b-(px solid #000) bg-transparent cursor-pointer duration-300 hover:opacity-60">編輯</button>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-2">
                  <severTitle title="訂房日期" />
                  <div v-if="isEditing">
                    <el-date-picker v-model="bookingDateRange" :disabled-date="disabledStartDate"
                      start-placeholder="請選擇入住日期" end-placeholder="退房日期" type="daterange" size="large" />
                  </div>
                  <div v-else class="flex flex-col gap-2">
                    <p class="tetx-4 tracking-wider">入住：{{ formattedDates.checkIn }}</p>
                    <p class="tetx-4 tracking-wider">退房：{{ formattedDates.checkOut }}</p>
                  </div>
                </div>
                <button @click="isEditing = !isEditing"
                  class="p-0 text-4 font-bold border-0 border-b-(px solid #000) bg-transparent cursor-pointer duration-300 hover:opacity-60">{{
                    isEditing ? '儲存' : '編輯' }}</button>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-2">
                  <severTitle title="房客人數" />
                  <p class="tetx-4 tracking-wider">2人</p>
                </div>
                <button
                  class="p-0 text-4 font-bold border-0 border-b-(px solid #000) bg-transparent cursor-pointer duration-300 hover:opacity-60">編輯</button>
              </div>
            </div>
          </div>
          <!-- 訂房人資訊 -->
          <div class="py-10 flex flex-col gap-8 border-b-(px solid gray-60)">
            <div class="flex items-center justify-between">
              <h3 class="text-5 lg:text-7 font-bold">訂房人資訊</h3>
              <DefaultBtn text="套用會員資料" btnStyle="onlyText" class="font-bold" />
            </div>
            <!-- form -->
            <el-form :model="form" :rules="rules" class="flex flex-col gap-4">
              <el-form-item label="姓名" label-position="top" prop="name">
                <el-input v-model="form.name" placeholder="請輸入姓名" />
              </el-form-item>
              <el-form-item label="手機號碼" label-position="top" prop="phone">
                <el-input v-model="form.phone" placeholder="請輸入手機號碼" />
              </el-form-item>
              <el-form-item label="電子信箱" label-position="top" prop="email">
                <el-input v-model="form.email" placeholder="請輸入電子信箱" />
              </el-form-item>
              <el-form-item label="地址" label-position="top" prop="birthday">
                <div class="w-full flex items-center gap-2">
                  <el-select @change="updateAreas" v-model="form.city" placeholder="請選擇縣市" class="!h-52px" size="large">
                    <el-option v-for="city in CityCountyData" :key="city.CityName" :label="city.CityName"
                      :value="city.CityName" />
                  </el-select>
                  <el-select v-model="form.county" :disabled="!filteredAreas.length" placeholder="請選擇區域" class="!h-52px"
                    size="large">
                    <el-option v-for="area in filteredAreas" :key="area.ZipCode" :label="area.AreaName"
                      :value="area.AreaName" />
                  </el-select>
                </div>
                <el-input v-model="form.addr" placeholder="請輸入詳細地址" class="mt-4" />
              </el-form-item>
            </el-form>
          </div>
          <!-- 房間資訊 -->
          <div class="mt-10 pb-30 flex flex-col gap-8">
            <h3 class="text-5 lg:text-7 font-bold">房間資訊</h3>
            <!-- 房型基本資訊 -->
            <div class="flex flex-col gap-4 xl:gap-6">
              <severTitle title="房型基本資訊" />
              <div class="flex gap-4">
                <RoomInfoCard v-for="(item, idx) in roomInfoList" :key="idx" :icon-name="item.iconName"
                  :txt="item.txt" />
              </div>
            </div>
            <!-- 房間其他資訊 -->
            <div class="flex flex-col gap-4 xl:gap-6">
              <severTitle title="房內格局" />
              <div class="p-6 w-full grid grid-cols-2 sm:grid-cols-5 gap-x-10 gap-y-2 bg-white rounded-5">
                <RoomTagCard v-for="i in roomLayout" :title="i.title" />
              </div>
            </div>
            <div class="flex flex-col gap-4 xl:gap-6">
              <severTitle title="房內設備" />
              <div class="p-6 w-full grid grid-cols-2 sm:grid-cols-5 gap-x-10 gap-y-2 bg-white rounded-5">
                <RoomTagCard v-for="i in facilityInfo" :title="i.title" />
              </div>
            </div>
          </div>
        </div>
        <!-- 價格詳情卡 -->
        <div class="h-fit p-6 lg:p-10 flex flex-col gap-10 bg-white rounded-5">
          <div class="w-full min-h-180px  md:min-h-280px lg:(w-398px h-272px) overflow-hidden rounded-2">
            <img src="/images/Image/Room.png" alt="" class="w-full h-full object-cover">
          </div>
          <div class="flex flex-col gap-6">
            <h3 class="text-6 font-bold tracking-wider">價格詳情</h3>
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <p class="text-4">NT$ 10,000</p>
                  <div class="i-material-symbols:close-small-outline-rounded w-6 h-6" />
                  <p class="text-4">2 晚</p>
                </div>
                <p>NT$ 20,000</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-4">住宿折扣</p>
                <p class="text-4 text-primary">-NT$ 1,000</p>
              </div>
            </div>

            <div class="pt-6 flex items-center justify-between border-t-(px solid #ECECEC)">
              <p class="text-4 font-bold">總價</p>
              <p class="text-4 font-bold">NT$ 19,000</p>
            </div>
          </div>
          <DefaultBtn @click="handleBooking" :disabled="isLoading" text="確認訂房" btnStyle="primary" class="font-bold" />
        </div>
      </div>
    </div>
    <!-- loading -->
    <SuccessLoading :isShow="isLoading" />
  </section>
</template>

<style scoped>
:deep(.el-select__wrapper) {
  padding: 20px;
}
</style>