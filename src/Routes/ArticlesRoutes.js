const express = require("express");
const router = express.Router();
const ArticlesController = require("./../Controllers/ArticlesController");
const { body, param } = require("express-validator");

router.get("/", ArticlesController.getArticles);

router.get(
	"/byShelfId",
	[body("shelf_id").isInt().isLength(1)],
	ArticlesController.getArticlesByShelfId
);

router.get(
	"/:article_id",
	[param("article_id").isInt().isLength(1)],
	ArticlesController.getArticle
);

router.post(
	"/addToShoppingCart",
	[
		body("article_id").isInt().isLength(1),
		body("quantity").isInt().isLength(1),
		body("discount_id").optional().isInt()
	],
	ArticlesController.addToShoppingCart
);

router.post(
	"/",
	[
		body("shelf_id").optional().isInt(),
		body("name").isString().isLength(1),
		body("price").isDecimal(),
		body("description").isString().isLength(1),
		body("picture").optional().isString().isLength(1),
		body("quantity_stock").optional().isInt(),
		body("quantity_reserved").optional().isInt(),
		body("quantity_bought").optional().isInt()
	],
	ArticlesController.createArticle
);

router.put(
	"/manageStock/:article_id",
	[
		param("article_id").isInt().isLength(1),
		body("quantity").isInt(),
		body("stock_type").optional().isString().isLength(1)
	],
	ArticlesController.manageStock
);

router.put(
	"/:article_id",
	[
		param("article_id").isInt().isLength(1),
		body("category_id").optional().isInt(),
		body("shelf_id").optional().isInt(),
		body("name").optional().isString().isLength(1),
		body("price").optional().isDecimal(),
		body("description").optional().isString().isLength(1),
		body("picture").optional().isString().isLength(1)
	],
	ArticlesController.updateArticle
);

router.delete(
	"/:article_id",
	[param("article_id").isInt().isLength(1)],
	ArticlesController.deleteArticle
);

module.exports = router;
