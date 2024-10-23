<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { useCountryStore } from '@/stores/countryStore'
import { useRoute } from 'vue-router'

const countryStore = useCountryStore()
const route = useRoute()

onMounted(() => {
  countryStore.syncWithRoute()
})

watchEffect(() => {
  countryStore.syncWithRoute()
})
</script>

<template>
  <div class="max-w-7xl mx-auto p-5">
    <div class="mb-4">
      <label for="countries-per-page" class="block text-sm font-medium text-gray-700">
        Number of countries per page (1-15):
      </label>
      <input
        id="countries-per-page"
        type="number"
        class="mt-1 block w-20 p-2 border border-gray-300 rounded-md"
        :value="countryStore.countriesPerPage"
        @input="(e) => countryStore.updateCountriesPerPage(parseInt((e.target as HTMLInputElement)?.value))"
        min="1"
        max="15"
      />
    </div>

    <!-- Desktop Table View -->
    <div class="hidden md:block bg-white shadow-md rounded-lg">
      <div class="overflow-x-auto rounded-lg shadow">
        <table class="w-full">
          <thead>
            <tr class="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <th class="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-left w-16">Rank</th>
              <th class="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-left">Country</th>
              <th class="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-center w-20">🥇 Gold</th>
              <th class="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-center w-20">🥈 Silver</th>
              <th class="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-center w-20">🥉 Bronze</th>
              <th class="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-center w-20">Total</th>
              <th class="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-center w-32">Details</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(country, index) in countryStore.paginatedCountries" 
                :key="country.id"
                class="hover:bg-gray-50 transition duration-150">
              <td class="py-3 px-4 text-sm text-gray-800">
                {{ (countryStore.currentPage - 1) * countryStore.countriesPerPage + index + 1 }}
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center">
                  <img :src="country.flagUrl" 
                       alt="Flag" 
                       class="w-6 h-6 rounded-full mr-3 border border-gray-300" />
                  <span class="font-medium text-sm text-gray-700">{{ country.name }}</span>
                </div>
              </td>
              <td class="py-3 px-4 text-center whitespace-nowrap font-semibold text-sm text-yellow-500">
                {{ country.gold }}
              </td>
              <td class="py-3 px-4 text-center whitespace-nowrap font-semibold text-sm text-gray-500">
                {{ country.silver }}
              </td>
              <td class="py-3 px-4 text-center whitespace-nowrap font-semibold text-sm text-amber-600">
                {{ country.bronze }}
              </td>
              <td class="py-3 px-4 text-center whitespace-nowrap font-bold text-sm text-blue-600">
                {{ country.total }}
              </td>
              <td class="py-3 px-4 text-center whitespace-nowrap">
                <RouterLink
                  :to="{ name: 'detail-view', params: { id: country.id } }"
                  class="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  View details
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile Card View -->
    <div class="md:hidden space-y-4">
      <div v-for="(country, index) in countryStore.paginatedCountries" 
           :key="country.id"
           class="bg-white rounded-lg shadow-md p-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <span class="text-gray-600 font-medium">
              #{{ (countryStore.currentPage - 1) * countryStore.countriesPerPage + index + 1 }}
            </span>
            <div class="flex items-center">
              <img :src="country.flagUrl" 
                   alt="Flag" 
                   class="w-6 h-6 rounded-full mr-2 border border-gray-300" />
              <span class="font-medium text-gray-800">{{ country.name }}</span>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-4 gap-2 mb-4">
          <div class="text-center">
            <div class="text-xs text-gray-500 mb-1">Gold</div>
            <div class="font-semibold text-yellow-500">{{ country.gold }}</div>
          </div>
          <div class="text-center">
            <div class="text-xs text-gray-500 mb-1">Silver</div>
            <div class="font-semibold text-gray-500">{{ country.silver }}</div>
          </div>
          <div class="text-center">
            <div class="text-xs text-gray-500 mb-1">Bronze</div>
            <div class="font-semibold text-amber-600">{{ country.bronze }}</div>
          </div>
          <div class="text-center">
            <div class="text-xs text-gray-500 mb-1">Total</div>
            <div class="font-bold text-blue-600">{{ country.total }}</div>
          </div>
        </div>

        <RouterLink
          :to="{ name: 'detail-view', params: { id: country.id } }"
          class="block w-full text-center px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          View details
        </RouterLink>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="mt-4 flex justify-between items-center">
      <button
        @click="countryStore.currentPage > 1 && $router.push({
          query: {
            page: String(countryStore.currentPage - 1),
            pageSize: String(countryStore.countriesPerPage)
          }
        })"
        :disabled="countryStore.currentPage <= 1"
        class="px-4 py-2 bg-gray-300 rounded text-sm transition-opacity"
        :class="{ 'opacity-50 cursor-not-allowed': countryStore.currentPage <= 1 }"
      >
        Previous
      </button>

      <span class="text-sm text-gray-700">
        Page {{ countryStore.currentPage }} of {{ countryStore.totalPages }}
      </span>

      <button
        @click="countryStore.currentPage < countryStore.totalPages && $router.push({
          query: {
            page: String(countryStore.currentPage + 1),
            pageSize: String(countryStore.countriesPerPage)
          }
        })"
        :disabled="countryStore.currentPage >= countryStore.totalPages"
        class="px-4 py-2 bg-gray-300 rounded text-sm transition-opacity"
        :class="{ 'opacity-50 cursor-not-allowed': countryStore.currentPage >= countryStore.totalPages }"
      >
        Next
      </button>
    </div>
  </div>
</template>
