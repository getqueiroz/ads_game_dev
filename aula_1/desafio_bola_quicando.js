// Desafio: bola quicando com mudança de cor e atrito horizontal
// Sugestão: use duas componentes de velocidade (vx, vy) e amortecimento nas colisões.

let x = 100, y = 50;
let vx = 3, vy = 0;
let grav = 0.4;
let atritoChao = 0.98; // reduz a velocidade horizontal aos poucos
let kAmort = 0.85;     // amortecimento na colisão vertical
let cor;

function setup() {
  createCanvas(500, 300);
  noStroke();
  cor = color(0, 150, 255);
}

function draw() {
  background(245);

  fill(cor);
  circle(x, y, 40);

  // física básica
  vy += grav;
  x += vx;
  y += vy;

  // colisões horizontais
  if (x > width - 20) {
    x = width - 20;
    vx *= -1;
    cor = color(random(255), random(255), random(255)); // troca cor
  }
  if (x < 20) {
    x = 20;
    vx *= -1;
    cor = color(random(255), random(255), random(255));
  }

  // colisão com o chão
  if (y > height - 20) {
    y = height - 20;
    vy *= -kAmort;
    vx *= atritoChao; // atrito horizontal ao quicar
    cor = color(random(255), random(255), random(255));
  }

  // Experimente:
  // - Adicionar "vento" (força horizontal ao pressionar uma tecla).
  // - Várias bolas com cores diferentes.
}