const MysqlMiddleware = require('../../bin/Middlewares/Mysql')

exports.getOrders = () => {
    return MysqlMiddleware.selectList(`SELECT * FROM orders`)
}

exports.getOrder = (orderId) => {
    return MysqlMiddleware.select(`SELECT * FROM orders WHERE order_id = ?`, [
        orderId,
    ])
}

exports.getOrdersByUserId = (userId) => {
    return MysqlMiddleware.selectList(
        `SELECT * FROM orders WHERE user_id = ?`,
        [userId]
    )
}

exports.getOrdersHistory = (userId) => {
    return MysqlMiddleware.selectList(
        `SELECT * FROM orders WHERE user_id = ? AND state = 'COMPLETED'`,
        userId
    )
}

exports.getCurrentShoppingCartForUser = (userId) => {
    return MysqlMiddleware.selectList(
        `
        SELECT * FROM orders
        WHERE user_id = ?
        AND state = 'CREATED'
        `,
        [userId]
    )
}

exports.getShoppingCartId = (userId) => {
    return MysqlMiddleware.select(
        `SELECT MAX(shopping_cart_id) FROM orders WHERE user_id = ? AND state = 'CREATED'`,
        [userId]
    )
}

exports.getLastShoppingCartId = async () => {
    const lastShoppingCartId = await MysqlMiddleware.select(
        `SELECT MAX(shopping_cart_id) FROM orders`
    )

    if (lastShoppingCartId) {
        return lastShoppingCartId['MAX(shopping_cart_id)'] + 1
    } else {
        return 1
    }
}

exports.fixQuantityIfArticleAlreadyOrdered = async (
    userId,
    articleId,
    quantityRequested,
    discountId = null,
    connection = null
) => {
    try {
        let query = await MysqlMiddleware.select(
            `SELECT order_id, quantity FROM orders WHERE user_id = ? AND article_id = ? AND state = 'CREATED'`,
            [userId, articleId]
        )

        let quantity = query && query.quantity ? query.quantity : undefined

        if (quantity) {
            // Fix quantity
            let realQuantity = parseInt(quantity) + parseInt(quantityRequested)
            let orderObject = {
                quantity: realQuantity,
            }

            discountId ? (orderObject.discount_id = discountId) : null

            await this.updateOrder(orderObject, query.order_id, connection)
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error(error)
    }
}

exports.getShoppingCart = (userId, status = 'CREATED') => {
    return MysqlMiddleware.selectList(
        `SELECT * FROM orders WHERE user_id = ? AND state = ?`,
        [userId, status]
    )
}
exports.createOrder = async (orderObject, connection = null) => {
    return connection === null
        ? await MysqlMiddleware.insert(`INSERT INTO orders SET ?`, [
              orderObject,
          ])
        : await MysqlMiddleware.insert(
              `INSERT INTO orders SET ?`,
              [orderObject],
              connection,
              false
          )
}

exports.updateOrder = async (orderObject, orderId, connection = null) => {
    return connection === null
        ? await MysqlMiddleware.update(
              `UPDATE orders SET ? WHERE order_id = ?`,
              [orderObject, orderId]
          )
        : await MysqlMiddleware.update(
              `UPDATE orders SET ? WHERE order_id = ?`,
              [orderObject, orderId],
              connection,
              false
          )
}

exports.updateOrderStateByShoppingCartId = async (
    shoppingCartId,
    connection = null
) => {
    return connection === null
        ? await MysqlMiddleware.update(
              `UPDATE orders SET state = 'COMPLETED' WHERE shopping_cart_id = ?`,
              [shoppingCartId]
          )
        : await MysqlMiddleware.update(
              `UPDATE orders SET state = 'COMPLETED' WHERE shopping_cart_id = ?`,
              [shoppingCartId],
              connection,
              false
          )
}

exports.deleteOrder = (orderId) => {
    return MysqlMiddleware.delete(`DELETE articles WHERE order_id = ?`, [
        orderId,
    ])
}
