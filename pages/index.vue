<script setup lang="ts">
const api = useApi();

defineOptions({
  name: 'Index'
});
useSeoMeta({
  title: '首頁 - 高雄五星級豪華飯店｜尊爵雙人房、頂級餐飲、便捷交通',
  description: '享樂酒店位於高雄市中心，，提供多樣房型選擇、免費 Wi-Fi、美味餐點與高級設施，是您旅遊高雄的首選飯店。',
  ogTitle: '享樂酒店 - 高雄五星級豪華住宿推薦',
  ogDescription: '頂級住宿體驗，盡在享樂酒店。高雄熱門飯店推薦，立即預訂享樂酒店，體驗頂級住宿與在地美食，飯店設有豪華客房與專人接送服務。',
  ogImage: 'https://two025hotelbookingweb.onrender.com/images/Room-0.png',
  ogUrl: 'https://two025hotelbookingweb.onrender.com/',
});

// #region === 資料 ===
const isLoading = ref(false);
const newsList = ref<any[]>([]);
const roomsList = ref<any[]>([]);
const foodList = ref<any[]>([]);

/** 關於我們 */
const aboutContent: any[] = [
  { label: '享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。<br />我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。 ' },
  { label: '我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。<br />我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。 ' },
  { label: '在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。 ' },
  { label: '享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。' },
];
/** 交通方式 */
const trafficInfo: any[] = [
  { title: '自行開車', content: '如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。', icon: 'i-mdi:car' },
  { title: '高鐵/火車', content: '如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約 20 分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約 10 分鐘便可抵達。', icon: 'i-material-symbols:train' },
  { title: '禮賓車服務', content: '享樂酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線： ( 07 ) 123-4567', icon: 'i-mdi:car-hatchback' },
];
// #endregion === 資料 ===

// #region === Method ===
/** 最新消息 */
const getNewsList = async () => {
  const { result = null } = await api.News.Load();
  newsList.value = result;
};

/** 房型 */
const getRoomsList = async () => {
  const { result = null } = await api.Rooms.Load();
  roomsList.value = result;
};

/** 美味佳餚 */
const getFoodList = async () => {
  const { result = null } = await api.Culinary.Load();
  foodList.value = result;
};

/** 確認資料載入後關閉載入畫面 */
const loadData = async () => {
  isLoading.value = true;
  await Promise.allSettled([getNewsList(), getRoomsList(), getFoodList()]).finally(() => isLoading.value = false);
};
// #endregion === Method ===

onMounted(() => {
  loadData();
});
</script>

