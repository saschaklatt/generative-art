export const shuffle = arr => arr.sort(() => 0.5 - Math.random())

export const randomIndex = arr =>
  arr.length ? Math.floor(Math.random() * arr.length) : undefined

export const randomEntry = arr =>
  arr.length ? arr[randomIndex(arr)] : undefined

export const randomEntries = (arr, n) =>
  arr.length && n > 0 ? shuffle(arr).slice(0, n) : undefined

export const isFilledArray = arr => Array.isArray(arr) && arr.length > 0

export const includesAll = (list, haystack) =>
  list.every(entry => haystack.includes(entry))

export const includesSome = (list, haystack) =>
  list.some(entry => haystack.includes(entry))

export const last = arr => (arr.length ? arr[arr.length - 1] : undefined)
