/** Imports e Inicializaciones */
const express = require('express');
const { engine } = require('express-handlebars');
const moment = require('moment');
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
const products = [];
const messages = [];

io.on('connection', (socket) => {
  console.log(`Se recibio un nuevo cliente: ${socket.id}`);

  socket.emit('products', { products });
  socket.emit('messages', { messages });

  socket.on('new-product', (product) => {
    console.log(`Se recibio un nuevo product: ${product.title}`);
    products.push(product);
    io.sockets.emit('products', { products });
  });

  socket.on('new-message', (message) => {
    console.log(`Se recibio un nuevo mensaje de ${message.author}: ${message.message}`);
    message['time'] = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    messages.push(message);
    io.sockets.emit('messages', { messages });
  });
});

/** Configuracion del server */
app.get('/', (req, res) => {
  res.render('./layouts/index', { products:products, messages:messages, listExists: true });
});

const server = httpServer.listen(PORT, () => {
  console.log(`Node server escuchando en http://localhost:${PORT}`);
});

server.on('error', error => {
  console.error(`Error en el servidor: ${error}`);
});
