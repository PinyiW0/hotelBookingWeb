<script lang="ts" setup>
</script>

<template>
  <svg class="w-full h-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 24 360 32" preserveAspectRatio="none">
    <defs>
      <!-- 漸層定義：第一層 -->
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ECDA9A" />
        <stop offset="100%" stop-color="#ECDA9A" stop-opacity="0" />
      </linearGradient>
      <!-- 漸層定義：第二層 -->
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#F1EAE4" />
        <stop offset="100%" stop-color="#F1EAE4" stop-opacity="0" />
      </linearGradient>
      <!-- 漸層定義：第三層 -->
      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FAF7F5" />
        <stop offset="100%" stop-color="#FAF7F5" stop-opacity="0" />
      </linearGradient>
      <!-- 波浪形狀 -->
      <path id="gentle-wave" d="M-160 44c30 0 
               58-18 88-18s58 18 88 18 
               58-18 88-18 58 18 88 18
               v44h-352z" />
    </defs>
    <g class="parallax">
      <use xlink:href="#gentle-wave" x="0" y="6" fill="none" stroke="url(#gradient1)" stroke-width=".2" />
      <use xlink:href="#gentle-wave" x="25" y="3" fill="none" stroke="url(#gradient2)" stroke-width=".2" />
      <use xlink:href="#gentle-wave" x="50" y="8" fill="none" stroke="url(#gradient3)" stroke-width=".2" />
    </g>
  </svg>
</template>

<style scoped>
/* 線條左至右波浪 */
.parallax use {
  animation: move-forever 8s linear infinite;
}

.parallax use:nth-child(1) {
  animation-delay: 0s;
}

.parallax use:nth-child(2) {
  animation-delay: -2s;
}

.parallax use:nth-child(3) {
  animation-delay: -4s;
}

@keyframes move-forever {
  0% {
    transform: translate(-90px, 0);
  }

  25% {
    transform: translate(-46px, -5px);
  }

  50% {
    transform: translate(-2px, 0);
  }

  75% {
    transform: translate(42px, 5px);
  }

  100% {
    transform: translate(85px, 0);
  }
}
</style>