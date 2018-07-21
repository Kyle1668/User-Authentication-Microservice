const jwt = require('jsonwebtoken');

const generateJWT = (req, res, next) => {
	const token = jwt.sign({ email: req.query.email }, req.query.password);
	res.locals = { token };

	console.log('MIDDLEWARE-GENERATE-JWT: JWT GENERATED');
	next();
};

module.exports = { generateJWT };
