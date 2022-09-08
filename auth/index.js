// var passport = require('passport'),
//     LocalStrategy = require('passport-local'),
//     db = require('../db/models')
//
// passport.use(new LocalStrategy(function verify(login, pass, done) {
//     db.user
//         .findOne({login: login})
//         .then(function (user) {
//             if (!user) {
//                 return done(null, false, {message: 'Błędny login.'})
//             }
//             if (!user.authenticated(pass)) {
//                 return done(null, false, {message: 'Błędne hasło'})
//             }
//             return done(null, user)
//         })
//         .catch(function (err) {
//             done(err)
//         })
// }))
//
// passport.serializeUser(function (user, done) {
//     done(null, user.id)
// })
//
// passport.deserializeUser(function (id, done) {
//     db.user
//         .findByPk(id)
//         .then(function (user) {
//             done(null, user)
//         })
//         .catch(function (err) {
//             done(err, null)
//         })
// })
