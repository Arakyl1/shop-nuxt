 
import { computed, nextTick, ref, watch } from '#imports';

export default () => {
    const progress = ref(0);
    const pause = ref<boolean>(false);

    const startProgress = computed(() => progress.value > 0 && progress.value < 100);

    function runProgress() {
        if (pause.value || progress.value >= 100) return;
        progress.value = progress.value + 1;
        setTimeout(runProgress, 70);
    }

    function updatePause(value: typeof pause.value = !pause.value) {
        pause.value = value;
    }

    function updateProgress(value: number) {
        progress.value = value;
    }

    function resetProgress() {
        progress.value = 0;
    }

    function refreshProgress() {
        resetProgress();
        updatePause(false);
        nextTick(() => runProgress());
    }

    watch(
        () => pause.value,
        (newV) => {
            if (!newV && startProgress.value) {
                runProgress();
            }
        }
    );

    return { progress, pause, runProgress, updateProgress, startProgress, updatePause, refreshProgress };
};
