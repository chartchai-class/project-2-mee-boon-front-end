<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
const messageStore = useMessageStore()
const authStore = useAuthStore()
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { RouterLink, useRouter } from 'vue-router'

const validationSchema = yup.object({
  username: yup.string().required('The username is required'),
  email: yup.string().required('The email is required').email('The email is not valid'),
  firstname: yup.string().required('The firstname is required'),
  lastname: yup.string().required('The lastname is required'),
  password: yup
    .string()
    .required('The password is required')
    .min(6, 'The password must be at least 6 characters')
})

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    username: ''
  }
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')
const { value: username } = useField<string>('username')

const router = useRouter()

const onSubmit = handleSubmit((values) => {
  authStore
    .register(values.email, values.password, values.username, values.firstname, values.lastname)
    .then(() => {
      router.push({ name: 'login' })
    })
    .catch((err) => {
      messageStore.updateMessage('could not register')
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    })
})
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <div class="m-auto w-full max-w-md">
      <div class="bg-white rounded-lg shadow-xl p-8">
        <div class="text-center">
          <img
            class="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label>
              <InputText type="text" v-model="firstname" :error="errors['firstname']" class="mt-1"></InputText>
            </div>
            <div>
              <label for="lastname" class="block text-sm font-medium text-gray-700">Last Name</label>
              <InputText type="text" v-model="lastname" :error="errors['lastname']" class="mt-1"></InputText>
            </div>
          </div>

          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <InputText type="username" v-model="username" :error="errors['username']" class="mt-1"></InputText>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <InputText type="email" v-model="email" :error="errors['email']" class="mt-1"></InputText>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <InputText
              type="password"
              v-model="password"
              placeholder="Min. 6 characters"
              :error="errors['password']"
              class="mt-1"
            />
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p class="mt-8 text-center text-sm text-gray-600">
          Already a member?
          <RouterLink
            to="/login"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in to your account
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>