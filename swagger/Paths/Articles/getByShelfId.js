module.exports = {
	get: {
		tags: ["Articles"],
		description: "Retourne un / des article selon un ID d'étagère",
		operationId: "getByShelfId",
		security: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		},
		responses: {
			200: {
				description: "Détail d'un article selon son ID d'étagère",
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["shelf_id"],
							properties: {
								shelf_id: {
									type: "integer"
								}
							}
						},
						examples: {
							Exemple: {
								value: {
									status: "Success",
									results: [
										{
											article_id: 1,
											category_id: 2,
											shelf_id: 1,
											name: "Eau de source Cristaline 6 x 1.5 L",
											price: "1.19",
											description:
												"L'eau de source pure et naturelle Cristaline",
											picture: null,
											quantity_stock: 30,
											quantity_reserved: 0,
											quantity_bought: 0
										},
										{
											article_id: 2,
											category_id: 2,
											shelf_id: 1,
											name: "Eau de source Pyrenea 4 x 5 L",
											price: "13.08",
											description: "",
											picture: null,
											quantity_stock: 5,
											quantity_reserved: 0,
											quantity_bought: 0
										}
									]
								}
							}
						}
					}
				}
			}
		}
	}
};
