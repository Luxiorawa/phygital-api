module.exports = {
	put: {
		tags: ["Orders"],
		description:
			"Met à jour plusieurs paramètres d'une commande, selon son ID",
		operationId: "putOrder",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Modification d'une commande",
				content: {
					"application/json": {
						schema: {
							type: "object",
							optional: [
								"shopping_cart_id",
								"article_id",
								"discount_id",
								"state",
								"price"
							],
							properties: {
								shopping_cart_id: {
									type: "integer"
								},
								article_id: {
									type: "integer"
								},
								discount_id: {
									type: "integer"
								},
								state: {
									type: "string"
								},
								price: {
									type: "number",
									format: "float"
								}
							}
						},
						examples: {
							Exemple: {
								value: {
									status: "Success",
									isOrderUpdated: true
								}
							}
						}
					}
				}
			}
		}
	}
};
