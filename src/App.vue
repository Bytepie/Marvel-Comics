<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-black p-4 flex justify-center">
    <div class="flex gap-4 justify-between w-full max-w-screen-2xl items-center">
      <a href="/"><img alt="Marvel logo" class="h-12" src="@/assets/logom.png" /></a>
      <h1 class="hidden md:inline-flex text-xl text-white font-extrabold uppercase min-w-max">Marvel Explorer 🔭</h1>
      <nav class="flex items-center max-w-min gap-4">
        <RouterLink class="button" to="/">📒 Comics</RouterLink>
        <RouterLink class="button" to="/search">🦹 Heroes</RouterLink>
      </nav>
    </div>
  </header>

  <div class="flex justify-center items-center mx-auto max-w-screen-2xl py-8 px-2">
    <RouterView />
  </div>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

.button {
  @apply inline-flex gap-1 min-w-max border-b-2 border-b-transparent p-2 font-semibold text-white;
}

a.router-link-exact-active {
  @apply border-red-400 text-red-400;
}

.button:hover {
  @apply text-white border-b-2 border-white;
}
</style>
