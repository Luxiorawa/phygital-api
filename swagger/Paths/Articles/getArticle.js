module.exports = {
	get: {
		tags: ["Articles"],
		description: "Retourne un article selon son ID",
		operationId: "getArticle",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Détail d'un article",
				content: {
					"application/json": {
						examples: {
							Exemple: {
								value: {
									status: "Success",
									results: {
										article_id: 1,
										category_id: 5,
										shelf_id: 7,
										name: "Iphone X",
										price: "800.99",
										description:
											"Téléphone dernier cri par Apple",
										picture: null,
										quantity_stock: 50,
										quantity_reserved: 1,
										quantity_bought: 752
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
