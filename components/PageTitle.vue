<script setup lang="ts">
const props = defineProps({
  /** 標題 */
  title: {
    type: String,
    required: true,
  },
  /** 標題顏色 */
  color: {
    type: String,
    default: () => 'text-primary',
  },
  /** 是否顯示白色橫線 */
  showWhiteLine: {
    type: Boolean,
    default: false,
  },
  /** 漸層線位置調整 */
  linePositionRight: {
    type: Boolean,
    default: false,
  },
  /** 漸層線位置調整 */
  lineRradient: {
    type: Boolean,
    default: false,
  },
});

const splitTitle = computed(() => {
  return (str: string) => {
    return [str.slice(0, 2), str.slice(2)]
  };
});
</script>

<template>
  <div :class="[linePositionRight ? 'items-center gap-10': 'flex-col items-start' ]" class="relative pr-10 w-fit flex gap-1">
    <div class="flex flex-col items-start">
      <h2 :class="color" class="text-8 leading-9 md:(text-10 leading-11) xl:(text-12 leading-14) font-bold tracking-wide">
        {{ splitTitle(title)[0] }}</h2>
      <h2 :class="color" class="text-8 leading-9 md:(text-10 leading-11) xl:(text-12 leading-14) font-bold tracking-wide">
        {{ splitTitle(title)[1] }}</h2>
    </div>
    <div v-if="props.showWhiteLine"
      class="absolute left-1/6 md:left-1/2 top-1/2 translate-x-1/2 w-161px xl:w-165px h-2px rounded-full bg-white" />
    <div v-else :class="[linePositionRight && lineRradient ? 'bg-white' : 'animated-gradient bg-gradient-to-r from-[#BE9C7C] to-[#FFFFFF]']"
      class="h-2px rounded-full w-140px"></div>
  </div>
</template>

<style>
@keyframes gradient-flow {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.animated-gradient {
  background-size: 200% 200%;
  animation: gradient-flow 1.5s ease-in-out infinite;
}
</style>
