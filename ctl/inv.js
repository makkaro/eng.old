var db = require('../db')

module.exports.view = async (req, res) => {
    var {id} = req.params

    var units = await db.unit.findAll({where: {id}})

    res.locals = {units, ...res.locals}

    res.render('inv')
}
