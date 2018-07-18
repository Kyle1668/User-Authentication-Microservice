const express = require('express');
const { inputValidation } = require('./middleware/input-validation');

const app = express();
const router = express.Router();

const port = process.env.PORT || 3000;

// Middleware
app.use('/api', inputValidation, router);

// router.use(middleware.inputValidation)
router.get('/', (req, res) => {
	res.json({ code: 200 });
});

app.listen(port, () => {
	console.log(`Listening On Port ${port}`);
});
