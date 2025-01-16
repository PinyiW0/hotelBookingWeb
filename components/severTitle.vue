<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="w-1 h-6 bg-primary rounded-full" />
    <h3 class="text-4 xl:text-6 font-bold">{{ title }}</h3>
  </div>
</template>

<style lang="scss" scoped></style>