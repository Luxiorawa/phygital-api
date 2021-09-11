const MysqlMiddleware = require("../../bin/Middlewares/Mysql");

exports.getShelves = () => {
	return MysqlMiddleware.selectList(`SELECT * FROM shelves`);
};

exports.getShelf = (shelfId) => {
	return MysqlMiddleware.select(`SELECT * FROM shelves WHERE shelf_id = ?`, [
		shelfId
	]);
};
