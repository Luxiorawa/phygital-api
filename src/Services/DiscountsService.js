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

exports.validateDiscountForArticle = async (
    discountId,
    articleId,
    quantity
) => {
    let discount = articleId
        ? await selectDiscountInnerJoinArticleId(discountId, articleId)
        : await selectDiscountInnerJoinCategoryId(discountId, articleId)

    if (discount) {
        let errorMessage = ''

        if (
            discount.minimum_value &&
            discount.price * quantity < discount.minimum_value
        ) {
            errorMessage += `Minimum value of the discount is ${
                discount.minimum_value
            }, and you bought ${discount.price * quantity}`
        }

        if (discount.minimum_quantity && quantity < discount.minimum_quantity) {
            errorMessage += `Minimum quantity of the discount is ${discount.minimum_quantity} and you bought a quantity of ${quantity}`
        }

        if (errorMessage) {
            throw new Error(errorMessage)
        }

        return true
    } else {
        return false
    }
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

async function selectDiscountInnerJoinArticleId(discountId, articleId) {
    return MysqlMiddleware.select(
        `
        SELECT * FROM discounts d
        INNER JOIN articles a
        ON d.article_id = a.article_id
        WHERE d.discount_id = ?
        AND d.article_id = ?`,
        [discountId, articleId]
    )
}

async function selectDiscountInnerJoinCategoryId(discountId, articleId) {
    return MysqlMiddleware.select(
        `
        SELECT * FROM discounts d
        INNER JOIN categories c
        ON d.category_id = c.category_id
        INNER JOIN articles a
        ON a.category_id = c.category_id
        WHERE d.discount_id = ?
        AND a.article_id = ?`,
        [discountId, articleId]
    )
}
