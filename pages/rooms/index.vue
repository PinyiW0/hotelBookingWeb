<script setup lang="ts">
const api = useApi();
defineOptions({
  name: 'RoomIndex'
});
useSeoMeta({
  title: '客房旅宿頁',
  description: '客房旅宿頁',
});
</script>

<template>
  <section>
    <!-- swiper area -->
    <ClientOnly>
      <div class="w-full h-full overflow-x-hidden overflow-y-visible">
        <Carousel class="absolute top-0 left-0 z-1 3xl:-z-1" />
        <div
          class="py-54 max-w-780px mx-auto flex items-center gap-20">
          <CarouselTitle class="pt-4"/>
          <h2 class="text-8 xl:(text-12 leading-25) text-white font-bold tracking-1 leading-15 whitespace-nowrap">客房旅宿</h2>
        </div>
      </div>
    </ClientOnly>
    <!-- 房型挑選 -->
     <div class="py-30 w-full bg-primary-10">
       <div class="max-w-1296px flex flex-col items-center gap-20">
        <!-- title -->
        <div class="px-3 flex flex-col gap-4">
          <p class="text-3.5 xl:text-5 text-gray-80 font-bold">房型選擇</p>
          <h2 class="text-8 xl:text-12 text-primary font-bold">各種房型，任您挑選</h2>
        </div>
        <!-- card -->
         <div class="px-3 w-full flex flex-col xl:(flex-row justify-center) items-center gap-12">
          <div class="flex flex-col items-center rounded-5 overflow-hidden bg-white cursor-pointer duration-300 hover:opacity-70">
            <!-- swiper -->
             <div class="w-full h-200px bg-primary">swiper佔位</div>
             <div class="p-4 flex flex-col gap-6">
              <!-- header -->
              <div class="flex flex-col gap-2">
                <h3 class="text-7 font-bold">尊爵雙人房</h3>
                <p class="text-3.5 xl:text-5 text-gray-80 leading-5">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
              </div>
              <!-- body -->
               <div class="w-full flex items-center justify-center gap-4">
                <!-- TODO:切成元件 -->
                <div class="px-4 py-5 w-97px h-97px flex flex-col gap-2 bg-white border-(px solid primary-40) rounded-2">
                  <i class="i-fluent:slide-size-24-filled w-6 h-6 text-primary" />
                  <p class="text-3.5 xl:text-5 text-gray-80 font-bold">24 坪</p>
                </div>
                <div class="px-4 py-5 w-97px h-97px flex flex-col gap-2 bg-white border-(px solid primary-40) rounded-2">
                  <i class="i-fluent:slide-size-24-filled w-6 h-6 text-primary " />
                  <p class="text-3.5 xl:text-5 text-gray-80 font-bold">24 坪</p>
                </div>
                <div class="px-4 py-5 w-97px h-97px flex flex-col gap-2 bg-white border-(px solid primary-40) rounded-2">
                  <i class="i-fluent:slide-size-24-filled w-6 h-6 text-primary " />
                  <p class="text-3.5 xl:text-5 text-gray-80 font-bold">24 坪</p>
                </div>
               </div>
               <div class="w-319px 2xl:w-500px 3xl:w-636px h-2px rounded-full bg-gradient-to-r from-primary to-[#FFFFFF]"></div>
              <!-- footer TODO:改成 nuxtlink -->
               <div class="py-4 flex justify-between">
                <p class="text-4 xl:text-6 text-primary font-bold tracking-widest">NT$ 10,000</p>
                <i class="i-fluent:arrow-right-24-filled w-6 h-6 text-primary cursor-pointer duration-300 hover:text-primary-120" />
               </div>
             </div>
          </div>
         </div>
       </div>
     </div>
  </section>
</template>

<style scoped></style>
