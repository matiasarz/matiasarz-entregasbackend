const option = {
	client: 'sqlite3',
	connection: {
		fileName: './db.sqlite',
	},
};

const dataBase = require('knex')(option);

module.exports = dataBase;
