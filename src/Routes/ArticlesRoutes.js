const express = require('express')
const router = express.Router()
const ArticlesController = require('./../Controllers/ArticlesController')
const { body, param } = require('express-validator')

router.get('/', ArticlesController.getArticles)

router.get(
    '/:articleId',
    [param('articleId').isInt().isLength(1)],
    ArticlesController.getArticle
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
    '/manageStock/:articleId',
    [
        param('articleId').isInt().isLength(1),
        body('quantity').isInt(),
        body('stockType').optional().isString().isLength(1),
    ],
    ArticlesController.manageStock
)

router.put(
    '/:articleId',
    [
        param('articleId').isInt().isLength(1),
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
    '/:articleId',
    [param('articleId').isInt().isLength(1)],
    ArticlesController.deleteArticle
)

module.exports = router
