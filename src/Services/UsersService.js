const MysqlMiddleware = require('./../../bin/Middlewares/Mysql')

exports.getAllUsers = () => {
    return MysqlMiddleware.selectList(`SELECT * FROM users`)
}

exports.getUser = (userId) => {
    return MysqlMiddleware.select(`SELECT * FROM users WHERE id = ?`, [userId])
}

exports.createUser = (userObject) => {
    return MysqlMiddleware.insert(`INSERT INTO users SET ?`, [userObject])
}

exports.updateUser = (userObject, userId) => {
    return MysqlMiddleware.update(`UPDATE users SET ? WHERE id = ?`, [
        userObject,
        userId,
    ])
}

exports.deleteUser = (userId) => {
    return MysqlMiddleware.delete(`DELETE FROM users WHERE id = ?`, [userId])
}

exports.getUserByEmail = (email) => {
    return MysqlMiddleware.select(`SELECT * FROM users where email = ?`, [
        email,
    ])
}

exports.getUserByUsername = (username) => {
    return MysqlMiddleware.select(`SELECT * FROM users WHERE username = ?`, [
        username,
    ])
}
