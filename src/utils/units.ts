export const formatBytes = (number: number, bytes: number, units: string[], digits = 2): string => {
  let unitsIndex = 0;
  number = number / bytes;
  while (number / bytes >= 1 && unitsIndex < units.length -1) {
    unitsIndex++;
    number = number / bytes
  }
  return Number(number.toFixed(digits)) + units[unitsIndex]
}