const MysqlMiddleware = require("../../bin/Middlewares/Mysql");

exports.getCategories = () => {
	return MysqlMiddleware.selectList(`SELECT * FROM categories`);
};

exports.getCategory = (categoryId) => {
	return MysqlMiddleware.select(
		`SELECT * FROM categories WHERE category_id = ?`,
		categoryId
	);
};

exports.createCategory = (categoryObject) => {
	return MysqlMiddleware.insert(
		`INSERT INTO categories SET ?`,
		categoryObject
	);
};

exports.updateCategory = (categoryObject, categoryId) => {
	return MysqlMiddleware.update(
		`UPDATE categories SET ? WHERE category_id = ?`,
		[categoryObject, categoryId]
	);
};

exports.deleteCategory = (categoryId) => {
	return MysqlMiddleware.delete(
		`DELETE FROM categories WHERE category_id = ?`,
		categoryId
	);
};
