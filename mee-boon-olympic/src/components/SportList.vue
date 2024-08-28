<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import EventService from '@/services/EventService';
import { type Detail } from '@/types';

const route = useRoute();
const countryId = route.params.id as string;

const sports = ref<Detail[]>([]);

onMounted(() => {
  EventService.getCountry(Number(countryId))
    .then((response) => {
      sports.value = response.data.detail;
    })
    .catch((error) => {
      console.error("Error fetching country details:", error);
    });
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <div v-for="sport in sports" :key="sport.sportName"
      class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-xl">{{ sport.sportName }}</h3>
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
</template>
