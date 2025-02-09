<script setup lang="ts">
const { $dayjs } = useNuxtApp();
defineOptions({
  name: 'RoomsIdSuccess'
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
  <section class="w-full bg-gray-120">
    <div class="px-3 w-full mx-auto flex flex-col justify-center xl:(px-0 py-30 max-w-1296px flex-row gap-18)">
      <div class="mt-10 flex flex-col gap-10">
        <!-- 預定成功狀態 -->
        <div class="flex flex-col gap-1">
          <div class="flex flex-col gap-4 xl:(flex-row items-center gap-10)">
            <div class="w-10 h-10 flex items-center justify-center bg-success rounded-full">
              <div class="i-material-symbols:check w-7 h-7 text-white" />
            </div>
            <div class="flex flex-col gap-2">
              <h2 class="text-8 text-white font-bold tracking-wider leading-10">恭喜，<span>Jessica</span>！</h2>
              <h2 class="text-8 text-white font-bold tracking-wider leading-10">您已預訂成功</h2>
            </div>
          </div>
          <p class="mt-7 text-4 text-white tracking-wider leading-6">我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。</p>
        </div>
        <!-- 前往訂單 -->
        <div class="py-10 xl:py-20 w-full flex flex-col gap-6 border-t-(px solid gray-40) border-b-(px solid gray-40)">
          <p class="text-4 xl:text-6 text-white tracking-wider font-bold">立即查看你的訂單紀錄</p>
          <div class="w-full xl:w-55">
            <DefaultBtn text="前往我的訂單" btnStyle="primary" class="font-bold" />
          </div>
        </div>
        <!-- 訂房人資訊 -->
        <div class="flex flex-col gap-8">
          <h3 class="text-6 text-white font-bold tracking-wider leading-10">訂房人資訊</h3>
          <ul class="flex flex-col gap-6">
            <li class="flex flex-col gap-2">
              <p class="text-4 text-white">姓名</p>
              <p class="text-4 text-white leading-6">Jessica Ｗang</p>
            </li>
            <li class="flex flex-col gap-2">
              <p class="text-4 text-white">手機號碼</p>
              <p class="text-4 text-white leading-6">+886 912 345 678</p>
            </li>
            <li class="flex flex-col gap-2">
              <p class="text-4 text-white">電子信箱</p>
              <p class="text-4 text-white leading-6">jessica@sample.com</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 即將來的行程 -->
      <div class="mt-5 mb-10 p-4 xl:(p-10 mb-0) max-w-478px flex flex-col gap-2 bg-white rounded-2">
        <p class="text-3.5 xl:text-4 text-gray-80">預訂參考編號： HH2302183151222</p>
        <p class="text-4 xl:text-6 font-bold leading-8">即將來的行程</p>
        <div class="mt-4 w-full max-h-150px xl:(mt-6 max-h-60) rounded-2 overflow-hidden">
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
            class="mt-2 p-6 w-full grid grid-cols-2 sm:grid-cols-5 gap-x-10 gap-y-2 bg-white rounded-2 border-(px solid gray-40)">
            <RoomTagCard v-for="i in facilityInfo" :title="i.title" />
          </div>
        </div>
        <div class="mt-4 flex flex-col gap-4 xl:(gap-6 mt-10)">
          <severTitle title="備品提供" titleSize="text-4" />
          <div
            class="mt-2 p-6 w-full grid grid-cols-2 sm:grid-cols-5 gap-x-10 gap-y-2 bg-white rounded-2 border-(px solid gray-40)">
            <RoomTagCard v-for="i in facilityInfo" :title="i.title" />
          </div>
        </div>
      </div>
    </div>
    <!-- DECO -->
    <img src="/images/deco/success-mob.svg" aria-hidden class="md:hidden w-full object-cover">
    <img src="/images/deco/success-line.svg" aria-hidden class="hidden md:block object-cover">
  </section>
</template>

<style scoped></style>