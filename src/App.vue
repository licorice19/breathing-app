<template>
  <div class="app-container">
    <h1>Breathing</h1>
    
    <ExerciseSelector
      v-model="currentExerciseId"
      :disabled="isRunning"
    />
    
    <div class="exercise-container">
      <InstructionText 
        :instruction="currentInstruction"
        :remaining-seconds="remainingSeconds"
      />
      <BreathingCircles :scale="scale" />
      <CountdownTimer
        :count="countdownValue"
        :show="showCountdown"
      />
    </div>
    
    <StartButton
      :is-running="isRunning"
      :disabled="showCountdown"
      @click="startExercise"
    />
  </div>
</template>

<script setup>
import BreathingCircles from './components/BreathingCircles.vue';
import ExerciseSelector from './components/ExerciseSelector.vue';
import StartButton from './components/StartButton.vue';
import CountdownTimer from './components/CountdownTimer.vue';
import InstructionText from './components/InstructionText.vue';
import { useBreathingExercise } from './composables/useBreathingExercise';

const {
  isRunning,
  currentExerciseId,
  scale,
  showCountdown,
  countdownValue,
  currentInstruction,
  remainingSeconds,
  startExercise
} = useBreathingExercise();
</script>

<style>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.exercise-container {
  position: relative;
  margin: 40px 0;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}
</style>