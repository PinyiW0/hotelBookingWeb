<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { RoomsInfo } from '@/api/Rooms/types';

const api = useApi();
const route = useRoute();
const { $dayjs } = useNuxtApp();

defineOptions({
  name: 'RoomsIndex'
});

// 房間基本資料
const roomInfo = ref<RoomsInfo | null>(null);
const isLoading = ref(false);

useSeoMeta({
  title: () => roomInfo.value?.name ? `${roomInfo.value.name} - 酒店房型詳細頁` : '酒店房型詳細頁',
  description: () => roomInfo.value?.description || '享受高級的住宿體驗，提供給您舒適寬敞的空間和精緻的裝潢。',
  ogTitle: () => roomInfo.value?.name,
  ogDescription: () => roomInfo.value?.description,
  ogImage: () => roomInfo.value?.imageUrl
});

definePageMeta({
  headerBgColor: 'bg-gray-120',
});

// #region === 房間資訊 ===
/** 房間資訊相關 */
const id = route.params.id as string;
const mainImg = ref<string>('');
const dialogVisible = ref<boolean>(false);
const currentIndex = ref(0);
const carouselRef = ref<any | null>(null);

/** 手機版預訂相關 */
const openCalender = ref<boolean>(false);
const openPeopleSelect = ref<boolean>(false);

// 右側多圖處理 - mob
const galleryDataForSwiper = computed(() =>
  roomInfo.value?.imageUrlList.map((src, index) => ({ src, alt: `房間圖片${index + 1}` })) ?? []
);
// 右側多圖處理 - web
const galleryDataForGrid = computed(() => {
  const list = roomInfo.value?.imageUrlList ?? [];
  return Array.from({ length: Math.ceil(list.length / 2) }, (_, i) =>
    list.slice(i * 2, i * 2 + 2).map((src, index) => ({ src, alt: `房間圖片${i * 2 + index + 1}` }))
  );
});

/** 取得房型基本資訊 */
const roomInfoList = computed(() => {
  return [
    { iconName: 'i-fluent:slide-size-24-filled', txt: roomInfo.value?.areaInfo ?? '尚未提供' },
    { iconName: 'i-material-symbols:bed-rounded', txt: roomInfo.value?.bedInfo ?? '尚未提供' },
    { iconName: 'i-material-symbols:person', txt: `最多 ${roomInfo.value?.maxPeople ?? 0} 人` },
  ];
});

/** 房內設備 */
const facilityInfo = computed(() => roomInfo.value?.facilityInfo.filter((item: any) => item.isProvide) ?? []);
/** 訂房須知列表 */
const knowList: any[] = [
  { txt: '入住時間為下午3點，退房時間為上午12點。' },
  { txt: '如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。' },
  { txt: '請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。' },
  { txt: '若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。' },
  { txt: '請愛惜我們的房間與公共空間，並保持整潔。' },
  { txt: '如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。' },
  { txt: '我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。' },
  { txt: '請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。' },
  { txt: '我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。' },
  { txt: '為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。' },
];
/** 預定人數和錯誤訊息 */
const people = ref<number>(1);
const showError = ref<boolean>(false);
const errorMessage = computed(() => {
  if (people.value >= 4) return '人數不得大於4';
  return '';
});
/** 日期選擇 */
const checkInDate = ref<string>('');
const checkOutDate = ref<string>('');

/** 訂房費用與入住天數計算 */
/** 計算訂房費用 */
const totalPrice = computed(() => {
  if (!checkInDate.value || !checkOutDate.value) return 0;
  const days = $dayjs(checkOutDate.value).diff($dayjs(checkInDate.value), 'day');
  const price = ((roomInfo.value?.price || 0) * days).toLocaleString();
  return price;
});

/** 計算入住天數 */
const stayDays = computed(() => {
  if (!checkInDate.value || !checkOutDate.value) return 0;
  return $dayjs(checkOutDate.value).diff($dayjs(checkInDate.value), 'day');
});
// #endregion === 房間資訊 ===

// #region === 方法 ===
/** 取得房型資訊 */
const getList = async () => {
  isLoading.value = true;
  const { result = null } = await api.Rooms.Get(id).finally(() => (isLoading.value = false));
  roomInfo.value = result;
  mainImg.value = result?.imageUrl || '';
};
/** Dialog - 輪播圖控制 */
const handleChange = (newIndex: number) => { currentIndex.value = newIndex };
const handlePrev = () => { carouselRef.value?.prev() };
const handleNext = () => { carouselRef.value?.next() };

