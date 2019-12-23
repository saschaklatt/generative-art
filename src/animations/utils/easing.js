export const easeOutBack = () => "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
export const easeInBackSlightly = () => "cubic-bezier(0.6, -0.08, 0.735, 0.045)"
export const easeInBack = () => "cubic-bezier(0.6, -0.28, 0.735, 0.045)"

export const easeInSine = (x, t, b, c, d) =>
  -c * Math.cos((t / d) * (Math.PI / 2)) + c + b
