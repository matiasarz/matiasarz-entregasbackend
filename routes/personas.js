const express = require('express');
const Router = express.Router;
const routerPeople = Router();

const people = [];

routerPeople.get('/', (req, res) => {
	res.send(people);
});
routerPeople.post('/', (req, res) => {
	const newPerson = req.body;
	people.push(newPerson);
	res.send(people);
});

module.exports = routerPeople;
