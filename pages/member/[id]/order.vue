<script setup lang="ts">
import { useRoute } from 'vue-router';
const api = useApi();
const { $dayjs } = useNuxtApp();
const { $swal } = useNuxtApp() as any;
import { useRoom } from '~/composables/useRoom';
const { calTotalPrice, stayDays, getFacilityInfo, getAmenityInfo } = useRoom();

defineOptions({
  name: 'MemberOrder'
});
definePageMeta({
  headerBgColor: 'bg-gray-120',
});
const orderInfo = ref<any>(null);
const getOrderInfo = async () => {
  const { result = null } = await api.Orders.GetList();
  orderInfo.value = result;
  console.log(result);

};

// #region 即將到來的行程
/** 即將到來的行程 */
const upComingOrder = computed(() => {
  if (!orderInfo.value || !orderInfo.value.length) return null;
  const now = $dayjs();
  const upcoming = orderInfo.value.filter((order: any) => $dayjs(order.checkInDate).isAfter(now));
  upcoming.sort((a: any, b: any) => $dayjs(a.checkInDate).diff($dayjs(b.checkInDate)));

  return upcoming[0] || null
});

/** 計算入住晚數 */
const stayNight = computed(() => {
  const { checkInDate, checkOutDate } = upComingOrder.value;
  if (upComingOrder.value) {
    return stayDays(checkInDate, checkOutDate);
  }
  return 0;
});
/** 計算價錢 */
const totalPrice = computed(() => {
  const { checkInDate, checkOutDate, roomId } = upComingOrder.value;
  if (upComingOrder.value) {
    return calTotalPrice(checkInDate, checkOutDate, roomId.price);
  }
  return 0;
});
/** 房內設備 */
const facilityInfo: any = computed(() => {
  return getFacilityInfo(upComingOrder.value);
});

/** 房內備品 */
const amenityInfo: any = computed(() => {
  return getAmenityInfo(upComingOrder.value);
});

