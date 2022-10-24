const express = require('express');
const Router = express.Router;
const routerPeople = Router();

const people = [];

routerPeople.get('/', (req, res) => {
	res.send(people);
});
routerPeople.post('/', (req, res) => {
	const { name, age } = req.body;
	people.push({ name, age });
	res.send(people);
});

module.exports = routerPeople;
