<template>
  <select class="exercise-selector" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
    <option v-for="exercise in exercises" :key="exercise.id" :value="exercise.id">
      {{ exercise.name }}
    </option>
  </select>
</template>

<script setup>
import { exercises } from '../data/exercises';

defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>

<style scoped>
.exercise-selector {
  padding: 8px;
  font-size: 16px;
  margin: 20px 0;
}
</style>