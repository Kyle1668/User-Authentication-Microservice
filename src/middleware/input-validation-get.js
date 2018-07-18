const inputValidationGET = (req, res, next) => {
	if (req.query.email && req.query.password) {
		console.log('inputValidation: Correct Parameters');
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

module.exports = { inputValidationGET };
