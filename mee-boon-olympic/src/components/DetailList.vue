<template>
    <div class="detail-list">
      <div v-if="details.length" class="bg-white p-3 rounded shadow-sm">
        <h3 class="font-semibold text-gray-700">{{ details.name }}</h3>
        <p class="text-sm text-gray-600">{{ details.description }}</p>
      </div>
      <div v-else>
        <p>No details available for this country.</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import { type Detail } from '@/types';
  
  const props = defineProps<{ details: Detail[] }>();
  </script>
  