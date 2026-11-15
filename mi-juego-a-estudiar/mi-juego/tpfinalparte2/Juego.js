
class Juego {

  constructor() {
    this.jugador = new Jugador();
    this.objetos = [];

    this.puntaje = 0;
    this.meta = 15;

    this.duracion = 60;
    this.tiempoInicio = 0;

    this.ultimoMaterial = 0;
    this.ultimoCelular = 0;
    this.ultimoBonus = 0;

    this.estado = "inicio";
    this.mensaje = "";
  }

  iniciar() {
    this.jugador = new Jugador();
    this.objetos = [];

    this.puntaje = 0;

    this.tiempoInicio = millis();

    this.ultimoMaterial = millis();
    this.ultimoCelular = millis();
    this.ultimoBonus = millis();

    this.estado = "jugando";
  }

  reiniciar() {
    this.iniciar();
  }

  tiempoRestante() {
    return max(
      0,
      this.duracion -
      (millis() - this.tiempoInicio) / 1000
    );
  }

  actualizar() {

    if (this.estado !== "jugando") return;

    this.jugador.actualizar();

    // Aparición de materiales
    if (millis() - this.ultimoMaterial > 700) {
      this.objetos.push(
        new Material(random(30, 770))
      );

      this.ultimoMaterial = millis();
    }

    // Aparición de celulares
    if (millis() - this.ultimoCelular > 1700) {
      this.objetos.push(
        new Distraccion(random(30, 770))
      );

      this.ultimoCelular = millis();
    }

    // Aparición del mate
    if (millis() - this.ultimoBonus > 4000) {
      this.objetos.push(
        new Bonus(random(30, 770))
      );

      this.ultimoBonus = millis();
    }

    // Actualización y colisiones
    for (let objeto of this.objetos) {

      objeto.actualizar();

      if (
        objeto.activo &&
        this.jugador.colision(objeto)
      ) {

        objeto.activo = false;

        if (objeto instanceof Material) {

          this.puntaje++;

          if (this.puntaje >= this.meta) {
            this.ganar();
          }

        } else if (objeto instanceof Distraccion) {

          this.perder(
            "¡Te distrajiste con el celular y no completaste tus tareas!"
          );

        } else if (objeto instanceof Bonus) {

          this.jugador.activarBonus();

        }
      }
    }

    this.objetos = this.objetos.filter(
      objeto => objeto.activo
    );

    // Control del tiempo
    if (
      this.estado === "jugando" &&
      this.tiempoRestante() <= 0
    ) {
      this.perder("¡Se terminó el tiempo!");
    }
  }

  ganar() {
    if (this.estado !== "jugando") return;

    this.estado = "ganaste";
    this.mensaje = "¡Completaste la tarea!";
  }

  perder(motivo) {
    if (this.estado !== "jugando") return;

    this.estado = "perdiste";
    this.mensaje = motivo;
  }

  mostrarFondo() {
    image(
      imagenes.fondo,
      400,
      200,
      800,
      400
    );
  }

  mostrarHUD() {

    noStroke();

    fill(45, 24, 55);
    rect(0, 0, 800, 45);

    fill(255);
    textSize(17);
    textAlign(LEFT, CENTER);

    text(
      "MATERIALES: " +
      this.puntaje + " / " + this.meta,
      18, 23
    );

    textAlign(RIGHT, CENTER);

    text(
      "TIEMPO: " +
      ceil(this.tiempoRestante()) + "s",
      780, 23
    );

    if (this.jugador.tieneBonus()) {

      fill(255, 220, 120);
      textAlign(CENTER);
      textSize(13);

      text(
        "BONUS DE MATE: ACTIVADO",
        400, 62
      );
    }
  }

  mostrarPanel(titulo, contenido, boton) {

    noStroke();

    fill(40, 25, 50, 225);
    rect(90, 55, 620, 290, 15);

    fill(255);
    textAlign(CENTER, CENTER);

    textSize(32);
    textStyle(BOLD);

    text(titulo, 400, 105);

    textStyle(NORMAL);
    textSize(14);
    textLeading(20);

    text(
      contenido,
      125,
      140,
      550,
      135
    );

    fill(235, 185, 105);
    rect(255, 285, 290, 42, 8);

    fill(45, 25, 55);
    textSize(15);
    textStyle(BOLD);

    text(boton, 400, 306);

    textStyle(NORMAL);
  }

  mostrarCreditos() {

    fill(255);
    textAlign(CENTER);
    textSize(11);

    text(
      "Créditos: Benjamin Fernandez Jesser y Diamela Molteni.",
      400,
      385
    );
  }

  mostrar() {

    this.mostrarFondo();

    // Pantalla de inicio
    if (this.estado === "inicio") {

      this.mostrarPanel(
        "¡A ESTUDIAR!",
        "Tenes que hacer tus trabajos de la facu, juntá 15 hojas y libros para lograrlo.\n" +
        "Evitá agarrar los celus: si agarras uno, perdés.\n" +
        "El mate es un bonus: aumenta tu velocidad durante 5 segundos.\n\n" +
        "Mové el cursor de izquierda a derecha.",
        "COMENZAR"
      );

      this.mostrarCreditos();

      return;
    }

    // Partida en curso
    if (this.estado === "jugando") {

      this.mostrarHUD();

      for (let objeto of this.objetos) {
        objeto.mostrar();
      }

      this.jugador.mostrar();

      return;
    }

    // Pantalla de victoria o derrota
    this.jugador.mostrar();

    if (this.estado === "ganaste") {

      this.mostrarPanel(
        "¡GANASTE!",
        this.mensaje +
        "\nMateriales: " +
        this.puntaje + " / " + this.meta,
        "VOLVER A JUGAR"
      );
    }

    if (this.estado === "perdiste") {

      this.mostrarPanel(
        "¡PERDISTE!",
        this.mensaje +
        "\nMateriales: " +
        this.puntaje + " / " + this.meta,
        "VOLVER A JUGAR"
      );
    }

    this.mostrarCreditos();
  }

  click(x, y) {

    if (this.estado === "inicio") {

      this.iniciar();

    } else if (
      this.estado === "ganaste" ||
      this.estado === "perdiste"
    ) {

      if (
        x > 200 && x < 600 &&
        y > 260 && y < 350
      ) {
        this.reiniciar();
      }
    }
  }

}
