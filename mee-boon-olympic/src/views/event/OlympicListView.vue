<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { type Country } from '@/types'
import EventService from '@/services/EventService'
 
const event = ref<Country | null>(null)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
onMounted(() => {
  EventService.getCountry(parseInt(props.id))
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.log('There was an error!', error)
    })
})
</script>
 
<template>
  <div v-if="event" class="container mx-auto py-8">
    <!-- Main Section -->
    <div class="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-lg">
      <!-- Event Details -->
      <div class="text-center md:text-left md:w-1/2 mb-6 md:mb-0">
        <h1 class="text-4xl font-bold text-indigo-600 mb-4">{{ event.name }}</h1>
        <p class="text-gray-600">Welcome to the {{ event.name }} detail page. Explore the details and sports involved in this grand detail.</p>
      </div>

      <!-- Navigation Links -->
      <nav class="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 md:w-1/2 text-center">
        <router-link 
          :to="{ name: 'country-detail-view' }" 
          class="text-lg text-white bg-indigo-500 hover:bg-indigo-600 font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          {{ event.name }} Details
        </router-link>
        
        <router-link 
          :to="{ name: 'sport-list-view' }" 
          class="text-lg text-white bg-indigo-500 hover:bg-indigo-600 font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Sport List
        </router-link>
      </nav>
    </div>

    <!-- Router View Section -->
    <div class="mt-8">
      <RouterView :event="event" />
    </div>
  </div>
</template>
