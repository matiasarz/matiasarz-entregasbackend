const express = require('express');
const Router = express.Router;
const routerPets = Router();

const pets = [];

routerPets.get('/', (req, res) => {
	res.send(pets);
});
routerPets.post('/', (req, res) => {
	const { name, age } = req.body;
	pets.push({ name, age });
	res.send(pets);
});

module.exports = routerPets;
