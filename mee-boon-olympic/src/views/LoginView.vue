<template>
  <div
    class="min-h-screen flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-b from-blue-50 to-white"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- Olympic Rings -->
      <div class="flex justify-center space-x-2 mb-8">
        <div class="w-8 h-8 rounded-full border-4 border-blue-500"></div>
        <div class="w-8 h-8 rounded-full border-4 border-yellow-500"></div>
        <div class="w-8 h-8 rounded-full border-4 border-black"></div>
        <div class="w-8 h-8 rounded-full border-4 border-green-500"></div>
        <div class="w-8 h-8 rounded-full border-4 border-red-500"></div>
      </div>

      <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
        Mee boon Olympic Games Portal
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">Sign in to access your Olympic account</p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="bg-white p-8 rounded-lg shadow-xl border border-gray-100">
        <!-- แสดงข้อความข้อผิดพลาด -->
        <div v-if="loginError" class="mb-4 text-sm text-red-600">
          {{ loginError }}
        </div>

        <form class="space-y-6" @submit.prevent="onSubmit">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <InputText
              type="text"
              id="email"
              name="email"
              v-model="email"
              placeholder="Email address"
              :error="errors['email']"
              class="mt-2"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
              <div class="text-sm">
                <a
                  href="#"
                  class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <InputText
              type="password"
              v-model="password"
              placeholder="Password"
              :error="errors['password']"
            />
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
            >
              Sign in to Olympic Portal
            </button>
          </div>
        </form>

        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Not a member?</span>
            </div>
          </div>

          <div class="mt-6 text-center">
            <button
              type="button"
              class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200"
              @click="goToRegister"
            >
              Register for Olympic Account
            </button>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <p class="text-xs text-gray-500">Protected by Olympic Committee Security</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue' // นำเข้า ref จาก Vue

const router = useRouter()
const authStore = useAuthStore()
const loginError = ref('') // สร้างตัวแปร reactive สำหรับเก็บข้อความข้อผิดพลาด

const validationSchema = yup.object({
  email: yup.string().required('The email is required'),
  password: yup.string().required('The password is required')
})

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: ''
  }
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  loginError.value = '' // รีเซ็ตข้อความข้อผิดพลาดก่อน
  try {
    await authStore.login(values.email, values.password)
    router.push({ name: 'medalHome' })
  } catch (error) {
    // กำหนดข้อความข้อผิดพลาดเมื่อการล็อกอินไม่สำเร็จ
    loginError.value = 'Incorrect email or password. Please try again.'
  }
})

const goToRegister = () => {
  router.push({ name: 'register' })
}


</script>
