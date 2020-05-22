const DiscountsService = require('./../Services/DiscountsService')
const { validationResult } = require('express-validator')

exports.getDiscounts = async (req, res) => {
    const discounts = await DiscountsService.getDiscounts()

    return res.json({ status: 'Success', results: discounts })
}

exports.getDiscount = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const discount = await DiscountsService.getDiscount(req.params.discount_id)

    return res.json({ status: 'Success', results: discount })
}

exports.createDiscount = async (req, res) => {
    const errors = validationResult(req)

    if (
        !errors.isEmpty() ||
        req.body.discount_type != 'flat' ||
        req.body.discount_type != 'percentage' ||
        (!req.body.category_id && !req.body.article_id)
    ) {
        return res.status(422).json({ errors: errors.array() })
    }

    let discountObject = {
        value: req.body.value,
        discount_type: req.body.discount_type,
    }

    req.body.category_id
        ? (discountObject.category_id = req.body.category_id)
        : null
    req.body.article_id
        ? (discountObject.article_id = req.body.article_id)
        : null
    req.body.minimum_quantity
        ? (discountObject.minimum_quantity = req.body.minimum_quantity)
        : null
    req.body.minimum_value
        ? (discountObject.minimum_value = req.body.minimum_value)
        : null

    const createdDiscountId = await DiscountsService.createDiscount(
        discountObject
    )

    return res.json({ status: `Success`, createdId: createdDiscountId })
}

exports.updateDiscount = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let discountObject = {}

    req.body.value ? (discountObject.value = req.body.value) : null

    req.body.discount_type &&
    (req.body.discount_type == 'flat' || req.body.discount_type == 'percentage')
        ? (discountObject.discount_type = req.body.discount_type)
        : null

    req.body.category_id
        ? (discountObject.category_id = req.body.category_id)
        : null
    req.body.article_id
        ? (discountObject.article_id = req.body.article_id)
        : null
    req.body.minimum_quantity
        ? (discountObject.minimum_quantity = req.body.minimum_quantity)
        : null
    req.body.minimum_value
        ? (discountObject.minimum_value = req.body.minimum_value)
        : null

    const updatedDiscount = await DiscountsService.updateDiscount(
        discountObject,
        req.params.discount_id
    )

    return res.json({ status: 'Success', updated: updatedDiscount })
}

exports.deleteDiscount = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let deletedDiscount = await DiscountsService.deleteDiscount(
        req.param.discount_id
    )

    return res.json({ status: 'Success', deletedDiscount: deletedDiscount })
}
