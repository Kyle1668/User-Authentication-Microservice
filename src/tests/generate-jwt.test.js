const jwt = require('jsonwebtoken');
const { generateJWT } = require('../middleware/generate-jwt');

jest.mock('jsonwebtoken');

describe('middleware/generate-jwt', () => {
	const email = 'foo@bar.com';
	const password = 'secret';
	const req = { query: { email, password } };
	const res = { locals: { foo: true } };
	const next = jest.fn();
	const token = 'asdf';

	jwt.sign.mockReturnValue(token);

	beforeEach(() => generateJWT(req, res, next));

	test('next should be called', () => expect(next).toBeCalled());

	test('jwt.sign should be called correctly', () => {
		expect(jwt.sign).toBeCalledWith({ email }, password, { expiresIn: 20 });
	});

	test('should set res.locals', () => expect(res.locals).toEqual({ ...res.locals, token }));
});
