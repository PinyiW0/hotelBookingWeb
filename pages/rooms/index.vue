<script setup lang="ts">
const api = useApi();

defineOptions({
  name: 'RoomIndex'
});
useSeoMeta({
  title: '客房旅宿頁',
  description: '客房旅宿頁',
});

/** 房間資訊 */
const roomList = ref<any[]>([]);
const getList = async () => {
  const { result = null } = await api.Rooms.Load();
  roomList.value = result.map((room: any) => ({
    ...room,
    roomInfoList: [
      { iconName: 'i-fluent:slide-size-24-filled', txt: room.areaInfo },
      { iconName: 'i-material-symbols:bed-rounded', txt: room.areaInfo },
      { iconName: 'i-material-symbols:person', txt: `${room.maxPeople}人` },
    ]
  }));
};
getList();

// #region Swiper
// 響應式高度，默認設置為空
const carouselHeight = ref<string>('');
const isDesktop = ref(false);

// 更新高度和設備類型
const updateResponsiveValues = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width >= 1280) carouselHeight.value = '457px';
    else if (width >= 768) carouselHeight.value = '280px';
    else carouselHeight.value = '200px';

    isDesktop.value = width >= 768;
  }
};

onMounted(() => {
  updateResponsiveValues(); // 初始化
  window.addEventListener('resize', updateResponsiveValues);
});

// 清理事件監聽器
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateResponsiveValues);
});
// #endregion Swiper
</script>

<template>
  <section class="flex flex-col justify-center">
    <!-- swiper area -->
    <ClientOnly>
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
        <!-- swiper -->
        <el-carousel arrow="never" :indicator-position="undefined"
          class="w-full !h-466px !sm:h-120 !md:h-150 !lg:h-160 !xl:h-200">
          <el-carousel-item v-for="idx in 4" :key="idx">
            <!-- 黑色透明遮罩 -->
            <div class="absolute top-0 left-0 w-full h-full bg-black/60" />
            <!-- 輪播圖 -->
            <img :src="`/images/Image/Room-${idx - 1}.png`" :alt="`room${idx}`" class="w-full h-full object-cover">
          </el-carousel-item>
        </el-carousel>
        <div
          class="absolute top-35% md:top-1/3 xl:top-60% 3xl:top-35% left-1/2 -translate-1/2 py-54 max-w-780px mx-auto flex flex-col xl:(top-1/3 flex-row gap-20) items-center gap-5">
          <CarouselTitle class="pt-4" />
          <h2 class="text-8 xl:(text-12 leading-25) text-white font-bold tracking-1 leading-15 whitespace-nowrap">客房旅宿
          </h2>
        </div>
      </div>
    </ClientOnly>

    <!-- 房型挑選 -->
    <div class="pt-120 md:pt-150 lg:pt-155 xl:pt-200 py-30 w-full bg-primary-10 flex justify-center">
      <div class="max-w-1296px px-3 flex flex-col items-center xl:(items-center justify-center) gap-20">
        <!-- title -->
        <div class="px-3 xl:px-0 w-full flex flex-col justify-center gap-4">
          <p class="text-3.5 xl:text-5 text-gray-80 font-bold">房型選擇</p>
          <h2 class="text-8 xl:text-12 text-primary font-bold">各種房型，任您挑選</h2>
        </div>
        <!-- card -->
        <div v-for="item in roomList" :key="item._id"
          class="px-3 w-full flex flex-col xl:(px-0 flex-row) items-center gap-12">
          <div
            class="w-full h-auto flex flex-col xl:(flex-row justify-center) items-center rounded-5 overflow-hidden bg-white">
            <!-- swiper -->
            <el-carousel :arrow="isDesktop ? 'always' : 'never'"
              class="w-full !h-50 !sm:h-70 !xl:(w-773px h-457px flex-1)">
              <el-carousel-item v-for="(img, idx) in item.imageUrlList" :key="idx">
                <img :src="img" :alt="item.name" class="w-full h-full xl:min-h-457px object-cover block">
              </el-carousel-item>
            </el-carousel>
            <div class="p-4 xl:(p-10 flex-1) flex flex-col gap-6">
              <!-- header -->
              <div class="flex flex-col gap-2">
                <h3 class="text-7 font-bold">{{ item.name }}</h3>
                <p class="text-3.5 xl:(text-5 leading-7) text-gray-80 leading-5">{{ item.description }}</p>
              </div>
              <!-- body -->
              <div class="w-full flex items-center justify-start gap-4">
                <div class="flex gap-4">
                  <RoomInfoCard v-for="(info, idx) in item.roomInfoList" :key="idx" :icon-name="info.iconName"
                    :txt="info.txt" />
                </div>
              </div>
              <div
                class="linePrimary w-319px 2xl:w-500px 3xl:w-636px h-2px rounded-full bg-gradient-to-r from-primary to-[#FFFFFF]">
              </div>
              <NuxtLink :to="`/rooms/${item._id}`" role="link"
                class="py-4 flex justify-between cursor-pointer decoration-none group">
                <p
                  class="text-4 xl:text-6 text-primary font-bold tracking-widest duration-300 group-hover:text-primary-120">
                  NT$ {{ item.price }}</p>
                <i
                  class="i-fluent:arrow-right-24-filled w-6 h-6 text-primary duration-300 group-hover:(text-primary-120 scale-120 translate-x-2)" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* 線條 自定義動畫 */
@layer utilities {
  @keyframes linePrimary {

    0%,
    100% {
      transform: scaleX(0.3);
      opacity: 10;
    }

    50% {
      transform: scaleX(1);
      opacity: 1;
    }
  }

  .linePrimary {
    animation: linePrimary 2.5s infinite ease-in-out;
    transform-origin: left;
  }
}

:deep(.el-carousel__arrow) {
  color: #4B4B4B;
  background-color: #FFF;

  &:hover {
    opacity: 0.7;
  }
}

:deep(.el-carousel__button) {
  background-color: #FFF;
  border-radius: 100px;
  height: 4px;
  opacity: 1;
}

:deep(.el-carousel__indicator.is-active button) {
  background-color: #BF9D7D;
  color: #BF9D7D;
}

:deep(.el-carousel__container) {
  height: 100% !important;
}

:deep(.el-carousel__indicators) {
  bottom: 24px !important;
  justify-content: center;
}
</style>