module.exports = {
	get: {
		tags: ["Sections"],
		description: "Retourne un rayon selon son ID",
		operationId: "getSection",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Détail d'un rayon",
				content: {
					"application/json": {
						examples: {
							Exemple: {
								value: {
									status: "Success",
									results: {
										section_id: 1,
										name: "Eaux - Jus de fruits",
										description:
											"Rayons contenants divers eaux et jus de fruits",
										position_x: "45.00",
										position_y: "7.00",
										length: "450.00",
										width: "180.00"
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
