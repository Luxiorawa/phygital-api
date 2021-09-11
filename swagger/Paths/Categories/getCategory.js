module.exports = {
	get: {
		tags: ["Categories"],
		description: "Retourne une catégorie selon son ID",
		operationId: "getCategory",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Détail d'une catégorie",
				content: {
					"application/json": {
						examples: {
							Exemple: {
								value: {
									status: "Success",
									results: {
										category_id: 2,
										name: "Eaux de sources",
										image_url: null
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
