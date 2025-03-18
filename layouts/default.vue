<script setup lang="ts">
const route = useRoute();
const headerBgColor = computed(() => {
  return route.meta.headerBgColor || 'bg-transparent';
});
const loading = useState<boolean>('loading', () => false);
</script>

<template>
  <div>
    <SuccessLoading :isShow="loading" />
    <section class="w-full overflow-x-hidden">
      <LayoutHeader :class="headerBgColor" />
      <NuxtPage />
      <LayoutFooter />
    </section>
    <GoTop />
  </div>
</template>