<script setup lang="ts">
const isVisible = ref<boolean>(false);
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
const onScroll = () => {
  isVisible.value = window.scrollY > 80;
};
onMounted(() => {
  window.addEventListener('scroll', onScroll)
  onScroll();
});
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
});

</script>

<template>
  <transition name="fade">
    <button v-if="isVisible" @click="scrollToTop" title="回到最上方"
      class="z-30 fixed right-30px bottom-20 md:(right-55px bottom-25) flex flex-col items-end gap-4px bg-transparent border-0 cursor-pointer focus-visible:outline-#9E6B2D group">
      <div
        class="w-15 h-15 rounded-full border-t-(2px solid white) border-l-(1px solid white/50) border-r-(1px solid white/50) bg-gradient-to-b from-white/80 to-primary-120/70  duration-300 group-hover:bg-primary-60/80">
      </div>
      <p class="absolute top-3 left-1/2 -translate-x-1/2 text-4 text-white font-bold tracking-wider">TOP</p>
      <div class="i-bi:arrow-up absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 text-white text-center" />
    </button>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>