
class Sonidos {

  tono(frecuencia, duracion, forma) {

    userStartAudio();

    let sonido = new p5.Oscillator(forma);

    sonido.freq(frecuencia);
    sonido.amp(0.12, 0.02);
    sonido.start();

    sonido.amp(0, duracion);

    setTimeout(() => {
      sonido.stop();
      sonido.dispose();
    }, duracion * 1000 + 100);
  }

  material() {
    this.tono(620, 0.15, "triangle");
  }

  celular() {
    this.tono(130, 0.4, "sawtooth");
  }

  bonus() {
    this.tono(880, 0.25, "sine");
  }

  victoria() {
    this.tono(740, 0.5, "triangle");
  }

  derrota() {
    this.tono(170, 0.6, "sawtooth");
  }

}
