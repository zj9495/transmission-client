import moment from 'moment'

import store from '../store'

export const formatBytes = (number: number, bytes: number, units: string[], digits = 2): string => {
  let unitsIndex = 0;
  number = number / bytes;
  while (number / bytes >= 1 && unitsIndex < units.length -1) {
    unitsIndex++;
    number = number / bytes
  }
  return Number(number.toFixed(digits)) + units[unitsIndex]
}

export const formatSize = (number: number, allowZero=false): string => {
  const { session } = store.getState()
  const { sizeBytes, sizeUnits } = session.units
  if (!allowZero && !number) {
    return ' '
  }
  return formatBytes(number, sizeBytes, sizeUnits )
}

export const formatSpeed = (number: number, allowZero=false): string => {
  const { session } = store.getState()
  const { speedBytes, speedUnits } = session.units
  if (!allowZero && !number) {
    return ' '
  }
  return formatBytes(number, speedBytes, speedUnits )
}

export const formatUnixTimeStamp = (timeStamp: number): string => {
  if (!timeStamp) {
    return ' '
  }
  return moment.unix(timeStamp).format('YYYY-MM-DD HH:mm:ss')
}
