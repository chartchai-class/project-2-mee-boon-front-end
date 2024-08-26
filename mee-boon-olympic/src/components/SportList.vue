<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div v-for="sport in sports" :key="sport.sportName" class="bg-white p-3 rounded shadow-sm">
      <h3 class="font-semibold text-gray-700">{{ sport.sportName }}</h3>
      <p class="text-sm text-gray-600">Medals: {{ sport.medalsUrl }}</p>
      <p class="text-sm text-gray-600">Rank: {{ sport.rank }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { type Detail } from '@/types';

const props = defineProps<{ sports: Detail[] }>();
</script>
