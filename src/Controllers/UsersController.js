const UsersService = require('./../Services/UsersService')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

exports.getUsers = async (req, res) => {
    const users = await UsersService.getAllUsers()

    return res.json({ status: 'Success', results: users })
}

exports.getUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const user = await UsersService.getUser(req.params.userId)

    return res.json({ status: 'Success', results: user })
}

exports.createUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const userObject = {
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        username: req.body.username,
        password: req.body.password,
        creation_date: new Date(),
    }

    const createdUser = await UsersService.createUser(userObject)

    return res.json({ status: 'Success', createdUserId: createdUser })
}

exports.updateUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const userObject = {
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        username: req.body.username,
        password: req.body.password,
    }

    const updatedUser = await UsersService.updateUser(
        userObject,
        req.params.userId
    )

    return res.json({ status: 'Success', updated: updatedUser })
}

exports.deleteUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const deletedUser = await UsersService.deleteUser(req.params.userId)

    return res.json({ status: 'Success', deletedUserId: deletedUser })
}
