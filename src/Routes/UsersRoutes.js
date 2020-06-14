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
    '/refreshQRCode',
    UserController.refreshQRCode
)


router.put(
    '/isInShop',
    [
        body('is_in_shop').isInt()
    ],
    UserController.isInShop
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
