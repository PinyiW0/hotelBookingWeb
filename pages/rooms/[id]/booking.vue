<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import CityCountyData from 'assets/json/cityCountyData.json';
import { useUserInfoStore } from '@/stores/userInfo';

const api = useApi();
const { $swal, $dayjs } = useNuxtApp() as any;
const route = useRoute();
const router = useRouter();
const userStore = useUserInfoStore();
const { selectedCity, selectedCounty, getAreaList, resetCity, getZipCode } = useAddress();

import type { RoomsInfo, LoginInForm } from '@/api/Rooms/types';
import type { FormRules } from 'element-plus';

defineOptions({
  name: 'RoomsIdBooking'
});

definePageMeta({
  requiresAuth: true,
  headerBgColor: 'bg-gray-120',
});

/** 取得房型詳細資料來處理 SEO */
const roomInfo = ref<RoomsInfo | null>(null);
const getRoomInfo = async () => {
  isLoading.value = true;
  const { result = null } = await api.Rooms.Get(id);
  roomInfo.value = result;
  isLoading.value = false;
};

useSeoMeta({
  title: () => roomInfo.value?.name ? `${roomInfo.value.name} - 酒店預約房型頁` : '酒店預約房型頁',
  description: () => `立即預約 ${roomInfo.value?.name}, ${roomInfo.value?.description}` || '享受高級的住宿體驗，提供給您舒適寬敞的空間和精緻的裝潢。',
});

/** State */
const id = route.params.id as string;
const isEditing = ref(false);
const isLoading = ref(false);
const isEditingPeople = ref(false);
const bookingDateRange = ref<any>([]);
const people = ref<number>(route.query.people ? Number(route.query.people) : 1);
const discount = ref(0);

const form = ref<LoginInForm>({
  name: '',
  phone: '',
  email: '',
  city: selectedCity.value,
  county: selectedCounty.value,
  addr: '',
});

/** 驗證 */
const rules = reactive<FormRules>({
  name: [{ required: true, message: '姓名為必填', trigger: ['blur', 'change'] }],
  phone: [{ required: true, message: '手機號碼為必填', trigger: ['blur', 'change'] }],
  email: [
    { required: true, message: ' 電子信箱為必填', trigger: ['blur', 'change'] },
    { type: 'email', message: ' 電子信箱格式錯誤', trigger: ['blur', 'change'] },
  ],
});

