
class Distraccion extends Objeto {

  constructor(x) {
    super(x, -30, random(3, 4.5), 20);
  }

  mostrar() {

    image(
      imagenes.celular,
      this.x,
      this.y,
      38,
      55
    );

  }

}
