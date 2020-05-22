const UsersService = require('./../Services/UsersService')
const { validationResult } = require('express-validator')
const { promisify } = require('util')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const qrcode = require('qrcode')
const hash = promisify(bcrypt.hash)

exports.getUsers = async (req, res) => {
    let users = await UsersService.getAllUsers()

    let promises = users.map((user) => delete user.password)
    await Promise.all(promises)

    return res.json({ status: 'Success', results: users })
}

exports.getUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let user = await UsersService.getUser(req.params.user_id)
    delete user.password

    return res.json({ status: 'Success', results: user })
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

    if (match === true) {
        let token = await jwt.sign(
            {
                user: {
                    id: user.user_id,
                    username: user.username,
                },
            },
            process.env.JWT_KEY
        )

        let qrcodeDataURL = await qrcode.toDataURL(token)

        return res.json({
            status: 'Success',
            jwt: token,
            qrcode: qrcodeDataURL,
            user: user,
        })
    } else {
        return res.json({
            status: 'Failed',
            message: 'Username / Email / Password not found',
        })
    }
}

exports.createUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

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

    const userObject = {}

    req.body.last_name ? (userObject.last_name = req.body.last_name) : null
    req.body.first_name ? (userObject.first_name = req.body.first_name) : null
    req.body.email ? (userObject.email = req.body.email) : null
    req.body.phone_number
        ? (userObject.phone_number = req.body.phone_number)
        : null
    req.body.username ? (userObject.username = req.body.username) : null

    const updatedUser = await UsersService.updateUser(
        userObject,
        req.params.user_id
    )

    return res.json({ status: 'Success', updated: updatedUser })
}

exports.deleteUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const deletedUser = await UsersService.deleteUser(req.params.user_id)

    return res.json({ status: 'Success', deletedUserId: deletedUser })
}
