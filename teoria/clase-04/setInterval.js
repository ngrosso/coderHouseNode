const mostrarLetras = (string, entero, callback) => {
  let index = 0;
  const finalizar = () => {
    callback();
    clearInterval(iteracion);
  }
  let iteracion = setInterval(() => {
    console.log(string.slice(index, index + 1));
    index++;
    index == string.length ? finalizar() : null;
  }, entero);
}

const fin = () => console.log("Termine");

mostrarLetras("hola", 0, fin);
mostrarLetras("quince", 250, ()=>{console.log("termine")});
mostrarLetras("minutos",500, fin)