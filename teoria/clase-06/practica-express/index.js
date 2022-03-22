const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const frase = 'Hola mundo como estan';

app.get('/api/frase', (req, res) => {
  res.send({
    frase: frase
  })
})

app.get('/api/letras', (req, res) => {
  const letras = frase.split('')
  if (isNaN(req.query.num)) {
    res.send({
      error: 'El parametro num debe ser un numero'
    })
  } else if (req.query.num >= 1 && req.query.num <= letras.length) {
    res.send({
      letra: letras[req.query.num - 1]
    })
  } else {
    res.send({
      error: 'El parametro num debe ser mayor a 0 y menor a la cantidad de letras: ' + letras.length
    })
  }
})

app.get('/api/palabras', (req, res) => {
  const palabras = frase.split(' ');
  if (isNaN(req.query.num)) {
    res.send({
      error: 'El parametro num debe ser un numero'
    })
  } else if (req.query.num >= 1 && req.query.num <= palabras.length) {
    res.send({
      letra: palabras[req.query.num - 1]
    })
  } else {
    res.send({
      error: 'El parametro num debe ser mayor a 0 y menor a la cantidad de palabras: ' + palabras.length
    })
  }
})

app.post('/api/frase', (req, res) => {
  const frase = req.body.contenido
  if (frase) {
    res.send({
      frase: frase
    })
  } else {
    res.send({
      error: 'El parametro frase es obligatorio'
    })
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})