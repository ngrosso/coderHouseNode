const socket = io.connect();

// Productos
const btnSubmitProduct = document.getElementById('btn-submit-product');

function addProdduct(e) {
  if (document.querySelector('#formProducts').checkValidity()) {
    e.preventDefault()
    const product = {
      title: document.querySelector('#title').value,
      price: document.querySelector('#price').value,
      thumbnail: document.querySelector('#thumbnail').value
    };
    console.log(product);
    socket.emit('new-product', product);
    document.querySelector('#title').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('#thumbnail').value = '';
    return false;
  }
}

btnSubmitProduct.addEventListener('click', addProdduct);

socket.on('products', products => {
  console.log(products)
  return fetch('/views/partials/history.hbs')
    .then(response => response.text())
    .then(history => {
      const template = Handlebars.compile(history);
      const html = template(products);
      document.querySelector('#products').innerHTML = html;
    })
    .catch(error => console.error(error));
});

// Mensajes
const btnSubmitMessage = document.getElementById('btn-submit-message');

function addMessage(e) {
  if (document.querySelector('#formMessages').checkValidity()) {
    e.preventDefault()
    const message = {
      author: document.querySelector('#author').value,
      message: document.querySelector('#message').value
    };
    console.log(message);
    socket.emit('new-message', message);
    document.querySelector('#author').value = message.author;
    document.querySelector('#message').value = '';
    document.querySelector('#message').focus();
    return false;
  }
}

btnSubmitMessage.addEventListener('click', addMessage);

socket.on('messages', messages => {
  console.log(messages)
  return fetch('/views/partials/messages.hbs')
    .then(response => response.text())
    .then(text => {
      const template = Handlebars.compile(text);
      const html = template(messages);
      document.querySelector('#messages').innerHTML = html;
    })
    .catch(error => console.error(error));
})