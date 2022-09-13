var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    crypto = require('crypto'),
    db = require('../db'),
    ctl = require('../ctl/auth')

passport.use(new LocalStrategy({usernameField: 'login', passwordField: 'pass'},
    async function verify(login, pass, cb) {
    var user = await db.user.scope('full').findOne({where: {login: login}})

    console.log(user)
    if (!user) {
        return cb(null, false, {message: 'incorrect username'})
    }

    crypto.pbkdf2(pass, user.salt, 310000, 32, 'sha256', function (err, hashed) {
        if (err) {
            return cb(err)
        }
        if (!crypto.timingSafeEqual(user.pass, hashed)) {
            return cb(null, false, {message: 'incorrect password'})
        }
        return cb(null, user)
    })
}))

passport.serializeUser(function (user, cb) {
    console.log('serialize user')
    process.nextTick(function () {
        cb(null, {
            id: user.id,
            login: user.login
        })
    })
})

passport.deserializeUser(function (user, cb) {
    console.log('deserialize user')
    process.nextTick(function () {
        return cb(null, user)
    })
})

var router = express.Router()

router.get('/login', ctl.login.get)
router.post('/login', ctl.login.post)

router.post('/logout', ctl.logout.post)

router.get('/register', ctl.register.get)
router.post('/register', ctl.register.post)

module.exports = router
