module.exports = {
    put: {
        tags: ["Discounts"],
        description: "Met à jour plusieurs paramètres d'une promotion, selon son ID",
        operationId: 'putDiscount',
        security: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
        },
        responses: {
            200: {
                description: "Modification d'une promotion",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            'optional': [
                                "value",
                                "discount_type",
                                "category_id",
                                "article_id",
                                "minimum_quantity",
                                "minimum_value",
                            ],
                            properties: {
                                "value": {
                                    type: 'number',
                                    format: 'float'
                                },
                                "discount_type": {
                                    type: 'string'
                                },
                                "category_id": {
                                    type: 'integer'
                                },
                                "article_id": {
                                    type: 'integer'
                                },
                                "minimum_quantity": {
                                    type: 'integer'
                                },
                                "minimum_value": {
                                    type: 'number',
                                    format: 'float'
                                }
                            }
                        },
                        examples: {
                            Exemple : {
                                value: {
                                    status: 'Success',
                                    isDiscountUpdated: true
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
