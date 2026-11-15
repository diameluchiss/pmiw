// Bnejamin fernandez jesser, Diamela molteni, comision 3
// Link del video: https://www.youtube.com/watch?v=DcRNeCiprwg
let juego;

let imagenes = {};

function preload() {

  imagenes.jugador = loadImage("assets/imagenes/jugador.png");
  imagenes.hoja = loadImage("assets/imagenes/tarea.png");
  imagenes.cuaderno = loadImage("assets/imagenes/libros.png");
  imagenes.celular = loadImage("assets/imagenes/celular.png");
  imagenes.mate = loadImage("assets/imagenes/mate.png");
  imagenes.fondo = loadImage("assets/imagenes/fondo.png");

}

function setup() {

  createCanvas(800, 400);

  imageMode(CENTER);

  juego = new Juego();

}

function draw() {

  juego.actualizar();

  juego.mostrar();

}

function mousePressed() {

  juego.click(mouseX, mouseY);

}

function keyPressed() {

  if (key === "r" || key === "R") {
    juego.reiniciar();
  }

}
