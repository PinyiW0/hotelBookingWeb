<script setup lang="ts">
const headerBgColor = useState<string>('headerBgColor', () => 'bg-transparent');
</script>

<template>
  <section class="w-full overflow-x-hidden">
    <LayoutHeader :class="headerBgColor" /> 
      <NuxtPage />
    <LayoutFooter />
  </section>
</template>

<style scoped></style>
