const jwt = require('jsonwebtoken');

const generateJWT = (req, res, next) => {
	const expiration = { expiresIn: process.env.JWT_EXPIRATION || 20 };
	const token = jwt.sign({ email: req.query.email }, req.query.password, expiration);
	res.locals = { token };

	console.log('MIDDLEWARE-GENERATE-JWT: JWT GENERATED');
	next();
};

module.exports = { generateJWT };
