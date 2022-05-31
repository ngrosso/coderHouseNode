/** Imports e Inicializaciones */
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { Router } = express;
const Contenedor = require('./db/Contenedor.js');

const app = express();
const routerProductos = Router();
const routerCarritos = Router();
const port = process.env.PORT || 1337;

const { engine } = require('express-handlebars');

/** Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', './public/views');

/*Estructura del post en raw JSON:
{
  "title": "Producto 1",
  "price": 123.45,
  "thumbnail": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
}
*/

/** Definicion del template engine */
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/public/views/layouts/',
    partialsDir: __dirname + '/public/views/partials/'
  })
);

/** Inicializacion de persistenia por FS */
let productos = new Contenedor('productos');
let productsList = productos.getAll();
let carritos = new Contenedor('carritos');
let carritosList = carritos.getAll()

let auth = '';

/** Seccion de admin */
const isAdmin = (req, res, next) => {
  console.log(req.cookies);
  if (req.cookies.adminAccess === 'admin') {
    next();
  } else {
    res.redirect('/');
  }
}
routerProductos.get('/', (req, res) => {
  console.log('Se ha recibido una petición GET a /productos');
  productsList = productos.getAll();
  res.send(productsList);
});

routerProductos.get('/:id', isAdmin, (req, res) => {
  console.log(`Se ha recibido una petición GET a /productos/${Number(req.params.id)}`);
  res.send(productos.getById(Number(req.params.id)));
});

routerProductos.post('/', isAdmin, (req, res) => {
  console.log('Se ha recibido una petición POST a /productos');
  const producto = {
    timestamp: Date.now(),
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    thumbnail: req.body.thumbnail,
    price: req.body.price,
    stock: req.body.stock
  };
  productos.save(producto);
  console.log(`Se ha añadido el producto ${producto.title}`);
  //res.send(producto)
  res.redirect('/');
});

routerProductos.put('/:id', isAdmin, (req, res) => {
  console.log(`Se ha recibido una petición PUT a /productos/${Number(req.params.id)}`);
  const id = req.params.id;
  const producto = {
    timestamp: Date.now(),
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    thumbnail: req.body.thumbnail,
    price: req.body.price,
    stock: req.body.stock
  };
  console.log(`El producto ${producto.title} ha sido actualizado`);
  res.send(productos.modifyById(id, producto));
});

routerProductos.delete('/:id', isAdmin, (req, res) => {
  console.log(`Se ha recibido una petición DELETE a /productos/${Number(req.params.id)}`);
  const id = req.params.id;
  res.send(productos.deleteById(id));
});

app.use('/api/productos', routerProductos);

/** Seccion de carrito */
routerCarritos.post('/', (req, res) => {
  console.log('Se ha recibido una petición POST a /carritos');
  const carrito = {
    timestamp: Date.now(),
    productos: []
  }
  const savedCarrito = carritos.save(carrito);
  console.log(`Se ha añadido el carrito ${savedCarrito.id}`);
  res.send(savedCarrito);
});

routerCarritos.delete('/:id', (req, res) => {
  console.log(`Se ha recibido una petición DELETE a /carritos/${Number(req.params.id)}`);
  const id = Number(req.params.id);
  res.send(carritos.deleteById(id));
});

routerCarritos.get('/:id/productos', (req, res) => {
  console.log(`Se ha recibido una petición GET a /carritos/${Number(req.params.id)}/productos`);
  const id = Number(req.params.id);
  res.send(carritos.getById(id));
});

routerCarritos.post('/:id/productos', (req, res) => {
  console.log(`Se ha recibido una petición POST a /carritos/${Number(req.params.id)}/productos`);
  const idCarrito = Number(req.params.id);
  const carrito = carritos.getById(idCarrito)
  const idProducto = Number(req.body.id);
  console.log(req.body.id)
  const producto = productos.getById(idProducto);
  console.log(producto)
  const productoDb = {
      timestamp: carrito.timestamp,
    productos: [...carrito.productos, producto]
  }
  console.log(`Se ha añadido el producto ${producto.title} al carrito ${idCarrito}`);
  const carritoModificado = carritos.modifyById(idCarrito,productoDb);
  res.send(carritoModificado);
});

routerCarritos.delete('/:id/productos/:id_prod',(req,res)=>{
  console.log(`Se ha recibido una petición DELETE a /carritos/${Number(req.params.id)}/productos/${Number(req.params.id_prod)}`);
  const idCarrito = Number(req.params.id);
  const idProducto = Number(req.params.id_prod);
  const carrito = carritos.deleteObjArrayItemById(idCarrito,'productos',idProducto);
  console.log(`Se ha eliminado el producto de id ${idProducto} del carrito ${idCarrito}`);
  res.send(carrito);
});

app.use('/api/carrito', routerCarritos);

/** Puesta en marcha del servidor */
const server = app.listen(port, () => {
  console.log(`Node server escuchando en http://localhost:${port}`);
});
app.get('/', (req, res) => {
  res.render('./layouts/index', { productsList: productos.getAll(), listExists: true });
});

server.on('error', error => {
  console.error(`Error en el servidor ${error}`);
});
