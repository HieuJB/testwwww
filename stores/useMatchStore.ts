import { defineStore } from "pinia";

interface State {
  wssSocket: WebSocket | undefined
  loadingMessages: boolean
  loadingMember: boolean
  socketData: any
}

export const useMatchStore = defineStore('match', {
  state: (): State => ({
    wssSocket: undefined,
    loadingMessages: false,
    loadingMember: false,
    socketData: []
  }),

  actions: {

  },
})
