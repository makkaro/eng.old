var db = require('../db')

module.exports.name = 'store'

module.exports.view = async function (req, res) {
    var view_data = Object.create(null)

    console.log(req.isAuthenticated())
    console.log(req.user)

    view_data.products = await db.product.findAll({
        attributes: ['id', 'hidden', 'name', 'cost', 'img']
    })

    view_data.categories = await db.category.findAll({
        attributes: ['name']
    })

    view_data.manufacturers = await db.manufacturer.findAll({
        attributes: ['name']
    })

    res.render(module.exports.name, {view_data})
}
