
class Material extends Objeto {

  constructor(x) {
    super(x, -30, random(2.5, 4), 20);

    this.tipo = random(["hoja", "cuaderno"]);
  }

  mostrar() {

    if (this.tipo === "hoja") {

      image(
        imagenes.hoja,
        this.x,
        this.y,
        42,
        48
      );

    } else {

      image(
        imagenes.cuaderno,
        this.x,
        this.y,
        45,
        52
      );

    }
  }

}
