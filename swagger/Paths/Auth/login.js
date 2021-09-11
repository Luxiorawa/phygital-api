module.exports = {
	post: {
		tags: ["Auth"],
		description:
			"Permet de s'authentifier (nécessaire pour accéder à la plupart des routes !)",
		operationId: "login",
		responses: {
			200: {
				description: "Authentification",
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["password"],
							optional: ["username", "email"],
							properties: {
								username: {
									type: "string"
								},
								email: {
									type: "string"
								},
								password: {
									type: "string"
								}
							}
						},
						examples: {
							"Auth OK": {
								value: {
									status: "Success",
									jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkpvaG4uRG9lIn0sImlhdCI6MTU4OTc0NjU3Mn0.W5-vX_aMX90EiElQOsc1jKhK3cc84WoS_tRn4E61Yk8",
									qrcode: "data:image/png;base64,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",
									user: {
										user_id: 1,
										last_name: "John",
										first_name: "Doe",
										email: "John.doe@yopmail.com",
										phone_number: "064545454545",
										username: "John.Doe",
										creation_date:
											"2020-04-22T10:45:22.000Z",
										is_in_shop: 0
									}
								}
							},
							"Auth Failed": {
								value: {
									status: "Failed",
									message:
										"Username / Email / Password not found"
								}
							}
						}
					}
				}
			}
		}
	}
};
