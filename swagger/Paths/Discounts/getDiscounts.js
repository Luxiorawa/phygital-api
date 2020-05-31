module.exports = {
    get: {
        tags: ['Discounts'],
        description: 'Retourne toutes les promotions',
        operationId: 'getDiscounts',
        security: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
        },
        responses: {
            200: {
                description: "Une liste de promotions",
                content: {
                    'application/json': {
                        examples: {
                            List1: {
                                value: {
                                    "status": "Success",
                                    "results": [
                                        {
                                            "discount_id": 1,
                                            "value": "10.00",
                                            "discount_type": "percentage",
                                            "category_id": null,
                                            "article_id": 2,
                                            "minimum_quantity": 1,
                                            "minimum_value": "0.00"
                                        },
                                        {
                                            "discount_id": 3,
                                            "value": "10.00",
                                            "discount_type": "percentage",
                                            "category_id": null,
                                            "article_id": 4,
                                            "minimum_quantity": 1,
                                            "minimum_value": "0.00"
                                        }
                                    ]
                                },
                            },
                            Liste_vide: {
                                value: {
                                    status: 'Success'
                                }
                            },
                        }
                    }
                }
            }
        }
    },
}
