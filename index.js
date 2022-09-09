require('dotenv').config()

var express = require('express'),
    passport = require('passport'),
    session = require('express-session'),
    path = require('path'),
    db = require('./db'),
    routes = require('./routes'),
    auth = require('./routes/auth')

var server = express()

server.set('view engine', 'ejs')

server.use(express.static(path.join(__dirname, 'public')))
server.use(express.static(path.join(__dirname, 'public/img')))
server.use(express.static(path.join(__dirname, 'public/scripts')))
server.use(express.static(path.join(__dirname, 'node_modules/inter-ui')))

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))
server.use(passport.authenticate('session'))

server.use('/', routes)
server.use('/', auth)

void async function () {
    switch (process.argv[2]) {
        case '--seed':
            var seed = require('./db/seed')
            await db.sqlz.sync({force: true})
            await seed()
            break
        default:
            var PORT = process.env.PORT
            await db.sqlz.sync()
            server.listen(PORT, function () {
                console.info(`Server is listening on port ${PORT}`)
            })
    }
}()
