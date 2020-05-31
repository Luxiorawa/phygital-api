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

    if (!errors.isEmpty() || (req.body.discount_type != 'flat' && req.body.discount_type != 'percentage') || (!req.body.category_id && !req.body.article_id)) {
        return (!errors.isEmpty()
            ? res.status(422).json({ status: 'Failed', errors: errors.array() })
            : res.status(422).json({ status: 'Failed', errors: "missing a category_id or article_id" }))
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

    const insertedDiscountId = await DiscountsService.createDiscount(
        discountObject
    )

    return res.json({ status: `Success`, insertedDiscountId: insertedDiscountId })
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

    const isDiscountUpdated = await DiscountsService.updateDiscount(
        discountObject,
        req.params.discount_id
    )

    return res.json({ status: 'Success', isDiscountUpdated: isDiscountUpdated })
}

exports.deleteDiscount = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let isDiscountDeleted = await DiscountsService.deleteDiscount(
        req.params.discount_id
    )

    if(isDiscountDeleted) {
        return res.json({ status: 'Success', isDiscountDeleted: isDiscountDeleted })
    }
    else {
        return res.json({ status: 'Failed', message: "No discount were deleted (ID not found)" })
    }
}
