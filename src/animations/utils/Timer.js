const Timer = window => {
  const getTime = () => window.performance.now() / 1000
  let lastTick = getTime()
  return {
    tick: () => {
      const t = getTime()
      const dt = t - lastTick
      lastTick = t
      return dt
    },
  }
}

export default Timer
