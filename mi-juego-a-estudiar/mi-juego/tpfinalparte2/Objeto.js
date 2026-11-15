
class Objeto {

  constructor(x, y, velocidad, radio) {
    this.x = x;
    this.y = y;
    this.velocidad = velocidad;
    this.radio = radio;
    this.activo = true;
  }

  actualizar() {
    this.y += this.velocidad;

    if (this.y > height + 50) {
      this.activo = false;
    }
  }

  mostrar() {
  }

}
