const express = require('express')
const router = express.Router()
const ArticlesController = require('./../Controllers/ArticlesController')
const { body, param } = require('express-validator')

router.get('/', ArticlesController.getArticles)

router.get(
    '/:article_id',
    [param('article_id').isInt().isLength(1)],
    ArticlesController.getArticle
)

router.post(
    '/addToShoppingCart',
    [
        body('article_id').isInt().isLength(1),
        body('quantity').isInt().isLength(1),
    ],
    ArticlesController.addToShoppingCart
)

router.post(
    '/',
    [
        body('name').isString().isLength(1),
        body('price').isDecimal(),
        body('description').isString().isLength(1),
        body('picture').optional().isString().isLength(1),
        body('shelf_id').optional().isInt(),
        body('quantity_stock').optional().isInt(),
        body('quantity_reserved').optional().isInt(),
        body('quantity_bought').optional().isInt(),
    ],
    ArticlesController.createArticle
)

router.post(
    '/manageStock/:article_id',
    [
        param('article_id').isInt().isLength(1),
        body('quantity').isInt(),
        body('stock_type').optional().isString().isLength(1),
    ],
    ArticlesController.manageStock
)

router.put(
    '/:article_id',
    [
        param('article_id').isInt().isLength(1),
        body('name').optional().isString().isLength(1),
        body('price').optional().isDecimal(),
        body('description').optional().isString().isLength(1),
        body('picture').optional().isString().isLength(1),
        body('shelf_id').optional().isInt(),
        body('quantity_stock').optional().isInt(),
        body('quantity_reserved').optional().isInt(),
        body('quantity_bought').optional().isInt(),
    ],
    ArticlesController.updateArticle
)

router.delete(
    '/:article_id',
    [param('article_id').isInt().isLength(1)],
    ArticlesController.deleteArticle
)

module.exports = router
