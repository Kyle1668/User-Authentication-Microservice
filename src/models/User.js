const { STRING } = require('sequelize');
const { connection } = require('./db-connection');

const User = connection.define('users', {
	email: {
        type: STRING,
        unique: true,
        allowNull: false
	},
	password: {
        type: STRING,
        allowNull: false
	}
});

connection.sync();

module.exports = { User };
