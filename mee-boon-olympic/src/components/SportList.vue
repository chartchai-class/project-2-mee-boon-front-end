<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div v-if="sports" class="bg-white p-3 rounded shadow-sm">
      <h3 class="font-semibold text-gray-700">{{ sports.sportName }}</h3>
      <p class="text-sm text-gray-600">Medals: {{ sports.medalsUrl }}</p>
      <p class="text-sm text-gray-600">Rank: {{ sports.rank }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { type Detail } from '@/types';

const props = defineProps<{ sports: Detail | null }>();
</script>
