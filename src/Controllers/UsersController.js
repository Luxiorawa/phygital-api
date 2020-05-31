const UsersService = require('./../Services/UsersService')
const { validationResult } = require('express-validator')
const { promisify } = require('util')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const qrcode = require('qrcode')
const hash = promisify(bcrypt.hash)

exports.getUsers = async (req, res) => {
    let users = await UsersService.getAllUsers()

    if(users) {
        let promises = users.map((user) => delete user.password)
        await Promise.all(promises)
    }


    return res.json({ status: 'Success', results: users })
}

exports.getUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let user = await UsersService.getUser(req.params.user_id)

    user && user.password ? delete user.password : null

    return res.json({ status: 'Success', results: user })
}

exports.updateUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const userObject = {}

    req.body.last_name ? (userObject.last_name = req.body.last_name) : null
    req.body.first_name ? (userObject.first_name = req.body.first_name) : null
    req.body.email ? (userObject.email = req.body.email) : null
    req.body.phone_number
        ? (userObject.phone_number = req.body.phone_number)
        : null
    req.body.username ? (userObject.username = req.body.username) : null

    const isUserUpdated = await UsersService.updateUser(
        userObject,
        req.params.user_id
    )

    return res.json({ status: 'Success', isUserUpdated: isUserUpdated })
}

exports.deleteUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const isUserDeleted = await UsersService.deleteUser(req.params.user_id)

    return res.json({ status: 'Success', isUserDeleted: isUserDeleted })
}
