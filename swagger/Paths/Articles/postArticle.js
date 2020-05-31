module.exports = {
    post: {
        tags: ["Articles"],
        description: "Créer un article selon plusieurs paramètres",
        operationId: 'postArticle',
        security: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
        },
        responses: {
            200: {
                description: "Création d'un article",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            'required': [
                                "category_id",
                                "name",
                                "price",
                            ],
                            'optional': [
                                "shelf_id",
                                "description",
                                "picture",
                                "quantity_stock",
                                "quantity_reserved",
                                "quantity_bought"
                            ],
                            properties: {
                                "category_id": {
                                    type: 'integer'
                                },
                                "name": {
                                    type: 'string'
                                },
                                "price" : {
                                    type: 'number',
                                    format: 'float'
                                },
                                "shelf_id": {
                                    type: 'integer'
                                },
                                "description": {
                                    type: 'string'
                                },
                                "picture": {
                                    type: 'string'
                                },
                                "quantity_stock": {
                                    type: 'integer'
                                },
                                "quantity_reserved": {
                                    type: 'string'
                                },
                                "quantity_bought": {
                                    type: 'string'
                                }
                            }
                        },
                        examples: {
                            Exemple : {
                                value: {
                                    status: 'Success',
                                    insertedArticleId: 1
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
