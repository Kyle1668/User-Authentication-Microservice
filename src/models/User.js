const { STRING } = require('sequelize');
const { connection } = require('../db-connection');

const User = connection.define('users', {
	email: {
		type: STRING
	},
	password: {
		type: STRING
	}
});

connection.sync();

module.exports = { User };
