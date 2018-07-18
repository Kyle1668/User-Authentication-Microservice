const inputValidation = (req, res, next) => {
	console.log('Middleware Ran');
	console.log(req.query);

	if (req.query.email && req.query.password) {
		next();
	} else {
		res.json({
			code: 400,
			message: 'Missing Arguments',
			token: null,
			error: true
		});
	}
};

module.exports.inputValidation = inputValidation;
