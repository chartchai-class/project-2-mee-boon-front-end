@@ -0,0 +1,86 @@
<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { to: '/', label: 'Medal Table' },
  { to: '/CheerUp', label: 'Cheer up!' }
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
    <header class="bg-white shadow-sm p-6">
      <h1 class="text-2xl md:text-3xl font-bold text-center text-indigo-800">Mee Boon Olympic</h1>
    </header>
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
    <div class="flex-grow flex flex-col lg:flex-row p-6 gap-6">
    <!-- Main Content -->
    <main class="flex-grow bg-white rounded-lg shadow-md p-6">
      <RouterView />
    </main>
    
    <!-- Chat Section -->
    <aside class="lg:w-80 bg-white rounded-lg shadow-md">
      <!-- Chat Header -->
      <div class="bg-gray-100 p-4 rounded-t-lg">
        <h2 class="font-bold text-gray-800">CHEER UP CHAT</h2>
      </div>
      
      <!-- Chat Messages -->
      <div class="p-4 space-y-3">
        <div v-for="(message, index) in chatMessages" 
             :key="index" 
             class="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
          <div class="flex-shrink-0">
            <div class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
              <span class="text-xs">👤</span>
            </div>
          </div>
          <div class="flex-grow">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-gray-800">{{ message.user }}</span>
            </div>
            <p class="text-sm text-gray-600">{{ message.text }}</p>
          </div>
        </div>
      </div>

      <!-- Login/Register Section -->
      <div class="p-4 border-t border-gray-200">
        <button class="w-full py-2 px-4 bg-gray-100 text-sm text-gray-600 rounded">
          Please Login / Registration Before Comments
        </button>
      </div>
    </aside>
  </div>
    
    <!-- Footer -->
    <footer class="bg-white shadow-sm p-4">
      <p class="text-center text-sm text-gray-600">&copy; 2024 Mee Boon Olympic. All rights reserved.</p>
    </footer>
  </div>
</template>
