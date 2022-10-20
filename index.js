// EJEMPLO

// const express = require('express');
// const Router = express.Router;
// const app = express();

// const routerApi = Router();

// routerApi.get('/', (req, res) => {
// 	res.send('get ok');
// });
// routerApi.post('/', (req, res) => {
// 	res.send('post ok');
// });

// app.use('/api', routerApi);

// const routerUser = Router();

// routerUser.get('/login', (req, res) => {
// 	res.send('login ok');
// });
// routerUser.post('/logout', (req, res) => {
// 	res.send('logout ok');
// });

// app.use('/user', routerUser);

// app.listen(8080);

const express = require('express');
const routerPeople = require('./routes/personas.js');
const routerPets = require('./routes/mascotas.js');

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
	console.log(`server listening on port: ${PORT}`)
);
server.on('error', (e) => console.error(`Error: ${e}`));
app.use(express.json());

app.use('/pets', routerPets);
app.use('/people', routerPeople);
