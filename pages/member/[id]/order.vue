<script setup lang="ts">
import { useRoute } from 'vue-router';
const api = useApi();
const { $dayjs } = useNuxtApp();
const route = useRoute();

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
  console.log(orderInfo.value);
};

/**房內設備 */
const facilityInfo = computed(() => {
  return orderInfo.value?.roomId?.facilityInfo?.filter((item: any) => item.isProvide)
});

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
        <p class="mt-4 text-3.5 xl:text-4 text-gray-80">預訂參考編號： HH2302183151222</p>
        <h2 class="text-4 xl:text-6 font-bold leading-8">即將來的行程</h2>
        <div class="mt-4 w-full max-h-150px sm:max-h-120 xl:(mt-6 max-h-60) rounded-2 overflow-hidden">
          <img :key="$route.fullPath" src="/images/Image/Room.png" alt="" class="w-full h-full object-center">
        </div>
        <div class="mt-4 pb-6 flex flex-col gap-2 border-b-(px solid gray-40) xl:(pb-10 mt-6)">
          <p class="text-4 xl:text-5 text-gray-80 font-bold">尊爵雙人房，1 晚 | 住宿人數：2 位</p>
          <severTitle title="入住：" titleSize="text-3.5 xl:text-4" class="mt-4 text-gray-80">
            <p class="tetx-3.5 xl:text-4 font-bold">6 月 10 日星期二，15:00 可入住</p>
          </severTitle>
          <severTitle title="退房：" titleSize="text-3.5 xl:text-4" decoBg="bg-gray-60" class="text-gray-80">
            <p class="tetx-3.5 xl:text-4 font-bold">6 月 11 日星期三，12:00 前退房</p>
          </severTitle>
          <p class="mt-4 xl:mt-6 text-4 text-gray-80 font-bold">NT$ 10,000</p>
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
            <RoomTagCard v-for="i in facilityInfo" :title="i.title" />
          </div>
        </div>
        <div class="pt-10 w-full flex items-center gap-4">
          <DefaultBtn text="取消預訂" @click="dialogVisible = true" btnStyle="secondary" class="w-full font-bold" />
          <DefaultBtn text="查看詳情" class=" font-bold" />
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
          <DefaultBtn text="確定取消" @click="dialogVisible = false" class=" font-bold" />
        </div>
      </template>
    </el-dialog>
  </teleport>
</template>

<style scoped></style>