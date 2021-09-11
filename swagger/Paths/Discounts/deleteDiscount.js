module.exports = {
	delete: {
		tags: ["Discounts"],
		description: "Supprime une promotion selon son ID",
		operationId: "deleteDiscount",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Suppression d'une promotion",
				content: {
					"application/json": {
						examples: {
							Exemple: {
								value: {
									status: "Success",
									isDiscountDeleted: true
								}
							}
						}
					}
				}
			}
		}
	}
};
