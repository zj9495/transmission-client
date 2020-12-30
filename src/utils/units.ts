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

export const formatSize = (number: number): string => {
  const { session } = store.getState()
  const { sizeBytes, sizeUnits } = session.units
  return formatBytes(number, sizeBytes, sizeUnits )
}

export const formatSpeed = (number: number): string => {
  const { session } = store.getState()
  const { speedBytes, speedUnits } = session.units
  return formatBytes(number, speedBytes, speedUnits )
}