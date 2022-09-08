module.exports.index = async function (req, res, next) {
    var view_data = Object.create(null)

    console.log(req.isAuthenticated())

    if (req.isAuthenticated()) {
        view_data.user = req.user
    } else {
        view_data.user = null
    }



    res.render('login', {view_data})
}
