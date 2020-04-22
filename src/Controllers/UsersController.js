const UsersService = require('./../Services/UsersService')
const { validationResult } = require('express-validator')
const { promisify } = require('util')
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

    const hash = promisify(bcrypt.hash)
    let passwordHashed = await hash(req.body.password, 12)

    const userObject = {
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        username: req.body.username,
        password: passwordHashed,
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

exports.login = async (req, res) => {
    const errors = validationResult(req)
    let match

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const user = req.body.email
        ? await UsersService.getUserByEmail(req.body.email)
        : await UsersService.getUserByUsername(req.body.username)

    if (user) {
        match = await bcrypt.compare(req.body.password, user.password)
        delete user.password
    }

    return match === true
        ? res.json({ status: 'Success', user: user })
        : res.json({
              status: 'Failed',
              message: 'Username / Email / Password not found',
          })
}
