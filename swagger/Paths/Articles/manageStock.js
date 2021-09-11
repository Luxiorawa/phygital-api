module.exports = {
	put: {
		tags: ["Articles"],
		description: "Met à jour le stock d'un article, selon son ID",
		operationId: "manageStock",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description:
					"Modification du stock d'un article selon son type (si non fourni, stock_type => stock)",
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["quantity"],
							optional: ["stock_type"],
							properties: {
								quantity: {
									type: "integer"
								},
								stock_type: {
									type: "string"
								}
							}
						},
						examples: {
							Exemple: {
								value: {
									status: "Success",
									isStockUpdated: true
								}
							}
						}
					}
				}
			}
		}
	}
};
