var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    crypto = require('crypto'),
    db = require('../db')

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

router.get('/login', function (req, res, next) {
    var view_data = Object.create(null)

    if (req.isAuthenticated()) {
        view_data.user = req.user
    }

    res.render('login', {view_data})
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) return next(err)
    })
    res.redirect('/')
})

router.get('/register', function (req, res, next) {
    res.render('register')
})

router.post('/register',function (req, res, next) {
    var salt = crypto.randomBytes(16)
    crypto.pbkdf2(req.body.pass, salt, 310000, 32, 'sha256', async function (err, hashed) {
        if (err) return next(err)
        var user = await db.user.create({
            login: req.body.login,
            pass: hashed,
            salt: salt
        })
        req.login(user, function (err) {
            if (err) return next(err)
            res.redirect('/')
        })
    })
})

module.exports = router
