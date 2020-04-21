const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const dotenv = require('dotenv')
const morgan = require('morgan')
const app = express()

const WebsiteRoutes = require('./src/Routes/WebsiteRoutes')
const UserRoutes = require('./src/Routes/UsersRoutes')

// config() va lire le fichier .env, et assigner globalement toutes les données de ce fichier dans process.env (accessible partout)
dotenv.config()

// On ajoute pug à express ainsi que le chemin des vues
app.set('view engine', 'pug')
app.set('views', './public/views')

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

// Morgan est un middleware qui va log plusieurs infos à chaque requête effectué
app.use(morgan('dev'))

// Permet d'automatiquement utiliser la compression gzip
app.use(compression())

app.use('/', WebsiteRoutes)
app.use('/users', UserRoutes)

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
