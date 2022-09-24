var {Sequelize, DataTypes} = require('sequelize')

var fs = require('fs'),
    path = require('path')

var config = require('./config')


/* -------------------------------------------------------------------------- */

var sqlz = new Sequelize(config[process.env.NODE_ENV || 'development'])

var dir = path.join(__dirname, 'models')

var db = {Sequelize, sqlz}


/* -------------------------------------------------------------------------- */

var valid = file => {
    return file.slice(-3) == '.js'
        && file.indexOf('.') != 0
}

var associate = file => {
    var model = require(path.join(dir, file))(sqlz, DataTypes)

    db[model.name] = model
}


/* -------------------------------------------------------------------------- */

fs.readdirSync(dir).filter(valid).forEach(associate)

Object.keys(db).forEach(model => {
    if (db[model].associate) db[model].associate(db)
})

module.exports = db
