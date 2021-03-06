const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models/user');
const { redisConnection } = require('./models/redis-connection');

// Custom Middleware
const { saveJWT } = require('./middleware/save-jwt');
const { generateJWT } = require('./middleware/generate-jwt');
const { testPasswordMatch } = require('./middleware/password-match');
const { testDBConnection } = require('./middleware/test-db-connection');
const { inputValidationGET } = require('./middleware/input-validation-get');
const { inputValidationPOST } = require('./middleware/input-validation-post');

const app = express();
const router = express.Router();

// Middleware
app.use('/api', router);
app.use(testDBConnection);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define API Port
const port = process.env.PORT || 3000;

router.get('/token', inputValidationGET, testPasswordMatch, generateJWT, saveJWT, (req, res) => {
	res.json({
		code: 200,
		error: false,
		token: res.locals.token 
	});
});

router.post('/users', inputValidationPOST, (req, res) => {
	User.create({
		email: req.body.email,
		password: req.body.password
	});
	res.json({
		code: 200,
		error: false,
		message: 'User created.'
	});
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
