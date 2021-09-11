module.exports = {
	put: {
		tags: ["Users"],
		description: "Indique que l'utilisateur est dans le shop",
		operationId: "isInShop",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Indique que l'utilisateur est dans le shop",
				content: {
					"application/json": {
						schema: {
							type: "object",
							optional: ["is_in_shop"],
							properties: {
								is_in_shop: {
									type: "integer"
								}
							}
						},
						examples: {
							Exemple: {
								value: {
									status: "Success",
									isUserUpdated: true
								}
							}
						}
					}
				}
			}
		}
	}
};
