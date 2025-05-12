import { defineStore } from 'pinia';

const useAppStore = defineStore('app', {
  state: () => ({
    loading: false,
    modalName: null as string | null,
  }),
  actions: {
    setLoading(isLoading: boolean) {
      this.loading = isLoading;
    },
    openModal(name: string) {
      this.modalName = name;
    },
    closeModal() {
      this.modalName = null;
    },
  },
});

export default useAppStore;
