<script setup lang="ts">
defineProps({
  slideList: {
    type: Array,
    requied: true
  } as any
});
</script>

<template>
  <div class="relative w-full">
    <img src="/images/deco/waveBG.png" aria-hidden class="absolute bottom-35 right-0 z-2 lg:hidden">
    <ClientOnly>
      <swiper-container slides-per-view="1" pagination-enabled="true" pagination-clickable="true"
        pagination-hide-on-click="false" navigation="true" autoplay-delay="5000" effect="fade" class="roomSwiper">

        <swiper-slide v-for="slide in slideList" :key="slide.id" class="bg-gray-120 relative">
          <!-- deco -->
          <img src="/images/deco/room-line-web.png" aria-hidden
            class="absolute top-6 z-1 hidden lg:(block right--120) xl:right-0 w-1060px h-187px">
          <img src="/images/deco/waveBG-web.png" aria-hidden class="absolute bottom--30 z--1">

          <div class="flex flex-col item-center gap-6 lg:(flex-row items-end gap-10) xl:gap-16 group">
            <!-- img -->
            <div class="w-full lg:(w-700px h-700px) xl:(w-900px h-900px) rounded-r-2 overflow-hidden">
              <img :src="`${slide.imageUrl}`" :alt="slide.name"
                class="w-full h-full object-cover duration-400 group-hover:scale-110">
            </div>
            <!-- content -->
            <div class="lg:(mr-8 w-462px) 2xl:w-628px flex flex-col gap-2 lg:gap-4 z-10">
              <h3 class="text-7 text-white font-bold">{{ slide.name }}</h3>
              <p class="text-sm text-white">{{ slide.description }}</p>
              <p class="mt-4 lg:mt-6 text-6 text-white font-bold tracking-widest">NT$ {{ slide.price }}</p>
              <!-- btn -->
              <HeroBtn :to="`/rooms/${slide._id}`" text="查看更多" class="mt-6" />
              <div class="mt-6 p-4 flex items-center justify-end gap-8">
                <div
                  class="room-swiper-button-prev i-mdi:arrow-left text-primary w-6 h-6 duration-300 hover:(text-white cursor-pointer)" />
                <div
                  class="room-swiper-button-next i-mdi:arrow-right text-primary w-6 h-6 duration-300 hover:(text-white cursor-pointer)" />
              </div>
            </div>
          </div>
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
  bottom: 50%;
  left: 2%;
  z-index: 20;

  @media (min-width: 640px) {
    bottom: 35%;
  }

  @media (min-width: 768px) {
    bottom: 33%;
  }

  @media (min-width: 1024px) {
    bottom: 5%;
    left: -22%;
  }

  @media (min-width: 1440px) {
    bottom: 5%;
    left: -25%;
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
  box-shadow: 5px 1px 8px rgb(94, 94, 94);
}

/* 活動分頁點的樣式 */
swiper-container::part(bullet-active) {
  width: 60px;
  height: 4px;
  background: #BF9D7D;
  border-radius: 4px;
}

/* 自定義導航按鈕樣式 */
swiper-container::part(navigation) {
  position: absolute;
  bottom: 90%;
  right: 100px;
  margin: 0;
}

swiper-container::part(button-prev) {
  opacity: 0 !important;
  width: 24px;
  height: 24px;
  color: #BF9D7D;
}

swiper-container::part(button-next) {
  opacity: 0 !important;
  width: 24px;
  height: 24px;
  color: #BF9D7D;
}
</style>
