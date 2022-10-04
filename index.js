const express = require('express');
const { Container, generateProducts } = require('./class.js');
const app = express();
const PORT = process.env.port || 8080;

const products = new Container('products');

app.get('/productos', (request, response) =>
    products
        .getAllFiles()
        .then((item) =>
            item ? response.send(item) : response.send(generateProducts())
        )
);
app.get('/productoRandom', (request, response) => {
    products.getAllFiles().then((item) => {
        products
            .getFileById(Math.ceil(Math.random() * item.length))
            .then((itemID) =>
                response.send(
                    itemID ? itemID : response.send(generateProducts())
                )
            );
    });
});

app.get('*', (request, response) =>
    response.send('<h1>404</h1><h2>Not Found</h2>')
);

const server = app.listen(PORT, () => console.log('El servidor fue deplegado'));
server.on(PORT, () => console.error('Hay error'));
