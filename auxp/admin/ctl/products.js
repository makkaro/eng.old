var {Op} = require('sequelize'), db = require('../../../db')
var path = require('path'), fs = require('fs'), util = require('util')

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

    var categories = await db.category.scope('full').findAll({order: [['name', 'ASC']]}),
        manufacturers = await db.manufacturer.scope('full').findAll({order: [['name', 'ASC']]})

    var record = await db.product.findByPk(id, {include: [db.category, db.manufacturer]})

    res.locals = {categories, manufacturers, record, ...res.locals}

    res.render('products/edit')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.img_upload_view = async (req, res) => {
    var {id} = req.params

    res.locals = {id, ...res.locals}

    res.render('products/img-upload')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.edit = async (req, res) => {
    var {id, name, cost_pln, cost_gr, categoryId, manufacturerId} = req.body

    var cost = cost_pln.concat(cost_gr)

    if (id) {
        await db.product.update({name, cost, categoryId, manufacturerId}, {where: {id}})

        return res.redirect('/products?updated=true')
    }

    var record = await db.product.create({name, cost, categoryId, manufacturerId})

    var basedir = __dirname.split(path.sep).slice(0, -3).join(path.sep),
        tempdir = req.file.path,
        destdir = path.join(basedir, 'public', 'img', 'products', record.id + '.jpg')

    await util.promisify(fs.rename)(tempdir, destdir)

    await record.update({img: '/products/' + record.id + '.jpg'})

    res.redirect('/products?added=true')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.img_upload = async (req, res) => {
    var {id} = req.body

    var basedir = __dirname.split(path.sep).slice(0, -3).join(path.sep),
        tempdir = req.file.path,
        destdir = path.join(basedir, 'public', 'img', 'products', id + '.jpg')

    await util.promisify(fs.rename)(tempdir, destdir)

    res.redirect('/products?img_updated=true')
}

/* ------------------------------------------------------------------------------------------------------------------ */
module.exports.destroy = async (req, res) => {
    var {id} = req.params

    await db.product.destroy({where: {id}})

    res.redirect('/products?del=true')
}
