var {Sequelize, DataTypes} = require('sequelize')

var fs = require('fs'),
    path = require('path')

var config = require('./_config')

var env = process.env.NODE_ENV || 'development',
    sqlz = new Sequelize(config[env]),
    db = Object.create(null)

/* -------------------------------------------------------------------------- */

function valid(file) {
    return file != path.basename(__filename)
        && file.slice(-3) == '.js'
        && file.indexOf('_') != 0
}

function associate(file) {
    var model = require(path.join(__dirname, file))(sqlz, DataTypes)

    db[model.name] = model
}

fs.readdirSync(__dirname).filter(valid).forEach(associate)

Object.keys(db).forEach(model => {
    if (db[model].associate) db[model].associate(db)
})

db.sequelize = Sequelize
db.sqlz = sqlz

module.exports = db
