const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { User } = require('./models/user');
const { redisConnection } = require('./redis-connection');
const { testDBConnection } = require('./middleware/test-db-connection');
const { inputValidationGET } = require('./middleware/input-validation-get');
const { inputValidationPOST } = require('./middleware/input-validation-post');
const { testPasswordMatch } = require('./middleware/password-match');

const app = express();
const router = express.Router();

// Define API Port
const port = process.env.PORT || 3000;

// Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', testDBConnection, router);
app.use('/users', bodyParser.json(), router);

// router.use(middleware.inputValidation)
router.get('/token', bodyParser.json(), inputValidationGET, testPasswordMatch, (req, res) => {
	jwt.sign({ email: req.query.email }, req.query.password, (jwtErr, jsonToken) => {
		if (jwtErr) {
			res.json({
				code: 500,
				error: true,
				message: 'Error generating JWT.'
			});
		} else {
			redisConnection
				.setAsync(req.query.email, jsonToken, 'EX', 20)
				.then(() => {
					res.json({
						code: 200,
						error: false,
						token: jsonToken
					});
				})
				.catch((redisErr) => {
					console.log(redisErr);
					res.json({
						code: 500,
						error: true,
						message: 'Error Saving JWT.'
					});
				});
		}
	});
});

router.post('/users', bodyParser.json(), inputValidationPOST, (req, res) => {
	User.create({
		email: req.body.email,
		password: req.body.password
	});
	res.json({ code: 200 });
});

redisConnection.on('ready', () => {
	console.log('Redis Connection Ready');
});

redisConnection.on('error', () => {
	console.log('Redis Connection Failed');
});

app.listen(port, () => {
	console.log(`Listening On Port ${port}`);
});
