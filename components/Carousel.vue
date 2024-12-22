<script setup lang="ts">
const bannerList: any[] = [
  { label: 'room1', imgPath: 'Room-0.png' },
  { label: 'room2', imgPath: 'Room-1.png' },
  { label: 'room3', imgPath: 'Room-2.png' },
  { label: 'room4', imgPath: 'Room-3.png' },
];
</script>

<template>
  <div class="w-full h-full">
    <ClientOnly>
      <swiper-container slides-per-view="1" pagination-enabled="true"
        pagination-clickable="true"
        pagination-hide-on-click="false"
        loop="true" autoplay-delay="5000" effect="fade" class="w-full h-full">
        <swiper-slide v-for="(slide, idx) in bannerList" :key="idx" class="relative w-full h-full">
          <!-- 黑色透明遮罩 -->
          <div class="absolute top-0 left-0 w-full h-full bg-black/60"></div>
          <!-- 輪播圖 -->
          <img :src="`/images/Image/${slide.imgPath}`" :alt="slide.label" class="w-full h-full object-cover">
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </div>
</template>

<style scoped>
/* 分頁容器的樣式  */
swiper-container::part(pagination) {
  display: flex;
  justify-content: center;
  gap: 4px;
  position: absolute;
  bottom: 3%;
  left: 2%;
  z-index: 60 !important;
}

@media (min-width: 1024px) {
  swiper-container::part(pagination) {
    bottom: 4%;
    left: 0%;
  }
}
@media (min-width: 1280px) {
  swiper-container::part(pagination) {
    bottom: 5%;
  }
}

@media (min-width: 1920px) {
  swiper-container::part(pagination) {
    bottom: 38%;
    z-index: 30 !important;
  }
}

/* 點點樣式 */
swiper-container::part(bullet) {
  width: 32px;
  height: 4px;
  background: #F1EAE4;
  border-radius: 4px;
  opacity: 1;
  cursor: pointer;
}

/* 活動分頁點的樣式 */
swiper-container::part(bullet-active) {
  width: 60px;
  height: 4px;
  background: #BF9D7D;
  border-radius: 4px;
}
</style>
