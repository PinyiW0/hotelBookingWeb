<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  titleSize: {
    type: String,
    default: () => 'text-4 xl:text-6'
  },
  decoBg: {
    type: String,
    default: () => 'bg-primary'
  }
})
</script>

<template>
  <div class="flex items-center gap-3">
    <div :class="decoBg" class="w-1 h-6 rounded-full" />
    <div class="flex items-center">
      <h3 :class="titleSize" class="font-bold">{{ title }}</h3>
      <slot />
    </div>
  </div>
</template>
