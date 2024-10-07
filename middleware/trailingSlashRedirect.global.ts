export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== '/' && to.path?.endsWith('/')) {
    return navigateTo({...to,
      path: to.path.slice(0, -1)
    }, { redirectCode: 301 })
  }
});