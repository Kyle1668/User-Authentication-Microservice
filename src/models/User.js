class User {
	constructor(name, email, token) {
		this.name = name;
		this.email = email;
		this.token = token;
	}

	isValidToken() {
		const { token } = this;
		return token !== null;
	}
}

module.exports.User = User;
