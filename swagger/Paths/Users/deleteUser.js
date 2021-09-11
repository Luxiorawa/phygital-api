module.exports = {
	delete: {
		tags: ["Users"],
		description: "Supprime un utilisateur selon son ID",
		operationId: "deleteUser",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Suppression d'un utilisateur",
				content: {
					"application/json": {
						examples: {
							Exemple: {
								value: {
									status: "Success",
									isUserDeleted: true
								}
							}
						}
					}
				}
			}
		}
	}
};
