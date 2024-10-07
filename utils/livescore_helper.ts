import CryptoJS from 'crypto-js';
import pako from 'pako';
import { Buffer } from 'buffer';
import { parseIntO } from './helper';

// Decode using key mapping in server
export const decodeDataAPI = async (data: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; }, keyEncode = '') => {
  if (!data)
    return null

  try {
    const encryptedData = Buffer.from(data, 'hex');
    //const key = 'f87bf7eb29e13d3353ad0efeee00ab03';
    const key = keyEncode;
    // const key = dec_spdb;
    const decryptedBytes = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.lib.WordArray.create(Uint8Array.from(encryptedData)) },
        CryptoJS.enc.Utf8.parse(key),
        { mode: CryptoJS.mode.ECB }
    );
    const decryptedBase64 = decryptedBytes.toString(CryptoJS.enc.Base64);
    //const decompressedData = zlib.inflateSync(Buffer.from(decryptedBase64, 'base64')).toString('utf8');
    const decompressedData = pako.inflate(Buffer.from(decryptedBase64, 'base64'), { to: 'string' });
    const jsonData = JSON.parse(decompressedData);
    return jsonData;
  } catch (error) {
      return null;
  }
}

export const getLiveScoreImage = (path: string, subpath: string) => {
  const config = useRuntimeConfig()
  
  return config.public.liveScoreImage + '/' + subpath + '/' + path
}

export const groupBy  = (array: V[], grouper: (item: V) => K) => {
  try {
    return array.reduce((store, item) => {
      var key = grouper(item)
      if (!store.has(key)) {
        store.set(key, [item])
      } else {
        store.get(key).push(item)
      }
      return store
    }, new Map<K, V[]>())
  } catch (error) {
    return null;
  }
}

export const groupByTimeAndComp  = (array: V[]) => {
  try {
    return array.reduce((store, item) => {
      const key = item.match_time + '_' + item.competition + '_' + item.status
      if (!store.has(key)) {
        store.set(key, [item])
      } else {
        store.get(key).push(item)
      }
      return store
    }, new Map<K, V[]>())
  } catch (error) {
    return null;
  }
}

export const getStatusDisplay = (match: { status: string; match_time: string; matchMinutes: string; }, $t: (arg0: string) => string, timeZone: any) => {
//return formatDateMomentUTCTimeZone(match?.match_time, 'HH:mm', timeZone)
  let statusToDisplay = '-'
  const status = match?.status;
  if (['8', '10'].includes(status)) {
    statusToDisplay = formatDateMomentUTCTimeZone(match?.match_time, 'HH:mm', timeZone)
    if (match?.status === '8') {
      statusToDisplay += '<b class="status ms-3">' + $t('FT') + '</b>'
    }
  } else if (['12'].includes(status)) {
    statusToDisplay = $t('Cancel')
  } else if (['2', '4', '5'].includes(status)) {
    if(match?.matchMinutes) {
      statusToDisplay = match?.matchMinutes + '<img src="/icon/in.gif" border="0" alt="in" width="3" height="8">'
    } else {
      statusToDisplay = formatDateMomentUTCTimeZone(match?.match_time, 'HH:mm', timeZone)
    }

  } else {
    if (status === '7') {
      statusToDisplay = '<b class="status ms-1">PS</b>'
    } else if (status === '3') {
      statusToDisplay = '<b class="status ms-1">HT</b>'
    } else {
      statusToDisplay = formatDateMomentUTCTimeZone(match?.match_time, 'HH:mm', timeZone)
    }
  }

  return statusToDisplay
}

export const getStatusDisplayMobile = (match: { status: string; match_time: string; matchMinutes: string; }, $t: (arg0: string) => string, timeZone: any) => {
  if (!match)
    return '-'
  let statusToDisplay = ''
  const status = match?.status;
  if (['8', '10'].includes(status)) {
    statusToDisplay = formatDateMomentUTCTimeZone(match?.match_time, 'HH:mm', timeZone)
    if (match?.status === '8') {
      statusToDisplay = $t('Fulltime')
    }
  } else if (['12'].includes(status)) {
    statusToDisplay = $t('Cancel')
  } else if (['2', '4', '5'].includes(status)) {
    if(match?.matchMinutes) {
      statusToDisplay = match?.matchMinutes + '<i class="mit"><img src="/img/in_red.gif" alt="time"></i>'
    } else {
      statusToDisplay = '-'
    }
  } else {
    if (status === '7') {
      statusToDisplay = '<b class="">PS</b>'
    } else if (status === '3') {
      statusToDisplay = '<b class="">HT</b>'
    } else {
      statusToDisplay = '-'
    }
  }

  return statusToDisplay
}

export const getOdds = (match: { odds: string | any[]; odds_older: { [x: string]: any; }; }, row: string | number, position: number, numberToNegative: boolean | false) => {
  try {
    if (match?.odds?.length >0 ) {
      const odds = String(match?.odds[row])?.split(/\s*,\s*/)

      if (odds?.length > position && odds[position] && odds[position] !== 'null') {
        const oddValue = odds[position]
        
        const odds_older = String(match?.odds_older?.[row])?.split(/\s*,\s*/)
        if ((odds_older?.length > position) && odds_older[position] && odds_older[position] !== 'null') {
          const oddOlderValue = odds_older[position]

          if (parseFloat(oddValue) > parseFloat(oddOlderValue)) {
            return '<span class="up">' + ((parseFloatO(oddValue) !== 0) ? (numberToNegative ? getOddNumberToNegativeTX(oddValue) : parseFloatO(parseFloatO(oddValue).toFixed(2))) : 0) + '</span>';
          } else if (parseFloat(oddValue) < parseFloat(oddOlderValue)) {
            return '<span class="down">' + ((parseFloatO(oddValue) !== 0) ? (numberToNegative ? getOddNumberToNegativeTX(oddValue) : parseFloatO(parseFloatO(oddValue).toFixed(2))) : 0) + '</span>';
          } else {
            return ((parseFloatO(oddValue) !== 0) ? (numberToNegative ? getOddNumberToNegativeTX(oddValue) : parseFloatO(parseFloatO(oddValue).toFixed(2))) : 0);
          }
        }
      }

      return (odds[position] && odds[position] !== 'null') ? (numberToNegative ? getOddNumberToNegativeTX(odds[position]) : parseFloatO(parseFloatO(odds[position]).toFixed(2))) : ''
    }

    return ''
  } catch (error) {
    return ''
  }
}

export const getOddsValue = (oddsData: string | any[], row: string | number, position: number) => {
  try {
    if (oddsData?.length > 0) {
      const odds = String(oddsData[row])?.split(/\s*,\s*/)

      if (odds?.length > position ) {
        return (odds[position] && odds[position] !== 'null') ? parseFloatO(odds[position]).toFixed(2) : 0
      }
    }

    return 0
  } catch (error) {
    return 0
  }
}

export const getOddValue = (odd: string | any[], position: number) => {
  try {
    if (odd.length >0 ) {
      const odds = String(odd)?.split(/\s*,\s*/)

      if (odds?.length > position ) {
        return (odds[position] && odds[position] !== 'null') ? parseFloatO(odds[position]).toFixed(2) : 0
      }
    }

    return 0
  } catch (error) {
    return 0
  }
}

export const isEmpty = (odd: string) => {
  if (typeof odd === 'undefined' || !odd) 
    return true

  return false
}

export const getOddNumber = (odd: string) => {
  try {
    if (typeof odd === 'undefined' || !odd) 
      return '-'

    return odd?.[0];
  } catch (error) {
    return '-'
  }
}

export const getOddOfData = (odd: string) => {
  try {
    if (typeof odd === 'undefined' || !odd) 
      return '-'

    return parseFloatO(odd?.[0]);
  } catch (error) {
    return '-'
  }
}

export const getOddNumberToNegative = (odd: string) => {
  try {
    if (typeof odd === 'undefined' || !odd) 
      return '-'

    return parseFloatO(odd?.[0]) <= 1 ?  odd?.[0] : ((-1/parseFloatO(odd?.[0])).toFixed(2));
  } catch (error) {
    return '-'
  }
}

export const getOddNumberToNegativeTX = (odd: string) => {
  try {
    if (typeof odd === 'undefined' || !odd) 
      return '-'

    return parseFloatO(odd) <= 1 ?  parseFloatO(odd) : parseFloatO(((-1/parseFloatO(odd)).toFixed(2)));
  } catch (error) {
    return '-'
  }
}

export const getOddChange = (odd1: string, odd2: string) => {
  try {
    if ((typeof odd1 === 'undefined' || !odd1) && (typeof odd2 === 'undefined' || !odd2))
      return ''

    if (isEmpty(odd1) || parseFloatO(odd1) == parseFloatO(odd2))
      return ''
    else if (parseFloatO(odd2) < parseFloatO(odd1) ) {
      return 'up2'
    } else {
      return 'down2'
    }
  } catch (error) {
    return '-'
  }
}

export const getClassOddChange = (odds, position, type = 3) => {
  try {
    if (typeof odds === 'undefined' || !odds)
      return ''

    let older = ''
    let odd = ''
    if (type === 1) {
      if (isEmpty(odds?.first_older) || !odds?.first_older)
        return ''
      older = getOddNumber(odds?.first_older?.[position])
      odd = getOddNumber(odds?.first?.[position])
    } else if (type === 2) {
      if (isEmpty(odds?.live_older) || !odds?.live_older)
        return ''
      older = getOddNumber(odds?.live_older?.[position])
      odd = getOddNumber(odds?.live?.[position])
    } else if (type === 3) {
      if (isEmpty(odds?.run_older) || !odds?.run_older)
        return ''
      older = getOddNumber(odds?.run_older?.[position])
      odd = getOddNumber(odds?.run?.[position])
    }

    if (parseFloatO(older) < parseFloatO(odd) ) {
      return 'up'
    } else if (parseFloatO(older) > parseFloatO(odd) ) {
      return 'down'
    } else {
      return ''
    }

  } catch (error) {
    return ''
  }
}

