var fs = require('fs'),
    path = require('path')

var ctl = Object.create(null)

fs
    .readdirSync(__dirname)
    .filter(file =>
        file.slice(-3) == '.js' &&
        file != path.basename(__filename) &&
        file.indexOf('.') != 0
    )
    .forEach(file => {
        var controller = require(path.join(__dirname, file))
        ctl[controller.name] = controller
    })

module.exports = ctl
