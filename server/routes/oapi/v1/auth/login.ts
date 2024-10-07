export default defineEventHandler(async (event) => {
  const baseAPI = useRuntimeConfig(event).apiBaseUrl
  const brandCode = useRuntimeConfig(event).brandCode
  const body = await readBody(event)
  // return event
  
  body.brand_code = brandCode
  
  const data = await $fetch(baseAPI + event._path, {
    method: 'POST',
    body: body
  })

  return data
})