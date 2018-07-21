const { User } = require('../models/user');

const getUser = (postEmail) => {
	return User.findOne({
		where: {
			email: postEmail
		}
	});
};

const testPasswordMatch = (req, res, next) => {
	return getUser(req.query.email).then((result) => {
		if (result !== null) {
			const dbPass = result.dataValues.password;
			const argPass = req.query.password;

			if (argPass === dbPass) {
				console.log('Correct Password');
				next();
			} else {
				res.json({
					code: 400,
					error: true,
					message: 'Incorrect password.'
				});
			}
		}
		res.json({
			code: 400,
			error: true,
			message: "Can't find user with this email."
		});
	});
};

module.exports = { testPasswordMatch };

// curl -X GET 'http://localhost:3000/api/token?email=kyle@gmail.com&password=clipper'
