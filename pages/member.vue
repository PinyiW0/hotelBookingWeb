<script setup lang="ts">
import { useUserInfoStore } from '@/stores/userInfo';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const userStore = useUserInfoStore();

onMounted(() => {
  userStore.getUserInfo();
});

/** 會員資料 */
const userName = computed(() => userStore.user?.name || '尊榮貴賓');
const userId = computed(() => userStore.user?.id || route.params.id);

/** Tab */
const tabList = ref<any[]>([
  { title: '個人資料', val: 'personalData' },
  { title: '我的訂單', val: 'myOrder' },
]);

// 設定當前 tab
const activeTab = ref(route.path.includes('/order') ? 'myOrder' : 'personalData');

// 更換 Tab
const handleChangeTab = (val: string) => {
  if (!userId.value) return;
  router.push(val === 'personalData' ? `/member/${userId.value}` : `/member/${userId.value}/order`)
};
watch(() => route.path, (newPath) => {
  activeTab.value = newPath.includes('/order') ? 'myOrder' : 'personalData';
});
</script>

<template>
  <section class="w-full flex flex-col bg-gray-120">
    <!-- 共用會員 BN 區 -->
    <div class="w-full max-h-384px bg-[url(/images/Image/member.png)] bg-no-repeat bg-cover bg-top">
      <div
        class="px-5 py-10 w-full flex flex-col gap-4 xl:(px-0 py-30 max-w-1296px mx-auto flex-row items-center gap-6 )">
        <div class="w-18 h-18 xl:(w-36 h-36)">
          <img :key="$route.fullPath" src="/images/Image/memeberIcon.png" alt="會員照片" class="w-full h-full object-cover">
        </div>
        <h2 class="text-8 xl:text-12 text-white font-bold tracking-wider">Hello，{{ userName }}</h2>
      </div>
    </div>
    <div class="px-3 py-10 w-full flex flex-col gap-10 xl:(pt-20 pb-30 max-w-1296px mx-auto gap-20)">
      <Tab @update:model-value="handleChangeTab" v-model="activeTab" :list="tabList" />
      <NuxtPage :key="$route.fullPath" />
    </div>
    <!-- DECO -->
    <img src="/images/deco/success-mob.svg" aria-hidden class="md:hidden w-full object-cover">
    <img src="/images/deco/success-line.svg" aria-hidden class="hidden md:block object-cover">
  </section>
</template>