export const getClassOddCornerChange = (odds, position) => {
  try {
    if (typeof odds === 'undefined' || !odds)
      return ''
    
    let older = ''
    let odd = ''
    if (isEmpty(odds?.run_older) || !odds?.run_older)
      return ''
    
    older = getOddNumber(odds?.run_older?.[position])
    odd = getOddNumber(odds?.run?.[position])
    
    if (parseFloatO(older) < parseFloatO(odd) ) {
      return 'up'
    } else if (parseFloatO(older) > parseFloatO(odd) ) {
      return 'down'
    } else {
      return ''
    }
  } catch (error) {
    return ''
  }
}

export const getClassOddCorner = (odd, older) => {
  try {
    if (typeof older === 'undefined' || !older)
      return ''
    
    if (parseFloatO(older) < parseFloatO(odd) ) {
      return 'up'
    } else if (parseFloatO(older) > parseFloatO(odd) ) {
      return 'down'
    } else {
      return ''
    }
  } catch (error) {
    return ''
  }
}

export const getOddChangeMobile = (odd1: string, odd2: string) => {
  try {
    if ((typeof odd1 === 'undefined' || !odd1) && (typeof odd2 === 'undefined' || !odd2))
      return ''

    if (isEmpty(odd1) || parseFloatO(odd1) == parseFloatO(odd2))
      return ''
    else if (parseFloatO(odd2) < parseFloatO(odd1) ) {
      return 'o-up oddUp'
    } else {
      return 'o-down oddDown'
    }
  } catch (error) {
    return ''
  }
}

export const getOddCornerValue = (odd: string, position: number) => {
  try {
    if (typeof odd === 'undefined' || !odd) 
      return '-'
    let oddData = odd?.replace(/[^0-9.,]/g, '');
    
    oddData = String(oddData)?.split(/\s*,\s*/)
    if (oddData?.length > position ) {
      return (oddData[position] && oddData[position] !== 'null') ? oddData[position] : 0
    }

    return ''
  } catch (error) {
    return ''
  }
}


export const sortByStatus = (arrObj: string | any[] | null | undefined, sort: boolean) => {
  try {
    if (arrObj === null || arrObj === undefined || arrObj === '')
      return []

    return arrObj.sort((a: { match_time: string | number | Date; }, b: { match_time: string | number | Date; }) => {
      if (sort)
        return new Date(b.match_time).getTime() - new Date(a.match_time).getTime()

      else
        return new Date(a.match_time).getTime() - new Date(b.match_time).getTime()
    }, sort)
  } catch (error) {
    return []
  }
}

export const getIncidents = (incident: any = [], position = 0) => {
  try {
    // position - 0: None
    // position - 1: Home
    // position - 2: Away
    if (incident?.position !== position)
      return ''
    
    switch(incident?.type) {
      case 1: 
        return '<span class="detail_player">' + (incident?.player_name ? incident?.player_name : '') + '<img loading="lazy" style="margin:3px 2px;" alt="Goal" src="/img/incident/1.png"></span>'
      case 2:
        return '<span class="detail_player">' + (incident?.player_name ? incident?.player_name : '') + '<img loading="lazy" style="margin:3px 2px;" alt="Corner" src="/img/incident/2.png"></span>'
      case 3:
        return '<span class="detail_player">' + (incident?.player_name ? incident?.player_name : '') + '<img loading="lazy" style="margin:3px 2px;" alt="Yellow card" src="/img/incident/3.png"></span>'
      case 4:
        return '<span class="detail_player">' + (incident?.player_name ? incident?.player_name : '') + '<img loading="lazy" style="margin:3px 2px;" alt="Red card" src="/img/incident/4.png"></span>'
      case 5:
        return '<span class="detail_player">' + (incident?.player_name ? incident?.player_name : '') + '<img loading="lazy" style="margin:3px 2px;" alt="Offside" src="/img/incident/5.png"></span>'
      case 8:
        return '<span class="detail_player">' + (incident?.player_name ? incident?.player_name : '') + '<img loading="lazy" style="margin:3px 2px;" alt="Penalty" src="/img/incident/8.png"></span>'
      case 9: 
        return '<span class="detail_player in_out"><div class="icon_inc"><img loading="lazy" class="user_incident" style="margin:-3px 2px;" alt="Midfield" src="/img/incident/11.png"></div><div class="in_player_name">' +  incident?.in_player_name+' <img loading="lazy" style="margin:-3px 2px;" src="/img/incident/9.png" alt="Substitution"></div><div class="out_player_name">' +  incident?.out_player_name+' <img loading="lazy" style="margin:-4px 2px;" src="/img/incident/9.2.png" alt="Substitution"></div></span>'
      case 15:
        return '<span class="detail_player">' + (incident?.player_name ? incident?.player_name : '') + '<img loading="lazy" style="margin:3px 2px;" alt="Card upgrade confirmed" src="/img/incident/15.png"></span>'
      case 16:
        return '<span class="detail_player">' + (incident?.player_name ? incident?.player_name : '') + '<img loading="lazy" style="margin:3px 2px;" alt="Penalty missed" src="/img/incident/16.png"></span>'
      case 17:
        return '<span class="detail_player">' + (incident?.player_name ? incident?.player_name : '') + '<img loading="lazy" style="margin:3px 2px;" alt="Own goal" src="/img/incident/17.png"></span>'
      case 28:
        return '<span class="detail_player">' + (incident?.player_name ? incident?.player_name : '') + '<img loading="lazy" style="margin:3px 2px;" alt="VAR" src="/img/incident/28.png"></span>'
        default:
      case 29:
        return '<span class="detail_player">' + (incident?.player_name ? incident?.player_name : '') + '<img loading="lazy" style="margin:3px 2px;" alt="Penalty(Penalty Shoot-out)" src="/img/incident/7.png"></span>'
      case 30:
        return '<span class="detail_player">' + (incident?.player_name ? incident?.player_name : '') + '<img loading="lazy" style="margin:3px 2px;" alt="Penalty missed(Penalty Shoot-out)" src="/img/incident/16.png"></span>'
        return '--'
    }
  } catch (error) {
    return '--'
  }
}

export const getIncidentsRight = (incident: any = [], position = 0) => {
  try {
    // position - 0: None
    // position - 1: Home
    // position - 2: Away
    if (incident?.position !== position)
      return ''

    switch(incident?.type) {
      case 1:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Goal" src="/img/incident/1.png">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
      case 2:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Corner" src="/img/incident/2.png">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
      case 3:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Yellow card" src="/img/incident/3.png">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
      case 4:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Red card" src="/img/incident/4.png">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
      case 5:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Offside" src="/img/incident/5.png">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
      case 8:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Penalty" src="/img/incident/8.png">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
      case 9:
        return '<span class="detail_player in_out"><div class="icon_inc"><img loading="lazy" class="user_incident" style="margin:-3px 2px;" alt="Midfield" src="/img/incident/11.png"></div><div class="in_player_name"><img loading="lazy" style="margin:-3px 2px;" src="/img/incident/9.png" alt="Substitution">' +  incident?.in_player_name+' </div><div class="out_player_name"><img loading="lazy" style="margin:-4px 2px;" src="/img/incident/9.2.png" alt="Substitution">' +  incident?.out_player_name+' </div></span>'
      case 15:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Card upgrade confirmed" src="/img/incident/15.png">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
      case 16:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Penalty missed" src="/img/incident/16.png">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
      case 17:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Own goal" src="/img/incident/17.png">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
      case 28:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="VAR" src="/img/incident/28.png">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
        default:
      case 29:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Penalty(Penalty Shoot-out)" src="/img/incident/7.png">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
      case 30:
        return '<span class="detail_player"><img loading="lazy" style="margin:3px 2px;" alt="Penalty missed(Penalty Shoot-out)" src="/img/incident/16.png">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
        return '--'
    }
  } catch (error) {
    return '--'
  }
}

