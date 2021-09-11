module.exports = {
	put: {
		tags: ["Articles"],
		description:
			"Met à jour plusieurs paramètres d'un article, selon son ID",
		operationId: "putArticle",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Modification d'un article",
				content: {
					"application/json": {
						schema: {
							type: "object",
							optional: [
								"category_id",
								"shelf_id",
								"name",
								"price",
								"description",
								"picture"
							],
							properties: {
								category_id: {
									type: "integer"
								},
								shelf_id: {
									type: "integer"
								},
								name: {
									type: "string"
								},
								price: {
									type: "number",
									format: "float"
								},
								description: {
									type: "string"
								},
								picture: {
									type: "string"
								}
							}
						},
						examples: {
							Exemple: {
								value: {
									status: "Success",
									isArticleUpdated: true
								}
							}
						}
					}
				}
			}
		}
	}
};
