<template>
  <div class="breathing-circles">
    <div class="outer-circle">
      <div 
        class="inner-circle"
        :style="{ transform: `scale(${scale})` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  scale: {
    type: Number,
    default: 0
  }
});
</script>

<style scoped>
.breathing-circles {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

.outer-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner-circle {
  width: 100%; /* Changed from 80% to 100% */
  height: 100%; /* Changed from 80% to 100% */
  background-color: #4CAF50;
  border-radius: 50%;
  transition: transform 0.1s linear;
  transform-origin: center center;
}
</style>