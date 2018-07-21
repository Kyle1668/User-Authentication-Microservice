const { redisConnection } = require('../redis-connection');

const saveJWT = (req, res, next) => {
	redisConnection
		.setAsync(req.query.email, res.locals.token, 'EX', 20)
		.then(() => {
			console.log('MIDDLEWARE-SAVE-JWT: JWT SAVED');
			next();
		})
		.catch((redisErr) => {
			console.log(redisErr);
			res.json({
				code: 500,
				error: true,
				message: 'Error Saving JWT.'
			});
		});
};

module.exports = { saveJWT };
