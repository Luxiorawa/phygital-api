const express = require('express')
const router = express.Router()
const WebsiteController = require('./../Controllers/WebsiteController')

console.log('Entering Website Routes')
router.get('/', WebsiteController.getWebsiteIndex)

module.exports = router
