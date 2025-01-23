<template>
  <div v-if="show" class="countdown">
    {{ count }}
  </div>
</template>

<script setup>
defineProps({
  count: Number,
  show: Boolean
});
</script>

<style scoped>
.countdown {
  font-size: 48px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>