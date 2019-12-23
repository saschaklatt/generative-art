export const unit = () => [1, 1]

export const zero = () => [0, 0]

export const left = () => [-1, 0]

export const right = () => [1, 0]

export const up = () => [0, -1]

export const down = () => [0, 1]

export const clone = arr => [arr[0], arr[1]]

export const fromObject = obj => [obj.x, obj.y]

export const random = (scale = 1) => [
  Math.random() * scale,
  Math.random() * scale,
]

export const add = (v1, v2) => {
  v1[0] = v1[0] + v2[0]
  v1[1] = v1[1] + v2[1]
}
export const addImmutable = (v1, v2) => [v1[0] + v2[0], v1[1] + v2[1]]

export const subtract = (v1, v2) => {
  v1[0] = v1[0] - v2[0]
  v1[1] = v1[1] - v2[1]
}
export const subtractImmutable = (v1, v2) => [v1[0] - v2[0], v1[1] - v2[1]]

export const multiply = (v1, v2) => {
  v1[0] = v1[0] * v2[0]
  v1[1] = v1[1] * v2[1]
}
export const multiplyImmutable = (v1, v2) => [v1[0] * v2[0], v1[1] * v2[1]]

export const divide = (v1, v2) => {
  v1[0] = v1[0] / v2[0]
  v1[1] = v1[1] / v2[1]
}
export const divideImmutable = (v1, v2) => [v1[0] / v2[0], v1[1] / v2[1]]

export const scale = (v, s) => {
  v[0] = v[0] * s
  v[1] = v[1] * s
}
export const scaleImmutable = (v, s) => [v[0] * s, v[1] * s]

export const normalize = v => {
  const magnitude = mag(v)
  const revMag = magnitude === 0 ? 0 : 1 / magnitude
  v[0] *= revMag
  v[1] *= revMag
}

export const normalizeImmutable = v => {
  const magnitude = mag(v)
  const revMag = magnitude === 0 ? 0 : 1 / magnitude
  return [v[0] * revMag, v[1] * revMag]
}

export const magSquare = v => v[0] * v[0] + v[1] * v[1]

export const mag = v => Math.sqrt(magSquare(v))

/**
 * Calculate the distance between two vectors.
 *
 * @param v1
 * @param v2
 * @returns {number}
 */
export const distance = (v1, v2) => Math.abs(mag(subtract(v1, v2)))

/**
 * @param v1
 * @param v2
 * @returns {number}
 */
export const dot = (v1, v2) => v1[0] * v2[0] + v1[1] * v2[1]

/**
 * @param v1
 * @param v2
 * @returns {number}
 */
export const angleBetween = (v1, v2) =>
  Math.acos(dot(v1, v2) / (mag(v1) * mag(v2)))
