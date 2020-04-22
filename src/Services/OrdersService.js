const MysqlMiddleware = require('../../bin/Middlewares/Mysql')

exports.getOrders = () => {
    return MysqlMiddleware.selectList(`SELECT * FROM orders`)
}

exports.getOrder = (orderId) => {
    return MysqlMiddleware.select(`SELECT * FROM orders WHERE id = ?`, [
        orderId,
    ])
}

exports.getOrdersByUserId = (userId) => {
    return MysqlMiddleware.selectList(
        `SELECT * FROM orders WHERE user_id = ?`,
        [userId]
    )
}

exports.createOrder = (orderObject) => {
    return MysqlMiddleware.insert(`INSERT INTO orders SET ? `, [orderObject])
}

exports.updateOrder = (orderObject, orderId) => {
    return MysqlMiddleware.update(`UPDATE orders SET ? WHERE order_id = ?`, [
        orderObject,
        orderId,
    ])
}

exports.deleteOrder = (orderId) => {
    return MysqlMiddleware.delete(`DELETE articles WHERE order_id = ?`, [
        orderId,
    ])
}
