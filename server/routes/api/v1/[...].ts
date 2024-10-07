import CryptoJS from 'crypto-js';
// import pako from 'pako';
import { Buffer } from 'buffer';

const fetchData  = async () => {
  const url = 'https://stats.ultraffic.info/js/script.js?ver=1.0.1'
  try {
    const response = await fetch(url)
    if (!response.ok) {
      return null
    }
    const scriptContent = await response.text() // Get response body as text
    return parseVariable(scriptContent, 'dec_spdb')
  } catch (error) {
    return null
  }
}

const parseVariable = (scriptContent, variableName) => {
  const regex = new RegExp(`${variableName}\\s*=\\s*['"]([^'"]*)['"]`);
  const match = scriptContent.match(regex)
  return match ? match[1] : null
}

export default defineEventHandler(async (event) => {
  const apiLivescore = useRuntimeConfig(event).apiLivescore
  // return event
  
  const url = apiLivescore + event._path
  // const response = await fetch(url, {
  //   method: 'GET'
  // })
  // if (!response.ok) {
  //   return null;
  // }

  // const data = await response.json();
  // if (data.result !== null) {
  //   const decodedData = decodeDataAPI(data?.result);
  //   return decodedData;
  // } else {
  //   return null;
  // }

  //const data = await $fetch(url)

  try {
    const response = await fetch(url)

    //const responseBlob = await fetch(url + (paras ? ('?' + new URLSearchParams(paras)) : ''))
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    if (data?.result !== null) {
      //const decodeData = decodeDataAPI(data?.result)

      try {
        const keyEncode = await fetchData();
        return [data?.result, keyEncode];
      } catch (error) {
          return null;
      }

      return null
    } else {
      return null;
    }
  }
  catch (e: any) {
    return null
  }

  // return data
})