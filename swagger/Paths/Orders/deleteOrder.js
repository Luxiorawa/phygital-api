module.exports = {
	delete: {
		tags: ["Orders"],
		description: "Supprime une commande selon son ID",
		operationId: "deleteOrder",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Suppression d'une commande",
				content: {
					"application/json": {
						examples: {
							Exemple: {
								value: {
									status: "Success",
									isOrderDeleted: true
								}
							}
						}
					}
				}
			}
		}
	}
};
