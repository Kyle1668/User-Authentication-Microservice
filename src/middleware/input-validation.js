const inputValidation = (req, res, next) => {
	console.log('Middleware Ran');

	if (req.query.email && req.query.password) {
		console(req.query);
		next();
	}

	res.json({
		code: 400,
		message: 'Missing Arguments',
		token: null,
		error: true
	});
};

module.exports.inputValidation = inputValidation;
