const ArticlesService = require('./../Services/ArticlesService')
const DiscountsService = require('./../Services/DiscountsService')
const OrdersService = require('./../Services/OrdersService')
const { validationResult } = require('express-validator')
const MysqlMiddleware = require('./../../bin/Middlewares/Mysql')

exports.getArticles = async (req, res) => {
    const articles = await ArticlesService.getArticles()

    return res.json({ status: 'Success', results: articles })
}

exports.getArticle = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const article = await ArticlesService.getArticle(req.params.article_id)

    return res.json({ status: `Success`, results: article })
}

exports.getArticlesByShelfId = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const articles = await ArticlesService.getArticlesByShelfId(req.body.shelf_id)

    return res.json({ status: `Success`, results: articles })
}

exports.addToShoppingCart = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let connection = await MysqlMiddleware.getConnection()

    try {
        let discountId = req.body.discount_id
        let shoppingCartId = await GetOrCreateUserShoppingCartId(
            req.session.user.id
        )

        let validDiscount
        if (discountId) {
            validDiscount = await DiscountsService.validateDiscountForArticle(
                discountId,
                req.body.article_id,
                req.body.quantity
            )
        }

        await connection.beginTransaction()

        await ArticlesService.manageStock(req.body.quantity, req.body.article_id, 'reserved', connection)

            let alreadyOrdered =
            OrdersService.fixQuantityIfArticleAlreadyOrdered(
                req.session.user.id,
                req.body.article_id,
                req.body.quantity,
                discountId,
                connection
            )

        if (alreadyOrdered === true) {
            // Recheck promo et valeur finale (price)

            await connection.commit()

            return res.json({
                status: `Success`,
                message: `Updated quantity for article_id ${req.body.article_id}`,
            })
        }

        let orderObject = {
            shopping_cart_id: shoppingCartId,
            article_id: req.body.article_id,
            user_id: req.session.user.id,
            state: 'CREATED',
            price: await ArticlesService.getArticlePrice(req.body.article_id),
            quantity: req.body.quantity,
        }

        validDiscount ? (orderObject.discount_id = discountId) : null

        const orderId = await OrdersService.createOrder(orderObject, connection)

        await connection.commit()
        return res.json({ status: `Success`, createdId: orderId })
    } catch (error) {
        if (connection) {
            await connection.rollback()
        }

        return res
            .status(422)
            .json({ status: `Failed`, message: error.message })
    } finally {
        if (connection) {
            await connection.release()
        }
    }
}

exports.createArticle = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const articleObject = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        picture: req.body.picture,
    }

    req.body.shelf_id ? (articleObject.shelf_id = req.body.shelf_id) : null
    req.body.quantity_stock
        ? (articleObject.quantity_stock = req.body.quantity_stock)
        : null
    req.body.quantity_reserved
        ? (articleObject.quantity_reserved = req.body.quantity_reserved)
        : null
    req.body.quantity_bought
        ? (articleObject.quantity_bought = req.body.quantity_bought)
        : null

    const insertedArticleId = await ArticlesService.createArticle(articleObject)

    return res.json({ status: `Success`, insertedArticleId: insertedArticleId })
}

exports.manageStock = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        const stockType = req.body.stock_type ? req.body.stock_type : 'stock'

        const updatedStock = await ArticlesService.manageStock(
            req.body.quantity,
            req.params.article_id,
            stockType
        )

        return res.json({ status: 'Success', isStockUpdated: updatedStock })
    }
    catch(error) {
        return res.json({ status: 'Failed', error: error.message })
    }
}

exports.updateArticle = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const articleObject = {}

    req.body.category_id ? (articleObject.category_id = req.body.category_id) : null
    req.body.shelf_id ? (articleObject.shelf_id = req.body.shelf_id) : null
    req.body.name ? (articleObject.name = req.body.name) : null
    req.body.price ? (articleObject.price = req.body.price) : null
    req.body.description ? (articleObject.description = req.body.description) : null
    req.body.picture ? (articleObject.picture = req.body.picture) : null

    const updatedArticle = await ArticlesService.updateArticle(
        articleObject,
        req.params.article_id
    )

    return res.json({ status: 'Success', isArticleUpdated: updatedArticle })
}

exports.deleteArticle = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const deletedArticle = await ArticlesService.deleteArticle(
        req.params.article_id
    )

    return res.json({ status: 'Success', isArticleDeleted: deletedArticle })
}

async function GetOrCreateUserShoppingCartId(userId) {
    // Check if the user already have a shopping cart associated
    let query = await OrdersService.getShoppingCartId(userId)

    if (!query['MAX(shopping_cart_id)']) {
        return await OrdersService.getLastShoppingCartId()
    } else {
        return query['MAX(shopping_cart_id)']
    }
}
