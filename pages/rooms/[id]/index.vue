<script setup lang="ts">
// TODO: 補layout header
defineOptions({
  name: 'RoomsIndex'
});
// TODO:之後要做動態 SEO
useSeoMeta({
  title: '房型詳細頁',
  description: '房型詳細頁',
});
</script>

<template>
  <section class="w-full bg-primary-10">
    <!-- 照片區 -->
    <div class="max-w-1760px mx-auto py-20 grid grid-cols-2 gap-2">
      <!-- 左側主圖 -->
      <div class="w-full max-h-150 rounded-l-5 overflow-hidden">
        <img src="/images/Image/main-0.png" alt="" width="978px" class="object-cover" >
      </div>
      <!-- 右側組圖 -->
      <div class="grid grid-cols-2 gap-2">
        <!-- 第一列 -->
        <div class="grid grid-cols-1 gap-2">
          <div class="w-full h-74 overflow-hidden">
            <img src="/images/Image/main-1.png" alt="" class="w-full h-full object-cover">
          </div>
          <div class="w-full h-74 overflow-hidden">
            <img src="/images/Image/Room0.png" alt="" class="w-full h-full object-cover">
          </div>
        </div>
        <!-- 第二列 -->
        <div class="grid grid-cols-1 gap-2">
          <div class="w-full h-74 rounded-rt-5 overflow-hidden">
            <img src="/images/Image/Room-3.png" alt="" class="w-full h-full object-cover">
          </div>
          <div class="w-full h-74 rounded-rb-5 overflow-hidden">
            <img src="/images/Image/Room-1.png" alt="" class="w-full h-full object-cover">
          </div>
        </div>
      </div>
    </div>
    <!-- 詳細資訊 -->
    <div class="max-w-1296px mx-auto py-30">
      <div class="flex gap-18">
        <!-- 房間資訊 -->
         <div class="flex flex-col"></div>
        <!-- 預約房型卡 -->
         <div class="flex flex-col bg-white rounded-5"></div>
      </div>
      
    </div>
  </section>
</template>

<style scoped></style>