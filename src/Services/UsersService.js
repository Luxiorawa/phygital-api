const MysqlMiddleware = require("./../../bin/Middlewares/Mysql");

exports.getAllUsers = () => {
	return MysqlMiddleware.selectList(`SELECT * FROM users`);
};

exports.getUser = (userId) => {
	return MysqlMiddleware.select(`SELECT * FROM users WHERE user_id = ?`, [
		userId
	]);
};

exports.createUser = (userObject) => {
	return MysqlMiddleware.insert(`INSERT INTO users SET ?`, [userObject]);
};

exports.updateUser = (userObject, userId) => {
	return MysqlMiddleware.update(`UPDATE users SET ? WHERE user_id = ?`, [
		userObject,
		userId
	]);
};

exports.deleteUser = (userId) => {
	return MysqlMiddleware.delete(`DELETE FROM users WHERE user_id = ?`, [
		userId
	]);
};

exports.getUserByEmail = (email) => {
	return MysqlMiddleware.select(`SELECT * FROM users where email = ?`, [
		email
	]);
};

exports.getUserByUsername = (username) => {
	return MysqlMiddleware.select(`SELECT * FROM users WHERE username = ?`, [
		username
	]);
};

exports.checkEmailAvailability = async (email) => {
	let query = await MysqlMiddleware.select(
		`SELECT COUNT(user_id) AS count FROM users WHERE email = ?`,
		email
	);

	if (query && query.count > 0) {
		return false;
	} else {
		return true;
	}
};
