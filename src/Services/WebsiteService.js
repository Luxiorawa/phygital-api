const fs = require("fs");
const { promisify } = require("util");

exports.readIndexFile = async () => {
	const readFile = promisify(fs.readFile);
	return await readFile("./public/views/index.html");
};
