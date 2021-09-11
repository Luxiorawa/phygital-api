const MysqlMiddleware = require("../../bin/Middlewares/Mysql");

exports.getArticles = () => {
	return MysqlMiddleware.selectList(`SELECT * FROM articles`);
};

exports.getArticle = (articleId) => {
	return MysqlMiddleware.select(
		`SELECT * FROM articles WHERE article_id = ?`,
		[articleId]
	);
};

exports.getArticlesByShelfId = (shelf_id) => {
	return MysqlMiddleware.selectList(
		`
        SELECT * FROM articles WHERE shelf_id = ?
        `,
		shelf_id
	);
};

exports.getArticlePrice = async (articleId) => {
	let query = await MysqlMiddleware.select(
		`SELECT price FROM articles WHERE article_id = ?`,
		articleId
	);

	return query.price;
};

exports.createArticle = (articleObject) => {
	return MysqlMiddleware.insert(`INSERT INTO articles SET ?`, [
		articleObject
	]);
};

exports.updateArticle = (articleObject, articleId) => {
	return MysqlMiddleware.update(
		`UPDATE articles SET ? WHERE article_id = ?`,
		[articleObject, articleId]
	);
};

exports.deleteArticle = (articleId) => {
	return MysqlMiddleware.delete(`DELETE FROM articles WHERE article_id = ?`, [
		articleId
	]);
};

exports.manageStock = async (
	quantity,
	articleId,
	stockType,
	connection = null
) => {
	if (
		stockType === "stock" ||
		stockType === "reserved" ||
		stockType === "bought"
	) {
		if (quantity !== 0) {
			if (stockType === "stock") {
				// Only add quantity to stock
				return connection === null
					? await MysqlMiddleware.update(
							`UPDATE articles SET quantity_stock = quantity_stock + ? WHERE article_id = ?`,
							[quantity, articleId]
					  )
					: await MysqlMiddleware.update(
							`UPDATE articles SET quantity_stock = quantity_stock + ? WHERE article_id = ?`,
							[quantity, articleId],
							connection,
							false
					  );
			} else if (stockType === "reserved") {
				let query = await MysqlMiddleware.select(
					`SELECT quantity_stock FROM articles WHERE article_id = ?`,
					articleId
				);

				if (query) {
					if (query.quantity_stock - quantity < 0 === true) {
						throw new Error(
							`Negative quantity_stock for articleId ${articleId} of ${
								query.quantity_stock - quantity
							}`
						);
					} else {
						// Substract from stock and add to reserved
						return connection === null
							? await MysqlMiddleware.update(
									`UPDATE articles
                        SET quantity_stock = quantity_stock - ?,
                        quantity_reserved = quantity_reserved + ? WHERE article_id = ?`,
									[quantity, quantity, articleId]
							  )
							: await MysqlMiddleware.update(
									`UPDATE articles
                        SET quantity_stock = quantity_stock - ?,
                        quantity_reserved = quantity_reserved + ? WHERE article_id = ?`,
									[quantity, quantity, articleId],
									connection,
									false
							  );
					}
				} else {
					throw new Error("Article not found");
				}
			} else if (stockType === "bought") {
				let query = await MysqlMiddleware.select(
					`SELECT quantity_reserved FROM articles WHERE article_id = ?`,
					articleId
				);
				if (query) {
					if (query.quantity_reserved - quantity < 0 === true) {
						throw new Error(
							`Negative quantity_reserved for articleId ${articleId} of ${
								query.quantity_reserved - quantity
							}`
						);
					}
					// Substract from reserved and add to bought
					return connection === null
						? await MysqlMiddleware.update(
								`UPDATE articles
                           SET quantity_reserved = quantity_reserved - ?,
                           quantity_bought = quantity_bought + ? WHERE article_id = ?`,
								[quantity, quantity, articleId]
						  )
						: await MysqlMiddleware.update(
								`UPDATE articles
                           SET quantity_reserved = quantity_reserved - ?,
                           quantity_bought = quantity_bought + ? WHERE article_id = ?`,
								[quantity, quantity, articleId],
								connection,
								false
						  );
				} else {
					throw new Error("Article not found");
				}
			}
		} else {
			throw new Error("Quantity equal 0");
		}
	} else {
		throw new Error("stockType not found");
	}
};