// #region === 計算訂房資訊(日期、人數、價格) ===
/** 住宿日期 */
if (route.query.checkIn && route.query.checkOut) {
  bookingDateRange.value = [
    new Date(route.query.checkIn as string),
    new Date(route.query.checkOut as string)
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
const disabledStartDate = () => {
  return $dayjs() < $dayjs().subtract(1, 'day');
};

/** 編輯人數 */
const handlePeople = (change: number) => {
  const maxPeople = roomInfo.value?.maxPeople || 3;
  const newVal = people.value + change;
  if (newVal >= 1 && newVal <= maxPeople) {
    people.value = newVal;
  };
};

/** 計算入住晚數 */
const stayDays = computed(() => {
  if (!bookingDateRange.value || bookingDateRange.value.length < 2) return 0;
  return $dayjs(bookingDateRange.value[1]).diff($dayjs(bookingDateRange.value[0]), 'day');
});
/** 計算房間價錢 (單價 * 入住晚數) */
const totalRoomPrice = computed(() => {
  return (roomInfo.value?.price ?? 0) * stayDays.value;
});
/** 計算總價 (單價 * 入住晚數 - 折扣) */
const totalPrice = computed(() => {
  const pricePerNight = roomInfo.value?.price || 0;
  return pricePerNight * stayDays.value - discount.value;
});
// #endregion === 計算訂房資訊(日期、人數、價格) ===

// #region === 房間資訊 ===
/** 房間資訊 */
const roomInfoList = computed(() => [
  { iconName: 'i-fluent:slide-size-24-filled', txt: roomInfo.value?.areaInfo ?? '尚未提供' },
  { iconName: 'i-material-symbols:bed-rounded', txt: roomInfo.value?.bedInfo ?? '尚未提供' },
  { iconName: 'i-material-symbols:person', txt: `最多 ${roomInfo.value?.maxPeople ?? 0} 人` }
]);
/** 取得房間其他資訊 */
const getProvidedInfo = <K extends keyof RoomsInfo>(prop: K) =>
  computed(() => ((roomInfo.value?.[prop] as any[]) || []).filter(item => item.isProvide));
/** 房間格局 */
const layoutInfo = getProvidedInfo('layoutInfo');
/** 房內設備 */
const facilityInfo = getProvidedInfo('facilityInfo');
/** 備品提供 */
const amenityInfo = getProvidedInfo('amenityInfo');
const infoSections = computed(() => [
  { title: '房內格局', items: layoutInfo.value },
  { title: '房內設備', items: facilityInfo.value },
  { title: '備品提供', items: amenityInfo.value }
]);
// #endregion === 房間資訊 ===

// #region === Method ===
/** 訂房 */
const handleBooking = async () => {
  isLoading.value = true;
  const orderParam = {
    roomId: id,
    checkInDate: $dayjs(bookingDateRange.value[0]).format('YYYY/MM/DD'),
    checkOutDate: $dayjs(bookingDateRange.value[1]).format('YYYY/MM/DD'),
    peopleNum: people.value,
    userInfo: {
      address: {
        zipcode: Number(getZipCode(form.value.city, form.value.county)),
        detail: form.value.addr,
      },
      name: form.value.name,
      phone: form.value.phone,
      email: form.value.email,
    }
  };
  const { result = null } = await api.Orders.AddOrder(orderParam);
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log(result);

  if (result?._id) {
    await navigateTo({
      path: `/rooms/${route.params.id}/success`,
      query: { orderId: result._id }
    });
  } else {
    $swal.fire({
      icon: 'error',
      iconColor: '#DA3E51',
      title: '訂單建立失敗！',
      text: '請稍後再試，或是聯絡客服',
      showConfirmButton: true
    });
  }
  isLoading.value = false;;
};

/** 套用會員資料 */
const applyMemberInfo = async () => {
  const userData = userStore.getUserInfo();
  if (userData) {
    form.value.name = userData.name;
    form.value.phone = userData.phone;
    form.value.email = userData.email;
    form.value.city = userData.address.city;
    form.value.county = userData.address.county;
    form.value.addr = userData.address.detail;
  }
};

/** 返回上一頁 */
const goBack = () => router.back();
// #endregion === Method ===

onMounted(() => {
  getRoomInfo();
  discount.value = Math.floor(Math.random() * 6) * 100 + 500;
  userStore.getUserInfo();
});
</script>

<template>
  <section class="w-full bg-primary-10">
    <div class="px-3 max-w-1296px mx-auto flex flex-col gap-10">
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
                  <p class="tetx-4 tracking-wider">{{ roomInfo?.name }}</p>
                </div>
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
                  <div v-if="isEditingPeople">
                    <div class="mt-7 flex items-center justify-between gap-5">
                      <p class="py-4 text-4 font-bold">人數</p>
                      <div class="flex items-center">
                        <button @click="handlePeople(-1)" :disabled="people <= 1"
                          class="p-0 rounded-full border-(px solid gray-40) bg-white group">
                          <div class="p-4 rounded-full cursor-pointer duration-300 group-hover:bg-gray-60">
                            <div class="i-mdi:minus w-6 h-6 duration-300 group-hover:(text-white)" />
                          </div>
                        </button>
                        <div class="w-16">
                          <p class="text-5 text-center font-bold">{{ people }}</p>
                        </div>
                        <button @click="handlePeople(1)" :disabled="people >= (roomInfo?.maxPeople || 4)"
                          class="p-0 rounded-full border-(px solid gray-40) bg-white group">
                          <div class="p-4 rounded-full cursor-pointer duration-300 group-hover:bg-primary">
                            <div class="i-mdi:plus w-6 h-6 duration-300 group-hover:(text-white)" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <p class="tetx-4 tracking-wider">{{ people }}人</p>
                  </div>
                </div>
                <button @click="isEditingPeople = !isEditingPeople"
                  class="p-0 text-4 font-bold border-0 border-b-(px solid #000) bg-transparent cursor-pointer duration-300 hover:opacity-60">
                  {{ isEditingPeople ? '儲存' : '編輯' }}
                </button>
              </div>
            </div>
          </div>
          <!-- 訂房人資訊 -->
          <div class="py-10 flex flex-col gap-8 border-b-(px solid gray-60)">
            <div class="flex items-center justify-between">
              <h3 class="text-5 lg:text-7 font-bold">訂房人資訊</h3>
              <DefaultBtn @click="applyMemberInfo" text="套用會員資料" btnStyle="onlyText" class="font-bold" />
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
                  <el-select @change="resetCity" v-model="form.city" placeholder="請選擇縣市" class="!h-52px" size="large">
                    <el-option v-for="city in CityCountyData" :key="city.CityName" :label="city.CityName"
                      :value="city.CityName" />
                  </el-select>
                  <el-select v-model="form.county" :disabled="!getAreaList.length" placeholder="請選擇區域" class="!h-52px"
                    size="large">
                    <el-option v-for="area in getAreaList" :key="area.ZipCode" :label="area.AreaName"
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
            <div v-for="section in infoSections" :key="section.title" class="flex flex-col gap-4 xl:gap-6">
              <severTitle :title="section.title" />
              <div class="p-6 w-full grid grid-cols-2 sm:grid-cols-5 gap-x-10 gap-y-2 bg-white rounded-5">
                <RoomTagCard v-for="i in section.items" :title="i.title" />
              </div>
            </div>
          </div>
        </div>
        <!-- 價格詳情卡 -->
        <div class="h-fit p-6 lg:p-10 flex flex-col gap-10 bg-white rounded-5">
          <div class="w-full min-h-180px  md:min-h-280px lg:(w-398px h-272px) overflow-hidden rounded-2">
            <img :src="roomInfo?.imageUrl" :alt="roomInfo?.name" class="w-full h-full object-cover">
          </div>
          <div class="flex flex-col gap-6">
            <h3 class="text-6 font-bold tracking-wider">價格詳情</h3>
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <p class="text-4">NT$ {{ roomInfo?.price ? roomInfo.price.toLocaleString() : '0' }}</p>
                  <div class="i-material-symbols:close-small-outline-rounded w-6 h-6" />
                  <p class="text-4">{{ stayDays }} 晚</p>
                </div>
                <p>NT$ {{ totalRoomPrice.toLocaleString() }}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-4">住宿折扣</p>
                <p class="text-4 text-primary">-NT$ {{ discount.toLocaleString() }}</p>
              </div>
            </div>

            <div class="pt-6 flex items-center justify-between border-t-(px solid #ECECEC)">
              <p class="text-4 font-bold">總價</p>
              <p class="text-4 font-bold">NT$ {{ totalPrice.toLocaleString() }}</p>
            </div>
          </div>
          <DefaultBtn @click="handleBooking" :disabled="isLoading || !bookingDateRange || bookingDateRange.length < 2"
            text="確認訂房" btnStyle="primary" class="font-bold" />
        </div>
      </div>
    </div>
    <!-- loading -->
    <SuccessLoading :isShow="isLoading">
      <p class="text-6 font-bold tracking-wider">正在處理你的預訂</p>
    </SuccessLoading>
  </section>
</template>

<style scoped>
:deep(.el-select__wrapper) {
  padding: 20px;
}
</style>