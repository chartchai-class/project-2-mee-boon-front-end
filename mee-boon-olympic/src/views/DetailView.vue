<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import EventService from '@/services/EventService';
import { type Country } from '@/types';

const route = useRoute();
const countryId = route.params.id as string;

const country = ref<Country | null>(null);

onMounted(() => {
  EventService.getCountry(countryId).then((response) => {
    country.value = response.data;
  }).catch(error => {
    console.error("Error fetching country details:", error);
  });
});
</script>
<template>
    <div class="country-detail-page">
      <div class="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h1 class="text-4xl font-bold">{{ country?.name }}</h1>
      </div>
      <div class="flex mt-6 space-x-6">
        <img :src="country?.flagUrl" alt="Country Flag" class="w-32 h-32 rounded-lg border border-gray-300 shadow-md" />
        <div class="text-lg">
          <p><strong>Name:</strong> {{ country?.name }}</p>
          <p><strong>Code:</strong> {{ country?.nocCode }}</p>
          <p><strong>Details:</strong> {{ country?.description }}</p>
        </div>
      </div>
    </div>
  </template>
