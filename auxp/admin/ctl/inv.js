var {Op} = require('sequelize'), db = require('../../../db')

var fs = require('fs'), path = require('path'), util = require('util')

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
    var {id, invId, unitId} = req.params, {url} = req

    var record = await db.subunit.findByPk(id, {
        include: [db.element, db.variant]
    })

    var elements = record?.elements

    var variants = record?.variants

    res.locals = {invId, unitId, record, url, elements, variants, ...res.locals}

    res.render('inv/edit-subunit')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit_element_view = async (req, res) => {
    var {id, invId, unitId, subunitId} = req.params, products = undefined, selected = undefined

    var record = await db.element.findByPk(id)

    if (record) {
        products = await db.product.findAll()

        selected = (await record.getProducts()).map($ => $.dataValues.id)
    }

    res.locals = {invId, unitId, subunitId, record, products, selected, ...res.locals}

    res.render('inv/edit-element')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.variant_img_upload_view = async (req, res) => {
    var {id, invId, unitId, subunitId} = req.params

    res.locals = {id, invId, unitId, subunitId, ...res.locals}

    res.render('inv/variant-img-upload.ejs')
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

    if (id) {
        await db.subunit.update({name}, {
            where: {id}
        })

        return res.redirect('/inv/' + invId + '/unit/' + unitId + '?updated=true')
    }

    await db.subunit.create({name, unitId})

    res.redirect('/inv/' + invId + '/unit/' + unitId + '?added=true')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit_element = async (req, res) => {
    var {id, invId, unitId, subunitId, name, products: productIds} = req.body, element = undefined

    var subunit = undefined

    if (id) {
        await db.variant.destroy({where: {subunitId}})

        var products = await db.product.findAll({where: {id: productIds}})

        element = await db.element.findByPk(id)

        await element.update({name}, {
            where: {id}
        })

        if (products) {
            await element.setProducts(products)
        }

        subunit = await db.subunit.findByPk(subunitId, {include: {model: db.element, include: db.product}})

        if (subunit.elements.length > 1) {
            var cartesian_product = (...x) => x.reduce((i, j) => i.flatMap(k => j.map(l => [k, l].flat())))

            var arrays = []

            subunit.elements.forEach(element => {
                arrays.push(element.products.map(product => product.id))
            })

            var variants = cartesian_product(...arrays)

            for (var codeArr of variants) {
                var code = codeArr.join('-')
                await db.variant.create({code, subunitId})

            }
        }

        return res.redirect('/inv/' + invId + '/unit/' + unitId + '/subunit/' + subunitId)
    }

    element = await db.element.create({name, subunitId})

    if (products) {
        await element.setProducts(products)
    }

    res.redirect('/inv/' + invId + '/unit/' + unitId + '/subunit/' + subunitId)
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.variant_img_upload = async (req, res) => {
    var {id, invId, unitId, subunitId} = req.body

    var record = await db.variant.findByPk(id)

    var basedir = __dirname.split(path.sep).slice(0, -3).join(path.sep),
        tempdir = req.file.path,
        destdir = path.join(basedir, 'public', 'img', 'subunits', record.code + '.jpg')

    await util.promisify(fs.rename)(tempdir, destdir)

    await record.update({img: '/subunits/' + record.code + '.jpg'})

    res.redirect('/inv/' + invId + '/unit/' + unitId + '/subunit/' + subunitId)
}
