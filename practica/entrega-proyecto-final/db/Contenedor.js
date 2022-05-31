const fs = require('fs');


module.exports = class Contenedor {
  nombre = '';

  constructor(nombre) {
    this.nombre = nombre;
  }

  save(object) {
    try {
      let data = fs.readFileSync(`./files/${this.nombre}.json`, 'utf-8');
      data = JSON.parse(data);
      let id = this.generateId();
      while (data.find(obj => obj.id === id)) {
        id = this.generateId();
      }
      object['id'] = id;
      data.push(object);
      fs.writeFileSync(`./files/${this.nombre}.json`, JSON.stringify(data));
      return object;
    } catch (err) {
      if (err.code === 'ENOENT') {
        try {
          fs.mkdirSync(`./files/`);
          object['id'] = this.generateId();
          let contenido = `[${JSON.stringify(object)}]`;
          fs.writeFileSync(`./files/${this.nombre}.json`, contenido, 'utf-8');
          return object
        } catch (err){
          if(err.code === 'EEXIST'){
            object['id'] = this.generateId();
            let contenido = `[${JSON.stringify(object)}]`;
            fs.writeFileSync(`./files/${this.nombre}.json`, contenido, 'utf-8');
            return object
          }
        }
      }
    }
  }

  modifyById(id, object) {
    try {
      const data = fs.readFileSync(`./files/${this.nombre}.json`, 'utf-8');
      const obj = JSON.parse(data).find(obj => obj.id === id);
      if (obj) {
        const dataForWrite = JSON.parse(data).filter(obj => obj.id !== id);
        object['id'] = id;
        dataForWrite.push(object);
        fs.writeFileSync(`./files/${this.nombre}.json`, JSON.stringify(dataForWrite));
        return object;
      }
    } catch (err) {
      console.error(err)
      throw new Error('Error en el archivo');
    }
  }


  getById(id) {
    try {
      const data = fs.readFileSync(`./files/${this.nombre}.json`, 'utf-8');
      const obj = JSON.parse(data).find(obj => obj.id === id);
      return obj;
    } catch (err) {
      console.error(err)
      throw new Error('Error en el archivo');
    }
  }

  getAll() {
    try {
      const data = fs.readFileSync(`./files/${this.nombre}.json`, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.log(err.code)
      if (err.code === 'ENOENT') {
        try {
          fs.mkdirSync(`./files/`);
          fs.writeFileSync(`./files/${this.nombre}.json`, '[]', 'utf-8');
          return [];

        } catch (err) {
          if (err.code === 'EEXIST') {
            fs.writeFileSync(`./files/${this.nombre}.json`, '[]', 'utf-8');
            return [];
          }
        }
      }
    }
  }

  deleteObjArrayItemById(id, arrayName, idArray) {
    try {
      const data = fs.readFileSync(`./files/${this.nombre}.json`, 'utf-8');
      let objArray = JSON.parse(data)
      const obj = objArray.find(obj => obj.id === id);
      if (obj) {
        const preDataForWrite = obj[arrayName].filter(obj => obj.id !== idArray);
        obj[arrayName] = preDataForWrite
        fs.writeFileSync(`./files/${this.nombre}.json`, JSON.stringify(objArray));
        return obj
      }
    } catch (err) {
      console.error(err)
      throw new Error('Error al eliminar objeto en el archivo');
    }
  }

  deleteById(id) {
    try {
      const data = fs.readFileSync(`./files/${this.nombre}.json`, 'utf-8');
      const obj = JSON.parse(data).find(obj => obj.id === id);
      if (obj) {
        const dataForWrite = JSON.parse(data).filter(obj => obj.id !== id);
        fs.writeFileSync(`./files/${this.nombre}.json`, JSON.stringify(dataForWrite));
        return obj
      }
    } catch (err) {
      console.error(err)
      throw new Error('Error al eliminar objeto en el archivo');
    }
  }

  deleteAll() {
    try {
      fs.writeFileSync(`./files/${this.nombre}.json`, '[]');
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
