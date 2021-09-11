const OrdersService = require("./../Services/OrdersService");
const ArticlesService = require("./../Services/ArticlesService");
const { validationResult } = require("express-validator");
const MysqlProvider = require("./../../bin/Middlewares/Mysql");

exports.getOrders = async (req, res) => {
	const orders = await OrdersService.getOrders();

	return res.json({ status: "Success", results: orders });
};

exports.getOrder = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const order = await OrdersService.getOrder(req.params.order_id);

	return res.json({ status: "Success", results: order });
};

exports.getOrdersByUserId = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const orders = await OrdersService.getOrdersByUserId(req.session.user.id);

	return res.json({ status: "Success", results: orders });
};

exports.getOrdersHistory = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const orders = await OrdersService.getOrdersHistory(req.session.user.id);

	return res.json({ status: "Success", results: orders });
};

exports.getShoppingCart = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const shoppingCart = await OrdersService.getCurrentShoppingCartForUser(
		req.session.user.id
	);

	return res.json({ status: "Success", results: shoppingCart });
};

exports.buyShoppingCart = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	let connection = await MysqlProvider.getConnection();

	try {
		const userId = req.session.user.id;
		const shoppingCart = await OrdersService.getCurrentShoppingCartForUser(
			userId
		);

		if (shoppingCart) {
			await connection.beginTransaction();

			const totalPrice =
				await getTotalPriceForShoppingCartAndManageQuantity(
					shoppingCart,
					connection
				);

			let status = await OrdersService.updateOrderStateByShoppingCartId(
				shoppingCart[0].shopping_cart_id,
				connection
			);

			await connection.commit();

			return res.json({
				status: "Success",
				orderIdUpdated: status,
				totalPrice: totalPrice
			});
		} else {
			return res.json({
				status: "Failed",
				message: "Shopping cart is empty"
			});
		}
	} catch (error) {
		if (connection) {
			await connection.rollback();
		}
		return res.status(422).json({
			status: "Failed",
			message: `An error occured during buyShoppingCart function ${error}`
		});
	}
};

exports.updateOrder = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const orderObject = {};
	req.body.shopping_cart_id
		? (orderObject.shopping_cart_id = req.body.shopping_cart_id)
		: null;
	req.body.article_id ? (orderObject.article_id = req.body.article_id) : null;
	req.body.discount_id
		? (orderObject.discount_id = req.body.discount_id)
		: null;
	req.body.state ? (orderObject.state = req.body.state) : null;
	req.body.price ? (orderObject.price = req.body.price) : null;
	req.body.quantity ? (orderObject.quantity = req.body.quantity) : null;

	const isOrderUpdated = await OrdersService.updateOrder(
		orderObject,
		req.params.order_id
	);

	return res.json({ status: "Success", isOrderUpdated: isOrderUpdated });
};

exports.deleteOrder = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const isOrderDeleted = await OrdersService.deleteOrder(req.params.order_id);

	return res.json({ status: "Success", isOrderDeleted: isOrderDeleted });
};

async function getTotalPriceForShoppingCartAndManageQuantity(
	shoppingCart,
	connection = null
) {
	let totalPrice = 0;

	const promises = shoppingCart.map((order) => {
		totalPrice += Number(order.total_price);
		ArticlesService.manageStock(
			order.quantity,
			order.article_id,
			"bought",
			connection
		);
	});

	await Promise.all(promises);
	return totalPrice;
}
