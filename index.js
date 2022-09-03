require('dotenv').config()

var express = require('express')

var server = express()

void async function () {
    server.listen(process.env.PORT, function () {
        console.info(`Server is listening on port ${process.env.PORT}...`)
    })
}()
