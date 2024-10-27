<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useCountryStore } from '@/stores/countryStore'
import { useRouter, useRoute } from 'vue-router'

const countryStore = useCountryStore()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  await countryStore.fetchCountries()
  const page = parseInt(route.query.page as string) || 1
  const pageSize = parseInt(route.query.pageSize as string) || countryStore.countriesPerPage
  countryStore.currentPage = page
  countryStore.countriesPerPage = pageSize
})

watch(
  () => route.query,
  () => {
    const page = parseInt(route.query.page as string) || 1
    const pageSize = parseInt(route.query.pageSize as string) || countryStore.countriesPerPage
    countryStore.currentPage = page
    countryStore.countriesPerPage = pageSize
  }
)
</script>
<style>
* {
  transition: background-color 0.5s ease, color 0.3s ease, border-color 0.3s ease;
}
</style>

<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-skin-fill dark:bg-skin-primary">
      <!-- Header with Responsive Design -->
      <div
        class="mb-8 py-6 sm:py-8 px-6 sm:px-10 bg-[#eceff3] dark:bg-[#1e293b] rounded-lg"
      >
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8"
        >
          <div class="">
            <h1 class="text-2xl sm:text-3xl font-semibold text-skin-base ">
              Olympic Medal Table
            </h1>
            <p class="mt-2 text-sm text-skin-base">
              Track medal counts for participating nations
            </p>
          </div>

          <!-- Right side: Search -->
          <div class="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search countries..."
              class="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border bg-skin-secondary dark:bg-skin-secondary text-skin-base dark:text-skin-base placeholder-skin-muted focus:ring-2 focus:ring-skin-button-accent focus:border-transparent"
            />
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-skin-muted"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="text-skin-base bg-skin-card-muted hover: dark:bg-skin-card-muted-hover rounded-lg shadow">
        <!-- Controls -->
        <div class="p-4 border-b">
          <div class="flex items-center space-x-2 text-skin-secondary dark:text-skin-base">
            <label for="countries-per-page" class="text-sm">Show</label>
            <select
              id="countries-per-page"
              class="form-select w-20 rounded-md text-skin-base dark:text-skin-base text-sm"
              :value="countryStore.countriesPerPage"
              @change="
                (e) =>
                  countryStore.updateCountriesPerPage(
                    parseInt((e.target as HTMLSelectElement)?.value)
                  )
              "
            >
              <option v-for="n in 15" :key="n" :value="n">{{ n }}</option>
            </select>
            <span class="text-sm ">entries</span>
          </div>
        </div>

        <!-- Desktop Table -->
        <div class="hidden md:block">
          <table class="w-full">
            <thead>
              <tr class="bg-skin-header-table">
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-skin-base uppercase tracking-wider w-16"
                >
                  #
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-skin-base uppercase tracking-wider"
                >
                  Country
                </th>
                <th
                  class="px-6 py-3 text-center text-xs font-medium text-skin-gold uppercase tracking-wider w-24"
                >
                  <span class="inline-flex items-center">Gold 🥇</span>
                </th>
                <th
                  class="px-6 py-3 text-center text-xs font-medium text-skin-silver uppercase tracking-wider w-24"
                >
                  <span class="inline-flex items-center">Silver 🥈</span>
                </th>
                <th
                  class="px-6 py-3 text-center text-xs font-medium text-skin-bronze uppercase tracking-wider w-24"
                >
                  <span class="inline-flex items-center">Bronze 🥉</span>
                </th>
                <th
                  class="px-6 py-3 text-center text-xs font-medium text-skin-base uppercase tracking-wider w-24"
                >
                  Total
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-skin-base uppercase tracking-wider w-32"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-skin-base">
              <tr
                v-for="(country, index) in countryStore.paginatedCountries"
                :key="country.id"
                :class="[
                  index % 2 === 0 ? 'hover:bg-skin-fill' : 'hover:bg-skin-fill',
                  'hover:bg-skin-card-hover'
                ]"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-skin-base">
                  {{ (countryStore.currentPage - 1) * countryStore.countriesPerPage + index + 1 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img :src="country.flagUrl" alt="Flag" class="h-6 w-6 rounded-full" />
                    <span class="ml-3 text-sm text-skin-base">{{ country.name }}</span>
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-skin-gold"
                >
                  {{ country.gold }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-skin-silver"
                >
                  {{ country.silver }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-skin-bronze"
                >
                  {{ country.bronze }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-skin-base"
                >
                  {{ country.total }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right ">
                  <RouterLink
                    :to="{ name: 'country-view', params: { id: country.id } }"
                    class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-skin-base border border:skin-base hover:bg-skin-button-hover hover:text-skin-muted dark:text-skin-base"
                  >
                    Details
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="md:hidden divide-y divide-skin-base">
          <div
            v-for="(country, index) in countryStore.paginatedCountries"
            :key="country.id"
            class="p-4 bg-skin-primary dark:bg-skin-primary dark:bg-skin-sec"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center">
                <span class="text-sm text-skin-muted mr-3">
                  {{ (countryStore.currentPage - 1) * countryStore.countriesPerPage + index + 1 }}
                </span>
                <img :src="country.flagUrl" alt="Flag" class="h-6 w-6 rounded-full" />
                <span class="ml-2 text-sm font-medium text-skin-base">{{ country.name }}</span>
              </div>
            </div>

            <div class="grid grid-cols-4 gap-4 mb-3">
              <div class="text-center">
                <div class="text-xs text-skin-muted mb-1">Gold</div>
                <div class="font-medium text-skin-gold">{{ country.gold }}</div>
              </div>
              <div class="text-center">
                <div class="text-xs text-skin-muted mb-1">Silver</div>
                <div class="font-medium text-skin-silver">{{ country.silver }}</div>
              </div>
              <div class="text-center">
                <div class="text-xs text-skin-muted mb-1">Bronze</div>
                <div class="font-medium text-skin-bronze">{{ country.bronze }}</div>
              </div>
              <div class="text-center">
                <div class="text-xs text-skin-muted mb-1">Total</div>
                <div class="font-medium text-skin-base">{{ country.total }}</div>
              </div>
            </div>

            <RouterLink
              :to="{ name: 'country-view', params: { id: country.id } }"
              class="block w-full text-center px-3 py-2 border text-sm font-medium rounded text-skin-inverted bg-skin-button-accent hover:bg-skin-button-hover transition-colors duration-200"
            >
              View Details
            </RouterLink>
          </div>
        </div>

        <!-- Pagination -->
        <div class="px-4 py-3 border-t">
          <div class="flex items-center justify-between">
            <div class="flex items-center text-sm text-skin-muted">
              Showing page {{ countryStore.currentPage }} of {{ countryStore.totalPages }}
            </div>
            <div class="flex space-x-2">
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
                class="inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md text-skin-base bg-skin-primary dark:bg-skin-primary hover:bg-skin-row-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
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
                class="inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md text-skin-base bg-skin-seconday dark:bg-skin-primary hover:bg-skin-row-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
