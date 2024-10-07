export default defineEventHandler(async (event) => {
  const baseAPI = useRuntimeConfig(event).apiBaseUrl
  const brandCode = useRuntimeConfig(event).brandCode

  const accessToken = getHeader(event, 'Authorization')
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  }

  const data = await $fetch(baseAPI + event._path, {
    method: 'GET',
    headers: headers,
    mode: 'cors',
  })

  return data
})