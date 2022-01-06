class Usuario {
  constructor(nombre, apellido, libros, mascotas){
    this.nombre = nombre || '';
    this.apellido = apellido || '';
    this.libros = libros || [];
    this.mascotas = mascotas || [];
  }

  getFullName(){
    return `${this.nombre} ${this.apellido}`
  }

  addMascota(mascota){
    this.mascotas.push(mascota);
  }

  countMascotas(){
    return this.mascotas.length;
  }

  addBook(nombre, autor){
    this.libros.push({nombre, autor});
  }

  getBookNames(){
    return this.libros.map(book => book.nombre);
  }
}

let libros1 = [{nombre: 'El señor de los anillos', autor: 'J.R.R. Tolkien'}, {nombre: 'El señor de los anillos 2', autor: 'J.R.R. Tolkien'}];
let libros2 = [{nombre: '100 Recetas dulces', autor: 'Hermana Bernarda'}];
let usuario1 = new Usuario("Nicolas", "Grosso", libros1, []);
let usuario2 = new Usuario("Romina","Gonzalez",libros2,["Iuiu"]);

console.log(usuario1);
console.log(usuario2);

console.log(`Nombre: ${usuario1.getFullName()}`);
usuario1.addBook('Clean Code', 'Robert C. Martin');
console.log(`Nombres libros: ${usuario1.getBookNames()}`)
console.log(`Cantidad de mascotas: ${usuario1.countMascotas()}`)

console.log(`Nombre: ${usuario2.getFullName()}`);
console.log(`Nombres libros: ${usuario2.getBookNames()}`);
console.log(`Cantidad de mascotas: ${usuario2.countMascotas()}`);
usuario2.addMascota("King");
console.log(`Cantidad de mascotas: ${usuario2.countMascotas()}`);
