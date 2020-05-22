const express = require('express')
const router = express.Router()
const CategoriesController = require('./../Controllers/ArticlesController')
const { body, param } = require('express-validator')

router.get('/', CategoriesController.getCategories)

router.get(
    '/:category_id',
    [param('category_id').isInt().isLength(1)],
    CategoriesController.getCategory
)

router.post(
    '/',
    [body('name').isString().isLength(1), body('image_url').optional().isURL()],
    CategoriesController.createCategory
)

router.put(
    '/:category_id',
    [
        param('category_id').isInt().isLength(1),
        body('name').optional().isString().isLength(1),
    ],
    CategoriesController.updateCategory
)

router.delete(
    '/:category_id',
    [param('category_id').isInt().isLength(1)],
    CategoriesController.deleteCategory
)

module.exports = router
