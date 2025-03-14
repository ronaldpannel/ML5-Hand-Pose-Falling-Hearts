class Heart {
  constructor(pts) {
    this.position = [];
    for (let i = 0; i < pts.length; i++) {
      this.position[i] = createVector(pts[i].x, pts[i].y);
    }
    this.vel = createVector(0, 0);
    this.acc = createVector(0, random(0.05, 0.2));
    this.done = false
  }
  update() {
    this.vel.add(this.acc);
    for (let i = 0; i < this.position.length; i++) {
      this.position[i].add(this.vel);
    }
    if(this.position[0].y > height + 50) {
      this.done = true;
    }
  }
  display() {
    noStroke();
    // stroke(0);
    fill(255, 0, 0);
    beginShape();
    for (let i = 0; i < this.position.length; i++) {
      if (this.position[i]) {
        vertex(this.position[i].x, this.position[i].y);
      }
      endShape(CLOSE);
    }
  }
}
