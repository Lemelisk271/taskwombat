import { lookup } from 'zipcodes'

export const findCity = (zipCode) => {
  try {
    const data = lookup(zipCode)
    return `${data.city}, ${data.state}`
  } catch {
    return "Seattle, WA"
  }
}

export const getAdjustedDate = (date) => {
  if (process.env.NODE_ENV === 'production') {
    const dateFromServer = new Date(date)
    const pstOffset = 420 * 60 * 1000
    const adjustedDate = new Date(dateFromServer.getTime() + pstOffset)
    return adjustedDate.toString()
  } else {
    return date
  }
}

export const getAdjustedTime = (date) => {
  if (process.env.NODE_ENV === 'production') {
    const dateFromServer = new Date(date)
    const pstOffset = 420 * 60 * 1000
    const adjustedDate = new Date(dateFromServer.getTime() - pstOffset)
    return adjustedDate.toString()
  } else {
    return date
  }
}

export const changeTime = (date, hours) => {
  const newDate = new Date(date)
  const offSet = hours * 60 * 60 * 1000
  return new Date(newDate.getTime() + offSet)
}
