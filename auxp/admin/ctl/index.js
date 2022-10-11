var fs = require('fs'), path = require('path')

var ctl = Object.create(null)

var valid = file => file != path.basename(__filename)

var associate = file => {
    var view_name = file.substr(0, file.length - 3).replace(/-/g, '_')

    ctl[view_name] = require(path.join(__dirname, file))
}

fs.readdirSync(__dirname).filter(valid).forEach(associate)

module.exports = ctl