<template>
  <section class="flex flex-col justify-center">
    <SuccessLoading :isShow="isLoading">
      <p class="text-6 font-bold tracking-wider">努力加載畫面中</p>
    </SuccessLoading>
    <!-- swiper area -->
    <ClientOnly>
      <div class="absolute top-0 left-0 w-full h-fit overflow-hidden">
        <!-- swiper -->
        <el-carousel arrow="never" :indicator-position="undefined"
          class="w-full !h-210 !md:h-200 !lg:h-180 !xl:h-200 !2xl:h-220 !3xl:h-270">
          <el-carousel-item v-for="(slide, idx) in 4" :key="idx">
            <!-- 黑色透明遮罩 -->
            <div class="absolute top-0 left-0 w-full h-full bg-black/60" />
            <!-- 輪播圖 -->
            <img :src="`/images/Image/Room-${idx}.png`" :alt="`享樂酒店豪華房型展示圖 ${idx + 1}`" width="100%" height="100%"
              class="object-cover">
          </el-carousel-item>
        </el-carousel>
        <div
          class="absolute top-46% md:top-48% left-1/2 -translate-1/2 max-w-780px mx-auto flex flex-col lg:top-50% xl:(left-1/2 max-w-1024px flex-row gap-20 justify-between) 2xl:(max-w-1280px top-52%) 3xl:(max-w-1760px top-50% left-45%) items-center gap-5">
          <div
            class="relative w-full flex flex-col items-center justify-center gap-20 md:gap-16 lg:(flex-row gap-12) 3xl:gap-15">
            <!-- 副標題 -->
            <CarouselTitle class="pt-4" />
            <!-- 主標題 -->
            <div class="relative px-6.5 pt-5 3xl:w-fit flex-shrink-0 flex flex-col gap-2 self-stretch">
              <h2 class="text-12 xl:(text-16 leading-25) 3xl:text-20 text-white font-bold tracking-1 leading-15">高雄</h2>
              <h2 class="text-12 xl:(text-16 tracking-1) 3xl:text-20 text-white font-bold whitespace-nowrap">豪華住宿之選</h2>
              <h2
                class="mt-4 text-base w-full lg:(w-90% leading-6) xl:(text-6 w-full leading-12) 3xl:text-8 text-white font-600">
                我們致力於為您提供無與倫比的奢華體驗與優質服務
              </h2>
              <HeroBtn to='/rooms' text="立即訂房" class="mt-10 mr-9 lg:(mr-0 mt-4) 2xl:mt-13" />
              <!-- 主標題背景圖 -->
              <div
                class="absolute -z-1 w-291px h-420px top-0 right-5px rounded-10 md:(w-310px h-400px) lg:(w-400px h-380px -top-5 -right-6 rounded-20) xl:(w-580px h-420px top-0 -right-8) 2xl:(w-640px h-490px top-60 -right-105 -translate-1/2) 3xl:(w-900px h-678px top-1/2 -right-155) border-t-(px solid #F5F7F9) border-r-(px solid #F5F7F9) bg-gradient-to-t from-white/30 to-white-0 backdrop-blur-20">
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
    <!-- news area -->
    <div
      class="pt-180 md:(pt-190 px-20) lg:(pt-140 px-40) xl:(pt-160 px-0) 2xl:pt-190 3xl:pt-240 px-3 w-full bg-primary-10">
      <div class="mx-auto py-20 max-w-1296px flex flex-col gap-10 xl:(flex-row gap-20)">
        <!-- title -->
        <PageTitle title="最新消息" />
        <!-- content -->
        <ul class="w-full flex flex-col items-center gap-10">
          <li v-for="item in newsList" :key="item._id"
            class="flex flex-col items-center justify-center gap-8 xl:flex-row hover:cursor-pointer group">
            <div class="w-full h-294px md:h-380px xl:(w-474px h-294px) rounded-2 overflow-hidden flex-shrink-0">
              <img :src="item.image" :alt="item.title"
                class="w-full h-full object-cover duration-400 group-hover:(scale-110 filter-grayscale)">
            </div>
            <div class="flex flex-col gap-8">
              <h3 class="text-7 lg:text-8 font-bold tracking-2px duration-300 group-hover:text-primary">{{ item.title }}
              </h3>
              <p class="text-3.5 lg:text-base text-gray-80 leading-6">{{ item.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- About Us -->
    <div class="relative py-20 xl:pt-50 xl:pb-50 w-full bg-gray-120">
      <!-- BG -->
      <div class="absolute w-full h-594px xl:h-672px xl:top-20 overflow-hidden">
        <img src="/images/About-BG.png" aria-hidden width="100%" height="100%" class="object-cover object-center">
      </div>
      <div class="relative mt-10 pl-10 pr-5 max-w-1296px ml-auto xl:px-0 ">
        <ClientOnly>
          <DotSquire class="absolute z-20 -top-70 -left-80" />
        </ClientOnly>
        <!-- CONTENT -->
        <div
          class="max-w-1044px mx-auto bg-gradient-to-b from-gray-120/80 to-#BE9C7C/80 backdrop-blur rounded-t-10 rounded-lb-10 border-b-(px solid #F5F7F9) border-l-(px solid #F5F7F9)">
          <div class="p-8 flex flex-col gap-10 xl:p-20">
            <PageTitle title="關於我們" color="text-white" :showWhiteLine="true" />
            <div class="flex flex-col gap-4 xl:mt-10">
              <p v-for="(i, idx) in aboutContent" :key="`about-${idx}`"
                class="text-3.5 xl:text-base text-white leading-6" v-html="i.label"></p>
            </div>
          </div>
        </div>
        <div class="z-10 absolute -bottom-40 left-0 -translate-1/2 xxl:-bottom-0 w-full overflow-visible">
          <Wave />
        </div>
      </div>
    </div>
    <!-- 房型 swiper -->
    <div class="relative py-20 md:pt-35 w-full h-full bg-gray-120">
      <div class="z-5 absolute top-70 -right-100 xl:top-110 xxl:(top-150) w-full overflow-visible scale-x-[-1]">
        <Wave />
      </div>
      <RoomCarousel :slideList="roomsList" class="px-3 lg:px-0" />
    </div>
    <!-- 佳餚美饌 -->
    <div class="relative py-20 xl:py-30 w-full h-full flex flex-col justify-start bg-primary-10">
      <img src="/images/deco/Line2.png" aria-hidden
        class="hidden 2xl:(block max-w-180px) absolute top-10 left-15 3xl:max-w-187px">
      <div class="px-3 xl:(pl-80 pr-0) mx-auto flex flex-col gap-10">
        <PageTitle title="佳餚美饌" :linePositionRight="true" />
        <ClientOnly>
          <FoodCarousel :slideList="foodList" />
        </ClientOnly>
      </div>
    </div>
    <!-- 交通方式 -->
    <div class="pt-20 w-full bg-gray-120">
      <div class="px-3 xl:(px-5 gap-20) 2xl:px-0 mx-auto max-w-1296px flex flex-col gap-10">
        <PageTitle title="交通方式" :linePositionRight="true" />
        <div class="flex flex-col gap-8 xl:gap-10">
          <!-- map -->
          <div class="flex flex-col gap-4">
            <p class="text-base text-white font-600">台灣高雄市新興區六角路123號</p>
            <div class="w-full max-h-90 rounded-2 overflow-hidden">
              <img src="/images/Map.png" alt="台灣高雄市新興區六角路123號" width="100%" height="100%" class="object-left">
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
        <img src="/images/deco/Line.png" aria-hidden width="100%" class="w-full min-h-30 object-cover">
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.el-carousel__indicator.is-active button) {
  background-color: #BF9D7D;
  color: #BF9D7D;
}

:deep(.el-carousel__container) {
  height: 100% !important;
}

:deep(.el-carousel__indicators) {
  bottom: 20px !important;
}

@media (min-width: 768px) {
  :deep(.el-carousel__indicators) {
    bottom: 20px !important;
  }
}

@media (min-width: 1024px) {
  :deep(.el-carousel__indicators) {
    bottom: 24px !important;
  }
}

@media (min-width: 1280px) {
  :deep(.el-carousel__indicators) {
    bottom: 40px !important;
  }
}

@media (min-width: 1440px) {
  :deep(.el-carousel__indicators) {
    bottom: 24px !important;
    justify-content: center;
  }
}
</style>