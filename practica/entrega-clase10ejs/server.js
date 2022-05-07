const express = require('express');
const bodyParser = require('body-parser');
const { Router } = express;

const app = express();
const router = Router();
const port = 1338;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*Estructura del post en raw JSON:
{
  "title": "Producto 1",
  "price": 123.45,
  "thumbnail": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
}
*/


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

let productos = [];
let idBase = 0;

router.get('/productos', (req, res) => {
  console.log('Se ha recibido una petición GET a /productos');
  res.send(productos);
});

router.get('/productos/:id', (req, res) => {
  console.log(`Se ha recibido una petición GET a /productos/${Number(req.params.id)}`);
  const producto = productos.find(p => p.id === Number(req.params.id));
  if (producto) {
    console.log(`Se ha encontrado el producto ${producto.title}`)
    res.send(producto)
  } else {
    res.send({ 'error': 'Producto no encontrado' });
  }
});

router.post('/productos', (req, res) => {
  console.log('Se ha recibido una petición POST a /productos');
  idBase++;
  const producto = {
    id: idBase,
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  };
  productos.push(producto);
  console.log(`Se ha añadido el producto ${producto.title}`);
  //res.send(producto)
  res.redirect('/');
});

router.put('/productos/:id', (req, res) => {
  console.log(`Se ha recibido una petición PUT a /productos/${Number(req.params.id)}`);
  const id = req.params.id;
  const producto = productos.find(p => p.id === Number(id));
  if (producto) {
    const index = productos.indexOf(producto);
    producto.title = req.body.title;
    producto.price = req.body.price;
    producto.thumbnail = req.body.thumbnail;
    productos[index] = producto;
    console.log(`El producto ${producto.title} ha sido actualizado`);
    res.send(producto);
  } else {
    res.send({ 'error': 'Producto no encontrado' });
  }
});

router.delete('/productos/:id', (req, res) => {
  console.log(`Se ha recibido una petición DELETE a /productos/${Number(req.params.id)}`);
  const id = req.params.id;
  const producto = productos.find(p => p.id === Number(id));
  if (producto) {
    const index = productos.indexOf(producto);
    productos.splice(index, 1);
    res.send(producto);
  } else {
    res.send({ 'error': 'Producto no encontrado' });
  }
});


app.use('/api', router);
const server = app.listen(port, () => {
  console.log(`Node server escuchando en http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.render('pages/index', {productos: productos});
});

server.on('error', error => {
  console.error(`Error en el servidor ${error}`);
});
