import { defineStore } from "pinia";

export const systemsStore = defineStore('systems', {

  state: () => ({
    accessToken: '',
    accessTokenOA2: '',
    userData: [],
    configurations: [],
    keywordSearch: '',
    wsSocket: [],
    breadCrumbNav: [],
    title: '',
    optionIframe: '',
  }),

  actions: {
    updateTitle(newTitle) {
      this.title = newTitle;
    },
    updateoptionIframe(newoptionIframe) {
      this.optionIframe = newoptionIframe;
    }
    // CHECK HAS PERMISSION WITH FEATURE & ROLE
    // hasPermisstion(feature: string, role: string) {
    //   return this.permissions?.some(permission => permission?.permission_code?.toUpperCase() === feature?.toUpperCase()
    //   && Array.from(permission?.permission_details_list)?.includes(role.toUpperCase()))
    // },
  },

})
