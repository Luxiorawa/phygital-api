module.exports = {
	post: {
		tags: ["Discounts"],
		description: "Créer une promotion selon plusieurs paramètres",
		operationId: "postDiscount",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Création d'une promotion",
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["value", "discount_type"],
							optional: [
								"category_id",
								"article_id",
								"minimum_quantity",
								"minimum_value"
							],
							properties: {
								value: {
									type: "number",
									format: "float"
								},
								discount_type: {
									type: "string"
								},
								category_id: {
									type: "integer"
								},
								article_id: {
									type: "integer"
								},
								minimum_quantity: {
									type: "integer"
								},
								minimum_value: {
									type: "number",
									format: "float"
								}
							}
						},
						examples: {
							Example: {
								value: {
									status: "Success",
									insertedDiscountId: 1
								}
							}
						}
					}
				}
			}
		}
	}
};
