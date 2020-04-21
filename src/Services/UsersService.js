const MysqlMiddleware = require('./../../bin/Middlewares/Mysql')

exports.getAllUsers = function () {
    return MysqlMiddleware.selectList(`SELECT * FROM users`)
}

exports.getUser = function (userId) {
    return MysqlMiddleware.select(`SELECT * FROM users WHERE id = ?`, [userId])
}

exports.createUser = function (userObject) {
    return MysqlMiddleware.insert(`INSERT INTO users SET ?`, [userObject])
}

exports.updateUser = function (userObject, userId) {
    return MysqlMiddleware.update(`UPDATE users SET ? WHERE id = ?`, [
        userObject,
        userId,
    ])
}

exports.deleteUser = function (userId) {
    return MysqlMiddleware.delete(`DELETE FROM users WHERE id = ?`, [userId])
}
