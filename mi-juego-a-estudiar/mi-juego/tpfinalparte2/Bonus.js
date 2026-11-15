
class Bonus extends Objeto {

  constructor(x) {
    super(x, -30, 3, 22);
  }

  mostrar() {

    image(
      imagenes.mate,
      this.x,
      this.y,
      48,
      50
    );

  }

}