/** 取消即將到來的預訂 */
const cancelRecentOrder = async (id: string) => {
  api.Orders.Delete(id)
    .then(() => {
      $swal.fire({
        icon: 'success',
        iconColor: '#52DD7E',
        title: '取消成功！',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    })
    .catch((error: any) => {
      $swal.fire({
        icon: 'error',
        title: '取消失敗',
        text: error.message || '請稍後再試',
      });
    })
    .finally(() => {
      // 無論成功或失敗，都關閉視窗
      dialogVisible.value = false;
    });
};

// #endregion 即將到來的行程

const dialogVisible = ref(false);
onMounted(() => {
  getOrderInfo();
});
</script>

<template>
  <div :class="dialogVisible ? 'filter blur-4 transition duration-300' : ''">
    <div class="max-w-1296px mx-auto flex flex-col gap-6 xl:(flex-row gap-10)">
      <!-- 即將來的行程 -->
      <div class="p-6 w-full xl:w-4/7 h-fit flex flex-col gap-2 bg-white rounded-5">
        <div v-if="upComingOrder">
          <p class="mt-4 text-3.5 xl:text-4 text-gray-80">預訂參考編號： {{ upComingOrder._id }}</p>
          <h2 class="text-4 xl:text-6 font-bold leading-8">即將來的行程</h2>
          <div class="mt-4 w-full max-h-250px sm:max-h-120 xl:(mt-6 max-h-60) rounded-2 overflow-hidden">
            <img :key="$route.fullPath" :src="upComingOrder.roomId.imageUrl" :alt="upComingOrder.roomId.name"
              class="w-full h-full object-center">
          </div>
          <div class="mt-4 pb-6 flex flex-col gap-2 border-b-(px solid gray-40) xl:(pb-10 mt-6)">
            <p class="text-4 xl:text-5 text-gray-80 font-bold">{{ upComingOrder.roomId.name }}，{{ stayNight }} 晚 |
              住宿人數：{{
                upComingOrder.peopleNum }} 位</p>
            <severTitle title="入住：" titleSize="text-3.5 xl:text-4" class="mt-4 text-gray-80">
              <p class="text-3.5 xl:text-4 font-bold">{{ $dayjs(upComingOrder.checkInDate).format('MM月 DD 日dddd')
              }}，15:00
                可入住</p>
            </severTitle>
            <severTitle title="退房：" titleSize="text-3.5 xl:text-4" decoBg="bg-gray-60" class="text-gray-80">
              <p class="text-3.5 xl:text-4 font-bold">{{ $dayjs(upComingOrder.checkOutDate).format('MM月 DD 日dddd')
              }}，12:00 前退房</p>
            </severTitle>
            <p class="mt-4 xl:mt-6 text-4 text-gray-80 font-bold">NT$ {{ totalPrice.toLocaleString() }}</p>
          </div>
          <div class="mt-4 flex flex-col gap-4 xl:(gap-6 mt-10)">
            <severTitle title="房內設備" titleSize="text-4" />
            <div
              class="mt-2 p-6 w-full grid grid-cols-2 sm:grid-cols-3  gap-x-10 gap-y-2 bg-white rounded-2 border-(px solid gray-40)">
              <RoomTagCard v-for="i in facilityInfo" :title="i.title" />
            </div>
          </div>
          <div class="mt-4 flex flex-col gap-4 xl:(gap-6 mt-10)">
            <severTitle title="備品提供" titleSize="text-4" />
            <div
              class="mt-2 p-6 w-full grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-2 bg-white rounded-2 border-(px solid gray-40)">
              <RoomTagCard v-for="i in amenityInfo" :title="i.title" />
            </div>
          </div>
          <div class="pt-10 w-full flex items-center gap-4">
            <DefaultBtn text="取消預訂" @click="dialogVisible = true" btnStyle="secondary" class="w-full font-bold" />
            <DefaultBtn text="查看詳情" :to="`/rooms/${upComingOrder.roomId._id}`" class=" font-bold" />
          </div>
        </div>
        <div v-else class="py-10 flex flex-col justify-center gap-10">
          <p class="text-5 text-gray-80">您目前尚無預定行程</p>
          <DefaultBtn text="前往訂房" @click="navigateTo('/rooms')" class="w-full font-bold" />
        </div>
      </div>
      <!-- 歷史訂單 -->
      <div class="p-6 w-full xl:w-3/7 h-fit flex flex-col gap-6 xl:gap-10 bg-white rounded-5">
        <h2 class="mt-4 text-4 xl:text-6 font-bold leading-8">歷史訂單</h2>
        <!-- history card -->
        <div class="w-full flex flex-col gap-6 xl:(flex-row)">
          <div class="w-30 h-20 rounded-2 overflow-hidden">
            <img src="/images/Image/member-room.png" alt="房間照片" class="w-full h-full object-cover">
          </div>
          <div class="pb-10 flex flex-col gap-2 border-b-(px solid gray-40)">
            <p class="mt-2 text-3.5 xl:(text-4 mt-0) text-gray-80">預訂參考編號： HH2302183151222</p>
            <h2 class="mt-2 text-3.5 xl:text-5 font-bold leading-8">尊爵雙人房</h2>
            <p class="text-4 xl:text-5 text-gray-80">住宿天數： 1 晚</p>
            <p class="text-4 xl:text-5 text-gray-80">住宿人數：2 位</p>
            <severTitle title="入住：" titleSize="text-3.5 xl:text-4" class="mt-4 text-gray-80">
              <p class="tetx-3.5 xl:text-4">6 月 10 日星期二，15:00 可入住</p>
            </severTitle>
            <severTitle title="退房：" titleSize="text-3.5 xl:text-4" decoBg="bg-gray-60" class="text-gray-80">
              <p class="tetx-3.5 xl:text-4">6 月 11 日星期三，12:00 前退房</p>
            </severTitle>
            <p class="mt-4 xl:mt-6 text-4 text-gray-80 font-bold">NT$ 10,000</p>
          </div>
        </div>
        <DefaultBtn text="查看更多" btnStyle="secondary" class="w-full font-bold" />
      </div>
    </div>
  </div>
  <!-- dialog -->
  <teleport to="body" class="z-10">
    <el-dialog v-model="dialogVisible" :close-on-click-modal="false" lock-scroll align-center
      class="!w-90% !sm:w-150 !rounded-2">
      <p class="py-15 text-5 text-center font-bold text-gray-80">確定要取消此房型的預訂嗎？</p>
      <template #footer>
        <div class="flex items-center gap-4">
          <DefaultBtn text="關閉視窗" @click="dialogVisible = false" btnStyle="secondary" class="w-full font-bold" />
          <DefaultBtn text="確定取消" @click="cancelRecentOrder(upComingOrder._id)" class=" font-bold" />
        </div>
      </template>
    </el-dialog>
  </teleport>
</template>