<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
    <header class="bg-white shadow-lg p-4">
      <h1 class="text-4xl font-semibold text-center">Mee Boon Olympic</h1>
    </header>

    <div id="layout" class="flex-grow p-6">
      <nav class="text-center mb-6">
        <RouterLink
          to="/"
          :class="{
            'text-blue-600 font-semibold': route.path === '/',
            'text-gray-600': route.path !== '/'
          }"
          class="text-sm hover:underline mx-2"
        >
          Home
        </RouterLink>
        |
        <RouterLink
          :to="{ name: 'about' }"
          :class="{
            'text-blue-600 font-semibold': route.path === '/about',
            'text-gray-600': route.path !== '/about'
          }"
          class="text-sm hover:underline mx-2"
        >
          About
        </RouterLink>
      </nav>

      <main class="flex-grow">
        <!-- Content here -->
    <RouterView />

      </main>
    </div>


    <footer class="bg-gray-200 p-4 text-gray-700 text-center">
      <p class="text-sm">&copy; 2024 Mee Boon Olympic. All rights reserved.</p>
    </footer>

  </div>
</template>

<style scoped>
/* CSS เฉพาะที่จำเป็น */
#layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
