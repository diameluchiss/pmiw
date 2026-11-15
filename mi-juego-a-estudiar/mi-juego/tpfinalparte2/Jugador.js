
class Jugador {

  constructor() {
    this.x = 400;
    this.y = 340;

    this.velocidadNormal = 7;
    this.velocidad = 7;

    this.finBonus = 0;
  }

  actualizar() {

    let destino = constrain(mouseX, 35, 765);

    this.x += constrain(
      destino - this.x,
      -this.velocidad,
      this.velocidad
    );

    if (millis() > this.finBonus) {
      this.velocidad = this.velocidadNormal;
    }
  }

  activarBonus() {
    this.velocidad = 14;
    this.finBonus = millis() + 5000;
  }

  tieneBonus() {
    return millis() < this.finBonus;
  }

  mostrar() {
    image(imagenes.jugador, this.x, this.y, 75, 85);
  }

  colision(objeto) {

    return dist(
      this.x, this.y,
      objeto.x, objeto.y
    ) < objeto.radio + 25;
  }

}
