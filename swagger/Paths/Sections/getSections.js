module.exports = {
	get: {
		tags: ["Sections"],
		description: "Retourne tous les rayons",
		operationId: "getSections",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Une liste de rayons",
				content: {
					"application/json": {
						examples: {
							List1: {
								value: {
									status: "Success",
									results: [
										{
											section_id: 1,
											name: "Eaux - Jus de fruits",
											description:
												"Rayons contenants divers eaux et jus de fruits",
											position_x: "45.00",
											position_y: "7.00",
											length: "450.00",
											width: "180.00"
										},
										{
											section_id: 2,
											name: "Soda - Alcool",
											description:
												"Rayons contenant divers sodas et divers alcool",
											position_x: "525.00",
											position_y: "7.00",
											length: "450.00",
											width: "180.00"
										},
										{
											section_id: 3,
											name: "High-tech",
											description: "",
											position_x: "45.00",
											position_y: "630.00",
											length: "450.00",
											width: "180.00"
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
