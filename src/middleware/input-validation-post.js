const { User } = require('../models/user');

const emailAlreadyExists = (postEmail) => {
	return User.findAndCount({
		where: {
			email: postEmail
		}
	});
};

const inputValidationPOST = (req, res, next) => {
	if (!('email' in req.body) && !('password' in req.body)) {
		res.json({
			code: 400,
			error: true,
			messge: 'Missing email and password.'
		});
	} else if (!('email' in req.body) || req.body.email === '') {
		res.json({
			code: 400,
			error: true,
			messge: 'Missing email.'
		});
	} else if (!('password' in req.body) || req.body.password === '') {
		res.json({
			code: 400,
			error: true,
			messge: 'Missing password.'
		});
	}

	emailAlreadyExists(req.body.email).then((result) => {
		if (result.count !== 0) {
			res.json({
				code: 400,
				error: true,
				messge: 'Email already exists.'
			});
		} else {
			next();
		}
	});
};

module.exports = { inputValidationPOST };

// curl -X POST -H 'Content-Type: application/json' -d '{"email": "kyle@gmail.com", "password":"clipper"}' http://localhost:3000/api/users
