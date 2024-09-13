import { l as defineStore } from './server.mjs';

const useMatchStore = defineStore("match", {
  state: () => ({
    wssSocket: void 0,
    loadingMessages: false,
    loadingMember: false,
    socketData: []
  }),
  actions: {}
});

export { useMatchStore as u };
//# sourceMappingURL=useMatchStore-Dgc_MSrX.mjs.map
