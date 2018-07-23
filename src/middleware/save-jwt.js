const { redisConnection } = require('../models/redis-connection');

const saveJWT = (req, res, next) => {
	const expiration = process.env.JWT_EXPIRATION || 20;

	redisConnection
		.setAsync(req.query.email, res.locals.token, 'EX', expiration)
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
