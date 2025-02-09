<script setup lang="ts">
const { $dayjs } = useNuxtApp();
const router = useRouter();
defineOptions({
  name: 'MemberIndex'
});
definePageMeta({
  headerBgColor: 'bg-gray-120',
});
/** Tab */
const defaultTab = ref<string>('personalData');
const tabList = ref<any[]>([
  { title: '個人資料', val: 'persona lData' },
  { title: '我的訂單', val: 'myOrder' },
]);
const handleChangeTab = (val: string) => {
  router.push({
    path: '/member',
    query: { tab: val },
  });
  // getList(val);
};
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
    <div class="px-3 py-10 w-full flex flex-col xl:(pt-20 pb-30 max-w-1296px)">
      <Tab @update:model-value="handleChangeTab" v-model="defaultTab" :list="tabList" />
    </div>
  </section>
</template>

<style scoped></style>
