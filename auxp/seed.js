require('dotenv').config()

var db = require('../db')

/* -------------------------------------------------------------------------- */

async function seed() {
    await db.user.create({username: 'genghis', password: 'genghis1'})
}

async function init() {
    await db.sqlz.sync({force: true})

    await seed()
}

void init()
