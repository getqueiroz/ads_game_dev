// Simulação de gravidade e amortecimento
// Objetivo: aplicar aceleração (gravidade) para alterar a velocidade ao longo do tempo.

let y = 50;      // posição vertical
let vel = 0;     // velocidade vertical
let grav = 0.35; // aceleração "gravidade"
let atrito = 0.8;// amortecimento na colisão

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(240);
  circle(200, y, 40);

  // integra aceleração -> velocidade, e velocidade -> posição
  vel += grav;
  y += vel;

  // colisão com o "chão" e amortecimento
  if (y > height - 20) {
    y = height - 20;
    vel *= -atrito; // inverte e reduz a velocidade
  }

  // Experimente:
  // - Troque o valor de gravidade e atrito.
  // - Adicione um "teto" que também cause colisão.
  // - Faça a gravidade mudar quando uma tecla for pressionada.
}