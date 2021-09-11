const path = require("path");

exports.getWebsiteIndex = async (req, res) => {
	return res.sendFile(
		path.join(__dirname + "./../../public/views/index.html")
	);
};

exports.getDocs = (req, res) => {
	return res.sendFile(path.join(__dirname + "./../../apidoc/index.html"));
};
