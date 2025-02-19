<script setup lang="ts">
const props = defineProps({
  isShow: {
    type: Boolean,
  },
});
watch(
  () => props.isShow,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="isShow" class="fixed inset-0 z-80 flex items-center justify-center bg-black/40 backdrop-blur-5">
        <div class="px-3 mt-20 lg:(mt-0 w-70%) w-full h-80%">
          <div class="py-36 h-100% flex flex-col items-center justify-center gap-15 bg-white rounded-5">
            <div class="loader" />
            <div class="flex flex-col items-center gap-4">
              <img src="/images/LOGO-pri.svg" alt="享樂酒店logo" width="144px">
              <slot />
            </div>

          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.loader {
  width: 12px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;
}

@keyframes l5 {
  0% {
    box-shadow: 28px 0 #000, -28px 0 #0002;
    background: #000
  }

  33% {
    box-shadow: 28px 0 #000, -28px 0 #0002;
    background: #0002
  }

  66% {
    box-shadow: 28px 0 #0002, -28px 0 #000;
    background: #0002
  }

  100% {
    box-shadow: 28px 0 #0002, -28px 0 #000;
    background: #000
  }
}
</style>