// Movimento básico com p5.js
// Objetivo: entender variáveis de posição e velocidade, além de colisão simples com as bordas.

let x = 50;   // posição horizontal
let vel = 2;  // velocidade (pixels por frame)

function setup() {
  createCanvas(400, 200); // largura x altura
}

function draw() {
  background(220);
  circle(x, 100, 40); // desenha a "bola"

  // atualiza posição
  x += vel;

  // verifica colisão com bordas (considerando o raio = 20)
  if (x > width - 20 || x < 20) {
    vel *= -1; // inverte direção
  }

  // Experimente:
  // 1) Aumente/diminua a velocidade.
  // 2) Troque o círculo por um quadrado (rect).
  // 3) Faça outro objeto se mover em outra direção.
}