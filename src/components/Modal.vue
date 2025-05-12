<script lang="ts" setup>
import { computed } from 'vue';
import useAppStore from '@/stores/app';

const props = defineProps<{
  name: string;
}>();

const appStore = useAppStore();

const isVisible = computed(() => appStore.modalName === props.name);
</script>
<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 top-0 right-0 left-0 z-40 flex max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-[rgba(0,0,0,0.6)] p-[30px] md:inset-0 md:h-full"
    @click="appStore.closeModal()"
  >
    <div
      class="relative flex w-full max-w-[570px] flex-col items-center overflow-hidden rounded-[5px]"
      @click.stop
    >
      <slot />
      <button class="absolute top-[15px] right-[15px]" @click="appStore.closeModal()">
        <Icon name="close" size="26" />
      </button>
    </div>
  </div>
</template>
