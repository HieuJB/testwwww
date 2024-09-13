import { l as defineStore, g as useRuntimeConfig } from './server.mjs';

const socketStore = defineStore("socket", {
  state: () => ({
    wssIntances: void 0,
    isLoadedWSS: false
  }),
  actions: {
    connect() {
      if (this.wssIntances) {
        this.wssIntances.close();
      }
      const config = useRuntimeConfig();
      const wssUri = config.public.isEncodeChat == "true" ? config.public.wssEncodeUri : config.public.wssUri;
      try {
        this.wssIntances = new WebSocket(wssUri);
        this.isLoadedWSS = true;
      } catch (e) {
        this.isLoadedWSS = true;
        return false;
      }
    },
    close() {
      if (this.wssIntances) {
        this.wssIntances.close();
      }
    }
  }
});

export { socketStore as s };
//# sourceMappingURL=wsocket-BREvIJI8.mjs.map
