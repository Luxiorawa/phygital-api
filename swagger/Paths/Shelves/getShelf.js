module.exports = {
	get: {
		tags: ["Shelves"],
		description: "Retourne une étagère selon son ID",
		operationId: "getShelf",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Détail d'une étagère",
				content: {
					"application/json": {
						examples: {
							Exemple: {
								value: {
									status: "Success",
									results: {
										shelf_id: 5,
										section_id: 1,
										description: "Étagère 5",
										position_x: "70.00",
										position_y: "127.00",
										length: "400.00",
										width: "20.00"
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
