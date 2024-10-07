export default defineEventHandler(async (event) => {
  const baseAPI = useRuntimeConfig(event).apiBaseUrl
  const brandCode = useRuntimeConfig(event).brandCode

  const accessToken = await getHeader(event, 'Authorization')
  const data = await $fetch(baseAPI + event._path, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data
})