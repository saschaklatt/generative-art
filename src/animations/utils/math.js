export const map = (value, oMin, oMax, tMin, tMax) => {
  // calculate pct in original range
  const oDist = oMax - oMin
  const pct = (value - oMin) / oDist
  // apply pct value to target range
  const tDist = tMax - tMin
  return tDist * pct + tMin
}

export const clamp = (v, min, max) =>
  isNaN(v) ? min : Math.max(Math.min(v, max), min)

export const randomRange = (min, max) => Math.random() * (max - min) + min

export const randomRangeInt = (min, max) => Math.round(randomRange(min, max))

export const randomBool = () => Math.random() > 0.5

export const randomDirection = () => (randomBool() ? 1 : -1)

export const randomRangeAndDirection = (min, max) =>
  randomRange(min, max) * randomDirection()
