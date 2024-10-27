<template>
  <div>
      <BackBTN targetPath="/" class="py-12  lg:px-8 lg:py-12"/>
  
  <main class="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 ">

    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[400px]">
      <div
        class="animate-spin rounded-full h-16 w-16 border-4 border-skin-base border-t-transparent"
      ></div>
      <p class="mt-6 text-lg text-skin-secondary font-medium">Loading country details...</p>
    </div>

    <!-- Content -->
    <div v-else-if="country" class="bg-skin-card-primary dark:bg-skin-card-primary rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
      <div class="text-skin-base dark:text-skin-base bg-skin-card-hover dark:bg-skin-card-hover px-6 py-8">
        <h2 class="text-4xl font-bold text-muted text-center">{{ country.name }}</h2>
      </div>

      <!-- Tabs -->
      <div class="w-full max-w-5xl mx-auto px- sm:px-6">
        <nav class="flex space-x-1 mt-6 text-skin-base  p-1 rounded-xl">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="currentTab = tab.value"
            :class="[
              ' flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
              currentTab === tab.value
                ? 'bg-skin-button-muted dark:bg-skin-button-accent text-skin-muted shadow-sm dark:text-skin-base'
                : 'text-skin-secondary hover:text-skin-secondary hover:bg-skin-secondary dark:hover:bg-skin-secondary'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>

        <!-- Tab Content -->
        <div class=" mt-8 pb-12">
          <!-- Details Tab -->
          <div v-if="currentTab === 'details'" class="space-y-8">
            <div class="  rounded-2xl overflow-hidden shadow-sm">
              <img :src="country.flagUrl" :alt="`${country.name} Flag`" class="w-full h-60" />
              <div class="p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <p class="text-sm text-skin-secondary dark:text-skin-base uppercase">Country Name</p>
                    <p class="text-lg font-medium text-skin-base">{{ country.name }}</p>
                  </div>
                  <div class="space-y-2">
                    <p class="text-sm text-skin-secondary uppercase">Country Code</p>
                    <p class="text-lg font-medium text-skin-base">{{ country.nocCode }}</p>
                  </div>
                </div>
                <div class="space-y-2">
                  <p class="text-sm text-skin-secondary uppercase">Basic Information</p>
                  <p class="text-skin-base leading-relaxed">{{ country.basicInfo }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sport List Tab -->
          <div v-else-if="currentTab === 'sport-list'" class="space-y-6 sm:space-y-8">
            <!-- Medal Summary -->
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              <div>
                <div class="bg-skin-secondary dark:bg-skin-card-hover rounded-xl sm:rounded-2xl p-4 sm:p-8">
                <h3 class="text-xl sm:text-2xl font-bold text-skin-base mb-4 sm:mb-6">Medal Summary</h3>
                <div v-for="sport in country.medals" :key="sport.sportName">
                  <div class="grid grid-cols-3 gap-2 sm:gap-4">
                    <div class="bg-skin-fill dark:bg-skin-secondary rounded-lg sm:rounded-xl p-3 sm:p-6 shadow-sm">
                      <div class="text-2xl sm:text-4xl font-bold text-skin-gold mb-1 sm:mb-2">{{ sport.goldCount }}</div>
                      <p class="text-xs sm:text-sm font-medium text-skin-secondary">Gold 🥇</p>
                    </div>
                    <div class="bg-skin-fill dark:bg-skin-secondary rounded-lg sm:rounded-xl p-3 sm:p-6 shadow-sm">
                      <div class="text-2xl sm:text-4xl font-bold text-skin-silver mb-1 sm:mb-2">{{ sport.silverCount }}</div>
                      <p class="text-xs sm:text-sm font-medium text-skin-secondary">Silver 🥈</p>
                    </div>
                    <div class="bg-skin-fill dark:bg-skin-secondary rounded-lg sm:rounded-xl p-3 sm:p-6 shadow-sm">
                      <div class="text-2xl sm:text-4xl font-bold text-skin-bronze mb-1 sm:mb-2">{{ sport.bronzeCount }}</div>
                      <p class="text-xs sm:text-sm font-medium text-skin-secondary">Bronze 🥉</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Sports Table/Cards -->
              <div class="py-10 space-y-6">
                <!-- Table view (md and up) -->
                <div class="hidden md:block">
                  <div
                    class=" rounded-xl shadow-sm overflow-hidden"
                  >
                    <table class="min-w-full divide-y divide-skin-fill">
                      <thead class="bg-skin-secondary  dark:bg-skin-secondary ">
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-4 text-left text-xs font-medium text-skin-secondary uppercase tracking-wider"
                          >
                            Sport Name
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-4 text-left text-xs font-medium text-skin-secondary uppercase tracking-wider"
                          >
                            Rank
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-4 text-left text-xs font-medium text-skin-secondary uppercase tracking-wider"
                          >
                            Medals
                          </th>
                        </tr>
                      </thead>
                      <tbody class=" divide-y divide-skin-card-hover dark:divide-skin-card-hover">
                        <tr
                          v-for="sport in country.ownSports"
                          :key="sport.sportName"
                          class=" bg-skin-fill dark:bg-skin-card-hover transition-colors duration-200"
                        >
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-skin-base">
                              {{ sport.sportName }}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-skin-base">
                              #{{ sport.rankPosition }}
                            </div>
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
                <div class=" md:hidden space-y-10">
                  <div
                    v-for="sport in country.ownSports"
                    :key="sport.sportName"
                    class="rounded-xl shadow-sm overflow-hidden"
                  >
                    <div class=" bg-skin-card-hover dark:bg-skin-secondary p-4">
                      <h4 class="font-medium text-lg text-skin-base">{{ sport.sportName }}</h4>
                    </div>
                    <div class="p-4 space-y-3 bg-skin-card-primary">
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-skin-secondary">Rank</span>
                        <span class="text-lg font-semibold text-skin-button-accent"
                          >#{{ sport.rankPosition }}</span
                        >
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-skin-secondary">Medals</span>
                        <span class="text-2xl">{{ sport.medalsUrl }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <div class="container mx-auto px-4 py-8">
                <CommentSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  </div>
  
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Country } from '@/types'
import EventService from '@/services/EventService'
import CheerUp from '@/components/CheerUp.vue'
import CommentSection from '@/components/CommentSection.vue'
import BackBTN from '@/components/BackBTN.vue'


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
<style>
* {
  transition: background-color 0.5s ease, color 0.3s ease, border-color 0.3s ease;
}
</style>
