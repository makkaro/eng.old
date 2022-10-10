var fs = require('fs'),
    path = require('path')


/* -------------------------------------------------------------------------- */

var errors = Object.create(null)

var valid = file => {
    return file != path.basename(__filename)
        && file.slice(-3) == '.js'
        && file.indexOf('.') != 0
}

var associate = file => {
    var constructor = require(path.join(__dirname, file))

    errors[constructor.name] = constructor
}

fs.readdirSync(__dirname).filter(valid).forEach(associate)

module.exports = errors
