let sally = []; 
let fondo; 
let sallylogo; 
let x = -100; 
let direccion = 1; 
let sallyQuieto = []; 
let caminando = true; 
let tiempoQuieto = 0; 
let objetivo = 150; 
 
function preload() { 
  // frames sally caminando
  for (let i = 0; i < 7; i++) {
    sally[i] = loadImage("data/sally" + (i + 1) + ".png");
  }
  //frames sally quieto
  sallyQuieto[0] = loadImage("data/sallyquieto.png");
  for (let i = 1; i < 8; i++) {
    sallyQuieto[i] = loadImage("data/sallyquieto" + (i + 1) + ".png");
  }
  fondo = loadImage("data/fondo.png"); 
  sallylogo = loadImage("data/sallyface2.png"); 
}
function setup() { 
  createCanvas(800, 600); 
} 
 
function draw() { 
  dibujarFondo(); 
  image(sallylogo, 350, -50, 500, 500);

// animacion de sally caminando (animacion 1) 
  if (caminando) { 
    // animacion de caminar 
    let indice = obtenerIndice(); 
    // movimiento 
    x += direccion * 4; 
    // llega al medio 
    if (direccion == 1 && x >= objetivo) { 
      x = objetivo;
      // si llega al medio se queda quieto 
      if (objetivo == 150) { 
        caminando = false; 
        tiempoQuieto = millis(); 
      } 
     
      // si llega al lado derecho vuelve al centro 
      else if (objetivo == 400) { 
        direccion = -1; 
        objetivo = 150; 
      } 
    }
    if (direccion == -1 && x <= objetivo) { 
      x = objetivo; 
      // si llega al centro se queda quieto 
      if (objetivo == 150) { 
        caminando = false; 
        tiempoQuieto = millis(); 
      } 
      // si llega al lado izquierdo vuelve al centro 
      else if (objetivo == -100) { 
        direccion = 1; 
        objetivo = 150; 
      } 
    } 
    // sally caminando 
    push(); 
    if (direccion == 1) { 
      // mira para la derecha 
      translate(x + 500, 67); 
      scale(-1, 1); 
      image(sally[indice], 0, 0, 500, 500); 
    } 
    else { 
      // mira para la izquierda 
      image(sally[indice], x, 67, 500, 500); 
    } 
    pop(); 
  } 
  // else para que sally este quieto en el centro 4 segs y mueva la cabeza (animacion 2) 
  else { 
    // sally mueve la cabeza 
    let indiceQuieto = int((millis() - tiempoQuieto) / 100) % 8; 
    push(); 
    if (direccion == 1) { 
      // mira para la derecha 
      translate(x + 500, 67); 
      scale(-1, 1); 
      image(sallyQuieto[indiceQuieto], 0, 0, 500, 500); 
    } 
    else { 
      // mira para la izquierda 
      image(sallyQuieto[indiceQuieto], x, 67, 500, 500); 
    } 
    pop(); 
    // se queda quieto 4 segundos moviendo la cabeza 
    if (millis() - tiempoQuieto >= 4000) { 
      caminando = true; 
      // si estaba yendo a la derecha despues del centro va para la derecha 
      if (direccion == 1) { 
        objetivo = 400; 
      } 
      // si estaba yendo a la izquierda despues del centro va para la izquierda 
      else { 
        objetivo = -100; 
      } 
    } 
  } 
}

function dibujarFondo() {
  image(fondo, 0, 0, 800, 600);
}

function obtenerIndice() {
  return int(frameCount / 8) % 7;
}
