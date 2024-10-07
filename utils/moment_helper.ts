import moment from 'moment-timezone';

export const sortByTimeLive = (arrObj, sort: boolean) => {
  if (arrObj === null || arrObj === undefined || arrObj === '')
    return []

  return arrObj.sort((a, b) => {
    if (sort)
      return new Date(b.start_at).getTime() - new Date(a.start_at).getTime()

    else
      return new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
  }, sort)
}

export const sortByTime = (arrObj, sort: boolean) => {
  if (arrObj === null || arrObj === undefined || arrObj === '')
    return []
  return arrObj.sort((a, b) => {
    if (sort) {
      return new Date(b.match_time).getTime() - new Date(a.match_time).getTime()
    }

    else
      return new Date(a.match_time).getTime() - new Date(b.match_time).getTime()
  }, sort)
}

export const formatTimeSince = (dateString: string, useLocale: any) => {
  if (dateString === null || dateString === undefined || dateString === '')
    return ''

  moment.locale(useLocale?.defaultLocale)
  return moment(dateString).fromNow()
}

export const formatDateMoment = (dateString: string, formatTime = 'yyyy-MM-DD') => {
  if (dateString === null || dateString === undefined || dateString === '')
    return ''

  return moment(dateString).format(String(formatTime))
}

export const formatDateMomentUTCTimeZone = (dateString: string, formatTime = 'yyyy-MM-DD', timeZone?: any = 'GMT+07:00') => {
  try {
    if (dateString === null || dateString === undefined || dateString === '')
      return ''
  
    if (timeZone !== '') {
      return moment(dateString).utcOffset(timeZone).format(formatTime)
    } else {
      return moment(dateString).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format(formatTime)
    }
  }
  catch(error) {
    return ''
  }
}

export const timeStamp2DateUTCTimeZone = (timestamp: string, formatTime = 'yyyy-MM-DD', timeZone?: any = 'GMT+07:00') => {
  try {
    if (timestamp === null || timestamp === undefined || timestamp === '')
      return ''
    const d = new Date(parseInt(timestamp) * 1000);

    if (timeZone !== '') {
      return moment(d).utcOffset(timeZone).format(formatTime)
    } else {
      return moment(d).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format(formatTime)
    }
  }
  catch(error) {
    return ''
  }
}

export const formatTimeRemaining = (dateString: string) => {
  if (dateString === null || dateString === undefined || dateString === '')
    return ''

  const now = moment()
  const end = moment(dateString) // another date
  const duration = moment.duration(end.diff(now))

  // Get Days and subtract from duration
  const days = duration.days()

  duration.subtract(days, 'days')

  // Get hours and subtract from duration
  const hours = duration.hours()

  duration.subtract(hours, 'hours')

  // Get Minutes and subtract from duration
  const minutes = duration.minutes()

  // Get seconds
  const seconds = duration.seconds()

  let remaining = ''
  if (days > 0)
    remaining = `${days} days `
  if (hours > 0)
    remaining += `${hours} hours `
  if (minutes > 0)
    remaining += `${minutes} minutes `

  return remaining || ''
}

export const timeNowDiff = (dateString: string, unit: string = 'seconds') => {
  if (dateString === null || dateString === undefined || dateString === '')
    return 0

  const now = moment()
  const end = moment(dateString) // another date

  return end.diff(now, unit)
}

export const timeRemaining = (dateString: string = '') => {
  if (dateString === null || dateString === undefined || dateString === '')
    return ''

  const now = moment()
  const end = moment(dateString) // another date
  const duration = moment.duration(end.diff(now))

  // Get Days and subtract from duration
  const days = duration.days()

  duration.subtract(days, 'days')

  // Get hours and subtract from duration
  const hours = duration.hours()

  duration.subtract(hours, 'hours')

  // Get Minutes and subtract from duration
  const minutes = duration.minutes()

  // Get seconds
  const seconds = duration.seconds()

  let remaining = ''
  remaining = (days > 0) ? `${pad(days)} Days ` : ''
  remaining += (hours > 0) ? `${pad(hours)} : ` : '00 : '
  remaining += (minutes > 0) ? `${pad(minutes)} : ` : '00 : '
  remaining += (seconds > 0) ? `${pad(seconds)}` : '00'

  return remaining
}

export const pad = (num, size = 2) => {
  num = num.toString()
  while (num.length < size) num = `0${num}`

  return num
}

export const countDown = (dateString: string = '') => {
  if (dateString === null || dateString === undefined || dateString === '')
    return ''

  const now = moment()
  const end = moment(dateString) // another date
  const duration = moment.duration(end.diff(now))

  // Get Days and subtract from duration
  const days = duration.days()

  duration.subtract(days, 'days')

  // Get hours and subtract from duration
  const hours = duration.hours()

  duration.subtract(hours, 'hours')

  // Get Minutes and subtract from duration
  const minutes = duration.minutes()

  // Get seconds
  const seconds = duration.seconds()

  let remaining = ''
  remaining = (days > 0) ? `${pad(days)} Days ` : ''
  remaining += (hours > 0) ? `${pad(hours)} : ` : '00 : '
  remaining += (minutes > 0) ? `${pad(minutes)} : ` : '00 : '
  remaining += (seconds > 0) ? `${pad(seconds)}` : '00'

  return [days >0 ? pad(days) : '00', hours > 0 ? pad(hours) : '00', minutes > 0 ? pad(minutes) : '00', seconds > 0 ? pad(seconds) : '00']
}
