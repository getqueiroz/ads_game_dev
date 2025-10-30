let bola, p1, p2;
let score1 = 0, score2 = 0;
let jogando = false; // estado: false mostra tela de início/pausa
let centerLineGap = 12; // espaçamento da linha central
let baseSpeed = 5;
let speedGain = 1.04; // aceleração leve por rebatida
let maxVy = 9;

function setup() {
  createCanvas(800, 480);
  resetGame();
}

function resetGame() {
  p1 = { x: 40, y: height/2 - 50, w: 16, h: 100, speed: 7 };
  p2 = { x: width - 56, y: height/2 - 50, w: 16, h: 100, speed: 7 };
  resetBall(true);
}

function resetBall(centerKick = false) {
  let dirX = random([ -1, 1 ]);
  let dirY = random([ -1, 1 ]);
  let vx0 = baseSpeed * dirX;
  let vy0 = random(2.2, 3.6) * dirY; // evita ficar muito horizontal
  bola = { x: width/2, y: height/2, d: 18, vx: vx0, vy: vy0 };
  if (centerKick) jogando = false; // inicia pausado para dar tempo
}

function draw() {
  background(0);
  drawCenterLine();

  // entrada do usuário
  handleInput();

  // atualizar estado se jogando
  if (jogando) {
    updateBall();
    clampPaddles();
  }

  // desenhar objetos
  drawPaddles();
  drawBall();
  drawScore();

  // mensagens
  if (!jogando) drawOverlay();
}

function handleInput() {
  // jogador 1 (W/S)
  if (keyIsDown(87)) p1.y -= p1.speed;
  if (keyIsDown(83)) p1.y += p1.speed;

  // jogador 2 (↑/↓)
  if (keyIsDown(UP_ARROW)) p2.y -= p2.speed;
  if (keyIsDown(DOWN_ARROW)) p2.y += p2.speed;
}

function updateBall() {
  bola.x += bola.vx;
  bola.y += bola.vy;

  // colisão com teto e chão
  if (bola.y - bola.d/2 < 0) {
    bola.y = bola.d/2;
    bola.vy *= -1;
  }
  if (bola.y + bola.d/2 > height) {
    bola.y = height - bola.d/2;
    bola.vy *= -1;
  }

  // colisão com raquete esquerda
  if (bola.x - bola.d/2 < p1.x + p1.w &&
      bola.y > p1.y && bola.y < p1.y + p1.h) {
    bola.x = p1.x + p1.w + bola.d/2;
    bola.vx = abs(bola.vx) * 1; // garante direção para a direita
    angleBounce(p1);
    speedUp();
  }

  // colisão com raquete direita
  if (bola.x + bola.d/2 > p2.x &&
      bola.y > p2.y && bola.y < p2.y + p2.h) {
    bola.x = p2.x - bola.d/2;
    bola.vx = -abs(bola.vx); // garante direção para a esquerda
    angleBounce(p2);
    speedUp();
  }

  // ponto
  if (bola.x + bola.d/2 < 0) {
    score2++;
    resetBall(true);
  } else if (bola.x - bola.d/2 > width) {
    score1++;
    resetBall(true);
  }
}

function angleBounce(paddle) {
  // calcula a distância vertical relativa do centro da bola ao centro da raquete
  let paddleCenter = paddle.y + paddle.h/2;
  let dist = (bola.y - paddleCenter) / (paddle.h/2); // -1..1
  // dist controla o ângulo: maior |dist| => maior componente vertical
  let totalSpeed = sqrt(bola.vx*bola.vx + bola.vy*bola.vy);
  let angle = dist * radians(50); // máximo de ~50 graus
  let dir = (bola.vx > 0) ? 1 : -1;
  bola.vx = totalSpeed * cos(angle) * dir;
  bola.vy = totalSpeed * sin(angle);
  bola.vy = constrain(bola.vy, -maxVy, maxVy);
}

function speedUp() {
  bola.vx *= speedGain;
  bola.vy *= speedGain;
  // limita velocidade extrema para manter jogável
  bola.vx = constrain(bola.vx, -12, 12);
  bola.vy = constrain(bola.vy, -12, 12);
}

function clampPaddles() {
  p1.y = constrain(p1.y, 0, height - p1.h);
  p2.y = constrain(p2.y, 0, height - p2.h);
}

function drawPaddles() {
  noStroke();
  fill(255);
  rect(p1.x, p1.y, p1.w, p1.h, 3);
  rect(p2.x, p2.y, p2.w, p2.h, 3);
}

function drawBall() {
  noStroke();
  fill(255);
  circle(bola.x, bola.y, bola.d);
}

function drawScore() {
  textAlign(CENTER, TOP);
  textSize(36);
  fill(255);
  text(score1, width * 0.25, 20);
  text(score2, width * 0.75, 20);
}

function drawCenterLine() {
  stroke(255);
  strokeWeight(3);
  for (let y=0; y<height; y+=centerLineGap) {
    line(width/2, y, width/2, y + centerLineGap/2);
  }
}

function drawOverlay() {
  noStroke();
  fill(255, 220);
  textAlign(CENTER, CENTER);
  textSize(24);
  text('Espaço para jogar/pausar • R para reiniciar', width/2, height/2 + 40);
  textSize(28);
  text('Pong', width/2, height/2 - 10);
}

function keyPressed() {
  if (key === ' ') {
    jogando = !jogando;
  } else if (key === 'r' || key === 'R') {
    score1 = 0; score2 = 0;
    resetGame();
  }
}
