<template>
  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading country details...</p>
    </div>
    <!-- Content -->
    <div v-else-if="country" class="bg-white rounded-lg shadow-sm p-6">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">{{ country.name }}</h2>
        <!-- Tabs -->
        <div class="w-full max-w-md mx-auto">
          <div class="border-b border-gray-200">
            <nav class="flex -mb-px">
              <button
                v-for="tab in tabs"
                :key="tab.value"
                @click="currentTab = tab.value"
                :class="[
                  'w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm',
                  currentTab === tab.value
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                {{ tab.label }}
              </button>
            </nav>
          </div>
          <!-- Tab Content -->
          <div class="mt-8">
            <!-- Details Tab -->
            <div v-if="currentTab === 'details'" class="flex flex-col items-center space-y-6">
              <!-- Flag -->
              <!-- Country Details -->
              <div class="text-center space-y-2 w-full max-w-md">
                <img :src="country.flagUrl" :alt="`${country.name} Flag`" class="w-full h-60" />
                <article class="text-left">
                  <p class="text-gray-700">
                    <span class="font-semibold">NAME:</span> {{ country.name }}
                  </p>
                  <p class="text-gray-700">
                    <span class="font-semibold">CODE:</span> {{ country.nocCode }}
                  </p>
                  <p class="text-gray-700 max-w-md">
                    <span class="font-semibold">DESCRIPTION:</span> {{ country.description }}
                  </p>
                </article>
              </div>
            </div>
            <!-- Sport List Tab -->
            <div v-else-if="currentTab === 'sport-list'" class="bg-white p-6 rounded-lg shadow-lg">
              <h3 class="text-2xl font-semibold text-blue-800 mb-6">Sports Details</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  v-for="sport in country.detail"
                  :key="sport.sportName"
                  class="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-102"
                >
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="font-bold text-xl">{{ sport.sportName }}</h4>
                    <span class="text-3xl">{{ sport.medalsUrl }}</span>
                  </div>
                  <p class="mb-4">
                    <span class="font-semibold">Rank:</span> {{ sport.rank }}
                  </p>

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