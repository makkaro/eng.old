var fs = require('fs'),
    path = require('path')

var ctl = Object.create(null)

/* -------------------------------------------------------------------------- */

function valid(file) {
    return file != path.basename(__filename) && file.slice(-3) == '.js'
}

function associate(file) {
    var name = file.substr(0, file.length - 3).replaceAll('-', '_')

    ctl[name] = require(path.join(__dirname, file))
}

fs.readdirSync(__dirname).filter(valid).forEach(associate)

module.exports = ctl
