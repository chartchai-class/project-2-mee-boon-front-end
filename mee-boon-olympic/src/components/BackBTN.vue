<template>
  <button
    @click="goBack"
    class="flex items-center text-skin-base font-medium text-sm px-10 py-2 rounded"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-8"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    targetPath: {
      type: String,
      required: true
    }
  },
  methods: {
    goBack() {
      this.$router.push(this.targetPath)
    }
  }
}
</script>
