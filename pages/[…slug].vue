<script lang="ts" setup>
useSeoMeta({
  title: "查無頁面",
  description: "404 Pages not found.",
  ogTitle: "查無頁面",
  ogDescription: "404 Pages not found.",
});
definePageMeta({
  layout: 'custom-error'
});
const route = useRoute() as any;
const event = useRequestEvent();
setResponseStatus(event, 404);
</script>

<template>
  <section class="w-full h-full p-8 box-border">
    
    <div
      class="w-full h-full flex flex-col items-center justify-center gap-4">
      <!-- <img src="/images/lazyImg/error-img.gif" alt="" /> -->
      <h1 class="font-mono">
        找不到{{ route.params.slug }}頁面！
      </h1>
      <!-- 『{{ route.params.slug.join("/") }}』 -->
      <a href="/"
        class="mt-6 py-1 px-2 text-3xl decoration-none text-black bg-white border-3 border-solid border-black rounded cursor-pointer duration-400 hover:bg-black hover:text-white">
        回首頁
      </a>
    </div>
  
  </section>
</template>
