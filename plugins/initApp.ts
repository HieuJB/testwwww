
export default defineNuxtPlugin(async(nuxtApp) => {
  let isMobile = ref(false);
  let isBot = false;

  if(process.server) {
    const headers = useRequestHeaders()
    isMobile.value = /mobile/i.test(headers['user-agent']) && !/ipad/i.test(headers['user-agent']);
    isBot = /moto g/i.test(headers['user-agent']) && !/ipad/i.test(headers['user-agent']);
  }
  if(process.client) {
    const userAgent = navigator.userAgent || '';
    isBot = /moto g/i.test(userAgent);
    if(!isBot) {
      const {useWindowSize} = await import('@vueuse/core')
      const { width } = useWindowSize()
      watchEffect(() => {
        isMobile.value = width.value <= 768
      })
    } else {
      isMobile.value = /mobile/i.test(userAgent) && !/ipad/i.test(userAgent);  
    }
  } 
    
  nuxtApp.provide('isMobile', isMobile);
  nuxtApp.provide('isBot', isBot);

})
