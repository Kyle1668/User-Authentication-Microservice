const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models/user');
const { testDBConnection } = require('./middleware/test-db-connection');
const { redisConnection } = require('./redis-connection');
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
	const token = 0;
	res.json({ code: 200 });
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