export const getIncidentsMobile = (incident: any = [], position = 0) => {
  try {
    // position - 0: None
    // position - 1: Home
    // position - 2: Away
    if (incident?.position !== position)
      return ''
    
    if (incident?.position === 1) {
      switch(incident?.type) {
        case 1: 
          return '<span><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span></span><img loading="lazy" style="margin:3px 2px;" alt="Goal" src="/img/incident/1.png">'
        case 2:
          return '<span><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span></span><img loading="lazy" style="margin:3px 2px;" alt="Corner" src="/img/incident/2.png">'
        case 3:
          return '<span><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span></span><img loading="lazy" style="margin:3px 2px;" alt="Yellow card" src="/img/incident/3.png">'
        case 4:
          return '<span><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span></span><img loading="lazy" style="margin:3px 2px;" alt="Red card" src="/img/incident/4.png">'
        case 5:
          return '<span><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span></span><img loading="lazy" style="margin:3px 2px;" alt="Offside" src="/img/incident/5.png">'
        case 8:
          return '<span><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span></span><img loading="lazy" style="margin:3px 2px;" alt="Penalty" src="/img/incident/8.png">'
        // case 9: 
        //   return '<span><span class="name">' +  incident?.in_player_name+' </span><span>' +  incident?.out_player_name+' </span></span>'
        case 15:
          return '<span><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span></span><img loading="lazy" style="margin:3px 2px;" alt="Card upgrade confirmed" src="/img/incident/15.png">'
        case 16:
          return '<span><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span></span><img loading="lazy" style="margin:3px 2px;" alt="Penalty missed" src="/img/incident/16.png">'
        case 17:
          return '<span><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span></span><img loading="lazy" style="margin:3px 2px;" alt="Own goal" src="/img/incident/17.png">'
        case 28:
          return '<span><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span></span><img loading="lazy" style="margin:3px 2px;" alt="VAR" src="/img/incident/28.png">'
          default:
          return '--'
      }
    } else {
      switch(incident?.type) {
        case 1: 
          return '<img loading="lazy" style="margin:3px 2px;" alt="Goal" src="/img/incident/1.png"><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
        case 2:
          return '<img loading="lazy" style="margin:3px 2px;" alt="Corner" src="/img/incident/2.png"><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
        case 3:
          return '<img loading="lazy" style="margin:3px 2px;" alt="Yellow card" src="/img/incident/3.png"><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
        case 4:
          return '<img loading="lazy" style="margin:3px 2px;" alt="Red card" src="/img/incident/4.png"><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
        case 5:
          return '<img loading="lazy" style="margin:3px 2px;" alt="Offside" src="/img/incident/5.png"><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
        case 8:
          return '<img loading="lazy" style="margin:3px 2px;" alt="Penalty" src="/img/incident/8.png"><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
        case 15:
          return '<img loading="lazy" style="margin:3px 2px;" alt="Card upgrade confirmed" src="/img/incident/15.png"><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
        case 16:
          return '<img loading="lazy" style="margin:3px 2px;" alt="Penalty missed" src="/img/incident/16.png"><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
        case 17:
          return '<img loading="lazy" style="margin:3px 2px;" alt="Own goal" src="/img/incident/17.png"><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
        case 28:
          return '<img loading="lazy" style="margin:3px 2px;" alt="VAR" src="/img/incident/28.png"><span class="name">' + (incident?.player_name ? incident?.player_name : '') + '</span>'
          default:
          return '--'
      }
    }
  } catch (error) {
    return '--'
  }
}

export const getStats = (type = '') => {
  try {
    if (STATS_TECHNICAL[type]) {
      return STATS_TECHNICAL[type]
    } else {
      return '-'
    }
  } catch (error) {
    return '-'
  }
}

export const getCorner = (cornerEvent: any = [], teamId = 0, position = 0) => {
  try {
    if (parseIntO(cornerEvent?.teamId) !== teamId)
      return ''

    if (position === 1) {
      // Home
      return '<img src="img/rq.png" width="16" height="16">'
    } else {
      // Away
      return '<img src="img/bq.png" width="16" height="16">'
    }
  } catch (error) {
    return ''
  }
}

export const getDetailOdds = (data: any = [], typeOdd = '', group = '', position = 0) => {
  try {
    if (data?.length <= 0)
      return '-'
    const oddData = data?.find(({ type }) => type === typeOdd)
    if (oddData?.[group]) {
      const data = JSON.parse(oddData[group]?.replace(new RegExp(escapeRegExp("'"), 'g'), "\""))
      if (data[position])
        return parseFloatO(data[position])
    }
    return ''
  } catch (error) {
    return ''
  }
}

export const getRecentResult = (data: any = [], matchId: any) => {
  try {
    if (data.length <= 0)
      return
    const recentResult = sortByTime(data, true)

    let score = ''
    recentResult?.forEach((item: { home_team_id: any; home_scores: any[]; away_scores: any[]; away_team_id: any; }) => {
      // Nếu là đội chủ nhà
      if (item?.home_team_id === matchId) {
        if (item?.home_scores[0] > item?.away_scores[0]) {
          score += '<span class="o-win" title="Thắng">T</span>'
        } else if (item?.home_scores[0] === item?.away_scores[0]) {
          score += '<span class="o-draw" title="Hòa">H</span>'
        } else {
          score += '<span class="o-lose" title="Thua">B</span>'
        }
      } else if (item?.away_team_id === matchId) {
        if (item?.away_scores[0] > item?.home_scores[0]) {
          score += '<span class="o-win" title="Thắng">T</span>'
        } else if (item?.away_scores[0] === item?.home_scores[0]) {
          score += '<span class="o-draw" title="Hòa">H</span>'
        } else {
          score += '<span class="o-lose" title="Thua">B</span>'
        }
      }
    });

    return score
  } catch (error) {
    return ''
  }
}

export const getRecentResultTheSport = (data: any = [], matchId: any, isHome = false, $t: any) => {
  try {
    if (data.length <= 0)
      return
    let recentResult = data?.slice(0, 6)
    if (isHome) {
      recentResult = recentResult?.reverse()
    }

    let score = ''
    recentResult?.forEach((item: { home_team_id: any; home_scores: any[]; away_scores: any[]; away_team_id: any; }) => {
      if (item?.[5]?.[0]?.[0] === matchId) {
        if (item?.[5]?.[2] > item?.[6]?.[2]) {
          score +='<span class="o-win" title="'+ $t('Win') +'">'+ $t('W') +'</span>'
        } else if (item?.[5]?.[2] == item?.[6]?.[2]) {
          score += '<span class="o-draw" title="'+ $t('Draw') +'">'+ $t('D') +'</span>'
        } else {
          score +='<span class="o-lose" title="'+ $t('Loss') +'">'+ $t('L') +'</span>'
        }
      } else if (item?.[6]?.[0]?.[0] === matchId) {
        if (item?.[6]?.[2] > item?.[5]?.[2]) {
          score +='<span class="o-win" title="'+ $t('Win') +'">'+ $t('W') +'</span>'
        } else if (item?.[6]?.[2] == item?.[5]?.[2]) {
          score += '<span class="o-draw" title="'+ $t('Draw') +'">'+ $t('D') +'</span>'
        } else {
          score +='<span class="o-lose" title="'+ $t('Loss') +'">'+ $t('L') +'</span>'
        }
      }
    });

    return score
  } catch (error) {
    return ''
  }
}

export const getLastResult = (data: any = [], matchId: any, isHome = false, $t: any) => {
  try {
    if (data.length <= 0)
      return '<span class="o-unknown">?</span>'
    const recentResult = sortByTime(data, true)?.slice(0, 6)?.reverse()

    let score = ''
    recentResult?.forEach((item) => {
      // Nếu là đội chủ nhà
      if (item?.home_team.id === matchId) {
        if (item?.home_scores[0] > item?.away_scores[0]) {
          score += '<span class="o-win" title="'+ $t('Win') +'">'+  $t('W') +'</span>'
        } else if (item?.home_scores[0] === item?.away_scores[0]) {
          score += '<span class="o-draw" title="'+ $t('Draw') +'">'+  $t('D') +'</span>'
        } else {
          score += '<span class="o-lose" title="'+ $t('Lose') +'">'+  $t('L') +'</span>'
        }
      } else if (item?.away_team.id === matchId) {
        if (item?.away_scores[0] > item?.home_scores[0]) {
          score += '<span class="o-win" title="'+ $t('Win') +'">'+  $t('W') +'</span>'
        } else if (item?.away_scores[0] === item?.home_scores[0]) {
          score += '<span class="o-draw" title="'+ $t('Draw') +'">'+  $t('D') +'</span>'
        } else {
          score += '<span class="o-lose" title="'+ $t('Lose') +'">'+  $t('L') +'</span>'
        }
      }
    });

    return score ? score : '<span class="o-unknown">?</span>'
  } catch (error) {
    return '<span class="o-unknown">?</span>'
  }
}

export const convertDateTime = (isoString: string | number | Date) => {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[date.getDay()];
  return `${day}-${month}-${year} ${hours}:${minutes} ${dayOfWeek}`;
};

export const getDataObject = (data: any = []) => {
  if (!data)
    return null

  try {
    const dataObject: never[] = []
    Object.keys(data).map(key => {
      if (typeof data[key] === 'string' ) {
        dataObject[key] = JSON.parse(data[key]?.replace(new RegExp(escapeRegExp("'"), 'g'), "\""))

        if (typeof dataObject[key] !== 'undefined' && dataObject[key]?.length > 0) {
          const itemList: string[][] = []
          dataObject[key]?.map((item: any) => {
            itemList.push(String(item)?.split(/\s*,\s*/))
          })
          dataObject[key] = itemList
        }
      } else {
        dataObject[key] =  data[key]
      }
    })

    return dataObject
  } catch (e: any) {
    return null
  }
  
}

export const getOddDataObject = (data: any = []) => {
  if (!data)
    return null

  try {
    const dataObject: never[] = []
    Object.keys(data).map(key => {
      if (typeof data[key] === 'string' ) {
        if (key === 'initial' || key === 'inplay' ||  key === 'instant') {
          dataObject[key] = JSON.parse(data[key]?.replace(new RegExp(escapeRegExp("'"), 'g'), "\""))

          if (typeof dataObject[key] !== 'undefined' && dataObject[key]?.length > 0) {
            const itemList: string[][] = []
            dataObject[key]?.map((item: any) => {
              itemList.push(String(item)?.split(/\s*,\s*/))
            })
            dataObject[key] = itemList
          }
        } else {
          dataObject[key] =  data[key]
        }
      } else {
        dataObject[key] =  data[key]
      }
    })

    return dataObject
  } catch (e: any) {
    return null
  }
}

export const getDataObjectByList = (data: any = []) => {
  try {
    if (!data)
      return null

    const dataObject: never[] = []
    data?.map((item, index) => {
      dataObject[index] = getOddDataObject(item)
    })

    return dataObject
  } catch (e: any) {
    return null
  }
}

