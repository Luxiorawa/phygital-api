const MysqlMiddleware = require("../../bin/Middlewares/Mysql");

exports.getSections = () => {
	return MysqlMiddleware.selectList(`SELECT * FROM sections`);
};

exports.getSection = (sectionId) => {
	return MysqlMiddleware.select(
		`SELECT * FROM sections WHERE section_id = ?`,
		[sectionId]
	);
};
