const express = require('express')
const router = express.Router()
const ShelvesController = require('./../Controllers/ShelvesController')
const { param } = require('express-validator')

router.get('/', ShelvesController.getShelves)

router.get(
    '/:shelf_id',
    [param('shelf_id').isInt().isLength(1)],
    ShelvesController.getShelf
)

module.exports = router
