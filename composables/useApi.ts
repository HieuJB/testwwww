import { decodeDataAPI } from '~/utils/livescore_helper';
//const { useLocale } = useShareCommon()

export const useApiLiveScore = async (url = '', paras: any | undefined, isEncode = true) => {
  try {
  //let params =  {...paras, ...{'lang': useLocale?.value.defaultLocale}}
  if (isEncode) {
    try {
      const { data, pending, error, refresh, status }  = await useFetch<any>(url + (paras ? ('?' + new URLSearchParams(paras)) : ''))
      return await decodeDataAPI(data?.value?.[0], data?.value?.[1])
    }
    catch (e: any) {
      return null
    }
  } else {
    try {
      const { data, pending, error, refresh }  = await useFetch<any>(createUrl(url, paras))
      return {data: data}
    }
    catch (e: any) {
      return null
    }
  }
}
catch (e: any) {
  return null
}
}