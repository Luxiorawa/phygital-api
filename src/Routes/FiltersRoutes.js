const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.all('*', (req, res, next) => {
    if (req.url == '/users/login' && req.method == 'POST') {
        next()
    } else {
        let token
        if (req.headers.authorization) {
            token = req.headers.authorization
        }
        console.log(token)

        jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
            if (err) res.status(500).send('Failed to authenticate token')
            if (decoded) {
                req.session.user = {
                    id: decoded.user.id,
                    username: decoded.user.username,
                }
                next()
            }
        })
    }
})

module.exports = router
