import { createSharedComposable } from '@vueuse/core';
import { systemsStore } from '~/stores/systems';

export const useShareLeague = createSharedComposable(() => {
  const route = useRoute();
  const storeSystems = systemsStore();
  const infoLeague = ref(null);

  return {
    route,
    infoLeague,
  };
});