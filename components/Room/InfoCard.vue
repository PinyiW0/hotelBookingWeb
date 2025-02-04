<script setup lang="ts">
defineProps({
  iconName:{
    type: String,
    required: true,
  },
  txt:{
    type: String,
    required: true,
  }
});
</script>

<template>
  <div class="px-4 py-5 w-97px h-97px flex flex-col gap-2 bg-white border-(px solid primary-40) rounded-2">
    <i :class="iconName" class="w-6 h-6 text-primary" />
    <p class="text-3.5 xl:text-4 text-gray-80 font-bold">{{ txt }}</p>
  </div>
</template>