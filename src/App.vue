<script setup lang="ts">
// Container principal que serve de invólucro para as views carregadas pelo Vue Router
</script>

<template>
  <div class="min-h-screen bg-stone-100 text-stone-800 font-sans p-6 md:p-10">
    <div class="max-w-6xl mx-auto">
      <!-- Ponto de injeção das páginas/rotas configuradas no Vue Router -->
      <router-view />
    </div>
  </div>
</template>