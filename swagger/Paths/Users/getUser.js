module.exports = {
	get: {
		tags: ["Users"],
		description: "Retourne un utilisateur selon son ID",
		operationId: "getUser",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Détail d'un utilisateur selon son ID",
				content: {
					"application/json": {
						examples: {
							Exemple: {
								value: {
									status: "Success",
									results: {
										user_id: 11,
										last_name: "Nils",
										first_name: "Renaux",
										email: "Nils.Renaux@yopmail.com",
										phone_number: "060000000",
										username: "Nils.Renaux",
										creation_date:
											"2020-05-30T16:37:13.000Z",
										is_in_shop: 0
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
