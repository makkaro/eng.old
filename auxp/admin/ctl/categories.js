var {Op} = require('sequelize'), db = require('../../../db')

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.view = async (req, res) => {
    var {added, updated, del, del_forbidden, search} = req.query, records = undefined

    console.log(req.url)

    if (search) {
        records = await db.category.scope('full').findAll({
            where: {
                name: {
                    [Op.iLike]: '%' + search + '%'
                }
            },
            order: [['name', 'ASC']]
        })
    } else {
        records = await db.category.scope('full').findAll({order: [['name', 'ASC']]})
    }

    res.locals = {added, updated, del, del_forbidden, search, records, ...res.locals}

    res.render('categories')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit_view = async (req, res) => {
    var {id} = req.params, record = await db.category.scope('full').findByPk(id)

    res.locals = {record, ...res.locals}

    res.render('categories/edit')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit = async (req, res) => {
    var {id, name} = req.body

    if (id) {
        await db.category.update({name}, {
            where: {id}
        })

        return res.redirect('/categories?updated=true')
    }

    await db.category.create({name})

    res.redirect('/categories?added=true')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.destroy = async (req, res) => {
    var {id} = req.params

    if (await db.product.findAll({where: {categoryId: id}})) {
        return res.redirect('/categories?del_forbidden=true')
    }

    await db.category.destroy({where: {id}})

    res.redirect('/categories?del=true')
}
