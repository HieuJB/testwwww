export default defineEventHandler(async (event) => {
  const baseAPI = useRuntimeConfig(event).apiBaseUrl
  const brandCode = useRuntimeConfig(event).brandCode
  // return event
  const subApi = event.req.url?.replace('/api', '')
  const data = await $fetch(baseAPI + subApi + '&brand_code=' + brandCode)

  return data
})