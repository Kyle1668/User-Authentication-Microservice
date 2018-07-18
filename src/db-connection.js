const Sequelize = require('sequelize');

const dbParameters = {
	host: 'localhost',
	dialect: 'postgres'
};

const connection = new Sequelize('auth_test', 'auth_test_usr', 'clipper', dbParameters);

module.exports = { connection };
