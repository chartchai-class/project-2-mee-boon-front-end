<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { to: '/', label: 'Medal Table' },
  { to: '/Country', label: 'Country' },
  { to: '/Register', label: 'Register' },
  { to: '/Longin', label: 'Longin' }
]

</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
    <nav
      class="relative px-4 py-2 flex justify-between items-center bg-white dark:bg-gray-800 border-b-2 dark:border-gray-600"
    >
      <a class="text-2xl font-bold text-indigo-800 dark:text-white" href="#">
        MEEBOON MEEVASANA OLYMPIC
      </a>

      <div class="lg:hidden">
        <button
          class="navbar-burger flex items-center text-indigo-600 dark:text-gray-100 p-1"
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

      <div class="hidden lg:flex">
        <button
          id="theme-toggle"
          type="button"
          class="hidden lg:inline-block lg:ml-auto py-1.5 px-3 m-1 text-center bg-gray-100 border border-gray-300 rounded-md text-black hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            id="theme-toggle-dark-icon"
            class="w-5 h-6 hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg
            id="theme-toggle-light-icon"
            class="w-5 h-6 hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>

        <div>
          <span class="hidden" id="util_data" data="{{ json_encode($util_data) }}"></span>
          <a
            class="py-1.5 px-3 m-1 text-center bg-gray-100 border border-gray-300 rounded-md text-black hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-700 hidden lg:inline-block"
            href="https://tailwindflex.com/login"
          >
            Sign In
          </a>
        </div>
      </div>
    </nav>

    <!-- <div class="flex-grow flex flex-col md:flex-row p-6">
       Main Content 
      <main class="flex-grow bg-white rounded-lg shadow-md p-6">
        <RouterView />
      </main>
      
       Navigation 
      <nav class="md:w-64 bg-white rounded-lg shadow-md p-6 mb-6 md:mb-0 md:mr-6">
        <div class="space-y-4">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="block py-2 px-4 rounded-md transition-colors duration-200"
            :class="route.path === link.to ? 'bg-indigo-600 text-white font-medium' : 'text-gray-700 hover:bg-indigo-100'"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </nav>
    </div> -->

    <!-- cheer up -->
    <div>
      <!-- Main Content -->
      <!-- <main class="flex-grow bg-white rounded-lg shadow-md p-6"> -->
      <main>
        <RouterView />
      </main>
    </div>

    <!-- Footer -->
    <footer class="bg-white shadow-sm p-4 mt-auto">
      <p class="text-center text-sm text-gray-600">
        &copy; 2024 Mee Boon Olympic. All rights reserved.
      </p>
    </footer>
  </div>
</template>
