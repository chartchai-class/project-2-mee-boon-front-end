<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Country } from '@/types'

// Declare the countries array and country variable outside the function
const countriesData: Country[] = [
  {
    id: 1,
    name: 'United States of America',
    flag: '🇺🇸',
    gold: 40,
    silver: 44,
    bronze: 42,
    total: 126,
    sports: [
      { name: '3x3 Basketball', gold: 0, silver: 0, bronze: 1 },
      { name: 'Archery', gold: 0, silver: 1, bronze: 1 },
      { name: 'Artistic Gymnastics', gold: 3, silver: 1, bronze: 5 },
      { name: 'Athletics', gold: 14, silver: 11, bronze: 9 },
      // Add more sports as needed...
    ],
    showDetails: false,
  },
  {
    id: 2,
    name: 'People\'s Republic of China',
    flag: '🇨🇳',
    gold: 40,
    silver: 27,
    bronze: 24,
    total: 91,
    sports: [
      { name: 'Weightlifting', gold: 15, silver: 7, bronze: 5 },
      { name: 'Table Tennis', gold: 12, silver: 10, bronze: 7 },
      { name: 'Badminton', gold: 13, silver: 10, bronze: 12 },
      // Add more sports as needed...
    ],
    showDetails: false,
  },
  // Add more countries as needed...
]

const countries = ref<Country[]>([])
const country = ref<Country | undefined>(undefined)

onMounted(() => {
  countries.value = countriesData
})

const toggleDetails = (id: number) => {
  const foundCountry = countries.value.find(c => c.id === id);
  if (foundCountry) {
    country.value = foundCountry;
    country.value.showDetails = !country.value.showDetails;
  }
}
</script>

<template>
  <div class="max-w-full mx-auto p-5">
    <h1 class="text-center text-3xl font-bold mb-6">Medal Table</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-4 font-medium">Order</th>
            <th class="p-4 font-medium">NOCs</th>
            <th class="p-4 font-medium">🥇 Gold</th>
            <th class="p-4 font-medium">🥈 Silver</th>
            <th class="p-4 font-medium">🥉 Bronze</th>
            <th class="p-4 font-medium">Total</th>
            <th class="p-4 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(country, index) in countries" :key="country.id" class="border-b hover:bg-gray-50">
            <td class="p-4">{{ index + 1 }}</td>
            <td class="p-4 flex items-center">
              <span class="mr-2">{{ country.flag }}</span> {{ country.name }}
            </td>
            <td class="p-4">{{ country.gold }}</td>
            <td class="p-4">{{ country.silver }}</td>
            <td class="p-4">{{ country.bronze }}</td>
            <td class="p-4 font-bold">{{ country.total }}</td>
            <td class="p-4">
              <button @click="toggleDetails(country.id)" class="text-blue-500 focus:outline-none">
                {{ country.showDetails ? '-' : '+' }}
              </button>
            </td>
          </tr>

          <!-- Details row for sports -->
          <!-- <tr v-if="country.value?.showDetails" v-for="sport in country.value?.sports" :key="sport.name" class="bg-gray-50">
            <td colspan="2" class="p-4 pl-10">{{ sport.name }}</td>
            <td class="p-4">{{ sport.gold }}</td>
            <td class="p-4">{{ sport.silver }}</td>
            <td class="p-4">{{ sport.bronze }}</td>
            <td class="p-4 font-bold">{{ sport.gold + sport.silver + sport.bronze }}</td>
            <td class="p-4"></td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>
