var {Op} = require('sequelize'), db = require('../../../db')

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.view = async (req, res) => {
    var {added, updated, del, del_forbidden, search} = req.query, {url} = req, records = undefined

    if (search) {
        records = await db.manufacturer.scope('full').findAll({
            where: {
                name: {
                    [Op.iLike]: '%' + search + '%'
                }
            },
            order: [['name', 'ASC']]
        })
    } else {
        records = await db.manufacturer.scope('full').findAll({order: [['name', 'ASC']]})
    }

    res.locals = {added, updated, del, del_forbidden, search, url, records, ...res.locals}

    res.render('manufacturers')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit_view = async (req, res) => {
    var {id} = req.params, record = await db.manufacturer.scope('full').findByPk(id)

    res.locals = {record, ...res.locals}

    res.render('manufacturers/edit')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit = async (req, res) => {
    var {id, name} = req.body

    if (id) {
        await db.manufacturer.update({name}, {
            where: {id}
        })

        return res.redirect('/manufacturers?updated=true')
    }

    await db.manufacturer.create({name})

    res.redirect('/manufacturers?added=true')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.destroy = async (req, res) => {
    var {id} = req.params

    if (await db.product.findOne({where: {categoryId: id}})) {
        return res.redirect('/manufacturers?del_forbidden=true')
    }

    await db.manufacturer.destroy({where: {id}})

    res.redirect('/manufacturers?del=true')
}
