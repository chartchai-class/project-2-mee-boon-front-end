country view
<template>
  <main class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[400px]">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      <p class="mt-6 text-lg text-gray-600 font-medium">Loading country details...</p>
    </div>

    <!-- Content -->
    <div v-else-if="country" class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
        <h2 class="text-4xl font-bold text-center">{{ country.name }}</h2>
      </div>

      <!-- Tabs -->
      <div class="w-full max-w-5xl mx-auto px-6">
        <nav class="flex space-x-1 mt-6 bg-gray-100 p-1 rounded-xl">
          <button
              v-for="tab in tabs"
              :key="tab.value"
              @click="currentTab = tab.value"
              :class="[
              'flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
              currentTab === tab.value
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>

        <!-- Tab Content -->
        <div class="mt-8 pb-12">
          <!-- Details Tab -->
          <div v-if="currentTab === 'details'" class="space-y-8">
            <div class="bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
              <img
                  :src="country.flagUrl"
                  :alt="`${country.name} Flag`"
                  class="w-full h-60 "
              />
              <div class="p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <p class="text-sm text-gray-500 uppercase">Country Name</p>
                    <p class="text-lg font-medium">{{ country.name }}</p>
                  </div>
                  <div class="space-y-2">
                    <p class="text-sm text-gray-500 uppercase">Country Code</p>
                    <p class="text-lg font-medium">{{ country.nocCode }}</p>
                  </div>
                </div>
                <div class="space-y-2">
                  <p class="text-sm text-gray-500 uppercase">Basic Information</p>
                  <p class="text-gray-700 leading-relaxed">{{ country.basicInfo }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sport List Tab -->
          <div v-else-if="currentTab === 'sport-list'" class="space-y-8">
            <!-- Medal Summary -->
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <h3 class="text-2xl font-bold text-blue-900 mb-6">Medal Summary</h3>
              <div v-for="sport in country.medals" :key="sport.sportName">
                <div class="grid grid-cols-3 gap-4">
                  <div class="bg-white rounded-xl p-6 shadow-sm">
                    <div class="text-4xl font-bold text-yellow-500 mb-2">{{ sport.goldCount }}</div>
                    <p class="text-sm font-medium text-gray-600">Gold Medals 🥇</p>
                  </div>
                  <div class="bg-white rounded-xl p-6 shadow-sm">
                    <div class="text-4xl font-bold text-gray-400 mb-2">{{ sport.silverCount }}</div>
                    <p class="text-sm font-medium text-gray-600">Silver Medals 🥈</p>
                  </div>
                  <div class="bg-white rounded-xl p-6 shadow-sm">
                    <div class="text-4xl font-bold text-orange-400 mb-2">{{ sport.bronzeCount }}</div>
                    <p class="text-sm font-medium text-gray-600">Bronze Medals 🥉</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sports Table/Cards -->
            <div class="space-y-6">
              <!-- Table view (md and up) -->
              <div class="hidden md:block">
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sport Name
                      </th>
                      <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Medals
                      </th>
                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="sport in country.ownSports" :key="sport.sportName"
                        class="hover:bg-gray-50 transition-colors duration-200">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ sport.sportName }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-blue-600">#{{ sport.rankPosition }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-2xl">{{ sport.medalsUrl }}</div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Card view (small screens) -->
              <div class="md:hidden space-y-4">
                <div
                    v-for="sport in country.ownSports"
                    :key="sport.sportName"
                    class="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div class="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
                    <h4 class="font-medium text-lg text-white">{{ sport.sportName }}</h4>
                  </div>
                  <div class="p-4 space-y-3">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-500">Rank</span>
                      <span class="text-lg font-semibold text-blue-600">#{{ sport.rankPosition }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-500">Medals</span>
                      <span class="text-2xl">{{ sport.medalsUrl }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Country } from '@/types'
import EventService from '@/services/EventService'

const currentTab = ref('details')
const country = ref<Country | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const tabs = [
  { label: 'DETAILS', value: 'details' },
  { label: 'SPORT LIST', value: 'sport-list' }
]

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

onMounted(async () => {
  try {
    const response = await EventService.getCountry(parseInt(props.id))
    country.value = response.data
  } catch (e) {
    error.value = 'Failed to load country details'
    console.error('Error loading country:', e)
  } finally {
    isLoading.value = false
  }
})
</script>