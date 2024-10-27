<template>
      <!-- Chat Section -->
      <aside class="lg:w-80 bg-white rounded-lg shadow-md">
      <!-- Chat Header -->
      <div class="bg-gray-100 p-4 rounded-t-lg">
        <h2 class="font-bold text-gray-800">CHEER UP CHAT</h2>
      </div>
      
      <!-- Chat Messages -->
      <div class="p-4 space-y-3">
        <div v-for="(message, index) in chatMessages" 
             :key="index" 
             class="flex items-center space-x-2 p-2 hover:bg-card-hover rounded">
          <div class="flex-shrink-0">
            <div class="w-6 h-6 rounded-full bg-skin-fill dark:bd-skin-sill flex items-center justify-center">
              <span class="text-xs">👤</span>
            </div>
          </div>
          <div class="flex-grow">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-gray-800">{{ message.user }}</span>
            </div>
            <p class="text-sm text-gray-600">{{ message.text }}</p>
          </div>
        </div>
      </div>

      <!-- Login/Register Section -->
      <div v-if="!user" class="px-4 py-4 bg-gray-100 text-center">
        Please <a href="/login" class="text-blue-500 hover:underline">Login</a> 
        or <a href="/register" class="text-blue-500 hover:underline">Register</a>
        to join the conversation.
      </div>
      <!--chat input-->
      <div v-if="user" class="flex items-center px-4 py-4 border-t">
        <input 
          v-model="newMessage"
          class="flex-grow rounded-l-lg px-3 py-2 mr-2 border text-gray-800" 
          placeholder="Type your message..."
        >
        <button 
          @click="sendMessage"
          class="bg-blue-500 hover:bg-blue-600 rounded-r-lg text-white px-4 py-2"
        >
          Send
        </button>
      </div>
    </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CommentStore } from '@/stores/CommentStore'
import EventService from '@/services/EventService'
import { type Country } from '@/types'
import { UseCommentStore } from '@/stores/CommentStore'

const commentStore = UseCommentStore()

const countries = ref<Country[]>([])
const selectedCountry = ref('')
const isSubmitted = ref(false)
const sortOption = ref('newest')
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
const chatMessages = ref([
  { user: 'User123', text: 'Great job! Amazing performance by the team.' },
  { user: 'Admin', text: 'Wow, what a finish! Congratulations to all the athletes!' }
])

const user = ref(null)
const newMessage = ref('')

function sendMessage() {
  if (newMessage.value.trim()) {
    chatMessages.value.push({ 
      user: user.value ? user.value.name : 'Guest', 
      text: newMessage.value 
    })
    newMessage.value = ''
  }
}
</script>

<style scoped>
/* Additional styles can be added here if necessary */
</style>
