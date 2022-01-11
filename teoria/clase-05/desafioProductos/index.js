let _ = require('lodash');

const productos = [
  { id: 1, nombre: 'Camisa', precio: 5000.99 },
  { id: 2, nombre: 'Gorra', precio: 530.99 },
  { id: 3, nombre: 'Pantalon', precio: 2500.99 },
  { id: 4, nombre: 'Zapatos', precio: 3200.93 },
  { id: 5, nombre: 'Bolsa', precio: 550.69 },
  { id: 6, nombre: 'Celular', precio: 20400.43 },
  { id: 7, nombre: 'Tablet', precio: 10210.99 },
]

function obtenerNombre(listaProductos) {
  let nombres = '';
  for (const producto of listaProductos) {
    nombres += producto.nombre + ', ';
  }
  return nombres;
}

function calcularPrecioTotal(listaProductos) {
  let precioTotal = 0;
  for (const producto of listaProductos) {
    precioTotal += producto.precio;
  }
  return parseFloat(precioTotal.toFixed(2));
}

function calcularPrecioPromedio(listaProductos) {
  let precioPromedio = calcularPrecioTotal(listaProductos) / listaProductos.length;
  return parseFloat(precioPromedio.toFixed(2));
}

function obtenerMenor(listaProductos) {
  let listaOrdenada = _.orderBy(listaProductos, ['precio'], ['asc']);
  return listaOrdenada[0];
}

function obtenerMayor(listaProductos) {
  let listaOrdenada = _.orderBy(listaProductos, ['precio'], ['desc']);
  return listaOrdenada[0];
}

console.log(obtenerNombre(productos));
console.log(calcularPrecioTotal(productos));
console.log(calcularPrecioPromedio(productos));
console.log(obtenerMenor(productos));
console.log(obtenerMayor(productos));