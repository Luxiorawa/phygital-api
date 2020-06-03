const login = require('./Paths/Auth/login')
const register = require('./Paths/Auth/register')

const getUsers = require('./Paths/Users/getUsers')
const getUser = require('./Paths/Users/getUser')
const putUser = require('./Paths/Users/putUser')
const deleteUser = require('./Paths/Users/deleteUser')
const refreshQRCode = require('./Paths/Users/refreshQRCode')

const getArticles = require('./Paths/Articles/getArticles')
const getByShelfId = require('./Paths/Articles/getByShelfId')
const getArticle = require('./Paths/Articles/getArticle')
const addToShoppingCart = require('./Paths/Articles/addToShoppingCart')
const postArticle = require('./Paths/Articles/postArticle')
const manageStock = require('./Paths/Articles/manageStock')
const putArticle = require('./Paths/Articles/putArticle')
const deleteArticle = require('./Paths/Articles/deleteArticle')

const getOrders = require('./Paths/Orders/getOrders')
const getOrder = require('./Paths/Orders/getOrder')
const getOrdersHistory = require('./Paths/Orders/getOrdersHistory')
const getByUserId = require('./Paths/Orders/getByUserId')
const getShoppingCart = require('./Paths/Orders/getShoppingCart')
const buyShoppingCart = require('./Paths/Orders/buyShoppingCart')
const putOrder = require('./Paths/Orders/putOrder')
const deleteOrder = require('./Paths/Orders/deleteOrder')

const getCategories = require('./Paths/Categories/getCategories')
const getCategory = require('./Paths/Categories/getCategory')
const postCategory = require('./Paths/Categories/postCategory')
const putCategory = require('./Paths/Categories/putCategory')
const deleteCategory = require('./Paths/Categories/deleteCategory')

const getDiscounts = require('./Paths/Discounts/getDiscounts')
const getDiscount = require('./Paths/Discounts/getDiscount')
const postDiscount = require('./Paths/Discounts/postDiscount')
const putDiscount = require('./Paths/Discounts/putDiscount')
const deleteDiscount = require('./Paths/Discounts/deleteDiscount')

const getSections = require('./Paths/Sections/getSections')
const getSection = require('./Paths/Sections/getSection')

const getShelves = require('./Paths/Shelves/getShelves')
const getShelf = require('./Paths/Shelves/getShelf')

module.exports = {
    openapi: '3.0.3',
    info: {
        title: 'Phygital API',
        description: "Documentation de l'API pour le projet phygital",
        contact: {
            name: "Clément Noël",
            email: "296337@supinfo.com"
        },
        version: '1.3.1',
    },
    servers: [
        {
            url: "http://10.10.10.140",
            description: 'production',
        },
        {
            url: "http://localhost:3000",
            description: 'development'
        }
    ],
    tags: [
        {
            name: 'Auth',
        },
        {
            name: 'Users',
        },
        {
            name: 'Articles'
        },
        {
            name: 'Orders'
        },
        {
            name: 'Sections'
        },
        {
            name: 'Shelves'
        },
        {
            name: 'Categories'
        },
        {
            name: 'Discounts'
        }
    ],
    paths: {
        'POST /auth/login': login,
        'POST /auth/register': register,

        'GET /users': getUsers,
        'GET /users/:userId': getUser,
        'POST /users/refreshQRCode': refreshQRCode,
        'PUT /users/:userId' : putUser,
        'DELETE /users/:userId' : deleteUser,

        'GET /articles' : getArticles,
        'GET /articles/byShelfId': getByShelfId,
        'GET /articles/:articleId': getArticle,
        'POST /articles/addToShoppingCart': addToShoppingCart,
        'POST /articles/': postArticle,
        'PUT /articles/manageStock/:articleId': manageStock,
        'PUT /articles/:articleId': putArticle,
        'DELETE /articles/:articleId' : deleteArticle,

        'GET /orders': getOrders,
        'GET /orders/:orderId': getOrder,
        'GET /orders/getOrdersHistory': getOrdersHistory,
        'GET /orders/getByUserId': getByUserId,
        'GET /orders/getShoppingCart': getShoppingCart,
        'POST /orders/buyShoppingCart': buyShoppingCart,
        'PUT /orders/:orderId': putOrder,
        'DELETE /orders/:orderId': deleteOrder,

        'GET /categories': getCategories,
        'GET /categories/:categoryId': getCategory,
        'POST /categories/': postCategory,
        'PUT /categories/:categoryId': putCategory,
        'DELETE /categories/:categoryId': deleteCategory,

        'GET /discounts': getDiscounts,
        'GET /discounts/:discountId': getDiscount,
        'POST /discounts/': postDiscount,
        'PUT /discounts/:discountId': putDiscount,
        'DELETE /discounts/:discountId': deleteDiscount,

        'GET /sections' : getSections,
        'GET /sections/:sectionId': getSection,

        'GET /shelves': getShelves,
        'GET /shelves/:shelfId': getShelf,
    }
}
