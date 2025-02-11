<script setup lang="ts">
const { $dayjs } = useNuxtApp();
defineOptions({
  name: 'MemberOrder'
});
definePageMeta({
  headerBgColor: 'bg-gray-120',
});
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
</script>

<template>
  <div class="flex flex-col gap-6 xl:(flex-row gap-10)">
    <!-- 即將來的行程 -->
    <div class="p-6 w-full h-fit flex flex-col gap-6 bg-white rounded-5">
      <p class="text-3.5 xl:text-4 text-gray-80">預訂參考編號： HH2302183151222</p>
      <h2 class="text-4 xl:text-6 font-bold leading-8">即將來的行程</h2>
      <div class="mt-4 w-full max-h-150px sm:max-h-120 xl:(mt-6 max-h-60) rounded-2 overflow-hidden">
        <img src="/images/Image/Room.png" alt="" class="w-full h-full object-center">
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
      <div class="w-full flex items-center gap-4">
        <DefaultBtn text="取消預訂" btnStyle="secondary" class="font-bold" />
        <DefaultBtn text="查看詳情" class=" font-bold" />
      </div>
    </div>
    <!-- 歷史訂單 -->
    <div class="p-6 w-full flex flex-col gap-6 bg-white rounded-5">
      <h2 class="text-4 xl:text-6 font-bold leading-8">歷史訂單</h2>
    </div>
  </div>
</template>

<style scoped></style>
