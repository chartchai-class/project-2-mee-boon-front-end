<template>
  <main class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[400px]">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-skin-button-accent border-t-transparent"></div>
      <p class="mt-6 text-lg text-skin-muted font-medium">Loading country details...</p>
    </div>

    <!-- Content -->
    <div v-else-if="country" class="bg-skin-fill-alt dark:bg-skin-sec rounded-2xl shadow-lg overflow-hidden">
      <div class="bg-skin-button-accent dark:bg-skin-sec px-6 py-8">
        <h2 class="text-4xl font-bold text-skin-inverted text-center">{{ country.name }}</h2>
      </div>

      <!-- Tabs -->
      <div class="w-full max-w-5xl mx-auto px-6">
        <nav class="flex space-x-1 mt-6 bg-skin-fill dark:bg-skin-fill p-1 rounded-xl">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="currentTab = tab.value"
            :class="[
              'flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
              currentTab === tab.value
                ? 'bg-skin-fill-alt dark:bg-skin-sec text-skin-button-accent shadow-sm'
                : 'text-skin-muted hover:text-skin-base hover:bg-skin-fill-alt dark:hover:bg-skin-sec'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>

        <!-- Tab Content -->
        <div class="mt-8 pb-12">
          <!-- Details Tab -->
          <div v-if="currentTab === 'details'" class="space-y-8">
            <div class="bg-skin-fill dark:bg-skin-fill rounded-2xl overflow-hidden shadow-sm">
              <img
                :src="country.flagUrl"
                :alt="`${country.name} Flag`"
                class="w-full h-60"
              />
              <div class="p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <p class="text-sm text-skin-muted uppercase">Country Name</p>
                    <p class="text-lg font-medium text-skin-base">{{ country.name }}</p>
                  </div>
                  <div class="space-y-2">
                    <p class="text-sm text-skin-muted uppercase">Country Code</p>
                    <p class="text-lg font-medium text-skin-base">{{ country.nocCode }}</p>
                  </div>
                </div>
                <div class="space-y-2">
                  <p class="text-sm text-skin-muted uppercase">Basic Information</p>
                  <p class="text-skin-base leading-relaxed">{{ country.basicInfo }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sport List Tab -->
          <div v-else-if="currentTab === 'sport-list'" class="space-y-8">
            <!-- Medal Summary -->
            <div class="bg-skin-fill dark:bg-skin-fill rounded-2xl p-8">
              <h3 class="text-2xl font-bold text-skin-base mb-6">Medal Summary</h3>
              <div v-for="sport in country.medals" :key="sport.sportName">
                <div class="grid grid-cols-3 gap-4">
                  <div class="bg-skin-fill-alt dark:bg-skin-sec rounded-xl p-6 shadow-sm">
                    <div class="text-4xl font-bold text-skin-gold mb-2">{{ sport.goldCount }}</div>
                    <p class="text-sm font-medium text-skin-muted">Gold Medals 🥇</p>
                  </div>
                  <div class="bg-skin-fill-alt dark:bg-skin-sec rounded-xl p-6 shadow-sm">
                    <div class="text-4xl font-bold text-skin-silver mb-2">{{ sport.silverCount }}</div>
                    <p class="text-sm font-medium text-skin-muted">Silver Medals 🥈</p>
                  </div>
                  <div class="bg-skin-fill-alt dark:bg-skin-sec rounded-xl p-6 shadow-sm">
                    <div class="text-4xl font-bold text-skin-bronze mb-2">{{ sport.bronzeCount }}</div>
                    <p class="text-sm font-medium text-skin-muted">Bronze Medals 🥉</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sports Table/Cards -->
            <div class="space-y-6">
              <!-- Table view (md and up) -->
              <div class="hidden md:block">
                <div class="bg-skin-fill-alt dark:bg-skin-sec rounded-xl shadow-sm overflow-hidden">
                  <table class="min-w-full divide-y divide-skin-base">
                    <thead class="bg-skin-fill dark:bg-skin-fill">
                      <tr>
                        <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-skin-muted uppercase tracking-wider">
                          Sport Name
                        </th>
                        <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-skin-muted uppercase tracking-wider">
                          Rank
                        </th>
                        <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-skin-muted uppercase tracking-wider">
                          Medals
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-skin-fill-alt dark:bg-skin-sec divide-y divide-skin-base">
                      <tr v-for="sport in country.ownSports" 
                          :key="sport.sportName"
                          class="hover:bg-skin-fill dark:hover:bg-skin-fill transition-colors duration-200">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm font-medium text-skin-base">{{ sport.sportName }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm font-medium text-skin-button-accent">#{{ sport.rankPosition }}</div>
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
                  class="bg-skin-fill-alt dark:bg-skin-sec rounded-xl shadow-sm overflow-hidden"
                >
                  <div class="bg-skin-button-accent dark:bg-skin-sec p-4">
                    <h4 class="font-medium text-lg text-skin-inverted">{{ sport.sportName }}</h4>
                  </div>
                  <div class="p-4 space-y-3">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-skin-muted">Rank</span>
                      <span class="text-lg font-semibold text-skin-button-accent">#{{ sport.rankPosition }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-skin-muted">Medals</span>
                      <span class="text-2xl">{{ sport.medalsUrl }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <CheerUp />
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
import CheerUp from '@/components/CheerUp.vue';

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
