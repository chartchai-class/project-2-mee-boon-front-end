<template>
  <div class="flex min-h-screen">
    <!-- Left Side: Image and Text -->
    <div class="w-1/2 relative bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1580800933271-54b7dbad3ec8');">
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 class="text-white text-4xl font-bold text-center px-12">
          STAY CONNECTED, STAY INFORMED<br>
          <span class="text-3xl">REGISTER FOR OLYMPIC UPDATES!</span>
        </h1>
      </div>
    </div>

    <!-- Right Side: Form -->
    <div class="w-1/2 flex flex-col justify-center items-center p-12 bg-white">
      <div class="w-full max-w-md">
        <h2 class="text-center text-3xl font-extrabold mb-8 text-gray-900">Create your account</h2>
        
        <form class="space-y-6" @submit.prevent="onSubmit" method="POST">
          <!-- Form fields -->
          <div class="space-y-4">
            <div>
              <label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstname"
                v-model="firstname"
                placeholder="Enter your first name"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                :class="{ 'border-red-500': errors['firstname'] }"
              />
              <p v-if="errors['firstname']" class="mt-2 text-sm text-red-600">{{ errors['firstname'] }}</p>
            </div>

            <div>
              <label for="lastname" class="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastname"
                v-model="lastname"
                placeholder="Enter your last name"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                :class="{ 'border-red-500': errors['lastname'] }"
              />
              <p v-if="errors['lastname']" class="mt-2 text-sm text-red-600">{{ errors['lastname'] }}</p>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                id="email"
                v-model="email"
                placeholder="Enter your email address"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                :class="{ 'border-red-500': errors['email'] }"
              />
              <p v-if="errors['email']" class="mt-2 text-sm text-red-600">{{ errors['email'] }}</p>
            </div>

            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                v-model="username"
                placeholder="Create a username"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                :class="{ 'border-red-500': errors['username'] }"
              />
              <p v-if="errors['username']" class="mt-2 text-sm text-red-600">{{ errors['username'] }}</p>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                v-model="password"
                placeholder="Create a strong password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                :class="{ 'border-red-500': errors['password'] }"
              />
              <p v-if="errors['password']" class="mt-2 text-sm text-red-600">{{ errors['password'] }}</p>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="!isFormValid"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Register
            </button>
          </div>
        </form>

        <p class="mt-8 text-center text-sm text-gray-600">
          Already a member?
          <RouterLink to="/Login" class="font-medium text-indigo-600 hover:text-indigo-500">Log in here</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const authStore = useAuthStore();

const validationSchema = yup.object({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
  },
});

const { value: firstname } = useField<string>('firstname');
const { value: lastname } = useField<string>('lastname');
const { value: email } = useField<string>('email');
const { value: username } = useField<string>('username');
const { value: password } = useField<string>('password');

const onSubmit = handleSubmit((values) => {
  authStore.register(values.firstname, values.lastname, values.email, values.username, values.password)
    .then(() => {
      router.push({ name: 'login' });
    }).catch((err) => {
      console.error(err);
    });
});
</script>

<style scoped>
/* Additional styles can be added here if necessary */
</style>
