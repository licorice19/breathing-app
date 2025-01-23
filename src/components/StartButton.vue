<template>
  <button class="start-button" @click="$emit('click')" :disabled="disabled">
    {{ isRunning ? 'Stop' : 'Start' }}
  </button>
</template>

<script setup>
defineProps({
  isRunning: Boolean,
  disabled: Boolean
});
defineEmits(['click']);
</script>

<style scoped>
.start-button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.start-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>