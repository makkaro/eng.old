var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    crypto = require('crypto'),
    db = require('../db')

passport.use(new LocalStrategy({usernameField: 'login', passwordField: 'pass'},
    async function verify(login, pass, cb) {
    console.log(1)
    var user = await db.user.findOne({where: {login: login}})

    console.log(2)
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

router.get('/login', function (req, res, next) {
    res.render('login')
})

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }))

router.post('/login', (req, res, next)=> {
    passport.authenticate('local', (err, user, failureDetails) => {
        if (err) {
            res.status(500).json({message: 'auth'})
            return
        }

        if (!user) {
            res.status(401).json(failureDetails)
            return
        }

        req.login(user, (err) => {
            if (err) {
                res.status(500).json({message: 'session save went bad'})
                return
            }
            console.log('---123456789098765432345678---', req.user)
            res.status(200).json({errors: false, user: user})
        })
    })(req, res, next)
})

module.exports = router
