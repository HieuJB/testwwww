import { defineStore } from "pinia";
export const socketStore = defineStore('socket', {

  state: () => ({
    wssIntances: undefined,
    isLoadedWSS: false,
  }),

  actions: {
    connect() {
      if (this.wssIntances) {
        this.wssIntances.close()
      }

      const config = useRuntimeConfig()
      const wssUri = (config.public.isEncodeChat == 'true') ? config.public.wssEncodeUri : config.public.wssUri
      
      try {
        this.wssIntances = new WebSocket(wssUri)
        this.isLoadedWSS = true
      }
      catch (e: any) {
        this.isLoadedWSS = true
        return false
        //console.error(e)
      }
    },

    close() {
      if (this.wssIntances) {
        this.wssIntances.close()
      }
    }
  },

})

// Socket Init
export const initWSocket = () => {
  const store = socketStore()
  const isLoggedIn = !!(useCookie('userData').value && useCookie('accessToken').value)
}
