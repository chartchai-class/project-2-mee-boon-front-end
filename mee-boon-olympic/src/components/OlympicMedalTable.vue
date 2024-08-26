<script setup lang="ts">
import { useCountryStore } from '@/stores/countryStore';
import SportList from '@/components/SportList.vue';

const countryStore = useCountryStore();

// Fetch countries when the component is mounted
countryStore.fetchCountries();
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

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <th class="py-3 px-4 font-semibold text-sm uppercase text-left">Rank</th>
              <th class="py-3 px-4 font-semibold text-sm uppercase text-left">Country</th>
              <th class="py-3 px-4 font-semibold text-sm uppercase text-center">🥇 Gold</th>
              <th class="py-3 px-4 font-semibold text-sm uppercase text-center">🥈 Silver</th>
              <th class="py-3 px-4 font-semibold text-sm uppercase text-center">🥉 Bronze</th>
              <th class="py-3 px-4 font-semibold text-sm uppercase text-center">Total</th>
              <th class="py-3 px-4 font-semibold text-sm uppercase text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(country, index) in countryStore.paginatedCountries" :key="country.id">
              <tr class="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                <td class="py-3 px-4 text-gray-800">{{ (countryStore.currentPage - 1) * countryStore.countriesPerPage + index + 1 }}</td>
                <td class="py-3 px-4">
                  <div class="flex items-center">
                    <img :src="country.flagUrl" alt="Flag" class="w-6 h-6 rounded-full mr-3 border border-gray-300" />
                    <span class="font-medium text-gray-700">{{ country.name }}</span>
                  </div>
                </td>
                <td class="py-3 px-4 text-center font-semibold text-yellow-500">{{ country.gold }}</td>
                <td class="py-3 px-4 text-center font-semibold text-gray-500">{{ country.silver }}</td>
                <td class="py-3 px-4 text-center font-semibold text-amber-600">{{ country.bronze }}</td>
                <td class="py-3 px-4 text-center font-bold text-blue-600">{{ country.total }}</td>
                <td class="py-3 px-4 text-center">
                  <button @click="countryStore.toggleDetails(country.id)" 
                          class="text-blue-500 hover:text-blue-700 focus:outline-none transition duration-150">
                    <span class="sr-only">Toggle details</span>
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path :d="countryStore.visibleCountryIds.has(country.id) 
                        ? 'M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z' 
                        : 'M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'"
                      clip-rule="evenodd" fill-rule="evenodd"></path>
                    </svg>
                  </button>
                </td>
              </tr>
              <!-- Details row for sports -->
              <tr v-if="countryStore.visibleCountryIds.has(country.id)" class="bg-blue-50">
                <td colspan="7" class="py-4 px-4">
                  <SportList :sports="country.detail" />
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="mt-4 flex justify-between">
      <button
        @click="countryStore.changePage(countryStore.currentPage - 1)"
        :disabled="countryStore.currentPage === 1"
        class="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span class="text-gray-700">Page {{ countryStore.currentPage }} of {{ countryStore.totalPages }}</span>
      <button
        @click="countryStore.changePage(countryStore.currentPage + 1)"
        :disabled="countryStore.currentPage === countryStore.totalPages"
        class="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>
