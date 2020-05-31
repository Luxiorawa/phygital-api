const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.all('*', (req, res, next) => {

    if (req.url.search('auth') > 0 && req.method == 'POST') next()
    else if (req.url.search(`api-docs`) > 0 && req.method == 'GET') next()
    else if (req.url.search('sections') > 0 && req.method == 'GET') next()
    else if (req.url.search('shelves') > 0 && req.method == 'GET') next()
    else {
        let token
        if (req.headers.authorization) {
            token = req.headers.authorization
        }

        jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
            if (err) res.status(500).send('Failed to authenticate token')
            if (decoded) {
                req.session.user = {
                    id: decoded.user.id,
                    username: decoded.user.username,
                }
                console.log(req.session.user)
                next()
            }
        })
    }
})

module.exports = router
