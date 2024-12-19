<script setup lang="ts">
import { Navigation, Pagination } from 'swiper/modules';
const bannerList: any[] = [
  { name: '尊爵雙人房', description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。', price: 10000, imageUrl: 'Room0.png', _id: '675553f61b4a0d104e7400ea' },
  { name: '景觀雙人房', description: '景觀雙人房擁有絕美的高雄市景觀，讓您在舒適的環境中欣賞城市之美。', price: 15000, imageUrl: 'Room1.png', _id: '675554eb1b4a0d104e7400f1' },
  { name: '豪華雅緻房', description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。', price: 18000, imageUrl: 'Room0.png', _id: '6755550b1b4a0d104e7400f4' },
  { name: '景觀尊榮家庭房', description: '景觀雙人房擁有絕美的高雄市景觀，讓您在舒適的環境中欣賞城市之美。', price: 22000, imageUrl: 'Room1.png', _id: '6755552d1b4a0d104e7400f7' },
];
</script>

<template>
  <div class="w-full">
    <ClientOnly>
      <swiper-container slides-per-view="1" pagination-enabled="true" pagination-clickable="true"
        pagination-hide-on-click="false" :navigation="{ nextEl: '.room-swiper-button-next', prevEl: '.room-swiper-button-prev' }"
        loop="true" autoplay-delay="5000" effect="fade" class="">
        
        <swiper-slide v-for="slide in bannerList" :key="slide.id" class="bg-gray-120 relative">
          <!-- deco -->
          <img src="/images/deco/room-line-web.png" aria-hidden class="absolute top-6 right-0 z-1 hidden xl:block w-1060px h187px">
          <div class="flex flex-col item-center gap-6 lg:(flex-row items-end gap-16)">
            <!-- img -->
            <div class="w-full lg:max-w-600px xl:max-w-900px rounded-r-2 overflow-hidden">
              <img :src="`/images/image/${slide.imageUrl}`" :alt="slide.name" class="w-full h-full object-cover">
            </div>
            <!-- content -->
            <div class="2xl:w-628px flex flex-col gap-2 lg:(gap-4) bg-[url(/images/image/waveBG.png)] bg-(no-repeat cover top)">
              <h3 class="text-7 text-white font-bold">{{ slide.name }}</h3>
              <p class="text-sm text-white">{{ slide.description }}</p>
              <p class="mt-4 lg:mt-6 text-6 text-white font-bold tracking-widest">NT$ {{ slide.price }}</p>
              <!-- btn -->
              <HeroBtn text="查看更多" class="lg:mt-6" />
              <div class="mt-6 p-4 flex items-center justify-end gap-8">
                <div class="room-swiper-button-prev i-mdi:arrow-left text-primary w-6 h-6 duration-300 hover:(text-white cursor-pointer)" />
                <div class="room-swiper-button-next i-mdi:arrow-right text-primary w-6 h-6 duration-300 hover:(text-white cursor-pointer)" />
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
  padding-bottom: 250px;
  z-index: 60;
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
</style>
