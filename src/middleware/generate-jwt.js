const jwt = require('jsonwebtoken');

const generateJWT = (req, res, next) => {
	const expiration = { expiresIn: process.env.JWT_EXPIRATION || 20 };
	const token = jwt.sign({ email: req.query.email }, req.query.password, expiration);
	res.locals.token = token;
	next();
};

module.exports = { generateJWT };
