<!-- RegisterView.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Left Banner -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <!-- Background Image -->
      <img
        src="https://images.unsplash.com/photo-1461567933755-6c82be2197da?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Olympic background" class="absolute inset-0 w-full h-full object-cover" />

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-900/80"></div>

      <!-- Content -->
      <div class="relative z-10 w-full flex items-center justify-center p-12">
        <div class="max-w-lg">
          <div class="text-center text-white space-y-4">
            <h1 class="text-5xl font-extrabold tracking-tight leading-tight">
              STAY CONNECTED,<br />
              STAY INFORMED<br />
              LOG IN FOR OLYMPIC<br />
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
          <p class="mt-2 text-sm text-gray-600">Join us for Olympic updates</p>
        </div>

        <form @submit.prevent="onSubmit" class="space-y-6">
          <!-- Profile Image Upload -->
          <div class="flex flex-col items-center space-y-4">
            <div class="relative group">
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
                <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    @click="$refs.fileInput.click()"
                    class="text-white text-sm"
                  >
                    Change Photo
                  </button>
                </div>
              </div>
              <input
                type="file"
                ref="fileInput"
                @change="handleImageUpload"
                accept="image/*"
                class="hidden"
              />
            </div>
            <p class="text-xs text-gray-500">PNG or JPG (max. 2MB)</p>
            <p v-if="errors.image" class="text-sm text-red-500">{{ errors.image }}</p>
          </div>

          <!-- Name Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- First Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                v-model="firstName"
                class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter first name"
              />
              <p v-if="errors.firstName" class="mt-1 text-sm text-red-500">{{ errors.firstName }}</p>
            </div>

            <!-- Last Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                v-model="lastName"
                class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter last name"
              />
              <p v-if="errors.lastName" class="mt-1 text-sm text-red-500">{{ errors.lastName }}</p>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1 relative">
              <input
                type="email"
                v-model="email"
                class="block w-full px-4 py-3 rounded-lg border border-gray-200 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter your email"
              />
              <div class="absolute left-3 top-3.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
          </div>

          <!-- Username -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Username</label>
            <div class="mt-1 relative">
              <input
                type="text"
                v-model="username"
                class="block w-full px-4 py-3 rounded-lg border border-gray-200 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Choose a username"
              />
              <div class="absolute left-3 top-3.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <p v-if="errors.username" class="mt-1 text-sm text-red-500">{{ errors.username }}</p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1 relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                class="block w-full px-4 py-3 rounded-lg border border-gray-200 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Create a strong password"
              />
              <div class="absolute left-3 top-3.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
          </div>

          <!-- Register Button -->
          <button
            type="submit"
            class="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            Create Account
          </button>
        </form>

        <!-- Login Link -->
        <p class="mt-8 text-center text-sm text-gray-600">
          Already a member?
          <RouterLink to="/login" class="font-medium text-blue-600 hover:text-blue-500">
            Log in here
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const fileInput = ref(null)
const imagePreview = ref(null)
const selectedFile = ref(null)
const showPassword = ref(false)

// Validation schema
const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
  image: yup.mixed().test('fileSize', 'File size must not exceed 2MB', (value) => {
    if (!value) return true
    return value.size <= 2000000
  })
})

const { handleSubmit, errors } = useForm({
  validationSchema: schema
})

const { value: firstName } = useField('firstName')
const { value: lastName } = useField('lastName')
const { value: email } = useField('email')
const { value: username } = useField('username')
const { value: password } = useField('password')

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2000000) {
      errors.value.image = 'File size must not exceed 2MB'
      return
    }

    if (!file.type.match(/image.*/)) {
      errors.value.image = 'Please upload an image file'
      return
    }

    selectedFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const onSubmit = handleSubmit(async (values) => {
  try {
    const formData = new FormData()
    formData.append('firstName', values.firstName)
    formData.append('lastName', values.lastName)
    formData.append('email', values.email)
    formData.append('username', values.username)
    formData.append('password', values.password)
    if (selectedFile.value) {
      formData.append('image', selectedFile.value)
    }

    await authStore.register(formData)
    // Redirect after successful registration
  } catch (error) {
    console.error('Registration failed:', error)
  }
})
</script>