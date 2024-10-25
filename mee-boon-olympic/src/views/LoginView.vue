<template>
  <div class="flex min-h-screen">
    <!-- Left Side: Image and Text -->
    <div class="w-1/2 relative bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1580800933271-54b7dbad3ec8');">
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 class="text-white text-3xl font-bold text-center px-6">
          STAY CONNECTED, STAY INFORMED <br> LOG IN FOR OLYMPIC UPDATES!
        </h1>
      </div>
    </div>
  
    <!-- Right Side: Form -->
    <div class="w-1/2 flex flex-col justify-center p-8 bg-white">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
      </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form class="space-y-6" @submit.prevent="onSubmit" method="POST">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-900">Email address</label>
            <input
              id="email"
              type="email"
              v-model="email"
              placeholder="Email address"
              :class="[
                'mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                errors['email'] ? 'border-red-300' : 'border-gray-300'
              ]"
            />
            <p v-if="errors['email']" class="mt-1 text-sm text-red-600">{{ errors['email'] }}</p>
          </div>
          
          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-900">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              placeholder="Password"
              :class="[
                'mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                errors['password'] ? 'border-red-300' : 'border-gray-300'
              ]"
            />
            <p v-if="errors['password']" class="mt-1 text-sm text-red-600">{{ errors['password'] }}</p>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="!isFormValid"
              :class="[
                'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white',
                isFormValid
                  ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  : 'bg-indigo-300 cursor-not-allowed'
              ]"
            >
              Login
            </button>
          </div>
        </form>
        <p class="mt-6 text-center text-sm text-gray-500">
          Don't have an account?
          <RouterLink to="/Register" class="font-medium text-indigo-600 hover:text-indigo-500">Sign Up here</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth.ts';
import router from '@/router';
import { computed } from 'vue';

const authStore = useAuthStore();

const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
const { errors, handleSubmit, meta } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: '',
  },
});
const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

const isFormValid = computed(() => {
  return meta.value.valid && email.value && password.value;
});

const onSubmit = handleSubmit((values) => {
  authStore.login(values.email, values.password)
    .then(() => {
      router.push({ name: 'home' });
      console.log('login success');
    }).catch((err) => {
      console.error(err);
    });
});
</script>

<style scoped>
/* Additional styles can be added here if necessary */
input {
  appearance: none;
  border-width: 1px;
  padding: 0.5rem 0.75rem;
}
</style>
