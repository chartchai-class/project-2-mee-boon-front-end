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
          <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form class="space-y-6" @submit.prevent="onSubmit" method="POST">
            <!-- First Name -->
            <div>
              <label for="firstname" class="block text-sm font-medium text-gray-900">First Name</label>
              <InputText type="text" v-model="firstname" placeholder="First Name" :error="errors['firstname']" />
            </div>
  
            <!-- Last Name -->
            <div>
              <label for="lastname" class="block text-sm font-medium text-gray-900">Last Name</label>
              <InputText type="text" v-model="lastname" placeholder="Last Name" :error="errors['lastname']" />
            </div>
  
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-900">Email address</label>
              <InputText type="email" v-model="email" placeholder="Email address" :error="errors['email']" />
            </div>
  
            <!-- Username -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-900">Username</label>
              <InputText type="text" v-model="username" placeholder="Username" :error="errors['username']" />
            </div>
  
            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-900">Password</label>
              <InputText type="password" v-model="password" placeholder="Password" :error="errors['password']" />
            </div>
  
            <!-- Submit Button -->
            <div>
              <button type="submit"
                class="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600">
                Register
              </button>
            </div>
          </form>
          <p class="mt-6 text-center text-sm text-gray-500">
            Already a member?
            <RouterLink to="/Login" class="font-semibold text-indigo-600 hover:text-indigo-500">Log in here</RouterLink>
          </p>
  
          <!-- Social Login Buttons -->
          <div class="mt-6">
            <div class="text-center text-sm text-gray-500">Or login with</div>
            <div class="mt-4 flex justify-center space-x-4">
              <button class="bg-white border border-gray-300 rounded-full p-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google" class="h-6 w-6">
              </button>
              <button class="bg-white border border-gray-300 rounded-full p-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png" alt="Facebook" class="h-6 w-6">
              </button>
              <button class="bg-white border border-gray-300 rounded-full p-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/512px-Octicons-mark-github.svg.png" alt="GitHub" class="h-6 w-6">
              </button>
            </div>
          </div>
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
  