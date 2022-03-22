const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());

const productos = JSON.parse(fs.readFileSync("./files/productos.txt", "utf-8"));

app.get("/productos", (req, res) => {
  res.send(productos);
});

app.get("/productoRandom", (req, res) => {
  const producto = productos[Math.floor(Math.random() * productos.length)];
  res.send(producto);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
