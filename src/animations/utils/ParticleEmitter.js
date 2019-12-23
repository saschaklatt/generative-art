import makeObjectPool from "./ObjectPool"
import {
  makeParticle,
  makeParticleInitializer,
  makeParticleRenderer,
  makeParticleUpdater,
} from "./Particle"

const makeFractionCounter = (initialValue = 0) => {
  let value = initialValue
  return {
    update: delta => {
      value += delta
    },
    reset: () => {
      value = initialValue
    },
    value: () => value,
  }
}

const makeParticleEmitter = props => {
  const {
    particlesPerSecond,
    particleLifespan,
    position,
    baseColor,
    tag,
  } = props

  const initParticle = makeParticleInitializer({ baseColor, tag })
  const renderParticle = makeParticleRenderer()
  const updateParticle = makeParticleUpdater({ particleLifespan })

  const particles = []
  const pool = makeObjectPool({ factory: makeParticle })
  const emitFraction = makeFractionCounter()

  const emit = dt => {
    emitFraction.update(particlesPerSecond * dt)
    const totalFraction = emitFraction.value()
    if (totalFraction > 1) {
      emitFraction.reset()
    }

    const count = Math.floor(totalFraction)
    for (let i = 0; i < count; i++) {
      const particle = initParticle(pool.get())
      particles.push(particle)
    }
  }

  const render = ctx => {
    const count = particles.length
    // render backwards (z-order)
    for (let i = count - 1; i >= 0; i--) {
      renderParticle({
        ctx,
        particle: particles[i],
        containerPosition: position,
      })
    }
  }

  const update = dt => {
    const count = particles.length
    for (let i = 0; i < count; i++) {
      updateParticle({ dt, particle: particles[i] })
    }
  }

  const cleanup = () => {
    const count = particles.length
    for (let i = count - 1; i >= 0; i--) {
      const particle = particles[i]
      const isDead = particle.age > particleLifespan
      if (isDead) {
        particles.splice(i, 1)
        pool.recycle(particle)
      }
    }
  }

  return { emit, render, update, cleanup, particles }
}

export default makeParticleEmitter
