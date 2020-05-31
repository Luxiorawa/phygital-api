module.exports = {
    get: {
        tags: ['Shelves'],
        description: 'Retourne toutes les étagères',
        operationId: 'getShelves',
        security: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
        },
        responses: {
            200: {
                description: "Une liste d'étagère",
                content: {
                    'application/json': {
                        examples: {
                            List1: {
                                value: {
                                    status: 'Success',
                                    "results": [
                                        {
                                            "shelf_id": 1,
                                            "section_id": 1,
                                            "description": "Étagère 1",
                                            "position_x": "70.00",
                                            "position_y": "7.00",
                                            "length": "400.00",
                                            "width": "20.00"
                                        },
                                        {
                                            "shelf_id": 2,
                                            "section_id": 2,
                                            "description": "Étagère 2",
                                            "position_x": "550.00",
                                            "position_y": "7.00",
                                            "length": "400.00",
                                            "width": "20.00"
                                        },
                                        {
                                            "shelf_id": 3,
                                            "section_id": 3,
                                            "description": "Étagère 3",
                                            "position_x": "70.00",
                                            "position_y": "790.00",
                                            "length": "400.00",
                                            "width": "20.00"
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
