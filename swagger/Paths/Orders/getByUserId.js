module.exports = {
	get: {
		tags: ["Orders"],
		description:
			"Retourne une / des commandes selon l'ID d'utilisateur dans le token",
		operationId: "getByUserId",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description:
					"Détail d'une / plusieurs commandes selon l'ID dans le token",
				content: {
					"application/json": {
						examples: {
							Exemple: {
								value: {
									status: "Success",
									results: [
										{
											order_id: 1,
											shopping_cart_id: 1,
											article_id: 2,
											user_id: 11,
											discount_id: null,
											state: "COMPLETED",
											price: "13.08",
											quantity: 5,
											total_price: "65.40"
										},
										{
											order_id: 2,
											shopping_cart_id: 1,
											article_id: 3,
											user_id: 11,
											discount_id: null,
											state: "COMPLETED",
											price: "16.44",
											quantity: 10,
											total_price: "164.40"
										}
									]
								}
							}
						}
					}
				}
			}
		}
	}
};
