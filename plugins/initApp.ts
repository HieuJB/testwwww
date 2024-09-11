
export default defineNuxtPlugin(async(nuxtApp) => {
  let isMobile = ref(false);
  let isBot = false;

  if(process.server) {
    const headers = useRequestHeaders()
    isMobile.value = /mobile/i.test(headers['user-agent']) && !/ipad/i.test(headers['user-agent']);
    isBot = /moto g power/i.test(headers['user-agent']) && !/ipad/i.test(headers['user-agent']);
  }
  if(process.client) {
    const userAgent = navigator.userAgent || '';
    isBot = /moto g power/i.test(userAgent);
    isMobile.value = /mobile/i.test(userAgent) && !/ipad/i.test(userAgent);  
  } 
    
  nuxtApp.provide('isMobile', isMobile);
  nuxtApp.provide('isBot', isBot);

})
