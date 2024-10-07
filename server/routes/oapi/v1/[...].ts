import { stringifyQuery } from 'ufo'
import { toValue, type MaybeRefOrGetter } from 'vue'

export default defineEventHandler(async (event) => {
  const baseAPI = useRuntimeConfig(event).apiBaseUrl
  const brandCode = useRuntimeConfig(event).brandCode
  const _url = toValue(baseAPI)
  
  // const data = await $fetch(baseAPI + event._path + '&brand_code=' + brandCode)
  const query =  getQuery(event)
  const _query = toValue(query)
  query.brand_code = brandCode

  const queryObj = Object.fromEntries(
    Object.entries(_query).map(([key, val]) => [key, toValue(val)]),
  )
  
  try {
    const data = await $fetch(`${_url}${getRequestURL(event)?.pathname}${queryObj ? `?${stringifyQuery(queryObj)}` : ''}`)
    return data
  } catch(e) {
    return null
  }
})