<script setup lang="ts">
import { ref } from 'vue';
import DetailList from '@/components/DetailList.vue';
import SportList from '@/components/SportList.vue';

const selectedView = ref<'detail' | 'sportlist'>('detail'); 

const sports = ref([
  { sportName: 'Sport 1', medalsUrl: 'Medals URL', rank: 1 },
  { sportName: 'Sport 2', medalsUrl: 'Medals URL', rank: 2 }
]);

const details = ref([
  { name: 'Detail 1', description: 'Description 1', rank: 1 }
]);
</script>

<template>
  <div class="olympic-list-view">
    <div class="buttons mb-4">
      <button @click="selectedView = 'detail'" :class="{ 'bg-blue-500 text-white': selectedView === 'detail' }" class="px-4 py-2 mr-2 bg-gray-200 rounded">
        Details
      </button>
      <button @click="selectedView = 'sportlist'" :class="{ 'bg-blue-500 text-white': selectedView === 'sportlist' }" class="px-4 py-2 bg-gray-200 rounded">
        Sport List
      </button>
    </div>

    <div class="view-container">
      <DetailList v-if="selectedView === 'detail'" :details="details" />
      <SportList v-if="selectedView === 'sportlist'" :sports="sports" />
    </div>
  </div>
</template>
