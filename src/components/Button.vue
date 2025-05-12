<script lang="ts" setup>
import { computed } from 'vue';
import type { IconNames } from '@/models/icon';

interface ButtonProps {
  variant?: 'primary' | 'favorite' | 'secondary';
  icon?: IconNames;
  disabled?: boolean;
  iconColor?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  icon: undefined,
  disabled: false,
  iconColor: undefined,
});

const isFavorite = computed(() => props.variant === 'favorite');

const buttonClasses = computed(() => {
  const base =
    'h-11 inline-flex items-center justify-center gap-2 rounded-full font-semibold focus:outline-none transition-all duration-200';

  const variants: Record<string, string> = {
    primary:
      'bg-red hover:bg-red-dark text-white py-[11px] px-5 disabled:text-white disabled:bg-neutral-3',
    secondary:
      'bg-neutral-3 hover:bg-red-dark text-white py-[11px] px-5 disabled:text-white disabled:bg-neutral-3',
    favorite: 'w-11 bg-neutral-5 hover:bg-neutral-4',
  };

  return `${base} ${variants[props.variant || 'primary']} ${props.disabled ? 'cursor-not-allowed' : ''}`;
});
</script>
<template>
  <button :class="buttonClasses" :disabled="disabled">
    <Icon
      v-if="props.icon || isFavorite"
      :name="isFavorite ? 'fav' : props.icon || 'fav'"
      :class="props.iconColor"
      size="22"
    />
    <span v-if="!isFavorite"><slot /></span>
  </button>
</template>
