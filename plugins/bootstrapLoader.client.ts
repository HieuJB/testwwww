import { useRouter } from '#app'
import { ref } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  const scriptsLoaded = ref(false)
  let scriptsPromise = null

  const loadScripts = () => {
    if (!scriptsPromise) {
      scriptsPromise = new Promise((resolve, reject) => {
        if (scriptsLoaded.value) {
          resolve()
          return
        }

        const loadScript = (src) => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = src
            script.type = 'text/javascript'
            script.async = true
            script.defer = true
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
          })
        }

        Promise.all([
          loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js'),
        ]).then(() => {
          scriptsLoaded.value = true
          resolve()
        }).catch(reject)
      })
    }
    return scriptsPromise
  }

  const handleFirstInteraction = () => {
    loadScripts().then(() => {}).catch()

    document.removeEventListener('mousemove', handleFirstInteraction)
    document.removeEventListener('touchstart', handleFirstInteraction)
    document.removeEventListener('keydown', handleFirstInteraction)
  }

  const router = useRouter()
  router.isReady().then(() => {
    if (router.currentRoute.value.path === '/') {
      document.addEventListener('mousemove', handleFirstInteraction, { once: true })
      document.addEventListener('touchstart', handleFirstInteraction, { once: true })
      document.addEventListener('keydown', handleFirstInteraction, { once: true })
    } else {
      loadScripts().then(() => {}).catch()
    }
  })

  nuxtApp.provide('loadScripts', loadScripts)
  nuxtApp.provide('isloadScripts', scriptsLoaded)
})
