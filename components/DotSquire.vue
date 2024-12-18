<template>
  <!-- <ClientOnly> -->
    <div class="rotate-animation w-25 h-25 grid grid-cols-11 gap-2">
      <div class="w-2px h-2px bg-primary-60 rounded-full" v-for="i in 132" :key="i"></div>
    </div>
  <!-- </ClientOnly> -->
</template>

<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.rotate-animation {
  animation: rotate 16s linear infinite;
}
</style>