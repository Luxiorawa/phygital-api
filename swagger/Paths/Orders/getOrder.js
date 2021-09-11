module.exports = {
	get: {
		tags: ["Orders"],
		description: "Retourne une commande selon son ID",
		operationId: "getOrder",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Détail d'une commande",
				content: {
					"application/json": {
						examples: {
							Exemple: {
								value: {
									status: "Success",
									results: {
										order_id: 1,
										shopping_cart_id: 1,
										article_id: 2,
										user_id: 11,
										discount_id: null,
										state: "COMPLETED",
										price: "13.08",
										quantity: 5,
										total_price: "65.40"
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
