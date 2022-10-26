const express = require('express');

const fs = require('fs');

class Products {
	constructor(name) {
		this.name = name;
		this.fs = fs;
	}

	getAllProducts() {
		try {
			const arrayProducts = this.fs.readFileSync(
				`${this.name}.txt`,
				'utf-8'
			);
			const arrayProductsParseado = JSON.parse(arrayProducts);
			return arrayProductsParseado.length
				? arrayProductsParseado
				: { error: 'Product not found' };
		} catch (e) {
			return { error: 'Product not found' };
		}
	}

	getProductById(id) {
		try {
			const arrayProducts = this.fs.readFileSync(
				`${this.name}.txt`,
				'utf-8'
			);
			const arrayProductsParseado = JSON.parse(arrayProducts);
			const product = arrayProductsParseado.filter(
				(item) => item.id == id
			);
			return product;
		} catch (e) {
			return { error: 'Product not found' };
		}
	}

	createProduct(object) {
		try {
			const prev = this.fs.readFileSync(`${this.name}.txt`, 'utf-8');
			const prevParseado = JSON.parse(prev);
			object.id = prevParseado.length + 1;
			prevParseado.push(object);
			this.fs.writeFileSync(
				`${this.name}.txt`,
				JSON.stringify(prevParseado)
			);
		} catch (e) {
			object.id = 1;
			this.fs.writeFileSync(`${this.name}.txt`, JSON.stringify([object]));
		}
	}

	updateProductById(id, update) {
		try {
			const arrayProducts = this.fs.readFileSync(
				`${this.name}.txt`,
				'utf-8'
			);
			const arrayProductsParseado = JSON.parse(arrayProducts);
			const productUpdated = arrayProductsParseado.map((product) => {
				if (product.id == id) {
					update.id = id;
					return (product = update);
				} else {
					return product;
				}
			});
			this.fs.writeFileSync(
				`${this.name}.txt`,
				JSON.stringify(productUpdated)
			);
		} catch (e) {
			return { error: 'Product not found' };
		}
	}

	deleteProductById(id) {
		try {
			const prev = this.fs.readFileSync(`${this.name}.txt`, 'utf-8');
			const prevParseado = JSON.parse(prev);
			const producstRemaining = prevParseado.filter(
				(product) => product.id != id
			);
			let newID = 0;
			const newArr = producstRemaining.map((item) => {
				item.id = ++newID;
				return item;
			});
			this.fs.writeFileSync(`${this.name}.txt`, JSON.stringify(newArr));
		} catch (e) {
			return { error: 'Product not found' };
		}
	}
}

module.exports = {
	express,
	Products,
};

const products = [
	{
		name: 'manzana',
	},
	{
		name: 'naranja',
	},
	{
		name: 'sandia',
	},
];

// products.forEach((product) => h.createProduct(product));
// console.log(h.getAllProducts());
// console.log(h.getProductById(3));
// h.updateProductById(2, { name: 'Alejandro', surname: 'Arzamendia' });
// h.deleteProductById(3);
