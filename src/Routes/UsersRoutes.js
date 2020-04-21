const express = require('express')
const router = express.Router()
const UserController = require('./../Controllers/UsersController')
const { body, param } = require('express-validator')

router.get('/', UserController.getUsers)

router.get(
    '/:userId',
    [param('userId').isInt().isLength(1)],
    UserController.getUser
)

router.post(
    '/',
    [
        body('last_name').isString().isLength(1),
        body('first_name').isString().isLength(1),
        body('email').isString().isLength(1),
        body('phone_number').isString().isLength(1),
        body('username').isString().isLength(1),
        body('password').isString().isLength(1),
    ],
    UserController.createUser
)

router.put(
    '/:userId',
    [
        param('userId').isInt().isLength(1),
        body('username').optional().isString().isLength(1),
    ],
    UserController.updateUser
)

router.delete(
    '/:userId',
    [param('userId').isInt().isLength(1)],
    UserController.deleteUser
)

module.exports = router
