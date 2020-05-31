module.exports = {
    post: {
        tags: ["Categories"],
        description: "Créer une catégorie selon plusieurs paramètres",
        operationId: 'postCategory',
        security: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
        },
        responses: {
            200: {
                description: "Création d'une catégorie",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            'required': [
                                "name",
                            ],
                            properties: {
                                "name": {
                                    type: 'string'
                                },
                            }
                        },
                        examples: {
                            Example : {
                                value: {
                                    status: 'Success',
                                    insertedCategoryId: 1
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
