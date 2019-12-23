import { clamp } from "./math"

export const shadeColor = (color, percent) => {
  let R = parseInt(color.substring(1, 3), 16)
  let G = parseInt(color.substring(3, 5), 16)
  let B = parseInt(color.substring(5, 7), 16)

  R = parseInt((R * (100 + percent)) / 100)
  G = parseInt((G * (100 + percent)) / 100)
  B = parseInt((B * (100 + percent)) / 100)

  R = R < 255 ? R : 255
  G = G < 255 ? G : 255
  B = B < 255 ? B : 255

  const RR = R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16)
  const GG = G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16)
  const BB = B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16)

  return "#" + RR + GG + BB
}

export const shadeColorUint8 = (color, percent) => {
  const r = Math.min((color[0] * (100 + percent)) / 100, 255)
  const g = Math.min((color[1] * (100 + percent)) / 100, 255)
  const b = Math.min((color[2] * (100 + percent)) / 100, 255)
  return makeColorInt8(r, g, b, color[3])
}

export const makeColorInt8 = (r, g, b, a = 1) => {
  const color = new Uint8Array(4)
  color[0] = r
  color[1] = g
  color[2] = b
  color[3] = a
  return color
}

export const colorUint8ToRgbaString = color =>
  `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 100})`

export const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16))
  const color = makeColorInt8(r, g, b, alpha)
  return color
  // return `rgba(${r},${g},${b},${alpha})`
}

export const pct = value => `${clamp(value * 100, 0, 100)}%`

export const px = value => `${value}px`
