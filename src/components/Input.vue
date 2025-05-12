<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  variant?: 'general' | 'search';
  disabled?: boolean;
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: 'search'): void;
  (e: 'update:modelValue', value: string): void;
}>();

const inputValue = ref(props.modelValue || '');
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;
  emit('update:modelValue', inputValue.value);
};
</script>

<template>
  <input
    :class="[
      'font-base text-basetext-neutral-1 placeholder-neutral-3 h-[50px] w-full rounded-[5px] bg-white px-3.5 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)] focus:outline-none',
      props.disabled ? 'bg-neutral-3 cursor-not-allowed text-neutral-400' : '',
      props.variant === 'search' ? 'bg-search-icon pl-[43px]' : '',
    ]"
    :disabled="props.disabled"
    :placeholder="props.variant === 'search' ? 'Search' : ''"
    type="text"
    @input="handleInput($event)"
  />
</template>

<style scoped>
.bg-search-icon {
  background-image: url('@/assets/icons/search.svg');
  background-position: left 15px center;
  background-repeat: no-repeat;
  background-size: 18px;
}
</style>
