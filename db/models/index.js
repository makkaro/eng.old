var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize')

var env = process.env.NODE_ENV || 'development',
    config = require('../config')[env]

var sqlz = new Sequelize.Sequelize(config),
    db = Object.create(null)

fs.readdirSync(__dirname)
    .filter(file =>
        file.slice(-3) == '.js' &&
        file != path.basename(__filename) &&
        file.indexOf('.') != 0
    )
    .forEach(file => {
        var model
            = require(path.join(__dirname, file))(sqlz, Sequelize.DataTypes)
        db[model.name] = model
    })

Object.keys(db).forEach(model => {
    if (db[model].associate) db[model].associate(db)
})

db.sqlz = sqlz
db.Sequelize = Sequelize

module.exports = db
