<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '@/components/BaseInput.vue';
import type { Country } from '@/types';
import CountryService from '@/services/EventService';  
import { useMessageStore } from '@/stores/message';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const country = ref<Country>({
  id: 0,
  name: '',
  nocCode: '',
  flagUrl: '',
  basicInfo: '',  // Updated from 'description'
  ownSports: [
    {
      id: 0,
      sportName: '',
      rankPosition: 0,  
      medalsUrl: '',  
    },
  ],
  medals: [
    {
      id: 0,
      goldCount: 0,
      silverCount: 0,
      bronzeCount: 0,
    },
  ],
});

// const medalOptions = [
//   { value: 'gold', label: '🥇 Gold' },
//   { value: 'silver', label: '🥈 Silver' },
//   { value: 'bronze', label: '🥉 Bronze' },
// ];

const router = useRouter();
const store = useMessageStore();  // ใช้สำหรับแสดงข้อความแจ้งเตือน
const isLoading = ref(false);  // สถานะ Loading

function validateCountry() {
  if (!country.value.name || !country.value.nocCode || !country.value.flagUrl || !country.value.basicInfo) {
    store.updateMessage("Please fill out all required fields.")
    return false;
  }
  return true;
}

function addSport() {
  country.value.ownSports.push({
    id: 0,
    sportName: '',
    rankPosition: 0,  
    medalsUrl: '',  
  });
}

function removeSport(index: number) {
  country.value.ownSports.splice(index, 1);
}

function saveCountries() {
  if(authStore.isAdmin) {
 
  if (validateCountry()) {
    isLoading.value = true;
    CountryService.saveCountries(country.value)
      .then((response) => {
        router.push({ name: 'medalHome', params: { id: response.data.id } });
        store.updateMessage(`Country ${response.data.name} created successfully!`);
      })
      .catch((error) => {
        store.updateMessage('Failed to create country. Please try again.');
        console.error('Failed to create country:', error);
        router.push({ name: 'network-error-view' });
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
}
}
</script>

<template>
  <div class=" max-w-5xl mx-auto p-8 mt-20 mb-20 bg-skin-card-primary rounded-3xl shadow-sm">
    <h1 class="text-2xl font-semibold text-skin-base mb-6">Add New Country</h1>

    <div v-if="store.message" class="text-red-500">
      {{ store.message }}
    </div>

    <form @submit.prevent="saveCountries" class="space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <BaseInput v-model="country.name" label="Country Name" />
          <BaseInput v-model="country.nocCode"  label="NOC Code" />
          <BaseInput v-model="country.flagUrl" label="Flag URL" />
          <div>
            <label class="block text-sm font-medium text-skin-secondary">Basic Information</label>
            <textarea
              v-model="country.basicInfo"
              rows="4"
              placeholder="Enter a brief description"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            ></textarea>
          </div>
        </div>

        <div class="space-y-6">
          <h3 class="text-lg font-semibold text-skin-secondary">Medals Count</h3>
          <BaseInput v-model="country.medals[0].goldCount" label="Gold 🥇" type="number" />
          <BaseInput v-model="country.medals[0].silverCount" label="Silver 🥈" type="number" />
          <BaseInput v-model="country.medals[0].bronzeCount" label="Bronze 🥉" type="number" />
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-skin-secondary mb-4">Sports & Rankings</h3>
        <div class="space-y-4">
          <div
            v-for="(sport, index) in country.ownSports"
            :key="index"
            class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <div class="text-2xl">{{ index + 1 }}</div>
            <div>
              Sport Name
              <BaseInput v-model="sport.sportName" placeholder="Sport Name" />
            </div>
            <div>
              Ranking
              <BaseInput v-model="sport.rankPosition" placeholder="Ranking" />
            </div>
            <div>
              Medals
              <select v-model="sport.medalsUrl" class="border rounded p-2">
                
                <option value="🥇">🥇 Gold </option>
                <option value="🥈">🥈 Silver</option>
                <option value="🥉">🥉 Bronze</option>
              </select>            </div>
            <button @click="removeSport(index)" type="button" class="text-red-500">
              Remove
            </button>
          </div>
          <button @click="addSport" type="button" class="text-blue-500">+ Add Sport</button>
        </div>
      </div>

      <div class="flex justify-end">
        <button type="submit" class="button bg-blue-500 rounded px-3 py-2 text-white" :disabled="isLoading">
          <span v-if="isLoading">Loading...</span>
          <span v-else>Submit</span>
        </button>
      </div>
    </form>
  </div>
</template> 