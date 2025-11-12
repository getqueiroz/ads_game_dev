let dino = { x: 80, y: 0, vy: 0, w: 32, h: 36, onGround: true };
let grav = 0.9;
let chaoY;
let vel = 6, accel = 0.002;
let obs = [];
let score = 0, hi = 0;
let jogando = false, morto = false;

function setup() {
  createCanvas(800, 300);
  chaoY = height - 40;
  resetJogo();
}

function resetJogo() {
  dino.y = chaoY - dino.h;
  dino.vy = 0;
  dino.onGround = true;
  vel = 6;
  obs = [];
  score = 0;
  morto = false;
  jogando = false;
}

function draw() {
  background(245);
  desenhaChao();
  desenhaNuvens();

  if (jogando && !morto) {
    dino.vy += grav;
    dino.y += dino.vy;
    if (dino.y >= chaoY - dino.h) {
      dino.y = chaoY - dino.h;
      dino.vy = 0;
      dino.onGround = true;
    }
    
    geraObstaculos();
    atualizaObstaculos();

    for (let o of obs) {
      if (colide(dino, o)) morto = true;
    }

    score += 1;
    vel += accel;
  }

  desenhaDino();
  desenhaObstaculos();

  fill(60);
  textSize(18);
  textAlign(LEFT, TOP);
  text('Score: ' + score, 10, 10);
  textAlign(RIGHT, TOP);
  text('HI: ' + hi, width - 10, 10);

  if (!jogando) msg('Pressione espaço para jogar');
  if (morto) {
    hi = max(hi, score);
    msg('Game Over – R para reiniciar');
  }
}

function keyPressed() {
  if (key === ' ') {
    if (!jogando) jogando = true;
    else pular();
  } else if (key === 'r' || key === 'R') {
    resetJogo();
  }
}

function pular() {
  if (dino.onGround) {
    dino.vy = -15; // impulso de pulo
    dino.onGround = false;
  }
}

function colide(a, b) {
  return a.x < b.x + b.w &&
         a.x + a.w > b.x &&
         a.y < b.y + b.h &&
         a.y + a.h > b.y;
}

function geraObstaculos() {
  if (obs.length === 0 || (obs[obs.length-1].x < width - random(220, 420))) {
    let w = random([20, 30, 40]);
    let h = random([30, 45, 60]);
    obs.push({ x: width + 10, y: chaoY - h, w, h });
  }
}

function atualizaObstaculos() {
  for (let o of obs) o.x -= vel;
  obs = obs.filter(o => o.x + o.w > -20);
}

function desenhaDino() {
  noStroke();
  fill(50);
  rect(dino.x, dino.y, dino.w, dino.h, 4);
}

function desenhaObstaculos() {
  noStroke();
  fill(30, 160, 30);
  for (let o of obs) rect(o.x, o.y, o.w, o.h, 4);
}

function desenhaChao() {
  stroke(120); line(0, chaoY, width, chaoY);
}

function msg(t) {
  noStroke();
  fill(0, 180);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(t, width/2, height/2 - 40);
}