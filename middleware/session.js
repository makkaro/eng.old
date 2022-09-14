var session = require('express-session'),
    store = require('connect-session-sequelize')(session.Store)

var db = require('../db')

/* -------------------------------------------------------------------------- */

module.exports = session({
    store: new store({db: db.sqlz}),
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * process.env.SESSION_LIFETIME,
        sameSite: true,
        secure: process.env.NODE_ENV == 'production'
    }
})
