const express = require('express')
const router = express.Router()
const OrdersController = require('./../Controllers/OrdersController')
const { body, param } = require('express-validator')

router.get('/', OrdersController.getOrders)

router.get(
    '/:orderId',
    [param('orderId').isInt().isLength(1)],
    OrdersController.getOrder
)

router.get(
    '/getByUserId',
    [body('userId').isInt().isLength(1)],
    OrdersController.getOrdersByUserId
)

router.post(
    '/',
    [
        body('userId').isInt(),
        body('state').isString().isLength(1),
        body('price').isDecimal(),
    ],
    OrdersController.createOrder
)

router.post('/pay', [body('userId').isInt()], OrdersController.pay)

router.put(
    '/:orderId',
    [
        body('state').optional().isString().isLength(1),
        body('price').optional().isDecimal(),
    ],
    OrdersController.updateOrder
)

router.delete(
    '/:articleId',
    [param('articleId').isInt().isLength(1)],
    OrdersController.deleteOrder
)

module.exports = router
