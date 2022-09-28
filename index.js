const express = require('express');
const app = express();
const PORT = process.env.port || 8080;
const fs = require('fs');

const getProductsFromFile = (fs) => {
    const files = fs.readFileSync('products.txt', 'utf-8');
    const arrayFile = JSON.parse(files);
    return arrayFile;
};

const getRandomProduct = (callback) => {
    const randomNumber = Math.ceil(Math.random() * callback.length);
    return callback[randomNumber];
};

const random = Math.ceil(Math.random() * getProductsFromFile(fs).length);

app.get('/productos', (request, response) =>
    response.send(getProductsFromFile(fs))
);
app.get('/productoRandom', (request, response) =>
    response.send(getRandomProduct(getProductsFromFile(fs)))
);

const server = app.listen(PORT, () => console.log('El servidor fue deplegado'));
server.on(PORT, () => console.error('Hay error'));
