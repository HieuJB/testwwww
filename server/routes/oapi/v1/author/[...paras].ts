export default defineCachedEventHandler(async (event) => {
  const baseAPI = useRuntimeConfig(event).apiBaseUrl
  const brandCode = useRuntimeConfig(event).brandCode
  //const category_code = getRouterParam(event, 'paras')
  
  const subApi = event.req.url?.replace('/api', '')
  const data = await $fetch(baseAPI + subApi)

  return data
})