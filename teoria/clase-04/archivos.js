const fs = require('fs');

//readFileSync
//writeFileSync
//appendFileSync
//unlinkSync
//mkdirSync

const data = fs.readFileSync('./files/archivo1.txt', 'utf-8');
console.log(data);

fs.writeFileSync('./files/archivo2.txt', `${data} editado`);
fs.writeFileSync('./files/archivo2.txt', `Editado: ${Date.toString()}`);
console.log(fs.readFileSync('./files/archivo2.txt', 'utf-8'));