<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const fileInput = ref(null)
const imagePreview = ref(null)
const selectedFile = ref<File | null>(null)
const showPassword = ref(false)

// Form data
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  profileImage: null as File | null
})

// Handle image upload
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size should not exceed 2MB')
      return
    }

    selectedFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result
    }
    reader.readAsDataURL(file)
  }
}

// Handle form submission
const handleSubmit = async () => {
  try {
    const submitData = new FormData()
    submitData.append('firstName', formData.value.firstName)
    submitData.append('lastName', formData.value.lastName)
    submitData.append('email', formData.value.email)
    submitData.append('username', formData.value.username)
    submitData.append('password', formData.value.password)
    
    if (selectedFile.value) {
      submitData.append('profileImage', selectedFile.value)
    }

    await authStore.register(submitData)
    router.push('/login')
  } catch (error) {
    console.error('Registration failed:', error)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Left Banner -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <!-- Background Image -->
      <img 
        src="https://images.unsplash.com/photo-1569517282132-25d22f4573e6?q=80&w=1000&auto=format&fit=crop"
        alt="Olympic background" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-indigo-900/80"></div>

      <!-- Content -->
      <div class="relative z-10 w-full flex items-center justify-center p-12">
        <div class="max-w-lg">
          <div class="text-center text-white space-y-4">
            <h1 class="text-5xl font-extrabold tracking-tight leading-tight">
              STAY CONNECTED,<br />
              STAY INFORMED<br />
              REGISTER FOR OLYMPIC<br />
              UPDATES!
            </h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Form -->
    <div class="flex-1 flex items-center justify-center p-6 sm:p-12">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Create your account</h2>
          <p class="mt-2 text-sm text-gray-600">Join us for Olympic updates and news</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Profile Image Upload -->
          <div class="flex flex-col items-center space-y-4">
            <div class="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
              <img 
                v-if="imagePreview" 
                :src="imagePreview" 
                class="w-full h-full object-cover"
                alt="Profile preview"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <input
              type="file"
              ref="fileInput"
              @change="handleImageUpload"
              accept="image/*"
              class="hidden"
            />
            <button
              type="button"
              @click="$refs.fileInput.click()"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Upload Photo
            </button>
          </div>

          <!-- Form Fields -->
          <div class="space-y-4">
            <!-- Name Fields -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  v-model="formData.firstName"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  v-model="formData.lastName"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                v-model="formData.email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Username -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Username</label>
              <input
                v-model="formData.username"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Password</label>
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Account
          </button>
        </form>

        <!-- Login Link -->
        <p class="mt-8 text-center text-sm text-gray-600">
          Already have an account?
          <RouterLink to="/login" class="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
