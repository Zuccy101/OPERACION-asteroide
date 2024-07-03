let particles = [];
let width = 800;
let height = 600;

let originX = 400;
let originY = 50;

let prtclTimer = 0;
let prtclRate = 60;
let prtclSize = 0.05;
let prtclSizeAdd = 0.00075;
let prtclSpeedMult = 1.01;

function drawParticles() {
  if (!pausegame) {
    prtclTimer += deltaTime;
  }
  
  if (prtclTimer >= prtclRate) {
    prtclTimer = 0;
    let prtcl = new Particle();
    particles.push(prtcl);
  }
  
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].y2 < height * 1.5 && 
      particles[i].y2 > 0 - (height * 0.5) && 
      particles[i].x2 < width * 1.5 && 
      particles[i].x2 > 0 - (width * 0.5)) {
      if (!pausegame) {
        particles[i].move();
      }
      particles[i].display();
    } else {
      particles.splice(i, 1)
    }
  }
}

class Particle {
  constructor() {
    this.x1 = originX;
    this.y1 = originY;
    this.x2 = originX;
    this.y2 = originY;
    this.angle = random(TWO_PI);
    this.speed = 0.0075;
    this.length = random(0.7, 0.9);
    this.size = prtclSize;
  }
  display() {
    strokeWeight(this.size);
    stroke(255);
    line(this.x1, this.y1, this.x2, this.y2);
    noStroke()
  }
  move() {
    this.size += prtclSizeAdd;
    this.speed *= prtclSpeedMult;
    this.x1 += cos(this.angle) * this.speed;
    this.y1 += sin(this.angle) * this.speed;
    this.x2 += cos(this.angle) * this.speed * this.length;
    this.y2 += sin(this.angle) * this.speed * this.length;
  }
}
