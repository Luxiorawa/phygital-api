const express = require("express");
const router = express.Router();
const AuthController = require("./../Controllers/AuthController");
const { body } = require("express-validator");

router.post(
	"/login",
	[
		body("username").optional().isString(),
		body("email").optional().isString(),
		body("password").isString().isLength(1)
	],
	AuthController.login
);

router.post(
	"/register",
	[
		body("last_name").isString().isLength(1),
		body("first_name").isString().isLength(1),
		body("email").isString().isLength(1),
		body("phone_number").isString().isLength(1),
		body("username").isString().isLength(1),
		body("password").isString().isLength(1)
	],
	AuthController.register
);

module.exports = router;
