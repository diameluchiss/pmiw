
function botones() {

  // boton comenzar en el inicio
  if (inicio === 38) {
    dibujarBoton(350, 380, 100, 40, "COMENZAR");
  }
}
function mousePressed() {
  // bonon "comenzar"
  if (inicio === 38) {
    if (detectarClick(350, 380, 100, 40)) {
      inicio = 0;
    }
  }
}
function dibujarBoton(x, y, ancho, alto, textoBoton) {
  fill(255);
  rect(x, y, ancho, alto);

  fill(0);
  textAlign(CENTER, CENTER);
  text(textoBoton, x + ancho / 2, y + alto / 2);
}
function detectarClick(x, y, ancho, alto) {
  return mouseX > x && mouseX < x + ancho &&
         mouseY > y && mouseY < y + alto;
}
function botones(pagina) {
  // los dos botones de 01 aparecen 2 segundos despues del globo
  if (pagina === 0 && millis() - tiempoInicio > 5000) {
    dibujarBoton(100, 400, 250, 40, "Levantarte");
    dibujarBoton(450, 400, 250, 40, "Dormir un rato más");
  }
  // boton de pantalla 04
 if (inicio === 4 && millis() - tiempoInicio > 1000){
    dibujarBoton(450, 400, 250, 40, "Siguiente");
  }
}
