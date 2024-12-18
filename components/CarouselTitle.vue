<template>
  <div class="flex flex-col items-center justify-center gap-5 xl:(items-start justify-start gap-10)">
    <div class="flex flex-col items-center justify-center gap-2 xl:(items-start)">
      <h2 class="text-7 text-primary font-bold tracking-wider xl:text-8 3xl:text-10">享樂酒店</h2>
      <h3 class="text-base text-primary font-bold tracking-wider xl:text-6 3xl:text-2xl">Enjoyment Luxury Hotel</h3>
    </div>
    <div class="animated-gradient vertical xl:hidden w-2px h-83px rounded-full bg-gradient-to-b from-primary to-[#FFFFFF]"></div>
    <div class="animated-gradient horizontal hidden xl:(block w-420px) 2xl:w-500px 3xl:w-636px h-2px rounded-full bg-gradient-to-r from-primary to-[#FFFFFF]"></div>
  </div>
</template>

<style lang="scss">
@keyframes gradient-flow {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.animated-gradient {
  background-size: 200% 200%;
  animation: gradient-flow 1.5s ease-in-out infinite;

  &.horizontal {
    background-position: 0% 50%;
  }

  &.vertical {
    background-position: 50% 0%;
  }
}
</style>
