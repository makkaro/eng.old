require('dotenv').config()

var express = require('express')

var server = express()

var db = require('./db/models')

void async function () {
    switch (process.argv[2]) {
        case '--seed':
            console.log(1)
            var seed = require('./db/seed')
            console.log(2)
            await db.sqlz.sync({force: true})
            console.log(3)
            await seed(db)
            console.log(4)
            break
        default:
            var PORT = process.env.PORT
            await db.sqlz.sync()
            server.listen(PORT, function () {
                console.info(`Server is listening on port ${PORT}`)
            })
    }
}()
