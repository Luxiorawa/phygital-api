const express = require("express");
const router = express.Router();
const OrdersController = require("./../Controllers/OrdersController");
const { body, param } = require("express-validator");

router.get("/", OrdersController.getOrders);

router.get("/getByUserId", OrdersController.getOrdersByUserId);

router.get("/getOrdersHistory", OrdersController.getOrdersHistory);

router.get("/getShoppingCart", OrdersController.getShoppingCart);

router.get(
	"/:order_id",
	[param("order_id").isInt().isLength(1)],
	OrdersController.getOrder
);

router.post("/buyShoppingCart", OrdersController.buyShoppingCart);

router.put(
	"/:order_id",
	[
		param("order_id").isInt().isLength(1),
		body("shopping_cart_id").optional().isInt(),
		body("article_id").optional().isInt(),
		body("discount_id").optional().isInt(),
		body("state").optional().isString().isLength(1),
		body("price").optional().isDecimal(),
		body("quantity").optional().isInt()
	],
	OrdersController.updateOrder
);

router.delete(
	"/:order_id",
	[param("order_id").isInt().isLength(1)],
	OrdersController.deleteOrder
);

module.exports = router;
