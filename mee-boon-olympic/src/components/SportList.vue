<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import EventService from '@/services/EventService';
import { type Country, type Detail } from '@/types';

const route = useRoute();
const countryId = route.params.id as string;

const country = ref<Country | null>(null);

onMounted(() => {
  EventService.getCountry(Number(countryId))
    .then((response) => {
      country.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching country details:", error);
    });
});
</script>

<template>
  <div v-if="country" class="container mx-auto py-8 px-4">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-3xl font-bold text-indigo-700">{{ country.name }} ({{ country.nocCode }})</h2>
      <img :src="country.flagUrl" :alt="`${country.name} flag`" class="w-12 h-8 object-cover rounded shadow"/>
    </div>
    <p class="text-gray-700 mb-6">{{ country.description }}</p>
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-indigo-100 p-4 rounded-lg">
        <h3 class="font-semibold text-indigo-700">Medal Count</h3>
        <p>🥇 Gold: {{ country.gold }}</p>
        <p>🥈 Silver: {{ country.silver }}</p>
        <p>🥉 Bronze: {{ country.bronze }}</p>
        <p class="font-bold">Total: {{ country.total }}</p>
      </div>
    </div>
    <h3 class="text-2xl font-semibold text-indigo-700 mb-4">Sports Details</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="sport in country.detail" :key="sport.sportName"
        class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-xl">{{ sport.sportName }}</h3>
          <span class="text-2xl">{{ sport.medalsUrl }}</span>
        </div>
        <p class="mt-3 text-sm">
          <span class="font-semibold">Rank:</span> {{ sport.rank }}
        </p>
        <div class="mt-4">
          <RouterLink :to="{ name: 'about' }">
            <button
              class="w-full bg-white text-indigo-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300">
              Cheer for Athlete
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>