import { u as useRoute } from './server.mjs';
import { ref } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { s as systemsStore } from './systems-4bvS4IvZ.mjs';

const useShareLeague = createSharedComposable(() => {
  const route = useRoute();
  systemsStore();
  const infoLeague = ref(null);
  return {
    route,
    infoLeague
  };
});

export { useShareLeague as u };
//# sourceMappingURL=useShareLeague-D0Pb7jdL.mjs.map
