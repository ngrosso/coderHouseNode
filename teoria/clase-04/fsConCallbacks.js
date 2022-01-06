const fs = require('fs');

//readFile
//writeFile
//appendFile
const fecha = new Date().getTime();
fs.writeFile('./files/archivoFsCb.txt', 'Texto de prueba! '+fecha, (err) => {
  if (err) {
    console.error(err);
    throw new Error('Error en el archivo');
  }
  console.log("Guardado! "+fecha);
});

fs.readFile('./files/archivoFsCb.txt', (err, data) => {
  if (err) {
    console.error(err);
    throw new Error('Error en el archivo');
  }
  console.log(data.toString());
});