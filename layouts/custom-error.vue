<script setup lang="ts">
const loading = useState<boolean>('loading', () => false);
</script>

<template>
  <div>
    <SuccessLoading :isShow="loading" />
    Layout: custom-error
    <slot />
  </div>
</template>

<style scoped></style>
