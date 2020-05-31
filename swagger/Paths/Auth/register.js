module.exports = {
    post: {
        tags: ["Auth"],
        description: "Créer un utilisateur selon plusieurs paramètres",
        operationId: 'register',
        security: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
        },
        responses: {
            200: {
                description: "Création d'un utilisateur",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            'required': [
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
                                "password": {
                                    type: 'string'
                                },
                                "phone_number": {
                                    type: 'string'
                                }
                            }
                        },
                        examples: {
                            "Register OK" : {
                                value: {
                                    status: 'Success',
                                    insertedUserId: 1
                                }
                            },
                            "Email taken": {
                                value: {
                                    status: 'Failed',
                                    message: "Email is already taken"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
