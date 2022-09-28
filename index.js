// const http = require('http');

// const server = http.createServer((peticion, respuesta) =>
//     respuesta.end('hola mundo')
// );

// const conectedServer = server.listen(8000, () =>
//     console.log(`servidor http escuchando en el puerto`)
// );

// Ejercicio practico
// const http = require('http');

// const getTime = () => {
//     const time = new Date().getHours();

//     if (time >= 6 && time <= 12) return '<h1>Buenos dias</h1>';
//     if (time >= 13 && time <= 19) return '<h1>Buenos tardes</h1>';
//     return '<h1>Buenos noches</h1>';
// };

// const server = http.createServer((req, res) => res.end(getTime()));

// const connectedServer = server.listen(8080, () => console.log('hola'));

// const express = require('express');
// const app = express();
// const port = process.env.port || 8080;

// app.get('/', (req, res) => res.send('Hola home'));
// app.get('/visita', (req, res) => res.send('Hola visita'));
// app.get('*', (req, res) => res.send('Hola no encontrado'));

// const connectedServer = app.listen(port, () => console.log('enviado'));
