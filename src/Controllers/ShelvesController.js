const ShelvesService = require("./../Services/ShelvesService");
const { validationResult } = require("express-validator");

exports.getShelves = async (req, res) => {
	const sections = await ShelvesService.getShelves();

	return res.json({ status: "Success", results: sections });
};

exports.getShelf = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const section = await ShelvesService.getShelf(req.params.shelf_id);

	return res.json({ status: `Success`, results: section });
};
