require('dotenv').config()

var path = require('path')

var express = require('express')
var db = require('./db/models')

var passport = require('passport'),
    session = require('express-session')
var routes = require('./routes')


var server = express()

server.set('view engine', 'ejs')

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.use(express.static(path.join(__dirname, 'public')))
server.use(express.static(path.join(__dirname, 'public/img')))
server.use(express.static(path.join(__dirname, 'public/scripts')))
server.use(express.static(path.join(__dirname, 'node_modules/inter-ui')))



server.use(session({
    secret: 'temp',
    resave: false,
    saveUninitialized: true,
}))

server.use(passport.authenticate('session'))

server.use('/', routes)



void async function () {
    switch (process.argv[2]) {
        case '--seed':
            var seed = require('./db/seed')
            await db.sqlz.sync({force: true})
            await seed(db)
            break
        default:
            var PORT = process.env.PORT
            await db.sqlz.sync()
            server.listen(PORT, function () {
                console.info(`Server is listening on port ${PORT}`)
            })
    }
}()
