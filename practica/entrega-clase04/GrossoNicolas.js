const fs = require('fs');

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }

  save(object) {
    try {
      let data = fs.readFileSync(`./files/${this.nombre}.txt`, 'utf-8');
      data = JSON.parse(data);
      let id = this.generateId();
      while (data.find(obj => obj.id === id)) {
        id = this.generateId();
      }
      object['id'] = id;
      data.push(object);
      fs.writeFileSync(`./files/${this.nombre}.txt`, JSON.stringify(data));
      return id;
    } catch (err) {
      if (err.code === 'ENOENT') {
        object['id'] = this.generateId();
        let contenido = `[${JSON.stringify(object)}]`;
        fs.mkdirSync(`./files/`);
        fs.writeFileSync(`./files/${this.nombre}.txt`, contenido, 'utf-8');
        return object['id']
      }
      console.error(err);
    }
  }

  getById(id) {
    try {
      const data = fs.readFileSync(`./files/${this.nombre}.txt`, 'utf-8');
      const obj = JSON.parse(data).find(obj => obj.id === id);
      return obj;
    } catch (err) {
      console.error(err)
      throw new Error('Error en el archivo');
    }
  }

  getAll() {
    try {
      const data = fs.readFileSync(`./files/${this.nombre}.txt`, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error(err)
      throw new Error('Error al obtener todos los objetos en el archivo');
    }
  }

  deleteById(id) {
    try {
      const data = fs.readFileSync(`./files/${this.nombre}.txt`, 'utf-8');
      const obj = JSON.parse(data).find(obj => obj.id === id);
      if (obj) {
        const dataForWrite = JSON.parse(data).filter(obj => obj.id !== id);
        fs.writeFileSync(`./files/${this.nombre}.txt`, JSON.stringify(dataForWrite));
      }
    } catch (err) {
      console.error(err)
      throw new Error('Error al eliminar objeto en el archivo');
    }
  }

  deleteAll() {
    try {
      fs.writeFileSync(`./files/${this.nombre}.txt`, '[]');
    } catch (err) {
      console.error(err)
      throw new Error('Error al eliminar todos objetos en el archivo');
    }
  }

  //funcion auxiliar para crear ids
  generateId() {
    return Math.floor(Math.random() * 10000000000000000);
  }

}

// Puesta en práctica de la clase y sus metodos
let productos = new Contenedor('productos');

const objeto1 = {
  title: "producto1",
  price: 100.50,
  thumbnail: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
}

const objeto2 = {
  title: "producto2",
  price: 200.50,
  thumbnail: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
}

console.log("---- Creando objeto 2 ----");
const id2delete = productos.save(objeto2)
console.log("---- Creacion de objeto1 y get by id ----");
console.log(productos.getById(productos.save(objeto1)));
console.log("---- Obtencion de todos los productos ----");
console.log(productos.getAll());
console.log("---- Eliminacion de objeto2 ----");
productos.deleteById(id2delete);
console.log("---- Obtencion de todos los productos ----");
console.log(productos.getAll());
console.log("---- Borrado de todos los productos ----");
productos.deleteAll();
console.log("---- Obtencion de Lista vacia ----");
console.log(productos.getAll());