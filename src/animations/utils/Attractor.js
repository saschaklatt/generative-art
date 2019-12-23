import Vector2 from "./Vector2"

export const makeAttractor = props => ({
  mass: 100,
  gravity: 10000,
  strengthMax: 10,
  position: Vector2.Zero(),
  size: new Vector2(10, 10),
  anchor: new Vector2(5, 5),
  attracteeTag: null,
  distanceMax: 200,
  ...props,
})

export const makeAttractorRenderer = () => ({
  ctx,
  containerPosition,
  attractor,
}) => {
  const x = containerPosition.x + attractor.position.x - attractor.anchor.x
  const y = containerPosition.y + attractor.position.y - attractor.anchor.y
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(x, y, 10, 10)
}

export const makeAttractorUpdater = ({ registry, attractor, mousePos }) => {
  return () => {
    const hasMousePos = mousePos.magSquare() > 0
    if (!hasMousePos) {
      return
    }

    const {
      position,
      mass,
      gravity,
      attracteeTag,
      strengthMax,
      distanceMax,
    } = attractor

    attractor.position.x = mousePos.x
    attractor.position.y = mousePos.y

    const particles = registry.getParticlesWithTag(attracteeTag)

    particles.forEach(particle => {
      const force = Vector2.Sub(position, particle.position)
      const distanceReal = force.mag()
      const distance = distanceReal < distanceMax ? distanceReal : Infinity
      force.normalize()

      const strengthRaw =
        (gravity * mass * particle.mass) / (distance * distance)
      const strength = Math.min(strengthRaw, strengthMax)
      force.scale(strength)

      const strengthRelative = Vector2.DivScalar(force, particle.mass)

      particle.acceleration.add(strengthRelative)
    })
  }
}
