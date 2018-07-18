const inputValidationPOST = (req, res, next) => {
	if (req.body === {}) {
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
	} else {
		next();
	}
};

module.exports = { inputValidationPOST };

// curl -X POST -H 'Content-Type: application/json' -d '{"email": "kyleobrien01@comcast.net", "password":"clipper"}' http://localhost:3000/api/users