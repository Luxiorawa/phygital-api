const MysqlMiddleware = require('./../../bin/Middlewares/Mysql')

exports.getDiscounts = async () => {
    return MysqlMiddleware.selectList(
        `
        SELECT * FROM discounts
        `
    )
}

exports.getDiscount = async (discountId) => {
    return MysqlMiddleware.select(
        `
        SELECT * FROM discounts WHERE discount_id = ?
        `,
        discountId
    )
}

exports.createDiscount = async (discountObject) => {
    return MysqlMiddleware.insert(
        `
        INSERT INTO discounts SET ?
        `,
        discountObject
    )
}

exports.updateDiscount = async (discountObject, discountId) => {
    return MysqlMiddleware.update(
        `
        UPDATE discounts SET ?
        WHERE discount_id = ?
        `,
        [discountObject, discountId]
    )
}

exports.deleteDiscount = async (discountId) => {
    return MysqlMiddleware.delete(
        `
        DELETE FROM discounts
        WHERE discount_id = ?`,
        discountId
    )
}
