<script lang="ts" setup>
import type { PropType } from 'vue';

export interface TabOption {
  title: string;
  val: string;
  disabled?: boolean;
};

const modelValue = defineModel();
defineProps({
  list: { type: Array as PropType<TabOption[]>, default: [] },
  tabWidth: {
    type: String,
    default: 'px-6'
  }
});
const emits = defineEmits(['update:modelValue']);
const handleChangeTab = (item: any) => {
  emits('update:modelValue', item.val)
};
</script>

<template>
  <div class="w-full flex items-center">
    <button @click="handleChangeTab(item)" v-for="item in list" :key="item.val"
      :class="[modelValue === item.val ? 'text-primary cursor-default' : 'text-white cursor-pointer', tabWidth]"
      class="py-4 bg-transparent border-0">
      <p :class="[modelValue === item.val ? `after:(absolute content-empty -bottom-3.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full)` : '']"
        class="relative text-3.5 xl:text-4 text-center font-bold whitespace-nowrap tracking-wide">
        {{ item.title }}
      </p>
    </button>
  </div>
</template>

<style lang="scss" scoped></style>