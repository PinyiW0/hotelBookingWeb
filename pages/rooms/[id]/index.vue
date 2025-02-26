<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import type { RoomsInfo } from '@/api/Rooms/types';

const api = useApi();
const route = useRoute();
const router = useRouter();
const { $dayjs } = useNuxtApp();

defineOptions({
  name: 'RoomsIndex'
});
const roomInfo = ref<RoomsInfo | null>(null);

useSeoMeta({
  title: () => roomInfo.value?.name ? `${roomInfo.value.name} - 酒店房型詳細頁` : '酒店房型詳細頁',
  description: () => roomInfo.value?.description || '享受高級的住宿體驗，提供給您舒適寬敞的空間和精緻的裝潢。',
});
/** 調整 header 背景色 */
definePageMeta({
  headerBgColor: 'bg-gray-120',
});

const galleryData: any[] = [
  [ // 第一列圖片
    { src: '/images/Image/main-1.png', alt: '' },
    { src: '/images/Image/Room0.png', alt: '' }
  ],
  [ // 第二列圖片
    { src: '/images/Image/Room-3.png', alt: '' },
    { src: '/images/Image/Room-1.png', alt: '' }
  ]
];

/** 房間資訊 */
const id = route.params.id as string;

const getList = async () => {
  const { result = null } = await api.Rooms.Get(id);
  roomInfo.value = result;
};
// 取得房型基本資訊
const roomInfoList = computed(() => {
  return [
    { iconName: 'i-fluent:slide-size-24-filled', txt: roomInfo.value?.areaInfo ?? '尚未提供' },
    { iconName: 'i-material-symbols:bed-rounded', txt: roomInfo.value?.bedInfo ?? '尚未提供' },
    { iconName: 'i-material-symbols:person', txt: `最多 ${roomInfo.value?.maxPeople ?? 0} 人` },
  ];
});

/**房內設備 */
const facilityInfo = computed(() => roomInfo.value?.facilityInfo?.filter((item: any) => item) ?? []);

/** 訂房須知 */
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

/** 前往預定頁 */
const handleBooking = () => {
  router.push(`/rooms/${id}/booking`)
};

// #region 預訂人數
const people = ref<number>(1);
const showError = ref<boolean>(false);
const errorMessage = computed(() => {
  if (people.value >= 4) return '人數不得大於4';
  return '';
});

const handlePeople = (num: number) => {
  const newVal = people.value + num;
  showError.value = newVal > 4;
  if (!showError.value) people.value = newVal;
};
// #endregion 預訂人數

// #region 日期選擇
const checkInDate = ref('');
const checkOutDate = ref('');
/* checkin日期 disabled 規則 */
const disabledStartDate = (time: Date) => $dayjs(time) < $dayjs().subtract(1, "day");
/* checkout disabled 規則 */
const disabledEndDate = (time: Date) => $dayjs(time) < $dayjs(checkInDate.value).add(1, "day");
// #endregion 日期選擇

onMounted(() => {
  getList();
});
</script>

<template>
  <section class="w-full bg-primary-10">
    <!-- 照片區 -->
    <div class="hidden lg:block">
      <div class="px-4 max-w-1760px mx-auto pt-0 pb-10 lg:py-20 grid grid-cols-2 gap-2">
        <!-- 左側主圖 -->
        <div class="w-full max-h-150 rounded-l-5 overflow-hidden">
          <img src="/images/Image/main-0.png" alt="" width="978px" class="object-cover">
        </div>
        <!-- 右側組圖 -->
        <div class="grid grid-cols-2 gap-2">
          <div v-for="(column, colIdx) in galleryData" :key="colIdx" class="grid gap-2">
            <div v-for="(item, itemIdx) in column" :key="itemIdx"
              :class="{ 'rounded-tr-5': colIdx === 1 && itemIdx === 0, 'rounded-br-5': colIdx === 1 && itemIdx === 1 }"
              class="w-full h-74 overflow-hidden">
              <img :src="item.src" :alt="item.alt" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      </div>
    </div>
    <ClientOnly>
      <div class="lg:hidden relative w-full h-full overflow-x-hidden overflow-y-visible">
        <!-- swiper -->
        <el-carousel :indicator-position="undefined" class="w-full !h-60 !sm:h-85 !md:h-115">
          <el-carousel-item v-for="idx in 4" :key="idx">
            <!-- 輪播圖 -->
            <img :src="`/images/Image/Room-${idx - 1}.png`" :alt="`room${idx}`" class="w-full h-full object-cover">
          </el-carousel-item>
        </el-carousel>
        <DefaultBtn text="看更多" btnStyle="secondary" class="absolute right-0 bottom-0 z-5 m-5 font-bold" />
      </div>
    </ClientOnly>

    <!-- 詳細資訊 -->
    <div class="px-4 pb-8 pt-10 xl:(px-4 py-30) max-w-1296px mx-auto">
      <div class="w-full flex gap-0 lg:gap-18">
        <!-- 房間資訊 -->
        <div class="w-full xl:max-w-70% flex flex-col gap-6 xl:gap-20">
          <div class="flex flex-col gap-4">
            <h2 class="text-8 lg:text-12 font-bold">尊爵雙人房</h2>
            <p class="text-3.5 lg:text-4 text-gray-80 leading-6">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
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
              class="p-6 w-full grid grid-cols-2 sm:grid-cols-5 gap-x-10 gap-y-2 bg-white rounded-5">
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
        <!-- 預約房型卡 -->
        <div class="hidden lg:block">
          <div class="max-h-620px p-10 flex flex-col gap-3 bg-white rounded-5">
            <h3 class="text-6 font-bold pb-4 border-b-(px solid gray-40)">預訂房型</h3>
            <div class="mt-7 flex flex-col gap-2">
              <h2 class="text-10 text-gray-80 font-bold tracking-wider leading-10">尊爵雙人房</h2>
              <p class="text-4 text-gray-80 leading-6">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
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
            <p class="mt-7 text-4 xl:text-6 text-primary font-bold tracking-wider">NT$ 10,000</p>
            <DefaultBtn @click="handleBooking" text="立即預訂" class="mt-7 font-bold" />
          </div>
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