export const getH2HOddTX = (scoreHome: string, scoreAway: string, totalOdd: string, $t: any) => {
  try {
    if (totalOdd == "")
      return ''
    if ((parseFloatO(scoreHome) + parseFloatO(scoreAway)) > parseFloatO(totalOdd)) {
      return '<span class="o-lose" title="'+ $t('Over') +'">'+ $t('O') +'</span>'
    } else if ((parseFloatO(scoreHome) + parseFloatO(scoreAway)) < parseFloatO(totalOdd)) {
      return '<span class="o-win" title="'+ $t('Under') +'">'+ $t('U') +'</span>'
    } else {
      return '<span class="o-void o-draw" title="'+ $t('Draw') +'">'+ $t('D') +'</span>'
    }
  } catch (e: any) {
    return ''
  }
}

export const getH2HOddTXMobile = (scoreHome: string, scoreAway: string, totalOdd: string) => {
  try {
    if (totalOdd == "")
      return ''
    if ((parseFloatO(scoreHome) + parseFloatO(scoreAway)) > parseFloatO(totalOdd)) {
      return '<span class="o-win" title="Thắng">T</span>'
    } else if ((parseFloatO(scoreHome) + parseFloatO(scoreAway)) < parseFloatO(totalOdd)) {
      return '<span class="o-loss" title="Thua">X</span>'
    } else {
      return '<span class="o-void o-draw" title="Hòa">H</span>'
    }
  } catch (e: any) {
    return ''
  }
}

export const getH2HOddEU = (scoreHome: string, scoreAway: string, $t: any) => {
  try {
    if (parseFloatO(scoreHome) > parseFloatO(scoreAway)) {
      return '<span class="o-lose" title="'+ $t('Win') +'">'+ $t('W') +'</span>'
    } else if (parseFloatO(scoreHome) < parseFloatO(scoreAway)) {
      return '<span class="o-win" title="'+ $t('Loss') +'">'+ $t('L') +'</span>'
    } else {
      return '<span class="o-draw" title="'+ $t('Draw') +'">'+ $t('D') +'</span>'
    }
  } catch (e: any) {
    return ''
  }
}

export const getH2HOddHadicap = (scoreHome: string, scoreAway: string, hadicapOdd: string, $t: any) => {
  try {
    if (hadicapOdd == "")
      return ''

    if ((parseFloatO(scoreHome) + parseFloatO(hadicapOdd)) > parseFloatO(scoreAway)) {
      return '<span class="o-lose" title="'+ $t('Win') +'">'+ $t('W') +'</span>'
    } else if ((parseFloatO(scoreHome) + parseFloatO(hadicapOdd)) < parseFloatO(scoreAway)) {
      return '<span class="o-win" title="'+ $t('Loss') +'">'+ $t('L') +'</span>'
    } else {
      return '<span class="o-draw" title="'+ $t('Draw') +'">'+ $t('D') +'</span>'
    }
  } catch (e: any) {
    return ''
  }
}

export const getH2HOddHadicapMobile = (scoreHome: string, scoreAway: string, hadicapOdd: string) => {
  try {
    if (hadicapOdd == "")
      return ''

    if ((parseFloatO(scoreHome) + parseFloatO(hadicapOdd)) > parseFloatO(scoreAway)) {
      return '<span class="o-win" title="Thắng">T</span>'
    } else if ((parseFloatO(scoreHome) + parseFloatO(hadicapOdd)) < parseFloatO(scoreAway)) {
      return '<span class="o-loss" title="Thua">B</span>'
    } else {
      return '<span class="o-draw" title="Hòa">H</span>'
    }
  } catch (e: any) {
    return ''
  }
}

export const getH2HStatistics = (matches: any[], limit: number, i_team: any, cb_sos: any, is_home = true, $t: any) => {
  try {
    if (!matches || matches.length === 0 || limit === 0)
      return ''

    let totalWin = 0
    let totalDraw = 0
    let totalLose = 0
    let totalWinTX = 0
    let totalLossTX = 0
    let totalWinHadicap = 0
    let totalLossHadicap = 0
    const total = 0
    let number = 0;
    
    matches?.forEach((item: string[]) => {
      if (number < limit) {
        if (cb_sos) {
          if (is_home) {
            if (i_team != item?.[5]) {
              return;
            }
          } else {
            if (i_team != item?.[7]) {
              return;
            }
          }
        }
        if (i_team == item?.[5]) {
          if (parseIntO(item?.[8]) > parseIntO(item?.[9])) {
            totalWin++
          } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
            totalDraw++
          } else {
            totalLose++
          }

          if ((parseFloatO(item?.[8]) + parseFloatO(item?.[17])) > parseFloatO(item?.[9])) {
            totalWinHadicap++
          } else if ((parseFloatO(item?.[8]) + parseFloatO(item?.[17])) < parseFloatO(item?.[9])) {
            totalLossHadicap++
          }
        } else if (i_team == item?.[7]) {
          if (parseIntO(item?.[8]) < parseIntO(item?.[9])) {
            totalWin++
          } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
            totalDraw++
          } else {
            totalLose++
          }

          if ((parseFloatO(item?.[9]) + parseFloatO(item?.[17])) > parseFloatO(item?.[8])) {
            totalWinHadicap++
          } else if ((parseFloatO(item?.[9]) + parseFloatO(item?.[17])) < parseFloatO(item?.[8])) {
            totalLossHadicap++
          }
        }

        // Tỷ lệ thắng TX
        if (item?.[29] != "") {
          if ((parseFloatO(item?.[8]) + parseFloatO(item?.[9])) > parseFloatO(item?.[29])) {
            totalWinTX++
          } else if ((parseFloatO(item?.[8]) + parseFloatO(item?.[9])) < parseFloatO(item?.[29])) {
            totalLossTX++
          }
        }

        number++
      }
    })

    const aHRate = ((totalWinHadicap + totalLossTX) > 0) ? parseFloatO((totalWinHadicap * 100) / (totalWinHadicap + totalLossTX)).toFixed(0) : '-'
    const overRate = ((totalLossTX + totalWinTX) > 0) ? parseFloatO((totalWinTX * 100) / (totalLossTX + totalWinTX)).toFixed(0) : '-'
    
    return $t('Statistical') + ' <span class="red">' + number + '</span> '+ $t('Recent matches') +', ' + totalWin  + ' '+ $t('Win') +', ' + totalDraw +' '+ $t('Draw') +', ' + totalLose +' '+ $t('Loss') +', ' +
            $t('Win rate') + '：<span class="red">' + parseFloatO((totalWin * 100) / number).toFixed(0) + '%</span> '+ $t('Winning odds') +'：<span class="red">'+ aHRate +'% </span> '+ $t('Over rate odds') +'：<span class="red"> ' + overRate + '% </span> '

  } catch (e: any) {
    return ''
  }
}

export const getH2HStatisticsMobile = (matches: any[], limit: number, i_team: any, cb_sos: any, is_home = true, h2hBlockHistory = false) => {
  try {
    if (!matches || matches.length === 0 || limit === 0)
      return ''

    let totalWin = 0
    let totalDraw = 0
    let totalLose = 0
    let totalWinTX = 0
    let totalLossTX = 0
    let totalWinHadicap = 0
    let totalLossHadicap = 0
    const total = 0
    let number = 0;
    
    matches?.forEach((item: string[]) => {
      if (number < limit) {
        if (cb_sos) {
          if (is_home) {
            if (i_team != item?.[5]) {
              return;
            }
          } else {
            if (i_team != item?.[7]) {
              return;
            }
          }
        }
        if (i_team == item?.[5]) {
          if (parseIntO(item?.[8]) > parseIntO(item?.[9])) {
            totalWin++
          } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
            totalDraw++
          } else {
            totalLose++
          }

          if ((parseFloatO(item?.[8]) + parseFloatO(item?.[17])) > parseFloatO(item?.[9])) {
            totalWinHadicap++
          } else if ((parseFloatO(item?.[8]) + parseFloatO(item?.[17])) < parseFloatO(item?.[9])) {
            totalLossHadicap++
          }
        } else if (i_team == item?.[7]) {
          if (parseIntO(item?.[8]) < parseIntO(item?.[9])) {
            totalWin++
          } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
            totalDraw++
          } else {
            totalLose++
          }

          if ((parseFloatO(item?.[9]) + parseFloatO(item?.[17])) > parseFloatO(item?.[8])) {
            totalWinHadicap++
          } else if ((parseFloatO(item?.[9]) + parseFloatO(item?.[17])) < parseFloatO(item?.[8])) {
            totalLossHadicap++
          }
        }

        // Tỷ lệ thắng TX
        if (item?.[29] != "") {
          if ((parseFloatO(item?.[8]) + parseFloatO(item?.[9])) > parseFloatO(item?.[29])) {
            totalWinTX++
          } else if ((parseFloatO(item?.[8]) + parseFloatO(item?.[9])) < parseFloatO(item?.[29])) {
            totalLossTX++
          }
        }

        number++
      }
    })

    const aHRate = ((totalWinHadicap + totalLossTX) > 0) ? parseFloatO((totalWinHadicap * 100) / (totalWinHadicap + totalLossTX)).toFixed(0) : '-'
    const overRate = ((totalLossTX + totalWinTX) > 0) ? parseFloatO((totalWinTX * 100) / (totalLossTX + totalWinTX)).toFixed(0) : '-'
    
    if (!h2hBlockHistory) {
      return  '<div class="home o-win"> Thắng: ' + totalWin + '<b></b></div>' +
      '<div class="vs o-void"> Hòa: <b>' + totalDraw + '</b></div>' +
      '<div class="guest o-loss"> Thua: <b>' + totalLose + '</b></div> ' +
      '<div class="home o-win"> HDP: <span>'+ aHRate +'%</span></div>' +
      '<div class="home o-win"> Tài: <span>'+ overRate +'%</span></div>'
    } else {
      return  '<span class="fl">Tất cả</span>'+
              '<span class="win">Thắng '+ totalWin +'</span> , <span class="draw">Hòa '+ totalDraw +'</span> , <span class="loss">Thua '+ totalLose +'</span> '+ 
              '<span class="fr">HDP:&nbsp;&nbsp; <span class="win">T '+ aHRate +'%</span>'+
              '</span>'
    }
  } catch (e: any) {
    return ''
  }
}

