var express = require('express'),
    passport = require('passport'),
    crypto = require('crypto'),
    db = require('../db/models')

var store_ctl = require('../ctl/store'),
    login_ctl = require('../ctl/login')
var LocalStrategy = require('passport-local')

passport.use('local', new LocalStrategy(function verify(login, pass, done) {
    db.user
        .findOne({where: {login: user.login}})
        .then(function (user) {
            if (!user) {
                return done(null, false, {message: 'Błędny login.'})
            }
            crypto.pbkdf2(pass, user.salt, 310000, 32, 'sha256', function (err, hashed) {
                if (err) { return done(err)}
                if (!crypto.timingSafeEqual(user.pass, hashed)) {
                    return done(null, false, {message: 'Błędne hasło'})
                }
            })
            return done(null, user)
        })
        .catch(function (err) {
            done(err)
        })
}))

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, {id: user.id, login: user.login})
    })
})

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user)
    })
})

var router = express.Router()

router.get('/store', store_ctl.index)

router.get('/login', login_ctl.index)



router.post('/login/password', (req, res) => {
    passport.authenticate('local', {
        successRedirect: '/login',
        failureRedirect: '/store'
    })
})

router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) return next(err)
        res.redirect('/login')
    })
})

router.get('/signup', function (req, res, next) {
    res.render('signup')
})

router.post('/signup', function (req, res, next) {
    console.log(req.body)
    db.user.findOne({
        where: {login: req.body.login},
        attributes: ['login']
    })
        .then(function (user) {
            if (!user) {
                db.user
                    .create(req.body)
                    .then(function () {
                        res.redirect('/login')
                    })
                    .catch(function (err) {
                        throw err
                    })
            } else {
                res.render('signup', {
                    user: req.user
                })
            }
        })
        .catch(function (err) {
            throw err
        })
})

module.exports = router
