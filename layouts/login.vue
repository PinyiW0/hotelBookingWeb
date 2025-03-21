<script setup lang="ts">
const loading = useState<boolean>('loading', () => false);
  onMounted(() => {
  loading.value = true;
  nextTick(() => {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  });
});
</script>

<template>
  <div class="w-full overflow-x-hidden bg-gray-120">
    <SuccessLoading :isShow="loading" />
    <LoginHeader />
    <NuxtPage class="min-h-[calc(100vh-72px)] lg:min-h-[calc(100vh-160px)]" />
  </div>
</template>