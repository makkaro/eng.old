require('dotenv').config()
require('express-async-errors')

var express = require('express'),
    methodOverride = require('method-override'),
    path = require('path')

var db = require('../../db'),
    routes = require('./routes')


/* ------------------------------------------------------------------------------------------------------------------ */
var server = express()

server.set('views', './auxp/admin/views')
server.set('view engine', 'ejs')

server.use(methodOverride('_method'))
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.urlencoded({extended: true}))
server.use(express.json())
server.use('/', routes)


/* ------------------------------------------------------------------------------------------------------------------ */
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
