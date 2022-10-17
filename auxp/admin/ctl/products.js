var {Op} = require('sequelize'), db = require('../../../db')

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.view = async (req, res) => {
    var {search} = req.query, {url} = req, records = undefined

    if (search) {
        records = await db.product.findAll({
            where: {
                name: {
                    [Op.iLike]: '%' + search + '%'
                }
            },
            order: [['name', 'ASC']]
        })
    } else {
        records = await db.product.findAll({order: [['name', 'ASC']]})
    }

    res.locals = {search, url, records, ...res.locals}

    res.render('products')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit_view = async (req, res) => {
    var {id} = req.params

    var categories = await db.category.scope('full').findAll(),
        manufacturers = await db.manufacturer.scope('full').findAll()

    var record = await db.product.findByPk(id, {include: [db.category, db.manufacturer]})

    res.locals = {categories, manufacturers, record, ...res.locals}

    res.render('products/edit')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.img_upload_view = async (req, res) => {
    res.render('products/img-upload')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit = async (req, res) => {
    res.redirect('/products')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.img_upload = async (req, res) => {
    res.redirect('/products')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.destroy = async (req, res) => {
    res.redirect('/products')
}
