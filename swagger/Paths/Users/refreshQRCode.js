module.exports = {
    post: {
        tags: ["Users"],
        description: "Permet d'obtenir un nouveau QR Code en passant le token JWT dans le headers (comme les autres routes)",
        operationId: 'refreshQRCode',
        security: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
        },
        responses: {
            200: {
                description: "Permet d'obtenir un nouveau QR Code en passant le token JWT dans le headers (comme les autres routes)",
                content: {
                    'application/json': {
                        examples: {
                            Exemple : {
                                value: {
                                    "status": "Success",
                                    "qrcode": "data:image/png;base64,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"
                                }
                            },
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
                                status: 'Failed'
                            }
                        }
                    }
                }
            }
        }
    }
}