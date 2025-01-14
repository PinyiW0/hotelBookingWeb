<script setup lang="ts">
/** @const open menu */
const openMenu = ref<boolean>(false);
const menuList: any[] = [
  { label: '客房旅宿', path: '/rooms' },
  { label: '會員登入', path: '/login' },
  { label: '立即訂房', path: '/room', btnStyle: 'primary' },
]
</script>

<template>
  <header
    class="relative fixed top-0 z-60 left-0 w-full h-18 lg:h-40 px-3 lg:px-20 py-4 flex items-center justify-between bg-transparent">
    <!-- logo -->
    <h1>
      <a href="/">
        <img src="/images/LOGO.svg" alt="享樂酒店 Enjoyment Luxury Hotel" class="h-10 lg:h-18 cursor-pointer">
      </a>
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
        <li v-for="(item, idx) in menuList" :key="idx"
          class="py-4 w-full list-none flex items-center justify-center">
          <template v-if="item.btnStyle">
            <DefaultBtn @click="openMenu = false" :to="item.path" :text="item.label" :btnStyle="item.btnStyle" class="!w-full font-bold" />
          </template>
          <template v-else>
            <NuxtLink @click="openMenu = false" :to="item.path" class="text-base text-white text-center font-bold tracking-wider decoration-none duration-300 hover:opacity-60">
              {{ item.label }}
            </NuxtLink>
          </template>
        </li>
      </ul>
    </transition>

    <!-- web menu list -->
    <div class="hidden lg:block">
      <ul class="flex items-center gap-4">
        <li v-for="(item, idx) in menuList" :key="idx" class="p-4 list-none">
          <template v-if="item.btnStyle">
            <DefaultBtn :to="item.path" :text="item.label" :btnStyle="item.btnStyle" class="font-bold" />
          </template>
          <template v-else>
            <NuxtLink :to="item.path" class="text-base text-white font-bold tracking-wider decoration-none duration-300 hover:opacity-60">
              {{ item.label }}
            </NuxtLink>
          </template>

        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped></style>