<script setup lang="ts">
defineProps({
  title:{
    type: String,
    required: true,
  }
});
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="i-mdi:check w-6 h-6 text-primary" />
    <p class="text-3.5 xl:text-4 text-gray-80 font-bold">{{ title }}</p>
  </div>
</template>