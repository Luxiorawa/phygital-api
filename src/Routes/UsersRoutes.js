const express = require('express')
const router = express.Router()
const UserController = require('./../Controllers/UsersController')
const { body, param } = require('express-validator')

router.get('/', UserController.getUsers)

router.get(
    '/:user_id',
    [param('user_id').isInt().isLength(1)],
    UserController.getUser
)

router.post(
    '/login',
    [
        body('username').optional().isString(),
        body('email').optional().isString(),
        body('password').isString().isLength(1),
    ],
    UserController.login
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
    '/:user_id',
    [
        param('user_id').isInt().isLength(1),
        body('last_name').optional().isString().isLength(1),
        body('first_name').optional().isString().isLength(1),
        body('email').optional().isEmail().isLength(1),
        body('phone_number').optional().isMobilePhone('any').isLength(1),
        body('username').optional().isString().isLength(1),
    ],
    UserController.updateUser
)

router.delete(
    '/:user_id',
    [param('user_id').isInt().isLength(1)],
    UserController.deleteUser
)

module.exports = router
