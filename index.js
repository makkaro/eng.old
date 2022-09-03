require('dotenv').config()

var path = require('path')

var express = require('express')

var server = express()

server.set('view engine', 'ejs')

server.use(express.static(path.join(__dirname, 'public')))
server.use(express.static(path.join(__dirname, 'public/img')))
server.use(express.static(path.join(__dirname, 'node_modules/inter-ui')))

server.use('/', require('./routes'))

var db = require('./db/models')

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
