<!-- AdminDashboard.vue -->
<template>
  <div class="flex min-h-screen bg-slate-100">
    <!-- Sidebar -->
    <div class="hidden md:flex flex-col w-64 bg-gray-800 rounded-2xl m-4">
            <div class="flex flex-col flex-1 overflow-y-auto">
                <nav
                    class="flex flex-col flex-1 overflow-y-auto bg-gradient-to-b from-gray-700 to-blue-500 px-2 py-4 gap-10 rounded-2xl">
                    <div class="p-4 border-b border-slate-600">
                        <div class="flex items-center text-white text-xl font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Admin Dashboard
                        </div>
                    </div>
                    <div class="flex flex-col flex-1 gap-3">
                        <RouterLink to="/Admin">
                            <a href="#"
                                class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Country
                            </a>
                        </RouterLink>
                        <RouterLink to="/admin/admin-list">
                            <a href="#"
                                class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Admin List
                            </a>
                        </RouterLink>
                        <RouterLink to="/admin/user-list">
                            <a href="#"
                                class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Users List
                            </a>
                        </RouterLink>
                        <RouterLink to="/admin/add-country">
                            <a href="#"
                                class="flex items-center px-3 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none"
                                    stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Add New Country
                            </a>
                        </RouterLink>
                    </div>
                </nav>
            </div>
        </div>

    <!-- Main Content -->
    <div class="flex-1 p-8 ">
      <div class="mb-8 flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-slate-800">Admin List</h1>
        <div class="relative">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Search admin..."
            class="pl-10 pr-4 py-2 w-64 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg 
            class="absolute left-3 top-2.5 h-5 w-5 text-slate-400" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <table class="w-full table-fixed">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-medium text-slate-500">ID</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-slate-500">USERNAME</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-slate-500">EMAIL</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-slate-500">ROLE</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-slate-500">REGISTER DATE</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-slate-500">ACTIONS</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-slate-50">
              <td class="px-6 py-4 text-sm text-slate-600">{{ user.id }}</td>
              <td class="px-6 py-4 text-sm text-slate-600">{{ user.username }}</td>
              <td class="px-6 py-4 text-sm text-slate-600">{{ user.email }}</td>
              <td class="px-6 py-4">
                <div class="relative">
                  <select
                    v-model="user.role"
                    @change="handleRoleChange(user.id, $event)"
                    class="appearance w-40 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">{{ user.registerDate }}</td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button class="p-3 text-red-600 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

// State
const users = ref([
  { id: 1, username: 'jane_admin', email: 'jane@example.com', role: 'admin', registerDate: '2024-01-15' },
  { id: 2, username: 'john_admin', email: 'john.admin@example.com', role: 'admin', registerDate: '2024-01-16' },
  { id: 3, username: 'sarah_admin', email: 'sarah@example.com', role: 'admin', registerDate: '2024-01-17' },
])

const searchTerm = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Computed properties
const filteredUsers = computed(() => {
  return users.value.filter(user => 
    user.username.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const totalUsers = computed(() => filteredUsers.value.length)
const totalPages = computed(() => Math.ceil(totalUsers.value / itemsPerPage.value))

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalUsers.value))

// Methods
const handleRoleChange = (userId, event) => {
  const newRole = event.target.value
  console.log(`Changed user ${userId} role to ${newRole}`)
  // Here you would typically make an API call to update the user's role
}
</script>