import { l as defineStore } from './server.mjs';

const actionsStore = defineStore("actions", {
  state: () => ({
    isOpenLoginForm: false,
    isOpenRegisterForm: false,
    isOpenFilterLeague: false,
    isOpenSearchForm: false
  }),
  actions: {
    // CHECK HAS PERMISSION WITH FEATURE & ROLE
    // hasPermisstion(feature: string, role: string) {
    //   return this.permissions?.some(permission => permission?.permission_code?.toUpperCase() === feature?.toUpperCase()
    //   && Array.from(permission?.permission_details_list)?.includes(role.toUpperCase()))
    // },
  }
});

export { actionsStore as a };
//# sourceMappingURL=useActions-CkrJjy4V.mjs.map
