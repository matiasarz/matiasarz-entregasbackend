const express = require('express');
const Router = express.Router;
const routerPets = Router();

const pets = [];

routerPets.get('/', (req, res) => {
	res.send(pets);
});
routerPets.post('/', (req, res) => {
	const newPet = req.body;
	pets.push(newPet);
	res.send(pets);
});

module.exports = routerPets;
