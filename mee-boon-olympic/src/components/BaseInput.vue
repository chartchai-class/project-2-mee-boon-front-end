<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';

interface BaseInputProps {
  label: string;
  modelValue: string | number;
}

const props = withDefaults(defineProps<BaseInputProps>(), {
  label: '',
});

const emit = defineEmits(['update:modelValue']);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <label v-if="props.label">
    {{ props.label }}
  </label>
  <input
    class="mb-6 w-full px-3 py-2 border rounded-md"
    :value="props.modelValue"
    @input="onInput"
    :placeholder="props.label"
  />
</template>