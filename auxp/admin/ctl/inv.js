var {Op} = require('sequelize'), db = require('../../../db')

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.view = async (req, res) => {
    var {search} = req.query, {url} = req, records = undefined

    if (search) {
        records = await db.inv.findAll({
            where: {
                name: {
                    [Op.iLike]: '%' + search + '%'
                }
            },
            order: [['name', 'ASC']]
        })
    } else {
        records = await db.inv.findAll()
    }

    res.locals = {search, url, records, ...res.locals}

    res.render('inv')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit_view = async (req, res) => {
    var {id} = req.params, {url} = req, record = await db.inv.findByPk(id)

    console.log(url)

    var children = await db.unit.findAll({where: {invId: id}})

    res.locals = {record, children, url, ...res.locals}

    res.render('inv/edit')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit_unit_view = async (req, res) => {
    var {id, invId} = req.params, {url} = req, record = await db.unit.findByPk(id)

    var children = await db.subunit.findAll({where: {unitId: id}})

    res.locals = {invId, record, children, url, ...res.locals}

    res.render('inv/edit-unit')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit_subunit_view = async (req, res) => {
    var {id, invId, unitId} = req.params, {url} = req, record = await db.subunit.findByPk(id)

    res.locals = {invId, unitId, record, url, ...res.locals}

    res.render('inv/edit-subunit')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit = async (req, res) => {
    var {id, name} = req.body

    if (id) {
        await db.inv.update({name}, {
            where: {id}
        })

        return res.redirect('/inv?updated=true')
    }

    await db.inv.create({name})

    res.redirect('/inv?added=true')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit_unit = async (req, res) => {
    var {id, invId, name} = req.body

    if (id) {
        await db.unit.update({name}, {
            where: {id}
        })

        return res.redirect('/inv/' + invId + '?updated=true')
    }

    await db.unit.create({name, invId})

    res.redirect('/inv/' + invId + '?added=true')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit_subunit = async (req, res) => {
    var {id, unitId, invId, name} = req.body
    console.log(req.body)
    console.log(id, unitId, invId, name)

    if (id) {
        await db.subunit.update({name}, {
            where: {id}
        })

        return res.redirect('/inv/' + invId + '/unit/' + unitId + '?updated=true')
    }

    await db.subunit.create({name, unitId})

    res.redirect('/inv/' + invId + '/unit/' + unitId + '?added=true')
}
