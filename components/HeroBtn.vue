<script lang="ts" setup>
const props = defineProps({
  to: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    required: true
  }
});

// 按鈕樣式
const btnBaseCls =
  "p-5 md:p-7 2xl:p-10 max-w-772px flex items-center justify-end gap-2 text-2xl font-bold tracking-widest bg-white rounded-2 border-0 relative decoration-none cursor-pointer transition-all duration-400 group";
const btnHoverCls = "hover:(bg-primary text-white)";
const btnDisabledCls = "disabled:(opacity-60 pointer-events-none)";

// 標記是否為外部連結
const isExternal: any = computed(() => props.to && props.to.indexOf('http') > -1);

// 是網頁連結時另開分頁
const setTarget = computed(() => {
  return (props.to && props.to.indexOf('http') > -1) ? '_blank' : '_self';
});
</script>

<template>
  <NuxtLink v-if="to" :to="to" :external="isExternal" :target="setTarget"
    :class="[btnBaseCls, btnHoverCls, btnDisabledCls]"
    class="flex items-center justify-center decoration-none cursor-pointer duration-400">
    <p class="text-base lg:text-5 xl:text-6">{{ text }}</p>
      <div class="linePrimary h-1px w-20 xl:w-150px bg-black duration-400 transition-transform group-hover:bg-white"></div>
  </NuxtLink>
  <button v-else :aria-label="text" :class="[btnBaseCls, btnHoverCls, btnDisabledCls]" :disabled="disabled">
    <p class="text-base lg:text-5 xl:text-6">{{ text }}</p>
    <div class="linePrimary h-1px w-20 xl:w-150px bg-black duration-400 transition-transform group-hover:bg-white"></div>
  </button>

</template>

<style>
/* 線條 自定義動畫 */
@layer utilities {
  @keyframes linePrimary {
    0%,
    100% {
      transform: scaleX(0.3);
      opacity: 10;
    }

    50% {
      transform: scaleX(1);
      opacity: 1;
    }
  }

  .linePrimary {
    animation: linePrimary 2.5s infinite ease-in-out;
    transform-origin: left;
  }
}
</style>