export const getLabelOddHDP = (Odd: string) => {
  try {
    if (Odd === "" || typeof Odd === 'undefined')
      return ''

    // "lwvwl"
    // "ouuou"
    let oddLabel = ''
    Odd.split("")?.forEach((item: string) => {
      if (item == "l") {
        oddLabel += '<span class="o-win" title="Thua">B</span>'
      } else if (item == "w") {
        oddLabel += '<span class="o-lose" title="Thắng">T</span>'
      } if (item == "v") {
        oddLabel += '<span class="o-draw" title="Hòa">H</span>'
      }
    })

    const numberOdd = Odd?.length
    if (numberOdd < 6) {
      for(let i = numberOdd; i < 6; i++) {
        oddLabel += '<span class="o-none">-</span>'
      }
    }

    return oddLabel
  } catch (e: any) {
    return ''
  }
}

export const getStaticsOdd = (Odds: string, findOdd: string, percent: string) => {
  try {
    if (Odds === "" || typeof Odds === 'undefined')
      return 0

    if (percent) {
      if (Odds?.length > 0) {
        return ((Odds.match(new RegExp(findOdd, "g")) || []).length /  Odds?.length * 100).toFixed(1) + '%'
      } else {
        return ''
      }
    } else {
      return (Odds.match(new RegExp(findOdd, "g")) || []).length
    }
  } catch (e: any) {
    return 0
  }
}

export const getLabelOddHDPMobile = (Odd: string) => {
  try {
    if (Odd === "" || typeof Odd === 'undefined')
      return ''

    // "lwvwl"
    // "ouuou"
    let oddLabel = ''
    Odd.split("")?.forEach((item: string) => {
      if (item == "l") {
        oddLabel += '<span class="o-loss" title="Thua">B</span>'
      } else if (item == "w") {
        oddLabel += '<span class="o-win" title="Thắng">T</span>'
      } if (item == "v") {
        oddLabel += '<span class="o-void o-draw" title="Hòa">H</span>'
      }
    })

    const numberOdd = Odd?.length
    if (numberOdd < 6) {
      for(let i = numberOdd; i < 6; i++) {
        oddLabel += '<span class="o-void">-</span>'
      }
    }

    return oddLabel
  } catch (e: any) {
    return ''
  }
}

export const getLabelOddTX = (Odd: string) => {
  try {
    if (Odd === "" || typeof Odd === 'undefined')
      return ''

    // "lwvwl"
    // "ouuou"
    let oddLabel = ''
    Odd.split("")?.forEach((item: string) => {
      if (item == "o") {
        oddLabel += '<span class="o-lose" title="Thắng">T</span>'
      } else if (item == "u") {
        oddLabel += '<span class="o-win" title="Thua">X</span>'
      }
    })

    const numberOdd = Odd?.length
    if (numberOdd < 6) {
      for(let i = numberOdd; i < 6; i++) {
        oddLabel += '<span class="o-none">-</span>'
      }
    }

    return oddLabel
  } catch (e: any) {
    return ''
  }
}

export const getH2hComparison = (matchesStat: any[], homeTeamId: any, awayTeamId: any, i_competition_id: any, $t: any) => {
  try {
    if (!matchesStat)
      return []
    
    let homeW = 0;
    let homeD = 0;
    let homeL = 0;
    let awayW = 0;
    let awayD = 0;
    let awayL = 0;

    let homeWComp = 0;
    let homeDComp = 0;
    let homeLComp = 0;
    let awayWComp = 0;
    let awayDComp = 0;
    let awayLComp = 0;
    
    let numberSameLeague = 1;
    let numberLimit = 0;
    matchesStat?.forEach((item: string[]) => {
      if (numberLimit < 10) {
        if (homeTeamId == item?.[5]) {
          if (parseIntO(item?.[8]) > parseIntO(item?.[9])) {
            homeW++
            awayL++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberSameLeague <= 5) {
              homeWComp++
              awayLComp++
              numberSameLeague++
            }
          } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
            homeD++
            awayD++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberSameLeague <= 5) {
              homeDComp++
              awayDComp++
              numberSameLeague++
            }
          } else {
            homeL++
            awayW++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberSameLeague <= 5) {
              homeLComp++
              awayWComp++
              numberSameLeague++
            }
          }
        } else if (homeTeamId == item?.[7]) {
          if (parseIntO(item?.[8]) < parseIntO(item?.[9])) {
            homeW++
            awayL++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberSameLeague <= 5) {
              homeWComp++
              awayLComp++
              numberSameLeague++
            }
          } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
            homeD++
            awayD++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberSameLeague <= 5) {
              homeDComp++
              awayDComp++
              numberSameLeague++
            }
          } else {
            homeL++
            awayW++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberSameLeague <= 5) {
              homeLComp++
              awayWComp++
              numberSameLeague++
            }
          }
        }
        numberLimit++
      }
    })

    const homePoint = homeW * 3 + homeD * 1
    const awayPoint = awayW * 3 + awayD * 1
    const homeInCompPoint = homeWComp * 3 + homeDComp * 1
    const awayInCompPoint = awayWComp * 3 + awayDComp * 1

    const homePercent = ((homePoint + awayPoint) > 0) ? (homePoint * 100/ (homePoint + awayPoint)) : 0
    const awayPercent = ((homePoint + awayPoint) > 0) ? (awayPoint * 100/ (homePoint + awayPoint)) : 0
    const homeLabel = `${homeW}${$t('W')} ${homeD}${$t('D')} ${homeL}${$t('L')}`
    const awayLabel = `${awayW}${$t('W')} ${awayD}${$t('D')} ${awayL}${$t('L')}`

    const homeInCompPercent = ((homeInCompPoint + awayInCompPoint) > 0) ? (homeInCompPoint * 100/ (homeInCompPoint + awayInCompPoint))  : 0
    const awayInCompPercent = ((homeInCompPoint + awayInCompPoint) > 0) ? (awayInCompPoint * 100/ (homeInCompPoint + awayInCompPoint))  : 0
    const homeInCompLabel = `${homeWComp}${$t('W')} ${homeDComp}${$t('D')} ${homeLComp}${$t('L')}`
    const awayInCompLabel = `${awayWComp}${$t('W')} ${awayDComp}${$t('D')} ${awayLComp}${$t('L')}`

    const totalP = homePercent + homeInCompPercent + awayPercent + awayInCompPercent
    const totalHomePercent = totalP > 0 ? (homePercent + homeInCompPercent) / totalP * 100 : 0
    //const totalAwayPercent = (awayPercent + awayInCompPercent) > 0 ? (awayPercent + awayInCompPercent) / 2 : 0
    const totalAwayPercent = totalP > 0 ?  100 - totalHomePercent : 0

    return [
      homePercent.toFixed(0), awayPercent.toFixed(0), homeLabel, awayLabel, 
      homeInCompPercent.toFixed(0), awayInCompPercent.toFixed(0), homeInCompLabel, awayInCompLabel,
      totalHomePercent.toFixed(0), totalAwayPercent.toFixed(0)
    ]

  } catch (e: any) {
    return []
  }
}

