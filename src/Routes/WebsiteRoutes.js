const express = require('express')
const router = express.Router()
const WebsiteController = require('./../Controllers/WebsiteController')

router.get('/', WebsiteController.getWebsiteIndex)

router.get('/doc', WebsiteController.getDocs)

module.exports = router
