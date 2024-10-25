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
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-5xl mx-auto px-4 py-8">
      <div>
        <h1 class="text-3xl font-bold text-center text-black-800 mb-8">MEDAL TABLE</h1>
        <ul
          class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6"
        >
          <li>
            <div class="relative mx-auto text-gray-600">
              <input
                class="border border-gray-300 placeholder-current h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none dark:bg-gray-500 dark:border-gray-50 dark:text-gray-200"
                type="search"
                name="search"
                placeholder="Search"
              />

              <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
                <svg
                  class="text-gray-600 dark:text-gray-200 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style="enable-background: new 0 0 56.966 56.966"
                  xml:space="preserve"
                  width="512px"
                  height="512px"
                >
                  <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                  />
                </svg>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
        <div class="mb-6">
          <label for="countries-per-page" class="block text-sm font-medium text-gray-700">
            Number of countries per page (1-15):
          </label>
          <input
            id="countries-per-page"
            type="number"
            class="mt-1 block w-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :value="countryStore.countriesPerPage"
            @input="
              (e) =>
                countryStore.updateCountriesPerPage(parseInt((e.target as HTMLInputElement)?.value))
            "
            min="1"
            max="15"
          />
        </div>

        <!-- Desktop Table View -->
        <div class="hidden md:block">
          <div class="overflow-hidden rounded-lg border border-gray-200">
            <table class="w-full">
              <thead>
                <tr class="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <th
                    class="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-left w-16"
                  >
                    Rank
                  </th>
                  <th class="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-left">
                    Country
                  </th>
                  <th
                    class="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-center w-20"
                  >
                    🥇 Gold
                  </th>
                  <th
                    class="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-center w-20"
                  >
                    🥈 Silver
                  </th>
                  <th
                    class="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-center w-20"
                  >
                    🥉 Bronze
                  </th>
                  <th
                    class="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-center w-20"
                  >
                    Total
                  </th>
                  <th
                    class="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-center w-32"
                  >
                    Details
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="(country, index) in countryStore.paginatedCountries"
                  :key="country.id"
                  class="hover:bg-gray-50 transition duration-150"
                >
                  <td class="py-3 px-4 text-sm text-gray-800">
                    {{ (countryStore.currentPage - 1) * countryStore.countriesPerPage + index + 1 }}
                  </td>
                  <td class="py-3 px-4">
                    <div class="flex items-center">
                      <img
                        :src="country.flagUrl"
                        alt="Flag"
                        class="w-6 h-6 rounded-full mr-3 border border-gray-200"
                      />
                      <span class="font-medium text-sm text-gray-800">{{ country.name }}</span>
                    </div>
                  </td>
                  <td class="py-3 px-4 text-center font-semibold text-sm text-yellow-500">
                    {{ country.gold }}
                  </td>
                  <td class="py-3 px-4 text-center font-semibold text-sm text-gray-500">
                    {{ country.silver }}
                  </td>
                  <td class="py-3 px-4 text-center font-semibold text-sm text-amber-600">
                    {{ country.bronze }}
                  </td>
                  <td class="py-3 px-4 text-center font-bold text-sm text-blue-600">
                    {{ country.total }}
                  </td>
                  <td class="py-3 px-4 text-center">
                    <RouterLink
                      :to="{ name: 'country-view', params: { id: country.id } }"
                      class="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition duration-150"
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
          <div
            v-for="(country, index) in countryStore.paginatedCountries"
            :key="country.id"
            class="bg-white rounded-lg shadow-md p-4"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <span class="text-gray-600 font-medium">
                  #{{ (countryStore.currentPage - 1) * countryStore.countriesPerPage + index + 1 }}
                </span>
                <div class="flex items-center">
                  <img
                    :src="country.flagUrl"
                    alt="Flag"
                    class="w-6 h-6 rounded-full mr-2 border border-gray-300"
                  />
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
              :to="{ name: 'country-view', params: { id: country.id } }"
              class="block w-full text-center px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              View details
            </RouterLink>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="mt-6 flex justify-between items-center">
          <button
            @click="
              countryStore.currentPage > 1 &&
                $router.push({
                  query: {
                    page: String(countryStore.currentPage - 1),
                    pageSize: String(countryStore.countriesPerPage)
                  }
                })
            "
            :disabled="countryStore.currentPage <= 1"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm transition-all hover:bg-gray-200"
            :class="{ 'opacity-50 cursor-not-allowed': countryStore.currentPage <= 1 }"
          >
            Previous
          </button>

          <span class="text-sm text-gray-600 font-medium">
            Page {{ countryStore.currentPage }} of {{ countryStore.totalPages }}
          </span>

          <button
            @click="
              countryStore.currentPage < countryStore.totalPages &&
                $router.push({
                  query: {
                    page: String(countryStore.currentPage + 1),
                    pageSize: String(countryStore.countriesPerPage)
                  }
                })
            "
            :disabled="countryStore.currentPage >= countryStore.totalPages"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm transition-all hover:bg-gray-200"
            :class="{
              'opacity-50 cursor-not-allowed': countryStore.currentPage >= countryStore.totalPages
            }"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
