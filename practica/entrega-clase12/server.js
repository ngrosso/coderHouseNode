/** Imports e Inicializaciones */
const express = require('express');
const { engine } = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

/** Inicializaciones*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = 1337;

/** Middlewares */
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', './public/views');

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

/** Web Socket */
io.on('connection', (socket) => {
  console.log(`Se recibio un nuevo cliente: ${socket.id}`);
  socket.emit('products', {productos});
  socket.on('new-product', (producto) => {
    console.log(`Se recibio un nuevo producto: ${producto.title}`);
    productos.push(producto);
    io.sockets.emit('products', {productos});
  });
});

/** Configuracion del server */
const productos = [];
app.get('/', (req, res) => {
  res.render('./layouts/index', { productos, listExists: true });
});

const server = httpServer.listen(PORT, () => {
  console.log(`Node server escuchando en http://localhost:${PORT}`);
});

server.on('error', error => {
  console.error(`Error en el servidor: ${error}`);
});
