module.exports = {
    post: {
        tags: ["Orders"],
        description: "Met en statut COMPLETE le shopping cart de l'utilisateur authentifié dans le token JWT",
        operationId: 'buyShoppingCart',
        security: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
        },
        responses: {
            200: {
                description: "Met en statut COMPLETE le shopping cart de l'utilisateur authentifié dans le token JWT",
                content: {
                    'application/json': {
                        examples: {
                            Exemple : {
                                value: {
                                    status: 'Success',
                                    totalPrice: 145.20
                                }
                            },
                            "Shopping cart empty": {
                                value: {
                                    "status": "Failed",
                                    "message": "Shopping cart is empty"
                                }
                            }
                        }
                    },
                }
            },
            422: {
                description: "Une erreur c'est produite",
                content: {
                    'application/json': {
                        Exemple: {
                            value: {
                                status: 'Failed',
                                message: `An error occured during buyShoppingCart function`,
                            }
                        }
                    }
                }
            }
        }
    }
}
