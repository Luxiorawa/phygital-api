const SectionsService = require('./../Services/SectionsService')
const { validationResult } = require('express-validator')

exports.getSections = async (req, res) => {
    const sections = await SectionsService.getSections()

    return res.json({ status: 'Success', results: sections })
}

exports.getSection = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const section = await SectionsService.getSection(req.params.section_id)

    return res.json({ status: `Success`, results: section })
}