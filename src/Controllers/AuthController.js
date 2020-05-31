const UsersService = require('./../Services/UsersService')
const { validationResult } = require('express-validator')
const { promisify } = require('util')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const qrcode = require('qrcode')
const hash = promisify(bcrypt.hash)

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

exports.register = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    // Check en BDD si l'email est déjà pris
    const isEmailAvailable = await UsersService.checkEmailAvailability(req.body.email);
    console.log(isEmailAvailable)

    if(isEmailAvailable) {
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
    else {
        return res.json({ status: 'Failed', message: "Email is already taken" })
    }

}