<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DetailList from '@/components/DetailList.vue';
import SportList from '@/components/SportList.vue';
import { useCountryStore } from '@/stores/countryStore';

const route = useRoute();
const countryId = parseInt(route.params.id as string);

const countryStore = useCountryStore();
const selectedView = ref<'detail' | 'sportlist'>('detail');

onMounted(() => {
  countryStore.fetchCountryDetails(countryId);
});
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
      <DetailList v-if="selectedView === 'detail'" :details="countryStore.details" />
      <SportList v-if="selectedView === 'sportlist'" :sports="countryStore.sports" />
    </div>
  </div>
</template>
