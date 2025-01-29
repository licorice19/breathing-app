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
    var lock = null

    const enableWakeLock = async () => {
        try {
            if (!navigator.wakeLock) {
                throw new Error('Wake Lock API not supported');
            }
            const lock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock: ON');
            
            return lock;
        } catch (err) {
            console.error(`${err.name}, ${err.message}`);
            return null;
        }
    };
    
    const disableWakeLock = async (lock) => {
        try {
            if (!lock) {
                console.log('No wake lock to release');
                return;
            }
            if (lock.released) {
                console.log('Wake Lock already released');
                return;
            }
            await lock.release();
            console.log('Wake Lock: OFF');
        } catch (err) {
            console.error(`${err.name}, ${err.message}`);
        }
    }; 

    let intervalId = null;
    let currentStep = 0;
    let currentRepetition = 0;

    const currentExercise = computed(() =>
        exercises.find(ex => ex.id === Number(currentExerciseId.value))
    );

    const startExercise = async () => {
        if (isRunning.value) {
              await stopExercise();
            return;
        }
        lock = await enableWakeLock()
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

        intervalId = setInterval( async () => {
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
                        await stopExercise();
                        return;
                    }
                }

                runStep();
            }
        }, 16);
    };

    const stopExercise = async () => {
        isRunning.value = false;
        clearInterval(intervalId);
        scale.value = 0.0;
        currentInstruction.value = '';
        remainingSeconds.value = 0;
        lock = await disableWakeLock(lock)
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