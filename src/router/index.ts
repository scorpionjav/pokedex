import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/pokemons',
      name: 'Pokemons',
      component: () => import('../views/Pokemons/List.vue'),
    },
  ],
});

export default router;
