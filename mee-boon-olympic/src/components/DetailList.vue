<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import EventService from '@/services/EventService';
import { type Country } from '@/types';

const route = useRoute();
const countryId = route.params.id as string;
const country = ref<Country | null>(null);

onMounted(() => {
  EventService.getCountry(countryId)
    .then((response) => {
      country.value = response.data;
    })
    .catch(error => {
      console.error("Error fetching country details:", error);
    });
});
</script>

<template>
  <div v-if="country" class="country-detail-page max-w-4xl mx-auto px-4 py-8">
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-xl shadow-2xl mb-8">
      <h1 class="text-4xl md:text-5xl font-bold mb-2">{{ country.name }}</h1>
      <p class="text-xl opacity-80">{{ country.nocCode }}</p>
    </div>

    <div class="flex flex-col md:flex-row gap-8">
      <img 
        :src="country.flagUrl" 
        :alt="`${country.name} Flag`" 
        class="w-full md:w-1/3 h-auto rounded-lg shadow-lg border-4 border-white"
      />
      <div class="flex-1 bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Country Details</h2>
        <p class="text-gray-600 mb-4"><span class="font-semibold text-gray-800">Name:</span> {{ country.name }}</p>
        <p class="text-gray-600 mb-4"><span class="font-semibold text-gray-800">Code:</span> {{ country.nocCode }}</p>
        <p class="text-gray-600"><span class="font-semibold text-gray-800">Description:</span> {{ country.description }}</p>
      </div>
    </div>

    <div class="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Medal Count</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-yellow-100 p-4 rounded-lg text-center">
          <p class="text-2xl font-bold text-yellow-600">{{ country.gold }}</p>
          <p class="text-sm text-gray-600">Gold 🥇</p>
        </div>
        <div class="bg-gray-200 p-4 rounded-lg text-center">
          <p class="text-2xl font-bold text-gray-600">{{ country.silver }}</p>
          <p class="text-sm text-gray-600">Silver 🥈</p>
        </div>
        <div class="bg-orange-100 p-4 rounded-lg text-center">
          <p class="text-2xl font-bold text-orange-600">{{ country.bronze }}</p>
          <p class="text-sm text-gray-600">Bronze 🥉</p>
        </div>
        <div class="bg-blue-100 p-4 rounded-lg text-center">
          <p class="text-2xl font-bold text-blue-600">{{ country.total }}</p>
          <p class="text-sm text-gray-600">Total</p>
        </div>
      </div>
    </div>
  </div>
</template>