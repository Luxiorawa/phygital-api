const MysqlMiddleware = require('../../bin/Middlewares/Mysql')

exports.getArticles = () => {
    return MysqlMiddleware.selectList(`SELECT * FROM articles`)
}

exports.getArticle = (articleId) => {
    return MysqlMiddleware.select(
        `SELECT * FROM articles WHERE article_id = ?`,
        [articleId]
    )
}

exports.createArticle = (articleObject) => {
    return MysqlMiddleware.insert(`INSERT INTO articles SET ?`, [articleObject])
}

exports.updateArticle = (articleObject, articleId) => {
    return MysqlMiddleware.update(
        `UPDATE articles SET ? WHERE article_id = ?`,
        [articleObject, articleId]
    )
}

exports.deleteArticle = (articleId) => {
    return MysqlMiddleware.delete(`DELETE FROM articles WHERE article_id = ?`, [
        articleId,
    ])
}

exports.manageStock = (quantity, articleId, stockType) => {
    if (
        stockType === 'stock' ||
        stockType === 'reserved' ||
        stockType === 'bought'
    ) {
        if (quantity !== 0) {
            return MysqlMiddleware.update(
                `UPDATE FROM articles SET quantity_${stockType} = quantity_${stockType} + ? WHERE article_id = ?`,
                [quantity, articleId]
            )
        } else {
            throw new Error('Quantity equal 0')
        }
    } else {
        throw new Error('stockType not found')
    }
}
