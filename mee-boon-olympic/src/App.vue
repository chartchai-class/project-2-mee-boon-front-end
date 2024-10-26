<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const isDark = ref(false)

const links = [
  { to: '/', label: 'Medal Table' },
  { to: '/Country', label: 'Country' },
  { to: '/Register', label: 'Register' },
  { to: '/Longin', label: 'Longin' }
]

// Theme functions
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme()
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const applyTheme = () => {
  document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-skin-fill dark:bg-skin-fill">
    <nav class="relative px-4 py-2 flex justify-between items-center bg-skin-fill-alt dark:bg-skin-sec border-b border-skin-base">
      <a class="text-2xl font-bold text-skin-base" href="#">
        MEEBOON MEEVASANA OLYMPIC
      </a>

      <!-- Mobile Menu Button -->
      <div class="lg:hidden">
        <button
          class="navbar-burger flex items-center text-skin-base p-1"
          id="navbar_burger"
        >
          <svg
            class="block h-6 w-6 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Hamberger menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex items-center gap-4">
        <!-- Theme Toggle Button -->
        <button
          @click="toggleTheme"
          class="p-2 rounded-lg bg-skin-button-accent hover:bg-skin-button-hover text-skin-inverted transition-colors duration-200"
        >
          <!-- Moon Icon (Dark Mode) -->
          <svg
            v-if="!isDark"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          <!-- Sun Icon (Light Mode) -->
          <svg
            v-else
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>

        <!-- Sign In Button -->
        <div>
          <a
            href="#"
            class="py-1.5 px-3 m-1 text-center bg-skin-button-accent hover:bg-skin-button-hover text-skin-inverted font-medium rounded-md border border-skin-base hidden lg:inline-block transition-colors duration-200"
          >
            Sign In
          </a>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-skin-fill-alt dark:bg-skin-sec border-t border-skin-base p-4 mt-auto">
      <p class="text-center text-sm text-skin-muted">
        &copy; 2024 Mee Boon Olympic. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<style>
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
</style>