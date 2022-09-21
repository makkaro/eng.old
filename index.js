require('dotenv').config()
require('express-async-errors')

var express = require('express')

var path = require('path')

var db = require('./db'),
    routes = require('./routes'),
    session = require('./middleware/session')

var server = express()

server.set('view engine', 'ejs')

server.use(express.static(path.join(__dirname, 'public')))
server.use(express.static(path.join(__dirname, 'public/img')))
server.use(express.static(path.join(__dirname, 'public/scripts')))
server.use(express.static(path.join(__dirname, 'node_modules/inter-ui')))
server.use(express.urlencoded({extended: true}))
server.use(express.json())

server.use(session)
server.use('/', routes)

var port = process.env.PORT || 3000

void async function () {
    try {
        await db.sqlz.sync()
        server.listen(port, function () {
            console.info(`URL: http://localhost:${port}/`)
            console.info(`Server is listening on port ${port}...`)
        })
    } catch (err) {
        console.error(err)
    }
}()
