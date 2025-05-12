import { defineStore } from 'pinia';

const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as string[],
  }),
  actions: {
    toggle(name: string) {
      const exists = this.favorites.includes(name);
      this.favorites = exists
        ? this.favorites.filter((n) => n !== name)
        : [...this.favorites, name];
    },
    isFavorite(name: string) {
      return this.favorites.includes(name);
    },
  },
});

export default useFavoritesStore;
