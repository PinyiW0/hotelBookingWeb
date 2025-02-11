<!-- 關於臺藝的 MenuList -->
<script setup lang="ts">
const router = useRouter();
const route = useRoute();

/** Tab */
const tabList = ref<any[]>([
  { title: '個人資料', val: 'personalData' },
  { title: '我的訂單', val: 'myOrder' },
]);

// 根據當前路由設定預設 tab
const defaultTab = computed(() => {
  return route.path.includes('/member/order') ? 'myOrder' : 'personalData';
});

//更換 Tab
const handleChangeTab = (val: string) => {
  val === 'personalData' ? router.push('/member') : router.push('/member/order')
};
</script>

<template>
  <section class="w-full flex flex-col bg-gray-120">
    <!-- 共用會員 BN 區 -->
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
      <NuxtPage />
    </div>
    <!-- DECO -->
    <img src="/images/deco/success-mob.svg" aria-hidden class="md:hidden w-full object-cover">
    <img src="/images/deco/success-line.svg" aria-hidden class="hidden md:block object-cover">
  </section>
</template>
