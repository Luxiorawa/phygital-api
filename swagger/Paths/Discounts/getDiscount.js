module.exports = {
    get: {
        tags: ["Discounts"],
        description: "Retourne une promotion selon son ID",
        operationId: 'getDiscount',
        security: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
        },
        responses: {
            200: {
                description: "Détail d'une promotion",
                content: {
                    'application/json': {
                        examples: {
                            Exemple : {
                                value: {
                                    "status": "Success",
                                    "results": {
                                        "discount_id": 1,
                                        "value": "10.00",
                                        "discount_type": "percentage",
                                        "category_id": null,
                                        "article_id": 2,
                                        "minimum_quantity": 1,
                                        "minimum_value": "0.00"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
