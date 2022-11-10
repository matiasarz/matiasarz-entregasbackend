const dataBase = require('./connection/index.js');

class DBMethods {
	constructor(name) {
		this.name = name;
		this.dataBase = dataBase;
	}

	createTableDB(name, object) {
		this.dataBase.schema
			.createTable(name, (table) => {
				for ([key, value] of Object.entries(object)) {
					if (Array.isArray(object[key])) {
						for (item of value) {
							table[`${key}`](`${item}`);
						}
					} else {
						table[`${key}`](`${value}`);
					}
				}
			})
			.then((table) => console.log(table))
			.catch((e) => console.error(e.sqlMessage))
			.finally(() => knex.destroy());
	}

	insertRowDB(name, object) {
		this.dataBase
			.from(name)
			.insert(object)
			.then((id) => console.log(id))
			.catch((e) => console.error(e))
			.finally(() => knex.destroy());
	}

	updateDB(name, objectToUpdate, objectUpdated) {
		this.dataBase
			.from(name)
			.where(objectToUpdate)
			.update(objectUpdated)
			.then((res) => console.log(res))
			.catch((e) => console.error(e))
			.finally(() => knex.destroy());
	}

	selectDataFromDB(name, arrayOfColums) {
		this.dataBase
			.from(name)
			.select(arrayOfColums)
			.then((selected) => console.log(selected))
			.catch((e) => console.error(e))
			.finally(() => knex.destroy());
	}

	deleteRowDB(name, objectToDelete) {
		this.dataBase
			.from(name)
			.where(objectToDelete)
			.del()
			.then((deleted) => console.log(deleted))
			.catch((e) => console.error(e))
			.finally(() => knex.destroy());
	}
}

module.exports = DBMethods;
