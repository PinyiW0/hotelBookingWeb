<script setup lang="ts">
defineProps({
  slideList: {
    type: Array,
    requied: true
  } as any
});
</script>

<template>
  <div class="w-full">
    <ClientOnly>
      <swiper-container :slides-per-view="1" :pagination="false" autoplay-delay="15000" effect="slide" :breakpoints="{
        0: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        1280: { slidesPerView: 4 }
      }" :space-between="24" class="w-full overflow-visible">
        <swiper-slide v-for="(slide, idx) in slideList" :key="idx" class="max-w-75 xl:max-w-104">
          <div class="relative w-full h-full rounded-2 overflow-hidden">
            <img :src="`${slide.image}`" :alt="slide.title" class="w-full h-full object-cover">
            <!-- 黑色透明遮罩 -->
            <div
              class="absolute bottom-0 left-0 w-full h-182px bg-gradient-to-t from-gray-40/40 to-white/0 backdrop-blur">
              <div class="p-4 flex flex-col gap-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-6 text-white font-bold">{{ slide.title }}</h3>
                  <p class="text-3.5 text-white font-bold">{{ slide.diningTime }}</p>
                </div>
                <p class="text-3.5 text-white leading-5 tracking-wide">{{ slide.description }}</p>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </div>
</template>
