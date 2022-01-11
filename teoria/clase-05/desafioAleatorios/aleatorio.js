let listaOcurrencias = {};

function generarAleatorio(min, max) {
  return parseInt(Math.random() * (max)) + min;
}

function generarConteoAleatorio(numInicial, numFinal, iteraciones) {
  let numAleatorio;
  for (let i = 0; i < iteraciones; i++) {
    numAleatorio = generarAleatorio(numInicial, numFinal);
    if (listaOcurrencias[numAleatorio]) {
      listaOcurrencias[numAleatorio]++;
    } else {
      listaOcurrencias[numAleatorio] = 1;
    }
  }
  return listaOcurrencias;
}

module.exports = generarConteoAleatorio;