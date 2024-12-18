<script setup lang="ts">
import FoodCarousel from '~/components/FoodCarousel.vue';

defineOptions({
  name: 'Index'
});
useSeoMeta({
  title: '享樂酒店 ｜ 首頁',
  description: '首頁',
});
const aboutContent: any[] = [
  { label: '享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。<br />我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。 ' },
  { label: '我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。<br />我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。 ' },
  { label: '在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。 ' },
  { label: '享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。' },
];
const trafficInfo: any[] = [
  { title: '自行開車', content: '如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。', icon: 'i-mdi:car' },
  { title: '高鐵/火車', content: '如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約20分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約10分鐘便可抵達。', icon: 'i-material-symbols:train' },
  { title: '禮賓車服務', content: '承億酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567', icon: 'i-mdi:car-hatchback' },
];
const roomImg: any[] = [
  { path: '/image/Room-1.png' },
  { path: '/image/Room-1.png' },
  { path: '/image/Room-1.png' },
  { path: '/image/Room-1.png' },
];


</script>

<template>
  <div>
    <!-- swiper area -->
    <ClientOnly>
      <div class="w-full">
        <Carousel class="absolute top-0 left-0 -z-1" />
        <div
          class="relative px-5 pt-10 lg:pt-0 3xl:pt-19 pb-38 flex flex-col items-center gap-10 xl:(px-20 flex-row gap-0) justify-between">
          <CarouselTitle />
          <div
            class="absolute top-1/3 xl:(top-1/8 right-1/6 px-0 pt-0) 3xl:(top-1/5 right-1/6) z-1 px-6.5 pt-5 flex flex-col gap-2">
            <h2 class="text-12 xl:(text-16 leading-25) 3xl:text-20 text-white font-bold tracking-1 leading-15">高雄</h2>
            <h2 class="text-12 xl:(text-16 tracking-1) 3xl:text-20 text-white font-bold">豪華住宿之選</h2>
            <h2 class="mt-4 text-base xl:(text-6 w-full) 3xl:text-8 text-white font-600 w-90%">我們致力於為您提供無與倫比的奢華體驗與優質服務
            </h2>
            <HeroBtn text="立即訂房" class="mt-10 mr-9 lg:mr-0 2xl:mt-13" />
          </div>
          <div
            class="min-w-291px min-h-420px sm:(w-320px h-430px) xl:(w-650px h-440px rounded-20) 2xl:(w-680px h-490px) 3xl:(w-924px h-678px) border-t-(px solid #F5F7F9) border-r-(px solid #F5F7F9) rounded-10 sm:rounded-15 bg-gradient-to-t from-white/30 to-white-0 backdrop-blur-20">
          </div>
        </div>

      </div>
    </ClientOnly>
    <!-- news area -->
    <div class="px-3 w-full bg-primary-10">
      <div class="mx-auto py-20 max-w-1296px flex flex-col gap-10 xl:(flex-row gap-20)">
        <!-- title -->
        <PageTitle title="最新消息" />
        <!-- content -->
        <ul class="flex flex-col items-center gap-10">
          <li class="flex flex-col items-center justify-center gap-8 xl:flex-row hover:cursor-pointer group">
            <img src="/images/image/news.png" alt=""
              class="w-full max-h-294px md:max-h-340 xl:max-h-294px object-cover rounded-2">
            <div class="flex flex-col gap-8">
              <h3 class="text-7 lg:text-8 font-bold tracking-2px duration-300 group-hover:text-primary">秋季旅遊，豪華享受方案</h3>
              <p class="text-3.5 lg:text-base text-gray-80 leading-6">
                秋天就是要來場豪華的旅遊！我們為您準備了一系列的秋季特別方案，包括舒適的住宿、美食饗宴，以及精彩的活動。不論您是想來一趟浪漫之旅，還是想和家人共度美好時光，都能在這裡找到最適合的方案。</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- About Us -->
    <div class="relative py-20 xl:pt-50 xl:pb-50 w-full bg-gray-120">
      <!-- BG -->
      <div class="absolute w-full h-594px xl:h-672px xl:top-20 overflow-hidden">
        <img src="/images/About-BG.png" alt="About-BG" class="w-full h-full object-cover object-center">
      </div>
      <div class="relative mt-10 pl-10 pr-5 max-w-1296px ml-auto xl:px-0">
        <ClientOnly>
          <DotSquire class="absolute z-20 -top-70 -left-80" />
        </ClientOnly>
        <!-- CONTENT -->
        <div
          class="max-w-1044px bg-gradient-to-b from-gray-120/80 to-#BE9C7C/80 backdrop-blur rounded-t-10 rounded-lb-10 border-b-(px solid #F5F7F9) border-l-(px solid #F5F7F9)">
          <div class="p-8 flex flex-col gap-10 xl:p-20">
            <PageTitle title="關於我們" color="text-white" :showWhiteLine="true" />
            <div class="flex flex-col gap-4 xl:mt-10">
              <p v-for="(i, idx) in aboutContent" :key="`about-${idx}`"
                class="text-3.5 xl:text-base text-white leading-6" v-html="i.label"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 佳餚美饌 -->
    <div class="relative py-20 xl:py-30 w-full h-full flex flex-col justify-start bg-primary-10">
      <img src="/images/Deco/Line2.png" alt="直線"
        class="hidden 2xl:(block max-w-180px) absolute top-10 left-15 3xl:max-w-187px">
      <div class="px-3 xl:(pl-80 pr-0) mx-auto flex flex-col gap-10">
        <PageTitle title="佳餚美饌" :linePositionRight="true" />
        <ClientOnly>
          <FoodCarousel />
        </ClientOnly>
      </div>
    </div>

    <!-- 交通方式 -->
    <div class="pt-20 w-full bg-gray-120">
      <div class="px-3 xl:px-0 mx-auto max-w-1296px flex flex-col gap-10 xl:gap-20">
        <PageTitle title="交通方式" :linePositionRight="true" />
        <div class="flex flex-col gap-8 xl:gap-10">
          <!-- map -->
          <div class="flex flex-col gap-4">
            <p class="text-base text-white font-600">台灣高雄市新興區六角路123號</p>
            <div class="w-full max-h-90 rounded-2 overflow-hidden">
              <img src="/images/Map.png" alt="台灣高雄市新興區六角路123號" class="object-left">
            </div>
          </div>
          <!-- trafficInfo -->
          <ul class="grid grid-cols-1 gap-8 xl:grid-cols-3">
            <li v-for="(i, idx) in trafficInfo" :key="`traffic-${idx}`">
              <div class="flex flex-col gap-1">
                <i :class="`${i.icon} w-12 h-12 text-primary xl:w-20 xl:h-20`" />
                <h3 class="text-base xl:text-2xl text-white font-600">{{ i.title }}</h3>
                <p class="text-3.5 xl:text-base text-white leading-5">{{ i.content }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-10 md:mt-15 xl:mt-20 w-full overflow-x-hidden">
        <img src="/images/deco/Line.png" alt="線條" class="w-full min-h-30 object-cover">
      </div>
    </div>
  </div>
</template>

<style scoped></style>
