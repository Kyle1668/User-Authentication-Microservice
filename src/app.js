const express = require('express');
const { inputValidation } = require('./middleware/input-validation');
const { testDBConnection } = require('./middleware/test-db-connection');

const app = express();
const router = express.Router();

// Define API Port
const port = process.env.PORT || 3000;

// Middleware
app.use('/api', inputValidation, testDBConnection, router);

// router.use(middleware.inputValidation)
router.get('/', (req, res) => {
	res.json({ code: 200 });
});

app.listen(port, () => {
	console.log(`Listening On Port ${port}`);
});
