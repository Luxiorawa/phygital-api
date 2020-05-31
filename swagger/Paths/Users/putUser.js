module.exports = {
    put: {
        tags: ["Users"],
        description: "Met à jour plusieurs paramètres d'un utilisateur, selon son ID",
        operationId: 'putUser',
        security: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
        },
        responses: {
            200: {
                description: "Modification d'un utilisateur",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            'optional': [
                                "last_name",
                                "first_name",
                                "username",
                                "email",
                                "password",
                                "phone_number"
                            ],
                            properties: {
                                "last_name": {
                                    type: 'string'
                                },
                                "first_name": {
                                    type: 'string'
                                },
                                "username" : {
                                    type: 'string'
                                },
                                "email": {
                                    type: 'string'
                                },
                                "phone_number": {
                                    type: 'string'
                                }
                            }
                        },
                        examples: {
                            Exemple : {
                                value: {
                                    status: 'Success',
                                    isUserUpdated: true
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
