const moment = require('moment');

function calcularEdad(fechaNacimiento) {
  return(moment().diff(moment(fechaNacimiento, "DD-MM-YYYY"), 'years'));
}

function calcularEdadEnDias(fechaNacimiento) {
  return(moment().diff(moment(fechaNacimiento, "DD-MM-YYYY"), 'days'));
}

const fecha = '07-10-1993';

console.log(`La fecha de nacimiento ingresada es: ${fecha}`);
console.log(`La fecha de hoy es: ${moment().format('DD-MM-YYYY')}`);
console.log(`La edad en años es: ${calcularEdad(fecha)} años`);
console.log(`La edad en dias es: ${calcularEdadEnDias(fecha)} dias`);