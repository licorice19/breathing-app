import { ref, computed } from 'vue';
import { exercises } from '../data/exercises';

export function useBreathingExercise() {
    const isRunning = ref(false);
    const currentExerciseId = ref(1);
    const scale = ref(0.0);
    const showCountdown = ref(false);
    const countdownValue = ref(3);
    const currentInstruction = ref('');
    const remainingSeconds = ref(0);

    let intervalId = null;
    let currentStep = 0;
    let currentRepetition = 0;

    const currentExercise = computed(() =>
        exercises.find(ex => ex.id === Number(currentExerciseId.value))
    );

    const startExercise = () => {
        if (isRunning.value) {
            stopExercise();
            return;
        }

        showCountdown.value = true;
        countdownValue.value = 3;

        const countdownInterval = setInterval(() => {
            countdownValue.value--;
            if (countdownValue.value === 0) {
                clearInterval(countdownInterval);
                showCountdown.value = false;
                startBreathingSequence();
            }
        }, 1000);
    };

    const startBreathingSequence = () => {
        isRunning.value = true;
        currentStep = 0;
        currentRepetition = 0;
        runStep();
    };

    const runStep = () => {
        if (!isRunning.value) return;

        const exercise = currentExercise.value;
        const step = exercise.sequence[currentStep];
        const stepDuration = step.duration * 1000;
        const startTime = Date.now();

        remainingSeconds.value = step.duration;

        switch (step.type) {
            case 'inhale':
                currentInstruction.value = 'Inhale';
                break;
            case 'exhale':
                currentInstruction.value = 'Exhale';
                break;
            case 'hold':
                currentInstruction.value = 'Hold';
                break;
        }

        intervalId = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / stepDuration, 1);

            remainingSeconds.value = Math.ceil((stepDuration - elapsed) / 1000);
            
            switch (step.type) {
                case 'inhale':
                    scale.value = progress;
                    break;
                case 'exhale':
                    scale.value = 1 - progress;
                    break;
                case 'hold':
                    break;
            }

            if (progress >= 1) {
                clearInterval(intervalId);
                currentStep++;

                if (currentStep >= exercise.sequence.length) {
                    currentStep = 0;
                    currentRepetition++;

                    if (currentRepetition >= exercise.repetitions) {
                        stopExercise();
                        return;
                    }
                }

                runStep();
            }
        }, 16);
    };

    const stopExercise = () => {
        isRunning.value = false;
        clearInterval(intervalId);
        scale.value = 0.0;
        currentInstruction.value = '';
        remainingSeconds.value = 0;
    };

    return {
        isRunning,
        currentExerciseId,
        scale,
        showCountdown,
        countdownValue,
        startExercise,
        stopExercise,
        currentInstruction,
        remainingSeconds,
    };
}