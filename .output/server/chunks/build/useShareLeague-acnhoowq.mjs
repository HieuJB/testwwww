import { a as useRoute, s as systemsStore } from './server.mjs';
import { ref } from 'vue';
import { createSharedComposable } from '@vueuse/core';

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
//# sourceMappingURL=useShareLeague-acnhoowq.mjs.map
