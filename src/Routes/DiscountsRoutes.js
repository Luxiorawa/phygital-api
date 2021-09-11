const express = require("express");
const router = express.Router();
const DiscountsController = require("./../Controllers/DiscountsController");
const { body, param } = require("express-validator");

router.get("/", DiscountsController.getDiscounts);

router.get(
	"/:discount_id",
	[param("discount_id").isInt()],
	DiscountsController.getDiscount
);

router.post(
	"/",
	[
		body("value").isDecimal(),
		body("discount_type").isString().isLength(1),
		body("category_id").optional(),
		body("article_id").optional(),
		body("minimum_quantity").optional().isInt(),
		body("minimum_value").optional().isDecimal()
	],
	DiscountsController.createDiscount
);

router.put(
	"/:discount_id",
	[
		param("discount_id").isInt(),
		body("value").optional().isDecimal(),
		body("discount_type").optional().isString().isLength(1),
		body("category_id").optional(),
		body("article_id").optional(),
		body("minimum_quantity").optional().isInt(),
		body("minimum_value").optional().isDecimal()
	],
	DiscountsController.updateDiscount
);

router.delete(
	"/:discount_id",
	[param("discount_id").isInt()],
	DiscountsController.deleteDiscount
);

module.exports = router;
