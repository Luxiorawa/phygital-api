module.exports = {
    put: {
        tags: ["Categories"],
        description: "Met à jour plusieurs paramètres d'une catégorie, selon son ID",
        operationId: 'putCategory',
        security: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
        },
        responses: {
            200: {
                description: "Modification d'une catégorie",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            'optional': [
                                "name",
                                "image_url"
                            ],
                            properties: {
                                "name": {
                                    type: 'string'
                                },
                                "image_url": {
                                    type: 'string'
                                }
                            }
                        },
                        examples: {
                            Exemple : {
                                value: {
                                    status: 'Success',
                                    isCategoryUpdated: true
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
