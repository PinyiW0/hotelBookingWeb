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
  },
  btnStyle: {
    type: String,
  },
  imgIcon: {
    type: String,
    default: () => '',
  },
  iconWidth: {
    type: String
  }
});

const btnCls = computed(() => {
  let type = '';
  switch (props.btnStyle) {
    case 'secondary':
      type = 'px-8 py-4 text-base text-primary bg-white rounded-2 border-(px solid primary) hover:(text-primary-120 border-primary-120 bg-primary-10)';
      break;
    case 'ghost':
      type = 'px-8 py-4 text-base text-white border-0 bg-transparent hover:text-primary';
      break;
    case 'onlyText':
      type = 'text-base text-primary border-0 bg-transparent border-b-(px solid primary) hover:(text-primary-120 border-primary-120)';
      break;

    default:
      type = 'px-8 py-4 w-full text-base text-white bg-primary rounded-2 border-0 hover:bg-primary-120'
      break;
  }
  if (props.disabled) {
    type += ' !text-gray-60 pointer-events-none !bg-gray-40 !border-gray-40';
  }
  return type;
});

// 標記是否為外部連結
const isExternal: any = computed(() => props.to && props.to.indexOf('http') > -1);
// 是網頁連結時另開分頁
const setTarget = computed(() => {
  return (props.to && props.to.indexOf('http') > -1) ? '_blank' : '_self';
});
const emit = defineEmits(['click']);
</script>

<template>
  <NuxtLink v-if="to" :to="to" :external="isExternal" :target="setTarget" :class="btnCls"
    class="flex items-center justify-center decoration-none cursor-pointer duration-400">
    <p>{{ text }}</p>
    <img v-if="imgIcon" :src="`/images/icon/${imgIcon}.svg`" :alt="text" :class="iconWidth">
  </NuxtLink>
  <button v-else @click="$emit('click')" :aria-label="text" :disabled="props.disabled" :class="btnCls" type="button"
    class="w-fit flex items-center justify-center gap-1 decoration-none cursor-pointer duration-400">
    <p class="font-bold whitespace-nowrap">{{ text }}</p>
    <img v-if="imgIcon" :src="`/images/icon/${imgIcon}.svg`" :alt="text" :class="iconWidth">
  </button>
</template>
