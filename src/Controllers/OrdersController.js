const OrdersService = require('./../Services/OrdersService')
const { validationResult } = require('express-validator')

exports.getOrders = async (req, res) => {
    const orders = await OrdersService.getOrders()

    return res.json({ status: 'Success', results: orders })
}

exports.getOrder = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const order = await OrdersService.getOrder(req.params.orderId)

    return res.json({ status: 'Success', results: order })
}

exports.getOrdersByUserId = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const orders = await OrdersService.getOrdersByUserId(req.body.userId)

    return res.json({ status: 'Success', results: orders })
}

exports.createOrder = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const orderObject = {
        user_id: req.body.userId,
        state: req.body.state,
        price: req.body.price,
    }

    const orderCreatedId = await OrdersService.createOrder(orderObject)

    return res.json({ status: 'Success', results: orderCreatedId })
}

exports.pay = async (req, res) => {
    throw Error('Not implemented')
}

exports.updateOrder = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const orderObject = {}
    req.body.state ? (orderObject.state = req.body.state) : null
    req.body.price ? (orderObject.price = req.body.price) : null

    const orderIdUpdated = await OrdersService.updateOrder(
        orderObject,
        req.param.orderId
    )

    return res.json({ status: 'Success', results: orderIdUpdated })
}

exports.deleteOrder = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const deletedOrder = await OrdersService.deleteOrder(req.params.orderId)

    return res.json({ status: 'Success', deletedOrderId: deletedOrder })
}
