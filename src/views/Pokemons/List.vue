<script lang="ts" setup>
import { onMounted, type Ref, ref, computed, nextTick, watch, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { getPokemons, getPokemonByName } from '@/services/api';
import type { Pokemon } from '@/models/pokemon';
import useFavoritesStore from '@/stores/favorites';
import useAppStore from '@/stores/app';
import FavoriteButton from './FavoriteButton.vue';
import PokemonCard from './PokemonCard.vue';

const router = useRouter();
const favoritesStore = useFavoritesStore();
const appStore = useAppStore();

const pokemons = ref<Pokemon[]>([]);
const pokemonDetails = ref<Pokemon | null>(null);
const limit = 20;
const offset = ref<number>(0);
const isLoadingMore = ref(false);
const searchQuery = ref<string>('');
const showingFavoritesOnly = ref<boolean>(false);

const loadPokemons = async () => {
  if (isLoadingMore.value) return;

  isLoadingMore.value = true;
  appStore.setLoading(true);

  try {
    const response = await getPokemons(offset.value, limit);

    const newPokemons = response
      .filter((pokemon: Pokemon) => !pokemons.value.some((p) => p.name === pokemon.name))
      .map((pokemon: Pokemon) => ({
        name: pokemon.name,
        isFavorite: favoritesStore.isFavorite(pokemon.name),
      }));

    pokemons.value.push(...newPokemons);
    offset.value += limit;
  } catch (err) {
    console.error('Error loading pokemons:', err);
  } finally {
    isLoadingMore.value = false;
    appStore.setLoading(false);
  }
};

const handleFavorite = (pokemon: Pokemon) => {
  pokemon.isFavorite = !pokemon.isFavorite;
  favoritesStore.toggle(pokemon.name);
};

const fetchPokemonDetails = async (name: string): Promise<Pokemon | null> => {
  try {
    const response = await getPokemonByName(name);
    if (!response) return null;
    return {
      ...response,
      isFavorite: favoritesStore.isFavorite(name),
    };
  } catch (err) {
    return null;
  }
};

const filteredPokemons = computed(() => {
  let list = pokemons.value;

  if (showingFavoritesOnly.value) {
    list = list.filter(({ name }) => favoritesStore.isFavorite(name));
  }

  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return list;

  return list.filter(({ name }) => name.toLowerCase().includes(query));
});

const openPokemonModal = (pokemon: Pokemon) => {
  pokemonDetails.value = pokemon;
  appStore.openModal('PokemonDetails');
};

const showDetails = async (name: string) => {
  appStore.setLoading(true);
  const details = await fetchPokemonDetails(name);
  appStore.setLoading(false);

  if (details) {
    openPokemonModal(details);
  }
};

const handleScroll = async () => {
  if (showingFavoritesOnly.value || searchQuery.value.trim()) return;

  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    await loadPokemons();
  }
};

onMounted(() => {
  loadPokemons();
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

let debounceTimeout: ReturnType<typeof setTimeout>;

watch(searchQuery, (newQuery) => {
  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(async () => {
    const trimmed = newQuery.trim().toLowerCase();
    if (!trimmed) return;

    const exists = pokemons.value.some((pokemon: Pokemon) =>
      pokemon.name.toLowerCase().includes(trimmed),
    );
    if (!exists) {
      const details = await fetchPokemonDetails(trimmed);
      if (details) {
        const alreadyExists = pokemons.value.some(
          (pokemon: Pokemon) => pokemon.name === details.name,
        );
        if (!alreadyExists) {
          pokemons.value.push(details);
        }
      }
    }
  }, 300);
});

watch(
  () => favoritesStore.favorites.length,
  (length) => {
    if (length === 0 && showingFavoritesOnly.value) {
      showingFavoritesOnly.value = false;
    }
  },
);
</script>
<template>
  <Modal v-if="pokemonDetails" name="PokemonDetails">
    <PokemonCard :pokemon="pokemonDetails" :toggleFavorite="handleFavorite" />
  </Modal>
  <div
    class="bg-neutral-6 flex min-h-screen w-full flex-col items-center px-[30px] pt-[35px] md:px-0"
  >
    <div class="w-full max-w-[570px]">
      <Input variant="search" v-model="searchQuery" />
      <div
        v-if="filteredPokemons.length <= 0"
        class="mt-[50px] flex w-full flex-col items-center justify-center"
      >
        <h1 class="text-center text-4xl font-bold">Uh-oh!</h1>
        <p class="mt-2.5 text-center text-xl">You look lost on your journey!</p>
        <Button class="mt-[25px]" @click="router.push('/')">Go back home</Button>
      </div>
      <div v-else class="mt-10 flex w-full flex-col gap-2.5">
        <button
          v-for="pokemon in filteredPokemons"
          :key="pokemon.name"
          class="flex h-[60px] w-full items-center justify-between rounded-[5px] bg-white py-2.5 pr-2 pl-5"
          @click="showDetails(pokemon.name)"
        >
          <span class="text-[22px] font-medium capitalize">{{ pokemon.name }}</span>
          <FavoriteButton :pokemon="pokemon" :onToggle="handleFavorite" />
        </button>
      </div>
    </div>
  </div>
  <div
    class="bg-neutral-6 fixed right-0 bottom-0 left-0 z-10 flex h-[70px] w-full items-center justify-center"
  >
    <div class="w-full bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
      <div
        class="mx-auto flex max-w-[570px] items-center justify-between gap-5 px-[30px] py-[18px] md:px-0"
      >
        <Button
          icon="list"
          class="w-full"
          :variant="!showingFavoritesOnly ? 'primary' : 'secondary'"
          @click="showingFavoritesOnly = false"
          >All</Button
        >
        <Button
          icon="fav"
          class="w-full"
          :variant="showingFavoritesOnly ? 'primary' : 'secondary'"
          :disabled="favoritesStore.favorites.length <= 0"
          @click="showingFavoritesOnly = true"
        >
          Favorites
        </Button>
      </div>
    </div>
  </div>
</template>
