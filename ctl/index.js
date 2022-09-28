var fs = require('fs'),
    path = require('path')


/* -------------------------------------------------------------------------- */

var ctl = Object.create(null)

var valid = file => {
    return file != path.basename(__filename)
        && file.slice(-3) == '.js'
        && file.indexOf('.') != 0
}

var associate = file => {
    var controller = file.substr(0, file.length - 3).replaceAll('-', '')

    ctl[controller] = require(path.join(__dirname, file))
}

fs.readdirSync(__dirname).filter(valid).forEach(associate)

module.exports = ctl
