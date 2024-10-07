<template>
</template>

<script setup>
import { useSound } from '@vueuse/sound';
import _soundGoal0 from '@/public/assets/sound/sound0.mp3';
import _soundGoal1 from '@/public/assets/sound/sound1.mp3';
import _soundGoal2 from '@/public/assets/sound/sound2.mp3';
import _soundGoal3 from '@/public/assets/sound/sound3.mp3';
const playbackRate = ref(1);

const soundGoal0 = useSound(_soundGoal0, {
  playbackRate,
  interrupt: true,
});
const soundGoal1 = useSound(_soundGoal1, {
  playbackRate,
  interrupt: true,
});
const soundGoal2 = useSound(_soundGoal2, {
  playbackRate,
  interrupt: true,
});
const soundGoal3 = useSound(_soundGoal3, {
  playbackRate,
  interrupt: true,
});

const sound = defineModel('sound');

watch(
  () => sound.value,
  () => {
    if (sound.value !== null) {
      if (sound.value === 'soundGoal0') {
        soundGoal0.play();
      }
      if (sound.value === 'soundGoal1') {
        soundGoal1.play();
      }
      if (sound.value === 'soundGoal2') {
        soundGoal2.play();
      }
      if (sound.value === 'soundGoal3') {
        soundGoal3.play();
      }
      setTimeout(()=> {
        sound.value = null;
      },500)
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
</style>
