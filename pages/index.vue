<script setup lang="ts">
const counter = useCounterStore();
</script>

<template>
  <div>
    數字
    <div>{{ counter.count }}</div>
    <button @click="counter.increment()">Increment</button>
  </div>
</template>

<style scoped></style>
