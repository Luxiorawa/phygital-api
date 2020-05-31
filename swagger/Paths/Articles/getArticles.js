module.exports = {
    get: {
        tags: ['Articles'],
        description: 'Retourne tous les articles',
        operationId: 'getArticles',
        security: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
        },
        responses: {
            200: {
                description: "Une liste d'articles",
                content: {
                    'application/json': {
                        examples: {
                            List1: {
                                value: {
                                    status: 'Success',
                                    results: [
                                        {
                                            article_id: 1,
                                            category_id: 5,
                                            shelf_id: 7,
                                            name: "Iphone X",
                                            price: '800.99',
                                            description: 'Téléphone dernier cri par Apple',
                                            picture: null,
                                            quantity_stock: 50,
                                            quantity_reserved: 1,
                                            quantity_bought: 752
                                        },
                                        {
                                            article_id: 2,
                                            category_id: 5,
                                            shelf_id: 7,
                                            name: "Iphone XI",
                                            price: '80000.99',
                                            description: 'Téléphone dernier dernier cri par Apple',
                                            picture: null,
                                            quantity_stock: 1,
                                            quantity_reserved: 0,
                                            quantity_bought: 0
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
