module.exports = {
    post: {
        tags: ['Articles'],
        description: "Permet d'ajouter un article selon plusieurs paramètre au panier de l'utilisateur authentifier via le token",
        operationId: 'addToShoppingCart',
        security: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
        },
        responses: {
            200: {
                description: '',
                'content': {
                    'application/json': {
                        schema: {
                            type: 'object',
                            'required': [
                                "article_id",
                                "quantity"
                            ],
                            'optional': [
                                "discount_id"
                            ],
                            properties: {
                                "article_id": {
                                    type: 'integer'
                                },
                                "quantity": {
                                    type: 'integer'
                                },
                                "discount_id": {
                                    type: 'integer'
                                }
                            }
                        },
                        examples: {
                            "Nouvelle article dans le shopping cart": {
                                value: {
                                    status: 'Success',
                                    createdId: 1
                                },
                            },
                            "Article déjà présent dans le shopping cart": {
                                value: {
                                    status: 'Success',
                                    message: "Updated quantity for article_id 1"
                                }
                            },
                        }
                    }
                }
            }
        }
    },
}
