module.exports.name = 'logout'

module.exports.post = async function (req, res, next) {
    req.logout(function (err) {
        if (err) return next(err)
    })

    res.redirect('/')
}
