sport list
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import EventService from '@/services/EventService';
import { type Country,Medal } from '@/types';

const route = useRoute();
const countryId = route.params.id as string;

const country = ref<Country | null>(null);
const medal = ref<Medal | null>(null);


onMounted(() => {
  EventService.getCountry(Number(countryId))
      .then((response) => {
        country.value = response.data;

        // คำนวณจำนวนเหรียญรวม
        if (country.value && country.value.medals.length > 0) {
          const medal = country.value.medals[0];
          country.value.goldCount = medal.goldCount;
          country.value.silverCount = medal.silverCount;
          country.value.bronzeCount = medal.bronzeCount;
          country.value.totalMedals = medal.goldCount + medal.silverCount + medal.bronzeCount;
        } else if (country.value) {
          country.value.goldCount = 0;
          country.value.silverCount = 0;
          country.value.bronzeCount = 0;
          country.value.totalMedals = 0;
        }
      })
      .catch((error) => {
        console.error("Error fetching country details:", error);
      });
});
</script>

<template>
  <div v-if="country" class="container mx-auto py-8 px-4 max-w-6xl">
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-xl shadow-2xl mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-4xl font-bold mb-2">{{ country.name }}</h2>
          <p class="text-xl opacity-80">{{ country.nocCode }}</p>
        </div>
        <img :src="country.flagUrl" :alt="`${country.name} flag`" class="w-20 h-14 md:w-32 md:h-24 object-cover rounded-lg shadow-md"/>
      </div>
    </div>

    <div class="bg-blue-50 p-6 rounded-lg shadow-lg mb-8">
      <h3 class="text-2xl font-semibold text-blue-800 mb-4">Medal Count</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-yellow-100 p-4 rounded-lg text-center">
          <p class="text-3xl md:text-4xl font-bold text-yellow-600">{{ medal.goldCount }}</p>
          <p class="text-sm text-gray-600">Gold 🥇</p>
        </div>
        <div class="bg-gray-200 p-4 rounded-lg text-center">
          <p class="text-3xl md:text-4xl font-bold text-gray-600">{{ medal.silverCount }}</p>
          <p class="text-sm text-gray-600">Silver 🥈</p>
        </div>
        <div class="bg-orange-100 p-4 rounded-lg text-center">
          <p class="text-3xl md:text-4xl font-bold text-orange-600">{{ medal.bronzeCount }}</p>
          <p class="text-sm text-gray-600">Bronze 🥉</p>
        </div>
        <div class="bg-blue-100 p-4 rounded-lg text-center">
          <p class="text-3xl md:text-4xl font-bold text-blue-600">{{ country.total }}</p>
          <p class="text-sm text-gray-600">Total</p>
        </div>
      </div>
    </div>

    <div v-if="country.ownSports && country.ownSports.length" class="bg-white p-6 rounded-lg shadow-lg">
      <h3 class="text-2xl font-semibold text-blue-800 mb-6">Sports Details</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="sport in country.ownSports" :key="sport.id"
             class="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-102">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-bold text-xl">{{ sport.sportName }}</h4>
            <span class="text-3xl">{{ sport.medalsUrl }}</span>
          </div>
          <p class="mb-4">
            <span class="font-semibold">Rank:</span> {{ sport.rankPosition }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="bg-white p-6 rounded-lg shadow-lg">
      <p class="text-center text-gray-600">No sports details available for this country.</p>
    </div>

  </div>


</template>
