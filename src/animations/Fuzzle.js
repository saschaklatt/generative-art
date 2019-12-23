import Vector2 from "./utils/Vector2"
import { hex2rgba } from "./utils/theme"
import makeTimer from "./utils/Timer"
import makeParticleEmitter from "./utils/ParticleEmitter"
import makeParticleRegistry from "./utils/ParticleRegistry"
import {
  makeAttractor,
  makeAttractorUpdater,
  // makeAttractorRenderer,
} from "./utils/Attractor"
import { easeInSine } from "./utils/easing"

const TAG_RED_PIXEL = "RED_PIXEL"

const getCanvasOffset = ({ canvas, center }) => {
  const bounds = canvas.getBoundingClientRect()
  const ratioX = bounds.width / 640
  const ratioY = bounds.height / 400

  // TODO: incorrect when canvas is scaled (mobile)
  return new Vector2(
    bounds.left + center.x * ratioX,
    bounds.top + center.y * ratioY
  )
}

const Fuzzle = (canvas, window, customProps) => {
  const { stage, particlesPerSecond, particleLifespan } = {
    particlesPerSecond: 120,
    particleLifespan: 3,
    stage: {
      size: new Vector2(640, 400),
      center: new Vector2(320, 200),
    },
    ...customProps,
  }
  let raf = null
  let dt = 0

  const FADE_IN_DURATION = 1.5
  let fadeInTime = 0
  let isFadingComplete = false

  const ctx = canvas.getContext("2d")
  const timer = makeTimer(window)

  const mousePos = Vector2.Zero()
  let offset = getCanvasOffset({ canvas, center: stage.center })
  const handleResize = () => {
    offset = getCanvasOffset({ canvas, center: stage.center })
  }
  const handleMouseMove = evt => {
    mousePos.x = evt.clientX - offset.x
    mousePos.y = evt.clientY - offset.y
  }

  // TODO: remove listener when unmounting
  window.addEventListener("resize", handleResize)
  window.addEventListener("mousemove", handleMouseMove)

  const registry = makeParticleRegistry()
  registry.add([
    // makeParticleEmitter({
    //   particlesPerSecond,
    //   particleLifespan,
    //   tag: null,
    //   position: new Vector2(100, 100),
    //   // baseColor: hex2rgba("#A70D00"),
    //   baseColor: hex2rgba("#F5E753"),
    //   // baseColor: hex2rgba("#0D557F"),
    // }),
    makeParticleEmitter({
      particlesPerSecond,
      particleLifespan,
      tag: null,
      position: stage.center,
      // baseColor: hex2rgba("#A70D00"),
      // baseColor: hex2rgba("#F5E753"),
      baseColor: hex2rgba("#0D557F"),
    }),
    makeParticleEmitter({
      particlesPerSecond,
      particleLifespan,
      tag: TAG_RED_PIXEL,
      position: stage.center,
      baseColor: hex2rgba("#A70D00"),
      // baseColor: hex2rgba("#F5E753"),
      // baseColor: hex2rgba("#0D557F"),
    }),
  ])

  const attractor = makeAttractor({
    position: new Vector2(10, 100),
    attracteeTag: TAG_RED_PIXEL,
  })
  const updateAttractor = makeAttractorUpdater({
    attractor,
    registry,
    mousePos,
  })
  // const renderAttractor = makeAttractorRenderer()

  const emitSingle = emitter => {
    emitter.emit(dt)
  }
  const emitAll = () => registry.emitters.forEach(emitSingle)

  const renderSingle = emitter => emitter.render(ctx)
  const renderAll = () => {
    const { size } = stage
    ctx.clearRect(0, 0, size.x, size.y)
    registry.emitters.forEach(renderSingle)
    // renderAttractor({ ctx, attractor, containerPosition: stage.center })
  }

  const updateAll = () => {
    const count = registry.emitters.length
    for (let i = 0; i < count; i++) {
      registry.emitters[i].update(dt)
      updateAttractor(dt)
    }
  }

  const cleanupSingle = emitter => emitter.cleanup()
  const cleanupAll = () => registry.emitters.forEach(cleanupSingle)

  const isRunning = () => !!raf

  const fadeInCanvas = () => {
    if (isFadingComplete) {
      return
    }
    fadeInTime += dt
    const percent = fadeInTime / FADE_IN_DURATION
    const ratio = easeInSine(percent, fadeInTime, 0, 1, FADE_IN_DURATION)
    canvas.style.opacity = Math.min(ratio, 1)
    if (ratio >= 1) {
      isFadingComplete = true
      fadeInTime = undefined
    }
  }

  const loop = () => {
    dt = timer.tick()
    fadeInCanvas()
    emitAll()
    renderAll()
    updateAll()
    cleanupAll()
    raf = window.requestAnimationFrame(loop)
  }

  const pause = () => {
    if (!isRunning()) {
      return
    }
    window.cancelAnimationFrame(raf)
    raf = null
  }

  const resume = () => {
    if (isRunning()) {
      return
    }
    dt = timer.tick()
    loop()
  }

  const unmount = () => {
    window.cancelAnimationFrame(raf)
    window.removeEventListener("resize", handleResize)
    window.removeEventListener("mousemove", handleMouseMove)
    pause()
  }

  loop()

  return {
    unmount,
    pause,
    resume,
  }
}

export default Fuzzle
