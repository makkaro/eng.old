var db = require('../db'), {Op} = 'sequelize'

module.exports.view = async (req, res) => {
    var {id} = req.params

    var selected_vals = Object.values(req.query)

    console.log(selected_vals)

    var subunit = await db.subunit.findByPk(id, {
        include: [
            {model: db.element, include: db.product},
            db.variant
        ]
    })

    var variant = subunit.variants.find($ => {
        return selected_vals.every(val => $.code.includes(val))
    })

    res.locals = {subunit, variant, ...res.locals}

    res.render('subunit')
}