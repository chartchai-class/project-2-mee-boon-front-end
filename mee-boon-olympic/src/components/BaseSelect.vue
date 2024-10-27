<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';
import type { SportDetail } from '@/types';

interface BaseSelectProps {
  label: string;
  modelValue: number;
  options: SportDetail[];
}

const props = withDefaults(defineProps<BaseSelectProps>(), {
  label: '',
});

const emit = defineEmits(['update:modelValue']);

function onSelect(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', Number(target.value));
}
</script>

<template>
  <label v-if="props.label">{{ props.label }}</label>
  <select class="mb-6 w-full px-3 py-2 border rounded-md" :value="props.modelValue" @change="onSelect">
    <option v-for="option in props.options" :key="option.id" :value="option.id">
      {{ option.sportName }}
    </option>
  </select>
</template>