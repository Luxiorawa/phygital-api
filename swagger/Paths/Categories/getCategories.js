module.exports = {
    get: {
        tags: ['Categories'],
        description: 'Retourne toutes les catégories',
        operationId: 'getCategories',
        security: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
        },
        responses: {
            200: {
                description: "Une liste de catégories",
                content: {
                    'application/json': {
                        examples: {
                            List1: {
                                value: {
                                    status: 'Success',
                                    "results": [
                                        {
                                            "category_id": 1,
                                            "name": "Eaux minérales",
                                            "image_url": null
                                        },
                                        {
                                            "category_id": 2,
                                            "name": "Eaux de sources",
                                            "image_url": null
                                        },
                                    ],
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
