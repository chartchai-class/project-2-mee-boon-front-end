<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DetailList from '@/components/DetailList.vue';
import SportList from '@/components/SportList.vue';
import EventService from '@/services/EventService';

const route = useRoute();
const countryId = route.params.id;
console.log('Country ID:', countryId);

const selectedView = ref<'detail' | 'sportlist'>('detail');

const countryDetails = ref(null);
const countrySports = ref(null);

onMounted(async () => {
  await fetchCountryDetails();
  await fetchCountrySports();
  console.log('Country Details:', countryDetails.value);
  console.log('Country Sports:', countrySports.value);
});


const fetchCountryDetails = async () => {
  try {
    console.log(`Fetching details for country ID: ${countryId}`);
    const response = await EventService.getCountry(parseInt(countryId));
    console.log('Country details:', response.data); // ตรวจสอบข้อมูลที่ดึงมา
    countryDetails.value = response.data;
  } catch (error) {
    console.error('Error fetching country details:', error);
  }
};

const fetchCountrySports = async () => {
  try {
    console.log(`Fetching sports for country ID: ${countryId}`);
    const response = await EventService.getCountry(parseInt(countryId));
    console.log('Country sports:', response.data); // ตรวจสอบข้อมูลที่ดึงมา
    countrySports.value = response.data;
  } catch (error) {
    console.error('Error fetching country sports:', error);
  }
};

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
        <DetailList v-if="selectedView === 'detail' && countryDetails.value" :details="countryDetails.value" />
        <SportList v-if="selectedView === 'sportlist' && countrySports.value" :sports="countrySports.value" />
      </div>
    </div>
  </template>
  