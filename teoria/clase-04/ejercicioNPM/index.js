const fs = require('fs');

fs.readFile('./package.json', 'utf-8',(err,contenido) => {
  if (err) {
    console.error(err);
    throw new Error('Error en el archivo');
  }else{
    const info = {
      contenidoStr: JSON.stringify(contenido),
      contenidoObj: JSON.parse(contenido),
      size: `${fs.statSync('./package.json').size} bytes`
    }
    console.log(info);
    fs.writeFile('./info.txt', JSON.stringify(info,null,2), (err) => {
      if (err) {
        console.error(err);
        throw new Error('Error en el archivo');
      }
    });
  }
});