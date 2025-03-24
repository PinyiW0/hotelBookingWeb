<script setup lang="ts">
const contactList: any[] = [
  { label: 'TEL', txt: '+886-7-1234567' },
  { label: 'FAX', txt: '+886-7-1234567' },
  { label: 'MAIL', txt: 'elh@hexschool.com' },
  { label: 'WEB', txt: 'www.elhhexschool.com.tw' },
];
</script>

<template>
  <div
    class="px-3 sm:px-16 py-20 w-full flex flex-col items-start justify-center gap-20 lg:(px-0 items-center justify-between) bg-gray-120">
    <div
      class="max-w-1296px w-full flex flex-col items-start justify-start gap-10 lg:(flex-row items-center justify-between)">
      <!-- Logo + icon -->
      <div class="flex flex-col items-start gap-10">
        <a href="/">
          <img src="/images/LOGO.svg" alt="享樂酒店 Enjoyment Luxury Hotel" width="100%" class="h-18 cursor-pointer">
        </a>
        <ul class="flex items-center gap-4 decoration-none">
          <li
            class="w-10 h-10 flex justify-center items-center rounded-full border-(px solid white) cursor-pointer duration-300 hover:opacity-60">
            <div class="i-bi:line w-6 h-6 text-white text-center inline-block"></div>
          </li>
          <li
            class="w-10 h-10 flex justify-center items-center rounded-full border-(px solid white) cursor-pointer duration-300 hover:opacity-60">
            <div class="i-mdi:instagram w-6 h-6 text-white text-center inline-block"></div>
          </li>
        </ul>
      </div>
      <!-- contact area  -->
      <!-- TEL + FAX -->
      <div class="flex flex-col items-start gap-10 lg:(flex-row gap-20)">
        <div class="flex flex-col items-start justify-start gap-10 ">
          <div v-for="item in contactList.slice(0, 2)" :key="item.label"
            class="flex flex-col items-start justify-start">
            <p class="text-base text-white font-bold">{{ item.label }}</p>
            <p class="text-sm lg:text-base text-white whitespace-nowrap">{{ item.txt }}</p>
          </div>
        </div>
        <!-- MAIL + WEB -->
        <div class="flex flex-col items-start justify-start gap-10">
          <div v-for="item in contactList.slice(2, 4)" :key="item.label"
            class="flex flex-col items-start justify-start">
            <p class="text-base text-white font-bold">{{ item.label }}</p>
            <p class="text-sm lg:text-base text-white whitespace-nowrap">{{ item.txt }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- brand info -->
    <div class="max-w-1296px w-full flex flex-col items-start gap-4 lg:(flex-row justify-between)">
      <p class="text-sm lg:text-base text-white">806023 台灣高雄市新興區六角路123號</p>
      <p class="text-sm lg:text-base text-white">© 享樂酒店 2025 All Rights Reserved.</p>
    </div>

  </div>
</template>
