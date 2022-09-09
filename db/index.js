var {Sequelize, DataTypes} = require('sequelize'),
    fs = require('fs'),
    path = require('path'),
    config = require('./config')

var env = process.env.NODE_ENV || 'development',
    options = config[env],
    sqlz = new Sequelize(options),
    db = Object.create(null),
    dir = path.join(__dirname, 'models')

fs
    .readdirSync(dir)
    .filter(file =>
        file.slice(-3) == '.js' &&
        // file != path.basename(__filename) &&
        file.indexOf('.') != 0
    )
    .forEach(file => {
        console.log(path.join(dir, file))
        var model = require(path.join(dir, file))(sqlz, DataTypes)
        db[model.name] = model
    })

Object.keys(db).forEach(model => {
    if (db[model].associate) db[model].associate(db)
})

db.Sequelize = Sequelize
db.sqlz = sqlz

module.exports = db