/** 控制預訂人數 */
const handlePeople = (num: number) => {
  const newVal = people.value + num;
  showError.value = newVal > 4;
  if (!showError.value) people.value = newVal;
};

/** 日期選擇禁用規則 */
const disabledStartDate = (time: Date) => $dayjs(time) < $dayjs().subtract(1, "day");
const disabledEndDate = (time: Date) => $dayjs(time) < $dayjs(checkInDate.value).add(1, "day");
/** 確認選擇日期，進入人數選擇視窗 */
const handleConfirmDate = () => {
  if (!checkInDate.value || !checkOutDate.value) return;
  openCalender.value = false;
  openPeopleSelect.value = true;
};

/** 儲存並導向訂房頁 */
const handleBooking = () => {
  navigateTo({
    path: `/rooms/${route.params.id}/booking`,
    query: {
      checkIn: checkInDate.value,
      checkOut: checkOutDate.value,
      people: people.value
    }
  });
};
// #endregion === 方法 ===

/** 視窗打開時，禁止滾動 */
watch([openCalender, openPeopleSelect], ([calender, people]) => {
  document.body.style.overflow = (calender || people) ? "hidden" : "auto";
});

onMounted(() => {
  getList();
});
</script>

<template>
  <section class="relative w-full bg-primary-10">
    <SuccessLoading :isShow="isLoading">
      <p class="text-6 font-bold tracking-wider">努力加載畫面中</p>
    </SuccessLoading>
    <!-- 照片區 - Web -->
    <div class="hidden lg:block">
      <div class="px-4 max-w-1760px mx-auto pt-0 pb-10 lg:py-20 grid grid-cols-2 gap-2">
        <!-- 左側主圖 -->
        <div class="w-full max-h-150 rounded-l-5 overflow-hidden">
          <img :src="roomInfo?.imageUrl" alt="房間主圖" width="978px" class="w-full h-full object-cover">
        </div>
        <!-- 右側組圖 -->
        <div class="grid grid-cols-2 gap-2">
          <div v-for="(column, colIdx) in galleryDataForGrid" :key="colIdx" class="grid gap-2">
            <div v-for="(item, itemIdx) in column" :key="itemIdx"
              :class="{ 'rounded-tr-5': colIdx === 1 && itemIdx === 0, 'rounded-br-5': colIdx === 1 && itemIdx === 1 }"
              class="w-full h-74 overflow-hidden">
              <img :src="item.src" :alt="item.alt" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 照片區 - Mob -->
    <ClientOnly>
      <div class="lg:hidden relative w-full h-full overflow-x-hidden overflow-y-visible">
        <el-carousel v-show="!openCalender && !openPeopleSelect" :indicator-position="undefined"
          class="w-full !h-60 !sm:h-85 !md:h-115">
          <el-carousel-item v-for="(img, idx) in galleryDataForSwiper" :key="idx">
            <img :src="img.src" :alt="img.alt" class="w-full h-full object-cover">
          </el-carousel-item>
        </el-carousel>
        <DefaultBtn @click="dialogVisible = true" text="看更多" btnStyle="secondary"
          class="absolute right-0 bottom-0 z-5 m-5 font-bold" />
      </div>

      <!-- 房間資訊 Dialog -->
      <Transition name="fade">
        <div v-if="dialogVisible" @click="dialogVisible = false"
          class="fixed inset-0 bg-black/85 flex justify-center items-center z-50">
          <div @click.stop="dialogVisible = false"
            class="i-mdi:close-circle-outline fixed top-25 right-7 z-55 text-(1.5em #FFF) duration-300 hover:(cursor-pointer opacity-70)" />

          <div @click.stop class="px-5 w-full flex items-center justify-center">
            <el-carousel @change="handleChange" ref="carouselRef" :autoplay="false"
              class="w-full !h-60 !sm:h-85 !md:h-115">
              <el-carousel-item v-for="(img, idx) in galleryDataForSwiper" :key="idx">
                <img :src="img.src" :alt="img.alt" class="w-full h-full object-cover">
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- Dialog 控制 -->
          <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-5">
            <div @click.stop="handlePrev()"
              class="i-mdi:keyboard-arrow-left text-white w-6 h-6 duration-300 hover:(cursor-pointer opacity-70)"></div>
            <p class="text-4.5 text-white font-bold transform">
              {{ currentIndex + 1 }} / {{ galleryDataForSwiper.length }}
            </p>
            <div @click.stop="handleNext()"
              class="i-mdi:keyboard-arrow-right text-white w-6 h-6 duration-300 hover:(cursor-pointer opacity-70)">
            </div>
          </div>
        </div>
      </Transition>
    </ClientOnly>

    <!-- 詳細資訊 -->
    <div class="px-4 pb-8 pt-10 xl:(px-4 py-30) max-w-1296px mx-auto">
      <div class="w-full flex gap-0 lg:gap-18">
        <!-- 房間資訊 -->
        <div class="w-full xl:max-w-70% flex flex-col gap-6 xl:gap-20">
          <div class="flex flex-col gap-4">
            <h2 class="text-8 lg:text-12 font-bold">{{ roomInfo?.name }}</h2>
            <p class="text-3.5 lg:text-4 text-gray-80 leading-6">{{ roomInfo?.description }}</p>
          </div>
          <!-- 房型基本資訊 -->
          <div class="flex flex-col gap-4 xl:gap-6">
            <severTitle title="房型基本資訊" />
            <div v-if="roomInfoList.length > 0" class="flex gap-4">
              <RoomInfoCard v-for="(item, idx) in roomInfoList" :key="idx" :icon-name="item.iconName" :txt="item.txt" />
            </div>
          </div>
          <!-- 房間其他資訊 -->
          <div class="flex flex-col gap-4 xl:gap-6">
            <severTitle title="房內設備" />
            <div v-if="facilityInfo.length > 0"
              class="p-6 w-full grid grid-cols-2 sm:grid-cols-5 gap-x-10 gap-y-2 bg-white rounded-2 xl:rounded-5">
              <RoomTagCard v-for="i in facilityInfo" :title="i.title" />
            </div>
          </div>
          <!-- 訂房須知 -->
          <div class="flex flex-col gap-6">
            <severTitle title="訂房須知" />
            <ul class="list-decimal pl-6 space-y-2">
              <li v-for="(i, idx) in knowList" :key="idx"
                class="text-3.5 lg:text-4 text-gray-80 text-justify leading-5">{{ i.txt }}</li>
            </ul>
          </div>
        </div>
        <!-- 預約房型卡 Web -->
        <div class="hidden lg:block">
          <div class="max-h-620px p-10 flex flex-col gap-3 bg-white rounded-5">
            <h3 class="text-6 font-bold pb-4 border-b-(px solid gray-40)">預訂房型</h3>
            <div class="mt-7 flex flex-col gap-2">
              <h2 class="text-10 text-gray-80 font-bold tracking-wider leading-10">{{ roomInfo?.name }}</h2>
              <p class="text-4 text-gray-80 leading-6">{{ roomInfo?.description }}</p>
            </div>
            <div class="mt-7 flex flex-col gap-4">
              <!-- 日期 -->
              <div class="flex items-center gap-2">
                <el-date-picker v-model="checkInDate" :disabled-date="disabledStartDate" format="YYYY/MM/DD"
                  placeholder="入住日期" size="large" />
                <el-date-picker v-model="checkOutDate" :disabled-date="disabledEndDate" :disabled="!checkInDate"
                  format="YYYY/MM/DD" placeholder="退房日期" size="large" class="checkout-picker" />
              </div>
              <!-- 人數 -->
              <div class="mt-7 flex items-center justify-between">
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
                  <button @click="handlePeople(1)" :disabled="people >= 4"
                    class="p-0 rounded-full border-(px solid gray-40) bg-white group">
                    <div class="p-4 rounded-full cursor-pointer duration-300 group-hover:bg-primary">
                      <div class="i-mdi:plus w-6 h-6 duration-300 group-hover:(text-white)" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <!-- 錯誤訊息 -->
            <div class="text-4 text-error text-right duration-300">{{ errorMessage }}</div>
            <p class="mt-7 text-4 2xl:text-6 text-primary font-bold tracking-wider leading-8">
              <span class="text-gray">NT${{ roomInfo?.price ? roomInfo.price.toLocaleString() : '0'
                }}/晚,根據您的訂房天數預計為</span>
              NT${{ totalPrice }}
            </p>
            <DefaultBtn @click="handleBooking" :disabled="!checkInDate || !checkOutDate" text="立即預訂"
              class="mt-7 font-bold" />
          </div>
        </div>

        <!-- 預約房型卡 Mob -->
        <div class="fixed left-0 bottom-0 lg:hidden w-full">
          <div class="p-3 w-full flex items-center justify-between gap-5 bg-white border-t-(px solid gray-40)">
            <p class="flex-1 text-4 xl:text-6 text-primary font-bold tracking-wider whitespace-nowrap">
              NT${{ roomInfo?.price ? roomInfo.price.toLocaleString() : '0' }}/晚
            </p>
            <DefaultBtn @click="openCalender = true" text="查看可訂日期" class="flex-1 font-bold" />
          </div>

          <Teleport to="body">
            <transition name="fade">
              <div v-if="openCalender || openPeopleSelect">
                <div class="z-5 fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-80" />
              </div>
            </transition>
            <!-- 查看預定日期視窗 -->
            <transition name="slide-up">
              <div v-if="openCalender"
                class="z-50 fixed left-0 bottom-0 px-5 w-full h-80% flex flex-col justify-center items-center gap-12 bg-white rounded-t-4">
                <div class="relative pt-10 w-full flex flex-col gap-12">
                  <div class="block lg:hidden z-6 absolute top-4 left-0 z-10 cursor-pointer">
                    <div @click="openCalender = !openCalender" class="i-mdi:multiply w-8 h-8 text-gray-80"></div>
                  </div>
                  <h2 class="text-6 text-gray-80 text-center font-bold">請選擇日期</h2>
                  <el-date-picker v-model="checkInDate" :disabled-date="disabledStartDate" format="YYYY/MM/DD"
                    placeholder="入住日期" size="large" class="!w-full" />
                  <el-date-picker v-model="checkOutDate" :disabled-date="disabledEndDate" :disabled="!checkInDate"
                    format="YYYY/MM/DD" placeholder="退房日期" size="large" class="!w-full" />
                </div>
                <div class="w-full flex flex-col gap-5">
                  <DefaultBtn @click="handleConfirmDate" :disabled="!checkOutDate" text="確定日期" class="font-bold" />
                  <DefaultBtn @click="openCalender = false" text="返回上一頁" btnStyle="secondary"
                    class="w-full font-bold" />
                </div>
              </div>
            </transition>

            <!-- 人數選擇視窗 -->
            <transition name="slide-up">
              <div v-if="openPeopleSelect"
                class="z-50 relative fixed left-0 bottom-0 px-5 w-full h-80% flex flex-col justify-center items-center gap-10 bg-white rounded-t-4">
                <div class="block lg:hidden z-6 absolute top-6 left-4 z-10 cursor-pointer">
                  <div @click="openCalender = !openCalender" class="i-mdi:multiply w-8 h-8 text-gray-80"></div>
                </div>
                <div class="pt-12 w-full flex flex-col gap-4">
                  <h2 class="text-6 text-gray-80 text-center font-bold">請確認入住資訊</h2>
                  <div class="mt-5 flex items-center gap-4">
                    <h2 class="text-5 font-bold">{{ stayDays }} 晚</h2>
                    <p class="text-4 text-gray-80">
                      入住日期：{{ $dayjs(checkInDate).format('YYYY/MM/DD') }} ~ {{
                        $dayjs(checkOutDate).format('YYYY/MM/DD')
                      }}
                    </p>
                  </div>
                  <!-- 人數選擇 -->
                  <div class="mt-7 flex flex-col gap-4 justify-between">
                    <h3 class="text-4 font-bold">選擇人數</h3>
                    <p class="text-4 text-gray-80">此房型最多供 {{ roomInfo?.maxPeople }} 人居住，不接受寵物入住。</p>
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
                      <button @click="handlePeople(1)" :disabled="people >= 4"
                        class="p-0 rounded-full border-(px solid gray-40) bg-white group">
                        <div class="p-4 rounded-full cursor-pointer duration-300 group-hover:bg-primary">
                          <div class="i-mdi:plus w-6 h-6 duration-300 group-hover:(text-white)" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="w-full flex flex-col gap-5 pb-5">
                  <DefaultBtn @click="handleBooking" text="儲存" class="font-bold" />
                  <DefaultBtn @click="openPeopleSelect = false; openCalender = true" text="重新選擇日期" btnStyle="secondary"
                    class="w-full font-bold" />
                </div>
              </div>
            </transition>
          </Teleport>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.el-input--large .el-input__wrapper) {
  padding: 32px 12px;
  border: 1px solid #4B4B4B;
  border-radius: 8px;
}

:deep(.checkout-picker .el-input__prefix) {
  display: none;
}

:deep(.el-carousel__button) {
  background-color: #F1EAE4;
  border-radius: 100px;
  height: 4px;
  opacity: 1;
}

:deep(.el-carousel__indicator.is-active button) {
  background-color: #BF9D7D;
  color: #BF9D7D;
  width: 60px;
}

:deep(.el-carousel__container) {
  height: 100% !important;
}

:deep(.el-carousel__indicators) {
  bottom: 8px !important;
  left: 110px;
}
</style>