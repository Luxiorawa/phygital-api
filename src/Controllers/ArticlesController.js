const ArticlesService = require('./../Services/ArticlesService')
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

exports.addToShoppingCart = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let connection = await MysqlMiddleware.getConnection()

    try {
        let shoppingCartId = await GetOrCreateUserShoppingCartId(
            req.session.user.id
        )

        await connection.beginTransaction()

        let [, alreadyOrdered] = await new Promise.all([
            ArticlesService.manageStock(
                req.body.quantity,
                req.body.article_id,
                'reserved',
                connection
            ),
            OrdersService.fixQuantityIfArticleAlreadyOrdered(
                req.session.user.id,
                req.body.article_id,
                req.body.quantity,
                connection
            ),
        ])

        if (alreadyOrdered === true) {
            // Recheck promo et valeur finale (price)

            await connection.commit()

            return res.json({
                status: `Success`,
                message: `Updated quantity for article_id ${req.body.article_id}`,
            })
        }

        const orderObject = {
            shopping_cart_id: shoppingCartId,
            article_id: req.body.article_id,
            user_id: req.session.user.id,
            state: 'CREATED',
            price: await ArticlesService.getArticlePrice(req.body.article_id),
            quantity: req.body.quantity,
        }

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

    const createdArticleId = await ArticlesService.createArticle(articleObject)

    return res.json({ status: `Success`, createdId: createdArticleId })
}

exports.manageStock = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const stockType = req.body.stock_type ? req.body.stock_type : 'stock'

    const updatedStock = await ArticlesService.manageStock(
        req.body.quantity,
        req.param.article_id,
        stockType
    )

    return res.json({ status: 'Success', updatedId: updatedStock })
}

exports.updateArticle = async (req, res) => {
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

    const updatedArticle = await ArticlesService.updateArticle(
        articleObject,
        req.params.article_id
    )

    return res.json({ status: 'Success', updated: updatedArticle })
}

exports.deleteArticle = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const deletedArticle = await ArticlesService.deleteArticle(
        req.params.article_id
    )

    return res.json({ status: 'Success', deletedArticleId: deletedArticle })
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
