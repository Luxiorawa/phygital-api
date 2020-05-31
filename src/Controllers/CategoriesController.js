const CategoriesService = require('./../Services/CategoriesService')
const { validationResult } = require('express-validator')

exports.getCategories = async (req, res) => {
    const categories = await CategoriesService.getCategories()

    return res.json({ status: 'Success', results: categories })
}

exports.getCategory = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const category = await CategoriesService.getCategory(req.params.category_id)

    return res.json({ status: 'Success', results: category })
}

exports.createCategory = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const categoryObject = {
        name: req.body.name,
    }

    req.body.image_url ? (categoryObject.image_url = req.body.image_url) : null

    const insertedCategoryId = await CategoriesService.createCategory(
        categoryObject
    )

    return res.json({ status: `Success`, insertedCategoryId: insertedCategoryId })
}

exports.updateCategory = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const categoryObject = {}
    req.body.name ? (categoryObject.name = req.body.name) : null
    req.body.image_url ? (categoryObject.image_url = req.body.image_url) : null

    const isCategoryUpdated = await CategoriesService.updateCategory(
        categoryObject,
        req.params.category_id
    )

    return res.json({ status: 'Success', isCategoryUpdated: isCategoryUpdated })
}

exports.deleteCategory = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const isCategoryDeleted = await CategoriesService.deleteCategory(
        req.params.category_id
    )

    return res.json({ status: 'Success', isCategoryDeleted: isCategoryDeleted })
}
