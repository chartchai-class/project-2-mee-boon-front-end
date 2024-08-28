<template>
    <div class="detail-list">
      <div v-for="detail in details" :key="detail.name" class="bg-white p-3 rounded shadow-sm">
        <h3 class="font-semibold text-gray-700">{{ detail.name }}</h3>
        <p class="text-sm text-gray-600">{{ detail.description }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import { type Country } from '@/types';
  
  const props = defineProps<{ details: Country[] }>();
  </script>
  