export const getStateComparison = (matchesStatHome: any[], matchesStatAway: any[], homeTeamId: any, awayTeamId: any, i_competition_id: any, limit = 10, $t) => {
  try {
    if (!matchesStatHome && !matchesStatAway)
      return []

    let homeW = 0;
    let homeD = 0;
    let homeL = 0;
    let awayW = 0;
    let awayD = 0;
    let awayL = 0;

    let homeWComp = 0;
    let homeDComp = 0;
    let homeLComp = 0;
    let awayWComp = 0;
    let awayDComp = 0;
    let awayLComp = 0;

    // Bàn thắng
    let homeGoals = 0;
    let awayGoals = 0;
    let homeGoalsComp = 0;
    let awayGoalsComp = 0;

    // Bị thủng lưới
    let homeDefence  = 0;
    let awayDefence  = 0;
    let homeDefenceComp = 0;
    let awayDefenceComp = 0;

    // Thẻ đỏ
    let homeRed = 0;
    let awayRed = 0;

    let homeNumberLimit = 0;
    let numberHomeSameLeague = 1;
    let numberAwaySameLeague = 1;

    // Phạt góc
    let homeCorner = 0;
    let awayCorner = 0;
    matchesStatHome?.forEach((item: string[]) => {
      if (homeNumberLimit < limit) {
        if (homeTeamId == item?.[5]) {
          homeGoals += parseIntO(item?.[8])
          homeDefence += parseIntO(item?.[9])
          homeCorner += parseIntO(item?.[14])
          homeRed += parseIntO(item?.[12])

          if (parseIntO(item?.[8]) > parseIntO(item?.[9])) {
            homeW++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberHomeSameLeague <= 5) {
              homeWComp++
              numberHomeSameLeague++
              homeGoalsComp += parseIntO(item?.[8])
              homeDefenceComp += parseIntO(item?.[9])
            }
          } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
            homeD++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberHomeSameLeague <= 5) {
              homeDComp++
              numberHomeSameLeague++
              homeGoalsComp += parseIntO(item?.[8])
              homeDefenceComp += parseIntO(item?.[9])
            }
          } else {
            homeL++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberHomeSameLeague <= 5) {
              homeLComp++
              numberHomeSameLeague++
              homeGoalsComp += parseIntO(item?.[8])
              homeDefenceComp += parseIntO(item?.[9])
            }
          }
        } else if (homeTeamId == item?.[7]) {
          homeGoals += parseIntO(item?.[9])
          homeDefence += parseIntO(item?.[8])
          homeCorner += parseIntO(item?.[15])
          homeRed += parseIntO(item?.[12])

          if (parseIntO(item?.[8]) < parseIntO(item?.[9])) {
            homeW++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberHomeSameLeague <= 5) {
              homeWComp++
              numberHomeSameLeague++
              homeGoalsComp += parseIntO(item?.[9])
              homeDefenceComp += parseIntO(item?.[8])
            }
          } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
            homeD++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberHomeSameLeague <= 5) {
              homeDComp++
              numberHomeSameLeague++
              homeGoalsComp += parseIntO(item?.[9])
              homeDefenceComp += parseIntO(item?.[8])
            }
          } else {
            homeL++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberHomeSameLeague <= 5) {
              homeLComp++
              numberHomeSameLeague++
              homeGoalsComp += parseIntO(item?.[9])
              homeDefenceComp += parseIntO(item?.[8])
            }
          }
        }
        homeNumberLimit++
      }
    })

    let awayNumberLimit = 0
    matchesStatAway?.forEach((item: string[]) => {
      if (awayNumberLimit < limit) {
        if (awayTeamId == item?.[5]) {
          awayGoals += parseIntO(item?.[8])
          awayDefence += parseIntO(item?.[9])
          awayCorner += parseIntO(item?.[14])
          awayRed += parseIntO(item?.[13])

          if (parseIntO(item?.[8]) < parseIntO(item?.[9])) {
            awayL++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberAwaySameLeague<= 5) {
              awayLComp++
              numberAwaySameLeague++
              awayGoalsComp += parseIntO(item?.[8])
              awayDefenceComp += parseIntO(item?.[9])
            }
          } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
            awayD++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberAwaySameLeague<= 5) {
              awayDComp++
              numberAwaySameLeague++
              awayGoalsComp += parseIntO(item?.[8])
              awayDefenceComp += parseIntO(item?.[9])
            }
          } else {
            awayW++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberAwaySameLeague<= 5) {
              awayWComp++
              numberAwaySameLeague++
              awayGoalsComp += parseIntO(item?.[8])
              awayDefenceComp += parseIntO(item?.[9])
            }
          }
        } else if (awayTeamId == item?.[7]) {
          awayGoals += parseIntO(item?.[9])
          awayDefence += parseIntO(item?.[8])
          awayCorner += parseIntO(item?.[15])
          awayRed += parseIntO(item?.[13])

          if (parseIntO(item?.[8]) > parseIntO(item?.[9])) {
            awayL++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberAwaySameLeague<= 5) {
              awayLComp++
              numberAwaySameLeague++
              awayGoalsComp += parseIntO(item?.[9])
              awayDefenceComp += parseIntO(item?.[8])
            }
          } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
            awayD++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberAwaySameLeague<= 5) {
              awayDComp++
              numberAwaySameLeague++
              awayGoalsComp += parseIntO(item?.[9])
              awayDefenceComp += parseIntO(item?.[8])
            }
          } else {
            awayW++
            if (parseFloatO(i_competition_id) === parseFloatO(item?.[2]) && numberAwaySameLeague<= 5) {
              awayWComp++
              numberAwaySameLeague++
              awayGoalsComp += parseIntO(item?.[9])
              awayDefenceComp += parseIntO(item?.[8])
            }
          }
        }

        awayNumberLimit++
      }
    })

    const homePoint = (homeW * 3 + homeD * 1) / homeNumberLimit
    const awayPoint = (awayW * 3 + awayD * 1) / awayNumberLimit
    const homeInCompPoint = (homeWComp * 3 + homeDComp * 1) / numberHomeSameLeague
    const awayInCompPoint = (awayWComp * 3 + awayDComp * 1) / numberAwaySameLeague

    const homePercent = ((homePoint + awayPoint) > 0) ? (homePoint * 100/ (homePoint + awayPoint)) : 0
    const awayPercent = ((homePoint + awayPoint) > 0) ? (awayPoint * 100/ (homePoint + awayPoint)) : 0
    const homeLabel = `${homeW}${$t('W')} ${homeD}${$t('D')} ${homeL}${$t('L')}`
    const awayLabel = `${awayW}${$t('W')} ${awayD}${$t('D')} ${awayL}${$t('L')}`

    const homeInCompPercent = ((homeInCompPoint + awayInCompPoint) > 0) ? (homeInCompPoint * 100/ (homeInCompPoint + awayInCompPoint))  : 0
    const awayInCompPercent = ((homeInCompPoint + awayInCompPoint) > 0) ? (awayInCompPoint * 100/ (homeInCompPoint + awayInCompPoint))  : 0
    const homeInCompLabel = `${homeWComp}${$t('W')} ${homeDComp}${$t('D')} ${homeLComp}${$t('L')}`
    const awayInCompLabel = `${awayWComp}${$t('W')} ${awayDComp}${$t('D')} ${awayLComp}${$t('L')}`

    const totalPercent = (homePercent + homeInCompPercent + awayPercent + awayInCompPercent)
    const totalHomePercent  = totalPercent > 0 ? (homePercent + homeInCompPercent) / totalPercent * 100 : 0
    //const totalAwayPercent = (awayPercent + awayInCompPercent) > 0 ? (awayPercent + awayInCompPercent) : 0
    const totalAwayPercent = totalPercent > 0 ? 100 - totalHomePercent : 0

    // Attack Comparison
    const totalGoals =  (homeGoals / homeNumberLimit) + (awayGoals / awayNumberLimit)
    const homeGoalsPercent = totalGoals > 0 ? (homeNumberLimit > 0 ? (homeGoals / homeNumberLimit) * 100 / totalGoals : 0) : 0
    const awayGoalsPercent = totalGoals > 0 ? (awayNumberLimit > 0 ? (awayGoals / awayNumberLimit) * 100 / totalGoals : 0) : 0

    const totalGoalsComp =  (homeGoalsComp / homeNumberLimit) + (awayGoalsComp / awayNumberLimit)
    const homeGoalsCompPercent = totalGoalsComp > 0 ? (homeNumberLimit > 0 ? (homeGoalsComp / homeNumberLimit) * 100 / totalGoalsComp : 0) : 0
    const awayGoalsCompPercent = totalGoalsComp > 0 ? (awayNumberLimit > 0 ? (awayGoalsComp / awayNumberLimit) * 100 / totalGoalsComp : 0) : 0

    const totalGoalsPercent = homeGoalsPercent + homeGoalsCompPercent + awayGoalsPercent + awayGoalsCompPercent
    const totalHomeGoalsPercent = totalGoalsPercent > 0 ? (homeGoalsPercent + homeGoalsCompPercent) / totalGoalsPercent * 100 : 0
    //const totalAwayGoalsPercent = (awayGoalsPercent + awayGoalsCompPercent) > 0 ? (awayGoalsPercent + awayGoalsCompPercent) : 0
    const totalAwayGoalsPercent = totalGoalsPercent > 0 ? 100 - totalHomeGoalsPercent : 0

    // Defence Comparison
    const totalDefence =  (homeDefence / homeNumberLimit) + (awayDefence / awayNumberLimit)
    const homeDefencePercent = totalDefence > 0 ? (homeNumberLimit > 0 ? (homeDefence / homeNumberLimit) * 100 / totalDefence : 0) : 0
    const awayDefencePercent = totalDefence > 0 ? (awayNumberLimit > 0 ? (awayDefence / awayNumberLimit) * 100 / totalDefence : 0) : 0

    const totalDefenceComp =  (homeDefenceComp / homeNumberLimit) + (awayDefenceComp / awayNumberLimit)
    const homeDefenceCompPercent = totalDefenceComp > 0 ? ((homeDefenceComp / homeNumberLimit) * 100 / totalDefenceComp) : 0
    const awayDefenceCompPercent = totalDefenceComp > 0 ? ((awayDefenceComp / awayNumberLimit) * 100 / totalDefenceComp) : 0
    
    const totalDefencePercent = homeDefencePercent + homeDefenceCompPercent + awayDefencePercent + awayDefenceCompPercent
    const totalHomeDefencePercent = totalDefencePercent > 0 ? (homeDefencePercent + homeDefenceCompPercent) / totalDefencePercent * 100 : 0
    //const totalAwayDefencePercent = (awayDefencePercent + awayDefenceCompPercent) > 0 ? (awayDefencePercent + awayDefenceCompPercent) : 0
    const totalAwayDefencePercent = totalDefencePercent > 0 ? 100 - totalHomeDefencePercent : 0

    homeCorner = awayNumberLimit > 0 ? (homeCorner / awayNumberLimit).toFixed(2) : 0
    awayCorner = (awayNumberLimit > 0) ? (awayCorner / awayNumberLimit).toFixed(2) : 0

    return [
      homePercent.toFixed(0), awayPercent.toFixed(0), homeLabel, awayLabel, 
      //4
      homeInCompPercent.toFixed(0), awayInCompPercent.toFixed(0), homeInCompLabel, awayInCompLabel,
      // 8
      totalHomePercent.toFixed(0), totalAwayPercent.toFixed(0), homeGoalsPercent.toFixed(0), awayGoalsPercent.toFixed(0), 
      // 12
      `${homeGoals}${$t('Goal')}/${homeNumberLimit}${$t('Match')}`, `${awayGoals}${$t('Goal')}/${awayNumberLimit}${$t('Match')}`, homeGoalsCompPercent.toFixed(0), awayGoalsCompPercent.toFixed(0),
      // 16
      `${homeGoalsComp}${$t('Goal')}/${homeNumberLimit}${$t('Match')}`, `${awayGoalsComp}${$t('Goal')}/${awayNumberLimit}${$t('Match')}`, totalHomeGoalsPercent.toFixed(0), totalAwayGoalsPercent.toFixed(0),
      // 20
      `${homeDefence}${$t('Goal')}/${homeNumberLimit}${$t('Match')}`, `${awayDefence}${$t('Goal')}/${awayNumberLimit}${$t('Match')}`, homeDefencePercent.toFixed(0), awayDefencePercent.toFixed(0),
      // 24
      `${homeDefenceComp}${$t('Goal')}/${homeNumberLimit}${$t('Match')}`, `${awayDefenceComp}${$t('Goal')}/${awayNumberLimit}${$t('Match')}`, homeDefenceCompPercent.toFixed(0), awayDefenceCompPercent.toFixed(0),
      // 28
      totalHomeDefencePercent.toFixed(0), totalAwayDefencePercent.toFixed(0), 
      // 30
      homeCorner, awayCorner,
      // 32
      (Number(homeCorner) + Number(awayCorner)) > 0 ? (Number(homeCorner)  * 100/ (Number(homeCorner) + Number(awayCorner))) : 0,
      (Number(homeCorner) + Number(awayCorner)) > 0 ? (Number(awayCorner)  * 100/ (Number(homeCorner) + Number(awayCorner))) : 0,
      // 34
      homeW, awayW, homeDefence, awayDefence, homeCorner, awayCorner, homeRed, awayRed,
      // 42
      homeGoals, awayGoals, (homeGoals + awayGoals) > 0 ? (homeGoals * 100 / (homeGoals + awayGoals)).toFixed(1) : 0, (homeGoals + awayGoals) > 0 ? (awayGoals * 100 / (homeGoals + awayGoals)).toFixed(1) : 0,
      // 46
      (homeNumberLimit) > 0 ? (homeGoals / homeNumberLimit).toFixed(1) : 0, (awayNumberLimit) > 0 ? (awayGoals / awayNumberLimit).toFixed(1) : 0,
      // 48
      (homeNumberLimit) > 0 ? (homeDefence / homeNumberLimit).toFixed(1) : 0, (awayNumberLimit) > 0 ? (awayDefence / awayNumberLimit).toFixed(1) : 0,
      // 50
      (homeNumberLimit) > 0 ? (homeW * 100 / homeNumberLimit).toFixed(1) : 0, (awayNumberLimit) > 0 ? (awayW * 100 / awayNumberLimit).toFixed(1) : 0,
      // 52
      (homeNumberLimit) > 0 ? (homeD * 100 / homeNumberLimit).toFixed(1) : 0, (awayNumberLimit) > 0 ? (awayD * 100/ awayNumberLimit).toFixed(1) : 0,
      // 54
      (homeNumberLimit) > 0 ? (homeL * 100 / homeNumberLimit).toFixed(1) : 0, (awayNumberLimit) > 0 ? (awayL * 100/ awayNumberLimit).toFixed(1) : 0,
    ]

  } catch (e: any) {
    return []
  }
}

