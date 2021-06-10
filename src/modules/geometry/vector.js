class Vector {
  constructor(cx = 0, cy = 0, x = 0, y = 0) {
    this.cx = cx;
    this.cy = cy;
    this.x = x - cx;
    this.y = y - cy;
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  static dot(b) {
    return this.x * b.x + this.y * b.y;
  }

  get cos_theta() {
    return this.x / this.length;
  }

  get sin_theta() {
    return this.y / this.length;
  }
}

export default Vector;
