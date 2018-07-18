const { connection } = require('../db-connection');

const testDBConnection = (req, res, next) => {
	connection
		.authenticate()
		.then(() => {
			console.log('Connected To Database');
			next();
		})
		.catch((err) => {
			console.log('DB Connection Failed');
			console.log(err);

			res.json({
				error: true,
				code: 500,
				message: 'Unable to connect to database.'
			});
		});
};

module.exports = { testDBConnection };
