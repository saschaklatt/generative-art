const makeParticleRegistry = () => {
  const emitters = []

  const add = singleOrList => {
    if (Array.isArray(singleOrList)) {
      singleOrList.forEach(e => emitters.push(e))
    } else {
      emitters.push(singleOrList)
    }
  }

  const remove = emitter => {
    const idx = emitters.indexOf(emitter)
    if (idx >= 0) {
      return emitters.splice(idx, 1)
    }
    return null
  }

  const getAllParticles = () => {
    return emitters.reduce(
      (particles, emitter) => [...particles, ...emitter.particles],
      []
    )
  }

  const getParticlesWithTag = tag => {
    const particleHasTag = particle => particle.tag === tag
    return getAllParticles().filter(particleHasTag)
  }

  return {
    add,
    remove,
    getAllParticles,
    getParticlesWithTag,
    emitters,
  }
}

export default makeParticleRegistry
