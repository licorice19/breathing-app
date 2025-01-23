<template>
  <div class="instruction-container">
    <transition name="fade">
      <div v-if="instruction" class="instruction-text">
        {{ instruction }}
        <div class="remaining-time" v-if="remainingSeconds > 0">
          {{ remainingSeconds }}s
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  instruction: {
    type: String,
    default: ''
  },
  remainingSeconds: {
    type: Number,
    default: 0
  }
});
</script>

<style scoped>
.instruction-container {
  position: relative;
  height: 40px;
  margin-bottom: 20px;
}

.instruction-text {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.remaining-time {
  font-size: 18px;
  color: #666;
  margin-top: 3px;
  margin-bottom: 3px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>