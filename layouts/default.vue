<script setup lang="ts">
const route = useRoute();
const headerBgColor = computed(() => {
  return route.meta.headerBgColor || 'bg-transparent';
});
</script>

<template>
  <div>
    <section class="w-full overflow-x-hidden">
      <LayoutHeader :class="headerBgColor" />
      <NuxtPage />
      <LayoutFooter />
    </section>
    <GoTop />
  </div>
</template>

<style scoped></style>
