var db = require('../db')

module.exports.view = async (req, res) => {
    var {id} = req.params

    var subunits = await db.subunit.findAll({where: {id}})

    res.locals = {subunits, ...res.locals}

    res.render('unit')
}
