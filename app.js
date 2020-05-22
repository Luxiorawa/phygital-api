const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const compression = require('compression')
const dotenv = require('dotenv')
const morgan = require('morgan')
const app = express()

//const WebsiteRoutes = require('./src/Routes/WebsiteRoutes')
const UserRoutes = require('./src/Routes/UsersRoutes')
const ArticlesRoutes = require('./src/Routes/ArticlesRoutes')
const OrdersRoutes = require('./src/Routes/OrdersRoutes')
const FiltersRoutes = require('./src/Routes/FiltersRoutes')
const DiscountsRoutes = require('./src/Routes/DiscountsRoutes')

// config() va lire le fichier .env, et assigner globalement toutes les données de ce fichier dans process.env (accessible partout)
dotenv.config()

app.use('/css', express.static('./public/css'))
app.use('/js', express.static('./public/js'))
app.use('/img', express.static('./public/img'))

app.use(bodyParser.json({ limit: '100mb' }))
app.use(
    bodyParser.urlencoded({
        limit: '100mb',
        extended: true,
        parameterLimit: 1000,
    })
)

app.use(
    session({
        secret: 'secretKey123456789azerty',
        resave: false,
        saveUninitialized: true,
    })
)

// Morgan est un middleware qui va log plusieurs infos à chaque requête effectué
app.use(morgan('dev'))

// Permet d'automatiquement utiliser la compression gzip
app.use(compression())

app.use('/', FiltersRoutes)
// app.use('/', WebsiteRoutes)
app.use('/users', UserRoutes)
app.use('/articles', ArticlesRoutes)
app.use('/orders', OrdersRoutes)
app.use('/discounts', DiscountsRoutes)

// Permet de gérer les erreurs 404
// app.use((req, res, next) => {
//     var err = new Error('Not Found')
//     err.status = 404
//     next(err)
// })

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('Server launched on port ' + process.env.PORT)
})
