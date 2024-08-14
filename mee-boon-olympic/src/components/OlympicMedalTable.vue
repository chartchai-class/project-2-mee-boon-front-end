<script setup lang="ts">
import { ref, onMounted } from 'vue'

import Country from '@/types'

// Sample data (this can be replaced with data fetched from an API)
const countries = ref<Country[]>([])

// Fetch the data or load sample data
onMounted(() => {
  countries.value = [
    { id: 1, name: 'USA', gold: 39, silver: 41, bronze: 33, total: 113 },
    { id: 2, name: 'China', gold: 38, silver: 32, bronze: 18, total: 88 },
    { id: 3, name: 'Japan', gold: 27, silver: 14, bronze: 17, total: 58 },
    { id: 4, name: 'Great Britain', gold: 22, silver: 21, bronze: 22, total: 65 },
    { id: 5, name: 'ROC', gold: 20, silver: 28, bronze: 23, total: 71 }
  ]
})
</script>
<template>
  <div class="medal-table">
    <h1 class="text-center text-2xl font-bold mb-4">Olympic Medal Table</h1>
    <table class="table-auto w-full">
      <thead>
        <tr class="bg-gray-200">
          <th class="px-4 py-2">Rank</th>
          <th class="px-4 py-2">Country</th>
          <th class="px-4 py-2">Gold</th>
          <th class="px-4 py-2">Silver</th>
          <th class="px-4 py-2">Bronze</th>
          <th class="px-4 py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(country, index) in countries"
          :key="country.id"
          :class="{ 'bg-gray-100': index % 2 === 0 }"
        >
          <td class="border px-4 py-2">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ country.name }}</td>
          <td class="border px-4 py-2">{{ country.gold }}</td>
          <td class="border px-4 py-2">{{ country.silver }}</td>
          <td class="border px-4 py-2">{{ country.bronze }}</td>
          <td class="border px-4 py-2">{{ country.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.medal-table {
  max-width: 600px;
  margin: 0 auto;
  border-collapse: collapse;
}

table {
  width: 100%;
  margin-bottom: 20px;
}

th,
td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
}

thead {
  background-color: #f8f8f8;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
