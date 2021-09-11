module.exports = {
	delete: {
		tags: ["Articles"],
		description: "Supprime un article selon son ID",
		operationId: "deleteArticle",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Suppression d'un article",
				content: {
					"application/json": {
						examples: {
							Exemple: {
								value: {
									status: "Success",
									isArticleDeleted: true
								}
							}
						}
					}
				}
			}
		}
	}
};
