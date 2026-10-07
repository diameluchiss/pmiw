//Un día en la vida de un estudiante facultativo.
//Diamela Molteni y Benjamin Fernandez Jesser - Comisión 3

let imagenes = [];
let cantidad = 41;
let inicio = 37;
let tipografia;
let alarma;

let tiempoInicio;

function preload() {
  for (let i = 0; i < cantidad; i++) {
    let numero = nf(i, 2);
    imagenes[i] = loadImage("data/img" + numero + ".png");
  }
  alarma = loadSound("data/alarma.mp3");
  tipografia = loadFont("data/determination.ttf");
}

function setup() {
  createCanvas(800, 450);
  textAlign(CENTER, CENTER);
  textFont(tipografia);
}

function draw() {
  image(imagenes[inicio], 0, 0, width, height);
  // boton para empezar
  if (inicio === 37) {
    fill(255);
    rect(350, 380, 100, 40);
    fill(0);
    textSize(15);
    text("COMENZAR", 400, 400);
  }
  // globo de texto de 01
  if (inicio === 0) {
    // aparece dps de 3 segs
    if (millis() - tiempoInicio > 3000) {
      fill(0, 191);
      rect(40, 330, 720, 90);
      fill(255);
      textSize(20);
      textAlign(LEFT, CENTER);
      text("Jueves, 6 de la mañana. Suena tu alarma, tenés facultad, ¿qué haces?", 60, 375);
    }
  }
  // botones de pantalla 01
  botones(inicio);
  // globo de texto de 02
  if (inicio === 4) {
    // aparece dps de 1 segs
    if (millis() - tiempoInicio > 1000) {
      fill(0, 191);
      rect(40, 330, 720, 90);
      fill(255);
      textSize(20);
      textAlign(LEFT, CENTER);
      text("Se te hizo tarde! No llegas a desayunar y tenés que pedirte un uber.", 60, 375);
    }
  }
  botones(inicio);
}
function mousePressed() {
  // comienzo
  if (inicio === 37) {
    // clickean el boton
    if (mouseX > 350 && mouseX < 450 &&
        mouseY > 380 && mouseY < 420) {
      // pasar a pant 01
      inicio = 0;
      // empezar a contar el tiempo
      tiempoInicio = millis();
      // suena la alarma
      alarma.play();
    }
  }
  // botones pantalla 01
  if (inicio === 0 && millis() - tiempoInicio > 5000) {
    // boton: levantarse
    if (mouseX > 100 && mouseX < 350 &&
        mouseY > 400 && mouseY < 440) {
      alarma.stop();
      inicio = 1;
    }
    // boton: seguir durmiendo
    if (mouseX > 450 && mouseX < 700 &&
        mouseY > 400 && mouseY < 440) {
      alarma.stop();
      inicio = 4;
      // empezar a contar el tiempo de pantalla 02
      tiempoInicio = millis();
    }
  }
  // boton de pantalla 04
  if (inicio === 4 && millis() - tiempoInicio > 3000) {
    if (mouseX > 450 && mouseX < 700 &&
        mouseY > 400 && mouseY < 440) {
      inicio = 5;
      tiempoInicio = millis();
    }
  }
}
function dibujarBoton(x, y, ancho, alto, textoBoton) {
  fill(255);
  rect(x, y, ancho, alto);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(15);

  text(textoBoton, x + ancho / 2, y + alto / 2);
}
