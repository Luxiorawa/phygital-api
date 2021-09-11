module.exports = {
	get: {
		tags: ["Users"],
		description: "Retourne tous les utilisateurs",
		operationId: "getUsers",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Une liste d'utilisateurs.",
				content: {
					"application/json": {
						examples: {
							List1: {
								value: {
									status: "Success",
									results: [
										{
											user_id: 1,
											last_name: "Doe",
											first_name: "Jogn",
											email: "John.Doe@yopmail.com",
											phone_number: "06454545454",
											username: "John.Doe",
											creation_date:
												"2020-05-29T19:08:50.000Z",
											is_in_shop: 0
										},
										{
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
									]
								}
							},
							Liste_vide: {
								value: {
									status: "Success"
								}
							}
						}
					}
				}
			}
		}
	}
};
