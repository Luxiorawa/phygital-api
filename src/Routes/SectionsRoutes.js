const express = require('express')
const router = express.Router()
const SectionsController = require('./../Controllers/SectionsController')
const { param } = require('express-validator')

router.get('/', SectionsController.getSections)

router.get(
    '/:section_id',
    [param('section_id').isInt().isLength(1)],
    SectionsController.getSection
)

module.exports = router
