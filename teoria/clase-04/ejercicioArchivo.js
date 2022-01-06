const fs = require('fs');

try{
  const fecha = new Date();
  fs.writeFileSync('./files/fyh.txt',fecha.toString(), 'utf-8');
  console.log(`Lectura: ${fs.readFileSync('./files/fyh.txt', 'utf-8')}`);
}catch(err){
  console.error(err)
  throw new Error('Error en el archivo');
}