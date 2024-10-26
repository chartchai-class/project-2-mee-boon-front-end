<!-- LoginView.vue -->
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
          <h2 class="text-3xl font-bold text-gray-900">Login</h2>
          <p class="mt-2 text-sm text-gray-600">Welcome back to Olympic Updates</p>
        </div>

        <form @submit="onSubmit" class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1 relative">
              <input type="email" v-model="email"
                class="block w-full px-4 py-3 rounded-lg border border-gray-200 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter your email" />
              <div class="absolute left-3 top-3.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1 relative">
              <input :type="showPassword ? 'text' : 'password'" v-model="password"
                class="block w-full px-4 py-3 rounded-lg border border-gray-200 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter your password" />
              <div class="absolute left-3 top-3.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input type="checkbox" v-model="rememberMe"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label class="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>

          <!-- Login Button -->
          <button type="submit"
            class="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200">
            Sign In
          </button>
        </form>

        <!-- Register Link -->
        <p class="mt-8 text-center text-sm text-gray-600">
          Don't have an account?
          <RouterLink to="/register" class="font-medium text-blue-600 hover:text-blue-500">
            Sign Up here
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
const showPassword = ref(false)
const rememberMe = ref(false)

// Validation schema
const schema = yup.object({
  email: yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
})

const { handleSubmit, errors } = useForm({
  validationSchema: schema
})

const { value: email } = useField('email')
const { value: password } = useField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login({
      email: values.email,
      password: values.password,
      rememberMe: rememberMe.value
    })
    // Handle successful login (e.g., redirect to dashboard)
  } catch (error) {
    console.error('Login failed:', error)
    // Handle login error
  }
})
</script>