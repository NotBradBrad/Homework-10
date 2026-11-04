
let cloudX1 = 150;
let cloudX2 = 700;
let birdX = 450;
let birdY = 180;

function setup() {
  createCanvas(900, 600);
  frameRate(60);
}

function draw() {
  background(133, 209, 220);
  noStroke();

  // Sun
  fill(255, 209, 65);
  ellipse(570, 250, 185, 185);

  fill(255, 226, 135);
  ellipse(570, 240, 168, 168);

  // Mountains
  mountain(65, 85, 260, 530, '#37464d', '#e6f6fa');
  mountain(225, 145, 230, 505, '#455b65', '#e7f5fa');
  mountain(320, 235, 230, 505, '#617d89', '#e8f7fb');
  mountain(425, 265, 190, 500, '#3e535c', '#e8f7fb');
  mountain(540, 300, 145, 490, '#688692', '#e8f7fb');
  mountain(740, 200, 270, 520, '#455b65', '#e8f7fb');
  mountain(830, 225, 190, 490, '#79939e', '#e8f7fb');

  // Ground behind trees
  fill(77, 133, 65);
  beginShape();
  vertex(0, 455);
  vertex(180, 510);
  vertex(480, 485);
  vertex(900, 330);
  vertex(900, 600);
  vertex(0, 600);
  endShape(CLOSE);

  // Pine forest
  pineTree(55, 555, 55, '#285b36');
  pineTree(90, 535, 42, '#397b42');
  pineTree(120, 545, 50, '#326b3b');
  pineTree(155, 530, 48, '#285b36');
  pineTree(190, 520, 62, '#397b42');
  pineTree(225, 525, 45, '#285b36');
  pineTree(260, 515, 55, '#326b3b');
  pineTree(295, 510, 47, '#397b42');
  pineTree(330, 500, 58, '#285b36');
  pineTree(365, 490, 65, '#326b3b');
  pineTree(405, 485, 78, '#234d30');
  pineTree(445, 475, 60, '#397b42');

  // Green hillside
  fill(120, 181, 66);
  beginShape();
  vertex(0, 575);
  vertex(150, 540);
  vertex(320, 500);
  vertex(500, 445);
  vertex(700, 390);
  vertex(900, 330);
  vertex(900, 600);
  vertex(0, 600);
  endShape(CLOSE);

  // Light green foreground
  fill(148, 200, 75);
  beginShape();
  vertex(0, 600);
  vertex(160, 560);
  vertex(350, 510);
  vertex(540, 465);
  vertex(720, 420);
  vertex(900, 365);
  vertex(900, 600);
  endShape(CLOSE);

  // Stationary clouds
  cloud(315, 215, 0.55);
  cloud(840, 195, 0.7);

  // First moving cloud
  cloud(cloudX1, 125, 0.85);
  cloudX1 += 2;

  if (cloudX1 > width + 100) {
    cloudX1 = -100;
  }

  // Second moving cloud
  cloud(cloudX2, 290, 0.65);
  cloudX2 -= 1.5;

  if (cloudX2 < -100) {
    cloudX2 = width + 100;
  }

  // Bird follows mouse or flies automatically
  if (
    mouseX >= 0 && mouseX <= width &&
    mouseY >= 0 && mouseY <= height
  ) {
    birdX = lerp(birdX, mouseX, 0.12);
    birdY = lerp(birdY, mouseY, 0.12);
  } else {
    birdX = 450 + sin(frameCount * 0.025) * 180;
    birdY = 160 + cos(frameCount * 0.04) * 45;
  }

  bird(birdX, birdY);
}

// Mountains
function mountain(x, y, w, bottom, rock, snow) {
  let h = bottom - y;

  fill(rock);
  triangle(x, y, x - w / 2, bottom, x + w / 2, bottom);

  // Shaded rock
  fill(0, 0, 0, 35);
  beginShape();
  vertex(x, y);
  vertex(x + w * 0.12, y + h * 0.42);
  vertex(x + w * 0.28, y + h * 0.7);
  vertex(x + w * 0.08, bottom);
  vertex(x + w / 2, bottom);
  endShape(CLOSE);

  // Jagged snow
  fill(snow);
  beginShape();
  vertex(x, y);
  vertex(x - w * 0.25, y + h * 0.38);
  vertex(x - w * 0.17, y + h * 0.34);
  vertex(x - w * 0.11, y + h * 0.43);
  vertex(x - w * 0.05, y + h * 0.35);
  vertex(x + w * 0.04, y + h * 0.46);
  vertex(x + w * 0.13, y + h * 0.35);
  vertex(x + w * 0.25, y + h * 0.4);
  endShape(CLOSE);
}

// Pine trees
function pineTree(x, bottom, size, treeColor) {
  fill(77, 65, 42);
  rect(x - 3, bottom - 15, 6, 15);

  fill(treeColor);

  triangle(
    x, bottom - size * 1.7,
    x - size * 0.32, bottom - size * 0.85,
    x + size * 0.32, bottom - size * 0.85
  );

  triangle(
    x, bottom - size * 1.4,
    x - size * 0.5, bottom - size * 0.5,
    x + size * 0.5, bottom - size * 0.5
  );

  triangle(
    x, bottom - size,
    x - size * 0.65, bottom - 8,
    x + size * 0.65, bottom - 8
  );
}

// Clouds
function cloud(x, y, s) {
  push();
  translate(x, y);
  scale(s);

  fill(255, 253, 244);
  ellipse(-40, 10, 65, 35);
  ellipse(-10, -5, 75, 55);
  ellipse(35, 8, 65, 35);
  rect(-55, 10, 110, 15);

  pop();
}

// Bird with gentle wing movement
function bird(x, y) {
  push();
  translate(x, y);
  noStroke();

  // Slow wing movement
  let flap = sin(frameCount * 0.055) * 7;

  // Tail
  fill(42, 70, 105);
  triangle(-24, 5, -48, -8, -37, 12);
  triangle(-24, 5, -48, 13, -34, 20);

  // Back wing
  fill(39, 68, 110);
  ellipse(-12, -11 - flap, 30, 18);

  // Body
  fill(55, 91, 135);
  ellipse(0, 0, 58, 32);

  // Front wing
  fill(76, 119, 168);
  ellipse(-5, -8 - flap, 32, 17);

  // Head
  fill(55, 91, 135);
  ellipse(24, -9, 29, 29);

  // Eye
  fill(255);
  circle(31, -13, 8);

  fill(20);
  circle(33, -13, 4);

  // Beak
  fill(245, 165, 55);
  triangle(36, -7, 53, -2, 36, 1);

  pop();
}
