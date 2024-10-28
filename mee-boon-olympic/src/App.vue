<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

// const messageStore = useMessageStore();
// const authStore = useAuthStore();
const router = useRouter()
const authStore = useAuthStore()
const isDark = ref(false)

const links = [
  { to: '/', label: 'Medal Table' },
  { to: '/Country', label: 'Country' },
  { to: '/Register', label: 'Register' },
  { to: '/longin', label: 'Longin' },
  { to: '/Admin', label: 'admin' }
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
function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-skin-fill dark:bg-skin-fill">
    <nav
      class="relative px-4 py-2 flex justify-between items-center bg-skin-fill-alt dark:bg-skin-sec border-b border-skin-base"
    >
      <router-link to="/" class="nav-link">
        <a class="text-2xl font-bold text-skin-base" href="#"> MEEBOON MEEVASANA OLYMPIC </a>
      </router-link>

      <!-- Mobile Menu Button -->
      <div class="lg:hidden">
        <button class="navbar-burger flex items-center text-skin-base p-1" id="navbar_burger">
          <svg
            class="block h-6 w-6 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- <title>Hamberger menu</title> -->
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>

      <!-- Desktop Menu -->
      <div class="text-skin-base hidden lg:flex items-center gap-4 ">
        <!-- Theme Toggle Button -->
        <button
          @click="toggleTheme"
          class="p-2 rounded-lg bg-skin-button-muted hover:bg-skin-button-muted-hover text-skin-inverted transition-colors duration-200"
        >
        <!-- Sun Icon (Light Mode) -->
        <svg
            v-if="!isDark"
            class="w-5 h-5"
            fill="none"
            stroke="#f8fafc"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <!-- Moon Icon (Dark Mode) -->
          <svg
            v-else
            class="w-5 h-5"
            fill="none"
            stroke="#f8fafc"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          
        </button>

        <!-- Sign In Button -->
        <nav class="flex">
          <!-- สำหรับผู้ใช้ที่ยังไม่ได้เข้าสู่ระบบ -->
          <ul v-if="!authStore.currentUserName" class="flex nav-bar ml-auto">
            <li class="nav-item px-2">
              <router-link to="/register" class="nav-link">
                <div class="flex items-center">
                  <!-- <SvgIcon type="mdi" :path="mdiAccountPlus" /> -->
                  <span class="ml-3">Sign Up</span>
                </div>
              </router-link>
            </li>
            <li class="nav-item px-2">
              <router-link to="/login" class="nav-link">
                <div class="flex items-center">
                  <!-- <SvgIcon type="mdi" :path="mdiLogin" /> -->
                  <span class="ml-3">Login</span>
                </div>
              </router-link>
            </li>
          </ul>

          <!-- สำหรับผู้ใช้ที่เข้าสู่ระบบแล้ว -->
          <ul v-if="authStore.currentUserName" class="flex items-center space-x-4 ml-auto">
            <li>
              <router-link
                to="/profile"
                class="group flex items-center p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-button-accent dark:bg-skin-fill transition-all duration-200"
              >
                <div class="flex items-center space-x-3">
                  <!-- Profile Icon -->
                  <div
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600"
                  >
                    <span class="text-lg">👤</span>
                  </div>

                  <div class="flex flex-col">
                    <!-- Admin Badge & Name -->
                    <div v-if="authStore.isAdmin" class="flex items-center space-x-2">
                      <router-link
                        to="/admin"
                        class="inline-flex items-center px-3 py-1 text-sm font-medium text-skin-base bg-skin-button-button-accent dark:tesxt rounded-full border border-blue-200 hover:bg-blue-200 hover:text-blue-800 transition-colors duration-200"
                      >
                        <span class="mr-1.5">❖</span>
                        <span class="font-semibold">Admin</span>
                      </router-link>

                      <span class="text-sm font-medium text-skin-base">
                        {{ authStore.currentUserName }}
                      </span>
                    </div>

                    <!-- Regular User Name -->
                    <span v-else class="text-sm font-medium text-skin-base">
                      {{ authStore.currentUserName }}
                    </span>
                  </div>
                </div>

                <!-- Hover Indicator -->
                <span
                  class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <svg
                    class="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </router-link>
            </li>

            <!-- Logout Button -->
            <li>
              <button
                @click="logout"
                class="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <!-- Logout Icon -->
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </nav>      



    <!-- Main Content -->
    <main class="flex-grow">
      <RouterView />

    </main>

    <!-- Footer -->
    <footer class="bg-skin-primary dark:bg-skin-primary border-t p-4 mt-auto">
      <p class="text-center text-sm text-skin-muted dark:text-skin-muted">
        &copy; 2024 Mee Boon Olympic. All rights reserved.
      </p>
    </footer>
  </div>
</template>


