module.exports = {
	get: {
		tags: ["Orders"],
		description: "Retourne toutes les commandes complétés",
		operationId: "getOrdersHistory",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Liste des commandes complétés",
				content: {
					"application/json": {
						examples: {
							List1: {
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
							},
							Liste_vide: {
								value: {
									status: "Success"
								}
							}
						}
					}
				}
			}
		}
	}
};
