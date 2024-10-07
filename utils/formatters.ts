// import { isToday } from './helpers'

export const avatarText = (value: string) => {
  if (!value)
    return ''
  const nameArray = value.split(' ')

  return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
}

// TODO: Try to implement this: https://twitter.com/fireship_dev/status/1565424801216311297
export const kFormatter = (num: number) => {
  const regex = /\B(?=(\d{3})+(?!\d))/g

  return Math.abs(num) > 9999 ? `${Math.sign(num) * +((Math.abs(num) / 1000).toFixed(1))}k` : Math.abs(num).toFixed(0).replace(regex, ',')
}

export const formatDate = (value: string, formatting: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value)
    return value

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

export const prefixWithPlus = (value: number) => value > 0 ? `+${value}` : value

export const currencyFormatter = (value) => {
  if (!value || typeof value === 'undefined')
    return ''

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}