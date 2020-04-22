const ArticlesService = require('./../Services/ArticlesService')
const { validationResult } = require('express-validator')

exports.getArticles = async (req, res) => {
    const articles = await ArticlesService.getArticles()

    return res.json({ status: 'Success', results: articles })
}

exports.getArticle = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const article = await ArticlesService.getArticle(req.params.articleId)

    return res.json({ status: `Success`, results: article })
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

    const stockType = req.body.stockType ? req.body.stockType : 'stock'

    const updatedStock = await ArticlesService.manageStock(
        req.body.quantity,
        req.param.articleId,
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
        req.params.articleId
    )

    return res.json({ status: 'Success', updated: updatedArticle })
}

exports.deleteArticle = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const deletedArticle = await ArticlesService.deleteArticle(
        req.params.articleId
    )

    return res.json({ status: 'Success', deletedArticleId: deletedArticle })
}
