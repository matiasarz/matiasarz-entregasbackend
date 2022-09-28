const express = require('express');
const app = express();
const PORT = process.env.port || 8080;
const fs = require('fs');

const getProductsFromFile = (fs) => {
    const files = fs.readFileSync('products.txt', 'utf-8');
    const arrayFile = JSON.parse(files);
    return arrayFile;
};

const getRandomProduct = (fs) => {
    const randomNumber = Math.floor(
        Math.random() * getProductsFromFile(fs).length
    );
    return getProductsFromFile(fs)[randomNumber];
};

const getProductById = (fs, id) => {
    const productSelected = getProductsFromFile(fs).filter(
        (product) => product.id === id
    );
    return productSelected;
};

app.get('/productos', (request, response) =>
    response.send(getProductsFromFile(fs))
);
app.get('/productoRandom', (request, response) =>
    response.send(getRandomProduct(fs))
);

getProductsFromFile(fs).forEach((product) => {
    app.get(`/producto/${product.id}`, (request, response) =>
        response.send(getProductById(fs, product.id))
    );
});

app.get('*', (request, response) =>
    response.send('<h1>404</h1><h2>Not Found</h2>')
);

const server = app.listen(PORT, () => console.log('El servidor fue deplegado'));
server.on(PORT, () => console.error('Hay error'));
