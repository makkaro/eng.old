var multer = require('multer'), path = require('path')

module.exports = multer({
    dest: path.join(__dirname.split(path.sep).slice(0, -3).join(path.sep), 'temp')
})
