<template>
    <div class="max-w-3xl mx-auto bg-skin-fill-alt dark:bg-skin-sec rounded-xl shadow">
      <!-- Comment Section Header -->
      <div class="p-6 border-b border-skin-base">
        <h2 class="text-xl font-semibold text-skin-base">
          Comments ({{ comments.length }})
        </h2>
      </div>
  
      <!-- Comment Form -->
      <div class="p-6 border-b border-skin-base">
        <!-- Show if logged in -->
        <div v-if="isLoggedIn" class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-skin-button-accent"></div>
            <div>
              <p class="text-skin-base font-medium">Test User</p>
              <p class="text-skin-muted text-sm">Posting publicly</p>
            </div>
          </div>
  
          <div class="space-y-2">
            <textarea
              v-model="newComment"
              rows="3"
              class="w-full rounded-lg border border-skin-base bg-skin-fill dark:bg-skin-fill p-4 text-skin-base placeholder-skin-muted focus:ring-2 focus:ring-skin-button-accent resize-none"
              placeholder="Share your thoughts..."
            ></textarea>
            <div class="flex justify-between items-center">
              <p class="text-xs text-skin-muted">
                {{ newComment.length }}/500 characters
              </p>
              <button
                @click="addComment"
                :disabled="!newComment.trim()"
                class="px-6 py-2 bg-skin-button-accent hover:bg-skin-button-hover text-skin-inverted rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
  
        <!-- Show if not logged in -->
        <div v-else class="bg-skin-fill dark:bg-skin-fill rounded-lg p-6 text-center">
          <div class="space-y-3">
            <div class="w-12 h-12 bg-skin-muted rounded-full mx-auto"></div>
            <p class="text-skin-base font-medium">Join the conversation</p>
            <p class="text-skin-muted text-sm">Log in to share your thoughts</p>
            <button
              @click="toggleLogin"
              class="inline-block px-6 py-2 bg-skin-button-accent hover:bg-skin-button-hover text-skin-inverted rounded-lg transition-colors duration-200"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
  
      <!-- Comments List -->
      <div class="divide-y divide-skin-base">
        <template v-if="comments.length > 0">
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="p-6 hover:bg-skin-fill dark:hover:bg-skin-fill transition-colors duration-200"
          >
            <div class="flex justify-between items-start">
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 rounded-full bg-skin-button-accent"></div>
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="font-medium text-skin-base">{{ comment.userName }}</span>
                  </div>
                  <p class="mt-1 text-skin-base">{{ comment.content }}</p>
                </div>
              </div>
  
              <button
                v-if="isLoggedIn"
                @click="deleteComment(comment.id)"
                class="p-1 text-skin-muted hover:text-red-500 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </template>
  
        <!-- Empty State -->
        <div v-else class="p-12 text-center">
          <p class="text-lg font-medium text-skin-base">No comments yet</p>
          <p class="text-skin-muted">Be the first to share your thoughts!</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const isLoggedIn = ref(false)
  const newComment = ref('')
  const comments = ref([
    {
      id: 1,
      userName: 'John Doe',
      content: 'This is a test comment!',
      date: '2 hours ago'
    },
    {
      id: 2,
      userName: 'Jane Smith',
      content: 'Another test comment here.',
      date: '1 hour ago'
    }
  ])
  
  const toggleLogin = () => {
    isLoggedIn.value = !isLoggedIn.value
  }
  
  const addComment = () => {
    if (!newComment.value.trim()) return
  
    comments.value.unshift({
      id: comments.value.length + 1,
      userName: 'Test User',
      content: newComment.value,
      date: 'Just now'
    })
    newComment.value = ''
  }
  
  const deleteComment = (id: number) => {
    comments.value = comments.value.filter(comment => comment.id !== id)
  }
  </script>