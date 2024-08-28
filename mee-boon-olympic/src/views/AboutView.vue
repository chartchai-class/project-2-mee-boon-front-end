<template>
  <div class="comment-section bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold text-indigo-800 mb-6">Cheer Up Your Athlete!</h2>

    <div class="mb-6">
      <label for="country-select" class="block text-sm font-medium text-gray-700 mb-2">Select a country:</label>
      <select id="country-select" v-model="selectedCountry"
        class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
        <option v-for="country in countries" :key="country.id" :value="country.name">
          {{ country.name }}
        </option>
      </select>
    </div>

    <form @submit.prevent="addCommentHandler" class="mb-8">
      <textarea v-model="newComment" placeholder="Write your comment here..." rows="4"
        class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-4"></textarea>
      <button type="submit"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out">
        SEND CHEER
      </button>
    </form>

    <div v-if="Object.keys(commentStore.comments).length" class="comments-list bg-white p-6 rounded-lg shadow">
      <h3 class="text-2xl font-semibold text-indigo-800 mb-4">All Cheers:</h3>
      <div v-for="(countryData, country) in commentStore.comments" :key="country" class="mb-6">
        <h4 v-if="countryData.comments.length > 0" class="text-xl font-medium text-indigo-600 mb-2 flex items-center">
          <img v-if="countryData.flagUrl" :src="countryData.flagUrl" :alt="`${country} flag`"
            class="w-6 h-4 mr-2 inline-block rounded-sm" />
          Cheers for {{ country }}:
        </h4>
        <ul class="space-y-2">
          <li v-for="(comment, index) in countryData.comments" :key="index"
            class="bg-indigo-50 p-3 rounded-md shadow-sm">
            {{ comment }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CommentStore } from '@/stores/CommentStore' // นำเข้า store ที่สร้างขึ้น
import EventService from '@/services/EventService'
import { type Country } from '@/types'

const countries = ref<Country[]>([])
const selectedCountry = ref('')
const commentStore = CommentStore() // ใช้ store สำหรับ comments
// const comments = ref<{ [key: string]: { comments: string[], flagUrl: string } }>({});
const newComment = ref('')

const fetchCountries = async () => {
  try {
    const response = await EventService.getEvent()
    countries.value = response.data
    selectedCountry.value = countries.value[0]?.name || ''
  } catch (error) {
    console.error('Error fetching countries:', error)
  }
}

const addCommentHandler = () => {
  if (!selectedCountry.value || !newComment.value.trim()) return;

  const country = countries.value.find(c => c.name === selectedCountry.value);
  if (!country) return;

  commentStore.addComment(selectedCountry.value, newComment.value.trim(), country.flagUrl);
  newComment.value = '';
};

onMounted(() => {
  fetchCountries()
})
</script>
<style scoped>
/* Tailwind classes are used in the template, so no additional styles are needed here */
</style>
