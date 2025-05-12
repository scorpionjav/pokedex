<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
  <div class="bg-neutral-6 flex h-dvh w-full flex-col items-center justify-center p-6">
    <div class="relative flex w-max items-center justify-center">
      <img
        src="@/assets/images/circle.svg"
        alt="Circle"
        class="absolute inset-0 top-[23.5%] left-[14.5%]"
      />
      <img src="@/assets/images/pikachu.svg" alt="Pikachu" class="relative z-10" />
    </div>
    <div class="mt-[60px] flex max-w-[560px] flex-col items-center">
      <h1 class="text-center text-[26px] font-bold">Welcome to Pokédex</h1>
      <p class="mt-[30px] text-center text-lg">
        The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
        Pokémon world.
      </p>
      <Button class="mt-[50px]" @click="router.push('/pokemons')">Get Started</Button>
    </div>
  </div>
</template>
