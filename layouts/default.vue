<script setup lang="ts">
const route = useRoute();
const headerBgColor = computed(() => {
  return route.meta.headerBgColor || 'bg-transparent';
});
</script>

<template>
  <section class="w-full overflow-x-hidden">
    <LayoutHeader :class="headerBgColor" /> 
      <NuxtPage />
    <LayoutFooter />
  </section>
  <GoTop />
</template>

<style scoped></style>