export const getStandingLastest = (matches: any[], limit: number, i_team: any) => {
  try {
    if (!matches || matches.length === 0 || limit === 0)
      return ''

    let totalWin = 0
    let totalDraw = 0
    let totalLose = 0
    let totalGoals = 0
    let totalAgainst = 0
    let totalPoint = 0
    let number = 0;
    
    matches?.forEach((item: string[]) => {
      if (number < limit) {
        if (i_team == item?.[5]) {
          totalGoals += parseIntO(item?.[8])
          totalAgainst += parseIntO(item?.[9])

          if (parseIntO(item?.[8]) > parseIntO(item?.[9])) {
            totalWin++
          } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
            totalDraw++
          } else {
            totalLose++
          }
        } else if (i_team == item?.[7]) {
          totalGoals += parseIntO(item?.[9])
          totalAgainst += parseIntO(item?.[8])

          if (parseIntO(item?.[8]) < parseIntO(item?.[9])) {
            totalWin++
          } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
            totalDraw++
          } else {
            totalLose++
          }
        }

        number++
      }
    })

    totalPoint = totalWin * 3 + totalDraw * 1
    
    return [limit, totalWin, totalDraw, totalLose, totalGoals, totalAgainst, totalPoint, (totalWin*100/number).toFixed(1) ]

  } catch (e: any) {
    return []
  }
}

export const getDataComparison = (matchesStat: any[], teamId: any, is_home: any, limit: number = 10, $t:any) => {
  try {
    if (!matchesStat)
      return []
    
    let scored = 0;
    let conceded = 0;
    let diff = 0;
    let avgScored	 = 0;
    let win = 0;
    let draw = 0;
    let loss = 0;

    let scoredSame = 0;
    let concededSame = 0;
    let diffSame = 0;
    let avgScoredSame	 = 0;
    let winSame = 0;
    let drawSame = 0;
    let lossSame = 0;

    let i = 0;
    const numberLimit = (matchesStat?.length < limit) ? matchesStat?.length : limit
    matchesStat?.forEach((item: string[]) => {
      if (i < numberLimit) {
        if (teamId == item?.[5]) {
          scored += parseIntO(item?.[8])
          conceded += parseIntO(item?.[9])
          if (parseIntO(item?.[8]) > parseIntO(item?.[9])) {
            win++
          } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
            draw++
          } else {
            loss++
          }
          if (is_home) {
            scoredSame += parseIntO(item?.[8])
            concededSame += parseIntO(item?.[9])
            if (parseIntO(item?.[8]) > parseIntO(item?.[9])) {
              winSame++
            } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
              drawSame++
            } else {
              lossSame++
            }
          }
        } else if (teamId == item?.[7]) {
          scored += parseIntO(item?.[9])
          conceded += parseIntO(item?.[8])
          if (parseIntO(item?.[8]) < parseIntO(item?.[9])) {
            win++
          } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
            draw++
          } else {
            loss++
          }

          if (!is_home) {
            scoredSame += parseIntO(item?.[8])
            concededSame += parseIntO(item?.[9])
            if (parseIntO(item?.[8]) > parseIntO(item?.[9])) {
              winSame++
            } else if (parseIntO(item?.[8]) == parseIntO(item?.[9])) {
              drawSame++
            } else {
              lossSame++
            }
          }
        }
        i++
      }
    })

    diff = scored - conceded
    avgScored = numberLimit > 0 ? ((win * 3 + draw * 1)  / numberLimit).toFixed(1) : 0
    win = numberLimit > 0 ? (win * 100 / numberLimit).toFixed(1) : 0
    draw = numberLimit > 0 ? (draw * 100 / numberLimit).toFixed(1) : 0
    loss = numberLimit > 0 ? (loss * 100 / numberLimit).toFixed(1) : 0

    diffSame = scoredSame - concededSame
    avgScoredSame = numberLimit > 0 ? ((winSame * 3 +  drawSame * 1)/ numberLimit).toFixed(1) : 0
    winSame = numberLimit > 0 ? (winSame * 100/ numberLimit).toFixed(1) : 0
    drawSame = numberLimit > 0 ? (drawSame * 100/ numberLimit).toFixed(1) : 0
    lossSame = numberLimit > 0 ? (lossSame * 100 / numberLimit).toFixed(1) : 0

    return [scored, conceded, diff, avgScored, win + '%', draw + '%', loss + '%', is_home ?  $t('Home') : $t('Away'), scoredSame, concededSame, diffSame, avgScoredSame, winSame + '%', drawSame + '%', lossSame + '%']

  } catch (e: any) {
    return []
  }
}

export const getRecentResultStat = (data: any = [], matchId: any) => {
  try {
    if (data.length <= 0)
      return

    let win2 = 0
    let win1 = 0
    let draw = 0
    let lose1 = 0
    let lose2 = 0
    data?.forEach((item: { home_team_id: any; home_scores: any[]; away_scores: any[]; away_team_id: any; }) => {
      // Nếu là đội chủ nhà
      if (item?.home_team_id === matchId) {
        const compare = parseIntO(item?.home_scores[0]) - parseIntO(item?.away_scores[0])
        if (compare >= 2) {
          win2++
        } else if (compare === 1) {
          win1++
        } else if (compare === 0) {
          draw++
        }  else if (compare === -1) {
          lose1++
        }  else if (compare < -1) {
          lose2++
        }
      } else if (item?.away_team_id === matchId) {
        const compare = parseIntO(item?.away_scores[0]) - parseIntO(item?.home_scores[0])
        if (compare >= 2) {
          win2++
        } else if (compare === 1) {
          win1++
        } else if (compare === 0) {
          draw++
        }  else if (compare === -1) {
          lose1++
        }  else if (compare < -1) {
          lose2++
        }
      }
    });

    return [win2, win1, draw, lose1, lose2, (win2 + win1 + draw + lose1 + lose2)]
  } catch (e: any) {
    return []
  }
}

