var util = require('util')

/* -------------------------------------------------------------------------- */

module.exports.post = async function (req, res) {
    await util.promisify(req.session.destroy).call(req.session)

    res.redirect('/')
}
