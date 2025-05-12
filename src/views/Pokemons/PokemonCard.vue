<script lang="ts" setup>
import { ref } from 'vue';
import type { Pokemon } from '@/models/pokemon';
import FavoriteButton from './FavoriteButton.vue';

const props = defineProps<{
  pokemon: Pokemon;
  toggleFavorite: (pokemon: Pokemon) => void;
}>();

const copied = ref<boolean>(false);

const typeList = props.pokemon.types.join(', ');
const details = {
  Name: props.pokemon.name,
  Weight: props.pokemon.weight,
  Height: props.pokemon.height,
  Types: typeList,
};

const share = () => {
  const text = `Name: ${props.pokemon.name}, Weight: ${props.pokemon.weight}, Height: ${props.pokemon.height}, Types: ${typeList}`;

  navigator.clipboard.writeText(text).then(() => (copied.value = true));

  setTimeout(() => {
    copied.value = false;
  }, 1000);
};
</script>

<template>
  <div class="w-full overflow-hidden rounded-[5px] bg-white">
    <div class="bg-wallpaper flex h-[200px] w-full items-end justify-center bg-cover bg-center">
      <img
        :src="props.pokemon.image || 'src/assets/images/squirtle.svg'"
        :alt="props.pokemon.name"
        class="pokemon-image"
      />
    </div>
    <div class="flex flex-col gap-4 px-[30px] py-5 text-base">
      <div
        v-for="(value, key) in details"
        :key="key"
        class="flex gap-1 border-b border-neutral-300 pb-2"
      >
        <span class="font-semibold text-neutral-500">{{ key }}:</span>
        <span class="text-right capitalize">{{ value }}</span>
      </div>
      <div class="mt-5 flex items-center justify-between gap-5">
        <Button @click="share">Share to my friends</Button>
        <p v-if="copied" class="mr-auto text-base text-green-500">Copied to clipboard!</p>
        <FavoriteButton :pokemon="props.pokemon" :onToggle="toggleFavorite" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-wallpaper {
  background-image: url('@/assets/images/wallpaper.svg');
}
.pokemon-image {
  height: 150px;
  image-rendering: pixelated;
}
</style>
