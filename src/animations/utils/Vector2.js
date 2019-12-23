export default class Vector2 {
  static Unit() {
    return new Vector2(1, 1)
  }

  static Zero() {
    return new Vector2(0, 0)
  }

  static Left() {
    return new Vector2(-1, 0)
  }

  static Right() {
    return new Vector2(1, 0)
  }

  static Up() {
    return new Vector2(0, -1)
  }

  static Down() {
    return new Vector2(0, 1)
  }

  static FromArray(arr) {
    return new Vector2(arr[0], arr[1])
  }

  static FromObject(obj) {
    return new Vector2(obj.x, obj.y)
  }

  static Random(scale = 1) {
    return new Vector2(Math.random() * scale, Math.random() * scale)
  }

  static Clone(vector) {
    return new Vector2(vector.x, vector.y)
  }

  static Add(v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y)
  }

  static Sub(v1, v2) {
    return new Vector2(v1.x - v2.x, v1.y - v2.y)
  }

  /**
   * Calculate the distance between two vectors.
   *
   * @param v1
   * @param v2
   * @returns {number}
   */
  static Distance(v1, v2) {
    return Math.abs(Vector2.Sub(v1, v2).mag())
  }

  static Mult(v1, v2) {
    return new Vector2(v1.x * v2.x, v1.y * v2.y)
  }

  static Div(v1, v2) {
    return new Vector2(v1.x / v2.x, v1.y / v2.y)
  }

  static DivScalar(v, n) {
    if (n === 0) {
      console.warn("Vector2.DivScalar: division by zero")
      return Vector2.Zero()
    }
    return new Vector2(v.x / n, v.y / n)
  }

  static Scale(v, s) {
    return new Vector2(v.x * s, v.y * s)
  }

  /**
   * @param v1
   * @param v2
   * @returns {number}
   */
  static Dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y
  }

  /**
   * @param vecA
   * @param vecB
   * @returns {number}
   */
  static AngleBetween(vecA, vecB) {
    return Math.acos(vecA.dot(vecB) / (vecA.mag() * vecB.mag()))
  }

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  clone() {
    return new Vector2(this.x, this.y)
  }

  add(vector) {
    this.x += vector.x
    this.y += vector.y
    return this
  }

  sub(vector) {
    this.x -= vector.x
    this.y -= vector.y
    return this
  }

  scale(n) {
    this.x *= n
    this.y *= n
    return this
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y
  }

  mult(vector) {
    this.x *= vector.x
    this.y *= vector.y
    return this
  }

  div(vector) {
    this.x /= vector.x
    this.y /= vector.y
    return this
  }

  divScalar(n) {
    this.x /= n
    this.y /= n
    return this
  }

  normalize() {
    const mag = this.mag()
    const revMag = mag !== 0 ? 1 / mag : 1
    this.x *= revMag
    this.y *= revMag
    return this
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  magSquare() {
    return this.x * this.x + this.y * this.y
  }

  setMag(length) {
    this.normalize()
    this.scale(length)
    return this
  }

  limit(limit) {
    const mag = this.mag()
    if (mag > limit) {
      this.setMag(limit)
    }
    return this
  }

  toString() {
    return `{ x: ${this.x}, y: ${this.y} }`
  }

  parseToInt() {
    this.x = parseInt(this.x)
    this.y = parseInt(this.y)
    return this
  }

  toArray() {
    return [this.x, this.y]
  }

  toObject() {
    return { x: this.x, y: this.y }
  }

  equals(other) {
    return this.x === other.x && this.y === other.y
  }

  angle() {
    return Math.atan2(this.y, this.x)
  }

  rotateBy(angle) {
    this.setAngle(this.angle() + angle)
    return this
  }

  setAngle(angle) {
    const r = this.mag()
    this.x = r * Math.cos(angle)
    this.y = r * Math.sin(angle)
    return this
  }

  setTo(v) {
    this.x = v.x
    this.y = v.y
  }
}
