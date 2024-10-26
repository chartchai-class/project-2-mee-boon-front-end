<!-- src/components/ProfileImageUpload.vue -->
<template>
    <div class="space-y-4">
      <!-- Image Preview -->
      <div class="relative w-32 h-32 mx-auto">
        <img 
          v-if="modelValue"
          :src="modelValue"
          class="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
          alt="Profile preview"
        />
        <div 
          v-else 
          class="w-full h-full rounded-full bg-gray-100 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
        </div>
      </div>
  
      <!-- Upload Button -->
      <div class="flex justify-center">
        <label class="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <svg class="mr-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Upload Photo
          <input
            type="file"
            class="hidden"
            accept="image/*"
            @change="handleImageUpload"
          />
        </label>
      </div>
      
      <p v-if="error" class="text-sm text-red-600 text-center">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const props = defineProps<{
    modelValue: string | null
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void
  }>()
  
  const error = ref('')
  
  const handleImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      const file = input.files[0]
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        error.value = 'Image size must be less than 2MB'
        return
      }
  
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|png|jpg)$/)) {
        error.value = 'Only JPG, JPEG and PNG files are allowed'
        return
      }
  
      const reader = new FileReader()
      reader.onload = (e) => {
        error.value = ''
        emit('update:modelValue', e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  </script>