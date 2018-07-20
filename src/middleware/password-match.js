const { User } = require('../models/user');

const getUser = (postEmail) => {
	return User.findOne({
		where: {
			email: postEmail
		}
	});
};

const testPasswordMatch = (req, res, next) => {
	return getUser(req.body.email).then((result) => {
		const dbPass = result.dataValues.password;

		if (req.query.password === dbPass) {
			console.log('Correct Password');
			next();
		} else {
			res.json({
				code: 400,
				error: true,
				messge: 'Incorrect password.'
			});
		}
	});
};

module.exports = { testPasswordMatch };

// curl -X GET 'http://localhost:3000/api/token?email=kyle@gmail.com&password=clipper'
