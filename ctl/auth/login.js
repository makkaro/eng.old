var passport = require('passport')

module.exports.name = 'login'

module.exports.get = async function (req, res) {
    var view_data = Object.create(null)

    if (req.isAuthenticated()) {
        view_data.user = req.user
    }

    res.render(module.exports.name, {view_data})
}

module.exports.post = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
})
