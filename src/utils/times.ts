export const formatLeftTime = (ms:number):string => {
  const s = Math.floor(ms / 1000)
  let seconds: number | string = Math.floor(s % 60)
  let minutes: number | string  = Math.floor(s / 60 % 60)
  const hours: number = Math.floor(s / 60 / 60)

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${hours}:${minutes}:${seconds}`
}