<script setup lang="ts">
import { useUserInfoStore } from '@/stores/userInfo';

/** @const open menu */
const openMenu = ref<boolean>(false);
const userStore = useUserInfoStore();

interface MenuItem {
  label: string;
  path: string;
  btnStyle?: string;
  icon?: string;
}

const baseMenuItem: MenuItem[] = [
  { label: '客房旅宿', path: '/rooms' },
  { label: '立即訂房', path: '/rooms', btnStyle: 'primary' },
];

const authMenuItem = computed<MenuItem>(() => {
  return userStore.user ? { label: userStore.user.name, path: `/member/${userStore.user.id}`, icon: 'i-mdi:person-circle-outline' } : { label: '會員登入', path: '/login' }
});

const menuList = computed(() => {
  return [baseMenuItem[0], authMenuItem.value, baseMenuItem[1]];
});

/** 登入後 dropdown 顯示 */
const isDropdown = ref(false);
const isMobDropdown = ref(false);
let dropdownTimeout: ReturnType<typeof setTimeout> | null = null;
// Web 滑入滑出
const openDropdown = () => {
  if (dropdownTimeout) clearTimeout(dropdownTimeout);
  isDropdown.value = true;
};
const closeDropdown = () => {
  dropdownTimeout = setTimeout(() => {
    isDropdown.value = false;
  }, 200);
};

/** 登出 */
const logout = () => {
  userStore.clearUserInfo();
  openMenu.value = false;
  isMobDropdown.value = false;
  navigateTo('/');
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});
</script>

<template>
  <header
    class="relative fixed top-0 z-60 left-0 w-full h-18 lg:h-40 px-3 lg:px-20 py-4 flex items-center justify-between">
    <!-- logo -->
    <h1>
      <NuxtLink to="/">
        <img src="/images/LOGO.svg" alt="享樂酒店 Enjoyment Luxury Hotel" class="h-10 lg:h-18 cursor-pointer">
      </NuxtLink>
    </h1>

    <!-- phone menu icon -->
    <div class="block lg:hidden z-60 absolute top-8 right-7 cursor-pointer">
      <div @click="openMenu = !openMenu" class="w-auto h-full flex flex-col justify-center gap-0.75">
        <div :class="{ 'w-7 h-3px rotate-45 translate-y-1.5 rounded-0': openMenu }"
          class="w-4.5 h-2px rounded-lg bg-white duration-400" />
        <div :class="{ 'opacity-0': openMenu }" class="w-4.5 h-2px rounded-lg bg-white duration-400" />
        <div :class="{ 'w-7 h-3px -rotate-45 -translate-y-0.9 rounded-0': openMenu }"
          class="w-4.5 h-2px rounded-lg bg-white duration-400" />
      </div>
    </div>

    <!-- phone menu list -->
    <transition name="slide-down">
      <div v-if="openMenu" class="block lg:hidden absolute top-0 right-0 z-10 w-full h-100dvh bg-black overflow-hidden">
      </div>
    </transition>
    <transition name="fade">
      <ul v-if="openMenu"
        class="z-20 px-5 absolute top-1/2 left-1/2 -translate-x-1/2 w-full h-100dvh flex flex-col items-center justify-center gap-4">
        <li v-for="(item, idx) in menuList" :key="idx" class="py-4 w-full list-none flex items-center justify-center">
          <template v-if="item.btnStyle">
            <DefaultBtn @click="openMenu = false" :to="item.path" :text="item.label" :btnStyle="item.btnStyle"
              class="!w-full font-bold" />
          </template>

          <template v-else-if="item.icon">
            <div class="w-full">
              <div @click="isMobDropdown = !isMobDropdown" :class="{ 'mb-5': isMobDropdown }">
                <div class="flex items-center justify-center gap-2 group">
                  <div :class="item.icon"
                    class="text-white w-6 h-6 duration-300 cursor-pointer group-hover:opacity-70" />
                  <p
                    class="text-base text-white font-bold tracking-wider duration-300 cursor-pointer group-hover:opacity-70">
                    {{ item.label }}
                  </p>
                </div>
              </div>
              <!-- 會員 Dropdown -->
              <transition name="drop">
                <div v-if="isMobDropdown" class="w-full bg-primary-10 rounded shadow-lg">
                  <NuxtLink v-if="userStore.user" @click="openMenu = false" :to="`/member/${userStore.user.id}`"
                    class="block px-6 py-4 text-center text-base text-gray-80 font-bold bg-primary-10 rounded-t-5 cursor-pointer duration-300 hover:(text-primary bg-primary-10) decoration-none">
                    我的帳戶
                  </NuxtLink>
                  <button @click.stop="logout"
                    class="w-full block px-6 py-4 text-center text-base text-gray-80 bg-primary-10 rounded-b-5 font-bold border-0 cursor-pointer duration-300 hover:(text-primary bg-primary-10)">
                    登出
                  </button>
                </div>
              </transition>
            </div>
          </template>

          <template v-else>
            <NuxtLink @click="openMenu = false" :to="item.path"
              class="text-base text-white text-center font-bold tracking-wider decoration-none duration-300 hover:opacity-60">
              {{ item.label }}
            </NuxtLink>
          </template>
        </li>
      </ul>
    </transition>

    <!-- web menu list -->
    <div class="hidden lg:block">
      <ul class="flex items-center gap-4">
        <li v-for="(item, idx) in menuList" :key="idx" class="relative p-4 list-none">
          <!-- 會員登入文字＋頭貼 -->
          <template v-if="item.icon">
            <div @mouseenter="openDropdown" @mouseleave="closeDropdown" class="relative group">
              <NuxtLink :to="item.path" class="flex items-center gap-1 decoration-none">
                <div :class="item.icon" class="text-white w-6 h-6 group-hover:opacity-70" />
                <p class="text-base text-white font-bold group-hover:opacity-70">{{ item.label }}</p>
              </NuxtLink>
              <!-- web Dropdown -->
              <transition name="fade">
                <div v-if="isDropdown"
                  class="absolute top-full -left-35 z-10 mt-3 w-260px h-136px flex flex-col justify-center bg-white rounded-5 shadow-lg">
                  <NuxtLink v-if="userStore.user" :to="`/member/${userStore.user.id}`"
                    class="px-6 py-4 w-full text-4 text-gray-80 font-bold decoration-none cursor-pointer duration-300 hover:(text-primary bg-primary-10)">
                    我的帳戶
                  </NuxtLink>
                  <button @click.stop="logout"
                    class="px-6 py-4 w-full text-4 text-left text-gray-80 font-bold border-0 bg-white cursor-pointer duration-300 hover:(text-primary bg-primary-10)">
                    登出
                  </button>
                </div>
              </transition>
            </div>
          </template>
          <!-- 預設按鈕樣式 -->
          <template v-else-if="item.btnStyle">
            <DefaultBtn :to="item.path" :text="item.label" :btnStyle="item.btnStyle" class="font-bold" />
          </template>
          <!-- 一般連結 -->
          <template v-else>
            <NuxtLink :to="item.path"
              class="text-base text-white font-bold tracking-wider decoration-none duration-300 hover:opacity-60">
              {{ item.label }}
            </NuxtLink>
          </template>
        </li>
      </ul>
    </div>
  </header>
</template>
<style scoped>
.drop-enter-active,
.drop-leave-active {
  transition: max-height 0.3s, padding 0.3s ease, opacity 0.1s ease;
  overflow: hidden;
}

.drop-enter-from,
.drop-leave-to {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
}
</style>