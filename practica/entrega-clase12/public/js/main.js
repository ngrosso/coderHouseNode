const socket = io.connect();
const btnSubmit = document.getElementById('btn-submit');

function addProdduct(e) {
  e.preventDefault()
  const product = {
    title: document.querySelector('#title').value,
    price: document.querySelector('#price').value,
    thumbnail: document.querySelector('#thumbnail').value
  };
  console.log(product);
  socket.emit('new-product', product);
  return false;
}
btnSubmit.addEventListener('click', addProdduct);


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