export const getCompareOddChange = (odd2: string, odd1: string) => {
  try {
    if ((typeof odd1 === 'undefined' || !odd1) && (typeof odd2 === 'undefined' || !odd2))
      return ''

    if (isEmpty(odd1) || parseFloatO(odd1) == parseFloatO(odd2))
      return ''
    else if (parseFloatO(odd2) > parseFloatO(odd1) ) {
      return 'up3'
    } else {
      return 'down3'
    }
  } catch (e: any) {
    return ''
  }
}

export const reduceOddsHistories = (Odds, isHadicap = true) => {
  try {
    return Odds?.map((item, index) => {
      
      item.odds1 = parseFloatO(item?.odds1) <= 1 ?  item?.odds1 : ((-1/parseFloatO(item?.odds1)).toFixed(2));
      item.odds3 = parseFloatO(item?.odds3) <= 1 ?  item?.odds3 : ((-1/parseFloatO(item?.odds3)).toFixed(2));
      item.odd1_class = (index === 0) ? '' : getCompareOddChange(item?.odds1, Odds?.[index + 1]?.odds1)
      item.odd2_class = (index === 0) ? '' : getCompareOddChange(item?.odds2, Odds?.[index + 1]?.odds2)
      item.odd3_class = (index === 0) ? '' : getCompareOddChange(item?.odds3, Odds?.[index + 1]?.odds3)
      return item
    });
  } catch (e: any) {
    return null
  }
}

export const getCompareOddChangeMobile = (odd2: string, odd1: string) => {
  try {
    if ((typeof odd1 === 'undefined' || !odd1) && (typeof odd2 === 'undefined' || !odd2))
      return ''

    if (isEmpty(odd1) || parseFloatO(odd1) == parseFloatO(odd2))
      return ''
    else if (parseFloatO(odd2) > parseFloatO(odd1) ) {
      return 'o-up'
    } else {
      return 'o-down'
    }
  } catch (e: any) {
    return ''
  }
}

export const reduceOddsHistoriesMobile = (Odds, isHadicap = true) => {
  try {
    return Odds?.map((item, index) => {
      
      item.odds1 = parseFloatO(item?.odds1) <= 1 ?  item?.odds1 : ((-1/parseFloatO(item?.odds1)).toFixed(2));
      item.odds3 = parseFloatO(item?.odds3) <= 1 ?  item?.odds3 : ((-1/parseFloatO(item?.odds3)).toFixed(2));
      item.odd1_class = (index === 0) ? '' : getCompareOddChangeMobile(item?.odds1, Odds?.[index + 1]?.odds1)
      item.odd2_class = (index === 0) ? '' : getCompareOddChangeMobile(item?.odds2, Odds?.[index + 1]?.odds2)
      item.odd3_class = (index === 0) ? '' : getCompareOddChangeMobile(item?.odds3, Odds?.[index + 1]?.odds3)
      return item
    });
  } catch (e: any) {
    return null
  }
}

export const reduceOddsHistoriesCorner = (Odds, isHadicap = true) => {
  try {
    if ((typeof Odds === 'undefined' || !Odds))
      return []

    return Odds?.map((item, index) => {
      
      item.over = parseFloatO(item?.over) <= 1 ?  item?.over : ((-1/parseFloatO(item?.over)).toFixed(2));
      item.under = parseFloatO(item?.under) <= 1 ?  item?.under : ((-1/parseFloatO(item?.under)).toFixed(2));
      item.odd1_class = (index === 0) ? '' : getCompareOddChangeMobile(item?.over, Odds?.[index + 1]?.over)
      item.odd2_class = (index === 0) ? '' : getCompareOddChangeMobile(item?.total_corners, Odds?.[index + 1]?.total_corners)
      item.odd3_class = (index === 0) ? '' : getCompareOddChangeMobile(item?.under, Odds?.[index + 1]?.under)
      return item
    });
  } catch (e: any) {
    return null
  }
}

export const reduceOddsHistoriesEuroHandicap = (Odds, isHadicap = true) => {
  try {
    return Odds?.map((item, index) => {
      
      item.home = parseFloatO(item?.home) <= 1 ?  item?.home : ((-1/parseFloatO(item?.home)).toFixed(2));
      item.away = parseFloatO(item?.away) <= 1 ?  item?.away : ((-1/parseFloatO(item?.away)).toFixed(2));
      item.odd1_class = (index === 0) ? '' : getCompareOddChangeMobile(item?.home, Odds?.[index + 1]?.home)
      item.odd2_class = (index === 0) ? '' : getCompareOddChangeMobile(item?.draw, Odds?.[index + 1]?.draw)
      item.odd3_class = (index === 0) ? '' : getCompareOddChangeMobile(item?.away, Odds?.[index + 1]?.away)
      return item
    });
  } catch (e: any) {
    return null
  }
}

export const reduceOddsHistoriesDoubeChance = (Odds) => {
  try {
    return Odds?.map((item, index) => {
      
      item.odds.home_draw = parseFloatO(item?.odds?.home_draw) <= 1 ?  item?.odds?.home_draw : ((-1/parseFloatO(item?.odds?.home_draw)).toFixed(2));
      item.odds.draw_away = parseFloatO(item?.odds?.draw_away) <= 1 ?  item?.odds?.draw_away : ((-1/parseFloatO(item?.odds?.draw_away)).toFixed(2));
      item.odd1_class = (index === 0) ? '' : getCompareOddChangeMobile(item?.odds?.home_draw, Odds?.[index + 1]?.odds?.home_draw)
      item.odd2_class = (index === 0) ? '' : getCompareOddChangeMobile(item?.odds?.home_away, Odds?.[index + 1]?.odds?.home_away)
      item.odd3_class = (index === 0) ? '' : getCompareOddChangeMobile(item?.odds?.draw_away, Odds?.[index + 1]?.odds?.draw_away)
      return item
    });
  } catch (e: any) {
    return null
  }
}

export const getOddsCorrectScore = (odds, homeScore, awayScore) => {
  try {
    if ((typeof odds === 'undefined' || !odds))
      return ''

    const odd = odds?.bettingOddsItems?.find(item => item?.homeScore === homeScore && item?.awayScore === awayScore)?.odds
    if (odd) {
      return parseFloatO(odd)
    } else {
      return '-'
    }
  } catch (e: any) {
    return '-'
  }
}
export const getValueByPosition = (odd: string | any[], position: number) => {
  try {
    if (odd.length > 0 ) {
      const odds = String(odd)?.split(/\s*,\s*/)

      if (odds?.length > position ) {
        return (odds[position] && odds[position] !== 'null') ? odds[position] : ''
      }
    }

    return ''
  } catch (e: any) {
    return ''
  }
}

export const getValueByPositionWarehourse = (odd: string | any[], position: number) => {
  try {
    if (odd.length > 0 ) {
      const odds = String(odd)?.replace(new RegExp(escapeRegExp("["), 'g'), "")?.replace(new RegExp(escapeRegExp("'"), 'g'), "")?.replace(new RegExp(escapeRegExp("]"), 'g'), "")?.split(/\s*,\s*/)

      if (odds?.length > position ) {
        return (odds[position] && odds[position] !== 'null') ? odds[position] : ''
      }
    }

    return ''
  } catch (e: any) {
    return ''
  }
}

export const getDetailOddsChange = (data: any = [], typeOdd = '', group = '', position = 0) => {
  try {
    if (data?.length <= 0)
      return '-'
    const oddData = data?.find(({ type }) => type === typeOdd)
    if (oddData?.[group]) {
      const data = JSON.parse(oddData[group]?.replace(new RegExp(escapeRegExp("'"), 'g'), "\""))
      if (data[position]) {
        const oddValue = data[position]

        if (oddData?.[group + '_older']) {
          const dataOlder = JSON.parse(oddData[group + '_older']?.replace(new RegExp(escapeRegExp("'"), 'g'), "\""))

          if (dataOlder[position]) {
            const oddOlderValue = dataOlder[position]
    
            if (parseFloat(oddValue) > parseFloat(oddOlderValue)) {
              return '<div class="up">' + ((parseFloatO(oddValue) !== 0) ? parseFloatO(oddValue).toFixed(2) : 0) + '</div>';
            } else if (parseFloat(oddValue) < parseFloat(oddOlderValue)) {
              return '<div class="down">' + ((parseFloatO(oddValue) !== 0) ? parseFloatO(oddValue).toFixed(2) : 0) + '</div>';
            } else {
              return ((parseFloatO(oddValue) !== 0) ? parseFloatO(oddValue).toFixed(2) : 0);
            }
          }
        }

        return data[position]
      }
    }
    return ''

  } catch (e: any) {
    return ''
  }
}

export const  generateMetaSeo = (meta, home_name, home_away, time = '', timeZone = '', competition_name = '') => {
  try {
    return meta?.replaceAll('${home_name}', home_name)?.replaceAll('${away_name}', home_away)?.replaceAll('${date}', formatDateMomentUTCTimeZone(time, 'DD-MM-yyyy', timeZone))?.replaceAll('${time}', formatDateMomentUTCTimeZone(time, 'HH:mm', timeZone))?.replaceAll('${competition_name}', competition_name)
  } catch (e: any) {
    return meta
  }
}

export const  generateCompetitionMetaSeo = (meta, competition_name) => {
  try {
    return meta?.replaceAll('${competition_name}', competition_name)
  } catch (e: any) {
    return meta
  }
}

export const generateTeamMetaSeo = (meta: string, team_name: string): string => {
  try {
    return meta?.replaceAll('${team_name}', team_name).replaceAll('${player_name}', team_name).replaceAll('${coach_name}', team_name)
  } catch (e: any) {
    return meta
  }
}