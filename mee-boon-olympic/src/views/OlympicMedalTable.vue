OlymTable
<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useCountryStore } from '@/stores/countryStore';
import { useRouter, useRoute } from 'vue-router';

const countryStore = useCountryStore();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  await countryStore.fetchCountries();
  const page = parseInt(route.query.page as string) || 1;
  const pageSize = parseInt(route.query.pageSize as string) || countryStore.countriesPerPage;
  countryStore.currentPage = page;
  countryStore.countriesPerPage = pageSize;
});

watch(
    () => route.query,
    () => {
      const page = parseInt(route.query.page as string) || 1;
      const pageSize = parseInt(route.query.pageSize as string) || countryStore.countriesPerPage;
      countryStore.currentPage = page;
      countryStore.countriesPerPage = pageSize;
    }
);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-semibold text-gray-900">Olympic Medal Table</h1>
        <p class="mt-2 text-sm text-gray-500">Track medal counts for participating nations</p>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-lg shadow">
        <!-- Controls -->
        <div class="p-4 border-b border-gray-100">
          <div class="flex items-center space-x-2">
            <label for="countries-per-page" class="text-sm text-gray-600">Show</label>
            <select
                id="countries-per-page"
                class="form-select w-20 rounded-md border-gray-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                :value="countryStore.countriesPerPage"
                @change="(e) => countryStore.updateCountriesPerPage(parseInt((e.target as HTMLSelectElement)?.value))"
            >
              <option v-for="n in 15" :key="n" :value="n">{{ n }}</option>
            </select>
            <span class="text-sm text-gray-600">entries</span>
          </div>
        </div>

        <!-- Desktop Table -->
        <div class="hidden md:block">
          <table class="w-full">
            <thead>
            <tr class="bg-gray-50">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">#</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                <span class="inline-flex items-center">Gold 🥇</span>
              </th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                <span class="inline-flex items-center">Silver 🥈</span>
              </th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                <span class="inline-flex items-center">Bronze 🥉</span>
              </th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Total</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Actions</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
            <tr v-for="(country, index) in countryStore.paginatedCountries" :key="country.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ (countryStore.currentPage - 1) * countryStore.countriesPerPage + index + 1 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="country.flagUrl" alt="Flag" class="h-6 w-6 rounded-full" />
                  <span class="ml-3 text-sm text-gray-900">{{ country.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-yellow-500">{{ country.gold }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-400">{{ country.silver }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-amber-600">{{ country.bronze }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span class="text-sm font-medium text-gray-900">{{ country.total }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <RouterLink
                    :to="{ name: 'country-view', params: { id: country.id } }"
                    class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                >
                  Details
                </RouterLink>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="md:hidden divide-y divide-gray-200">
          <div
              v-for="(country, index) in countryStore.paginatedCountries"
              :key="country.id"
              class="p-4"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center">
                <span class="text-sm text-gray-500 mr-3">
                  {{ (countryStore.currentPage - 1) * countryStore.countriesPerPage + index + 1 }}
                </span>
                <img :src="country.flagUrl" alt="Flag" class="h-6 w-6 rounded-full" />
                <span class="ml-2 text-sm font-medium text-gray-900">{{ country.name }}</span>
              </div>
            </div>

            <div class="grid grid-cols-4 gap-4 mb-3">
              <div class="text-center">
                <div class="text-xs text-gray-500 mb-1">Gold</div>
                <div class="font-medium text-yellow-500">{{ country.gold }}</div>
              </div>
              <div class="text-center">
                <div class="text-xs text-gray-500 mb-1">Silver</div>
                <div class="font-medium text-gray-400">{{ country.silver }}</div>
              </div>
              <div class="text-center">
                <div class="text-xs text-gray-500 mb-1">Bronze</div>
                <div class="font-medium text-amber-600">{{ country.bronze }}</div>
              </div>
              <div class="text-center">
                <div class="text-xs text-gray-500 mb-1">Total</div>
                <div class="font-medium text-gray-900">{{ country.total }}</div>
              </div>
            </div>

            <RouterLink
                :to="{ name: 'country-view', params: { id: country.id } }"
                class="block w-full text-center px-3 py-2 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
            >
              View Details
            </RouterLink>
          </div>
        </div>

        <!-- Pagination -->
        <div class="px-4 py-3 border-t border-gray-200 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center text-sm text-gray-500">
              Showing page {{ countryStore.currentPage }} of {{ countryStore.totalPages }}
            </div>
            <div class="flex space-x-2">
              <button
                  @click="countryStore.currentPage > 1 && $router.push({
                  query: {
                    page: String(countryStore.currentPage - 1),
                    pageSize: String(countryStore.countriesPerPage)
                  }
                })"
                  :disabled="countryStore.currentPage <= 1"
                  class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                  @click="countryStore.currentPage < countryStore.totalPages && $router.push({
                  query: {
                    page: String(countryStore.currentPage + 1),
                    pageSize: String(countryStore.countriesPerPage)
                  }
                })"
                  :disabled="countryStore.currentPage >= countryStore.totalPages"
                  class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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