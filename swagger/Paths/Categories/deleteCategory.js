module.exports = {
	delete: {
		tags: ["Categories"],
		description: "Supprime une catégorie selon son ID",
		operationId: "deleteCategory",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Suppression d'une catégorie",
				content: {
					"application/json": {
						examples: {
							Exemple: {
								value: {
									status: "Success",
									isCategoryDeleted: true
								}
							}
						}
					}
				}
			}
		}
	}
};
