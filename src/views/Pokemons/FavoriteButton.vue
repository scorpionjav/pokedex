<script lang="ts" setup>
import { computed } from 'vue';
import type { Pokemon } from '@/models/pokemon';
import useFavoritesStore from '@/stores/favorites';

const favoritesStore = useFavoritesStore();

const props = defineProps<{
  pokemon: Pokemon;
  onToggle: (pokemon: Pokemon) => void;
}>();

const isFavorite = computed(() => favoritesStore.isFavorite(props.pokemon.name));
</script>

<template>
  <Button
    variant="favorite"
    :icon-color="isFavorite ? 'text-yellow' : 'text-neutral-3'"
    @click.stop="onToggle(pokemon)"
  />
</template>
