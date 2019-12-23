import Vector2 from "./Vector2"
import { randomRangeAndDirection } from "./math"
import { shadeColorUint8, colorUint8ToRgbaString } from "./theme"

export const makeParticle = props => ({
  position: Vector2.Zero(),
  acceleration: Vector2.Zero(),
  velocity: Vector2.Zero(),
  size: Vector2.Zero(),
  anchor: Vector2.Zero(),
  color: new Int8Array(4),
  scaleSpeed: 0,
  age: 0,
  mass: 1,
  tag: null,
  ...props,
})

const variation = new Vector2(50, 50)

export const makeParticleInitializer = ({ baseColor, tag }) => particle => {
  const vStartMin = 0.1
  const vStartMax = 1
  const accMin = 1
  const accMax = 100
  const variationX = Math.random() * variation.x
  const variationY = Math.random() * variation.y

  particle.tag = tag
  particle.age = 0
  particle.position.x = variationX - variationX / 2
  particle.position.y = variationY - variationY / 2
  particle.velocity.x = randomRangeAndDirection(vStartMin, vStartMax)
  particle.velocity.y = randomRangeAndDirection(vStartMin, vStartMax)
  particle.acceleration.x = randomRangeAndDirection(accMin, accMax)
  particle.acceleration.y = randomRangeAndDirection(accMin, accMax)
  particle.color = shadeColorUint8(baseColor, randomRangeAndDirection(0, 80))
  particle.size.x = 16
  particle.size.y = 16
  particle.anchor.x = particle.size.x / 2
  particle.anchor.y = particle.size.y / 2
  particle.scaleSpeed = 0.9

  return particle
}

export const makeParticleRenderer = () => ({
  ctx,
  containerPosition,
  particle,
}) => {
  const x = containerPosition.x + particle.position.x - particle.anchor.x
  const y = containerPosition.y + particle.position.y - particle.anchor.y
  const color = colorUint8ToRgbaString(particle.color)
  ctx.fillStyle = color
  ctx.fillRect(x, y, particle.size.x, particle.size.y)
}

export const makeParticleUpdater = ({ particleLifespan }) => ({
  particle,
  dt,
}) => {
  particle.position.x += particle.velocity.x * dt
  particle.position.y += particle.velocity.y * dt

  particle.velocity.x += particle.acceleration.x * dt
  particle.velocity.y += particle.acceleration.y * dt

  particle.size.scale(1 - particle.scaleSpeed * dt)
  particle.color[3] = (1 - particle.age / particleLifespan) * 100
  particle.age += dt
}
